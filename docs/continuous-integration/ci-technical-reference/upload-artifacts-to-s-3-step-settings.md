---
title: Upload Artifacts to S3 step settings
description: Upload artifacts to AWS or other S3 providers such as MinIo.
sidebar_position: 160
helpdocs_topic_id: wdzojt3ep3
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides details about the settings for the Upload Artifacts to S3 step, which uploads artifacts to AWS or other S3 providers, such as [MinIO](https://min.io/product/s3-compatibility).

:::info

Depending on the stage's build infrastructure, some settings may be unavailable.

:::

## Name

Enter a name summarizing the step's purpose. Harness generates an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can edit the **Id**.

## AWS Connector

The Harness AWS connector to use when connecting to AWS S3.

The AWS IAM roles and policies associated with the account connected to the Harness AWS connector must be able to push to S3. For more information about roles and permissions for AWS connectors, go to:

* [Add an AWS connector](../../platform/7_Connectors/add-aws-connector.md)
* [AWS connector settings reference](../../platform/7_Connectors/ref-cloud-providers/aws-connector-settings-reference.md)

<details>
<summary>Stage variable required for non-default ACLs</summary>

```mdx-code-block
S3 buckets use [private ACLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl) by default. Your pipeline must have a `PLUGIN_ACL` stage variable if you want to use a different ACL.

1. In the Pipeline Studio, select the relevant stage, and then select the **Overview** tab.
2. In the **Advanced** section, add a stage variable.
3. Input `PLUGIN_ACL` as the **Variable Name**, set the **Type** to **String**, and then select **Save**.
4. Input the relevant ACL in the **Value** field.
```
</details>

<details>
<summary>Stage variable required for ARNs</summary>

```mdx-code-block
If your AWS connector's authentication uses a cross-account role (ARN), pipeline stages with **Upload Artifacts to S3** steps must have a `PLUGIN_USER_ROLE_ARN` stage variable.

1. In the Pipeline Studio, select the stage with the **Upload Artifacts to S3** step, and then select the **Overview** tab.
2. In the **Advanced** section, add a stage variable.
3. Input `PLUGIN_USER_ROLE_ARN` as the **Variable Name**, set the **Type** to **String**, and then select **Save**.
4. In the **Value** field, input the full ARN value that corresponds with the AWS connector's ARN.
```

</details>

## Region

Define the AWS region to use when pushing the image.

## Bucket

The name of the S3 bucket name where you want to upload the artifact.

## Source Path

Path to the artifact file/folter that you want to upload. Harness creates the compressed file automatically.

## Optional Configuration

Use the following settings to add additional configuration to the step. Settings specific to containers, such as **Set Container Resources**, are not applicable when using the step in a stage with VM or Harness Cloud build infrastructure.

### Endpoint URL

Endpoint URL for S3-compatible providers. This setting is not needed for AWS.

### Target

The path, relative to the S3 **Bucket**, where you want to store the artifact. Do not include the bucket name; you specified this in **Bucket**.

If no path is specified, the cache is saved to `[bucket]/[key]`.

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
