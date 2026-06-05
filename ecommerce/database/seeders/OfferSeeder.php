<?php

namespace Database\Seeders;

use App\Models\Offer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $offers = [
            [
                'title' => 'Descuento Temprano',
                'slug' => 'descuento-temprano',
                'description' => 'Reserva 30 días antes y ahorra 20% en paquetes Ayacucho.',
                'discount_percentage' => '20%',
                'details' => 'Reserva con anticipación para conseguir mejores precios en experiencias culturales y tours locales. Oferta válida para paquetes seleccionados en Ayacucho.',
                'benefits' => json_encode(['Ahorro extra del 20%', 'Mejor selección de fechas', 'Incluye asesoría personalizada']),
                'active' => true,
            ],
            [
                'title' => 'Pack Familiar',
                'slug' => 'pack-familiar',
                'description' => 'Viaja en familia y obtén beneficios especiales.',
                'discount_percentage' => '15%',
                'details' => 'Ideal para familias que desean descubrir Ayacucho con comodidad y actividades adaptadas para todos. Incluye descuentos en alojamiento y excursiones familiares.',
                'benefits' => json_encode(['Descuento para familias', 'Tours guiados para niños', 'Alojamiento en habitaciones familiares']),
                'active' => true,
            ],
            [
                'title' => 'Último Minuto',
                'slug' => 'ultimo-minuto',
                'description' => 'Reservas de último minuto con precios increíbles.',
                'discount_percentage' => '30%',
                'details' => 'Perfecto para escapadas rápidas a Ayacucho con descuentos especiales en paquetes disponibles a corto plazo.',
                'benefits' => json_encode(['Precios bajos de último minuto', 'Confirmación rápida', 'Opciones flexibles de viaje']),
                'active' => true,
            ],
        ];

        foreach ($offers as $offer) {
            Offer::create($offer);
        }
    }
}
