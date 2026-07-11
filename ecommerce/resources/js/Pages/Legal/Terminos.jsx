import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Icon from '@/Components/Icon';

export default function Terminos() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Términos y Condiciones - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-16 max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-4">
                        <Icon name="file-text" size={32} className="text-cyan-400" />
                    </div>
                    <h1 className="text-4xl font-bold mb-2 text-white">Términos y Condiciones</h1>
                    <p className="text-slate-500">Última actualización: Junio 2026</p>
                </div>

                <div className="space-y-6">

                    <section className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-3">
                            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">1</span>
                            Aceptación de términos
                        </h2>
                        <p className="text-slate-400 leading-relaxed">Al utilizar ESKY TRIPS, usted acepta estos Términos y Condiciones en su totalidad. Si no está de acuerdo, debe abstenerse de usar la plataforma.</p>
                    </section>

                    <section className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-3">
                            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">2</span>
                            Uso del servicio
                        </h2>
                        <p className="text-slate-400 leading-relaxed">ESKY TRIPS es una plataforma de reservas de paquetes turísticos en Ayacucho, Perú. El usuario se compromete a proporcionar información veraz y actualizada al realizar reservas.</p>
                    </section>

                    <section className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-3">
                            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">3</span>
                            Reservas y pagos
                        </h2>
                        <ul className="space-y-2 text-slate-400">
                            <li className="flex items-start gap-2">
                                <Icon name="check-circle" size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                Las reservas quedan confirmadas únicamente tras la verificación del pago
                            </li>
                            <li className="flex items-start gap-2">
                                <Icon name="check-circle" size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                Los precios incluyen los servicios detallados en cada paquete
                            </li>
                            <li className="flex items-start gap-2">
                                <Icon name="check-circle" size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                Las cancelaciones deben realizarse con al menos 48 horas de anticipación
                            </li>
                        </ul>
                    </section>

                    <section className="bg-gradient-to-br from-rose-950/30 to-slate-900/80 border border-rose-500/30 rounded-2xl p-6">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-3">
                            <span className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-sm">4</span>
                            Política contra Deepfakes y contenido generado por IA
                        </h2>
                        <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                            <p className="flex items-center gap-2 text-rose-300 font-semibold mb-2">
                                <Icon name="alert-triangle" size={18} />
                                Prohibición expresa
                            </p>
                            <p className="text-slate-400 mb-3">
                                Queda estrictamente prohibido a los usuarios subir, publicar o compartir en nuestra plataforma cualquier contenido generado o manipulado mediante Inteligencia Artificial (deepfakes, imágenes sintéticas, reseñas falsas generadas por IA) que:
                            </p>
                            <ul className="space-y-2 text-slate-400 mb-3">
                                <li className="flex items-start gap-2">
                                    <Icon name="x-circle" size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />
                                    Falsee la calidad, características o condiciones reales de nuestros paquetes turísticos
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="x-circle" size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />
                                    Suplante la identidad de guías turísticos, empleados o clientes reales
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="x-circle" size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />
                                    Manipule imágenes de destinos turísticos para crear expectativas irreales
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="x-circle" size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />
                                    Genere reseñas o testimonios falsos que induzcan a error a otros usuarios
                                </li>
                            </ul>
                            <p className="text-slate-400 mt-3 pt-3 border-t border-rose-500/20">
                                El incumplimiento de esta cláusula resultará en la suspensión inmediata de la cuenta y podrá derivar en acciones legales conforme a la Ley N° 29733 y normativas vigentes sobre publicidad engañosa.
                            </p>
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-3">
                            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">5</span>
                            Reseñas y calificaciones
                        </h2>
                        <p className="text-slate-400 leading-relaxed">Las reseñas deben ser honestas y basadas en experiencias reales. ESKY TRIPS se reserva el derecho de eliminar contenido que infrinja estas políticas.</p>
                    </section>

                    <section className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-3">
                            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">6</span>
                            Limitación de responsabilidad
                        </h2>
                        <p className="text-slate-400 leading-relaxed">ESKY TRIPS actúa como intermediario entre el viajero y los proveedores de servicios turísticos. No nos responsabilizamos por eventos de fuerza mayor que afecten el desarrollo de los paquetes.</p>
                    </section>

                    <section className="bg-gradient-to-br from-slate-900/90 to-slate-900/80 border border-slate-800/80 rounded-2xl p-6">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-3">
                            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">7</span>
                            Legislación aplicable
                        </h2>
                        <p className="text-slate-400 leading-relaxed">Estos términos se rigen por la legislación peruana. Para cualquier controversia, las partes se someten a los tribunales de la ciudad de Ayacucho.</p>
                    </section>

                </div>
            </div>
        </div>
    );
}
