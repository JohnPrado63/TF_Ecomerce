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
            $table->foreignId('guia_turistico_id')->nullable()->constrained('guias_turisticos')->onDelete('set null');
            $table->foreignId('empresa_transporte_id')->nullable()->constrained('empresas_transporte')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['guia_turistico_id']);
            $table->dropColumn('guia_turistico_id');
            $table->dropForeign(['empresa_transporte_id']);
            $table->dropColumn('empresa_transporte_id');
        });
    }
};
