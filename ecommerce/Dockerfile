FROM php:8.2-cli-alpine

RUN apk add --no-cache \
    git curl wget libpng-dev oniguruma-dev libxml2-dev zip unzip mysql-client

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/html/
WORKDIR /var/www/html

RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs --no-scripts \
    && composer clear-cache

RUN php -r 'file_put_contents("/var/www/html/public/health.php", "<?php http_response_code(200); echo \"ok\";");'

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:8080/health.php || exit 1

ENTRYPOINT ["entrypoint.sh"]
CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]
