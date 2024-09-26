---
sidebar_position: 1
description: Create a Pipeline with a RethinkDB service dependency.
---

# RethinkDB

This guide covers configuring continuous integration pipelines for projects that have a RethinkDB dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches RethinkDB as a background step. The database server will be available at `database:28015`, where the hostname matches the background step name.

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
          container: rethinkdb:2
          args:
          - rethinkdb
          - --bind
          - all

      - name: test
        type: run
        spec:
          container: node:9
          script: |-
            npm install -s -g recli
            recli -h database -j 'r.db("rethinkdb").table("stats")'
```

# Common Problems

## Incorrect Hostname

You cannot use `127.0.0.1` or `localhost` to connect with the database. If you
are unable to connect please verify you are using the correct hostname,
corresponding with the container name. 

Bad:

```yaml {7}
      - name: test
        type: run
        spec:
          container: node:9
          script: |-
            npm install -s -g recli
            recli -h localhost -j 'r.db("rethinkdb").table("stats")'
```

Good:

```yaml {7}
      - name: test
        type: run
        spec:
          container: node:9
          script: |-
            npm install -s -g recli
            recli -h database -j 'r.db("rethinkdb").table("stats")'
```