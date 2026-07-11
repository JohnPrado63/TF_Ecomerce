<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TourPackage;
use App\Models\Hotel;
use App\Models\Restaurant;

class PackageExtrasSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            'Aguas Turquesas de Millpu' => [
                'hotels' => ['Hostal Santa Rosa'],
                'restaurants' => ['Restaurante Millpu'],
            ],
            'Vilcashuamán Imperial' => [
                'hotels' => ['Albergue Vilcashuamán'],
                'restaurants' => ['Restaurante Inka Wasi'],
            ],
            'Templos Coloniales de Huamanga' => [
                'hotels' => ['Hotel Plaza Ayacucho'],
                'restaurants' => ['Restaurante La Casona'],
            ],
            'Huanta y sus Lagunas' => [
                'hotels' => ['Hotel Plaza Huanta'],
                'restaurants' => ['Restaurante el Huantino'],
            ],
        ];

        foreach ($packages as $title => $lists) {
            $package = TourPackage::where('title', $title)->first();
            if (!$package) continue;

            if (!empty($lists['hotels'])) {
                $hotelIds = Hotel::whereIn('name', $lists['hotels'])
                    ->pluck('id')
                    ->toArray();
                $package->hotels()->syncWithoutDetaching($hotelIds);
            }

            if (!empty($lists['restaurants'])) {
                $restaurantIds = Restaurant::whereIn('name', $lists['restaurants'])
                    ->pluck('id')
                    ->toArray();
                $package->restaurants()->syncWithoutDetaching($restaurantIds);
            }
        }
    }
}
