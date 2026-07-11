import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Icon from '@/Components/Icon';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-center items-center pt-6 sm:pt-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.15),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(219,39,119,0.10),_transparent_40%)] pointer-events-none"></div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 30px rgba(6,182,212,0.15); }
                    50% { box-shadow: 0 0 50px rgba(6,182,212,0.25); }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-glow { animation: glow 4s ease-in-out infinite; }
                .animate-slide-up { animation: slideUp 0.6s ease-out; }
                .particle {
                    position: absolute;
                    pointer-events: none;
                }
            `}</style>

            <div className="absolute inset-0 overflow-hidden">
                <div className="particle animate-float opacity-20" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)', borderRadius: '50%', top: '-100px', left: '-100px' }}></div>
                <div className="particle animate-float opacity-15" style={{ width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(219,39,119,0.15) 0%, transparent 70%)', borderRadius: '50%', bottom: '-50px', right: '-50px', animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 w-full sm:max-w-md animate-slide-up px-4 sm:px-0">
                <div className="flex justify-center mb-6 sm:mb-8">
                    <Link href="/" className="group flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/30 flex items-center justify-center">
                            <Icon name="compass" size={18} className="text-cyan-400 sm:w-[22px] sm:h-[22px]" />
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition duration-300">
                                ESKY TRIPS
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-slate-500 tracking-[0.2em] uppercase">Travel Experience</div>
                        </div>
                    </Link>
                </div>

                <div className="rounded-2xl sm:rounded-[2rem] border border-slate-800/80 bg-gradient-to-b from-slate-900/95 to-slate-900/90 shadow-2xl shadow-slate-950/50 overflow-hidden backdrop-blur-sm hover:border-cyan-500/20 transition-all duration-500 animate-glow">
                    <div className="px-6 py-8 sm:px-8 sm:py-10">
                        {children}
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-slate-500 hover:text-slate-400 transition duration-300">
                    <p>© 2026 ESKY TRIPS. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
}
