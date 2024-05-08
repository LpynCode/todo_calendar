FROM node:18-alpine as node
WORKDIR /app/client

COPY package*.json ./
RUN npm ci

COPY . /app/client
ARG env=prod
RUN npm run build


FROM nginx:1.13

WORKDIR /usr/local/bin

COPY --from=node /app/client/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80