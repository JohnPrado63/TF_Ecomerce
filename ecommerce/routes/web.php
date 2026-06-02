<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TourPackageController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Models\Location;
use Illuminate\Foundation\Application;
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

    $locations = Location::where('region', 'Ayacucho')
        ->whereHas('tourPackages', fn ($query) => $query->where('status', true))
        ->orderBy('city')
        ->get();

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
        'packages'       => $packages,
        'locations'      => $locations,
    ]);
});




Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
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
    $location = Location::where('region', 'Ayacucho')->get()->first(
        fn ($loc) => Str::slug($loc->city) === $province
    );

    abort_unless($location, 404);

    $destinationDetails = [
        'huamanga' => [
            'description' => 'Descubre el corazón de Ayacucho con su casco histórico, plazas coloniales y tradición viva.',
            'summary' => 'Capital regional con cultura, mercados de artesanía y arquitectura virreinal.',
            'style' => 'Urbano cultural',
            'recommendation' => 'Camina por la Plaza Mayor, visita las iglesias barrocas y vive una tarde en el Mercado Central.',
            'sites' => [
                ['title' => 'Plaza Mayor de Ayacucho', 'detail' => 'Iglesias coloniales, balcones tallados y tiendas de artesanía local.'],
                ['title' => 'Catedral de Ayacucho', 'detail' => 'Arquitectura barroca que define el centro histórico de la ciudad.'],
                ['title' => 'Museo de la Memoria', 'detail' => 'Exposición sobre historia regional y valores culturales del valle.'],
            ],
        ],
        'cangallo' => [
            'description' => 'Lagunas color turquesa, senderos andinos y comunidades vivientes en Cangallo.',
            'summary' => 'Provincia natural con rutas de lagunas escalonadas y paisaje serrano.',
            'style' => 'Naturaleza y aventura',
            'recommendation' => 'Recorre las lagunas de color y prueba la gastronomía local en los pueblos cercanos.',
            'sites' => [
                ['title' => 'Lagunas de Cangallo', 'detail' => 'Más de 15 lagunas naturales rodeadas de vegetación andina.'],
                ['title' => 'Mirador de Achacocha', 'detail' => 'Vistas panorámicas de los valles y humedales de altura.'],
                ['title' => 'Pueblo de Cangallo', 'detail' => 'Mercados típicos y tradiciones de los habitantes locales.'],
            ],
        ],
        'vilcashuaman' => [
            'description' => 'Arqueología ancestral y festividades tradicionales en la sierra ayacuchana.',
            'summary' => 'Destino para los amantes de los sitios arqueológicos y la espiritualidad andina.',
            'style' => 'Arqueología y tradición',
            'recommendation' => 'Recorre el complejo arqueológico, participa en una feria local y prueba la comida serrana.',
            'sites' => [
                ['title' => 'Zona Arqueológica de Usqunta', 'detail' => 'Terrazas y estructuras preincaicas en un entorno montañoso.'],
                ['title' => 'Museo de Sitio de Vilcas Huamán', 'detail' => 'Testimonios de la vida incaica y artefactos locales.'],
                ['title' => 'Canchón de la Plaza Principal', 'detail' => 'Espacio cultural donde se celebran fiestas y tradiciones vivas.'],
            ],
        ],
        'la-mar' => [
            'description' => 'Valles serranos y pueblos con fuerte herencia cultural en el sur de Ayacucho.',
            'summary' => 'Ruta tranquila entre paisajes verdes y fiesta popular.',
            'style' => 'Naturaleza y festivales',
            'recommendation' => 'Visita mercados campesinos y descubre pequeños talleres artesanales en el camino.',
            'sites' => [
                ['title' => 'Pampa de la Quinua', 'detail' => 'Paisajes amplios con cultivo tradicional y memoria histórica.'],
                ['title' => 'Plaza de San Miguel', 'detail' => 'Centro de actividades con tradiciones religiosas y ferias.'],
                ['title' => 'Mirador de Fin del Mundo', 'detail' => 'Vistas panorámicas de los valles ayacuchanos al atardecer.'],
            ],
        ],
        'lucanas' => [
            'description' => 'Carnaval, lagunas y paisajes altos en el sur de la región Ayacucho.',
            'summary' => 'Provincia famosa por su carnaval y sus rutas naturales elevadas.',
            'style' => 'Festividades y paisaje alto',
            'recommendation' => 'Disfruta del folklore local y recorre las lagunas andinas cercanas.',
            'sites' => [
                ['title' => 'Carnaval de Lucanas', 'detail' => 'Celebración colorida con danzas, música y trajes tradicionales.'],
                ['title' => 'Laguna Grande', 'detail' => 'Espacio natural para caminatas y observación de aves.'],
                ['title' => 'Mirador de Escalerillas', 'detail' => 'Punto panorámico con vistas únicas de la puna.'],
            ],
        ],
    ];

    $slug = Str::slug($location->city);
    $details = $destinationDetails[$slug] ?? [
        'description' => "Descubre {$location->city} y su atractivo turístico en Ayacucho.",
        'summary' => 'Provincia de Ayacucho con encanto local y tradiciones andinas.',
        'style' => 'Destino regional',
        'recommendation' => 'Explora los puntos de interés locales y disfruta de la hospitalidad ayacuchana.',
        'sites' => [],
    ];

    return Inertia::render('Destinos/Show', [
        'destination' => array_merge([
            'name' => $location->city,
            'region' => $location->region,
        ], $details),
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
Route::middleware('auth')->group(function () {
    Route::post('/packages', [TourPackageController::class, 'store'])->name('packages.store');
    Route::delete('/packages/{id}', [TourPackageController::class, 'destroy'])->name('packages.destroy');
    Route::resource('bookings', BookingController::class);
});

// Rutas de administración agregando el 1/06/2026
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/packages', [AdminController::class, 'packages'])->name('packages');
    Route::get('/bookings', [AdminController::class, 'bookings'])->name('bookings');
    Route::put('/bookings/{id}/status', [AdminController::class, 'updateBookingStatus'])->name('bookings.status');
    Route::delete('/packages/{id}', [AdminController::class, 'deletePackage'])->name('packages.delete');
});

require __DIR__.'/auth.php';