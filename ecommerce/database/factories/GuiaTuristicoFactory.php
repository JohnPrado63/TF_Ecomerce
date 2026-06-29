<?php

namespace Database\Factories;

use App\Models\GuiaTuristico;
use Illuminate\Database\Eloquent\Factories\Factory;

class GuiaTuristicoFactory extends Factory
{
    protected $model = GuiaTuristico::class;

    public function definition(): array
    {
        return [
            'nombre' => fake()->firstName(),
            'apellido' => fake()->lastName(),
            'idiomas' => fake()->randomElements(['Español', 'Inglés', 'Portugués', 'Francés'], 2),
            'telefono' => fake()->phoneNumber(),
            'credencial_nro' => 'CDL-' . fake()->numerify('######'),
        ];
    }
}
