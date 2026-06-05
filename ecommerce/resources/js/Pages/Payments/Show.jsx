import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Show({ booking, payment }) {

    const { data, setData, post, processing, errors } = useForm({
        booking_id: booking.id,
        method: 'yape',
        voucher: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/payments', {
            forceFormData: true,
        });
    }

    const qrImages = {
        yape: '/images/QR.png',
        plin: './public/images/QR.png',
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Pagar Reserva - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-10 max-w-4xl">

                <Link href="/bookings" className="text-cyan-400 hover:text-cyan-300 text-sm mb-6 inline-block">
                    ← Volver a mis reservas
                </Link>

                <h1 className="text-3xl font-bold mb-8">Realizar Pago</h1>

                {/* Si ya subió comprobante */}
                {payment?.status === 'pending' && (
                    <div className="bg-yellow-900/30 border border-yellow-700 rounded-2xl p-5 mb-6">
                        <p className="text-yellow-300 font-semibold">
                            ⏳ Tu comprobante está siendo verificado por el administrador.
                        </p>
                        <p className="text-yellow-400 text-sm mt-1">
                            Te notificaremos cuando se confirme tu reserva.
                        </p>
                    </div>
                )}

                {payment?.status === 'verified' && (
                    <div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 mb-6">
                        <p className="text-green-300 font-semibold">
                            ✅ Tu pago fue verificado y tu reserva está confirmada.
                        </p>
                    </div>
                )}

                {payment?.status === 'rejected' && (
                    <div className="bg-red-900/30 border border-red-700 rounded-2xl p-5 mb-6">
                        <p className="text-red-300 font-semibold">
                            ❌ Tu pago fue rechazado. Por favor sube un nuevo comprobante.
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* QR y método de pago */}
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-4">Método de pago</h2>

                        {/* Selector método */}
                        <div className="flex gap-3 mb-6">
                            <button
                                type="button"
                                onClick={() => setData('method', 'yape')}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm border transition ${
                                    data.method === 'yape'
                                        ? 'bg-purple-600 border-purple-500 text-white'
                                        : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'
                                }`}
                            >
                                💜 Yape
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('method', 'plin')}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm border transition ${
                                    data.method === 'plin'
                                        ? 'bg-green-600 border-green-500 text-white'
                                        : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'
                                }`}
                            >
                                💚 Plin
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('method', 'efectivo')}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm border transition ${
                                    data.method === 'efectivo'
                                        ? 'bg-cyan-600 border-cyan-500 text-white'
                                        : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'
                                }`}
                            >
                                💵 Efectivo
                            </button>
                        </div>

                        {/* QR */}
                        {data.method !== 'efectivo' && (
                            <div className="text-center">
                                <p className="text-slate-400 text-sm mb-3">
                                    Escanea el QR para pagar con {data.method === 'yape' ? 'Yape' : 'Plin'}
                                </p>
                                <div className="bg-white p-4 rounded-2xl inline-block mb-3">
                                    <img
                                        src={qrImages[data.method]}
                                        alt="QR de pago"
                                        className="w-48 h-48"
                                    />
                                </div>
                                <p className="text-slate-400 text-xs">
                                    Número: <span className="text-white font-bold">+51 927 496 713</span>
                                </p>
                                <p className="text-slate-400 text-xs">
                                    A nombre de: <span className="text-white font-bold">Jhon C. Sulca Prado</span>
                                </p>
                            </div>
                        )}

                        {data.method === 'efectivo' && (
                            <div className="bg-slate-800 rounded-xl p-4 text-center">
                                <p className="text-slate-300 text-sm">
                                    Acércate a nuestras oficinas para realizar el pago en efectivo.
                                </p>
                                <p className="text-slate-400 text-xs mt-2">
                                    📍 Jr. Lima 123, Huamanga, Ayacucho
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Resumen y subir comprobante */}
                    <div className="space-y-4">

                        {/* Resumen */}
                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                            <h3 className="font-bold mb-4">Resumen de reserva</h3>
                            <div className="flex gap-3 mb-4">
                                <img
                                    src={booking.tour_package?.image_url}
                                    alt={booking.tour_package?.title}
                                    className="w-16 h-16 rounded-xl object-cover"
                                />
                                <div>
                                    <p className="font-semibold">{booking.tour_package?.title}</p>
                                    <p className="text-slate-400 text-sm">
                                        📍 {booking.tour_package?.location?.city}
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        📅 {booking.booking_date}
                                    </p>
                                </div>
                            </div>
                            <div className="border-t border-slate-700 pt-3 flex justify-between font-bold text-lg">
                                <span>Total a pagar</span>
                                <span className="text-cyan-400">
                                    S/. {Number(booking.total_amount).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Subir comprobante */}
                        {(!payment || payment.status === 'rejected') && (
                            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                                <h3 className="font-bold mb-4">Subir comprobante</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    <div>
                                        <label className="block text-slate-300 text-sm font-medium mb-2">
                                            Captura del pago
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('voucher', e.target.files[0])}
                                            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-500 file:text-slate-900 file:font-semibold file:text-xs"
                                        />
                                        {errors.voucher && (
                                            <p className="text-red-400 text-xs mt-1">{errors.voucher}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing || !data.voucher}
                                        className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-900 font-bold py-3 rounded-xl transition"
                                    >
                                        {processing ? 'Enviando...' : 'Enviar comprobante'}
                                    </button>

                                </form>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}