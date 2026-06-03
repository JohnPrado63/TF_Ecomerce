import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Navbar */}
            <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold text-cyan-400 hover:text-cyan-300 transition">
                        ESKY TRIPS
                    </Link>

                    {/* Links del centro */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-slate-300 hover:text-white text-sm font-medium transition"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/packages"
                            className="text-slate-300 hover:text-white text-sm font-medium transition"
                        >
                            Paquetes
                        </Link>
                        {user?.rol === 'admin' ? (
                            <Link
                                href="/admin/dashboard"
                                className="text-slate-300 hover:text-white text-sm font-medium transition"
                            >
                                Panel Admin
                            </Link>
                        ) : (
                            <Link
                                href="/bookings"
                                className="text-slate-300 hover:text-white text-sm font-medium transition"
                            >
                                Mis Reservas
                            </Link>
                        )}
                    </div>

                    {/* Usuario y logout */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 transition text-sm font-semibold"
                        >
                            <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 font-bold text-xs">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            {user?.name}
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="text-sm text-red-400 hover:text-red-300 transition font-medium"
                        >
                            Salir
                        </Link>
                    </div>

                    {/* Botón menú móvil */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                {/* Menú móvil */}
                {menuOpen && (
                    <div className="md:hidden mt-4 border-t border-slate-800 pt-4 space-y-2">
                        <Link href="/" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition text-sm">
                            Inicio
                        </Link>
                        <Link href="/packages" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition text-sm">
                            Paquetes
                        </Link>
                        {user?.rol === 'admin' ? (
                            <Link href="/admin/dashboard" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition text-sm">
                                Panel Admin
                            </Link>
                        ) : (
                            <Link href="/bookings" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition text-sm">
                                Mis Reservas
                            </Link>
                        )}
                        <Link href="/profile" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition text-sm">
                            Mi Perfil
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-lg transition text-sm"
                        >
                            Cerrar sesión
                        </Link>
                    </div>
                )}
            </nav>

            {/* Header opcional */}
            {header && (
                <header className="bg-slate-900 border-b border-slate-800 py-4 px-6">
                    <div className="max-w-7xl mx-auto">
                        {header}
                    </div>
                </header>
            )}

            {/* Contenido principal */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {children}
            </main>

        </div>
    );
}