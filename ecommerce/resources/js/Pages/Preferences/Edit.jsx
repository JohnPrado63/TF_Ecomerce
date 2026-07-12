import { Head, Link, useForm } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';
import SectionHeader from '@/Components/SectionHeader';

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

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 max-w-2xl">

                <SectionHeader
                    title="Travel Match"
                    description="Cuéntanos qué te gusta y te recomendaremos los paquetes perfectos para ti"
                    icon="target"
                />

                <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-5 sm:p-8 mt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-3">
                                <Icon name="wallet" size={16} className="text-cyan-400" />
                                ¿Cuál es tu presupuesto aproximado por viaje?
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
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                                />
                            </div>
                            {errors.preferred_budget && (
                                <p className="text-rose-400 text-xs mt-1">{errors.preferred_budget}</p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-3">
                                <Icon name="calendar" size={16} className="text-cyan-400" />
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
                                                ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 border-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                                                : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                                        }`}
                                    >
                                        {days} día{days > 1 ? 's' : ''}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-3">
                                <Icon name="compass" size={16} className="text-cyan-400" />
                                ¿Qué tipo de experiencia prefieres?
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setData('preferred_category', cat.name)}
                                        className={`text-left p-4 rounded-xl border transition ${
                                            data.preferred_category === cat.name
                                                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                                                : 'bg-slate-800/30 border-slate-700/50 text-slate-300 hover:border-slate-600'
                                        }`}
                                    >
                                        <p className="font-semibold text-sm">{cat.name}</p>
                                        <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
                                <Icon name="sparkles" size={16} className="text-cyan-400" />
                                ¿Hay algo específico que te gustaría hacer? (opcional)
                            </label>
                            <input
                                type="text"
                                value={data.preferred_activity}
                                onChange={e => setData('preferred_activity', e.target.value)}
                                placeholder="Ej: lagunas, arqueología, gastronomía, caminatas..."
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 disabled:from-slate-600 disabled:to-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold py-4 rounded-xl transition shadow-lg shadow-cyan-500/20 text-base flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <><Icon name="loader" size={18} className="animate-spin" /> Buscando...</>
                            ) : (
                                <><Icon name="target" size={18} /> Encontrar mis paquetes ideales</>
                            )}
                        </button>

                    </form>
                </div>

                <p className="text-center text-slate-500 text-sm mt-6 flex items-center justify-center gap-2">
                    <Icon name="info" size={14} />
                    Tus preferencias se guardan y puedes actualizarlas cuando quieras
                </p>
            </div>
        </div>
    );
}
