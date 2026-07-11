import { Link } from '@inertiajs/react';

export default function SectionHeader({ title, description, action, actionLabel, actionHref }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {title}
                </h1>
                {description && (
                    <p className="text-slate-400 text-xs sm:text-sm">
                        {description}
                    </p>
                )}
            </div>
            {action && (
                <Link
                    href={actionHref || '#'}
                    onClick={action}
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5"
                >
                    {actionLabel || 'Nueva'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </Link>
            )}
        </div>
    );
}
