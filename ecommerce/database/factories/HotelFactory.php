<?php

namespace Database\Factories;

use App\Models\Hotel;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

class HotelFactory extends Factory
{
    protected $model = Hotel::class;

    public function definition(): array
    {
        return [
            'location_id' => Location::factory(),
            'nombre' => fake()->company() . ' Hotel',
            'estrellas' => fake()->numberBetween(1, 5),
            'direccion' => fake()->address(),
            'telefono' => fake()->phoneNumber(),
            'price_per_person' => fake()->randomFloat(2, 50, 500),
        ];
    }
}
