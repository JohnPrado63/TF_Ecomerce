<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuario::firstOrCreate(
            ['email' => 'admin@esky.com'],
            [
                'name' => 'Administrador ESKY',
                'rol' => 'admin',
                'email_verified_at' => now(),
                'password' => Hash::make('Admin1234!'),
                'remember_token' => \Illuminate\Support\Str::random(10),
            ]
        );
    }
}
