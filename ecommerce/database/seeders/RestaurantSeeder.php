<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Restaurant;

class RestaurantSeeder extends Seeder
{
    public function run(): void
    {
        $restaurants = [
            [
                'location_id'       => 1,
                'name'            => 'Restaurante La Casona',
                'cuisine_type'       => 'Gastronomía ayacuchana',
                'address'         => 'Jr. 9 de Diciembre 251, Huamanga',
                'price_per_person'  => 45.00,
            ],
            [
                'location_id'       => 2,
                'name'            => 'Restaurante Millpu',
                'cuisine_type'       => 'Comida regional',
                'address'         => 'Av. Turismo 45, Cangallo',
                'price_per_person'  => 35.00,
            ],
            [
                'location_id'       => 3,
                'name'            => 'Restaurante Inka Wasi',
                'cuisine_type'       => 'Comida andina',
                'address'         => 'Plaza Principal, Vilcashuamán',
                'price_per_person'  => 40.00,
            ],
            [
                'location_id'       => 4,
                'name'            => 'Restaurante El Quinual',
                'cuisine_type'       => 'Picantería tradicional',
                'address'         => 'Jr. Comercio 130, Quinua',
                'price_per_person'  => 38.00,
            ],
        ];

        foreach ($restaurants as $restaurant) {
            Restaurant::create($restaurant);
        }
    }
}
