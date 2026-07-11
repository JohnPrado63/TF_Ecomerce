import AdminNavbar from '@/Components/AdminNavbar';
import Icon from '@/Components/Icon';
import { Head, Link, router } from '@inertiajs/react';

export default function Payments({ payments = [] }) {

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

            <AdminNavbar />

            <div className="container mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8">Gestión de Pagos</h1>

                {/* Leyenda */}
                <div className="flex flex-wrap gap-4 mb-6 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-slate-400">Pendiente (sin comprobante)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                        <span className="text-slate-400">Pendiente (con comprobante)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-slate-400">Verificado</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-slate-400">Rechazado</span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                <th className="text-left p-4">Reserva</th>
                                <th className="text-left p-4">Cliente</th>
                                <th className="text-left p-4">Método</th>
                                <th className="text-left p-4">Monto</th>
                                <th className="text-left p-4">Notas</th>
                                <th className="text-left p-4">Comprobante</th>
                                <th className="text-left p-4">Estado</th>
                                <th className="text-left p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center p-8 text-slate-400">
                                        No hay pagos registrados aún
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment) => {
                                    const hasVoucher = !!payment.voucher_path;
                                    const hasMethod = !!payment.method;
                                    const isPendingWithoutMethod = payment.status === 'pending' && !hasMethod;
                                    const isPendingWithVoucher = payment.status === 'pending' && hasVoucher;

                                    return (
                                        <tr key={payment.id} className={`border-b border-slate-800 transition ${
                                            isPendingWithoutMethod ? 'bg-yellow-900/10 hover:bg-yellow-900/20' : 'hover:bg-slate-800/50'
                                        }`}>
                                            <td className="p-4 font-semibold text-sm">
                                                <div>
                                                    <p>{payment.booking?.tour_package?.title || 'Sin paquete'}</p>
                                                    <p className="text-slate-500 text-xs font-normal">{payment.booking?.order_number}</p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-400 text-sm">
                                                {payment.booking?.client?.first_name || 'Anónimo'}
                                            </td>
                                            <td className="p-4 text-sm">
                                                {payment.method === 'yape' && <span className="flex items-center gap-1"><Icon name="credit-card" size={14} /> Yape</span>}
                                                {payment.method === 'plin' && <span className="flex items-center gap-1"><Icon name="credit-card" size={14} /> Plin</span>}
                                                {payment.method === 'efectivo' && <span className="flex items-center gap-1"><Icon name="banknote" size={14} /> Efectivo</span>}
                                                {payment.method === 'mercadopago' && <span className="flex items-center gap-1"><Icon name="credit-card" size={14} /> MercadoPago</span>}
                                                {!payment.method && (
                                                    <span className="text-slate-500 italic">Sin método</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-cyan-400 font-bold">
                                                S/. {Number(payment.amount).toFixed(2)}
                                            </td>
                                            <td className="p-4 text-slate-400 text-sm max-w-[200px]">
                                                {payment.notes || '-'}
                                            </td>
                                            <td className="p-4">
                                                {hasVoucher ? (
                                                    <a
                                                        href={`/storage/${payment.voucher_path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                                                    >
                                                        📎 Ver comprobante
                                                    </a>
                                                ) : (
                                                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                                                        isPendingWithoutMethod
                                                            ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700'
                                                            : 'text-slate-600'
                                                    }`}>
                                                        {isPendingWithoutMethod ? (
                                                            <><Icon name="clock" size={12} /> Sin comprobante</>
                                                        ) : '—'}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[payment.status] || 'bg-slate-700'}`}>
                                                    {statusLabel[payment.status] || payment.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {payment.status === 'pending' && (
                                                    <div className="flex flex-col gap-2">
                                                        <button
                                                            onClick={() => verify(payment.id, 'verified')}
                                                            className="text-xs bg-green-900 hover:bg-green-800 text-green-300 px-3 py-1 rounded-lg transition flex items-center gap-1"
                                                        >
                                                            <Icon name="check" size={12} /> Verificar
                                                        </button>
                                                        <button
                                                            onClick={() => verify(payment.id, 'rejected')}
                                                            className="text-xs bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1 rounded-lg transition flex items-center gap-1"
                                                        >
                                                            <Icon name="x" size={12} /> Rechazar
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
