import { Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Icon from '@/Components/Icon';
import StarRating from '@/Components/StarRating';

export default function PackageCard({ pkg, showSimilarButton = false, onSimilarClick = null }) {
    const [isHovered, setIsHovered] = useState(false);
    const [viewStartTime, setViewStartTime] = useState(null);
    const sessionId = useRef(sessionStorage.getItem('travel_match_session') || `session_${Date.now()}`);

    useEffect(() => {
        sessionStorage.setItem('travel_match_session', sessionId.current);
    }, []);

    useEffect(() => {
        if (isHovered && viewStartTime === null) {
            setViewStartTime(Date.now());
            trackInteraction('view');
        } else if (!isHovered && viewStartTime !== null) {
            const duration = Math.round((Date.now() - viewStartTime) / 1000);
            if (duration > 1) {
                trackInteraction('hover', duration);
            }
            setViewStartTime(null);
        }
    }, [isHovered]);

    const trackInteraction = (type, duration = null) => {
        const data = {
            package_id: pkg.id,
            type: type,
            session_id: sessionId.current,
        };
        if (duration) {
            data.duration = duration;
        }

        try {
            fetch('/travel-match/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
                body: JSON.stringify(data),
                keepalive: true,
            });
        } catch (e) {
            // Silent fail for tracking
        }
    };

    const handleClick = () => {
        trackInteraction('click');
    };

    const handleSave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        trackInteraction('save');
    };

    function getScoreColor(score) {
        if (score >= 70) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
        if (score >= 40) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }

    function getScoreBgColor(score) {
        if (score >= 70) return 'from-emerald-500/20 to-emerald-600/5';
        if (score >= 40) return 'from-yellow-500/20 to-yellow-600/5';
        return 'from-slate-500/20 to-slate-600/5';
    }

    const matchScore = pkg.match_score;
    const scoreBreakdown = pkg.score_breakdown || {};

    return (
        <div
            className="group relative bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {matchScore && (
                <div className={`absolute inset-0 bg-gradient-to-br ${getScoreBgColor(matchScore)} opacity-50 pointer-events-none`} />
            )}

            <div className="relative h-44 overflow-hidden">
                <Link href={`/packages/${pkg.id}`} onClick={handleClick}>
                    <img
                        src={pkg.image_url}
                        alt={pkg.title}
                        className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${pkg.status === false ? 'opacity-50' : ''}`}
                    />
                </Link>

                {pkg.status === false && (
                    <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        No disponible
                    </div>
                )}
                {pkg.status === true && (
                    <div className="absolute top-3 left-3 bg-emerald-600/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        ✓ Activo
                    </div>
                )}

                {matchScore && (
                    <div className={`absolute top-3 right-3 backdrop-blur-sm border rounded-full px-3 py-1 text-xs font-bold ${getScoreColor(matchScore)}`}>
                        {matchScore}% match
                    </div>
                )}

                {scoreBreakdown?.novelty > 1.1 && (
                    <div className="absolute bottom-3 left-3 bg-purple-500/80 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <Icon name="sparkles" size={10} /> Nuevo
                    </div>
                )}

                {showSimilarButton && onSimilarClick && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onSimilarClick(pkg);
                        }}
                        className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 hover:bg-slate-800 transition"
                    >
                        <Icon name="layers" size={10} /> Similar
                    </button>
                )}
            </div>

            <div className="relative p-5">
                <p className="text-slate-500 text-xs mb-1 flex items-center gap-1">
                    <Icon name="map-pin" size={12} /> {pkg.location?.city}, {pkg.location?.region}
                </p>
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-cyan-400 transition line-clamp-1">
                    <Link href={`/packages/${pkg.id}`} onClick={handleClick}>
                        {pkg.title}
                    </Link>
                </h3>

                <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={pkg.reviews_avg_rating} count={pkg.reviews_count} />
                    {pkg.reviews_avg_rating >= 4.5 && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                            <Icon name="check" size={10} />Excelente
                        </span>
                    )}
                </div>

                {pkg.match_reasons?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {pkg.match_reasons.slice(0, 2).map((reason, i) => (
                            <span key={i} className="text-xs bg-cyan-900/40 text-cyan-300 px-2 py-1 rounded-full flex items-center gap-1">
                                <Icon name="check" size={10} /> {reason}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <div>
                        <p className="text-cyan-400 font-bold text-xl">
                            S/. {Number(pkg.price).toFixed(2)}
                        </p>
                        <p className="text-slate-500 text-xs flex items-center gap-1">
                            <Icon name="calendar" size={12} /> {pkg.duration_days} día(s)
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {pkg.status === false ? (
                            <button
                                disabled
                                className="bg-slate-700 text-slate-500 font-bold px-4 py-2 rounded-xl transition text-sm cursor-not-allowed"
                            >
                                No disponible
                            </button>
                        ) : (
                            <Link
                                href={`/packages/${pkg.id}`}
                                onClick={handleClick}
                                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-xl transition text-sm"
                            >
                                Ver más
                            </Link>
                        )}
                        <button
                            onClick={handleSave}
                            className="bg-slate-700 hover:bg-slate-600 text-slate-300 p-2 rounded-xl transition text-sm"
                            title="Guardar para después"
                        >
                            <Icon name="bookmark" size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PackageCardSkeleton() {
    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden animate-pulse">
            <div className="h-44 bg-slate-800" />
            <div className="p-5">
                <div className="h-3 w-24 bg-slate-800 rounded mb-2" />
                <div className="h-5 w-full bg-slate-800 rounded mb-1" />
                <div className="h-5 w-3/4 bg-slate-800 rounded mb-3" />
                <div className="h-4 w-32 bg-slate-800 rounded mb-4" />
                <div className="flex gap-2 mb-4">
                    <div className="h-6 w-20 bg-slate-800 rounded-full" />
                    <div className="h-6 w-24 bg-slate-800 rounded-full" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                    <div>
                        <div className="h-6 w-16 bg-slate-800 rounded mb-1" />
                        <div className="h-3 w-12 bg-slate-800 rounded" />
                    </div>
                    <div className="h-9 w-24 bg-slate-800 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
