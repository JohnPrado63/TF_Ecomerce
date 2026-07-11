<?php

namespace Database\Seeders;

use App\Models\TourPackage;
use App\Models\TourGuide;
use Illuminate\Database\Seeder;

class PackageGuideSeeder extends Seeder
{
    public function run(): void
    {
        $packages = TourPackage::where('includes_guide', true)->get();
        $guides = TourGuide::all();

        if ($guides->isEmpty()) {
            $this->command->warn('No se encontraron guías. Omintiendo asociación de guías a paquetes.');
            return;
        }

        if ($packages->isEmpty()) {
            $this->command->warn('No se encontraron paquetes con guías. Omintiendo.');
            return;
        }

        $count = 0;
        foreach ($packages as $package) {
            foreach ($guides as $guide) {
                $package->tourGuides()->syncWithoutDetaching($guide->id);
                $count++;
            }
        }

        $this->command->info("Asociados {$guides->count()} guías a {$packages->count()} paquetes ({$count} relaciones).");
    }
}
