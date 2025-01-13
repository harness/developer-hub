---
title: Verifying the Artifact in SCS
sidebar_label: Verifying the Artifact
description: Artifact Verification
sidebar_position: 1
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


In a secure software supply chain, verifying the integrity and authenticity of artifacts is as crucial as signing them. After an artifact is signed, it is essential to confirm that it remains untampered with and was signed by a trusted source. The Artifact Verification process allows you to validate that a signed artifact has not been altered and is authentic,ensuring that it meets security standards before deployment

## Artifact Verification in SCS

The artifact verification step ensures the authenticity of the signed artifact. It requires the public key to perform the verification. If the public key matches the signed artifact, it confirms that the artifact is intact, secure, and originates from a trusted source, providing assurance of its integrity and authenticity.


## Artifact Verification Step Configuration


The Artifact Verifying step ensures the integrity of the signed artifact by comparing its original signature with a new one generated from the artifact. If the two match, it confirms the artifact is unchanged, safe, and comes from a trusted source.

Configuration Steps:

* **Name**: Provide a name for the verification step.

* **Artifact Source**: Select the source container registry (e.g., DockerHub, ACR, GCR, ECR, etc.).

* **Container Registry**: Choose the Docker registry connector configured for your DockerHub container registry.

* **Image**: Enter the name of your image (e.g., my-docker-org/repo-name).

<Tabs>
  <TabItem value="dockerhub" label="DockerHub" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the DockerHub container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `my-docker-org/repo-name`.

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

:::note

The Image name for both the artifact signing and verification steps must be the same.

:::

You can verify the signed artifact with **Cosign** or **Cosign with Secret Manager**

import CosignVerificationOptions from '/docs/software-supply-chain-assurance/shared/cosign-verification-options.md';

<CosignVerificationOptions />


<DocImage path={require('./static/artifact-verifying.png')} width="70%" height="10%" />

## View Verified Artifacts

Once the artifact is signed and verified, you will be able to see a section for Artifact Integrity Verification under the Overview section inside the Artifact Metadata.

Events for both success and failure are displayed in the chain of custody with a link to the step execution.

* If the signed artifact is successfully verified using the public key, the verification status is displayed as successful, along with a link to the corresponding public Rekor log entry.

* If the public key does not match the signed artifact, a failure state is shown along with a link to the failed step. The failure reason will indicate that the signatures do not match, suggesting the possibility of artifact compromise.

<details>
<summary>Example Pipeline for Verifying the Artifact</summary>

This example demonstrate how you could set up Build stage to verify the artifact

Artifact Verification step for the deployment stage is coming soon!

<Tabs>
<TabItem value="build" label="Build stage" default>

This example **Build** stage has three steps:

- **Build and Push an Image to Docker Registry**: Build the image and push it to a Docker registry (e.g., DockerHub, ACR, GCR, etc.).

- **Artifact Signing**: Sign the artifact with a private key and password to ensure its authenticity and integrity.

- **Artifact Verification**: Verify the signed artifact using the corresponding public key to confirm its source and integrity.


<DocImage path={require('./static/sample-pipeline.png')} width="60%" height="60%" title="Click to view full size image" />


</TabItem>

</Tabs>

</details>

