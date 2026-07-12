import { Head, Link } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';
import StarRating from '@/Components/StarRating';

export default function Show({ offer, packages }) {

    const endDate = new Date(offer.end_date).toLocaleDateString('es-PE', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title={`${offer.title} - ESKY TRIPS`} />

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">

                {/* Header oferta */}
                <div className="relative bg-gradient-to-r from-cyan-900/40 to-slate-900 border border-cyan-700/40 rounded-2xl p-8 mb-10 overflow-hidden">
                    <div className="absolute top-0 right-0 text-[120px] font-black text-cyan-500/10 leading-none pr-6 pt-2">
                        -{offer.discount_percentage}%
                    </div>
                    <div className="relative z-10">
                        <p className="text-cyan-400 text-sm uppercase tracking-widest mb-2">
                            Oferta especial
                        </p>
                        <h1 className="text-4xl font-black mb-3">{offer.title}</h1>
                        <p className="text-slate-300 mb-4">{offer.description}</p>

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="bg-cyan-500 text-slate-900 font-black text-2xl px-6 py-2 rounded-xl">
                                -{offer.discount_percentage}% OFF
                            </div>
                            {offer.code && (
                                <div className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-2">
                                    <p className="text-slate-400 text-xs mb-1">Código de descuento</p>
                                    <p className="text-cyan-400 font-black text-lg tracking-widest">
                                        {offer.code}
                                    </p>
                                </div>
                            )}
                            <div className="text-slate-400 text-sm">
                                ⏰ Válido hasta: <span className="text-white font-semibold">{endDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Paquetes con descuento */}
                <h2 className="text-2xl font-bold mb-6">
                    🧳 Paquetes con {offer.discount_percentage}% de descuento
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
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
                                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">
                                    -{pkg.discount_percent}% OFF
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <p className="text-slate-500 text-xs mb-1 flex items-center gap-1">
                                    <Icon name="map-pin" size={12} /> {pkg.location?.city}, {pkg.location?.region}
                                </p>
                                <h3 className="text-white font-bold mb-1 group-hover:text-cyan-400 transition">
                                    {pkg.title}
                                </h3>

                                <div className="mb-3">
                                    <StarRating
                                        rating={pkg.reviews_avg_rating}
                                        count={pkg.reviews_count}
                                    />
                                </div>

                                {/* Precio con descuento */}
                                <div className="flex items-center gap-3 mb-4">
                                    <p className="text-slate-500 text-sm line-through">
                                        S/. {Number(pkg.original_price).toFixed(2)}
                                    </p>
                                    <p className="text-cyan-400 font-black text-xl">
                                        S/. {Number(pkg.discounted_price).toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-slate-500 text-xs flex items-center gap-1">
                                        <Icon name="calendar" size={12} /> {pkg.duration_days} día(s)
                                    </p>
                                    <Link
                                        href={`/bookings/create?package_id=${pkg.id}&offer=${offer.slug}`}
                                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-xl transition text-xs"
                                    >
                                        Reservar con descuento
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