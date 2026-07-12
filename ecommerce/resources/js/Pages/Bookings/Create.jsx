import { Head, useForm, Link } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';
import SectionHeader from '@/Components/SectionHeader';

export default function Create({ package: pkg, offer }) {
    const { data, setData, post, processing, errors } = useForm({
        package_id:     pkg.id,
        booking_date:   '',
        persons_quantity: 1,
        include_hotel:  pkg.includes_hotel || false,
        hotel_id:       pkg.hotels?.[0]?.id ?? null,
        restaurant_id: pkg.restaurants?.[0]?.id ?? null,
        guide_id:       pkg.tour_guides?.[0]?.id || '',
        offer_id:       offer?.id || null,
    });

    const selectedHotel      = pkg.hotels?.find(h => h.id === data.hotel_id);
    const selectedRestaurant = pkg.restaurants?.find(r => r.id === data.restaurant_id);

    const hotelPricePerPerson      = Number(selectedHotel?.price_per_person ?? 0);
    const restaurantPricePerPerson = Number(selectedRestaurant?.price_per_person ?? 0);

    const baseTotal       = pkg.price * data.persons_quantity;
    const hotelExtra      = data.include_hotel && selectedHotel
        ? hotelPricePerPerson * data.persons_quantity
        : 0;
    const restaurantExtra = selectedRestaurant
        ? restaurantPricePerPerson * data.persons_quantity
        : 0;
    const subtotal        = baseTotal + hotelExtra + restaurantExtra;
    const discountAmt     = offer
        ? Math.round(subtotal * (offer.discount_percentage / 100) * 100) / 100
        : 0;
    const totalFinal      = subtotal - discountAmt;

    function handleToggleHotel() {
        const nextState = !data.include_hotel;
        setData('include_hotel', nextState);
        if (nextState && !data.hotel_id && pkg.hotels?.length) {
            setData('hotel_id', pkg.hotels[0].id);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        post('/bookings');
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title={`Reservar - ${pkg.title}`} />

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 max-w-5xl">

                <Link
                    href={`/packages/${pkg.id}`}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mb-4 sm:mb-6 transition w-fit"
                >
                    <Icon name="arrow-left" size={16} />
                    Volver al paquete
                </Link>

                <SectionHeader
                    title="Confirmar Reserva"
                    description="Completa los datos para tu aventura en Ayacucho"
                    icon="calendar"
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-6">

                    <div className="lg:col-span-3 space-y-6">

                        {offer && (
                            <div className="bg-gradient-to-r from-cyan-900/30 to-slate-900 border border-cyan-500/40 rounded-2xl p-4 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                                    <Icon name="tag" size={22} className="text-cyan-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-cyan-300 font-bold text-lg">-{offer.discount_percentage}% OFF - {offer.title}</p>
                                    <p className="text-slate-400 text-sm">Descuento aplicado automáticamente</p>
                                </div>
                                <span className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-black text-xl px-4 py-2 rounded-xl">
                                    -{offer.discount_percentage}%
                                </span>
                            </div>
                        )}

                        <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-4 sm:p-6">
                            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                                <Icon name="file-text" size={18} sm:size={20} className="text-cyan-400" />
                                Datos del viaje
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div>
                                    <label className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-2">
                                        <Icon name="calendar" size={16} className="text-cyan-400" />
                                        Fecha de viaje
                                    </label>
                                    <input
                                        type="date"
                                        value={data.booking_date}
                                        onChange={e => setData('booking_date', e.target.value)}
                                        min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                                    />
                                    {errors.booking_date && (
                                        <p className="text-rose-400 text-xs mt-1">{errors.booking_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-2">
                                        <Icon name="users" size={16} className="text-cyan-400" />
                                        Número de personas
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <button type="button"
                                            onClick={() => setData('persons_quantity', Math.max(1, data.persons_quantity - 1))}
                                            className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 text-white font-bold text-xl flex items-center justify-center transition">
                                            <Icon name="minus" size={18} />
                                        </button>
                                        <span className="text-3xl font-bold w-12 text-center">{data.persons_quantity}</span>
                                        <button type="button"
                                            onClick={() => setData('persons_quantity', Math.min(20, data.persons_quantity + 1))}
                                            className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 text-white font-bold text-xl flex items-center justify-center transition">
                                            <Icon name="plus" size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <label className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                                <Icon name="building" size={16} className="text-cyan-400" />
                                                Selecciona un hotel
                                            </label>
                                            <p className="text-slate-500 text-xs mt-1">
                                                {pkg.includes_hotel ? 'El paquete incluye alojamiento.' : 'Alojamiento opcional.'}
                                            </p>
                                        </div>
                                        {!pkg.includes_hotel && (
                                            <button type="button" onClick={handleToggleHotel}
                                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                                    data.include_hotel
                                                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950'
                                                        : 'bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50'
                                                }`}>
                                                {data.include_hotel ? '✓ Activado' : 'Agregar'}
                                            </button>
                                        )}
                                    </div>

                                    {pkg.hotels?.length > 0 ? (
                                        <div className="space-y-3">
                                            {pkg.hotels.map((hotel) => (
                                                <button key={hotel.id} type="button"
                                                    onClick={() => setData('hotel_id', hotel.id)}
                                                    className={`w-full rounded-xl border p-4 text-left transition ${
                                                        data.hotel_id === hotel.id
                                                            ? 'border-cyan-500/60 bg-cyan-500/10'
                                                            : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600'
                                                    }`}>
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="font-semibold text-white">{hotel.name}</p>
                                                            <div className="flex gap-0.5 mt-1">
                                                                {[...Array(hotel.stars || 0)].map((_, i) => (
                                                                    <Icon key={i} name="star" size={12} className="text-yellow-400 fill-yellow-400" />
                                                                ))}
                                                            </div>
                                                            <p className="text-slate-500 text-xs mt-1">{hotel.address}</p>
                                                        </div>
                                                        <div className="text-right flex-shrink-0">
                                                            <p className="text-cyan-300 font-bold">
                                                                S/. {Number(hotel.price_per_person || 0).toFixed(2)}
                                                            </p>
                                                            <p className="text-slate-500 text-xs">por noche</p>
                                                            {data.hotel_id === hotel.id && (
                                                                <span className="mt-2 inline-flex rounded-full bg-cyan-500 px-2 py-0.5 text-xs font-semibold text-slate-950">
                                                                    Seleccionado
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 text-slate-400 text-sm">
                                            No hay hoteles registrados para este paquete.
                                        </div>
                                    )}
                                </div>

                                {pkg.tour_guides?.length > 0 && (
                                    <div>
                                        <label className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-3">
                                            <Icon name="users" size={16} className="text-cyan-400" />
                                            Elige tu guía turístico
                                        </label>
                                        <div className="space-y-2">
                                            {[...pkg.tour_guides].sort(() => Math.random() - 0.5).slice(0, 3).map((guide) => (
                                                <div key={guide.id} onClick={() => setData('guide_id', guide.id)}
                                                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                                                        Number(data.guide_id) === guide.id
                                                            ? 'border-cyan-500/60 bg-cyan-500/10'
                                                            : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600'
                                                    }`}>
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-800 border border-cyan-500/30 text-cyan-400 font-bold text-lg flex items-center justify-center">
                                                        {guide.first_name.charAt(0)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-white">{guide.first_name} {guide.last_name}</p>
                                                        <p className="text-slate-400 text-xs flex items-center gap-1.5 mt-0.5">
                                                            <Icon name="globe" size={12} />
                                                            {guide.languages}
                                                        </p>
                                                    </div>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                                        Number(data.guide_id) === guide.id
                                                            ? 'border-cyan-500 bg-cyan-500'
                                                            : 'border-slate-500'
                                                    }`}>
                                                        {Number(data.guide_id) === guide.id && (
                                                            <Icon name="check" size={12} className="text-white" />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-2">
                                        <Icon name="coffee" size={16} className="text-cyan-400" />
                                        Selecciona un restaurante
                                    </label>
                                    <p className="text-slate-500 text-xs mb-3">
                                        Elige un restaurante recomendado para completar tu experiencia.
                                    </p>

                                    {pkg.restaurants?.length > 0 ? (
                                        <div className="space-y-3">
                                            {pkg.restaurants.map((restaurant) => (
                                                <button key={restaurant.id} type="button"
                                                    onClick={() => setData('restaurant_id', restaurant.id)}
                                                    className={`w-full rounded-xl border p-4 text-left transition ${
                                                        data.restaurant_id === restaurant.id
                                                            ? 'border-cyan-500/60 bg-cyan-500/10'
                                                            : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600'
                                                    }`}>
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="font-semibold text-white">{restaurant.name}</p>
                                                            <p className="text-slate-400 text-xs mt-1">{restaurant.cuisine_type}</p>
                                                            <p className="text-slate-500 text-xs mt-1 flex items-center gap-1.5">
                                                                <Icon name="map-pin" size={11} />
                                                                {restaurant.address}
                                                            </p>
                                                        </div>
                                                        <div className="text-right flex-shrink-0">
                                                            <p className="text-cyan-300 font-bold">
                                                                S/. {Number(restaurant.price_per_person || 0).toFixed(2)}
                                                            </p>
                                                            <p className="text-slate-500 text-xs">aprox./persona</p>
                                                            {data.restaurant_id === restaurant.id && (
                                                                <span className="mt-2 inline-flex rounded-full bg-cyan-500 px-2 py-0.5 text-xs font-semibold text-slate-950">
                                                                    Seleccionado
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 text-slate-400 text-sm">
                                            No hay restaurantes registrados para este paquete.
                                        </div>
                                    )}
                                </div>

                                <button type="submit" disabled={processing}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 disabled:from-slate-600 disabled:to-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold py-4 rounded-xl transition shadow-lg shadow-cyan-500/20 text-lg flex items-center justify-center gap-2">
                                    {processing ? (
                                        <><Icon name="loader" size={20} className="animate-spin" /> Procesando...</>
                                    ) : (
                                        <><Icon name="check-circle" size={20} /> Confirmar Reserva</>
                                    )}
                                </button>

                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden sticky top-6">
                            <div className="relative h-40 overflow-hidden">
                                <img src={pkg.image_url} alt={pkg.title} loading="lazy" decoding="async" className="w-full h-full object-cover"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                            </div>
                            <div className="p-5">
                                <p className="flex items-center gap-1.5 text-slate-400 text-sm mb-1">
                                    <Icon name="map-pin" size={14} className="text-cyan-400" />
                                    {pkg.location?.city}, {pkg.location?.region}
                                </p>
                                <h3 className="text-white font-bold text-lg">{pkg.title}</h3>
                                <div className="flex items-center gap-3 mt-2 text-slate-400 text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <Icon name="calendar" size={14} />
                                        {pkg.duration_days} día(s)
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Icon name="users" size={14} />
                                        {data.persons_quantity} persona(s)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-5">
                            <h3 className="flex items-center gap-2 font-bold text-lg mb-4">
                                <Icon name="wallet" size={18} className="text-cyan-400" />
                                Resumen de costos
                            </h3>

                            <div className="space-y-3 text-sm">

                                <div className="flex justify-between text-slate-400">
                                    <span>Paquete base × {data.persons_quantity}</span>
                                    <span>S/. {baseTotal.toFixed(2)}</span>
                                </div>

                                {data.include_hotel && selectedHotel && (
                                    <div className="flex justify-between text-slate-400">
                                        <span className="flex items-center gap-1.5">
                                            <Icon name="building" size={13} />
                                            {selectedHotel.name} × {data.persons_quantity}
                                        </span>
                                        <span>S/. {hotelExtra.toFixed(2)}</span>
                                    </div>
                                )}

                                {selectedRestaurant && restaurantExtra > 0 && (
                                    <div className="flex justify-between text-slate-400">
                                        <span className="flex items-center gap-1.5">
                                            <Icon name="coffee" size={13} />
                                            {selectedRestaurant.name} × {data.persons_quantity}
                                        </span>
                                        <span>S/. {restaurantExtra.toFixed(2)}</span>
                                    </div>
                                )}

                                {offer && discountAmt > 0 && (
                                    <div className="flex justify-between text-emerald-400">
                                        <span className="flex items-center gap-1.5">
                                            <Icon name="tag" size={13} />
                                            Descuento ({offer.discount_percentage}%)
                                        </span>
                                        <span>- S/. {discountAmt.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="border-t border-slate-700/50 pt-3 flex justify-between font-bold text-lg">
                                    <span className="text-white">Total</span>
                                    <span className="text-cyan-400">S/. {totalFinal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
