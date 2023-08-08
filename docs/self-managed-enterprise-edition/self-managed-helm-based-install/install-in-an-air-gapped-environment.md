---
title: Install in an air-gapped environment
description: Learn how to install the Harness Self-Managed Enterprise Edition using Helm in an air-gapped environment.
sidebar_position: 4
---

This topic explains how to use Helm to install the Harness Self-Managed Enterprise Edition in an air-gapped environment and how to obtain and transfer Docker images to a private registry with secure access. The steps include pulling Docker images, saving images as .tgz files, uploading to Google Cloud storage, downloading Helm charts, and pushing charts to your private repositories. This process ensures secure and seamless deployment of the Harness Self-Managed Enterprise Edition in restricted, offline environments.

Air-gapped environments are characterized by a lack of direct access to the internet, which provides an added layer of security for sensitive data and systems. This isolation poses unique challenges to deploy and update software applications, as standard methods of accessing resources, such as Docker images, are not possible.

The Harness Self-Managed Platform is designed to cater to various deployment scenarios, including an air-gapped environment. To facilitate this, the platform provides a secure and efficient method for obtaining and transferring Docker images to a private registry. This ensures that you can access, download, and push the required resources within your restricted network.

## Workstation requirements

- A minimum of 150GB of free disk space to download and extract the Harness airgap bundle

- ECR/GCR/private registry details to tag and push images

- Kubernetes cluster

- Latest version of Helm

- Access to Helm charts or [download locally](https://github.com/harness/helm-charts/releases)

- Access to [the Harness airgap bundle on GCP](https://console.cloud.google.com/storage/browser/smp-airgap-bundles;tab=objects?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&prefix=&forceOnObjectsSortingFiltering=false&pli=1)

- Kubernetes version 1.22+ (Harness recommends v1.23.x)

## Required images

If your cluster is in an air-gapped environment, your deployment requires the [latest container images](https://github.com/harness/helm-charts/releases).

## Installation workflow

The flowchart below shows the air-gapped environment installation workflow steps.

![](./static/air-gapped-environment-workflow.png)

## Download required files

To begin your installation, download the following files:
- [Harness air gap image bundle](https://console.cloud.google.com/storage/browser/smp-airgap-bundles)

   With each Self-Managed Enterprise Edition release, Harness adds individual module image files to the air gap image bundle. You can download module `*.tgz` files for the modules you want to deploy. For example, if you only want to deploy Harness Platform, download the `platform-images.tgz` file. Available image files are:

     - Chaos Engineering: `ce-images.tgz`
     - Cloud Cost Management: `ccm-images.tgz`
     - Chaos Engineering: `ce-images.tgz`
     - Continuous Delivery & GitOps NextGen: `cdng-images.tgz`
     - Continuous Error Tracking: `cet-images.tgz`
     - Continuous Integration: `ci-images.tgz`
     - Feature Flags: `ff-images.tgz`
     - Harness Platform: `platform-images.tgz`
     - Security Testing Orchestration: `sto-images.tgz`

   :::info note
   The `platform-images.tgz` file includes NextGen dashboards and policy management enabled by default. The `cdng-images.tgz` file includes GitOps by default.
   :::

- Harness airgap images [harness-airgap-images.sh](https://storage.googleapis.com/smp-airgap-bundles/harness-airgap-images.sh)

## Set Docker architecture

Air-gapped environment installation requires Docker build architecture amd64.

Run the following command before you save Docker images to your private registry.

 `export DOCKER_DEFAULT_PLATFORM=linux/amd64`

## Save Docker images to your private registry

To save Docker images, do the following:

1. Sign in to your private registry.
    ```
    #Authenticate with Docker for Docker Registry
    docker login <registry-url>

    #Authenticate with Google Cloud Platform for GCR
    gcloud auth login

    #Authenticate with AWS for ECR
    aws ecr get-login-password --region <region> | docker login --username AWS --password-
    ```
    All Docker files required to deploy Harness are stored in the [Harness Helm charts repository](https://github.com/harness/helm-charts/releases).
2. Add the `*.tgz` for each module you want to deploy to your air-gapped network. You can now push your images locally.
3. Run `harness-airgap-images.sh`.
    ```
    ./harness-airgap-images.sh -r REGISTRY.YOURDOMAIN.COM:PORT -f <moduleName-images.tgz>
    ````

## Download and push Helm charts
After you save Docker images to your private registry, you must download the Helm charts and push them to your repository.

To download and push Helm charts:

You can use Helm to pull the chart and push it to your private repository or download the chart directly.

-
    ```
    helm repo add harness https://harness.github.io/helm-charts
    helm pull harness/harness
    helm push harness docker://private-repo
    ```

To download the Helm chart:

 - Download the chart from the [Harness repository](https://github.com/harness/helm-charts/releases).

## Install via Helm
Next, you are ready to install via Helm by updating your `override.yaml` file with your private registry information.

To install via Helm, do the following:

1. Update the `override.yaml` file with your private registry information.

    ```yaml
    global:
      imageRegistry: "private-123.com"
    ```
2. Run the Helm install command.

    ```
    helm install my-release harness/harness -n <namespace> -f override.yaml
    ```
