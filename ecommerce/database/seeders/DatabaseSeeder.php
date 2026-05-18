<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Usuario::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@vibe.com',
            'rol' => 'admin',
        ]);
    }
}
