#!/bin/bash


echo "########################### Back #########################"
cd back

docker build -t skillz/back:latest .

echo "##################### DB Migrate #########################"
cd ../dbmigrate

docker build -t skillz/dbmigrate:latest .


echo "########################### Front ########################"
cd ../web

docker build -t skillz/front:latest .

cd ..


echo "########################### Compose ########################"
docker-compose up -d --scale back=2 --scale web=2 
