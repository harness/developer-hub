---
title: Generate SLSA Provenance
description: Generate SLSA Provenance with Harness SCS
sidebar_position: 10
redirect_from:
  - /tutorials/secure-supply-chain/generate-slsa
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CosignKeyGeneration from '/docs/software-supply-chain-assurance/shared/generate-cosign-key-pair.md';

Harness SCS when used along with Harness CI Hosted Builds([Harness Cloud](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure/)), ensures that the resulting artifacts have **SLSA Level 3** provenance that every consumer (including the following deployment stage) can verify for artifact integrity prior to making use of this artifact. Build hardening for Level 3 compliance is achieved through: 

1. Built-in infrastructure isolation for every build where new infrastructure is created for every run and deleted after the run completes. 
2. OPA policy enforcement on CI stage templates with non-privileged, hosted containerized steps that do not use volume mounts. This disallows the build steps to access the provenance key information in compliance with SLSA specifications. 

End result is that hackers cannot do tampering during the build process. This capability when coupled with open source governance through [SBOM lifecycle management](https://developer.harness.io/docs/software-supply-chain-assurance/sbom/generate-sbom) provides the most advanced shift-left supply chain security solution in the market today.

In Harness SCS, you can use the **SLSA Generation** step to configure your pipeline to generate SLSA Provenance and optionally attest and sign the attestation. The generated provenance is saved in Harness and can be easily accessed from the [Artifact section](../artifact-view) in SCS. If the provenance is attested and signed with keys, the resulting attestation file (`.att`) is pushed to the container registry. Here's an overview of the workflow:

<DocImage path={require('./static/slsa-gen-overview.png')} width="90%" height="90%" />
<!-- <DocVideo src="https://youtu.be/shU2tbSoC1k?si=ZHftRb_gpnCHEtUi" /> -->

:::warning Deprecation Alert  
The configuration for SLSA Generation and attestation previously handled in the **Overview** section of the pipeline stage is no longer supported. To generate SLSA Provenance and attestation, use the dedicated **SLSA Generation** step. For detailed instructions, refer to the **[SLSA Generation step configuration](#slsa-generation-step-configuration)** documentation. If your pipelines are currently configured through the Overview section, we strongly recommend migrating to the **SLSA Generation** step to ensure compatibility and continued support.
:::

## SLSA Generation step configuration
The **SLSA Generation** step enables you to generate SLSA Provenance and optionally attest it. The generated provenance is saved in the **Artifact** section in SCS, while the attestation file is pushed to the configured container registry. This step should be configured immediately after completing your image-building process, as the image digest is required for provenance generation and attestation.

The **SLSA Generation** step can be used in two workflows depending on how you build your image.
1. SLSA Generation when you use the Harness CI **Build and Push** step to build your image.
2. SLSA Generation when you use a **Run** step to build your image.

Follow the instructions below to configure the **SLSA Generation** step.

- Search and add the **SLSA Generation** step to your pipeline. It is important to place this step immediately after the steps that complete your image-building process, as it requires the artifact digest as input.
- **Artifact Source**: Configure your artifact source by selecting from the options available in the dropdown menu. You can choose from **DockerHub**, **ECR**, **GCR**, **ACR**, or **GAR**. Select the corresponding artifact source tab below for detailed instructions on configuration.

<Tabs>
  <TabItem value="dockerhub" label="DockerHub" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the DockerHub container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `my-docker-org/repo-name`.

* **Artifact Digest:** Enter the digest of your image, example `sha256:d34jlkf2...`.

<!-- <DocImage path={require('../slsa/static/slsa-ver-dockerhub.png')} width="50%" height="50%" title="Click to view full size image" /> -->

</TabItem>

<TabItem value="ecr" label="ECR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Elastic container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `my-docker-repo/my-artifact`.

* **Artifact Digest:** Enter the digest of your image, example `sha256:d34jlkf2...`.

* **Region:** The geographical location of your ECR repository, example `us-east-1`

* **Account ID:** The unique identifier associated with your AWS account.



<!-- <DocImage path={require('../slsa/static/slsa-ver-ecr.png')} width="50%" height="50%" title="Click to view full size image" />  -->


</TabItem>

<TabItem value="gcr" label="GCR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `my-image`.

* **Artifact Digest:** Enter the digest of your image, example `sha256:d34jlkf2...`.

* **Host:** Enter your GCR Host name. The Host name is regional-based. For instance, a common Host name is `gcr.io`, which serves as a multi-regional hostname for the United States. 

* **Project ID:** Enter the unique identifier of your Google Cloud Project. The Project-ID is a distinctive string that identifies your project across Google Cloud services. example: `my-gcp-project`


<!-- <DocImage path={require('../slsa/static/slsa-ver-gcr.png')} width="50%" height="50%" title="Click to view full size image" /> -->


</TabItem>

<TabItem value="acr" label="ACR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Azure container registry where the artifact is stored.

* **Image:** Enter your image details in the format `<registry-login-server>/<repository>`. The `<registry-login-server>` is a fully qualified name of your Azure Container Registry. It typically follows the format `<registry-name>.azurecr.io`, where   `<registry-name>` is the name you have given to your container registry instance in Azure. Example input: `automate.azurecr.io/acr`

* **Artifact Digest:** Enter the digest of your image, example `sha256:d34jlkf2...`.

* **Subscription Id:** Enter the unique identifier that is associated with your Azure subscription. 


<!-- <DocImage path={require('../slsa/static/slsa-ver-acr.png')} width="50%" height="50%" title="Click to view full size image" /> -->

</TabItem>

<TabItem value="gar" label="GAR" default>

* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Google container registry where the artifact is stored.

* **Image:** Enter the name of your image, example `repository-name/image`.

* **Artifact Digest:** Enter the digest of your image, example `sha256:d34jlkf2...`.

* **Host:** Enter your GAR Host name. The Host name is regional-based. For example, `us-east1-docker.pkg.dev`.

* **Project ID:** Enter the unique identifier of your Google Cloud Project. The Project-ID is a distinctive string that identifies your project across Google Cloud services. example: `my-gcp-project`


<!-- <DocImage path={require('../slsa/static/slsa-ver-gar.png')} width="50%" height="50%" title="Click to view full size image" /> -->

</TabItem>


</Tabs>

With this configuration, the step generates the SLSA Provenance and stores it in the [Artifact section](../artifact-view.md) of SCS. To attest to the generated provenance, follow the instructions in the section below.

#### Attest SLSA Provenance

To configure attestation, along with the [above configuration](#slsa-generation-step-configuration) you should enable the **SLSA Attestation** checkbox in the **SLSA Generation** step. This requires a key pair generated using **Cosign**.

<details>
<summary>Generate key pairs using Cosign for SLSA provenance attestation</summary>

<CosignKeyGeneration />

</details>

Using the **Cosign** option, set your **Private Key** from the key pair along with the associated **Password**. Ensure that your **Public Key** is stored securely, as it will be needed for verifying the provenance attestation. For more details, refer to [SLSA Verification](#slsa-verification).

<DocImage path={require('./static/slsa-generation-step.png')} width="50%" height="50%" />


## SLSA Generation step configuration with Build and Push step
When using the Harness CI **Build and Push** step for the image-building process, you can configure the **SLSA Generation** step to generate and attest to the Provenance. Follow the [SLSA Generation step configuration](#slsa-generation-step-configuration), for the **Artifact Digest** field, you can use pipeline variables to dynamically populate the digest of the image built during the **Build and Push** step.  

For example, the expression could look like:  
`<+pipeline.stages.build.spec.execution.steps.<YOUR_BUILD_AND_PUSH_STEP_NAME>.output.outputVariables.digest>`  

If you have already executed the **Build and Push** step, navigate to the execution details, open the **Output Variables** tab, and copy the expression for the digest from the **Input Name** column.


<DocImage path={require('./static/slsa-with-build-and-push-step.png')} width="40%" height="40%" />

For performing the attestation, refer to the section [Attest SLSA Provenance](#attest-slsa-provenance)

## SLSA Generation step configuration with Run step

The **SLSA Generation** step requires your container image details along with its digest. If your build process involves a **Run** step to build the image, it’s crucial to expose the digest of the image so it can be referenced in the **Artifact Digest** field of the SLSA Generation step as an expression.  

This section outlines a sample workflow that uses Run steps for the build process and then configures the SLSA Generation step. The workflow consists of the following steps:  

1. **Build and Push the Image**: This step builds the image and pushes it to the configured container registry using the Kaniko image.  
2. **Fetch the Artifact Digest**: This step fetches the artifact digest using the image name. It leverages Skopeo to retrieve the digest from the container registry based on the image built in the previous step.  
3. **Generate SLSA**: Along with the [SLSA Generation step configuration](#slsa-generation-step-configuration). The **Artifact Digest** field is populated with the expression referencing the digest fetched in the previous step.

Here’s how the flow looks
<DocImage path={require('./static/slsa-with-run-steps.png')} width="60%" height="60%" />  

Follow the instructions below to set up this pipeline workflow.

### Build and Push with Run step

1. **Add a Run Step**: Search for and add a **Run** step to the **Build** stage of your pipeline.
2. **Container Registry**: Configure your container registry using Harness Connectors.
3. **Image**: Use a Kaniko image for building and pushing the container image. Example: `gcr.io/kaniko-project/executor:debug`.
4. **Shell**: Set the shell to `Sh`.
5. **Command**: Use the following command to build and push the image. Replace placeholders with your image details and configure Harness Secrets for your Docker username and token.
  <details>
  <summary>Command to Build and Push the Image</summary>

  ```
  #!/bin/sh

  # Set variables
  DOCKER_USERNAME=<+secrets.getValue("docker_username")>
  DOCKER_PAT=<+secrets.getValue("docker_pat")>
  DOCKER_REPO="YOUR_DOCKER_REPO"
  IMAGE_TAG="YOUR_IMAGE_TAG"
  DOCKER_REGISTRY="https://index.docker.io/v1/"

  # Create a directory for Kaniko configuration
  mkdir -p /kaniko/.docker

  # Create the Kaniko credentials file
  cat <<EOF > /kaniko/.docker/config.json
  {
    "auths": {
      "$DOCKER_REGISTRY": {
        "username": "$DOCKER_USERNAME",
        "password": "$DOCKER_PAT"
      }
    }
  }
  EOF

  echo "Kaniko credentials created."

  # Use Kaniko to build and push the image
  /kaniko/executor \
    --context ./stable/alpine/ \
    --dockerfile ./stable/alpine/Dockerfile \
    --destination "$DOCKER_REPO:$IMAGE_TAG" \
    --cache=true

  image=$DOCKER_REPO:$IMAGE_TAG
  # Clean up
  rm -rf /kaniko/.docker
  ```

  </details>

6. **Optional Configuration**: Expand **Optional Configuration** and define an **Output Variable**.  
     - **Name**: `image`  
     - **Type**: `String`  
     - **Value**: `image`  


This step builds the image, pushes it to the configured container registry, and exposes the image name as an output variable. This variable is used in the next step to fetch the image digest.  

### Fetch the artifact's digest
1. **Add a Run Step**: Search for and add a **Run** step.
2. **Container Registry**: Configure your container registry using Harness Connectors.
3. **Image**: Use a Skopeo image. Example: `mrliptontea/skopeo:1.3.0`.
4. **Shell**: Set the shell to `Sh`.
5. **Command**: Use the following command to fetch the digest using the Image name from the previous step. Replace placeholders with your step details.
  <details>
  <summary>Command to fetch the digest</summary>

  ```
  #!/bin/sh

  IMAGE="<+pipeline.stages.build.spec.execution.steps.<YOUR_STEP_NAME>.output.outputVariables.image>"
  DIGEST=$(skopeo inspect docker://$IMAGE --format "{{.Digest}}")

  digest=$DIGEST
  echo "Image Digest: $DIGEST"
  ```
  </details>

6. **Optional Configuration**: Expand **Optional Configuration** and define an **Output Variable**.  
     - **Name**: `digest`  
     - **Type**: `String`  
     - **Value**: `digest`  


This step will fetch the digest of the image and exposes it as a variable `digest`, this variable is used in the next step to generate the SLSA Provenance.

### Configure SLSA Generation step with artifact digest
1. Add the **SLSA Generation** to the pipeline
2. Follow the instructions in the [SLSA Generation Step Configuration](#slsa-generation-step-configuration) section. For the **Artifact Digest** field, use an expression to dynamically populate the digest from the previous step.  
    For example:  
`<+pipeline.stages.build.spec.execution.steps.<YOUR_RUN_STEP_NAME>.output.outputVariables.digest>`  

    Replace `<YOUR_RUN_STEP_NAME>` with the name of your Run step in the pipeline.

<DocImage path={require('./static/slsa-gen-run-step.png')} width="50%" height="50%" />  

For performing the attestation, refer to the section [Attest SLSA Provenance](#attest-slsa-provenance)

## Run the pipeline

When you run a pipeline with SLSA generation enabled, Harness SCS:

* Generates an SLSA Provenance for the image created by the Build and Push steps in the Build stage.
* Generates and signs an attestation using the provided key and password.
* Stores the SLSA Provenance in Harness and uploads the `.att` file to your container registry alongside the image.

The signed attestation is stored, as an .att file, in the artifact repository along with the image. You can also find the SLSA Provenance on the **Supply Chain** tab on the Execution details page in Harness. For more information, go to [view pipeline execution results](https://developer.harness.io/docs/software-supply-chain-assurance/ssca-view-results).


## Provenance example

Here's an example of an SLSA Provenance generated by Harness SCS. The information in your SLSA Provenance might vary depending on your build and changes to the provenance structure applied in SCS updates. Identifiers, repo names, and other details in this example are anonymized or truncated.

```json
{
  "_type": "https://in-toto.io/Statement/v0.1",
  "subject": [
    {
      "name": "index.docker.io/harness/plugins",
      "digest": {
        "sha256": "2deed18c31c2bewfab36d121218e2dfdfccafddd7d2llkkl5"
      }
    }
  ],
  "predicateType": "https://slsa.dev/provenance/v1",
  "predicate": {
    "buildDefinition": {
      "buildType": "https://developer.harness.io/docs/software-supply-chain-assurance/slsa/generate-slsa/",
      "externalParameters": {
        "codeMetadata": {
          "repositoryURL": "https://github.com/nginxinc/docker-nginx",
          "branch": "master"
        },
        "triggerMetadata": {
          "triggerType": "MANUAL",
          "triggeredBy": "Humanshu Arora"
        }
      },
      "internalParameters": {
        "pipelineExecutionId": "UECDFDECEn8PpEfqhQ",
        "accountId": "ppbDDDVDSarz_23sd_d_tWT7g",
        "pipelineIdentifier": "SLSA_Build_and_Push",
        "tool": "harness/slsa-plugin"
      }
    },
    "runDetails": {
      "builder": {
        "id": "https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me"
      },
      "metadata": {
        "invocationId": "aRrEdsfdfdRwWdfdfdecEnwdg",
        "startedOn": "2024-11-26T09:37:18.000Z",
        "finishedOn": "2024-11-26T09:37:18.000Z"
      }
    }
  }
}
```

## Verify SLSA Provenance

After generating SLSA Provenance, you can [configure your pipeline to verify SLSA Provenance](./verify-slsa.md).
