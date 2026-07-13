FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    nginx \
    supervisor \
    fcgi \
    envsubst \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    mysql-client

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

RUN mkdir -p /var/run/php \
    && chown -R www-data:www-data /var/www/html \
    && chown -R www-data:www-data /var/cache/nginx \
    && chown -R www-data:www-data /var/log/nginx

COPY nginx.conf /etc/nginx/http.d/default.conf
COPY php.ini /usr/local/etc/php/conf.d/local.ini
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY composer.json composer.lock* ./

RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs --no-scripts \
    && composer clear-cache

COPY . .

RUN cp .env.production .env 2>/dev/null || true

RUN composer dump-autoload --optimize \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && rm .env

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
