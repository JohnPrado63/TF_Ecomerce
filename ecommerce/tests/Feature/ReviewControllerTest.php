<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Client;
use App\Models\Payment;
use App\Models\Review;
use App\Models\TourPackage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_review_for_confirmed_booking(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create();
        $booking = Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'status' => 'confirmed',
        ]);

        $response = $this->actingAs($user)->post('/reviews', [
            'package_id' => $package->id,
            'rating' => 5,
            'comment' => 'Excelente tour!',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('reviews', [
            'client_id' => $client->id,
            'package_id' => $package->id,
            'rating' => 5,
        ]);
    }

    public function test_user_cannot_review_without_confirmed_booking(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create();
        Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($user)->post('/reviews', [
            'package_id' => $package->id,
            'rating' => 5,
            'comment' => 'Excelente tour!',
        ]);

        $response->assertSessionHas('error');
    }

    public function test_user_cannot_review_same_package_twice(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create();
        Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'status' => 'confirmed',
        ]);
        Review::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
        ]);

        $response = $this->actingAs($user)->post('/reviews', [
            'package_id' => $package->id,
            'rating' => 4,
            'comment' => 'Another review',
        ]);

        $response->assertSessionHas('error');
    }

    public function test_user_can_delete_own_review(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $review = Review::factory()->create(['client_id' => $client->id]);

        $response = $this->actingAs($user)->delete("/reviews/{$review->id}");

        $response->assertSessionHas('success');
        $this->assertDatabaseMissing('reviews', ['id' => $review->id]);
    }

    public function test_user_cannot_delete_other_users_review(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $otherClient = Client::factory()->create(['user_id' => $otherUser->id]);
        $review = Review::factory()->create(['client_id' => $otherClient->id]);

        $response = $this->actingAs($user)->delete("/reviews/{$review->id}");

        $response->assertStatus(404);
    }

    public function test_rating_must_be_between_1_and_5(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create();
        Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'status' => 'confirmed',
        ]);

        $response = $this->actingAs($user)->post('/reviews', [
            'package_id' => $package->id,
            'rating' => 6,
            'comment' => 'Invalid rating',
        ]);

        $response->assertSessionHasErrors('rating');
    }

    public function test_unauthenticated_user_cannot_create_review(): void
    {
        $package = TourPackage::factory()->create();

        $response = $this->post('/reviews', [
            'package_id' => $package->id,
            'rating' => 5,
            'comment' => 'Test',
        ]);

        $response->assertRedirect('/login');
    }
}
