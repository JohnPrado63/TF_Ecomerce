# Reglas de Negocio - ESKY TRIPS

Este documento define las reglas de negocio, convenciones de nomenclatura y la arquitectura del proyecto ESKY TRIPS.

---

## 1. Stack Tecnológico

- **Backend:** Laravel
- **Frontend:** React
- **Integración:** Inertia.js
- **Estilos:** Tailwind CSS (tema oscuro)
- **Pagos:** MercadoPago SDK + Yape/Plin/Efectivo

---

## 2. Convenciones de Nomenclatura

### Backend - Modelos y Tablas (EN INGLÉS)

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Modelos | PascalCase, singular, inglés | `TourPackage`, `TourGuide`, `Hotel` |
| Tablas | snake_case, plural, inglés | `tour_packages`, `tour_guides`, `hotels` |
| Campos | snake_case, inglés | `first_name`, `price_per_person`, `cuisine_type` |
| Relaciones | camelCase | `tourGuides()`, `hotels()`, `restaurants()` |

**IMPORTANTE:** No usar nombres en español para modelos, tablas o campos de BD:
- ❌ `nombre` → ✅ `name`
- ❌ `precio_por_noche` → ✅ `price_per_night`
- ❌ `hoteles` → ✅ `hotels`

### Frontend - Props de API (snake_case)

Cuando el backend envía datos al frontend vía Inertia, las propiedades de relaciones vienen en **snake_case**:

```
pkg.tour_guides     (NO pkg.tourGuides)
pkg.hotels          (NO pkg.hoteles)
pkg.restaurants     (NO pkg.restaurantes)
guide.first_name    (NO guide.nombre)
guide.last_name     (NO guide.apellido)
guide.languages     (NO guide.idiomas)
hotel.name          (NO hotel.nombre)
hotel.stars         (NO hotel.estrellas)
hotel.address       (NO hotel.direccion)
restaurant.cuisine_type (NO restaurant.tipo_comida)
```

### Controladores y Rutas (EN ESPAÑOL)

- Controladores en español: `MercadoPagoController`, `BookingController`, `AdminController`
- Rutas en español: `/paquetes`, `/reservas`, `/pagos`, `/admin/dashboard`

---

## 3. Arquitectura (Laravel + React + Inertia)

### Flujo de datos

```
Usuario → React (Inertia) → Controlador Laravel → Modelo → Base de datos
                ↓
         Inertia::render('Pagina/Componente', $datos)
                ↓
         React muestra los datos
```

### Estructura de archivos

```
resources/js/
├── Pages/              # Vistas principales (Inertia)
│   ├── Admin/          # Panel administrativo
│   ├── Bookings/       # Reservas
│   ├── Packages/       # Paquetes turísticos
│   └── ...
├── Components/          # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── PackageCard.jsx
│   └── ...
└── Layouts/            # Layouts compartidos
    ├── GuestLayout.jsx
    └── AuthenticatedLayout.jsx
```

### Reglas de componentes React

- Usar **Functional Components** con Hooks
- Props de datos API siempre en **snake_case**
- Estilos con Tailwind CSS (clases de tema oscuro)

---

## 4. Módulo de Pagos (MercadoPago)

### Flujo de pago

1. Usuario crea reserva → estado `pending`, sin pago
2. Usuario selecciona método de pago en `/payments/show`
3. Si elige **MercadoPago**:
   - Frontend llama a `POST /payments/mp/preference`
   - Backend crea preferencia en MercadoPago
   - Usuario redirigido a `sandbox_init_point` (TEST) o `init_point` (PROD)
4. Después del pago:
   - **Success** → `/payments/mp/success` → reserva `confirmed`, slots decrementados
   - **Failure** → `/payments/mp/failure` → reserva `cancelled`, slots reintegrados
   - **Pending** → `/payments/mp/pending` → reserva `pending`
5. Webhook `/payments/mp/webhook` → maneja notificaciones async

### Métodos de pago soportados

| Método | Tipo | Verificación |
|--------|------|--------------|
| Yape | QR | Manual (subir comprobante) |
| Plin | QR | Manual (subir comprobante) |
| Efectivo | Presencial | Manual (subir comprobante) |
| MercadoPago | Tarjeta/Billetera | Automática (webhook) + callbacks |

### Credenciales

```
# .env
MP_PUBLIC_KEY=      # Clave pública de MercadoPago
MP_ACCESS_TOKEN=    # Token de acceso
MP_WEBHOOK_SECRET= # Secret para verificar webhooks
```

- **TEST**: Usar credenciales con prefijo `TEST-` en desarrollo
- **PROD**: Usar credenciales de producción

---

## 5. Travel Match (Recomendaciones)

### Algoritmo de puntuación

