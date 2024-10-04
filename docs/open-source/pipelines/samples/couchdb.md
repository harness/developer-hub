---
sidebar_position: 1
description: Create a Pipeline with a CouchDB dependency.
---

# CouchDB

This guide covers configuring continuous integration pipelines for projects that have a CouchDB dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches CouchDB as a background step. The database server will be available at `database:5984`, where the hostname matches the background step name.

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
          container: couchdb:3.3.2
          envs:
            COUCHDB_USER: admin
            COUCHDB_PASSWORD: password

      - name: test
        type: run
        spec:
          container: couchdb:3.3.2
          script: |-
            sleep 15
            curl http://database:5984
```

# Common Problems

## Initialization

If you are unable to connect to the CouchDB container please make sure you
are giving the instance adequate time to initialize and begin accepting
connections.

```yaml {6}
      - name: test
        type: script
        spec:
          image: couchdb:3.3.2
          run: |-
            sleep 15
            curl http://database:5984
```

## Incorrect Hostname

You cannot use `127.0.0.1` or `localhost` to connect with the database. If
you are unable to connect to the database please verify you are using the
correct hostname, corresponding with the name of the container. 

Bad:

```yaml {7}
      - name: test
        type: script
        spec:
          image: couchdb:3.3.2
          run: |-
            sleep 15
            curl http://localhost:5984
```

Good:

```yaml {7}
      - name: test
        type: script
        spec:
          image: couchdb:3.3.2
          run: |-
            sleep 15
            curl http://database:5984
```