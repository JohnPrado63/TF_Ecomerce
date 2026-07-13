#!/bin/sh
set -e

if [ ! -f /var/www/html/.env ]; then
  cp /var/www/html/.env.example /var/www/html/.env
fi

if [ -z "$APP_KEY" ]; then
  echo "WARN: APP_KEY no está seteada en el entorno, generando una..."
  php artisan key:generate --force
fi

php artisan config:clear

if [ "$RUN_MIGRATIONS" = "true" ]; then
  php artisan migrate --force
fi

exec "$@"
