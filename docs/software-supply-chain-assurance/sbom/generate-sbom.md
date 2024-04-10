---
title: Generate and Manage Software Bill of Materials (SBOM)
description: Generate and Manage SBOM with Harness SSCA
sidebar_position: 10
sidebar_label: Generate SBOM
redirect_from:
  - /docs/software-supply-chain-assurance/generate-sbom
  - /tutorials/secure-supply-chain/generate-sbom
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Software Bill of Materials (SBOM) is an exhaustive list of all components, libraries, and other dependencies utilized in a software application. The **SBOM Orchestration** step within Harness SSCA facilitates the generation of SBOMs for your software artifacts.

This document elaborates on utilizing the SBOM Orchestration step for SBOM generation. If you already possess an SBOM and wish to ingest it, please refer to the [Ingest SBOM](./ingest-sbom-data.md) section.


## Requirements
### Prepare a pipeline

You can generate the SBOM in both the **Build** and **Deploy** stages of your Harness pipeline.

<details>
<summary>Example Pipeline for SBOM generation</summary>

These example demonstrate how you could set up Build and Deploy stages to generate SBOM.

<Tabs>
<TabItem value="build" label="Build stage" default>

This example **Build** stage has three steps:

- **Run** step: Build and test an artifact (image).
- **Build and Push an image to Docker Registry** step: Build and push the image to a Docker registry.
- **SBOM Orchestration** step: Generate the SBOM.


<DocImage path={require('./static/sbom-gen-build-stage.png')} width="60%" height="60%" title="Click to view full size image" />


</TabItem>
<TabItem value="deploy" label="Deploy stage">

SBOM Orchestration in deploy stage can only be used in the [Containerized Step Groups](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups)
This example **Deploy** stage has two steps:

- **SBOM Orchestration** step: Generate the SBOM.
- **Rolling deployment** step: Deploy the image.

<DocImage path={require('./static/sbom-gen-deploy-stage.png')} width="60%" height="60%" title="Click to view full size image" />

</TabItem>
</Tabs>

</details>

### Generate the keys for SBOM Attestation - optional
For enhanced trust and verification of your SBOM's integrity, the SBOM Orchestration step offers optional signing and attestation generation. This functionality requires a private key, password, and corresponding public key. If you choose to skip signing, you can proceed without generating or storing these keys.

Here's how to set these keys if you choose to enable signing

