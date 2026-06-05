<?php

namespace App\Http\Controllers;

use App\Models\TourPackage;
use App\Models\Booking;
use App\Models\Client;
use App\Models\Usuario;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'admin']);
    }

    // Panel principal
    public function dashboard()
    {
        $totalPaquetes  = TourPackage::count();
        $totalReservas  = Booking::count();
        $totalUsuarios  = Usuario::count();
        $totalIngresos  = Booking::where('status', 'confirmed')->sum('total_amount');

        $reservasRecientes = Booking::with(['tourPackage', 'client'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'paquetes'  => $totalPaquetes,
                'reservas'  => $totalReservas,
                'usuarios'  => $totalUsuarios,
                'ingresos'  => $totalIngresos,
            ],
            'reservasRecientes' => $reservasRecientes,
        ]);
    }

    // Gestión de paquetes
    public function packages()
    {
        $packages = TourPackage::with(['category', 'location'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Packages', [
            'packages' => $packages,
        ]);
    }

    public function createPackage()
    {
        return Inertia::render('Admin/PackageForm', [
            'categories' => Category::orderBy('name')->get(),
            'locations' => Location::orderBy('city')->get(),
            'package' => null,
        ]);
    }

    public function storePackage(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'duration_days' => 'required|integer|min:1',
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'required|exists:locations,id',
            'available_slots' => 'required|integer|min:0',
            'status' => 'required|boolean',
            'image_url' => 'nullable|url',
            'includes_guide' => 'nullable|boolean',
            'includes_food' => 'nullable|boolean',
            'includes_hotel' => 'nullable|boolean',
        ]);

        TourPackage::create($data);

        return redirect()->route('admin.packages')->with('success', 'Paquete creado correctamente');
    }

    public function editPackage($id)
    {
        $package = TourPackage::with(['category', 'location'])->findOrFail($id);

        return Inertia::render('Admin/PackageForm', [
            'package' => $package,
            'categories' => Category::orderBy('name')->get(),
            'locations' => Location::orderBy('city')->get(),
        ]);
    }

    public function updatePackage(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'duration_days' => 'required|integer|min:1',
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'required|exists:locations,id',
            'available_slots' => 'required|integer|min:0',
            'status' => 'required|boolean',
            'image_url' => 'nullable|url',
            'includes_guide' => 'nullable|boolean',
            'includes_food' => 'nullable|boolean',
            'includes_hotel' => 'nullable|boolean',
        ]);

        TourPackage::findOrFail($id)->update($data);

        return redirect()->route('admin.packages')->with('success', 'Paquete actualizado correctamente');
    }

    // Gestión de reservas
    public function bookings()
    {
        $bookings = Booking::with(['tourPackage', 'client'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Bookings', [
            'bookings' => $bookings,
        ]);
    }

    // Cambiar estado de reserva
    public function updateBookingStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        Booking::findOrFail($id)->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Estado actualizado correctamente');
    }

    // Eliminar paquete
    public function deletePackage($id)
    {
        TourPackage::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Paquete eliminado correctamente');
    }
    public function payments()
    {
        $payments = \App\Models\Payment::with(['booking.tourPackage', 'booking.client'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Payments', [
            'payments' => $payments,
        ]);
    }
}