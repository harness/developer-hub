---
title: Upload Artifacts to JFrog
description: Add a step to upload artifacts to JFrog.

sidebar_position: 70
helpdocs_topic_id: lh082yv36h
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use the **upload Artifacts to JFrog Artifactory** step in your CI pipelines to upload artifacts to [JFrog Artifactory](https://www.jfrog.com/confluence/display/JFROG/JFrog+Artifactory). Harness CI also provides steps to [upload artifacts to S3](./upload-artifacts-to-s-3-step-settings.md) and [upload artifacts to GCS](./upload-artifacts-to-gcs-step-settings.md).

## Prepare a pipeline

You need a [CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md).

If you haven't created a pipeline before, try one of the [CI tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md).

## Prepare artifacts to upload

Add steps to your pipeline that generate artifacts to upload, such as [Run steps](../set-up-test-intelligence/configure-run-tests-step-settings.md). The steps you use depend on what artifacts you ultimately want to upload.

## Upload artifacts to JFrog Artifactory

Add an **Upload Artifacts to JFrog Artifactory** step. This step's settings are described below.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable or located under **Optional Configuration** in the visual pipeline editor. Settings specific to containers, such as **Set Container Resources**, are not applicable when using the step in a stage with VM or Harness Cloud build infrastructure.

:::

### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

### Description

Text string describing the step's purpose.

### Artifactory Connector

Select the Harness Artifactory connector to use for this upload. The JFrog Account associated with the connector must have read/write permission. For more information, go to the [Artifactory connector settings reference](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference).

This step supports Artifactory connectors that use either anonymous or username and password authentication.

### Target and Source Path

The **Target** is the target path in the JFrog Artifactory registry. This is a target repository name relative to the server URL in the connector. If `pom.xml` is not present, then the **Target** must be a full path to an artifacts folder, such as `groupId/artifactId/version`.

**Source Path** is a path to the artifact file/folder on the local/build machine you want to upload. Harness creates the compressed file automatically.

![](./static/upload-artifacts-to-jfrog-519.png)

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set container resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

## Confirm the upload

After adding the steps and saving the pipeline, select **Run** to run the pipeline.

On the [build details page](../viewing-builds.md), you can see the logs for each step as they run.

![](static/upload-artifacts-to-jfrog-520.png)

In your Harness project's Builds, you can see the build listed.

![](./static/upload-artifacts-to-jfrog-521.png)

On JFrog, you can see the uploaded artifacts.

![](./static/upload-artifacts-to-jfrog-522.png)
