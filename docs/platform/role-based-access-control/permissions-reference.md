---
title: Permissions reference
description: Permissions reference for Harness RBAC.
sidebar_position: 120
helpdocs_topic_id: yaornnqh0z
helpdocs_category_id: 4przngb8nk
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes permissions relevant to [RBAC in Harness](/docs/category/platform-access-control/rbac-in-harness). For API permissions, go to the [API permissions reference](/docs/platform/automation/api/api-permissions-reference).

:::info Types of permission
    **Types of permission**:

        | **Status**       | **Description**                                               |
        |------------------|---------------------------------------------------------------|
        | **EXPERIMENTAL** | Available for role assignment but RBAC will not be enforced, that is the access checks always return true. |
        | **ACTIVE**       | Available for role assignment with RBAC enforced.                                  |
        | **DEPRECATED**   | Available for role assignment with RBAC enforced but the permission will be moved to the INACTIVE state after some time.  |

    This reference lists permissions that are available for role assignment. The **Status** column shows a resource's primary status; when an individual permission has a different status, it is annotated inline after its identifier (for example, `gitops_application_exec`, Experimental).
        
:::

## Administrative Functions

| Resource | Permissions | Status |
| --- | --- | --- |
| Access Policies | <ul><li>Analyze (`core_accessPolicies_analyze`)</li></ul> | Active |
| Account Management | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Create / Edit (`core_account_edit`)</li><li>View (`core_account_view`)</li></ul> | Active |
| Account Settings | <ul><li>View (`core_setting_view`)</li><li>Create / Edit (`core_setting_edit`)</li></ul> | Active |
| Audit | Available at the account and org [scopes](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_audit_view`)</li></ul> | Active |
| Authentication Settings | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_authsetting_view`)</li><li>Create / Edit (`core_authsetting_edit`)</li><li>Delete (`core_authsetting_delete`)</li></ul> | Active |
| Banners | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_banner_view`)</li><li>Create / Edit (`core_banner_edit`)</li><li>Delete (`core_banner_delete`)</li></ul> | Active |
| Branding | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Edit (`core_branding_edit`)</li></ul> | Active |
| Certificates | <ul><li>View (`core_certificate_view`)</li><li>Create / Edit (`core_certificate_edit`)</li><li>Delete (`core_certificate_delete`)</li></ul> | Active |
| Data Sink | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_dataSink_view`)</li><li>Create / Edit (`core_dataSink_edit`)</li><li>Create (`core_dataSink_create`)</li><li>Delete (`core_dataSink_delete`)</li></ul> | Active |
| Delegate Transaction Queue | <ul><li>View (`core_delegatetransactionqueue_view`)</li><li>Manage (`core_delegatetransactionqueue_manage`)</li></ul> | Active |
| Deployment Freeze | <ul><li>Manage (`core_deploymentfreeze_manage`)</li><li>Override (`core_deploymentfreeze_override`)</li><li>Global (`core_deploymentfreeze_global`)</li></ul> | Active |
| Licenses | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_license_view`)</li><li>Create / Edit (`core_license_edit`)</li></ul> | Active |
| OIDC ID Token | <ul><li>Create (`core_oidcIdToken_create`)</li></ul> | Active |
| Organizations | Available at the account and org [scopes](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Delete (`core_organization_delete`)</li><li>View (`core_organization_view`)</li><li>Edit (`core_organization_edit`)</li><li>Create (`core_organization_create`)</li></ul> | Active |
| Platform Alert Settings | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_alertSetting_view`)</li><li>Edit (`core_alertSetting_edit`)</li></ul> | Active |
| Projects | <ul><li>Delete (`core_project_delete`)</li><li>View (`core_project_view`)</li><li>Edit (`core_project_edit`)</li><li>Create (`core_project_create`)</li><li>Move (`core_project_move`)</li></ul> | Active |
| Providers | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_provider_view`)</li><li>Create / Edit (`core_provider_edit`)</li><li>Delete (`core_provider_delete`)</li></ul> | Active |
| Resource Groups | <ul><li>View (`core_resourcegroup_view`)</li><li>Create / Edit (`core_resourcegroup_edit`)</li><li>Delete (`core_resourcegroup_delete`)</li></ul> | Active |
| Roles | <ul><li>View (`core_role_view`)</li><li>Create / Edit (`core_role_edit`)</li><li>Delete (`core_role_delete`)</li></ul> | Active |
| SMTP Configuration | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_smtp_view`)</li><li>Create / Edit (`core_smtp_edit`)</li><li>Delete (`core_smtp_delete`)</li></ul> | Active |
| Service Accounts | <ul><li>View (`core_serviceaccount_view`)</li><li>List (`core_serviceaccount_list`)</li><li>Create / Edit (`core_serviceaccount_edit`)</li><li>Delete (`core_serviceaccount_delete`)</li><li>Manage (`core_serviceaccount_manageapikey`)</li></ul> | Active |
| Streaming Destination | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_streamingDestination_view`)</li><li>Create / Edit (`core_streamingDestination_edit`)</li><li>Delete (`core_streamingDestination_delete`)</li></ul> | Active |
| User Groups | <ul><li>View (`core_usergroup_view`)</li><li>Manage (`core_usergroup_manage`)</li><li>Create (`core_usergroup_create`)</li><li>Edit Metadata (`core_usergroup_editMetadata`)</li><li>Delete (`core_usergroup_delete`)</li><li>Manage SSO (`core_usergroup_manageSSO`)</li><li>Manage SCIM (`core_usergroup_manageSCIM`)</li><li>Manage Members (`core_usergroup_manageUsers`)</li><li>Manage Notifications (`core_usergroup_manageNotifications`)</li><li>Manage Roles (`core_usergroup_manageRoleAssignments`)</li></ul> | Active |
| Users | <ul><li>View (`core_user_view`)</li><li>Manage (`core_user_manage`)</li><li>Invite (`core_user_invite`)</li><li>Impersonate (`core_user_impersonate`)</li></ul> | Active |

## Monitoring

| Resource | Permissions | Status |
| --- | --- | --- |
| Monitoring Agents | <ul><li>Edit (`monitoring_monitoringagent_edit`)</li><li>Delete (`monitoring_monitoringagent_delete`)</li><li>View (`monitoring_monitoringagent_view`)</li><li>Create (`monitoring_monitoringagent_create`)</li></ul> | Experimental |
| Service Level Objectives | <ul><li>Edit (`iro_iromanager_edit`)</li><li>Delete (`iro_iromanager_delete`)</li><li>View (`iro_iromanager_view`)</li><li>Create (`iro_iromanager_create`)</li></ul> | Active |

## Environment Groups

| Resource | Permissions | Status |
| --- | --- | --- |
| Environment Groups | <ul><li>View (`core_environmentgroup_view`)</li><li>Create / Edit (`core_environmentgroup_edit`)</li><li>Delete (`core_environmentgroup_delete`)</li><li>Access (`core_environmentgroup_access`)</li></ul> | Active |

## Environments

| Resource | Permissions | Status |
| --- | --- | --- |
| Environments | <ul><li>View (`core_environment_view`)</li><li>Create / Edit (`core_environment_edit`)</li><li>Delete (`core_environment_delete`)</li><li>Access (`core_environment_access`)</li><li>Rollback Label (`core_environment_rollback`)</li></ul> | Active |

## Pipelines

| Resource | Permissions | Status |
| --- | --- | --- |
| Pipelines | <ul><li>View (`core_pipeline_view`)</li><li>Edit (`core_pipeline_edit`)</li><li>Delete (`core_pipeline_delete`)</li><li>Execute (`core_pipeline_execute`)</li><li>Abort (`core_pipeline_abort`)</li><li>Create (`core_pipeline_create`)</li></ul> | Active |
| Releases | <ul><li>View (`core_releases_view`)</li><li>Create (`core_releases_create`)</li><li>Edit (`core_releases_edit`)</li><li>Delete (`core_releases_delete`)</li><li>Execute (`core_releases_execute`)</li></ul> | Active |

## Services

| Resource | Permissions | Status |
| --- | --- | --- |
| Services | <ul><li>View (`core_service_view`)</li><li>Create / Edit (`core_service_edit`)</li><li>Delete (`core_service_delete`)</li><li>Access (`core_service_access`)</li></ul> | Active |

## Shared Resources

| Resource | Permissions | Status |
| --- | --- | --- |
| Connectors | <ul><li>Access (`core_connector_access`)</li><li>View (`core_connector_view`)</li><li>Create / Edit (`core_connector_edit`)</li><li>Delete (`core_connector_delete`)</li></ul> | Active |
| Dashboards | Available at the account and org [scopes](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`core_dashboards_view`)</li><li>Create (`core_dashboards_create`)</li><li>Delete (`core_dashboards_delete`)</li><li>Edit (`core_dashboards_edit`)</li></ul> | Active |
| Delegate Configurations | <ul><li>View (`core_delegateconfiguration_view`)</li><li>Create / Edit (`core_delegateconfiguration_edit`)</li><li>Delete (`core_delegateconfiguration_delete`)</li></ul> | Active |
| Delegates | <ul><li>View (`core_delegate_view`)</li><li>Create / Edit (`core_delegate_edit`)</li><li>Delete (`core_delegate_delete`)</li></ul> | Active |
| Files | <ul><li>View (`core_file_view`)</li><li>Create / Edit (`core_file_edit`)</li><li>Delete (`core_file_delete`)</li><li>Access (`core_file_access`)</li></ul> | Active |
| Secrets | <ul><li>Delete (`core_secret_delete`)</li><li>View (`core_secret_view`)</li><li>Create (`core_secret_create`)</li><li>Edit (`core_secret_edit`)</li><li>Access (`core_secret_access`)</li></ul> | Active |
| Templates | <ul><li>View (`core_template_view`)</li><li>Copy (`core_template_copy`)</li><li>Edit (`core_template_edit`)</li><li>Delete (`core_template_delete`)</li><li>Access (`core_template_access`)</li><li>Create (`core_template_create`)</li></ul> | Active |
| Variables | <ul><li>View (`core_variable_view`)</li><li>Create / Edit (`core_variable_edit`)</li><li>Delete (`core_variable_delete`)</li></ul> | Active |

## Policies

| Resource | Permissions | Status |
| --- | --- | --- |
| Governance Policies | <ul><li>Create (`core_governancePolicy_create`)</li><li>Edit (`core_governancePolicy_edit`)</li><li>View (`core_governancePolicy_view`)</li><li>Delete (`core_governancePolicy_delete`)</li></ul> | Active |
| Governance Policy Sets | <ul><li>Create (`core_governancePolicySets_create`)</li><li>Edit (`core_governancePolicySets_edit`)</li><li>View (`core_governancePolicySets_view`)</li><li>Delete (`core_governancePolicySets_delete`)</li><li>Evaluate (`core_governancePolicySets_evaluate`)</li></ul> | Active |

## Discovery

| Resource | Permissions | Status |
| --- | --- | --- |
| Network Map | <ul><li>Create (`servicediscovery_networkmap_create`)</li><li>Edit (`servicediscovery_networkmap_edit`)</li><li>Delete (`servicediscovery_networkmap_delete`)</li><li>View (`servicediscovery_networkmap_view`)</li></ul> | Active |

## Supply Chain Security

| Resource | Permissions | Status |
| --- | --- | --- |
| Remediation Tracker | <ul><li>Create / Edit (`ssca_remediationtracker_edit`)</li><li>View (`ssca_remediationtracker_view`)</li><li>Close (`ssca_remediationtracker_close`)</li></ul> | Active |
| SCS Configuration | <ul><li>View (`ssca_scsconfiguration_view`)</li><li>Create (`ssca_scsconfiguration_create`)</li><li>Edit (`ssca_scsconfiguration_edit`)</li></ul> | Active |
| SCS Evidence Vault | <ul><li>View (`ssca_scsevidencevault_view`)</li><li>Download (`ssca_scsevidencevault_download`)</li><li>Upload (`ssca_scsevidencevault_upload`)</li></ul> | Active |
| SCS External Ticket | <ul><li>View (`ssca_scsexternalticket_view`)</li><li>Create (`ssca_scsexternalticket_create`)</li><li>Edit (`ssca_scsexternalticket_edit`)</li></ul> | Active |
| SCS Integration | <ul><li>View (`ssca_scsintegration_view`)</li><li>Create (`ssca_scsintegration_create`)</li><li>Edit (`ssca_scsintegration_edit`)</li><li>Delete (`ssca_scsintegration_delete`)</li></ul> | Active |
| SCS Pull Request | <ul><li>View (`ssca_scsprcreation_view`)</li><li>Create (`ssca_scsprcreation_create`)</li><li>Edit (`ssca_scsprcreation_edit`)</li></ul> | Active |

## Webhooks

| Resource | Permissions | Status |
| --- | --- | --- |
| Webhooks | <ul><li>Create / Edit (`core_gitxWebhooks_edit`)</li><li>Delete (`core_gitxWebhooks_delete`)</li><li>View (`core_gitxWebhooks_view`)</li></ul> | Active |

## Notifications

| Resource | Permissions | Status |
| --- | --- | --- |
| Default Notification Template Set | <ul><li>View (`core_defaultNotificationTemplateSet_view`)</li><li>Create / Edit (`core_defaultNotificationTemplateSet_edit`)</li><li>Delete (`core_defaultNotificationTemplateSet_delete`)</li></ul> | Active |
| Legacy Notifications | <ul><li>View (`core_notification_view`)</li><li>Create / Edit (`core_notification_edit`)</li><li>Delete (`core_notification_delete`)</li></ul> | Deprecated |
| Notification Channels | <ul><li>View (`core_notificationchannel_view`)</li><li>Create / Edit (`core_notificationchannel_edit`)</li><li>Delete (`core_notificationchannel_delete`)</li></ul> | Active |
| Notification Rules | <ul><li>View (`core_notificationrule_view`)</li><li>Create / Edit (`core_notificationrule_edit`)</li><li>Delete (`core_notificationrule_delete`)</li></ul> | Active |

## Input Sets

| Resource | Permissions | Status |
| --- | --- | --- |
| Input Sets | <ul><li>Create / Edit (`core_inputset_edit`)</li><li>Delete (`core_inputset_delete`)</li><li>View (`core_inputset_view`)</li></ul> | Active |

## Module-specific permissions

### Chaos Engineering

| Resource | Permissions | Status |
| --- | --- | --- |
| Chaos Action | <ul><li>View (`chaos_chaosaction_view`)</li><li>Create / Edit (`chaos_chaosaction_edit`)</li><li>Delete (`chaos_chaosaction_delete`)</li></ul> | Active |
| Chaos Environment | <ul><li>Execute Chaos Experiment (`chaos_environment_executeChaosExperiment`)</li></ul> | Active |
| Chaos Experiment | <ul><li>View (`chaos_chaosexperiment_view`)</li><li>Create / Edit (`chaos_chaosexperiment_edit`)</li><li>Delete (`chaos_chaosexperiment_delete`)</li><li>Execute (`chaos_chaosexperiment_execute`)</li></ul> | Active |
| Chaos Fault | <ul><li>View (`chaos_chaosfault_view`)</li><li>Create / Edit (`chaos_chaosfault_edit`)</li><li>Delete (`chaos_chaosfault_delete`)</li></ul> | Active |
| Chaos Gameday | <ul><li>View (`chaos_chaosgameday_view`)</li><li>Create / Edit (`chaos_chaosgameday_edit`)</li><li>Delete (`chaos_chaosgameday_delete`)</li><li>Execute (`chaos_chaosgameday_execute`)</li></ul> | Active |
| Chaos Hub | <ul><li>View (`chaos_chaoshub_view`)</li><li>Create / Edit (`chaos_chaoshub_edit`)</li><li>Delete (`chaos_chaoshub_delete`)</li><li>Access (`chaos_chaoshub_access`)</li><li>Manage (`chaos_chaoshub_manage`)</li></ul> | Active |
| Chaos Image Registry | <ul><li>View (`chaos_chaosimageregistry_view`)</li><li>Create / Edit (`chaos_chaosimageregistry_edit`)</li></ul> | Active |
| Chaos Infrastructure | <ul><li>View (`chaos_chaosinfrastructure_view`)</li><li>Create / Edit (`chaos_chaosinfrastructure_edit`)</li><li>Delete (`chaos_chaosinfrastructure_delete`)</li></ul> | Active |
| Chaos Probe | <ul><li>View (`chaos_chaosprobe_view`)</li><li>Create / Edit (`chaos_chaosprobe_edit`)</li><li>Delete (`chaos_chaosprobe_delete`)</li><li>Verify (`chaos_chaosprobe_verify`)</li></ul> | Active |
| Chaos Security Governance | <ul><li>Create / Edit (`chaos_chaossecuritygovernance_edit`)</li><li>Delete (`chaos_chaossecuritygovernance_delete`)</li><li>View (`chaos_chaossecuritygovernance_view`)</li></ul> | Active |
| DR Test | <ul><li>View (`chaos_drtest_view`)</li><li>Create / Edit (`chaos_drtest_edit`)</li><li>Delete (`chaos_drtest_delete`)</li></ul> | Experimental |

### Cloud Cost Management

| Resource | Permissions | Status |
| --- | --- | --- |
| Anomalies | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_anomalies_view`)</li><li>Manage (`ccm_anomalies_manage`)</li></ul> | Active |
| Anomalies Ignore List Rules | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_anomaliesWhitelistRule_view`)</li><li>Manage (`ccm_anomaliesWhitelistRule_manage`)</li></ul> | Active |
| AutoStopping Rules | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_autoStoppingRule_view`)</li><li>Create / Edit (`ccm_autoStoppingRule_edit`)</li><li>Delete (`ccm_autoStoppingRule_delete`)</li></ul> | Active |
| Budgets | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_budget_view`)</li><li>Create / Edit (`ccm_budget_edit`)</li><li>Delete (`ccm_budget_delete`)</li></ul> | Active |
| Cloud Asset Governance Alert | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Create / Edit (`ccm_cloudAssetGovernanceAlert_edit`)</li><li>View (`ccm_cloudAssetGovernanceAlert_view`)</li><li>Delete (`ccm_cloudAssetGovernanceAlert_delete`)</li></ul> | Active |
| Cloud Asset Governance Enforcement | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Create / Edit (`ccm_cloudAssetGovernanceEnforcement_edit`)</li><li>View (`ccm_cloudAssetGovernanceEnforcement_view`)</li><li>Delete (`ccm_cloudAssetGovernanceEnforcement_delete`)</li></ul> | Active |
| Cloud Asset Governance Overview | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_cloudAssetGovernanceOverview_view`)</li></ul> | Active |
| Cloud Asset Governance Rule | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Create / Edit (`ccm_cloudAssetGovernanceRule_edit`)</li><li>View (`ccm_cloudAssetGovernanceRule_view`)</li><li>Delete (`ccm_cloudAssetGovernanceRule_delete`)</li><li>Execute (`ccm_cloudAssetGovernanceRule_execute`)</li><li>Dry Execute (`ccm_cloudAssetGovernanceRule_dryExecute`)</li></ul> | Active |
| Cloud Asset Governance Rule Set | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Create / Edit (`ccm_cloudAssetGovernanceRuleSet_edit`)</li><li>View (`ccm_cloudAssetGovernanceRuleSet_view`)</li><li>Delete (`ccm_cloudAssetGovernanceRuleSet_delete`)</li></ul> | Active |
| Cluster Orchestrator | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Create / Edit (`ccm_clusterOrchestrator_edit`)</li><li>View (`ccm_clusterOrchestrator_view`)</li></ul> | Active |
| Commitment Orchestrator | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Create / Edit (`ccm_commitmentOrchestrator_edit`)</li><li>View (`ccm_commitmentOrchestrator_view`)</li></ul> | Active |
| Cost Categories | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_costCategory_view`)</li><li>Create / Edit (`ccm_costCategory_edit`)</li><li>Delete (`ccm_costCategory_delete`)</li></ul> | Active |
| Currency Preferences | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_currencyPreference_view`)</li><li>Create / Edit (`ccm_currencyPreference_edit`)</li></ul> | Active |
| Data Job Status | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_dataJobStatus_view`)</li></ul> | Active |
| Data Scope | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_dataScope_view`)</li></ul> | Active |
| Folders | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_folder_view`)</li><li>Create / Edit (`ccm_folder_edit`)</li><li>Delete (`ccm_folder_delete`)</li></ul> | Active |
| Load Balancer | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_loadBalancer_view`)</li><li>Create / Edit (`ccm_loadBalancer_edit`)</li><li>Delete (`ccm_loadBalancer_delete`)</li></ul> | Active |
| Overview | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_overview_view`)</li></ul> | Active |
| Perspectives | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_perspective_view`)</li><li>Create / Edit (`ccm_perspective_edit`)</li><li>Delete (`ccm_perspective_delete`)</li></ul> | Active |
| Recommendations | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_recommendations_view`)</li><li>Manage (`ccm_recommendations_manage`)</li></ul> | Active |
| Unit Cost | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`ccm_unitCost_view`)</li><li>Create / Edit (`ccm_unitCost_edit`)</li><li>Delete (`ccm_unitCost_delete`)</li></ul> | Active |

### Cloud Development Environments

| Resource | Permissions | Status |
| --- | --- | --- |
| Gitspace | <ul><li>Create (`cde_gitspace_create`)</li><li>View (`cde_gitspace_view`)</li><li>Execute (`cde_gitspace_use`)</li><li>Edit (`cde_gitspace_edit`)</li><li>Delete (`cde_gitspace_delete`)</li></ul> | Experimental |
| Infrastructure Provider | <ul><li>View (`cde_infraprovider_view`)</li><li>Edit (`cde_infraprovider_edit`)</li><li>Delete (`cde_infraprovider_delete`)</li></ul> | Experimental |

### Code Repository

| Resource | Permissions | Status |
| --- | --- | --- |
| Repository | <ul><li>View (`code_repo_view`)</li><li>Review (`code_repo_review`)</li><li>Edit (`code_repo_edit`)</li><li>Create (`code_repo_create`)</li><li>Delete (`code_repo_delete`)</li><li>Push (`code_repo_push`)</li><li>Report Commit Check (`code_repo_reportCommitCheck`)</li></ul> | Active |

### Feature Flags

| Resource | Permissions | Status |
| --- | --- | --- |
| Environment | <ul><li>Target Group Edit (`ff_environment_targetGroupEdit`)</li><li>API Key View (`ff_environment_apiKeyView`)</li><li>Create FF SDK Key (`ff_environment_apiKeyCreate`)</li><li>Delete FF SDK Key (`ff_environment_apiKeyDelete`)</li><li>Create / Edit (`ff_environment_edit`)</li><li>View (`ff_environment_view`)</li></ul> | Active |
| Feature Flag | <ul><li>Create (`ff_featureflag_create`)</li><li>Edit Config (`ff_featureflag_configEdit`)</li><li>Edit Rules (`ff_featureflag_rulesEdit`)</li><li>Create / Edit (`ff_featureflag_edit`)</li><li>Delete (`ff_featureflag_delete`)</li><li>View (`ff_featureflag_view`)</li><li>Toggle (`ff_featureflag_toggle`)</li></ul> | Active |
| Proxy API Keys | Available at the account and org [scopes](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Create (`ff_proxyapikey_create`)</li><li>Edit (`ff_proxyapikey_edit`)</li><li>Delete (`ff_proxyapikey_delete`)</li><li>Rotate (`ff_proxyapikey_rotate`)</li><li>View (`ff_proxyapikey_view`)</li></ul> | Active |
| Target | <ul><li>View (`ff_target_view`)</li></ul> | Active |
| Target Management | <ul><li>View (`ff_targetgroup_view`)</li><li>Create / Edit (`ff_targetgroup_edit`)</li><li>Delete (`ff_targetgroup_delete`)</li></ul> | Active |

### GitOps

| Resource | Permissions | Status |
| --- | --- | --- |
| Agents | <ul><li>View (`gitops_agent_view`)</li><li>Create / Edit (`gitops_agent_edit`)</li><li>Delete (`gitops_agent_delete`)</li></ul> | Active |
| Application Sets | <ul><li>View (`gitops_applicationset_view`)</li><li>Create / Edit (`gitops_applicationset_edit`)</li><li>Delete (`gitops_applicationset_delete`)</li></ul> | Active |
| Applications | <ul><li>View (`gitops_application_view`)</li><li>Create / Edit (`gitops_application_edit`)</li><li>Delete (`gitops_application_delete`)</li><li>Sync (`gitops_application_sync`)</li><li>Exec (`gitops_application_exec`), Experimental</li><li>Resource Action (`gitops_application_resourceaction`), Experimental</li></ul> | Active |
| Argo Project | <ul><li>View (`gitops_argoproject_view`)</li><li>Create / Edit (`gitops_argoproject_edit`)</li><li>Delete (`gitops_argoproject_delete`)</li></ul> | Active |
| Certificates | <ul><li>View (`gitops_cert_view`)</li><li>Create / Edit (`gitops_cert_edit`)</li><li>Delete (`gitops_cert_delete`)</li></ul> | Active |
| Clusters | <ul><li>View (`gitops_cluster_view`)</li><li>Create / Edit (`gitops_cluster_edit`)</li><li>Delete (`gitops_cluster_delete`)</li></ul> | Active |
| Repositories | <ul><li>View (`gitops_repository_view`)</li><li>Create / Edit (`gitops_repository_edit`)</li><li>Delete (`gitops_repository_delete`)</li></ul> | Active |
| Repository Certificates | <ul><li>View (`gitops_gpgkey_view`)</li><li>Create / Edit (`gitops_gpgkey_edit`)</li><li>Delete (`gitops_gpgkey_delete`)</li></ul> | Active |

### Infrastructure as Code

| Resource | Permissions | Status |
| --- | --- | --- |
| IACM Inventory | <ul><li>View (`iac_inventory_view`)</li><li>Create / Edit (`iac_inventory_edit`)</li><li>Delete (`iac_inventory_delete`)</li><li>Edit Var (`iac_inventory_editvariable`)</li><li>Delete Var (`iac_inventory_deletevariable`)</li><li>Approve (`iac_inventory_approve`)</li></ul> | Active |
| IACM Playbook | <ul><li>View (`iac_playbook_view`)</li><li>Create / Edit (`iac_playbook_edit`)</li><li>Delete (`iac_playbook_delete`)</li><li>Edit Var (`iac_playbook_editvariable`)</li><li>Delete Var (`iac_playbook_deletevariable`)</li><li>Approve (`iac_playbook_approve`)</li></ul> | Active |
| IACM Provider Registry | <ul><li>Create / Edit (`iac_providerregistry_edit`)</li><li>Delete (`iac_providerregistry_delete`)</li><li>View (`iac_providerregistry_view`)</li></ul> | Experimental |
| IACM Workspaces | <ul><li>View (`iac_workspace_view`)</li><li>Create / Edit (`iac_workspace_edit`)</li><li>Delete (`iac_workspace_delete`)</li><li>Edit Var (`iac_workspace_editvariable`)</li><li>Delete Var (`iac_workspace_deletevariable`)</li><li>Approve (`iac_workspace_approve`)</li><li>Workspace Access State (`iac_workspace_accessstate`)</li><li>Remote Plan (`iac_workspace_executeremoteplan`)</li></ul> | Active |
| Registry | <ul><li>Create / Edit (`iac_registry_edit`)</li><li>Delete (`iac_registry_delete`)</li><li>View (`iac_registry_view`)</li></ul> | Active |
| Variable Sets | <ul><li>View (`iac_variableset_view`)</li><li>Create / Edit (`iac_variableset_edit`)</li><li>Delete (`iac_variableset_delete`)</li></ul> | Experimental |

### Service Reliability

| Resource | Permissions | Status |
| --- | --- | --- |
| Downtime | <ul><li>View (`chi_downtime_view`)</li><li>Create / Edit (`chi_downtime_edit`)</li><li>Delete (`chi_downtime_delete`)</li></ul> | Active |
| Monitored Services | <ul><li>View (`chi_monitoredservice_view`)</li><li>Create / Edit (`chi_monitoredservice_edit`)</li><li>Delete (`chi_monitoredservice_delete`)</li><li>Toggle (`chi_monitoredservice_toggle`)</li></ul> | Active |
| SLO | <ul><li>View (`chi_slo_view`)</li><li>Create / Edit (`chi_slo_edit`)</li><li>Delete (`chi_slo_delete`)</li></ul> | Active |

### Incident Response

| Resource | Permissions | Status |
| --- | --- | --- |
| Alert | <ul><li>View (`iro_alert_view`)</li><li>Create / Edit (`iro_alert_edit`)</li><li>Configure (`iro_alert_config`)</li></ul> | Active |
| Alert Rule | <ul><li>Create (`iro_alertrule_create`)</li><li>Edit (`iro_alertrule_edit`)</li><li>Delete (`iro_alertrule_delete`)</li></ul> | Active |
| Escalation Policy | <ul><li>View (`iro_iroescalationpolicy_view`)</li><li>Create (`iro_iroescalationpolicy_create`)</li><li>Edit (`iro_iroescalationpolicy_edit`)</li><li>Delete (`iro_iroescalationpolicy_delete`)</li></ul> | Active |
| Incident | <ul><li>View (`iro_incident_view`)</li><li>Create / Edit (`iro_incident_edit`)</li><li>Configure (`iro_incident_config`)</li><li>Send Status Update (`iro_incident_sendstatusupdate`), Experimental</li></ul> | Active |
| Incident Response Access | <ul><li>Manage (`iro_iroaccess_manage`)</li></ul> | Active |
| Incident Response Integration | <ul><li>View (`iro_irointegration_view`)</li><li>Create (`iro_irointegration_create`)</li><li>Edit (`iro_irointegration_edit`)</li><li>Delete (`iro_irointegration_delete`)</li></ul> | Active |
| Incident Response Workspace | <ul><li>Configure (`iro_iroworkspace_config`)</li></ul> | Active |
| Metric Source | <ul><li>Edit (`iro_metricsource_edit`)</li><li>Delete (`iro_metricsource_delete`)</li><li>View (`iro_metricsource_view`)</li><li>Create (`iro_metricsource_create`)</li></ul> | Active |
| On-Call Schedule | <ul><li>View (`iro_iroschedule_view`)</li><li>Create (`iro_iroschedule_create`)</li><li>Edit (`iro_iroschedule_edit`)</li><li>Delete (`iro_iroschedule_delete`)</li></ul> | Active |
| On-Call Schedule Override | <ul><li>View (`iro_iroscheduleoverride_view`)</li><li>Create (`iro_iroscheduleoverride_create`)</li><li>Edit (`iro_iroscheduleoverride_edit`)</li><li>Delete (`iro_iroscheduleoverride_delete`)</li></ul> | Active |
| Runbook | <ul><li>View (`iro_runbook_view`)</li><li>Edit (`iro_runbook_edit`)</li><li>Delete (`iro_runbook_delete`)</li><li>Trigger (`iro_runbook_trigger`)</li></ul> | Active |
| Service Directory | <ul><li>View (`iro_servicedirectory_view`)</li><li>Edit (`iro_servicedirectory_edit`)</li><li>Delete (`iro_servicedirectory_delete`)</li><li>Manage Subscriptions (`iro_servicedirectory_managesubscriptions`)</li></ul> | Experimental |
| Third-Party Integrations | <ul><li>View (`iro_thirdpartyintegrations_view`)</li><li>Edit (`iro_thirdpartyintegrations_edit`)</li><li>Delete (`iro_thirdpartyintegrations_delete`)</li></ul> | Experimental |

### Security Tests

| Resource | Permissions | Status |
| --- | --- | --- |
| Exemptions | <ul><li>View (`sto_exemption_view`)</li><li>Create / Edit (`sto_exemption_create`)</li><li>Approve / Reject (`sto_exemption_approve`)</li></ul> | Active |
| External Tickets | <ul><li>View (`sto_ticket_view`)</li><li>Create / Edit (`sto_ticket_edit`)</li><li>Delete (`sto_ticket_delete`)</li></ul> | Active |
| Issues | <ul><li>View (`sto_issue_view`)</li><li>Create / Edit (`sto_issue_edit`)</li></ul> | Active |
| Scans | <ul><li>View (`sto_scan_view`)</li><li>Create / Edit (`sto_scan_edit`)</li></ul> | Active |
| Test Targets | <ul><li>View (`sto_testtarget_view`)</li><li>Create / Edit (`sto_testtarget_edit`)</li><li>Approve / Reject (`sto_testtarget_approve`)</li></ul> | Active |

### Internal Developer Portal

| Resource | Permissions | Status |
| --- | --- | --- |
| Advanced Configurations | <ul><li>View (`idp_advancedconfiguration_view`)</li><li>Create / Edit (`idp_advancedconfiguration_edit`)</li><li>Delete (`idp_advancedconfiguration_delete`)</li></ul> | Active |
| Aggregation Rule | <ul><li>View (`idp_aggregationrule_view`)</li><li>Create (`idp_aggregationrule_create`)</li><li>Edit (`idp_aggregationrule_edit`)</li><li>Delete (`idp_aggregationrule_delete`)</li><li>Compute (`idp_aggregationrule_compute`)</li></ul> | Active |
| Catalog | <ul><li>View (`idp_catalog_view`)</li><li>Create / Edit (`idp_catalog_edit`)</li><li>Delete (`idp_catalog_delete`)</li></ul> | Active |
| Catalog Access Policies | <ul><li>View (`idp_catalogaccesspolicy_view`)</li><li>Create (`idp_catalogaccesspolicy_create`)</li><li>Edit (`idp_catalogaccesspolicy_edit`)</li><li>Delete (`idp_catalogaccesspolicy_delete`)</li></ul> | Active |
| Environment Blueprint | <ul><li>View (`idp_environmentblueprint_view`)</li><li>Create (`idp_environmentblueprint_create`)</li><li>Edit (`idp_environmentblueprint_edit`)</li><li>Delete (`idp_environmentblueprint_delete`)</li></ul> | Active |
| IDP Environment | <ul><li>View (`idp_idpenvironment_view`)</li><li>Create (`idp_idpenvironment_create`)</li><li>Edit (`idp_idpenvironment_edit`)</li><li>Delete (`idp_idpenvironment_delete`)</li></ul> | Active |
| IDP Module | <ul><li>Access (`idp_module_access`)</li></ul> | Active |
| IDP Team | <ul><li>View (`idp_team_view`)</li><li>Create / Edit (`idp_team_edit`)</li><li>Delete (`idp_team_delete`)</li></ul> | Active |
| Integrations | <ul><li>View (`idp_integration_view`)</li><li>Create (`idp_integration_create`)</li><li>Edit (`idp_integration_edit`)</li><li>Delete (`idp_integration_delete`)</li></ul> | Active |
| Layouts | <ul><li>View (`idp_layout_view`)</li><li>Create / Edit (`idp_layout_edit`)</li></ul> | Active |
| Plugins | <ul><li>View (`idp_plugin_view`)</li><li>Create / Edit (`idp_plugin_edit`)</li><li>Toggle (`idp_plugin_toggle`)</li><li>Delete (`idp_plugin_delete`)</li></ul> | Active |
| Scorecards | <ul><li>View (`idp_scorecard_view`)</li><li>Create / Edit (`idp_scorecard_edit`)</li><li>Delete (`idp_scorecard_delete`)</li></ul> | Active |
| Workflow | <ul><li>View (`idp_workflow_view`)</li><li>Create / Edit (`idp_workflow_edit`)</li><li>Delete (`idp_workflow_delete`)</li><li>Execute (`idp_workflow_execute`)</li></ul> | Active |

### Continuous Error Tracking

| Resource | Permissions | Status |
| --- | --- | --- |
| Agents | <ul><li>View (`cet_agents_view`)</li></ul> | Active |
| Critical Events | <ul><li>View (`cet_criticalevent_view`)</li><li>Create / Edit (`cet_criticalevent_create`)</li><li>Delete (`cet_criticalevent_delete`)</li></ul> | Active |
| Tokens | <ul><li>View (`cet_token_view`)</li><li>Create / Edit (`cet_token_create`)</li><li>Revoke (`cet_token_revoke`)</li></ul> | Active |

### Database DevOps

| Resource | Permissions | Status |
| --- | --- | --- |
| Instances | <ul><li>View (`dbops_instance_view`)</li><li>Create / Edit (`dbops_instance_edit`)</li><li>Delete (`dbops_instance_delete`)</li></ul> | Active |
| Schemas | <ul><li>View (`dbops_schema_view`)</li><li>Create / Edit (`dbops_schema_edit`)</li><li>Delete (`dbops_schema_delete`)</li></ul> | Active |

### Artifact Management

| Resource | Permissions | Status |
| --- | --- | --- |
| Artifact Registry | <ul><li>View Registry (`artifact_artregistry_view`)</li><li>Edit Registry (`artifact_artregistry_edit`)</li><li>Delete Registry (`artifact_artregistry_delete`)</li><li>Upload (`artifact_artregistry_uploadartifact`)</li><li>Download (`artifact_artregistry_downloadartifact`)</li><li>Delete Artifact (`artifact_artregistry_deleteartifact`)</li><li>Quarantine Artifact (`artifact_artregistry_quarantineartifact`)</li></ul> | Active |
| Firewall Exceptions | <ul><li>Approve (`artifact_firewallexceptions_approve`)</li></ul> | Active |

### AI

| Resource | Permissions | Status |
| --- | --- | --- |
| AI LLM Gateway | <ul><li>Access (`ai_llmgateway_access`)</li></ul> | Active |
| AI Rules | <ul><li>Create (`ai_rules_create`)</li><li>Edit (`ai_rules_edit`)</li><li>Delete (`ai_rules_delete`)</li><li>View (`ai_rules_view`)</li></ul> | Active |
| AI Worker Agent | <ul><li>View (`ai_workeragent_view`)</li><li>Create (`ai_workeragent_create`)</li><li>Edit (`ai_workeragent_edit`)</li><li>Delete (`ai_workeragent_delete`)</li><li>Execute (`ai_workeragent_execute`)</li></ul> | Active |

### AI DLC Insights

| Resource | Permissions | Status |
| --- | --- | --- |
| AIDI Collections | <ul><li>Create (`sei_seicollections_create`)</li><li>View (`sei_seicollections_view`)</li><li>Edit (`sei_seicollections_edit`)</li><li>Delete (`sei_seicollections_delete`)</li></ul> | Active |
| AIDI Configuration Settings | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>Create (`sei_seiconfigurationsettings_create`)</li><li>View (`sei_seiconfigurationsettings_view`)</li><li>Edit (`sei_seiconfigurationsettings_edit`)</li><li>Delete (`sei_seiconfigurationsettings_delete`)</li></ul> | Active |
| AIDI Data Settings | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`sei_seidatasettings_view`)</li><li>Edit (`sei_seidatasettings_edit`)</li><li>Create (`sei_seidatasettings_create`)</li><li>Delete (`sei_seidatasettings_delete`)</li></ul> | Active |
| AIDI Insight Categories | <ul><li>View (`sei_seiinsightscategory_view`)</li></ul> | Active |
| AIDI Insights | <ul><li>Create (`sei_seiinsights_create`)</li><li>View (`sei_seiinsights_view`)</li><li>Edit (`sei_seiinsights_edit`)</li><li>Delete (`sei_seiinsights_delete`)</li></ul> | Active |
| AIDI Profiles | Available at the account [scope](/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes) only.<br/><ul><li>View (`sei_seiprofiles_view`)</li><li>Edit (`sei_seiprofiles_edit`)</li><li>Create (`sei_seiprofiles_create`)</li><li>Delete (`sei_seiprofiles_delete`)</li></ul> | Active |
| AIDI Studio | <ul><li>View (`sei_seicanvas_view`)</li><li>Create / Edit (`sei_seicanvas_edit`)</li><li>Create (`sei_seicanvas_create`)</li><li>Delete (`sei_seicanvas_delete`)</li></ul> | Active |
| AIDI Teams | <ul><li>View (`sei_seiteams_view`)</li><li>Edit (`sei_seiteams_edit`)</li><li>Create (`sei_seiteams_create`)</li><li>Delete (`sei_seiteams_delete`)</li></ul> | Active |

### Feature Management and Experimentation

| Resource | Permissions | Status |
| --- | --- | --- |
| FME Environment | <ul><li>View (`fme_fmeenvironment_view`)</li><li>Edit (`fme_fmeenvironment_edit`)</li><li>Data Export View (`fme_fmeenvironment_dataExportView`)</li><li>Data Export Edit (`fme_fmeenvironment_dataExportEdit`)</li><li>SDK API Key View (`fme_fmeenvironment_sdkApiKeyView`)</li><li>SDK API Key Edit (`fme_fmeenvironment_sdkApiKeyEdit`)</li></ul> | Active |
| FME Experiment | <ul><li>View (`fme_fmeexperiment_view`)</li><li>Edit (`fme_fmeexperiment_edit`)</li></ul> | Active |
| FME Feature Flag | <ul><li>Archive (`fme_fmefeatureflag_archive`)</li><li>Unarchive (`fme_fmefeatureflag_unarchive`)</li><li>View (`fme_fmefeatureflag_view`)</li><li>Edit (`fme_fmefeatureflag_edit`)</li><li>Create (`fme_fmefeatureflag_create`), Experimental</li><li>Edit Flag (`fme_fmefeatureflag_editFlag`), Experimental</li><li>Edit Targeting (`fme_fmefeatureflag_editTargeting`), Experimental</li><li>Kill Switch (`fme_fmefeatureflag_killSwitch`), Experimental</li><li>Delete (`fme_fmefeatureflag_delete`), Experimental</li></ul> | Active |
| FME Metric | <ul><li>View (`fme_fmemetric_view`)</li><li>Edit (`fme_fmemetric_edit`)</li></ul> | Active |
| FME Segment | <ul><li>View (`fme_fmesegment_view`)</li><li>Edit (`fme_fmesegment_edit`)</li></ul> | Active |
| FME Traffic Type | <ul><li>View (`fme_fmetraffictype_view`)</li><li>Edit (`fme_fmetraffictype_edit`)</li></ul> | Active |

### Load Testing

| Resource | Permissions | Status |
| --- | --- | --- |
| Load Test | <ul><li>View (`load_loadtest_view`)</li><li>Create / Edit (`load_loadtest_edit`)</li><li>Delete (`load_loadtest_delete`)</li></ul> | Active |
