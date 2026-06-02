<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GuiaTuristico;

class GuiaTuristicoSeeder extends Seeder
{
    public function run(): void
    {
        $guias = [
            [
                'nombre'        => 'Carlos',
                'apellido'      => 'Quispe Huamán',
                'idiomas'       => 'Español, Inglés',
                'telefono'      => '966123456',
                'credencial_nro'=> 'GTA-001',
            ],
            [
                'nombre'        => 'María',
                'apellido'      => 'Sulca Flores',
                'idiomas'       => 'Español, Quechua',
                'telefono'      => '955234567',
                'credencial_nro'=> 'GTA-002',
            ],
            [
                'nombre'        => 'Roberto',
                'apellido'      => 'Palomino Cruz',
                'idiomas'       => 'Español, Inglés, Quechua',
                'telefono'      => '944345678',
                'credencial_nro'=> 'GTA-003',
            ],
        ];

        foreach ($guias as $guia) {
            GuiaTuristico::create($guia);
        }
    }
}