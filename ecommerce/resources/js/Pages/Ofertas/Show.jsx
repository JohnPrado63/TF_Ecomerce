import { Head, Link } from '@inertiajs/react';

export default function Show({ offer }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title={`${offer.title} - Ofertas Ayacucho`} />

            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Oferta exclusiva</p>
                        <h1 className="mt-3 text-4xl font-bold">{offer.title}</h1>
                        <p className="mt-3 max-w-2xl text-slate-400">{offer.desc}</p>
                    </div>
                    <Link href="/" className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800 transition">
                        ← Volver al inicio
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/10">
                        <p className="text-sm uppercase tracking-[0.24em] text-cyan-400 mb-4">Ahorra hasta {offer.discount}</p>
                        <p className="text-slate-300 leading-7 mb-6">{offer.details}</p>

                        <div className="grid gap-4">
                            {offer.benefits.map((benefit) => (
                                <div key={benefit} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                                    <p className="text-slate-200">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/10">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-4">Detalles de la oferta</p>
                        <ul className="space-y-4 text-slate-300">
                            <li><span className="font-semibold text-white">Región:</span> Ayacucho</li>
                            <li><span className="font-semibold text-white">Válida para:</span> Paquetes turísticos seleccionados</li>
                            <li><span className="font-semibold text-white">Reserva con:</span> 48 horas de anticipación</li>
                            <li><span className="font-semibold text-white">Condición:</span> Sujeto a disponibilidad</li>
                        </ul>

                        <Link href="/packages" className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition">
                            Ver paquetes disponibles
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
