FROM node:11 as builder
RUN mkdir -p /src/src
COPY layout /src/layout
COPY public /src/public
COPY src /src/src
COPY .env /src
COPY index.html /src
COPY main.js /src
COPY babel.config.js /src
COPY package-lock.json /src
COPY package.json /src
WORKDIR /src
RUN npm install && NODE_ENV=production npm run build && cp -R dist / && rm -rf /src

FROM nginx
WORKDIR /etc/nginx/conf.d
RUN rm default.conf
COPY docker-nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /dist .
