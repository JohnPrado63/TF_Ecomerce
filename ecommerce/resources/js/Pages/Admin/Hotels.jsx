import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminNavbar from '@/Components/AdminNavbar';

export default function Hotels({ hotels, locations }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing]   = useState(null);

    const { data, setData, processing, errors, reset } = useForm({
        name:           '',
        location_id:      '',
        stars:        3,
        price_per_person: '',
        address:        '',
        phone:         '',
    });

    function handleCreate() {
        setEditing(null);
        reset();
        setShowForm(true);
    }

    function handleEdit(hotel) {
        setEditing(hotel);
        setData({
            name:           hotel.name,
            location_id:      hotel.location_id,
            stars:        hotel.stars || 3,
            price_per_person: hotel.price_per_person || '',
            address:        hotel.address || '',
            phone:         hotel.phone || '',
        });
        setShowForm(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (editing) {
            router.put(`/admin/hotels/${editing.id}`, data, {
                onSuccess: () => { setShowForm(false); reset(); setEditing(null); }
            });
        } else {
            router.post('/admin/hotels', data, {
                onSuccess: () => { setShowForm(false); reset(); }
            });
        }
    }

    function handleDelete(id) {
        if (confirm('¿Eliminar este hotel?')) {
            router.delete(`/admin/hotels/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Hoteles - Admin" />

            {/* Navbar admin */}
            <AdminNavbar />

            <div className="container mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Gestión de Hoteles</h1>
                    <button onClick={handleCreate}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-5 py-2 rounded-xl transition">
                        + Nuevo hotel
                    </button>
                </div>

                {showForm && (
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4">{editing ? 'Editar hotel' : 'Nuevo hotel'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Nombre</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Nombre del hotel" />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
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
                                <label className="block text-slate-400 text-sm font-medium mb-2">Estrellas</label>
                                <select value={data.stars} onChange={e => setData('stars', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500">
                                    {[1,2,3,4,5].map(n => (
                                        <option key={n} value={n}>{n} estrella{n > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Precio por noche (S/.)</label>
                                <input type="number" value={data.price_per_person} onChange={e => setData('price_per_person', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="0.00" min="0" step="0.01" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Dirección</label>
                                <input type="text" value={data.address} onChange={e => setData('address', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Jr. Lima 123" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Teléfono</label>
                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="066 123456" />
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
                                <th className="text-left p-4">Hotel</th>
                                <th className="text-left p-4">Ubicación</th>
                                <th className="text-left p-4">Estrellas</th>
                                <th className="text-left p-4">Precio/noche</th>
                                <th className="text-left p-4">Teléfono</th>
                                <th className="text-left p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map((hotel) => (
                                <tr key={hotel.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                                    <td className="p-4 font-semibold">{hotel.name}</td>
                                    <td className="p-4 text-slate-400 text-sm">{hotel.location?.city}</td>
                                    <td className="p-4">
                                        <div className="flex">
                                            {[...Array(hotel.stars || 0)].map((_, i) => (
                                                <span key={i} className="text-yellow-400 text-sm">★</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 text-cyan-400 font-bold">
                                        {hotel.price_per_person ? `S/. ${Number(hotel.price_per_person).toFixed(2)}` : '-'}
                                    </td>
                                    <td className="p-4 text-slate-400 text-sm">{hotel.phone || '-'}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(hotel)}
                                                className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition">
                                                ✏️ Editar
                                            </button>
                                            <button onClick={() => handleDelete(hotel.id)}
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