import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Icon from '@/Components/Icon';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar Contraseña" />

            <div className="mb-6 animate-slide-up">
                <h1 className="text-2xl font-bold text-white mb-2">¿Olvidaste tu contraseña?</h1>
                <p className="text-slate-400 text-sm">No te preocupes. Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.</p>
            </div>

            {status && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
                    <Icon name="check-circle" size={16} />
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                        <Icon name="mail" size={15} className="text-cyan-400" />
                        Correo electrónico
                    </label>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="tu@email.com"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-end pt-2">
                    <Link
                        href="/login"
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition mr-4"
                    >
                        <Icon name="arrow-left" size={14} />
                        Volver al login
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {processing ? (
                            <span className="flex items-center gap-2">
                                <Icon name="loader" size={16} className="animate-spin" />
                                Enviando...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Icon name="mail" size={16} />
                                Enviar enlace
                            </span>
                        )}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
