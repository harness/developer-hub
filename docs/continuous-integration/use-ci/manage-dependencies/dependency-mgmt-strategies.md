---
title: Dependency management strategies
description: Learn how you can manage dependencies in Harness CI pipelines.
sidebar_position: 10
---

Use [Background steps](./background-step-settings) to maintain long-running services over the duration of a stage.

You can run a single instance of a service or multiple instances. For examples of these configurations, go to:

* [Run a Sauce Connect Proxy service](./ci-saucelabs-background-step.md)
* [Run a LocalStack service](./ci-localstack-background-step.md)
* [Run multiple PostgreSQL instances](./multiple-postgres.md)
* [Run Docker-in-Docker in a Kubernetes cluster build infrastructure](./run-docker-in-docker-in-a-ci-stage.md)

Harness recommends [running health checks on background services](./health-check-services.md) so that you can ensure the service is running before attempting to interact with it. This can prevent build failures when steps try to run commands on a service that isn't yet running.

You can also manage dependencies through [caching and shared volumes](../caching-ci-data/share-ci-data-across-steps-and-stages.md) or by installing dependencies in [Run steps](../run-step-settings.md).
