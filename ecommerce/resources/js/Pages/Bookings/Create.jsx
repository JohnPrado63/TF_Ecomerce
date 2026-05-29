import { Head, useForm, Link } from '@inertiajs/react';
import DatePicker from '@/Components/DatePicker';

export default function Create({ package: pkg }) {
    const { data, setData, post, processing, errors } = useForm({
        package_id:       pkg.id,
        booking_date:     '',
        persons_quantity: 1,
        include_hotel:    false,
    });

    // Calcular total automáticamente
    const baseTotal  = pkg.price * data.persons_quantity;
    const hotelExtra = data.include_hotel ? 80 * data.persons_quantity : 0;
    const totalFinal = baseTotal + hotelExtra;

    function handleSubmit(e) {
        e.preventDefault();
        post('/bookings');
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
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

                            {/* Incluir hotel */}
                            {!pkg.includes_hotel && (
                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">
                                        🏨 ¿Incluir alojamiento?
                                    </label>
                                    <div
                                        onClick={() => setData('include_hotel', !data.include_hotel)}
                                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                                            data.include_hotel
                                                ? 'border-cyan-500 bg-cyan-900/30'
                                                : 'border-slate-600 bg-slate-800'
                                        }`}
                                    >
                                        <div>
                                            <p className="font-medium">Agregar hotel</p>
                                            <p className="text-slate-400 text-sm">+S/. 80.00 por persona</p>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                            data.include_hotel
                                                ? 'border-cyan-500 bg-cyan-500'
                                                : 'border-slate-500'
                                        }`}>
                                            {data.include_hotel && (
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

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

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-slate-300">
                                    <span>S/. {Number(pkg.price).toFixed(2)} × {data.persons_quantity} persona(s)</span>
                                    <span>S/. {baseTotal.toFixed(2)}</span>
                                </div>

                                {data.include_hotel && (
                                    <div className="flex justify-between text-slate-300">
                                        <span>Hotel × {data.persons_quantity} persona(s)</span>
                                        <span>S/. {hotelExtra.toFixed(2)}</span>
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