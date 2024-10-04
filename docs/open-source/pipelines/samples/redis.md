---
sidebar_position: 1
description: Create a Pipeline with a Redis service dependency.
---

# Redis

This guide covers configuring continuous integration pipelines for projects that have a Redis dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches Redis as a background step. The database server will be available at `redis:6379`, where the hostname matches the background step name.

```yaml {7-10} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: redis
        type: background
        spec:
          container: redis

      - name: test
        type: run
        spec:
          container: redis
          script: |-
            sleep 5
            redis-cli -h redis ping
            redis-cli -h redis set FOO bar
            redis-cli -h redis get FOO
```

## Common Problems

### Initialization

If you are unable to connect to the Redis container please make sure you
are giving Redis adequate time to initialize and begin accepting
connections.

```yaml {6}
      - name: test
        type: run
        spec:
          container: redis
          script: |-
            sleep 5
            redis-cli -h redis ping
```

### Incorrect Hostname

You cannot use `127.0.0.1` or `localhost` to connect with the Redis container.
If you are unable to connect to the Redis container please verify you are
using the correct hostname, corresponding with the name of the redis service
container. 

Bad:

```yaml {7}
      - name: test
        type: run
        spec:
          container: redis
          script: |-
            sleep 5
            redis-cli -h localhost ping
```

Good:

```yaml {7}
      - name: test
        type: run
        spec:
          container: redis
          script: |-
            sleep 5
            redis-cli -h redis ping
```