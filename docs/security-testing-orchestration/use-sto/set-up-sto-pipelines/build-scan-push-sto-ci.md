---
title: "Tutorial: Create a build-scan-push pipeline (STO and CI)"
description: Launch pipeline builds and scans automatically based on GitLab merge requests.
sidebar_position: 80
redirect_from:
  - /tutorials/security-tests/build-scan-push-sto-ci
  - /docs/security-testing-orchestration/get-started/sto-tutorials/build-scan-push-sto-ci
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Security Testing Orchestration certification today!"
  link="/university/sto"
  closable={true}
  target="_self"
/>

In this tutorial, you'll create an end-to-end pipeline that uses STO and CI steps to build an image and pushes it to Docker Hub _only_ if the codebase and image contain no critical vulnerabilties. This pipeline uses two popular open-source tools:

- [Bandit](https://bandit.readthedocs.io/en/latest), for scanning Python repositories.

- [Aqua Trivy](https://www.aquasec.com/products/trivy/), for scanning container images.

You can copy/paste the [YAML pipeline example below](#yaml-pipeline-example) into Harness and update it with your own infrastructure, connectors, and access tokens.

The following steps describe the workflow:

1. An STO Bandit step scans the codebase and ingests the scan results.

2. If the code has no critical vulnerabilities, a CI Build and Push step builds a test image and pushes it to Docker Hub.

3. An Aqua Trivy step scans the image and ingests the results.

4. If the image has no critical vulnerabilities, another Build and Push step pushes a prod image to Docker Hub.

![scan-build-scan-push tutorial pipeline](../../use-sto/set-up-sto-pipelines/static/sbsp-sto-ci/sbsp-pipeline-ui.png)

:::info Prerequisites

- This tutorial has the following prerequisites:

  - Harness STO and CI module licenses.
  - You must have a [Security Testing Developer or SecOps role](/docs/security-testing-orchestration/get-started/onboarding-guide/#create-an-sto-pipeline) assigned.
  - A basic understanding of key STO concepts and good practices is recommended. [Your first STO pipeline](/docs/security-testing-orchestration/get-started/your-first-sto-pipeline) is a good introduction.
  - GitHub requirements:

    - A GitHub account and access token.
    - A [GitHub connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference) that specifies your account (`http://github.com/my-account`) but not a specific repository (`http://github.com/my-account/my-repository`).
    - This tutorial uses the [dvpwa repository](https://github.com/GitHubGoneMad/dvpwa) as an example. The simplest setup is to fork this repository into your GitHub account.
  - Docker requirements:
    - A Docker Hub account and access token.
    - A [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference/) is required to push the image.
  - Your GitHub and Docker Hub access tokens must be stored as [Harness secrets](/docs/platform/secrets/add-use-text-secrets).

:::

## Set up your codebase

This tutorial uses <a href="https://bandit.readthedocs.io/en/latest/">Bandit</a> to scan a Python repository specified in the <a  href="/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/">Codebase</a> for this pipeline).

1. Fork the following example repository into your GitHub account. This is a Python repo with known vulnerabilities: https://github.com/GitHubGoneMad/dvpwa.

2. If you don't have a GitHub connector, do the following:

   1. In your Harness project, select **Project Settings** > **Project-level resources** > **Connectors**.
   2. Select **New Connector**, then select **Code Repositories** > **GitHub**.
   3. Set the [GitHub connector settings](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference) as appropriate.
      - Use **Account** for the [URL type](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference/#url-type).
      - This tutorial uses [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) for its build infrastructure, so select **Connect through Harness Platform** when prompted for the connectivity mode.

## Set up your pipeline

Do the following:

1. Select **Security Testing Orchestration** (left menu, top) > **Pipelines** > **Create a Pipeline**. Enter a name and click **Start**.

   <DocImage path={require('./static/create-new-sto-pipeline.png')} width="50%" height="50%" />

2. In the new pipeline, select **Add stage** > **Build**.

3. Set up your stage as follows:

   1. Select **Third-party Git provider** and then select your GitHub connector.

   2. Repository Name:
   
      ```
      dvpwa
      ``` 


4. In the Pipeline Editor, go to **Infrastructure** and select **Cloud**, **Linux**, and **AMD64** for the infrastructure, OS, and architecture.

   You can also use a Kubernetes or Docker build infrastructure, but these require additional work to set up. For more information, go to [Set up a build infrastructure for STO](/docs/security-testing-orchestration/get-started/onboarding-guide#set-up-a-build-infrastructure-for-sto).


<!-- 

#### Add a Docker-in-Docker background step

:::note

The following step is required for Kubernetes or Docker infrastructures only. If you're using Harness Cloud, go to [Scan the code](#scan-the-code).

:::

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />

-->

## Scan the code

Now that you have a pipeline set up, you can add a step to scan the codebase. 

### Add a Bandit step

import set_up_harness_26 from '/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/static/sbsp-sto-ci/configure-bandit-step.png'

<Tabs>
<TabItem value="Visual" label="Visual" default>

1. In the Pipeline Studio, go to **Execution**. 

2. Add a **Bandit** step (under **Security Tests** in the Step Library).

2. Configure the step as follows:

   1. Scan Mode = **Orchestration**

   2. Target name:
   
      ```
      dvpwa
      ```

   3. Target variant:

         ```
      main
      ```

      When scanning a code repo, you generally want to specify the repo name and the branch for the target.

<DocImage path={require('./static/sbsp-sto-ci/bandit-step-config.png')} width="40%" height="40%" />

:::info

In most cases, you want to set the [Fail on Severity](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/exemption-workflows) when you add a scan step to your pipeline. In this tutorial, you're setting the first of two scan steps. In this case, you can keep **Fail on Severity** set to **None** and then set it after you finish setting up and testing your pipeline.

:::

</TabItem>
<TabItem value="YAML" label="YAML">

- `type:` [`Bandit`](/docs/security-testing-orchestration/sto-techref-category/bandit-scanner-reference)
- `name:` A name for the step.
- `identifier:` A unique step ID.
- `spec :`
  - `mode :` [`orchestration`](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/sto-workflows-overview) In orchestrated mode, the step runs the scan and ingests the results in one step.
  - `config: default`
    - `target : `
      - `name : dvpwa`
      - `type : repository`
      - `variant : main` 
         When scanning a repository, you will generally use the repository name and branch for these fields.
    - `advanced : `
      - `log :`
        - `level : info`

:::info

In most cases, you want to set the [fail_on_severity](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/exemption-workflows) when you add a scan step to your pipeline. In this tutorial, you're setting the first of two scan steps. In this case, you can leave `fail_on_severity` at `none` and set it after your set up and test your pipeline.

:::

Here's a YAML example:

```yaml
steps:
  - step:
      type: Bandit
      name: bandit_scan_orchestrated
      identifier: bandit_scan_orchestrated
      spec:
        mode: orchestration
        config: default
        target:
          name: dvpwa
          type: repository
          variant: main
        advanced:
          log:
            level: info
```

</TabItem>
</Tabs>

### Run a scan and analyze the results

At this point, you might want to run a scan and view the detected issues.

1. Select **Save**, and then select **Run**.
2. In Run Pipeline, enter the following under Codebase:

   1. Build type : **Git Branch**
   2. Branch name : **main**

3. Run the pipeline. When the execution finishes, select [**Security Tests**](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/view-scan-results) to view the scan results.

## Build and push a test image

### Add a Build and Push step

Harness CI includes a set of [**Build and Push** steps](/docs/category/build-push-upload-download) that take a code repo with a Dockerfile, build a container image, and push it to an artifact repository.

You'll now add one of these steps to build and push a test image to your Docker Hub account.

<Tabs>
<TabItem value="Visual" label="Visual" default>

1. In the Pipeline execution window, select **Edit Pipeline** (top right). 

2. Add a **Build and Push an image to Docker Registry** step after the Bandit step. This is a CI step; look under **Build** in the Step Library.

2. Configure the step as follows:

   1. Docker Connector — Select your Docker Hub connector.

   2. Docker Registry (use your Docker Hub registry name for the placeholder):
    
      ```
      YOUR_DOCKER_HUB_USERNAME/dvpwa
      ``` 

   3. Tags: 
  
      ```
      scantest-DONOTUSE
      ``` 

<DocImage path={require('./static/sbsp-sto-ci/build-push-test-image.png')} width="50%" height="50%" />


</TabItem>
<TabItem value="YAML" label="YAML">

Add a **Build and Push to Docker Registry** step after the Bandit step and configure it as follows:

- `type:` [`BuildAndPushDockerRegistry`](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry)
- `name: build_push_test_image`
- `identifier:` A unique step ID.
- `spec :`
  - `connectorRef : YOUR_DOCKERHUB_CONNECTOR_ID`
  - `repo : YOUR_DOCKERHUB_USERNAME/dvpwa`
  - `type : container`
  - `variant : scantest-DONOTUSE`

Here's an example:

```yaml
- step:
    type: BuildAndPushDockerRegistry
    name: build_push_test_image
    identifier: build_push_test_image
    spec:
    connectorRef: YOUR_DOCKERHUB_CONNECTOR_ID
    repo: jsmith/dvpwa
    tags:
      - scantest-DONOTUSE
```

</TabItem>
</Tabs>

### Push a test image to your registry 

After you add the step, save the pipeline and run it. This Build and Push should should push a test image to your Docker registry. 

## Scan the test image

### Add an Aqua Trivy step

Now that you have a test image in your registry, you can add an Aqua Trivy step to scan it. We'll leave the Fail on Severity setting at None for this step until we complete the pipeline.   

<Tabs>
<TabItem value="Visual" label="Visual" default>

1. Add an **Aqua Trivy** step after the Build and Push an image to Docker Registry step. You can find this under **Security Tests** in the step library. 

2. Configure the step as follows:

   1. Scan Mode = [**Orchestration**](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/sto-workflows-overview) In orchestrated mode, the step runs the scan and ingests the results in one step.

   2. Target name (use your Docker Hub registry name for the placeholder):
    
      ```
      YOUR_DOCKER_HUB_USERNAME/dvpwa
      ``` 

   3. Target variant:

      ```
      scantest-DONOTUSE
      ```

   4. [Container image Type](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference#type-1):

      ```
      V2
      ```

   5. [Domain](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference#domain):

      ```
      docker.io
      ``` 

   6. Container image name (use your Docker Hub registry name for the placeholder):
    
      ```
      YOUR_DOCKER_HUB_USERNAME/dvpwa
      ``` 

   7. Container image tag: 
  
      ```
      scantest-DONOTUSE
      ``` 

   8. [Fail on Severity](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference#fail-on-severity) = **None**


<DocImage path={require('./static/sbsp-sto-ci/trivy-step-config.png')} width="50%" height="50%" />

</TabItem>
<TabItem value="YAML" label="YAML">

Add an **Aqua Trivy** step to your pipeline after the build step and configure it as follows:

- `type:` [`AquaTrivy`](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference#security-step-settings-for-aqua-trivy-scans-in-sto-legacy)
- `name:` A name for the step.
- `identifier:` A unique step ID.
- `spec :`
  - `mode :` [`orchestration`](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/sto-workflows-overview) In orchestrated mode, the step runs the scan and ingests the results in one step.
  - `config: default`
  - `target : `
    - `name : YOUR_DOCKER_HUB_USERNAME/dvpwa`
    - `type : container`
    - `variant : scantest-DONOTUSE` 
       When scanning an image, you generally use the image label and tag for the [target name and variant](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines) .
    - `advanced : `
      - `log :`
        - `level : info`
        - [`fail_on_severity`](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference#fail-on-severity) `: none`
    - `privileged: true`
    - `image:`
      - [`type`](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference#type-1) `: docker_v2`
      - `name: YOUR_DOCKER_HUB_USERNAME/dvpwa`
      - `domain: docker.io`
      - `tag: scantest-DONOTUSE`

Here's an example:

```yaml
- step:
    type: AquaTrivy
    name: scan_test_image
    identifier: scan_test_image
    spec:
      mode: orchestration
      config: default
      target:
        name: jsmith/dvpwa
        type: container
        variant: scantest-DONOTUSE
      advanced:
        log:
          level: info
        fail_on_severity: none
      privileged: true
      image:
        type: docker_v2
        name: jsmith/dvpwa
        domain: docker.io
        tag: scantest-DONOTUSE
      sbom:
        format: spdx-json
```

</TabItem>
</Tabs>

### Run the pipeline and verify your results

This is a good time to run your pipeline and verify that the Aqua Trivy step can scan the test image.

1. Click **Run** and specify **main** for the branch name for the codebase.

2. When the pipeline execution finishes, view the results in [**Security Tests**](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/view-scan-results).


## Build and push the prod image

Assuming that the Trivy scan detected no critical vulnerabilities, you can now build and push a prod version of your image to Docker Hub. 

This step is identical to the previous [test image step](#build-and-push-a-test-image), except for the image tag: the test image tag is `1.x-scantest-DONOTUSE` and the prod image tag is the pipeline sequence ID.

<Tabs>
<TabItem value="Visual" label="Visual" default>

1. Add a **Build and Push to Docker Registry** step after the Trivy step.

2. Configure the step as follows:

   1. Docker Connector — Select your Docker Hub connector.

   2. Docker Registry (use your Docker Hub registry name for the placeholder):
    
      ```
      YOUR_DOCKER_HUB_USERNAME/dvpwa
      ``` 

   3. Container image tag — Select **Expression** for the value type, then enter the following expression: 

      ```
      <+pipeline.sequenceID>
      ```

      <DocImage path={require('./static/sbsp-sto-ci/tag-eq-pipeline-id.png')} width="50%" height="50%" />

</TabItem>
<TabItem value="YAML" label="YAML">

Add a **Build and Push an Image to Docker Registry** step after the Bandit step and configure it as follows:

- `type:` [`BuildAndPushDockerRegistry`](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry)
- `name: build_push_test_image`
- `identifier:` A unique step ID.
- `spec :`
  - `connectorRef : YOUR_DOCKERHUB_CONNECTOR`
  - `repo : YOUR_DOCKER_HUB_USERNAME/dvpwa`
  - `type : container`
  - `tags : `
    - `<+sequenceID>`

Here's an example:

```yaml
- step:
    type: BuildAndPushDockerRegistry
    name: build_push_test_image
    identifier: BuildAndPushDockerRegistry_1
    spec:
    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
    repo: YOUR_DOCKER_HUB_USERNAME/dvpwa
    tags:
      - <+sequenceID>
```

</TabItem>
</Tabs>

## Enable Fail on Severity

Now you have a complete build-scan-push pipeline with steps to scan the code repository and a test build of the image. The final step is to set Fail on Severity for these two steps so that they block the pipeline if any critical issues are detected.

1. In the Aqua Trivy step, set Fail on Severity to **Critical**. Apply the changes and save the pipeline.

2. Run the pipeline. The Aqua Trivy test now fails:

   `Exited with message: fail_on_severity is set to critical and that threshold was reached.`

3. In the Bandit step, set Fail on Severity to **Critical**. Apply the changes and save the pipeline.

4. Run the pipeline. The Bandit test now fails:

   `Exited with message: fail_on_severity is set to critical and that threshold was reached.`

## YAML pipeline example

Here's an example of the pipeline you created in this tutorial. If you copy this example, replace the placeholder values with appropriate values for your project, organization, connectors, and access token.

```yaml

pipeline:
  name: build_scan_push_ci_2024
  identifier: build_scan_push_ci_2024
  projectIdentifier: YOUR_PROJECT_ID
  orgIdentifier: YOUR_HARNESS_ORG_ID
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: dvpwa
        build: <+input>
  stages:
    - stage:
        name: build_scan_push_with_ci
        identifier: build_scan_push_with_ci
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Bandit
                  name: Bandit_1
                  identifier: Bandit_1
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      type: repository
                      detection: manual
                      name: dvpwa
                      variant: main
                    advanced:
                      log:
                        level: info
                      fail_on_severity: critical
              - step:
                  type: BuildAndPushDockerRegistry
                  name: build_test_push_image
                  identifier: build_test_push_image
                  spec:
                    connectorRef: YOUR_CONTAINER_IMAGE_REGISTRY_CONNECTOR_ID
                    repo: jsmith/dvpwa
                    tags:
                      - scantest-DONOTUSE
              - step:
                  type: AquaTrivy
                  name: AquaTrivy_1
                  identifier: AquaTrivy_1
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      type: container
                      detection: manual
                      name: jsmith/dvpwa
                      variant: scantest-DONOTUSE
                    advanced:
                      log:
                        level: info
                      fail_on_severity: critical
                    privileged: true
                    image:
                      type: docker_v2
                      name: jsmith/dvpwa
                      domain: docker.io
                      tag: scantest-DONOTUSE
                    sbom:
                      format: spdx-json
              - step:
                  type: BuildAndPushDockerRegistry
                  name: BuildAndPushDockerRegistry_2
                  identifier: BuildAndPushDockerRegistry_2
                  spec:
                    connectorRef: YOUR_CONTAINER_IMAGE_REGISTRY_CONNECTOR_ID
                    repo: jsmith/dvpwa
                    tags:
                      - <+pipeline.sequenceId>
                    caching: true


```
