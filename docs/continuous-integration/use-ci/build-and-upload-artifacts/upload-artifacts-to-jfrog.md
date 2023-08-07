---
title: Upload Artifacts to JFrog
description: Add a step to upload artifacts to JFrog.
sidebar_position: 70
helpdocs_topic_id: lh082yv36h
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use the **Upload Artifacts to JFrog Artifactory** step in your CI pipelines to upload artifacts to [JFrog Artifactory](https://www.jfrog.com/confluence/display/JFROG/JFrog+Artifactory). You can also [upload artifacts to S3](./upload-artifacts-to-s-3-step-settings.md), [upload artifacts to GCS](./upload-artifacts-to-gcs-step-settings.md), and [upload artifacts to Sonatype Nexus](./upload-artifacts-to-sonatype-nexus.md).

This topic assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to the [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components) and the [CI tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md).

## Prepare artifacts to upload

Add steps to your CI pipeline that generate artifacts to upload. The steps you use depend on what artifacts you ultimately want to upload. For example, [Run steps](../run-ci-scripts/run-step-settings.md) and [Plugin steps](../use-drone-plugins/explore-ci-plugins.md) are useful for running scripts.

## Upload artifacts to JFrog Artifactory

Add an **Upload Artifacts to JFrog Artifactory** step to your pipeline. This step's settings are described below.

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

**Source Path** is a path to the artifact file/folder on the local/build machine you want to upload.

If you want to upload a compressed file, you must use a [Run step](../run-ci-scripts/run-step-settings.md) to compress the artifact before uploading it.

![](./static/upload-artifacts-to-jfrog-519.png)

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set container resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

## Confirm the upload

After you add the steps and save the pipeline, select **Run** to run the pipeline.

On the [build details page](../viewing-builds.md), you can see the logs for each step as they run.

![](static/upload-artifacts-to-jfrog-520.png)

On JFrog, you can see the uploaded artifacts.

![](./static/upload-artifacts-to-jfrog-522.png)

## View artifacts on the Artifacts tab

As an alternative to manually finding artifacts on JFrog, you can use the [Artifact Metadata Publisher Drone plugin](https://github.com/drone-plugins/artifact-metadata-publisher) to publish artifacts to the [Artifacts tab](../viewing-builds.md). To do this, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) after the **Upload Artifacts to JFrog Artifactory** step.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

Configure the **Plugin** step settings as follows:

* **Name:** Enter a name.
* **Container Registry:** Select a Docker connector.
* **Image:** Enter `plugins/artifact-metadata-publisher`.
* **Settings:** Add the following two settings as key-value pairs.
  * `file_urls`: The URL to the target artifact that was uploaded in the **Upload Artifacts to JFrog Artifactory** step.
  * `artifact_file`: `artifact.txt`

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add a `Plugin` step that uses the `artifact-metadata-publisher` plugin.

```yaml
               - step:
                  type: Plugin
                  name: publish artifact metadata
                  identifier: publish_artifact_metadata
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: ## Provide the URL to the target artifact that was uploaded in the Upload Artifacts to JFrog Artifactory step.
                      artifact_file: artifact.txt
```

```mdx-code-block
  </TabItem>
</Tabs>
```

### Troubleshooting

If you get a `certificate signed by unknown authority` error, make sure the correct server certificates are uploaded to the correct container path. For example, the container path for Windows is `C:/Users/ContainerAdministrator/.jfrog/security/certs`.
