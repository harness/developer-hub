---
sidebar_position: 1
description: Create a Pipeline with a Maria DB service dependency.
---

# MariaDB

This guide covers configuring continuous integration pipelines for projects that have a MariaDB dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches MariaDB as a background step. The database server will be available at `database:3306`, where the hostname matches the background step name.


```yaml {7-13} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: database
        type: background
        spec:
          container: mariadb
          envs:
            MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
            MYSQL_DATABASE: test

      - name: test
        type: run
        spec:
          container: mariadb
          script: |-
            sleep 15
            mariadb -u root -h database --execute="SELECT VERSION();"
```

## Database Settings

The official MariaDB image provides environment variables used at startup
to create the default username, password, database and more. Please see the
official image [documentation](https://hub.docker.com/_/mariadb/) for more details.


```yaml {5-7}
      - name: database
        type: background
        spec:
          container: mariadb
          envs:
            MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
            MYSQL_DATABASE: test
```

## Common Problems

### Initialization

If you are unable to connect to the MariaDB container please make sure you
are giving MariaDB adequate time to initialize and begin accepting
connections.

```yaml {6}
      - name: test
        type: run
        spec:
          container: mariadb
          script: |-
            sleep 15
            mariadb -u root -h database --execute="SELECT VERSION();"
```

### Incorrect Hostname

You cannot use `127.0.0.1` or `localhost` to connect with the MariaDB container. If you are unable to connect to MariaDB please verify you are using the correct hostname, corresponding with the name of the container. 

Bad:

```yaml {7}
      - name: test
        type: run
        spec:
          container: mariadb
          script: |-
            sleep 15
            mariadb -u root -h localhost --execute="SELECT VERSION();"
```

Good:

```yaml {7}
      - name: test
        type: run
        spec:
          container: mariadb
          script: |-
            sleep 15
            mariadb -u root -h database --execute="SELECT VERSION();"
```