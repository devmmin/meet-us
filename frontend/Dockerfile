FROM nginx:alpine

WORKDIR /meet-us

COPY build .

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf


CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80