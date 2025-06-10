---
title: Permissions reference
description: Permissions reference for Harness RBAC.
sidebar_position: 120
helpdocs_topic_id: yaornnqh0z
helpdocs_category_id: 4przngb8nk
helpdocs_is_private: false
helpdocs_is_published: true
---


:::danger Breaking Changes 
   **Introducing a new set of permissions, while marking existing DEPRECATED permissions as INACTIVE.**  

    Currently, **Notification Rules** and **Notification Channels** are governed by a single set of permissions:

    | **Resource**                                      | **Permissions**                                                                                                              | **Current status** | **New status** |
    |---------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|--------------------|----------------|
    | **Notifications Rules and Notification Channels** | <li>View (`core_notification_view`)</li><li>Edit (`core_notification_edit`)</li><li>Delete (`core_notification_delete`)</li> | DEPRECATED             | INACTIVE     |


    However, starting from June 12, 2025, these permissions will become non-operational. They will be replaced with separate new permissions: 

    | **Resource**              | **New Permissions**                                                                                                                               | **Current status** | **New status** |
    |---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|----------------|
    | **Notification Rules**    | <li>View (`core_notificationrule_view`)</li><li>Edit (`core_notificationrule_edit`)</li><li>Delete (`core_notificationrule_delete`)</li>          | EXPERIMENTAL       | ACTIVE         |
    | **Notification Channels** | <li>View (`core_notificationchannel_view`)</li><li>Edit (`core_notificationchannel_edit`)</li><li>Delete (`core_notificationchannel_delete`)</li> | EXPERIMENTAL       | ACTIVE         |


    If any automation relies on these `core_notification_view/edit/delete` permissions, we recommend updating them accordingly.

    **Note:** The existing legacy notification permissions are DEPRECATED and will soon be moved to an INACTIVE state. The new permissions will be released in the ACTIVE state with RBAC enforced.
:::


This topic describes permissions relevant to [RBAC in Harness](./rbac-in-harness.md). For API permissions, go to the [API permissions reference](/docs/platform/automation/api/api-permissions-reference).

:::note
    **Types of Permission**:

        | **Status**       | **Description**                                               |
        |------------------|---------------------------------------------------------------|
        | **EXPERIMENTAL** | Available for role assignment but RBAC will not be enforced, that is the access checks always return true. |
        | **ACTIVE**       | Available for role assignment with RBAC enforced.                                  |
        | **DEPRECATED**   | Available for role assignment with RBAC enforced but the permission will be moved to the INACTIVE state after some time.  |
        | **INACTIVE**     | No longer supported and access checks always return true.                              |
        
:::

## Administrative Functions

