<?php

namespace Tests\Unit\Models;

use App\Models\Category;
use App\Models\Location;
use App\Models\TourPackage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TourPackageTest extends TestCase
{
    use RefreshDatabase;

    public function test_tour_package_can_be_created(): void
    {
        $package = TourPackage::factory()->create();

        $this->assertDatabaseHas('tour_packages', [
            'id' => $package->id,
        ]);
    }

    public function test_tour_package_belongs_to_category(): void
    {
        $package = TourPackage::factory()->create();

        $this->assertInstanceOf(Category::class, $package->category);
    }

    public function test_tour_package_belongs_to_location(): void
    {
        $package = TourPackage::factory()->create();

        $this->assertInstanceOf(Location::class, $package->location);
    }

    public function test_tour_package_has_many_bookings(): void
    {
        $package = TourPackage::factory()->create();

        $this->assertEmpty($package->bookings);
    }

    public function test_tour_package_has_many_reviews(): void
    {
        $package = TourPackage::factory()->create();

        $this->assertEmpty($package->reviews);
    }

    public function test_tour_package_inactive_scope(): void
    {
        TourPackage::factory()->count(3)->create(['status' => true]);
        TourPackage::factory()->count(2)->create(['status' => false]);

        $inactivePackages = TourPackage::where('status', false)->get();

        $this->assertCount(2, $inactivePackages);
    }
}
