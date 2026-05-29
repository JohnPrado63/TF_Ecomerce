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
        Schema::create('package_transportes', function (Blueprint $table) {
            $table->foreignId('package_id')->constrained('tour_packages')->onDelete('cascade');
            $table->foreignId('empresa_transporte_id')->constrained('empresas_transporte')->onDelete('cascade');
            $table->text('detalles_ruta')->nullable();
            $table->primary(['package_id', 'empresa_transporte_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_transportes');
    }
};
