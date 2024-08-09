---
title: Run tests in CI pipelines
description: Use Run and Test steps to run tests in CI pipelines.
sidebar_position: 1
redirect_from:
  - /docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci
  - /tutorials/ci-pipelines/test/
---

You can run all types of tests in CI pipeline, including integration tests, functional tests, mutation tests, unit tests, and more.

To run tests in CI pipelines, you can use **Run** steps or **Test Intelligence** steps (also known as **Test** steps).

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
  <TabItem value="test" label="Test step">

The **Test** step is required to [enable Test Intelligence](./ti-overview.md). You can use **Test** steps with or without Test Intelligence; however, the **Test** step doesn't support all languages yet.

This example runs tests with Maven and Test Intelligence, and it produces a test report in JUnit XML format.

```yaml
              - step:
                  type: Test
                  name: RunTestsWithIntelligence
                  identifier: RunTestsWithIntelligence
                  spec:
                    command: |-
                      mvn test -Dmaven.test.failure.ignore=true -DfailIfNoTests=false
                      mvn package -DskipTests
                    shell: Sh
                    connectorRef: account.harnessImage
                    image: maven:3.8-jdk-11
                    intelligenceMode: true
                    reports:
                      - "target/surefire-reports/*.xml"
```

For more information about configuring **Test** steps and Test Intelligence, go to [Test Intelligence overview](./ti-overview.md).

</TabItem>
</Tabs>

## Improve test times

These Harness CI features can improve test times:

* **Test Intelligence:** Test Intelligence speeds up your test cycles by running only the unit tests required to confirm the quality of the code changes that triggered a build. You must [use the **Test** step to enable Test Intelligence](./tests-v2.md).
* **Test splitting (parallelism):** You can use parallelism with either the **Run** or **Test** steps to speed up test times. For more information, go to [Split tests in Run steps](./speed-up-ci-test-pipelines-using-parallelism.md) or [Split tests in Test steps](/docs/continuous-integration/use-ci/run-tests/tests-v2.md#parallelism-test-splitting).
* **Step groups:** You can [use step groups](/docs/platform/pipelines/use-step-groups.md) to organize and condense pipelines that run a lot of tests.

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
