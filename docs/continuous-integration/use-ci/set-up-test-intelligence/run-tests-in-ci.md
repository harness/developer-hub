---
title: Run tests in CI pipelines
description: Use Run and Run Tests steps to run tests in CI pipelines.
sidebar_position: 10
---

In a CI pipeline, you can run a variety of tests, such as integration tests, functional tests, and unit tests.

## Run tests in a CI pipeline

To run tests in CI pipelines, you can use [Run steps](../run-ci-scripts/run-a-script-in-a-ci-stage.md) or a [Run Tests steps](./configure-run-tests-step-settings.md). The major difference between these two options is that you must use the **Run Tests** step if you want to [enable Test Intelligence](./set-up-test-intelligence.md).

You can also include [code coverage](./code-coverage.md) commands in these steps.

## Improve test times

These Harness CI features can improve test times:

* **Test Intelligence:** [Test Intelligence](../../ci-quickstarts/test-intelligence-concepts.md) speeds up your test cycles by running only the unit tests required to confirm the quality of the code changes that triggered a build. You must use the **Run Tests** step to [enable Test Intelligence](./set-up-test-intelligence.md).
* **Parallelism:** You can use parallelism with either the **Run** or **Run Tests** steps to speed up test times. For more information, go to [Speed Up CI Test Pipelines Using Parallelism](/docs/platform/pipelines/speed-up-ci-test-pipelines-using-parallelism/).
* **Step groups:** You can use [step groups](../optimize-and-more/group-ci-steps-using-step-groups.md) to organize and condense pipelines that run a lot of tests.

You might also try these test optimization practices:

* Use mock services in your unit tests, rather than setting up and connecting to third-party services. Mockups can often test your code as well as fully-running services but with fewer resources.
* Avoid integration tests in your build pipelines when possible. You might want to move these to a separate Pipeline.
* Look for obsolete tests that you can delete.
* Look for unnecessary `sleep` statements in your unit test code.
* Order your tests so that the tests most likely to fail come first.

## Test results

After a pipeline that includes tests runs, you can [view the test results](./viewing-tests.md) in Harness.
