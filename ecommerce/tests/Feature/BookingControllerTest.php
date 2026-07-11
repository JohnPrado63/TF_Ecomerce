<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Client;
use App\Models\Hotel;
use App\Models\Payment;
use App\Models\TourPackage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_redirected_to_login(): void
    {
        $package = TourPackage::factory()->create();

        $response = $this->get("/bookings/create?package_id={$package->id}");

        $response->assertRedirect('/login');
    }

    public function test_authenticated_user_can_view_booking_form(): void
    {
        $user = User::factory()->create();
        $package = TourPackage::factory()->create();

        $response = $this->actingAs($user)->get("/bookings/create?package_id={$package->id}");

        $response->assertStatus(200);
    }

    public function test_user_can_create_booking(): void
    {
        $user = User::factory()->create();
        Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create(['available_slots' => 10]);

        $response = $this->actingAs($user)->post('/bookings', [
            'package_id' => $package->id,
            'booking_date' => now()->addWeek()->format('Y-m-d'),
            'persons_quantity' => 2,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('bookings', [
            'package_id' => $package->id,
            'persons_quantity' => 2,
        ]);
    }

    public function test_booking_fails_when_no_slots_available(): void
    {
        $user = User::factory()->create();
        Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create(['available_slots' => 0]);

        $response = $this->actingAs($user)->post('/bookings', [
            'package_id' => $package->id,
            'booking_date' => now()->addWeek()->format('Y-m-d'),
            'persons_quantity' => 2,
        ]);

        $response->assertSessionHas('error');
    }

    public function test_booking_fails_when_requesting_more_slots_than_available(): void
    {
        $user = User::factory()->create();
        Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create(['available_slots' => 5]);

        $response = $this->actingAs($user)->post('/bookings', [
            'package_id' => $package->id,
            'booking_date' => now()->addWeek()->format('Y-m-d'),
            'persons_quantity' => 10,
        ]);

        $response->assertSessionHas('error');
    }

    public function test_user_can_view_their_bookings(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        Booking::factory()->count(3)->create(['client_id' => $client->id]);

        $response = $this->actingAs($user)->get('/bookings');

        $response->assertStatus(200);
    }

    public function test_user_cannot_view_other_users_bookings(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $otherClient = Client::factory()->create(['user_id' => $otherUser->id]);
        $booking = Booking::factory()->create(['client_id' => $otherClient->id]);

        $response = $this->actingAs($user)->get("/bookings/{$booking->id}");

        $response->assertStatus(404);
    }

    public function test_user_can_cancel_pending_booking(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create(['available_slots' => 10]);
        $booking = Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'status' => 'pending',
            'persons_quantity' => 2,
        ]);

        $response = $this->actingAs($user)->delete("/bookings/{$booking->id}");

        $response->assertSessionHas('success');
        $this->assertEquals('cancelled', $booking->fresh()->status);
    }

    public function test_user_cannot_cancel_booking_with_verified_payment(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $booking = Booking::factory()->create([
            'client_id' => $client->id,
            'status' => 'confirmed',
        ]);
        Payment::factory()->create([
            'booking_id' => $booking->id,
            'status' => 'verified',
        ]);

        $response = $this->actingAs($user)->delete("/bookings/{$booking->id}");

        $response->assertSessionHas('error');
    }

    public function test_booking_increments_slots_when_cancelled(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create(['available_slots' => 8]);
        $booking = Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'status' => 'pending',
            'persons_quantity' => 2,
        ]);

        $this->actingAs($user)->delete("/bookings/{$booking->id}");

        $this->assertEquals(10, $package->fresh()->available_slots);
    }
}
