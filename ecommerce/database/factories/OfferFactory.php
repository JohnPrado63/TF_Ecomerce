<?php

namespace Database\Factories;

use App\Models\Offer;
use Illuminate\Database\Eloquent\Factories\Factory;

class OfferFactory extends Factory
{
    protected $model = Offer::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(2),
            'slug' => fake()->slug(3),
            'details' => fake()->sentence(),
            'benefits' => json_encode([fake()->sentence(), fake()->sentence()]),
            'discount_percentage' => fake()->numberBetween(5, 50),
            'start_date' => now()->subDay(),
            'end_date' => now()->addMonth(),
            'active' => true,
            'code' => strtoupper(fake()->lexify('??????')),
            'applicable_packages' => null,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'active' => false,
        ]);
    }

    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_date' => now()->subMonth(),
            'end_date' => now()->subDay(),
        ]);
    }

    public function future(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_date' => now()->addWeek(),
            'end_date' => now()->addMonth(),
        ]);
    }
}
