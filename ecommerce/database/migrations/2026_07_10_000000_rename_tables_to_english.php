<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::rename('usuarios', 'users');
        Schema::rename('guias_turisticos', 'tour_guides');
        Schema::rename('hoteles', 'hotels');
        Schema::rename('restaurantes', 'restaurants');
        Schema::rename('empresas_transporte', 'transport_companies');
        Schema::rename('package_hoteles', 'package_hotels');
        Schema::rename('package_guias', 'package_tour_guides');
        Schema::rename('package_restaurantes', 'package_restaurants');
        Schema::rename('package_transportes', 'package_transports');
    }

    public function down(): void
    {
        Schema::rename('users', 'usuarios');
        Schema::rename('tour_guides', 'guias_turisticos');
        Schema::rename('hotels', 'hoteles');
        Schema::rename('restaurants', 'restaurantes');
        Schema::rename('transport_companies', 'empresas_transporte');
        Schema::rename('package_hotels', 'package_hoteles');
        Schema::rename('package_tour_guides', 'package_guias');
        Schema::rename('package_restaurants', 'package_restaurantes');
        Schema::rename('package_transports', 'package_transportes');
    }
};
