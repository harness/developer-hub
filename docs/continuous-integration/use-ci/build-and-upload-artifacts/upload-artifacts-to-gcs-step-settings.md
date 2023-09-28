---
title: Upload Artifacts to GCS
description: Add a step to upload artifacts to Google Cloud Storage.
sidebar_position: 60
helpdocs_topic_id: 3qeqd8pls7
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use the **Upload Artifacts to GCS** step in your CI pipelines to upload artifacts to Google Cloud Storage (GCS). For more information on GCS, go to the Google Cloud documentation on [Uploads and downloads](https://cloud.google.com/storage/docs/uploads-downloads). You can also [upload artifacts to S3](./upload-artifacts-to-s-3-step-settings.md), [upload artifacts to JFrog](./upload-artifacts-to-jfrog.md), and [upload artifacts to Sonatype Nexus](./upload-artifacts-to-sonatype-nexus.md).

## Prepare a pipeline

You need a [CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md).

If you haven't created a pipeline before, try one of the [CI tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md).

## Prepare artifacts to upload

Add steps to your pipeline that generate artifacts to upload, such as [Run steps](../run-ci-scripts/run-step-settings.md). The steps you use depend on what artifacts you ultimately want to upload.

## Upload artifacts to GCS

Add an **Upload Artifacts to GCS** step. This step's settings are described below.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable or located under **Optional Configuration** in the visual pipeline editor. Settings specific to containers, such as **Set Container Resources**, are not applicable when using the step in a stage with VM or Harness Cloud build infrastructure.

:::

### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

### GCP Connector

The Harness connector for the GCP account where you want to upload the artifact. For more information, go to [Google Cloud Platform (GCP) connector settings reference](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/gcs-connector-settings-reference). This step supports GCP connectors that use access key authentication. It does not support GCP connectors that inherit delegate credentials.

### Bucket

The GCS destination bucket name.

### Source Path

Path to the artifact file/folder you want to upload.

If you want to upload a compressed file, you must use a [Run step](../run-ci-scripts/run-step-settings.md) to compress the artifact before uploading it.

### Target

The path, relative to the **Bucket** where you want to store the artifact. If no target path is provided, the artifact is saved to `[bucket]/`.

### Run as User

Specify the user ID to use to run all processes in the pod, if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

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

After the **Upload Artifacts to GCS** step runs, you can see the uploaded artifacts on GCS.

## View artifacts on the Artifacts tab

As an alternative to manually finding artifacts on GCS, you can use the [Artifact Metadata Publisher Drone plugin](https://github.com/drone-plugins/artifact-metadata-publisher) to publish artifacts to the [Artifacts tab](../viewing-builds.md). To do this, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) after the **Upload Artifacts to GCS** step.

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
  * `file_urls`: A GCS URL using the **Bucket** and **Target** specified in the **Upload Artifacts to GCS** step, such as `https://storage.googleapis.com/GCS_BUCKET_NAME/TARGET_PATH.html`.
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
                      file_urls: https://storage.googleapis.com/GCS_BUCKET_NAME/TARGET_PATH.html
                      artifact_file: artifact.txt
```

For `file_urls`, use the **Bucket** and **Target** that you specified in the **Upload Artifacts to GCS** step.

```mdx-code-block
  </TabItem>
</Tabs>
```
