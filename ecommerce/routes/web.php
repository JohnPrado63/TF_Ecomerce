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
});

// Rutas públicas de paquetes
Route::get('/packages', [TourPackageController::class, 'index'])->name('packages.index');
Route::get('/packages/{id}', [TourPackageController::class, 'show'])->name('packages.show');

Route::get('/destinos/{province}', function ($province) {
    $destination=\App\Models\Destination::with('location')
        ->where('slug', $province)
        ->first();

    abort_unless($destination, 404);
    $packages = \App\Models\TourPackage::with(['category','location'])
        ->where('location_id', $destination->location_id)
        ->where('status', true)
        ->get();
    return Inertia::render('Destinos/Show', [
        'destination' =>[
            'name'             => $destination->name,
            'region'           => $destination->location->region,
            'description'      => $destination->description,
            'summary'          => $destination->summary,
            'style'            => $destination->style,
            'recommendation'   => $destination->recommendation,
            'sites'            => $destination->sites,
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
require __DIR__.'/auth.php';