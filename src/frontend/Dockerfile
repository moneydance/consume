############################################################
# Dockerfile to build Frontend App
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
From ubuntu

# File Author/ Maintainer
MAINTAINER Ben Pusey

ENV DEBIAN_FRONTEND noninteractive

RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update

# Install basic applications
RUN apt-get install -y tar git curl nano wget dialog net-tools build-essential
Run apt-get install -y nginx

# Add App
Add . frontend

# Add server configs and bash scripts and set permissions
RUN cp /frontend/nginx/nginx.conf /etc/nginx/nginx.conf
RUN cp /frontend/scripts/runserver /usr/local/bin/ && chmod u+x,g+x /usr/local/bin/runserver && sed -i -e 's/\r$//' /usr/local/bin/runserver
RUN cp /frontend/scripts/make_ssl_cert /usr/local/bin/ && chmod u+x,g+x /usr/local/bin/make_ssl_cert && sed -i -e 's/\r$//' /usr/local/bin/make_ssl_cert
RUN chmod -R +rx /frontend/static/javascript/lib
RUN make_ssl_cert

# Expose ports
EXPOSE 80
EXPOSE 443

# Change to work directory
WORKDIR /frontend
