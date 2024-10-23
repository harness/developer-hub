---
title: Update your STO images
description: How STO pulls the images it needs, and how to update images in a private registry.
sidebar_position: 20
---


This topic describes how Harness updates and maintains supported STO images and how to update these images yourself if you use a private registry. 

:::note Important Notes

- Harness updates STO images every two weeks. 
- If you store your Harness images in a private registry, Harness strongly recommends that you update your images each month to ensure that you're using the latest supported scanner images in your pipelines.
- Harness does not support STO images that are more than 90 days old.  
- Harness images are available on Docker Hub and Google Container Registry. However, Harness is [deprecating the `app.harness` Docker registry](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci/#deprecation-notice-appharness-docker-registry) and recommends that you download images from the [Harness project on GCR](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness) instead. 
:::

## Harness STO images list

When a Harness pipeline runs, each stage begins with an *initialize* step. During initialization, the pipeline prepares the build infrastructure and pulls the images required to run the steps.

Here are are a few examples of Harness STO images in the [Harness GCR project](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness).

* [`sto-plugin`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/sto-plugin): Launch and orchestrate scans and ingest, normalize, and deduplicate the results.
* [`anchore-job-runner`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/anchore-job-runner): Run Anchore Enterprise orchestration scans. 
* [`gitleaks-job-runner`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/gitleaks-job-runner): Run Gitleaks orchestration scans. 
* [`owasp-dependency-check-job-runner`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/owasp-dependency-check-job-runner): Run OWASP Dependency-Check orchestration scans. 

## I don't want to pull images from a public registry

If you don't want to pull images directly from the public Harness registry, you can pull images from your own private registry. For more information, go to [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).


## When should I update my STO images? 

Your organization has a one-month window to run security scans or other tests on new STO images before you deploy them. 

Harness has the following process for updating STO images such as [`sto-plugin`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/sto-plugin) and [`veracode-agent-job-runner`](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness/veracode-agent-job-runner):


* Harness publishes updates for STO images every two weeks.
* Version numbers use an `x.y.z` format with the major, minor, and hotfix or patch release number.
* You can choose to deploy the latest containers immediately upon release, or you can download and scan them before deployment.


## For more information

Harness STO uses many of the same policies and procedures for maintaining images as Harness CI. For more information, go to [Harness CI images](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci).