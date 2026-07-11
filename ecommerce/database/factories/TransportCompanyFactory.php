<?php

namespace Database\Factories;

use App\Models\Location;
use App\Models\TransportCompany;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransportCompanyFactory extends Factory
{
    protected $model = TransportCompany::class;

    public function definition(): array
    {
        return [
            'location_id' => Location::factory(),
            'company_name' => fake()->company() . ' Transport',
            'transport_type' => fake()->randomElement(['Bus', 'Van', 'Minivan', 'Automóvil']),
            'contact' => fake()->phoneNumber(),
        ];
    }
}
