---
title: Signing the Artifact
sidebar_label: Sign the Artifact
description: Artifact Signing
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CosignKeyGeneration from '/docs/software-supply-chain-assurance/shared/generate-cosign-key-pair.md';

Protect your software supply chain by safeguarding your artifacts from being compromised. Attackers may attempt to inject malicious code into your artifacts, aiming to tamper with your software supply chain. One of the primary goals of attackers is to get you to deploy compromised (or "poisoned") artifacts into your environments. In the worst-case scenario, your deployments could become a distribution channel for these poisoned artifacts, putting your customers and users at risk.

As artifacts pass through multiple stages in the software lifecycle, ensuring they remain secure and unaltered is critical. Artifact signing provides a reliable way to guarantee that the artifact built at one stage is the exact same artifact consumed or deployed at the next, with no chance of compromise. This process builds trust, ensures integrity, and strengthens the security of your software supply chain.


## Artifact Signing Process in SCS


In the Artifact Signing step, the artifacts are signed using [Cosign](https://docs.sigstore.dev/cosign/signing/overview/) with a private key and password. Later, the same key is used to verify the signature, and the signed artifact is pushed to the same container registry. This ensures the integrity and authenticity of the artifact throughout the software supply chain.

<DocImage path={require('./static/artifact-signing-excali.png')} width="100%" height="20%" />

<!-- ## Requirements

### Generate the keys for Artifact Signing

import GenerateKeysPrerequisite from '/docs/software-supply-chain-assurance/shared/generate-cosign-artifact.md';

<GenerateKeysPrerequisite /> -->

## Artifact Signing Step Configuration

The Artifact Signing step allows you to sign your artifacts and, optionally, push the signature as a `.sig` file to the same container registry.

Follow the instructions below to configure the Artifact Signing step.

* **Name**: Provide a name for the signing step.

* **Artifact Source**: Select the source container registry (e.g., DockerHub, ACR, GCR, ECR, etc.).

* **Container Registry**: Choose the Docker registry connector configured for your DockerHub container registry.

* **Image**: Enter the name of your image with tag, such as `my-docker-org/repo-name:tag`.

<Tabs>
  <TabItem value="dockerhub" label="DockerHub" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the DockerHub container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `my-docker-org/repo-name:tag`
</TabItem>

<TabItem value="ecr" label="ECR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Elastic container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `my-docker-repo/my-artifact`.

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Region:** The geographical location of your ECR repository, example `us-east-1`

* **Account ID:** The unique identifier associated with your AWS account.


</TabItem>

<TabItem value="gcr" label="GCR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `my-image`.

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Host:** Enter your GCR Host name. The Host name is regional-based. For instance, a common Host name is `gcr.io`, which serves as a multi-regional hostname for the United States. 

* **Project ID:** Enter the unique identifier of your Google Cloud Project. The Project-ID is a distinctive string that identifies your project across Google Cloud services. example: `my-gcp-project`


</TabItem>

<TabItem value="acr" label="ACR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Azure container registry where the artifact is stored.

* **Image:** Enter your image details in the format `<registry-login-server>/<repository>`. The `<registry-login-server>` is a fully qualified name of your Azure Container Registry. It typically follows the format `<registry-name>.azurecr.io`, where   `<registry-name>` is the name you have given to your container registry instance in Azure. Example input: `automate.azurecr.io/acr`

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Subscription Id:** Enter the unique identifier that is associated with your Azure subscription. 

</TabItem>

<TabItem value="gar" label="GAR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `repository-name/image`.

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Host:** Enter your GAR Host name. The Host name is regional-based. For example, `us-east1-docker.pkg.dev`.

* **Project ID:** Enter the unique identifier of your Google Cloud Project. The Project-ID is a distinctive string that identifies your project across Google Cloud services. example: `my-gcp-project`

</TabItem>


</Tabs>

You can perform the Artifact Signing with **Cosign** or **Cosign with Secret Manager**

import GenerateKeysPrerequisite from '/docs/software-supply-chain-assurance/shared/generate-cosign-artifact.md';

<GenerateKeysPrerequisite />



<DocImage path={require('./static/artifact-signnning.png')} width="50%" height="50%" />


**Attach Signature to Artifact Registry** (Optional):

* By default, the “Attach signature to Artifact registry” is unchecked which means the signature will not be uploaded to the artifact registry.Checking this option will push the signature as a .sig file to the registry.

## View Signed Artifacts


You can easily access the signed artifact details from the ["Artifacts Overview"](http://localhost:3000/docs/software-supply-chain-assurance/artifact-view#artifact-overview) tab. This section will display the signature along with information about the person who signed the artifact. Additionally, you can verify the signing details in the Chain of Custody, where a new entry is logged for every artifact signing event. This entry includes a link to the execution results and rekor log entries, allowing you to track the signing activity and cross-check the details.

<DocImage path={require('./static/artifact-overview.png')} width="100%" height="100%" />




:::note
You are allowed to re-sign the same image multiple times, with each new signing overwriting the previous one. The Artifacts Overview tab will always display the most up-to-date signing details, reflecting the latest signature information for the artifact.
:::

## Example Pipeline For Artifact Signing

This example demonstrates how you can configure and implement artifact signing and verification within a pipeline.

<details>
<summary>Example Pipeline for Signing the Artifact</summary>

This example demonstrate how you could set up Build stage to sign the artifact


Artifact signing step for the deployment stage is coming soon!

<Tabs>
<TabItem value="build" label="Build stage" default>

This example **Build** stage has three steps:

- **Build and Push an Image to Docker Registry**: Build the image and push it to a Docker registry (e.g., DockerHub, ACR, GCR, etc.).

- **Artifact Signing**: Sign the artifact with a private key and password to ensure its authenticity and integrity.

- **Artifact Verification**: Verify the signed artifact using the corresponding public key to confirm its source and integrity.


<DocImage path={require('./static/pipeline.png')} width="60%" height="60%" title="Click to view full size image" />


</TabItem>

</Tabs>

</details>

## Verify Artifact Signing

Once your artifacts are signed,you can [configure your pipeline to verify the artifact Signing](./artifact-verifying).