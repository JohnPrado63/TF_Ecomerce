import { useState, useEffect, useRef } from 'react';

export default function DatePicker({ value, onChange, min, className = '' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date(value || new Date()));
    const calendarRef = useRef(null);

    const minDate = min ? new Date(min) : new Date();

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const selectDate = (day) => {
        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (selected >= minDate) {
            const formattedDate = selected.toISOString().split('T')[0];
            onChange(formattedDate);
            setIsOpen(false);
        }
    };

    const handleClickOutside = (e) => {
        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const dayNames = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const displayValue = value ? new Date(value).toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : '';

    return (
        <div className={`relative ${className}`} ref={calendarRef}>
            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .calendar-popup {
                    animation: slideDown 0.2s ease-out;
                }
            `}</style>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white text-left focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition flex items-center justify-between hover:border-slate-500"
            >
                <span className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{displayValue || 'Seleccionar fecha'}</span>
                </span>
                <svg className={`w-4 h-4 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>

            {isOpen && (
                <div className="calendar-popup absolute top-full left-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-slate-950 p-4 z-50 w-80">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="button"
                            onClick={previousMonth}
                            className="w-8 h-8 rounded-lg hover:bg-slate-800 transition flex items-center justify-center text-slate-400 hover:text-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="text-center">
                            <div className="font-bold text-white text-lg">
                                {monthNames[currentDate.getMonth()]}
                            </div>
                            <div className="text-sm text-slate-400">
                                {currentDate.getFullYear()}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={nextMonth}
                            className="w-8 h-8 rounded-lg hover:bg-slate-800 transition flex items-center justify-center text-slate-400 hover:text-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Days of week */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {dayNames.map((day) => (
                            <div key={day} className="text-center text-xs font-bold text-slate-500 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7 gap-2">
                        {days.map((day, index) => {
                            const isDisabled = day === null || (day && new Date(currentDate.getFullYear(), currentDate.getMonth(), day) < minDate);
                            const isSelected = day && value && 
                                new Date(value).toDateString() === 
                                new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
                            const isToday = day && 
                                new Date().toDateString() === 
                                new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={() => selectDate(day)}
                                    className={`
                                        py-2 rounded-lg text-sm font-semibold transition
                                        ${isDisabled 
                                            ? 'text-slate-600 cursor-not-allowed' 
                                            : isSelected
                                            ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/50'
                                            : isToday
                                            ? 'bg-slate-800 text-cyan-400 border border-cyan-500'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        }
                                    `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
