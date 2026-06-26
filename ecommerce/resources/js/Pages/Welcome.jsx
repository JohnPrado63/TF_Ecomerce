import StarRating from '@/Components/StarRating';
import { Link, Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';



const highlights = [
    {
        id: 1,
        title: 'Encrypted Security',
        detail: 'Enterprise-grade PCI DSS compliance for all global transactions.',
    },
    {
        id: 2,
        title: '24/7 Concierge',
        detail: 'Priority support line for active travelers, anywhere in the world.',
    },
    {
        id: 3,
        title: 'Flexible Payments',
        detail: 'Split payments across multiple cards or choose financing options.',
    },
];

export default function Welcome({ auth, packages, destinations, offers }) {
    const categoryOptions = [
        { label: 'Aventura y Naturaleza', value: 'Aventura y Naturaleza' },
        { label: 'Cultural e Historico', value: 'Cultural e Historico' },
        { label: 'Religioso', value: 'Religioso' },
        { label: 'Gastronomia', value: 'Gastronomia' },
    ];

    const ayacuchoDestinations = useMemo(() => {
        if (!destinations) return [];

        const emojiMap = {
            Huamanga: '🏛️',
            Cangallo: '🌊',
            Vilcashuamán: '⛰️',
            Quinua: '🌾',
            Huanta: '🌄',
        };

        return destinations.map((dest) => ({
            slug: dest.slug,
            name: dest.name,
            emoji: emojiMap[dest.name] || '📍',
            desc: dest.description,
        }));
    }, [destinations]);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [appliedCategories, setAppliedCategories] = useState([]);
    const [searchDestination, setSearchDestination] = useState('');
    const [searchDates, setSearchDates] = useState('');
    const [searchGuests, setSearchGuests] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchDestination.trim()) {
            router.get('/packages', { search: searchDestination });
        }
    };

    const filteredPackages = useMemo(() => {
        if (!packages) return [];
        return packages.filter((pkg) => {
            if (appliedCategories.length === 0) {
                return true;
            }
            return appliedCategories.includes(pkg.category?.name);
        });
    }, [packages, appliedCategories]);

    const toggleCategory = (value) => {
        setSelectedCategories((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            <Head title="Inicio - ESKY TRIPS" />

            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,58,138,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(219,39,119,0.20),_transparent_28%)] pointer-events-none"></div>

                <header className="relative z-10 container mx-auto px-6 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold tracking-tight text-white">ESKY TRIPS</div>
                        <button className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 lg:hidden">
                            <span className="mr-2">Menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <nav className="hidden lg:flex items-center gap-4 text-slate-300">
                        <Link href="/packages" className="px-5 py-3 text-base font-semibold rounded-xl bg-transparent text-slate-100 hover:bg-slate-800 transition">Paquetes</Link>
                        <a href="#destinos" className="px-5 py-3 text-base font-semibold rounded-xl bg-transparent text-slate-100 hover:bg-slate-800 transition">Destinos</a>
                        <a href="#ofertas" className="px-5 py-3 text-base font-semibold rounded-xl bg-transparent text-slate-100 hover:bg-slate-800 transition">Ofertas</a>
                        <Link href="/contacto" className="px-5 py-3 text-base font-semibold rounded-xl bg-transparent text-slate-100 hover:bg-slate-800 transition">Contacto</Link>
                        {auth?.user ? (
                            <>
                                <Link href="/bookings" className="px-5 py-3 text-base font-semibold rounded-xl bg-transparent text-slate-100 hover:bg-slate-800 transition">Mis Reservas</Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="px-5 py-3 text-base font-semibold rounded-xl bg-transparent text-slate-100 hover:bg-slate-800 transition">Iniciar sesión</Link>
                                <Link href="/register" className="px-5 py-3 text-base font-semibold rounded-xl bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition">Registrarse</Link>
                            </>
                        )}
                    </nav>


                    <div className="hidden lg:flex items-center gap-4">

                        {auth?.user ? (
                            <Link href="/profile" className="inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 transition hover:border-sky-500 hover:bg-slate-800">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-slate-950">
                                    {auth.user.name?.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-semibold text-white">{auth.user.name || auth.user.email}</p>
                                    <p className="text-xs text-slate-400">Gold Member</p>
                                </div>
                            </Link>
                        ) : (
                            <div className="inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-300">
                                    <span>G</span>
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-semibold text-white">Invitado</p>
                                    <p className="text-xs text-slate-400">Conéctate para más</p>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <section className="relative">
                    <div className="relative mx-auto max-w-screen-2xl overflow-hidden rounded-[2rem] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90')" }}>
                        <div className="absolute inset-0 bg-slate-950/70" />
                        <div className="relative z-10 container mx-auto px-6 py-20 lg:px-12 lg:py-28">
                            <div className="max-w-3xl text-center mx-auto">

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-10">
                                    Descubre la magia de Ayacucho
                                </h1>
                                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                                     Planifica tu aventura perfecta explorando paquetes turísticos y servicios que tenemos para cada destino.
                                </p>

                                <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/30">
                                    <div className="grid gap-4 md:grid-cols-[1.8fr_1fr] lg:grid-cols-[2.4fr_1fr] items-center">
                                        <div className="grid gap-4 sm:grid-cols-3">


                                            <div className="rounded-3xl bg-slate-900/90 px-4 py-4 text-left text-sm text-slate-300">
                                                <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Destino</span>
                                                <input
                                                    type="text"
                                                    value={searchDestination}
                                                    onChange={e => setSearchDestination(e.target.value)}
                                                    placeholder="¿A dónde vas?"
                                                    className="mt-2 block w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
                                                />
                                            </div>
                                            <div className="rounded-3xl bg-slate-900/90 px-4 py-4 text-left text-sm text-slate-300">
                                                <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Fecha de viaje</span>
                                                <input
                                                    type="date"
                                                    value={searchDates}
                                                    onChange={e => setSearchDates(e.target.value)}
                                                    className="mt-2 block w-full bg-transparent text-white focus:outline-none"
                                                />
                                            </div>
                                            <div className="rounded-3xl bg-slate-900/90 px-4 py-4 text-left text-sm text-slate-300">
                                                <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Personas</span>
                                                <input
                                                    type="number"
                                                    value={searchGuests}
                                                    onChange={e => setSearchGuests(e.target.value)}
                                                    placeholder="2 adultos"
                                                    min="1"
                                                    max="20"
                                                    className="mt-2 block w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
                                                />
                                            </div>

                                        </div>



                                        <button
                                            onClick={handleSearch}
                                            className="inline-flex h-full items-center justify-center rounded-3xl bg-sky-500 px-8 py-5 text-white font-semibold shadow-[0_20px_50px_rgba(56,189,248,0.25)] transition hover:bg-sky-400"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="mr-2 h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <main className="relative z-10 container mx-auto px-6 pb-20 lg:px-12">
                <section className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <aside className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 text-slate-300 shadow-xl shadow-slate-950/10">
                        <h2 className="text-sm font-semibold tracking-[0.24em] uppercase text-sky-300 mb-6">Refinar búsqueda</h2>
                        <div className="space-y-4">
                            {categoryOptions.map((item) => (
                                <label key={item.value} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm cursor-pointer hover:border-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(item.value)}
                                        onChange={() => toggleCategory(item.value)}
                                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500"
                                    />
                                    <span className={selectedCategories.includes(item.value) ? 'font-semibold text-white' : 'text-slate-300'}>{item.label}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => setAppliedCategories(selectedCategories)}
                                className="w-full rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-400 transition"
                            >
                                Aplicar filtros
                            </button>
                        </div>
                        <p className="mt-3 text-sm text-slate-400">
                            {appliedCategories.length > 0
                                ? `Filtrando: ${appliedCategories.map((value) => categoryOptions.find((option) => option.value === value)?.label).join(', ')}`
                                : 'Mostrando todos los paquetes'}
                        </p>
                        <div className="mt-8 rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-3">Rango de presupuesto</p>
                            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                                <div className="h-full w-2/5 rounded-full bg-sky-500" />
                            </div>
                            <div className="mt-4 flex justify-between text-sm text-slate-400">
                                <span>S/. 500</span>
                                <span>S/. 10,000+</span>
                            </div>
                        </div>
                        <div className="mt-8 rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-3">Servicios populares</p>
                            {['Cancelación gratis', 'Todo incluido', 'Solo adultos'].map((option) => (
                                <label key={option} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm cursor-pointer hover:border-slate-700 mb-3">
                                    <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500" />
                                    <span className="text-slate-300">{option}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-8 rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5 text-slate-300">
                            <p className="font-semibold text-white mb-2">Conserje experto</p>
                            <p className="text-sm text-slate-400">¿Necesitas ayuda para planificar tu viaje perfecto? Nuestros expertos están en línea.</p>
                            <button className="mt-5 w-full rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-400 transition">Iniciar chat en vivo</button>
                        </div>
                    </aside>

                    <section id="packages" className="space-y-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-5">
                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Colecciones seleccionadas</p>
                                <h2 className="mt-3 text-3xl font-bold text-white">Paquetes exclusivos destacados</h2>
                            </div>
                            <div className="inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-sm text-slate-300">
                                Ordenar por:
                                <span className="rounded-full bg-slate-800 px-3 py-1 text-white">Recomendado</span>
                            </div>
                        </div>

                        <div className="grid gap-6 xl:grid-cols-3">
                            {filteredPackages.map((pkg) => (
                                <div key={pkg.id} className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-600 transition group">
                                    {/* Imagen */}
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={pkg.image_url}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        {pkg.includes_guide && (
                                            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                Guía incluido
                                            </span>
                                        )}
                                    </div>

                                    {/* Contenido */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-1 text-slate-400 text-sm mb-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            {pkg.location?.city}, {pkg.location?.region}
                                        </div>

                                        <h3 className="text-white font-bold text-lg mb-2">{pkg.title}</h3>
                                        <div className="mb-2">
                                            <StarRating 
                                                rating={pkg.reviews_avg_rating}
                                                count={pkg.reviews_count}
                                            />
                                        </div>
                                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs text-slate-500">Desde</span>
                                                <p className="text-cyan-400 font-bold text-xl">
                                                    S/. {Number(pkg.price).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                                <span>📅 {pkg.duration_days} día(s)</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/packages/${pkg.id}`}
                                            className="mt-4 block w-full text-center bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 rounded-xl transition"
                                        >
                                            Ver detalles
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </section>

                <section className="mt-16 grid gap-6 md:grid-cols-3">
                    {highlights.map((item) => (
                        <div key={item.id} className="rounded-[1.75rem] border border-slate-800 bg-slate-900/90 p-6 text-slate-300 shadow-xl shadow-slate-950/20">
                            <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                            <p className="text-sm leading-6 text-slate-400">{item.detail}</p>
                        </div>
                    ))}
                </section>

                {/* Sección Destinos */}
                <section id="destinos" className="mt-20 scroll-mt-20">
                    <div className="mb-10">
                        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Explorar</p>
                        <h2 className="mt-3 text-3xl font-bold text-white">Destinos Principales</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {ayacuchoDestinations.map((dest) => (
                            <div key={dest.slug} className="group relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-sky-500">
                                <div className="absolute top-4 right-4 rounded-full bg-sky-500/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-sky-200">{dest.emoji}</div>
                                <div className="mt-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{dest.name}</h3>
                                    <p className="text-slate-400 text-sm leading-6">{dest.desc}</p>
                                </div>
                                <Link href={`/destinos/${dest.slug}`} className="mt-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-sky-300 hover:bg-slate-900 transition">
                                    Explorar
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sección Ofertas */}
                <section id="ofertas" className="mt-20 scroll-mt-20">
                    <div className="mb-10">
                        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Especial</p>
                        <h2 className="mt-3 text-3xl font-bold text-white">Ofertas Exclusivas</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {offers?.map((offer) => (
                            <div key={offer.slug} className="relative rounded-2xl border border-cyan-600 bg-gradient-to-br from-cyan-950/40 to-slate-900 p-8 overflow-hidden group hover:border-cyan-400 transition">
                                <div className="absolute top-0 right-0 text-6xl font-bold text-cyan-600/20 group-hover:text-cyan-500/30 transition">
                                    {offer.discount_percentage}%
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{offer.title}</h3>
                                <p className="text-slate-300 mb-4 relative z-10">{offer.description}</p>
                                <Link
                                    href={`/ofertas/${offer.slug}`}
                                    className="relative z-10 inline-flex rounded-full bg-cyan-500 px-6 py-2 text-sm font-bold text-slate-900 hover:bg-cyan-400 transition"
                                >
                                    Ver oferta -{offer.discount_percentage}% OFF
                                </Link>
                            </div>
                        ))}

                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-800 bg-slate-950/95 py-12 text-slate-400">
                <div className="container mx-auto px-6 grid gap-8 md:grid-cols-3">
                    <div>
                        <p className="font-semibold text-white text-lg">ESKY TRIPS</p>
                        <p className="mt-2 text-sm text-slate-400">Setting the standard for premium travel logistics since 2012.</p>

                        <div className="mt-4 flex items-center gap-3 text-slate-300">
                            <a href="#" className="p-2 rounded-full bg-slate-900/60 hover:bg-slate-800 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h4v4" />
                                </svg>
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-900/60 hover:bg-slate-800 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3" />
                                </svg>
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-900/60 hover:bg-slate-800 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 12v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h6" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-between md:col-span-1">
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-3">Explorar</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Destinos</a></li>
                                <li><a href="#packages" className="hover:text-white">Paquetes</a></li>
                                <li><a href="#" className="hover:text-white">Ofertas</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-3">Soporte</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Preguntas frecuentes</a></li>
                                <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
                                <li><Link href="/privacidad" className="hover:text-white">Política de privacidad</Link></li>
                                <li><Link href="/terminos" className="hover:text-white">Términos y condiciones</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Suscríbete</h4>
                        <p className="text-sm text-slate-400 mb-4">Recibe nuestras mejores ofertas y guías de viaje en tu correo.</p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input aria-label="Correo" type="email" placeholder="Tu email" className="flex-1 rounded-full bg-slate-900/80 border border-slate-800 px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none" />
                            <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400 transition">Suscribir</button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 border-t border-slate-800 pt-6 text-sm text-slate-500 text-center">© 2026 ESKYTRIPS. Todos los derechos reservados.</div>
            </footer>
        </div>
    );
}
