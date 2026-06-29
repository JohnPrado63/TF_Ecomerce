<?php

namespace Tests\Unit\Models;

use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    public function test_payment_belongs_to_booking(): void
    {
        $payment = Payment::factory()->create();

        $this->assertInstanceOf(Booking::class, $payment->booking);
    }

    public function test_payment_status_defaults_to_pending(): void
    {
        $payment = Payment::factory()->create(['status' => 'pending']);

        $this->assertEquals('pending', $payment->status);
    }

    public function test_payment_can_be_verified(): void
    {
        $payment = Payment::factory()->verified()->create();

        $this->assertEquals('verified', $payment->status);
    }

    public function test_payment_can_be_rejected(): void
    {
        $payment = Payment::factory()->rejected()->create();

        $this->assertEquals('rejected', $payment->status);
    }

    public function test_payment_has_valid_methods(): void
    {
        $validMethods = ['yape', 'plin', 'efectivo'];

        $payment = Payment::factory()->create(['method' => 'yape']);

        $this->assertContains($payment->method, $validMethods);
    }
}
