---
title: What's supported by Harness Platform
description: Technologies supported by Harness Platform
sidebar_label: What's supported
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

These are the supported Harness Platform features and integrations you can use for deploying and verifying your apps.

For supported platforms and technologies by module, go to the module documentation:

* [What's supported in CODE](/docs/code-repository/code-supported)
* [What's supported in CD and GitOps](/docs/continuous-delivery/cd-integrations)
* [What's supported in CV](/docs/continuous-delivery/verify/cv-whats-supported)
* [What's supported in CI](/docs/continuous-integration/ci-supported-platforms)
* [What's supported in FF](/docs/feature-flags/ff-supported-platforms)
* [What's supported in CCM](/docs/cloud-cost-management/whats-supported)
* [What's supported in STO](/docs/security-testing-orchestration/whats-supported)
* [What's supported in SSCA](/docs/software-supply-chain-assurance/ssca-supported)
* [What's supported in CE](/docs/chaos-engineering/whats-supported)
* [What's supported in SRM](/docs/service-reliability-management/srm-whats-supported)
* [What's supported in CET](/docs/continuous-error-tracking/whats-supported)
* [What's supported in IDP](/docs/internal-developer-portal/whats-supported)
* [What's supported in SEI](/docs/software-engineering-insights/sei-supported-platforms)
* [What's supported in IACM](/docs/infra-as-code-management/whats-supported)

For supported platforms and technologies for SMP, go to [What's supported in Self-Managed Enterprise Edition](/docs/self-managed-enterprise-edition/smp-supported-platforms).

## Authentication

<Authsup />

## Delegates

<Delimagetypes />

For more information about delegates, go to:

- [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types)
- [Deploy delegate on Kubernetes](/docs/platform/delegates/install-delegates/overview)
- [Deploy delegate on Docker](/docs/platform/delegates/install-delegates/overview)
- [Install delegate minimal image without SDKs](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools)
- [Build custom delegate images with third-party tools](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md)

### SDKs installed with Harness Delegate

The Harness Delegate includes binaries for the SDKs that are required for deployments with Harness-supported integrations. These include binaries for Helm, ChartMuseum, `kubectl`, Kustomize, and so on.

#### Kubernetes Deployments

For Kubernetes deployments, the following SDKs/tools are certified.

| Manifest Type                       | Required Tool/SDK     | Certified Version     |
| ----------------------------------- | --------------------- | --------------------- |
| Kubernetes                          | kubectl               | v1.28.7              |
|                                     | go-template           | v0.4.1                |
| Helm                                | kubectl               | v1.27.0               |
|                                     | helm                  | v3.11.0               |
| Helm (chart is stored in GCS or S3) | kubectl               | v1.27.0               |
|                                     | helm                  | v3.11                 |
|                                     | chartmuseum           | v0.8.2 and v0.12.0    |
| Kustomize                           | kubectl               | v1.27.0               |
|                                     | kustomize             | v4.5.4                |
| OpenShift                           | kubectl               | v1.27.0               |
|                                     | oc                    | v4                    |

#### Native Helm deployments

For [Native Helm deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart) (Helm chart manifest), the following SDKs/tools are certified:

* `helm` v3.11
* `kubectl` v.1.27.0

`kubectl` is required if Kubernetes version is 1.16 or later.

#### Install a delegate with custom SDK and 3rd-party tool binaries

To support customization, Harness provides a Harness Delegate image that does not include any third-party SDK binaries. We call this image the No Tools Image.

Using the No Tools Image and Delegate YAML, you can install the specific SDK versions you want. You install software on the Delegate using the `INIT_SCRIPT` environment variable in the Delegate YAML.

For steps on using the No Tools Delegate image and installing specific SDK versions, go to [Install a Delegate with 3rd Party Tool Custom Binaries](/docs/platform/delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries.md).

## Git Experience

<Gitxsup />

## Notifications and collaboration

Notifications are used to alert your team of new, resurfaced, or critical events. With notifications, you can ensure your team is aware of important events that require action.

Harness Platform supports notifications for the following notification methods and collaboration tools:

- [Slack](/docs/platform/notifications/send-notifications-using-slack/)
- [Email](/docs/platform/notifications/add-smtp-configuration)
- [Microsoft Teams](/docs/platform/notifications/send-notifications-to-microsoft-teams).
- [PagerDuty](/docs/platform/notifications/notification-settings)
- [Webhook](/docs/platform/notifications/notification-settings)

Harness supports approvals for these collaboration tools:

- [Jira](/docs/platform/approvals/adding-jira-approval-stages): Supports on-premise version < 9.0. For Jira on-premise >= 9.0 version support, enable the feature flag, `SPG_USE_NEW_METADATA`.
- [ServiceNow](/docs/platform/approvals/service-now-approvals): Supports [Utah](https://docs.servicenow.com/bundle/utah-release-notes/page/release-notes/family-release-notes.html) version and earlier.

For other providers, you can use [custom approvals](/docs/platform/approvals/custom-approvals) or [manual approvals](/docs/platform/approvals/adding-harness-approval-stages)

## Open Source Software (OSS) components

For a list of the open source libraries and third-party software Harness uses, download the [Harness Open Source Software (OSS) components PDF](./static/harness-open-source-software-components.pdf).

## RBAC

Role-based access control (RBAC) lets you control who can access your resources and what actions they can perform on the resources. To do this, a Harness account administrator assigns resource-related permissions to members of user groups.

- [Manage users](/docs/platform/role-based-access-control/add-users): A Harness user is an individual with a unique email registered with Harness. Users can be associated with multiple accounts and user groups.

- [Manage roles](/docs/platform/role-based-access-control/add-manage-roles): Roles are an [RBAC component](/docs/platform/role-based-access-control/rbac-in-harness/#rbac-components) that contain a specific set of [permissions](/docs/platform/role-based-access-control/permissions-reference/) that define what actions can be taken on Harness resources, such as viewing, creating, editing, or deleting. When you assign a role to a user, user group, or service account, the permissions defined in the role are automatically granted to the intended target.

   Harness includes some [built-in roles](/docs/platform/role-based-access-control/add-manage-roles/#built-in-roles), and you can also create your own [custom roles](/docs/platform/role-based-access-control/add-manage-roles/#create-a-role) to provide fine-grained access control.

- [Manage resource groups](/docs/platform/role-based-access-control/add-resource-groups): Resource groups are an [RBAC component](/docs/platform/role-based-access-control/rbac-in-harness/#rbac-components) that determine which objects a user or service account can access. Objects are any Harness resource, including projects, pipelines, connectors, secrets, delegates, environments, users, and more. When you assign resource groups to a user, user group, or service account, the access defined in the resource group is granted to the target user, group, or service account.

   Harness includes some [built-in resource groups](/docs/platform/role-based-access-control/add-resource-groups/#built-in-resource-groups), and you can create [custom resource groups](/docs/platform/role-based-access-control/add-resource-groups/#create-a-resource-group), to provide fine-grained access control.

- [Manage user groups](/docs/platform/role-based-access-control/add-user-groups): User groups contain multiple Harness users. You assign [roles](/docs/platform/role-based-access-control/add-manage-roles/) and [resource groups](/docs/platform/role-based-access-control/add-resource-groups/) to user groups. The permissions and access granted by the assigned roles and resource groups are applied to all group members.

   You can also assign roles and resource groups to individual users that are not in a group. However, user groups help keep your RBAC organized and make it easier to manage permissions and access. Instead of modifying each user individually, you can edit the permissions and access for the entire group at once.

   Harness includes some [built-in user groups](/docs/platform/role-based-access-control/add-user-groups/#built-in-user-groups), and you can [create user groups manually](/docs/platform/role-based-access-control/add-user-groups/#create-user-groups-manually), through [inheritance](/docs/platform/role-based-access-control/add-user-groups/#create-roles-by-inheritance-assign-roles), or through [automated provisioning](/docs/platform/role-based-access-control/add-user-groups/#use-automated-provisioning). You can create user groups at all [scopes](/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes).

Using RBAC helps you:

- Ensure that users can only access the information and resources necessary to perform their tasks. This reduces the risk of security breaches and unauthorized access to sensitive data.
- Create systematic, repeatable permissions assignments. RBAC saves time and increases efficiency for administrators who otherwise have to manage access for individual user accounts. You can quickly add and change roles, as well as implement them across APIs.
- Increase accountability by clearly defining who has access to which resources and information. This makes it easier to track and audit user activities, helping to identify and prevent misuse or abuse of access privileges.
- Comply more effectively with regulatory and statutory requirements for confidentiality and privacy. It helps you enforce privacy and data protection policies.
- Provision users and groups with SCIM - System for Cross-Domain Identity Management (SCIM) is an open standard protocol for automated user provisioning. In Harness, automated provisioning involves creating users and user groups, assigning users to groups, and managing some user attributes (such as names and email addresses). In addition to creating users and groups, automated provisioning also edits and removes users and user groups as and when required.

   - [Okta (SCIM)](/docs/platform/role-based-access-control/provision-users-with-okta-scim/)
   - [Microsoft Entra ID (SCIM)](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim/)
   - [OneLogin (SCIM)](/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim/)

- Use just-in-time (JIT) user provisioning: Automated provisioning eliminates repetitive tasks related to manual provisioning and simplifies user management.

   JIT provisioning in Harness lets you provision users automatically when they first sign-in to Harness through SAML SSO. Harness supports JIT provisioning only for new users logging in through an IdP, such as Okta.

## Resource hierarchy

The Harness Platform is structured hierarchically with three levels of access: Account, Organization (Org), and Project. Each level can have its own set of permissions configured, allowing for delegation of responsibilities to various teams. This approach facilitates efficient organization and management of resources, enabling granular access control that is both scalable and easy to manage.

### Scopes

- **Account** is the highest level. It is your Harness account, and it encompasses all the resources within your Harness subscription.

- **Organization** encompasses projects, resources, and users in a specific domain or business unit. This allows for the management of resources and permissions unique to an organization, separate from other areas of the account.

- **Project** contains related resources, such as apps, pipelines, and environments. This allows for the management of resources and permissions specific to a particular project, separate from the larger org (business unit) and account.

The scope at which you create resources depends on the level of control and visibility you require. For example, if you create a connector at the account scope, it is available to all organizations and projects within the account. However, if you create a connector at the organization scope, it is only available to that organization and any projects under that organization. It is not available at the account scope or to other organizations. This lets you control access to your resources more effectively and prevent unauthorized access.

To learn about organizations and projects, go to [Create organizations and projects](/docs/platform/organizations-and-projects/create-an-organization).

### Resources across scopes

The following table lists some resources and their availability at various scopes in Harness:

| **Resources** | **Account** | **Org** | **Project** |
| --- | --- | --- | --- |
| **Pipeline** | No | No | Yes |
| **Services** | Yes | Yes | Yes |
| **Environments** | Yes | Yes | Yes |
| **Git Management** | No | No | Yes |
| **Connectors** | Yes | Yes | Yes |
| **Secrets** | Yes | Yes | Yes |
| **SMTP Configuration** | Yes | No | No |
| **Templates** | Yes | Yes | Yes |
| **Audit Trail** | Yes | Yes | No |
| **Delegates** | Yes | Yes | Yes |
| **Governance** | Yes | Yes | Yes |

## Secrets management

<Secretmgmtsup />

## Supported browsers

The following desktop browsers are supported:

- **Chrome**: latest version
- **Firefox**: latest version
- **Safari**: latest version
- All Chromium-based browsers.

Mobile browsers are not supported.

## Supported screen resolution

Minimum supported screen resolution is 1440x900.

## The Update Framework (TUF)

The Update Framework (TUF) is an open source specification for that provides instructions on how to organize, sign, and interact with metadata to secure package managers.

Harness includes native TUF support via the following:

- Deployment templates: [Deployment Templates](/docs/continuous-delivery/deploy-srv-diff-platforms/custom/custom-deployment-tutorial) use shell scripts to connect to target platforms, obtain target host information, and execute deployment steps.
  - Deployment Templates can obtain the required metadata for native TUF support, and generate and validate signatures in the software lifecycle.
- OCI image registry support:
  - TUF recommends the use of an OCI image-spec container registry. Harness supports [OCI registry for Helm charts](/docs/first-gen/firstgen-platform/account/manage-connectors/add-helm-repository-servers/#oci-registry).
- Enforce the rotation of secrets and key management practices:
  - Harness provides [token key rotation natively](/docs/platform/automation/api/add-and-manage-api-keys#rotate-tokens).
- Continuous Verification: TUF recommends the verification of deployments akin to [Harness Continuous Verification](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step).

## Active Platform feature flags

Some Harness Platform features are released behind feature flags to get feedback from specific customers before releasing the features to the general audience. Feature development statuses are categorized as [Beta, GA, or Limited GA](/docs/platform/get-started/release-status).

The following table describes active feature flags relevant to Harness Platform.

To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io).

| Flag                                          | Description |
|-----------------------------------------------|-------------|
| `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES`        | When activated, it prevents sending email invitations to users of accounts using SSO for authentication during onboarding. |
| `PL_LDAP_PARALLEL_GROUP_SYNC`                 | Enable User Group sync operation to fetch data from the LDAP server in parallel. Only enable this if the LDAP server can handle the load. |
| `PL_NEW_SCIM_STANDARDS`                       | Enabling the `PL_NEW_SCIM_STANDARDS` feature flag ensures compliance with SCIM 2.0 standards by including the meta fields `createdAt`, `lastUpdated`, `version`, and `resourceType` in CRUD operation responses on users or user groups. |
| `PL_USE_CREDENTIALS_FROM_DELEGATE_FOR_GCP_SM` | Enabling this Feature Flag will let you use delegate credentials to access the Google Cloud Platform Secret Manager. |
| `PL_DELEGATE_TASK_CAPACITY_CHECK`             | When enabled, account tasks will be broadcasted until timeout. The default behavior is to broadcast tasks up to 3 times to delegates. |
| `PL_FAVORITES`                                | Allows you to set the frequently accessed projects and connectors as favorites. For more information, go to [Set favorites](/docs/platform/favorites/set-favorites/). |
| `PL_ALLOW_TO_SET_PUBLIC_ACCESS`               | Allows pipeline executions marked for access to public view without authentication. You can share execution URLs, including console logs, without requiring users to sign in. For more information, go to [Allow public access to pipeline executions](/docs/platform/pipelines/executions-and-logs/allow-public-access-to-executions/). |
| `PL_GCP_OIDC_AUTHENTICATION`                  | Enabling this feature flag allows GCP connectors using OpenID Connect (OIDC) to let Harness communicate directly with GCP through OIDC. For more information, go to [Google Cloud Platform (GCP) connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference/). |
| `PL_CENTRAL_NOTIFICATION`                     | Enable/disable Centralized Notifications Management. For more information, go to [Manage delegate notifications](/docs/platform/notifications/manage-notifications). |
| `PL_HIDE_ACCOUNT_LEVEL_MANAGED_ROLE`, `PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE`, `PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE` | This feature flag is used to hide managed roles at various levels: account level, organization level, and project level. Existing role bindings for managed roles will still exist for users, but new role bindings with managed roles won't be allowed when the feature flag is enabled. The managed roles won't show up in the list of roles available at the respective scopes. For more information, go to [Manage Roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles/) |
