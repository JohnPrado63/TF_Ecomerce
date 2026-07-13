#!/bin/sh
set -e

if [ "$SERVICE_NAME" = "app" ]; then
  if [ ! -f /var/www/html/.env ]; then
    if [ -f /var/www/html/.env.example ]; then
      cp /var/www/html/.env.example /var/www/html/.env
    else
      echo "WARN: .env no existe, creando desde variables de entorno..."
      php artisan key:generate --force
    fi
  fi

  if [ -z "$APP_KEY" ]; then
    echo "WARN: APP_KEY no está seteada, generando una..."
    php artisan key:generate --force
  fi

  php artisan config:clear

  if [ "$RUN_MIGRATIONS" = "true" ]; then
    php artisan migrate --force
    php artisan db:seed --force
  fi
fi

exec "$@"
