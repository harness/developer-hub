---
title: Run tests in CI pipelines
description: Use Run and Run Tests steps to run tests in CI pipelines.
sidebar_position: 10
---

In a CI pipeline, you can run a variety of tests, such as integration tests, functional tests, and unit tests. To do this, you can use a a [Run step](../run-ci-scripts/run-a-script-in-a-ci-stage.md) or a [Run Tests step](../../ci-technical-reference/configure-run-tests-step-settings.md). After a pipeline that includes tests runs, you can [view the test results](./viewing-tests.md).

## Improve test times

Harness CI includes features that you can use to improve test times.

### Test Intelligence

[Test Intelligence](test-intelligence-concepts.md) speeds up your test cycles by running only the unit tests required to confirm the quality of the code changes that triggered a build. You must use the **Run Tests** step to [enable Test Intelligence](../use-ci/set-up-test-intelligence/set-up-test-intelligence.md).

### Parallelism

You can use parallelism with either the **Run** or **Run Tests** steps to speed up test times. For more information, go to [Speed Up CI Test Pipelines Using Parallelism](/docs/platform/pipelines/speed-up-ci-test-pipelines-using-parallelism/).

### Grouping

You can use [step groups](../optimize-and-more/group-ci-steps-using-step-groups.md) to organize and condense pipelines that run a lot of tests.
