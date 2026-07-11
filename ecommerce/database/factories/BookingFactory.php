<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Client;
use App\Models\TourGuide;
use App\Models\Hotel;
use App\Models\Offer;
use App\Models\Restaurant;
use App\Models\TourPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition(): array
    {
        return [
            'client_id' => Client::factory(),
            'package_id' => TourPackage::factory(),
            'booking_date' => fake()->dateTimeBetween('+1 week', '+3 months'),
            'persons_quantity' => fake()->numberBetween(1, 10),
            'include_hotel' => fake()->boolean(),
            'hotel_id' => null,
            'guide_id' => null,
            'offer_id' => null,
            'discount_amount' => 0,
            'restaurant_id' => null,
            'total_amount' => fake()->randomFloat(2, 200, 5000),
            'status' => 'pending',
            'order_number' => 'ESKY-' . strtoupper(substr(uniqid(), -6)),
        ];
    }

    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
        ]);
    }

    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
        ]);
    }

    public function withHotel(Hotel $hotel = null): static
    {
        return $this->state(fn (array $attributes) => [
            'include_hotel' => true,
            'hotel_id' => $hotel?->id ?? Hotel::factory(),
        ]);
    }

    public function withGuide(TourGuide $guide = null): static
    {
        return $this->state(fn (array $attributes) => [
            'guide_id' => $guide?->id ?? TourGuide::factory(),
        ]);
    }

    public function withOffer(Offer $offer = null): static
    {
        return $this->state(fn (array $attributes) => [
            'offer_id' => $offer?->id ?? Offer::factory(),
        ]);
    }

    public function withRestaurant(Restaurant $restaurant = null): static
    {
        return $this->state(fn (array $attributes) => [
            'restaurant_id' => $restaurant?->id ?? Restaurant::factory(),
        ]);
    }
}
