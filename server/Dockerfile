FROM node:14-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]