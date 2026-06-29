<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Recommendation;
use App\Models\TourPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecommendationFactory extends Factory
{
    protected $model = Recommendation::class;

    public function definition(): array
    {
        return [
            'client_id' => Client::factory(),
            'package_id' => TourPackage::factory(),
            'score' => fake()->randomFloat(2, 0, 100),
            'viewed' => false,
        ];
    }

    public function viewed(): static
    {
        return $this->state(fn (array $attributes) => [
            'viewed' => true,
        ]);
    }
}
