<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $destinationDetails = [
            'huamanga' => [
                'description' => 'Descubre el corazón de Ayacucho con su casco histórico, plazas coloniales y tradición viva.',
                'summary' => 'Capital regional con cultura, mercados de artesanía y arquitectura virreinal.',
                'style' => 'Urbano cultural',
                'recommendation' => 'Camina por la Plaza Mayor, visita las iglesias barrocas y vive una tarde en el Mercado Central.',
                'sites' => [
                    ['title' => 'Plaza Mayor de Ayacucho', 'detail' => 'Iglesias coloniales, balcones tallados y tiendas de artesanía local.'],
                    ['title' => 'Catedral de Ayacucho', 'detail' => 'Arquitectura barroca que define el centro histórico de la ciudad.'],
                    ['title' => 'Museo de la Memoria', 'detail' => 'Exposición sobre historia regional y valores culturales del valle.'],
                ],
            ],
            'cangallo' => [
                'description' => 'Lagunas color turquesa, senderos andinos y comunidades vivientes en Cangallo.',
                'summary' => 'Provincia natural con rutas de lagunas escalonadas y paisaje serrano.',
                'style' => 'Naturaleza y aventura',
                'recommendation' => 'Recorre las lagunas de color y prueba la gastronomía local en los pueblos cercanos.',
                'sites' => [
                    ['title' => 'Lagunas de Cangallo', 'detail' => 'Más de 15 lagunas naturales rodeadas de vegetación andina.'],
                    ['title' => 'Mirador de Achacocha', 'detail' => 'Vistas panorámicas de los valles y humedales de altura.'],
                    ['title' => 'Pueblo de Cangallo', 'detail' => 'Mercados típicos y tradiciones de los habitantes locales.'],
                ],
            ],
            'vilcashuaman' => [
                'description' => 'Arqueología ancestral y festividades tradicionales en la sierra ayacuchana.',
                'summary' => 'Destino para los amantes de los sitios arqueológicos y la espiritualidad andina.',
                'style' => 'Arqueología y tradición',
                'recommendation' => 'Recorre el complejo arqueológico, participa en una feria local y prueba la comida serrana.',
                'sites' => [
                    ['title' => 'Zona Arqueológica de Usqunta', 'detail' => 'Terrazas y estructuras preincaicas en un entorno montañoso.'],
                    ['title' => 'Museo de Sitio de Vilcas Huamán', 'detail' => 'Testimonios de la vida incaica y artefactos locales.'],
                    ['title' => 'Canchón de la Plaza Principal', 'detail' => 'Espacio cultural donde se celebran fiestas y tradiciones vivas.'],
                ],
            ],
            'la-mar' => [
                'description' => 'Valles serranos y pueblos con fuerte herencia cultural en el sur de Ayacucho.',
                'summary' => 'Ruta tranquila entre paisajes verdes y fiesta popular.',
                'style' => 'Naturaleza y festivales',
                'recommendation' => 'Visita mercados campesinos y descubre pequeños talleres artesanales en el camino.',
                'sites' => [
                    ['title' => 'Pampa de la Quinua', 'detail' => 'Paisajes amplios con cultivo tradicional y memoria histórica.'],
                    ['title' => 'Plaza de San Miguel', 'detail' => 'Centro de actividades con tradiciones religiosas y ferias.'],
                    ['title' => 'Mirador de Fin del Mundo', 'detail' => 'Vistas panorámicas de los valles ayacuchanos al atardecer.'],
                ],
            ],
            'lucanas' => [
                'description' => 'Carnaval, lagunas y paisajes altos en el sur de la región Ayacucho.',
                'summary' => 'Provincia famosa por su carnaval y sus rutas naturales elevadas.',
                'style' => 'Festividades y paisaje alto',
                'recommendation' => 'Disfruta del folklore local y recorre las lagunas andinas cercanas.',
                'sites' => [
                    ['title' => 'Carnaval de Lucanas', 'detail' => 'Celebración colorida con danzas, música y trajes tradicionales.'],
                    ['title' => 'Laguna Grande', 'detail' => 'Espacio natural para caminatas y observación de aves.'],
                    ['title' => 'Mirador de Escalerillas', 'detail' => 'Punto panorámico con vistas únicas de la puna.'],
                ],
            ],
        ];

        // Obtener locaciones de Ayacucho
        $locations = Location::where('region', 'Ayacucho')->get();

        foreach ($locations as $location) {
            $slug = \Illuminate\Support\Str::slug($location->city);
            
            if (array_key_exists($slug, $destinationDetails)) {
                $details = $destinationDetails[$slug];
                
                Destination::create([
                    'location_id'   => $location->id,
                    'name'          => $location->city,
                    'slug'          => $slug,
                    'description'   => $details['description'],
                    'summary'       => $details['summary'],
                    'style'         => $details['style'],
                    'recommendation' => $details['recommendation'],
                    'sites'         => json_encode($details['sites']),
                ]);
            }
        }
    }
}
