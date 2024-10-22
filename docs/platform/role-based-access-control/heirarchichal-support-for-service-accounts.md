---
title: Hierarchical Support for Service Accounts
description: Steps to configure and use account-level service accounts at project level.
sidebar_position: 70
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness now allows you to create Service Accounts at the account level and use them at the project level without needing to create additional service accounts for each project. This feature simplifies Service Account management and ensures efficient pipeline execution across different projects.

## Steps to Configure and Use Account-Level Service Accounts for Project-Level Pipelines

1. Create a Service Account at the [Account Level](./add-and-manage-service-account.md#create-a-service-account)

2. Generate an [API Key](./add-and-manage-service-account.md#manage-api-keys) for the Service Account

3. Create a [Role](./add-manage-roles.md#create-a-role) with the necessary permissions at the Project Level

4. Create a [Resource Group](./add-resource-groups.md#create-a-resource-group) at the Project Level

5. Assign the Role and Resource Group to the Service Account at the Project Level

   - Using the [Role Assignment API](https://apidocs.harness.io/tag/Role-Assignments#operation/postRoleAssignments), assign the created role to the service account. You need to create the role assignment at the project level, granting the service account permission to execute the pipelines in the resource group.

      Here’s an example payload for the role assignment:
      ```json
      {
         "roleAssignments": [
            {
               "resourceGroupIdentifier": "resource_group_identifier",
               "roleIdentifier": "role_identifier",
               "principal": {
                  "scopeLevel": "account",
                  "identifier": "service_account_identifier",
                  "type": "SERVICE_ACCOUNT"
               }
            }
         ]
      }
      ```
      `resourceGroupIdentifier`: The identifier for the resource group that includes the pipelines.
      `roleIdentifier`: The identifier for the role that grants the "Pipeline Execute" permission.
      `principal`: The service account at the account level to which you're assigning the role.
      `scopeLevel`: The scope at which the principal exists. In this case, it's at the account level.

6. Execute the Pipeline Using the Service Account.
After assigning the role, you can now use the [Pipeline Execution API](https://apidocs.harness.io/tag/Pipeline-Execution#operation/execute-pipeline) to execute the pipelines in the specified resource group. Pass the service account’s `API key` as the `x-api-key` header in your API request.

## Benefits

- **Centralized Service Account Management**: Reduce the need to create and manage multiple service accounts for each project.

- **Simplified Permissions**: Easily manage permissions at the project level by assigning roles to account-level service accounts.

- **Seamless Pipeline Execution**: Service accounts can execute pipelines in any project without additional setup once permissions are in place.

## Additional Resources
For more information on how to manage service accounts, create roles, and assign permissions in Harness, refer to the following documentation on Harness Developer Hub:

- [Managing Service Accounts](./add-and-manage-service-account.md)

- [Creating and Managing Roles](./add-manage-roles.md)

- [Assigning Roles and Permissions](./rbac-in-harness.md)