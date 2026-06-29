<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Preference;
use Illuminate\Database\Eloquent\Factories\Factory;

class PreferenceFactory extends Factory
{
    protected $model = Preference::class;

    public function definition(): array
    {
        return [
            'client_id' => Client::factory(),
            'preferred_budget' => fake()->randomElement(['economico', 'medio', 'premium']),
            'preferred_duration' => fake()->numberBetween(1, 15),
            'preferred_category' => fake()->randomElement(['Cultural', 'Aventura', 'Gastronomia', 'Ecologico']),
            'preferred_activity' => fake()->randomElement(['visitas', 'deportes', 'gastronomia', 'naturaleza']),
        ];
    }
}
