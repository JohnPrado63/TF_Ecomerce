import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';

export default function Index({ packages, locations }) {
    const urlParams = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState(urlParams.get('search') || '');
    const [ubicacion, setUbicacion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [duracion, setDuracion]   = useState('');
    const [orden, setOrden]         = useState('');

    const filtrados = packages
        .filter(pkg => ubicacion ? pkg.location?.city === ubicacion : true)
        .filter(pkg =>
            pkg.title.toLowerCase().includes(search.toLowerCase()) ||
            pkg.location?.city.toLowerCase().includes(search.toLowerCase())
        )
        .filter(pkg => categoria ? pkg.category?.name === categoria : true)
        .filter(pkg => {
            if (duracion === '1')  return pkg.duration_days === 1;
            if (duracion === '2')  return pkg.duration_days === 2;
            if (duracion === '3+') return pkg.duration_days >= 3;
            return true;
        })
        .sort((a, b) => {
            if (orden === 'precio_asc')  return a.price - b.price;
            if (orden === 'precio_desc') return b.price - a.price;
            return 0;
        });

    const categorias = [...new Set(packages.map(p => p.category?.name).filter(Boolean))];

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
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">

                    {/* Buscador */}
                    <input
                        type="text"
                        placeholder="🔍 Buscar destino o paquete..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 col-span-1 md:col-span-1"
                    />

                    {/* Filtro ubicación */}
                    <select
                        value={ubicacion}
                        onChange={e => setUbicacion(e.target.value)}
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
                        className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    >
                        <option value="">Cualquier duración</option>
                        <option value="1">1 día</option>
                        <option value="2">2 días</option>
                        <option value="3+">3 días o más</option>
                    </select>

                    {/* Ordenar por precio */}
                    <select
                        value={orden}
                        onChange={e => setOrden(e.target.value)}
                        className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    >
                        <option value="">Ordenar por</option>
                        <option value="precio_asc">Precio: menor a mayor</option>
                        <option value="precio_desc">Precio: mayor a menor</option>
                    </select>
                </div>

                {/* Resultado */}
                <p className="text-slate-400 text-sm mb-4">
                    {filtrados.length} paquete(s) encontrado(s)
                </p>

                {/* Grid de paquetes */}
                {filtrados.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-xl">
                            No se encontraron paquetes con esos filtros
                        </p>
                        <button
                            onClick={() => { setSearch(''); setCategoria(''); setDuracion(''); setOrden(''); }}
                            className="mt-4 text-cyan-400 hover:text-cyan-300 transition"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtrados.map((pkg) => (
                            <div key={pkg.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500 transition group">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={pkg.image_url}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                </div>
                                <div className="p-5">
                                    <p className="text-slate-400 text-sm mb-1">
                                        📍 {pkg.location?.city}, {pkg.location?.region}
                                    </p>
                                    <h2 className="text-white font-bold text-lg mb-2">{pkg.title}</h2>
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