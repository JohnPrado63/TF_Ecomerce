export default function StarRating({ rating, count, size = 'sm' }) {
    const avg    = rating ? Number(rating).toFixed(1) : null;
    const filled = rating ? Math.floor(Number(rating)) : 0;
    const hasHalf = rating ? (Number(rating) - filled) >= 0.5 : false;

    const starSize  = size === 'md' ? 'text-base' : 'text-sm';
    const textSize  = size === 'md' ? 'text-sm'   : 'text-xs';

    const ratingLabel = avg ? `Calificación ${avg} de 5 estrellas` : 'Sin calificación';

    if (!avg) {
        return (
            <div className="flex items-center gap-1.5" role="img" aria-label="Sin calificación">
                {[1,2,3,4,5].map((star) => (
                    <span key={star} className={`${starSize} text-slate-700`} aria-hidden="true">★</span>
                ))}
                <span className={`${textSize} text-slate-500 ml-1`}>Sin reseñas</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2" role="img" aria-label={ratingLabel}>
            <span className="sr-only">{ratingLabel}</span>
            <div className="flex items-center gap-0.5" aria-hidden="true">
                {[1,2,3,4,5].map((star) => (
                    <span
                        key={star}
                        className={`${starSize} transition ${
                            star <= filled
                                ? 'text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.6)]'
                                : star === filled + 1 && hasHalf
                                ? 'text-yellow-300'
                                : 'text-slate-600'
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>

            <span className={`${textSize} font-bold text-yellow-400`}>
                {avg}
            </span>

            {count !== undefined && (
                <span className={`${textSize} text-slate-400`}>
                    · {count} {count === 1 ? 'reseña' : 'reseñas'}
                </span>
            )}
        </div>
    );
}