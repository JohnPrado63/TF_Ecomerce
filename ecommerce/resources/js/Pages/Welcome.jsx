import StarRating from '@/Components/StarRating';
import Icon from '@/Components/Icon';
import Navbar from '@/Components/Navbar';
import { Link, Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const highlights = [
    {
        id: 1,
        title: 'Seguridad Encriptada',
        detail: 'Cumplimiento PCI DSS de grado empresarial para todas las transacciones globales.',
        icon: 'shield',
    },
    {
        id: 2,
        title: 'Concierge 24/7',
        detail: 'Línea de soporte prioritario para viajeros activos, en cualquier parte del mundo.',
        icon: 'phone',
    },
    {
        id: 3,
        title: 'Pagos Flexibles',
        detail: 'Divide pagos entre múltiples tarjetas o elige opciones de financiamiento.',
        icon: 'wallet',
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

        const iconMap = {
            Huamanga: 'landmark',
            Cangallo: 'waves',
            Vilcashuamán: 'mountain',
            Quinua: 'wheat',
            Huanta: 'sunrise',
        };

        return destinations.map((dest) => ({
            slug: dest.slug,
            name: dest.name,
            icon: iconMap[dest.name] || 'map-pin',
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

            <Navbar />

            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.12),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(219,39,119,0.08),_transparent_40%)] pointer-events-none"></div>

                <section className="relative">
                    <div className="relative mx-auto max-w-screen-2xl overflow-hidden rounded-[2rem] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90')" }}>
                        <div className="absolute inset-0 bg-slate-950/70" />
                        <div className="relative z-10 container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-28">
                            <div className="max-w-3xl text-center mx-auto">

                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-6 sm:mb-10">
                                    Descubre la magia de Ayacucho
                                </h1>
                                <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-6 sm:mb-10">
                                     Planifica tu aventura perfecta explorando paquetes turísticos y servicios que tenemos para cada destino.
                                </p>

                                <div className="rounded-2xl sm:rounded-[2rem] border border-slate-800/80 bg-slate-900/90 p-4 sm:p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
                                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-[2fr_1fr] items-end">
                                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">

                                            <div className="rounded-3xl bg-slate-800/50 border border-slate-700/50 px-4 py-4 text-left text-sm text-slate-400">
                                                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">
                                                    <Icon name="map-pin" size={12} />
                                                    Destino
                                                </span>
                                                <input
                                                    type="text"
                                                    value={searchDestination}
                                                    onChange={e => setSearchDestination(e.target.value)}
                                                    placeholder="¿A dónde vas?"
                                                    className="block w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
                                                />
                                            </div>

                                            <div className="rounded-3xl bg-slate-800/50 border border-slate-700/50 px-4 py-4 text-left text-sm text-slate-400">
                                                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">
                                                    <Icon name="calendar" size={12} />
                                                    Fecha de viaje
                                                </span>
                                                <input
                                                    type="date"
                                                    value={searchDates}
                                                    onChange={e => setSearchDates(e.target.value)}
                                                    className="block w-full bg-transparent text-white focus:outline-none"
                                                />
                                            </div>

                                            <div className="rounded-3xl bg-slate-800/50 border border-slate-700/50 px-4 py-4 text-left text-sm text-slate-400">
                                                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">
                                                    <Icon name="users" size={12} />
                                                    Personas
                                                </span>
                                                <input
                                                    type="number"
                                                    value={searchGuests}
                                                    onChange={e => setSearchGuests(e.target.value)}
                                                    placeholder="2 adultos"
                                                    min="1"
                                                    max="20"
                                                    className="block w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
                                                />
                                            </div>

                                        </div>

                                        <button
                                            onClick={handleSearch}
                                            className="inline-flex h-full items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-6 sm:px-8 py-4 sm:py-5 text-white font-bold shadow-lg shadow-cyan-500/25 transition hover:from-cyan-400 hover:to-cyan-300 hover:shadow-cyan-500/40 w-full sm:w-auto"
                                        >
                                            <Icon name="search" size={18} className="mr-2" />
                                            <span className="sm:hidden">Buscar</span>
                                            <span className="hidden sm:inline">Buscar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <main className="relative z-10 container mx-auto px-4 sm:px-6 pb-16 sm:pb-20 lg:px-12">
                <section className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <aside className="hidden lg:block rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-6 text-slate-400 shadow-xl shadow-slate-950/20 self-start mt-8 backdrop-blur-xl">
                        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.24em] uppercase text-cyan-400 mb-6">
                            <Icon name="sliders-horizontal" size={16} />
                            Refinar búsqueda
                        </h2>
                        <div className="space-y-3">
                            {categoryOptions.map((item) => (
                                <label key={item.value} className="flex items-center gap-3 rounded-2xl border border-slate-800/50 bg-slate-950/50 px-4 py-3 text-sm cursor-pointer hover:border-cyan-500/30 hover:bg-slate-800/30 transition">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(item.value)}
                                        onChange={() => toggleCategory(item.value)}
                                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500 accent-cyan-500"
                                    />
                                    <span className={selectedCategories.includes(item.value) ? 'font-semibold text-white' : 'text-slate-400'}>{item.label}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    if (selectedCategories.length > 0) {
                                        router.get('/packages', { categoria: selectedCategories[0] });
                                    } else {
                                        router.get('/packages');
                                    }
                                }}
                                className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 hover:from-cyan-400 hover:to-cyan-300 transition shadow-lg shadow-cyan-500/20"
                            >
                                Aplicar filtros
                            </button>
                        </div>
                        <p className="mt-4 text-sm text-slate-500">
                            {appliedCategories.length > 0
                                ? `Filtrando: ${appliedCategories.map((value) => categoryOptions.find((option) => option.value === value)?.label).join(', ')}`
                                : 'Mostrando todos los paquetes'}
                        </p>
                        <div className="mt-8 rounded-[1.5rem] border border-slate-800/80 bg-slate-950/50 p-5">
                            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-500 mb-4">
                                <Icon name="wallet" size={14} />
                                Rango de presupuesto
                            </p>
                            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                                <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400" />
                            </div>
                            <div className="mt-4 flex justify-between text-sm text-slate-500">
                                <span>S/. 500</span>
                                <span>S/. 10,000+</span>
                            </div>
                        </div>
                    </aside>

                    <section id="packages" className="space-y-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-5">
                            <div>
                                <p className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-cyan-400">
                                    <Icon name="compass" size={14} />
                                    Colecciones seleccionadas
                                </p>
                                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">Paquetes exclusivos destacados</h2>
                            </div>
                            <div className="flex items-center gap-3 rounded-full border border-slate-800/80 bg-slate-900/80 px-5 py-3 text-sm text-slate-400 backdrop-blur-xl">
                                <Icon name="arrow-up-down" size={15} />
                                Ordenar por:
                                <span className="rounded-full bg-cyan-500/20 border border-cyan-500/30 px-3 py-1 text-cyan-400 font-medium">Recomendado</span>
                            </div>
                        </div>

                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredPackages.map((pkg) => (
                                <div key={pkg.id} className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-900 border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={pkg.image_url}
                                            alt={pkg.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                        {pkg.includes_guide && (
                                            <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                                <Icon name="users" size={12} />
                                                Guía incluido
                                            </span>
                                        )}
                                        <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-sm text-cyan-400 font-bold text-lg px-3 py-1 rounded-xl">
                                            S/. {Number(pkg.price).toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                                            <Icon name="map-pin" size={14} className="text-cyan-500" />
                                            {pkg.location?.city}, {pkg.location?.region}
                                        </div>

                                        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-300 transition">{pkg.title}</h3>
                                        <div className="mb-3">
                                            <StarRating
                                                rating={pkg.reviews_avg_rating}
                                                count={pkg.reviews_count}
                                            />
                                        </div>
                                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                                        <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
                                            <div className="flex items-center gap-3 text-slate-500 text-sm">
                                                <span className="flex items-center gap-1.5">
                                                    <Icon name="calendar" size={14} />
                                                    {pkg.duration_days} día(s)
                                                </span>
                                            </div>
                                            <Link
                                                href={`/packages/${pkg.id}`}
                                                className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-cyan-500/20 text-sm"
                                            >
                                                Ver detalles
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </section>

                <section className="mt-12 sm:mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {highlights.map((item) => (
                        <div key={item.id} className="rounded-[1.5rem] border border-slate-800/80 bg-slate-900/80 p-6 text-slate-400 shadow-xl shadow-slate-950/20 hover:border-cyan-500/30 transition group">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition">
                                <Icon name={item.icon} size={22} className="text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                            <p className="text-sm leading-6 text-slate-400">{item.detail}</p>
                        </div>
                    ))}
                </section>

                <section id="destinos" className="mt-16 sm:mt-20 scroll-mt-20">
                    <div className="mb-6 sm:mb-10">
                        <p className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-cyan-400">
                            <Icon name="map" size={14} />
                            Explorar
                        </p>
                        <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">Destinos Principales</h2>
                    </div>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {ayacuchoDestinations.map((dest, index) => {
                            const bgImages = [
                                "url('https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80')",
                                "url('https://images.unsplash.com/photo-1516398247765-8e3d3d5a3c52?auto=format&fit=crop&w=800&q=80')",
                                "url('https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80')",
                                "url('https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=800&q=80')",
                            ];
                            return (
                                <div key={dest.slug} className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900 p-6 shadow-xl shadow-slate-950/40 transition-all duration-500 hover:scale-[1.02] hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: bgImages[index % bgImages.length] }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
                                    <div className="absolute top-4 right-4 rounded-2xl bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 p-3 text-cyan-400 group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                                        <Icon name={dest.icon} size={22} />
                                    </div>
                                    <div className="relative z-10 mt-20">
                                        <div className="mb-1">
                                            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Destino</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{dest.name}</h3>
                                        <p className="text-slate-300 text-base leading-relaxed mb-5 line-clamp-2 font-medium">{dest.desc}</p>
                                        <Link href={`/destinos/${dest.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:gap-3">
                                            Explorar
                                            <Icon name="arrow-right" size={16} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section id="ofertas" className="mt-16 sm:mt-20 scroll-mt-20">
                    <div className="mb-6 sm:mb-10">
                        <p className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-cyan-400">
                            <Icon name="tag" size={14} />
                            Especial
                        </p>
                        <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">Ofertas Exclusivas</h2>
                    </div>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {offers?.map((offer) => (
                            <div key={offer.slug} className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900 transition-all duration-500 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/15">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-slate-900/80 to-slate-900" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/30 to-transparent rounded-bl-full" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-tr-full" />
                                <div className="relative z-10 p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/30 transition-all duration-300">
                                            <Icon name="sparkles" size={26} className="text-cyan-400" />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-7xl font-black text-cyan-500/30 group-hover:text-cyan-500/40 transition-colors duration-500">{offer.discount_percentage}%</span>
                                            <p className="text-xs uppercase tracking-widest text-slate-500">descuento</p>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{offer.title}</h3>
                                    <p className="text-slate-400 mb-6 leading-relaxed">{offer.description}</p>
                                    <div className="flex items-center gap-3">
                                        <Link href={`/ofertas/${offer.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:gap-4">
                                            <Icon name="tag" size={16} />
                                            Ver oferta
                                        </Link>
                                        <span className="text-sm text-cyan-400 font-medium">-{offer.discount_percentage}% OFF</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-800/80 bg-slate-950/95 py-8 sm:py-10 text-slate-400">
                <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                    <Link href="/" className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/30 flex items-center justify-center">
                            <Icon name="compass" size={16} className="text-cyan-400 sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <span className="text-base sm:text-lg font-bold text-white">ESKY TRIPS</span>
                    </Link>
                    <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                        <Link href="/contacto" className="hover:text-cyan-400 transition">Contacto</Link>
                        <Link href="/privacidad" className="hover:text-cyan-400 transition">Privacidad</Link>
                        <Link href="/terminos" className="hover:text-cyan-400 transition">Términos</Link>
                    </nav>
                    <p className="text-xs sm:text-sm text-slate-500">© {new Date().getFullYear()} ESKY TRIPS</p>
                </div>
            </footer>
        </div>
    );
}
