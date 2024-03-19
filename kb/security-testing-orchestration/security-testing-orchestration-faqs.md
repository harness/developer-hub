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

To use this widget, the `CI_TI_DASHBOARDS_ENABLED` feature flag must be enabled for your account. This feature flag enables the Unit Tests Metrics dashboard. Contact [Harness Support](mailto:support@harness.io) to enable this feature flag.

### Why doesn't the STO dashboard populate the data from targets?

This happens when scan executions don't have baselines set. You must set test target baselines to shown this data on your STO dashboards.

## Aqua scans

### Pod evicted during an Aqua scan

Pod eviction during an Aqua scan can be attributed to resource constraints, especially with a large image size (around 4GB).

To address pod eviction during an Aqua scan, increase container resource limits by adjusting the resource requests and limits for the container.

## AWS ECR scans

## How do I configure a session token in the AWS ECR scan step?

You can set the `AWS_SESSION_TOKEN` in the [Authentication settings](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/aws-ecr-scanner-reference/#authentication).

## BlackDuck scans

### During BlackDuck scans in my pipeline, I get a "Could not connect to addon client after max retries" error, but this error doesn't occur locally

The "Could not connect to addon client after max retries" error typically indicates that the container running the BlackDuck scan step is terminated abruptly due to insufficient resources. To address this issue, Harness recommends increasing the resources allocated to the BlackDuck step.

You can begin by adjusting the resource allocation to `memory: 1Gi` and `cpu: "1.0"`. Then, monitor the memory and CPU consumption of the container during the scan to gauge its resource requirements accurately. Based on this observation, you can further refine the resource allocation as needed to prevent container termination and ensure successful BlackDuck scans in your pipeline.

## Grype scans

### Grype exception "db could not be loaded: the vulnerability database was built n weeks ago (max allowed age is 5 days)"

Go to [Troubleshoot "vulnerability database build date exceeds max allowed age" exception](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference#troubleshoot-vulnerability-database-build-date-exceeds-max-allowed-age-exception) in the Grype scanner reference.

## OWASP scans

### OWASP step generates exception when initializing Yarn Audit Analyzer 

<!-- https://harness.atlassian.net/browse/STO-6975 -->

Go to [Troubleshoot Yarn Audit Analyzer exceptions](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference#owasp-step-generates-yarn-audit-analyzer-exception) in the OWASP scanner reference.

## Sonar scans

Go to [Troubleshoot Sonar Scans](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference#troubleshoot-sonar-scans) in the SonarQube scanner reference.
