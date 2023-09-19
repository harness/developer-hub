---
title: What's supported by Harness Platform
description: Technologies supported by Harness Platform
sidebar_label: What's supported
sidebar_position: 1
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This topic lists the supported Harness Platform features and integrations you can use for deploying and verifying your apps.

For a comprehensive list that includes all Harness modules, go to [Supported platforms and technologies](/docs/get-started/supported-platforms-and-technologies.md).

```mdx-code-block
  <Tabs>
  


  <TabItem value="Git Experience" label="Git Experience">
```

import Gitxsup from '/docs/get-started/shared/gitx-whats-supported.md'

<Gitxsup />

```mdx-code-block
  </TabItem>
  <TabItem value="AuthN" label="AuthN">
```

import Authsup from '/docs/get-started/shared/auth-supported.md'

<Authsup />

```mdx-code-block
  </TabItem>
  <TabItem value="Accounts/Orgs/Projects/Other resources" label="Accounts Orgs Projects">
```

The Harness Platform is structured hierarchically with three levels of access: Account, Organization (Org), and Project. Each level can have its own set of permissions configured, allowing for delegation of responsibilities to various teams. This approach facilitates efficient organization and management of resources, enabling granular access control that is both scalable and easy to manage.


### Scopes

The Account scope is the highest level. It is your Harness account, and it encompasses all the resources within your Harness subscription.

The Organization scope encompasses projects, resources, and users in a specific domain or business unit. This allows for the management of resources and permissions unique to an organization, separate from other areas of the account.

The Project scope contains related resources, such as apps, pipelines, and environments. This allows for the management of resources and permissions specific to a particular project, separate from the larger org (business unit) and account.

The scope at which you create resources depends on the level of control and visibility you require. For example, if you create a connector at the account scope, it is available to all organizations and projects within the account. However, if you create a connector at the organization scope, it is only available to that organization and any projects under that organization. It is not available at the account scope or to other organizations. This lets you control access to your resources more effectively and prevent unauthorized access.

To learn about organizations and projects, go to [Create organizations and projects](/docs/platform/organizations-and-projects/create-an-organization/).

### Resources across scopes

The following table lists the resources that are available at various scopes in Harness:

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
| **Audit Trail** | Yes | Yes | Yes |
| **Delegates** | Yes | Yes | Yes |
| **Governance** | Yes | Yes | Yes |


```mdx-code-block
  </TabItem>
  <TabItem value="Delegates" label="Delegates">
```

import Delimagetypes from '/docs/platform/delegates/shared/delegate-image-types-intro-table.md'

<Delimagetypes />

- [Deploy delegate on Kubernetes](/docs/platform/Delegates/install-delegates/overview)

- [Deploy delegate on Docker](/docs/platform/Delegates/install-delegates/overview)

- Install delegate minimal image without SDKs

- [Install delegate maximal image without certified SDKs](/docs/get-started/supported-platforms-and-technologies/#sdks-installed-with-harness-delegate)


```mdx-code-block
  </TabItem>
  <TabItem value="Notifications" label="Notifications">
```

Notifications are used to alert your team of new, resurfaced, or critical events. With notifications, you can ensure your team is aware of important events that require action.

Harness Platform supports the following notification methods.

- [Slack](/docs/platform/notifications/send-notifications-using-slack/)
- [Email](/docs/platform/notifications/add-smtp-configuration)
- [Microsoft Teams](/docs/platform/notifications/send-notifications-to-microsoft-teams).
- PagerDuty
- Webhook


```mdx-code-block
  </TabItem>
  <TabItem value="Secret management" label="Secrets Mgmt">
```

import Secretmgmtsup from '/docs/get-started/shared/secret-management-supported.md'

<Secretmgmtsup />


```mdx-code-block
  </TabItem>
  <TabItem value="Access Control" label="Access Control">
```

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

- Ensure users can only access the information and resources necessary to perform their tasks. This reduces the risk of security breaches and unauthorized access to sensitive data.
- Create systematic, repeatable permissions assignments. RBAC saves time and increases efficiency for administrators who otherwise have to manage access for individual user accounts. You can quickly add and change roles, as well as implement them across APIs.
- Increase accountability by clearly defining who has access to which resources and information. This makes it easier to track and audit user activities, helping to identify and prevent misuse or abuse of access privileges.
- Comply more effectively with regulatory and statutory requirements for confidentiality and privacy. It helps you enforce privacy and data protection policies.
- Provision users and groups with SCIM - System for Cross-Domain Identity Management (SCIM) is an open standard protocol for automated user provisioning. In Harness, automated provisioning involves creating users and user groups, assigning users to groups, and managing some user attributes (such as names and email addresses). In addition to creating users and groups, automated provisioning also edits and removes users and user groups as and when required.

   - [Okta (SCIM)](/docs/platform/role-based-access-control/provision-users-with-okta-scim/)
   - [Azure AD (SCIM)](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim/)
   - [OneLogin (SCIM)](/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim/)

- Use just-in-time (JIT) user provisioning: Automated provisioning eliminates repetitive tasks related to manual provisioning and simplifies user management.

   JIT provisioning in Harness lets you provision users automatically when they first sign-in to Harness through SAML SSO. Harness supports JIT provisioning only for new users logging in through an IdP, such as Okta.

```mdx-code-block
  </TabItem>
  <TabItem value="Self-Managed Enterprise Edition" label="Self-Managed EE">
```

import Smp from '/docs/self-managed-enterprise-edition/shared/smp-supported-platforms.md';

<Smp />

```mdx-code-block
  </TabItem>
</Tabs>
```
