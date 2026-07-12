<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            LocationSeeder::class,
            TourPackageSeeder::class,
            TourGuideSeeder::class,
            HotelSeeder::class,
            RestaurantSeeder::class,
            PackageGuideSeeder::class,
            PackageExtrasSeeder::class,
            AdminUserSeeder::class,
            DestinationSeeder::class,
        ]);
    }
}