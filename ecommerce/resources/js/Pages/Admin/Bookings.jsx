import AdminNavbar from '@/Components/AdminNavbar';
import Icon from '@/Components/Icon';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Bookings({ bookings }) {

    const [filter, setFilter] = useState('all');

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

    const tabs = [
        { key: 'all', label: 'Todos' },
        { key: 'pending', label: 'Pendientes' },
        { key: 'pending_payment', label: 'Pago pendiente' },
        { key: 'confirmed', label: 'Confirmados' },
        { key: 'cancelled', label: 'Cancelados' },
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
                <h1 className="text-3xl font-bold mb-8">Gestión de Reservas</h1>

                {/* Tabs de filtro */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                                filter === tab.key
                                    ? 'bg-cyan-500 text-slate-900'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                        >
                            {tab.label}
                            {tab.key !== 'all' && (
                                <span className="ml-2 opacity-60 text-xs">
                                    ({tab.key === 'pending' ? bookings.filter(b => b.status === 'pending').length :
                                      tab.key === 'pending_payment' ? bookings.filter(b => b.status === 'pending' && (!b.payment_status || b.payment_status === 'pending')).length :
                                      tab.key === 'confirmed' ? bookings.filter(b => b.status === 'confirmed').length :
                                      bookings.filter(b => b.status === 'cancelled').length})
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                <th className="text-left p-4">Paquete</th>
                                <th className="text-left p-4">Cliente</th>
                                <th className="text-left p-4">Fecha</th>
                                <th className="text-left p-4">Personas</th>
                                <th className="text-left p-4">Guía</th>
                                <th className="text-left p-4">Total</th>
                                <th className="text-left p-4">Estado reserva</th>
                                <th className="text-left p-4">Estado pago</th>
                                <th className="text-left p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center p-8 text-slate-400">
                                        No hay reservas en esta categoría
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((booking) => (
                                    <tr key={booking.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                                        <td className="p-4 font-semibold text-sm">
                                            <div>
                                                <p>{booking.tour_package?.title}</p>
                                                <p className="text-slate-500 text-xs font-normal">{booking.order_number}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-300 text-sm">
                                            {booking.client?.first_name}
                                        </td>
                                        <td className="p-4 text-slate-300 text-sm">
                                            {booking.booking_date}
                                        </td>
                                        <td className="p-4 text-slate-300 text-sm">
                                            {booking.persons_quantity}
                                        </td>
                                        <td className="p-4 text-sm">
                                            {booking.guide ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center">
                                                        {booking.guide.nombre.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-xs font-semibold">
                                                            {booking.guide.nombre} {booking.guide.apellido}
                                                        </p>
                                                        <p className="text-slate-500 text-xs">
                                                            {booking.guide.telefono}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-slate-600 text-xs">Sin guía</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-cyan-400 font-bold">
                                            S/. {Number(booking.total_amount).toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[booking.status]}`}>
                                                {statusLabel[booking.status]}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {booking.payment_status === 'verified' && (
                                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-900 text-green-300 flex items-center gap-1">
                                                    <Icon name="check-circle" size={12} /> Verificado
                                                </span>
                                            )}
                                            {booking.payment_status === 'pending' && (
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                                                    booking.payment_voucher ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-900/50 text-yellow-400 border border-yellow-700'
                                                }`}>
                                                    {booking.payment_voucher ? (
                                                        <><Icon name="clock" size={12} /> Pendiente</>
                                                    ) : (
                                                        <><Icon name="alert-triangle" size={12} /> Sin comprobante</>
                                                    )}
                                                </span>
                                            )}
                                            {booking.payment_status === 'rejected' && (
                                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-900 text-red-300 flex items-center gap-1">
                                                    <Icon name="x-circle" size={12} /> Rechazado
                                                </span>
                                            )}
                                            {(!booking.payment_status || booking.payment_status === 'none') && booking.status !== 'cancelled' && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-500 border border-slate-700 flex items-center gap-1">
                                                    <Icon name="eye" size={12} /> Abierto
                                                </span>
                                            )}
                                            {booking.status === 'cancelled' && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-500">
                                                    —Canceled
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2 flex-col">
                                                {booking.status === 'pending' && (
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'confirmed')}
                                                        className="text-xs bg-green-900 hover:bg-green-800 text-green-300 px-3 py-1 rounded-lg transition"
                                                    >
                                                        Confirmar
                                                    </button>
                                                )}
                                                {booking.status !== 'cancelled' && (
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'cancelled')}
                                                        className="text-xs bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1 rounded-lg transition"
                                                    >
                                                        Cancelar
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
    );
}
