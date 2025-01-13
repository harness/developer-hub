---
title: Signing the Artifact in SCS
sidebar_label: Signing the Artifact
description: Artifact Signing
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CosignKeyGeneration from '/docs/software-supply-chain-assurance/shared/generate-cosign-key-pair.md';

Protecting your software supply chain starts with safeguarding your artifacts from getting compromised. Malicious actors may attempt to compromise your artifacts by injecting harmful code, aiming to infiltrate your software supply chain. The goal of these attackers is for you to unknowingly deploy these compromised (or "poisoned") artifacts to your production servers. In the worst-case scenario, your production software could then become a distribution channel for the poisoned artifacts, further jeopardizing your customers and users

When a release occurs, the artifacts are pulled from the registry and deployed to your production servers, serving your customers with your latest and greatest software. (What a beautiful picture!). But what if someone gained access to your registry and replaced your artifact with a different, malicious artifact? This is called artifact poisoning.

As artifacts pass through multiple stages in the software lifecycle, it’s vital to ensure they remain secure and unaltered.Artifact signing offer a reliable way to prove that the artifact built by X is the exact same artifact consumed or deployed by Y, with no opportunity for compromise in security. This process builds trust, integrity and enhances the security of your software supply chain.


## Artifact Signing Process in SCS

The Artifact Signing process in SCS is a critical step to ensure artifact security and build trust in your software supply chain. Using [Cosign](https://docs.sigstore.dev/about/overview/) , you can sign OCI container images with a private key and password after they are built and pushed via the Harness pipeline. This generates a signature that verifies the integrity of the image and confirms its origin.These measures collectively ensure that the artifact remains secure and traceable, giving you and your users confidence in its authenticity.

<DocImage path={require('./static/artifact-signing-excali.png')} width="100%" height="20%" />

<!-- ## Requirements

### Generate the keys for Artifact Signing

import GenerateKeysPrerequisite from '/docs/software-supply-chain-assurance/shared/generate-cosign-artifact.md';

<GenerateKeysPrerequisite /> -->

## Artifact Signing Step Configuration

The Artifact Signing step enables you to sign your artifacts and optionally to push the signature as a `.sig` file to the artifact registry.

Follow the instructions below to configure the Artifact Signing step.

* **Name**: Provide a name for the signing step.

* **Artifact Source**: Select the source container registry (e.g., DockerHub, ACR, GCR, ECR, etc.).

* **Container Registry**: Choose the Docker registry connector configured for your DockerHub container registry.

* **Image:** Enter the name of your image, example `my-docker-org/repo-name`.

You can perform the Artifact Signing with **Cosign** or **Cosign with Secret Manager**

import GenerateKeysPrerequisite from '/docs/software-supply-chain-assurance/shared/generate-cosign-artifact.md';

<GenerateKeysPrerequisite />



<DocImage path={require('./static/artifact-signning.png')} width="70%" height="20%" />


* By default, the “Attach signature to Artifact registry” is unchecked which means the signature will not be uploaded to the artifact registry.


* Checking this option will add the signature as a `.sig` file to the registry.

### View Signed Artifacts:


After signing the artifact, you can easily access its signed details from the "Artifacts Overview" tab. This section will display the signature along with information about the person who signed the artifact. Additionally, you can verify the signing details in the Chain of Custody, where you will find execution results and log entries for further cross-checking.



:::note
You are allowed to re-sign the same image multiple times, with each new signing overwriting the previous one. The Overview tab will always display the most up-to-date signing details, reflecting the latest signature information for the artifact.
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


<DocImage path={require('./static/sample-pipeline.png')} width="60%" height="60%" title="Click to view full size image" />


</TabItem>

</Tabs>

</details>

## Verify Artifact Signing

Once your artifacts are signed,you can [configure your pipeline to verify the artifact Signing](./artifact-verifying).