import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-100 leading-tight">Mi Perfil</h2>}
        >
            <Head title="Perfil" />

            <div className="py-12 bg-slate-950 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),_transparent_30%)]" />
                        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] items-center">
                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Cuenta</p>
                                <h1 className="mt-3 text-4xl font-bold text-white">Bienvenido de vuelta, {auth.user.name ? auth.user.name.split(' ')[0] : auth.user.email}</h1>
                                <p className="mt-4 max-w-2xl text-slate-300 text-sm leading-7">
                                    Gestiona tu información, actualiza tu contraseña y mantén tu cuenta segura desde un panel moderno y fácil de usar.
                                </p>
                            </div>
                            <div className="rounded-full border border-slate-700 bg-slate-950/90 px-5 py-4 text-slate-200 shadow-xl shadow-cyan-500/10">
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Miembro</p>
                                <p className="mt-2 text-2xl font-semibold text-white">Gold</p>
                                <p className="text-sm text-slate-400">Acceso completo</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
                        <div className="space-y-6">
                            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
                                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="" />
                            </div>
                            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
                                <UpdatePasswordForm className="" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900/95 to-slate-950/95 p-6 shadow-2xl shadow-slate-950/30">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Detalles</p>
                                        <h2 className="mt-3 text-2xl font-bold text-white">Tu resumen</h2>
                                    </div>
                                    <div className="rounded-full bg-cyan-500/10 px-3 py-2 text-cyan-200 text-sm">Activo</div>
                                </div>
                                <div className="mt-6 space-y-4 text-slate-300">
                                    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Nombre</p>
                                        <p className="mt-2 text-base font-medium text-white">{auth.user.name}</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Correo</p>
                                        <p className="mt-2 text-base font-medium text-white">{auth.user.email}</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Verificación</p>
                                        <p className="mt-2 text-base font-medium text-white">{auth.user.email_verified_at ? 'Verificado' : 'No verificado'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-[2rem] border border-red-700/60 bg-slate-950/90 p-6 shadow-xl shadow-red-500/10">
                                <DeleteUserForm className="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
