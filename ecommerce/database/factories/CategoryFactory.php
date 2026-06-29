<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        $categories = ['Cultural', 'Aventura', 'Gastronomia', 'Ecologico', 'Historico', 'Playa', 'Montaña'];
        $name = fake()->unique()->randomElement($categories) . ' ' . fake()->numberBetween(1, 100);

        return [
            'name' => $name,
            'description' => fake()->sentence(10),
        ];
    }
}
