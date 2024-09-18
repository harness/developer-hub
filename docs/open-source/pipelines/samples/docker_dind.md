---
sidebar_position: 1
title: Docker (dind)
description: Create a Pipeline with a Docker-in-Docker dependency.
---

# Docker-in-Docker

This guide covers configuring continuous integration pipelines for projects that have a Docker dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches a Docker service container (Docker-in-Docker). The service container is run in privileged mode.

```yaml {} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      volumes:
      - name: dockersock
        spec: {}
        type: temp
      steps:
      - name: dind
        type: background
        spec:
          container:
            image: docker:dind
            privileged: true
          mount:
          - name: dockersock
            path: /var/run
  
      - name: test
        type: run
        spec:
          container: docker:dind
          mount:
          - name: dockersock
            path: /var/run
          script: |-
            sleep 5
            docker ps -a
```