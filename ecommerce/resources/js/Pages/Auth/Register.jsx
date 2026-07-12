import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Registro" />

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
                <h1 className="text-2xl font-bold text-white mb-2">Crear Cuenta</h1>
                <p className="text-slate-400 text-sm">Únete a ESKY TRIPS y comienza tu aventura de viajes</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div className="field-animated field-1 opacity-0">
                    <InputLabel htmlFor="name" value="Nombre Completo" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-2"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Tu nombre completo"
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="field-animated field-2 opacity-0">
                    <InputLabel htmlFor="email" value="Correo Electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="tu@email.com"
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="field-animated field-3 opacity-0">
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="field-animated field-4 opacity-0">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-2"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex flex-col gap-4 pt-4 field-animated field-4 opacity-0" style={{ animationDelay: '0.5s' }}>
                    <PrimaryButton className="w-full" disabled={processing}>
                        {processing ? 'Registrando...' : 'Registrarse'}
                    </PrimaryButton>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-slate-900 px-3 text-slate-500">o regístrate con</span>
                        </div>
                    </div>

                    <a
                        href="/auth/google"
                        className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-xl transition border border-gray-300"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Registrarse con Google
                    </a>

                    <div className="text-center">
                        <span className="text-slate-400 text-sm">
                            ¿Ya tienes cuenta?{' '}
                            <Link
                                href={route('login')}
                                className="text-sky-400 hover:text-sky-300 font-semibold transition"
                            >
                                Inicia sesión aquí
                            </Link>
                        </span>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
