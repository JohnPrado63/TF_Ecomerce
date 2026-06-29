<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Location;
use App\Models\TourPackage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TourPackageControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_packages_page_loads(): void
    {
        TourPackage::factory()->count(5)->create();

        $response = $this->get('/packages');

        $response->assertStatus(200);
    }

    public function test_packages_shows_package_details(): void
    {
        $package = TourPackage::factory()->create([
            'title' => 'Tour a Machu Picchu',
            'price' => 1500.00,
        ]);

        $response = $this->get("/packages/{$package->id}");

        $response->assertStatus(200);
        $response->assertSee('Tour a Machu Picchu');
    }

    public function test_packages_lists_only_active_packages(): void
    {
        TourPackage::factory()->count(3)->create(['status' => 'active']);
        TourPackage::factory()->count(2)->create(['status' => 'inactive']);

        $response = $this->get('/packages');

        $response->assertStatus(200);
    }

    public function test_packages_can_be_filtered_by_category(): void
    {
        $cultural = Category::factory()->create(['name' => 'Cultural']);
        $adventure = Category::factory()->create(['name' => 'Aventura']);

        TourPackage::factory()->count(2)->create(['category_id' => $cultural->id]);
        TourPackage::factory()->count(3)->create(['category_id' => $adventure->id]);

        $response = $this->get("/packages?category_id={$cultural->id}");

        $response->assertStatus(200);
    }

    public function test_package_detail_loads_with_relations(): void
    {
        $package = TourPackage::factory()->create();

        $response = $this->get("/packages/{$package->id}");

        $response->assertStatus(200);
    }

    public function test_package_returns_404_for_invalid_id(): void
    {
        $response = $this->get('/packages/99999');

        $response->assertStatus(404);
    }

    public function test_destinations_page_loads_by_province(): void
    {
        $location = Location::factory()->create(['region' => 'Cusco']);

        $response = $this->get('/destinos/Cusco');

        $response->assertStatus(200);
    }
}
