FROM node:22.17.1-alpine

RUN apk add --no-cache python3 make g++ gcc bash

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]