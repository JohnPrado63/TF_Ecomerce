import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import Icon from '@/Components/Icon';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
            <Head title="Página no encontrada - ESKY TRIPS" />

            <div className="text-center max-w-lg px-4">

                <div className="relative mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-slate-800 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
                        <Icon name="compass" size={40} sm:size={48} className="text-cyan-400" />
                    </div>
                </div>

                <div className="relative mb-6">
                    <p className="text-[80px] sm:text-[120px] lg:text-[150px] font-black text-slate-800 leading-none select-none">
                        404
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 px-4">
                            ¡Te perdiste en el viaje!
                        </p>
                    </div>
                </div>

                <p className="text-slate-400 text-base mb-2">
                    Oops... parece que tu vuelo aterrizó en el lugar equivocado.
                </p>
                <p className="text-slate-500 text-sm mb-8">
                    Esta página no existe, fue cancelada o quizás nunca despegó.
                </p>

                <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Icon name="lightbulb" size={18} className="text-cyan-400" />
                        <span className="text-white font-semibold">Consejo del guía:</span>
                    </div>
                    <p className="text-slate-400 text-sm">
                        En lugar de quedarte aquí perdido, mejor explora los increíbles destinos de Ayacucho que tenemos para ti.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                    >
                        <Icon name="home" size={18} />
                        Llevarme a casa
                    </Link>
                    <Link
                        href="/packages"
                        className="flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-xl transition border border-slate-700/50"
                    >
                        <Icon name="package" size={18} />
                        Ver paquetes turísticos
                    </Link>
                </div>

                <p className="text-slate-700 text-xs mt-10">
                    Error 404 · ESKY TRIPS · "Encontramos destinos, no páginas perdidas"
                </p>

            </div>
        </div>
    );
}
