---
title: Verify SLSA
description: Verify SLSA Provenance with Harness SCS
sidebar_position: 20
redirect_from:

- /docs/software-supply-chain-assurance/slsa/verify-slsa


tags:
  - artifact-security
  - slsa
  - harness-scs
  - verify-slsa
  - slsa-verification
  - slsa-provenance-verification
  - slsa-attestation-verification
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this document, we'll explore how to verify SLSA Provenance attestation and enforce policies to guarantee the provenance contents remain unaltered. Unlike the setup for SLSA provenance generation, the verification process can be conducted in both the Build and Deploy stages of your pipeline. Here’s an overview of the procedure:

<DocImage path={require('./static/overview-slsa-ver.png')} width="90%" height="90%" />


## Configure the SLSA verification step

In the Harness SCS, the SLSA verification step is responsible for verifying the attested provenance and applying policies. To incorporate this, navigate to either the build or deploy stage of your pipeline and add the "SLSA Verification" step. When adding this to a deploy stage, ensure it's placed within a [container step group](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/) and you enable the `container based execution`.

<DocImage path={require('./static/verify-slsa.png')} width="100%" height="100%" />
    

### Container Images

Follow the instructions below to configure the **SLSA Verification** step for container images.

* **Name**: Enter a name for the step.
* **Registry Type**: Choose your registry from the list of supported items.

:::info

When modifying the existing SLSA steps, you must manually remove the digest from the YAML configuration to ensure compatibility with the updated functionality.

:::

<Tabs>

<TabItem value="har" label="HAR" default>

* **Registry:** Select the Harness Registry configured for the Harness Artifact Registry where your artifact is stored.

* **Image:** Enter the name of your image with tag or digest, such as `imagename:tag` or `imagename@sha256:<digest>`.

</TabItem>

  <TabItem value="dockerhub" label="Docker Registry" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the DockerHub container registry where the artifact is stored.

* **Image:** Enter the name of your image using a tag or digest, example `my-docker-org/repo-name:tag` or `my-docker-org/repo-name@sha256:<digest>`.

</TabItem>

<TabItem value="ecr" label="ECR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Elastic container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `my-docker-repo/my-artifact` or `my-docker-repo/my-artifact@sha256:<digest>`.

* **Region:** The geographical location of your ECR repository, example `us-east-1`.

* **Account ID:** The unique identifier associated with your AWS account.


</TabItem>

<TabItem value="gar" label="GAR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google container registry where the artifact is stored.

* **Host:** Enter your GAR Host name. The Host name is regional-based. For example, `us-east1-docker.pkg.dev`.

* **Project ID:** Enter the unique identifier of your Google Cloud Project. The Project-ID is a distinctive string that identifies your project across Google Cloud services. Example: `my-gcp-project`.

* **Image Name:** Enter the name of your image with tag oe digest, example `repository-name/image:tag` or `repository-name@sha256:<digest>`.


</TabItem>

<TabItem value="acr" label="ACR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Azure container registry where the artifact is stored.

* **Image:** Enter your image details in the format `<registry-login-server>/<repository>`. The `<registry-login-server>` is a fully qualified name of your Azure Container Registry. It typically follows the format `<registry-name>.azurecr.io`, where `<registry-name>` is the name you have given to your container registry instance in Azure. Example: `automate.azurecr.io/<my-repo>:tag` or you can use digest `automate.azurecr.io/<my-repo>@sha256:<digest>`

* **Subscription Id:** Enter the unique identifier that is associated with your Azure subscription.


</TabItem>
</Tabs>

### Non-Container Artifacts

SLSA verification supports both container images and non-container artifacts. Non-container artifacts are files or packages that are not packaged as container images, such as binaries, manifests, or archives. They are identified using their digest (SHA). This digest is used to match the artifact with its corresponding provenance during verification.

Ensure that the artifact and its digest are generated earlier in the pipeline, typically via a <a href="/docs/continuous-integration/use-ci/run-step-settings/#add-the-run-step" target="_blank">Run step</a>, and that SLSA provenance is already available. Use the same artifact reference in the SLSA Verification step.

To verify SLSA Provenance for Non-Container Artifacts:

1. Enter a **Name** for the step under `Name`. Harness automatically generates a step ID from the name. Once the pipeline is created, you can't change the ID.
2. Select **Harness Local Stage** as the **Source**.
3. Specify the same workspace artifact path that was used during the SLSA Generation step under `Workspace Artifact Path`. This path must point to the exact location of the artifact within the workspace so that it can be matched with its provenance during verification. The default workspace path is `/harness`.

<DocImage path={require('./static/verify-slsa-non-container-image.png')} width="100%" height="100%" title="Click to view full size image" />

### Verify SLSA Attestation

Verification is the process of validating a provenance attestation to ensure its authenticity and integrity. It confirms that the attestation was signed by a trusted source, has not been tampered with, and corresponds to the expected artifact. In the SLSA Verification step, SLSA attestation verification ensures that only trusted, compliant artifacts are allowed to proceed in the pipeline. To understand the verification process, see [attestation and verification](/docs/software-supply-chain-assurance/get-started/key-concepts#attestation-and-verification) concepts.

You can perform verification using Cosign with the following verification methods:

* **Keyless** - Uses short-lived, automatically generated keys based on identity to verify SLSA provenance without storing private keys.
* **Key-based** - Uses a user-managed private and public key pair to verify SLSA provenance, requiring secure key storage and handling.
* **Secret Manager** - A secure service used to store, manage, and access sensitive data such as cryptographic keys without exposing them directly in pipelines.

Based on the verification type you select, click the tab below and specify the configurations for the SLSA Verification step to perform the verification.

import CosignVerificationSlsaOptions from '/docs/software-supply-chain-assurance/shared/cosign-verification-slsa-options.md';

<CosignVerificationSlsaOptions />



## Enforce Policies on SLSA Provenance

Immediately following the verification of the provenance attestation, you have the option to configure the step to enforce policies on the provenance. This ensures that the contents of the provenance remain unchanged and have not been tampered with.

To enforce policies, navigate to the Advanced tab of the **SLSA Verification** step, expand the **Policy Enforcement** section, and specify the policy sets you wish to enforce.

<DocImage path={require('./static/slsa-ver-policy-enforce.png')} width="50%" height="50%" />



## Run the pipeline

When the pipeline runs, the **SLSA Verification** step does the following:

* Verifies the authenticity of the attestation.
* Verifies the provenance data by applying the specified policy set.
* Records the policy evaluation results in the step's logs.
* Reports the overall pass/fail for SLSA verification on the **Supply Chain** tab.


For more information about inspecting SLSA verification results, go to view pipeline execution results in the supply chain tab.

<DocImage path={require('./static/scs-slsa-verification.png')} width="100%" height="100%" />

## Verify provenance from third-party build systems

You can use Harness SCS to verify provenance generated by third-party build systems.

To do this:

1. Get the public key.
2. [Create SLSA policies](#create-slsa-policies) that verify the provenance data according to the provenance structure used by in the build system provider.
3. [Add SLSA Verification step](#verify-slsa-attestation).
