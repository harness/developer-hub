---
sidebar_position: 1
description: Create a Pipeline for a Ruby codebase.
---

# Ruby

This guide covers configuring continuous integration pipelines for Ruby projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `bundle install` and `rake` commands. These commands are executed inside the ruby Docker container, downloaded at runtime from DockerHub.

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
          container: ruby
          script: |-
            bundle install --jobs=3 --retry=3
            rake
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official ruby [images](https://hub.docker.com/r/_/ruby/), or your can bring your own.

## Test Multiple Versions

You can configure multiple, containerized steps to test against multiple versions of Ruby.

```yaml {10,18} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test 2.4
        type: run
        spec:
          container: ruby:2.4
          script: |-
            bundle install --jobs=3 --retry=3
            rake

      - name: test 2.3
        type: run
        spec:
          container: ruby:2.3
          script: |-
            bundle install --jobs=3 --retry=3
            rake
```