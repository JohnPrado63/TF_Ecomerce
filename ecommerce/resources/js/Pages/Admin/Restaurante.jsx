import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Restaurants({ restaurants, locations }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing]   = useState(null);

    const { data, setData, processing, errors, reset } = useForm({
        nombre:      '',
        location_id: '',
        tipo_comida: '',
        direccion:   '',
    });

    function handleCreate() {
        setEditing(null);
        reset();
        setShowForm(true);
    }

    function handleEdit(restaurant) {
        setEditing(restaurant);
        setData({
            nombre:      restaurant.nombre,
            location_id: restaurant.location_id,
            tipo_comida: restaurant.tipo_comida || '',
            direccion:   restaurant.direccion || '',
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

            <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span className="font-bold text-xl text-cyan-400">ESKY TRIPS Admin</span>
                    <div className="flex gap-4 text-sm">
                        <Link href="/admin/dashboard" className="text-slate-400 hover:text-white transition">Dashboard</Link>
                        <Link href="/admin/packages" className="text-slate-400 hover:text-white transition">Paquetes</Link>
                        <Link href="/admin/bookings" className="text-slate-400 hover:text-white transition">Reservas</Link>
                        <Link href="/admin/payments" className="text-slate-400 hover:text-white transition">Pagos</Link>
                        <Link href="/admin/categories" className="text-slate-400 hover:text-white transition">Categorías</Link>
                        <Link href="/admin/guides" className="text-slate-400 hover:text-white transition">Guías</Link>
                        <Link href="/admin/hotels" className="text-slate-400 hover:text-white transition">Hoteles</Link>
                        <Link href="/admin/restaurants" className="text-white font-semibold border-b-2 border-cyan-500 pb-1">Restaurantes</Link>
                        <Link href="/admin/transports" className="text-slate-400 hover:text-white transition">Transportes</Link>
                        <Link href="/admin/reports" className="text-slate-400 hover:text-white transition">Reportes</Link>
                    </div>
                </div>
                <Link href="/" className="text-slate-400 hover:text-white text-sm transition">← Volver al sitio</Link>
            </nav>

            <div className="container mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Gestión de Restaurantes</h1>
                    <button onClick={handleCreate}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-5 py-2 rounded-xl transition">
                        + Nuevo restaurante
                    </button>
                </div>

                {showForm && (
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4">{editing ? 'Editar restaurante' : 'Nuevo restaurante'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Nombre</label>
                                <input type="text" value={data.nombre} onChange={e => setData('nombre', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Nombre del restaurante" />
                                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Ubicación</label>
                                <select value={data.location_id} onChange={e => setData('location_id', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500">
                                    <option value="">Selecciona ubicación</option>
                                    {locations.map(loc => (
                                        <option key={loc.id} value={loc.id}>{loc.city}, {loc.region}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Tipo de comida</label>
                                <input type="text" value={data.tipo_comida} onChange={e => setData('tipo_comida', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Ej: Gastronomía ayacuchana" />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Dirección</label>
                                <input type="text" value={data.direccion} onChange={e => setData('direccion', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Jr. Lima 123" />
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
                                <th className="text-left p-4">Restaurante</th>
                                <th className="text-left p-4">Ubicación</th>
                                <th className="text-left p-4">Tipo de comida</th>
                                <th className="text-left p-4">Dirección</th>
                                <th className="text-left p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restaurants.map((r) => (
                                <tr key={r.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                                    <td className="p-4 font-semibold">{r.nombre}</td>
                                    <td className="p-4 text-slate-400 text-sm">{r.location?.city}</td>
                                    <td className="p-4 text-slate-400 text-sm">{r.tipo_comida || '-'}</td>
                                    <td className="p-4 text-slate-400 text-sm">{r.direccion || '-'}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(r)}
                                                className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition">
                                                ✏️ Editar
                                            </button>
                                            <button onClick={() => handleDelete(r.id)}
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