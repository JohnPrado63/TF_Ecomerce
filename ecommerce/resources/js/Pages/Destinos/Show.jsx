import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Show({ destination, packages }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title={`${destination.name} - Destinos Ayacucho`} />

            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                            Destino Ayacucho
                        </p>
                        <h1 className="mt-3 text-4xl font-bold">{destination.name}</h1>
                        <p className="mt-3 max-w-2xl text-slate-400">{destination.description}</p>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800 transition"
                    >
                        ← Volver al inicio
                    </Link>
                </div>

                {/* Info y lugares turísticos */}
                <div className="grid gap-6 lg:grid-cols-3 mb-10">
                    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 mb-3">Provincia</p>
                        <h2 className="text-3xl font-bold text-white mb-4">{destination.name}</h2>
                        <p className="text-slate-400 mb-6">{destination.summary}</p>
                        <div className="space-y-3">
                            <p className="text-sm text-slate-400">Región: Ayacucho</p>
                            <p className="text-sm text-slate-400">
                                Sitios turísticos: {destination.sites.length}
                            </p>
                            <p className="text-sm text-slate-400">Estilo: {destination.style}</p>
                        </div>
                    </div>

                    <div className="lg:col-span-2 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                        <h2 className="text-xl font-semibold text-white mb-6">Lugares turísticos</h2>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {destination.sites.map((site) => (
                                <div
                                    key={site.title}
                                    className={`rounded-3xl border p-5 transition hover:border-sky-500 ${
                                        site.has_package
                                            ? 'border-cyan-500/40 bg-cyan-950/20'
                                            : 'border-slate-800 bg-slate-950/80'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-white">{site.title}</h3>
                                        {site.has_package && (
                                            <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                                                🎫 Incluido en tour
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-sm leading-6">{site.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Plan recomendado */}
                <div className="mb-10 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-4">Plan recomendado</h2>
                    <p className="text-slate-400 leading-7">{destination.recommendation}</p>
                </div>

                {/* Paquetes disponibles */}
                <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                🧳 Paquetes disponibles en {destination.name}
                            </h2>
                            <p className="text-slate-400 text-sm mt-1">
                                {packages.length > 0
                                    ? `${packages.length} paquete(s) disponible(s)`
                                    : 'Próximamente habrá paquetes para este destino'
                                }
                            </p>
                        </div>
                        <Link
                            href="/packages"
                            className="text-cyan-400 hover:text-cyan-300 text-sm transition"
                        >
                            Ver todos →
                        </Link>
                    </div>

                    {packages.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-5xl mb-4">🏔️</p>
                            <p className="text-slate-500 text-sm">
                                Aún no hay paquetes para este destino.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className="group bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    {/* Imagen */}
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src={pkg.image_url}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="p-4">
                                        <p className="text-slate-500 text-xs mb-1">
                                            📍 {pkg.location?.city}, {pkg.location?.region}
                                        </p>
                                        <h3 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition">
                                            {pkg.title}
                                        </h3>

                                        {/* Badges */}
                                        <div className="flex gap-2 mb-3 flex-wrap">
                                            {pkg.includes_guide == 1 && (
                                                <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full">
                                                    🧭 Guía
                                                </span>
                                            )}
                                            {pkg.includes_food == 1 && (
                                                <span className="text-xs bg-green-900/50 text-green-300 px-2 py-0.5 rounded-full">
                                                    🍽️ Comida
                                                </span>
                                            )}
                                            {pkg.includes_hotel == 1 && (
                                                <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full">
                                                    🏨 Hotel
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-cyan-400 font-bold text-lg">
                                                    S/. {Number(pkg.price).toFixed(2)}
                                                </p>
                                                <p className="text-slate-500 text-xs">
                                                    📅 {pkg.duration_days} día(s)
                                                </p>
                                            </div>
                                            <Link
                                                href={`/packages/${pkg.id}`}
                                                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-xl transition text-xs"
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
        </div>
    );
}