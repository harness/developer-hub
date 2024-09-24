---
sidebar_position: 1
description: Create a Pipeline for a MongoDB service dependency.
---

# MongoDB

This guide covers configuring continuous integration pipelines for projects that have a MongoDB dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches Mongo as a background step. The database server will be available at `mongo:27017`, where the hostname matches the background step name.

```yaml {7-10} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: mongo
        type: background
        spec:
          container: mongo:4

      - name: ping
        type: run
        spec:
          container: mongo:4
          script: |-
            sleep 5
            mongo --host mongo --eval "db.version()"
```

## Common Problems

### Initialization

If you are unable to connect to the Mongo container please make sure you
are giving the instance adequate time to initialize and begin accepting
connections.

```yaml {6}
      - name: ping
        type: run
        spec:
          container: mongo:4
          script: |-
            sleep 5
            mongo --host mongo --eval "db.version()"
```

### Incorrect Hostname

You cannot use `127.0.0.1` or `localhost` to connect with the Mongo container. If you are unable to connect to Mongo please verify you are using the correct hostname, corresponding with the name of the container. 

Bad:

```yaml {7}
      - name: ping
        type: run
        spec:
          container: mongo:4
          script: |-
            sleep 5
            mongo --host localhost --eval "db.version()"
```

Good:

```yaml {7}
      - name: ping
        type: run
        spec:
          container: mongo:4
          script: |-
            sleep 5
            mongo --host mongo --eval "db.version()"
```