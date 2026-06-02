<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TourPackage;
use App\Models\Location;

class TourPackageSeeder extends Seeder
{
    public function run(): void
    {
        $locationIds = Location::whereIn('city', [
            'Huamanga',
            'Cangallo',
            'Vilcashuamán',
            'Quinua',
            'Huanta',
            'Sucre',
            'Parinacochas',
            'Paucar del Sara Sara',
        ])->pluck('id', 'city')->toArray();

        $packages = [
            [
                'category_id'     => 2,
                'location_id'     => $locationIds['Cangallo'] ?? 2,
                'title'           => 'Aguas Turquesas de Millpu',
                'description'     => 'Descubre las impresionantes lagunas de color turquesa en Cangallo. Un paraíso natural único en el Perú con más de 15 lagunas escalonadas rodeadas de vegetación andina.',
                'price'           => 250.00,
                'duration_days'   => 1,
                'includes_guide'  => true,
                'includes_food'   => true,
                'includes_hotel'  => false,
                'image_url'       => 'https://wsrv.nl/?url=https://denomades.s3.us-west-2.amazonaws.com/blog/wp-content/uploads/2019/07/18142626/aguasturquesasOK.jpg&w=1200&fit=cover&q=75&output=webp&h=675',
                'available_slots' => 20,
                'status'          => true,
            ],
            [
                'category_id'     => 1,
                'location_id'     => 3,
                'title'           => 'Vilcashuamán Imperial',
                'description'     => 'Visita el centro ceremonial inca de Vilcashuamán, considerado el ombligo del Tahuantinsuyo. Incluye visita al ushnu, templo del sol y la luna, y el estanque ceremonial.',
                'price'           => 180.00,
                'duration_days'   => 2,
                'includes_guide'  => true,
                'includes_food'   => true,
                'includes_hotel'  => true,
                'image_url'       => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5O9t1T2Hlhn6rNW5xuLUxJa5HygliEyHOkg&s',
                'available_slots' => 15,
                'status'          => true,
            ],
            [
                'category_id'     => 1,
                'location_id'     => 4,
                'title'           => 'Pampa de Ayacucho y Quinua',
                'description'     => 'Recorre el campo de batalla donde se libró la última batalla por la independencia de América. Visita el obelisco conmemorativo y el pintoresco pueblo artesanal de Quinua.',
                'price'           => 120.00,
                'duration_days'   => 1,
                'includes_guide'  => true,
                'includes_food'   => false,
                'includes_hotel'  => false,
                'image_url'       => 'https://i0.wp.com/portaldeturismo.pe/wp-content/uploads/2025/02/57857b0e-e5aa-4fac-bc41-fab8c53dd057-1.jpg?fit=1024%2C682&ssl=1',
                'available_slots' => 30,
                'status'          => true,
            ],
            [
                'category_id'     => 4,
                'location_id'     => 1,
                'title'           => 'Templos Coloniales de Huamanga',
                'description'     => 'Recorre las 33 iglesias coloniales de la Ciudad de las Iglesias. Visita la Catedral, San Francisco de Asís, La Merced y la Iglesia de Santo Domingo con guía especializado.',
                'price'           => 90.00,
                'duration_days'   => 1,
                'includes_guide'  => true,
                'includes_food'   => false,
                'includes_hotel'  => false,
                'image_url'       => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Catedral_de_Ayacucho.jpg/800px-Catedral_de_Ayacucho.jpg',
                'available_slots' => 25,
                'status'          => true,
            ],
            [
                'category_id'     => 2,
                'location_id'     => 5,
                'title'           => 'Huanta y sus Lagunas',
                'description'     => 'Explora la ciudad de la eterna primavera. Visita las lagunas de Ñahuinpuquio y el bosque de puyas de Raimondi. Ideal para amantes de la naturaleza y fotografía.',
                'price'           => 150.00,
                'duration_days'   => 2,
                'includes_guide'  => true,
                'includes_food'   => true,
                'includes_hotel'  => true,
                'image_url'       => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Huanta_desde_el_cerro.jpg/800px-Huanta_desde_el_cerro.jpg',
                'available_slots' => 12,
                'status'          => true,
            ],
            [
                'category_id'     => 1,
                'location_id'     => $locationIds['Huamanga'] ?? 1,
                'title'           => 'Zona Arqueológica Wari',
                'description'     => 'Descubre la capital del Imperio Wari, la primera civilización urbana de los Andes. Recorre las ruinas de la antigua ciudad con guía arqueólogo especializado.',
                'price'           => 110.00,
                'duration_days'   => 1,
                'includes_guide'  => true,
                'includes_food'   => false,
                'includes_hotel'  => false,
                'image_url'       => 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Zona_arqueologica_Wari.jpg/800px-Zona_arqueologica_Wari.jpg',
                'available_slots' => 20,
                'status'          => true,
            ],
            [
                'category_id'     => 3,
                'location_id'     => $locationIds['Sucre'] ?? 1,
                'title'           => 'Sabores y tradiciones de Sucre',
                'description'     => 'Degusta la cocina local y conoce tradiciones vivas en Sucre. Una experiencia cultural con mercados y patrimonio religioso.',
                'price'           => 130.00,
                'duration_days'   => 1,
                'includes_guide'  => true,
                'includes_food'   => true,
                'includes_hotel'  => false,
                'image_url'       => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Opera_House_Sucre.jpg/800px-Opera_House_Sucre.jpg',
                'available_slots' => 18,
                'status'          => true,
            ],
            [
                'category_id'     => 2,
                'location_id'     => $locationIds['Parinacochas'] ?? 1,
                'title'           => 'Laguna Parinacochas',
                'description'     => 'Explora la laguna y las montañas del sur de Ayacucho. Ideal para caminatas y fotografía en un paisaje de altura.',
                'price'           => 170.00,
                'duration_days'   => 2,
                'includes_guide'  => true,
                'includes_food'   => true,
                'includes_hotel'  => true,
                'image_url'       => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Laguna_Parinacochas.jpg/800px-Laguna_Parinacochas.jpg',
                'available_slots' => 14,
                'status'          => true,
            ],
            [
                'category_id'     => 4,
                'location_id'     => $locationIds['Paucar del Sara Sara'] ?? 1,
                'title'           => 'Ruta de Miradores en Paucar del Sara Sara',
                'description'     => 'Recorre los principales miradores del distrito y conoce los pueblos serranos con paisajes espectaculares.',
                'price'           => 140.00,
                'duration_days'   => 2,
                'includes_guide'  => true,
                'includes_food'   => false,
                'includes_hotel'  => true,
                'image_url'       => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Paucar_del_Sara_Sara_Landscape.jpg/800px-Paucar_del_Sara_Sara_Landscape.jpg',
                'available_slots' => 16,
                'status'          => true,
            ],
        ];

        foreach ($packages as $package) {
            TourPackage::updateOrCreate(['title' => $package['title']], $package);
        }
    }
}