---
title: Upload Artifacts to GCS step settings
description: This topic provides settings for the Upload Artifacts to GCS step.
sidebar_position: 140
helpdocs_topic_id: 3qeqd8pls7
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Upload Artifacts to GCS step, which uploads artifacts to Google Cloud Storage. See [Uploads and downloads](https://cloud.google.com/storage/docs/uploads-downloads) in the Google Cloud docs.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable. Not all settings are available for all build infrastructure options.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## GCP Connector

The Harness connector for the GCP account where you want to upload the artifact. For more information, go to [Google Cloud Platform (GCP) connector settings reference](../../platform/7_Connectors/ref-cloud-providers/gcs-connector-settings-reference.md). This step supports GCP connectors that use access key authentication. It does not support GCP connectors that inherit delegate credentials.

## Bucket

The GCS destination bucket name.

## Source Path

Path to the artifact file/folder you want to upload. You can use glob expressions to upload multiple files. For example, `src/js/**/*.js` uploads all Javascript files in `src/js/subfolder-1/`, `src/js/subfolder-2`, and so on. Harness creates the compressed file automatically.

## Optional Configuration

Use the following settings to add additional configuration to the step.

### Target

The path, relative to the **Bucket** where you want to store the cache. If no target path is provided, the cache is saved to `[bucket]/`.

### Run as User

Specify the user ID to use to run all processes in the pod, if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set container resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.
* * **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
