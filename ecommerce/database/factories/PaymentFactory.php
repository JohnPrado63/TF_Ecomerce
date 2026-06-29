<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'amount' => fake()->randomFloat(2, 100, 3000),
            'method' => fake()->randomElement(['yape', 'plin', 'efectivo']),
            'status' => 'pending',
            'voucher_path' => null,
            'notes' => null,
        ];
    }

    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'verified',
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
            'notes' => fake()->sentence(),
        ]);
    }

    public function mercadopago(): static
    {
        return $this->state(fn (array $attributes) => [
            'method' => 'mercadopago',
        ]);
    }

    public function manual(): static
    {
        return $this->state(fn (array $attributes) => [
            'method' => fake()->randomElement(['yape', 'plin', 'efectivo']),
        ]);
    }
}
