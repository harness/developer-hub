---
title: Custom Images  
description: Create and use your own Terraform plugin images.
sidebar_position: 30
---

<CTABanner
  buttonText="Learn More"
  title="Pending release"
  tagline="The IaCM Default Pipelines feature is currently pending release and will be available soon!"
  link="https://developer.harness.io/roadmap/#iacm"
  closable={true}
  target="_self"
/>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness provides the flexibility to use custom images in your IACM stage, which refers to individual Terraform plugin steps such as the `terraform init` step in an IaCM pipeline provision stage. This guide walks you through the process of creating your custom image and incorporating it into your Harness pipelines.

## Create an image
Harness allows you to create custom images based on a provided base image. This enables you to tailor the image to your specific needs and use it in your workflows.

:::warning Version lock-in
Once you create a custom image using our base image, it becomes **version-locked**. This means that if we release a new version of our base image, your custom image will not automatically update to the latest version. For instance, if you create an image today using our base image version "1.0.0" and we subsequently release version "1.1.0," your custom image will still be using version "1.0.0."

If your version is out-of-date, while it is unlikely to cause a pipeline failure, your current version may lack some features, be open to security vulnerabilities or run into compatibility issues. In such cases, follow the **Mitigating versioning challenges** section below:

:::

:::tip Mitigating versioning challenges
To address this versioning challenge and ensure that your custom image stays up-to-date with our latest improvements and features, you can implement specific steps within your CI/CD pipelines. These steps may include periodically checking for updates to our base image and rebuilding the custom image as necessary. It's crucial to proactively monitor our releases and sync the custom images to take full advantage of the latest enhancements.

**To help detect out-of-date versions, Harness log a warning if your image version is five versions behind the latest release.**
:::

### Create a custom image

The following example custom image includes the Harness Terraform Plugin (HTP) version and has the AWS `kubectl` and `kustomize` tools installed in the root image giving your steps access to them as needed.

```sh
FROM plugins/harness_terraform
RUN apk update
RUN apk add aws-cli
RUN aws --version
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
RUN install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
RUN chmod +x kubectl
RUN mkdir -p ~/.local/bin
RUN mv ./kubectl ~/.local/bin/kubectl
```

<details close>
    <summary>
        Cloud v0.56 or later
    </summary>
    For cloud environments, there was a change in version 0.56 and later images where the user is no longer root. If you need the image to use the root user, please use the following code:

    ```sh
        FROM plugins/harness_terraform_vm:0.62.0
        RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
        RUN unzip awscliv2.zip
        RUN ./aws/install
        RUN aws --version
        RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
        RUN install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
        RUN chmod +x kubectl
        RUN mkdir -p ~/.local/bin
        RUN mv ./kubectl ~/.local/bin/kubectl
        RUN curl -LO "https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.3.0/kustomize_v5.3.0_linux_amd64.tar.gz" \
            && tar xzf kustomize_v5.3.0_linux_amd64.tar.gz \
            && mv kustomize /usr/local/bin/kustomize \
            && rm kustomize_v5.3.0_linux_amd64.tar.gz
    ```
</details>


## Use your own image
To use your custom image in a step, create a reference in the YAML configuration indicating that the step should use your image. 

```yaml
- step:
    type: IACMTerraformPlugin
    name: apply
    identifier: apply
    timeout: 2h
    spec:
        command: apply
        image: plugins/private_harness_terraform_plugin  # (1)
        connectorRef: privateConnector  # (2)
```

:::info
In this example, the `image` attribute **(1)** in the YAML points to the plugin image in the Elastic Container Registry (ECR) where it is hosted. If your image is hosted in a private ECR, you'll need to create a connector for that ECR and define the `connectorRef` **(2)** for the connector. This ensures that Harness can access the image. At this stage, the "apply" step in your pipeline will use the "private_harness_terraform_plugin" and have access to `kubectl` and `kustomize` for its operations.
:::

## IACM execution-config
To use images from your repository in an IACM stage, you can use the `execution-config` API endpoints. 

:::note
Although some images mentioned here are also used by [CI](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci/), it's important to note that any overrides specified using the IACM `execution-config` APIs are not applied to CI stages and vice versa. The images that can be overridden are:

- harness/ci-addon.
- harness/ci-lite-engine.
- harness/drone-git.
- plugins/harness_terraform.
:::

<Tabs>
    <TabItem value="Set images">
    Set your Images with the `update-config` endpoint:
    ```sh
    curl \
    -X POST \
    -H 'x-api-key: <pat>' \
    'https://app.harness.io/gateway/iacm-manager/execution-config/update-config?accountIdentifier=<account>&infra=k8' \
    --header 'Content-Type: application/json' \
    --data-binary @- << EOF
    [
        {
            "field": "addonTag",
            "value": "<your_repo>/ci-addon:1.16.44"
        },
        {
            "field": "liteEngineTag",
            "value": "<your_repo>/ci-lite-engine:1.16.37"
        },
        {
            "field": "gitCloneTag",
            "value": "<your_repo>/drone-git:1.5.0-rootless"
        },
        {
            "field": "IACMTerraformTag",
            "value": "<your_repo>/harness_terraform:latest"
        },
        {
            "field": "IACMOpentofuTag",
            "value": "<your_repo>/harness_terraform:latest"
        }
    ]
    EOF
    ```
    </TabItem>
    <TabItem value="Reset default images">
    Reset the Images back to the defaults with the `reset-config` endpoint:
    ```sh
    curl \
    -X POST \
    -H 'x-api-key: <pat>' \
    'https://app.harness.io/gateway/iacm-manager/execution-config/reset-config?accountIdentifier=<account>&infra=k8' \
    --header 'Content-Type: application/json' \
    --data-binary @- << EOF
    [
        {
            "field": "addonTag"
        },
        {
            "field": "liteEngineTag"
        },
        {
            "field": "gitCloneTag"
        },
        {
            "field": "IACMTerraformTag"
        },
        {
            "field": "IACMOpentofuTag"
        }
    ]
    EOF
    ```
    </TabItem>
    <TabItem value="List custom images">
    View your custom Images via the `get-customer-config` endpoint:
    ```sh
    curl \
    -H 'x-api-key: <pat>' \
    'https://app.harness.io/gateway/iacm-manager/execution-config/get-customer-config?accountIdentifier=<account>&infra=k8'
    ```
    </TabItem>
    <TabItem value="View default images">
    View the default images via the `get-default-config` endpoint:
    ```sh
    curl \
    -H 'x-api-key: <pat>' \
    'https://app.harness.io/gateway/iacm-manager/execution-config/get-default-config?accountIdentifier=<account>&infra=k8'
    ```
    </TabItem>
</Tabs>
