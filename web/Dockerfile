FROM node:6.2

LABEL MAINTAINER slavayssiere <sebastien.lavayssiere@wescale.fr>

RUN mkdir -p /skillz
WORKDIR /skillz

COPY package.json /skillz/package.json
RUN npm install

COPY . /skillz/
RUN npm run build:production

CMD [ "node", "server.js" ]

