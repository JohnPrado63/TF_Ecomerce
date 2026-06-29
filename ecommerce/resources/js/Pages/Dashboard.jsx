import { Head, Link } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth, bookings, stats }) {

    const statusColor = {
        pending:   'bg-yellow-900 text-yellow-300',
        confirmed: 'bg-green-900 text-green-300',
        cancelled: 'bg-red-900 text-red-300',
    };

    const statusLabel = {
        pending:   'Pendiente',
        confirmed: 'Confirmado',
        cancelled: 'Cancelado',
    };

    return (
        <Authenticated user={auth.user} header={
            <h2 className="text-white font-bold text-lg">Mi Panel</h2>
        }>
            <Head title="Mi Panel - ESKY TRIPS" />

            <div className="space-y-8">

                {/* Bienvenida */}
                <div className="bg-gradient-to-r from-cyan-900/40 to-slate-900 border border-cyan-800/50 rounded-2xl p-6">
                    <h1 className="text-2xl font-bold mb-1">
                        ¡Bienvenido, {auth.user.name}! 👋
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Desde aquí puedes gestionar tus reservas y explorar nuevos destinos en Ayacucho.
                    </p>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm mb-1">Total reservas</p>
                        <p className="text-4xl font-bold text-cyan-400">{stats?.total ?? 0}</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm mb-1">Confirmadas</p>
                        <p className="text-4xl font-bold text-green-400">{stats?.confirmed ?? 0}</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm mb-1">Pendientes</p>
                        <p className="text-4xl font-bold text-yellow-400">{stats?.pending ?? 0}</p>
                    </div>
                </div>

                {/* Reservas recientes */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Mis últimas reservas</h2>
                        <Link
                            href="/bookings"
                            className="text-cyan-400 hover:text-cyan-300 text-sm transition"
                        >
                            Ver todas →
                        </Link>
                    </div>

                    {bookings?.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-6xl mb-4">🧳</p>
                            <p className="text-slate-400 mb-4">
                                Aún no tienes reservas
                            </p>
                            <Link
                                href="/packages"
                                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-2 rounded-xl transition text-sm"
                            >
                                Explorar paquetes
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition"
                                >
                                    <img
                                        src={booking.tour_package?.image_url}
                                        alt={booking.tour_package?.title}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold">{booking.tour_package?.title}</p>
                                        <p className="text-slate-400 text-sm flex items-center gap-1">
                                            <Icon name="map-pin" size={14} className="text-slate-500" />
                                            {booking.tour_package?.location?.city}
                                            <span className="mx-1">·</span>
                                            <Icon name="calendar" size={14} className="text-slate-500" />
                                            {booking.booking_date}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[booking.status]}`}>
                                            {statusLabel[booking.status]}
                                        </span>
                                        <p className="text-cyan-400 font-bold mt-1">
                                            S/. {Number(booking.total_amount).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Explorar más */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">¿Listo para tu próximo viaje?</h2>
                    <p className="text-slate-400 text-sm mb-4">
                        Descubre los mejores destinos turísticos de Ayacucho que tenemos para ti.
                    </p>
                    <Link
                        href="/packages"
                        className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition"
                    >
                        🧳 Explorar paquetes turísticos
                    </Link>
                </div>

            </div>
        </Authenticated>
    );
}