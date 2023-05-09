---
title: View tests
description: View the results from CI tests.
sidebar_position: 40
helpdocs_topic_id: sof7n3qjap
helpdocs_category_id: flam7377aq
helpdocs_is_private: false
helpdocs_is_published: true
---

Your pipelines can run tests in **Run** and **Run Tests** steps.

To publish test results, set the **Report Paths** setting in the relevant [Run](../run-ci-scripts/run-step-settings.md) or [Run Tests](./configure-run-tests-step-settings.md) step.

If the [test reports are in JUnit XML format](./test-report-ref.md), you can review test reports on the **Tests** tab on the [Build details page](../viewing-builds.md).

![](./static/viewing-tests-533.png)

If you [enabled Test Intelligence](./set-up-test-intelligence.md) for your unit tests, the **Tests** tab contains information unique to Test Intelligence.

You can also publish reports to the **Artifacts** tab. For example, you can [Publish an Allure Report to the Artifacts tab](/tutorials/ci-pipelines/test/allure-report).

## Troubleshooting: Test suites incorrectly parsed

The parsed test report in the **Tests** tab comes strictly from the provided test reports. Test reports must be in JUnit XML format to appear on the **Tests** tab, because Harness parses test reports that are in JUnit XML format only. It is important to adhere to the standard [JUnit format](https://llg.cubic.org/docs/junit/) to improve test suite parsing. For more information, go to [Format test reports](./test-report-ref.md). <!-- update link based on final page title -->
