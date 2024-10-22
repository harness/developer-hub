---
sidebar_position: 1
description: Create a Pipeline with a NATS service dependency.
---

# Nats

This guide covers configuring continuous integration pipelines for projects that have a Nats dependency.

## Basic Example

In the below example we demonstrate a pipeline that launches Nats as a background step. The nats service will be available at `nats:4222`, where the hostname matches the background step name.

```yaml {} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: nats
        type: background
        spec:
          container: nats:1.3.0
        
      - name: test
        type: run
        spec:
          container: ruby:2
          script: |-
            gem install nats
            nats-pub -s tcp://nats:4222 greeting 'hello'
            nats-pub -s tcp://nats:4222 greeting 'world' 
```