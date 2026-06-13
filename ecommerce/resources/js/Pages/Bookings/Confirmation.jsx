import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Confirmation({ booking }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            
            <div className="flex items-center justify-center px-6 py-10">
                <Head title="Reserva Confirmada - ESKY TRIPS" />

                <div className="max-w-lg w-full text-center">
                    {/* Icono éxito */}
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-bold mb-2">¡Reserva Confirmada!</h1>
                    <p className="text-slate-400 mb-8">
                        Tu reserva ha sido registrada exitosamente
                    </p>

                    {/* Resumen */}
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-left mb-8">
                        <h2 className="font-bold text-lg mb-4 text-center">Resumen de tu reserva</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Paquete</span>
                                <span className="font-semibold">{booking.tour_package?.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Destino</span>
                                <span>{booking.tour_package?.location?.city}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Fecha de viaje</span>
                                <span>{booking.booking_date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Personas</span>
                                <span>{booking.persons_quantity}</span>
                            </div>
                            {booking.guide && (
                            <div className="flex justify-between">
                                <span className="text-slate-400">Guía asignado</span>
                                <span>{booking.guide.nombre} {booking.guide.apellido}</span>
                            </div>
                            )}
                            <div className="flex justify-between border-t border-slate-700 pt-3 font-bold text-base">
                                <span>Total pagado</span>
                                <span className="text-cyan-400">
                                    S/. {Number(booking.total_amount).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-4">
                        <Link
                            href="/bookings"
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition text-center"
                        >
                            Ver mis reservas
                        </Link>
                        <Link
                            href="/"
                            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 rounded-xl transition text-center"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </div> {/* <-- Aquí faltaba cerrar este contenedor contenedor del flex */}
        </div>
    );
}