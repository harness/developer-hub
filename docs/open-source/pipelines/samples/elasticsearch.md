---
sidebar_position: 1
description: Create a Pipeline with an Elastic Search dependency.
---

# Elasticsearch

This guide covers configuring continuous integration pipelines for projects that have a Elasticsearch dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches Elasticsearch as a background step. The elastic server will be available at `database:9200`, where the hostname matches the background step name.


```yaml {7-12} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: database
        type: background
        spec:
          container: elasticsearch:7.17.12
          envs:
            discovery.type: single-node

      - name: test
        type: run
        spec:
          container: alpine
          script: |-
            apk add curl
            sleep 45
            curl http://database:9200
```

## Common Problems

### Initialization

If you are unable to connect to the Elastic container please make sure you
are giving the instance adequate time to initialize and begin accepting
connections.

```yaml {13} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test
        type: script
        spec:
          image: alpine
          run: |-
            apk add curl
            sleep 45
            curl http://database:9200
```

### Incorrect Hostname

You cannot use `127.0.0.1` or `localhost` to connect with the database. If you are unable to connect to the database please verify you are using the correct hostname, corresponding with the name of the container. 

Bad:

```yaml {21} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: database
        type: background
        spec:
          image: elasticsearch:7.17.12
          envs:
            discovery.type: single-node

      - name: test
        type: script
        spec:
          image: alpine
          run: |-
            apk add curl
            sleep 45
            curl http://localhost:9200
```

Good:

```yaml {21} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: database
        type: background
        spec:
          image: elasticsearch:7.17.12
          envs:
            discovery.type: single-node

      - name: test
        type: script
        spec:
          image: alpine
          run: |-
            apk add curl
            sleep 45
            curl http://database:9200
```