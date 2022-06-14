FROM nginx:alpine as builder

RUN rm -rf /usr/share/nginx/html/*

COPY build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
