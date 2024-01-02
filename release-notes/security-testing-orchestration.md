---
title: Security Testing Orchestration release notes
sidebar_label: Security Testing Orchestration
description: Provides an overview of new features and fixed issues.
date: 2023-12-03T10:00
tags: [NextGen, "security testing orchestration"]
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/security-testing-orchestration/rss.xml" />

These release notes describe recent changes to Harness Security Testing Orchestration (NextGen SaaS).

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## December 2023 

### Version 1.77.1

<!-- 2023-12-21 -->

#### New enhancement

This release introduces a change in behavior when ingesting SARIF data. Previously, issues with a level of **Error** in SARIF got assigned a severity of **Critical** in STO. These issues now get assigned a severity of **High**. (STO-6845, ZD-55359)

#### Fixed issue

Fixed an issue where the SonarQube step was assigning incorrect values to the Java Binaries setting.  (STO-6808)



### Version 1.76

<!-- 2023-12-03 -->

#### New enhancements

- Added a new setting for Checkmarx scans, which is useful when you want STO to exclude issues detected by Checkmarx but flagged as Not Exploitable. (STO-6712, ZD-53483)

  To enable this setting, go to the **Checkmarx** or **Security** step and add the following key-value pair under Settings:

  `hide_not_exploitable` : `True`

- Expiration time for exemptions now start when the exemption is approved. (STO-6604)

#### Fixed issue

<!-- 2023-12-14 -->

Fixed an issue where only the first run in a SARIF file was being ingested. This occurred when Snyk was configured with the `--all-projects` flag. (STO-6832, ZD-55065)


## November 2023 

### Version 1.75.1

<!-- 2023-11-26 -->

##### New enhancement 

- Browser windows and tabs have more descriptive titles to improve navigation across the primary STO windows. (STO-4555)
  - STO Overview
  - Test Targets
  - Exemptions
  - STO Getting Started

### Version 1.74.1

<!-- 2023-11-12 -->

#### New features and enhancements

- You can now ingest container-image scan results from [Aqua Security Enterprise](/docs/security-testing-orchestration/sto-techref-category/aquasec-scanner-reference). (STO-5661, ZD-41491) 

- The **Exemptions** table now shows the pipeline name in the **Scope** column and not the ID. This keeps the user experience consistent with other areas of the application. (STO-6631)

#### Fixed issues

- Fixed an issue that caused the **Issue Details** pane to show target names from other projects in the same account. (STO-6693)


### Version 1.73.1

<!-- 2023-11-05 -->

#### Early access feature

You can now scan your repositories and other components used in your code with [Anchore Enterprise](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference), a scanner that provides visibility into supply chain security risks. This integration is behind the feature flag `STO_STEP_PALETTE_AQUASEC`. (STO-6382)

#### Fixed issues

- Fixed a configuration issue in a back-end service that prevented AIDA from generating remediation steps. (STO-6610) 

- Fixed a UI issue in the **Security Tests** tab where the **Stage** and **Step** pull-down filters showed the `identifier` fields. These filters now show the `name` fields, which are more human-readable. (STO-6629)

## October 2023 

### Version 1.72.0

<!-- 2023-10-29 -->

##### New features and enhancements


import sto_exemptions_timebound from './static/sto-timebound-exemption.png'
import sto_exemptions_table from './static/sto-exemptions-table.png'


