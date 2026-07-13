<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::connection()->getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE payments MODIFY COLUMN method ENUM('yape', 'plin', 'efectivo', 'mercadopago') NULL DEFAULT NULL");
        } else {
            DB::statement("ALTER TABLE payments ALTER COLUMN method DROP DEFAULT");
            DB::statement("CREATE TYPE method_payment_type AS ENUM ('yape', 'plin', 'efectivo', 'mercadopago')");
            DB::statement("ALTER TABLE payments ALTER COLUMN method TYPE method_payment_type USING method::text::method_payment_type");
            DB::statement("ALTER TABLE payments ALTER COLUMN method SET DEFAULT 'yape'::method_payment_type");
        }
    }

    public function down(): void
    {
        if (DB::connection()->getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE payments MODIFY COLUMN method ENUM('yape', 'plin', 'efectivo') NOT NULL DEFAULT 'yape'");
        } else {
            DB::statement("ALTER TABLE payments ALTER COLUMN method DROP DEFAULT");
            DB::statement("ALTER TABLE payments ALTER COLUMN method TYPE VARCHAR(50) USING NULL");
            DB::statement("DROP TYPE IF EXISTS method_payment_type");
        }
    }
};
