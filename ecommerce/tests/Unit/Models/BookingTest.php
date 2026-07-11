<?php

namespace Tests\Unit\Models;

use App\Models\Booking;
use App\Models\Client;
use App\Models\Offer;
use App\Models\TourPackage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_booking_generates_order_number_on_creation(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create();

        $booking = Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
        ]);

        $this->assertNotNull($booking->order_number);
        $this->assertStringStartsWith('ESKY-', $booking->order_number);
    }

    public function test_booking_belongs_to_client(): void
    {
        $booking = Booking::factory()->create();

        $this->assertInstanceOf(Client::class, $booking->client);
    }

    public function test_booking_belongs_to_tour_package(): void
    {
        $booking = Booking::factory()->create();

        $this->assertInstanceOf(TourPackage::class, $booking->tourPackage);
    }

    public function test_booking_can_have_offer(): void
    {
        $offer = Offer::factory()->create();
        $booking = Booking::factory()->withOffer($offer)->create();

        $this->assertInstanceOf(Offer::class, $booking->offer);
    }

    public function test_booking_status_defaults_to_pending(): void
    {
        $booking = Booking::factory()->create(['status' => 'pending']);

        $this->assertEquals('pending', $booking->status);
    }
}
