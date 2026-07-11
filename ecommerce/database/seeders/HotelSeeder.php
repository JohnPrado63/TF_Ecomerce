<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hotel;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        $hotels = [
            [
                'location_id'       => 1,
                'name'            => 'Hotel Plaza Ayacucho',
                'stars'         => 4,
                'address'         => 'Jr. 9 de Diciembre 184, Huamanga',
                'phone'          => '066312345',
                'price_per_person'  => 120.00,
            ],
            [
                'location_id'       => 1,
                'name'            => 'Hostal Santa Rosa',
                'stars'         => 3,
                'address'         => 'Jr. Lima 166, Huamanga',
                'phone'          => '066323456',
                'price_per_person'  => 80.00,
            ],
            [
                'location_id'       => 3,
                'name'            => 'Albergue Vilcashuamán',
                'stars'         => 2,
                'address'         => 'Plaza Principal, Vilcashuamán',
                'phone'          => '966456789',
                'price_per_person'  => 65.00,
            ],
        ];

        foreach ($hotels as $hotel) {
            Hotel::create($hotel);
        }
    }
}