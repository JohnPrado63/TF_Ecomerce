import { Head, Link, router } from '@inertiajs/react';

export default function Packages({ packages }) {

    function deletePackage(id) {
        if (confirm('¿Estás seguro de eliminar este paquete?')) {
            router.delete(`/admin/packages/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Gestión de Paquetes - Admin" />

            {/* Navbar admin */}
            <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span className="font-bold text-xl text-cyan-400">ESKY TRIPS Admin</span>
                    <div className="flex gap-4">
                        <Link href="/admin/dashboard" className="text-slate-400 hover:text-white transition">
                            Dashboard
                        </Link>
                        <Link href="/admin/packages" className="text-white font-semibold border-b-2 border-cyan-500 pb-1">
                            Paquetes
                        </Link>
                        <Link href="/admin/bookings" className="text-slate-400 hover:text-white transition">
                            Reservas
                        </Link>
                    </div>
                </div>
                <Link href="/" className="text-slate-400 hover:text-white text-sm transition">
                    ← Volver al sitio
                </Link>
            </nav>

            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Gestión de Paquetes</h1>
                        <p className="text-slate-400">Crea, edita y elimina los paquetes que aparecen en el sitio.</p>
                    </div>
                    <Link
                        href="/admin/packages/create"
                        className="inline-flex items-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition"
                    >
                        Nuevo paquete
                    </Link>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                <th className="text-left p-4">Paquete</th>
                                <th className="text-left p-4">Ubicación</th>
                                <th className="text-left p-4">Precio</th>
                                <th className="text-left p-4">Duración</th>
                                <th className="text-left p-4">Slots</th>
                                <th className="text-left p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((pkg) => (
                                <tr key={pkg.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={pkg.image_url}
                                                alt={pkg.title}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold">{pkg.title}</p>
                                                <p className="text-slate-400 text-xs">{pkg.category?.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-300 text-sm">
                                        {pkg.location?.city}
                                    </td>
                                    <td className="p-4 text-cyan-400 font-bold">
                                        S/. {Number(pkg.price).toFixed(2)}
                                    </td>
                                    <td className="p-4 text-slate-300 text-sm">
                                        {pkg.duration_days} día(s)
                                    </td>
                                    <td className="p-4 text-slate-300 text-sm">
                                        {pkg.available_slots}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2 flex-wrap">
                                            <Link
                                                href={`/packages/${pkg.id}`}
                                                className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition"
                                            >
                                                Ver
                                            </Link>
                                            <Link
                                                href={route('admin.packages.edit', pkg.id)}
                                                className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => deletePackage(pkg.id)}
                                                className="text-xs bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1 rounded-lg transition"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}