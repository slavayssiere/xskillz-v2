FROM node:6.2

MAINTAINER Xebia <jsmadja@xebia.fr>

RUN mkdir -p /skillz
WORKDIR /skillz

COPY package.json /skillz/package.json
RUN npm install

COPY . /skillz/
RUN npm run build:production

CMD [ "node", "server.js" ]

