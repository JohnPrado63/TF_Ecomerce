<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Client;
use App\Models\Preference;
use App\Models\TourPackage;
use App\Models\Usuario;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TravelMatchTest extends TestCase
{
    use RefreshDatabase;

    public function test_travel_match_page_loads_for_authenticated_user(): void
    {
        $user = Usuario::factory()->create();

        $response = $this->actingAs($user)->get('/travel-match');

        $response->assertStatus(200);
    }

    public function test_unauthenticated_user_redirected_to_login(): void
    {
        $response = $this->get('/travel-match');

        $response->assertRedirect('/login');
    }

    public function test_user_without_preferences_gets_empty_recommendations(): void
    {
        $user = Usuario::factory()->create();
        Client::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get('/travel-match');

        $response->assertStatus(200);
    }

    public function test_user_with_preferences_gets_recommendations(): void
    {
        $user = Usuario::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        Preference::factory()->create([
            'client_id' => $client->id,
            'preferred_category' => 'Cultural',
            'preferred_budget' => 'medio',
        ]);
        $culturalCategory = Category::factory()->create(['name' => 'Cultural']);
        TourPackage::factory()->count(5)->create(['category_id' => $culturalCategory->id]);

        $response = $this->actingAs($user)->get('/travel-match');

        $response->assertStatus(200);
    }

    public function test_already_booked_packages_not_recommended(): void
    {
        $user = Usuario::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $package = TourPackage::factory()->create();
        Booking::factory()->create([
            'client_id' => $client->id,
            'package_id' => $package->id,
            'status' => 'confirmed',
        ]);

        $response = $this->actingAs($user)->get('/travel-match');

        $response->assertStatus(200);
    }

    public function test_user_can_update_preferences(): void
    {
        $user = Usuario::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->post('/preferences', [
            'preferred_budget' => 'premium',
            'preferred_duration' => 7,
            'preferred_category' => 'Aventura',
            'preferred_activity' => 'deportes',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('preferences', [
            'client_id' => $client->id,
            'preferred_budget' => 'premium',
        ]);
    }

    public function test_preferences_update_recalculates_recommendations(): void
    {
        $user = Usuario::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        Preference::factory()->create([
            'client_id' => $client->id,
            'preferred_category' => 'Cultural',
        ]);

        $response = $this->actingAs($user)->post('/preferences', [
            'preferred_budget' => 'economico',
            'preferred_duration' => 3,
            'preferred_category' => 'Ecologico',
            'preferred_activity' => 'naturaleza',
        ]);

        $response->assertSessionHas('success');
    }
}
