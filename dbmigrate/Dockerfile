FROM node:6.2

LABEL MAINTAINER slavayssiere <sebastien.lavayssiere@wescale.fr>

RUN apt-get update
RUN apt-get install bcrypt node-gyp netcat -y

RUN mkdir /skills

WORKDIR /skills

EXPOSE 8080

# Install dependencies from package.json
COPY package.json package.json
RUN npm install


COPY database/migrations migrations
COPY database/database.json database.json

COPY bootstrap.sh bootstrap.sh

ENTRYPOINT ["/skills/bootstrap.sh"]
