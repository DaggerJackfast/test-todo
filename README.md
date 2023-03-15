## Description

Test todo app for namba one. Task definition you can see in [./definition.md](./definition.md) file.

## Run in docker guide

In first step you should copy `.env.production.example` to `.env.production` file and `.env.database.example` to `.env.database` file.
The files need to set environment variables for application and database docker containers.
```bash
cp .env.production.example .env.production
cp .env.database.example .env.database
```
Then you need to set environment variables.

For run the application you need execute the next commands or you the `./scripts/run_docker.sh` bash script.
```bash
docker-compose build
docker-compose up -d
# And then run migrations
docker-compose exec backend npx typeorm migration:run -d ./dist/config/datasource.js
```

Swagger docs path is `\docs`.


## Stay in touch

- Author - [Aibek Abydkasymov](https://github.com/DaggerJackfast)

