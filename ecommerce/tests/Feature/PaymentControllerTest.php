<?php

namespace Tests\Feature;

use App\Models\Client;
use App\Models\Payment;
use App\Models\TourPackage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_payment_page(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create();
        $booking = \App\Models\Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
        ]);

        $response = $this->actingAs($user)->get("/payments/{$booking->id}");

        $response->assertStatus(200);
    }

    public function test_user_cannot_view_other_users_payment(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $otherClient = Client::factory()->create(['user_id' => $otherUser->id]);
        $booking = \App\Models\Booking::factory()->create(['client_id' => $otherClient->id]);

        $response = $this->actingAs($user)->get("/payments/{$booking->id}");

        $response->assertStatus(404);
    }

    public function test_payment_creates_pending_record_on_first_access(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create();
        $booking = \App\Models\Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'total_amount' => 500.00,
        ]);

        $this->actingAs($user)->get("/payments/{$booking->id}");

        $this->assertDatabaseHas('payments', [
            'booking_id' => $booking->id,
            'status' => 'pending',
        ]);
    }

    public function test_user_can_submit_manual_payment_voucher(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create();
        $booking = \App\Models\Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'total_amount' => 500.00,
        ]);

        $response = $this->actingAs($user)->post('/payments', [
            'booking_id' => $booking->id,
            'method' => 'yape',
        ]);

        $response->assertSessionHas('success');
    }

    public function test_admin_can_verify_payment(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create(['available_slots' => 10]);
        $booking = \App\Models\Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'status' => 'pending',
            'persons_quantity' => 2,
        ]);
        $payment = Payment::factory()->create([
            'booking_id' => $booking->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($admin)->post("/admin/payments/{$payment->id}/verify", [
            'status' => 'verified',
        ]);

        $response->assertSessionHas('success');
        $this->assertEquals('verified', $payment->fresh()->status);
        $this->assertEquals('confirmed', $booking->fresh()->status);
    }

    public function test_verified_payment_decrements_package_slots(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create(['available_slots' => 10]);
        $booking = \App\Models\Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'status' => 'pending',
            'persons_quantity' => 3,
        ]);
        $payment = Payment::factory()->create([
            'booking_id' => $booking->id,
            'status' => 'pending',
        ]);

        $this->actingAs($admin)->post("/admin/payments/{$payment->id}/verify", [
            'status' => 'verified',
        ]);

        $this->assertEquals(7, $package->fresh()->available_slots);
    }

    public function test_admin_can_reject_payment(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create(['available_slots' => 10]);
        $booking = \App\Models\Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'status' => 'pending',
            'persons_quantity' => 2,
        ]);
        $payment = Payment::factory()->create([
            'booking_id' => $booking->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($admin)->post("/admin/payments/{$payment->id}/verify", [
            'status' => 'rejected',
        ]);

        $response->assertSessionHas('success');
        $this->assertEquals('rejected', $payment->fresh()->status);
        $this->assertEquals('cancelled', $booking->fresh()->status);
    }
}
