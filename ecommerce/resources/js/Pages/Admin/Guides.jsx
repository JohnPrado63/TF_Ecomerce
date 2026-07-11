import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
import Icon from '@/Components/Icon';

export default function Guides({ guides }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing]   = useState(null);

    const { data, setData, processing, errors, reset } = useForm({
        first_name:         '',
        last_name:       '',
        languages:        '',
        phone:       '',
        credential_number: '',
    });

    function handleCreate() {
        setEditing(null);
        reset();
        setShowForm(true);
    }

    function handleEdit(guide) {
        setEditing(guide);
        setData({
            first_name:         guide.first_name,
            last_name:       guide.last_name,
            languages:        guide.languages || '',
            phone:       guide.phone || '',
            credential_number: guide.credential_number || '',
        });
        setShowForm(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (editing) {
            router.put(`/admin/guides/${editing.id}`, data, {
                onSuccess: () => { setShowForm(false); reset(); setEditing(null); }
            });
        } else {
            router.post('/admin/guides', data, {
                onSuccess: () => { setShowForm(false); reset(); }
            });
        }
    }

    function handleDelete(id) {
        if (confirm('¿Eliminar este guía?')) {
            router.delete(`/admin/guides/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Guías Turísticos - Admin" />
            <AdminNavbar />

            <div className="container mx-auto px-6 py-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Gestión de Guías Turísticos</h1>
                        <p className="text-slate-400 text-sm mt-1">{guides.length} guía(s) registrado(s)</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 transition shadow-lg shadow-cyan-500/20"
                    >
                        <Icon name="plus" size={18} /> Nuevo guía
                    </button>
                </div>

                {/* Formulario */}
                {showForm && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4 text-white">
                            {editing ? 'Editar guía' : 'Nuevo guía'}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Nombre</label>
                                <input type="text" value={data.first_name} onChange={e => setData('first_name', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="Nombre del guía" />
                                {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name}</p>}
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Apellido</label>
                                <input type="text" value={data.last_name} onChange={e => setData('last_name', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="Apellido del guía" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Idiomas</label>
                                <input type="text" value={data.languages} onChange={e => setData('languages', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="Español, Inglés, Quechua" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Teléfono</label>
                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="+51 999 999 999" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Credencial N°</label>
                                <input type="text" value={data.credential_number} onChange={e => setData('credential_number', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="GTA-001" />
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
                                                <Icon name="users" size={14} className="text-cyan-400" />
                                            </span>
                                            Nombre
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                                                <Icon name="globe" size={14} className="text-violet-400" />
                                            </span>
                                            Idiomas
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                <Icon name="phone" size={14} className="text-emerald-400" />
                                            </span>
                                            Teléfono
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                                <Icon name="credit-card" size={14} className="text-amber-400" />
                                            </span>
                                            Credencial
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
                                {guides.map((guide) => (
                                    <tr key={guide.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-slate-700 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-sm">
                                                    {guide.first_name?.charAt(0)}{guide.last_name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{guide.first_name} {guide.last_name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                                                <Icon name="globe" size={14} className="text-violet-400" />
                                                {guide.languages || '-'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                                                <Icon name="phone" size={14} className="text-emerald-400" />
                                                {guide.phone || '-'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full">
                                                <Icon name="credit-card" size={12} />
                                                {guide.credential_number || 'Sin credencial'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-1">
                                                <button onClick={() => handleEdit(guide)}
                                                    className="inline-flex items-center gap-1.5 text-xs bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition">
                                                    <Icon name="pencil" size={14} /> Editar
                                                </button>
                                                <button onClick={() => handleDelete(guide.id)}
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
