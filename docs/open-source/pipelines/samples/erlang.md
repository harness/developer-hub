---
sidebar_position: 1
description: Create a Pipeline for an Erlang codebase.
---

# Erlang

This guide covers configuring continuous integration pipelines for Erlang projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `rebar` commands. These commands are executed inside the Erlang Docker container, downloaded at runtime from DockerHub.

```yaml {} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test
        type: run
        spec:
          container: erlang:21
          script: |-
            rebar get-deps
            rebar compile
            rebar skip_deps=true eunit
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official Erlang [images](https://hub.docker.com/r/_/erlang/), or your can bring your own.

## Test Multiple Versions

You can configure multiple, containerized steps to test against multiple versions of Erlang.

```yaml {10,19} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test 21
        type: run
        spec:
          container: erlang:21
          script: |-
            rebar get-deps
            rebar compile
            rebar skip_deps=true eunit

      - name: test 20
        type: run
        spec:
          container: erlang:20
          script: |-
            rebar get-deps
            rebar compile
            rebar skip_deps=true eunit
```