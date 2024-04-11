---
title: Generate and manage SBOM
description: Generate and manage SBOM with Harness SSCA
sidebar_position: 10
sidebar_label: Generate SBOM
redirect_from:
  - /docs/software-supply-chain-assurance/generate-sbom
  - /tutorials/secure-supply-chain/generate-sbom
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import SbomAbout from '/docs/software-supply-chain-assurance/shared/sbom-about.md';


<SbomAbout />

## Generate SBOM in Harness

These instructions describe how to generate SBOM with the Harness **SSCA Orchestration** step. This step uses Syft. For other SBOM tools, go to [Ingest SBOM](./ingest-sbom-data.md). For information about enforcing SSCA policies, go to Enforce [SSCA policies](https://developer.harness.io/docs/category/enforce-ssca-policies)

### Prepare a pipeline

To generate SBOM in Harness, you need a pipeline with a [CI (build) stage](/docs/continuous-integration/use-ci/prep-ci-pipeline-components), a [CD (deploy) stage](/docs/continuous-delivery/get-started/key-concepts#stage), or both.

<details>
<summary>SBOM generation and enforcement architecture</summary>

These example demonstrate how you could set up Build and Deploy stages to generate SBOM and enforce policies.

<Tabs>
<TabItem value="build" label="Build stage" default>

This example **Build** stage has three steps:

- **Run** step: Build and test an artifact (image).
- **Build and Push an image to Docker Registry** step: Build and push the image to a Docker registry.
- **SSCA Orchestration** step: Generate the SBOM.

<!-- ![](./static/sbom-build-stage.png) -->

<DocImage path={require('./static/sbom-build-stage.png')} />

</TabItem>
<TabItem value="deploy" label="Deploy stage">

This example **Deploy** stage has two steps:

- [**SSCA Enforcement** step](../ssca-policies/enforce-ssca-policies): Enforce SSCA policies.
- **Rolling deployment** step: Based on the results of the policy evaluation, deploy the image.

<!-- ![](./static/sbom-deploy-stage.png) -->

<DocImage path={require('./static/sbom-deploy-stage.png')} />

</TabItem>
</Tabs>

</details>

### Generate a key pair

Keys are used to sign and verify attestations.

1. Use [Cosign](https://docs.sigstore.dev/key_management/signing_with_self-managed_keys/) to generate a public and private key pair
2. Create two [Harness file secrets](/docs/platform/secrets/add-file-secrets), one for the private key file and one for the public key file.
3. Create a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) to store the password for the private key.

### Add the SSCA Orchestration step

Use the **SSCA Orchestration** step to generate an SBOM in either the **Build** or **Deploy** stage of a Harness pipeline.

* In a **Build** stage, add the **SSCA Orchestration** step after the artifact (image) has been pushed to an artifact repository.
* In a **Deploy** stage, add the **SSCA Orchestration** step before the deployment step.

:::info 

SSCA Orchestration and Enforcement steps in deploy stage can only be used in the [Containerized Step Groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups.md)

:::

The **SSCA Orchestration** step includes various settings for generating the SBOM for both Containers and Repositories. We will delve into the different fields that need to be configured for each option to support the generation of the SBOM.

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

    The **Repository** option requires that your repository is cloned into the stage workspace before the SSCA Orchestration step runs. There are several ways you can do this:
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


### Run the pipeline

When the pipeline runs, the **SSCA Orchestration** step performs the following actions:

- Generates an SBOM in the chosen format for both Containers and Repositories.
- Specifically for Containers:
  - Generates and signs an attestation using the provided key and password.
  - Stores the SBOM in Harness and uploads the `.att` file to your container registry to accompany the image.

The signed attestation for an Image, stored as an `.att` file, is placed in the artifact repository alongside the Image. 

SBOMs for both Containers and Code Repositories are accessible in the [Artifacts view](../artifact-view.md). Additionally, you can locate the SBOM for any artifact on the **Supply Chain Assurance** tab within the **Execution Details** page in Harness. For detailed insights, please refer to the [view pipeline execution results](../ssca-view-results.md) documentation.


## Enforce policies

After generating an SBOM, you can use it to [enforce SSCA policies](../ssca-policies/enforce-ssca-policies.md).
