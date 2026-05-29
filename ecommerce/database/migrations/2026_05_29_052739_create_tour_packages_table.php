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
        Schema::create('tour_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('location_id')->constrained('locations')->onDelete('cascade');
            $table->string('title', 150);
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('duration_days');
            $table->boolean('includes_guide')->default(false);
            $table->boolean('includes_food')->default(false);
            $table->boolean('includes_hotel')->default(false);
            $table->string('image_url', 255)->nullable();
            $table->integer('available_slots')->default(0);
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_packages');
    }
};
