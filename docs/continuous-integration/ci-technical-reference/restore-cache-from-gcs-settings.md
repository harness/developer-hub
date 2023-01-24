---
title: Restore Cache from GCS Settings
description: This topic provides settings for the Restore Cache from GCS step, which restores files and directories that were saved using the Save Cache to GCS step. Name. The unique name for this step. Id. See E…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: e2o4sektz1
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Restore Cache from GCS step, which restores files and directories that were saved using the [Save Cache to GCS](save-cache-to-gcs-step-settings.md) step.

### Name

The unique name for this step.

### Id

See [Entity Identifier Reference](https://docs.harness.io/article/li0my8tcz3-entity-identifier-reference).

### GCP Connector

The Harness Connector for the GCP account where you saved the cache.

### Bucket

GCS bucket name.

### Key

The key used to identify the cache.

The backslash character isn't allowed as part of the checksum added here. This is a limitation of the Go language (golang) template. Use a forward slash instead. 

* Incorrect format: `cache-{{ checksum ".\src\common\myproj.csproj" }`
* Correct format: `cache-{{ checksum "./src/common/myproj.csproj" }}`

### Optional Configurations

#### Archive Format

Select the archive format.

The default archive format is Tar.

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

* [Step Skip Condition Settings](https://docs.harness.io/article/i36ibenkq2-step-skip-condition-settings)
* [Step Failure Strategy Settings](https://docs.harness.io/article/htrur23poj-step-failure-strategy-settings)

