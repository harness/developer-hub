---
sidebar_position: 1
description: Create a Pipeline with a Mysql service dependency.
---

# MySQL

This guide covers configuring continuous integration pipelines for projects that have a MySQL dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches MySQL as a background step. The database server will be available at `database:3306`, where the hostname matches the background step name.

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
          container: mysql
          envs:
            MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
            MYSQL_DATABASE: test

      - name: test
        type: run
        spec:
          container: mysql
          script: |-
            sleep 15
            mysql -u root -h database --execute="SELECT VERSION();"
```

## Database Options

If you need to start the mysql container with additional runtime options you can override the entrypoint and command arguments.

```yaml {5-6}
      - name: database
        type: background
        spec:
          container: mysql
          entrypoint: "mysqld"
          args: [ "--character-set-server=utf8mb4" ]
          envs:
            MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
            MYSQL_DATABASE: test
```

## Database Settings

The official MySQL image provides environment variables used at startup to create the default username, password, database and more. Please see the official image [documentation](https://hub.docker.com/_/mysql/) for more details.

```yaml {7-9}
      - name: database
        type: background
        spec:
          container: mysql
          entrypoint: "mysqld"
          args: [ "--character-set-server=utf8mb4" ]
          envs:
            MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
            MYSQL_DATABASE: test
```

## Common Problems

### Initialization

If you are unable to connect to the MySQL container please make sure you
are giving MySQL adequate time to initialize and begin accepting
connections.

```yaml {6}
      - name: test
        type: run
        spec:
          container: mysql
          script: |-
            sleep 15
            mysql -u root -h database --execute="SELECT VERSION();"
```

### Incorrect Hostname

You cannot use `127.0.0.1` or `localhost` to connect with the Mysql container. If you are unable to connect to Mysql please verify you are using the correct hostname, corresponding with the name of the mysql service container. 

Bad:

```yaml {7}
      - name: test
        type: run
        spec:
          container: mysql
          script: |-
            sleep 15
            mysql -u root -h localhost --execute="SELECT VERSION();"
```

Good:

```yaml {7}
      - name: test
        type: run
        spec:
          container: mysql
          script: |-
            sleep 15
            mysql -u root -h database --execute="SELECT VERSION();"
```