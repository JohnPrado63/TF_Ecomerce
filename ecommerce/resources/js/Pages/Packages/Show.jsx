import MapView from '@/Components/MapView';
import StarRating from '@/Components/StarRating';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Show({ package: pkg, nearbyRestaurants, nearbyHotels }) {
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

                    {/* Columna izquierda */}
                    <div className="lg:col-span-2">

                        <p className="text-slate-400 text-sm mb-2">
                            📍 {pkg.location?.city}, {pkg.location?.region}
                        </p>
                        <h1 className="text-3xl font-bold mb-4">{pkg.title}</h1>
                        <div className="mb-4">
                            <StarRating 
                                rating={pkg.reviews_avg_rating} 
                                count={pkg.reviews_count}
                                size="md"
                            />
                        </div>
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

                        {/* Hoteles */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4"> Hoteles cercanos</h2>
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
                        {/* Otros hoteles en la zona */}
                        {nearbyHotels?.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold mb-3 text-slate-300">
                                    🏨 Otros hoteles en {pkg.location?.city}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {nearbyHotels.map((hotel) => (
                                        <div key={hotel.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-600 transition">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-semibold text-white">{hotel.nombre}</p>
                                                <div className="flex gap-1">
                                                    {[...Array(hotel.estrellas)].map((_, i) => (
                                                        <span key={i} className="text-yellow-400 text-xs">★</span>
                                                    ))}
                                                </div>
                                            </div>
                                            {hotel.precio_por_noche && (
                                                <p className="text-cyan-400 font-bold text-sm mb-1">
                                                    S/. {Number(hotel.precio_por_noche).toFixed(2)}
                                                    <span className="text-slate-500 text-xs font-normal"> / noche</span>
                                                </p>
                                            )}
                                            <p className="text-slate-500 text-xs">📍 {hotel.direccion}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Restaurantes */}
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
                        {/* Otros restaurantes en la zona */}
                        {nearbyRestaurants?.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold mb-3 text-slate-300">
                                    🍽️ Otros restaurantes en {pkg.location?.city}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {nearbyRestaurants.map((restaurante) => (
                                        <div key={restaurante.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-600 transition">
                                            <p className="font-semibold text-white">{restaurante.nombre}</p>
                                            <p className="text-slate-400 text-sm">{restaurante.tipo_comida}</p>
                                            <p className="text-slate-500 text-xs mt-2">📍 {restaurante.direccion}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/*ubicacion en el mapa */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4">
                                📍 Ubicación del destino
                            </h2>
                            <p className="text-slate-400 text-sm mb-3">
                                {pkg.location?.city}, {pkg.location?.region}-Ayacucho, Perú
                            </p>
                            <MapView
                                latitude={pkg.location?.latitude}
                                longitude={pkg.location?.longitude}
                                title={pkg.title}
                                city={pkg.location?.city}
                            />
                        </div>
                        {/* Reseñas */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4">
                                Reseñas ({pkg.reviews?.length ?? 0})
                            </h2>

                            {pkg.reviews?.length > 0 ? (
                                <div className="space-y-4 mb-6">
                                    {pkg.reviews.map((review) => (
                                        <div key={review.id} className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 font-bold text-xs">
                                                        {review.client?.first_name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-semibold text-sm">
                                                        {review.client?.first_name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {[1,2,3,4,5].map((star) => (
                                                        <span key={star} className={star <= review.rating ? 'text-yellow-400' : 'text-slate-600'}>
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="text-slate-300 text-sm">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-400 text-sm mb-6">
                                    Aún no hay reseñas para este paquete. ¡Sé el primero!
                                </div>
                            )}

                            {/* Formulario reseña */}
                            {auth?.user ? (
                                <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                                    <h3 className="font-bold mb-4">Dejar una reseña</h3>
                                    <form onSubmit={submitReview} className="space-y-4">

                                        <div>
                                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                                Calificación
                                            </label>
                                            <div className="flex gap-2">
                                                {[1,2,3,4,5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setData('rating', star)}
                                                        className={`text-3xl transition ${
                                                            star <= data.rating
                                                                ? 'text-yellow-400'
                                                                : 'text-slate-600 hover:text-yellow-300'
                                                        }`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                                Comentario (opcional)
                                            </label>
                                            <textarea
                                                value={data.comment}
                                                onChange={e => setData('comment', e.target.value)}
                                                rows={3}
                                                placeholder="Cuéntanos tu experiencia..."
                                                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none"
                                            />
                                            {errors.comment && (
                                                <p className="text-red-400 text-xs mt-1">{errors.comment}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-900 font-bold px-6 py-2 rounded-xl transition"
                                        >
                                            {processing ? 'Enviando...' : 'Publicar reseña'}
                                        </button>

                                    </form>
                                </div>
                            ) : (
                                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
                                    <p className="text-slate-400 text-sm mb-3">
                                        Inicia sesión para dejar una reseña
                                    </p>
                                    <Link
                                        href="/login"
                                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-5 py-2 rounded-xl transition text-sm"
                                    >
                                        Iniciar sesión
                                    </Link>
                                </div>
                            )}
                        </div>

                    </div>
                    {/* fin columna izquierda */}

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