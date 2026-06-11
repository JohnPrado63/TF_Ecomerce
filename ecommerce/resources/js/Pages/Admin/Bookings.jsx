import AdminNavbar from '@/Components/AdminNavbar';
import { Head, Link, router } from '@inertiajs/react';
export default function Bookings({ bookings }) {

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

    function updateStatus(id, status) {
        router.put(`/admin/bookings/${id}/status`, { status });
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Gestión de Reservas - Admin" />

            {/* Navbar admin */}
            <AdminNavbar />

            <div className="container mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8">Gestión de Reservas</h1>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                <th className="text-left p-4">Paquete</th>
                                <th className="text-left p-4">Cliente</th>
                                <th className="text-left p-4">Fecha</th>
                                <th className="text-left p-4">Personas</th>
                                <th className="text-left p-4">Total</th>
                                <th className="text-left p-4">Estado</th>
                                <th className="text-left p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                                    <td className="p-4 font-semibold text-sm">
                                        {booking.tour_package?.title}
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
                                    <td className="p-4 text-cyan-400 font-bold">
                                        S/. {Number(booking.total_amount).toFixed(2)}
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[booking.status]}`}>
                                            {statusLabel[booking.status]}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}