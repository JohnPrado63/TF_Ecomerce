<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transport_companies', function (Blueprint $table) {
            $table->renameColumn('nombre_empresa', 'company_name');
            $table->renameColumn('tipo_transporte', 'transport_type');
            $table->renameColumn('contacto', 'contact');
        });

        Schema::table('package_transports', function (Blueprint $table) {
            $table->renameColumn('detalles_ruta', 'route_details');
        });
    }

    public function down(): void
    {
        Schema::table('transport_companies', function (Blueprint $table) {
            $table->renameColumn('company_name', 'nombre_empresa');
            $table->renameColumn('transport_type', 'tipo_transporte');
            $table->renameColumn('contact', 'contacto');
        });

        Schema::table('package_transports', function (Blueprint $table) {
            $table->renameColumn('route_details', 'detalles_ruta');
        });
    }
};
