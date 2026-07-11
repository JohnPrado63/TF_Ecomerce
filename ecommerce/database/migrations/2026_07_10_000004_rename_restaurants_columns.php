<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->renameColumn('nombre', 'name');
            $table->renameColumn('tipo_comida', 'cuisine_type');
            $table->renameColumn('direccion', 'address');
        });
    }

    public function down(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->renameColumn('name', 'nombre');
            $table->renameColumn('cuisine_type', 'tipo_comida');
            $table->renameColumn('address', 'direccion');
        });
    }
};
