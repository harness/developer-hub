---
sidebar_position: 3
---

# How to use Postgres

By default, Harness Open Source writes an [SQLite](https://www.sqlite.org) database beneath `/data` in the running container.

You can configure Harness Open Source to use an external [Postgres](https://www.postgresql.org/) database.

## Configuration

To configure Harness Open Source to use your Postgres database, set the `GITNESS_DATABASE_DRIVER` and `GITNESS_DATABASE_DATASOURCE` [environment variables](settings.md) when you launch your Harness Open Source container.

For example:

```sh {2-3} showLineNumbers
docker run -d \
  -e GITNESS_DATABASE_DRIVER=postgres \
  -e GITNESS_DATABASE_DATASOURCE="host=1.2.3.4 port=5678 sslmode=disable dbname=gitness user=$USER password=$PASSWORD" \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $HOME/gitness:/data \
  --name gitness \
  --restart always \
  harness/gitness
```

`GITNESS_DATABASE_DRIVER` must be `postgres`.

`GITNESS_DATABASE_DATASOURCE` is the [database connection string](settings.md#gitness_database_datasource) according to your Postgres server configuration. For more information on constructing this string, go to the [Postgres driver documentation](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING).