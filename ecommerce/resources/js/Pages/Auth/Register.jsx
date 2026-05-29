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
