import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Terminos() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Términos y Condiciones - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold mb-2">Términos y Condiciones</h1>
                <p className="text-slate-400 mb-10">Última actualización: Junio 2026</p>

                <div className="space-y-8 text-slate-300 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Aceptación de términos</h2>
                        <p>Al utilizar ESKY TRIPS, usted acepta estos Términos y Condiciones en su totalidad. Si no está de acuerdo, debe abstenerse de usar la plataforma.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. Uso del servicio</h2>
                        <p>ESKY TRIPS es una plataforma de reservas de paquetes turísticos en Ayacucho, Perú. El usuario se compromete a proporcionar información veraz y actualizada al realizar reservas.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Reservas y pagos</h2>
                        <ul className="list-disc list-inside space-y-2 text-slate-400">
                            <li>Las reservas quedan confirmadas únicamente tras la verificación del pago</li>
                            <li>Los precios incluyen los servicios detallados en cada paquete</li>
                            <li>Las cancelaciones deben realizarse con al menos 48 horas de anticipación</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Política contra Deepfakes y contenido generado por IA</h2>
                        <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-5">
                            <p className="text-red-300 font-semibold mb-2">⚠️ Prohibición expresa</p>
                            <p className="text-slate-300 mb-3">
                                Queda estrictamente prohibido a los usuarios subir, publicar o compartir en nuestra plataforma cualquier contenido generado o manipulado mediante Inteligencia Artificial (deepfakes, imágenes sintéticas, reseñas falsas generadas por IA) que:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-slate-400">
                                <li>Falsee la calidad, características o condiciones reales de nuestros paquetes turísticos</li>
                                <li>Suplante la identidad de guías turísticos, empleados o clientes reales</li>
                                <li>Manipule imágenes de destinos turísticos para crear expectativas irreales</li>
                                <li>Genere reseñas o testimonios falsos que induzcan a error a otros usuarios</li>
                            </ul>
                            <p className="text-slate-400 mt-3">
                                El incumplimiento de esta cláusula resultará en la suspensión inmediata de la cuenta y podrá derivar en acciones legales conforme a la Ley N° 29733 y normativas vigentes sobre publicidad engañosa.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">5. Reseñas y calificaciones</h2>
                        <p>Las reseñas deben ser honestas y basadas en experiencias reales. ESKY TRIPS se reserva el derecho de eliminar contenido que infrinja estas políticas.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">6. Limitación de responsabilidad</h2>
                        <p>ESKY TRIPS actúa como intermediario entre el viajero y los proveedores de servicios turísticos. No nos responsabilizamos por eventos de fuerza mayor que afecten el desarrollo de los paquetes.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">7. Legislación aplicable</h2>
                        <p>Estos términos se rigen por la legislación peruana. Para cualquier controversia, las partes se someten a los tribunales de la ciudad de Ayacucho.</p>
                    </section>

                </div>
            </div>
        </div>
    );
}