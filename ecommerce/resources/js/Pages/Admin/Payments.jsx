import AdminNavbar from '@/Components/AdminNavbar';
import Icon from '@/Components/Icon';
import StatusBadge from '@/Components/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';

export default function Payments({ payments = [] }) {

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
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Gestión de Pagos</h1>
                        <p className="text-slate-400 text-sm mt-1">{payments.length} pago(s) registrado(s)</p>
                    </div>
                </div>

                {/* Leyenda */}
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-slate-400 text-xs">Pendiente (sin comprobante)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                        <span className="text-slate-400 text-xs">Pendiente (con comprobante)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-slate-400 text-xs">Verificado</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-slate-400 text-xs">Rechazado</span>
                    </div>
                </div>

                {/* Tabla */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-b-2 border-cyan-500/30">
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                                <Icon name="file-text" size={14} className="text-cyan-400" />
                                            </span>
                                            Reserva
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
                                            <span className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                                <Icon name="credit-card" size={14} className="text-blue-400" />
                                            </span>
                                            Método
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                <Icon name="banknote" size={14} className="text-emerald-400" />
                                            </span>
                                            Monto
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                                <Icon name="file-text" size={14} className="text-amber-400" />
                                            </span>
                                            Notas
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                                                <Icon name="paperclip" size={14} className="text-rose-400" />
                                            </span>
                                            Comprobante
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                <Icon name="check-circle" size={14} className="text-emerald-400" />
                                            </span>
                                            Estado
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
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="p-12 text-center">
                                            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                                                <Icon name="credit-card" size={32} className="text-slate-600" />
                                            </div>
                                            <p className="text-slate-500">No hay pagos registrados aún</p>
                                        </td>
                                    </tr>
                                ) : (
                                    payments.map((payment) => {
                                        const hasVoucher = !!payment.voucher_path;
                                        const hasMethod = !!payment.method;
                                        const isPendingWithoutMethod = payment.status === 'pending' && !hasMethod;
                                        const isPendingWithVoucher = payment.status === 'pending' && hasVoucher;

                                        return (
                                            <tr key={payment.id} className={`border-b border-slate-800/50 transition ${
                                                isPendingWithoutMethod ? 'bg-yellow-900/10' : 'hover:bg-slate-800/30'
                                            }`}>
                                                <td className="p-4">
                                                    <div>
                                                        <p className="font-semibold text-white">{payment.booking?.tour_package?.title || 'Sin paquete'}</p>
                                                        <p className="text-slate-500 text-xs font-mono mt-0.5">{payment.booking?.order_number}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center gap-2 text-slate-300 text-sm">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/30 to-slate-700 border border-violet-500/30 flex items-center justify-center text-violet-300 font-bold text-xs">
                                                            {payment.booking?.client?.first_name?.charAt(0) || '?'}
                                                        </div>
                                                        {payment.booking?.client?.first_name || 'Anónimo'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {payment.method === 'yape' && (
                                                        <span className="inline-flex items-center gap-1.5 text-sm bg-pink-500/20 border border-pink-500/30 px-3 py-1.5 rounded-lg text-pink-300 font-medium">
                                                            <Icon name="smartphone" size={14} /> Yape
                                                        </span>
                                                    )}
                                                    {payment.method === 'plin' && (
                                                        <span className="inline-flex items-center gap-1.5 text-sm bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-300 font-medium">
                                                            <Icon name="smartphone" size={14} /> Plin
                                                        </span>
                                                    )}
                                                    {payment.method === 'efectivo' && (
                                                        <span className="inline-flex items-center gap-1.5 text-sm bg-slate-500/20 border border-slate-500/30 px-3 py-1.5 rounded-lg text-slate-300 font-medium">
                                                            <Icon name="banknote" size={14} /> Efectivo
                                                        </span>
                                                    )}
                                                    {payment.method === 'mercadopago' && (
                                                        <span className="inline-flex items-center gap-1.5 text-sm bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-lg text-blue-300 font-medium">
                                                            <Icon name="credit-card" size={14} /> MercadoPago
                                                        </span>
                                                    )}
                                                    {!payment.method && (
                                                        <span className="text-slate-500 italic text-sm">Sin método</span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-cyan-400 font-bold text-lg">
                                                        S/. {Number(payment.amount).toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-slate-400 text-sm max-w-[200px] line-clamp-2">
                                                        {payment.notes || '-'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {hasVoucher ? (
                                                        <a
                                                            href={`/storage/${payment.voucher_path}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg transition hover:bg-cyan-500/20"
                                                        >
                                                            <Icon name="eye" size={14} /> Ver voucher
                                                        </a>
                                                    ) : (
                                                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg ${
                                                            isPendingWithoutMethod
                                                                ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-400'
                                                                : 'text-slate-600'
                                                        }`}>
                                                            {isPendingWithoutMethod ? (
                                                                <><Icon name="clock" size={12} /> Sin comprobante</>
                                                            ) : '—'}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <StatusBadge status={payment.status} />
                                                </td>
                                                <td className="p-4">
                                                    {payment.status === 'pending' && (
                                                        <div className="flex flex-col gap-1.5">
                                                            <button
                                                                onClick={() => verify(payment.id, 'verified')}
                                                                className="inline-flex items-center gap-1.5 text-xs bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-lg transition border border-emerald-500/30 font-semibold"
                                                            >
                                                                <Icon name="check-circle" size={12} /> Verificar
                                                            </button>
                                                            <button
                                                                onClick={() => verify(payment.id, 'rejected')}
                                                                className="inline-flex items-center gap-1.5 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 px-3 py-1.5 rounded-lg transition border border-red-500/30 font-semibold"
                                                            >
                                                                <Icon name="x-circle" size={12} /> Rechazar
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
        </div>
    );
}
