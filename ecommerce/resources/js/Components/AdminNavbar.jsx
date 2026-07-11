import { Link, usePage } from '@inertiajs/react';

export default function AdminNavbar() {
    const { url } = usePage();

    const links = [
        { href: '/admin/dashboard', label: 'Dashboard' },
        { href: '/admin/packages', label: 'Paquetes' },
        { href: '/admin/bookings', label: 'Reservas' },
        { href: '/admin/payments', label: 'Pagos' },
        { href: '/admin/categories', label: 'Categorías' },
        { href: '/admin/guides', label: 'Guías' },
        { href: '/admin/hotels', label: 'Hoteles' },
        { href: '/admin/restaurants', label: 'Restaurantes' },
        { href: '/admin/transports', label: 'Transportes' },
        { href: '/admin/reports', label: 'Reportes' },
        { href: '/admin/offers', label: 'Ofertas' },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 px-4 py-3 text-white shadow-lg shadow-slate-950/20 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center gap-4">
                <Link href="/admin/dashboard" className="group flex flex-shrink-0 items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-sm font-black text-cyan-300 shadow-sm shadow-cyan-950/30">
                        ET
                    </span>
                    <span className="leading-tight">
                        <span className="block text-sm font-bold tracking-wide text-white">ESKY TRIPS</span>
                        <span className="block text-[11px] font-medium text-slate-400 transition group-hover:text-cyan-300">
                            Admin
                        </span>
                    </span>
                </Link>

                <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] p-1 text-sm whitespace-nowrap">
                    {links.map((link) => {
                        const isActive = url.startsWith(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={
                                    isActive
                                        ? 'rounded-lg bg-cyan-400 px-3 py-2 font-semibold text-slate-950 shadow-sm shadow-cyan-950/30'
                                        : 'rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/5 hover:text-white'
                                }
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                <Link
                    href="/"
                    className="flex flex-shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-medium text-slate-400 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
                    title="Volver al sitio"
                >
                    <span aria-hidden="true">←</span>
                    <span className="hidden sm:inline">Sitio</span>
                </Link>
            </div>
        </nav>
    );
}
