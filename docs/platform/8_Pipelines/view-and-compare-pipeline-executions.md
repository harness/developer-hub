---
title: View and Compare Pipeline Executions
description: view and compare the Harness Pipeline YAML used for each Pipeline execution
# sidebar_position: 2
helpdocs_topic_id: n39cwsfvmj
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

You can view and compare the compiled Harness Pipeline YAML used for each Pipeline execution.

Comparing Pipeline YAML helps you see what changes took place between executions. This can help with troubleshooting execution failures.

### Before you begin

* [CD Pipeline Basics](https://docs.harness.io/article/cqgeblt4uh-cd-pipeline-basics)
* [CI Pipeline Basics](../../continuous-integration/ci-quickstarts/ci-pipeline-basics.md)

### Limitations

* You can only compare YAML from two executions at a time.

### Visual Summary

You can compare Pipeline executions by selecting **Compare YAML**, selecting executions, and clicking **Compare**.

![](./static/view-and-compare-pipeline-executions-13.png)
A diff of the Pipeline YAML for each execution is displayed:

![](./static/view-and-compare-pipeline-executions-14.png)
### Option: View Compiled Execution YAML

Compiled execution YAML is the Pipeline YAML used in the execution, including all resolved [Runtime Inputs, Expressions](../20_References/runtime-inputs.md), and [variables](../12_Variables-and-Expressions/harness-variables.md).

In a Pipeline, click **Execution History**.

![](./static/view-and-compare-pipeline-executions-15.png)
Pick an execution, click more options (⋮), and then click **View Compiled YAML**.

![](./static/view-and-compare-pipeline-executions-16.png)
The YAML for the Pipeline used in that execution is displayed.

![](./static/view-and-compare-pipeline-executions-17.png)
### Option: Compare Execution YAML

You can compare the compiled execution YAML of two executions. This comparison can help you see what changed between executions. 

In a Pipeline, click **Execution History**.

![](./static/view-and-compare-pipeline-executions-18.png)
Select **Compare YAML**, select two executions, and click **Compare**.

![](./static/view-and-compare-pipeline-executions-19.png)
A diff of the Pipeline YAML for the two executions is displayed:

![](./static/view-and-compare-pipeline-executions-20.png)
The diff can help you quickly see changes and troubleshoot a failed execution.

### See also

* [Pipelines and Stages How-tos](https://docs.harness.io/category/pipelines)

