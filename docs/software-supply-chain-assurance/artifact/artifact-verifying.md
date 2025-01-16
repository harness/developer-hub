---
title: Verifying the Artifact
sidebar_label: Verify the Artifact
description: Artifact Verification
sidebar_position: 1
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


After signing the artifact in the [Artifact Signing step](http://localhost:3000/docs/software-supply-chain-assurance/artifact/artifact-signing#artifact-signing-process-in-scs), it’s crucial to verify that it hasn’t been tampered with and was signed by a trusted source. The Artifact Verification process enables you to validate the integrity and authenticity of the signed artifact before it’s deployed.

## Artifact Verification in SCS

The artifact verification step ensures the authenticity of the signed artifact. It requires the public key to perform the verification. If the public key matches the signed artifact, it confirms that the artifact is intact, secure, and originates from a trusted source.



## Artifact Verification Step Configuration


The Artifact Verification step validate the signature of a signed artifact to ensure its authenticity and integrity, confirming that it was signed by a trusted entity.

Follow the instructions below to configure the Artifact Verification step.

Configuration Steps:

* **Name**: Provide a name for the verification step.

* **Artifact Source**: Select the source container registry (e.g., DockerHub, ACR, GCR, ECR, etc.).

<Tabs>
  <TabItem value="dockerhub" label="DockerHub" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the DockerHub container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `my-docker-org/repo-name:tag` or you can use the digest `my-docker-org/repo-name@sha256:<digest>`

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

* **Image**: Enter the name of your image, example repository-name/image.

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


<DocImage path={require('./static/artifact-verifyying.png')} width="50%" height="50%" />

## View Verified Artifacts

Once the artifact is signed and verified, you will be able to see the Artifact Integrity Verification status from the [Artifacts Overview](http://localhost:3000/docs/software-supply-chain-assurance/artifact-view#artifact-overview) tab.


* If the signed artifact is successfully verified using the public key, the verification status is displayed as Passed, along with a link to the corresponding Rekor log entry.

* If the public key does not match the signed artifact, the verification status is displayed as failed suggesting the possibility of artifact compromise.

<DocImage path={require('./static/artifact-ovverview.png')} width="100%" height="100%" />



## Example Pipeline For Artifact Verification

This example demonstrates how to implement artifact Verification in the Build stage of the pipeline.


:::note

At present, Harness does not support artifact verification in the deployment stage, However this is part of our roadmap.

:::


This example **Build** stage has three steps:

- **Build and Push an Image to Docker Registry**: Build the image and push it to a Docker registry (e.g., DockerHub, ACR, GCR, etc.).

- **Artifact Signing**: Sign the artifact with a private key pair to ensure its authenticity and integrity.

- **Artifact Verification**: Verify the signed artifact using the corresponding public key to confirm its source and integrity.


<DocImage path={require('./static/sample-pipeline.png')} width="100%" height="100%" />

