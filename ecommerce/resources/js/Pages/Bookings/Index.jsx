import { Head, Link, router } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';

export default function Index({ bookings }) {

    const statusColor = {
        pending:   'bg-amber-500/5 text-amber-400/90 border border-amber-500/10',
        confirmed: 'bg-emerald-500/5 text-emerald-400/90 border border-emerald-500/10',
        cancelled: 'bg-rose-500/5 text-rose-400/90 border border-rose-500/10',
    };

    const statusLabel = {
        pending:   'Pendiente',
        confirmed: 'Confirmado',
        cancelled: 'Cancelado',
    };

    function cancelBooking(id) {
        if (confirm('¿Estás seguro de cancelar esta reserva?')) {
            router.delete(`/bookings/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 antialiased font-sans">
            <Navbar />
            <Head title="Mis Reservas - ESKY TRIPS" />

            <div className="max-w-4xl mx-auto px-6 py-16">

                {/* Header */}
                <div className="flex items-end justify-between mb-12 border-b border-slate-900 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Mis Reservas
                        </h1>
                        <p className="text-slate-400/60 mt-1.5 text-xs uppercase tracking-wider font-medium">
                            Historial de viajes
                        </p>
                    </div>
                    <Link
                        href="/packages"
                        className="bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 font-medium px-5 py-2 rounded-xl transition duration-300 text-xs tracking-wide strict"
                    >
                        + Nueva reserva
                    </Link>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-32 bg-slate-900/20 rounded-3xl border border-slate-900/50 backdrop-blur-sm">
                        <Icon name="briefcase" size={48} className="mx-auto mb-4 text-slate-600" />
                        <p className="text-slate-400/80 text-base font-light mb-6">
                            No tienes reservas activas en este momento.
                        </p>
                        <Link
                            href="/packages"
                            className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-300 underline underline-offset-4 decoration-cyan-500/30"
                        >
                            Explorar destinos
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="group bg-slate-900/30 hover:bg-slate-900/50 border border-slate-900/60 hover:border-slate-800/80 rounded-2xl p-5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all duration-500 backdrop-blur-md"
                            >
                                {/* Imagen y contenido */}
                                <div className="flex gap-5 items-center">
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-950 border border-slate-800">
                                        <img
                                            src={booking.tour_package?.image_url}
                                            alt={booking.tour_package?.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700 ease-out"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-slate-200 group-hover:text-cyan-400/90 transition duration-300">
                                            {booking.tour_package?.title}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400/60 font-light">
                                            <span className="flex items-center gap-1">
                                                <Icon name="map-pin" size={12} className="text-slate-500" />
                                                {booking.tour_package?.location?.city}
                                            </span>
                                            <span className="text-slate-800">•</span>
                                            <span className="flex items-center gap-1">
                                                <Icon name="calendar" size={12} className="text-slate-500" />
                                                {booking.booking_date}
                                            </span>
                                            <span className="text-slate-800">•</span>
                                            <span className="flex items-center gap-1">
                                                <Icon name="users" size={12} className="text-slate-500" />
                                                {booking.persons_quantity} {booking.persons_quantity === 1 ? 'persona' : 'personas'}
                                            </span>
                                            {booking.guide && (
                                                <p className="text-cyan-400/70 text-xs mt-0.5 flex items-center gap-1">
                                                    <Icon name="sparkles" size={12} /> Guía: {booking.guide.nombre} {booking.guide.apellido}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Estado, precio y acciones (Llamativo e intuitivo) */}
                                <div className="flex flex-col items-end gap-3 min-w-[180px] w-full md:w-auto border-t md:border-t-0 border-slate-900/60 pt-4 md:pt-0">
                                    <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-1">
                                        <span className={`text-[10px] tracking-wider uppercase font-medium px-2.5 py-0.5 rounded-full ${statusColor[booking.status]}`}>
                                            {statusLabel[booking.status]}
                                        </span>
                                        <p className="text-white font-semibold text-xl tracking-tight mt-1">
                                            S/. {Number(booking.total_amount).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    
                                    {booking.status === 'pending' && booking.payment_status !== 'verified' && (
                                        <div className="flex items-center gap-4 w-full md:w-auto justify-end mt-1">
                                            <button
                                                onClick={() => cancelBooking(booking.id)}
                                                className="text-slate-500 hover:text-rose-400 text-xs font-light transition duration-300 px-1 py-2"
                                            >
                                                Cancelar
                                            </button>
                                            
                                            {/* BOTÓN IRRESISTIBLE DE PAGO */}
                                            <Link
                                                href={`/payments/${booking.id}`}
                                                className="relative group/btn overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all duration-300 text-xs tracking-wide shadow-[0_4px_20px_rgba(6,182,212,0.15)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.35)] hover:-translate-y-0.5 active:translate-y-0 transform flex items-center gap-1.5"
                                            >
                                                <Icon name="credit-card" size={14} />
                                                <span>Pagar ahora</span>
                                                <Icon name="arrow-right" size={14} className="inline-block transition-transform duration-300 group-hover/btn:translate-x-0.5" />

                                                {/* Destello de luz interno al pasar el cursor */}
                                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite] text-transparent" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
