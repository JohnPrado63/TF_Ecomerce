import { Head, Link } from '@inertiajs/react';

export default function Show({ package: pkg }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title={`${pkg.title} - ESKY TRIPS`} />

            <div className="container mx-auto px-6 py-10">

                {/* Botón volver */}
                <Link
                    href="/packages"
                    className="text-cyan-400 hover:text-cyan-300 text-sm mb-6 inline-block"
                >
                    ← Volver a paquetes
                </Link>

                {/* Imagen principal */}
                <div className="w-full h-96 rounded-2xl overflow-hidden mb-8">
                    <img
                        src={pkg.image_url}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Info izquierda */}
                    <div className="lg:col-span-2">
                        <p className="text-slate-400 text-sm mb-2">
                            📍 {pkg.location?.city}, {pkg.location?.region}
                        </p>
                        <h1 className="text-3xl font-bold mb-4">{pkg.title}</h1>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            {pkg.description}
                        </p>

                        {/* Servicios incluidos */}
                        <h2 className="text-xl font-bold mb-4">¿Qué incluye?</h2>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className={`p-3 rounded-xl border ${pkg.includes_guide ? 'border-blue-500 bg-blue-900/30 text-blue-300' : 'border-slate-700 bg-slate-800 text-slate-500'}`}>
                                🧭 Guía turístico {pkg.includes_guide ? '✓' : '✗'}
                            </div>
                            <div className={`p-3 rounded-xl border ${pkg.includes_food ? 'border-green-500 bg-green-900/30 text-green-300' : 'border-slate-700 bg-slate-800 text-slate-500'}`}>
                                🍽️ Alimentación {pkg.includes_food ? '✓' : '✗'}
                            </div>
                            <div className={`p-3 rounded-xl border ${pkg.includes_hotel ? 'border-purple-500 bg-purple-900/30 text-purple-300' : 'border-slate-700 bg-slate-800 text-slate-500'}`}>
                                🏨 Alojamiento {pkg.includes_hotel ? '✓' : '✗'}
                            </div>
                            <div className="p-3 rounded-xl border border-cyan-500 bg-cyan-900/30 text-cyan-300">
                                📅 {pkg.duration_days} día(s)
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4">Hoteles cercanos</h2>
                            {pkg.hoteles?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pkg.hoteles.map((hotel) => (
                                        <div key={hotel.id} className="p-4 rounded-2xl border border-slate-700 bg-slate-900">
                                            <p className="font-semibold text-white">{hotel.nombre}</p>
                                            <p className="text-slate-400 text-sm">{hotel.estrellas} estrellas</p>
                                            <p className="text-slate-500 text-sm mt-2">{hotel.direccion}</p>
                                            <p className="text-slate-500 text-sm">{hotel.telefono}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900 text-slate-400">
                                    No hay hoteles asociados a este paquete todavía.
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4">Restaurantes recomendados</h2>
                            {pkg.restaurantes?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pkg.restaurantes.map((restaurante) => (
                                        <div key={restaurante.id} className="p-4 rounded-2xl border border-slate-700 bg-slate-900">
                                            <p className="font-semibold text-white">{restaurante.nombre}</p>
                                            <p className="text-slate-400 text-sm">{restaurante.tipo_comida}</p>
                                            <p className="text-slate-500 text-sm mt-2">{restaurante.direccion}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900 text-slate-400">
                                    No hay restaurantes asociados a este paquete todavía.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Card de reserva derecha */}
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 h-fit sticky top-6">
                        <p className="text-slate-400 text-sm mb-1">Precio por persona</p>
                        <p className="text-4xl font-bold text-cyan-400 mb-2">
                            S/. {Number(pkg.price).toFixed(2)}
                        </p>
                        <p className="text-slate-400 text-sm mb-6">
                            {pkg.available_slots} lugares disponibles
                        </p>

                        <Link
                            href={`/bookings/create?package_id=${pkg.id}`}
                            className="block w-full text-center bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 rounded-xl transition text-lg mb-3"
                        >
                            Reservar ahora
                        </Link>

                        <p className="text-slate-500 text-xs text-center">
                            Sin cargos ocultos • Confirmación inmediata
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}