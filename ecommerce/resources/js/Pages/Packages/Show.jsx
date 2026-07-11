import { lazy, Suspense } from 'react';
import StarRating from '@/Components/StarRating';
import Icon from '@/Components/Icon';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import PackageCard from '@/Components/PackageCard';
import SectionHeader from '@/Components/SectionHeader';

const MapView = lazy(() => import('@/Components/MapView'));

export default function Show({ package: pkg, nearbyRestaurants, nearbyHotels, similarPackages }) {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        package_id: pkg.id,
        rating: 5,
        comment: '',
    });

    function submitReview(e) {
        e.preventDefault();
        post('/reviews', {
            onSuccess: () => reset('comment'),
        });
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title={`${pkg.title} - ESKY TRIPS`} />

            <div className="container mx-auto px-6 py-10">

                <Link
                    href="/packages"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mb-6 transition"
                >
                    <Icon name="arrow-left" size={16} />
                    Volver a paquetes
                </Link>

                <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8">
                    <img
                        src={pkg.image_url}
                        alt={pkg.title}
                        loading="eager"
                        fetchPriority="high"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                        <p className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                            <Icon name="map-pin" size={16} className="text-cyan-400" />
                            {pkg.location?.city}, {pkg.location?.region}
                        </p>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                            {pkg.title}
                            {pkg.status === false && (
                                <span className="bg-rose-500/90 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                                    <Icon name="x-circle" size={14} className="inline mr-1" />
                                    No disponible
                                </span>
                            )}
                            {pkg.status === true && (
                                <span className="bg-emerald-500/90 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                                    <Icon name="check-circle" size={14} className="inline mr-1" />
                                    Activo
                                </span>
                            )}
                        </h1>
                        <StarRating
                            rating={pkg.reviews_avg_rating}
                            count={pkg.reviews_count}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-8">

                        <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                            <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                                <Icon name="file-text" size={20} className="text-cyan-400" />
                                Descripción
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                {pkg.description}
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                            <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                                <Icon name="sparkles" size={20} className="text-cyan-400" />
                                ¿Qué incluye?
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div className={`p-4 rounded-xl border flex items-center gap-3 ${pkg.includes_guide ? 'border-blue-500/50 bg-blue-500/10 text-blue-300' : 'border-slate-700 bg-slate-800/50 text-slate-500'}`}>
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <Icon name="users" size={18} className={pkg.includes_guide ? 'text-blue-400' : 'text-slate-500'} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">Guía turístico</p>
                                        {pkg.includes_guide && <p className="text-xs text-emerald-400">Incluido</p>}
                                    </div>
                                    <Icon name={pkg.includes_guide ? 'check-circle' : 'x-circle'} size={18} className={pkg.includes_guide ? 'text-emerald-400' : 'text-slate-600'} />
                                </div>
                                <div className={`p-4 rounded-xl border flex items-center gap-3 ${pkg.includes_food ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-slate-700 bg-slate-800/50 text-slate-500'}`}>
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                        <Icon name="coffee" size={18} className={pkg.includes_food ? 'text-emerald-400' : 'text-slate-500'} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">Alimentación</p>
                                        {pkg.includes_food && <p className="text-xs text-emerald-400">Incluido</p>}
                                    </div>
                                    <Icon name={pkg.includes_food ? 'check-circle' : 'x-circle'} size={18} className={pkg.includes_food ? 'text-emerald-400' : 'text-slate-600'} />
                                </div>
                                <div className={`p-4 rounded-xl border flex items-center gap-3 ${pkg.includes_hotel ? 'border-violet-500/50 bg-violet-500/10 text-violet-300' : 'border-slate-700 bg-slate-800/50 text-slate-500'}`}>
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                                        <Icon name="building" size={18} className={pkg.includes_hotel ? 'text-violet-400' : 'text-slate-500'} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">Alojamiento</p>
                                        {pkg.includes_hotel && <p className="text-xs text-emerald-400">Incluido</p>}
                                    </div>
                                    <Icon name={pkg.includes_hotel ? 'check-circle' : 'x-circle'} size={18} className={pkg.includes_hotel ? 'text-emerald-400' : 'text-slate-600'} />
                                </div>
                                <div className="p-4 rounded-xl border border-cyan-500/50 bg-cyan-500/10 text-cyan-300">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                        <Icon name="calendar" size={18} className="text-cyan-400" />
                                    </div>
                                    <p className="font-medium text-sm mt-1">{pkg.duration_days} día(s)</p>
                                    <p className="text-xs text-cyan-400">Duración</p>
                                </div>
                            </div>
                        </div>

                        {pkg.tour_guides?.length > 0 && (
                            <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                                <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                                    <Icon name="users" size={20} className="text-cyan-400" />
                                    Guías disponibles para este tour
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[...pkg.tour_guides].sort(() => Math.random() - 0.5).slice(0, 3).map((guide) => (
                                        <div key={guide.id} className="p-4 rounded-xl border border-slate-700/80 bg-slate-800/30 hover:border-cyan-500/40 transition group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-800 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xl flex-shrink-0">
                                                    {guide.first_name.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-white">
                                                        {guide.first_name} {guide.last_name}
                                                    </p>
                                                    <p className="text-slate-400 text-sm flex items-center gap-1.5 mt-0.5">
                                                        <Icon name="globe" size={13} />
                                                        {guide.languages}
                                                    </p>
                                                    <p className="text-slate-500 text-xs mt-1 flex items-center gap-2">
                                                        <span className="flex items-center gap-1">
                                                            <Icon name="phone" size={11} />
                                                            {guide.phone}
                                                        </span>
                                                        <span className="mx-1">·</span>
                                                        <span className="flex items-center gap-1">
                                                            <Icon name="shield" size={11} />
                                                            {guide.credential_number}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {pkg.hotels?.length > 0 && (
                            <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                                <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                                    <Icon name="building" size={20} className="text-cyan-400" />
                                    Hoteles en este paquete
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pkg.hotels.map((hotel) => (
                                        <div key={hotel.id} className="p-4 rounded-xl border border-slate-700/80 bg-slate-800/30">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-semibold text-white">{hotel.name}</p>
                                                <div className="flex gap-0.5">
                                                    {[...Array(hotel.stars)].map((_, i) => (
                                                        <Icon key={i} name="star" size={12} className="text-yellow-400 fill-yellow-400" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-2">
                                                <Icon name="map-pin" size={13} />
                                                {hotel.address}
                                            </p>
                                            <p className="text-slate-400 text-sm flex items-center gap-1.5 mt-1">
                                                <Icon name="phone" size={13} />
                                                {hotel.phone}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {nearbyHotels?.length > 0 && (
                            <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                                <h2 className="flex items-center gap-2 text-lg font-bold mb-4 text-slate-300">
                                    <Icon name="building" size={18} />
                                    Otros hoteles en {pkg.location?.city}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {nearbyHotels.map((hotel) => (
                                        <div key={hotel.id} className="p-4 rounded-xl border border-slate-800/50 bg-slate-800/20 hover:border-slate-700 transition">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-semibold text-white">{hotel.name}</p>
                                                <div className="flex gap-0.5">
                                                    {[...Array(hotel.stars)].map((_, i) => (
                                                        <Icon key={i} name="star" size={12} className="text-yellow-400 fill-yellow-400" />
                                                    ))}
                                                </div>
                                            </div>
                                            {hotel.price_per_night && (
                                                <p className="text-cyan-400 font-bold text-sm mb-1">
                                                    S/. {Number(hotel.price_per_night).toFixed(2)}
                                                    <span className="text-slate-500 text-xs font-normal"> / noche</span>
                                                </p>
                                            )}
                                            <p className="text-slate-500 text-xs flex items-center gap-1.5">
                                                <Icon name="map-pin" size={12} />
                                                {hotel.address}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {pkg.restaurants?.length > 0 && (
                            <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                                <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                                    <Icon name="coffee" size={20} className="text-cyan-400" />
                                    Restaurantes recomendados
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pkg.restaurants.map((restaurant) => (
                                        <div key={restaurant.id} className="p-4 rounded-xl border border-slate-700/80 bg-slate-800/30">
                                            <p className="font-semibold text-white">{restaurant.name}</p>
                                            <p className="text-slate-400 text-sm mt-1">{restaurant.cuisine_type}</p>
                                            <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-2">
                                                <Icon name="map-pin" size={13} />
                                                {restaurant.address}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {nearbyRestaurants?.length > 0 && (
                            <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                                <h2 className="flex items-center gap-2 text-lg font-bold mb-4 text-slate-300">
                                    <Icon name="utensils" size={18} />
                                    Otros restaurantes en {pkg.location?.city}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {nearbyRestaurants.map((restaurant) => (
                                        <div key={restaurant.id} className="p-4 rounded-xl border border-slate-800/50 bg-slate-800/20 hover:border-slate-700 transition">
                                            <p className="font-semibold text-white">{restaurant.name}</p>
                                            <p className="text-slate-400 text-sm mt-1">{restaurant.cuisine_type}</p>
                                            <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-2">
                                                <Icon name="map-pin" size={12} />
                                                {restaurant.address}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                            <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                                <Icon name="map-pin" size={20} className="text-cyan-400" />
                                Ubicación del destino
                            </h2>
                            <p className="text-slate-400 text-sm mb-4 flex items-center gap-1.5">
                                <Icon name="map-mapped" size={14} className="text-slate-500" />
                                {pkg.location?.city}, {pkg.location?.region} - Ayacucho, Perú
                            </p>
                            <Suspense fallback={<div className="w-full h-72 bg-slate-800 rounded-xl animate-pulse flex items-center justify-center border border-slate-700"><p className="text-slate-500 text-sm flex items-center gap-2"><Icon name="loader" size={16} className="animate-spin" />Cargando mapa...</p></div>}>
                                <MapView
                                    latitude={pkg.location?.latitude}
                                    longitude={pkg.location?.longitude}
                                    title={pkg.title}
                                    city={pkg.location?.city}
                                />
                            </Suspense>
                        </div>

                        {similarPackages && similarPackages.length > 0 && (
                            <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                                <h2 className="flex items-center gap-2 text-xl font-bold mb-2">
                                    <Icon name="compass" size={20} className="text-cyan-400" />
                                    Paquetes similares
                                </h2>
                                <p className="text-slate-400 text-sm mb-6">También te pueden interesar estos destinos</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {similarPackages.map((similar) => (
                                        <PackageCard key={similar.id} pkg={similar} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                            <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                                <Icon name="message-circle" size={20} className="text-cyan-400" />
                                Reseñas ({pkg.reviews?.length ?? 0})
                            </h2>

                            {pkg.reviews?.length > 0 ? (
                                <div className="space-y-4 mb-6">
                                    {pkg.reviews.map((review) => (
                                        <div key={review.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold text-sm">
                                                        {review.client?.first_name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-semibold text-white">
                                                        {review.client?.first_name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {[1,2,3,4,5].map((star) => (
                                                        <Icon key={star} name="star" size={14} className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'} />
                                                    ))}
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="text-slate-400 text-sm leading-relaxed">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center mb-6">
                                    <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto mb-3">
                                        <Icon name="message-circle" size={24} className="text-slate-600" />
                                    </div>
                                    <p className="text-slate-400 text-sm">Aún no hay reseñas para este paquete. ¡Sé el primero!</p>
                                </div>
                            )}

                            {auth?.user ? (
                                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
                                    <h3 className="font-bold mb-4 flex items-center gap-2">
                                        <Icon name="edit-2" size={16} className="text-cyan-400" />
                                        Dejar una reseña
                                    </h3>
                                    <form onSubmit={submitReview} className="space-y-4">
                                        <div>
                                            <label className="block text-slate-400 text-sm font-medium mb-2">Calificación</label>
                                            <div className="flex gap-2">
                                                {[1,2,3,4,5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setData('rating', star)}
                                                        aria-label={`Calificación ${star} de 5`}
                                                        className="text-2xl transition hover:scale-110"
                                                    >
                                                        <Icon name="star" size={28} className={star <= data.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600 hover:text-yellow-300'} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-slate-400 text-sm font-medium mb-2">Comentario (opcional)</label>
                                            <textarea
                                                value={data.comment}
                                                onChange={e => setData('comment', e.target.value)}
                                                rows={3}
                                                placeholder="Cuéntanos tu experiencia..."
                                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none"
                                            />
                                            {errors.comment && (
                                                <p className="text-rose-400 text-xs mt-1">{errors.comment}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 disabled:from-slate-600 disabled:to-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                                        >
                                            {processing ? (
                                                <span className="flex items-center gap-2"><Icon name="loader" size={16} className="animate-spin" />Enviando...</span>
                                            ) : 'Publicar reseña'}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center">
                                    <p className="text-slate-400 text-sm mb-4">
                                        Inicia sesión para dejar una reseña
                                    </p>
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                                    >
                                        <Icon name="log-out" size={16} />
                                        Iniciar sesión
                                    </Link>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-slate-900/95 to-slate-900/90 border border-slate-800/80 rounded-2xl p-6 h-fit sticky top-6 shadow-xl shadow-slate-950/30">
                            <div className="text-center mb-6">
                                <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Precio por persona</p>
                                <p className="text-4xl font-bold text-cyan-400">
                                    S/. {Number(pkg.price).toFixed(2)}
                                </p>
                            </div>

                            <div className="mb-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${
                                        pkg.available_slots > 10
                                            ? 'bg-emerald-400'
                                            : pkg.available_slots > 3
                                            ? 'bg-amber-400'
                                            : 'bg-rose-400'
                                    }`} />
                                    <p className={`text-sm font-semibold ${
                                        pkg.available_slots > 10
                                            ? 'text-emerald-400'
                                            : pkg.available_slots > 3
                                            ? 'text-amber-400'
                                            : 'text-rose-400'
                                    }`}>
                                        {pkg.available_slots > 0
                                            ? `${pkg.available_slots} lugar(es) disponible(s)`
                                            : '¡Sin lugares disponibles!'}
                                    </p>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                    <div
                                        className={`h-2 rounded-full transition-all ${
                                            pkg.available_slots > 10
                                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                                                : pkg.available_slots > 3
                                                ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                                                : 'bg-gradient-to-r from-rose-500 to-rose-400'
                                        }`}
                                        style={{ width: `${Math.min(100, (pkg.available_slots / 30) * 100)}%` }}
                                    />
                                </div>
                            </div>

                            {pkg.status === false ? (
                                <button
                                    disabled
                                    className="w-full bg-slate-800 text-slate-400 font-bold py-4 rounded-xl cursor-not-allowed text-base flex items-center justify-center gap-2"
                                >
                                    <Icon name="x-circle" size={18} />
                                    Paquete no disponible
                                </button>
                            ) : pkg.available_slots > 0 ? (
                                <Link
                                    href={auth?.user
                                        ? `/bookings/create?package_id=${pkg.id}`
                                        : `/reservar/${pkg.id}`
                                    }
                                    className="block w-full text-center bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold py-4 rounded-xl transition shadow-lg shadow-cyan-500/25 text-base flex items-center justify-center gap-2"
                                >
                                    <Icon name="calendar" size={18} />
                                    {auth?.user ? 'Reservar ahora' : 'Inicia sesión para reservar'}
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className="w-full bg-slate-800 text-slate-400 font-bold py-4 rounded-xl cursor-not-allowed text-base flex items-center justify-center gap-2"
                                >
                                    <Icon name="x-circle" size={18} />
                                    Sin lugares disponibles
                                </button>
                            )}

                            <div className="flex items-center justify-center gap-4 mt-5 text-slate-500 text-xs">
                                <span className="flex items-center gap-1.5">
                                    <Icon name="shield" size={13} />
                                    Sin cargos ocultos
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Icon name="check-circle" size={13} />
                                    Confirmación inmediata
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
