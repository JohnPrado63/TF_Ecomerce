<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Restaurante;

class RestauranteSeeder extends Seeder
{
    public function run(): void
    {
        $restaurantes = [
            [
                'location_id'       => 1,
                'nombre'            => 'Restaurante La Casona',
                'tipo_comida'       => 'Gastronomía ayacuchana',
                'direccion'         => 'Jr. 9 de Diciembre 251, Huamanga',
                'price_per_person'  => 45.00,
            ],
            [
                'location_id'       => 2,
                'nombre'            => 'Restaurante Millpu',
                'tipo_comida'       => 'Comida regional',
                'direccion'         => 'Av. Turismo 45, Cangallo',
                'price_per_person'  => 35.00,
            ],
            [
                'location_id'       => 3,
                'nombre'            => 'Restaurante Inka Wasi',
                'tipo_comida'       => 'Comida andina',
                'direccion'         => 'Plaza Principal, Vilcashuamán',
                'price_per_person'  => 40.00,
            ],
            [
                'location_id'       => 4,
                'nombre'            => 'Restaurante El Quinual',
                'tipo_comida'       => 'Picantería tradicional',
                'direccion'         => 'Jr. Comercio 130, Quinua',
                'price_per_person'  => 38.00,
            ],
        ];

        foreach ($restaurantes as $restaurante) {
            Restaurante::create($restaurante);
        }
    }
}
