<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('recommendations', function (Blueprint $table) {
            $table->enum('interaction_type', ['view', 'click', 'save', 'book'])->default('view')->after('viewed');
            $table->string('session_id', 100)->nullable()->after('interaction_type');
            $table->integer('view_duration')->nullable()->after('session_id');
        });
    }

    public function down(): void
    {
        Schema::table('recommendations', function (Blueprint $table) {
            $table->dropColumn(['interaction_type', 'session_id', 'view_duration']);
        });
    }
};
