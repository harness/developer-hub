---
title: Supply Chain Security release notes
sidebar_label: Supply Chain Security
date: 2023-09-18T10:00
sidebar_position: 15
---

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/software-supply-chain-assurance/rss.xml" />

These release notes describe recent changes to Harness Supply Chain Security.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## November 2024

### Version: 1.19.1
<!-- 2024-11-13 -->

#### New features and enhancements
- Launched a dedicated **SLSA Generation** step under the Supply Chain Security section in the step palette; removed the **SLSA Provenance** section from the stage Overview. You can now perform SLSA provenance generation and attestation using the new SLSA Generation step.
- [Chain of Custody](/docs/software-supply-chain-assurance/artifact-view#artifact-overview) in the Artifact section now logs events from the Security Testing Orchestration (STO) module.
- [Rule Definitions](/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions) section now has an expandable view, showing rule descriptions upon expansion; replaced the **Type** column with **Applicable On** to display the entity types to which rules apply, such as Code Repository or CI/CD, along with platform/Integration logo. For example, GitHub, GitHub Actions.

##### Enhancements in CI/CD section
- Added sorting option for pipelines based on **Risk and Compliance Issues** column.
- New filter for pipelines by **CI/CD Types**, allowing you to list GitHub workflows or Harness pipelines.

##### Enhancements in Compliance section
- Renamed **Rules** tab to **Evaluations**.
- Added **Applicable On** column in the **Evaluations** tab to display the entity types to which rules apply, such as Code Repository or CI/CD.
- Added a link to entity source in the [impacted entity details](/docs/software-supply-chain-assurance/manage-risk-and-compliance/manage-compliance-posture#view-impacted-entities) within the **Evaluations** tab. By clicking on an impacted entity, you can use the “Go to workflow/repository” link to navigate directly to the associated pipeline or repository.


## October 2024

### Version: 1.18.0
<!-- 2024-10-15 -->

#### New features and enhancements
- Added rule `2.3.9` from [OWASP CICD-SEC-6](/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions#cicd-sec-6-insufficient-credential-hygiene) for evaluation against Harness pipelines. For more information, refer to the [Standards and Rule Definitions](/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions) documentation.
- In the Evaluation details, links to the relevant GitHub workflows or Harness pipelines have been included.
- Introduced UI enhancements in the Compliance section.

## July 2024

### Version: 1.14.3

<!-- 2024-07-23 -->

#### **Announcements**

**SCS is now Generally Available (GA)**. We have moved from Limited GA (since January 2024) to GA. Read more on our [announcement blog](https://www.harness.io/blog/harness-ssca-now-features-repo-security-posture-management-rspm).

#### **New features**

* **Repository Security Posture Management**:
    * Connect your GitHub with Harness SCS to identify insecure configurations in code repositories and organization settings for comprehensive risk, compliance, and security posture management. Use the [Harness SCS GitHub app](https://github.com/apps/harness-ssca) for integration. Learn more in our [RSPM](https://developer.harness.io/docs/software-supply-chain-assurance/repository-security-posture-management-rspm) documentation.
* **Manage Risk and Compliance**
    * **Compliance Section**: A new Compliance section to assess and understand the risk posture of your entire supply chain. Detailed information is available in the [Manage Compliance Posture](https://developer.harness.io/docs/software-supply-chain-assurance/manage-risk-and-compliance/manage-compliance-posture) documentation.
    * **Rule Definitions Section**: Access a complete list of all standards and associated rules supported by Harness SCS, including:
        * [CIS Benchmarks for GitHub](https://developer.harness.io/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions#cis-benchmarks)
        * [OWASP Top 10 CI/CD Risks for GitHub](https://developer.harness.io/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions#owasp-top-10-cicd-security-risks)
    
        More details can be found in the [Standards and Rule Definitions](https://developer.harness.io/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions) documentation.
* **Integrations and Permissions**
    * A new interface to manage your integrations with Harness SCS. Learn more about this in the [Integrations and Permissions](https://developer.harness.io/docs/software-supply-chain-assurance/integrations-and-permissions) document.


#### **Enhancements**

[Artifact view](https://developer.harness.io/docs/software-supply-chain-assurance/artifact-view) will now support the following views

* [Chain of Custody](https://developer.harness.io/docs/software-supply-chain-assurance/artifact-view/#artifact-overview): Log the artifact's journey throughout the software supply chain.
* [Artifact Listing](https://developer.harness.io/docs/software-supply-chain-assurance/artifact-view/#digests-for-your-artifact): View all container images, including their digests and tags.
* [Security Insights](https://developer.harness.io/docs/software-supply-chain-assurance/artifact-view/#vulnerabilities-tab): Access detailed information on security vulnerabilities.
* [SLSA Provenance](https://developer.harness.io/docs/software-supply-chain-assurance/artifact-view/#artifact-overview): View the provenance and verification status of artifacts following the SLSA framework.

## July 2024

### Version 1.12.0

#### New features and enhancements

- The "Repositories" tab previously located in the [Artifact View](/docs/software-supply-chain-assurance/artifact-view) has been relocated and expanded into a separate section titled "[Code Repositories](https://developer.harness.io/docs/software-supply-chain-assurance/code-repositories-view)". All repository data will now be accessible from the [Code Repositories](https://developer.harness.io/docs/software-supply-chain-assurance/code-repositories-view) section, providing a more streamlined interface for managing repository  information.

## September 2023

The [Supply Chain Security module documentation](/docs/software-supply-chain-assurance) is live on the Harness Developer Hub. Check back soon for module release notes.
