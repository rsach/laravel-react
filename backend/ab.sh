##!/usr/bin/env bash


#curl https://getcomposer.org/composer.phar -o /usr/local/bin/composer
cd /app/api

composer install --ignore-platform-reqs

php artisan migrate:fresh --force
php artisan jwt:secret --force
php artisan serve --host=0.0.0.0
