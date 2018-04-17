#! /bin/bash
set -e

until nc -w5 $RDS_HOST 3306
do
  sleep 0.5
  echo "Wait for MySQL"
done
sleep 1

echo "Server start..."
npm start
echo "Server started"
