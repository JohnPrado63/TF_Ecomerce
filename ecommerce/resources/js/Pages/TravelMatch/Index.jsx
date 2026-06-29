import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';
import StarRating from '@/Components/StarRating';
import { PackageCardSkeleton } from '@/Components/PackageCard';

const PackageCard = lazy(() => import('@/Components/PackageCard'));

export default function Index({ recommendations, preference, behavioralProfile }) {
    const [sortBy, setSortBy] = useState('score');
    const [filterBy, setFilterBy] = useState('all');
    const [sortedPackages, setSortedPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const sessionId = useRef(sessionStorage.getItem('travel_match_session') || `session_${Date.now()}`);

    useEffect(() => {
        sessionStorage.setItem('travel_match_session', sessionId.current);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            let filtered = [...recommendations];

            if (filterBy === 'budget') {
                filtered = filtered.filter(p => p.score_breakdown?.budget >= 20);
            } else if (filterBy === 'duration') {
                filtered = filtered.filter(p => p.score_breakdown?.duration >= 15);
            } else if (filterBy === 'category') {
                filtered = filtered.filter(p => p.score_breakdown?.category >= 25);
            } else if (filterBy === 'new') {
                filtered = filtered.filter(p => p.score_breakdown?.novelty > 1.1);
            }

            filtered.sort((a, b) => {
                if (sortBy === 'score') return b.match_score - a.match_score;
                if (sortBy === 'price_asc') return a.price - b.price;
                if (sortBy === 'price_desc') return b.price - a.price;
                if (sortBy === 'rating') return (b.reviews_avg_rating || 0) - (a.reviews_avg_rating || 0);
                if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
                return 0;
            });

            setSortedPackages(filtered);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [sortBy, filterBy, recommendations]);

    const quickFilters = [
        { key: 'all', label: 'Todos', icon: 'layers' },
        { key: 'budget', label: 'En presupuesto', icon: 'wallet' },
        { key: 'duration', label: 'Duración ideal', icon: 'calendar' },
        { key: 'category', label: 'Categoría perfecta', icon: 'tag' },
        { key: 'new', label: 'Descubrir nuevos', icon: 'sparkles' },
    ];

    const sortOptions = [
        { key: 'score', label: 'Mejor match' },
        { key: 'price_asc', label: 'Menor precio' },
        { key: 'price_desc', label: 'Mayor precio' },
        { key: 'rating', label: 'Mejor rating' },
        { key: 'newest', label: 'Más recientes' },
    ];

    const suggestions = [
        { icon: 'wallet', text: 'Aumenta tu presupuesto' },
        { icon: 'calendar', text: 'Cambia la duración' },
        { icon: 'tag', text: 'Otra categoría' },
        { icon: 'sparkles', text: 'Explora destinos nuevos' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Travel Match - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-10">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-2 flex items-center gap-2">
                            <Icon name="target" size={18} />
                            Travel Match
                        </p>
                        <h1 className="text-3xl font-bold mb-2">Tu próximo destino te espera</h1>
                        <p className="text-slate-400 text-sm flex items-center gap-2 flex-wrap">
                            <span className="bg-slate-800 px-2 py-0.5 rounded">
                                <Icon name="wallet" size={12} className="inline" /> S/. {Number(preference.preferred_budget || 0).toFixed(0)}
                            </span>
                            <span className="bg-slate-800 px-2 py-0.5 rounded">
                                <Icon name="calendar" size={12} className="inline" /> {preference.preferred_duration || '?'} días
                            </span>
                            <span className="bg-slate-800 px-2 py-0.5 rounded">
                                <Icon name="tag" size={12} className="inline" /> {preference.preferred_category || 'Cualquiera'}
                            </span>
                            {preference.traveler_type && (
                                <span className="bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded">
                                    <Icon name="user" size={12} className="inline" /> {preference.traveler_type}
                                </span>
                            )}
                        </p>
                    </div>
                    <Link
                        href="/preferences"
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-5 py-2.5 rounded-xl transition text-sm whitespace-nowrap flex items-center gap-2"
                    >
                        <Icon name="settings" size={16} /> Editar preferencias
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {quickFilters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setFilterBy(filter.key)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                                    filterBy === filter.key
                                        ? 'bg-cyan-500 text-slate-900'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                            >
                                <Icon name={filter.icon} size={12} />
                                {filter.label}
                            </button>
                        ))}
                    </div>
                    <div className="md:ml-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.key} value={option.key}>
                                    Ordenar: {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {behavioralProfile && (behavioralProfile.viewed_count > 0 || behavioralProfile.clicked_count > 0) && (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-6">
                        <p className="text-xs text-slate-400 flex items-center gap-2">
                            <Icon name="brain" size={14} className="text-cyan-400" />
                            <span>Hemos analizado tu actividad: has visto {behavioralProfile.viewed_count} paquetes y hecho {behavioralProfile.clicked_count} clics</span>
                        </p>
                    </div>
                )}

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <PackageCardSkeleton key={i} />
                        ))}
                    </div>
                ) : sortedPackages.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-900 flex items-center justify-center">
                            <Icon name="search" size={40} className="text-slate-600" />
                        </div>
                        <p className="text-slate-300 text-xl mb-2">
                            No encontramos paquetes con esos filtros
                        </p>
                        <p className="text-slate-500 text-sm mb-8">
                            Aquí hay algunas sugerencias para ampliar tu búsqueda
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {suggestions.map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        if (suggestion.text.includes('presupuesto')) setFilterBy('all');
                                        else if (suggestion.text.includes('duración')) setSortBy('score');
                                        else setFilterBy('all');
                                    }}
                                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm transition"
                                >
                                    <Icon name={suggestion.icon} size={14} />
                                    {suggestion.text}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => { setFilterBy('all'); setSortBy('score'); }}
                                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition"
                            >
                                Ver todos los paquetes
                            </button>
                            <Link
                                href="/preferences"
                                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium px-6 py-3 rounded-xl transition"
                            >
                                Ajustar preferencias
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-slate-500 text-sm">
                            Mostrando {sortedPackages.length} paquete{sortedPackages.length !== 1 ? 's' : ''}
                        </div>
                        <Suspense fallback={
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(3)].map((_, i) => (
                                    <PackageCardSkeleton key={i} />
                                ))}
                            </div>
                        }>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedPackages.map((pkg, index) => (
                                    <PackageCard
                                        key={pkg.id}
                                        pkg={pkg}
                                        showSimilarButton={true}
                                        onSimilarClick={(similarPkg) => {
                                            // Could navigate to filtered view
                                            console.log('Similar to:', similarPkg.title);
                                        }}
                                    />
                                ))}
                            </div>
                        </Suspense>
                    </>
                )}

                <div className="mt-16 text-center border-t border-slate-800 pt-10">
                    <p className="text-slate-500 text-lg mb-4">
                        ¿No encuentras lo que buscas?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/packages"
                            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium px-5 py-2.5 rounded-xl transition text-sm"
                        >
                            <Icon name="compass" size={16} /> Explorar todos los paquetes
                        </Link>
                        <Link
                            href="/preferences"
                            className="inline-flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-medium px-5 py-2.5 rounded-xl transition text-sm"
                        >
                            <Icon name="settings" size={16} /> Modificar preferencias
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
