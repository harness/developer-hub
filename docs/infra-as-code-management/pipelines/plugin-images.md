---
title: Custom Images  
description: Create and use your own Terraform plugin images.
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness provides the flexibility to use custom images in your IaCM stage, which applies to individual infrastructure provisioning steps, such as the `init` step in an OpenTofu or Terraform pipeline stage. This guide walks you through the process of creating a custom image and incorporating it into your Harness pipelines.


<details>
    <summary>
        ## Network Connectivity Requirements
    </summary>
When using OpenTofu with Harness IaC Management (IaCM), it’s important to ensure that your environment allows the necessary network access for OpenTofu to function properly. OpenTofu relies on external services to download binaries, modules, and providers. If your environment is restricted, such as in air-gapped setups or strict firewall configurations, you may need to whitelist specific domains or use alternative strategies like custom images as mentioned above.

For example:
- In public internet access environments, ensuring the required domains are reachable will allow for seamless use of OpenTofu.
- In air-gapped environments, where internet access is restricted, you may need to use a custom image with pre-installed binaries or configure your environment to avoid external dependencies.

### Whitelist domains
To enable proper connectivity, ensure the following domains are accessible from your infrastructure:
- `get.opentofu.org` – Required for downloading the OpenTofu binaries.
- `registry.opentofu.org` – Used for resolving and downloading providers and modules.
- `github.com` – Necessary for accessing provider and module resources.
- `packages.opentofu.org` (Optional) – This domain is needed only for Redhat-based installations, but it can be bypassed by pre-caching binaries in your shared file system.

### Handle restricted network environments
If your environment does not have internet access, there are two potential solutions:
1. **Custom images:** You can build a custom image that includes the OpenTofu binaries. This image can be used in your pipeline, eliminating the need to access `get.opentofu.org`.
2. **Private module registry:** If you have a private module registry, `registry.opentofu.org` is not required. You can configure OpenTofu to resolve modules and providers from your internal registry.

### Firewall configuration
Make sure to configure your firewall to allow outbound access to the domains listed above, unless you have implemented one of the alternative solutions. Lack of access to these domains can cause errors when downloading providers or modules.
</details>

## Create an image
Harness allows you to create custom images based on a provided base image. This enables you to tailor the image to your specific needs and use it in your workflows.

:::warning Version Lock-In & Mitigating Challenges
Custom images created from our base image are **version-locked**, meaning they won't automatically update with new releases. While an outdated version might not cause pipeline failures, it could lack features, have security vulnerabilities, or face compatibility issues.

To keep your custom image current with our latest improvements, periodically check for updates to our base image and rebuild your custom image as needed. Proactively monitor our releases to fully benefit from the latest enhancements.

**Harness will log a warning if your image version is five versions behind the latest release, helping you detect out-of-date versions.**
:::

### Create a custom image
Create custom images with root-based and rootless custom containers for **Harness Cloud** and **Kubernetes** environments. The following examples demonstrate package installation via `microdnf` and direct binary installation for tools like `kubectl`.

<Tabs>
<TabItem value="Root-based custom container">
Create a root-based custom container for use in **Harness Cloud** and **Docker**.

Once your image is created, build with: `docker build -f Dockerfile --platform linux/amd64 --target custom-root -t harness_terraform_vm_custom`.
```sh
FROM plugins/harness_terraform_vm AS custom-root

## Example of an installation using the in-built "microdnf" package manager
RUN microdnf install -y wget
RUN microdnf clean all

## Example of downloading and installing a binary directly
## Binaries need to be suitable for the amd64 architecture
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
RUN install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```
</TabItem>
<TabItem value="Rootless custom container">
Create a custom container for use in **Kubernetes**.

Once your image is created, build with: `docker build -f Dockerfile --platform linux/amd64 --target custom-root -t harness_terraform_custom`.
```sh
FROM plugins/harness_terraform AS custom-rootless

## Switch to root temporarily so that we can install extra tools
USER root

## Example of an installation using the in-built "microdnf" package manager
RUN microdnf install -y wget
RUN microdnf clean all

## Example of downloading and installing a binary directly
## Binaries need to be suitable for the amd64 architecture
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
RUN install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

## Switch back to the "harness" user now that all tools are installed
USER harness
```
</TabItem>
</Tabs>

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
---

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
:::note
In this example, the `image` attribute **(1)** in the YAML points to the plugin image hosted in the Elastic Container Registry (ECR) to store your Docker images securely. 

If it's in a private ECR, create a connector and define the `connectorRef` **(2)** to allow Harness access and to ensure the `apply` step in your pipeline uses the 'private_harness_terraform_plugin' and has access to `kubectl` and `kustomize` for operations.
:::

---
## IACM execution-config
To use images from your repository in an IACM stage, you can use the `execution-config` API endpoints. 

:::note
Although some images mentioned here are also used by [CI](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci/), it's important to note that any overrides specified using the IACM `execution-config` APIs are not applied to CI stages and vice versa. The images that can be overridden are:

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

## Conclusion
In conclusion, custom images provide a powerful way to optimize your IaCM pipelines. By staying proactive with updates and leveraging the flexibility of Harness, you can ensure robust, secure, and efficient infrastructure management. Ready to take the next step? Implement these strategies and watch your deployment processes transform!
