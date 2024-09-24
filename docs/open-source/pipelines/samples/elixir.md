---
sidebar_position: 1
description: Create a Pipeline for an Elixir codebase.
---

# Elixir

This guide covers configuring continuous integration pipelines for Elixir projects.

## Build and Test

In the below example we demonstrate a pipeline that executes a series of `mix` commands. These commands are executed inside the Elixir Docker container, downloaded at runtime from DockerHub.

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
          container: elixir:1.5
          script: |-
            mix local.rebar --force
            mix local.hex --force
            mix deps.get
            mix test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official Elixir [images](https://hub.docker.com/r/_/elixir/), or your can bring your own.

## Test Multiple Versions

You can configure multiple, containerized steps to test against multiple versions of Elixir.

```yaml {10,20} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test 1.5
        type: run
        spec:
          container: elixir:1.5
          script: |-
            mix local.rebar --force
            mix local.hex --force
            mix deps.get
            mix test

      - name: test 1.4
        type: run
        spec:
          container: elixir:1.4
          script: |-
            mix local.rebar --force
            mix local.hex --force
            mix deps.get
            mix test
```