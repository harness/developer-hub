---
title: View tests
description: Your pipelines can run tests in Run and Run Tests steps.
sidebar_position: 20
helpdocs_topic_id: sof7n3qjap
helpdocs_category_id: flam7377aq
helpdocs_is_private: false
helpdocs_is_published: true
---

Your pipelines can run tests in **Run** and **Run Tests** steps.

To publish test results, set the **Report Paths** setting in the relevant [Run](../../ci-technical-reference/run-step-settings.md) or [Run Tests](../../ci-technical-reference/configure-run-tests-step-settings.md) step.

If the test reports are in JUnit XML format, you can review test reports on the **Tests** tab on the [Build details page](./viewing-builds.md). Test reports must be in JUnit XML format to appear on the **Tests** tab. Harness parses test reports that are in JUnit XML format only.

![](./static/viewing-tests-533.png)

If you use Test Intelligence for your unit tests, the **Tests** tab contains information unique to Test Intelligence. To learn more about the contents of this dashboard with Test Intelligence enabled, go to [Enable Test Intelligence](../set-up-test-intelligence/set-up-test-intelligence.md).