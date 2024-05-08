FROM node:18-alpine as node
WORKDIR /app/server

COPY package*.json ./
RUN npm ci

COPY . .

ARG env=prod
RUN npx prisma generate
RUN npm run build


EXPOSE 8080

CMD npm run db:migrate; npm start