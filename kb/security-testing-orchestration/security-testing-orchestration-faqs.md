---
title: Security Testing Orchestration (STO) FAQs
description: Frequently asked questions about Harness Security Testing Orchestration (STO).
sidebar_position: 2
---

## Can I prevent the user who requested an exemption from approving it?

To approve exemptions, users must have the **Approve/Reject** permission. Currently, Harness STO doesn't have a setting to prevent the user who requested the exemption from also approving it.

## Can the size of the container image impact pod eviction during a scan?

Yes, the size of the container image contributes to resource utilization, especially large images (around 4GB). Make sure the container has sufficient resources allocated to prevent eviction during resource-intensive tasks, such as Aqua scans.

## Does STO support execution on ARM64 architecture?

Currently, STO doesn't support running on ARM64 platforms.

## Can I use a specific image tag for STO images?

Yes. For instructions and information about customizing your STO images, go to:

- [Update your STO images](https://developer.harness.io/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/sto-images)
- [Create custom scanner images](https://developer.harness.io/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/create-custom-scan-images)
- [Store images in a private registry](https://developer.harness.io/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry)

## Can I use an API to extract data on vulnerabilities detected by STO?

Public APIs for this functionality are on the [STO roadmap](https://developer.harness.io/roadmap/#sto).

## STO dashboards

### These is no Test Execution Summary widget in the list of dashboard widgets

To use this widget, you must have the `CI_TI_DASHBOARDS_ENABLED` feature flag enabled for your account. This feature flag enables the Unit Tests Metrics dashboard. Contact [Harness Support](mailto:support@harness.io) to enable this feature flag.

### Why doesn't the STO dashboard populate the data from targets?

This happens when scan executions don't have baselines set. You must set test target baselines to show this data on your STO dashboards. 

Every scanned target needs a baseline to enable the full suite of STO features. For more information, go to [Target baselines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines). 

#### I'm trying to create a dashboard to display the STO metrics for my project, but my organization is not getting listed in the filter. Hence, I'm not able to get my project filtered.

The dashboard only populates projects that had a baseline scan run previously. Check that your scanned targets have baselines defined if they don't appear in the dashboard.

Every scanned target needs a baseline to enable the full suite of STO features. For more information, go to [Target baselines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines). 

## Aqua scans

### Pod evicted during an Aqua scan

Pod eviction during an Aqua scan can be attributed to resource constraints, especially with a large image size (around 4GB).

To address pod eviction during an Aqua scan, increase container resource limits by adjusting the resource requests and limits for the container.

### Can the Aqua Security scan use an image built with PLUGIN_NO_PUSH?

No. The Aqua Security scan can't pick up a local image.

## AWS ECR scans

### How do I configure a session token in the AWS ECR scan step?

You can set the `AWS_SESSION_TOKEN` in the [Authentication settings](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/aws-ecr-scanner-reference/#authentication).

## BlackDuck scans

### During BlackDuck scans in my pipeline, I get a "Could not connect to addon client after max retries" error, but this error doesn't occur locally

The "Could not connect to addon client after max retries" error typically indicates that the container running the BlackDuck scan step is terminated abruptly due to insufficient resources. To address this issue, Harness recommends increasing the resources allocated to the BlackDuck step.

You can begin by adjusting the resource allocation to `memory: 1Gi` and `cpu: "1.0"`. Then, monitor the memory and CPU consumption of the container during the scan to gauge its resource requirements accurately. Based on this observation, you can further refine the resource allocation as needed to prevent container termination and ensure successful BlackDuck scans in your pipeline.

For more information, go to [Optimize STO pipelines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/optimize-sto-pipelines).

## Grype scans

### Grype exception "db could not be loaded: the vulnerability database was built n weeks ago (max allowed age is 5 days)"

Go to [Troubleshoot "vulnerability database build date exceeds max allowed age" exception](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference#troubleshoot-vulnerability-database-build-date-exceeds-max-allowed-age-exception) in the Grype scanner reference.

## OWASP scans

### OWASP step generates exception when initializing Yarn Audit Analyzer 

<!-- https://harness.atlassian.net/browse/STO-6975 -->

Go to [Troubleshoot Yarn Audit Analyzer exceptions](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference#owasp-step-generates-yarn-audit-analyzer-exception) in the OWASP scanner reference.

## Prisma Cloud scans

### How do I add labels to a Prisma Cloud scan when my build infrastructure is Kubernetes or Docker?
To add labels such as `JOB_NAME` to your Prisma Cloud scans, add key-value pairs to **Settings (optional)** in your Prisma Cloud scan step. These key-value pairs will be added as labels when you run the scan.

:::note 
This is currently supported on Kubernetes and Docker build infrastructures only. Harness has a roadmap item to support this on Harness Cloud infrastructures.
:::

## Sonar scans

Go to [Troubleshoot Sonar Scans](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference#troubleshoot-sonar-scans) in the SonarQube scanner reference. This section discusses the following:
- [Can't generate SonarQube report due to shallow clone](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference#sonarqube-doesnt-scan-the-main-branch-and-pull-request-branches-in-the-same-pipeline)
- [Add the sonar.projectVersion to a Harness pipeline](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference#add-the-sonarprojectversion-to-a-harness-pipeline)
- [SonarQube doesn't scan the main branch and pull request branches in the same pipeline](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference#sonarqube-doesnt-scan-the-main-branch-and-pull-request-branches-in-the-same-pipeline)

#### Why am I getting the error Missing target_name for scan_type [repository] scan.
This error ocurrs if there's no scan target in the Scanner configuration. To fix this, please ensure that the Scan Step configuration properly selects a target.


#### How does the SonarQube integration work when attempting to perform a branch scan with SonarQube Enterprise?

An enhancement has been made to ensure the orchestration step always downloads results for the branch specified in the step, instead of downloading results only for main or master branches. For more information, go to:

- [SonarQube pull-request scan configuration](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference#sonarqube-pull-request-scan-configuration)
- STO release notes > [Version 1.83.1](https://developer.harness.io/release-notes/security-testing-orchestration#version-1831)
