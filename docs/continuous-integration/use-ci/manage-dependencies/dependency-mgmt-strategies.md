---
title: Dependency management strategies
description: Learn how you can manage dependencies in Harness CI pipelines.
sidebar_position: 10
---

You can use [Background steps](./background-step-settings) to maintain long-running services over the duration of a stage. For example:

* [Run Sauce Connect Proxy as a Background step](/tutorials/ci-pipelines/test/saucelabs-proxy)
* [Run LocalStack as a Background step](/tutorials/ci-pipelines/test/localstack)
* [Run multiple PostgreSQL instances in Background steps](./multiple-postgres.md)
* [Run Docker-in-Docker in a Kubernetes cluster build infrastructure](../run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md)

You can also manage dependencies through [caching and shared volumes](../caching-ci-data/share-ci-data-across-steps-and-stages.md), or by installing dependencies in [Run steps](../run-ci-scripts/run-step-settings.md).
