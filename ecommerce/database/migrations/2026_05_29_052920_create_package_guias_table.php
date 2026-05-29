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
        Schema::create('package_guias', function (Blueprint $table) {
            $table->foreignId('package_id')->constrained('tour_packages')->onDelete('cascade');
            $table->foreignId('guia_id')->constrained('guias_turisticos')->onDelete('cascade');
            $table->primary(['package_id', 'guia_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_guias');
    }
};