- **Generate the keys**: Begin by generating the keys using [Cosign](https://docs.sigstore.dev/signing/quickstart)
- **Securely store the keys**: Safeguard the generated private key, public key, and password by creating [Harness file secrets](https://developer.harness.io/docs/platform/secrets/add-file-secrets/) for each.


## Add the SBOM Orchestration step

Use the **SBOM Orchestration** step to generate an SBOM in either the **Build** or **Deploy** stage of a Harness pipeline.

* In a **Build** stage, add the **SBOM Orchestration** step after the artifact (image) has been pushed to an artifact repository.
* In a **Deploy** stage, add the **SBOM Orchestration** step before the deployment step.

:::info 

SBOM Orchestration and Enforcement steps in deploy stage can only be used in the [Containerized Step Groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups.md)

:::

The **SBOM Orchestration** step includes various settings for generating the SBOM for both Containers and Repositories. We will delve into the different fields that need to be configured for each option to support the generation of the SBOM.

* **Name:** Enter a name for the step.

* **Step Mode:** Select **Generation**.

* **SBOM Tool:** Select **Syft**, which is the tool Harness uses to generate the SBOM. For other SBOM tools, go to [Ingest SBOM](./ingest-sbom-data.md).

* **SBOM Format:** Select **SPDX** or **CycloneDX**.

The Artifact Source allows you to specify the source of the artifact. Presently, the SBOM Orchestration step supports both containers and code repositories. Specifically for containers, it offers native support with DockerHub and ECR. Here's how you can configure them accordingly.

:::warning Deprecation Alert:

Please note that the previously available `Container` option, has now been deprecated. In its place, we now offer native support for DockerHub, ECR, GCR, and ACR. Additionally, the support for other registries is coming soon. We encourage users to connect to their registries using the dedicated options available within the list of artifact sources.

:::

<Tabs>
  <TabItem value="dockerhub" label="DockerHub" default>

* **Artifact Type:** Select **DockerHub**.

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the DockerHub container registry where the artifact is stored.

* **Image:** Enter the name of your image with tag, such as `my-docker-org/repo-name:tag`.

* **Private Key:** The [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the private key to use to sign the attestation.

* **Password:** The [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing the password for the private key.

* **SBOM Drift:** This feature allows you to track changes in SBOMs, it can detect the changes by comparing the generated SBOM against a specified one. For an in-depth understanding of this functionality, please refer to the [SBOM Drift documentation](./SBOM-Drift.md). If you prefer not to detect any changes in SBOMs, leave this option unchecked.


<DocImage path={require('./static/dockerhub-sbom.png')} width="50%" height="50%" title="Click to view full size image" />

</TabItem>

<TabItem value="ecr" label="ECR" default>

* **Artifact Type:** Select **ECR**.

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Elastic container registry where the artifact is stored.

* **Image:** Enter the name of your image with tag for the image for which you're generating an SBOM, such as `my-docker-repo/my-artifact:latest`.

* **Region:** The geographical location of your ECR repository.

* **Account ID:** The unique identifier associated with your AWS account.

* **Private Key:** The [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the private key to use to sign the attestation.

* **Password:** The [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing the password for the private key.

* **SBOM Drift:** This feature allows you to track changes in SBOMs, it can detect the changes by comparing the generated SBOM against a specified one. For an in-depth understanding of this functionality, please refer to the [SBOM Drift documentation](./SBOM-Drift.md). If you prefer not to detect any changes in SBOMs, leave this option unchecked.

<DocImage path={require('./static/ecr-sbom.png')} width="50%" height="50%" title="Click to view full size image" />


</TabItem>

<TabItem value="gcr" label="GCR" default>

* **Artifact Type:** Select **GCR**.

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google container registry where the artifact is stored.

* **Image:** Enter the name of your image with tag for which you're generating the SBOM, example `docker-image:tag`.

* **Host:** Enter your GCR Host name. The Host name is regional-based. For instance, a common Host name is `gcr.io`, which serves as a multi-regional hostname for the United States. 

* **Project ID:** Enter the unique identifier of your Google Cloud Project. The Project-ID is a distinctive string that identifies your project across Google Cloud services. example: `my-gcp-project`

* **Private Key:** The [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the private key to use to sign the attestation.

* **Password:** The [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing the password for the private key.

* **SBOM Drift:** This feature allows you to track changes in SBOMs, it can detect the changes by comparing the generated SBOM against a specified one. For an in-depth understanding of this functionality, please refer to the [SBOM Drift documentation](./SBOM-Drift.md). If you prefer not to detect any changes in SBOMs, leave this option unchecked.


<DocImage path={require('./static/gcr-sbom.png')} width="50%" height="50%" title="Click to view full size image" />


</TabItem>

<TabItem value="acr" label="ACR" default>

* **Artifact Type:** Select **ACR**.

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google container registry where the artifact is stored.

* **Image:** Enter your image details in the format `<registry-login-server>/<repository>:<tag>`. The `<registry-login-server>` is a fully qualified name of your Azure Container Registry. It typically follows the format `<registry-name>.azurecr.io`, where   `<registry-name>` is the name you have given to your container registry instance in Azure. Example input: `automate.azurecr.io/acr:test`

* **Subscription Id:** Enter the unique identifier that is associated with your Azure subscription. 

* **Private Key:** The [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the private key to use to sign the attestation.

* **Password:** The [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing the password for the private key.

* **SBOM Drift:** This feature allows you to track changes in SBOMs, it can detect the changes by comparing the generated SBOM against a specified one. For an in-depth understanding of this functionality, please refer to the [SBOM Drift documentation](./SBOM-Drift.md). If you prefer not to detect any changes in SBOMs, leave this option unchecked.

<DocImage path={require('./static/acr-sbom.png')} width="50%" height="50%" title="Click to view full size image" />

</TabItem>

  <TabItem value="Repository" label="Repository">

* **Artifact Type:** Select **Repository**.

    :::info

    The **Repository** option requires that your repository is cloned into the stage workspace before the SBOM Orchestration step runs. There are several ways you can do this:
    * Clone the codebase by default, such as a [Build stage's default codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase).
    * Add a [Git Clone step](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/git-clone-step/) or [Run step](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/run-step/) to the Deploy stage.
    * Add a [Git Clone step or Run step to a Build stage](/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline).

    :::
* **Repository URL:** The Repository URL you've configured for cloning into the workspace.
* **Source Path:** Leave blank or enter a path (in the repository) for which you want to generate SBOM. Use this setting to generate SBOM for a specific section of your code repo, rather than your entire repo. The path must start with `/`.
   For example, if your repository URL is `https://github.com/username/repo`, and you want to generate SBOM for `https://github.com/username/repo/service-core/source`, then enter `/service-core/source` for **Source Path**.
   To generate an SBOM for the entire repository, leave this field empty.
* **Git Branch:** The branch of the repository for which you want to generate the SBOM.
* **Workspace:** If you cloned the codebase to a different directory than the root workspace directory (`/harness`), enter the path to the subdirectory using the format `/harness/PATH/TO/SUBDIRECTORY`. Leave this field empty if you cloned your codebase into the default directory (`/harness`). Usually, your codebase is only cloned into a non-default directory if you are [cloning multiple codebases](/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline) into a pipeline.
* **SBOM Drift:** Select this option if you want to [track changes in SBOM](./SBOM-Drift.md). Harness SSCA can detect the changes by comparing the generated SBOM against a specified base/primary SBOM.

<DocImage path={require('./static/repo-sbom.png')} width="50%" height="50%" title="Click to view full size image" />

<!-- ![](./static/sbom-deploy-stage.png) -->

</TabItem>
</Tabs>


## Run the pipeline

When the pipeline runs, the **SBOM Orchestration** step performs the following actions:

- Generates an SBOM in the chosen format for both Containers and Repositories.
- Specifically for Containers:
  - Generates and signs an attestation using the provided private key and password.
  - Stores the SBOM in Harness and uploads the `.att` file to your container registry. 

SBOMs for both Containers and Code Repositories are accessible in the [Artifacts view](../artifact-view.md). Additionally, you can locate the SBOM for any artifact on the **Supply Chain** tab within the **Execution Details** page in Harness. For detailed insights, please refer to the [view pipeline execution results](../ssca-view-results.md#view-sbom-and-drift-analysis) documentation.


## Next steps

After generating an SBOM, you can apply [SBOM Policy Enforcement](../ssca-policies/overview.md) to achieve open source governance.