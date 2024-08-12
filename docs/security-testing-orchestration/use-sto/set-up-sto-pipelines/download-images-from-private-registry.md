---
title: Configure pipeline to use STO images from private registry
description: Store your scanner images in a private registry. Useful for air-gapped environments.
sidebar_label: Use STO images from private registry
sidebar_position: 30
redirect_from:
    - /docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry
---

Harness maintains its own set of scan images for [STO-supported scanners](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference.md#scanners-target-types-and-scan-approach). By default, a Harness pipeline pulls scan images from the [Harness DockerHub](https://hub.docker.com/u/harness).

This topic describes how to override the default image pull behavior and use your own private registry instead of pulling directly from the public Harness DockerHub. You can download the scan images you need, perform your own security checks on the images, upload them to a private registry, and then set up your STO steps to download images from your private registry.

To do this, you need to:

<!-- no toc -->
1. (Optional) [Create scanner images with your own SSL certificates.](#create-sto-scanner-images-with-your-own-ssl-certificates-optional)
2. [Create a connector for your private registry.](#create-a-connector-to-your-private-registry)
3. [Configure the pipeline to download images from your registry.](#configure-the-pipeline-to-download-images-from-your-registry)

## Create STO scanner images with your own SSL certificates (optional)

Harness STO supports [three workflows](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto#supported-workflows-for-adding-custom-ssl-certificates) for running scans with custom certificates.

In this workflow, you set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using custom certificates. This workflow supports any STO-compatible scanner that can run natively without root access. This workflow also supports build environments that use a self-signed proxy server between the Harness Delegate and Harness Manager.

:::info
Running container image scans as a non-root user is not currently supported.
:::

1. Save a copy of the following Dockerfile into a folder along with the certificates you want to copy to the image.

2. Update the `FROM`, `COPY`, and `USER` commands as described in the Dockerfile comments.

3. Build the new image and then publish it to your private registry.

4. Update the scan step in your pipeline as follows:

   1. Update the **Image** setting to point to the new image in your registry.
   2. If you specified a `USER` in your Dockerfile, set the **Run as User** (`runAsUser`) setting to the user you specified in your Dockerfile.

<details>
<summary>Dockerfile template for adding certificates to an STO scanner image</summary>

``` bash
# STEP 1 
# Specify the STO scanner image where you want to add your certificates
# For a list of all images in the Harness Container Registry, run the following:
#     curl -X  GET https://app.harness.io/registry/_catalog
FROM harness/twistlock-job-runner:latest as scanner

# FYI Root access is required to load and trust certificates
USER root

# STEP 2 
# Copy your certificates to the engine
# You can copy multiple ca from completely different paths into SHARE_CA_PATH
COPY ./CERTIFICATE_1.pem ../another-folder/CERTIFICATE_2.pem /shared/customer_artifacts/certificates/


# FYI establishes trust for certificates in Python and the OS 
RUN sto_plugin --trust-certs
# Optional: To trust certificates for Java for tools such as
# - Black Duck Hub
# - Checkmarx
# - Sonarqube
# - Veracode
# - NexusIQ
# RUN sh /bin/setup.sh 

# STEP 3 (optional)
# Create a user and assume limited permission user
# If you set this, you need to add runAsUser setting in the scan step
#     i.e., runAsUser: "1000"
USER 1000

```

</details>

## Create a connector to your private registry

You need a Docker connector that points to your private container registry. For more information, go to [Docker Connector Settings Reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).

## Configure your pipeline to use images from your registry

1. Download the scan images you need from the [Harness DockerHub](https://hub.docker.com/u/harness), test and validate the images, and store them in your private registry.

   :::warning

   Do not change the image names in your private registry. The image names must match the names specified by Harness; this includes the `harness/` prefix.

   :::

2. By default, STO will automatically use the latest image from the public Harness registry, you might want to [specify the images to use in your pipelines](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci.md#specify-the-harness-ci-images-used-in-your-pipelines). This ensures that your pipelines use specific image versions. You must update this specification when you want to adopt a new version of an image.

3. Set up your pipeline to use the images from your private registry. This can be done at both the stage level and the step level for **scanner steps(Blackduck, Semgrep etc.,)** and **Custom Scan** steps. Below are the detailed steps and configurations required for each scenario.

    - Override security test images for scanner steps:
      - [Stage level override](#stage-level-override)
      - [Step level override](#step-level-override)
    - [Override security test images for Custom Scan steps](#override-security-test-images-for-custom-scan-steps)

### **Override security test images for scanner steps**

#### **Stage level override**

If you want to use your private images for all steps within a stage, follow these steps:

1. Navigate to the **Infrastructure** section in your stage.
2. Go to the **Advanced** section.
3. Configure your private registry under the **Override Image Connector** section.

<DocImage path={require('./static/custom-image-stage-level.png')} width="50%" height="50%" title="Click to view full size image" />


:::note
Do not modify the names of the images in your private registry. STO will automatically look for the exact name(`harness/<SCANNER_NAME>-job-runner`) based on the step added to the pipeline.
:::


#### **Step level override**

If you want to override the image for a specific step within a stage, follow these steps:

1. Navigate to the specific STO step in the pipeline.
2. Go to the **Additional Configuration** section in the step configuration.
3. Set your private registry and tag under **Override Security Test Image** section. By default, the step will look for the `latest` tag if no tag is provided.

<DocImage path={require('./static/custom-image-scanner-step.png')} width="50%" height="50%" title="Click to view full size image" />

:::note
Do not modify the names of the images in your private registry. STO will automatically look for the exact name(`harness/<SCANNER_NAME>-job-runner`) based on the step added to the pipeline.
:::


### **Override security test images for Custom Scan steps**

The **Custom Scan** step uses the `sto-plugin` image to launch the appropriate scanner image(internally called as runner) based on the step configuration. You have the option to either override both the `sto-plugin` image and the scanner image, or simply override the scanner image while keeping the `sto-plugin` image unchanged.

To override the scanner image in a **Custom Scan** step, add the following settings in the **Additional Configuration** section of the **Custom Scan** step:

* <strong><code>runner_registry_domain</code></strong>: The URL of the registry where the images are stored. The supported format is `<_domain_>/<_directory_>` (such as, gcr.io/gcr-prod). Do not include the scheme (such as http:// or https://).
* <strong><code>runner_registry_image_prefix</code></strong>: set this to `harness` (Do not change this setting)
* <strong><code>runner_registry_username</code></strong>: The username of your registry
* <strong><code>runner_registry_token</code></strong>: The token to access your registry
* <strong><code>runner_tag</code></strong>: The image tag

<DocImage path={require('./static/custom-image-custom-scan-settings.png')} width="50%" height="50%" title="Click to view full size image" />

If you want to override the `sto-plugin` image for the **Custom Scan** steps, you can configure your private registry either at the stage level or step level, based on your requirements. Refer to the [stage level](#stage-level-override) or [step level](#step-level-override) sections above for instructions, as they are the same.

:::info
If you specified a `USER` in the Dockerfile for your scan image, configure the scan step to run as the user:

   1. Open the scanner step and expand **Additional Configuration**. 
   2. Set the **Run as User** (`runAsUser`) setting to the user you specified in your Dockerfile.
:::

<!-- 
2. If you need to use a proxy server, you must also specify the following: 

   * `http_proxy`  —  The hostname and port to use for proxied HTTP requests
  
   * `https_proxy`  —  The hostname and port to use for proxied HTTPS requests

   * `no_proxy`  — A comma-separated list of hosts to bypass the proxy

 -->

<!-- 
## YAML example for configuring STO to download images from a private registry

The following pipeline downloads its Security Scan image (bandit) and all of its CI build images from the Harness Image Registry. 

```yaml
pipeline:
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
        name: securityTestStage
        identifier: securityTestStage
        type: CI
        spec:
          cloneCodebase: true
          sharedPaths:
            - /var/run
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              harnessImageConnectorRef: account.harnessImage
              os: Linux
          execution:
            steps:
              - step:
                  type: Background
                  name: docker-dind
                  identifier: dockerdind
                  spec:
                    connectorRef: account.harnessImage
                    image: docker:dind
                    shell: Sh
                    entrypoint:
                      - dockerd
                    privileged: true
              - step:
                  type: Security
                  name: banditScan
                  identifier: banditScan
                  spec:
                    privileged: true
                    settings:
                      policy_type: orchestratedScan
                      scan_type: repository
                      product_name: bandit
                      product_config_name: default
                      repository_branch: <+codebase.branch>
                      repository_project: dvpwa
                      fail_on_severity: CRITICAL
                      runner_registry_domain: gcr.io/gcr-prod
                      runner_registry_image_prefix: harness
                      # Here the Harness Delegate uses anonymous access to download from the Harness GCR project rather than a private registry.
        variables: []
  identifier: sto_scanner_image_download_example
  name: sto_scanner_image_download_example

```

-->
