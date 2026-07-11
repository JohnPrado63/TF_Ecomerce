import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Icon from '@/Components/Icon';

export default function Authenticated({ user, header, children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <nav className="sticky top-0 z-50 bg-slate-950/95 border-b border-slate-800/60 px-6 py-4 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    <Link href="/" className="group flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/30 flex items-center justify-center">
                            <Icon name="compass" size={18} className="text-cyan-400" />
                        </div>
                        <span className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                            ESKY TRIPS
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href="/"
                            className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl text-sm font-medium transition-all"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/packages"
                            className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl text-sm font-medium transition-all"
                        >
                            Paquetes
                        </Link>
                        {user?.role === 'admin' ? (
                            <Link
                                href="/admin/dashboard"
                                className="px-4 py-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                            >
                                <Icon name="layout-dashboard" size={15} />
                                Panel Admin
                            </Link>
                        ) : (
                            <Link
                                href="/bookings"
                                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                            >
                                <Icon name="calendar" size={15} />
                                Mis Reservas
                            </Link>
                        )}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/profile"
                            className="flex items-center gap-3 px-4 py-2 rounded-xl border border-slate-800/60 bg-slate-900/50 hover:bg-slate-800/50 hover:border-slate-700 transition-all text-sm font-medium"
                        >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold text-xs">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-slate-300">{user?.name}</span>
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                            <Icon name="log-out" size={15} />
                        </Link>
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden mt-4 border-t border-slate-800/60 pt-4 space-y-2">
                        <Link href="/" className="flex items-center gap-3 block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition text-sm">
                            <Icon name="home" size={16} />
                            Inicio
                        </Link>
                        <Link href="/packages" className="flex items-center gap-3 block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition text-sm">
                            <Icon name="package" size={16} />
                            Paquetes
                        </Link>
                        {user?.role === 'admin' ? (
                            <Link href="/admin/dashboard" className="flex items-center gap-3 block px-4 py-3 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl transition text-sm">
                                <Icon name="layout-dashboard" size={16} />
                                Panel Admin
                            </Link>
                        ) : (
                            <Link href="/bookings" className="flex items-center gap-3 block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition text-sm">
                                <Icon name="calendar" size={16} />
                                Mis Reservas
                            </Link>
                        )}
                        <Link href="/profile" className="flex items-center gap-3 block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition text-sm">
                            <Icon name="user" size={16} />
                            Mi Perfil
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition text-sm"
                        >
                            <Icon name="log-out" size={16} />
                            Cerrar sesión
                        </Link>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-slate-950/95 border-b border-slate-800/60 py-4 px-6 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto">
                        {header}
                    </div>
                </header>
            )}

            <main className="max-w-7xl mx-auto px-6 py-8">
                {children}
            </main>

        </div>
    );
}
