---
title: View tests
description: Your pipelines can run tests in **Run** and **Run Tests** steps.
sidebar_position: 10
helpdocs_topic_id: sof7n3qjap
helpdocs_category_id: flam7377aq
helpdocs_is_private: false
helpdocs_is_published: true
---

Your pipelines can run tests in **Run** and **Run Tests** steps.

To publish test results, set the **Report Paths** setting in the relevant [Run](../../ci-technical-reference/run-step-settings.md) or [Run Tests](../../ci-technical-reference/configure-run-tests-step-settings.md) step.

To view test reports for builds that include tests, go to the **Tests** tab on the build details page. In order for the **Tests** tab to show results, your test reports must be in JUnit XML format. Harness parses test reports that are in JUnit XML format only.

![](./static/viewing-tests-533.png)

For details about the contents of this dashboard with Test Intelligence enabled, go to [Enable Test Intelligence](../set-up-test-intelligence/set-up-test-intelligence.md).