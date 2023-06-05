---
title: Upload Artifacts to S3
description: Upload artifacts to AWS or other S3 providers such as MinIo.
sidebar_position: 80
helpdocs_topic_id: wdzojt3ep3
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use the **Upload Artifacts to S3** step in your CI pipelines to upload artifacts to AWS or other S3 providers, such as [MinIO](https://min.io/product/s3-compatibility). Harness CI also provides steps to [upload artifacts to GCS](./upload-artifacts-to-gcs-step-settings.md) and [upload artifacts to JFrog](./upload-artifacts-to-jfrog.md).

## Prepare a pipeline

You need a [CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md).

If you haven't created a pipeline before, try one of the [CI tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md).

## Prepare artifacts to upload

Add steps to your pipeline that generate artifacts to upload, such as [Run steps](../set-up-test-intelligence/configure-run-tests-step-settings.md). The steps you use depend on what artifacts you ultimately want to upload.

## Upload artifacts to S3

Add an **Upload Artifacts to S3** step. This step's settings are described below.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable or located under **Optional Configuration** in the visual pipeline editor. Settings specific to containers, such as **Set Container Resources**, are not applicable when using the step in a stage with VM or Harness Cloud build infrastructure.

:::

### Name

Enter a name summarizing the step's purpose. Harness generates an **Id** ([Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can edit the **Id**.

### AWS Connector

The Harness AWS connector to use when connecting to AWS S3.

The AWS IAM roles and policies associated with the account connected to the Harness AWS connector must be able to push to S3. For more information about roles and permissions for AWS connectors, go to:

* [Add an AWS connector](/docs/platform/Connectors/Cloud-providers/add-aws-connector)
* [AWS connector settings reference](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference)

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

### Region

Define the AWS region to use when pushing the image.

### Bucket

The name of the S3 bucket name where you want to upload the artifact.

### Source Path

Path to the artifact file/folder that you want to upload. Harness creates the compressed file automatically.

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
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed. For example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

## Confirm the upload

After adding the steps and saving the pipeline, select **Run** to run the pipeline.

On the [build details page](../viewing-builds.md), you can see the logs for each step as they run.

After the **Upload Artifacts to S3** step runs, you can see the uploaded artifacts on S3.

### Publish artifacts to the Artifacts tab

As an alternative to manually finding artifacts on S3, you can use the [Artifact Metadata Publisher Drone plugin](https://github.com/drone-plugins/artifact-metadata-publisher) to publish artifacts to the [Artifacts tab](../viewing-builds.md). To do this, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) after the **Upload Artifacts to S3** step.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

Configure the **Plugin** step settings as follows:

* **Name:** Enter a name.
* **Container Registry:** Select a Docker connector.
* **Image:** Enter `plugins/artifact-metadata-publisher`.
* **Settings:** Add the following two settings as key-value pairs.
  * `file_urls`: The URL to the target artifact that was uploaded in the **Upload Artifacts to S3** step.
  * `artifact_file`: `artifact.txt`

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add a `Plugin` step that uses the `artifact-metadata-publisher` plugin.

```yaml
               - step:
                  type: Plugin
                  name: publish artifact metadata
                  identifier: publish_artifact_metadata
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: ## Provide the URL to the target artifact that was uploaded in the Upload Artifacts to S3 step.
                      artifact_file: artifact.txt
```

```mdx-code-block
  </TabItem>
</Tabs>
```
