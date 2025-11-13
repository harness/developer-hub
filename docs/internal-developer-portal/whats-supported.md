---
title: What's supported in Harness IDP
description: Lists the plugins, git providers, and third-party integrations supported in IDP.
sidebar_label: What's Supported
sidebar_position: 1
---

Harness Internal Developer Portal integrates with a number of third-party providers to provide a single pane of glass for developers. This page outlines all the supported integrations, providers, and features available in Harness IDP.

---

## 1. Git Providers

Harness IDP supports the following Git providers for storing and managing catalog entity YAML definitions and Workflow YAML definitions:

| **Git Provider** | **Support Type** | **Documentation** |
|------------------|------------------|-------------------|
| **Harness Code Repository** | Default | [Learn more](https://developer.harness.io/docs/code-repository/get-started/overview/) |
| **GitHub** | Cloud & Enterprise | [Cloud](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-code-repo#connect-to-github) \| [Enterprise](https://docs.github.com/en/enterprise-server@3.14/admin/overview/about-github-enterprise-server) |
| **GitLab** | Cloud & Self-Hosted | [Learn more](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-code-repo#connect-to-gitlab) |
| **Bitbucket** | Cloud & Server | [Learn more](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-code-repo#connect-to-bitbucket) |
| **Azure Repos** | Cloud | [Learn more](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-a-azure-repo) |

:::warning Authentication Type

Backstage doesn't support SSH auth type for integrations. **Only HTTP connection is supported** for all Git provider-based connectors in IDP.

API calls in IDP are used to fetch YAML data, last commit SHA, and detect any new changes. SSH authentication cannot be used for making these API calls; it is only used for cloning repositories. Therefore, the main Git connector for IDP Git integration must support API requests, hence HTTP is the only supported method.

:::

---

## 2. IDP Entities for Git Experience

[Harness IDP Git Experience](/docs/internal-developer-portal/git-experience/gitx-journey.md) allows you to store and version control your IDP configurations in Git repositories. The following table shows which IDP entities support Git Experience:

| **IDP Entity** | **Git Experience Support** | **Notes** |
|----------------|---------------------------|-----------|
| **Catalog Entities** | Supported | Component, API, Resource, and other catalog entities can be stored as YAML files in Git |
| **Workflows** | Supported | Workflow definitions can be stored and tracked in Git repositories |
| **Scorecards** | Not Supported | Scorecards don't currently support Git Experience |
| **Plugins** | Not Supported | Plugin configurations don't currently support Git Experience |
| **Layouts** | Not Supported | Layout configurations don't currently support Git Experience |

---

## 3. CI/CD Providers

Harness IDP is **CI/CD agnostic** and integrates with various CI/CD tools:

| **CI/CD Provider** | **Support** | **Notes** |
|-------------------|-------------|-----------|
| **Harness CI/CD** | Supported | **Recommended** for the best out-of-the-box experience |
| **GitLab CI/CD** | Supported | Works seamlessly with IDP workflows |
| **GitHub Actions** | Supported | Compatible with IDP orchestration |
| **CircleCI** | Supported | Can be integrated with IDP workflows |
| **Jenkins** | Supported | Compatible through pipeline triggers |
| **Other CI/CD Tools** | Supported | Any CI/CD tool that can be triggered via API/webhook |

---
## 4. Harness IDP Plugins

Harness IDP supports a curated collection of plugins to integrate the software catalog with third-party providers and extend functionality:

| **Plugin Type** | **Description** | **Documentation** |
|----------------|-----------------|-------------------|
| **Harness Native Plugins** | Official plugins that integrate seamlessly with other Harness modules (CI/CD, Feature Flags, Chaos Engineering, STO, etc.) | [View Harness Plugins](/docs/category/harness-modules) |
| **Backstage Community Plugins** | Third-party and community plugins from the Backstage ecosystem | [View Available Plugins](/docs/category/available-plugins) |
| **Custom Plugins** | Build your own frontend plugins for specific use cases | [Build Custom Plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/overview) |

:::info Secret Management for Plugins

Harness IDP requires some secrets to be set for plugins and external integrations in the Catalog to work. We support all types of [secret managers](https://developer.harness.io/docs/category/secrets-management) for secure credential storage.

:::

---

## 5. Harness IDP Workflow Backends

**Harness Pipelines**: Self-service workflows in Harness IDP are powered by **Harness Pipelines**. Each Workflow’s backend is configured using Actions and Harness Pipelines. Go to [Setting up the Backend with Harness IDP Pipeline](/docs/internal-developer-portal/flows/harness-pipeline) for more information.

You can also use other tools (such as GitHub Actions or Jenkins) as the backend for your Workflows by triggering them via Harness Pipelines. However, these tools are not natively supported by Harness IDP, so the experience is not as seamless as with Harness Pipelines. We recommend using Harness Pipelines as the backend for your Workflows.

---

## 6. Harness IDP Workflow Actions

Harness IDP Workflows use custom actions to trigger and orchestrate Harness Pipelines. Go to [Supported Workflow Actions](/docs/internal-developer-portal/flows/custom-actions#supported-actions) for more information.

---

## 6. Miscellaneous

Additional features and capabilities supported in Harness IDP:

| **Feature** | **Support Status** | **Details** |
|------------|-------------------|-------------|
| **Custom Plugins** | Supported | We support only [Frontend Backstage Plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/build-a-frontend-plugin) as [Custom Plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/overview) |
| **Scorecard Data Sources** | Supported | Multiple data sources available for scorecards. [View all data sources](https://developer.harness.io/docs/internal-developer-portal/scorecards/checks-datasources) |
| **Backstage Plugins** | Supported | Curated collection of Backstage plugins. [View available plugins](/docs/category/available-plugins) |
| **Custom Theming and Branding** | Not Supported | Custom theming is not currently available |
| **Developer Homepage Customization** | Supported | You can customize the Homepage for a personalized developer experience |
| **API Support for Entity Updates** | Supported | [Ingestion APIs](https://developer.harness.io/docs/internal-developer-portal/catalog/custom-catalog-properties) available to programmatically update catalog entities |
| **Harness Delegate** | Supported | Required for accessing private URLs and resources behind firewalls |
| **Secret Managers** | Supported | All types of [secret managers](https://developer.harness.io/docs/category/secrets-management) are supported |

For information about what's supported for other Harness modules and the Harness Platform overall, refer to [Supported platforms and technologies](/docs/platform/platform-whats-supported.md).
