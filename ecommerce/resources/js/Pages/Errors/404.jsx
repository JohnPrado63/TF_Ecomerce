import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
            <Head title="Página no encontrada - ESKY TRIPS" />

            <div className="text-center max-w-lg">

                {/* Emoji avión perdido */}
                <div className="text-8xl mb-4 animate-bounce">
                    ✈️
                </div>

                {/* Número 404 */}
                <div className="relative mb-4">
                    <p className="text-[150px] font-black text-slate-800 leading-none select-none">
                        404
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-3xl font-bold text-cyan-400">
                            ¡Te perdiste en el viaje!
                        </p>
                    </div>
                </div>

                {/* Mensaje gracioso */}
                <p className="text-slate-400 text-base mb-2">
                    Oops... parece que tu vuelo aterrizó en el lugar equivocado. 
                </p>
                <p className="text-slate-500 text-sm mb-8">
                    Esta página no existe, fue cancelada o quizás nunca despegó. 
                </p>

                {/* Sugerencia graciosa */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 mb-8 text-sm text-slate-400">
                    💡 <span className="text-white font-semibold">Consejo del guía:</span> <br />En lugar de quedarte aquí perdido, 
                    mejor explora los increíbles destinos de Ayacucho que tenemos para ti. 
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-8 py-3 rounded-xl transition"
                    >
                        🏠 Llevarme a casa
                    </Link>
                    <Link
                        href="/packages"
                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3 rounded-xl transition border border-slate-700"
                    >
                        🧳 Ver paquetes turísticos
                    </Link>
                </div>

                {/* Firma graciosa */}
                <p className="text-slate-700 text-xs mt-10">
                    Error 404 · ESKY TRIPS · "Encontramos destinos, no páginas perdidas" 
                </p>

            </div>
        </div>
    );
}