#!/bin/bash
set -e

full_path=$(realpath $0)
scripts_path=$(dirname $full_path)
base_path=$(dirname $scripts_path)

cd $base_path
  docker-compose build
  docker-compose --env-file=.env.production up -d
  docker-compose exec backend npx typeorm migration:run -d ./dist/config/datasource.js
cd -

echo "backend docker is started"

