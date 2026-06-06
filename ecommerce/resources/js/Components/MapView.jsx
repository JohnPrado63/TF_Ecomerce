import { useEffect, useRef } from 'react';

export default function MapView({ latitude, longitude, title, city }) {

    const mapRef    = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        // Solo ejecutar en el navegador
        if (typeof window === 'undefined') return;
        if (!latitude || !longitude) return;
        if (mapInstance.current) return;

        // Importar Leaflet dinámicamente
        import('leaflet').then((L) => {

            // Fix del ícono por defecto de Leaflet
            delete L.default.Icon.Default.prototype._getIconUrl;
            L.default.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });

            // Crear el mapa
            const map = L.default.map(mapRef.current).setView(
                [latitude, longitude], 13
            );

            // Agregar capa de OpenStreetMap
            L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);

            // Agregar marcador
            L.default.marker([latitude, longitude])
                .addTo(map)
                .bindPopup(`
                    <div style="font-family: sans-serif; padding: 4px;">
                        <strong style="font-size: 14px;">${title}</strong><br/>
                        <span style="color: #666; font-size: 12px;">📍 ${city}, Ayacucho</span>
                    </div>
                `)
                .openPopup();

            mapInstance.current = map;
        });

        // Limpiar al desmontar
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [latitude, longitude]);

    if (!latitude || !longitude) {
        return (
            <div className="w-full h-64 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
                <p className="text-slate-500 text-sm">📍 Ubicación no disponible</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-slate-700">
            <div ref={mapRef} className="w-full h-full z-10" />
        </div>
    );
}