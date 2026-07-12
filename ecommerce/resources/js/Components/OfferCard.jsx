import { Link } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import StatusBadge from '@/Components/StatusBadge';

export default function OfferCard({ offer, onEdit, onDelete }) {
    const discountColors = {
        high: 'from-rose-600/30 to-orange-600/10 border-rose-500/40',
        medium: 'from-cyan-600/30 to-blue-600/10 border-cyan-500/40',
        low: 'from-emerald-600/20 to-teal-600/10 border-emerald-500/40',
    };

    const discountLevel = offer.discount_percentage >= 25 ? 'high' : offer.discount_percentage >= 15 ? 'medium' : 'low';

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const getDaysRemaining = (endDate) => {
        if (!endDate) return null;
        const end = new Date(endDate);
        const now = new Date();
        const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };

    const daysRemaining = getDaysRemaining(offer.end_date);

    return (
        <div
            className={`
                relative overflow-hidden
                bg-gradient-to-br ${discountColors[discountLevel]}
                border rounded-2xl p-6
                transition-all duration-300 ease-out
                hover:shadow-xl hover:shadow-slate-950/30 hover:-translate-y-1
            `}
        >
            {/* Discount Badge */}
            <div className="absolute top-4 right-4">
                <span className="flex items-center gap-1 bg-rose-500/90 text-white text-lg font-black px-4 py-1.5 rounded-full shadow-lg">
                    🔥 {offer.discount_percentage}% OFF
                </span>
            </div>

            {/* Content */}
            <div className="pr-16 sm:pr-24 mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1">
                    {offer.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {offer.description}
                </p>
            </div>

            {/* Code Badge */}
            {offer.code && (
                <div className="mb-4">
                    <div className="inline-flex items-center gap-2 border-2 border-dashed border-cyan-500/50 rounded-lg px-4 py-2 bg-slate-900/50">
                        <Icon name="tag" size={16} className="text-cyan-400" />
                        <span className="text-cyan-300 font-mono font-bold text-lg tracking-widest">
                            {offer.code}
                        </span>
                    </div>
                </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                {/* Dates */}
                <div className="flex items-center gap-2 text-slate-400">
                    <Icon name="calendar" size={16} />
                    <span>{formatDate(offer.start_date)} - {formatDate(offer.end_date)}</span>
                </div>

                {/* Days Remaining */}
                {daysRemaining !== null && daysRemaining > 0 && (
                    <div className={`flex items-center gap-2 ${daysRemaining <= 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        <Icon name="clock" size={16} />
                        <span className="font-medium">{daysRemaining} día{daysRemaining !== 1 ? 's' : ''} restante{daysRemaining !== 1 ? 's' : ''}</span>
                    </div>
                )}

                {daysRemaining === 0 && (
                    <div className="flex items-center gap-2 text-rose-400">
                        <Icon name="alert-circle" size={16} />
                        <span className="font-medium">Vencida</span>
                    </div>
                )}
            </div>

            {/* Status and Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <StatusBadge
                    status={offer.active ? 'active' : 'inactive'}
                />

                <div className="flex items-center gap-2">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(offer)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white text-sm font-medium rounded-lg transition-all duration-200"
                        >
                            <Icon name="pencil" size={14} />
                            Editar
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(offer)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-red-200 text-sm font-medium rounded-lg transition-all duration-200 border border-red-500/30"
                        >
                            <Icon name="trash2" size={14} />
                            Eliminar
                        </button>
                    )}
                </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-transparent to-rose-500/10 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        </div>
    );
}
