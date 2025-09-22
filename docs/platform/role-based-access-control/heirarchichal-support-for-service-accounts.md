---
title: Hierarchical Support for Service Accounts
description: Steps to configure and use account-level service accounts at project level.
sidebar_position: 70
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


:::note Feature Availability
This feature is behind the `PL_ENABLE_SERVICE_ACCOUNT_HIERARCHY` feature flag. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

Service accounts can be created at a higher scope and inherited by lower scopes with the necessary permissions, eliminating the need to create separate accounts for each organization or project.

The following example shows how to use an account-level service account in a project. You can apply the same process to use account-level service accounts in organizations.

<Tabs>
<TabItem label="Interactive" value="interactive">
   <iframe src="https://app.tango.us/app/embed/d998701a-487a-4dd3-b2f2-45869a797143" 
           style={{ minHeight: '640px', width: '80%', height: '100%', border: 'none' }}
        sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
        security="restricted"
        title="Revoke Tokens in Harness"
        referrerPolicy="strict-origin-when-cross-origin"
        frameBorder="0"
        allowFullScreen
        />
</TabItem>
<TabItem label="Manual" value="manual">
### Step 1: Create account-level service account

Create a [Service Account](./add-and-manage-service-account.md#create-a-service-account) at the account level. This service account can then be inherited by organizations or projects.

### Step 2: Create project-level role and resource group

In your target project:
   - Create a [Role](./add-manage-roles.md#create-a-role) with the required permissions
   - Create a [Resource Group](./add-resource-groups.md#create-a-resource-group) defining what resources can be accessed

:::note
Roles and resource groups can only be modified at the scope where they were originally assigned. Inherited roles and resource groups are visible at lower scopes but cannot be edited there.
:::

### Step 3: Inherit and assign permissions

1. Navigate to **Project Settings** → **Access Control** → **Service Accounts**

2. Select **Inherit Service Account & Assign Roles**

3. Choose your account-level service account

4. Assign the project-level role and resource group

5. Select **Apply**

The service account is now available for this project.
</TabItem>
</Tabs>

:::note

When a service account is inherited from the account scope to a project scope, the system automatically assigns the Organization Viewer role to that service account for the organization containing the project. The role assignment is also recorded in the Audit Logs.

If this role assignment is removed, the service account may lose access to the Organization.
:::

## Benefits

- **Centralized Service Account Management**: Reduces the need to create and manage multiple service accounts for each project.

- **Simplified Permissions**: Easily manage permissions at the project level by assigning roles to service accounts created at the account or organization level.

- **Seamless Pipeline Execution**: One or more service accounts can be given the necessary permissions, if required, to execute pipelines from multiple projects.

## Additional Resources
For more information on how to manage service accounts, create roles, and assign permissions in Harness, refer to the following documentation on Harness Developer Hub:

- [Managing Service Accounts](./add-and-manage-service-account.md)

- [Creating and Managing Roles](./add-manage-roles.md)

- [Assigning Roles and Permissions](./rbac-in-harness.md)