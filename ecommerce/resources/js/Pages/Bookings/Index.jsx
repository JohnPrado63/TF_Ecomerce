import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Index({ bookings }) {

    const statusColor = {
        pending:   'bg-yellow-900 text-yellow-300',
        confirmed: 'bg-green-900  text-green-300',
        cancelled: 'bg-red-900   text-red-300',
    };

    const statusLabel = {
        pending:   'Pendiente',
        confirmed: 'Confirmado',
        cancelled: 'Cancelado',
    };

    function cancelBooking(id) {
        if (confirm('¿Estás seguro de cancelar esta reserva?')) {
            router.delete(`/bookings/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Head title="Mis Reservas - ESKY TRIPS" />

            <div className="container mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Mis Reservas</h1>
                        <p className="text-slate-400 mt-1">
                            Historial de tus viajes reservados
                        </p>
                    </div>
                    <Link
                        href="/packages"
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-5 py-2 rounded-xl transition"
                    >
                        + Nueva reserva
                    </Link>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-xl mb-4">
                            No tienes reservas aún
                        </p>
                        <Link
                            href="/packages"
                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition"
                        >
                            Ver paquetes disponibles
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
                            >
                                {/* Imagen y info */}
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={booking.tour_package?.image_url}
                                        alt={booking.tour_package?.title}
                                        className="w-20 h-20 rounded-xl object-cover"
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {booking.tour_package?.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm">
                                            📍 {booking.tour_package?.location?.city}
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            📅 {booking.booking_date} · 👥 {booking.persons_quantity} persona(s)
                                        </p>
                                    </div>
                                </div>

                                {/* Estado y precio */}
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[booking.status]}`}>
                                        {statusLabel[booking.status]}
                                    </span>
                                    <p className="text-cyan-400 font-bold text-xl">
                                        S/. {Number(booking.total_amount).toFixed(2)}
                                    </p>
                                    {booking.status === 'pending' && (
                                        <button
                                            onClick={() => cancelBooking(booking.id)}
                                            className="text-red-400 hover:text-red-300 text-sm transition"
                                        >
                                            Cancelar reserva
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}