<?php

namespace Database\Factories;

use App\Models\EmpresaTransporte;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmpresaTransporteFactory extends Factory
{
    protected $model = EmpresaTransporte::class;

    public function definition(): array
    {
        return [
            'location_id' => Location::factory(),
            'nombre_empresa' => fake()->company() . ' Transport',
            'tipo_transporte' => fake()->randomElement(['Bus', 'Van', 'Minivan', 'Automóvil']),
            'contacto' => fake()->phoneNumber(),
        ];
    }
}
