<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Cultural e Histórico',    'description' => 'Visitas a sitios arqueológicos e históricos'],
            ['name' => 'Aventura y Naturaleza',   'description' => 'Trekking, cascadas y paisajes naturales'],
            ['name' => 'Gastronomía',             'description' => 'Experiencias culinarias locales'],
            ['name' => 'Religioso',               'description' => 'Visitas a iglesias y festividades religiosas'],
            ['name' => 'Ecoturismo',              'description' => 'Turismo sostenible y contacto con la naturaleza'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']],
                $category
            );
        }
    }
}