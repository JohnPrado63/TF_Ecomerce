import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';

export default function Show({ booking, payment }) {
    const { data, setData, post, processing, errors } = useForm({
        booking_id:      booking.id,
        method:          'yape',
        voucher:         null,
        order_reference: '',
    });

    const [mpLoading, setMpLoading] = useState(false);

    async function handleMercadoPago() {
        setMpLoading(true);
        try {
            const response = await axios.post('/payments/mp/preference', {
                booking_id: booking.id,
            });

            const result = response.data;

            if (result.sandbox_init_point) {
                window.location.href = result.sandbox_init_point;
            } else {
                alert('Error al procesar el pago');
            }
        } catch (error) {
            console.error('Error completo:', error);
            const errorMessage = error.response?.data?.error || error.message;
            alert('Error: ' + errorMessage);
        } finally {
            setMpLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        post('/payments', { forceFormData: true });
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Pagar Reserva - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-10 max-w-4xl">

                <Link href="/bookings" className="text-cyan-400 hover:text-cyan-300 text-sm mb-6 inline-block">
                    ← Volver a mis reservas
                </Link>

                <h1 className="text-3xl font-bold mb-8">Realizar Pago</h1>

                {/* Estado del pago */}
                {payment?.status === 'pending' && !payment?.method && (
                    <div className="bg-blue-900/30 border border-blue-700 rounded-2xl p-5 mb-6">
                        <p className="text-blue-300 font-semibold flex items-center gap-2">
                            <Icon name="info" size={18} />
                            Selecciona un método de pago para continuar.
                        </p>
                        <p className="text-blue-400 text-sm mt-1">Tu reserva está aguardando el registro de tu pago.</p>
                    </div>
                )}
                {payment?.status === 'pending' && payment?.method && (
                    <div className="bg-yellow-900/30 border border-yellow-700 rounded-2xl p-5 mb-6">
                        <p className="text-yellow-300 font-semibold flex items-center gap-2">
                            <Icon name="clock" size={18} />
                            Tu comprobante está siendo verificado.</p>
                        <p className="text-yellow-400 text-sm mt-1">Te notificaremos cuando se confirme tu reserva.</p>
                    </div>
                )}
                {payment?.status === 'verified' && (
                    <div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 mb-6">
                        <p className="text-green-300 font-semibold flex items-center gap-2">
                            <Icon name="check-circle" size={18} />
                            Tu pago fue verificado y tu reserva está confirmada.
                        </p>
                    </div>
                )}
                {payment?.status === 'rejected' && (
                    <div className="bg-red-900/30 border border-red-700 rounded-2xl p-5 mb-6">
                        <p className="text-red-300 font-semibold flex items-center gap-2">
                            <Icon name="x-circle" size={18} />
                            Tu pago fue rechazado. Por favor sube un nuevo comprobante.
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Método de pago */}
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-4">Método de pago</h2>

                        {/* Selector método - solo si no está verificado */}
                        {payment?.status !== 'verified' && (
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <button type="button" onClick={() => setData('method', 'yape')}
                                    className={`py-3 rounded-xl font-bold text-sm border transition flex items-center justify-center gap-2 ${
                                        data.method === 'yape'
                                            ? 'bg-purple-600 border-purple-500 text-white'
                                            : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-purple-500'
                                    }`}>
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-black">Y</div>
                                    Yape
                                </button>

                                <button type="button" onClick={() => setData('method', 'plin')}
                                    className={`py-3 rounded-xl font-bold text-sm border transition flex items-center justify-center gap-2 ${
                                        data.method === 'plin'
                                            ? 'bg-green-600 border-green-500 text-white'
                                            : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-green-500'
                                    }`}>
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-black">P</div>
                                    Plin
                                </button>

                                <button type="button" onClick={() => setData('method', 'efectivo')}
                                    className={`py-3 rounded-xl font-bold text-sm border transition flex items-center justify-center gap-2 ${
                                        data.method === 'efectivo'
                                            ? 'bg-cyan-600 border-cyan-500 text-white'
                                            : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-cyan-500'
                                    }`}>
                                    <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-white text-xs font-black">$</div>
                                    Efectivo
                                </button>

                                <button type="button" onClick={() => setData('method', 'mercadopago')}
                                    className={`py-3 rounded-xl font-bold text-sm border transition flex items-center justify-center gap-2 ${
                                        data.method === 'mercadopago'
                                            ? 'bg-blue-600 border-blue-500 text-white'
                                            : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-blue-500'
                                    }`}>
                                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-black">MP</div>
                                    MercadoPago
                                </button>
                            </div>
                        )}

                        {/* Método ya seleccionado (para referencia) */}
                        {payment?.status !== 'verified' && payment?.method && (
                            <div className="bg-slate-800 rounded-xl p-3 mb-4 text-center">
                                <p className="text-slate-400 text-sm">
                                    Método seleccionado: <span className="text-white font-semibold flex items-center gap-1">
                                        {payment.method === 'yape' && <><Icon name="credit-card" size={14} /> Yape</>}
                                        {payment.method === 'plin' && <><Icon name="credit-card" size={14} /> Plin</>}
                                        {payment.method === 'efectivo' && <><Icon name="banknote" size={14} /> Efectivo</>}
                                        {payment.method === 'mercadopago' && <><Icon name="credit-card" size={14} /> MercadoPago</>}
                                    </span>
                                </p>
                            </div>
                        )}

                        {/* QR Yape/Plin */}
                        {(data.method === 'yape' || data.method === 'plin') && (
                            <div className="text-center">
                                <p className="text-slate-400 text-sm mb-3">
                                    Escanea el QR para pagar con {data.method === 'yape' ? 'Yape' : 'Plin'}
                                </p>
                                <div className="bg-white p-4 rounded-2xl inline-block mb-3">
                                    <img
                                        src={data.method === 'yape'
                                            ? '/images/QR.png'
                                            : 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=plin://pay?phone=51927496713'
                                        }
                                        alt="QR de pago"
                                        className="w-48 h-48 object-contain"
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

                        {/* Efectivo s*/}
                        {data.method === 'efectivo' && (
                            <div className="bg-slate-800 rounded-xl p-4 text-center">
                                <p className="text-slate-300 text-sm">
                                    Acércate a nuestras oficinas para realizar el pago en efectivo.
                                </p>
                                <p className="text-slate-400 text-xs mt-2 flex items-center gap-1">
                                    <Icon name="map-pin" size={12} /> Jr. Lima 123, Huamanga, Ayacucho</p>
                            </div>
                        )}

                        {/* MercadoPago */}
                        {data.method === 'mercadopago' && payment?.status !== 'verified' && (
                            <div className="mt-4">
                                <p className="text-slate-400 text-sm mb-4">
                                    Serás redirigido a MercadoPago para completar tu pago de forma segura con tarjeta o billetera digital.
                                </p>
                                <button
                                    onClick={handleMercadoPago}
                                    disabled={mpLoading}
                                    className="w-full bg-blue-500 hover:bg-blue-400 disabled:bg-slate-600 text-white font-bold py-3 rounded-xl transition"
                                >
                                    {mpLoading ? 'Procesando...' : <><Icon name="credit-card" size={16} className="inline" /> Pagar S/. {Number(booking.total_amount).toFixed(2)} con MercadoPago</>}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Resumen y comprobante */}
                    <div className="space-y-4">

                        {/* Número de orden */}
                        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-5">
                            <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Número de orden</p>
                            <p className="text-2xl font-black text-cyan-400 tracking-widest">{booking.order_number}</p>
                            <p className="text-slate-500 text-xs mt-2 flex items-center gap-1">
                                <Icon name="info" size={14} /> Incluye este número en el concepto de tu pago para identificarlo más rápido.
                            </p>
                        </div>

                        {/* Resumen reserva */}
                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                            <h3 className="font-bold mb-4">Resumen de reserva</h3>
                            <div className="flex gap-3 mb-4">
                                <img src={booking.tour_package?.image_url} alt={booking.tour_package?.title}
                                    className="w-16 h-16 rounded-xl object-cover" />
                                <div>
                                    <p className="font-semibold">{booking.tour_package?.title}</p>
                                    <p className="text-slate-400 text-sm flex items-center gap-1">
                                        <Icon name="map-pin" size={14} /> {booking.tour_package?.location?.city}
                                    </p>
                                    <p className="text-slate-400 text-sm flex items-center gap-1">
                                        <Icon name="calendar" size={14} /> {booking.booking_date}
                                    </p>
                                </div>
                            </div>
                            <div className="border-t border-slate-700 pt-3 flex justify-between font-bold text-lg">
                                <span>Total a pagar</span>
                                <span className="text-cyan-400">S/. {Number(booking.total_amount).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Subir comprobante - solo para Yape, Plin, Efectivo cuando no está verificado */}
                        {data.method !== 'mercadopago' && data.method && payment?.status !== 'verified' && (
                            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                                <h3 className="font-bold mb-4">Subir comprobante</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    <div>
                                        <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                                            <Icon name="file-text" size={16} />
                                            Referencia del pago (opcional)
                                        </label>
                                        <input type="text" value={data.order_reference}
                                            onChange={e => setData('order_reference', e.target.value)}
                                            placeholder={`Ej: ${booking.order_number}`}
                                            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-300 text-sm font-medium mb-2">
                                            Captura del pago
                                        </label>
                                        <input type="file" accept="image/*"
                                            onChange={e => setData('voucher', e.target.files[0])}
                                            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-500 file:text-slate-900 file:font-semibold file:text-xs"
                                        />
                                        {errors.voucher && <p className="text-red-400 text-xs mt-1">{errors.voucher}</p>}
                                    </div>

                                    <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-3">
                                        <p className="text-green-300 text-xs font-semibold mb-1">💬 ¿Prefieres pagar por WhatsApp?</p>
                                        <a
                                            href={`https://wa.me/51927496713?text=Hola,%20quiero%20confirmar%20mi%20reserva%20ESKY%20TRIPS.%20N%C3%BAmero%20de%20orden:%20${booking.order_number}%20-%20${booking.tour_package?.title}%20-%20S/.%20${booking.total_amount}`}
                                            target="_blank" rel="noreferrer"
                                            className="text-green-400 hover:text-green-300 text-xs underline transition"
                                        >
                                            Enviar comprobante por WhatsApp →
                                        </a>
                                    </div>

                                    <button type="submit" disabled={processing || !data.voucher}
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