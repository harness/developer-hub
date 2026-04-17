---
title: OSS Risks Remediation
description: Remediate security risks in your open source components effectively.
sidebar_position: 23

tags:
  - harness-scs
  - manual-pr-remediation
  - auto-pr-remediation 
  - risk-and-compliance
  - top-10-oss-risks
---

SCS enables you to generate SBOM via code repositories through Repository Security Posture Management (RSPM) and SBOM Orchestration in a pipeline. From the SBOM, you can remediate vulnerabilities in direct dependencies declared in your project configuration. Dependencies exposed to one or more OSS risks may contain known vulnerabilities detected through the internal database or STO scans. Remediation lets you upgrade these dependencies to the recommended or updated versions, reducing risk and improving overall application security and stability.

Remediate risks and vulnerabilities for a direct dependency by using one of the following methods:

* [Manual Pull Request](/docs/software-supply-chain-assurance/open-source-management/oss-risks-remediation#raising-a-manual-pull-request) - Select an updated version of the dependency and manually raise a pull request to apply the update.
* [Auto Pull Request](/docs/software-supply-chain-assurance/open-source-management/oss-risks-remediation#auto-pull-request-remediation) - Configure Auto PR remediation to automatically generate pull requests that update multiple dependencies across your onboarded repositories.

:::note

* This remediation is available only for direct dependencies with OSS Risks and excludes [End of Life Components](/docs/software-supply-chain-assurance/manage-risk-and-compliance/opensource-security-risk-management#end-of-life-components).

* Vulnerability remediation through pull requests is supported only for repositories and not for artifacts.

:::

***

## What will you learn in this topic?

By the end of this topic, you will be able to understand:

* An overview of remediating OSS risks in direct dependencies using the SBOM.

* The detailed steps to raise a manual pull request.

* The detailed steps for Auto PR configuration.

***

## Before you begin

Make a note of the following before you proceed with the remediation:

* Make sure that your SCM provider is integrated with the platform to generate SBOMs for your code repositories. You can do this in one of the following ways:
    * Repository onboarding through RSPM currently supports GitHub. To integrate your GitHub account and onboard the repositories, refer to the [Get Started](/docs/software-supply-chain-assurance/get-started) guide.
    * SBOMs can be generated through pipeline execution. Supported SCM providers include GitHub and Harness Code Repository (HCR). To generate SBOM via pipeline execution, refer to the [Generate SBOM for Repositories](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-repositories) documentation.

***

## Create/Select the GitHub connector for pull requests

Harness connectors allow you to link your Harness account to your GitHub account. SCS lets you create your own connector or select an already existing one. Make sure you complete this step before remediating OSS risks using manual or automated pull requests. To learn more about connectors, refer to the [Connect to a Git Repository documentation](/docs/platform/connectors/code-repositories/connect-to-code-repo/).

To create or select a GitHub connector for pull requests:

1. Navigate to the **Configurations** page under the **Manage** section from the sidebar navigation of your SCS account. The **General** tab opens by default.
2. Click `Select Connector` beside the `Github Connector for Pull Request` to open the `Create or Select an Existing Connector` dialog.
3. Select your required connector from the list of existing connectors. You can search for your created connector or filter connectors by **Project**, **Organization**, and **Account**.
4. Alternatively, click `+ New Connector` to create a new connector for raising pull requests in your onboarded repositories. For more information, see [GitHub connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference/).
5. Click `Apply Selected`. Once selected, you can view the **Configuration Saved Successfully** toaster message at the top, indicating that the connector has been selected or created successfully.

<DocImage path={require('./static/autopr-connector.png')} width="80%" height="80%" title="Click to view full size image" />

:::note

To automatically create pull requests using Auto PR remediation, the GitHub personal access token (PAT) must have sufficient repository permissions, including write access to the repository (such as the repo scope for classic tokens or equivalent permissions for fine-grained tokens). For more information, see [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

:::

Once a connector is selected/created, you can proceed with OSS risks remediation through:
* [Manual Pull Request](/docs/software-supply-chain-assurance/open-source-management/oss-risks-remediation#raising-a-manual-pull-request)
* [Auto Pull Request](/docs/software-supply-chain-assurance/open-source-management/oss-risks-remediation#auto-pull-request-remediation)

***

## Raising a Manual Pull Request

To remediate a direct dependency exposed to any OSS risks, complete the following steps:

1. [Select the recommended/updated dependency version](/docs/software-supply-chain-assurance/open-source-management/oss-risks-remediation#step-1---select-the-recommendedupdated-version-of-the-dependency)
2. [Raise a manual Pull Request to update the dependency version](/docs/software-supply-chain-assurance/open-source-management/oss-risks-remediation#step-2---raise-a-pull-request-manually)

### Step 1 - Select the recommended/updated version of the dependency

Updating a dependency to a recommended or an updated version helps address known risks and vulnerabilities, improving your application’s security and reducing potential exposure. When you select a recommended or updated version from the dependency side panel, the change is applied directly through a Pull Request, making it easier to keep your dependencies secure.

To select the recommended version of the dependency:

1. Navigate to the **Code Repositories** page under the **Supply Chain** section from the sidebar navigation of your SCS account and select your repository. The `Overview` tab opens by default.
2. Click the `SBOM` tab to view the list of dependencies.
3. Click `Dependency Type`, then select the checkbox next to `Direct` to filter the list to show direct dependencies related to your project.

<DocImage path={require('./static/sbom_dependency_tab.png')} width="80%" height="80%" title="Click to view full size image" />

4. Click on any dependency exposed to OSS risks from the dependency list to open the dependency side panel.

5. The **Overview tab** of the dependency side panel opens by default. It has the following sections:
  * **Details** - Review the dependency’s current and latest available versions, license, package manager, and associated PURL.

    <DocImage path={require('./static/dependency_overview.png')} width="80%" height="80%" title="Click to view full size image" />

  * **Vulnerabilities** - Displays the number of vulnerabilities by severity (Critical, High, Medium, and Low) and their source.

    <DocImage path={require('./static/vulnerabilities_dependency_overview.png')} width="80%" height="80%" title="Click to view full size image" />

    * Click View to see detailed vulnerability information in a table under the **Vulnerabilities tab** of the side panel. Each entry includes severity with a vulnerability severity score, upgrade version, and reference identifiers (CVE, GHSA, CWE, and many more).

    :::note

    Vulnerabilities are derived either from the internal database or from the STO scan. If the STO license is not enabled, dependency vulnerabilities are mapped from the Harness internal database. If you have an STO license and want to map the vulnerabilities from the Harness internal database, contact [Harness Support](mailto:support@harness.io) to enable this feature.
    :::

      <DocImage path={require('./static/vulnerability-tab-detail.png')} width="80%" height="80%" title="Click to view full size image" />

  * **Remediation** - Provides information related to the remediation of the dependency version.

6. Click on the **Remediation** expandable section if it is not expanded by default. You will see a warning about the current dependency version followed by an AI-generated summary highlighting the improvements that the recommended updated version will bring.

:::note

The Target Version will be selected by default if there is enough information available about the dependency.
:::

7. Under Select a Version, the recommended Target Version is selected by default. Alternatively, if no Target Version is recommended, click the dropdown to select a dependency version as the Target Version of your choice.

:::note

A target version is recommended based on comparison within the same version line, where it has the lowest known risk.
:::

<DocImage path={require('./static/remediation-dependency-overview.png')} width="80%" height="80%" title="Click to view full size image" />

:::info

Selecting a target version automatically displays a visualization of existing vulnerabilities by severity for the selected version, or a `No vulnerabilities detected in this version` message if none are found.

<DocImage path={require('./static/vulnerability_severity_remediation.png')} width="80%" height="80%" title="Click to view full size image" />
:::

8. Click on the expandable **Top Dependencies Impacted** to open a list of the affected transitive dependencies because of the upgrade. These are direct dependencies of the primary dependency and the list shows which of them are modified and whether any new dependencies are added.

<DocImage path={require('./static/downstream-dependencies-affected.png')} width="80%" height="80%" title="Click to view full size image" />

### Step 2 - Raise a Pull Request Manually

Selecting a target version shows you the preview changes in the auto-detected manifest file for the dependency version change. To make that change in your repository, you need to raise a pull request.

<DocImage path={require('./static/pr_preview_remediation.png')} width="80%" height="80%" title="Click to view full size image" />

To raise a Pull Request manually:

1. Click on the `Create Pull Request` button to create a pull request on the default branch of the repository.

2. Merge the Pull Request to apply the dependency update, which remediates the vulnerabilities and risks associated with the dependency.

Below is a pull request summary created through manual PR remediartion, highlighting the recommended upgrade, security impact, and affected dependencies.

<DocImage path={require('./static/manualpr-overview.png')} width="80%" height="80%" title="Click to view full size image" />

***

## Auto Pull Request Remediation

Setting up Auto PR configuration lets you control when automated pull requests are created to update open-source dependencies across all onboarded repositories.

To set up the Auto PR configuration:

1. Navigate to the **Configurations** page under the **Manage** section from the sidebar navigation of your SCS account. The **General** tab opens by default.
2. Click on the `Auto Remediation` tab and enable the **Auto PR Configuration toggle** that lets you set the presets. A preset is a set of settings you can use to control automatic pull requests. There are two presets:
  * **Strict** - A preset that prioritizes security and stability and lets you create pull requests for critical and high security fixes with minimal risk. This is enabled by default.
  * **Custom** - A preset that controls how and when the pull requests are created.

  :::note

  * Any change in the settings automatically changes the selected preset to custom.
  * You can switch back to the Strict preset at any time.
  :::

3. Select the radio button beside Custom to choose the Custom preset. Configure the following settings:
  * **Security Conditions**
    * Enable the toggle beside `Create PR only if no new vulnerabilities are introduced` to raise a pull request only if there are no new vulnerabilities found within the scanned dependencies. This is enabled by default with the Strict preset.
    * Enable the toggle beside `Create PR only if critical and high vulnerabilities are resolved` to raise a pull request only if the critical and high vulnerabilities are resolved from the scanned dependencies. This is enabled by default with the Strict preset.
  * **Dependency Safety**
    * Enable the toggle beside `Do not create PRs if transitive dependencies impact other components` to prevent the raising of pull requests if the dependency updates impact transitive dependencies, which in turn impact other dependencies. This is enabled by default with the Strict preset.
  * **Versioning Rules**
    * The following are the types of version updates to allow under versioning rules:
      * **Patch Updates** — Select the checkbox beside `Patch Updates` to allow patch updates. This is enabled by default with the Strict preset.
      * **Minor Updates** — Select the checkbox beside `Minor Updates` to allow patch updates. This is enabled by default with the Strict preset.
      * **Major Updates** — Select the checkbox beside `Major Updates` to allow patch updates.
    * Enable the toggle beside `Allow pre-release versions` to allow pre-release versions.
  * **Compliance and Maintenance**
    * Enable the toggle beside `Do not create PRs if license changes` to prevent the creation of pull requests in the event of a change in the license during any dependency update. This is enabled by default with the Strict preset.
    * Enable the toggle beside `Avoid unmaintained components` to avoid updating and remediating dependencies with [unmaintained components](/docs/software-supply-chain-assurance/manage-risk-and-compliance/opensource-security-risk-management/#unmaintained-components-oss-risk---4) identified as OSS risk.
    * Enable the toggle beside `Avoid End-of-Life components` to avoid updating and remediating dependencies with [End of Life](/docs/software-supply-chain-assurance/manage-risk-and-compliance/opensource-security-risk-management/#end-of-life-components) OSS risk.
  * **Advanced Controls**
    * Specify the dependencies to exclude from a raised pull request by entering comma-separated strings. For example, _Log4j or Log4j@2.3.1, flask@0.5.1_.
    * Specify the maximum number of pull requests that you can raise for a repository in a week. By default, the number is set to 10.
    * Select the frequency for the pull request schedule from the dropdown. The available options are `Daily`, `Weekly`, `Bi-weekly`, and `Monthly`. By default, it is set to `Daily`.
  
  <DocImage path={require('./static/autopr-settings-configuration.png')} width="80%" height="80%" title="Click to view full size image" />

4. After verifying the details, click **Save**. Once saved, you can view the **Auto PR configuration saved successfully** toaster message at the top, indicating the successful set up of the Auto PR configurations.

:::note

Dependency data is refreshed every 2 days to fetch newly available dependencies.
:::

Below is a pull request summary created through auto PR remediation, highlighting the recommended upgrade, security impact, and affected dependencies.

<DocImage path={require('./static/autopr-overview.png')} width="80%" height="80%" title="Click to view full size image" />