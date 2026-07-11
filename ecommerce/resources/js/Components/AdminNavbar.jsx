import { Link, usePage } from '@inertiajs/react';
import Icon from '@/Components/Icon';

export default function AdminNavbar() {
    const { url } = usePage();

    const links = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: 'home' },
        { href: '/admin/packages', label: 'Paquetes', icon: 'package' },
        { href: '/admin/bookings', label: 'Reservas', icon: 'calendar' },
        { href: '/admin/payments', label: 'Pagos', icon: 'credit-card' },
        { href: '/admin/categories', label: 'Categorías', icon: 'grid' },
        { href: '/admin/guides', label: 'Guías', icon: 'users' },
        { href: '/admin/hotels', label: 'Hoteles', icon: 'building' },
        { href: '/admin/restaurants', label: 'Restaurantes', icon: 'coffee' },
        { href: '/admin/transports', label: 'Transportes', icon: 'truck' },
        { href: '/admin/reports', label: 'Reportes', icon: 'bar-chart' },
        { href: '/admin/offers', label: 'Ofertas', icon: 'tag' },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/90 px-4 py-3 shadow-xl shadow-slate-950/40 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-7xl items-center gap-4">
                <Link href="/admin/dashboard" className="group flex flex-shrink-0 items-center gap-3">
                    <div className="relative">
                        <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-slate-900/80 text-sm font-black text-cyan-300 shadow-lg shadow-cyan-500/10">
                            ET
                        </div>
                        <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                    </div>
                    <span className="leading-tight">
                        <span className="block text-sm font-bold tracking-wide text-white">ESKY TRIPS</span>
                        <span className="block text-[10px] font-semibold uppercase tracking-widest text-cyan-400/80 transition group-hover:text-cyan-300">
                            Panel Admin
                        </span>
                    </span>
                </Link>

                <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-xl border border-slate-800/60 bg-slate-900/40 p-1 text-sm whitespace-nowrap scrollbar-hide">
                    {links.map((link) => {
                        const isActive = url.startsWith(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={
                                    isActive
                                        ? 'flex items-center gap-1 sm:gap-2 rounded-lg bg-gradient-to-r from-cyan-500/90 to-cyan-400/80 px-2 sm:px-3 py-2 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all'
                                        : 'flex items-center gap-1 sm:gap-2 rounded-lg px-2 sm:px-3 py-2 text-slate-400 transition-all hover:bg-slate-800/60 hover:text-slate-200'
                                }
                            >
                                <Icon name={link.icon} size={15} />
                                <span className="hidden md:inline">{link.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="flex flex-shrink-0 items-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-400 transition-all hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
                        title="Volver al sitio"
                    >
                        <Icon name="external-link" size={15} />
                        <span className="hidden sm:inline">Ver Sitio</span>
                    </Link>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-2">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-slate-950">
                            A
                        </div>
                        <span className="hidden md:inline text-sm text-slate-300">Admin</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
