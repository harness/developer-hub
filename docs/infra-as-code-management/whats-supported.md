---
title: What's supported in Harness IaCM
description: Supported Platforms and Features in Harness IaCM
sidebar_label: What's supported
sidebar_position: 1
---

This page describes supported platforms and technologies for Harness IaCM specifically.

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](https://developer.harness.io/docs/platform/platform-whats-supported/).

## Prerequisites
To configure an IaCM workspace and create pipelines, you must have the following:
- An active cloud provider account
- A Git repository

## Supported Workspace Connectors
### Cloud Providers
- **AWS**: Connect via your AWS account to leverage extensive IaCM features.
- **Azure**: Integration supports multiple Azure services.
- **Google Cloud Platform (GCP)**: Offers tailored IaCM functionalities for GCP resources.
- **Spot**: Utilize Spot by NetApp for cost-effective cloud workload management.

### Git Providers
Harness IaCM supports the following source providers for seamless code management:
- **[Harness Code Repository](https://developer.harness.io/docs/code-repository)**: Provides direct integration for streamlined operations.
- **GitHub**: Ideal for managing projects hosted on GitHub with options for branch-specific operations.
- **GitLab**: Connects easily with GitLab for comprehensive repository management.
- **Bitbucket**: Integrates smoothly for managing Bitbucket repositories.
- **Azure Repos**: Supports Azure Repos for direct access to Microsoft’s DevOps tools.

Git options include `Latest from Branch` (specifying a branch) and `Git Tag` fetch types. Users can set a configuration file path, such as a terraform (.tf) file.

## Supported IaC Frameworks
Harness IaCM currently supports integration with **Terraform** and **OpenTofu** frameworks.

## IaCM Feature Flags
Some Harness IaCM features are released behind feature flags to get feedback from specific customers before releasing the features to the general audience.
The following table describes each of the feature flags relevant to Harness IaCM.

:::note
To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io).
:::

<table width="900" cellspacing="0" cellpadding="0">
    <tr>
        <td width="300" word-wrap="break-word"><b>Flag</b></td>
        <td width="600"><b>Description</b></td>
    </tr>
    <tr>
        <td>IaCM_COST_ESTIMATION</td>
        <td>Enable to allow users to anticipate and understand the potential financial impact of their infrastructure changes </td>
    </tr>
    <tr>
        <td>IaCM_DRIFT_DETECTION</td>
        <td>Grants users visibility of drift/anomalies between the desired state and the configuration in the target environment</td>
    </tr>
    <tr>
        <td>IaCM_OPEN_TOFU</td>
        <td>Allows users to configure their workspace to target an OpenTofu framework</td>
    </tr>
    <tr>
        <td>IaCM_HARNESS_CODE</td>
        <td>Allows users to integrate their workspace with Harness Code repositories</td>
    </tr>
    <tr>
        <td>CREATE_DEFAULT_PROJECT</td>
        <td>Enables the creation of a new project with default configuration </td>
    </tr>
</table>

## Supported plugins

IaCM supports external plugins to enhance its usability and security. 
- [Wiz Scans](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/wiz/iac-scans-with-wiz) to check your proposed infrastructure changes for security vulnerabilities.