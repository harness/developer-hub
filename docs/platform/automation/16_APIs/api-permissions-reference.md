---
title: API permissions reference
description: Permissions for API keys
sidebar_position: 4
helpdocs_topic_id: bhkc68vy9c
helpdocs_category_id: 4przngb8nk
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the permissions available for [API keys](./add-and-manage-api-keys) and [service accounts](../../role-based-access-control/add-and-manage-service-account.md) in Harness.

These permissions are used by API keys to perform various actions through [Harness APIs](./api-quickstart.md). Subsets of these permissions are applied to [API keys and tokens](./add-and-manage-api-keys.md) when you create them. You can create API keys under your own account or service accounts, and the keys and tokens inherit [permissions](../../role-based-access-control/permissions-reference.md) from the associated user or service account.

## Account

The following permissions allow an API key to manage a Harness account's details, settings, and license.

* View account: `core_account_view`
* Edit account: `core_account_edit`
* View account [settings](/docs/category/settings): `core_setting_view`
* Edit account [settings](/docs/category/settings): `core_setting_edit`
* View license: `core_license_view`
* Edit license: `core_license_edit`

`core_account_view` and `core_account_edit` are only available at the account [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes). The `setting` and `license` permissions are available at any scope.

## Audits

The `core_audit_view` permission allows an API key to view audits. It is available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

## CCM

