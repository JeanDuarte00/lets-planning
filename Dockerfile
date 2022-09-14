FROM node:15

WORKDIR /usr/src/app

RUN \
    apt update \
    && apt install wget -y \
    && apt install vim -y \
    && npm install

#Add dockerize tool -------------------
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

