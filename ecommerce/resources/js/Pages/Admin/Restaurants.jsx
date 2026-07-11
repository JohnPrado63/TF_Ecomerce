import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
import Icon from '@/Components/Icon';

export default function Restaurants({ restaurants, locations }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing]   = useState(null);

    const { data, setData, processing, errors, reset } = useForm({
        name:      '',
        location_id: '',
        cuisine_type: '',
        address:   '',
    });

    function handleCreate() {
        setEditing(null);
        reset();
        setShowForm(true);
    }

    function handleEdit(restaurant) {
        setEditing(restaurant);
        setData({
            name:      restaurant.name,
            location_id: restaurant.location_id,
            cuisine_type: restaurant.cuisine_type || '',
            address:   restaurant.address || '',
        });
        setShowForm(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (editing) {
            router.put(`/admin/restaurants/${editing.id}`, data, {
                onSuccess: () => { setShowForm(false); reset(); setEditing(null); }
            });
        } else {
            router.post('/admin/restaurants', data, {
                onSuccess: () => { setShowForm(false); reset(); }
            });
        }
    }

    function handleDelete(id) {
        if (confirm('¿Eliminar este restaurante?')) {
            router.delete(`/admin/restaurants/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Restaurantes - Admin" />
            <AdminNavbar />

            <div className="container mx-auto px-6 py-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Gestión de Restaurantes</h1>
                        <p className="text-slate-400 text-sm mt-1">{restaurants.length} restaurante(s) registrado(s)</p>
                    </div>
                    <button onClick={handleCreate}
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 transition shadow-lg shadow-cyan-500/20">
                        <Icon name="plus" size={18} /> Nuevo restaurante
                    </button>
                </div>

                {showForm && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4 text-white">{editing ? 'Editar restaurante' : 'Nuevo restaurante'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Nombre</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="Nombre del restaurante" />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Ubicación</label>
                                <select value={data.location_id} onChange={e => setData('location_id', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50">
                                    <option value="">Selecciona ubicación</option>
                                    {locations.map(loc => (
                                        <option key={loc.id} value={loc.id}>{loc.city}, {loc.region}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Tipo de comida</label>
                                <input type="text" value={data.cuisine_type} onChange={e => setData('cuisine_type', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="Ej: Gastronomía ayacuchana" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Dirección</label>
                                <input type="text" value={data.address} onChange={e => setData('address', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="Jr. Lima 123" />
                            </div>
                            <div className="md:col-span-2 flex gap-3">
                                <button type="submit" disabled={processing}
                                    className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20">
                                    <Icon name={editing ? 'check' : 'plus'} size={18} />
                                    {editing ? 'Actualizar' : 'Crear'}
                                </button>
                                <button type="button" onClick={() => { setShowForm(false); reset(); setEditing(null); }}
                                    className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-2.5 rounded-xl transition">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tabla */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-b-2 border-cyan-500/30">
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                                <Icon name="utensils" size={14} className="text-cyan-400" />
                                            </span>
                                            Restaurante
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                                                <Icon name="map-pin" size={14} className="text-violet-400" />
                                            </span>
                                            Ubicación
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                <Icon name="wheat" size={14} className="text-emerald-400" />
                                            </span>
                                            Tipo de comida
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                                <Icon name="map-pin" size={14} className="text-amber-400" />
                                            </span>
                                            Dirección
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-slate-500/20 border border-slate-500/30 flex items-center justify-center">
                                                <Icon name="settings" size={14} className="text-slate-400" />
                                            </span>
                                            Acciones
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {restaurants.map((r) => (
                                    <tr key={r.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/30 to-slate-700 border border-emerald-500/30 flex items-center justify-center">
                                                    <Icon name="utensils" size={18} className="text-emerald-400" />
                                                </div>
                                                <span className="font-semibold text-white">{r.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                                                <Icon name="map-pin" size={14} className="text-violet-400" />
                                                {r.location?.city}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm">
                                                <Icon name="wheat" size={14} />
                                                {r.cuisine_type || '-'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                                                <Icon name="map-pin" size={14} className="text-amber-400" />
                                                {r.address || '-'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-1">
                                                <button onClick={() => handleEdit(r)}
                                                    className="inline-flex items-center gap-1.5 text-xs bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition">
                                                    <Icon name="pencil" size={14} /> Editar
                                                </button>
                                                <button onClick={() => handleDelete(r.id)}
                                                    className="inline-flex items-center gap-1.5 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-red-200 px-3 py-1.5 rounded-lg transition border border-red-500/30">
                                                    <Icon name="trash2" size={14} /> Eliminar
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
        </div>
    );
}
