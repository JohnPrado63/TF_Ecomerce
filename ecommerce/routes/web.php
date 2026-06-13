<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TourPackageController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Models\Location;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\RecommendationController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $packages = \App\Models\TourPackage::with(['category', 'location'])
        ->withAvg('reviews', 'rating')
        ->withCount('reviews')
        ->where('status', true)
        ->get();

    $destinations = \App\Models\Destination::with('location')
        ->orderBy('name')
        ->get();

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
        'packages'       => $packages,
        'destinations'   => $destinations,
    ]);
});




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



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/preferences', [PreferenceController::class, 'edit'])->name('preferences.edit');
    Route::post('/preferences', [PreferenceController::class, 'update'])->name('preferences.update');
    Route::get('/travel-match', [RecommendationController::class, 'index'])->name('travel-match');
});

// Rutas públicas de paquetes
Route::get('/packages', [TourPackageController::class, 'index'])->name('packages.index');
Route::get('/packages/{id}', [TourPackageController::class, 'show'])->name('packages.show');

Route::get('/destinos/{province}', function ($province) {
    $destination = \App\Models\Destination::with('location')
        ->where('slug', $province)
        ->first();

    abort_unless($destination, 404);

    $packages = \App\Models\TourPackage::with(['category','location'])
        ->where('location_id', $destination->location_id)
        ->where('status', true)
        ->get();

   $packageTitles = $packages->pluck('title')->map(fn($t) => strtolower((string) $t));
    $packageDescriptions = $packages->pluck('description')->map(fn($d) => strtolower((string) $d));

    $destinationName = strtolower((string) $destination->name);

    $sites = collect($destination->sites)->map(function ($site) use ($packageTitles, $packageDescriptions, $destinationName) {
        // Palabras clave del sitio (sin palabras comunes)
        $stopWords = ['de', 'la', 'el', 'los', 'las', 'y', 'en', 'del', $destinationName];

        $siteTitle = strtolower((string) ($site['title'] ?? ''));

        $siteWords = collect(explode(' ', $siteTitle))
            ->filter(fn($word) => strlen($word) > 3 && !in_array($word, $stopWords))
            ->values();

        $allText = $packageTitles->merge($packageDescriptions)->implode(' ');

        // Coincide si al menos una palabra clave significativa está en algún paquete
        $hasPackage = $siteWords->contains(fn($word) => str_contains($allText, $word));

        $site['has_package'] = $hasPackage;
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

Route::get('/ofertas/{slug}', function ($slug) {
    $offers = [
        'descuento-temprano' => [
            'title' => 'Descuento Temprano',
            'desc' => 'Reserva 30 días antes y ahorra 20% en paquetes Ayacucho.',
            'discount' => '20%',
            'details' => 'Reserva con anticipación para conseguir mejores precios en experiencias culturales y tours locales. Oferta válida para paquetes seleccionados en Ayacucho.',
            'benefits' => ['Ahorro extra del 20%', 'Mejor selección de fechas', 'Incluye asesoría personalizada'],
        ],
        'pack-familiar' => [
            'title' => 'Pack Familiar',
            'desc' => 'Viaja en familia y obtén beneficios especiales.',
            'discount' => '15%',
            'details' => 'Ideal para familias que desean descubrir Ayacucho con comodidad y actividades adaptadas para todos. Incluye descuentos en alojamiento y excursiones familiares.',
            'benefits' => ['Descuento para familias', 'Tours guiados para niños', 'Alojamiento en habitaciones familiares'],
        ],
        'ultimo-minuto' => [
            'title' => 'Último Minuto',
            'desc' => 'Reservas de último minuto con precios increíbles.',
            'discount' => '30%',
            'details' => 'Perfecto para escapadas rápidas a Ayacucho con descuentos especiales en paquetes disponibles a corto plazo.',
            'benefits' => ['Precios bajos de último minuto', 'Confirmación rápida', 'Opciones flexibles de viaje'],
        ],
    ];

    abort_unless(array_key_exists($slug, $offers), 404);

    return Inertia::render('Ofertas/Show', [
        'offer' => $offers[$slug],
    ]);
})->name('offers.show');

// Rutas protegidas (solo usuarios logueados)
Route::resource('bookings', BookingController::class);

// Rutas de administración agregando el 1/06/2026
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', fn () => redirect()->route('admin.dashboard'))->name('index');
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/packages', [AdminController::class, 'packages'])->name('packages');
    Route::get('/packages/create', [AdminController::class, 'createPackage'])->name('packages.create');
    Route::post('/packages', [AdminController::class, 'storePackage'])->name('packages.store');
    Route::get('/packages/{id}/edit', [AdminController::class, 'editPackage'])->name('packages.edit');
    Route::put('/packages/{id}', [AdminController::class, 'updatePackage'])->name('packages.update');
    Route::delete('/packages/{id}', [AdminController::class, 'deletePackage'])->name('packages.delete');
    Route::get('/bookings', [AdminController::class, 'bookings'])->name('bookings');
    Route::put('/bookings/{id}/status', [AdminController::class, 'updateBookingStatus'])->name('bookings.status');
    Route::get('/categories', [AdminController::class, 'categories'])->name('categories');
    Route::post('/categories', [AdminController::class, 'storeCategory'])->name('categories.store');
    Route::put('/categories/{id}', [AdminController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{id}', [AdminController::class, 'deleteCategory'])->name('categories.delete');
    Route::get('/guides', [AdminController::class, 'guides'])->name('guides');
    Route::post('/guides', [AdminController::class, 'storeGuide'])->name('guides.store');
    Route::put('/guides/{id}', [AdminController::class, 'updateGuide'])->name('guides.update');
    Route::delete('/guides/{id}', [AdminController::class, 'deleteGuide'])->name('guides.delete');
    Route::get('/hotels', [AdminController::class, 'hotels'])->name('hotels');
    Route::post('/hotels', [AdminController::class, 'storeHotel'])->name('hotels.store');
    Route::put('/hotels/{id}', [AdminController::class, 'updateHotel'])->name('hotels.update');
    Route::delete('/hotels/{id}', [AdminController::class, 'deleteHotel'])->name('hotels.delete');
    Route::get('/restaurants', [AdminController::class, 'restaurants'])->name('restaurants');
    Route::post('/restaurants', [AdminController::class, 'storeRestaurant'])->name('restaurants.store');
    Route::put('/restaurants/{id}', [AdminController::class, 'updateRestaurant'])->name('restaurants.update');
    Route::delete('/restaurants/{id}', [AdminController::class, 'deleteRestaurant'])->name('restaurants.delete');
    Route::get('/transports', [AdminController::class, 'transports'])->name('transports');
    Route::post('/transports', [AdminController::class, 'storeTransport'])->name('transports.store');
    Route::put('/transports/{id}', [AdminController::class, 'updateTransport'])->name('transports.update');
    Route::delete('/transports/{id}', [AdminController::class, 'deleteTransport'])->name('transports.delete');
    Route::get('/reports', [AdminController::class, 'reports'])->name('reports');
    });
// Rutas de reseñas
Route::post('/reviews', [App\Http\Controllers\ReviewController::class, 'store'])->name('reviews.store')->middleware('auth');
Route::delete('/reviews/{id}', [App\Http\Controllers\ReviewController::class, 'destroy'])->name('reviews.destroy')->middleware('auth');
// Rutas de pagos
Route::middleware('auth')->group(function () {
    Route::get('/payments/{bookingId}', [App\Http\Controllers\PaymentController::class, 'show'])->name('payments.show');
    Route::post('/payments', [App\Http\Controllers\PaymentController::class, 'store'])->name('payments.store');
});

// Ruta admin para verificar pagos
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::put('/payments/{id}/verify', [App\Http\Controllers\PaymentController::class, 'verify'])->name('payments.verify');
    Route::get('/payments', [App\Http\Controllers\AdminController::class, 'payments'])->name('payments');
});
Route::get('/contacto', function () {
    return Inertia::render('Contacto');
})->name('contacto');
require __DIR__.'/auth.php';