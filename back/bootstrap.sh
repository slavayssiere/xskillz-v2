#! /bin/bash
set -e

echo "DB migrate..."
node_modules/db-migrate/bin/db-migrate up --env kubernetes
echo "DB migrated"

echo "PM2 start..."
npm start
echo "PM2 started"
