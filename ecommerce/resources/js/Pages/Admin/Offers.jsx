import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Icon from '@/Components/Icon';
import AdminNavbar from '@/Components/AdminNavbar';
import OfferCard from '@/Components/OfferCard';
import SectionHeader from '@/Components/SectionHeader';

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

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <SectionHeader
                    title="Ofertas y Promociones"
                    description="Gestiona las ofertas especiales y códigos de descuento"
                    actionLabel="+ Nueva oferta"
                    onAction={handleCreate}
                    icon="tag"
                />

                {showForm && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl p-6 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                <Icon name={editing ? 'edit-2' : 'plus'} size={20} className="text-cyan-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">
                                {editing ? 'Editar oferta' : 'Nueva oferta'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Título</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => {
                                        setData('title', e.target.value);
                                        if (!editing) setData('slug', generateSlug(e.target.value));
                                    }}
                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
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
                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                                    placeholder="Ej: VERANO25"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">% de descuento</label>
                                <input
                                    type="number"
                                    value={data.discount_percentage}
                                    onChange={e => setData('discount_percentage', e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
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
                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                                    placeholder="Descripción breve"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Fecha inicio</label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={e => setData('start_date', e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm font-medium mb-2">Fecha fin</label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={e => setData('end_date', e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                                />
                            </div>

                            <div className="md:col-span-2 flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="active"
                                    checked={data.active}
                                    onChange={e => setData('active', e.target.checked)}
                                    className="w-4 h-4 accent-cyan-500"
                                />
                                <label htmlFor="active" className="text-slate-400 text-sm">Oferta activa</label>
                            </div>

                            <div className="md:col-span-2 flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-900 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                                >
                                    {editing ? 'Actualizar' : 'Crear'} oferta
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowForm(false); reset(); setEditing(null); }}
                                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-3 rounded-xl transition"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {offers.length === 0 ? (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-700 rounded-2xl p-12 text-center">
                        <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                            <Icon name="tag" size={40} className="text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No hay ofertas creadas</h3>
                        <p className="text-slate-500 mb-6">Crea tu primera oferta para atraer más clientes</p>
                        <button
                            onClick={handleCreate}
                            className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-900 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                        >
                            + Crear primera oferta
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offers.map((offer) => (
                            <OfferCard
                                key={offer.id}
                                offer={offer}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
