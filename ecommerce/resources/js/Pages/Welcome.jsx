import { Link, Head } from '@inertiajs/react';

const packages = [
    {
        id: 1,
        title: 'Bali Spiritual Retreat',
        location: 'Ubud, Indonesia',
        price: '$1,299',
        label: 'Editor’s Pick',
        rating: '4.9',
        description: 'Immerse yourself in the heart of Bali with private yoga, rice-terrace views and wellness rituals.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 2,
        title: 'Santorini Romance',
        location: 'Oia, Greece',
        price: '$2,450',
        rating: '4.8',
        description: '5 nights in a luxury cliffside villa with private infinity pool and sunset sailing.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 3,
        title: 'Aguas  turquesas, Cangallo',
        location: ' Cangallo-Ayacucho, Peru',
        price: 'S/. 250.00',
        label: 'Limited Availability',
        rating: '4.7',
        description: 'Premium 1-day guided tour through Lins and Banff with luxury lodge stays.',
        image: 'https://wsrv.nl/?url=https://denomades.s3.us-west-2.amazonaws.com/blog/wp-content/uploads/2019/07/18142626/aguasturquesasOK.jpg&w=1200&fit=cover&q=75&output=webp&h=675'
    }
];

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

export default function Welcome({ auth }) {
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
                        <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-900/60 px-3 py-2 shadow-lg shadow-black/40">
                            <a href="#" className="px-5 py-3 text-base font-semibold rounded-xl bg-transparent text-slate-100 hover:bg-slate-800 transition">Destinations</a>
                            <a href="#packages" className="px-5 py-3 text-base font-semibold rounded-xl bg-transparent text-slate-100 hover:bg-slate-800 transition">Paquetes</a>
                            <a href="#" className="px-5 py-3 text-base font-semibold rounded-xl bg-transparent text-slate-100 hover:bg-slate-800 transition">Ofertas</a>
                            <a href="#" className="px-5 py-3 text-base font-semibold rounded-xl bg-transparent text-slate-100 hover:bg-slate-800 transition">Business Travel</a>
                        </div>
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M4 7h16M4 11h10m1 8h5" />
                            </svg>
                        </button>
                        <div className="inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
                            <img src="https://scontent.flim14-1.fna.fbcdn.net/v/t39.30808-6/491260195_1161932805943417_6436027430883532513_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=hkvoTmlp-2kQ7kNvwE0kRcz&_nc_oc=AdoCRM2O5kdUKYhKjnBbeJtXIXaNlElbVH0sDBonGwMWlNVCKYX88i_p10CRgCkfaDE&_nc_zt=23&_nc_ht=scontent.flim14-1.fna&_nc_gid=yL2FXDqW25_3uuj-UHXtAQ&_nc_ss=7b289&oh=00_Af5iuiaKg5Be6OZ9zF7xb9U1jEiGV2JI53XuO1F-4iUTRA&oe=6A10F011" alt="Usuario" className="h-8 w-8 rounded-full object-cover" />
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-semibold text-white">Osito</p>
                                <p className="text-xs text-slate-400">Gold Member FUSCH</p>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="relative">
                    <div className="relative mx-auto max-w-screen-2xl overflow-hidden rounded-[2rem] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90')" }}>
                        <div className="absolute inset-0 bg-slate-950/70" />
                        <div className="relative z-10 container mx-auto px-6 py-20 lg:px-12 lg:py-28">
                            <div className="max-w-3xl text-center mx-auto">
                                <p className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-sky-300 mb-6">
                                    <span className="mr-2">Nuevo</span>
                                    <span className="rounded-full bg-sky-500 px-2 py-0.5 text-xs font-semibold text-white">Viajes de lujo</span>
                                </p>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                                    Elevate Your Journey
                                </h1>
                                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                                    Luxury travel experiences curated by experts for the discerning global explorer.
                                </p>

                                <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/30">
                                    <div className="grid gap-4 md:grid-cols-[1.8fr_1fr] lg:grid-cols-[2.4fr_1fr] items-center">
                                        <div className="grid gap-4 sm:grid-cols-3">
                                            <label className="rounded-3xl bg-slate-900/90 px-4 py-4 text-left text-sm text-slate-300">
                                                <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Destination</span>
                                                <span className="mt-2 block text-white">Where are you going?</span>
                                            </label>
                                            <label className="rounded-3xl bg-slate-900/90 px-4 py-4 text-left text-sm text-slate-300">
                                                <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Check-in / Check-out</span>
                                                <span className="mt-2 block text-white">Add dates</span>
                                            </label>
                                            <label className="rounded-3xl bg-slate-900/90 px-4 py-4 text-left text-sm text-slate-300">
                                                <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Guests</span>
                                                <span className="mt-2 block text-white">2 adults, 1 room</span>
                                            </label>
                                        </div>

                                        <button className="inline-flex h-full items-center justify-center rounded-3xl bg-sky-500 px-8 py-5 text-white font-semibold shadow-[0_20px_50px_rgba(56,189,248,0.25)] transition hover:bg-sky-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="mr-2 h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Search
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
                        <h2 className="text-sm font-semibold tracking-[0.24em] uppercase text-sky-300 mb-6">Refine Exploration</h2>
                        <div className="space-y-4">
                            {['Beach & Tropical', 'Mountain & Adventure', 'Urban & Culture', 'Wildlife & Safari', 'Wellness & Spa'].map((item, index) => (
                                <label key={item} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm cursor-pointer hover:border-slate-700">
                                    <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500" />
                                    <span className={index === 0 ? 'font-semibold text-white' : 'text-slate-300'}>{item}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-8 rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-3">Budget Range</p>
                            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                                <div className="h-full w-2/5 rounded-full bg-sky-500" />
                            </div>
                            <div className="mt-4 flex justify-between text-sm text-slate-400">
                                <span>$500</span>
                                <span>$10,000+</span>
                            </div>
                        </div>
                        <div className="mt-8 rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-3">Popular Amenities</p>
                            {['Free Cancellation', 'All Inclusive', 'Adults Only'].map((option) => (
                                <label key={option} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm cursor-pointer hover:border-slate-700 mb-3">
                                    <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500" />
                                    <span className="text-slate-300">{option}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-8 rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5 text-slate-300">
                            <p className="font-semibold text-white mb-2">Expert Concierge</p>
                            <p className="text-sm text-slate-400">Need help planning your perfect trip? Our experts are online.</p>
                            <button className="mt-5 w-full rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-400 transition">Start Live Chat</button>
                        </div>
                    </aside>

                    <section id="packages" className="space-y-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-5">
                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Curated Collections</p>
                                <h2 className="mt-3 text-3xl font-bold text-white">Featured Exclusive Packages</h2>
                            </div>
                            <div className="inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-sm text-slate-300">
                                Sort by:
                                <span className="rounded-full bg-slate-800 px-3 py-1 text-white">Recommended</span>
                            </div>
                        </div>

                        <div className="grid gap-6 xl:grid-cols-3">
                            {packages.map((pack) => (
                                <article key={pack.id} className="group overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/95 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
                                    <div className="relative h-72 overflow-hidden">
                                        <img src={pack.image} alt={pack.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                                        {pack.label && (
                                            <span className="absolute left-4 top-4 rounded-full bg-sky-500/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-slate-950/20">{pack.label}</span>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between gap-3 mb-4 text-sm text-slate-400">
                                            <span>{pack.rating} ★</span>
                                            <span className="font-semibold text-white">{pack.location}</span>
                                        </div>
                                        <h3 className="text-2xl font-semibold text-white mb-3">{pack.title}</h3>
                                        <p className="text-sm leading-6 text-slate-400 mb-6">{pack.description}</p>
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Total price</p>
                                                <p className="mt-1 text-xl font-semibold text-white">{pack.price}</p>
                                            </div>
                                            <button className="rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </article>
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
                                <li><a href="#" className="hover:text-white">Contacto</a></li>
                                <li><a href="#" className="hover:text-white">Política de privacidad</a></li>
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

                <div className="mt-8 border-t border-slate-800 pt-6 text-sm text-slate-500 text-center">© 2026 VoyageEase. Todos los derechos reservados.</div>
            </footer>
        </div>
    );
}
