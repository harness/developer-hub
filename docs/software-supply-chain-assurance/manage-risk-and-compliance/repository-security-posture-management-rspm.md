---
title: Repository security posture management
description: Security, risk and compliance posture of your code repositories.
sidebar_position: 1
redirect_from:
  - /docs/software-supply-chain-assurance/code-repositories-view
---

# Repository Security Posture Management - RSPM with Harness SCS

Understanding the security and risk posture of your code repositories is crucial for maintaining a secure development environment and preventing supply chain attacks. This section provides a comprehensive overview of the security and risk posture by presenting detailed insights into various aspects of your repositories. It highlights all the issues related to risk and compliance derived from the code repository configurations generated by applying industry-standard software supply chain benchmarks such as _[CIS](https://www.cisecurity.org/benchmark/software-supply-chain-security), [OWASP Top 10 CI/CD Security Risks](https://owasp.org/www-project-top-10-ci-cd-security-risks/)_ etc. 

Additionally, it reveals details of security vulnerabilities through security scanning. Also, it provides an in-depth look into the composition of the repository by generating the Software Bill of Materials (SBOM) and its quality score. This helps users understand their repositories' security posture and manage them effectively to avoid potential supply chain attacks originating from code repositories and their organizational settings.


<DocImage path={require('./static/rspm-overview.png')} width="100%" height="100%" title="Click to view full size image" />


The RSPM feature in SCS offers details into:



* **Risk and Compliance Issues**: Provides visibility into all the issues related to risk and compliance derived from code repository configurations and organization settings based on compliance standards.
* **Security Vulnerabilities Detection**: Details of security vulnerabilities identified through SAST, SCA, and Secret scanning.
* **Software Bill of Materials (SBOM)**: Provides an in-depth look into the composition of the repository by providing a detailed list of dependencies. Additionally, it also offers the quality of the SBOM in various categories, utilizing a scoring system ranging from 0 to 10.


<DocImage path={require('./static/rspm-screen.png')} width="100%" height="100%" title="Click to view full size image" />

You can click on a repository in the “Code Repositories” section, and it will present all the details specific to each aspect of the repository.

:::info
To onboard your code repositories, refer to the [Get Started](/docs/software-supply-chain-assurance/get-started/) guide.
:::


## Supported code repositories

The RSPM feature in the Harness SCS module is currently supported only for **GitHub**. Harness plans to add support for other code repositories in the near future.

:::tip

To efficiently onboard a large number of GitHub repositories, set up a single GitHub connector at the account level using [Harness APIs](https://apidocs.harness.io/tag/integration), which enables you to select and onboard repositories for specific projects and automatically create scan pipelines.

:::
## Overview Tab

The overview page provides a comprehensive summary of a specific code repository's security and risk posture. This page compiles all the crucial details in one place, offering a clear and concise view.

:::note

Scans will not run if **Git Experience** is enforced and the **Default Store Type for Entities** is set to remote in the account settings. Make sure these settings are configured correctly to enable scan execution.

:::

### What is an Evaluation?

Before diving into the details, it's essential to understand what an "evaluation" means in this context. An evaluation refers to applying specific compliance rules to the repository and obtaining the results of these checks. Each evaluation assesses the repository against these predefined rules and provides a pass or fail status.


The page offers detailed information about:

* **General Information:** including the name, branch and the latest evaluation timestamp
* **Evaluation Breakdown:** A summary of rules passing versus failing
* **SBOM:** Presents the sum of all the dependencies with an SBOM quality score and an option to download the SBOM.
* **Risk & Compliance Issues and Vulnerabilities:** Breakdown of risk and compliance issues and vulnerabilities into critical, high, medium and low.
* **Evaluation Trend:** This graph presents the trend of evaluations over time, showing the number of rules passing and failing with respect to the date. This helps users visualize the improvement or decline in the security posture of their repositories.

<DocImage path={require('./static/rspm-overview-tab.png')} width="100%" height="100%" title="Click to view full size image" />

## Risk and Compliance Tab

In this tab, you will find a list of rules applied to the repository, each accompanied by its name and the compliance standard to which it belongs. The latest status indicates whether the rule has passed or failed in the most recent evaluation, along with the date and time of the last evaluation. The evaluation history column shows the rule's status (passed or failed) over the last 7 evaluations, providing a clear view of its compliance trend.

Filters can help you narrow down the rules based on severity, including low, medium, high, and critical levels. You can filter the rules by their evaluation status, such as passed, failed, or all. 

<DocImage path={require('./static/rspm-repo.png')} width="100%" height="100%" title="Click to view full size image" />



By clicking on a specific evaluation status, you can access detailed information about the rule, including the reason for its failure and general remediation steps to help address the issues identified.

<DocImage path={require('./static/rspm-sideview.png')} width="100%" height="100%" title="Click to view full size image" />



## SBOM(Software Bill of Materials) Tab

The SBOM section presents a comprehensive list of all the repository dependencies. Detailed information is provided for each dependency, including the name, version, license, package manager, PURL (Package URL), and supplier.

Filters are available to refine the list of dependencies, allowing users to find specific dependencies based on version, license, and package manager. Additionally, a search function enables users to locate dependencies based on the supplier. These filtering options make it easier to navigate through the dependencies and focus on particular aspects that may require attention.

<DocImage path={require('./static/rspm-sbom-view.png')} width="100%" height="100%" title="Click to view full size image" />



## Vulnerabilities Tab

The Vulnerabilities tab presents the scan results performed on the repository, consolidating findings from various scanning tools. This view categorizes all identified vulnerabilities by severity and allows filtering based on scanners and other details. Users can access and manage vulnerability details to ensure the security of their repositories.

:::info
The code repository is cloned in the Harness cloud for executing these scans, facilitated by the STO (Security Testing Orchestration) module
:::

<DocImage path={require('./static/rspm-vulnerabilities-view.png')} width="100%" height="100%" title="Click to view full size image" />

The types of scans conducted include:
1. Static Application Security Testing (SAST) using [Semgrep](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference/) 
2. Secret Scanning with [Gitleaks](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference/)
3. Software Composition Analysis (SCA) with [OSV](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference/).

Refer to [view security test results](/docs/security-testing-orchestration/view-security-test-results/view-scan-results) in Harness STO documentation for more detailed information about the view and navigation.

For a complete overview of your supply chain's compliance posture, refer [Compliance Summary](/docs/software-supply-chain-assurance/manage-risk-and-compliance/manage-compliance-posture) documentation.
