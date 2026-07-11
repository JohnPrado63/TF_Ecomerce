import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-center items-center pt-6 sm:pt-0 relative overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,58,138,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(219,39,119,0.20),_transparent_28%)] pointer-events-none"></div>

            {/* Animated background elements */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.1); }
                    50% { box-shadow: 0 0 40px rgba(56, 189, 248, 0.3); }
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
                .animate-glow { animation: glow 3s ease-in-out infinite; }
                .animate-slide-up { animation: slideUp 0.6s ease-out; }
                
                /* Floating particles */
                .particle {
                    position: absolute;
                    pointer-events: none;
                }
            `}</style>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="particle animate-float opacity-30" style={{ width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)', borderRadius: '50%', top: '-50px', left: '-50px' }}></div>
                <div className="particle animate-float opacity-20" style={{ width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(219,39,119,0.2) 0%, transparent 70%)', borderRadius: '50%', bottom: '-30px', right: '-30px', animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 w-full sm:max-w-md animate-slide-up">
                <div className="flex justify-center mb-8">
                    <Link href="/">
                        <div className="text-3xl font-bold tracking-tight text-white hover:text-sky-300 transition duration-300 cursor-pointer">
                            ESKY TRIPS
                        </div>
                    </Link>
                </div>

                <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 shadow-2xl shadow-slate-950/50 overflow-hidden backdrop-blur-sm hover:border-slate-700 transition duration-300 animate-glow">
                    <div className="px-8 py-10">
                        {children}
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-slate-400 hover:text-slate-400 transition duration-300">
                    <p>© 2026 ESKY TRIPS. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
}
