import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
export default function Guides({ guides }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing]   = useState(null);

    const { data, setData, processing, errors, reset } = useForm({
        nombre:         '',
        apellido:       '',
        idiomas:        '',
        telefono:       '',
        credencial_nro: '',
    });

    function handleCreate() {
        setEditing(null);
        reset();
        setShowForm(true);
    }

    function handleEdit(guide) {
        setEditing(guide);
        setData({
            nombre:         guide.nombre,
            apellido:       guide.apellido,
            idiomas:        guide.idiomas || '',
            telefono:       guide.telefono || '',
            credencial_nro: guide.credencial_nro || '',
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

            {/* Navbar admin */}   
            <AdminNavbar />

            <div className="container mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Gestión de Guías Turísticos</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-5 py-2 rounded-xl transition"
                    >
                        + Nuevo guía
                    </button>
                </div>

                {showForm && (
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4">
                            {editing ? 'Editar guía' : 'Nuevo guía'}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Nombre</label>
                                <input type="text" value={data.nombre} onChange={e => setData('nombre', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Nombre del guía" />
                                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Apellido</label>
                                <input type="text" value={data.apellido} onChange={e => setData('apellido', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Apellido del guía" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Idiomas</label>
                                <input type="text" value={data.idiomas} onChange={e => setData('idiomas', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Español, Inglés, Quechua" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Teléfono</label>
                                <input type="text" value={data.telefono} onChange={e => setData('telefono', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="+51 999 999 999" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Credencial N°</label>
                                <input type="text" value={data.credencial_nro} onChange={e => setData('credencial_nro', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="GTA-001" />
                            </div>
                            <div className="md:col-span-2 flex gap-3">
                                <button type="submit" disabled={processing}
                                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-2 rounded-xl transition">
                                    {editing ? 'Actualizar' : 'Crear'}
                                </button>
                                <button type="button" onClick={() => { setShowForm(false); reset(); setEditing(null); }}
                                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-2 rounded-xl transition">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                <th className="text-left p-4">Nombre</th>
                                <th className="text-left p-4">Idiomas</th>
                                <th className="text-left p-4">Teléfono</th>
                                <th className="text-left p-4">Credencial</th>
                                <th className="text-left p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guides.map((guide) => (
                                <tr key={guide.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                                    <td className="p-4 font-semibold">
                                        {guide.nombre} {guide.apellido}
                                    </td>
                                    <td className="p-4 text-slate-400 text-sm">{guide.idiomas || '-'}</td>
                                    <td className="p-4 text-slate-400 text-sm">{guide.telefono || '-'}</td>
                                    <td className="p-4">
                                        <span className="bg-blue-900/50 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
                                            {guide.credencial_nro || 'Sin credencial'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(guide)}
                                                className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition">
                                                ✏️ Editar
                                            </button>
                                            <button onClick={() => handleDelete(guide.id)}
                                                className="text-xs bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1 rounded-lg transition">
                                                🗑️ Eliminar
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