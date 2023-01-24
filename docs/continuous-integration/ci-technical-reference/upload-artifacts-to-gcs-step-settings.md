---
title: Upload Artifacts to GCS Step Settings
description: This topic provides settings for the Upload Artifacts to GCS step, which uploads artifacts to Google Cloud Storage. See Uploads and downloads in the Google Cloud docs. Name. The unique name for this…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: 3qeqd8pls7
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Upload Artifacts to GCS step, which uploads artifacts to Google Cloud Storage. See [Uploads and downloads](https://cloud.google.com/storage/docs/uploads-downloads) in the Google Cloud docs.

### Name

The unique name for this Connector.

### ID

See [Entity Identifier Reference](https://docs.harness.io/article/li0my8tcz3-entity-identifier-reference).

### GCP Connector

The Harness Connector for the GCP account where you want to upload the artifact. See [Google Cloud Platform (GCP) Connector Settings Reference](https://docs.harness.io/article/yykfduond6-gcs-connector-settings-reference).

### Bucket

GCS destination bucket name.

### Source Path

Path to the artifact file/folder you want to upload. You can use regex to upload multiple files. Harness creates the compressed file automatically.

### Optional Configurations

#### Target

The name of the artifact file.

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

