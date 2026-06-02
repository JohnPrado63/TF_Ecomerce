import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Inicio de Sesión" />

            <style>{`
                @keyframes slideInField {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .field-animated {
                    animation: slideInField 0.5s ease-out forwards;
                }
                .field-1 { animation-delay: 0.1s; }
                .field-2 { animation-delay: 0.2s; }
                .field-3 { animation-delay: 0.3s; }
                .field-4 { animation-delay: 0.4s; }
            `}</style>

            <div className="mb-6 animate-slide-up">
                <h1 className="text-2xl font-bold text-white mb-2">Bienvenido de Vuelta</h1>
                <p className="text-slate-400 text-sm">Inicia sesión para continuar con tus aventuras de viaje</p>
            </div>

            {status && (
                <div className="mb-4 p-3 rounded-lg bg-green-900/30 border border-green-700 text-green-300 text-sm field-animated opacity-0">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div className="field-animated field-1 opacity-0">
                    <InputLabel htmlFor="email" value="Correo Electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="tu@email.com"
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="field-animated field-2 opacity-0">
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between field-animated field-3 opacity-0">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-4 h-4 rounded border-slate-700 bg-slate-900/50 text-sky-500 focus:ring-sky-500 cursor-pointer"
                        />
                        <span className="text-sm text-slate-400">Recuérdame</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-sky-400 hover:text-sky-300 font-semibold transition"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                <div className="flex flex-col gap-4 pt-4 field-animated field-4 opacity-0">
                    <PrimaryButton className="w-full" disabled={processing}>
                        {processing ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </PrimaryButton>

                    <div className="text-center">
                        <span className="text-slate-400 text-sm">
                            ¿No tienes cuenta?{' '}
                            <Link
                                href={route('register')}
                                className="text-sky-400 hover:text-sky-300 font-semibold transition"
                            >
                                Regístrate aquí
                            </Link>
                        </span>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
