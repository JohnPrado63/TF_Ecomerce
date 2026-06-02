<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TourPackageController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
        'packages'       => $packages,
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