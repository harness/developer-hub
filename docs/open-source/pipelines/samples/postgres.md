---
sidebar_position: 1
description: Create a Pipeline with a Postgres service dependency.
---

# PostgreSQL

This guide covers configuring continuous integration pipelines for projects that have a PostgreSQL dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches PostgreSQL as a background step. The database server will be available at `database:5432`, where the hostname matches the background step name.

```yaml {7-14} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: database
        type: background
        spec:
          container: postgres:14.4-alpine
          envs:
            POSTGRES_DB: test
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: password

      - name: test
        type: run
        spec:
          envs:
            PGPASSWORD: password
          container: postgres:14.4-alpine
          script: |-
            until pg_isready -U postgres -h database; do sleep 2; done
            psql -U postgres -d test -h database
```

## Database Settings

The official Postgres image provides environment variables used at startup
to create the default username, password, database and more. Please see the
official image [documentation](https://hub.docker.com/_/postgres/) for more
details.

```yaml {5-8}
      - name: database
        type: background
        spec:
          container: postgres:14.4-alpine
          envs:
            POSTGRES_DB: test
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: password
```

## Common Problems

### Initialization

If you are unable to connect to the Postgres container please make sure you
are giving Postgres adequate time to initialize and begin accepting
connections. The `pg_isready` tool provided by PostgreSQL can help ensure the
database is ready to accept connections.

```yaml {8}
      - name: test
        type: run
        spec:
          envs:
            PGPASSWORD: password
          container: postgres:14.4-alpine
          script: |-
            until pg_isready -U postgres -h database; do sleep 2; done
            psql -U postgres -d test -h database
```

### Incorrect Hostname

You cannot use `127.0.0.1` or `localhost` to connect with the PostgreSQL
container. If you are unable to connect to the Postgres container please
verify you are using the correct hostname, corresponding with the name
of the postgres service container. 

Bad:

```yaml {8}
      - name: test
        type: run
        spec:
          envs:
            PGPASSWORD: password
          container: postgres:14.4-alpine
          script: |-
            psql -U postgres -d test -h localhost
```

Good:

```yaml {8}
      - name: test
        type: run
        spec:
          envs:
            PGPASSWORD: password
          container: postgres:14.4-alpine
          script: |-
            psql -U postgres -d test -h database
```