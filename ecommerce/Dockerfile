FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    git \
    curl \
    wget \
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
    && composer clear-cache

RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

RUN chown -R nobody:nobody /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:8080/health || exit 1

# Health server on port 8080, php-fpm on 9000
CMD sh -c "php -S 0.0.0.0:8080 -t /var/www/html/public & php-fpm & wait"
