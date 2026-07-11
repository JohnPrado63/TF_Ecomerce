<?php

namespace Database\Factories;

use App\Models\TourGuide;
use Illuminate\Database\Eloquent\Factories\Factory;

class TourGuideFactory extends Factory
{
    protected $model = TourGuide::class;

    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'languages' => fake()->randomElements(['Español', 'Inglés', 'Portugués', 'Francés'], 2),
            'phone' => fake()->phoneNumber(),
            'credential_number' => 'CDL-' . fake()->numerify('######'),
        ];
    }
}
