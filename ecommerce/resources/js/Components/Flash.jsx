import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Flash() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        }
    }, [flash]);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setVisible(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border transition-all duration-300 ${
            type === 'success'
                ? 'bg-green-900 border-green-700 text-green-300'
                : 'bg-red-900 border-red-700 text-red-300'
        }`}>
            <span className="text-xl">
                {type === 'success' ? '✅' : '❌'}
            </span>
            <p className="font-semibold text-sm">{message}</p>
            <button
                onClick={() => setVisible(false)}
                className="ml-2 text-lg opacity-60 hover:opacity-100 transition"
            >
                ×
            </button>
        </div>
    );
}