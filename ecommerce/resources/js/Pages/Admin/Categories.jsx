import AdminNavbar from '@/Components/AdminNavbar';
import Icon from '@/Components/Icon';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Categories({ categories }) {
    const [showForm, setShowForm]   = useState(false);
    const [editing, setEditing]     = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name:        '',
        description: '',
    });

    function handleCreate() {
        setEditing(null);
        reset();
        setShowForm(true);
    }

    function handleEdit(category) {
        setEditing(category);
        setData({ name: category.name, description: category.description || '' });
        setShowForm(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (editing) {
            router.put(`/admin/categories/${editing.id}`, data, {
                onSuccess: () => { setShowForm(false); reset(); setEditing(null); }
            });
        } else {
            router.post('/admin/categories', data, {
                onSuccess: () => { setShowForm(false); reset(); }
            });
        }
    }

    function handleDelete(id) {
        if (confirm('¿Eliminar esta categoría?')) {
            router.delete(`/admin/categories/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Categorías - Admin" />
            <AdminNavbar />

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Gestión de Categorías</h1>
                        <p className="text-slate-400 text-sm mt-1">{categories.length} categoría(s)</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 transition shadow-lg shadow-cyan-500/20"
                    >
                        <Icon name="plus" size={18} /> Nueva categoría
                    </button>
                </div>

                {/* Formulario */}
                {showForm && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4 text-white">
                            {editing ? 'Editar categoría' : 'Nueva categoría'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="Ej: Cultural e Histórico"
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Descripción</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 resize-none"
                                    placeholder="Descripción de la categoría..."
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20"
                                >
                                    <Icon name={editing ? 'check' : 'plus'} size={18} />
                                    {editing ? 'Actualizar' : 'Crear'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowForm(false); reset(); setEditing(null); }}
                                    className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-2.5 rounded-xl transition"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tabla */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-b-2 border-cyan-500/30">
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                                <Icon name="hash" size={14} className="text-cyan-400" />
                                            </span>
                                            #
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                                                <Icon name="tag" size={14} className="text-violet-400" />
                                            </span>
                                            Nombre
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                                <Icon name="file-text" size={14} className="text-amber-400" />
                                            </span>
                                            Descripción
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                <Icon name="compass" size={14} className="text-emerald-400" />
                                            </span>
                                            Paquetes
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
                                {categories.map((cat) => (
                                    <tr key={cat.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition">
                                        <td className="p-4">
                                            <span className="w-8 h-8 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-500 font-bold text-sm">
                                                {cat.id}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-semibold text-white">{cat.name}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-slate-400 text-sm line-clamp-1">{cat.description || '-'}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-full">
                                                <Icon name="compass" size={12} />
                                                {cat.tour_packages_count} paquetes
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleEdit(cat)}
                                                    className="inline-flex items-center gap-1.5 text-xs bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition"
                                                >
                                                    <Icon name="pencil" size={14} /> Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cat.id)}
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
                </div>
            </div>
        </div>
    );
}
