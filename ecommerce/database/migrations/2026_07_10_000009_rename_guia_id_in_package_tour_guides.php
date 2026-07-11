<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('package_tour_guides', function (Blueprint $table) {
            $table->renameColumn('guia_id', 'tour_guide_id');
        });
    }

    public function down(): void
    {
        Schema::table('package_tour_guides', function (Blueprint $table) {
            $table->renameColumn('tour_guide_id', 'guia_id');
        });
    }
};
