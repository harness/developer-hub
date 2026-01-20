---
title: What's Supported by Harness Platform
description: Technologies supported by Harness Platform
sidebar_label: What's Supported
sidebar_position: 1
helpdocs_topic_id: 1e536z41av
helpdocs_category_id: kx4hs8bn38
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/getting-started/supported-platforms-and-technologies
  - /docs/get-started/supported-platforms-and-technologies
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Gitxsup from '/docs/platform/shared/gitx-whats-supported.md'
import Authsup from '/docs/platform/shared/auth-supported.md'
import Delimagetypes from '/docs/platform/shared/delegate-image-types-intro-table.md'
import Secretmgmtsup from '/docs/platform/shared/secret-management-supported.md'

This page provides an overview of the technologies, features, and integrations supported by Harness to deploy and verify applications.

For more information about **What's Supported** for other Harness modules, see their respective documentation below:

   * [Code Repository](/docs/code-repository/code-supported)
   * [Continous Delivery and GitOps](/docs/continuous-delivery/cd-integrations)
   * [Continous Integration](/docs/continuous-integration/ci-supported-platforms)
   * [Continous Verification](/docs/continuous-delivery/verify/cv-whats-supported)
   * [Cloud Cost Management](/docs/cloud-cost-management/whats-supported)
   * [Chaos Engineering](/docs/chaos-engineering/whats-supported)
   * [Continuous Error Tracking](/docs/continuous-error-tracking/whats-supported)
   * [Feature Flags](/docs/feature-flags/ff-supported-platforms)
   * [Feature Management Experimentation](/docs/feature-management-experimentation/getting-started/whats-supported)
   * [Infrastructure As Code Management](/docs/infra-as-code-management/whats-supported)
   * [Internal Developer Portal](/docs/internal-developer-portal/whats-supported)
   * [Security Testing Orchestration](/docs/security-testing-orchestration/whats-supported/sto-deployments)
   * [Service Reliability Management](/docs/service-reliability-management/srm-whats-supported)
   * [Software Engineering Insights](/docs/software-engineering-insights/sei-supported-platforms)
   * [Software Supply Chain Assurance](/docs/software-supply-chain-assurance/ssca-supported)

