---
title: Save Cache to S3 Step Settings
description: This topic provides settings for the Save Cache to S3 step.
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: qtvjvrp9sn
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Save Cache to S3 step, which preserves files and directories between builds.

To restore a saved cache, add a [Restore Cache from S3 Step](restore-cache-from-s-3-step-settings.md).

### Name

The unique name for this step.

### ID

See [Entity Identifier Reference](https://docs.harness.io/article/li0my8tcz3-entity-identifier-reference).

### AWS Connector

The Harness Connector to use when saving the cache to an S3. The AWS IAM roles and policies associated with the account used in the Harness AWS Connector must be able to write to S3. See [AWS Connector Settings Reference](https://docs.harness.io/article/m5vkql35ca).

### Region

An AWS region you selected when you created AWS S3 bucket. See [Creating and configuring an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-configure-bucket.html) in the AWS docs.

### Bucket

The AWS S3 bucket where you want to save the cache.

### Key

The key to identify the cache.

You can use the checksum macro to create a key based on a file’s checksum. For example:

`myApp-{{ checksum filePath1 }}`

Harness checks to see if the key exists and compares the checksum. If the checksum matches, then Harness doesn't save the cache. If the checksum is different, then Harness saves the cache.

The backslash character isn't allowed as part of the checksum added here. This is a limitation of the Go language (golang) template. Use a forward slash instead.

* Incorrect format: `cache-{{ checksum ".\src\common\myproj.csproj" }`
* Correct format: `cache-{{ checksum "./src/common/myproj.csproj" }}`

### Source Paths

A list of the files/folders to cache. Add each file/folder separately.

### Optional Configuration

#### Endpoint URL

Endpoint URL for S3-compatible providers (not needed for AWS).

#### Archive Format

Select the archive format.

The default archive format is Tar.

#### Override Cache

Select this option if you want to override the cache if the key already exists.

By default, the **Override Cache** option is set to False (unchecked).

#### Path Style

Select whether to use Virtual Hosted Style (http://bucket.host/key) or Path Style (http://host/bucket/key). For MinIO, use Path Style (True).

By default, the Path Style option is set to False.

#### Run as User

Set the value to specify the user id for all processes in the pod, running in containers. See [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Set Container Resources

Maximum resources limit values for the resources used by the container at runtime.

##### Limit Memory

Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.

##### Limit CPU

The maximum number of cores that the container can use. CPU limits are measured in cpu units. Fractional requests are allowed: you can specify one hundred millicpu as `0.1` or `100m`. See [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

##### Timeout

Timeout for the step. Once the timeout is reached, the step fails, and the Pipeline execution continues.

### See Also

* [Step Skip Condition Settings](https://docs.harness.io/article/i36ibenkq2-step-skip-condition-settings)
* [Step Failure Strategy Settings](https://docs.harness.io/article/htrur23poj-step-failure-strategy-settings)

