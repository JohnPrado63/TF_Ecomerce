export default function StarRating({ rating, count, size = 'sm' }) {
    const avg   = rating ? Number(rating).toFixed(1) : null;
    const stars = rating ? Math.round(Number(rating)) : 0;

    const sizeClass = size === 'sm' ? 'text-xs' : 'text-sm';

    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`${sizeClass} ${
                            star <= stars ? 'text-yellow-400' : 'text-slate-600'
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>
            {avg ? (
                <span className={`${sizeClass} text-slate-400 font-medium`}>
                    {avg}
                </span>
            ) : null}
            {count !== undefined && (
                <span className={`${sizeClass} text-slate-500`}>
                    ({count})
                </span>
            )}
        </div>
    );
}