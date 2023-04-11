FROM node:15

WORKDIR /usr/src/app

RUN \
    apt update \
    && apt install wget -y \
    && apt install vim -y \
    && npm install \
    && npm install nodemon


COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

