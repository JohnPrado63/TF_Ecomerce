<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            [
                'city'      => 'Huamanga',
                'region'    => 'Ayacucho',
                'address'   => 'Plaza Mayor de Huamanga',
                'latitude'  => -13.1588,
                'longitude' => -74.2236,
            ],
            [
                'city'      => 'Cangallo',
                'region'    => 'Ayacucho',
                'address'   => 'Aguas Turquesas de Millpu',
                'latitude'  => -13.5931,
                'longitude' => -74.4658,
            ],
            [
                'city'      => 'Vilcashuamán',
                'region'    => 'Ayacucho',
                'address'   => 'Plaza de Vilcashuamán',
                'latitude'  => -13.6572,
                'longitude' => -73.9458,
            ],
            [
                'city'      => 'Quinua',
                'region'    => 'Ayacucho',
                'address'   => 'Pampa de Ayacucho',
                'latitude'  => -13.0278,
                'longitude' => -74.1167,
            ],
            [
                'city'      => 'Huanta',
                'region'    => 'Ayacucho',
                'address'   => 'Ciudad de Huanta',
                'latitude'  => -12.9344,
                'longitude' => -74.2458,
            ],
            [
                'city'      => 'Sucre',
                'region'    => 'Ayacucho',
                'address'   => 'Centro histórico de Sucre',
                'latitude'  => -13.1950,
                'longitude' => -74.1900,
            ],
            [
                'city'      => 'Parinacochas',
                'region'    => 'Ayacucho',
                'address'   => 'Laguna Parinacochas',
                'latitude'  => -14.0200,
                'longitude' => -74.0900,
            ],
            [
                'city'      => 'Paucar del Sara Sara',
                'region'    => 'Ayacucho',
                'address'   => 'Capital de Paucar del Sara Sara',
                'latitude'  => -14.0111,
                'longitude' => -74.4100,
            ],
        ];

        foreach ($locations as $location) {
            Location::firstOrCreate(
                ['city' => $location['city'], 'region' => $location['region']],
                $location
            );
        }
    }
}