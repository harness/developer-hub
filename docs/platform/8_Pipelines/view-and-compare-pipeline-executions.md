---
title: View and compare pipeline executions
description: View and compare the YAML used for pipeline executions.
sidebar_position: 9
helpdocs_topic_id: n39cwsfvmj
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

You can view the compiled Harness pipeline YAML used for your pipeline execution. You can also compare two executions. Comparing pipeline YAML helps you understand the changes that occurred between executions, which can help with troubleshooting.

This topic assumes you're familiar with [CD pipeline basics](/docs/continuous-delivery/get-started/cd-pipeline-basics) and/or [CI pipeline basics](../../continuous-integration/ci-quickstarts/ci-pipeline-basics.md).

## View compiled YAML

A pipeline's compiled execution YAML is the YAML used in for execution, including all resolved [runtime inputs, expressions](../20_References/runtime-inputs.md), and [variables](../12_Variables-and-Expressions/harness-variables.md).

To view compiled YAML:

1. Go to your pipeline and select **Execution History**.

   ![](./static/view-and-compare-pipeline-executions-15.png)

2. Locate the execution that you want to inspect, select **More Options** (&vellip;), and then select **View Compiled YAML**.

   ![](./static/view-and-compare-pipeline-executions-16.png)

Harness shows the compiled pipeline YAML for that execution.

![](./static/view-and-compare-pipeline-executions-17.png)

## Compare executions

You can compare the compiled execution YAML for two executions. This comparison can help you see what changed between executions.

1. Go to your pipeline, select **Execution History**, select **More Options** (&vellip;), and then select **Compare YAML** or **Compare Pipeline Executions**.
2. The execution where you selected **More Options** is automatically selected. If you don't want to compare this execution, deselect it and select a different execution.
3. Select another execution that you want to compare.
4. Select **Compare**.

![](./static/view-and-compare-pipeline-executions-13.png)

Harness produces a diff of the pipeline YAML for the two executions. This diff helps you identify the changes between executions, and it can help with troubleshooting.

![](./static/view-and-compare-pipeline-executions-14.png)

## See also

* [View CI builds](/docs/continuous-integration/use-ci/viewing-builds.md)
* [View test results in CI](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests.md)
