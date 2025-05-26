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
- Harness images are available on Docker Hub and Google Artifact Registry. However, Harness is [deprecating the `app.harness` Docker registry](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci/#deprecation-notice-appharness-docker-registry) and recommends that you download images from the [Harness project on GAR](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public) instead. 
:::

## Harness STO images list

When a Harness pipeline runs, each stage begins with an *initialize* step. During initialization, the pipeline prepares the build infrastructure and pulls the images required to run the steps.

Here are are a list of Harness STO images in the [Harness GAR project](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public).
<details>

<summary>STO images in Harness GAR Project</summary>

- [anchore-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fanchore-job-runner)  
- [aqua-security-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Faqua-security-job-runner)  
- [aqua-trivy-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Faqua-trivy-job-runner)  
- [aws-ecr-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Faws-ecr-job-runner)  
- [aws-security-hub-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Faws-security-hub-job-runner)  
- [bandit-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fbandit-job-runner)  
- [blackduckhub-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fblackduckhub-job-runner)  
- [brakeman-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fbrakeman-job-runner)  
- [burp-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fburp-job-runner)  
- [checkmarx-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fcheckmarx-job-runner)  
- [checkmarx-one-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fcheckmarx-one-job-runner)  
- [checkov-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fcheckov-job-runner)  
- [fossa-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Ffossa-job-runner)  
- [gitleaks-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fgitleaks-job-runner)  
- [grype-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fgrype-job-runner)  
- [nikto-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fnikto-job-runner)  
- [nmap-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fnmap-job-runner)  
- [osv-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fosv-job-runner)  
- [owasp-dependency-check-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fowasp-dependency-check-job-runner)  
- [prowler-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fprowler-job-runner)  
- [semgrep-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fsemgrep-job-runner)  
- [shiftleft-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fshiftleft-job-runner)  
- [snyk-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fsnyk-job-runner)  
- [sonarqube-agent-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fsonarqube-agent-job-runner)  
- [sto-plugin](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fsto-plugin)  
- [sysdig-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fsysdig-job-runner)  
- [tenableio-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Ftenableio-job-runner)  
- [traceable-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Ftraceable-job-runner) (Prisma Cloud)
- [twistlock-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Ftwistlock-job-runner)  
- [veracode-agent-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fveracode-agent-job-runner)  
- [whitesource-agent-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fwhitesource-agent-job-runner) (Mend.io)
- [wiz-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fwiz-job-runner)  
- [zap-job-runner](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fzap-job-runner)  

</details>

## I don't want to pull images from a public registry

If you don't want to pull images directly from the public Harness registry, you can pull images from your own private registry. For more information, go to [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).


## When should I update my STO images? 

Your organization has a one-month window to run security scans or other tests on new STO images before you deploy them. 

Harness has the following process for updating STO images such as [`sto-plugin`](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fsto-plugin) and [`veracode-agent-job-runner`](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public/harness%2Fwhitesource-agent-job-runner):


* Harness publishes updates for STO images every two weeks.
* Version numbers use an `x.y.z` format with the major, minor, and hotfix or patch release number.
* You can choose to deploy the latest containers immediately upon release, or you can download and scan them before deployment.


## For more information

Harness STO uses many of the same policies and procedures for maintaining images as Harness CI. For more information, go to [Harness CI images](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci).