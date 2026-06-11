import { Head, Link } from '@inertiajs/react';
import AdminNavbar from '@/Components/AdminNavbar';
export default function Reports({ salesByMonth, topPackages, summary }) {

    const months = [
        '', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Reportes - Admin" />

            {/* Navbar admin */}
            <AdminNavbar /> 

            <div className="container mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8">Reportes y Estadísticas</h1>

                {/* Resumen */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm mb-1">Total Ventas</p>
                        <p className="text-3xl font-bold text-green-400">
                            S/. {Number(summary.total_ventas).toFixed(2)}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">Reservas confirmadas</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm mb-1">Total Reservas</p>
                        <p className="text-3xl font-bold text-cyan-400">{summary.total_reservas}</p>
                        <p className="text-slate-500 text-xs mt-1">Todas las reservas</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm mb-1">Reservas Hoy</p>
                        <p className="text-3xl font-bold text-yellow-400">{summary.reservas_hoy}</p>
                        <p className="text-slate-500 text-xs mt-1">Nuevas hoy</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                        <p className="text-slate-400 text-sm mb-1">Pagos Pendientes</p>
                        <p className="text-3xl font-bold text-red-400">{summary.pagos_pendientes}</p>
                        <p className="text-slate-500 text-xs mt-1">Por verificar</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Ventas por mes */}
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-6">📊 Ventas por mes</h2>
                        {salesByMonth.length === 0 ? (
                            <p className="text-slate-400 text-sm text-center py-8">
                                No hay ventas confirmadas aún
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {salesByMonth.map((sale, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-slate-800 rounded-xl">
                                        <div>
                                            <p className="font-semibold">
                                                {months[sale.month]} {sale.year}
                                            </p>
                                            <p className="text-slate-400 text-xs">
                                                {sale.total_bookings} reserva(s)
                                            </p>
                                        </div>
                                        <p className="text-green-400 font-bold">
                                            S/. {Number(sale.total_sales).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Paquetes más reservados */}
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-6">🏆 Paquetes más reservados</h2>
                        {topPackages.length === 0 ? (
                            <p className="text-slate-400 text-sm text-center py-8">
                                No hay reservas aún
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {topPackages.map((pkg, i) => (
                                    <div key={pkg.id} className="flex items-center gap-4 p-3 bg-slate-800 rounded-xl">
                                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">{pkg.title}</p>
                                            <p className="text-slate-400 text-xs">
                                                {pkg.bookings_count} reserva(s)
                                            </p>
                                        </div>
                                        <p className="text-cyan-400 font-bold text-sm">
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
    );
}