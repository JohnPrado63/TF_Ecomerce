<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    protected $model = Client::class;

    public function definition(): array
    {
        return [
            'user_id' => Usuario::factory(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'document_type' => fake()->randomElement(['DNI', 'Pasaporte']),
            'document_number' => fake()->numerify('########'),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'birth_date' => fake()->date(),
        ];
    }
}
