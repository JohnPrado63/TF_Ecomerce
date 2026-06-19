<?php

namespace Database\Seeders;

use App\Models\Offer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OfferSeeder extends Seeder
{
    public function run(): void
    {
        $offers = [
            [
                'title'                => 'Descuento Temprano',
                'description'          => 'Reserva 30 días antes y ahorra 20% en paquetes Ayacucho.',
                'slug'                 => 'descuento-temprano',
                'discount_percentage'  => 20,
                'start_date'           => now(),
                'end_date'             => now()->addMonths(3),
                'active'               => true,
                'code'                 => 'EARLY20',
                'applicable_packages'  => null,
            ],
            [
                'title'                => 'Pack Familiar',
                'description'          => 'Viaja en familia y obtén beneficios especiales.',
                'slug'                 => 'pack-familiar',
                'discount_percentage'  => 15,
                'start_date'           => now(),
                'end_date'             => now()->addMonths(6),
                'active'               => true,
                'code'                 => 'FAMILIA15',
                'applicable_packages'  => null,
            ],
            [
                'title'                => 'Último Minuto',
                'description'          => 'Reservas de último minuto con precios increíbles.',
                'slug'                 => 'ultimo-minuto',
                'discount_percentage'  => 30,
                'start_date'           => now(),
                'end_date'             => now()->addMonths(1),
                'active'               => true,
                'code'                 => 'LAST30',
                'applicable_packages'  => null,
            ],
        ];

        foreach ($offers as $offer) {
            Offer::firstOrCreate(
                ['slug' => $offer['slug']],
                $offer
            );
        }
    }
}