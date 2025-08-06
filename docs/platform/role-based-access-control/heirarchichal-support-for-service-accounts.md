---
title: Hierarchical Support for Service Accounts
description: Steps to configure and use account-level service accounts at project level.
sidebar_position: 70
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Hierarchical service accounts allow you to create a service account once at a higher scope and reuse it across lower scopes with different permissions. This eliminates the need to create separate service accounts for each project.

The following example shows how to use an account-level service account in a project. You can apply the same process to use account-level service accounts in organizations.

<Tabs>
<TabItem label="Manual" value="manual">
### Step 1: Create account-level service account

Create a [Service Account](./add-and-manage-service-account.md#create-a-service-account) at the account level. This service account will be shared across multiple projects.

### Step 2: Create project-level permissions

In your target project:
   - Create a [Role](./add-manage-roles.md#create-a-role) with the required permissions
   - Create a [Resource Group](./add-resource-groups.md#create-a-resource-group) defining what resources can be accessed

### Step 3: Inherit and assign permissions

1. Navigate to **Project Settings** → **Access Control** → **Service Accounts**

2. Select **Inherit Service Account & Assign Roles**

3. Choose your account-level service account

4. Assign the project-level role and resource group

5. Select **Apply**

### Step 4: Use the service account

Your service account can now perform actions in this project based on the assigned permissions, such as executing pipelines or accessing resources.

</TabItem>
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
</Tabs>
## Benefits

- **Centralized Service Account Management**: Reduce the need to create and manage multiple service accounts for each project.

- **Simplified Permissions**: Easily manage permissions at the project level by assigning roles to account-level service accounts.

- **Seamless Pipeline Execution**: Service accounts can execute pipelines in any project without additional setup once permissions are in place.

## Additional Resources
For more information on how to manage service accounts, create roles, and assign permissions in Harness, refer to the following documentation on Harness Developer Hub:

- [Managing Service Accounts](./add-and-manage-service-account.md)

- [Creating and Managing Roles](./add-manage-roles.md)

- [Assigning Roles and Permissions](./rbac-in-harness.md)