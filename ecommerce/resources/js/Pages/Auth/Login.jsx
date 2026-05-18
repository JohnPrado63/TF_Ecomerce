import { useEffect } from 'react';
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
        <div className="min-h-screen flex bg-white font-sans text-gray-800">
            <Head title="Inicio de Sesión" />
            
            {/* Left Column - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
                {/* Purple abstract shape background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2] to-[#7B68EE]">
                    {/* Wavy shape to create the white curve on the right edge */}
                    <div className="absolute top-0 -right-[20%] h-full w-[40%] bg-white rounded-l-[100%] scale-y-150 transform transition-transform"></div>
                </div>
                
                <img 
                    src="/images/login_illustration.png" 
                    alt="Login Illustration" 
                    className="relative z-10 w-[80%] max-w-lg drop-shadow-2xl"
                />
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-20">
                <div className="w-full max-w-md">
                    {/* Floating icons at top */}
                    <div className="flex justify-center mb-8">
                        <div className="relative flex justify-center">
                            <div className="w-20 h-20 bg-[#1A1A40] rounded-full flex items-center justify-center text-white text-3xl z-10 relative border-4 border-white shadow-md">
                                👩‍💻
                            </div>
                            <div className="w-16 h-16 bg-[#1A1A40] rounded-full flex items-center justify-center text-white text-2xl absolute -top-2 -left-10 border-4 border-white opacity-90 shadow-sm">
                                👨‍💻
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-light text-center text-gray-700 mb-12">Inicio de Sesión</h2>

                    {status && <div className="mb-4 font-medium text-sm text-green-600 text-center">{status}</div>}

                    <form onSubmit={submit} className="space-y-8">
                        {/* Correo Electrónico */}
                        <div className="relative">
                            <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-10">
                                Correo Electrónico
                            </label>
                            <div className="flex items-center border-b-2 border-[#8A2BE2] pb-2">
                                <div className="text-[#8A2BE2] mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-300 font-medium px-0"
                                    autoComplete="username"
                                    autoFocus
                                />
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        {/* Contraseña */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-10">
                                Contraseña
                            </label>
                            <div className="flex items-center border-b-2 border-gray-300 pb-2 focus-within:border-[#8A2BE2] transition-colors">
                                <div className="text-gray-400 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-300 font-medium px-0"
                                    autoComplete="current-password"
                                />
                            </div>
                            {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-end">
                            <Link
                                href={route('register')}
                                className="text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
                            >
                                ¿Necesitas una Cuenta?
                            </Link>
                        </div>

                        <div className="pt-4 flex justify-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-3/4 py-3 px-4 bg-[#8A2BE2] hover:bg-[#7A24C9] text-white rounded-full font-semibold shadow-lg shadow-[#8A2BE2]/40 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8A2BE2] disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
