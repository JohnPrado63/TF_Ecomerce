import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const products = [
        {
            id: 1,
            name: "Lumina Sneakers",
            category: "Calzado",
            price: "$199",
            image: "/images/sneaker.png",
            color: "from-purple-500 to-indigo-600"
        },
        {
            id: 2,
            name: "Aura Chronograph",
            category: "Accesorios",
            price: "$349",
            image: "/images/watch.png",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 3,
            name: "Sonic Bass Pro",
            category: "Electrónica",
            price: "$249",
            image: "/images/headphones.png",
            color: "from-emerald-400 to-teal-500"
        }
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
            <Head title="Inicio - Vibe Store" />
            
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

            {/* Navbar */}
            <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5 sticky top-0">
                <div className="text-3xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    VIBE.
                </div>
                
                <div className="hidden md:flex space-x-8 text-sm font-medium text-neutral-300">
                    <a href="#" className="hover:text-white transition-colors duration-300">Novedades</a>
                    <a href="#" className="hover:text-white transition-colors duration-300">Hombre</a>
                    <a href="#" className="hover:text-white transition-colors duration-300">Mujer</a>
                    <a href="#" className="hover:text-white transition-colors duration-300">Colecciones</a>
                </div>

                <div className="flex space-x-4">
                    {auth?.user ? (
                        <Link href={route('dashboard')} className="text-sm font-medium px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-lg border border-white/10">
                            Mi Cuenta
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/5 transition-all duration-300">
                                Iniciar Sesión
                            </Link>
                            <Link href={route('register')} className="text-sm font-medium px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]">
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 container mx-auto px-6 pt-20 pb-24 lg:pt-32 lg:pb-32">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        Eleva tu estilo con <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            calidad premium
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                        Descubre una colección cuidadosamente curada que combina diseño vanguardista con materiales de la más alta calidad.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Explorar Colección
                        </button>
                        <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 backdrop-blur-md transition-all duration-300">
                            Ver Ofertas
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative rounded-3xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-500 backdrop-blur-md overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                            <div className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${product.color}`}></div>
                            
                            <div className="relative h-64 mb-6 rounded-2xl overflow-hidden bg-neutral-900/50 flex items-center justify-center p-4 border border-white/5">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover rounded-xl filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>
                            
                            <div className="relative z-10">
                                <p className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">{product.category}</p>
                                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-xl font-medium text-white/90">{product.price}</span>
                                    <button className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 bg-neutral-950 mt-20">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-neutral-500 text-sm">© 2026 Vibe Store. Todos los derechos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0 text-neutral-500">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
