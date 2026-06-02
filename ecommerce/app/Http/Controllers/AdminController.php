<?php

namespace App\Http\Controllers;

use App\Models\TourPackage;
use App\Models\Booking;
use App\Models\Client;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
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
}