---
sidebar_position: 1
description: Create a Pipeline for a Perl codebase.
---

# Perl

This guide covers configuring continuous integration pipelines for Perl projects.

## Build and Test

In the below example we demonstrate a pipeline that installs the project dependnecies using `cpanm`, and then executes the project unit tests. These commands are executed inside a Docker container, downloaded at runtime from DockerHub.

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
          container: perl
          script: |-
            cpanm --quiet --installdeps --notest .
            perl Build.PL
            ./Build test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official perl [images](https://hub.docker.com/r/_/perl/), or your can bring your own.