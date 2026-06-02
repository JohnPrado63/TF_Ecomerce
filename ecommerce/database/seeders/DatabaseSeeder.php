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
            GuiaTuristicoSeeder::class,
            HotelSeeder::class,
            RestauranteSeeder::class,
            PackageExtrasSeeder::class,
        ]);
    }
}