```
match_score = score_presupuesto + score_duracion + score_categoria + score_novedad
```

| Factor | Puntuación máx | Criterio |
|--------|----------------|----------|
| Presupuesto | 30 pts | Precio dentro del presupuesto ±10% |
| Duración | 20 pts | Diferencia de días ±1 |
| Categoría | 40 pts | Coincidencia exacta |
| Novedad | boost | Paquetes nuevos (< 7 días) +30% |

### Tracking de interacciones

- **view**: Paquete visto en lista/detalle
- **click**: Click en "Ver más"
- **hover**: Hover > 1 segundo
- **save**: Guardado en favoritos

Los datos se almacenan en `package_interactions` y `behavioral_profiles`.

---

## 6. Diseño UI

### Tema visual

| Elemento | Valor |
|----------|-------|
| Background | `slate-950` (#020617) |
| Acento primario | `cyan-500` (#06b6d4) |
| Acento secundario | `pink-500` (#ec4899) |
| Texto principal | `white` |
| Texto secundario | `slate-400` |

### Tipografía

- Font family: `Plus Jakarta Sans`
- Headings: bold, tracking-tight
- Body: regular, leading-relaxed

### Responsividad (Mobile-first)

| Breakpoint | Ancho mín | Uso |
|------------|-----------|-----|
| `sm:` | 640px | Tablets portrait |
| `md:` | 768px | Tablets landscape |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |

### Convenciones de padding

```jsx
// Móvil primero
px-4 sm:px-6 py-6 sm:py-10

// Grids responsivos
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

---

## 7. Seeders y Datos de Prueba

### Asociación de extras a paquetes

Los seeders `PackageExtrasSeeder` y `PackageGuideSeeder` asocian hoteles/restaurantes/guías a paquetes según:

- **Hoteles**: `location_id` coincidente o buscar en ubicaciones cercanas
- **Restaurantes**: `location_id` coincidente o buscar en ubicaciones cercanas
- **Guías**: Paquetes con `includes_guide = true`

### Método de asociación

```php
// Usar syncWithoutDetaching para agregar sin borrar existentes
$package->hotels()->syncWithoutDetaching($hotelId);
$package->tourGuides()->syncWithoutDetaching($guideId);
```

### Orden de seeders

```php
// DatabaseSeeder.php
1. CategorySeeder
2. LocationSeeder
3. TourPackageSeeder
4. TourGuideSeeder
5. HotelSeeder
6. RestaurantSeeder
7. PackageGuideSeeder      // Asocia guías
8. PackageExtrasSeeder    // Asocia hoteles/restaurantes
9. AdminUserSeeder
10. DestinationSeeder
```

---

## 8. Reglas de Negocio Importantes

### Reservas

- Slots disponibles se decrementan solo cuando el pago es **verificado**
- Si el pago falla/cancela, los slots se reintegran
- Una reserva puede tener: hotel, restaurante y guía (opcionales)

### Paquetes

- `includes_guide`, `includes_food`, `includes_hotel` son booleanos
- `available_slots` se maneja por paquete (no por fecha)
- Paquetes inactivos (`status = false`) no se muestran al público

### Pagos

- Pago verificado = reserva confirmada automáticamente
- Pago rechazado = reserva cancelada, slots reintegrados
- No se permiten reservas con `available_slots = 0`

---

## 9. Control de Versiones

### Convenciones de commits

```
feat: nueva funcionalidad
fix: corrección de bug
refactor: reestructuración sin cambiar funcionalidad
style: cambios de estilos/UI
docs: documentación
test: pruebas
```

Ejemplo: `feat: agregar asociación de guías a paquetes`

### Estructura de archivos modificados (resumen)

```
Backend:
├── app/Http/Controllers/
│   ├── AdminController.php
│   ├── BookingController.php
│   ├── MercadoPagoController.php
│   └── PaymentController.php
├── app/Models/
│   ├── TourPackage.php
│   ├── TourGuide.php
│   ├── Hotel.php
│   └── Restaurant.php
├── database/seeders/
│   ├── PackageGuideSeeder.php      # NUEVO
│   └── PackageExtrasSeeder.php    # MODIFICADO

Frontend:
├── resources/js/
│   ├── Components/
│   │   ├── AdminNavbar.jsx
│   │   ├── AdminStatCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── SectionHeader.jsx
│   │   └── Icon.jsx
│   ├── Layouts/
│   │   ├── GuestLayout.jsx
│   │   └── AuthenticatedLayout.jsx
│   └── Pages/
│       ├── Admin/                  # Todas las páginas del admin
│       ├── Bookings/
│       ├── Packages/
│       └── Welcome.jsx
```

---

*Última actualización: Julio 2026*
