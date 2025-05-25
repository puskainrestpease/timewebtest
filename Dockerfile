FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY mini-app /usr/share/nginx/html
EXPOSE 80