---
title: Restore Cache from S3 Step Settings
description: This topic provides settings for the Restore Cache from S3 step. Name. The unique name for this step. ID. See Entity Identifier Reference. AWS Connector. The Harness Connector to use when restoring t…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: zlpx6lli6d
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Restore Cache from S3 step.

### Name

The unique name for this step.

### ID

See [Entity Identifier Reference](https://docs.harness.io/article/li0my8tcz3-entity-identifier-reference).

### AWS Connector

The Harness Connector to use when restoring the cache from AWS S3. Typically, this is the same Connector used when you saved the cache. See [Save Cache to S3 Step Settings](save-cache-to-s-3-step-settings.md).

The AWS IAM roles and policies associated with the account used in the Harness AWS Connector must be able to read from S3. See [AWS Connector Settings Reference](https://newdocs.helpdocs.io/article/m5vkql35ca-aws-connector-settings-reference).

### Region

An AWS region you used when you saved the cache. See [Save Cache to S3 Step Settings](save-cache-to-s-3-step-settings.md).

### Bucket

The AWS S3 bucket you used when you saved the cache. See [Save Cache to S3 Step Settings](save-cache-to-s-3-step-settings.md).

### Key

The key you used to identify the cache when you saved it. See [Save Cache to S3 Step Settings](save-cache-to-s-3-step-settings.md).

The backslash character isn't allowed as part of the checksum added here. This is a limitation of the Go language (golang) template. Use a forward slash instead. 

* Incorrect format: `cache-{{ checksum ".\src\common\myproj.csproj" }`
* Correct format: `cache-{{ checksum "./src/common/myproj.csproj" }}`

### Optional Configurations

#### Endpoint URL

Endpoint URL for S3-compatible providers (not needed for AWS).

#### Archive Format

Select the archive format.

The default archive format is Tar.

#### Path Style

Select whether to use Virtual Hosted Style (http://bucket.host/key) or Path Style (http://host/bucket/key). For MinIO, use Path Style (True).

By default, the Path Style option is set to False.

#### Fail if Key Doesn't Exist

Select this option to fail the step if the key doesn’t exist.

By default, the Fail if Key Doesn't Exist option is set to False.

#### Run as User

Set the value to specify the user id for all processes in the pod, running in containers. See [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Set Container Resources

Maximum resources limit values for the resources used by the container at runtime.

##### Limit Memory

Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.

##### Limit CPU

The maximum number of cores that the container can use. CPU limits are measured in cpu units. Fractional requests are allowed: you can specify one hundred millicpu as `0.1` or `100m`. See [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

##### Timeout

Timeout for the step. Once the timeout is reached, the step fails and the Pipeline execution continues.

### See Also

* [Step Skip Condition Settings](https://newdocs.helpdocs.io/article/i36ibenkq2-step-skip-condition-settings)
* [Step Failure Strategy Settings](https://newdocs.helpdocs.io/article/htrur23poj-step-failure-strategy-settings)

