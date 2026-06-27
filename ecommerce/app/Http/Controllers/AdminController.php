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
    // Listar guías
    public function guides()
    {
        $guides = \App\Models\GuiaTuristico::orderBy('nombre')->get();
        return Inertia::render('Admin/Guides', [
            'guides' => $guides,
        ]);
    }

    // Crear guía
    public function storeGuide(Request $request)
    {
        $request->validate([
            'nombre'         => 'required|string|max:100',
            'apellido'       => 'required|string|max:100',
            'idiomas'        => 'nullable|string',
            'telefono'       => 'nullable|string|max:20',
            'credencial_nro' => 'nullable|string|max:50',
        ]);

        \App\Models\GuiaTuristico::create($request->all());
        return redirect()->back()->with('success', 'Guía creado correctamente');
    }

    // Actualizar guía
    public function updateGuide(Request $request, $id)
    {
        $request->validate([
            'nombre'   => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
        ]);

        \App\Models\GuiaTuristico::findOrFail($id)->update($request->all());
        return redirect()->back()->with('success', 'Guía actualizado correctamente');
    }

    // Eliminar guía
    public function deleteGuide($id)
    {
        \App\Models\GuiaTuristico::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Guía eliminado correctamente');
    }

    // Gestión de reservas
    public function bookings()
    {
        $bookings = Booking::with(['tourPackage', 'client', 'guide', 'payments'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) {
                $payment = $booking->payments->first();
                $booking->payment_status = $payment ? $payment->status : null;
                $booking->payment_voucher = $payment ? $payment->voucher_path : null;
                $booking->payment_method = $payment ? $payment->method : null;
                return $booking;
            });

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
    // Listar hoteles
    public function hotels()
    {
        $hotels = \App\Models\Hotel::with('location')
            ->orderBy('nombre')
            ->get();

        $locations = \App\Models\Location::orderBy('city')->get();

        return Inertia::render('Admin/Hotels', [
            'hotels'    => $hotels,
            'locations' => $locations,
        ]);
    }

    // Crear hotel
    public function storeHotel(Request $request)
    {
        $request->validate([
            'nombre'           => 'required|string|max:150',
            'location_id'      => 'required|exists:locations,id',
            'estrellas'        => 'nullable|integer|min:1|max:5',
            'precio_por_noche' => 'nullable|numeric',
            'direccion'        => 'nullable|string',
            'telefono'         => 'nullable|string|max:20',
        ]);

        \App\Models\Hotel::create($request->all());
        return redirect()->back()->with('success', 'Hotel creado correctamente');
    }

    // Actualizar hotel
    public function updateHotel(Request $request, $id)
    {
        $request->validate([
            'nombre'      => 'required|string|max:150',
            'location_id' => 'required|exists:locations,id',
        ]);

        \App\Models\Hotel::findOrFail($id)->update($request->all());
        return redirect()->back()->with('success', 'Hotel actualizado correctamente');
    }

    // Eliminar hotel
    public function deleteHotel($id)
    {
        \App\Models\Hotel::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Hotel eliminado correctamente');
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
    // Listar transportes
    public function transports()
    {
        $transports = \App\Models\EmpresaTransporte::with('location')
            ->orderBy('nombre_empresa')
            ->get();

        $locations = \App\Models\Location::orderBy('city')->get();

        return Inertia::render('Admin/Transports', [
            'transports' => $transports,
            'locations'  => $locations,
        ]);
    }

    // Crear transporte
    public function storeTransport(Request $request)
    {
        $request->validate([
            'nombre_empresa'  => 'required|string|max:150',
            'location_id'     => 'required|exists:locations,id',
            'tipo_transporte' => 'required|in:Autobús,Miniván,Avión,Tren,Marítimo',
            'contacto'        => 'nullable|string|max:100',
        ]);

        \App\Models\EmpresaTransporte::create($request->all());
        return redirect()->back()->with('success', 'Empresa de transporte creada correctamente');
    }

    // Actualizar transporte
    public function updateTransport(Request $request, $id)
    {
        $request->validate([
            'nombre_empresa'  => 'required|string|max:150',
            'location_id'     => 'required|exists:locations,id',
            'tipo_transporte' => 'required|in:Autobús,Miniván,Avión,Tren,Marítimo',
        ]);

        \App\Models\EmpresaTransporte::findOrFail($id)->update($request->all());
        return redirect()->back()->with('success', 'Empresa actualizada correctamente');
    }

    // Eliminar transporte
    public function deleteTransport($id)
    {
        \App\Models\EmpresaTransporte::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Empresa eliminada correctamente');
    }

public function reports()
{
    // Reporte de ventas por mes
    $salesByMonth = \App\Models\Booking::selectRaw(
            'MONTH(created_at) as month,
             YEAR(created_at) as year,
             COUNT(*) as total_bookings,
             SUM(total_amount) as total_sales'
        )
        ->where('status', 'confirmed')
        ->groupBy('year', 'month')
        ->orderBy('year', 'desc')
        ->orderBy('month', 'desc')
        ->take(6)
        ->get();

    // Paquetes más reservados
    $topPackages = \App\Models\TourPackage::withCount('bookings')
        ->withSum('bookings', 'total_amount')
        ->orderBy('bookings_count', 'desc')
        ->take(5)
        ->get();

    // Resumen general
    $summary = [
        'total_ventas'    => \App\Models\Booking::where('status', 'confirmed')->sum('total_amount'),
        'total_reservas'  => \App\Models\Booking::count(),
        'reservas_hoy'    => \App\Models\Booking::whereDate('created_at', today())->count(),
        'pagos_pendientes'=> \App\Models\Payment::where('status', 'pending')->count(),
    ];

    return Inertia::render('Admin/Reports', [
        'salesByMonth' => $salesByMonth,
        'topPackages'  => $topPackages,
        'summary'      => $summary,
    ]);
}

    // Listar restaurantes
    public function restaurants()
    {
        $restaurants = \App\Models\Restaurante::with('location')
            ->orderBy('nombre')
            ->get();

        $locations = \App\Models\Location::orderBy('city')->get();

        return Inertia::render('Admin/Restaurants', [
            'restaurants' => $restaurants,
            'locations'   => $locations,
        ]);
    }

    // Crear restaurante
    public function storeRestaurant(Request $request)
    {
        $request->validate([
            'nombre'      => 'required|string|max:150',
            'location_id' => 'required|exists:locations,id',
            'tipo_comida' => 'nullable|string|max:100',
            'direccion'   => 'nullable|string',
        ]);

        \App\Models\Restaurante::create($request->all());
        return redirect()->back()->with('success', 'Restaurante creado correctamente');
    }

    // Actualizar restaurante
    public function updateRestaurant(Request $request, $id)
    {
        $request->validate([
            'nombre'      => 'required|string|max:150',
            'location_id' => 'required|exists:locations,id',
        ]);

        \App\Models\Restaurante::findOrFail($id)->update($request->all());
        return redirect()->back()->with('success', 'Restaurante actualizado correctamente');
    }

    // Eliminar restaurante
    public function deleteRestaurant($id)
    {
        \App\Models\Restaurante::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Restaurante eliminado correctamente');
    }


    // Listar categorías
    public function categories()
    {
        $categories = \App\Models\Category::withCount('tourPackages')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Categories', [
            'categories' => $categories,
        ]);
    }

    // Crear categoría
    public function storeCategory(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:100|unique:categories,name',
            'description' => 'nullable|string',
        ]);

        \App\Models\Category::create($request->all());

        return redirect()->back()->with('success', 'Categoría creada correctamente');
    }

    // Actualizar categoría
    public function updateCategory(Request $request, $id)
    {
        $request->validate([
            'name'        => 'required|string|max:100|unique:categories,name,'.$id,
            'description' => 'nullable|string',
        ]);

        \App\Models\Category::findOrFail($id)->update($request->all());

        return redirect()->back()->with('success', 'Categoría actualizada correctamente');
    }

    // Eliminar categoría
    public function deleteCategory($id)
    {
        \App\Models\Category::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Categoría eliminada correctamente');
    }
    public function offers()
    {
        $offers = \App\Models\Offer::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Offers', [
            'offers' => $offers,
        ]);
    }

    public function storeOffer(Request $request)
    {
        $request->validate([
            'title'               => 'required|string|max:150',
            'slug'                => 'required|string|unique:offers,slug',
            'discount_percentage' => 'required|numeric|min:1|max:100',
            'start_date'          => 'required|date',
            'end_date'            => 'required|date|after:start_date',
            'code'                => 'nullable|string|unique:offers,code',
        ]);

        \App\Models\Offer::create($request->all());
        return redirect()->back()->with('success', 'Oferta creada correctamente');
    }

    public function updateOffer(Request $request, $id)
    {
        $offer = \App\Models\Offer::findOrFail($id);
        $offer->update($request->all());
        return redirect()->back()->with('success', 'Oferta actualizada correctamente');
    }

    public function deleteOffer($id)
    {
        \App\Models\Offer::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Oferta eliminada correctamente');
    }

}