<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tour_guides', function (Blueprint $table) {
            $table->renameColumn('nombre', 'first_name');
            $table->renameColumn('apellido', 'last_name');
            $table->renameColumn('idiomas', 'languages');
            $table->renameColumn('telefono', 'phone');
            $table->renameColumn('credencial_nro', 'credential_number');
        });
    }

    public function down(): void
    {
        Schema::table('tour_guides', function (Blueprint $table) {
            $table->renameColumn('first_name', 'nombre');
            $table->renameColumn('last_name', 'apellido');
            $table->renameColumn('languages', 'idiomas');
            $table->renameColumn('phone', 'telefono');
            $table->renameColumn('credential_number', 'credencial_nro');
        });
    }
};
