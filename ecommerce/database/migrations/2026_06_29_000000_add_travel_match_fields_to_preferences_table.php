<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('preferences', function (Blueprint $table) {
            $table->json('preferred_destinations')->nullable()->after('preferred_activity');
            $table->enum('traveler_type', ['adventurer', 'cultural', 'relaxed', 'gastronomic', 'spiritual', 'ecotourist'])->nullable()->after('preferred_destinations');
            $table->enum('activity_level', ['low', 'moderate', 'high', 'extreme'])->nullable()->after('traveler_type');
        });
    }

    public function down(): void
    {
        Schema::table('preferences', function (Blueprint $table) {
            $table->dropColumn(['preferred_destinations', 'traveler_type', 'activity_level']);
        });
    }
};
