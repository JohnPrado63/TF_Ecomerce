import { forwardRef, useEffect, useRef, useState } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    return (
        <div className="relative group">
            <input
                {...props}
                type={inputType}
                className={
                    'w-full px-4 py-3 pr-12 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 focus:bg-slate-900/70 focus:outline-none transition duration-200 group-hover:bg-slate-900/60 ' +
                    className
                }
                ref={input}
            />
            {isPasswordField && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-400 transition duration-200 focus:outline-none"
                    tabIndex="-1"
                >
                    {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.596m10.808 10.808l4.147 4.147m-10.808-10.808l4.147 4.147" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
});


