---
description: Run dependent services for the duration of a stage
sidebar_position: 1
---

# Background

[Background steps](../../reference/pipelines/yaml/step-background) run dependent services for the duration of a stage.

:::note

Background step exit codes are ignored. A non-zero exit code does not fail the overall pipeline.

Background containers tend to exit with a non-zero exit code, since they often need to be killed after the pipeline completes.

:::

## Communication

Background containers are reachable at a hostname identical to the container name.

This pipeline has a `ping` step that communicates with a Redis background step named `cache`.

```yaml {7,17} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: cache
        type: background
        spec:
          container: redis

      - name: ping
        type: run
        spec:
          container: redis
          script: |-
            redis-cli -h cache ping
```

It is important to remember that after a container is started, the software running inside the container (e.g. redis) takes time to initialize and begin accepting connections.

There are two approaches to this problem:
1. Add a [health check](#health-check) (prefered)
2. Add a [sleep](#sleep)

### Health check

Use a commandline tool to check if a service is up and running.

This pipeline runs MySQL as a background step, with a run step that uses the `mysqladmin` tool to check if the MySQL server is available. Once the database is ready, the database creation command runs.

```yaml {7,22} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: database
        type: background
        spec:
          image: mysql:8.0
          envs:
            MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
            MYSQL_DATABASE: gitness_db
            MYSQL_PASSWORD: gitness
            MYSQL_USER: gitness

      - name: healthcheck
        type: script
        spec:
          image: mysql:8.0
          run: |-
            while ! mysqladmin ping -h database -u gitness -pgitness --silent; do sleep 1; done
            mysql -h database -u gitness -pgitness -e "CREATE TABLE IF NOT EXISTS gitness_db.pipelines (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL);"
```

### Sleep

Give the background step adequate time to initialize before attempting to connect.

A simple solution is to use the `sleep` command.

```yaml {17} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: cache
        type: background
        spec:
          container: redis

      - name: ping
        type: run
        spec:
          container: redis
          script: |-
            sleep 5
            redis-cli -h cache ping
```