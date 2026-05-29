<?php

namespace App\Http\Controllers;

use App\Models\TourPackage;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TourPackageController extends Controller
{
    // Lista todos los paquetes
    public function index()
    {
        $packages = TourPackage::with(['category', 'location'])
            ->where('status', true)
            ->get();

        return Inertia::render('Packages/Index', [
            'packages' => $packages
        ]);
    }

    // Muestra el detalle de un paquete
    public function show($id)
    {
        $package = TourPackage::with([
            'category',
            'location',
            'reviews.client',
            'hoteles',
            'guias',
            'restaurantes'
        ])->findOrFail($id);

        return Inertia::render('Packages/Show', [
            'package' => $package
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