The following permissions allow an API key to interact with CCM. They are only available at the account [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

| Permission ID | Description |
| --------- | ----------- |
| `ccm_perspective_view` | View CCM Perspective |
| `ccm_perspective_edit` | Edit CCM Perspective |
| `ccm_perspective_delete` | Delete CCM Perspective |
| `ccm_budget_view` | View CCM Budgets |
| `ccm_budget_edit` | Edit CCM Budgets |
| `ccm_budget_delete` | Delete CCM Budgets |
| `ccm_costCategory_view` | View CCM Cost Category |
| `ccm_costCategory_edit` | Create/Edit CCM Cost Category |
| `ccm_costCategory_delete` | Delete CCM Cost Category |
| `ccm_autoStoppingRule_view` | View CCM Auto stopping Rules |
| `ccm_autoStoppingRule_edit` | Create/Edit CCM Auto stopping Rules |
| `ccm_autoStoppingRule_delete` | Delete CCM Auto stopping Rules |
| `ccm_folder_view` | View CCM Folders |
| `ccm_folder_edit` | Create/Edit CCM Folders |
| `ccm_folder_delete` | Delete CCM Folders |
| `ccm_loadBalancer_view` | View CCM Load Balancers |
| `ccm_loadBalancer_edit` | Create/Edit CCM Load Balancers |
| `ccm_loadBalancer_delete` | Delete CCM Load Balancers |
| `ccm_overview_view` | View CCM Overview page |

## Chaos Engineering

The following permissions allow an API key to interact with Chaos Engineering. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

| Permission ID | Description |
| --------- | ----------- |
| `chaos_chaoshub_view` | View Chaos Hubs |
| `chaos_chaoshub_edit` | Edit Chaos Hubs |
| `chaos_chaoshub_delete` | Delete Chaos Hubs |
| `chaos_chaosinfrastructure_view` | View Chaos Infrastructures |
| `chaos_chaosinfrastructure_edit` | Edit Chaos Infrastructures |
| `chaos_chaosinfrastructure_delete` | Delete Chaos Infrastructures |
| `chaos_chaosexperiment_view` | View Chaos Experiments |
| `chaos_chaosexperiment_edit` | Edit Chaos Experiments |
| `chaos_chaosexperiment_delete` | Delete Chaos Experiments |
| `chaos_chaosgameday_view` | View Chaos GameDay |
| `chaos_chaosgameday_edit` | Edit Chaos GameDay |
| `chaos_chaosgameday_delete` | Delete Chaos GameDay |

## Connectors

The following permissions allow an API key to manage connectors. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View connectors: `core_connector_view`
* Create/edit connectors: `core_connector_edit`
* Access connectors: `core_connector_access`
* Delete connectors: `core_connector_delete`

## Dashboards

The following permissions allow an API key to manage account dashboards. They are available at either the account or organization [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes) but not the project [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View dashboards: `core_dashboards_view`
* Edit dashboards: `core_dashboards_edit`

## Delegates

The following permissions allow an API key to manage delegates. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

| Permission ID | Description |
| --------- | ----------- |
| `core_delegate_view` | View Delegates |
| `core_delegate_edit` | Create or Edit Delegates |
| `core_delegate_delete` | Delete Delegates |
| `core_delegateconfiguration_view` | View Delegate Configurations |
| `core_delegateconfiguration_edit` | Create/Edit Delegate Configurations |
| `core_delegateconfiguration_delete` | Delete Delegate Configurations |

## Deployment freeze

The following permissions allow an API key to manage deployment freezes. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* Manage deployment freezes: `core_deploymentfreeze_manage`
* Override deployment freezes: `core_deploymentfreeze_override`
* Apply global deployment freeze: `core_deploymentfreeze_global`

## Environments

The following permissions allow an API key to manage environments and environment groups. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

| Permission ID | Description |
| --------- | ----------- |
| `core_environment_view` | View Environments |
| `core_environment_edit` | Create/Edit Environments |
| `core_environment_delete` | Delete Environments |
| `core_environment_access` | Runtime access to Environments |
| `core_environmentgroup_view` | View Environment Groups |
| `core_environmentgroup_edit` | Create/Edit Environment Groups |
| `core_environmentgroup_delete` | Delete Environment Groups |
| `core_environmentgroup_access` | Runtime access to Environment Groups |

## Feature Flag

The following permissions allow an API key to interact with the Feature Flag module. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

| Permission ID | Description |
| --------- | ----------- |
| `ff_featureflag_edit` | Create/Edit Feature Flags |
| `ff_featureflag_delete` | Delete Feature Flags |
| `ff_featureflag_view` | View Feature Flags |
| `ff_targetgroup_view` | View Target Groups |
| `ff_targetgroup_edit` | Create/Edit Target Groups |
| `ff_targetgroup_delete` | Delete Target Groups |
| `ff_environment_targetGroupEdit` | Edit Target Groups |
| `ff_target_view` | View Targets |
| `ff_environment_apiKeyView` | View Feature Flag Environment API Keys |
| `ff_environment_apiKeyCreate` | Create Feature Flag Environment API Keys |
| `ff_environment_apiKeyDelete` | Delete Feature Flag Environment API Keys |
| `ff_environment_edit` | Edit Feature Flag Environment Configuration |
| `ff_environment_view` | View Feature Flag Environment Configuration |
| `ff_featureflag_toggle` | Toggle a Feature Flag on/off |

## Files

The following permissions allow an API key to manage files. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View files: `core_file_view`
* Edit files: `core_file_edit`
* Delete files: `core_file_delete`
* Access files: `core_file_access`

## GitOps

The following permissions allow an API key to interact with GitOps. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

| Permission ID | Description |
| --------- | ----------- |
| `gitops_agent_view` | View GitOps Agents |
| `gitops_agent_edit` | Edit GitOps Agents |
| `gitops_agent_delete` | Delete GitOps Agents |
| `gitops_application_view` | View GitOps Applications |
| `gitops_application_edit` | Edit GitOps Applications |
| `gitops_application_delete` | Delete GitOps Applications |
| `gitops_application_sync` | Syns GitOps Applications |
| `gitops_repository_view` | View GitOps Repositories |
| `gitops_repository_edit` | Edit GitOps Repositories |
| `gitops_repository_delete` | Delete GitOps Repositories |
| `gitops_cluster_view` | View GitOps Clusters |
| `gitops_cluster_edit` | Edit GitOps Clusters |
| `gitops_cluster_delete` | Delete GitOps Clusters |
| `gitops_gpgkey_view` | View GitOps GPG keys |
| `gitops_gpgkey_edit` | Edit GitOps GPG keys |
| `gitops_gpgkey_delete` | Delete GitOps GPG keys |
| `gitops_cert_view` | View GitOps Certificate |
| `gitops_cert_edit` | Edit GitOps Certificate |
| `gitops_cert_delete` | Delete GitOps Certificate |

## Governance Policies

The following permissions allow an API key to manage governance policies. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

| Permission ID | Description |
| --------- | ----------- |
| `core_governancePolicy_edit` | Create/Edit Policies |
| `core_governancePolicy_view` | View Policies |
| `core_governancePolicy_delete` | Delete Policies |
| `core_governancePolicySets_edit` | Create/Edit Policy Sets |
| `core_governancePolicySets_view` | View Policy Sets |
| `core_governancePolicySets_delete` | Delete Policy Sets |
| `core_governancePolicySets_evaluate` | Evaluate Policy Sets |

## Organizations

The following permissions allow an API key to manage organizations. They are available at either the account or organization [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes) but not the project [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View organizations: `core_organization_view`
* Create organizations: `core_organization_create`
* Edit organizations: `core_organization_edit`
* Delete organizations: `core_organization_delete`

## Pipelines

The following permissions allow an API key to manage pipelines. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View pipelines: `core_pipeline_view`
* Create/edit pipelines: `core_pipeline_edit`
* Delete pipelines: `core_pipeline_delete`
* Run pipelines: `core_pipeline_execute`

## Projects

The following permissions allow an API key to manage projects. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View projects: `core_project_view`
* Create projects: `core_project_create`
* Edit projects: `core_project_edit`
* Delete projects: `core_project_delete`

## RBAC and authorization

The following permissions allow an API key to manage RBAC and authorization related resources, such as users, user groups, resource groups, roles, and service accounts.

### Authorization

Authorization settings management permissions are only available at the account [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View authorization settings: `core_authsetting_view`
* Edit authorization settings: `core_authsetting_edit`
* Delete authorization settings: `core_authsetting_delete`

### Resource groups

Resource group management permissions are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View resource groups: `core_resourcegroup_view`
* Create/edit resource groups: `core_resourcegroup_edit`
* Delete resource groups: `core_resourcegroup_delete`

### Roles

Role management permissions are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View roles: `core_role_view`
* Create/edit roles: `core_role_edit`
* Delete roles: `core_role_delete`

### User groups

User group management permissions are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View user groups: `core_usergroup_view`
* Manage user groups: `core_usergroup_manage`

### Users

User management permissions are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* Invite users: `core_user_invite`
* View users: `core_user_view`
* Manage users: `core_user_manage`

### Service accounts

The following permissions allow an API key or user to manage [service accounts](../../role-based-access-control/add-and-manage-service-account) in Harness. These permissions are only available at the account [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes). <!-- conflicting info: table said they are available at all scopes-->

* View service accounts: `core_serviceaccount_view`
* Create/edit service accounts: `core_serviceaccount_edit`
* Delete service accounts: `core_serviceaccount_delete`

To manage [API keys](./add-and-manage-api-keys.md) for service accounts, the `core_serviceaccount_manageapikey` permission can be applied at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

## Secrets

The following permissions allow an API key to manage secrets.

* View secrets: `core_secret_view`
* Create/edit secrets: `core_secret_edit`
* Access secrets: `core_secret_access`
* Delete secrets: `core_secret_delete`

`core_secret_view` is only available at the account [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes). All other secrets permissions are available at all scopes.

## Services

The following permissions allow an API key to manage services. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View services: `core_service_view`
* Create/edit services: `core_service_edit`
* Delete services: `core_service_delete`
* Access services at runtime: `core_service_access`

## SMTP

The following permissions allow an API key to manage the SMTP configuration. These are only available at the account [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View SMTP config: `core_smtp_view`
* Create/edit SMTP config: `core_smtp_edit`
* Delete SMTP config: `core_smtp_delete`

## SRM

The following permissions allow an API key to manage SRM. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

| Permission ID | Description |
| --------- | ----------- |
| `chi_monitoredservice_view` | View Monitored Services |
| `chi_monitoredservice_edit` | Create/Edit Monitored Services |
| `chi_monitoredservice_delete` | Delete Monitored Services |
| `chi_monitoredservice_toggle` | Toggle Monitored Services on/off |
| `chi_slo_view` | View SLOs |
| `chi_slo_edit` | Create/Edit SLOs |
| `chi_slo_delete` | Delete SLOs |

## STO

The following permissions allow an API key to manage STO. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

| Permission ID | Description |
| --------- | ----------- |
| `sto_testtarget_view` | View Test Targets |
| `sto_testtarget_edit` | Edit Test Targets |
| `sto_exemption_view` | View Exemptions |
| `sto_exemption_create` | Create Exemptions |
| `sto_exemption_approve` | Approve Exemptions |
| `sto_issue_view` | View Security Issues |
| `sto_scan_view` | View Security Scans |

## Templates

The following permissions allow an API key to manage templates. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

| Permission ID | Description |
| --------- | ----------- |
| `core_template_view` | View Templates |
| `core_template_copy` | Copy Templates |
| `core_template_edit` | Edit Templates |
| `core_template_delete` | Delete Templates |
| `core_template_access` | Access Templates |

## Variables

The following permissions allow an API key to manage variables. They are available at any [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).

* View variables: `core_variable_view`
* Create/edit variables: `core_variable_edit`
* Delete variables: `core_variable_delete`