import { Head, Link } from '@inertiajs/react';

export default function Show({ destination }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title={`${destination.name} - Destinos Ayacucho`} />

            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Destino Ayacucho</p>
                        <h1 className="mt-3 text-4xl font-bold">{destination.name}</h1>
                        <p className="mt-3 max-w-2xl text-slate-400">{destination.description}</p>
                    </div>
                    <Link href="/" className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800 transition">
                        ← Volver al inicio
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/10">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 mb-3">Provincia</p>
                        <h2 className="text-3xl font-bold text-white mb-4">{destination.name}</h2>
                        <p className="text-slate-400 mb-6">{destination.summary}</p>
                        <div className="space-y-3">
                            <p className="text-sm text-slate-400">Región: Ayacucho</p>
                            <p className="text-sm text-slate-400">Sitios turísticos: {destination.sites.length}</p>
                            <p className="text-sm text-slate-400">Estilo: {destination.style}</p>
                        </div>
                    </div>

                    <div className="lg:col-span-2 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/10">
                        <h2 className="text-xl font-semibold text-white mb-6">Lugares turísticos</h2>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {destination.sites.map((site) => (
                                <div key={site.title} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 transition hover:border-sky-500">
                                    <h3 className="text-lg font-semibold text-white mb-2">{site.title}</h3>
                                    <p className="text-slate-400 text-sm leading-6">{site.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/10">
                    <h2 className="text-xl font-semibold text-white mb-4">Plan recomendado</h2>
                    <p className="text-slate-400 leading-7">{destination.recommendation}</p>
                </div>
            </div>
        </div>
    );
}
