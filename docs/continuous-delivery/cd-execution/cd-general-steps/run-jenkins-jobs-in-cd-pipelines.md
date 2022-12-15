---
title: Run Jenkins Jobs in CD Pipelines
description: This topic shows you how to run Jenkins jobs in CD stages.
sidebar_position: 3
helpdocs_topic_id: as4dtppasg
helpdocs_category_id: y6gyszr0kl
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to use the Jenkins step in a Harness CD Pipeline.

Continuous Integration (CI) can be performed in Harness using the module and [CI Pipelines](../../../continuous-integration/ci-quickstarts/ci-pipeline-basics.md).

If you are using Harness Continuous Delivery (CD) but not Harness Continuous Integration (CI), you can still perform CI using the Jenkins step in your CD Stage.

Harness integrates with [Jenkins](https://jenkins.io/), enabling you to run Jenkins jobs and dynamically capture inputs and outputs from the jobs. 

## Before You Begin

* [CD Pipeline Basics](../../onboard-cd/cd-concepts/cd-pipeline-basics.md)

## Supported Platforms and Technologies

See [Supported Platforms and Technologies](../../../first-gen/starthere-firstgen/supported-platforms.md).

## Limitations and Requirements

* **EnvInject Plugin:** For Harness to capture Jenkins environment variables, your Jenkins configuration requires the [EnvInject Plugin](https://wiki.jenkins.io/display/JENKINS/EnvInject+Plugin). The plugin does not provide full compatibility with the Pipeline Plugin. See [Known limitations](https://plugins.jenkins.io/envinject) from Jenkins.
* **CD and Custom stage types only:** the Jenkins step is available in CD (Deploy) and Custom stages only.

## Review: Jenkins Integration

With the **Jenkins** step, you can execute Jenkins jobs in the Stage's shell session.

When executing a job, you can also *dynamically capture* the output from the job, using runtime variables based on the context. You can then use those variables in another step in the same or other Stage or Pipeline.

### What Information is Available to Capture?

Any Jenkins job information in the particular shell session of the Pipeline can be captured and output using one or more Jenkins steps. In addition, you can capture information available using the built-in Harness variables. For more information, see [Built-in and Custom Harness Variables Reference](../../../platform/12_Variables-and-Expressions/harness-variables.md).

Capturing and exporting output in the Jenkins step can be very powerful. For example, a Jenkins step could capture Jenkins build information, and a Harness Service could echo the build information and use it in a complex function, and then export the output down the Pipeline for further evaluation.

## Step 1: Add the Jenkins Step

This step assumes you have a created a Pipeline and CD stage. If you are new to stages, see [Add a Stage](../../../platform/8_Pipelines/add-a-stage.md).

In your CD Stage's **Execution**, click **Add Step**, and then click **Jenkins**.

## Step 2: Jenkins Connector

Select the Jenkins server you added as a Harness Jenkins Connector. For more information, see [Connect to Jenkins](../../../platform/7_Connectors/connect-to-jenkins.md).

## Step 3: Job Name

Select the Jenkins job (also called a project) to execute. The list is automatically populated using the Jenkins Server you set up in the Jenkins Connector you selected.

## Option: Use Runtime Inputs and Expressions

You can use Runtime Inputs or Expressions for the Jenkins Connector and Job Name.

See [Fixed Values, Runtime Inputs, and Expressions](../../../platform/20_References/runtime-inputs.md).

## Option: Job Parameters

If you are using a [parameterized build](https://wiki.jenkins.io/display/JENKINS/Parameterized+Build), when you select the job in **Job Name**, Harness will automatically populate any Job parameters from the server.

![](./static/run-jenkins-jobs-in-cd-pipelines-30.png)

You can also add parameters manually by clicking **Add Job Parameter**.

Runtime Inputs and Expressions are supported for the **Value** only.You can reference a Job parameter from the Input tab of the executed step.


| **Job Parameters from Jenkins Step** | **Executed Jenkins step Inputs** |
| --- | --- |
| ![](static/jenkinsparamfromjenkins.png) | ![](static/xecutedjenkinsinputs.png) |

## Option: Treat Unstable Jenkins Status as Success

If this setting is enabled then `Unstable` statuses will be considered as `Success`.

## Option: Advanced Settings

In **Advanced**, you can use the following options:

* [Step Skip Condition Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
* [Select Delegates with Selectors](../../../platform/2_Delegates/delegate-guide/select-delegates-with-selectors.md)

## Review: Captured Environment Variables from Jenkins Builds

For Harness to capture Jenkins environment variables, your Jenkins configuration requires the [EnvInject Plugin](https://wiki.jenkins.io/display/JENKINS/EnvInject+Plugin). The plugin does not provide full compatibility with the Pipeline Plugin. See [Known Incompatibilities](https://wiki.jenkins.io/display/JENKINS/EnvInject+Plugin#EnvInjectPlugin-Knownincompatibilities) from Jenkins.Harness captures certain environment variables from the Jenkins build.

The following list shows the environment variables and the expressions you can use to reference them:

* **Job Status:** `<+pipeline.stages.<stage Id>.spec.execution.steps.<step Id>.build.executionStatus>`
* **Job URL:** `<+pipeline.stages.<stage Id>.spec.execution.steps.<step Id>.build.jobUrl>`
* **Build number:** `<+pipeline.stages.<stage Id>.spec.execution.steps.<step Id>.build.buildNumber>`
* **Build display name:** `<+pipeline.stages.<stage Id>.spec.execution.steps.<step Id>.build.buildDisplayName>`
* **Full build display name:** `<+pipeline.stages.<stage Id>.spec.execution.steps.<step Id>.build.buildFullDisplayName>`

You can reference this Job information is subsequent steps in your Pipeline or another Pipeline.

## Review: Multibranch Pipeline Support

For Harness to capture Jenkins environment variables, your Jenkins configuration requires the [EnvInject Plugin](https://wiki.jenkins.io/display/JENKINS/EnvInject+Plugin). The plugin does not provide full compatibility with the Pipeline Plugin. See [Known Incompatibilities](https://wiki.jenkins.io/display/JENKINS/EnvInject+Plugin#EnvInjectPlugin-Knownincompatibilities) from Jenkins.The Jenkins Multibranch Pipeline (Workflow Multibranch) feature enables you to automatically create a Jenkins pipeline for each branch on your source control repo.

Each branch has its own [Jenkinsfile](https://jenkins.io/doc/book/pipeline/jenkinsfile/), which can be changed independently. This features enables you to handle branches better by automatically grouping builds from feature/experimental branches.

In **Job Name**, multibranch pipelines are displayed alongside other Jobs, with the child branches as subordinate options.

Click **>** and select the branch.

## Review: Output Expressions

You can copy expressions for the Job outputs from the Output tab of the Jenkins step:

![](./static/run-jenkins-jobs-in-cd-pipelines-31.png)