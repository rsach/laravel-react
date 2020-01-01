##!/usr/bin/env bash


#curl https://getcomposer.org/composer.phar -o /usr/local/bin/composer
cd /app/api

composer install

php artisan migrate:fresh
php artisan jwt:secret
php artisan serve --host=0.0.0.0
