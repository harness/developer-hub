---
title: Upload Artifacts to JFrog
description: Add a step to upload artifacts to JFrog.

sidebar_position: 40
helpdocs_topic_id: lh082yv36h
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use the **upload Artifacts to JFrog Artifactory** step in your CI pipelines to upload artifacts to [JFrog Artifactory](https://www.jfrog.com/confluence/display/JFROG/JFrog+Artifactory). Harness CI also provides steps to [upload artifacts to S3](../../ci-technical-reference/upload-artifacts-steps/upload-artifacts-to-s-3-step-settings.md) and [upload artifacts to GCS](../../ci-technical-reference/upload-artifacts-steps/upload-artifacts-to-gcs-step-settings.md).

### Before you Begin

* [CI pipeline tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md)
* [CI Build stage settings](../set-up-build-infrastructure/ci-stage-settings.md)
* [Set Up Build Infrastructure](/docs/category/set-up-build-infrastructure)
* [Learn Harness' Key Concepts](/docs/getting-started/learn-harness-key-concepts.md)

### Step 1: Create the CI Stage

In your Harness Pipeline, click **Add Stage**, and then click CI.

### Step 2: Define the Build Farm Infrastructure

In the CI stage Infrastructure, define the build farm for the codebase. See [Set up a Kubernetes cluster build infrastructure](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).

### Step 3: Configure the Run Step

In the stage's Execution tab, add a **Run** step. The Run step executes one or more commands on a container image. See [Run step settings](../../ci-technical-reference/configure-run-tests-step-settings.md).

### Step 4: Upload Artifacts to JFrog Artifactory

Add an **Upload Artifacts to JFrog Artifactory** step.

To configure this step, select the Harness Artifactory connector, enter the source file/path, and the target path. For more information about these settings, go to the [Upload Artifacts to JFrog Artifactory step settings reference](../../ci-technical-reference/upload-artifacts-steps/upload-artifacts-to-jfrog-artifactory-step-settings.md).

The JFrog Account associated with the connector must have read/write permission. For more information, go to the [Artifactory connector settings reference](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference).

![](./static/upload-artifacts-to-jfrog-519.png)

### Step 5: View the Results

Save the Pipeline and click **Run**.

You can see the logs for the Run and Upload step in the pipeline as it runs.

![](static/upload-artifacts-to-jfrog-520.png)

In your Harness project's Builds, you can see the build listed.

![](./static/upload-artifacts-to-jfrog-521.png)

On JFrog, you can see the file that you pushed.

![](./static/upload-artifacts-to-jfrog-522.png)
