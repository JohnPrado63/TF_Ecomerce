import { Head, Link, router } from '@inertiajs/react';
import StarRating from '@/Components/StarRating';
import Icon from '@/Components/Icon';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';


export default function Index({ packages, locations, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [ubicacion, setUbicacion] = useState(filters.ubicacion || '');
    const [categoria, setCategoria] = useState(filters.categoria || '');
    const [duracion, setDuracion] = useState(filters.duracion || '');
    const [orden, setOrden] = useState(filters.orden || 'recientes');

    const categorias = [...new Set(packages.map(p => p.category?.name).filter(Boolean))];

    const applyFilters = () => {
        const params = {};
        if (search) params.search = search;
        if (ubicacion) params.ubicacion = ubicacion;
        if (categoria) params.categoria = categoria;
        if (duracion) params.duracion = duracion;
        if (orden && orden !== 'recientes') params.orden = orden;

        router.get('/packages', params, { preserveState: true, replace: true });
    };

    const clearFilters = () => {
        setSearch('');
        setUbicacion('');
        setCategoria('');
        setDuracion('');
        setOrden('recientes');
        router.get('/packages', {}, { preserveState: true, replace: true });
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Paquetes Turísticos - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-10">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold">Paquetes Turísticos</h1>
                        <p className="text-slate-400 mt-1">
                            Descubre Ayacucho con nuestros paquetes especializados
                        </p>
                    </div>
                    <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm">
                        ← Volver al inicio
                    </Link>
                </div>

                {/* Filtros */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">

                    {/* Buscador */}
                    <div className="relative">
                        <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar destino o paquete..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                            className="bg-slate-800 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 col-span-1 md:col-span-1 w-full"
                        />
                    </div>

                    {/* Filtro ubicación */}
                    <select
                        value={ubicacion}
                        onChange={e => setUbicacion(e.target.value)}
                        aria-label="Filtrar por ubicación"
                        className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    >
                        <option value="">Todas las ubicaciones</option>
                        {locations?.map(loc => (
                            <option key={loc.id} value={loc.city}>{loc.city}</option>
                        ))}
                    </select>

                    {/* Filtro categoría */}
                    <select
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                        aria-label="Filtrar por categoría"
                        className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    >
                        <option value="">Todas las categorías</option>
                        {categorias.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Filtro duración */}
                    <select
                        value={duracion}
                        onChange={e => setDuracion(e.target.value)}
                        aria-label="Filtrar por duración"
                        className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    >
                        <option value="">Cualquier duración</option>
                        <option value="1">1 día</option>
                        <option value="2-3">2-3 días</option>
                        <option value="4-7">4-7 días</option>
                        <option value="8+">8+ días</option>
                    </select>

                    {/* Ordenar por precio */}
                    <select
                        value={orden}
                        onChange={e => setOrden(e.target.value)}
                        aria-label="Ordenar paquetes"
                        className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    >
                        <option value="recientes">Más recientes</option>
                        <option value="precio-bajo">Precio: menor a mayor</option>
                        <option value="precio-alto">Precio: mayor a menor</option>
                        <option value="duracion">Por duración</option>
                    </select>

                    {/* Botones de filtro */}
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={applyFilters}
                            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 rounded-xl transition text-sm"
                        >
                            Aplicar filtros
                        </button>
                        <button
                            onClick={clearFilters}
                            className="px-4 py-3 text-slate-400 hover:text-white transition text-sm"
                            title="Limpiar filtros"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Resultado */}
                <p className="text-slate-400 text-sm mb-4">
                    {packages.length} paquete(s) encontrado(s)
                </p>

                {/* Grid de paquetes */}
                {packages.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-xl">
                            No se encontraron paquetes con esos filtros
                        </p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-cyan-400 hover:text-cyan-300 transition"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg) => (
                            <div key={pkg.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500 transition group">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={pkg.image_url}
                                        alt={pkg.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                </div>
                                <div className="p-5">
                                    <p className="text-slate-400 text-sm mb-1 flex items-center gap-1">
                                        <Icon name="map-pin" size={14} className="text-slate-400" />
                                        {pkg.location?.city}, {pkg.location?.region}
                                    </p>
                                    <h2 className="text-white font-bold text-lg mb-2">{pkg.title}</h2>
                                    <div className="mb-2">
                                        <StarRating 
                                            rating={pkg.reviews_avg_rating} 
                                            count={pkg.reviews_count}
                                        />
                                    </div>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {pkg.includes_guide == 1 && (
                                            <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full">🧭 Guía</span>
                                        )}
                                        {pkg.includes_food == 1 && (
                                            <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">🍽️ Comida</span>
                                        )}
                                        {pkg.includes_hotel == 1 && (
                                            <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded-full">🏨 Hotel</span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-cyan-400 font-bold text-xl">
                                                S/. {Number(pkg.price).toFixed(2)}
                                            </p>
                                            <p className="text-slate-500 text-xs">{pkg.duration_days} día(s)</p>
                                            <p className={`text-xs font-semibold mt-1 ${
                                                pkg.available_slots > 10
                                                    ? 'text-green-400'
                                                    : pkg.available_slots > 3
                                                    ? 'text-yellow-400'
                                                    : pkg.available_slots > 0
                                                    ? 'text-red-400'
                                                    : 'text-slate-500'
                                            }`}>
                                                {pkg.available_slots > 0
                                                    ? `${pkg.available_slots} lugares`
                                                    : 'Sin disponibilidad'
                                                }
                                            </p>
                                        </div>
                                        <Link
                                            href={`/packages/${pkg.id}`}
                                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-xl transition text-sm"
                                        >
                                            Ver más
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
