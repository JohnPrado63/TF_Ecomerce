import { Head, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Icon from '@/Components/Icon';
import { useState } from 'react';

const contactInfo = [
    {
        icon: 'map-pin',
        title: 'Dirección',
        detail: 'Calle Perdida #69, Huamanga',
        sub: 'Ayacucho, Perú',
        href: 'https://www.google.com/maps/search/?api=1&query=Calle%20Perdida%2069%20Huamanga%20Ayacucho%20Peru',
    },
    {
        icon: 'phone',
        title: 'Teléfono',
        detail: '+51 927 496 713',
        sub: 'Lunes a sábado, 9am - 6pm',
        href: 'tel:+51927496713',
    },
    {
        icon: 'mail',
        title: 'Correo',
        detail: 'contacto@eskytrips.com',
        sub: 'Respondemos en menos de 24h',
        href: 'mailto:contacto@eskytrips.com',
    },
    {
        icon: 'message-circle',
        title: 'WhatsApp',
        detail: '+51 927 496 713',
        sub: 'Atención inmediata',
        href: 'https://wa.me/51927496713',
    },
];

export default function Contacto() {
    const [sent, setSent] = useState(false);

    const { data, setData, processing, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        setSent(true);
        reset();
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Contacto - ESKY TRIPS" />

            <main className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
                <section className="mb-12 text-center">
                    <p className="flex items-center justify-center gap-2 mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                        <Icon name="headphones" size={16} />
                        Estamos aquí para ayudarte
                    </p>
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
                        Contáctanos
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                        ¿Tienes alguna pregunta sobre nuestros paquetes turísticos? Escríbenos y te respondemos a la brevedad.
                    </p>
                </section>

                <section className="mx-auto grid max-w-5xl grid-cols-1 gap-7 lg:max-w-6xl lg:grid-cols-[0.92fr_1.8fr]">
                    <aside className="space-y-4">
                        {contactInfo.map((item) => (
                            <a
                                key={item.title}
                                href={item.href}
                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                                className="group block rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-900"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition">
                                        <Icon name={item.icon} size={22} />
                                    </span>
                                    <div>
                                        <p className="font-semibold text-white">{item.title}</p>
                                        <p className="mt-1 text-sm font-medium text-cyan-400">{item.detail}</p>
                                        <p className="mt-0.5 text-xs text-slate-500">{item.sub}</p>
                                    </div>
                                </div>
                            </a>
                        ))}

                        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
                            <p className="mb-4 font-semibold text-white flex items-center gap-2">
                                <Icon name="globe" size={16} className="text-cyan-400" />
                                Síguenos
                            </p>
                            <div className="flex gap-3">
                                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 shadow-sm shadow-slate-950/30 transition hover:-translate-y-0.5 hover:bg-blue-600">
                                    <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                </a>
                                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 shadow-sm shadow-slate-950/30 transition hover:-translate-y-0.5 hover:bg-pink-600">
                                    <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </a>
                                <a href="https://wa.me/51927496713" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 shadow-sm shadow-slate-950/30 transition hover:-translate-y-0.5 hover:bg-green-600">
                                    <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                </a>
                            </div>
                        </div>
                    </aside>

                    <section className="rounded-2xl border border-slate-800/80 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/30 transition hover:border-cyan-500/30 sm:p-8">
                        {sent ? (
                            <div className="flex h-full min-h-[420px] flex-col items-center justify-center py-16 text-center">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
                                    <Icon name="check-circle" size={40} className="text-emerald-400" />
                                </div>
                                <h2 className="mb-2 text-2xl font-bold text-white">¡Mensaje enviado!</h2>
                                <p className="mb-6 max-w-md text-slate-400">
                                    Gracias por contactarnos. Te responderemos en menos de 24 horas.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setSent(false)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-cyan-300"
                                >
                                    <Icon name="send" size={16} />
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-7">
                                    <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                                        <Icon name="send" size={20} className="text-cyan-400" />
                                        Envíanos un mensaje
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Cuéntanos qué viaje tienes en mente y te orientamos.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                                                <Icon name="user" size={14} />
                                                Nombre completo
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Tu nombre"
                                                required
                                                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                                                <Icon name="mail" size={14} />
                                                Correo electrónico
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="tucorreo@ejemplo.com"
                                                required
                                                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                                                <Icon name="phone" size={14} />
                                                Teléfono (opcional)
                                            </label>
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="+51 999 999 999"
                                                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                                                <Icon name="tag" size={14} />
                                                Asunto
                                            </label>
                                            <select
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                required
                                                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                                            >
                                                <option value="">Selecciona un asunto</option>
                                                <option value="reserva">Consulta sobre reserva</option>
                                                <option value="paquete">Información de paquete</option>
                                                <option value="pago">Problema con pago</option>
                                                <option value="cancelacion">Cancelación</option>
                                                <option value="otro">Otro</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                                            <Icon name="message-circle" size={14} />
                                            Mensaje
                                        </label>
                                        <textarea
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            rows={5}
                                            placeholder="Escribe tu mensaje aquí..."
                                            required
                                            className="w-full resize-none rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 py-3 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-600 disabled:text-slate-400 disabled:shadow-none flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            <><Icon name="loader" size={18} className="animate-spin" /> Enviando...</>
                                        ) : (
                                            <><Icon name="send" size={18} /> Enviar mensaje</>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </section>
                </section>
            </main>
        </div>
    );
}
