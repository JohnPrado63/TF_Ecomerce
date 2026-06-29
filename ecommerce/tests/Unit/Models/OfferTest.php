<?php

namespace Tests\Unit\Models;

use App\Models\Offer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OfferTest extends TestCase
{
    use RefreshDatabase;

    public function test_offer_is_valid_returns_true_when_active_and_within_dates(): void
    {
        $offer = Offer::factory()->create([
            'active' => true,
            'start_date' => now()->subDay(),
            'end_date' => now()->addDay(),
        ]);

        $this->assertTrue($offer->isValid());
    }

    public function test_offer_is_valid_returns_false_when_inactive(): void
    {
        $offer = Offer::factory()->create([
            'active' => false,
            'start_date' => now()->subDay(),
            'end_date' => now()->addDay(),
        ]);

        $this->assertFalse($offer->isValid());
    }

    public function test_offer_is_valid_returns_false_when_expired(): void
    {
        $offer = Offer::factory()->expired()->create();

        $this->assertFalse($offer->isValid());
    }

    public function test_offer_is_valid_returns_false_when_not_yet_started(): void
    {
        $offer = Offer::factory()->future()->create();

        $this->assertFalse($offer->isValid());
    }

    public function test_apply_discount_calculates_correctly(): void
    {
        $offer = Offer::factory()->create(['discount_percentage' => 20]);

        $price = 100.00;
        $discountedPrice = $offer->applyDiscount($price);

        $this->assertEquals(80.00, $discountedPrice);
    }

    public function test_apply_discount_rounds_to_two_decimals(): void
    {
        $offer = Offer::factory()->create(['discount_percentage' => 15]);

        $price = 99.99;
        $discountedPrice = $offer->applyDiscount($price);

        $this->assertEquals(84.99, $discountedPrice);
    }
}
