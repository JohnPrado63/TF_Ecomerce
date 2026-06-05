import { Head, useForm, Link } from '@inertiajs/react';
import DatePicker from '@/Components/DatePicker';
import Navbar from '@/Components/Navbar';

export default function Create({ package: pkg }) {
    const { data, setData, post, processing, errors } = useForm({
        package_id:       pkg.id,
        booking_date:     '',
        persons_quantity: 1,
        include_hotel:    pkg.includes_hotel || false,
        hotel_id:         pkg.hoteles?.[0]?.id ?? null,
        restaurante_id:   pkg.restaurantes?.[0]?.id ?? null,
    });

    const selectedHotel = pkg.hoteles?.find(hotel => hotel.id === data.hotel_id);
    const selectedRestaurant = pkg.restaurantes?.find(rest => rest.id === data.restaurante_id);

    const hotelPricePerPerson = Number(selectedHotel?.price_per_person ?? 0);
    const restaurantPricePerPerson = Number(selectedRestaurant?.price_per_person ?? 0);
    const baseTotal           = pkg.price * data.persons_quantity;
    // Sum hotel cost whenever the user includes/selects hotel (keeps UI consistent with selection)
    const hotelExtra          = data.include_hotel && selectedHotel ? hotelPricePerPerson * data.persons_quantity : 0;
    const restaurantExtra     = selectedRestaurant ? restaurantPricePerPerson * data.persons_quantity : 0;
    const totalFinal          = baseTotal + hotelExtra + restaurantExtra;

    function handleToggleHotel() {
        const nextState = !data.include_hotel;
        setData('include_hotel', nextState);
        if (nextState && !data.hotel_id && pkg.hoteles?.length) {
            setData('hotel_id', pkg.hoteles[0].id);
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

            <div className="container mx-auto px-6 py-10 max-w-4xl">

                {/* Botón volver */}
                <Link
                    href={`/packages/${pkg.id}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm mb-6 inline-block"
                >
                    ← Volver al paquete
                </Link>

                <h1 className="text-3xl font-bold mb-8">Confirmar Reserva</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Formulario izquierda */}
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-6">Datos del viaje</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Fecha de viaje */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    📅 Fecha de viaje
                                </label>
                                <DatePicker
                                    value={data.booking_date}
                                    onChange={e => setData('booking_date', e)}
                                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                                />
                                {errors.booking_date && (
                                    <p className="text-red-400 text-xs mt-1">{errors.booking_date}</p>
                                )}
                            </div>

                            {/* Número de personas */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    👥 Número de personas
                                </label>
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setData('persons_quantity', Math.max(1, data.persons_quantity - 1))}
                                        className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-bold text-xl flex items-center justify-center"
                                    >
                                        -
                                    </button>
                                    <span className="text-2xl font-bold w-8 text-center">
                                        {data.persons_quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setData('persons_quantity', Math.min(20, data.persons_quantity + 1))}
                                        className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-bold text-xl flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                                {errors.persons_quantity && (
                                    <p className="text-red-400 text-xs mt-1">{errors.persons_quantity}</p>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <div>
                                        <label className="block text-slate-300 text-sm font-medium mb-2">
                                            🏨 Selecciona un hotel
                                        </label>
                                        <p className="text-slate-500 text-sm">
                                            {pkg.includes_hotel
                                                ? 'El paquete incluye alojamiento. Elige el hotel preferido.'
                                                : 'Agrega alojamiento opcional y selecciona el hotel cercano.'}
                                        </p>
                                    </div>
                                    {!pkg.includes_hotel && (
                                        <button
                                            type="button"
                                            onClick={handleToggleHotel}
                                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                                data.include_hotel
                                                    ? 'bg-cyan-500 text-slate-950'
                                                    : 'bg-slate-800 text-slate-200 border border-slate-700'
                                            }`}>
                                            {data.include_hotel ? 'Alojamiento activado' : 'Agregar hotel'}
                                        </button>
                                    )}
                                </div>

                                {pkg.hoteles?.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-3">
                                        {pkg.hoteles.map((hotel) => (
                                            <button
                                                key={hotel.id}
                                                type="button"
                                                onClick={() => setData('hotel_id', hotel.id)}
                                                className={`group w-full rounded-[28px] border p-4 text-left transition duration-300 ${
                                                    data.hotel_id === hotel.id
                                                        ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_20px_80px_rgba(6,182,212,0.15)]'
                                                        : 'border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                                            <p className="font-semibold text-white text-base">{hotel.nombre}</p>
                                                            <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-400">
                                                                {hotel.estrellas ?? '–'}⭐
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-400 text-sm">{hotel.direccion}</p>
                                                        <p className="text-slate-500 text-sm mt-2">Tel: {hotel.telefono}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-cyan-300 font-semibold text-lg">S/. {Number(hotel.price_per_person).toFixed(2)}</p>
                                                        <p className="text-slate-500 text-xs mt-1">por persona</p>
                                                        {data.hotel_id === hotel.id && (
                                                            <span className="mt-3 inline-flex rounded-full bg-cyan-500 px-3 py-1 text-[11px] font-semibold text-slate-950">
                                                                Seleccionado
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-4 text-slate-400">
                                        No hay hoteles registrados para este paquete todavía.
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    🍽️ Selecciona un restaurante cercano
                                </label>
                                <p className="text-slate-500 text-sm mb-3">
                                    Elige un restaurante recomendado para completar tu paquete.
                                </p>

                                {pkg.restaurantes?.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-3">
                                        {pkg.restaurantes.map((restaurante) => (
                                            <button
                                                key={restaurante.id}
                                                type="button"
                                                onClick={() => setData('restaurante_id', restaurante.id)}
                                                className={`group w-full rounded-[28px] border p-4 text-left transition duration-300 ${
                                                    data.restaurante_id === restaurante.id
                                                        ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_20px_80px_rgba(6,182,212,0.12)]'
                                                        : 'border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="font-semibold text-white text-base">{restaurante.nombre}</p>
                                                        <p className="text-slate-400 text-sm">{restaurante.tipo_comida}</p>
                                                        <p className="text-slate-500 text-sm mt-2">{restaurante.direccion}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-cyan-300 font-semibold text-lg">S/. {Number(restaurante.price_per_person).toFixed(2)}</p>
                                                        <p className="text-slate-500 text-xs mt-1">aprox. por persona</p>
                                                        {data.restaurante_id === restaurante.id && (
                                                            <span className="mt-3 inline-flex rounded-full bg-cyan-500 px-3 py-1 text-[11px] font-semibold text-slate-950">
                                                                Seleccionado
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-4 text-slate-400">
                                        No hay restaurantes registrados para este paquete todavía.
                                    </div>
                                )}
                            </div>

                            {/* Botón submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-900 font-bold py-3 rounded-xl transition text-lg mt-4"
                            >
                                {processing ? 'Procesando...' : 'Confirmar Reserva'}
                            </button>

                        </form>
                    </div>

                    {/* Resumen derecha */}
                    <div className="space-y-4">

                        {/* Info del paquete */}
                        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                            <img
                                src={pkg.image_url}
                                alt={pkg.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <p className="text-slate-400 text-sm">
                                    📍 {pkg.location?.city}, {pkg.location?.region}
                                </p>
                                <h3 className="text-white font-bold text-lg">{pkg.title}</h3>
                                <p className="text-slate-400 text-sm mt-1">
                                    📅 {pkg.duration_days} día(s)
                                </p>
                            </div>
                        </div>

                        {/* Resumen de costos */}
                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                            <h3 className="font-bold text-lg mb-4">Resumen de costos</h3>

                            <div className="space-y-4 text-sm">
                                <div className="grid grid-cols-[1fr_auto] items-center gap-4 text-slate-300">
                                    <span>Paquete base</span>
                                    <span>S/. {baseTotal.toFixed(2)}</span>
                                </div>

                                {data.include_hotel && (
                                    <div className="grid grid-cols-[1fr_auto] items-center gap-4 text-slate-300">
                                        <span>{pkg.includes_hotel ? 'Hotel incluido' : `Hotel × ${data.persons_quantity} persona(s)`}</span>
                                        <span>S/. {hotelExtra.toFixed(2)}</span>
                                    </div>
                                )}

                                {selectedHotel && (
                                    <div className="rounded-2xl bg-slate-950/60 border border-slate-700 p-3">
                                        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                                            <div>
                                                <p className="font-medium text-slate-100">Hotel elegido</p>
                                                <p className="text-slate-300 text-sm mt-1">{selectedHotel.nombre}</p>
                                            </div>
                                            <span className="text-cyan-300 font-semibold">S/. {hotelPricePerPerson.toFixed(2)}</span>
                                        </div>
                                        <p className="text-slate-500 text-xs mt-2">por persona</p>
                                    </div>
                                )}

                                {selectedRestaurant && (
                                    <div className="rounded-2xl bg-slate-950/60 border border-slate-700 p-3">
                                        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                                            <div>
                                                <p className="font-medium text-slate-100">Restaurante elegido</p>
                                                <p className="text-slate-300 text-sm mt-1">{selectedRestaurant.nombre}</p>
                                            </div>
                                            <span className="text-cyan-300 font-semibold">S/. {restaurantPricePerPerson.toFixed(2)}</span>
                                        </div>
                                        <p className="text-slate-500 text-xs mt-2">por persona</p>
                                    </div>
                                )}

                                {selectedRestaurant && (
                                    <div className="grid grid-cols-[1fr_auto] items-center gap-4 text-slate-300">
                                        <span>Restaurante × {data.persons_quantity} persona(s)</span>
                                        <span>S/. {restaurantExtra.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="border-t border-slate-700 pt-3 flex justify-between font-bold text-lg">
                                    <span>Total</span>
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