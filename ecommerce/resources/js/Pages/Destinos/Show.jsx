import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';
import MapView from '@/Components/MapView';
import SectionHeader from '@/Components/SectionHeader';

export default function Show({ destination, packages }) {
    const [showMap, setShowMap] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title={`${destination.name} - Destinos Ayacucho`} />

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-10">
                    <div>
                        <p className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400">
                            <Icon name="map-pin" size={12} sm:size={14} />
                            Destino Ayacucho
                        </p>
                        <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{destination.name}</h1>
                        <p className="mt-2 sm:mt-3 max-w-2xl text-slate-400 text-sm">{destination.description}</p>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900/80 border border-slate-800/80 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:border-slate-700 transition w-full sm:w-auto"
                    >
                        <Icon name="arrow-left" size={16} />
                        <span className="sm:hidden">Volver</span>
                        <span className="hidden sm:inline">Volver al inicio</span>
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-3 mb-10">
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-3">Provincia</p>
                        <h2 className="text-2xl font-bold text-white mb-4">{destination.name}</h2>
                        <p className="text-slate-400 mb-6">{destination.summary}</p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Icon name="map-pin" size={15} className="text-cyan-400" />
                                    Región: Ayacucho
                                </div>
                                <button
                                    onClick={() => {
                                        setShowMap(!showMap);
                                        setTimeout(() => {
                                            if (!showMap) {
                                                document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }, 100);
                                    }}
                                    className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium transition text-xs bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-full hover:bg-cyan-500/20"
                                >
                                    <Icon name="map" size={12} />
                                    {showMap ? 'Ocultar' : 'Ver'} mapa
                                </button>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Icon name="compass" size={15} className="text-cyan-400" />
                                Sitios turísticos: {destination.sites.length}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Icon name="sparkles" size={15} className="text-cyan-400" />
                                Estilo: {destination.style}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-6">
                            <Icon name="map" size={20} className="text-cyan-400" />
                            Lugares turísticos
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {destination.sites.map((site) => (
                                <div
                                    key={site.title}
                                    className={`rounded-xl border p-5 transition ${
                                        site.has_package
                                            ? 'border-cyan-500/40 bg-cyan-500/5'
                                            : 'border-slate-800/80 bg-slate-800/30'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-white">{site.title}</h3>
                                        {site.has_package && (
                                            <span className="flex items-center gap-1 text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-2.5 py-1 rounded-full whitespace-nowrap">
                                                <Icon name="check-circle" size={11} />
                                                Incluido en tour
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed">{site.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {showMap && (
                    <div id="map-section" className="mb-10 rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-6 shadow-xl shadow-cyan-500/10">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
                            <Icon name="map" size={20} className="text-cyan-400" />
                            Ubicación de {destination.name}
                        </h2>
                        <MapView
                            latitude={destination.location?.latitude}
                            longitude={destination.location?.longitude}
                            title={destination.name}
                            city="Ayacucho"
                        />
                    </div>
                )}

                <div className="mb-10 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl">
                    <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
                        <Icon name="target" size={20} className="text-cyan-400" />
                        Plan recomendado
                    </h2>
                    <p className="text-slate-400 leading-relaxed">{destination.recommendation}</p>
                </div>

                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                                <Icon name="package" size={20} className="text-cyan-400" />
                                Paquetes disponibles en {destination.name}
                            </h2>
                            <p className="text-slate-400 text-sm mt-1">
                                {packages.length > 0
                                    ? `${packages.length} paquete(s) disponible(s)`
                                    : 'Próximamente habrá paquetes para este destino'}
                            </p>
                        </div>
                        <Link
                            href="/packages"
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
                        >
                            Ver todos
                            <Icon name="arrow-right" size={14} />
                        </Link>
                    </div>

                    {packages.length === 0 ? (
                        <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-800/50">
                            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                                <Icon name="package" size={32} className="text-slate-600" />
                            </div>
                            <p className="text-slate-500 text-sm">
                                Aún no hay paquetes para este destino.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className="group bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={pkg.image_url}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                                    </div>

                                    <div className="p-4">
                                        <p className="text-slate-400 text-xs mb-1 flex items-center gap-1.5">
                                            <Icon name="map-pin" size={13} className="text-cyan-400" />
                                            {pkg.location?.city}, {pkg.location?.region}
                                        </p>
                                        <h3 className="text-white font-bold mb-3 group-hover:text-cyan-400 transition line-clamp-1">
                                            {pkg.title}
                                        </h3>

                                        <div className="flex gap-2 mb-3 flex-wrap">
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

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-cyan-400 font-bold text-lg">
                                                    S/. {Number(pkg.price).toFixed(2)}
                                                </p>
                                                <p className="text-slate-500 text-xs flex items-center gap-1.5">
                                                    <Icon name="calendar" size={12} />
                                                    {pkg.duration_days} día(s)
                                                </p>
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
        </div>
    );
}
