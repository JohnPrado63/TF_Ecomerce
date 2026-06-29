<?php

namespace Database\Factories;

use App\Models\Destination;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

class DestinationFactory extends Factory
{
    protected $model = Destination::class;

    public function definition(): array
    {
        return [
            'location_id' => Location::factory(),
            'name' => fake()->city(),
            'slug' => fake()->slug(),
            'description' => fake()->paragraph(3),
            'summary' => fake()->sentence(),
            'style' => fake()->randomElement(['modern', 'classic', 'rustic', 'adventure']),
            'recommendation' => fake()->numberBetween(1, 100),
            'sites' => [
                ['name' => fake()->sentence(2), 'description' => fake()->sentence()],
                ['name' => fake()->sentence(2), 'description' => fake()->sentence()],
            ],
        ];
    }
}
