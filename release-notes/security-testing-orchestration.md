---
title: Security Testing Orchestration
description: Provides an overview of new features and fixed issues.
date: 2023-02-16T10:00
tags: [NextGen, "security testing orchestration"]
sidebar_position: 8
---

Harness Security Testing Orchestration is updated regularly in Harness SaaS. Review the notes below for details about recent changes.

:::note
Harness deploys updates progressively to different Harness SaaS clusters. You can identify the cluster hosting your account in your Account Overview page. The features and fixes in the release notes may not be available in your cluster immediately.

Additionally, the release notes below are only for NextGen SaaS. FirstGen SaaS release notes are available [here](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes) and Self-Managed Enterprise Edition release notes are available [here](/release-notes/self-managed-enterprise-edition).
:::
 			
## February 16, 2023

### New features

This release does not include new features.

### Fixed issues

* Fixed an issue with Prisma Cloud (formerly Twistlock) scans where the step would fail when a twistcli policy encountered a Compliance or Vulnerabilities threshold check that failed. (STO-5559)

## February 5, 2023

### New features

* The Issue Details pane now shows the message “No recommendations are available at this time” when the scan tool doesn't return remediation steps for a specific issue. (STO-5380)

### Fixed issues

This release does not include fixed issues.

## January 29, 2023	

### New features

* You can now ingest results from a specific Checkmarx scan. This option is useful for ensuring that a pipeline ingests the scan triggered by a specific event. Add the setting `product_scan_id` = `MY_SCAN_ID` to the Checkmarx step. This overrides the default behavior, which is to ingest results for the most recent scan. (STO-5424)	

* You can now enable debug-level logging for Snyk and Aqua Trivy scans. To do this, add this setting to the scan step: `log_level` = `debug`. (STO-5405)

* Grype scans now support a `tool_args` field. You can use this field to run the plugin with specific command-line arguments. To scan all layers in an image, for example, add this setting to the Grype scan step: `tool_args` = `--scope all-layers`. (STO-5400)

* To make the Issue Details pane easier to navigate, Raw Details JSON data is now collapsed by default. (STO-5398)	


### Fixed issues

* Fixed an issue that caused a scheduled AWS ECR scan to time out or to terminate with a status of Invalid. (STO-5449)	


## January 15, 2023		

### New features

* Aqua Trivy scans now support a `tool_args` field. You can use this field to run the plugin with specific command-line arguments. To run an offline scan, for example, specify `tool_args` = `---offline-scan`. (STO-5388)	

### Fixed issues

* Fixed an issue where, in some situations, the severity and severity code of a detected issue were not updated when new occurrences of the same issue were detected. (STO-4809)	


## January 8, 2023		

### New features

* Checkmarx scans now support a `tool_args` field. You can use this field to run the Checkmarx plugin with specific command-line arguments. To run an incremental scan, for example, specify `tool_args` = `-incremental`. (STO-5041)	

* STO now supports orchestrated scans using [Grype](/docs/security-testing-orchestration/sto-techref-category/grype-scanner-reference). (STO-5161)	

### Fixed issues

This release does not include fixed issues.

## January 1, 2023	

### New features

* The Issues Details pane has been revised to make it easier to navigate. Raw JSON data now appears at the bottom of each occurrence and is collapsed by default. (STO-4839)	

### Fixed issues

This release does not include fixed issues.


## December 18, 2022			

### New features

* Remediated issues are no longer included in the issue counts logged near the end of a Security Step run and provided as output variables. (STO-5304)	

*  With this release, you can run a SonarQube scan and specify a collection of SSL certificates rather than a single certificate. This option is useful when you don't know which specific certificate in a collection is required by the server. (STO-5243)	

### Fixed issues

* Fixed an issue where `product_lookup_type` being set to `byTokens` causes the step to perform a Dataload instead of OrchestratedScan. (STO-5166)	


## December 11, 2023			

### New features
	
* STO is now supported on Linux (amd64 and arm64 platforms) in [Harness Cloud](/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart). (STO-5314)	

* Instead of using Service Dependencies for Docker-in-Docker configuration, users should use new Background steps. (STO-5268)

### Fixed issues

This release does not include fixed issues.


## December 4, 2023			

### New features

This release does not include new features.

### Fixed issues

* Fixed an issue that resulted in intermittent failures with OWASP orchestrated scans. (STO-5289)	


