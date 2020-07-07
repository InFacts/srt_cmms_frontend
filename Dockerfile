# micro-service nodejs images size MB
FROM node:11.9.0-alpine as node 
LABEL maintainer="TK.thanakorn <thanakorn.vsalab@gmail.com>"

# Set the working directory to /workdir
WORKDIR /workdir
COPY ./ /workdir
RUN npm install
RUN npm run build --prod

# Based on Nginx for production
FROM nginx:1.18.0-alpine
COPY --from=node /workdir/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf