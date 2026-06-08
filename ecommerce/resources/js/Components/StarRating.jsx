export default function StarRating({ rating, count, size = 'sm' }) {
    const avg    = rating ? Number(rating).toFixed(1) : null;
    const filled = rating ? Math.floor(Number(rating)) : 0;
    const hasHalf = rating ? (Number(rating) - filled) >= 0.5 : false;

    const starSize  = size === 'md' ? 'text-base' : 'text-sm';
    const textSize  = size === 'md' ? 'text-sm'   : 'text-xs';

    if (!avg) {
        return (
            <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map((star) => (
                    <span key={star} className={`${starSize} text-slate-700`}>★</span>
                ))}
                <span className={`${textSize} text-slate-600 ml-1`}>Sin reseñas</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {/* Estrellas */}
            <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((star) => (
                    <span
                        key={star}
                        className={`${starSize} transition ${
                            star <= filled
                                ? 'text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.6)]'
                                : star === filled + 1 && hasHalf
                                ? 'text-yellow-300'
                                : 'text-slate-700'
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>

            {/* Promedio */}
            <span className={`${textSize} font-bold text-yellow-400`}>
                {avg}
            </span>

            {/* Cantidad */}
            {count !== undefined && (
                <span className={`${textSize} text-slate-500`}>
                    · {count} {count === 1 ? 'reseña' : 'reseñas'}
                </span>
            )}
        </div>
    );
}