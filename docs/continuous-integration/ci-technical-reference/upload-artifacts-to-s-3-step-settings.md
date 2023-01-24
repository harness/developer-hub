---
title: Upload Artifacts to S3 Step Settings
description: This topic provides settings for the Upload Artifacts to S3 step, which uploads artifacts to AWS or other S3 providers such as MinIo. S3 buckets use private ACLs by default. To use a different ACL, s…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: wdzojt3ep3
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Upload Artifacts to S3 step, which uploads artifacts to AWS or other S3 providers such as [MinIo](https://docs.min.io/docs/minio-gateway-for-s3.html).

S3 buckets use [private](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl) ACLs by default. To use a different ACL, set a stage variable `PLUGIN_ACL` with the ACL you want to use.

### Name

The unique name for this step.

### Id

See [Entity Identifier Reference](https://docs.harness.io/article/li0my8tcz3-entity-identifier-reference).

### AWS Connector

The Harness Connector to use when connecting to AWS S3. The AWS IAM roles and policies associated with the account used in the Harness AWS Connector must be able to push to S3. See [AWS Connector Settings Reference](https://newdocs.helpdocs.io/article/m5vkql35ca-aws-connector-settings-reference).

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

* [Step Skip Condition Settings](https://docs.harness.io/article/i36ibenkq2-step-skip-condition-settings)
* [Step Failure Strategy Settings](https://docs.harness.io/article/htrur23poj-step-failure-strategy-settings)

