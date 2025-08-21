---
title: Verify the Signed Artifacts
sidebar_label: Verify the Artifact
description: Verify the artifacts that are signed using the Artifact Signing step

sidebar_position: 8

redirect_from:

  - /docs/software-supply-chain-assurance/artifact/verify-signed-artifacts

---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


After you sign the artifact using the [Artifact Signing step](/docs/software-supply-chain-assurance/artifact-security/sign-verify/sign-artifacts), it’s crucial to verify that the artifact has not been tampered and was signed by a trusted source. The Artifact Verification process enables you to validate the integrity and authenticity of the signed artifact before it’s deployed.

<!-- :::note 
Currently, this feature is behind the feature flag `SSCA_ARTIFACT_SIGNING`. Contact Harness Support to enable the feature.
::: -->

## Artifact Verification in SCS

The artifact verification step ensures the authenticity of the signed artifact by validating it with the corresponding public key. If the public key matches the signed artifact it confirms that the artifact is intact, secure, and originates from a trusted source.

<DocImage path={require('./static/excali-verify.png')} width="80%" height="60%" />

## Artifact Verification step configuration

The Artifact Verification step pulls the `.sig` file from the artifact registry and verifies it with the corresponding public key. In the artifact signing step, if you have chosen not to push the `.sig` file to the registry, then for the artifact verification `.sig` file will instead be pulled from the Harness database. This process ensures that the artifact was signed by a trusted entity, thereby confirming its integrity and authenticity.

