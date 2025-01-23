FROM node:16-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]