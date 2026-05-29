import { Head, Link } from '@inertiajs/react';

export default function Index({ packages }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Paquetes Turísticos - ESKY TRIPS" />

            {/* Header */}
            <div className="container mx-auto px-6 py-10">
                <h1 className="text-4xl font-bold text-white mb-2">
                    Paquetes Turísticos
                </h1>
                <p className="text-slate-400 mb-8">
                    Descubre Ayacucho con nuestros paquetes especializados
                </p>

                {/* Grid de paquetes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500 transition group">
                            
                            {/* Imagen */}
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={pkg.image_url}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <p className="text-slate-400 text-sm mb-1">
                                    📍 {pkg.location?.city}, {pkg.location?.region}
                                </p>
                                <h2 className="text-white font-bold text-lg mb-2">
                                    {pkg.title}
                                </h2>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                    {pkg.description}
                                </p>

                                {/* Servicios incluidos */}
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {pkg.includes_guide && (
                                        <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full">
                                            🧭 Guía
                                        </span>
                                    )}
                                    {pkg.includes_food && (
                                        <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">
                                            🍽️ Comida
                                        </span>
                                    )}
                                    {pkg.includes_hotel && (
                                        <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded-full">
                                            🏨 Hotel
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-cyan-400 font-bold text-xl">
                                            S/. {Number(pkg.price).toFixed(2)}
                                        </p>
                                        <p className="text-slate-500 text-xs">
                                            {pkg.duration_days} día(s)
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
            </div>
        </div>
    );
}