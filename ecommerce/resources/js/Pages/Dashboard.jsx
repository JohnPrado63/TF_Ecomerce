import { Head, Link } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import SectionHeader from '@/Components/SectionHeader';

export default function Dashboard({ auth, bookings, stats }) {

    const statusConfig = {
        pending:   { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: 'clock' },
        confirmed: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: 'check-circle' },
        cancelled: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', icon: 'x-circle' },
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Mi Panel - ESKY TRIPS" />

            <div className="space-y-8">

                <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-slate-800 border border-cyan-500/30 flex items-center justify-center">
                            <Icon name="compass" size={28} className="text-cyan-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">
                                ¡Bienvenido, {auth.user.name}!
                            </h1>
                            <p className="text-slate-400 text-sm">
                                Gestiona tus reservas y explora nuevos destinos en Ayacucho.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-5 hover:border-cyan-500/30 transition group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition">
                                <Icon name="calendar" size={18} className="text-cyan-400" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium">Total reservas</p>
                        </div>
                        <p className="text-4xl font-bold text-cyan-400">{stats?.total ?? 0}</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-5 hover:border-emerald-500/30 transition group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition">
                                <Icon name="check-circle" size={18} className="text-emerald-400" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium">Confirmadas</p>
                        </div>
                        <p className="text-4xl font-bold text-emerald-400">{stats?.confirmed ?? 0}</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-5 hover:border-amber-500/30 transition group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition">
                                <Icon name="clock" size={18} className="text-amber-400" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium">Pendientes</p>
                        </div>
                        <p className="text-4xl font-bold text-amber-400">{stats?.pending ?? 0}</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Icon name="calendar" size={20} className="text-cyan-400" />
                            Mis últimas reservas
                        </h2>
                        <Link
                            href="/bookings"
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
                        >
                            Ver todas
                            <Icon name="arrow-right" size={14} />
                        </Link>
                    </div>

                    {bookings?.length === 0 ? (
                        <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-800/50">
                            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                                <Icon name="briefcase" size={32} className="text-slate-600" />
                            </div>
                            <p className="text-slate-400 mb-6">
                                Aún no tienes reservas
                            </p>
                            <Link
                                href="/packages"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                            >
                                <Icon name="compass" size={16} />
                                Explorar paquetes
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {bookings.map((booking) => {
                                const status = statusConfig[booking.status] || statusConfig.pending;
                                return (
                                    <div
                                        key={booking.id}
                                        className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition group"
                                    >
                                        <img
                                            src={booking.tour_package?.image_url}
                                            alt={booking.tour_package?.title}
                                            className="w-16 h-16 rounded-xl object-cover border border-slate-700/50"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-white group-hover:text-cyan-300 transition truncate">{booking.tour_package?.title}</p>
                                            <div className="flex items-center gap-3 text-slate-400 text-sm mt-1">
                                                <span className="flex items-center gap-1.5">
                                                    <Icon name="map-pin" size={13} className="text-slate-500" />
                                                    {booking.tour_package?.location?.city}
                                                </span>
                                                <span className="text-slate-700">•</span>
                                                <span className="flex items-center gap-1.5">
                                                    <Icon name="calendar" size={13} className="text-slate-500" />
                                                    {booking.booking_date}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${status.bg} ${status.border} ${status.text}`}>
                                                <Icon name={status.icon} size={12} />
                                                {booking.status === 'pending' ? 'Pendiente' : booking.status === 'confirmed' ? 'Confirmado' : 'Cancelado'}
                                            </span>
                                            <p className="text-cyan-400 font-bold text-lg mt-1">
                                                S/. {Number(booking.total_amount).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                            <Icon name="sparkles" size={24} className="text-cyan-400" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-white mb-2">¿Listo para tu próximo viaje?</h2>
                            <p className="text-slate-400 text-sm mb-4">
                                Descubre los mejores destinos turísticos de Ayacucho que tenemos para ti.
                            </p>
                            <Link
                                href="/packages"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                            >
                                <Icon name="compass" size={16} />
                                Explorar paquetes turísticos
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </Authenticated>
    );
}
