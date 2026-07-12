import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import axios from 'axios';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';
import StarRating from '@/Components/StarRating';
import SectionHeader from '@/Components/SectionHeader';
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
        { key: 'all', label: 'Todos', icon: 'grid' },
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
        { icon: 'wallet', text: 'Aumenta tu presupuesto', action: () => setFilterBy('all') },
        { icon: 'calendar', text: 'Cambia la duración', action: () => setSortBy('score') },
        { icon: 'tag', text: 'Otra categoría', action: () => setFilterBy('all') },
        { icon: 'sparkles', text: 'Explora destinos nuevos', action: () => setFilterBy('all') },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Travel Match - ESKY TRIPS" />

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">

                <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400 mb-2">
                                <Icon name="target" size={14} sm:size={16} />
                                Travel Match
                            </p>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Tu próximo destino te espera</h1>
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                                <span className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/50 px-3 py-1.5 rounded-lg text-slate-300">
                                    <Icon name="wallet" size={14} className="text-cyan-400" />
                                    S/. {Number(preference.preferred_budget || 0).toFixed(0)}
                                </span>
                                <span className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/50 px-3 py-1.5 rounded-lg text-slate-300">
                                    <Icon name="calendar" size={14} className="text-cyan-400" />
                                    {preference.preferred_duration || '?'} días
                                </span>
                                <span className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/50 px-3 py-1.5 rounded-lg text-slate-300">
                                    <Icon name="tag" size={14} className="text-cyan-400" />
                                    {preference.preferred_category || 'Cualquiera'}
                                </span>
                                {preference.traveler_type && (
                                    <span className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-3 py-1.5 rounded-lg">
                                        <Icon name="user" size={14} />
                                        {preference.traveler_type}
                                    </span>
                                )}
                            </div>
                        </div>
                        <Link
                            href="/preferences"
                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-5 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20 text-sm whitespace-nowrap"
                        >
                            <Icon name="settings" size={16} />
                            Editar preferencias
                        </Link>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-5 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {quickFilters.map((filter) => (
                                <button
                                    key={filter.key}
                                    onClick={() => setFilterBy(filter.key)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                                        filterBy === filter.key
                                            ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                                            : 'bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                                >
                                    <Icon name={filter.icon} size={15} />
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-cyan-500 transition"
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
                    <div className="bg-gradient-to-r from-cyan-900/20 to-slate-900 border border-cyan-500/20 rounded-xl p-4 mb-6">
                        <p className="flex items-center gap-2 text-sm text-slate-300">
                            <Icon name="brain" size={16} className="text-cyan-400" />
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
                    <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-12 text-center">
                        <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-6">
                            <Icon name="search" size={40} className="text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No encontramos paquetes con esos filtros</h3>
                        <p className="text-slate-400 mb-8">Aquí hay algunas sugerencias para ampliar tu búsqueda</p>

                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {suggestions.map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={suggestion.action}
                                    className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 text-slate-300 px-4 py-2 rounded-xl text-sm transition"
                                >
                                    <Icon name={suggestion.icon} size={14} />
                                    {suggestion.text}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => { setFilterBy('all'); setSortBy('score'); }}
                                className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                            >
                                Ver todos los paquetes
                            </button>
                            <Link
                                href="/preferences"
                                className="flex items-center justify-center gap-2 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 text-white font-medium px-6 py-3 rounded-xl transition"
                            >
                                <Icon name="settings" size={16} />
                                Ajustar preferencias
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-slate-400 text-sm mb-4 flex items-center gap-2">
                            <Icon name="package" size={15} />
                            Mostrando {sortedPackages.length} paquete{sortedPackages.length !== 1 ? 's' : ''} recomendados
                        </p>
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
                                            console.log('Similar to:', similarPkg.title);
                                        }}
                                    />
                                ))}
                            </div>
                        </Suspense>
                    </>
                )}

                <div className="mt-16 border-t border-slate-800/80 pt-10 text-center">
                    <p className="text-slate-400 text-lg mb-4">
                        ¿No encuentras lo que buscas?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/packages"
                            className="inline-flex items-center justify-center gap-2 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 text-white font-medium px-5 py-3 rounded-xl transition"
                        >
                            <Icon name="compass" size={16} />
                            Explorar todos los paquetes
                        </Link>
                        <Link
                            href="/preferences"
                            className="inline-flex items-center justify-center gap-2 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-400 font-medium px-5 py-3 rounded-xl transition"
                        >
                            <Icon name="settings" size={16} />
                            Modificar preferencias
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
