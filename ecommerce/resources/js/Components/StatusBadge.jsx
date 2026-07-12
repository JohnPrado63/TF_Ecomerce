import Icon from '@/Components/Icon';

export default function StatusBadge({ status, type = 'default' }) {
    const statusConfig = {
        // Reservas
        pending: {
            label: 'Pendiente',
            bg: 'bg-amber-500/20',
            border: 'border-amber-500/40',
            text: 'text-amber-300',
            icon: 'clock',
        },
        confirmed: {
            label: 'Confirmado',
            bg: 'bg-emerald-500/20',
            border: 'border-emerald-500/40',
            text: 'text-emerald-300',
            icon: 'check-circle',
        },
        cancelled: {
            label: 'Cancelado',
            bg: 'bg-red-500/20',
            border: 'border-red-500/40',
            text: 'text-red-300',
            icon: 'x-circle',
        },

        // Pagos
        verified: {
            label: 'Verificado',
            bg: 'bg-emerald-500/20',
            border: 'border-emerald-500/40',
            text: 'text-emerald-300',
            icon: 'check-circle',
        },
        rejected: {
            label: 'Rechazado',
            bg: 'bg-red-500/20',
            border: 'border-red-500/40',
            text: 'text-red-300',
            icon: 'x-circle',
        },
        waiting: {
            label: 'Esperando',
            bg: 'bg-yellow-500/20',
            border: 'border-yellow-500/40',
            text: 'text-yellow-300',
            icon: 'clock',
        },

        // Paquetes
        active: {
            label: 'Activo',
            bg: 'bg-emerald-500/20',
            border: 'border-emerald-500/40',
            text: 'text-emerald-300',
            icon: 'check',
            pulse: true,
        },
        inactive: {
            label: 'Inactivo',
            bg: 'bg-red-500/20',
            border: 'border-red-500/40',
            text: 'text-red-300',
            icon: 'x',
            pulse: false,
        },
        agotado: {
            label: 'Agotado',
            bg: 'bg-yellow-500/20',
            border: 'border-yellow-500/40',
            text: 'text-yellow-300',
            icon: 'alert-circle',
            pulse: false,
        },

        // Ofertas
        'en oferta': {
            label: 'En Oferta',
            bg: 'bg-cyan-500/20',
            border: 'border-cyan-500/40',
            text: 'text-cyan-300',
            icon: 'tag',
            pulse: true,
        },

        // General
        default: {
            label: status,
            bg: 'bg-slate-500/20',
            border: 'border-slate-500/40',
            text: 'text-slate-300',
            icon: 'circle',
        },
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig[type === 'custom' ? 'default' : status?.toLowerCase()] || statusConfig.default;
    const finalConfig = statusConfig[status?.toLowerCase()] || config;

    return (
        <span
            className={`
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-full
                ${finalConfig.bg} ${finalConfig.border} ${finalConfig.text}
                border text-xs font-bold uppercase tracking-wider
                ${finalConfig.pulse ? 'animate-pulse' : ''}
            `}
        >
            <Icon name={finalConfig.icon} size={12} />
            {finalConfig.label}
        </span>
    );
}
