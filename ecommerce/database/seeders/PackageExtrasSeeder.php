<?php

namespace Database\Seeders;

use App\Models\TourPackage;
use App\Models\Hotel;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class PackageExtrasSeeder extends Seeder
{
    public function run(): void
    {
        $packages = TourPackage::all();

        $stats = [
            'packages_with_hotel' => 0,
            'packages_with_restaurant' => 0,
            'hotels_associated' => 0,
            'restaurants_associated' => 0,
        ];

        foreach ($packages as $package) {
            $locationId = $package->location_id;

            if ($package->includes_hotel) {
                $hotels = Hotel::where('location_id', $locationId)->get();

                if ($hotels->isEmpty()) {
                    $hotelsNearby = Hotel::getHotelsNearby($locationId);
                    foreach ($hotelsNearby as $hotel) {
                        $package->hotels()->syncWithoutDetaching($hotel->id);
                        $stats['hotels_associated']++;
                    }
                } else {
                    foreach ($hotels as $hotel) {
                        $package->hotels()->syncWithoutDetaching($hotel->id);
                        $stats['hotels_associated']++;
                    }
                }

                if ($package->hotels()->count() > 0) {
                    $stats['packages_with_hotel']++;
                }
            }

            if ($package->includes_food) {
                $restaurants = Restaurant::where('location_id', $locationId)->get();

                if ($restaurants->isEmpty()) {
                    $restaurantsNearby = Restaurant::getRestaurantsNearby($locationId);
                    foreach ($restaurantsNearby as $restaurant) {
                        $package->restaurants()->syncWithoutDetaching($restaurant->id);
                        $stats['restaurants_associated']++;
                    }
                } else {
                    foreach ($restaurants as $restaurant) {
                        $package->restaurants()->syncWithoutDetaching($restaurant->id);
                        $stats['restaurants_associated']++;
                    }
                }

                if ($package->restaurants()->count() > 0) {
                    $stats['packages_with_restaurant']++;
                }
            }
        }

        $this->command->info("PackageExtrasSeeder completado:");
        $this->command->info("- Paquetes con hotel asociado: {$stats['packages_with_hotel']}");
        $this->command->info("- Paquetes con restaurante asociado: {$stats['packages_with_restaurant']}");
        $this->command->info("- Total asociaciones de hoteles: {$stats['hotels_associated']}");
        $this->command->info("- Total asociaciones de restaurantes: {$stats['restaurants_associated']}");
    }
}