## November 28, 2023			
	

### New features

This release does not include new features.	

### Fixed issues

* Fixed an issue where the Security Tests tab on the Pipeline Execution page was periodically reloading in a visually jarring way and losing scroll position. (STO-5208)

* Fixed an issue where the Security Tests tab would show previously-found issues as "remediated" while the scan was in progress.  (STO-4985)	

* Improved the Security Tests UI to highlight new issues found in the current target only vs. issues also found in the baseline, or in the previous scan if no baseline was specified. (STO-5198)	


## November 6, 2023	

### New features

* You can now include Run steps in Security Test stages. You can also include Security Tests stages in STO pipelines without a CI license. (STO-5208)

* You can now configure a pipeline to ingest Snyk data from multiple files and paths. For an example of how to set this up, go to [Ingest Scan Results from Snyk](/docs/security-testing-orchestration/use-sto/snyk-scans). (STO-4958)	

### Fixed issues

* Fixed an issue where the issue counts reported in output variables vs. the Security Tests page were inconsistent for scans of target baselines, or for targets with no specified baseline. (STO-5042)	


## October 31, 2022

### What's New

- New output variables – This release includes a new set of output variables you can use to determine the next stage of your pipeline. These variables show the number of new issues detected in the current scan compared to the last scan. If this is the first scan for the target, these variables reflect new issues compared to the baseline. You can use these variables to determine the next stage of your pipeline:
  - NEW_CRITICAL
  - NEW_HIGH
  - NEW_MEDIUM
  - NEW_LOW
  - NEW_UNASSIGNED (Reserved for future use)
  - NEW_TOTAL (STO-4866)
- STO Overview – The STO Overview provides a single, interactive view of all baseline issues detected by all scans in your project. A time series chart shows the daily distribution of issues by severity over the past 30 or 90 days. A daily snapshot shows the sum of all baseline issues based on the latest scan of each baseline. You can also drill down into active, failed, and in-progress baseline scans. (STO-3629)
- STO scans on VMs using Docker delegates – You can now run builds with STO scans using Docker delegates running on Linux VMs in AWS and other cloud platforms. This extends the support for STO scans with Kubernetes delegates.
  For information about setting up a VM build infrastructure, see Set Up Build Infrastructure in the CI docs. (STO-4639)
- Two-step Exemption and Security Review – This release enhances support for a two-step process for requesting and approving security exemptions:
  - Developers can request (but not approve) exemptions to unblock pipeline builds for specific issues.
  - Only SecOps users can approve exemption requests and choose to mute or ignore specific issues. (STO-4479)
- AWS Security Hub – STO now supports scans in AWS Security Hub. (STO-4873)
- AWS ECR – STO now supports scans on AWS Elastic Container Registry (ECR). (STO-4969)

## August 2, 2022

### What's New

The STO module launches its first GA product with the following capabilities:

- Pipeline-Driven STO:
  - Standalone STO:
    - Provision to create standalone STO Stages and secure Pipelines (Ex: Pipelines initiated via Gitlab or Github).
  - Orchestrate scanners inside Harness CI Pipeline:
    - Run scanners as an additional stage or steps within a Harness CI Pipeline.
  - Orchestrate scanners inside Harness CD Pipeline:
    - Run scanners as an additional Stage or Steps within a Harness CD Pipeline.
- Developer-first Remediation: Security testing results normalized, deduplicated, and prioritized across all scanners.
- Dedicated Security Exemptions Section: Ability to grant and manage security exemptions by SecOps owners on identified vulnerabilities or issues during security testing. Exemptions can also be made in the STO Pipeline against specific issues.
- Custom Dashboards & Reports: Ability to create custom visualizations and reports based on attributes related to STO and secure pipeline creation (40+ attributes).
- OPA-based Governance Policies: Support for crafting governance policies for STO specific Pipelines and workflows.
- Platform Integration: Audit trails and other Enterprise Platform features like RBAC, Notifications, Pipeline Config-as-Code
  - Default RBAC roles for STO Developer & STO SecOps Personas
  - Notification Channels:
    - Email, Slack, PagerDuty, Microsoft Teams
- Self-Managed Platform (On-premise software)
  - Helm Chart package with bundled Harness CI and CD modules

See Security Testing Orchestration Basics.

### Enhancements

N/A

### Fixed issues

N/A
