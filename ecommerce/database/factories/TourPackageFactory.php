<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Location;
use App\Models\TourPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

class TourPackageFactory extends Factory
{
    protected $model = TourPackage::class;

    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'location_id' => Location::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(3),
            'price' => fake()->randomFloat(2, 100, 2000),
            'duration_days' => fake()->numberBetween(1, 15),
            'includes_guide' => fake()->boolean(),
            'includes_food' => fake()->boolean(),
            'includes_hotel' => fake()->boolean(),
            'image_url' => fake()->imageUrl(800, 600, 'travel'),
            'available_slots' => fake()->numberBetween(1, 50),
            'status' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => false,
        ]);
    }

    public function withNoSlots(): static
    {
        return $this->state(fn (array $attributes) => [
            'available_slots' => 0,
        ]);
    }
}
