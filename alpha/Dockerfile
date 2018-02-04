FROM nginx:mainline-alipine
WORKDIR /usr/share/nginx/html
ADD page.js page.js
ADD index.html index.html
ENV VIRTUAL_HOST=blog.tams.tech         \
    DEFAULT_HOST=blog.tams.tech         \
    LETSENCRYPT_HOST=blog.tams.tech     \
    LETSENCRYPT_EMAIL=sysadmin@tams.tech
EXPOSE 80
EXPOSE 443
