import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';
import Icon from '@/Components/Icon';

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
        'Autobús':  'bus',
        'Miniván':  'car',
        'Avión':    'plane',
        'Tren':     'train',
        'Marítimo': 'ship',
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Transportes - Admin" />
            <AdminNavbar />

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Empresas de Transporte</h1>
                        <p className="text-slate-400 text-sm mt-1">{transports.length} empresa(s) registrada(s)</p>
                    </div>
                    <button onClick={handleCreate}
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 transition shadow-lg shadow-cyan-500/20">
                        <Icon name="plus" size={18} /> Nueva empresa
                    </button>
                </div>

                {showForm && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4 text-white">{editing ? 'Editar empresa' : 'Nueva empresa'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Nombre de empresa</label>
                                <input type="text" value={data.company_name} onChange={e => setData('company_name', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="Transportes Ayacucho S.A." />
                                {errors.company_name && <p className="text-red-400 text-xs mt-1">{errors.company_name}</p>}
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
                                <label className="block text-slate-400 text-sm font-medium mb-2">Tipo de transporte</label>
                                <select value={data.transport_type} onChange={e => setData('transport_type', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50">
                                    {tiposTransporte.map(tipo => (
                                        <option key={tipo} value={tipo}>{tipo}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Contacto</label>
                                <input type="text" value={data.contact} onChange={e => setData('contact', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                                    placeholder="+51 999 999 999" />
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
                                                <Icon name="briefcase" size={14} className="text-cyan-400" />
                                            </span>
                                            Empresa
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
                                            <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                                <Icon name="plane" size={14} className="text-amber-400" />
                                            </span>
                                            Tipo
                                        </span>
                                    </th>
                                    <th className="text-left p-4">
                                        <span className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                                            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                <Icon name="phone" size={14} className="text-emerald-400" />
                                            </span>
                                            Contacto
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
                                {transports.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center">
                                            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                                                <Icon name="briefcase" size={32} className="text-slate-600" />
                                            </div>
                                            <p className="text-slate-500">No hay empresas registradas aún</p>
                                        </td>
                                    </tr>
                                ) : (
                                    transports.map((t) => (
                                        <tr key={t.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/30 to-slate-700 border border-amber-500/30 flex items-center justify-center">
                                                        <Icon name="briefcase" size={18} className="text-amber-400" />
                                                    </div>
                                                    <span className="font-semibold text-white">{t.company_name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                                                    <Icon name="map-pin" size={14} className="text-violet-400" />
                                                    {t.location?.city}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full">
                                                    <Icon name={tipoIcon[t.transport_type] || 'plane'} size={12} />
                                                    {t.transport_type}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                                                    <Icon name="phone" size={14} className="text-emerald-400" />
                                                    {t.contact || '-'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-1">
                                                    <button onClick={() => handleEdit(t)}
                                                        className="inline-flex items-center gap-1.5 text-xs bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition">
                                                        <Icon name="pencil" size={14} /> Editar
                                                    </button>
                                                    <button onClick={() => handleDelete(t.id)}
                                                        className="inline-flex items-center gap-1.5 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-red-200 px-3 py-1.5 rounded-lg transition border border-red-500/30">
                                                        <Icon name="trash2" size={14} /> Eliminar
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
        </div>
    );
}
