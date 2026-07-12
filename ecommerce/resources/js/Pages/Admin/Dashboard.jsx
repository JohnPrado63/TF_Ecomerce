import { Head, Link } from '@inertiajs/react';
import AdminNavbar from '@/Components/AdminNavbar';
import AdminStatCard from '@/Components/AdminStatCard';
import StatusBadge from '@/Components/StatusBadge';

export default function Dashboard({ stats, reservasRecientes }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Panel Admin - ESKY TRIPS" />
            <AdminNavbar />

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
                {/* Header */}
                <div className="mb-6 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        Panel de Administración
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base">
                        Bienvenido de vuelta · Resumen de tu negocio
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
                    <AdminStatCard
                        icon="compass"
                        label="Total Paquetes"
                        value={stats.paquetes}
                        trend="Activos en el sistema"
                        color="cyan"
                    />
                    <AdminStatCard
                        icon="calendar"
                        label="Total Reservas"
                        value={stats.reservas}
                        trend="Reservas acumuladas"
                        color="violet"
                    />
                    <AdminStatCard
                        icon="users"
                        label="Total Usuarios"
                        value={stats.usuarios}
                        trend="Usuarios registrados"
                        color="blue"
                    />
                    <AdminStatCard
                        icon="banknote"
                        label="Ingresos Confirmados"
                        value={`S/. ${Number(stats.ingresos).toFixed(2)}`}
                        trend="Ingresos verificados"
                        color="emerald"
                    />
                </div>

                {/* Reservas Recientes */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 px-6 py-5 border-b border-slate-700/50 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </span>
                                    Reservas Recientes
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">Últimas reservas del sistema</p>
                            </div>
                            <Link
                                href="/admin/bookings"
                                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1 transition-colors"
                            >
                                Ver todas
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {reservasRecientes.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </div>
                                <p className="text-slate-500">No hay reservas recientes</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {reservasRecientes.map((booking, index) => (
                                    <div
                                        key={booking.id}
                                        className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Index indicator */}
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-800/50 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-sm">
                                                #{index + 1}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                                                    {booking.tour_package?.title}
                                                </p>
                                                <p className="text-slate-500 text-sm flex items-center gap-2 mt-0.5">
                                                    <span className="flex items-center gap-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                            <circle cx="12" cy="7" r="4"></circle>
                                                        </svg>
                                                        {booking.client?.first_name}
                                                    </span>
                                                    <span className="text-slate-600">·</span>
                                                    <span className="flex items-center gap-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                                        </svg>
                                                        {booking.booking_date}
                                                    </span>
                                                    <span className="text-slate-600">·</span>
                                                    <span className="flex items-center gap-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                            <circle cx="9" cy="7" r="4"></circle>
                                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                        </svg>
                                                        {booking.persons_quantity} persona(s)
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <StatusBadge status={booking.status} />
                                            <p className="text-cyan-400 font-bold text-lg">
                                                S/. {Number(booking.total_amount).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
