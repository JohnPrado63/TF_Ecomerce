# Reglas de Negocio y Convenciones del Proyecto

Este documento define las reglas de negocio, convenciones de nomenclatura y la arquitectura base que debe seguir el proyecto.

## 1. Stack Tecnológico
- **Backend:** Laravel
- **Frontend:** React
- **Integración:** Inertia.js

## 2. Convenciones de Idioma (Español)
Para mantener consistencia en la lógica de negocio y facilitar la comprensión del dominio para todos los miembros del equipo, se aplicarán las siguientes convenciones en idioma **español**:

- **Tablas de Base de Datos:** Los nombres de las tablas deben estar en español, en plural y minúsculas (ej. `usuarios`, `productos`, `pedidos`).
- **Controladores:** Los nombres de los controladores deben estar en español, usando PascalCase y terminando con la palabra `Controller` (ej. `UsuarioController`, `ProductoController`).
- **Modelos:** Los nombres de los modelos deben estar en español y en singular, usando PascalCase (ej. `Usuario`, `Producto`).
- **Rutas y URLs:** Las URLs expuestas y definidos en los archivos de rutas deben estar en español (ej. `/usuarios`, `/productos/crear`).
- **Variables y Funciones:** Se recomienda usar nombres en español claros y descriptivos (usando camelCase para variables y métodos).

## 3. Arquitectura y Patrones (Laravel + React + Inertia)
- **Comunicación Backend-Frontend:** En lugar de crear una API REST separada, se utilizará **Inertia.js** para comunicar el Backend (Laravel) con el Frontend (React). Esto permite construir aplicaciones SPA clásicas usando el enrutamiento del lado del servidor.
- **Controladores:** Los métodos en los controladores deben retornar respuestas de tipo Inertia mediante `Inertia::render('Ruta/Al/Componente', $datos)` en lugar de vistas Blade tradicionales o respuestas JSON directas.
- **Componentes React:**
  - Los componentes que actúan como "Vistas" principales estarán ubicados en `resources/js/Pages`.
  - Los componentes reutilizables (botones, modales, tarjetas) deben ir en `resources/js/Components`.
  - Preferir la sintaxis moderna con *Functional Components* y *Hooks*.
- **Estilos:** Se utilizará el sistema de estilos configurado (ej. Tailwind CSS, que suele venir integrado con Laravel Breeze/Inertia).

## 4. Ejemplos de Implementación

### Ejemplo de Controlador (`app/Http/Controllers/ProductoController.php`)
```php
<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index()
    {
        // Recuperar los datos
        $productos = Producto::all();
        
        // Retornar vista React a través de Inertia
        return Inertia::render('Productos/Index', [
            'productos' => $productos
        ]);
    }
}
```

### Ejemplo de Modelo (`app/Models/Producto.php`)
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    // Ya que la convención en Laravel es en inglés, es OBLIGATORIO definir la tabla explícitamente:
    protected $table = 'productos';
    
    // Campos que se pueden asignar de manera masiva
    protected $fillable = ['nombre', 'precio', 'descripcion'];
}
```

## 5. Control de Calidad
- Las migraciones deben contener los esquemas explícitamente en español para ajustarse a estas reglas.
- Los commits deben ser claros e indicar qué parte de la lógica de negocio se alteró.
