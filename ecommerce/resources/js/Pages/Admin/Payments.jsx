import { Head, Link, router } from '@inertiajs/react';

export default function Payments({ payments = [] }) { // Se añade valor por defecto para evitar errores si llega undefined

    const statusColor = {
        pending:  'bg-yellow-900 text-yellow-300',
        verified: 'bg-green-900 text-green-300',
        rejected: 'bg-red-900 text-red-300',
    };

    const statusLabel = {
        pending:  'Pendiente',
        verified: 'Verificado',
        rejected: 'Rechazado',
    };

    function verify(id, status) {
        if (confirm(status === 'verified' ? '¿Confirmar pago?' : '¿Rechazar pago?')) {
            router.put(`/admin/payments/${id}/verify`, { status });
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Gestión de Pagos - Admin" />

            {/* Navbar admin */}
            <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span className="font-bold text-xl text-cyan-400">ESKY TRIPS Admin</span>
                    <div className="flex gap-4">
                        <Link href="/admin/dashboard" className="text-slate-400 hover:text-white transition">
                            Dashboard
                        </Link>
                        <Link href="/admin/packages" className="text-slate-400 hover:text-white transition">
                            Paquetes
                        </Link>
                        <Link href="/admin/bookings" className="text-slate-400 hover:text-white transition">
                            Reservas
                        </Link>
                        <Link href="/admin/payments" className="text-white font-semibold border-b-2 border-cyan-500 pb-1">
                            Pagos
                        </Link>
                    </div>
                </div>
                <Link href="/" className="text-slate-400 hover:text-white text-sm transition">
                    ← Volver al sitio
                </Link>
            </nav>

            <div className="container mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8">Gestión de Pagos</h1>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                <th className="text-left p-4">Reserva</th>
                                <th className="text-left p-4">Cliente</th>
                                <th className="text-left p-4">Método</th>
                                <th className="text-left p-4">Monto</th>
                                <th className="text-left p-4">Comprobante</th>
                                <th className="text-left p-4">Estado</th>
                                <th className="text-left p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-8 text-slate-400">
                                        No hay pagos registrados aún
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment) => (
                                    <tr key={payment.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                                        <td className="p-4 font-semibold text-sm">
                                            {payment.booking?.tour_package?.title || 'Sin paquete'}
                                        </td>
                                        <td className="p-4 text-slate-300 text-sm">
                                            {payment.booking?.client?.first_name || 'Anónimo'}
                                        </td>
                                        <td className="p-4 text-sm">
                                            {payment.method === 'yape' && '💜 Yape'}
                                            {payment.method === 'plin' && '💚 Plin'}
                                            {payment.method === 'efectivo' && '💵 Efectivo'}
                                        </td>
                                        <td className="p-4 text-cyan-400 font-bold">
                                            S/. {Number(payment.amount).toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            {payment.voucher_path ? (
                                                <a
                                                    href={`/storage/${payment.voucher_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                                                >
                                                    Ver comprobante
                                                </a>
                                            ) : (
                                                <span className="text-slate-500 text-sm">Sin comprobante</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[payment.status] || 'bg-slate-700'}`}>
                                                {statusLabel[payment.status] || payment.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {payment.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => verify(payment.id, 'verified')}
                                                        className="text-xs bg-green-900 hover:bg-green-800 text-green-300 px-3 py-1 rounded-lg transition"
                                                    >
                                                        ✅ Verificar
                                                    </button>
                                                    <button
                                                        onClick={() => verify(payment.id, 'rejected')}
                                                        className="text-xs bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1 rounded-lg transition"
                                                    >
                                                        ❌ Rechazar
                                                    </button>
                                                </div>
                                            )}
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
