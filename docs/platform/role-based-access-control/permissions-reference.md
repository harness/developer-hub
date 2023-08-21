---
title: Permissions reference
description: Permissions reference for Harness RBAC.
sidebar_position: 120
helpdocs_topic_id: yaornnqh0z
helpdocs_category_id: 4przngb8nk
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes permissions relevant to [RBAC in Harness](./rbac-in-harness.md). For API permissions, go to the [API permissions reference](/docs/platform/Resource-Development/APIs/api-permissions-reference).

## Administrative Functions

| Resource | Permissions |
| ---  | ----------- |
| Resource Groups | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Account Settings | Available at the account [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li> View</li><li>Edit</li></ul> |
| Default Settings | <ul><li>Create/Edit</li></ul>  |
| Projects | <ul><li>View</li><li>Create</li><li>Edit</li><li>Delete</li></ul> |
| User Groups | <ul><li>View</li><li>Manage: Create, edit, and delete user groups</li></ul> |
| Service Accounts | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Manage: Create, edit, and delete API keys and tokens for service accounts</li></ul> |
| Organizations | Available at the account and org [scopes](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View</li><li>Create</li><li>Edit</li><li>Delete</li></ul> |
| Roles | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Streaming Destination | Available at the account [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Users | <ul><li>View</li><li>Manage: Edit and delete users</li><li>Invite: Add users by inviting them to Harness</li></ul> |
| Authentication Settings | Available at the account [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |

## Environment Groups

| Resource | Permissions |
| ---  | ----------- |
| Environment Groups | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Access: Can access referenced environment groups at runtime</li></ul> |

## Environments

| Resource | Permissions |
| ---  | ----------- |
| Environments | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Access: Can access referenced environments at runtime</li><li>Create FF SDK Key: Create Feature Flag environment key</li><li>Delete FF SDK Key: Delete Feature Flag environment key</li></ul> |

## Pipelines

| Resource | Permissions |
| ---  | ----------- |
| Pipelines | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Execute: Initiate pipeline runs</li></ul> |

## Services

| Resource | Permissions |
| ---  | ----------- |
| Services | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Access: Can access referenced services at runtime</li></ul> |

## Shared Resources

| Resource | Permissions |
| ---  | ----------- |
| Templates | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Access: Can access referenced templates at runtime</li><li>Copy</li></ul> |
| Governance Policies | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Deployment Freeze | <ul><li>Manage</li><li>Override</li><li>Global</li></ul> |
| Secrets | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Access: Can access referenced secrets at runtime</li></ul> |
| Connectors | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Access: Can access referenced connectors at runtime</li></ul> |
| Governance Policy Sets | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Evaluate: Can evaluate governance policy sets</li></ul> |
| Variables | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Files | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Access</li></ul> |
| Dashboards | <ul><li>View</li><li>Manage</li></ul> |
| Delegate Configurations | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Delegates | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |

## Module-specific permissions

### Chaos Engineering

| Resource | Permissions |
| ---  | ----------- |
| Chaos Infrastructure | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Chaos Gameday | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Chaos Hub | <ul><li>View: View Chaos experiments and Chaos scenarios</li><li>Create/Edit: Connect to ChaosHub Git repo</li><li>Delete: Disconnect ChaosHub Git repo</li></ul> |
| Chaos Experiment | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Execute</li></ul> |

### Cloud Cost Management

| Resource | Permissions |
| ---  | ----------- |
| Currency Preferences | <ul><li>View</li><li>Create/Edit</li></ul> |
| Overview | <ul><li>View</li></ul> |
| Cost Categories | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Folders | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Perspectives | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| AutoStopping Rules | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Budgets | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Load Balancer | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |

### Feature Flags

| Resource | Permissions |
| ---  | ----------- |
| Feature flags | <ul><li>Toggle: Turn Feature Flags on/off</li><li>Create/Edit</li><li>Delete</li></ul> |
| Target Management | <ul><li>Create/Edit: Create and edit Targets and Target Groups to control visibility of a variation of a Feature Flag</li><li>Delete: Delete Targets and Target Groups</li></ul> |

### GitOps

| Resource | Permissions |
| ---  | ----------- |
| Clusters | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Agents | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| GnuPG Keys | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Repository Certificates | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul>|
| Applications | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Sync: Deploy applications</li></ul> |
| Repositories | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |

### Service Reliability

| Resource | Permissions |
| ---  | ----------- |
| SLO | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
| Monitored Services | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Toggle: Toggle Monitored Services on/off</li></ul> |
| Downtime | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |

### Security Tests

| Resource | Permissions |
| ---  | ----------- |
| Issues | <ul><li>View</li></ul> |
| Scans | <ul><li>View</li></ul> |
| Test Targets | <ul><li>View</li><li>Create/Edit</li></ul> |
| Exemptions | <ul><li>View</li><li>Create/Edit</li><li>Approve/Reject</li></ul> |
| External Tickets | <ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> |
