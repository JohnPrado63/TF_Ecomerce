import { useState, useMemo } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
import Icon from '@/Components/Icon';
import StatusBadge from '@/Components/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';

export default function Packages({ packages, locations, categories }) {
    const [search, setSearch] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortField, setSortField] = useState('created_at');
    const [sortDir, setSortDir] = useState('desc');
    const [page, setPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState({ open: false, pkg: null });
    const perPage = 10;

    function handleSort(field) {
        if (sortField === field) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDir('asc');
        }
    }

    function getSortIcon(field) {
        if (sortField !== field) {
            return <Icon name="chevron-down" size={14} className="text-slate-600 opacity-0 group-hover:opacity-100" />;
        }
        return sortDir === 'asc'
            ? <span className="text-cyan-400">↑</span>
            : <span className="text-cyan-400">↓</span>;
    }

    const filteredPackages = useMemo(() => {
        return packages.filter(pkg => {
            const matchSearch = !search ||
                pkg.title.toLowerCase().includes(search.toLowerCase()) ||
                pkg.location?.city.toLowerCase().includes(search.toLowerCase());
            const matchLocation = !filterLocation || pkg.location?.city === filterLocation;
            const matchCategory = !filterCategory || pkg.category?.name === filterCategory;
            const matchStatus = !filterStatus ||
                (filterStatus === 'active' && pkg.status) ||
                (filterStatus === 'inactive' && !pkg.status) ||
                (filterStatus === 'agotado' && pkg.available_slots === 0);
            return matchSearch && matchLocation && matchCategory && matchStatus;
        });
    }, [packages, search, filterLocation, filterCategory, filterStatus]);

    const sortedPackages = useMemo(() => {
        return [...filteredPackages].sort((a, b) => {
            let aVal, bVal;
            switch (sortField) {
                case 'price': aVal = a.price; bVal = b.price; break;
                case 'duration_days': aVal = a.duration_days; bVal = b.duration_days; break;
                case 'available_slots': aVal = a.available_slots; bVal = b.available_slots; break;
                case 'title': aVal = a.title.toLowerCase(); bVal = b.title.toLowerCase(); break;
                default: aVal = new Date(a.created_at); bVal = new Date(b.created_at);
            }
            if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredPackages, sortField, sortDir]);

    const totalPages = Math.ceil(sortedPackages.length / perPage);
    const paginatedPackages = sortedPackages.slice((page - 1) * perPage, page * perPage);

    function confirmDelete(pkg) {
        setDeleteModal({ open: true, pkg });
    }

    function executeDelete() {
        if (deleteModal.pkg) {
            router.delete(`/admin/packages/${deleteModal.pkg.id}`);
        }
        setDeleteModal({ open: false, pkg: null });
    }

    function getSlotsClass(slots) {
        if (slots === 0) return 'text-red-400 font-bold';
        if (slots <= 3) return 'text-yellow-400 font-semibold';
        return 'text-slate-300';
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Gestión de Paquetes - Admin" />
            <AdminNavbar />

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Gestión de Paquetes</h1>
                        <p className="text-slate-400 text-sm mt-1">
                            {sortedPackages.length} paquete(s) en total
                        </p>
                    </div>
                    <Link
                        href="/admin/packages/create"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 sm:px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20 w-full sm:w-auto"
                    >
                        <Icon name="plus" size={18} /> <span className="sm:hidden">Nuevo</span><span className="hidden sm:inline">Nuevo paquete</span>
                    </Link>
                </div>

                {/* Filtros */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl p-4 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div className="relative md:col-span-2">
                            <input
                                type="text"
                                placeholder="Buscar por nombre o ubicación..."
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                                className="w-full bg-slate-800/80 border border-slate-600 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-sm"
                            />
                            <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        </div>

                        <select
                            value={filterLocation}
                            onChange={e => { setFilterLocation(e.target.value); setPage(1); }}
                            className="bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-sm"
                        >
                            <option value="">Todas las ubicaciones</option>
                            {locations?.map(loc => (
                                <option key={loc.id} value={loc.city}>{loc.city}</option>
                            ))}
                        </select>

                        <select
                            value={filterCategory}
                            onChange={e => { setFilterCategory(e.target.value); setPage(1); }}
                            className="bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-sm"
                        >
                            <option value="">Todas las categorías</option>
                            {categories?.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>

                        <select
                            value={filterStatus}
                            onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
                            className="bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-sm"
                        >
                            <option value="">Todos los estados</option>
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                            <option value="agotado">Agotado</option>
                        </select>
                    </div>
                </div>

                {/* Tabla */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-b-2 border-cyan-500/30">
                                    <th className="text-left p-4 group">
                                        <button onClick={() => handleSort('title')} className="flex items-center gap-2 text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs transition">
                                            <span className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                                <Icon name="compass" size={14} className="text-cyan-400" />
                                            </span>
                                            Paquete {getSortIcon('title')}
                                        </button>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-6 h-6 rounded-md bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                                                <Icon name="map-pin" size={14} className="text-violet-400" />
                                            </span>
                                            Ubicación
                                        </span>
                                    </th>
                                    <th className="text-left p-4 group">
                                        <button onClick={() => handleSort('price')} className="flex items-center gap-2 text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs transition">
                                            <span className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                <Icon name="banknote" size={14} className="text-emerald-400" />
                                            </span>
                                            Precio {getSortIcon('price')}
                                        </button>
                                    </th>
                                    <th className="text-left p-4 group">
                                        <button onClick={() => handleSort('duration_days')} className="flex items-center gap-2 text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs transition">
                                            <span className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                                <Icon name="calendar" size={14} className="text-amber-400" />
                                            </span>
                                            Duración {getSortIcon('duration_days')}
                                        </button>
                                    </th>
                                    <th className="text-left p-4 group">
                                        <button onClick={() => handleSort('available_slots')} className="flex items-center gap-2 text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs transition">
                                            <span className="w-6 h-6 rounded-md bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                                                <Icon name="users" size={14} className="text-rose-400" />
                                            </span>
                                            Slots {getSortIcon('available_slots')}
                                        </button>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-6 h-6 rounded-md bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                                <Icon name="check-circle" size={14} className="text-blue-400" />
                                            </span>
                                            Estado
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-6 h-6 rounded-md bg-slate-500/20 border border-slate-500/30 flex items-center justify-center">
                                                <Icon name="settings" size={14} className="text-slate-400" />
                                            </span>
                                            Acciones
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPackages.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-12 text-center">
                                            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                                                <Icon name="search" size={32} className="text-slate-600" />
                                            </div>
                                            <p className="text-slate-500">No se encontraron paquetes con los filtros aplicados.</p>
                                        </td>
                                    </tr>
                                ) : paginatedPackages.map((pkg, index) => (
                                    <tr key={pkg.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={pkg.image_url}
                                                    alt={pkg.title}
                                                    className="w-12 h-12 rounded-lg object-cover ring-2 ring-slate-700"
                                                />
                                                <div>
                                                    <p className="font-semibold text-white">{pkg.title}</p>
                                                    <p className="text-slate-500 text-xs">{pkg.category?.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                                                <Icon name="map-pin" size={14} className="text-violet-400" />
                                                {pkg.location?.city}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-cyan-400 font-bold text-lg">
                                                S/. {Number(pkg.price).toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                                                <Icon name="calendar" size={14} className="text-amber-400" />
                                                {pkg.duration_days} día(s)
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-sm font-bold ${getSlotsClass(pkg.available_slots)}`}>
                                                {pkg.available_slots}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {pkg.available_slots === 0 ? (
                                                <StatusBadge status="agotado" />
                                            ) : pkg.status === false ? (
                                                <StatusBadge status="inactive" />
                                            ) : (
                                                <StatusBadge status="active" />
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-1">
                                                <Link
                                                    href={`/packages/${pkg.id}`}
                                                    className="inline-flex items-center gap-1.5 text-xs bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition"
                                                >
                                                    <Icon name="eye" size={14} /> Ver
                                                </Link>
                                                <Link
                                                    href={route('admin.packages.edit', pkg.id)}
                                                    className="inline-flex items-center gap-1.5 text-xs bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition"
                                                >
                                                    <Icon name="pencil" size={14} /> Editar
                                                </Link>
                                                <button
                                                    onClick={() => confirmDelete(pkg)}
                                                    className="inline-flex items-center gap-1.5 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-red-200 px-3 py-1.5 rounded-lg transition border border-red-500/30"
                                                >
                                                    <Icon name="trash2" size={14} /> Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50 bg-slate-900/50">
                            <p className="text-slate-500 text-sm">
                                Página {page} de {totalPages} · {sortedPackages.length} paquetes
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage(Math.max(1, page - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm disabled:opacity-40 hover:bg-slate-700 transition"
                                >
                                    ← Anterior
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (page <= 3) {
                                        pageNum = i + 1;
                                    } else if (page >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = page - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={`px-3 py-1.5 rounded-lg text-sm transition ${
                                                page === pageNum
                                                    ? 'bg-cyan-500 text-slate-900 font-bold shadow-lg shadow-cyan-500/20'
                                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                                    disabled={page === totalPages}
                                    className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm disabled:opacity-40 hover:bg-slate-700 transition"
                                >
                                    Siguiente →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal confirmación eliminar */}
            {deleteModal.open && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
                        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                            <Icon name="alert-circle" size={32} className="text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 text-center">¿Eliminar paquete?</h3>
                        <p className="text-slate-400 mb-6 text-center">
                            Estás a punto de eliminar <span className="text-white font-semibold">"{deleteModal.pkg?.title}"</span>.
                            <br />Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteModal({ open: false, pkg: null })}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 rounded-xl transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={executeDelete}
                                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 rounded-xl transition shadow-lg shadow-red-500/20"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
