---
title: Restore Cache from GCS step settings
description: This topic provides settings for the Restore Cache from GCS step.
sidebar_position: 90
helpdocs_topic_id: e2o4sektz1
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Restore Cache from GCS step, which restores files and directories that were saved using the [Save Cache to GCS](save-cache-to-gcs-step-settings.md) step.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable. Not all settings are available for all build infrastructure options.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## GCP Connector

The Harness connector for the GCP account where you saved the cache.

This step supports GCP connectors that use access key authentication. It does not support GCP connectors that inherit delegate credentials.

## Bucket

GCS bucket name where you saved the cache.

## Key

The key to identify the cache.

The backslash character isn't allowed as part of the checksum value here. This is a limitation of the Go language (golang) template. You must use a forward slash instead:

* Incorrect format: `cache-{{ checksum ".\src\common\myproj.csproj" }`
* Correct format: `cache-{{ checksum "./src/common/myproj.csproj" }}`

## Optional Configuration

Use the following settings to add additional configuration to the step.

### Archive Format

Select the archive format. The default archive format is Tar.

### Fail if Key Doesn't Exist

Select this option to fail the step if the specified **Key** doesn't exist.

By default, this option is set to false (unselected).

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set Container Resources

Maximum resources limits for the resources used by the container at runtime:

* **Limit Memory:** Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number with the suffixes `G` or `M`. You can also use the power-of-two equivalents, `Gi` or `Mi`. Do not include spaces when entering a fixed value. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed. For example, you can specify one hundred millicpu as `0.1` or `100m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
