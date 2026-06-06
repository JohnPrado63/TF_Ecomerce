<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\Location;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        $destinationDetails = [
            'huamanga' => [
                'description'    => 'Descubre el corazón de Ayacucho con su casco histórico, plazas coloniales y tradición viva.',
                'summary'        => 'Capital regional con cultura, mercados de artesanía y arquitectura virreinal.',
                'style'          => 'Urbano cultural',
                'recommendation' => 'Camina por la Plaza Mayor, visita las iglesias barrocas y vive una tarde en el Mercado Central.',
                'sites'          => [
                    ['title' => 'Plaza Mayor de Ayacucho', 'detail' => 'Iglesias coloniales, balcones tallados y tiendas de artesanía local.'],
                    ['title' => 'Catedral de Ayacucho',    'detail' => 'Arquitectura barroca que define el centro histórico de la ciudad.'],
                    ['title' => 'Museo de la Memoria',     'detail' => 'Exposición sobre historia regional y valores culturales del valle.'],
                ],
            ],
            'cangallo' => [
                'description'    => 'Lagunas color turquesa, senderos andinos y comunidades vivientes en Cangallo.',
                'summary'        => 'Provincia natural con rutas de lagunas escalonadas y paisaje serrano.',
                'style'          => 'Naturaleza y aventura',
                'recommendation' => 'Recorre las lagunas de color y prueba la gastronomía local en los pueblos cercanos.',
                'sites'          => [
                    ['title' => 'Lagunas de Cangallo',    'detail' => 'Más de 15 lagunas naturales rodeadas de vegetación andina.'],
                    ['title' => 'Mirador de Achacocha',   'detail' => 'Vistas panorámicas de los valles y humedales de altura.'],
                    ['title' => 'Pueblo de Cangallo',     'detail' => 'Mercados típicos y tradiciones de los habitantes locales.'],
                ],
            ],
            'vilcashuaman' => [
                'description'    => 'Arqueología ancestral y festividades tradicionales en la sierra ayacuchana.',
                'summary'        => 'Destino para los amantes de los sitios arqueológicos y la espiritualidad andina.',
                'style'          => 'Arqueología y tradición',
                'recommendation' => 'Recorre el complejo arqueológico, participa en una feria local y prueba la comida serrana.',
                'sites'          => [
                    ['title' => 'Zona Arqueológica de Usqunta',    'detail' => 'Terrazas y estructuras preincaicas en un entorno montañoso.'],
                    ['title' => 'Museo de Sitio de Vilcas Huamán', 'detail' => 'Testimonios de la vida incaica y artefactos locales.'],
                    ['title' => 'Canchón de la Plaza Principal',   'detail' => 'Espacio cultural donde se celebran fiestas y tradiciones vivas.'],
                ],
            ],
            'quinua' => [
                'description'    => 'Pueblo artesanal y campo histórico donde se libró la batalla de Ayacucho.',
                'summary'        => 'Ruta histórica con artesanía local y el famoso obelisco conmemorativo.',
                'style'          => 'Histórico y cultural',
                'recommendation' => 'Visita el obelisco, recorre los talleres artesanales y disfruta de las vistas panorámicas.',
                'sites'          => [
                    ['title' => 'Pampa de Ayacucho',    'detail' => 'Campo donde se libró la última batalla por la independencia de América.'],
                    ['title' => 'Obelisco de Quinua',   'detail' => 'Monumento conmemorativo de la batalla de Ayacucho.'],
                    ['title' => 'Pueblo de Quinua',     'detail' => 'Famoso por su artesanía en cerámica y retablos ayacuchanos.'],
                ],
            ],
            'huanta' => [
                'description'    => 'La ciudad de la eterna primavera, rodeada de lagunas y naturaleza exuberante.',
                'summary'        => 'Provincia verde con lagunas, bosques de puyas y clima cálido todo el año.',
                'style'          => 'Naturaleza y ecoturismo',
                'recommendation' => 'Explora las lagunas de Ñahuinpuquio y el bosque de puyas de Raimondi.',
                'sites'          => [
                    ['title' => 'Lagunas de Ñahuinpuquio', 'detail' => 'Lagunas cristalinas rodeadas de vegetación andina.'],
                    ['title' => 'Bosque de Puyas Raimondi', 'detail' => 'Bosque único con la planta más grande del mundo.'],
                    ['title' => 'Ciudad de Huanta',         'detail' => 'Centro urbano con mercados y tradiciones locales.'],
                ],
            ],
        ];

        foreach ($destinationDetails as $slug => $details) {
            $location = Location::where('region', 'Ayacucho')
                ->get()
                ->first(fn ($loc) => Str::slug($loc->city) === $slug);

            if (!$location) continue;

            Destination::updateOrCreate(
                ['slug' => $slug],
                [
                    'location_id'    => $location->id,
                    'name'           => $location->city,
                    'slug'           => $slug,
                    'description'    => $details['description'],
                    'summary'        => $details['summary'],
                    'style'          => $details['style'],
                    'recommendation' => $details['recommendation'],
                    'sites'          => $details['sites'],
                ]
            );
        }
    }
}