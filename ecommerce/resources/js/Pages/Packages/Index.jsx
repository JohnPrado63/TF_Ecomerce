import { Head, Link, router } from '@inertiajs/react';
import StarRating from '@/Components/StarRating';
import Icon from '@/Components/Icon';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import SectionHeader from '@/Components/SectionHeader';

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

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">

                <SectionHeader
                    title="Paquetes Turísticos"
                    description="Descubre Ayacucho con nuestros paquetes especializados"
                    icon="compass"
                    actionLabel="Volver al inicio"
                    actionHref="/"
                />

                <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl shadow-slate-950/20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">

                        <div className="relative md:col-span-1">
                            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar destino..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={handleSearch}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition text-sm"
                            />
                        </div>

                        <select
                            value={ubicacion}
                            onChange={e => setUbicacion(e.target.value)}
                            aria-label="Filtrar por ubicación"
                            className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition text-sm"
                        >
                            <option value="">Todas las ubicaciones</option>
                            {locations?.map(loc => (
                                <option key={loc.id} value={loc.city}>{loc.city}</option>
                            ))}
                        </select>

                        <select
                            value={categoria}
                            onChange={e => setCategoria(e.target.value)}
                            aria-label="Filtrar por categoría"
                            className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition text-sm"
                        >
                            <option value="">Todas las categorías</option>
                            {categorias.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={duracion}
                            onChange={e => setDuracion(e.target.value)}
                            aria-label="Filtrar por duración"
                            className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition text-sm"
                        >
                            <option value="">Cualquier duración</option>
                            <option value="1">1 día</option>
                            <option value="2-3">2-3 días</option>
                            <option value="4-7">4-7 días</option>
                            <option value="8+">8+ días</option>
                        </select>

                        <select
                            value={orden}
                            onChange={e => setOrden(e.target.value)}
                            aria-label="Ordenar paquetes"
                            className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition text-sm"
                        >
                            <option value="recientes">Más recientes</option>
                            <option value="precio-bajo">Precio: ↓ a ↑</option>
                            <option value="precio-alto">Precio: ↑ a ↓</option>
                            <option value="duracion">Por duración</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <button
                            onClick={applyFilters}
                            className="flex-1 md:flex-none bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold py-3 px-6 rounded-xl transition shadow-lg shadow-cyan-500/20 text-sm flex items-center justify-center gap-2"
                        >
                            <Icon name="filter" size={15} />
                            Aplicar filtros
                        </button>
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition text-sm"
                        >
                            <Icon name="x" size={15} />
                            Limpiar
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <p className="text-slate-400 text-sm flex items-center gap-2">
                        <Icon name="package" size={15} />
                        {packages.length} paquete(s) encontrado(s)
                    </p>
                </div>

                {packages.length === 0 ? (
                    <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                            <Icon name="search" size={32} className="text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No se encontraron paquetes</h3>
                        <p className="text-slate-500 mb-6">Intenta con otros filtros de búsqueda</p>
                        <button
                            onClick={clearFilters}
                            className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg) => (
                            <div key={pkg.id} className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900 border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={pkg.image_url}
                                        alt={pkg.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                                    {pkg.includes_guide == 1 && (
                                        <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                            <Icon name="users" size={12} />
                                            Guía
                                        </span>
                                    )}
                                    <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-sm text-cyan-400 font-bold text-xl px-3 py-1.5 rounded-xl">
                                        S/. {Number(pkg.price).toFixed(2)}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                                        <Icon name="map-pin" size={14} className="text-cyan-500" />
                                        {pkg.location?.city}, {pkg.location?.region}
                                    </div>

                                    <h2 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-300 transition line-clamp-1">{pkg.title}</h2>

                                    <div className="mb-3">
                                        <StarRating
                                            rating={pkg.reviews_avg_rating}
                                            count={pkg.reviews_count}
                                        />
                                    </div>

                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {pkg.includes_guide == 1 && (
                                            <span className="flex items-center gap-1 text-xs bg-blue-500/10 border border-blue-500/30 text-blue-400 px-2.5 py-1 rounded-full">
                                                <Icon name="users" size={11} />
                                                Guía
                                            </span>
                                        )}
                                        {pkg.includes_food == 1 && (
                                            <span className="flex items-center gap-1 text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full">
                                                <Icon name="coffee" size={11} />
                                                Comida
                                            </span>
                                        )}
                                        {pkg.includes_hotel == 1 && (
                                            <span className="flex items-center gap-1 text-xs bg-violet-500/10 border border-violet-500/30 text-violet-400 px-2.5 py-1 rounded-full">
                                                <Icon name="building" size={11} />
                                                Hotel
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500">{pkg.duration_days} día(s)</span>
                                            <span className={`text-xs font-semibold ${
                                                pkg.available_slots > 10
                                                    ? 'text-emerald-400'
                                                    : pkg.available_slots > 3
                                                    ? 'text-amber-400'
                                                    : pkg.available_slots > 0
                                                    ? 'text-rose-400'
                                                    : 'text-slate-500'
                                            }`}>
                                                {pkg.available_slots > 0
                                                    ? `${pkg.available_slots} lugares`
                                                    : 'Sin disponibilidad'}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/packages/${pkg.id}`}
                                            className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-cyan-500/20 text-sm flex items-center gap-2"
                                        >
                                            <Icon name="eye" size={14} />
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
