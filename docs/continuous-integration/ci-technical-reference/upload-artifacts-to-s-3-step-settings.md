---
title: Upload Artifacts to S3 step settings
description: The Upload Artifacts to S3 step uploads artifacts to AWS or other S3 providers such as MinIo.
sidebar_position: 160
helpdocs_topic_id: wdzojt3ep3
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides details about the settings for the Upload Artifacts to S3 step, which uploads artifacts to AWS or other S3 providers such as [MinIo](https://docs.min.io/docs/minio-gateway-for-s3.html).

### Name

The unique name for this step.

### Id

See [Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md).

### AWS Connector

The Harness Connector to use when connecting to AWS S3. The AWS IAM roles and policies associated with the account used in the Harness AWS Connector must be able to push to S3. See [AWS Connector Settings Reference](../../platform/7_Connectors/ref-cloud-providers/aws-connector-settings-reference.md).

<details>
<summary>Stage variable required for non-default ACLs</summary>

S3 buckets use [private ACLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl) by default. Your pipeline must have a `PLUGIN_ACL` stage variable if you want to use a different ACL.

1. In the Pipeline Studio, select the relevant stage, and then select the **Overview** tab.
2. In the **Advanced** section, add a stage variable.
3. Input `PLUGIN_ACL` as the **Variable Name**, set the **Type** to **String**, and then select **Save**.
4. Input the relevant ACL in the **Value** field.

</details>

<details>
<summary>Stage variable required for ARNs</summary>

If your AWS connector's authentication uses a cross-account role (ARN), pipeline stages with **Upload Artifacts to S3** steps must have a `PLUGIN_USER_ROLE_ARN` stage variable.

1. In the Pipeline Studio, select the stage with the **Upload Artifacts to S3** step, and then select the **Overview** tab.
2. In the **Advanced** section, add a stage variable.
3. Input `PLUGIN_USER_ROLE_ARN` as the **Variable Name**, set the **Type** to **String**, and then select **Save**.
4. In the **Value** field, input the full ARN value that corresponds with the AWS connector's ARN.
</details>

### Bucket

The bucket name for the uploaded artifact.

### Source Path

Path to the artifact files you want to upload. You can use standard [glob expressions](https://en.wikipedia.org/wiki/Glob_(programming)) to upload multiple files. For example, `src/js/**/*.js` will upload all Javascript files in `src/js/subfolder-1/`, `src/js/subfolder-2`, and so on.

### Optional Configuration

Configure the following options to add additional configuration for the Step.

#### Endpoint URL

Endpoint URL for S3-compatible providers (not needed for AWS).

#### Target

The bucket path where the artifact will be stored.

Do not include the bucket name. It is specified in **Bucket**.

If no target is provided, the cache is saved to `[bucket]/[key]`.

#### Run as User

Set the value to specify the user id for all processes in the pod, running in containers. See [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Set container resources

Maximum resources limit values for the resources used by the container at runtime.

##### Limit Memory

Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.

##### Limit CPU

The maximum number of cores that the container can use. CPU limits are measured in cpu units. Fractional requests are allowed: you can specify one hundred millicpu as `0.1` or `100m`. See [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

##### Timeout

Timeout for the step. Once the timeout is reached, the step fails, and the Pipeline execution continues.ACL

### See Also

* [Step Skip Condition Settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy Settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

