---
title: Run tests in CI pipelines
description: Use Run and Run Tests steps to run tests in CI pipelines.
sidebar_position: 10
---

You can run all types of tests in CI pipeline, including integration tests, functional tests, mutation tests, unit tests, and more.

To run tests in CI pipelines, you can use **Run** or **Run Tests** steps.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="run" label="Run step" default>
```

You can run any type of test for any codebase in a [Run step](../run-ci-scripts/run-step-settings.md).

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

For more information about configuring **Run** steps, go to [Use Run steps](../run-ci-scripts/run-step-settings.md).

```mdx-code-block
  </TabItem>
  <TabItem value="runtests" label="Run Tests step">
```

The **Run Tests** step is required to [enable Test Intelligence](./set-up-test-intelligence.md). You can use **Run Tests** steps with or without Test Intelligence; however, this step requires that you use a [supported codebase](./set-up-test-intelligence.md#supported-codebases).

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

For more information about configuring **Run Tests** steps and Test Intelligence, go to [Enable Test Intelligence](./set-up-test-intelligence.md).

```mdx-code-block
  </TabItem>
</Tabs>
```

:::tip

You can [include code coverage](./code-coverage.md) commands in your **Run** and **Run Tests** steps.

:::

## Improve test times

These Harness CI features can improve test times:

* **Test Intelligence:** Test Intelligence speeds up your test cycles by running only the unit tests required to confirm the quality of the code changes that triggered a build. You must use the **Run Tests** step to [enable Test Intelligence](./set-up-test-intelligence.md).
* **Parallelism:** You can use parallelism with either the **Run** or **Run Tests** steps to speed up test times. For more information, go to [Speed Up CI Test Pipelines Using Parallelism](/docs/platform/pipelines/speed-up-ci-test-pipelines-using-parallelism/).
* **Step groups:** You can use [step groups](../optimize-and-more/group-ci-steps-using-step-groups.md) to organize and condense pipelines that run a lot of tests.

You might also try these test optimization practices:

* Use mock services in your unit tests, rather than setting up and connecting to third-party services. Mockups can often test your code as well as fully-running services but with fewer resources.
* Avoid integration tests in your build pipelines when possible. You might want to move these to a separate Pipeline.
* Look for obsolete tests that you can delete.
* Look for unnecessary `sleep` statements in your unit test code.
* Order your tests so that the tests most likely to fail come first.

## Test results

You can [view test results](./viewing-tests.md) in Harness.
