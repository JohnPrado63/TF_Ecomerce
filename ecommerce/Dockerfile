FROM dunglas/frankenphp:php8.2-alpine

RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    mysql-client

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/html/

WORKDIR /var/www/html

RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs --no-scripts \
    && composer require laravel/octane --no-interaction \
    && composer clear-cache

RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

RUN chown -R nobody:nobody /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 20180

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:20180/health || exit 1

CMD ["php", "artisan", "octane:frankenphp", "--port=20180", "--host=0.0.0.0"]
