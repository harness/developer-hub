---
sidebar_position: 1
description: Create a Pipeline for a Haskell codebase.
---

# Haskell

This guide covers configuring continuous integration pipelines for Haskell projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `cabal` commands. These commands are executed inside the Haskell Docker container, downloaded at runtime from DockerHub.

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
          container: haskell
          script: |-
            cabal install --only-dependencies --enable-tests
            cabal configure --enable-tests
            cabal build
            cabal test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official Haskell [images](https://hub.docker.com/r/_/haskell/), or your can bring your own.

## Test Multiple Versions

You can configure multiple, containerized steps to test against multiple versions of Haskell.

```yaml {10,20} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test 8
        type: run
        spec:
          container: haskell:8
          script: |-
            cabal install --only-dependencies --enable-tests
            cabal configure --enable-tests
            cabal build
            cabal test

      - name: test 7
        type: run
        spec:
          container: haskell:7
          script: |-
            cabal install --only-dependencies --enable-tests
            cabal configure --enable-tests
            cabal build
            cabal test
```