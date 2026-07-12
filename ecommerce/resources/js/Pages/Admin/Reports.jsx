import { Head, Link } from '@inertiajs/react';
import AdminNavbar from '@/Components/AdminNavbar';
import AdminStatCard from '@/Components/AdminStatCard';
import Icon from '@/Components/Icon';

export default function Reports({ salesByMonth, topPackages, summary }) {

    const months = [
        '', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Reportes - Admin" />
            <AdminNavbar />

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Reportes y Estadísticas</h1>
                    <p className="text-slate-400 text-sm mt-1">Resumen del rendimiento de tu negocio</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <AdminStatCard
                        icon="trophy"
                        label="Total Ventas"
                        value={`S/. ${Number(summary.total_ventas || 0).toFixed(2)}`}
                        trend="Reservas confirmadas"
                        color="emerald"
                    />
                    <AdminStatCard
                        icon="calendar"
                        label="Total Reservas"
                        value={summary.total_reservas || 0}
                        trend="Reservas acumuladas"
                        color="cyan"
                    />
                    <AdminStatCard
                        icon="clock"
                        label="Reservas Hoy"
                        value={summary.reservas_hoy || 0}
                        trend="Nuevas hoy"
                        color="amber"
                    />
                    <AdminStatCard
                        icon="alert-circle"
                        label="Pagos Pendientes"
                        value={summary.pagos_pendientes || 0}
                        trend="Por verificar"
                        color="rose"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Ventas por mes */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500/10 to-slate-900/80 px-6 py-5 border-b border-slate-700/50">
                            <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                    <Icon name="trending-up" size={20} className="text-emerald-400" />
                                </span>
                                Ventas por mes
                            </h2>
                        </div>
                        <div className="p-6">
                            {salesByMonth.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                                        <Icon name="trending-up" size={32} className="text-slate-600" />
                                    </div>
                                    <p className="text-slate-500">No hay ventas confirmadas aún</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {salesByMonth.map((sale, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 rounded-xl transition">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-slate-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                                                    {months[sale.month]?.substring(0, 3)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{months[sale.month]} {sale.year}</p>
                                                    <p className="text-slate-500 text-xs flex items-center gap-1">
                                                        <Icon name="calendar" size={12} />
                                                        {sale.total_bookings} reserva(s)
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-emerald-400 font-bold text-lg">
                                                S/. {Number(sale.total_sales).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Paquetes más reservados */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-500/10 to-slate-900/80 px-6 py-5 border-b border-slate-700/50">
                            <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                    <Icon name="trophy" size={20} className="text-cyan-400" />
                                </span>
                                Paquetes más reservados
                            </h2>
                        </div>
                        <div className="p-6">
                            {topPackages.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                                        <Icon name="compass" size={32} className="text-slate-600" />
                                    </div>
                                    <p className="text-slate-500">No hay reservas aún</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {topPackages.map((pkg, i) => (
                                        <div key={pkg.id} className="flex items-center gap-4 p-4 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 rounded-xl transition">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                                                i === 0 ? 'bg-gradient-to-br from-yellow-500/30 to-amber-600/20 border border-yellow-500/40 text-yellow-400' :
                                                i === 1 ? 'bg-gradient-to-br from-slate-400/30 to-slate-600/20 border border-slate-400/40 text-slate-300' :
                                                i === 2 ? 'bg-gradient-to-br from-amber-600/30 to-amber-800/20 border border-amber-600/40 text-amber-500' :
                                                'bg-gradient-to-br from-cyan-500/20 to-slate-800 border border-cyan-500/30 text-cyan-400'
                                            }`}>
                                                #{i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-white truncate">{pkg.title}</p>
                                                <p className="text-slate-500 text-xs flex items-center gap-1">
                                                    <Icon name="calendar" size={12} />
                                                    {pkg.bookings_count} reserva(s)
                                                </p>
                                            </div>
                                            <p className="text-cyan-400 font-bold text-lg flex-shrink-0">
                                                S/. {Number(pkg.bookings_sum_total_amount || 0).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
