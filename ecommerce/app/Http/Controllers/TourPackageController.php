<?php

namespace App\Http\Controllers;

use App\Models\TourPackage;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TourPackageController extends Controller
{
    // Lista todos los paquetes
    public function index(Request $request)
    {
        $query = TourPackage::with(['category', 'location'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->where('status', true);

        // Filtro por búsqueda (título o descripción)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filtro por categoría
        if ($request->filled('categoria')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->categoria);
            });
        }

        // Filtro por ubicación
        if ($request->filled('ubicacion')) {
            $query->whereHas('location', function ($q) use ($request) {
                $q->where('city', $request->ubicacion);
            });
        }

        // Filtro por duración
        if ($request->filled('duracion')) {
            $duracion = $request->duracion;
            if ($duracion === '1') {
                $query->where('duration_days', 1);
            } elseif ($duracion === '2-3') {
                $query->whereBetween('duration_days', [2, 3]);
            } elseif ($duracion === '4-7') {
                $query->whereBetween('duration_days', [4, 7]);
            } elseif ($duracion === '8+') {
                $query->where('duration_days', '>=', 8);
            }
        }

        // Orden
        $orden = $request->get('orden', 'recientes');
        if ($orden === 'precio-bajo') {
            $query->orderBy('price', 'asc');
        } elseif ($orden === 'precio-alto') {
            $query->orderBy('price', 'desc');
        } elseif ($orden === 'duracion') {
            $query->orderBy('duration_days', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $packages = $query->get();

        $locations = Location::orderBy('city')->get();

        return Inertia::render('Packages/Index', [
            'packages' => $packages,
            'locations' => $locations,
            'filters' => [
                'search' => $request->search,
                'categoria' => $request->categoria,
                'ubicacion' => $request->ubicacion,
                'duracion' => $request->duracion,
                'orden' => $orden,
            ],
        ]);
    }

    // Muestra el detalle de un paquete
    public function show($id)
    {
        $package = TourPackage::with([
            'category',
            'location',
            'reviews.client',
            'hotels',
            'tourGuides',
            'restaurants'
        ])
        ->withAvg('reviews', 'rating')
        ->withCount('reviews')
        ->findOrFail($id);

        $similarPackages = $package->getSimilarPackages(4);

        $similarPackages = $similarPackages->map(function ($pkg) use ($package) {
            $pkg->similarity_score = $package->getSimilarityScore($pkg);
            return $pkg;
        })->sortByDesc('similarity_score')->values();

        //restaurants of the same location not already assigned to the package
        $assignedIds=$package->restaurants->pluck('id')->toArray();
        $nearbyRestaurants = \App\Models\Restaurant::where('location_id', $package->location_id)
            ->whereNotIn('id', $assignedIds)
            ->get();
        //hotels of the same location not already assigned to the package
        $assignedHotelIds=$package->hotels->pluck('id')->toArray();
        $nearbyHotels = \App\Models\Hotel::where('location_id', $package->location_id)
            ->whereNotIn('id', $assignedHotelIds)
            ->get();


        return Inertia::render('Packages/Show', [
            'package' => $package,
            'nearbyRestaurants' => $nearbyRestaurants,
            'nearbyHotels' => $nearbyHotels,
            'similarPackages' => $similarPackages,
        ]);
    }

    // Guarda un nuevo paquete (solo admin)
    public function store(Request $request)
    {
        $request->validate([
            'title'         => 'required|string|max:150',
            'description'   => 'required|string',
            'price'         => 'required|numeric',
            'duration_days' => 'required|integer',
            'category_id'   => 'required|exists:categories,id',
            'location_id'   => 'required|exists:locations,id',
        ]);

        TourPackage::create($request->all());

        return redirect()->back()->with('success', 'Paquete creado correctamente');
    }

    // Elimina un paquete (solo admin)
    public function destroy($id)
    {
        TourPackage::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Paquete eliminado');
    }
}