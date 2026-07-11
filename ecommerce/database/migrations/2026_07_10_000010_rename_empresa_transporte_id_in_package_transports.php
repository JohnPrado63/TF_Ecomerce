<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('package_transports', function (Blueprint $table) {
            $table->renameColumn('empresa_transporte_id', 'transport_company_id');
        });
    }

    public function down(): void
    {
        Schema::table('package_transports', function (Blueprint $table) {
            $table->renameColumn('transport_company_id', 'empresa_transporte_id');
        });
    }
};
