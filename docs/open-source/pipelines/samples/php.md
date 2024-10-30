---
sidebar_position: 1
description: Create a Pipeline for a PHP codebase.
---

# PHP

This guide covers configuring continuous integration pipelines for PHP projects.

## Build and Test

In the below example we demonstrate a pipeline that installs the project dependnecies using composer, and then executes the project unit tests. These commands are executed inside a Docker container, downloaded at runtime from DockerHub.

```yaml {} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: install
        type: run
        spec:
          container: composer
          script: composer install

      - name: test
        type: run
        spec:
          container: php:7
          script: vendor/bin/phpunit --configuration config.xml
```

This example assumes phpunit is a dev dependency in `composer.json`

```json
{
    "require-dev": {
        "phpunit/phpunit": "3.7.*"
    }
}
```

Please note you can use any Docker image in your pipeline from any Docker registry. You can use the official [php](https://hub.docker.com/r/_/php/) or [composer](https://hub.docker.com/r/_/composer/) images, or your can bring your own.
