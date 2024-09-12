---
title: What's supported in Harness IaCM
description: Supported Platforms and Features in Harness IaCM
sidebar_label: What's supported
sidebar_position: 1
---

import HarnessApiData from '../../src/components/HarnessApiData/index.tsx';

This page describes supported platforms and technologies for Harness IaCM specifically.

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](https://developer.harness.io/docs/platform/platform-whats-supported/).

## Prerequisites
To configure an IaCM workspace and create pipelines, you must have the following:
- An active cloud provider account
- A Git repository

## OpenTofu and Terraform
:::info supported iac frameworks
Harness IaCM currently supports integration with **OpenTofu** <HarnessApiData
    query="https://app.harness.io/gateway/iacm/api/provisioners/supported/opentofu"
    token="process.env.HARNESS_GENERIC_READ_ONLY_KEY"
    fallback=""
    parse='.[-1] | "(up to v\(.))"'>
</HarnessApiData> and **Terraform** <HarnessApiData
    query="https://app.harness.io/gateway/iacm/api/provisioners/supported/terraform"
    token="process.env.HARNESS_GENERIC_READ_ONLY_KEY"
    fallback=""
    parse='.[-1] | "(up to v\(.))"'>
</HarnessApiData> frameworks.
:::

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


 
## IaCM Feature Flags
Some Harness IaCM features are released behind feature flags to get feedback from specific customers before releasing the features to the general audience.
The following table describes each of the feature flags relevant to Harness IaCM.

:::note
To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io).
:::

## Supported plugins

IaCM supports external plugins to enhance its usability and security. 
- [Wiz Scans](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/wiz/iac-scans-with-wiz) to check your proposed infrastructure changes for security vulnerabilities.