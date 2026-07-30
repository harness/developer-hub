---
title: Attribute-based access control
description: Attribute-based access control (ABAC) is an optional RBAC extension that grants access to Harness resources based on connector and environment types.
keywords:
  - attribute-based access control
  - ABAC
  - RBAC
  - resource groups
  - connector type
  - environment type
  - access control
tags:
  - rbac
  - governance
  - access-control
sidebar_position: 40
helpdocs_topic_id: uzzjd4fy67
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

Attribute-based access control (ABAC) grants access to Harness resources based on attributes associated with those resources, such as connector type or environment type. ABAC is an optional extension of <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">Role-based access control (RBAC)</a> that uses attribute-based rules to grant access in the context of specific actions. Use ABAC to refine <a href="/docs/platform/role-based-access-control/manage-resource-groups" target="_blank">resource groups</a> with an additional dimension of control.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- Understand [how ABAC works](#how-abac-works) and when to use it to extend RBAC.
- [Configure ABAC](#configure-abac) on a resource group.
- Follow the [next steps](#next-steps) to combine roles with ABAC-enhanced resource groups and complete your RBAC setup.

---

## Before you begin

Before you configure ABAC, ensure you have the following:

- **Harness account access**: **Admin** permissions for the account, organization, or project where you configure ABAC.
- **RBAC knowledge**: Familiarity with roles and resource groups. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to know how roles and resource groups grant access.
- **Existing resource group**: A resource group to refine, or permissions to create one. Go to <a href="/docs/platform/role-based-access-control/manage-resource-groups" target="_blank">Manage resource groups</a> to manage existing resource groups.

---

## How ABAC works

RBAC is role-based, which means permissions and access to resources are determined by the roles assigned to users, user groups, and service accounts. ABAC adds a dimension to this model by granting access based on the type of a resource rather than a specific named resource.

ABAC can help you:

- **Simplify management**: Manage role bindings at scale with fewer, broader rules.
- **Refine access**: Provide more fine-grained access control.
- **Reduce overhead**: Reduce the number of role bindings you need to manage.
- **Add business meaning**: Leverage attributes with specific business meanings.

ABAC adds the dimensions of <a href="/docs/category/connectors" target="_blank">connector</a> and <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview" target="_blank">environment</a> types to refine resource groups. For example:

- Grant access to manage pre-production environments but not other types of environments.
- Grant access to manage code repository connectors but not other types of connectors.

---

## Configure ABAC

Configure ABAC on a resource group to scope access by connector and environment type. You configure ABAC while you create or edit a resource group.

1. <a href="/docs/platform/role-based-access-control/manage-resource-groups" target="_blank">Create or edit a resource group</a>.

2. For **Resources**, select **Specified**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/set-up-rbac-pipelines-42.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. Select **Environments** and/or **Connectors**.

   ABAC is available for environments and connectors only. These steps focus on configuring ABAC; however, your resource groups can include other resource categories. Go to <a href="/docs/platform/role-based-access-control/manage-resource-groups" target="_blank">Manage resource groups</a> to configure other resource categories.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/attribute-based-access-control-05.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. To apply ABAC to **Connectors** or **Environments**, select **By Type**, and then click **Add**.

   For information about the **All** and **Specified** options, go to <a href="/docs/platform/role-based-access-control/manage-resource-groups" target="_blank">Manage resource groups</a>.

   ABAC is in addition to the **Resource Scope**. For example, if the **Resource Scope** is **Project Only**, and you select connectors **By Type**, then the resource group includes all connectors of the selected types that are in the specified project only. Go to <a href="/docs/platform/role-based-access-control/manage-resource-groups#scopes-and-refinement" target="_blank">scopes and refinement</a> for more information on how scope and ABAC interact.

5. Select the types to include, and then click **Add**.

   For **Environments**, you can choose **Production** or **Pre-Production**.

   For **Connectors**, you can choose one or more of the following Harness connector types: **Artifact Repositories**, **Cloud and AI Costs**, **Cloud Providers**, **Code Repositories**, **Communication Tools**, **Documentation**, **Monitoring and Logging Systems**, **Secret Managers**, and **Ticketing Systems**.

6. Click **Save**.

---

## Next steps

Pair your ABAC resource group with a role, then assign both to your users. Because ABAC applies to environments and connectors, choose a role that includes environment or connector permissions.

- <a href="/docs/platform/role-based-access-control/configure-rbac" target="_blank">Configure RBAC in Harness</a>: Complete the end-to-end workflow that ties resource groups, roles, and assignments together.
- <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank">Roles</a>: Create the role that grants the environment and connector permissions your ABAC resource group needs.

After you configure roles and resource groups, assign them to:

- <a href="/docs/platform/role-based-access-control/add-users" target="_blank">Users</a>
- <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">User groups</a>
- <a href="/docs/platform/role-based-access-control/add-and-manage-service-account" target="_blank">Service accounts</a>
