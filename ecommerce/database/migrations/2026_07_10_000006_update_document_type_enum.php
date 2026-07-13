<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::connection()->getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE clients MODIFY COLUMN document_type ENUM('dni', 'passport') NOT NULL DEFAULT 'dni'");
        } else {
            DB::statement("ALTER TABLE clients ALTER COLUMN document_type DROP DEFAULT");
            DB::statement("CREATE TYPE document_type_enum AS ENUM ('dni', 'passport')");
            DB::statement("ALTER TABLE clients ALTER COLUMN document_type TYPE document_type_enum USING document_type::text::document_type_enum");
            DB::statement("ALTER TABLE clients ALTER COLUMN document_type SET DEFAULT 'dni'::document_type_enum");
        }
    }

    public function down(): void
    {
        if (DB::connection()->getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE clients MODIFY COLUMN document_type ENUM('DNI', 'Pasaporte') NOT NULL DEFAULT 'DNI'");
        } else {
            DB::statement("ALTER TABLE clients ALTER COLUMN document_type DROP DEFAULT");
            DB::statement("ALTER TABLE clients ALTER COLUMN document_type TYPE VARCHAR(50) USING NULL");
            DB::statement("DROP TYPE IF EXISTS document_type_enum");
        }
    }
};
