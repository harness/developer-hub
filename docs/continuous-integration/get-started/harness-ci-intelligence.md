---
title: Harness CI Intelligence
description: Harness CI Intelligence leverages a suite of CI features to optimize your builds.
sidebar_position: 3
---

Harness CI Intelligence features are designed to smartly speed up builds and boost efficiency.

## Cache Intelligence

Modern continuous integration systems execute pipelines inside ephemeral environments that are provisioned solely for pipeline execution and are not reused from prior pipeline runs. As builds often require downloading and installing many library and software dependencies, caching these dependencies for quick retrieval at runtime can save a significant amount of time.

There are several ways to configure caching in Harness CI, such as Cache Intelligence, Save and Restore Cache steps, and mounting volumes. Save and Restore Cache steps and mounted volumes require you to manage the cache.

With [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence.md), Harness automatically caches and restores common dependencies. Cache Intelligence doesn't require you to bring your own storage, because the cache is stored in the Harness-managed environment, Harness Cloud.

## Test Intelligence

Testing is an important part of Continuous Integration (CI). Testing safeguards the quality of your product before shipping. However, test cycles often involve many tests, and it can take a significant amount of time for the tests to run. Additionally, the tests that run might be irrelevant to the code changes that triggered the build.

Harness Test Intelligence (TI) helps your test cycle move faster without compromising quality. TI can dramatically improve test times by running only the unit tests required to confirm the quality of the code changes that triggered the build. Instead of always running all unit tests, TI selects a subset of unit tests and skips the rest. Harness TI can also automatically split tests to run them in parallel.

Test Intelligence gives you full visibility into which tests were selected and why. This can help you identify negative trends and gain insights to improve test quality and coverage. Using TI doesn't require you to change build and test processes.

To learn more about the Test Intelligence architecture, how it works, and how to enable it, go to [Test Intelligence overview](/docs/continuous-integration/use-ci/run-tests/test-intelligence/set-up-test-intelligence.md).

While Test Intelligence is only for unit tests, you can [run a variety of tests in your CI pipelines](/docs/continuous-integration/use-ci/run-tests/run-tests-in-ci.md).

### Time and cost savings with Test Intelligence

We ran Test Intelligence on our biggest repository, Harness-Core. Here's what we achieved:

- PRs checked: 3000
- Average UT time without TI: 75 minutes
- Average UT time with TI: 25 minutes

Here's how Harness Test Intelligence performed with some popular open-source repositories:

| **Project name**     | **Average test run time without TI** | **Average test run time with TI** |
| -------------------- | ------------------------------------ | --------------------------------- |
| Harness-Core         | 75 mins                              | 25 mins                           |
| Incubator Pinot      | 338 mins                             | 228 mins                          |
| Hudi                 | 58 mins                              | 43 mins                           |
| RocketMQ             | 4.6 mins                             | 3.1 mins                          |
| Spring Cloud Alibaba | 0.744 mins                           | 0.59 mins                         |
| Incubator Shenyu     | 1.16 min                             | 0.4 min                           |
| Sentinel             | 1.90 min                             | 1 min                             |

## Harness-managed Docker layer caching

With [Docker layer caching with Harness Cloud](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching.md), Harness can manage the Docker layer cache backend for you without relying on your Docker registry. This ensures that layers are always pulled from the fastest available source.

<!-- ## Build Intelligence -->

<!-- Build Cache feature. Caches outputs (like artifacts) rather than inputs (like Cache Intelligence) or image layers (like DLC). -->