| Resource | Permissions | Status |
| --- | --- | --- |
| Resource Groups | <ul><li>View (`core_resourcegroup_view`)</li><li>Create/Edit (`core_resourcegroup_edit`)</li><li>Delete (`core_resourcegroup_delete`)</li></ul> | Active |
| Account Settings | Available at the account [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_setting_view`)</li><li>Edit (`core_setting_edit`)</li></ul> | Active |
| Default Settings | <ul><li>Create/Edit</li></ul> | Active |
| Projects | <ul><li>View (`core_project_view`)</li><li>Create (`core_project_create`)</li><li>Edit (`core_project_edit`)</li><li>Delete (`core_project_delete`)</li></ul> | Active |
| User Groups | <ul><li>View (`core_usergroup_view`)</li><li>Manage: Create, edit, and delete user groups (`core_usergroup_manage`)</li></ul> | Active |
| Service Accounts | <ul><li>View (`core_serviceaccount_view`)</li><li>Create/Edit (`core_serviceaccount_edit`)</li><li>Delete (`core_serviceaccount_delete`)</li><li>Manage: Create, edit, and delete API keys and tokens for service accounts (`core_serviceaccount_manageapikey`)</li><li>List Service Accounts (`core_serviceaccount_list`)</li></ul> | Active |
| Organizations | Available at the account and org [scopes](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_organization_view`)</li><li>Create (`core_organization_create`)</li><li>Edit (`core_organization_edit`)</li><li>Delete (`core_organization_delete`)</li></ul> | Active |
| Roles | <ul><li>View (`core_role_view`)</li><li>Create/Edit (`core_role_edit`)</li><li>Delete (`core_role_delete`)</li></ul> | Active |
| Streaming Destination | Available at the account [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_streamingDestination_view`)</li><li>Create/Edit (`core_streamingDestination_edit`)</li><li>Delete (`core_streamingDestination_delete`)</li></ul> | Experimental |
| Banners | Available at the account [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_banner_view`)</li><li>Create/Edit (`core_banner_edit`)</li><li>Delete (`core_banner_delete`)</li></ul> | Active |
| Users | <ul><li>View (`core_user_view`)</li><li>Manage: Edit and delete users (`core_user_manager`)</li><li>Invite: Add users by inviting them to Harness (`core_user_invite`)</li><li>Impersonate Users (`core_user_impersonate`)</li></ul> | Active |
| Authentication Settings | Available at the account [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_authsetting_view`)</li><li>Create/Edit (`core_authsetting_edit`)</li><li>Delete (`core_authsetting_delete`)</li></ul> | Active |
| SMTP Configuration | <ul><li>View (`core_smtp_view`)</li><li>Create/Edit (`core_smtp_edit`)</li><li>Delete (`core_smtp_delete`)</li></ul> | Active |
| Certificates | <ul><li>View (`core_certificate_view`)</li><li>Create/Edit (`core_certificate_edit`)</li><li>Delete (`core_certificate_delete`)</li></ul> | Active |
| Account Management | <ul><li>View (`core_account_view`)</li><li>Edit (`core_account_edit`)</li></ul> | Active |
| Licenses | <ul><li>View (`core_license_view`)</li><li>Edit (`core_license_edit`)</li></ul> | Active |
| Audit | <ul><li>View (`core_audit_view`)</li></ul> | Active |
| Deployment Freezes | <ul><li>Manage (`core_deploymentfreeze_manage`)</li><li>Global (`core_deploymentfreeze_global`)</li></ul> | Active |
| Providers | <ul><li>View (`core_provider_view`)</li><li>Create/Edit (`core_provider_edit`)</li><li>Delete (`core_provider_delete`)</li></ul> | Experimental |

## Monitoring

| Resource | Permissions | Status |
| --- | --- | --- |
| Monitoring Agents | <ul><li>View (`monitoring_monitoringagent_view`)</li><li>Create (`monitoring_monitoringagent_create`)</li><li>Edit (`monitoring_monitoringagent_edit`)</li><li>Delete (`monitoring_monitoringagent_delete`)</li></ul> | Experimental |
| Service Level Objectives | <ul><li>View (`iro_iromanager_view`)</li><li>Create (`iro_iromanager_create`)</li><li>Edit (`iro_iromanager_edit`)</li><li>Delete (`iro_iromanager_delete`)</li></ul> | Experimental |

## Environment Groups

| Resource | Permissions | Status |
| --- | --- | --- |
| Environment Groups | <ul><li>View (`core_environmentgroup_view`)</li><li>Create/Edit (`core_environmentgroup_edit`)</li><li>Delete (`core_environmentgroup_delete`)</li><li>Access: Can access referenced environment groups at runtime (`core_environmentgroup_access`)</li></ul> | Active |

## Environments

| Resource | Permissions | Status |
| --- | --- | --- |
| Environments | <ul><li>View (`core_environment_view`)</li><li>Create/Edit (`core_environment_edit`)</li><li>Delete (`core_environment_delete`)</li><li>Access: Can access referenced environments at runtime (`core_environment_access`)</li><li>Rollback (`core_environment_rollback`)</li><li>View FF SDK Key: View Feature Flag environment key (`ff_environment_apiKeyView`) </li><li>Create FF SDK Key: Create Feature Flag environment key (`ff_environment_apiKeyCreate`)</li><li>Delete FF SDK Key: Delete Feature Flag environment key (`ff_environment_apiKeyDelete`)</li></ul> | Active |

## Pipelines

| Resource | Permissions | Status |
| --- | --- | --- |
| Pipelines | <ul><li>View (`core_pipeline_view`)</li><li>Create/Edit (`core_pipeline_edit`)</li><li>Delete (`core_pipeline_delete`)</li><li>Execute: Initiate pipeline runs (`core_pipeline_execute`)</li><li>Abort Pipeline (`core_pipeline_abort`)</li></ul> | Active |

## Services

| Resource | Permissions | Status |
| --- | --- | --- |
| Services | <ul><li>View (`core_service_view`)</li><li>Create/Edit (`core_service_edit`)</li><li>Delete (`core_service_delete`)</li><li>Access: Can access referenced services at runtime (`core_service_access`)</li></ul> | Active |

## Shared Resources

| Resource | Permissions | Status |
| --- | --- | --- |
| Templates | <ul><li>View (`core_template_view`)</li><li>Create/Edit (`core_template_edit`)</li><li>Delete (`core_template_delete`)</li><li>Access: Can access referenced templates at runtime (`core_template_access`)</li><li>Copy (`core_template_copy`)</li></ul> | Active |
| Deployment Freeze | <ul><li>Manage (`core_deploymentfreeze_manager`)</li><li>Override (`core_deploymentfreeze_override`)</li><li>Global (`global`)</li></ul> | Active |
| Secrets | <ul><li>View (`core_secret_view`)</li><li>Create/Edit (`core_secret_edit`)</li><li>Delete (`core_secret_delete`)</li><li>Access: Can access referenced secrets at runtime (`core_secret_access`)</li></ul> | Active |
| Connectors | <ul><li>View (`core_connector_view`)</li><li>Create/Edit (`core_connector_edit`)</li><li>Delete (`core_connector_delete`)</li><li>Access: Can access referenced connectors at runtime (`core_connector_access`)</li></ul> | Active |
| Variables | <ul><li>View (`core_variable_view`)</li><li>Create/Edit (`core_variable_edit`)</li><li>Delete (`core_variable_delete`)</li></ul> | Active |
| Files | <ul><li>View (`core_file_view`)</li><li>Create/Edit (`core_file_edit`)</li><li>Delete (`core_file_delete`)</li><li>Access (`core_file_access`)</li></ul> | Active |
| Dashboards | <ul><li>View (`core_dashboards_view`)</li><li>Manage (`core_dashboards_edit`)</li></ul> | Active |
| Delegate Configurations | <ul><li>View (`core_delegateconfiguration_view`)</li><li>Create/Edit (`core_delegateconfiguration_edit`)</li><li>Delete (`core_delegateconfiguration_delete`)</li></ul> | Active |
| Delegates | <ul><li>View (`core_delegate_view`)</li><li>Create/Edit (`core_delegate_edit`)</li><li>Delete (`core_delegate_delete`)</li></ul> | Active |

## Policies

| Resource | Permissions | Status |
| --- | --- | --- |
| Governance Policies | <ul><li>View (`core_governancePolicy_view`)</li><li>Edit (`core_governancePolicy_edit`)</li><li>Create (`core_governancePolicy_create`)</li><li>Analyse Access Policies (`core_accessPolicies_analyze`)</li><li>Delete (`core_governancePolicy_delete`)</li></ul> | Active |
| Governance Policy Sets | <ul><li>View (`core_governancePolicySets_view`)</li><li>Edit (`core_governancePolicySets_edit`)</li><li>Create (`core_governancePolicySets_create`)</li><li>Delete (`core_governancePolicySets_delete`)</li><li>Evaluate (`core_governancePolicySets_evaluate`)</li></ul> | Active |

## Discovery

| Resource | Permissions | Status |
| --- | --- | --- |
| Network Map | <ul><li>View (`servicediscovery_networkmap_view`)</li><li>Create (`servicediscovery_networkmap_create`)</li><li>Edit (`servicediscovery_networkmap_edit`)</li><li>Delete (`servicediscovery_networkmap_delete`)</li></ul> | Active |

## Supply Chain Security

| Resource | Permissions | Status |
| --- | --- | --- |
| Remediation Tracker | <ul><li>View (`ssca_remediationtracker_view`)</li><li>Create/Edit (`ssca_remediationtracker_edit`)</li><li>Close (`ssca_remediationtracker_close`)</li></ul> | Active |

## Webhooks

| Resource | Permissions | Status |
| --- | --- | --- |
| Webhooks | <ul><li>View (`core_gitxWebhooks_view`)</li><li>Create/Edit (`core_gitxWebhooks_edit`)</li><li>Delete (`core_gitxWebhooks_delete`)</li></ul> | Active |

## Notifications

| Resource | Permissions | Status |
| --- | --- | --- |
| Notification Rules | <ul><li>View (`core_notificationrule_view`)</li><li>Create/Edit (`core_notificationrule_edit`)</li><li>Delete (`core_notificationrule_delete`)</li></ul> | EXPERIMENTAL |
| Notification Channels | <ul><li>View (`core_notificationchannel_view`)</li><li>Create/Edit (`core_notificationchannel_edit`)</li><li>Delete (`core_notificationchannel_delete`)</li></ul> | EXPERIMENTAL |
| Legacy Notifications | <ul><li>View (`core_notification_view`)</li><li>Create/Edit (`core_notification_edit`)</li><li>Delete (`core_notification_delete`)</li></ul> | DEPRECATED |

## Input Sets

| Resource | Permissions | Status |
| --- | --- | --- |
| Input Sets | <ul><li>View Input Set (`core_inputset_view`)</li><li>Create/Edit Input Set (`core_inputset_edit`)</li><li>Delete Input Set (`core_inputset_delete`)</li></ul> | Active |

## Module-specific permissions

### Chaos Engineering

| Resource | Permissions | Status |
| --- | --- | --- |
| Chaos Infrastructure | <ul><li>View (`chaos_chaosinfrastructure_view`)</li><li>Create/Edit (`chaos_chaosinfrastructure_edit`)</li><li>Delete (`chaos_chaosinfrastructure_delete`)</li></ul> | Active |
| Chaos Gameday | <ul><li>View (`chaos_chaosgameday_view`)</li><li>Create/Edit (`chaos_chaosgameday_edit`)</li><li>Delete (`chaos_chaosgameday_delete`)</li></ul> | Active |
| Chaos Hub | <ul><li>View: View Chaos experiments and Chaos scenarios (`chaos_chaoshub_view`)</li><li>Create/Edit: Connect to ChaosHub Git repo (`chaos_chaoshub_edit`)</li><li>Delete: Disconnect ChaosHub Git repo (`chaos_chaoshub_delete`)</li></ul> | Active |
| Chaos Experiment | <ul><li>View (`chaos_chaosexperiment_view`)</li><li>Create/Edit (`chaos_chaosexperiment_edit`)</li><li>Delete (`chaos_chaosexperiment_delete`)</li><li>Execute (`chaos_chaosexperiment_execute`)</li><li>Execute Pipeline (`chaos_chaosexperiment_executepipeline`)</li></ul> | Active |
| Chaos Probe | <ul><li>View (`chaos_chaosprobe_view`)</li><li>Create/Edit (`chaos_chaosprobe_edit`)</li><li>Delete (`chaos_chaosprobe_delete`)</li></ul> | Active |
| Chaos Security Governance | <ul><li>View (`chaos_chaossecuritygovernance_view`)</li><li>Create/Edit (`chaos_chaossecuritygovernance_edit`)</li><li>Delete (`chaos_chaossecuritygovernance_delete`)</li></ul> | Active |
| Chaos Image Registry | <ul><li>View (`chaos_chaosimageregistry_view`)</li><li>Create/Edit (`chaos_chaosimageregistry_edit`)</li></ul> | Active |

### Cloud Cost Management

| Resource | Permissions | Status |
| --- | --- | --- |
| Currency Preferences | <ul><li>View (`ccm_currencyPreference_view`)</li><li>Create/Edit (`ccm_currencyPreference_edit`)</li></ul> | Active |
| Overview | <ul><li>View (`ccm_overview_view`)</li></ul> | Active |
| Cost Categories | <ul><li>View (`ccm_costCategory_view`)</li><li>Create/Edit (`ccm_costCategory_edit`)</li><li>Delete (`ccm_costCategory_delete`)</li></ul> | Active |
| Folders | <ul><li>View (`ccm_folder_view`)</li><li>Create/Edit (`ccm_folder_edit`)</li><li>Delete (`ccm_folder_delete`)</li></ul> | Active |
| Perspectives | <ul><li>View (`ccm_perspective_view`)</li><li>Create/Edit (`ccm_perspective_edit`)</li><li>Delete (`ccm_perspective_delete`)</li></ul> | Active |
| AutoStopping Rules | <ul><li>View (`ccm_autoStoppingRule_view`)</li><li>Create/Edit (`ccm_autoStoppingRule_edit`)</li><li>Delete (`ccm_autoStoppingRule_delete`)</li></ul> | Active |
| Budgets | <ul><li>View (`ccm_budget_view`)</li><li>Create/Edit (`ccm_budget_edit`)</li><li>Delete (`ccm_budget_delete`)</li></ul> | Active |
| Load Balancer | <ul><li>View (`ccm_loadBalancer_view`)</li><li>Create/Edit (`ccm_loadBalancer_edit`)</li><li>Delete (`ccm_loadBalancer_delete`)</li></ul> | Active |
| Data Scope | <ul><li>View (`ccm_dataScope_view`)</li></ul> | Active |
| Anomalies | <ul><li>View (`ccm_anomalies_view`)</li></ul> | Active |
| Recommendations | <ul><li>View (`ccm_recommendations_view`)</li><li>Manage (`ccm_recommendations_manage`)</li></ul> | Active |
| Commitment Orchestrator | <ul><li>View (`ccm_commitmentOrchestrator_view`)</li><li>Edit (`ccm_commitmentOrchestrator_edit`)</li></ul> | Active |
| Cluster Orchestrator | <ul><li>View (`ccm_clusterOrchestrator_view`)</li><li>Edit (`ccm_clusterOrchestrator_edit`)</li></ul> | Experimental |
| Cloud Asset Governance Rule | <ul><li>View (`ccm_cloudAssetGovernanceRule_view`)</li><li>Create/Edit (`ccm_cloudAssetGovernanceRule_edit`)</li><li>Delete (`ccm_cloudAssetGovernanceRule_delete`)</li><li>Execute (`ccm_cloudAssetGovernanceRule_execute`)</li></ul> | Active |
| Cloud Asset Governance Rule Set | <ul><li>View (`ccm_cloudAssetGovernanceRuleSet_view`)</li><li>Create/Edit (`ccm_cloudAssetGovernanceRuleSet_edit`)</li><li>Delete (`ccm_cloudAssetGovernanceRuleSet_delete`)</li></ul> | Active |
| Cloud Asset Governance Enforcement | <ul><li>View (`ccm_cloudAssetGovernanceEnforcement_view`)</li><li>Create/Edit (`ccm_cloudAssetGovernanceEnforcement_edit`)</li><li>Delete (`ccm_cloudAssetGovernanceEnforcement_delete`)</li></ul> | Active |

### Code Repository

| Resource | Permissions | Status |
| --- | --- | --- |
| Repository | <ul><li>View (`code_repo_view`)</li><li>Create/Edit (Create repositories and edit repository settings, such as descriptions, webhooks, and rules) (`code_repo_edit`)</li><li>Delete (`code_repo_delete`)</li><li>Push (Repository contributor permissions, such as committing, pushing, creating/deleting branches, creating/deleting tags) (`code_repo_push`)</li><li>Report commit check : Report a Status Check Result on a Commit (`code_repo_reportCommitCheck`)</li><li>Review PR: Review Pull Requests in a Code Repository (`code_repo_review`)</li><li>Create Repository (`code_repo_create`)</li></ul> | Active |

### Feature Flags

| Resource | Permissions | Status |
| --- | --- | --- |
| Feature flags | <ul><li>View (`ff_featureflag_view`)</li><li>Toggle: Turn Feature Flags on/off (`ff_featureflag_toggle`)</li><li>Create/Edit Flag (`ff_featureflag_edit`)</li><li>Edit Rule (`ff_featureflag_rulesEdit`)</li><li>Edit Configuration (`ff_featureflag_configEdit`)</li><li>Delete (`ff_featureflag_delete`)</li></ul> | Active |
| Target Management | <ul><li>View: View Targets and Target Groups (`ff_targetgroup_view`)</li><li>Create/Edit: Create and edit Targets and Target Groups to control visibility of a variation of a Feature Flag (`ff_targetgroup_edit`)</li><li>Delete: Delete Targets and Target Groups (`ff_targetgroup_delete`)</li></ul> | Active |
| Feature Flag | <ul><li>Create (`ff_featureflag_create`)</li></ul> | Active |
| Target | <ul><li>View (`ff_target_view`)</li></ul> | Active |
| Environment | <ul><li>View (`ff_environment_view`)</li><li>Edit (`ff_environment_edit`)</li><li>Target Group Edit (`ff_environment_targetGroupEdit`)</li></ul> | Active |
| Proxy API Keys | <ul><li>View (`ff_proxyapikey_view`)</li><li>Create (`ff_proxyapikey_create`)</li><li>Edit (`ff_proxyapikey_edit`)</li><li>Delete (`ff_proxyapikey_delete`)</li><li>Rotate (`ff_proxyapikey_rotate`)</li></ul> | Active |

### GitOps

| Resource | Permissions | Status |
| --- | --- | --- |
| Clusters | <ul><li>View (`gitops_cluster_view`)</li><li>Create/Edit (`gitops_cluster_edit`)</li><li>Delete (`gitops_cluster_delete`)</li></ul> | Active |
| Agents | <ul><li>View (`gitops_agent_view`)</li><li>Create/Edit (`gitops_agent_edit`)</li><li>Delete (`gitops_agent_delete`)</li></ul> | Active |
| GnuPG Keys | <ul><li>View (`gitops_gpgkey_view`)</li><li>Create/Edit (`gitops_gpgkey_edit`)</li><li>Delete (`gitops_gpgkey_delete`)</li></ul> | Active |
| Repository Certificates | <ul><li>View (`gitops_gpgkey_view`)</li><li>Create/Edit (`gitops_gpgkey_edit`)</li><li>Delete (`gitops_gpgkey_delete`)</li></ul> | Active |
| Applications | <ul><li>View (`gitops_application_view`)</li><li>Create/Edit (`gitops_application_edit`)</li><li>Delete (`gitops_application_delete`)</li><li>Sync: Deploy applications (`gitops_application_sync`)</li></ul> | Active |
| Application Sets | <ul><li>View (`gitops_applicationset_view`)</li><li>Create/Edit (`gitops_applicationset_edit`)</li><li>Delete (`gitops_applicationset_delete`)</li></ul> | Experimental |
| Repositories | <ul><li>View (`gitops_repository_view`)</li><li>Create/Edit (`gitops_repository_edit`)</li><li>Delete (`gitops_repository_delete`)</li></ul> | Active |
| Certificates | <ul><li>View (`gitops_cert_view`)</li><li>Create/Edit (`gitops_cert_edit`)</li><li>Delete (`gitops_cert_delete`)</li></ul> | Active |

### Infrastructure as Code

| Resource | Permissions | Status |
| --- | --- | --- |
| IACM Workspaces | <ul><li>View (`iac_workspace_view`)</li><li>Create/Edit (`iac_workspace_edit`)</li><li>Delete (`iac_workspace_delete`)</li><li>Create/Edit Variables (`iac_workspace_editvariable`)</li><li>Delete Variables (`iac_workspace_deletevariable`)</li><li>Approve (`iac_workspace_approve`)</li><li>Access State (`iac_workspace_accessstate`)</li></ul> | Active |
| Registry | <ul><li>View (`iac_registry_view`)</li><li>Create/Edit (`iac_registry_edit`)</li><li>Delete (`iac_registry_delete`)</li></ul> | Active |
| Variable Sets | <ul><li>View (`iac_variableset_view`)</li><li>Create/Edit (`iac_variableset_edit`)</li><li>Delete (`iac_variableset_delete`)</li></ul> | Experimental |

### Service Reliability

| Resource | Permissions | Status |
| --- | --- | --- |
| SLO | <ul><li>View (`chi_slo_view`)</li><li>Create/Edit (`chi_slo_edit`)</li><li>Delete (`chi_slo_delete`)</li></ul> | Active |
| Monitored Services | <ul><li>View (`chi_monitoredservice_view`)</li><li>Create/Edit (`chi_monitoredservice_edit`)</li><li>Delete (`chi_monitoredservice_delete`)</li><li>Toggle: Toggle Monitored Services on/off (`chi_monitoredservice_toggle`)</li></ul> | Active |
| Downtime | <ul><li>View (`chi_downtime_view`)</li><li>Create/Edit (`chi_downtime_edit`)</li><li>Delete (`chi_downtime_delete`)</li></ul> | Active |

### Security Tests

| Resource | Permissions | Status |
| --- | --- | --- |
| Issues | <ul><li>View (`sto_issue_view`)</li></ul> | Active |
| Scans | <ul><li>View (`sto_scan_view`)</li></ul> | Active |
| Test Targets | <ul><li>View (`sto_testtarget_view`)</li><li>Create/Edit (`sto_testtarget_edit`)</li></ul> | Active |
| Exemptions | <ul><li>View (`sto_exemption_view`)</li><li>Create/Edit (`sto_exemption_create`)</li><li>Approve/Reject (`sto_exemption_approve`)</li></ul> | Active |
| External Tickets | <ul><li>View (`sto_ticket_view`)</li><li>Create/Edit (`sto_ticket_edit`)</li><li>Delete (`sto_ticket_delete`)</li></ul> | Active |

### Internal Developer Portal

| Resource | Permissions | Status |
| --- | --- | --- |
| Plugins | <ul><li>View (`idp_plugin_view`)</li><li>Create/Edit (`idp_plugin_edit`)</li><li>Toggle (`idp_plugin_toggle`)</li><li>Delete (`idp_plugin_delete`)</li></ul> | Active |
| Scorecards | <ul><li>View (`idp_scorecard_view`)</li><li>Create/Edit (`idp_scorecard_edit`)</li><li>Delete (`idp_scorecard_delete`)</li></ul> | Active |
| Layouts | <ul><li>View (`idp_layout_view`)</li><li>Create/Edit (`idp_layout_edit`)</li></ul> | Active |
| Catalog Access Policies | <ul><li>View (`idp_catalogaccesspolicy_view`)</li><li>Create (`idp_catalogaccesspolicy_create`)</li><li>Edit (`idp_catalogaccesspolicy_edit`)</li><li>Delete (`idp_catalogaccesspolicy_delete`)</li></ul> | Active |
| Integrations | <ul><li>View (`idp_integration_view`)</li><li>Create (`idp_integration_create`)</li><li>Edit (`idp_integration_edit`)</li><li>Delete (`idp_integration_delete`)</li></ul> | Active |
| Advanced Configurations | <ul><li>View (`idp_advancedconfiguration_view`)</li><li>Create/Edit (`idp_advancedconfiguration_edit`)</li><li>Delete (`idp_advancedconfiguration_delete`)</li></ul> | Active |
| Catalog | <ul><li>View (`idp_catalog_view`)</li><li>Create/Edit (`idp_catalog_edit`)</li><li>Delete (`idp_catalog_delete`)</li></ul> | Active |
| Workflow | <ul><li>View (`idp_workflow_view`)</li><li>Create/Edit (`idp_workflow_edit`)</li><li>Delete (`idp_workflow_delete`)</li><li>Execute (`idp_workflow_execute`)</li></ul> | Active |

### Continuous Error Tracking

| Resource | Permissions | Status |
| --- | --- | --- |
| Tokens | <ul><li>View (`cet_token_view`)</li><li>Create/Edit (`cet_token_create`)</li><li>Revoke (`cet_token_revoke`)</li></ul> | Active |
| Critical Events | <ul><li>View (`cet_criticalevent_view`)</li><li>Create/Edit (`cet_criticalevent_create`)</li><li>Delete (`cet_criticalevent_delete`)</li></ul> | Active |
| Agents | <ul><li>View (`cet_agents_view`)</li></ul> | Active |

### Database DevOps

| Resource | Permissions | Status |
| --- | --- | --- |
| Schemas | <ul><li>View (`dbops_schema_view`)</li><li>Create/Edit (`dbops_schema_edit`)</li><li>Delete (`dbops_schema_delete`)</li></ul> | Active |
| Instances | <ul><li>View (`dbops_instance_view`)</li><li>Create/Edit (`dbops_instance_edit`)</li><li>Delete (`dbops_instance_delete`)</li></ul> | Active |

## Artifact Management

| Resource | Permissions | Status |
| --- | --- | --- |
| Artifact Registry | <ul><li>View (`artifact_artregistry_view`)</li><li>Create/Edit (`artifact_artregistry_edit`)</li><li>Delete (`artifact_artregistry_delete`)</li><li>Upload Artifact (`artifact_artregistry_uploadartifact`)</li><li>Download Artifact (`artifact_artregistry_downloadartifact`)</li><li>Delete Artifact (`artifact_artregistry_deleteartifact`)</li></ul> | Active |

### Software Engineering Insights

| Resource | Permissions | Status |
| --- | --- | --- |
| SEI Collections | <ul><li>View (`sei_seicollections_view`)</li><li>Create (`sei_seicollections_create`)</li><li>Edit (`sei_seicollections_edit`)</li><li>Delete (`sei_seicollections_delete`)</li></ul> | Active |
| SEI Configuration Settings | <ul><li>View (`sei_seiconfigurationsettings_view`)</li><li>Create (`sei_seiconfigurationsettings_create`)</li><li>Edit (`sei_seiconfigurationsettings_edit`)</li><li>Delete (`sei_seiconfigurationsettings_delete`)</li></ul> | Active |
| SEI Insights | <ul><li>View (`sei_seiinsights_view`)</li><li>Create (`sei_seiinsights_create`)</li><li>Edit (`sei_seiinsights_edit`)</li><li>Delete (`sei_seiinsights_delete`)</li></ul> | Active |

### Feature Management and Experimentation

| Resource | Permissions | Status |
| --- | --- | --- |
| FME Environment | <ul><li>View (`fme_fmeenvironment_view`)</li><li>Create/Edit (`fme_fmeenvironment_edit`)</li><li>SDK API Key View (`fme_fmeenvironment_sdkApiKeyView`)</li><li>SDK API Key Edit (`fme_fmeenvironment_sdkApiKeyEdit`)</li><li>Data Export View (`fme_fmeenvironment_dataExportView`)</li><li>Data Export Edit (`fme_fmeenvironment_dataExportEdit`)</li></ul> | Active |
| FME Feature Flag | <ul><li>View (`fme_fmefeatureflag_view`)</li><li>Create/Edit (`fme_fmefeatureflag_edit`)</li></ul> | Active |
| FME Experiment | <ul><li>View (`fme_fmeexperiment_view`)</li><li>Create/Edit (`fme_fmeexperiment_edit`)</li></ul> | Active |
| FME Segment | <ul><li>View (`fme_fmesegment_view`)</li><li>Create/Edit (`fme_fmesegment_edit`)</li></ul> | Active |
| FME Large Segment | <ul><li>View (`fme_fmelargesegment_view`)</li><li>Create/Edit (`fme_fmelargesegment_edit`)</li></ul> | Active |
| FME Metric | <ul><li>View (`fme_fmemetric_view`)</li><li>Create/Edit (`fme_fmemetric_edit`)</li></ul> | Active |
| FME Traffic Type | <ul><li>View (`fme_fmetraffictype_view`)</li><li>Create/Edit (`fme_fmetraffictype_edit`)</li></ul> | Active |
