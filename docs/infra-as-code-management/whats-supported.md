---
title: What's supported in Harness IaCM
description: Supported Platforms and Features in Harness IaCM
sidebar_label: What's Supported
sidebar_position: 10
---

import HarnessApiData from '../../src/components/HarnessApiData/index.tsx';

This page describes supported platforms and technologies for Harness IaCM specifically.

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](https://developer.harness.io/docs/platform/platform-whats-supported/).

## Deployment models
Harness IaCM is supported on the following deployment models:
- **Harness SaaS:** Fully managed; all IaCM features are available. No infrastructure to run or maintain.
- **Self-Managed Enterprise Edition (SMP):** On-premises or private cloud with full control. See [IaCM SMP](/docs/infra-as-code-management/manage-projects/iacm-smp) for setup and any SMP-specific feature flags or image overrides.


## Prerequisites
To configure an IaCM workspace and create pipelines, you must have the following:
- An active cloud provider account
- A Git repository

## Supported IaC Frameworks
Harness IaCM supports the following IaC frameworks:
- [**OpenTofu**](https://opentofu.org/) <HarnessApiData
    query="https://app.harness.io/gateway/iacm/api/provisioners/supported/opentofu"
    token="process.env.HARNESS_GENERIC_READ_ONLY_KEY"
    fallback=""
    parse='.[-1] | " (versions up to: v\(.))"'></HarnessApiData>
- **Terraform** (up to v1.5.x)
- [**Terragrunt**](https://terragrunt.gruntwork.io/) <HarnessApiData
    query="https://app.harness.io/gateway/iacm/api/provisioners/supported/terragrunt"
    token="process.env.HARNESS_GENERIC_READ_ONLY_KEY"
    fallback=""
    parse='.[-1] | " (versions up to: v\(.))"'></HarnessApiData>

:::info opentofu / terraform
Harness IaCM currently supports integration with all **OpenTofu** versions <HarnessApiData
    query="https://app.harness.io/gateway/iacm/api/provisioners/supported/opentofu"
    token="process.env.HARNESS_GENERIC_READ_ONLY_KEY"
    fallback=""
    parse='.[-1] | " (latest: v\(.))"'></HarnessApiData>.  
 For **Terraform**, we support all MPL versions up to **1.5.x**, any BSL versions (from 1.6.0) are not supported.

Go to [OpenTofu migration](https://opentofu.org/docs/intro/migration/) to migrate from Terraform to OpenTofu.
:::

### Limitations
- **Terraform:** Only MPL-licensed versions up to 1.5.x are supported. Terraform 1.6+ (BSL) is not supported; use [OpenTofu](https://opentofu.org/docs/intro/migration/) for a drop-in replacement.
- **Terragrunt:** Supported at the workspace level. Go to [Get started with Terragrunt](/docs/infra-as-code-management/get-started/#terragrunt) to learn more.

## Supported Workspace Connectors
### Configuration management
- **Ansible**: Harness IaCM integrates with Ansible so you can define your target machines (**inventories**) and apply automation tasks (**playbooks**) as part of your CI/CD pipelines. Go to [Ansible Support](/docs/infra-as-code-management/configuration/ansible).

### Cloud Providers
- **AWS**: Connect via your AWS account to leverage extensive IaCM features.
- **Azure**: Integration supports multiple Azure services.
- **Google Cloud Platform (GCP)**: Offers tailored IaCM functionalities for GCP resources.

### Secrets Management
- **Vault**: HashiCorp Vault connector for secrets management

**Key features:**
- **Workspace-level attachment**: Vault connectors are attached at the workspace level
- **Authentication methods**: Currently supports **Token** and **JWT** authentication
- **Flexible configuration**: Can be added to workspaces after creation or through variable sets
- **Runtime injection**: Secrets are automatically injected into runtime environments as environment variables
- **Provider initialization**: Harness automatically adds environment variables based on the selected authentication type, which you must consume to initialize the Vault provider in your OpenTofu/Terraform code.

### Git Providers
Harness IaCM supports the following source providers for seamless code management:
- **[Harness Code Repository](/docs/code-repository)**: Provides direct integration for streamlined operations.
- **GitHub**: Ideal for managing projects hosted on GitHub with options for branch-specific operations.
- **GitLab**: Connects easily with GitLab for comprehensive repository management.
- **Bitbucket**: Integrates smoothly for managing Bitbucket repositories.
- **Azure Repos**: Supports Azure Repos for direct access to Microsoft’s DevOps tools.

Git options include `Latest from Branch` (specifying a branch) and `Git Tag` fetch types. Users can set a configuration file path, such as a terraform (.tf) file.

## IaCM Feature Flags
Beta and feature-flagged capabilities are marked as such in the docs; contact [Harness Support](mailto:support@harness.io) to request access.

## Supported integrations
- **[SMP (Service Management Platform)](/docs/infra-as-code-management/manage-projects/iacm-smp):** Run IaCM on Self-Managed Enterprise Edition.
- **[Variable Sets](/docs/infra-as-code-management/configuration/connectors-and-variables/variable-sets):** Reusable variables and connector references across workspaces.
- **[Module Registry](/docs/infra-as-code-management/registry/module-registry):** Store and manage private OpenTofu/Terraform modules.
- **[Private Provider Registry](/docs/infra-as-code-management/registry/provider-registry):** Store and manage private OpenTofu/Terraform providers.
- **[MCP (Model Context Protocol)](/docs/platform/harness-ai/harness-mcp-server):** Use IaCM context with AI assistants and tools that support MCP.


## Supported plugins
- **[IDP (Internal Developer Portal)](/docs/internal-developer-portal/plugins/available-plugins/harness-native-plugins/harness-iacm):** Use the IaCM plugin in IDP for resource visibility, drill-downs, and workspace context.

### Security Scanners
IaCM integrates with multiple security scanning tools to check your infrastructure code for security vulnerabilities, compliance issues, and misconfigurations:

- **[Checkov](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/checkov/iac-scans-with-checkov)**: Open-source static code analysis tool for Infrastructure as Code that detects security and compliance misconfigurations.
- **[Wiz](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/wiz/iac-scans-with-wiz)**: Cloud security platform that scans your infrastructure changes for security vulnerabilities and compliance violations.
- **[Snyk](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-scanner-reference)**: Developer security platform that identifies vulnerabilities and security issues in your IaC configurations.
- **[Checkmarx One](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference)**: Application security testing platform that provides comprehensive security scanning for infrastructure code.
- **Custom Scans**: IaCM also supports integration with custom security scanning tools through the [Harness STO module](https://developer.harness.io/docs/security-testing-orchestration).

:::note
Security scanning features are part of the [Harness STO module](https://developer.harness.io/docs/security-testing-orchestration) and require an STO license.
:::

## Next steps
- **[Get started with IaCM](/docs/infra-as-code-management/get-started):** Set up your first workspace and run Plan/Apply.
- **[Connectors and variables](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables):** Configure cloud, Git, and secrets connectors.
- **[IaCM pipelines](/docs/infra-as-code-management/pipelines/default-pipelines):** Create pipelines with Plan, Apply, Destroy, and approval steps.