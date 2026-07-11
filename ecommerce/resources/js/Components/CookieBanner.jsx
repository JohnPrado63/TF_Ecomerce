import { useState, useEffect } from 'react';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('cookies_accepted');
        if (!accepted) setVisible(true);
    }, []);

    function accept() {
        localStorage.setItem('cookies_accepted', 'true');
        setVisible(false);
    }

    function reject() {
        localStorage.setItem('cookies_accepted', 'false');
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 p-4 shadow-2xl">
            <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                    <p className="text-white font-semibold mb-1">🍪 Usamos cookies</p>
                    <p className="text-slate-400 text-sm">
                        Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido.
                        Al aceptar, consientes el uso de cookies según nuestra{' '}
                        <a href="/privacidad" className="text-cyan-400 hover:underline">Política de Privacidad</a>.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={reject}
                        className="px-5 py-2 rounded-xl border border-slate-600 text-slate-400 hover:bg-slate-800 transition text-sm font-semibold"
                    >
                        Rechazar
                    </button>
                    <button
                        onClick={accept}
                        className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 transition text-sm font-semibold"
                    >
                        Aceptar cookies
                    </button>
                </div>
            </div>
        </div>
    );
}