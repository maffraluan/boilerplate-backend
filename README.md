## How to run:

```sh
npm install -g pnpm || npm install -g @pnpm/exe
pnpm install && pnpm run start:dev
```

## Migration:

```sh
pnpm sequelize-cli init
```

```sh
pnpm sequelize-cli migration:generate --name add_todo_table
```

```sh
pnpm run migration:generate
```

## Setup

Create file .env with these fields

```sh
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=<USERNAME>
POSTGRES_PASSWORD=<PASSWORD>
POSTGRES_DB=postgres
```

```
Replace `<USERNAME>` and `<PASSWORD>` with your actual PostgreSQL credentials.
```

Setup your postgres into config/config.json after run pnpm sequelize-cl init

```
{
  "development": {
    "username": "USERNAME_HERE",
    "password": "PASSWORD_HERE",
    "database": "postgres",
    "host": "localhost",
    "dialect": "postgres",
    "schema": "public"
  },
  "test": {
    "username": "USERNAME_HERE",
    "password": "PASSWORD_HERE",
    "database": "postgres",
    "host": "localhost",
    "dialect": "postgres",
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  }
}

```

## Test

```
pnpm jest
```
