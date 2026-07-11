<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@esky.com'],
            [
                'name' => 'Administrador ESKY',
                'role' => 'admin',
                'email_verified_at' => now(),
                'password' => Hash::make('Admin1234!'),
                'remember_token' => \Illuminate\Support\Str::random(10),
            ]
        );
    }
}
