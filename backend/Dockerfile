FROM jguyomard/laravel-nginx
#RUN apt-get update -y && apt-get install -y openssl zip unzip git
#RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
#RUN docker-php-ext-install pdo mbstring

#RUN composer install



ADD ./ab.sh /ab.sh

RUN chmod 755 /ab.sh


CMD ["/ab.sh"]