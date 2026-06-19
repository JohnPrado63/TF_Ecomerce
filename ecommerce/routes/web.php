<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TourPackageController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PaymentController;
use App\Models\Location;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ============================================================
// PÁGINA PRINCIPAL
// ============================================================

Route::get('/', function () {
    $packages = \App\Models\TourPackage::with(['category', 'location'])
        ->withAvg('reviews', 'rating')
        ->withCount('reviews')
        ->where('status', true)
        ->get();

    $destinations = \App\Models\Destination::with('location')
        ->orderBy('name')
        ->get();

    $offers = \App\Models\Offer::where('active', true)
        ->whereDate('start_date', '<=', now())
        ->whereDate('end_date', '>=', now())
        ->get();
    

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
        'packages'       => $packages,
        'destinations'   => $destinations,
        'offers'         => $offers,
    ]);
});

// ============================================================
// DASHBOARD (usuario logueado)
// ============================================================

Route::get('/dashboard', function () {
    if (Auth::check() && Auth::user()->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }

    $client = \App\Models\Client::where('user_id', Auth::id())->first();

    $bookings = $client
        ? \App\Models\Booking::with(['tourPackage.location'])
            ->where('client_id', $client->id)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get()
        : collect();

    $stats = $client ? [
        'total'     => \App\Models\Booking::where('client_id', $client->id)->count(),
        'confirmed' => \App\Models\Booking::where('client_id', $client->id)->where('status', 'confirmed')->count(),
        'pending'   => \App\Models\Booking::where('client_id', $client->id)->where('status', 'pending')->count(),
    ] : ['total' => 0, 'confirmed' => 0, 'pending' => 0];

    return Inertia::render('Dashboard', [
        'bookings' => $bookings,
        'stats'    => $stats,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// ============================================================
// PERFIL, PREFERENCIAS Y TRAVEL MATCH (usuario logueado)
// ============================================================

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/preferences', [PreferenceController::class, 'edit'])->name('preferences.edit');
    Route::post('/preferences', [PreferenceController::class, 'update'])->name('preferences.update');

    Route::get('/travel-match', [RecommendationController::class, 'index'])->name('travel-match');
});

// ============================================================
// PAQUETES TURÍSTICOS (público)
// ============================================================

Route::get('/packages', [TourPackageController::class, 'index'])->name('packages.index');
Route::get('/packages/{id}', [TourPackageController::class, 'show'])->name('packages.show');

// ============================================================
// DESTINOS (público)
// ============================================================

Route::get('/destinos/{province}', function ($province) {
    $destination = \App\Models\Destination::with('location')
        ->where('slug', $province)
        ->first();

    abort_unless($destination, 404);

    $packages = \App\Models\TourPackage::with(['category', 'location'])
        ->where('location_id', $destination->location_id)
        ->where('status', true)
        ->get();

    $packageTitles       = $packages->pluck('title')->map(fn($t) => strtolower((string) $t));
    $packageDescriptions = $packages->pluck('description')->map(fn($d) => strtolower((string) $d));
    $destinationName     = strtolower((string) $destination->name);

    $sites = collect($destination->sites)->map(function ($site) use ($packageTitles, $packageDescriptions, $destinationName) {
        $stopWords = ['de', 'la', 'el', 'los', 'las', 'y', 'en', 'del', $destinationName];

        $siteTitle = strtolower((string) ($site['title'] ?? ''));

        $siteWords = collect(explode(' ', $siteTitle))
            ->filter(fn($word) => strlen($word) > 3 && !in_array($word, $stopWords))
            ->values();

        $allText = $packageTitles->merge($packageDescriptions)->implode(' ');

        $site['has_package'] = $siteWords->contains(fn($word) => str_contains($allText, $word));
        return $site;
    });

    return Inertia::render('Destinos/Show', [
        'destination' => [
            'name'           => $destination->name,
            'region'         => $destination->location->region,
            'description'    => $destination->description,
            'summary'        => $destination->summary,
            'style'          => $destination->style,
            'recommendation' => $destination->recommendation,
            'sites'          => $sites,
        ],
        'packages' => $packages,
    ]);
})->name('destinos.show');

// ============================================================
// OFERTAS (público)
// ============================================================

Route::get('/ofertas/{slug}', function ($slug) {
    $offer = \App\Models\Offer::where('slug', $slug)
        ->where('active', true)
        ->first();

    abort_unless($offer, 404);

    $packages = \App\Models\TourPackage::with(['category', 'location'])
        ->withAvg('reviews', 'rating')
        ->withCount('reviews')
        ->where('status', true)
        ->get()
        ->map(function ($pkg) use ($offer) {
            $pkg->original_price   = $pkg->price;
            $pkg->discounted_price = $offer->applyDiscount($pkg->price);
            $pkg->discount_percent = $offer->discount_percentage;
            return $pkg;
        });

    return Inertia::render('Ofertas/Show', [
        'offer'    => $offer,
        'packages' => $packages,
    ]);
})->name('offers.show');

// ============================================================
// CONTACTO (público)
// ============================================================

Route::get('/contacto', function () {
    return Inertia::render('Contacto');
})->name('contacto');

// ============================================================
// RESERVAS (público con redirect a login si no auth)
// ============================================================

Route::get('/reservar/{packageId}', function ($packageId) {
    if (auth()->check()) {
        return redirect("/bookings/create?package_id={$packageId}");
    }
    session(['url.intended' => "/bookings/create?package_id={$packageId}"]);
    return redirect()->route('login')
        ->with('info', '¡Inicia sesión para reservar este paquete! 🎒');
})->name('reservar');

Route::middleware('auth')->group(function () {
    Route::resource('bookings', BookingController::class);
});

// ============================================================
// RESEÑAS (usuario logueado)
// ============================================================

Route::middleware('auth')->group(function () {
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
});

// ============================================================
// PAGOS (usuario logueado)
// ============================================================

Route::middleware('auth')->group(function () {
    Route::get('/payments/{bookingId}', [PaymentController::class, 'show'])->name('payments.show');
    Route::post('/payments', [PaymentController::class, 'store'])->name('payments.store');
});

// ============================================================
// PANEL DE ADMINISTRACIÓN
// ============================================================

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    Route::get('/', fn () => redirect()->route('admin.dashboard'))->name('index');
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    // Paquetes
    Route::get('/packages', [AdminController::class, 'packages'])->name('packages');
    Route::get('/packages/create', [AdminController::class, 'createPackage'])->name('packages.create');
    Route::post('/packages', [AdminController::class, 'storePackage'])->name('packages.store');
    Route::get('/packages/{id}/edit', [AdminController::class, 'editPackage'])->name('packages.edit');
    Route::put('/packages/{id}', [AdminController::class, 'updatePackage'])->name('packages.update');
    Route::delete('/packages/{id}', [AdminController::class, 'deletePackage'])->name('packages.delete');

    // Reservas
    Route::get('/bookings', [AdminController::class, 'bookings'])->name('bookings');
    Route::put('/bookings/{id}/status', [AdminController::class, 'updateBookingStatus'])->name('bookings.status');

    // Pagos
    Route::get('/payments', [PaymentController::class, 'payments'] ?? [AdminController::class, 'payments'])->name('payments');
    Route::put('/payments/{id}/verify', [PaymentController::class, 'verify'])->name('payments.verify');

    // Categorías
    Route::get('/categories', [AdminController::class, 'categories'])->name('categories');
    Route::post('/categories', [AdminController::class, 'storeCategory'])->name('categories.store');
    Route::put('/categories/{id}', [AdminController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{id}', [AdminController::class, 'deleteCategory'])->name('categories.delete');

    // Guías
    Route::get('/guides', [AdminController::class, 'guides'])->name('guides');
    Route::post('/guides', [AdminController::class, 'storeGuide'])->name('guides.store');
    Route::put('/guides/{id}', [AdminController::class, 'updateGuide'])->name('guides.update');
    Route::delete('/guides/{id}', [AdminController::class, 'deleteGuide'])->name('guides.delete');

    // Hoteles
    Route::get('/hotels', [AdminController::class, 'hotels'])->name('hotels');
    Route::post('/hotels', [AdminController::class, 'storeHotel'])->name('hotels.store');
    Route::put('/hotels/{id}', [AdminController::class, 'updateHotel'])->name('hotels.update');
    Route::delete('/hotels/{id}', [AdminController::class, 'deleteHotel'])->name('hotels.delete');

    // Restaurantes
    Route::get('/restaurants', [AdminController::class, 'restaurants'])->name('restaurants');
    Route::post('/restaurants', [AdminController::class, 'storeRestaurant'])->name('restaurants.store');
    Route::put('/restaurants/{id}', [AdminController::class, 'updateRestaurant'])->name('restaurants.update');
    Route::delete('/restaurants/{id}', [AdminController::class, 'deleteRestaurant'])->name('restaurants.delete');

    // Transportes
    Route::get('/transports', [AdminController::class, 'transports'])->name('transports');
    Route::post('/transports', [AdminController::class, 'storeTransport'])->name('transports.store');
    Route::put('/transports/{id}', [AdminController::class, 'updateTransport'])->name('transports.update');
    Route::delete('/transports/{id}', [AdminController::class, 'deleteTransport'])->name('transports.delete');

    // Ofertas
    Route::get('/offers', [AdminController::class, 'offers'])->name('offers');
    Route::post('/offers', [AdminController::class, 'storeOffer'])->name('offers.store');
    Route::put('/offers/{id}', [AdminController::class, 'updateOffer'])->name('offers.update');
    Route::delete('/offers/{id}', [AdminController::class, 'deleteOffer'])->name('offers.delete');

    // Reportes
    Route::get('/reports', [AdminController::class, 'reports'])->name('reports');

});

require __DIR__.'/auth.php';