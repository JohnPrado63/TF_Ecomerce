<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE clients MODIFY COLUMN document_type ENUM('dni', 'passport') NOT NULL DEFAULT 'dni'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE clients MODIFY COLUMN document_type ENUM('DNI', 'Pasaporte') NOT NULL DEFAULT 'DNI'");
    }
};