- You can now provide feedback about the [AIDA-generated remediation step](https://developer.harness.io/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations) for a selected issue. (STO-6593)

  ![](./static/sto-aida-feedback-sto-6593.png)

- The following Early Availability features are now generally available:

  - You can specify a time limit when you request an exemption. (STO-6367, formerly behind feature flag `STO_TIMEBOUND_EXEMPTIONS`)

   
    
    <img src={sto_exemptions_timebound} alt="Select the time limit for an exemption" height="75%" width="75%" />
    

    The **Exemptions** table includes a **Time Remaining** column that shows when each exemption is scheduled to expire. The table is sorted by this column by default so that soonest-to-expire exemptions are listed first.

    ![](./static/sto-exemptions-table.png)

  - You can click on a row in the **Exemptions** table to view details for the issue associated with that exemption. (STO-5056, formerly behind feature flag `STO_EXEMPTION_DETAILS`) 

    For best results in STO, you should [specify a baseline for every target](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines). To encourage this, the **Exemption Details** pane hides details for an issue if there is no baseline detected. To specify the baseline, select **Set in Targets**.

  - The **Security Tests** tab includes a set of **Security Executions** pull-down menus so you can filter the issue lists by Target, Target Type, Step, Stage, and Scanner. (STO-5212, formerly behind feature flag `STO_DROPDOWN_FILTERS`).

    ![Click on a tile to filter issues by severity](./static/sto-pulldown-filters-sto-5212.png)



#### Early access

- You are now required to sign an end-user license agreement to access the Harness AI Development Assistant (AIDA) in the account and project scopes. You need to do this even if you could previously use AIDA without signing a EULA. This change was originally introduced in the 80505 platform release. (PL-39723)

  The EULA is displayed when you enable AIDA at the account scope (**Account Settings** > **Account Resources** > **Default Settings** > **Harness AI Developer Assistant**).

  Each account user must sign the EULA only once.

  The setting is inherited at the project scope.

#### Fixed issues

- Updated the UI terminology to better communicate the relationship between issues in the current scan vs. previous scans. (STO-6613)

  The **Security Test** UI now uses the following labels to describe issues found in the current scan that are common to previous scans:

  - **Common to \<_target_>:\<_variant_>** Issues also found in the last scan of the specified variant.
  - **Common to previous scan** 
    - Issues also found in the last scan (if the scanned target has no baseline), OR
    - Issues also found in the last scan of the baseline (if the scanned variant is the baseline).
  - **Common to previous / baseline scan** Issues also found in the both the last scan of the specified variant AND the last scan of the baseline. 

- Fixed a UI issue in **Security Tests** when all vulnerabilities detected in a scan had exemptions. The tab showed "No Security Issues Found", all issue counts were 0, and no issues appeared in the UI even when the selected filter included exempted issues. (STO-6642)

### Version 1.71.1

<!-- 2023-10-15 -->

#### Early access

- Updated the exemptions page to bubble up soon-to-expire exemptions to the top of the list. Available in the time bound exemption early access feature available behind the STO_TIMEBOUND_EXEMPTIONS flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature.  (STO-6367)

#### Fixed issues

- The STO dashboard used a marketplace graph which was not available in hosted environments. A new native graph has been chosen so the Security Issues (Overall) graph will be available on all environments. (STO-6613)
- Updated the icon for a false positive exemption to match the other icons (STO-6555)

### Version 1.70.1

<!-- 2023-10-08 -->

##### New features and enhancements

- Improved the look and feel of the exemptions page, and added information about the severity of the issue associated with exemptions and exemption requests. (STO-6592)

#### Early access

- Added support for Matrix pipelines to the pipeline execution results filters
  
  This fixes an issue in a feature behind the Feature Flag `STO_DROPDOWN_FILTERS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. (STO-6405)


### Version 1.69.3

<!-- 2023-10-01 -->

#### Early access

- This release includes the following UI enhancements for working with exemptions. (STO-6078)

  - You can click on a row in the **Exemptions** table to view details for the issue associated with that exemption.

    ![](static/sto-click-row-to-view-exemptions.png)

  - For best results in STO, you should [specify a baseline for every target](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines). To encourage this, the **Exemption Details** pane hides details for an issue if there is no baseline detected. To specify the baseline, select **Set in Targets**.

    ![](static/sto-exemption-details-no-baseline-selected.png)

  These enhancements are behind the Feature Flag `STO_EXEMPTION_DETAILS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. (STO-5056)

#### Fixed issue

- Occurrences page size longer resets on page update. (STO-6472)

## September 2023 

### Version 1.68.0

<!-- 2023-09-10 -->

#### Fixed issues

- Fixed the following UI issues in in **Security Tests**: 

  - Users with view access for Security Issues at the Project level, but not the Account level, could not view issue details. (STO-6421)

  - Some scanners such as Gitleaks would appear with the label **Unknown Scan Tool** rather than the correct product name. (STO-6454, STO-6337)
 
  - Added an **Exclude** field to the SonarQube step and removed the **Include** step. The **Exclude** field corresponds to the `sonar.exclusions` setting, which you can use to [narrow the focus](https://docs.sonarsource.com/sonarqube/latest/project-administration/analysis-scope/#excluding-specific-rules-from-specific-files) of a SonarQube scan. (STO-6441)

### Version 1.67.2

<!-- 2023-09-03 -->

#### New features and enhancements

- In the STO Overview, **Today's Snapshot** shows new and remediated issue counts if today's issue counts include any newly detected vulnerabilities or new remddiations. (STO-4998) 

#### Fixed issues

- Fixed an issue with setting up SSL certificates in Checkmarx, which caused Java keytools to fail. Upgrading to JDK-11 fixed the issue. (STO-6512)

- Implemented fixes to improve scan times for large jobs using Checkmarx, Snyk, and other scanners. (STO-6408, STO-5676, ZD-49328, ZD-41409, ZD-42436, ZD-49383) 

## August 2023 

### Version 1.67.1

<!-- 2023-08-27 -->

#### New features and enhancements

- The target list table in  **Test Targets** is now paginated. You can configure the list to show 10, 20, 50, or 100 targets per page. (STO-4818) 

<!--
- This release includes the following UI enhancements for working with exemptions. (STO-6078)

  - You can click on a row in the **Exemptions** table to view details for that exemption.

    ![](static/sto-click-row-to-view-exemptions.png)

  - For best results in STO, you should [specify a baseline for every target](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines). To encourage this, the **Exemption Details** pane hides details for an issue if there is no baseline detected. To specify the baseline, select **Set in Targets**.

    ![](static/sto-exemption-details-no-baseline-selected.png)

  These enhancements are behind the Feature Flag `FF_STO_EXEMPTION_DETAILS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. (STO-5056)

-->

#### Fixed issues

- Fixed a pagination issue in the Security Tests page where switching between different pages resulted in a "Failed to get issues" error. The error occurred when switching from a page of issues (such as 21-40) to another issue for which those settings were invalid. (STO-6465)

- Fixed an issue where the Security Tests page would fail with a 500 internal error if the scan detected no issues. (STO-6437, ZD-49803)

- Previously, the Black Duck Hub step ran DOCKER scans only by default. With this release, the scanner runs DETECTOR and SIGNATURE scans by default as well. (STO-6447)

  You can configure this step with supported command-line arguments. For more information, go to [Additional CLI flags](/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference#additional-cli-flags) in the [Black Duck Hub scanner reference](/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference). 

- Fixed a UI issue in the Security Tests tag where the clickable severity tiles &mdash; introduced in version 1.64.1, described [below](#august-09-2023-version-1641) &mdash; had an extra border on the right. (STO-6372)


### SonarQube runner update

<!-- August 25, 2023  -->


#### Fixed issues

This update to the SonarQube runner includes the following fixed issues:

- Fixed an issue where the SonarQube step would ignore additional path segments in the domain name. If the domain was set to `https://mysonar.com/sonar`, for example, the SonarQube step would ignore the full path and try to communicate with `https://mysonar.com`. (STO-6442)

- Fixed an issue where the SonarQube step could not override some SonarQube scan CLI parameters specified in the **Additional CLI arguments** field. (STO-6443)


### Version 1.66.1

<!-- 2023-09-20 -->


#### Fixed issues

<!-- 

- Fixed a UI issue in the Security Tests tag where the clickable severity tiles &mdash; introduced in version 1.64.1, described [below](#august-09-2023-version-1641) &mdash; had an extra border on the right. (STO-6372)

-->

- Fixed a UI issue where the module sidebar in the left-side menu would scroll when a user clicked different menus within STO. With this fix, the module sidebar maintains its position when a user clicks different menus. (STO-6219)

- Fixed an issue where users could not select multiple projects in the Security Testing Dashboard or any custom dashboards that use STO components. With this fix, you can select multiple projects from a list of checkboxes. (STO-6228)

   ![](static/sto-select-mult-projects-in-dashboards-sto-6228.png)



### Version 1.64.1

<!-- August 09, 2023 -->

##### New features and enhancements

* Aqua Trivy scans now capture and report on secrets in plain text, in addition to vulnerabilities. (STO-6345)

* The Account Settings > Subscriptions > Security Testing Orchestration UI has been updated to display scan limits more clearly. The UI now shows scan limits based on the number of subscribed security developers. (STO-6096)

* You can now click the severity tiles in the **Security Tests** tab to filter the issues list by severity. (STO-5784)
  ![Click on a tile to filter issues by severity](./static/sto-tile-filters-sto-5784.png)

* The issue lists in the the **Security Tests** tab are now paginated. You can configure each list to show 20, 50, or 100 issues per page. This makes the overall page much easier to navigate if the scan results include a lot of issues. (STO-5949, STO-6099)

#### Early access

* The **Security Tests** tab includes a set of pull-down menus so you can filter the issue lists by Target, Target Type, Step, Stage, and Scanner. (STO-5212).
  ![Click on a tile to filter issues by severity](./static/sto-pulldown-filters-sto-5212.png)

   This feature is behind the Feature Flag `STO_DROPDOWN_FILTERS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. (STO-5056)

#### Fixed issues

* Fixed a UI issue where the **Issue Details** pane rendered long HTML values as markdown. These values are now correctly rendered as HTML. (STO-6339)

### Version 1.62.2

<!-- August 02, 2023 -->

#### Fixed issues

* Fixed an issue that made it difficult to set up proxy details for a Veracode scan. Veracode scans can now handle `https_proxy`, `http_proxy`, and `no_proxy` environment variables as `-D` flags that get passed to Java. (STO-6081, ZD-45891)

## July 2023

### Version 1.61.1 

<!-- July 12, 2023 -->

#### New features and enhancements

You can now define dynamic target baselines using regular expressions. Dynamic baselines more accurately reflect the current "root" element in the context of a real-world software development life cycle. Dynamic baselines also make it easier to track the introduction and remediation of specific vulnerabilities. (STO-5670)

This feature is behind the Feature Flag `STO_BASELINE_REGEX`. For more information, go to [Set up target baselines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines). 

#### Fixed issues

* Fixed an issue that broke the capability to customize the code snippet for AIDA-augmented remediations in the Security Tests module. (STO-6181)

##### Fossa runner update

<!-- July 20, 2023 -->

* Updated a Fossa runner image to fix an issue that caused the step to fail with a 400 client error. (CDS-6120, ZD-46601)


### Version 1.60.0

<!-- July 12, 2023 -->

#### New features and enhancements

- You can now set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using self-signed certificates. This workflow supports any STO-compatible scanner that can run natively without root access. This workflow also supports build environments that use a self-signed proxy server between the Harness Delegate and the Harness Manager.

  For information on how to set up this workflow, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).

- Reference Identifiers selected for AIDA enhancement in a Security Issue are now remembered, upon generation, and shown when revisited in the UI. (STO-6032)

#### Early Access

* The [Burp integration](/docs/security-testing-orchestration/sto-techref-category/burp-scanner-reference) now supports scanner templates, which make it much easier to set up a scan step. 

  This integration is behind the Feature Flag `STO_STEP_PALETTE_BURP_ENTERPRISE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. (STO-5056)

* You can scan your code repositories using [CodeQL](/docs/security-testing-orchestration/sto-techref-category/codeql-scanner-reference), an analysis engine used by developers to automate security checks, and by security researchers to perform variant analysis. 

 This integration is behind the Feature Flag `STO_STEP_PALETTE_CODEQL`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. (STO-5366)

* You can scan container images and repositories using [Fossa](/docs/security-testing-orchestration/sto-techref-category/fossa-scanner-reference), a scanner that detects security vulnerabilities and other issues in open-source projects. (STO-5111)

 This integration is behind the Feature Flag `STO_STEP_PALETTE_FOSSA`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. 

* You can scan container images and repositories using [Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep-scanner-reference), a scanner that detects security vulnerabilities and other issues in open-source projects. (STO-5886)
 
 This integration is behind the Feature Flag `STO_STEP_PALETTE_SEMGREP`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. 


#### Fixed Issues

* Fixed an issue where some Reference Identifiers were not listed in the AIDA **Edit Inputs** form for enhancing a Security Issue's remediation steps. (STO-6102)

## June 2023

### Version 1.58.3

<!-- June 21, 2023 -->

#### Early access features

Harness AI Development Assistant (AIDA) uses state-of-the-art AI technology to streamline the process of triaging and fixing security vulnerabilities. For every vulnerability detected by STO, Harness AIDA explains the issue precisely and provides detailed advice  — including code changes and package upgrades — on how to fix it. Harness AIDA is based on large, well-trained language models. It learns continuously based on feedback and the latest public knowledge. Optionally, you can regenerate advice with additional context and thereby optimize your results. 

Harness AIDA reduces developer toil by streamlining and simplifying the process of fixing vulnerabilities. It enables developers and security personnel to manage security-issue backlogs and address critical issues promptly. Harness AIDA can dramatically reduce your TTR, speed up your software delivery lifecycle, and improve the security posture of your applications and services. (STO-5882)

For more information, go to [Remediations with AIDA](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations).

#### Fixed issues

* A defective Zap runner image was rebuilt to resolve failures in orchestrated Zap scans. (STO-6094, ZD-46330)

* In the **Request Exemption** dialog, you need to provide a reason only when the **Other** exemption reason is selected. (STO-5942)


### Version 1.57.4

<!-- June 8, 2023 -->

#### New features

* Added the existing Typescript scanning library to Sonarqube scans so that Typescript is always supported. (STO-6007)
* Added a `product_zip_max_size` setting to Checkmarx scans that enable you to override the maximum size of ZIP files uploaded to the STO pipeline (the default size is 200 MB). To override this setting in a Checkmarx scan step, add the `product_zip_max_size` setting and value (in MB) under **Settings (*optional*)**. (STO-5991)

  ![](./static/checkmarx-zip-size-override-sto-5991.png)


#### Fixed issues

* Fixed an issue where STO results were not showing up in output variables when using STO steps inside a step group in a security stage. (STO-6038, ZD-45802)

* Updated the Golang library used in STO code to remediate CVE-2022-21698. (STO-5993) 

## May 2023 

### Version 1.54.1

<!-- May 25, 2023 -->

##### New features

* This release include new scanner templates, with simplified UIs and workflows, for the following scanners. (STO-5990)

  * [AWS ECR](/docs/security-testing-orchestration/sto-techref-category/aws-ecr-scanner-reference)
  * [AWS Security Hub](/docs/security-testing-orchestration/sto-techref-category/aws-security-hub-scanner-reference)
  * [Brakeman](/docs/security-testing-orchestration/sto-techref-category/brakeman-scanner-reference)
  * [Custom Ingest](/docs/security-testing-orchestration/sto-techref-category/custom-ingest-reference)
  * [Nikto](/docs/security-testing-orchestration/sto-techref-category/nikto-scanner-reference)
  * [Nmap](/docs/security-testing-orchestration/sto-techref-category/nmap-scanner-reference)
  * [OWASP](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference)
  * [Prowler](/docs/security-testing-orchestration/sto-techref-category/prowler-scanner-reference)

* The **Account Settings** > **Subscriptions** page has a new **Activity & Usage** section that shows the number of security scans and user activity over the past 30 days. (STO-4942)

* This release includes a minor UI update. In **Security Tests** > **Details**, the **Exempt** button has been renamed to **Request Exemption** to make the button's purpose more clear. (STO-5928)

#### Fixed issues

* Fixed a UI issue where **Security Tests** would briefly display the message "No issues were found" when the window initially loaded. (STO-5927)

* Fixed an issue in non-Kubernetes builds where a scan would not produce output variables. This meant that failing a pipeline using `fail_on_severity` was not supported on non-Kubernetes builds.  Now, STO can generate output variables and fail pipelines using `fail_on_severity` on all supported build infrastructures. (STO-5483)



### Version 1.53.0

<!-- May 17, 2023 -->

#### New features

* Code snippets in Security Issue details are now displayed in the UI with syntax highlighting. (STO-5959)

  ![](./static/sto-context-highlite-code-snippets-sto-5959.png)

#### Fixed issues

* Fixed an issue that would sometimes cause long-running scans to fail with a `requests.exceptions.ReadTimeout` exception and scan results to be lost.  (STO-5907)

### Version 1.50.3

<!-- May 10, 2023 -->

#### What's new

* You can now ingest ZAP scan results from both JSON and XML reports. For information about the ZAP XML report format, go to [Traditional XML Report](https://www.zaproxy.org/docs/desktop/addons/report-generation/report-traditional-xml/) in the ZAP documentation. (STO-5868)

* The Security Tests tab now renders tables from tool-provided descriptions in the **Issue Details** panel. (STO-5857)

* The UI now uses consistent terminology when referring to exemptions. All references to *ignore* and *ignored* have been updated to *exempt* and *exempted*. (STO-5749)

* The Security Testing Dashboard includes a new **Target Type** filter. (STO-5732)

  ![](./static/sto-std-new-filter-sto-5732.png)

* The **Security Tests** tab now paginates results for scans that detect a lot of issues. You can set the pagination to 20, 50, or 100 issues per page. (STO-5211)

* STO now supports [looping strategies](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) for Security Tests stages. (STO-5726)

* You can now select a high-level reason when you [request an exemption](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/exemption-workflows) for a detected issue. The **Request Exemption for Issue** dialog box includes a new **Reason** pull-down menu with a set of common reasons for exempting an issue. (STO-5730)

   ![](./static/sto-exemption-reason-pulldown.gif)

#### Fixed issues

* Fixed a UI issue to ensure that all input fields related to STO security steps appear the Template Studio view. (STO-5746, ZD-42167)

* Fixed a UI issue where the **Default Project** and **Default Issue Type** drop-downs in the External Tickets settings page always used the account-level Jira connector, even when a different connector was selected on the project- or organization-level settings page. (STO-5756)

* Fixed an issue with Mend scans that caused builds to fail with the log message “Missing valid image". (STO-5867)

* Fixed an issue with Mend scans where the `product_domain` step setting did not get passed to the CLI, causing the scan to point to the default US server. (STO-5708)

* Added a **Privileged** checkbox to the UI for Security steps and scanner templates. This fixes an issue where `privileged` would automatically reset to `true` whenever a user updated the step, which required setting this option back to `false` in the YAML editor.  (STO-5773)

* Implemented fixes to improve UI speed and performance in the Security Testing Dashboard. (STO-5612)

### Plugin update version 1.11.1

<!-- May 3, 2023 -->

#### Fixed issues

This update includes the following fixed issues:

* This release updates the Twistlock normalization algorithm. Issues with Moderate severity in Twistlock are now assigned Medium (not High) severity in STO. (STO-5861)

* Fixed a Snyk ingestion issue that caused the scan to scan step to fail if the target name included a space. (STO-5855)

## April 2023


#### Plugin update version 1.10.1

<!-- April 20, 2023 -->

This update includes the following fixed issues: 

* Fixed an issue that caused orchestrated Snyk scans to fail when passing in  `--all-projects` via **Additional CLI flags** or as `tool_args`. This update now reflects the new supported Snyk workflow for specifying target variants: instead of using using `--project-name` to specify variants (old behavior), STO now uses the new `-—target-reference` flag (new behavior). (STO-5821, ZD-42967)
  
  For more information about the use of these flags, see the following topics in the Snyk documentation:

  - [Group projects for monitoring](https://docs.snyk.io/snyk-cli/test-for-vulnerabilities/grouping-projects-by-branch-or-version)
  - [Does the Snyk CLI support monorepos or multiple manifest files?](https://support.snyk.io/hc/en-us/articles/360000910577-Does-the-Snyk-CLI-support-monorepos-or-multiple-manifest-files-)

* Fixed an issue where Snyk scans were processing container vulnerabilities only and ignored application vulnerabilities. STO now processes both container and application scan data from Snyk by default. (STO-5828)

* Fixed an issue that prevented orchestrated Mend scans from running if the [Use version in project names](https://docs.mend.io/en-US/bundle/sca_user_guide/page/using_version_in_product_or_project_names.html) setting was turned off. (STO-5774)

### Version 1.43.1

<!-- April 6, 2023 -->

#### Fixed issues

* Fixed a UI issue in **External Tickets Settings** for setting up Jira integrations:  **Default Project** and **Default Issue Type** always used the account-level Jira connector, even when a different connector was selected for the current project or organization. (STO-5756)
* Fixed a search issue in **Security Tests**: If a search term included certain special characters, the UI would fail with a JavaScript exception. (STO-5745) 
* The new Sonarqube step in the scanner template didn't pass `project_key` field required for data extraction mode. STO Manager v1.0.79100 now has the logic process this parameter correctly. (STO-5712)
* 

## March 2023

### Version 1.40.2

<!-- March 30, 2023 -->

#### What's new

* The Snyk integration has been updated. Orchestrated Snyk scans now upload results to the external Snyk portal by default. (STO-5607)

#### Early access 

* This release includes the following enhancements to the [Jira integration](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/jira-integrations):
   * After you create a new ticket, **Issue Details** replaces the **Create Ticket** button with a link to the new ticket and the ticket status. (STO-5518)

     Before:

     ![](./static/sto-jira-ticket-create-BEFORE.png)

     After:

     ![](./static/sto-jira-ticket-create-AFTER.png)

   **External Tickets** now automatically populates the **Default Project Name** and **Default Project Type** menus based on the selected ticket-provider connector. (STO-5492)

#### Fixed issues

* Fixed an issue with SonarQube scans: if a repository had a .gitignore with a specific pattern, all files were ignored during the scan. (STO-5711)
* Fixed an issue with Snyk scans to ensure that **Issue Details** shows all remediation information from the scan results under Remediation. (STO-5663)
* Fixed an issue where, if a scan detected no issues and a later scan detected one or more issues, **Issue Details** would include remediation information from the later scan. (STO-5463)
*  Fixed a UI issue where the **Security Tests** tab was incorrectly showing issue counts and the Ignored status for some issues. This was due to a DB query that caused exemptions scoped to an issue in one project to be applied to the same issue in all projects in the account. (STO-5718)

### Version 1.38.3 

<!-- March 23, 2023 -->

#### Fixed Issues

* Fixed an issue that caused OWASP scans of Go apps to fail with the message `[ERROR] Unexpected exception occurred initializing Golang Mod Analyzer`. (STO-5602)
* Fixed a UI issue in **Issue Details** that caused some redundant fields such as `CWE` to appear. (CI-5365)

### Version 1.37.1 

<!-- March 20, 2023 -->

#### Fixed issues

* The search pull-down widget has been removed from the Security Tests &gt; Overview page. To search for and drill down into specific issues, go to the Security Testing Dashboard. (STO-5592)
* Fixed an issue in **Security Tests** &gt; **Overview** where the **Issue distribution over time** graph was empty for some projects. (STO-5318)

### Scanner Template GA release

<!-- March 14, 2023 -->

This release includes a set of new scanner-specific steps (step palettes) for Aqua Trivy, Bandit, SonarQube, and other popular scanners. These steps greatly simplify the process of setting up scans in your pipelines. Previously, the workflow for all scanners was to enter a set of hard-coded key and value strings in a Security step. These new steps have simplified user-friendly UIs that include only the options relevant to the specific scanner, mode, and target.

The following security steps are now generally available:

* [Aqua Trivy](/docs/security-testing-orchestration/sto-techref-category/aqua-trivy-scanner-reference) (STO-5393)
* [Bandit](/docs/security-testing-orchestration/sto-techref-category/bandit-scanner-reference) (STO-5050)
* [Black Duck Hub](/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference) (STO-5052)
* [Checkmarx](/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference) (STO-5073)
* [Grype](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference) (STO-5394)
* [Mend (formerly Whitesource)](/docs/security-testing-orchestration/sto-techref-category/mend-scanner-reference) (STO-5392)
* [Prisma Cloud (formerly Twistlock)](/docs/security-testing-orchestration/sto-techref-category/prisma-cloud-scanner-reference) (STO-5055)
* [Snyk](/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-scanner-reference) (STO-5053)
* [SonarQube](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference) (STO-5051)
* [Zed Attack Proxy (ZAP)](/docs/security-testing-orchestration/sto-techref-category/zap-scanner-reference) (STO-5058)


### Version 1.34.0 

<!-- March 9, 2023 -->


#### Early access 

* The new [Jira integration](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/jira-integrations) has been enhanced. If an issue has an associated Jira ticket, **Issue Details** now shows the ticket status along with the number. (STO-5491)

#### Fixed issues

* Fixed an issue in the Jira integration to ensure that **Create Ticket** now appears in **Issue Details**, even if an issue has an Exemption associated with it. (STO-5526)
* Fixed an issue in the Jira integration that allowed users to try to create tickets against targets with no baseline specified, which is not supported and resulted in a 404 response. (STO-5477)
* Fixed an issue in the Back Duck configuration UI where the in-tool help said that the Image Region setting was required when scanning AWS ECR container images. This field is optional. (STO-5450)

### Version v1.32.1

<!-- March 2, 2023 -->

#### What's new

- The Twistlock integration has been upgraded to use version 22.12.582. (STO-5575)
- The Brakeman, Nikto, and Nmap scanner integrations now enable you to customize scans by passing CLI arguments to the scanner via the `tool_args` setting. (STO-5465)
- The Bandit scanner integration now enables you to customize scans by passing CLI arguments to the scanner via the `tool_args` setting. (STO-5415)
- The Mend integration now supports SCA scans. (STO-5242)
- Bandit scan results have been enhanced. When you open the Details pane for a detected issue, the Raw Details JSON now includes links to further information under `_rawIssueCwe : link` and `_rawMoreInfo`. (STO-5422)
- The Security Testing Dashboard includes a new set of filters for drilling down into specific issues by project, creation date, scanner, target, pipeline, severity, and so on. You can drill down to a set of relevant issues and then click on a pie slice, chart element, or other UI element to view details on the relevant issues. (STO-5329)
  
  Note the following:

  - The Security Testing Dashboard requires an Enterprise account.
  - You must click **Refresh** (top right) to apply the filter after you configure it.
  - To view details for an issue from the search results, click the pipeline name or ID and choose **View in Harness Platform**. 

    ![](./static/sto-dashboard-view-issue-in-harness-platform.png)

  - The **Created Date** menu has several non-working options: `is null`, `is not null`, and `matches a user attribute`. This is a known issue that Harness is working to address.

![Security Testing Dashboard -- filters and Refresh button](static/sto-dashboard-with-new-filters.png)


#### Early access

- Improved UI for configuring scan steps (STO-4867)
  
  This release includes a set of Security steps with an improved UI for configuring scans. Each step shows only the settings that apply to the specific scan. 

  Note the following:

  - This release includes new steps for the following scanners: Aqua Trivy, Bandit, Black Duck, Checkmarx, Grype, Mend, Prisma Cloud, Snyk, SonarQube, and ZAP.  
  - Docker-in-Docker is no longer required for these steps *unless* you're scanning a container image. If you're scanning a repository or running instance, you don't need to set up a Background step running DinD.    
  - These steps are currently available in Security stages only. 
  - Support is currently limited to Kubernetes and Harness Cloud AMD64 build infrastructures only.
  - For descriptions of all available UI settings, go to [Security step UI settings reference](/docs/security-testing-orchestration/sto-techref-category/security-step-ui-settings-reference).


<details>
<summary>Security step configuration UI </summary>

![STO step palette](static/sto-step-palette.png)

</details>


- This release includes a Jira integration that enables you to create Jira tickets for issues detected during an STO build. For more information, go to [Create Jira tickets for detected issues](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/jira-integrations). (STO-5467)

#### Fixed issues

- The ShiftLeft integration now uses the latest CLI, which fixes an issue where orchestrated ShiftLeft scans would fail with an error. (STO-4994)

## February 2023

### Version 1.31.4

<!-- February 24, 2023 -->

#### Fixed issue

* Fixed a race condition allowing for duplicate targets to get created. (STO-5481)

### February 16

#### Fixed issue 

* Fixed an issue with Prisma Cloud (formerly Twistlock) scans where the step would fail when a twistcli policy encountered a Compliance or Vulnerabilities threshold check that failed. (STO-5559)

### February 5

##### What's new

* **Issue Details** now shows the message “No recommendations are available at this time” when the scan tool doesn't return remediation steps for a specific issue. (STO-5380)

#### Fixed issues

This release does not include fixed issues.

## January 2023

### Version 1.25.0

#### What's new

* You can now ingest results from a specific Checkmarx scan. This option is useful for ensuring that a pipeline ingests the scan triggered by a specific event. Add the setting `product_scan_id` = `MY_SCAN_ID` to the Checkmarx step. This overrides the default behavior, which is to ingest results for the most recent scan. (STO-5424)  

* You can now enable debug-level logging for Snyk and Aqua Trivy scans. To do this, add this setting to the scan step: `log_level` = `debug`. (STO-5405)

* Grype scans now support a `tool_args` field. You can use this field to run the plugin with specific command-line arguments. To scan all layers in an image, for example, add this setting to the Grype scan step: `tool_args` = `--scope all-layers`. (STO-5400)

* To make **Issue Details** easier to navigate, Raw Details JSON data is now collapsed by default. (STO-5398) 


#### Fixed issues

* Fixed an issue that caused a scheduled AWS ECR scan to time out or to terminate with a status of Invalid. (STO-5449)  

### Version 1.24.1

<!-- 2023-01-15 -->

#### What's new

* Aqua Trivy scans now support a `tool_args` field. You can use this field to run the plugin with specific command-line arguments. To run an offline scan, for example, specify `tool_args` = `---offline-scan`. (STO-5388) 

#### Fixed issues

* Fixed an issue where, in some situations, the severity and severity code of a detected issue were not updated when new occurrences of the same issue were detected. (STO-4809)  

### Version 1.22.0

##### What's new

* Checkmarx scans now support a `tool_args` field. You can use this field to run the Checkmarx plugin with specific command-line arguments. To run an incremental scan, for example, specify `tool_args` = `-incremental`. (STO-5041) 

* STO now supports orchestrated scans using [Grype](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference). (STO-5161)  


### Version 1.21

<!-- 2023-01-01 -->

##### New features

* The Issues Details pane has been revised to make it easier to navigate. Raw JSON data now appears at the bottom of each occurrence and is collapsed by default. (STO-4839)  

#### Fixed issues

This release does not include fixed issues.

## Previous releases

<details>
<summary>2022 releases</summary>

#### December 18, 2022      

##### New features

* Remediated issues are no longer included in the issue counts logged near the end of a Security Step run and provided as output variables. (STO-5304)  

*  With this release, you can run a SonarQube scan and specify a collection of SSL certificates rather than a single certificate. This option is useful when you don't know which specific certificate in a collection is required by the server. (STO-5243)  

#### Fixed issues

* Fixed an issue where `product_lookup_type` being set to `byTokens` causes the step to perform a Dataload instead of OrchestratedScan. (STO-5166)  


#### December 11, 2022    

##### New features
  
* STO is now supported on Linux (amd64 and arm64 platforms) in [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure). (STO-5314)  

* Instead of using Service Dependencies for Docker-in-Docker configuration, users should use new Background steps. (STO-5268)

#### Fixed issues

This release does not include fixed issues.


#### December 4, 2022     

##### New features

This release does not include new features.

#### Fixed issues

* Fixed an issue that resulted in intermittent failures with OWASP orchestrated scans. (STO-5289) 


#### November 28, 2022      
  

##### New features

This release does not include new features. 

#### Fixed issues

* Fixed an issue where the Security Tests tab on the Pipeline Execution page was periodically reloading in a visually jarring way and losing scroll position. (STO-5208)

* Fixed an issue where the Security Tests tab would show previously-found issues as "remediated" while the scan was in progress.  (STO-4985)  

* Improved the Security Tests UI to highlight new issues found in the current target only vs. issues also found in the baseline, or in the previous scan if no baseline was specified. (STO-5198) 


#### November 6, 2022 

##### New features

* You can now include Run steps in Security Test stages. You can also include Security Tests stages in STO pipelines without a CI license. (STO-5208)

* You can now configure a pipeline to ingest Snyk data from multiple files and paths. For an example of how to set this up, go to [Ingest Scan Results from Snyk](/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-scans). (STO-4958) 

#### Fixed issues

* Fixed an issue where the issue counts reported in output variables vs. the Security Tests page were inconsistent for scans of target baselines, or for targets with no specified baseline. (STO-5042) 


#### October 31, 2022

##### What's New

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

#### August 2, 2022

##### What's New

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

##### Enhancements

N/A

#### Fixed issues

N/A
</details>