To see supported technologies and features for the **Self-Managed Enterprise Edition**, refer to the following resources:
   - [Overview](/docs/self-managed-enterprise-edition/smp-overview)
   - [What's Supported](/docs/self-managed-enterprise-edition/smp-supported-platforms)

---
## Authentication

<Authsup />

---
## Delegates

<Delimagetypes />

**SDKs installed with Harness Delegate**

The Harness Delegate includes binaries for the SDKs that are required for deployments with Harness-supported integrations. These include binaries for Helm, ChartMuseum, `kubectl`, Kustomize, and so on.

1. **Kubernetes Deployments**: The following SDKs and tools are certified for Kubernetes deployments.

      | Manifest Type                       | Required Tool/SDK     | Certified Version     |
      | ----------------------------------- | --------------------- | --------------------- |
      | Kubernetes                          | kubectl               | v1.29.2               |
      |                                     | go-template           | v0.4.1                |
      | Helm                                | kubectl               | v1.27.0               |
      |                                     | helm                  | v3.11.0               |
      | Helm (chart is stored in GCS or S3) | kubectl               | v1.27.0               |
      |                                     | helm                  | v3.11                 |
      |                                     | chartmuseum           | v0.8.2 and v0.12.0    |
      | Kustomize                           | kubectl               | v1.27.0               |
      |                                     | kustomize             | v5.0.4                |
      | OpenShift                           | kubectl               | v1.27.0               |
      |                                     | oc                    | v4                    |

2. **Native Helm deployments**: The following SDKs and tools are certified for [native helm deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart)

   * `helm` v3.11
   * `kubectl` v.1.27.0

   `kubectl` is required if Kubernetes version is 1.16 or later.

3. **Install a delegate with custom SDK and third party tool binaries**

      To support customization, Harness provides a Delegate image that excludes all third-party SDK binaries. This image is referred to as the **No Tools Image**. Using the No Tools Image along with the Delegate `YAML`, you can install the required SDK versions using an initialization script defined in the `INIT_SCRIPT` environment variable in the Delegate YAML.

      To learn how to use the No Tools Delegate image and install specific SDK versions, go to [Install a Delegate with third party custom tool binaries](/docs/platform/delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries.md).

For additional information about the Delegate, refer to the following documentation:

   - [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types)
   - [Deploy Delegate on Kubernetes](/docs/platform/delegates/install-delegates/overview)
   - [Deploy Delegate on Docker](/docs/platform/delegates/install-delegates/overview)
   - [Install Delegate minimal image without SDKs](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools)
   - [Build custom Delegate images with third-party tools](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md)

---
## Git Experience

<Gitxsup />

---
## Notifications and collaboration

Notifications are used to alert your team of new, resurfaced, or critical events. With notifications, you can ensure your team is aware of important events that require action.

Supported notifications methods and collaboration tools:

   - [Slack](/docs/platform/notifications/send-notifications-using-slack/)
   - [Email](/docs/platform/notifications/add-smtp-configuration)
   - [Microsoft Teams](/docs/platform/notifications/send-notifications-to-microsoft-teams).
   - [PagerDuty](/docs/platform/notifications/notification-settings)
   - [Webhook](/docs/platform/notifications/notification-settings)

Harness supports approvals for these collaboration tools:
   - [Jira](/docs/platform/approvals/adding-jira-approval-stages): Supports on-premise version < 9.0.

      :::info
      To enable support for Jira on-premise version 9.0 or later, turn on the feature flag `SPG_USE_NEW_METADATA`.
      :::

   - [ServiceNow](/docs/platform/approvals/service-now-approvals): Supports [Utah](https://docs.servicenow.com/bundle/utah-release-notes/page/release-notes/family-release-notes.html) version and earlier.

For other providers, you can use [custom approvals](/docs/platform/approvals/custom-approvals) or [manual approvals](/docs/platform/approvals/adding-harness-approval-stages)

---
## Software Bill of Materials (SBOM) and Open Source Software (OSS) components

The Harness Software Bill of Materials (SBOM) provides detailed information about all the packages used to build Harness software. SBOMs are available in CycloneDX format and include key details for each package, such as:

- **Name**: The package or component name.
- **Version**: The specific version used.
- **Licenses**: Licensing information for the package.
- **Supplier**: The vendor or source of the package.
- **Relationships**: Dependencies and connections between packages.

This information helps organizations understand the composition of Harness software, assess licensing, and manage security or compliance requirements effectively.

For detailed information about the SBOM/OSS component list used by Harness, visit the [Harness Trust Center](https://trust.harness.io/).

---

## Role-based access control (RBAC)

Role-based access control (RBAC) lets you control who can access your resources and what actions they can perform on the resources. To do this, a Harness account administrator assigns resource-related permissions to members of user groups.

Harness supports managing Role-Based Access Control (RBAC) through SCIM (System for Cross-Domain Identity Management). This allows you to automate the provisioning and de-provisioning of users and groups from your identity provider, ensuring that access permissions stay up-to-date and consistent across your organization.
   - [**Okta**](/docs/platform/role-based-access-control/provision-users-with-okta-scim/)
   - [**Microsoft Entra ID**](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim/)
   - [**OneLogin**](/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim/)

For more information, go to [Role-Based Access Control (RBAC) in harness](/docs/platform/role-based-access-control/rbac-in-harness) 

---

## Resource hierarchy

The Harness Platform is structured hierarchically with three levels of access: Account, Organization (Org), and Project. Each level can have its own set of permissions configured, allowing for delegation of responsibilities to various teams. This approach facilitates efficient organization and management of resources, enabling granular access control that is both scalable and easy to manage.

### Scopes

- **Account** is the highest level. It is your Harness account, and it encompasses all the resources within your Harness subscription.
- **Organization** encompasses projects, resources, and users in a specific domain or business unit. This allows for the management of resources and permissions unique to an organization, separate from other areas of the account.
- **Project** contains related resources, such as apps, pipelines, and environments. This allows for the management of resources and permissions specific to a particular project, separate from the larger org (business unit) and account.

The scope at which you create a resource determines its availability and visibility.
- **Account scope**: Resources are available to all organizations and projects within the account.
- **Organization scope**: Resources are available only to that organization and its projects, not to other organizations or the account as a whole.

Choosing the appropriate scope helps you control access and prevent unauthorized use. For more information, go to [Create organizations and projects](/docs/platform/organizations-and-projects/create-an-organization).

### Resources across scopes

The table below lists resources and their availability at different scopes in Harness:

| **Resources**          | **Account** | **Org** | **Project** |
|------------------------|-------------|---------|-------------|
| **Pipeline**           | No          | No      | Yes         |
| **Services**           | Yes         | Yes     | Yes         |
| **Environments**       | Yes         | Yes     | Yes         |
| **Git Management**     | No          | No      | Yes         |
| **Connectors**         | Yes         | Yes     | Yes         |
| **Secrets**            | Yes         | Yes     | Yes         |
| **SMTP Configuration** | Yes         | No      | No          |
| **Templates**          | Yes         | Yes     | Yes         |
| **Audit Trail**        | Yes         | Yes     | No          |
| **Delegates**          | Yes         | Yes     | Yes         |
| **Governance**         | Yes         | Yes     | Yes         |

---
## Secrets management

<Secretmgmtsup />

--- 
## Supported browsers

The following desktop browsers are supported:

   - **Chrome**: latest version
   - **Firefox**: latest version
   - **Safari**: latest version
   - All Chromium-based browsers.

Mobile browsers are not supported.

---
## Supported screen resolution

Minimum supported screen resolution is **1440x900**.

---

## The Update Framework (TUF)

The Update Framework (TUF) is an open source specification for that provides instructions on how to organize, sign, and interact with metadata to secure package managers.

Harness provides native **TUF (The Update Framework)** support through the following capabilities:

   * **Deployment Templates**
      - [Deployment Templates](/docs/continuous-delivery/deploy-srv-diff-platforms/custom/custom-deployment-tutorial) use shell scripts to connect to target platforms, gather host information, and execute deployment steps.
      - Deployment Templates can obtain the metadata required for TUF, and generate and validate signatures throughout the software lifecycle.
   * **OCI Image Registry Support**
      - TUF recommends using an OCI-compliant container registry. Harness supports this via the [OCI registry for Helm charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart/#options-for-connecting-to-a-helm-chart-store).
   * **Secrets and Key Management**
      - Harness enforces token and key rotation as part of best practices for secrets management. See [rotating API tokens](/docs/platform/automation/api/add-and-manage-api-keys#rotate-tokens).
   * **Continuous Verification**
      - TUF recommends verifying deployments to ensure integrity. Harness supports this via [Continuous Verification](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step).

---

## Active Platform feature flags

Few Harness Platform features are released behind feature flags to gather feedback from specific customers before a general release. Feature development status is categorized as [Beta, GA, or Limited GA](/docs/platform/get-started/key-concepts#beta-limited-ga-and-ga-definitions).

The following table describes active feature flags relevant to Harness Platform.

| Flag                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|-----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES`                                                                                | When activated, it prevents sending email invitations to users of accounts using SSO for authentication during onboarding.                                                                                                                                                                                                                                                                                                                                                                                            |
| `PL_LDAP_PARALLEL_GROUP_SYNC`                                                                                         | Enable User Group sync operation to fetch data from the LDAP server in parallel. Only enable this if the LDAP server can handle the load.                                                                                                                                                                                                                                                                                                                                                                             |
| `PL_NEW_SCIM_STANDARDS`                                                                                               | Enabling the `PL_NEW_SCIM_STANDARDS` feature flag ensures compliance with SCIM 2.0 standards by including the meta fields `createdAt`, `lastUpdated`, `version`, and `resourceType` in CRUD operation responses on users or user groups.                                                                                                                                                                                                                                                                              |
| `PL_USE_CREDENTIALS_FROM_DELEGATE_FOR_GCP_SM`                                                                         | Enabling this Feature Flag will let you use delegate credentials to access the Google Cloud Platform Secret Manager.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `PL_DELEGATE_TASK_CAPACITY_CHECK`                                                                                     | When enabled, account tasks will be broadcasted until timeout. The default behavior is to broadcast tasks up to 3 times to delegates.                                                                                                                                                                                                                                                                                                                                                                                 |
| `PL_FAVORITES`                                                                                                        | Allows you to set the frequently accessed projects and connectors as favorites. For more information, go to [Set favorites](/docs/platform/favorites/set-favorites/).                                                                                                                                                                                                                                                                                                                                                 |
| `PL_ALLOW_TO_SET_PUBLIC_ACCESS`                                                                                       | Allows pipeline executions marked for access to public view without authentication. You can share execution URLs, including console logs, without requiring users to sign in. For more information, go to [Allow public access to pipeline executions](/docs/platform/pipelines/executions-and-logs/allow-public-access-to-executions/).                                                                                                                                                                              |
| `PL_HIDE_ACCOUNT_LEVEL_MANAGED_ROLE`, `PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE`, `PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE` | This feature flag is used to hide managed roles at various levels: account level, organization level, and project level. Existing role bindings for managed roles will still exist for users, but new role bindings with managed roles won't be allowed when the feature flag is enabled. The managed roles won't show up in the list of roles available at the respective scopes. For more information, go to [Manage Roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles/) |

<!-- | `PL_CENTRAL_NOTIFICATION`                     | Enable/disable Centralized Notifications Management. For more information, go to [Manage delegate notifications](/docs/platform/notifications/manage-notifications). | -->

:::note
To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io).
:::