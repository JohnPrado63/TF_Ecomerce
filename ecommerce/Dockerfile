FROM php:8.2-fpm-alpine

ARG APP_KEY
ENV APP_KEY=${APP_KEY}

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

RUN cp /var/www/html/.env.example /var/www/html/.env 2>/dev/null || true; \
    if [ -z "$APP_KEY" ]; then \
    php artisan key:generate --force; \
    else \
    sed -i "s/^APP_KEY=.*/APP_KEY=${APP_KEY}/" /var/www/html/.env; \
    fi

RUN php -r 'file_put_contents("/var/www/html/public/health.php", "<?php http_response_code(200); echo \"ok\";");'

RUN chown -R nobody:nobody /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:8080/health.php || exit 1

CMD sh -c "php -S 0.0.0.0:8080 -t public & php-fpm & wait"
