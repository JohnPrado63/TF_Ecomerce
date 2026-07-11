<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->renameColumn('nombre', 'name');
            $table->renameColumn('estrellas', 'stars');
            $table->renameColumn('direccion', 'address');
            $table->renameColumn('telefono', 'phone');
        });
    }

    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->renameColumn('name', 'nombre');
            $table->renameColumn('stars', 'estrellas');
            $table->renameColumn('address', 'direccion');
            $table->renameColumn('phone', 'telefono');
        });
    }
};
