import { Head, Link, router } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';
import SectionHeader from '@/Components/SectionHeader';

export default function Index({ bookings }) {

    const statusConfig = {
        pending:   { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: 'clock', label: 'Pendiente' },
        confirmed: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: 'check-circle', label: 'Confirmado' },
        cancelled: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', icon: 'x-circle', label: 'Cancelado' },
    };

    function cancelBooking(id) {
        if (confirm('¿Estás seguro de cancelar esta reserva?')) {
            router.delete(`/bookings/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Mis Reservas - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-10">

                <SectionHeader
                    title="Mis Reservas"
                    description="Historial de tus viajes y reservas"
                    icon="calendar"
                    actionLabel="Nueva reserva"
                    actionHref="/packages"
                />

                {bookings.length === 0 ? (
                    <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-12 text-center">
                        <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-6">
                            <Icon name="briefcase" size={40} className="text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No tienes reservas activas</h3>
                        <p className="text-slate-400 mb-6 max-w-md mx-auto">
                            Explora nuestros paquetes turísticos y planifica tu próxima aventura en Ayacucho.
                        </p>
                        <Link
                            href="/packages"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                        >
                            <Icon name="compass" size={18} />
                            Explorar destinos
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => {
                            const status = statusConfig[booking.status] || statusConfig.pending;
                            return (
                                <div
                                    key={booking.id}
                                    className="group bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700/50">
                                            <img
                                                src={booking.tour_package?.image_url}
                                                alt={booking.tour_package?.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-white text-lg group-hover:text-cyan-300 transition">
                                                {booking.tour_package?.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-sm text-slate-400">
                                                <span className="flex items-center gap-1.5">
                                                    <Icon name="map-pin" size={14} className="text-slate-500" />
                                                    {booking.tour_package?.location?.city}
                                                </span>
                                                <span className="text-slate-700">•</span>
                                                <span className="flex items-center gap-1.5">
                                                    <Icon name="calendar" size={14} className="text-slate-500" />
                                                    {booking.booking_date}
                                                </span>
                                                <span className="text-slate-700">•</span>
                                                <span className="flex items-center gap-1.5">
                                                    <Icon name="users" size={14} className="text-slate-500" />
                                                    {booking.persons_quantity} {booking.persons_quantity === 1 ? 'persona' : 'personas'}
                                                </span>
                                                {booking.guide && (
                                                    <>
                                                        <span className="text-slate-700">•</span>
                                                        <span className="flex items-center gap-1.5 text-cyan-400/70">
                                                            <Icon name="users" size={14} />
                                                            Guía: {booking.guide.first_name} {booking.guide.last_name}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                                            <div className="flex items-center gap-3">
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${status.bg} ${status.border} ${status.text}`}>
                                                    <Icon name={status.icon} size={12} />
                                                    {status.label}
                                                </span>
                                                <p className="text-white font-bold text-xl">
                                                    S/. {Number(booking.total_amount).toFixed(2)}
                                                </p>
                                            </div>

                                            {booking.status === 'pending' && booking.payment_status !== 'verified' && (
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => cancelBooking(booking.id)}
                                                        className="flex items-center gap-1.5 text-slate-500 hover:text-rose-400 text-sm font-medium transition px-3 py-2 rounded-lg hover:bg-rose-500/10"
                                                    >
                                                        <Icon name="x" size={14} />
                                                        Cancelar
                                                    </button>
                                                    <Link
                                                        href={`/payments/${booking.id}`}
                                                        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20 text-sm"
                                                    >
                                                        <Icon name="credit-card" size={15} />
                                                        Pagar ahora
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
