<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('package_restaurants', function (Blueprint $table) {
            $table->renameColumn('restaurante_id', 'restaurant_id');
        });
    }

    public function down(): void
    {
        Schema::table('package_restaurants', function (Blueprint $table) {
            $table->renameColumn('restaurant_id', 'restaurante_id');
        });
    }
};
