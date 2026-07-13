#!/bin/bash
set -e

echo "=== Desplegando EskyTrips ==="

cd "$(dirname "$0")"

echo "[1/5] Construyendo imágenes Docker..."
docker compose build --no-cache

echo "[2/5] Iniciando servicios..."
docker compose up -d

echo "[3/5] Esperando a MySQL..."
sleep 10

echo "[4/5] Corriendo migraciones..."
docker compose exec app php artisan migrate --force

echo "[5/5] Verificando salud..."
curl -f http://localhost:20080/health || echo "Health check falló"

echo "=== Despliegue completo ==="
echo "App: http://localhost:20080"
