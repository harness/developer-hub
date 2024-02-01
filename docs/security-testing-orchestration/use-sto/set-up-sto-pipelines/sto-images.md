---
title: Harness STO images
description: How STO pulls the images it needs, and how to update images in a private registry.
sidebar_position: 70
---


import Dhrl from '/docs/continuous-integration/shared/docker-hub-rate-limiting-trbs.md';

This topic describes how Harness updates maintains supported STO images and how to update these images yourself if you use a private registry. 

:::note
Harness updates STO images every two weeks and supports the *two most recent updates only*. If you store your Harness images in a private registry, you must update your images each month to ensure that you're using the latest supported images in your pipelines. 
:::

## Harness STO images list

When a Harness pipeline runs, each stage begins with an *initialize* step. During initialization, the pipeline prepares the build infrastructure and pulls the images required to run the steps. By default, Harness stores and downloads these images from the [Harness project on GCR](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness).

Here are are a few examples of Harness STO images in the [Harness GCR project](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness).

* [`harness/sto-plugin`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/sto-plugin): Launch and orchestrate scan steps included in the pipeline.
* [`harness/anchore-job-runner`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/anchore-job-runner): Run Anchore Enterprise orchestration scans. 
* [`harness/gitleaks-job-runner`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/gitleaks-job-runner): Run Gitleaks orchestration scans. 
* [`harness/owasp-dependency-check-job-runner`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/owasp-dependency-check-job-runner): Run OWASP Dependency-Check orchestration scans. 

## Harness STO image pulls

By default, when an STO pipeline runs, the Harness Delegate uses a [GCP connector](/docs/platform/connectors/artifact-repositories/connect-to-an-artifact-repo) to make an anonymous outbound connection to pull the Harness STO images from the public container registry where they are stored.

### I don't want to pull images anonymously

If you don't want the Harness Delegate to pull images anonymously, you can use credentialed access instead. For instructions, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector).

### I don't want to pull images from a public registry

Harness STO images are stored in a public container registry. If you don't want to pull the images directly from the public registry, you can pull Harness images from your own private registry. For more information, go to [Configure STO to download images from a private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).

### Docker Hub rate limiting

**TBD Is this still relevant if we're storing images in GCR instead of DH?** 

<Dhrl />

## Harness CI image updates

**TBD This is taken from the [CI doc](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci#harness-ci-image-updates), needs updating based on the STO team cadence....** 

Your organization has a one-month window to run security scans or other tests on new STO build images before you deploy them. Every two weeks, Harness publishes new versions of images required to run STO builds. Each image is backwards-compatible with the previous two releases.

Harness updates STO images, such as [`harness/sto-plugin`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/sto-plugin) and [`harness/veracode-agent-job-runner`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/veracode-agent-job-runner), according to the following release process:


* Harness publishes updates for all STO images on the second and fourth Monday of each month.
* Version numbers use an `x.y.z` format where `x` indicates the major release number, `y` indicates the minor release number, and `z` indicates a hotfix or patch release number.
* All images are supported for the latest three releases: `latest`, `latest-1`, and `latest-2`. Each image release is backward-compatible with the previous two releases.
* You can choose to deploy the latest containers immediately upon release, or you can download and scan them before deployment.
* If a hotfix or security fix is required for a specific image, Harness creates hotfixes for the latest three images and notifies customers when these hotfixes are available.


## Deprecation notice: app.harness Docker registry

Harness images are available on Docker Hub and the [Harness project on GCR](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness). In a continuation of this effort, and to improve stability when pulling Harness-required images, Harness is deprecating the Harness-hosted `app.harness` Docker registry effective 15 February 2024.

You will be impacted by this deprecation if:

* Your built-in Harness Docker connector (`account.harnessImage`) is configured to the `app.harness` Docker registry. To avoid errors when the deprecation takes place, [configure the built-in Docker connector to use credentialed access to the Harness project on GCR](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/#configure-harness-to-always-use-credentials-to-pull-harness-images).
* You [pull Harness images from a private registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/#pull-harness-images-from-a-private-registry), and you are currently pulling the latest images from the `app.harness` Docker registry. To avoid errors when the deprecation takes place, make sure you are pulling images from the [Harness project on GCR](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness).
* You have other Docker connectors configured to the `app.harness` Docker registry. Edit these connectors to use `https://registry.hub.docker.com` instead.

## Troubleshoot Harness images

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to Harness-required images and pipeline initialization, such as:

* [How do I get a list of tags available for an image in the Harness image registry?](/kb/continuous-integration/continuous-integration-faqs/#how-do-i-get-a-list-of-tags-available-for-an-image-in-the-harness-image-registry)
* [Build failed with "failed to pull image" or "ErrImagePull"](/kb/continuous-integration/continuous-integration-faqs/#build-failed-with-failed-to-pull-image-or-errimagepull)
* [What access does Harness use to pull the Harness internal images from the public image repo?](/kb/continuous-integration/continuous-integration-faqs/#what-access-does-harness-use-to-pull-the-harness-internal-images-from-the-public-image-repo)
* [Can I use my own private registry to store Harness CI images?](#i-dont-want-to-pull-images-from-a-public-registry)
* [Docker Hub rate limiting](#docker-hub-rate-limiting)
