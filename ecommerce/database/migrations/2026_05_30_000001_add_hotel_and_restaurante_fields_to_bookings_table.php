<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->foreignId('hotel_id')->nullable()->constrained('hoteles')->onDelete('set null');
            $table->foreignId('restaurante_id')->nullable()->constrained('restaurantes')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['hotel_id']);
            $table->dropColumn('hotel_id');
            $table->dropForeign(['restaurante_id']);
            $table->dropColumn('restaurante_id');
        });
    }
};
