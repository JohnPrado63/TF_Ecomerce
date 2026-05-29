<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hotel;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        $hoteles = [
            [
                'location_id' => 1,
                'nombre'      => 'Hotel Plaza Ayacucho',
                'estrellas'   => 4,
                'direccion'   => 'Jr. 9 de Diciembre 184, Huamanga',
                'telefono'    => '066312345',
            ],
            [
                'location_id' => 1,
                'nombre'      => 'Hostal Santa Rosa',
                'estrellas'   => 3,
                'direccion'   => 'Jr. Lima 166, Huamanga',
                'telefono'    => '066323456',
            ],
            [
                'location_id' => 3,
                'nombre'      => 'Albergue Vilcashuamán',
                'estrellas'   => 2,
                'direccion'   => 'Plaza Principal, Vilcashuamán',
                'telefono'    => '966456789',
            ],
        ];

        foreach ($hoteles as $hotel) {
            Hotel::create($hotel);
        }
    }
}