FROM nginx:latest


ADD ab.sh /ab.sh
RUN chmod 755 /ab.sh

#

#RUN chmod 755 /default

ADD nginx.conf /nginx.conf
ADD default.conf.template /default.conf.template
#RUN chmod 755 /nginx.conf

#RUN rm /etc/nginx/nginx.conf
#RUN rm -rf /etc/nginx/sites-enabled
#RUN mkdir /etc/nginx/sites-enabled


#ADD ./nginx.conf /etc/nginx/
#ADD ./default /etc/nginx/sites-enabled/


ENTRYPOINT ["/ab.sh"]
CMD ["nginx", "-g", "daemon off;"]
