---
sidebar_position: 1
description: Create a Pipeline for a Rust codebase.
---

# Rust

This guide covers configuring continuous integration pipelines for Rust projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `cargo build` and `cargo test` commands. These commands are executed inside the rust Docker container, downloaded at runtime from DockerHub.

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
          container: rust:1.30
          script: |-
            cargo build --verbose --all
            cargo test --verbose --all
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official rust [images](https://hub.docker.com/r/_/rust/), or your can bring your own.

## Test Multiple Versions

You can configure multiple, containerized steps to test against multiple versions of Rust.

```yaml {10,18} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test 1.30
        type: run
        spec:
          container: rust:1.30
          script: |-
            cargo build --verbose --all
            cargo test --verbose --all

      - name: test 1.29
        type: run
        spec:
          container: rust:1.29
          script: |-
            cargo build --verbose --all
            cargo test --verbose --all
```