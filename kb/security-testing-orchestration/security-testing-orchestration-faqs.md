---
title: Security Testing Orchestration (STO) FAQs
description: Frequently asked questions about Harness Security Testing Orchestration (STO).
sidebar_position: 2
---

## Can I prevent the user who requested an exemption from approving it?

To approve exemptions, users must have the **Approve/Reject** permission. Currently, Harness STO doesn't have a setting to prevent the user who requested the exemption from also approving it.

## Can the size of the container image impact pod eviction during a scan?

Yes, the size of the container image contributes to resource utilization, especially large images (around 4GB). Make sure the container has sufficient resources allocated to prevent eviction during resource-intensive tasks, such as Aqua scans.

## Aqua scans

### Pod evicted during an Aqua scan

Pod eviction during an Aqua scan can be attributed to resource constraints, especially with a large image size (around 4GB).

To address pod eviction during an Aqua scan, increase container resource limits by adjusting the resource requests and limits for the container.

## Grype scans

### Grype exception "db could not be loaded: the vulnerability database was built n weeks ago (max allowed age is 5 days)"

Go to [Troubleshoot "vulnerability database build date exceeds max allowed age" exception](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference#troubleshoot-vulnerability-database-build-date-exceeds-max-allowed-age-exception) in the Grype scanner reference.

## OWASP scans

### OWASP step generates exception when initializing Yarn Audit Analyzer 

<!-- https://harness.atlassian.net/browse/STO-6975 -->

Go to [Troubleshoot Yarn Audit Analyzer exceptions](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference#owasp-step-generates-yarn-audit-analyzer-exception) in the OWASP scanner reference.
  

## Sonar scans

Go to [Troubleshoot Sonar Scans](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference#troubleshoot-sonar-scans) in the SonarQube scanner reference. 

This section discusses the following:

- [Can't generate SonarQube report due to shallow clone](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference#cant-generate-sonarqube-report-due-to-shallow-clone)
- [How to include arguments such as `sonar.projectVersion` in a Harness pipeline](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference#additional-cli-flags)

## Why is SonarQube not scanning the main branch and pull request branches within the same pipeline?

A: If SonarQube is not scanning both the main branch and pull request (PR) branches within the same pipeline, it may indicate an issue with the pull request setup in SonarQube. One potential solution involves configuring conditional arguments within the Harness platform to handle PR and branch scan requests separately.

To implement this solution, conditional arguments can be used to execute specific steps based on whether it's a PR scan request or a branch scan request. For instance, expressions like <+codebase.build.type>=="branch" or <+codebase.build.type>=="pr" can be utilized for this purpose.

For further guidance and details on utilizing built-in CI/CD codebase variables like <+codebase.build.type>, refer to the Built-in CI/CD Codebase Variables Reference https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference/#codebasebuildtype . This approach ensures proper configuration and execution of SonarQube scans for both main and PR branches within your pipeline.

## Why do I face a "Could not connect to addon client after max retries" error during BlackDuck scans in my pipeline, whereas I cannot reproduce the error locally?

The "Could not connect to addon client after max retries" error typically indicates that the container running the BlackDuck scan step is terminated abruptly due to insufficient resources. To address this issue, it's advisable to increase the resources allocated to the BlackDuck step.

You can begin by adjusting the resource allocation with memory: 1Gi and cpu: "1.0". Additionally, monitor the memory and CPU consumption of the container during the scan to gauge its resource requirements accurately. Based on this observation, you can further fine-tune the resource allocation as needed to prevent container termination and ensure successful BlackDuck scans in your pipeline.