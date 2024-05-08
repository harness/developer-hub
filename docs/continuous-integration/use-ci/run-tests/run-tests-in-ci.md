---
title: Run tests in CI pipelines
description: Use Run and Run Tests steps to run tests in CI pipelines.
sidebar_position: 10
redirect_from:
  - /docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci
  - /tutorials/ci-pipelines/test/
---

You can run all types of tests in CI pipeline, including integration tests, functional tests, mutation tests, unit tests, and more.

To run tests in CI pipelines, you can use **Run** or **Run Tests** steps.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="run" label="Run step" default>

You can run any type of test for any codebase in a [Run step](../run-step-settings.md).

For example, this step runs `pytest` and produces a test report in JUnit XML format.

```yaml
              - step:
                  type: Run
                  name: Pytest
                  identifier: Pytest
                  spec:
                    shell: Sh
                    command: |-
                      pytest test_main.py --junit-xml=output-test.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - output-test.xml
```

For more information about configuring **Run** steps, go to [Use Run steps](../run-step-settings.md).

:::tip

Harness supports [code coverage](./code-coverage.md) in **Run** steps.

:::

</TabItem>
  <TabItem value="runtests" label="Run Tests step">

The **Run Tests** step is required to [enable Test Intelligence](./test-intelligence/set-up-test-intelligence.md). You can use **Run Tests** steps with or without Test Intelligence; however, the **Run Tests** step is limited to [supported codebases](./test-intelligence/set-up-test-intelligence.md#supported-codebases-for-test-intelligence).

This example runs tests with Maven and Test Intelligence, and it produces a test report in JUnit XML format.

```yaml
              - step:
                  type: RunTests
                  name: runTestsWithIntelligence
                  identifier: runTestsWithIntelligence
                  spec:
                    connectorRef: account.GCR
                    image: maven:3-openjdk-8
                    args: test -Dmaven.test.failure.ignore=true -DfailIfNoTests=false
                    buildTool: Maven
                    language: Java
                    packages: org.apache.dubbo,com.alibaba.dubbo
                    runOnlySelectedTests: true ## Set to false if you don't want to use Test Intelligence.
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "target/surefire-reports/*.xml"
```

For more information about configuring **Run Tests** steps and Test Intelligence, go to [Test Intelligence overview](./test-intelligence/set-up-test-intelligence.md).

</TabItem>
</Tabs>

## Improve test times

These Harness CI features can improve test times:

* **Test Intelligence:** Test Intelligence speeds up your test cycles by running only the unit tests required to confirm the quality of the code changes that triggered a build. You must use the **Run Tests** step to [enable Test Intelligence](./test-intelligence/set-up-test-intelligence.md).
* **Test splitting (parallelism):** You can use parallelism with either the **Run** or **Run Tests** steps to speed up test times. For more information, go to [Split tests in Run steps](./speed-up-ci-test-pipelines-using-parallelism.md) or [Split tests with Test Intelligence](./test-intelligence/ti-test-splitting.md).
* **Step groups:** You can use [step groups](/docs/continuous-integration/use-ci/optimize-and-more/group-ci-steps-using-step-groups.md) to organize and condense pipelines that run a lot of tests.

You might also try these test optimization practices:

* Use mock services in your unit tests, rather than setting up and connecting to third-party services. Mockups can often test your code as well as fully-running services but with fewer resources.
* Avoid integration tests in your build pipelines when possible. You might want to move these to a separate pipeline.
* Look for obsolete tests that you can delete.
* Look for unnecessary `sleep` statements in your unit test code.
* Order your tests so that the tests most likely to fail run first.

## Test results

You can [view test results](./viewing-tests.md) in Harness.

## Troubleshoot tests in Harness CI

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to running tests in Harness CI, including:

* [Test suites incorrectly parsed](/kb/continuous-integration/continuous-integration-faqs/#test-reports-missing-or-test-suites-incorrectly-parsed)
* [Test reports missing](/kb/continuous-integration/continuous-integration-faqs/#test-reports-missing-or-test-suites-incorrectly-parsed)
* [Does Harness support test splitting (parallelism)?](/kb/continuous-integration/continuous-integration-faqs/#does-harness-support-test-splitting-parallelism)
* [How do I use Test Intelligence?](/kb/continuous-integration/continuous-integration-faqs/#how-do-i-use-test-intelligence)
* [Test Intelligence call graph is empty](/kb/continuous-integration/continuous-integration-faqs/#on-the-tests-tab-the-test-intelligence-call-graph-is-empty-and-says-no-call-graph-is-created-when-all-tests-are-run)
