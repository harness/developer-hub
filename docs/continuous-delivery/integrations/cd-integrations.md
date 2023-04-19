---
title: Harness CD ecosystem
description: Select the tools and platforms for deploying your apps. 
sidebar_position: 1
---

This topic lists the tools and platforms you can use in Harness for deploying your apps.

## Kubernetes

For information on deployment options, go to [What Can I Deploy in Kubernetes?](../deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes).

### Kubernetes version support

The following versions are tested and supported for Kubernetes Canary, Rolling, and Blue/Green deployments:

- 1.13.0
- 1.14.0
- 1.15.0
- 1.16.0
- 1.17.0
- 1.18.0
- 1.19.4
- 1.20.0
- 1.21.0
- 1.22.0
- 1.23.0
- 1.24.3

For details on other tools and version included in Harness, see [SDKs installed with the Delegate](https://developer.harness.io/docs/platform/Delegates/delegate-reference/delegate-required-sdks).

Guidelines:

- Harness will officially support 3 previous versions from the last stable release. For example, the current most recent stable release is 1.24.3, and so Harness supports 1.23, 1.22, and 1.21.
- Harness supports any other versions of Kubernetes you are using on a best effort basis.
- Harness commits to support new minor versions within 3 months of the first stable release. For example, if the stable release of 1.24.3 occurs on August 15th, we will support it for compatibility by November 15th.

## Helm

Helm chart dependencies are not supported in Git source repositories (Harness [Code Repo Connectors](/docs/category/code-repo-connectors)). Helm chart dependencies are supported in Helm Chart Repositories.

## Artifact servers, repos, and artifacts

Harness uses **Metadata only** when downloading artifact sources.

For pulling Docker images from Docker repos, Harness is restricted by the limits of the Docker repo. For example, [Docker Hub limits](https://docs.docker.com/docker-hub/download-rate-limit/).

The maximum number of artifact image tags fetched by Harness that is 10000.

The following table lists Harness integrations and their artifact source support:

|                              | **Docker Hub** | **ECR** | **GCR** | **GCS** | **ACR** | **Artifactory** | **Nexus 3** | **Custom** | **Google Artifact Registry** | **Github Artifact Registry** | **Jenkins** | **AWS S3** |
| ---------------------------- | -------------- | ------- | ------- | --- | ------- | --------------- | ----------- | ---------- | ---------------------------- | ---------------------------- | ----------- | ---------- |
| **Kubernetes**               | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          | ✅         | ✅                           | ✅                           |             |            |
| **Helm**                     | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          | ✅         |                              |                              |             |            |
| **AWS ECS**                  | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          | ✅         |                              |                              |             |            |
| **AWS ASG**                  |                |         |         |     |         |                 |             |            |                              |                              |             |            |
| **AWS Lambda**               |                | ✅      |         |     |         |                 |             |            |                              |                              |             | ✅         |
| **Azure Web Apps**           | ✅             |         |         |     | ✅      | ✅              | ✅          |            |                              |                              |             |            |
| **Tanzu**                    | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          |            |                              |                              |             |            |
| **SSH**                      |                |         |         |     |         | ✅              | ✅          | ✅         |                              |                              | ✅          | ✅         |
| **WinRM**                    |                |         |         |     |         | ✅              | ✅          | ✅         |                              |                              | ✅          | ✅         |
| **Serverless.com Framework** |                | ✅      |         |     |         | ✅              |             |            |                              |                              |             | ✅         |
| **Google Cloud Function**    |                |         |         | ✅    |         |                 |             |            |                              |                              |             |            |


## Manifest and Config file Store Support

The following table lists where you can store your manifests or config files for each integration.



|                               | **Github** | **Gitlab** | **Bitbucket** | **Harness File Store** | **Any Git** | **OCI Helm** | **HTTP Helm** | **AWS S3** | **Custom** | **Google Cloud Storage** | **Inherit from manifest** |
| ----------------------------- | ---------- | ---------- | ------------- | --------------------- | ----------- | ------------ | ------------- | ---------- | ---------- | ------------------------ | ------------------------- |
| **Kubernetes**                | ✅         | ✅         | ✅            | ✅                    | ✅          | ✅           | ✅            | ✅         | ✅         | ✅                       | ✅                        |
| **Values YAML**               | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            | ✅         |                          | ✅                        |
| **Kustomize**                 | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            |            |                          |                           |
| **Kustomize Patches**  | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            |            |                          | ✅                        |
| **OpenShift Template** | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            | ✅         |                          |                           |
| **OpenShift Params**   | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            | ✅         |                          |                           |
| **AWS ECS**                   | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            |            |                          | ✅                        |
| **Helm Chart**                | ✅         | ✅         | ✅            | ✅                    | ✅          | ✅           | ✅            | ✅         | ✅         | ✅                       | ✅                        |
| **Serverless.com Framework**            | ✅         | ✅         | ✅            |                       | ✅          |              |               |            |            |                          |                           |
| **SSH**                       |            |            |               | ✅                    |             |              |               |            |            |                          |                           |
| **WinRM**                     |            |            |               | ✅                    |             |              |               |            |            |                          |                           |
| **Azure Web Apps**            |            |            |               | ✅                    |             |              |               |            |            |                          |                           |
| **Google Cloud Function**     | ✅         | ✅         | ✅            | ✅                    | ✅          |              |              |           |           |                         |                         |


## Terraform version support

Harness does not include Terraform on the Harness Delegate. You must install Terraform on the Delegate when using Terraform in Harness. For more information, go to [Terraform provisioning overview](../cd-infrastructure/terraform-infra/terraform-provisioning-with-harness).

Harness supports the following Terraform versions:

- v1.3.5
- v1.1.9
- v1.0.0
- v0.15.5
- v0.15.0
- v0.14.0

Here's an example install script for the Harness delegate:

```bash
# Install TF
microdnf install unzip
curl -O -L https://releases.hashicorp.com/terraform/1.3.5/terraform_1.3.5_darwin_amd64.zip
unzip terraform_1.3.5_darwin_amd64.zip
mv ./terraform /usr/bin/
# Check TF install
terraform --version
```

Some Harness features might require specific Terraform versions.

## Azure AKS clusters

To use an AKS cluster for deployment, the AKS cluster must have local accounts enabled (AKS property `disableLocalAccounts=false`).

## AWS and Azure GovCloud

Harness is now certified in Azure GovCloud and AWS GovCloud.

## GitOps

Harness GitOps lets you perform GitOps deployments in Harness. You define the desired state of the service you want to deploy in your Git manifest, and then use Harness GitOps to sync state with your live Kubernetes cluster.

GitOps supports the following:

- Source Repositories:
  - All Git providers.
  - HTTP Helm repos.
- Target clusters:
  - Kubernetes clusters hosted on any platform:
    - GKE.
    - AKS.
    - EKS.
    - Other Kubernetes-compliant clusters.
    - OpenShift version 3.11, 4.x.
    - Minikube.
    - Kubernetes Operations (kops).
- Repository Certificates:
  - TLS Certificate (PEM format).
  - SSH Known Host Entry.
- GnuPG Keys:
  - GnuPG Public Key Data (ASCII-armored).

See [Harness GitOps Basics](../gitops/harness-git-ops-basics) and [Harness CD GitOps tutorial](../gitops/harness-cd-git-ops-quickstart).