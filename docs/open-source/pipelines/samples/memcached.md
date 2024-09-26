---
sidebar_position: 1
description: Create a Pipeline with a Memcached service dependency. 
---

# Memcached

This guide covers configuring continuous integration pipelines for projects that have a Memcached dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches Memcached as a background step. The memecache server will be available at `cache:11211`, where the hostname matches the background step name.


```yaml {7-12} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: cache
        type: background
        spec:
          container: memcached:alpine
          args:
          - -vv

      - name: test
        type: run
        spec:
          container: ubuntu
          script: |-
            apt-get update -qq
            apt-get install -y -qq telnet > /dev/null
            (sleep 1; echo "stats"; sleep 2; echo "quit";) | telnet cache 11211 || true
```