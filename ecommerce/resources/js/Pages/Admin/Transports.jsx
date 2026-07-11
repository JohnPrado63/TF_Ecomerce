import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
export default function Transports({ transports, locations }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing]   = useState(null);

    const tiposTransporte = ['Autobús', 'Miniván', 'Avión', 'Tren', 'Marítimo'];

    const { data, setData, processing, errors, reset } = useForm({
        company_name:  '',
        location_id:     '',
        transport_type: 'Autobús',
        contact:        '',
    });

    function handleCreate() {
        setEditing(null);
        reset();
        setShowForm(true);
    }

    function handleEdit(transport) {
        setEditing(transport);
        setData({
            company_name:  transport.company_name,
            location_id:     transport.location_id,
            transport_type: transport.transport_type,
            contact:        transport.contact || '',
        });
        setShowForm(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (editing) {
            router.put(`/admin/transports/${editing.id}`, data, {
                onSuccess: () => { setShowForm(false); reset(); setEditing(null); }
            });
        } else {
            router.post('/admin/transports', data, {
                onSuccess: () => { setShowForm(false); reset(); }
            });
        }
    }

    function handleDelete(id) {
        if (confirm('¿Eliminar esta empresa de transporte?')) {
            router.delete(`/admin/transports/${id}`);
        }
    }

    const tipoIcon = {
        'Autobús':  '🚌',
        'Miniván':  '🚐',
        'Avión':    '✈️',
        'Tren':     '🚆',
        'Marítimo': '🚢',
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Transportes - Admin" />

            {/* Navbar admin */}
            <AdminNavbar />

            <div className="container mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Empresas de Transporte</h1>
                    <button onClick={handleCreate}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-5 py-2 rounded-xl transition">
                        + Nueva empresa
                    </button>
                </div>

                {showForm && (
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4">{editing ? 'Editar empresa' : 'Nueva empresa'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Nombre de empresa</label>
                                <input type="text" value={data.company_name} onChange={e => setData('company_name', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Transportes Ayacucho S.A." />
                                {errors.company_name && <p className="text-red-400 text-xs mt-1">{errors.company_name}</p>}
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Ubicación</label>
                                <select value={data.location_id} onChange={e => setData('location_id', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500">
                                    <option value="">Selecciona ubicación</option>
                                    {locations.map(loc => (
                                        <option key={loc.id} value={loc.id}>{loc.city}, {loc.region}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Tipo de transporte</label>
                                <select value={data.transport_type} onChange={e => setData('transport_type', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500">
                                    {tiposTransporte.map(tipo => (
                                        <option key={tipo} value={tipo}>{tipoIcon[tipo]} {tipo}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Contacto</label>
                                <input type="text" value={data.contact} onChange={e => setData('contact', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="+51 999 999 999" />
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
                                <th className="text-left p-4">Empresa</th>
                                <th className="text-left p-4">Ubicación</th>
                                <th className="text-left p-4">Tipo</th>
                                <th className="text-left p-4">Contacto</th>
                                <th className="text-left p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transports.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-8 text-slate-400">
                                        No hay empresas registradas aún
                                    </td>
                                </tr>
                            ) : (
                                transports.map((t) => (
                                    <tr key={t.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                                        <td className="p-4 font-semibold">{t.company_name}</td>
                                        <td className="p-4 text-slate-400 text-sm">{t.location?.city}</td>
                                        <td className="p-4">
                                            <span className="bg-slate-800 text-slate-400 text-xs font-bold px-3 py-1 rounded-full">
                                                {tipoIcon[t.transport_type]} {t.transport_type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-400 text-sm">{t.contact || '-'}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(t)}
                                                    className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition">
                                                    ✏️ Editar
                                                </button>
                                                <button onClick={() => handleDelete(t.id)}
                                                    className="text-xs bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1 rounded-lg transition">
                                                    🗑️ Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}