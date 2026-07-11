<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TourGuide;

class TourGuideSeeder extends Seeder
{
    public function run(): void
    {
        $guides = [
            [
                'first_name'        => 'Carlos',
                'last_name'      => 'Quispe Huamán',
                'languages'       => 'Español, Inglés',
                'phone'      => '966123456',
                'credential_number'=> 'GTA-001',
            ],
            [
                'first_name'        => 'María',
                'last_name'      => 'Sulca Flores',
                'languages'       => 'Español, Quechua',
                'phone'      => '955234567',
                'credential_number'=> 'GTA-002',
            ],
            [
                'first_name'        => 'Roberto',
                'last_name'      => 'Palomino Cruz',
                'languages'       => 'Español, Inglés, Quechua',
                'phone'      => '944345678',
                'credential_number'=> 'GTA-003',
            ],
        ];

        foreach ($guides as $guide) {
            TourGuide::create($guide);
        }
    }
}
