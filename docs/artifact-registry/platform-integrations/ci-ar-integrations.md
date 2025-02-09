---
title: Artifact Registry and Continuous Integrations
description: Deep dive into the native integrations between the Artifact Registry and the Continuous Integration module.
sidebar_position: 20
sidebar_label: Continuous Integrations
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Learn how to use Artifact Registry with the Continuous Integration (CI) module.

## Build and push to Docker with Artifact Registry
Harness CI offers a [Build and push to Docker](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry) step that allows you to build and push a docker image to any registry. Usually, this requires a connector to the registry you want, but with AR you can connect to a registry directly, within the platform, without any complicated setup. 

<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/7892f010-0f5b-4acd-8ad3-9de5426ba386" title="Build and Push Docker Images with Harness Artifact Registry" />
</TabItem>
<TabItem value="Step-by-step">
To do so, follow these steps:

1. Navigate to your pipeline, and enter your `Build` stage. 
2. Create a new `Build and Push an image to Docker Registry` step. 
3. `Harness Artifact Registry` is the default registry type. Ensure that it is selected, and move to the next step. 
4. Select your registry under `Registry`. Clicking the field will show a list of available registries. 
5. Once your registry is selected, a list of images will populate under `Image Name`. Choose one, or type the name of a new image that you are building the first time. 
6. Enter any image tags you wish under `Tags`.
7. Click `Apply Changes` at the top right, and you are done! No connectors needed. 
</TabItem>
</Tabs>

## Add a Run or Plugin Step to Your CI Pipeline

Seamlessly reference artifacts stored in Harness Artifact Registry within your CI Run and Plugin steps. This functionality eliminates the need for an external connector, providing a streamlined and user-friendly experience, while enabling efficient and simplified workflows.

<Tabs>
<TabItem value="Interactive guide">
<iframe
    src="https://app.tango.us/app/embed/0e1d0ea7-149b-4ad2-be28-6e63f4114a5f"
    title="Add a run step against a registered artifact in your CI pipeline."
    style={{ minHeight: '640px' }}
    width="100%"
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true">
</iframe>
</TabItem>
<TabItem value="Step-by-step">
To do so, follow these steps:

1. Navigate to your pipeline, and enter your `Build` stage. 
2. Create a new `Run` step. 
3. `Harness Artifact Registry` is the default registry type. Ensure that it is selected, and move to the next step. 
4. Select your registry under `Registry`. Clicking the field will show a list of available registries. 
5. Enter your artifact's `imageName:version`.
6. Add your run command, e.g. `echo "Run step completed".
7. Click `Apply Changes`.

To verify the Run or Plugin step executes as expected, run the pipeline.
</TabItem>
</Tabs>