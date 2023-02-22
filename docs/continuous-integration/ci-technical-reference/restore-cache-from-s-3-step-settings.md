---
title: Restore Cache from S3 step settings
description: This topic provides settings for the Restore Cache from S3 step.
sidebar_position: 100
helpdocs_topic_id: zlpx6lli6d
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Restore Cache from S3 step.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable. Not all settings are available for all build infrastructure options.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## AWS Connector

The Harness Connector to use when restoring the cache from AWS S3. Typically, this is the same connector used when you saved the cache in a previous [Save Cache to S3 step](save-cache-to-s-3-step-settings.md).

The AWS IAM roles and policies associated with the account used in the Harness AWS Connector must be able to read from S3.

:::note

This step supports AWS connectors using **AWS Access Key**, **Assume IAM role on Delegate**, and IRSA authentication methods *without* cross account access (ARN/STS).

This step doesn't support AWS connectors that have enabled cross account access (ARN/STS) for any authentication method.

:::

For more information about roles and permissions for AWS connectors, go to:

* [Add an AWS connector](../../platform/7_Connectors/add-aws-connector.md)
* [AWS Connector settings reference](../../platform/7_Connectors/ref-cloud-providers/aws-connector-settings-reference.md).

## Region

The AWS region you used when you saved the cache in a previous [Save Cache to S3 step](save-cache-to-s-3-step-settings.md).

## Bucket

The AWS S3 bucket where you saved the cache in a previous [Save Cache to S3 step](save-cache-to-s-3-step-settings.md).

## Key

The key you used to identify the cache when you saved it in a previous [Save Cache to S3 step](save-cache-to-s-3-step-settings.md).

The backslash character isn't allowed as part of the checksum value here. This is a limitation of the Go language (golang) template. You must use a forward slash instead:

* Incorrect format: `cache-{{ checksum ".\src\common\myproj.csproj" }`
* Correct format: `cache-{{ checksum "./src/common/myproj.csproj" }}`

## Optional Configuration

Use the following settings to add additional configuration to the step.

### Endpoint URL

Endpoint URL for S3-compatible providers. This is not needed for AWS.

### Archive Format

Select the archive format. The default archive format is Tar.

### Path Style

If unselected, the step uses Virtual Hosted Style for paths, such as `http://bucket.host/key`. If selected, the step uses Path Style, such as `http://host/bucket/key`.

For MinIO, you must use Path Style. Make sure **Path Style** is true (selected).

By default, **Path Style** is false (unselected).

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
