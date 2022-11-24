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

### Before You Begin

* [CD Pipeline Basics](/article/cqgeblt4uh-cd-pipeline-basics)
* [CI Pipeline Basics](/article/3amcd8hn53-ci-pipeline-basics)

### Limitations

* You can only compare YAML from two executions at a time.

### Visual Summary

You can compare Pipeline executions by selecting **Compare YAML**, selecting executions, and clicking **Compare**.

![](https://files.helpdocs.io/i5nl071jo5/articles/n39cwsfvmj/1656109436577/image.png)A diff of the Pipeline YAML for each execution is displayed:

![](https://files.helpdocs.io/i5nl071jo5/articles/n39cwsfvmj/1656109945598/clean-shot-2022-06-24-at-15-31-37-2-x.png)### Option: View Compiled Execution YAML

Compiled execution YAML is the Pipeline YAML used in the execution, including all resolved [Runtime Inputs, Expressions](/article/f6yobn7iq0-runtime-inputs), and [variables](/article/lml71vhsim-harness-variables).

In a Pipeline, click **Execution History**.

![](https://files.helpdocs.io/i5nl071jo5/articles/n39cwsfvmj/1656110122130/clean-shot-2022-06-24-at-15-35-09-2-x.png)Pick an execution, click more options (⋮), and then click **View Compiled YAML**.

![](https://files.helpdocs.io/i5nl071jo5/articles/n39cwsfvmj/1656110213308/clean-shot-2022-06-24-at-15-36-43-2-x.png)The YAML for the Pipeline used in that execution is displayed.

![](https://files.helpdocs.io/i5nl071jo5/articles/n39cwsfvmj/1656110330121/clean-shot-2022-06-24-at-15-38-37-2-x.png)### Option: Compare Execution YAML

You can compare the compiled execution YAML of two executions. This comparison can help you see what changed between executions. 

In a Pipeline, click **Execution History**.

![](https://files.helpdocs.io/i5nl071jo5/articles/n39cwsfvmj/1656110122130/clean-shot-2022-06-24-at-15-35-09-2-x.png)Select **Compare YAML**, select two executions, and click **Compare**.

![](https://files.helpdocs.io/i5nl071jo5/articles/n39cwsfvmj/1656109436577/image.png)A diff of the Pipeline YAML for the two executions is displayed:

![](https://files.helpdocs.io/i5nl071jo5/articles/n39cwsfvmj/1656109945598/clean-shot-2022-06-24-at-15-31-37-2-x.png)The diff can help you quickly see changes and troubleshoot a failed execution.

### See Also

* [Pipelines and Stages How-tos](/category/kncngmy17o)

