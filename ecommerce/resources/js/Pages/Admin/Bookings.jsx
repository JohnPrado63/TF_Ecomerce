import AdminNavbar from '@/Components/AdminNavbar';
import Icon from '@/Components/Icon';
import StatusBadge from '@/Components/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Bookings({ bookings }) {
    const [filter, setFilter] = useState('all');

    const tabs = [
        { key: 'all', label: 'Todos', color: 'slate' },
        { key: 'pending', label: 'Pendientes', color: 'amber' },
        { key: 'pending_payment', label: 'Pago pendiente', color: 'yellow' },
        { key: 'confirmed', label: 'Confirmados', color: 'emerald' },
        { key: 'cancelled', label: 'Cancelados', color: 'rose' },
    ];

    const filtered = bookings.filter(b => {
        if (filter === 'all') return true;
        if (filter === 'pending_payment') return b.status === 'pending' && (!b.payment_status || b.payment_status === 'pending');
        return b.status === filter;
    });

    function updateStatus(id, status) {
        router.put(`/admin/bookings/${id}/status`, { status });
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Gestión de Reservas - Admin" />
            <AdminNavbar />

            <div className="container mx-auto px-6 py-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Gestión de Reservas</h1>
                        <p className="text-slate-400 text-sm mt-1">{bookings.length} reserva(s) en total</p>
                    </div>
                </div>

                {/* Tabs de filtro */}
                <div className="flex gap-2 mb-6 flex-wrap bg-slate-900/50 p-1.5 rounded-xl border border-slate-700/50">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
                                filter === tab.key
                                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            {tab.label}
                            {tab.key !== 'all' && (
                                <span className={`text-xs ${filter === tab.key ? 'opacity-70' : 'opacity-50'}`}>
                                    ({tab.key === 'pending' ? bookings.filter(b => b.status === 'pending').length :
                                      tab.key === 'pending_payment' ? bookings.filter(b => b.status === 'pending' && (!b.payment_status || b.payment_status === 'pending')).length :
                                      tab.key === 'confirmed' ? bookings.filter(b => b.status === 'confirmed').length :
                                      bookings.filter(b => b.status === 'cancelled').length})
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tabla */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-b-2 border-cyan-500/30">
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                                <Icon name="compass" size={14} className="text-cyan-400" />
                                            </span>
                                            Paquete
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                                                <Icon name="users" size={14} className="text-violet-400" />
                                            </span>
                                            Cliente
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                                <Icon name="calendar" size={14} className="text-amber-400" />
                                            </span>
                                            Fecha
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                <Icon name="users" size={14} className="text-emerald-400" />
                                            </span>
                                            Personas
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                                <Icon name="compass" size={14} className="text-blue-400" />
                                            </span>
                                            Guía
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                                <Icon name="banknote" size={14} className="text-cyan-400" />
                                            </span>
                                            Total
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                                                <Icon name="clock" size={14} className="text-rose-400" />
                                            </span>
                                            Estado Reserva
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                <Icon name="credit-card" size={14} className="text-emerald-400" />
                                            </span>
                                            Estado Pago
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-slate-500/20 border border-slate-500/30 flex items-center justify-center">
                                                <Icon name="settings" size={14} className="text-slate-400" />
                                            </span>
                                            Acciones
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="p-12 text-center">
                                            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                                                <Icon name="calendar" size={32} className="text-slate-600" />
                                            </div>
                                            <p className="text-slate-500">No hay reservas en esta categoría</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((booking) => (
                                        <tr key={booking.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition">
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-semibold text-white">{booking.tour_package?.title}</p>
                                                    <p className="text-slate-500 text-xs font-mono mt-0.5">{booking.order_number}</p>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-2 text-slate-300 text-sm">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/30 to-slate-700 border border-violet-500/30 flex items-center justify-center text-violet-300 font-bold text-xs">
                                                        {booking.client?.first_name?.charAt(0) || '?'}
                                                    </div>
                                                    {booking.client?.first_name}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                                                    <Icon name="calendar" size={14} className="text-amber-400" />
                                                    {booking.booking_date}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                                                    <Icon name="users" size={14} />
                                                    {booking.persons_quantity}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {booking.guide ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-slate-700 border border-blue-500/30 flex items-center justify-center">
                                                            <span className="text-blue-300 font-bold text-xs">{booking.guide.first_name?.charAt(0)}</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-white text-xs font-semibold">{booking.guide.first_name} {booking.guide.last_name}</p>
                                                            <p className="text-slate-500 text-xs">{booking.guide.phone}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-600 text-xs italic">Sin guía</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <span className="text-cyan-400 font-bold text-lg">
                                                    S/. {Number(booking.total_amount).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <StatusBadge status={booking.status} />
                                            </td>
                                            <td className="p-4">
                                                {booking.payment_status === 'verified' && (
                                                    <StatusBadge status="verified" />
                                                )}
                                                {booking.payment_status === 'pending' && (
                                                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                                                        booking.payment_voucher
                                                            ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                                                            : 'bg-yellow-900/50 border border-yellow-700/50 text-yellow-400'
                                                    }`}>
                                                        <Icon name={booking.payment_voucher ? 'clock' : 'alert-triangle'} size={12} />
                                                        {booking.payment_voucher ? 'Con voucher' : 'Sin voucher'}
                                                    </span>
                                                )}
                                                {booking.payment_status === 'rejected' && (
                                                    <StatusBadge status="rejected" />
                                                )}
                                                {(!booking.payment_status || booking.payment_status === 'none') && booking.status !== 'cancelled' && (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-700/50 border border-slate-600/50 text-slate-400">
                                                        <Icon name="eye" size={12} /> Abierto
                                                    </span>
                                                )}
                                                {booking.status === 'cancelled' && (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-700/50 text-slate-500">
                                                        — Cancelado
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col gap-1.5">
                                                    {booking.status === 'pending' && (
                                                        <button
                                                            onClick={() => updateStatus(booking.id, 'confirmed')}
                                                            className="inline-flex items-center gap-1.5 text-xs bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-lg transition border border-emerald-500/30 font-semibold"
                                                        >
                                                            <Icon name="check" size={12} /> Confirmar
                                                        </button>
                                                    )}
                                                    {booking.status !== 'cancelled' && (
                                                        <button
                                                            onClick={() => updateStatus(booking.id, 'cancelled')}
                                                            className="inline-flex items-center gap-1.5 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 px-3 py-1.5 rounded-lg transition border border-red-500/30 font-semibold"
                                                        >
                                                            <Icon name="x" size={12} /> Cancelar
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
