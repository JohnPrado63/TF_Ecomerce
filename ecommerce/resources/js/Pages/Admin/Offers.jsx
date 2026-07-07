import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Icon from '@/Components/Icon';
import AdminNavbar from '@/Components/AdminNavbar';

export default function Offers({ offers }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing]   = useState(null);

    const { data, setData, processing, errors, reset } = useForm({
        title:               '',
        slug:                '',
        description:         '',
        discount_percentage: '',
        start_date:          '',
        end_date:            '',
        code:                '',
        active:              true,
    });

    function handleCreate() {
        setEditing(null);
        reset();
        setShowForm(true);
    }

    function handleEdit(offer) {
        setEditing(offer);
        setData({
            title:               offer.title,
            slug:                offer.slug,
            description:         offer.description || '',
            discount_percentage: offer.discount_percentage,
            start_date:          offer.start_date,
            end_date:            offer.end_date,
            code:                offer.code || '',
            active:              offer.active,
        });
        setShowForm(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (editing) {
            router.put(`/admin/offers/${editing.id}`, data, {
                onSuccess: () => { setShowForm(false); reset(); setEditing(null); }
            });
        } else {
            router.post('/admin/offers', data, {
                onSuccess: () => { setShowForm(false); reset(); }
            });
        }
    }

    function handleDelete(id) {
        if (confirm('¿Eliminar esta oferta?')) {
            router.delete(`/admin/offers/${id}`);
        }
    }

    function generateSlug(title) {
        return title.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Ofertas - Admin" />
            <AdminNavbar />

            <div className="container mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Gestión de Ofertas</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-5 py-2 rounded-xl transition"
                    >
                        + Nueva oferta
                    </button>
                </div>

                {showForm && (
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4">
                            {editing ? 'Editar oferta' : 'Nueva oferta'}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Título</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => {
                                        setData('title', e.target.value);
                                        if (!editing) setData('slug', generateSlug(e.target.value));
                                    }}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Ej: Descuento de Verano"
                                />
                                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Código de descuento</label>
                                <input
                                    type="text"
                                    value={data.code}
                                    onChange={e => setData('code', e.target.value.toUpperCase())}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Ej: VERANO25"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">% de descuento</label>
                                <input
                                    type="number"
                                    value={data.discount_percentage}
                                    onChange={e => setData('discount_percentage', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Ej: 20"
                                    min="1"
                                    max="100"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Descripción</label>
                                <input
                                    type="text"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Descripción breve"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Fecha inicio</label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={e => setData('start_date', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Fecha fin</label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={e => setData('end_date', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                />
                            </div>

                            <div className="md:col-span-2 flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="active"
                                    checked={data.active}
                                    onChange={e => setData('active', e.target.checked)}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="active" className="text-slate-400 text-sm">Oferta activa</label>
                            </div>

                            <div className="md:col-span-2 flex gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-2 rounded-xl transition"
                                >
                                    {editing ? 'Actualizar' : 'Crear'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowForm(false); reset(); setEditing(null); }}
                                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-2 rounded-xl transition"
                                >
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
                                <th className="text-left p-4">Oferta</th>
                                <th className="text-left p-4">Código</th>
                                <th className="text-left p-4">Descuento</th>
                                <th className="text-left p-4">Vigencia</th>
                                <th className="text-left p-4">Estado</th>
                                <th className="text-left p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center p-8 text-slate-400">
                                        No hay ofertas creadas aún
                                    </td>
                                </tr>
                            ) : (
                                offers.map((offer) => {
                                    const isValid = offer.active
                                        && new Date(offer.start_date) <= new Date()
                                        && new Date(offer.end_date) >= new Date();

                                    return (
                                        <tr key={offer.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                                            <td className="p-4">
                                                <p className="font-semibold">{offer.title}</p>
                                                <p className="text-slate-500 text-xs">{offer.description}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className="bg-slate-800 text-cyan-400 font-black text-sm px-3 py-1 rounded-lg tracking-widest">
                                                    {offer.code || '-'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="bg-red-900/50 text-red-300 font-black text-sm px-3 py-1 rounded-full">
                                                    -{offer.discount_percentage}%
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-400 text-sm">
                                                <p>{offer.start_date}</p>
                                                <p>→ {offer.end_date}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                                                    isValid
                                                        ? 'bg-green-900/50 text-green-300'
                                                        : 'bg-slate-800 text-slate-500'
                                                }`}>
                                                    {isValid ? (
                                                        <><Icon name="check-circle" size={12} /> Activa</>
                                                    ) : (
                                                        <><Icon name="x-circle" size={12} /> Inactiva</>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(offer)}
                                                        className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition"
                                                    >
                                                        ✏️ Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(offer.id)}
                                                        className="text-xs bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1 rounded-lg transition"
                                                    >
                                                        🗑️ Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}