<?php

namespace Database\Factories;

use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

class LocationFactory extends Factory
{
    protected $model = Location::class;

    public function definition(): array
    {
        return [
            'city' => fake()->city(),
            'region' => fake()->state(),
            'address' => fake()->address(),
            'latitude' => fake()->latitude(-18.5, -0.5),
            'longitude' => fake()->longitude(-81.5, -68.5),
        ];
    }
}
