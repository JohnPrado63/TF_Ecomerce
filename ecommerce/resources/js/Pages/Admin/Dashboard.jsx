import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, reservasRecientes }) {

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
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Panel Admin - ESKY TRIPS" />

            {/* Navbar admin */}
            <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span className="font-bold text-xl text-cyan-400">ESKY TRIPS Admin</span>
                    <div className="flex gap-4">
                        <Link href="/admin/dashboard" className="text-white font-semibold border-b-2 border-cyan-500 pb-1">
                            Dashboard
                        </Link>
                        <Link href="/admin/packages" className="text-slate-400 hover:text-white transition">
                            Paquetes
                        </Link>
                        <Link href="/admin/bookings" className="text-slate-400 hover:text-white transition">
                            Reservas
                        </Link>
                    </div>
                </div>
                <Link href="/" className="text-slate-400 hover:text-white text-sm transition">
                    ← Volver al sitio
                </Link>
            </nav>

            <div className="container mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

                {/* Tarjetas de estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <p className="text-slate-400 text-sm mb-1">Total Paquetes</p>
                        <p className="text-4xl font-bold text-cyan-400">{stats.paquetes}</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <p className="text-slate-400 text-sm mb-1">Total Reservas</p>
                        <p className="text-4xl font-bold text-cyan-400">{stats.reservas}</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <p className="text-slate-400 text-sm mb-1">Total Usuarios</p>
                        <p className="text-4xl font-bold text-cyan-400">{stats.usuarios}</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <p className="text-slate-400 text-sm mb-1">Ingresos Confirmados</p>
                        <p className="text-4xl font-bold text-green-400">
                            S/. {Number(stats.ingresos).toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Reservas recientes */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-6">Reservas Recientes</h2>
                    <div className="space-y-4">
                        {reservasRecientes.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between border-b border-slate-800 pb-4">
                                <div>
                                    <p className="font-semibold">{booking.tour_package?.title}</p>
                                    <p className="text-slate-400 text-sm">
                                        {booking.client?.first_name} · {booking.booking_date} · {booking.persons_quantity} persona(s)
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[booking.status]}`}>
                                        {statusLabel[booking.status]}
                                    </span>
                                    <p className="text-cyan-400 font-bold">
                                        S/. {Number(booking.total_amount).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}