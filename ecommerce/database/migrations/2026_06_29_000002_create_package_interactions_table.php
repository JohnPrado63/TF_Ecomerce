<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('package_interactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained('tour_packages')->onDelete('cascade');
            $table->foreignId('client_id')->nullable()->constrained('clients')->onDelete('cascade');
            $table->string('session_id', 100)->nullable();
            $table->enum('type', ['view', 'click', 'hover', 'save', 'compare']);
            $table->integer('duration_seconds')->nullable();
            $table->text('search_query')->nullable();
            $table->timestamps();

            $table->index(['package_id', 'type']);
            $table->index(['client_id', 'created_at']);
            $table->index('session_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_interactions');
    }
};