Artifact Verification step supports both [container](/docs/software-supply-chain-assurance/artifact-security/sign-verify/verify-signed-artifacts#container-images) and [non-container images](/docs/software-supply-chain-assurance/artifact-security/sign-verify/verify-signed-artifacts#non-container-images).

<DocImage path={require('./static/artifact-verify.png')} width="50%" height="50%" />

### Container Images

You can search for **Artifact Verification** and add it to either the **Build** , **Deploy** or **Security** stage of a Harness pipeline

Follow the instructions below to configure the Artifact Verification step.

* **Name**: Provide a name for the verification step.

* **Artifact Source**: Select the source container registry (e.g., DockerHub, ACR, ECR, etc.).


<Tabs>

  <TabItem value="dockerhub" label="Docker Registry" default >

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the DockerHub container registry where the artifact is stored.

* **Image:** Enter the name of your image using a tag or digest, example `my-docker-org/repo-name:tag` or `my-docker-org/repo-name@sha256:<digest>`

</TabItem>

<TabItem value="ecr" label="ECR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Elastic container registry where the artifact is stored.

* **Image:** Enter the name of your image using a tag or digest, example `my-docker-repo/my-artifact:tag`or you can use the digest `my-docker-repo/my-artifact@sha256:<digest>`

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Region:** The geographical location of your ECR repository, example `us-east-1`

* **Account ID:** The unique identifier associated with your AWS account.

:::note
OIDC Auth type is not supported.
:::


</TabItem>

<TabItem value="acr" label="ACR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Azure container registry where the artifact is stored.

* **Image:** Enter your image details in the format `<registry-login-server>/<repository>`. The `<registry-login-server>` is a fully qualified name of your Azure Container Registry. It typically follows the format `<registry-name>.azurecr.io`, where `<registry-name>` is the name you have given to your container registry instance in Azure. Example input: `automate.azurecr.io/<my-repo>:tag` or you can use digest `automate.azurecr.io/<my-repo>@sha256:<digest>`

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Subscription Id:** Enter the unique identifier that is associated with your Azure subscription. 

:::note
OIDC Auth type is not supported.
:::

</TabItem>

<TabItem value="gar" label="GAR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google container registry where the artifact is stored.

* **Image:**: Enter the name of your image using tag or digest, example `repository-name/image:tag` or you can use digest `repository-name/image@sha256:<digest>`

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Host:** Enter your GAR Host name. The Host name is regional-based. For example, `us-east1-docker.pkg.dev`.

* **Project ID:** Enter the unique identifier of your Google Cloud Project. The Project-ID is a distinctive string that identifies your project across Google Cloud services. example: `my-gcp-project`

:::note
OIDC Auth type is not supported.
:::

</TabItem>


</Tabs>

You can verify the signed artifact with **Cosign** or **Cosign with Secret Manager**

import CosignVerificationOptions from '/docs/software-supply-chain-assurance/shared/cosign-verification-options.md';

<CosignVerificationOptions />


### Non-Container Images

Artifacts aren't limited to container images. Signed non-container artifacts can also be verified where the unique identifier (digest SHA) generated during the signing step is used to locate and verify the artifact during the verification process.

To configure Artifact Verification for non-container images, provide the following details:

**Name:** Provide a name for the verification step.

**Artifact Source:** Select the Harness Local Stage as the source of the artifact.

**Workspace Artifact Path:** Specify the exact artifact path used during the signing step.

Non-container images can be verified using **Cosign** or **Cosign with Secret Manager**, just like container images.

<DocImage path={require('./static/non-container-verify.png')} width="50%" height="50%" />


## View Verified Artifacts

Once the artifact is signed and verified, you will be able to see the Artifact Integrity Verification status from the Artifacts Overview tab.


* If the signed artifact is successfully verified using the public key, the verification status is displayed as Passed, along with the links to the corresponding rekor log entry and the execution results.

* If the verification fails, the status is displayed as Failed.

:::note

To view Rekor logs, disable Airgap mode in Default Settings under Supply Chain Security.

:::

<DocImage path={require('./static/artifact-verification-data.png')} width="100%" height="100%" />



## Example Pipeline For Artifact Verification

This example demonstrates how to implement artifact Verification in the Build stage of the pipeline.


This example **Build** stage has three steps:

- **Build and Push an Image to Docker Registry**: This step builds the cloned codebase and pushes the image to the container registry (DockerHub, ACR, etc.).


- **Artifact Signing**: Pulls the artifact from the registry and signs it with a private key pair and pushes the `.sig` file back to the artifact registry.


- **Artifact Verification**: Verifies the signed artifact using the corresponding public key to confirm its source and integrity.


<DocImage path={require('./static/sample-pipeline.png')} width="100%" height="100%" />


To replicate the Artifact Verification step you can use the below sample pipeline YAML

<details>

<summary>
Sample Pipeline YAML
</summary>

```
pipeline:
  name: ArtifactVerification
  identifier: ArtifactVerification
  tags: {}
  projectIdentifier: Harness
  orgIdentifier: default
  properties:
    ci:
      codebase:
        connectorRef: Harnessgithub
        build: <+input>
  stages:
    - stage:
        name: Build
        identifier: Build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: true
          buildIntelligence:
            enabled: true
          execution:
            steps:
              - step:
                  type: BuildAndPushDockerRegistry
                  name: BuildAndPushDockerRegistry_1
                  identifier: BuildAndPushDockerRegistry_1
                  spec:
                    connectorRef: lavakushDockerhub
                    repo: lavakush07/easy-buggy-app
                    tags:
                      - v5
                    caching: true
              - step:
                  type: SscaArtifactSigning
                  name: Artifact Signing_1
                  identifier: ArtifactSigning_1
                  spec:
                    source:
                      type: docker
                      spec:
                        connector: lavakushDockerhub
                        image: lavakush07/easy-buggy-app:v5
                    signing:
                      type: cosign
                      spec:
                        private_key: account.Cosign_Private_Key
                        password: account.Cosign_Password
                    uploadSignature:
                      upload: true
              - step:
                  type: SscaArtifactVerification
                  name: Artifact Verification_1
                  identifier: ArtifactVerification_1
                  spec:
                    source:
                      type: docker
                      spec:
                        connector: lavakushDockerhub
                        image: lavakush07/easy-buggy-app:v5
                    verifySign:
                      type: cosign
                      spec:
                        public_key: account.Cosign_Public_Key
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: account.harness_kubernetes_connector
              namespace: artifactverification
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
        variables:
          - name: LOG_LEVEL
            type: String
            description: ""
            required: false
            value: TRACE



```
</details>