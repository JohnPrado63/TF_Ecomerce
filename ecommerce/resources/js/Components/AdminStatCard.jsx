import Icon from '@/Components/Icon';

export default function AdminStatCard({ icon, label, value, trend, trendUp = true, color = 'cyan' }) {
    const colorClasses = {
        cyan: {
            iconBg: 'bg-cyan-500/20',
            iconBorder: 'border-cyan-500/30',
            iconText: 'text-cyan-400',
            valueText: 'text-cyan-400',
            borderGlow: 'hover:border-cyan-500/40',
            gradient: 'from-cyan-500/5 to-transparent',
        },
        emerald: {
            iconBg: 'bg-emerald-500/20',
            iconBorder: 'border-emerald-500/30',
            iconText: 'text-emerald-400',
            valueText: 'text-emerald-400',
            borderGlow: 'hover:border-emerald-500/40',
            gradient: 'from-emerald-500/5 to-transparent',
        },
        amber: {
            iconBg: 'bg-amber-500/20',
            iconBorder: 'border-amber-500/30',
            iconText: 'text-amber-400',
            valueText: 'text-amber-400',
            borderGlow: 'hover:border-amber-500/40',
            gradient: 'from-amber-500/5 to-transparent',
        },
        rose: {
            iconBg: 'bg-rose-500/20',
            iconBorder: 'border-rose-500/30',
            iconText: 'text-rose-400',
            valueText: 'text-rose-400',
            borderGlow: 'hover:border-rose-500/40',
            gradient: 'from-rose-500/5 to-transparent',
        },
        violet: {
            iconBg: 'bg-violet-500/20',
            iconBorder: 'border-violet-500/30',
            iconText: 'text-violet-400',
            valueText: 'text-violet-400',
            borderGlow: 'hover:border-violet-500/40',
            gradient: 'from-violet-500/5 to-transparent',
        },
        blue: {
            iconBg: 'bg-blue-500/20',
            iconBorder: 'border-blue-500/30',
            iconText: 'text-blue-400',
            valueText: 'text-blue-400',
            borderGlow: 'hover:border-blue-500/40',
            gradient: 'from-blue-500/5 to-transparent',
        },
    };

    const colors = colorClasses[color] || colorClasses.cyan;

    return (
        <div
            className={`
                relative overflow-hidden
                bg-gradient-to-br ${colors.gradient}, from-slate-900 to-slate-900/80
                border border-slate-700 ${colors.borderGlow}
                rounded-2xl p-6
                transition-all duration-300 ease-out
                hover:shadow-lg hover:shadow-slate-950/50
                group
            `}
        >
            {/* Icon Container */}
            <div
                className={`
                    w-12 h-12 rounded-xl
                    ${colors.iconBg} ${colors.iconBorder}
                    border flex items-center justify-center
                    mb-4
                    transition-transform duration-300 group-hover:scale-110
                `}
            >
                <Icon name={icon} size={22} className={`${colors.iconText}`} />
            </div>

            {/* Label */}
            <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wide">
                {label}
            </p>

            {/* Value */}
            <p className={`text-4xl font-bold ${colors.valueText} mb-2`}>
                {value}
            </p>

            {/* Trend Indicator */}
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <Icon name={trendUp ? 'trending-up' : 'trending-down'} size={14} />
                    <span>{trend}</span>
                </div>
            )}

            {/* Decorative corner gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-slate-800/50 pointer-events-none" />
        </div>
    );
}
