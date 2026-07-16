---
title: Platform Resource Limits
description: Learn about the platform resource limits applied in the Harness Platform.
sidebar_position: 31
---

The Harness Platform enforces limits at account level to ensure optimal performance and system stability. These limits help manage resources and ensure that accounts operate within defined thresholds.

:::info  

- Account limits define the maximum number of specific resources or entities that can be created under a particular account. Once the limits are reached, no additional entities can be created. 

- You can configure alerts to get notified as you approach your usage limits. Harness supports email notifications for platform usage and license limits, allowing you to take action before limits are reached. For more information on setting up these alerts, see [Emails for Platform Limit Alerts](/docs/docs/platform/notifications/notifications-overview#emails-for-platform-limit-alerts).

**Note**: The resource limits displayed here represent default platform limits. These are not hard restrictions. If your requirements exceed these defaults, please contact [Harness Support](mailto:support@harness.io) to discuss adjustments tailored to your needs.
:::

Harness account limits for different license types are specified below:

| Resource                                                                                                      | Resource variable name      | Free | Essentials | Enterprise |
|---------------------------------------------------------------------------------------------------------------|-----------------------------|------|------------|------------|
| [Organizations](/docs/platform/get-started/key-concepts#organizations) | MULTIPLE_ORGANIZATIONS      | 1    | 1          | 5,000      |
| [Projects](/docs/platform/get-started/key-concepts#projects)            | MULTIPLE_PROJECTS           | 100  | 12,500     | 12,500     |
| [Secrets](/docs/platform/secrets/add-use-text-secrets)                                                        | MULTIPLE_SECRETS            | 100  | 250,000    | 250,000    |
| [User Groups](/docs/platform/role-based-access-control/add-user-groups)                                       | MULTIPLE_USER_GROUPS        | 100  | 50,000     | 50,000     |
| [Users](/docs/platform/role-based-access-control/add-users)                                                   | MULTIPLE_USERS              | 100  | 500        | 90,000     |
| [Service Accounts](/docs/platform/role-based-access-control/add-and-manage-service-account)                   | MULTIPLE_SERVICE_ACCOUNTS   | 100  | 6,000      | 6,000      |
| [Variables](/docs/platform/variables-and-expressions/add-a-variable)                                          | MULTIPLE_VARIABLES          | 100  | 90,000     | 90,000     |
| [API Keys](/docs/platform/automation/api/add-and-manage-api-keys/)                                            | MULTIPLE_API_KEYS           | 100  | 6,000      | 6,000      |
| [API Tokens](/docs/platform/automation/api/add-and-manage-api-keys/)                                          | MULTIPLE_API_TOKENS         | 100  | 6,000      | 6,000      |
| [Connectors](/docs/platform/connectors/create-a-connector-using-yaml)                                         | MULTIPLE_CONNECTORS         | 100  | 75,000     | 75,000     |
| [Secret Managers](/docs/platform/secrets/secrets-management/harness-secret-manager-overview)                  | SECRET_MANAGERS             | N/A    | 16,000     | 16,000     |
| [Roles](/docs/platform/role-based-access-control/add-manage-roles)                                            | CUSTOM_ROLES                | N/A    | 5          | 21,000     |
| [Resource Groups](/docs/platform/role-based-access-control/add-resource-groups)                               | CUSTOM_RESOURCE_GROUPS      | N/A    | 15,000     | 15,000     |
| [Audit Streaming](/docs/platform/governance/audit-trail/audit-streaming/#add-a-streaming-destination)         | AUDIT_STREAMING_DESTINATION | 15   | 100        | 100        |
| [Role Assignments](/docs/platform/role-based-access-control/add-manage-roles)                                 | ROLE_ASSIGNMENT             | 100  | 95,000     | 95,000     |
| Data Sinks                                                                                                    | DATA_SINK                   | N/A    | 1          | 10         |
| [Triggers](/docs/platform/triggers/triggers-overview)                                                         | MAX_TRIGGER_CREATION_LIMIT  | 10,000 | 10,000   | 10,000     |

---

## Resource group constraints

Resource groups have additional constraints that apply regardless of license type. These are hard limits that cannot be increased, as they impact overall platform stability.

| Constraint                                                                                     | Limit | Notes                                                                                                                                                      |
|------------------------------------------------------------------------------------------------|-------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource identifiers per resource type in a ResourceGroup        | 1,300 | Maximum number of identifiers allowed for each individual resource type within a ResourceGroup. Exceeding this limit will result in an error during creation. |
| Scopes per resource group (specific organization and project selection)                        | 75    | Maximum number of scopes (organization/project combinations) that can be defined when creating a resource group with specific org and project selections.          |

These resource group limits are fixed and cannot be adjusted. If you need to include more resources:

- **For resource type identifiers:** Use the "All" option for resource selection, or split resources across multiple resource groups.
- **For scopes:** Use broader selections (such as "All Organizations" or "All Projects") instead of specifying individual scopes, or create multiple resource groups with different scope combinations.

---

## Limit increase requests

If your usage patterns require higher limits than the defaults, contact [Harness Support](mailto:support@harness.io) with the following information:

- **Account Identifier**: Your Harness account ID
- **Resource Type**: Which limit you need to increase (for example, triggers, pipelines, connectors)
- **Current Usage**: How many resources you currently have
- **Requested Limit**: The new limit you're requesting
- **Business Justification**: Why you need the higher limit

Harness will review your request and respond.

:::info Note 
Harness reserves the right to modify these limits at any time to ensure platform stability and resource management. 
:::
