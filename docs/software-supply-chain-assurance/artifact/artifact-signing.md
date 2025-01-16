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

As artifacts pass through multiple stages in the software lifecycle, ensuring they remain secure and untampered is critical. Artifact signing provides a reliable way to guarantee that the artifact built at one stage is the exact same artifact consumed or deployed at the next, with no chance of compromise. This process builds trust, ensures integrity, and strengthens the security of your software supply chain.


## Artifact Signing Process in SCS

In the Artifact Signing step, artifact is pulled from the container registry and it is digitally signed using [Cosign](https://docs.sigstore.dev/cosign/signing/overview/) with a private key pair. After you sign the artifact the `.sig` file is then pushed back to the same container registry, ensuring the integrity and authenticity of the artifact throughout the software supply chain.

<DocImage path={require('./static/artifact-signing-excaliview.png')} width="80%" height="50%" />

<!-- ## Requirements

### Generate the keys for Artifact Signing

import GenerateKeysPrerequisite from '/docs/software-supply-chain-assurance/shared/generate-cosign-artifact.md';

<GenerateKeysPrerequisite /> -->

## Artifact Signing step configuration

The Artifact Signing step enables you to sign your artifacts and optionally you can push the signature as a `.sig` file to the same artifact registry from which it was pulled.

Follow the instructions below to configure the Artifact Signing step.

* **Name**: Provide a name for the signing step.

* **Artifact Source**: Select the source container registry (e.g., DockerHub, ACR, GCR, ECR, etc.).


<Tabs>
  <TabItem value="dockerhub" label="DockerHub" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the DockerHub container registry where the artifact is stored.

* **Image:** Enter the name of your image using a tag or digest, example `my-docker-org/repo-name:tag` or you can use the digest `my-docker-org/repo-name@sha256:<digest>`

</TabItem>

<TabItem value="ecr" label="ECR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Elastic container registry where the artifact is stored.

* **Image:** Enter the name of your image using a tag or digest, example `my-docker-repo/my-artifact:tag`or you can use the digest `my-docker-repo/my-artifact@sha256:<digest>`

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Region:** The geographical location of your ECR repository, example `us-east-1`

* **Account ID:** The unique identifier associated with your AWS account.


</TabItem>

<TabItem value="gcr" label="GCR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google container registry where the artifact is stored.

* **Image:** Enter the name of your image using a tag or digest, example `my-image:tag` or you can use digest `my-image@sha256:<digest>`

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Host:** Enter your GCR Host name. The Host name is regional-based. For instance, a common Host name is `gcr.io`, which serves as a multi-regional hostname for the United States. 

* **Project ID:** Enter the unique identifier of your Google Cloud Project. The Project-ID is a distinctive string that identifies your project across Google Cloud services. example: `my-gcp-project`


</TabItem>

<TabItem value="acr" label="ACR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Azure container registry where the artifact is stored.

* **Image:** Enter your image details in the format `<registry-login-server>/<repository>`. The `<registry-login-server>` is a fully qualified name of your Azure Container Registry. It typically follows the format `<registry-name>.azurecr.io`, where   `<registry-name>` is the name you have given to your container registry instance in Azure. Example input: `automate.azurecr.io/<my-repo>:tag` or you can use digest `automate.azurecr.io/<my-repo>@sha256:<digest>`

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Subscription Id:** Enter the unique identifier that is associated with your Azure subscription. 

</TabItem>

<TabItem value="gar" label="GAR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google container registry where the artifact is stored.

* **Image:**: Enter the name of your image using tag or digest, example `repository-name/image:tag` or you can use digest `repository-name/image:digest`.

* **Artifact Digest:** Specify the digest of your artifact. After building your image using the [Build and Push](#slsa-generation-step-configuration-with-build-and-push-step) step or a [Run](#slsa-generation-step-configuration-with-run-step) step, save the digest in a variable. You can then reference it here using a Harness expression. Refer to the workflows described below for detailed guidance.

* **Host:** Enter your GAR Host name. The Host name is regional-based. For example, `us-east1-docker.pkg.dev`.

* **Project ID:** Enter the unique identifier of your Google Cloud Project. The Project-ID is a distinctive string that identifies your project across Google Cloud services. example: `my-gcp-project`

</TabItem>


</Tabs>

You can securely sign the artifacts using **Cosign** or **Cosign with Secret Manager**

import GenerateKeysPrerequisite from '/docs/software-supply-chain-assurance/shared/generate-cosign-artifact.md';

<GenerateKeysPrerequisite />



<DocImage path={require('./static/artifact-signnning.png')} width="50%" height="50%" />


**Attach Signature to Artifact Registry** (Optional): By default, this option is unchecked which means the signature will not be uploaded to the artifact registry and checking this option will push the signature as a .sig file to the registry.

## View Signed Artifacts


You can easily access the signed artifact details from the [Artifacts Overview](http://localhost:3000/docs/software-supply-chain-assurance/artifact-view#artifact-overview) tab.This section shows the signature and who signed the artifact. Additionally you can also verify the artifact signing details in the Chain of Custody, where a new entry is logged every time you sign an artifact. This entry includes a link to the execution results and rekor log entry, allowing you to track the signing activity and cross-check the details.

<DocImage path={require('./static/artifact-signing-data.png')} width="100%" height="100%" />




:::note
You are allowed to re-sign the same image multiple times, with each new signing overwriting the previous one. The Artifacts Overview tab will always display the most up-to-date signing details, reflecting the latest signature information for the artifact.
:::

## Example Pipeline For Artifact Signing

This example demonstrates how to implement artifact signing in the Build stage of the pipeline.


:::note

At present, Harness does not support artifact signing in the deployment stage, However this is part of our roadmap.

:::


This example **Build** stage has two steps:

- **Build and Push an Image to Docker Registry**: This process pulls the code, build the image and push it to a Docker registry (e.g., DockerHub, ACR, GCR, etc.).



- **Artifact Signing**: Pulls the artifact from the registry and signs it with a private key pair and pushes the .sig file back to the artifact registry.


<DocImage path={require('./static/artifact-signing-pipeline.png')} width="80%" height="60%" title="Click to view full size image" />

To replicate the Artifact Signing step you can use the below sample pipeline YAML

<details>

<summary> Sample Pipeline YAML </summary>

```
pipeline:
  name: Artifact Signing
  identifier: Artifact Signing
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
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: account.harness_kubernetes_connector
              namespace: artifact-signing
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


## Verify Artifact Signing

You can verify the signed artifacts using the Artifact verification step. Refer to [configure your pipeline to verify the artifact Signing](./artifact-verifying)