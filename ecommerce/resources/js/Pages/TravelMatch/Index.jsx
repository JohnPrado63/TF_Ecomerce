import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import StarRating from '@/Components/StarRating';

export default function Index({ recommendations, preference }) {

    function getScoreColor(score) {
        if (score >= 70) return 'text-green-400 bg-green-500/10 border-green-500/30';
        if (score >= 40) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Travel Match - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-2">
                            🎯 Travel Match
                        </p>
                        <h1 className="text-3xl font-bold mb-2">Recomendado para ti</h1>
                        <p className="text-slate-400 text-sm">
                            Basado en tus preferencias: presupuesto S/. {Number(preference.preferred_budget || 0).toFixed(0)},
                            {' '}{preference.preferred_duration || '?'} día(s), categoría "{preference.preferred_category || 'cualquiera'}"
                        </p>
                    </div>
                    <Link
                        href="/preferencias"
                        className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm whitespace-nowrap"
                    >
                        ⚙️ Editar preferencias
                    </Link>
                </div>

                {/* Recomendaciones */}
                {recommendations.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-6xl mb-4">🔍</p>
                        <p className="text-slate-400 text-xl mb-2">
                            No encontramos paquetes que coincidan
                        </p>
                        <p className="text-slate-500 text-sm mb-6">
                            Intenta ajustar tus preferencias para ver más opciones
                        </p>
                        <Link
                            href="/preferencias"
                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition"
                        >
                            Ajustar preferencias
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendations.map((pkg, index) => (
                            <div
                                key={pkg.id}
                                className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Imagen */}
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={pkg.image_url}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    {/* Badge de coincidencia */}
                                    <div className={`absolute top-3 right-3 backdrop-blur-sm border rounded-full px-3 py-1 text-xs font-bold ${getScoreColor(pkg.match_score)}`}>
                                        {pkg.match_score}% match
                                    </div>
                                    {index === 0 && (
                                        <div className="absolute top-3 left-3 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                                            ⭐ Mejor opción
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <p className="text-slate-500 text-xs mb-1">
                                        📍 {pkg.location?.city}, {pkg.location?.region}
                                    </p>
                                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-cyan-400 transition">
                                        {pkg.title}
                                    </h3>

                                    <div className="mb-2">
                                        <StarRating rating={pkg.reviews_avg_rating} count={pkg.reviews_count} />
                                    </div>

                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                        {pkg.description}
                                    </p>

                                    {/* Razones del match */}
                                    {pkg.match_reasons?.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {pkg.match_reasons.map((reason, i) => (
                                                <span key={i} className="text-xs bg-cyan-900/40 text-cyan-300 px-2 py-1 rounded-full">
                                                    ✓ {reason}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-cyan-400 font-bold text-xl">
                                                S/. {Number(pkg.price).toFixed(2)}
                                            </p>
                                            <p className="text-slate-500 text-xs">
                                                📅 {pkg.duration_days} día(s)
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