<?php

namespace Database\Factories;

use App\Models\Location;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

class RestaurantFactory extends Factory
{
    protected $model = Restaurant::class;

    public function definition(): array
    {
        return [
            'location_id' => Location::factory(),
            'name' => fake()->company() . ' Restaurant',
            'cuisine_type' => fake()->randomElement(['Criolla', 'Marina', 'China', 'Italiana', 'Peruana']),
            'address' => fake()->address(),
            'price_per_person' => fake()->randomFloat(2, 20, 200),
        ];
    }
}
