import { Head, Link, useForm } from '@inertiajs/react';

export default function PackageForm({ package: pkg, categories, locations }) {
    const isEditing = Boolean(pkg?.id);

    const { data, setData, post, put, processing, errors } = useForm({
        title: pkg?.title ?? '',
        description: pkg?.description ?? '',
        price: pkg?.price ?? '',
        duration_days: pkg?.duration_days ?? '',
        category_id: pkg?.category_id ?? '',
        location_id: pkg?.location_id ?? '',
        available_slots: pkg?.available_slots ?? '',
        status: pkg?.status ?? true,
        image_url: pkg?.image_url ?? '',
        includes_guide: pkg?.includes_guide ?? false,
        includes_food: pkg?.includes_food ?? false,
        includes_hotel: pkg?.includes_hotel ?? false,
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route('admin.packages.update', pkg.id));
        } else {
            post(route('admin.packages.store'));
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title={isEditing ? 'Editar paquete' : 'Crear paquete'} />

            <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span className="font-bold text-xl text-cyan-400">ESKY TRIPS Admin</span>
                    <div className="flex gap-4">
                        <Link href="/admin/dashboard" className="text-slate-400 hover:text-white transition">
                            Dashboard
                        </Link>
                        <Link href="/admin/packages" className="text-slate-400 hover:text-white transition">
                            Paquetes
                        </Link>
                        <Link href="/admin/bookings" className="text-slate-400 hover:text-white transition">
                            Reservas
                        </Link>
                    </div>
                </div>
                <Link href="/" className="text-slate-400 hover:text-white text-sm transition">
                    ← Volver al sitio
                </Link>
            </nav>

            <div className="container mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">{isEditing ? 'Editar paquete' : 'Crear paquete'}</h1>
                        <p className="text-slate-400">{isEditing ? 'Actualiza los datos del paquete.' : 'Crea un nuevo paquete disponible para reservas.'}</p>
                    </div>
                    <Link href={route('admin.packages')} className="text-sm bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-700 transition">
                        Volver a lista
                    </Link>
                </div>

                <form onSubmit={submit} className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Título</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                placeholder="Nombre del paquete"
                            />
                            {errors.title && <p className="text-sm text-red-400 mt-2">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Descripción</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-2 w-full min-h-[140px] rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                placeholder="Información detallada del paquete"
                            />
                            {errors.description && <p className="text-sm text-red-400 mt-2">{errors.description}</p>}
                        </div>
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Precio</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                />
                                {errors.price && <p className="text-sm text-red-400 mt-2">{errors.price}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Duración (días)</label>
                                <input
                                    type="number"
                                    value={data.duration_days}
                                    onChange={(e) => setData('duration_days', e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                    placeholder="Número de días"
                                    min="1"
                                />
                                {errors.duration_days && <p className="text-sm text-red-400 mt-2">{errors.duration_days}</p>}
                            </div>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Categoría</label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-sm text-red-400 mt-2">{errors.category_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Ubicación</label>
                                <select
                                    value={data.location_id}
                                    onChange={(e) => setData('location_id', e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                >
                                    <option value="">Selecciona una ubicación</option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.id}>{location.city}</option>
                                    ))}
                                </select>
                                {errors.location_id && <p className="text-sm text-red-400 mt-2">{errors.location_id}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Imagen URL</label>
                            <input
                                type="text"
                                value={data.image_url}
                                onChange={(e) => setData('image_url', e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                placeholder="/images/packages/foto.jpg"
                            />
                            {errors.image_url && <p className="text-sm text-red-400 mt-2">{errors.image_url}</p>}
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Disponibles</label>
                                <input
                                    type="number"
                                    value={data.available_slots}
                                    onChange={(e) => setData('available_slots', e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                    min="0"
                                />
                                {errors.available_slots && <p className="text-sm text-red-400 mt-2">{errors.available_slots}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Estado</label>
                                <select
                                    value={data.status ? '1' : '0'}
                                    onChange={(e) => setData('status', e.target.value === '1')}
                                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                >
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                                {errors.status && <p className="text-sm text-red-400 mt-2">{errors.status}</p>}
                            </div>
                        </div>

                        <fieldset className="rounded-2xl border border-slate-700 p-4 bg-slate-900">
                            <legend className="text-sm font-semibold text-slate-300">Incluye</legend>
                            <div className="mt-4 grid gap-3">
                                {[
                                    { name: 'includes_guide', label: 'Guía' },
                                    { name: 'includes_food', label: 'Alimentación' },
                                    { name: 'includes_hotel', label: 'Hotel' },
                                ].map((option) => (
                                    <label key={option.name} className="inline-flex items-center gap-2 text-slate-300">
                                        <input
                                            type="checkbox"
                                            checked={data[option.name]}
                                            onChange={(e) => setData(option.name, e.target.checked)}
                                            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400 transition"
                        >
                            {isEditing ? 'Actualizar paquete' : 'Crear paquete'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
