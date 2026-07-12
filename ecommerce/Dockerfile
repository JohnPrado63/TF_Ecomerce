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
    unzip

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

RUN apk add --no-cache autoconf g++ make \
    && pecl install redis \
    && docker-php-ext-enable redis

RUN mkdir -p /var/run/php \
    && chown -R www-data:www-data /var/www/html \
    && chown -R www-data:www-data /var/cache/nginx \
    && chown -R www-data:www-data /var/log/nginx

COPY docker/nginx/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/php/php.ini /usr/local/etc/php/conf.d/local.ini
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY . /var/www/html

RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
