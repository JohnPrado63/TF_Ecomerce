<?php

namespace Database\Factories;

use App\Models\Location;
use App\Models\Restaurante;
use Illuminate\Database\Eloquent\Factories\Factory;

class RestauranteFactory extends Factory
{
    protected $model = Restaurante::class;

    public function definition(): array
    {
        return [
            'location_id' => Location::factory(),
            'nombre' => fake()->company() . ' Restaurant',
            'tipo_comida' => fake()->randomElement(['Criolla', 'Marina', 'China', 'Italiana', 'Peruana']),
            'direccion' => fake()->address(),
            'price_per_person' => fake()->randomFloat(2, 20, 200),
        ];
    }
}
