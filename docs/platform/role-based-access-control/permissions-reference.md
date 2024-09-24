---
title: Permissions reference
description: Permissions reference for Harness RBAC.
sidebar_position: 120
helpdocs_topic_id: yaornnqh0z
helpdocs_category_id: 4przngb8nk
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes permissions relevant to [RBAC in Harness](./rbac-in-harness.md). For API permissions, go to the [API permissions reference](/docs/platform/automation/api/api-permissions-reference).

## Administrative Functions

| Resource | Permissions |
| ---  | ----------- |
| Resource Groups | <ul><li>View (`core_resourcegroup_view`)</li><li>Create/Edit (`core_resourcegroup_edit`)</li><li>Delete (`core_resourcegroup_delete`)</li></ul> |
| Account Settings | Available at the account [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li> View (`core_setting_view`)</li><li>Edit (`core_setting_edit`)</li></ul> |
| Default Settings | <ul><li>Create/Edit</li></ul>  |
| Projects | <ul><li>View (`core_project_view`)</li><li>Create (`core_project_create`)</li><li>Edit (`core_project_edit`)</li><li>Delete (`core_project_delete`)</li></ul> |
| User Groups | <ul><li>View (`core_usergroup_view`)</li><li>Manage: Create, edit, and delete user groups (`core_usergroup_manage`)</li></ul> |
| Service Accounts | <ul><li>View (`core_serviceaccount_view`)</li><li>Create/Edit (`core_serviceaccount_edit`)</li><li>Delete (`core_serviceaccount_delete`)</li><li>Manage: Create, edit, and delete API keys and tokens for service accounts (`core_serviceaccount_manageapikey`)</li></ul> |
| Organizations | Available at the account and org [scopes](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_organization_view`)</li><li>Create (`core_organization_create`)</li><li>Edit (`core_organization_edit`)</li><li>Delete (`core_organization_delete`)</li></ul> |
| Roles | <ul><li>View (`core_role_view`)</li><li>Create/Edit (`core_role_edit`)</li><li>Delete (`core_role_delete`)</li></ul> |
| Streaming Destination | Available at the account [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_streamingDestination_view`)</li><li>Create/Edit (`core_streamingDestination_edit`)</li><li>Delete (`core_streamingDestination_delete`)</li></ul> |
| Users | <ul><li>View (`core_user_view`)</li><li>Manage: Edit and delete users (`core_user_manager`)</li><li>Invite: Add users by inviting them to Harness (`core_user_invite`)</li></ul> |
| Authentication Settings | Available at the account [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_authsetting_view`)</li><li>Create/Edit (`core_authsetting_edit`)</li><li>Delete (`core_authsetting_delete`)</li></ul> |

## Environment Groups

| Resource | Permissions |
| ---  | ----------- |
| Environment Groups | <ul><li>View (`core_environmentgroup_view`)</li><li>Create/Edit (`core_environmentgroup_edit`)</li><li>Delete (`core_environmentgroup_delete`)</li><li>Access: Can access referenced environment groups at runtime (`core_environmentgroup_access`)</li></ul> |

## Environments

| Resource | Permissions |
| ---  | ----------- |
| Environments | <ul><li>View (`core_environment_view`)</li><li>Create/Edit (`core_environment_edit`)</li><li>Delete (`core_environment_delete`)</li><li>Access: Can access referenced environments at runtime (`core_environment_access`)</li><li>View FF SDK Key: View Feature Flag environment key (`ff_environment_apiKeyView`) </li><li>Create FF SDK Key: Create Feature Flag environment key (`ff_environment_apiKeyCreate`)</li><li>Delete FF SDK Key: Delete Feature Flag environment key (`ff_environment_apiKeyDelete`)</li></ul> |

## Pipelines

| Resource | Permissions |
| ---  | ----------- |
| Pipelines | <ul><li>View</li><li>Create/Edit (`core_pipeline_edit`)</li><li>Delete (`core_pipeline_delete`)</li><li>Execute: Initiate pipeline runs (`core_pipeline_execute`)</li><li>Abort Pipeline (`core_pipeline_abort`)</li></ul> |

## Services

| Resource | Permissions |
| ---  | ----------- |
| Services | <ul><li>View (`core_service_view`)</li><li>Create/Edit (`core_service_edit`)</li><li>Delete (`core_service_delete`)</li><li>Access: Can access referenced services at runtime (`core_service_access`)</li></ul> |

## Shared Resources

| Resource | Permissions |
| ---  | ----------- |
| Templates | <ul><li>View (`core_template_view`)</li><li>Create/Edit (`core_template_edit`)</li><li>Delete (`core_template_delete`)</li><li>Access: Can access referenced templates at runtime (`core_template_access`)</li><li>Copy (`core_template_copy`)</li></ul> |
| Deployment Freeze | <ul><li>Manage (`core_deploymentfreeze_manager`)</li><li>Override (`core_deploymentfreeze_override`)</li><li>Global (`global`)</li></ul> |
| Secrets | <ul><li>View (`core_secret_view`)</li><li>Create/Edit (`core_secret_edit`)</li><li>Delete (`core_secret_delete`)</li><li>Access: Can access referenced secrets at runtime (`core_secret_access`)</li></ul> |
| Connectors | <ul><li>View (`core_connector_view`)</li><li>Create/Edit (`core_connector_edit`)</li><li>Delete (`core_connector_delete`)</li><li>Access: Can access referenced connectors at runtime (`core_connector_access`)</li></ul> |
| Variables | <ul><li>View (`core_variable_view`)</li><li>Create/Edit (`core_variable_edit`)</li><li>Delete (`core_variable_delete`)</li></ul> |
| Files | <ul><li>View (`core_file_view`)</li><li>Create/Edit (`core_file_edit`)</li><li>Delete (`core_file_delete`)</li><li>Access (`core_file_access`)</li></ul> |
| Dashboards | <ul><li>View (`core_dashboards_view`)</li><li>Manage (`core_dashboards_edit`)</li></ul> |
| Delegate Configurations | <ul><li>View (`core_delegateconfiguration_view`)</li><li>Create/Edit (`core_delegateconfiguration_edit`)</li><li>Delete (`core_delegateconfiguration_delete`)</li></ul> |
| Delegates | <ul><li>View (`core_delegate_view`)</li><li>Create/Edit (`core_delegate_edit`)</li><li>Delete (`core_delegate_delete`)</li></ul> |

## Policies

| Resource | Permissions |
| ---  | ----------- |
| Governance Policies | <ul><li>View (`core_governancePolicy_view`)</li><li>Edit (`core_governancePolicy_edit`)</li><li>Create (`core_governancePolicy_create`)</li><li>Delete (`core_governancePolicy_delete`)</li></ul> |
| Governance Policy Sets | <ul><li>View (`core_governancePolicySets_view`)</li><li>Edit (`core_governancePolicySets_edit`)</li><li>Create (`core_governancePolicySets_create`)</li><li>Delete (`core_governancePolicySets_delete`)</li><li>Evaluate (`core_governancePolicySets_evaluate`)</li></ul> |

## Discovery

| Resource | Permissions |
| ---  | ----------- |
| Network Map | <ul><li>View (`servicediscovery_networkmap_view`)</li><li>Create (`servicediscovery_networkmap_create`)</li><li>Edit (`servicediscovery_networkmap_edit`)</li><li>Delete (`servicediscovery_networkmap_delete`)</li></ul> |

## Supply Chain Assurance

| Resource | Permissions |
| ---  | ----------- |
| Remediation Tracker | <ul><li>View (`ssca_remediationtracker_view`)</li><li>Create/Edit (`ssca_remediationtracker_edit`)</li><li>Close (`ssca_remediationtracker_close`)</li></ul> |

## Webhooks

| Resource | Permissions |
| ---  | ----------- |
| Webhooks | <ul><li>View (`core_gitxWebhooks_view`)</li><li>Create/Edit (`core_gitxWebhooks_edit`)</li><li>Delete (`core_gitxWebhooks_delete`)</li></ul> |

## Module-specific permissions

### Chaos Engineering

| Resource | Permissions |
| ---  | ----------- |
| Chaos Infrastructure | <ul><li>View (`chaos_chaosinfrastructure_view`)</li><li>Create/Edit (`chaos_chaosinfrastructure_edit`)</li><li>Delete (`chaos_chaosinfrastructure_delete`)</li></ul> |
| Chaos Gameday | <ul><li>View (`chaos_chaosgameday_view`)</li><li>Create/Edit (`chaos_chaosgameday_edit`)</li><li>Delete (`chaos_chaosgameday_delete`)</li></ul> |
| Chaos Hub | <ul><li>View: View Chaos experiments and Chaos scenarios (`chaos_chaoshub_view`)</li><li>Create/Edit: Connect to ChaosHub Git repo (`chaos_chaoshub_edit`)</li><li>Delete: Disconnect ChaosHub Git repo (`chaos_chaoshub_delete`)</li></ul> |
| Chaos Experiment | <ul><li>View (`chaos_chaosexperiment_view`)</li><li>Create/Edit (`chaos_chaosexperiment_edit`)</li><li>Delete (`chaos_chaosexperiment_delete`)</li><li>Execute (`chaos_chaosexperiment_execute`)</li></ul> |

### Cloud Cost Management

| Resource | Permissions |
| ---  | ----------- |
| Currency Preferences | <ul><li>View (`ccm_currencyPreference_view`)</li><li>Create/Edit (`ccm_currencyPreference_edit`)</li></ul> |
| Overview | <ul><li>View (`ccm_overview_view`)</li></ul> |
| Cost Categories | <ul><li>View (`ccm_costCategory_view`)</li><li>Create/Edit (`ccm_costCategory_edit`)</li><li>Delete (`ccm_costCategory_delete`)</li></ul> |
| Folders | <ul><li>View (`ccm_folder_view`)</li><li>Create/Edit (`ccm_folder_edit`)</li><li>Delete (`ccm_folder_delete`)</li></ul> |
| Perspectives | <ul><li>View (`ccm_perspective_view`)</li><li>Create/Edit (`ccm_perspective_edit`)</li><li>Delete (`ccm_perspective_delete`)</li></ul> |
| AutoStopping Rules | <ul><li>View (`ccm_autoStoppingRule_view`)</li><li>Create/Edit (`ccm_autoStoppingRule_edit`)</li><li>Delete (`ccm_autoStoppingRule_delete`)</li></ul> |
| Budgets | <ul><li>View (`ccm_budget_view`)</li><li>Create/Edit (`ccm_budget_edit`)</li><li>Delete (`ccm_budget_delete`)</li></ul> |
| Load Balancer | <ul><li>View (`ccm_loadBalancer_view`)</li><li>Create/Edit (`ccm_loadBalancer_edit`)</li><li>Delete (`ccm_loadBalancer_delete`)</li></ul> |

### Code Repository

| Resource | Permissions |
| ---  | ----------- |
| Repository | <ul><li>View (`code_repo_view`)</li><li>Create/Edit (Create repositories and edit repository settings, such as descriptions, webhooks, and rules) (`code_repo_edit`)</li><li>Delete (`code_repo_delete`)</li><li>Push (Repository contributor permissions, such as committing, pushing, creating/deleting branches, creating/deleting tags) (`code_repo_push`)</li><li>Report commit check : Report a Status Check Result on a Commit (`code_repo_reportCommitCheck`)</li><li>Review PR: Review Pull Requests in a Code Repository (`code_repo_review`)</li></ul> |

### Feature Flags

| Resource | Permissions |
| ---  | ----------- |
| Feature flags | <ul><li>View (`ff_featureflag_view`)</li><li>Toggle: Turn Feature Flags on/off (`ff_featureflag_toggle`)</li><li>Create/Edit Flag (`ff_featureflag_edit`)</li> <li>Edit Rule (`ff_featureflag_rulesEdit`)</li> <li>Edit Configuration (`ff_featureflag_configEdit`)</li><li>Delete (`ff_featureflag_delete`)</li></ul>|
| Target Management | <ul><li>View: View Targets and Target Groups (`ff_targetgroup_view`)</li><li>Create/Edit: Create and edit Targets and Target Groups to control visibility of a variation of a Feature Flag (`ff_targetgroup_edit`)</li><li>Delete: Delete Targets and Target Groups (`ff_targetgroup_delete`)</li></ul> |

### GitOps

| Resource | Permissions |
| ---  | ----------- |
| Clusters | <ul><li>View (`gitops_cluster_view`)</li><li>Create/Edit (`gitops_cluster_edit`)</li><li>Delete (`gitops_cluster_delete`)</li></ul> |
| Agents | <ul><li>View (`gitops_agent_view`)</li><li>Create/Edit (`gitops_agent_edit`)</li><li>Delete (`gitops_agent_delete`)</li></ul> |
| GnuPG Keys | <ul><li>View (`gitops_gpgkey_view`)</li><li>Create/Edit (`gitops_gpgkey_edit`)</li><li>Delete (`gitops_gpgkey_delete`)</li></ul> |
| Repository Certificates | <ul><li>View (`gitops_gpgkey_view`)</li><li>Create/Edit (`gitops_gpgkey_edit`)</li><li>Delete (`gitops_gpgkey_delete`)</li></ul>|
| Applications | <ul><li>View (`gitops_application_view`)</li><li>Create/Edit (`gitops_application_edit`)</li><li>Delete (`gitops_application_delete`)</li><li>Sync: Deploy applications (`gitops_application_sync`)</li></ul> |
| Repositories | <ul><li>View (`gitops_repository_view`)</li><li>Create/Edit (`gitops_repository_edit`)</li><li>Delete (`gitops_repository_delete`)</li></ul> |

### Infrastructure as Code

| Resource | Permissions |
| ---  | ----------- |
| IACM Workspaces | <ul><li>View (`iac_workspace_view`)</li><li>Create/Edit (`iac_workspace_edit`)</li><li>Delete (`iac_workspace_delete`)</li><li>Create/Edit Variables (`iac_workspace_editvariable`)</li><li>Delete Variables (`iac_workspace_deletevariable`)</li><li>Approve (`iac_workspace_approve`)</li><li>Access State (`iac_workspace_accessstate`)</li></ul> |

### Service Reliability

| Resource | Permissions |
| ---  | ----------- |
| SLO | <ul><li>View (`chi_slo_view`)</li><li>Create/Edit (`chi_slo_edit`)</li><li>Delete (`chi_slo_delete`)</li></ul> |
| Monitored Services | <ul><li>View (`chi_monitoredservice_view`)</li><li>Create/Edit (`chi_monitoredservice_edit`)</li><li>Delete (`chi_monitoredservice_delete`)</li><li>Toggle: Toggle Monitored Services on/off (`chi_monitoredservice_toggle`)</li></ul> |
| Downtime | <ul><li>View (`chi_downtime_view`)</li><li>Create/Edit (`chi_downtime_edit`)</li><li>Delete (`chi_downtime_delete`)</li></ul> |

### Security Tests

| Resource | Permissions |
| ---  | ----------- |
| Issues | <ul><li>View (`sto_issue_view`)</li></ul> |
| Scans | <ul><li>View (`sto_scan_view`)</li></ul> |
| Test Targets | <ul><li>View (`sto_testtarget_view`)</li><li>Create/Edit (`sto_testtarget_edit`)</li></ul> |
| Exemptions | <ul><li>View (`sto_exemption_view`)</li><li>Create/Edit (`sto_exemption_edit`)</li><li>Approve/Reject (`sto_exemption_approve`)</li></ul> |
| External Tickets | <ul><li>View (`sto_ticket_view`)</li><li>Create/Edit (`sto_ticket_edit`)</li><li>Delete (`sto_ticket_delete`)</li></ul> |

### Internal Developer Portal

| Resource                | Permissions                                                              |
|-------------------------|--------------------------------------------------------------------------|
| Plugins                 | <ul><li>View (`idp_plugin_view`)</li><li>Create/Edit (`idp_plugin_edit`)</li><li>Toggle (`idp_plugin_toggle`)</li><li>Delete (`idp_plugin_delete`)</li></ul> |
| Scorecards              | <ul><li>View (`idp_scorecard_view`)</li><li>Create/Edit (`idp_scorecard_edit`)</li><li>Delete (`idp_scorecard_delete`)</li></ul>                |
| Layouts                 | <ul><li>View (`idp_layout_view`)</li><li>Create/Edit (`idp_layout_edit`)</li></ul>                               |
| Catalog Access Policies | <ul><li>View (`idp_catalogaccesspolicy_view`)</li><li>Create (`idp_catalogaccesspolicy_create`)</li><li>Edit (`idp_catalogaccesspolicy_edit`)</li><li>Delete (`idp_catalogaccesspolicy_delete`)</li></ul>                |
| Integrations            | <ul><li>View (`idp_integration_view`)</li><li>Create (`idp_integration_create`)</li><li>Edit (`idp_integration_edit`)</li><li>Delete (`idp_integration_delete`)</li></ul>        |
| Advanced Configurations | <ul><li>View (`idp_advancedconfiguration_view`)</li><li>Create/Edit (`idp_advancedconfiguration_edit`)</li><li>Delete (`idp_advancedconfiguration_delete`)</li></ul>                |

### Continuous Error Tracking

| Resource | Permissions |
| ---  | ----------- |
| Tokens | <ul><li>View (`cet_token_view`)</li><li>Create/Edit (`cet_token_create`)</li><li>Revoke (`cet_token_revoke`)</li></ul> |
| Critical Events | <ul><li>View (`cet_criticalevent_view`)</li><li>Create/Edit (`cet_criticalevent_create`)</li><li>Delete (`cet_criticalevent_delete`)</li></ul> |
| Agents | <ul><li>View (`cet_agents_view`)</li></ul> |

