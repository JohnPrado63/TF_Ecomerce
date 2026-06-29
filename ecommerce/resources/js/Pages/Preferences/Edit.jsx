import { Head, Link, useForm } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';

export default function Edit({ preference, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        preferred_budget:   preference?.preferred_budget   || '',
        preferred_duration: preference?.preferred_duration || '',
        preferred_category: preference?.preferred_category || '',
        preferred_activity: preference?.preferred_activity || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/preferences');
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Mis Preferencias - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-10 max-w-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <Icon name="target" size={48} className="mx-auto mb-3 text-cyan-400" />
                        <h1 className="text-3xl font-bold mb-2">Travel Match</h1>
                    <p className="text-slate-400">
                        Cuéntanos qué te gusta y te recomendaremos los paquetes perfectos para ti
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Presupuesto */}
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                💰 ¿Cuál es tu presupuesto aproximado por viaje?
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">S/.</span>
                                <input
                                    type="number"
                                    value={data.preferred_budget}
                                    onChange={e => setData('preferred_budget', e.target.value)}
                                    placeholder="250"
                                    min="0"
                                    step="0.01"
                                    className="w-full bg-slate-800 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                                />
                            </div>
                            {errors.preferred_budget && (
                                <p className="text-red-400 text-xs mt-1">{errors.preferred_budget}</p>
                            )}
                        </div>

                            {/* Duración */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                                    <Icon name="calendar" size={16} />
                                    ¿Cuántos días sueles viajar?
                                </label>
                            <div className="grid grid-cols-4 gap-3">
                                {[1, 2, 3, 4].map((days) => (
                                    <button
                                        key={days}
                                        type="button"
                                        onClick={() => setData('preferred_duration', days)}
                                        className={`py-3 rounded-xl font-bold text-sm border transition ${
                                            Number(data.preferred_duration) === days
                                                ? 'bg-cyan-500 border-cyan-400 text-slate-900'
                                                : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
                                        }`}
                                    >
                                        {days} día{days > 1 ? 's' : ''}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Categoría */}
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                🏔️ ¿Qué tipo de experiencia prefieres?
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setData('preferred_category', cat.name)}
                                        className={`text-left p-4 rounded-xl border transition ${
                                            data.preferred_category === cat.name
                                                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300'
                                                : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
                                        }`}
                                    >
                                        <p className="font-semibold text-sm">{cat.name}</p>
                                        <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actividad */}
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                                <Icon name="sparkles" size={16} /> ¿Hay algo específico que te gustaría hacer? (opcional)
                            </label>
                            <input
                                type="text"
                                value={data.preferred_activity}
                                onChange={e => setData('preferred_activity', e.target.value)}
                                placeholder="Ej: lagunas, arqueología, gastronomía, caminatas..."
                                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-900 font-bold py-3 rounded-xl transition text-base flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <><Icon name="loader" size={18} className="animate-spin" /> Buscando...</>
                            ) : (
                                <><Icon name="target" size={18} /> Encontrar mis paquetes ideales</>
                            )}
                        </button>

                    </form>
                </div>

                <p className="text-center text-slate-500 text-xs mt-6">
                    Tus preferencias se guardan y puedes actualizarlas cuando quieras
                </p>
            </div>
        </div>
    );
}