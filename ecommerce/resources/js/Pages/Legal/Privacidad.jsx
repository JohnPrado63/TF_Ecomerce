import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

const sections = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        title: '1. Responsable del tratamiento',
        content: 'ESKY TRIPS, con domicilio en Jr. Lima 123, Huamanga, Ayacucho, Perú, es responsable del tratamiento de sus datos personales conforme a la Ley N° 29733 - Ley de Protección de Datos Personales del Perú y el Reglamento General de Protección de Datos (GDPR).',
        color: 'cyan',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        title: '2. Datos que recopilamos',
        list: [
            'Nombre completo y correo electrónico',
            'Número de documento de identidad',
            'Historial de reservas y preferencias de viaje',
            'Información de pago (procesada por terceros certificados)',
            'Datos de navegación mediante cookies',
        ],
        color: 'emerald',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        title: '3. Finalidad del tratamiento',
        list: [
            'Gestión y confirmación de reservas turísticas',
            'Comunicación sobre el estado de sus reservas',
            'Mejora de nuestros servicios mediante análisis de preferencias',
            'Cumplimiento de obligaciones legales',
        ],
        color: 'violet',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        title: '4. Derechos ARCO',
        subtitle: 'Conforme a la Ley N° 29733, usted tiene derecho a:',
        arco: true,
        color: 'amber',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: '5. Cookies',
        content: 'Utilizamos cookies técnicas y analíticas. Puede gestionar su consentimiento mediante el banner de cookies al ingresar a nuestra plataforma. El rechazo de cookies no esenciales no afectará el funcionamiento principal del servicio.',
        color: 'rose',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: '6. Seguridad de datos',
        content: 'Implementamos medidas técnicas y organizativas para proteger sus datos: cifrado SSL/TLS, variables de entorno para credenciales, acceso restringido por roles y copias de seguridad periódicas de la base de datos.',
        color: 'sky',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: '7. Transferencia internacional',
        content: 'Sus datos podrán ser procesados por servicios de terceros (MercadoPago, Gmail SMTP) que cuentan con certificaciones de seguridad internacionales y garantías adecuadas de protección.',
        color: 'indigo',
    },
];

const colorClasses = {
    cyan: {
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        icon: 'text-cyan-400',
        title: 'text-cyan-400',
    },
    emerald: {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        icon: 'text-emerald-400',
        title: 'text-emerald-400',
    },
    violet: {
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/30',
        icon: 'text-violet-400',
        title: 'text-violet-400',
    },
    amber: {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        icon: 'text-amber-400',
        title: 'text-amber-400',
    },
    rose: {
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        icon: 'text-rose-400',
        title: 'text-rose-400',
    },
    sky: {
        bg: 'bg-sky-500/10',
        border: 'border-sky-500/30',
        icon: 'text-sky-400',
        title: 'text-sky-400',
    },
    indigo: {
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/30',
        icon: 'text-indigo-400',
        title: 'text-indigo-400',
    },
};

const arcoItems = [
    { letter: 'A', title: 'Acceso', desc: 'Solicitar información sobre sus datos personales almacenados' },
    { letter: 'R', title: 'Rectificación', desc: 'Corregir datos inexactos o incompletos desde su perfil' },
    { letter: 'C', title: 'Cancelación', desc: 'Solicitar la eliminación de su cuenta y datos personales' },
    { letter: 'O', title: 'Oposición', desc: 'Oponerse al tratamiento de sus datos para fines específicos' },
];

export default function Privacidad() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
            <Navbar />
            <Head title="Política de Privacidad - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-16 max-w-5xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-4">
                        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                        Política de Privacidad
                    </h1>
                    <p className="text-slate-400">Última actualización: Junio 2026</p>
                </div>

                <div className="grid gap-6">
                    {sections.map((section, index) => {
                        const colors = colorClasses[section.color];
                        return (
                            <div
                                key={index}
                                className={`${colors.bg} ${colors.border} border rounded-2xl p-6 backdrop-blur-sm`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 p-2 rounded-xl bg-slate-900/50 ${colors.icon}`}>
                                        {section.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className={`text-xl font-bold mb-3 ${colors.title}`}>
                                            {section.title}
                                        </h2>

                                        {section.subtitle && (
                                            <p className="text-slate-300 mb-4">{section.subtitle}</p>
                                        )}

                                        {section.content && (
                                            <p className="text-slate-300 leading-relaxed">{section.content}</p>
                                        )}

                                        {section.list && (
                                            <ul className="space-y-2 mt-1">
                                                {section.list.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                                        <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {section.arco && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                                {arcoItems.map((item, i) => (
                                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
                                                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center font-bold text-lg ${colors.title}`}>
                                                            {item.letter}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-white">{item.title}</h3>
                                                            <p className="text-sm text-slate-400">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {section.title.includes('Derechos ARCO') && (
                                            <p className="mt-4 text-slate-400 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Para ejercer estos derechos, contáctenos en: <span className="text-cyan-400 font-medium">privacidad@eskytrips.com</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm">
                        ESKY TRIPS © 2026 - Proteger su privacidad es nuestro compromiso
                    </p>
                </div>
            </div>
        </div>
    );
}
