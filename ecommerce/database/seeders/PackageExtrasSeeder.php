<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TourPackage;
use App\Models\Hotel;
use App\Models\Restaurante;

class PackageExtrasSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            'Aguas Turquesas de Millpu' => [
                'hoteles' => ['Hostal Santa Rosa'],
                'restaurantes' => ['Restaurante Millpu'],
            ],
            'Vilcashuamán Imperial' => [
                'hoteles' => ['Albergue Vilcashuamán'],
                'restaurantes' => ['Restaurante Inka Wasi'],
            ],
            'Templos Coloniales de Huamanga' => [
                'hoteles' => ['Hotel Plaza Ayacucho'],
                'restaurantes' => ['Restaurante La Casona'],
            ],
            'Huanta y sus Lagunas' => [
                'hoteles' => ['Hotel Plaza Huanta'],
                'restaurantes' => ['Restaurante el Huantino'],
            ],
        ];

        foreach ($packages as $title => $lists) {
            $package = TourPackage::where('title', $title)->first();
            if (!$package) {
                continue;
            }

            if (!empty($lists['hoteles'])) {
                $hotelIds = Hotel::whereIn('nombre', $lists['hoteles'])->pluck('id')->toArray();
                $package->hoteles()->syncWithoutDetaching($hotelIds);
            }

            if (!empty($lists['restaurantes'])) {
                $restauranteIds = Restaurante::whereIn('nombre', $lists['restaurantes'])->pluck('id')->toArray();
                $package->restaurantes()->syncWithoutDetaching($restauranteIds);
            }
        }
    }
}
