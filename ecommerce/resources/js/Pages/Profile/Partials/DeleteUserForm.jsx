import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-2xl font-semibold text-white">Eliminar cuenta</h2>

                <p className="mt-2 text-sm text-slate-400">
                    Al eliminar tu cuenta se borrarán todos tus datos. Si quieres, descarga primero cualquier información importante.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Eliminar cuenta</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 rounded-[1.5rem] bg-slate-950/90 border border-slate-800 shadow-xl shadow-red-500/10">
                    <h2 className="text-xl font-semibold text-white">
                        ¿Seguro que deseas eliminar tu cuenta?
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Una vez eliminada, tu cuenta y todos los datos asociados se borrarán permanentemente. Confirma con tu contraseña.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Contraseña" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Contraseña"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                        <DangerButton className="sm:ms-3" disabled={processing}>
                            Confirmar eliminación
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
