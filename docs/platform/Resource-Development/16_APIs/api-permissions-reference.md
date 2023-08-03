---
title: API permissions reference
description: Permissions for API keys
sidebar_position: 4
helpdocs_topic_id: bhkc68vy9c
helpdocs_category_id: 4przngb8nk
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the permissions available for [API keys](./add-and-manage-api-keys.md) and [service accounts](../../role-based-access-control/add-and-manage-service-account.md) in Harness.

These permissions are used by API keys to perform various actions through [Harness APIs](./api-quickstart.md). Subsets of these permissions are applied to [API keys and tokens](./add-and-manage-api-keys.md) when you create them. You can create API keys under your own account or service accounts, and the keys and tokens inherit [permissions](../../role-based-access-control/permissions-reference.md) from the associated user or service account.

### Account or org scope

The following permissions are available at either the account or organization [scope](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) but not the project [scope](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).


### Any scope

The following permissions are available at any [scope](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).


## Account details, settings, and license

The following permissions allow an API key to manage Harness account details, settings, and Harness license.

These permissions are only available at the account [scope](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes):

* View account: `core_account_view`
* Edit account: `core_account_edit`

These permissions are available at all [scopes](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes):

* View account [settings](/docs/category/settings): `core_setting_view`
* Edit account [settings](/docs/category/settings): `core_setting_edit`
* View license: `core_license_view`
* Edit license: `core_license_edit`

## Audits

| **Account/Org/Project** | core\_audit\_view | View Audits |

## CCM

The following permissions allow an API key to interact with CCM. They are only available at the account [scope](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).

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

The following permissions allow an API key to interact with Chaos Engineering.

| **Account/Org/Project** | chaos\_chaoshub\_view | View Chaos Hubs |
| **Account/Org/Project** | chaos\_chaoshub\_edit | Edit Chaos Hubs |
| **Account/Org/Project** | chaos\_chaoshub\_delete | Delete Chaos Hubs |
| **Account/Org/Project** | chaos\_chaosinfrastructure\_view | View Chaos Infrastructures |
| **Account/Org/Project** | chaos\_chaosinfrastructure\_edit | Edit Chaos Infrastructures |
| **Account/Org/Project** | chaos\_chaosinfrastructure\_delete | Delete Chaos Infrastructures |
| **Account/Org/Project** | chaos\_chaosexperiment\_view | View Chaos Experiments |
| **Account/Org/Project** | chaos\_chaosexperiment\_edit | Edit Chaos Experiments |
| **Account/Org/Project** | chaos\_chaosexperiment\_delete | Delete Chaos Experiments |
| **Account/Org/Project** | chaos\_chaosgameday\_view | View Chaos GameDay |
| **Account/Org/Project** | chaos\_chaosgameday\_edit | Edit Chaos GameDay |
| **Account/Org/Project** | chaos\_chaosgameday\_delete | Delete Chaos GameDay |

## Connectors

The following permissions allow an API key to manage connectors.

| **Account/Org/Project** | core\_connector\_view | View Connectors |
| **Account/Org/Project** | core\_connector\_edit | Create or Edit Connectors |
| **Account/Org/Project** | core\_connector\_access | Access Connectors |
| **Account/Org/Project** | core\_connector\_delete | Delete Connectors |

## Dashboards

| **Account/Org** | core\_dashboards\_view | View Dashboards |
| **Account/Org** | core\_dashboards\_edit | Edit Dashboards |

## Delegates

The following permissions allow an API key to manage delegates.

| **Account/Org/Project** | core\_delegate\_view | View Delegates |
| **Account/Org/Project** | core\_delegate\_edit | Create or Edit Delegates |
| **Account/Org/Project** | core\_delegate\_delete | Delete Delegates |
| **Account/Org/Project** | core\_delegateconfiguration\_view | View Delegate Configurations |
| **Account/Org/Project** | core\_delegateconfiguration\_edit | Create/Edit Delegate Configurations |
| **Account/Org/Project** | core\_delegateconfiguration\_delete | Delete Delegate Configurations |

## Deployment freeze

The following permissions allow an API key to manage deployment freezes

| **Account/Org/Project** | core\_deploymentfreeze\_manage | Manage Deployment Freeze |
| **Account/Org/Project** | core\_deploymentfreeze\_override | Override a Deployment Freeze |
| **Account/Org/Project** | core\_deploymentfreeze\_global | Global Deployment Freeze |

## Environments

The following permissions allow an API key to manage environments and environment groups.

| **Account/Org/Project** | core\_environment\_view | View Environments |
| **Account/Org/Project** | core\_environment\_edit | Create/Edit Environments |
| **Account/Org/Project** | core\_environment\_delete | Delete Environments |
| **Account/Org/Project** | core\_environment\_access | Runtime access to Environments |
| **Account/Org/Project** | core\_environmentgroup\_view | View Environment Groups |
| **Account/Org/Project** | core\_environmentgroup\_edit | Create/Edit Environment Groups |
| **Account/Org/Project** | core\_environmentgroup\_delete | Delete Environment Groups |
| **Account/Org/Project** | core\_environmentgroup\_access | Runtime access to Environment Groups |

## Feature Flag

The following permissions allow an API key to interact with the Feature Flag module. They are available at any [scope](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).

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

The following permissions allow an API key to manage files.

| **Account/Org/Project** | core\_file\_view | View Files |
| **Account/Org/Project** | core\_file\_edit | Edit Files |
| **Account/Org/Project** | core\_file\_delete | Delete Files |
| **Account/Org/Project** | core\_file\_access | Access Files |

## GitOps

The following permissions allow an API key to interact with GitOps.

| **Account/Org/Project** | gitops\_agent\_view | View GitOps Agents |
| **Account/Org/Project** | gitops\_agent\_edit | Edit GitOps Agents |
| **Account/Org/Project** | gitops\_agent\_delete | Delete GitOps Agents |
| **Account/Org/Project** | gitops\_application\_view | View GitOps Applications |
| **Account/Org/Project** | gitops\_application\_edit | Edit GitOps Applications |
| **Account/Org/Project** | gitops\_application\_delete | Delete GitOps Applications |
| **Account/Org/Project** | gitops\_application\_sync | Syns GitOps Applications |
| **Account/Org/Project** | gitops\_repository\_view | View GitOps Repositories |
| **Account/Org/Project** | gitops\_repository\_edit | Edit GitOps Repositories |
| **Account/Org/Project** | gitops\_repository\_delete | Delete GitOps Repositories |
| **Account/Org/Project** | gitops\_cluster\_view | View GitOps Clusters |
| **Account/Org/Project** | gitops\_cluster\_edit | Edit GitOps Clusters |
| **Account/Org/Project** | gitops\_cluster\_delete | Delete GitOps Clusters |
| **Account/Org/Project** | gitops\_gpgkey\_view | View GitOps GPG keys |
| **Account/Org/Project** | gitops\_gpgkey\_edit | Edit GitOps GPG keys |
| **Account/Org/Project** | gitops\_gpgkey\_delete | Delete GitOps GPG keys |
| **Account/Org/Project** | gitops\_cert\_view | View GitOps Certificate |
| **Account/Org/Project** | gitops\_cert\_edit | Edit GitOps Certificate |
| **Account/Org/Project** | gitops\_cert\_delete | Delete GitOps Certificate |

## Governance Policies

The following permissions allow an API key to manage governance policies.

| **Account/Org/Project** | core\_governancePolicy\_edit | Create/Edit Policies |
| **Account/Org/Project** | core\_governancePolicy\_view | View Policies |
| **Account/Org/Project** | core\_governancePolicy\_delete | Delete Policies |
| **Account/Org/Project** | core\_governancePolicySets\_edit | Create/Edit Policy Sets |
| **Account/Org/Project** | core\_governancePolicySets\_view | View Policy Sets |
| **Account/Org/Project** | core\_governancePolicySets\_delete | Delete Policy Sets |
| **Account/Org/Project** | core\_governancePolicySets\_evaluate | Evaluate Policy Sets |

## Organizations

The following permissions allow an API key to manage organizations.

| **Account/Org** | core\_organization\_view | View Organizations |
| **Account/Org** | core\_organization\_create | Create Organizations |
| **Account/Org** |  core\_organization\_edit | Edit Organizations |
| **Account/Org** | core\_organization\_delete | Delete Organizations |

## Pipelines

The following permissions allow an API key to manage pipelines.

| **Account/Org/Project** | core\_pipeline\_view | View Pipelines |
| **Account/Org/Project** | core\_pipeline\_edit | Create/Edit Pipelines |
| **Account/Org/Project** | core\_pipeline\_delete | Delete Pipelines |
| **Account/Org/Project** | core\_pipeline\_execute | Run Pipelines |

## Projects

The following permissions allow an API key to manage projects. 

| **Account/Org/Project** | core\_project\_view | View Projects |
| **Account/Org/Project** | core\_project\_create | Create Projects |
| **Account/Org/Project** | core\_project\_edit | Edit Projects |
| **Account/Org/Project** | core\_project\_delete | Delete Projects |

## RBAC and auth

The following permissions allow an API key to manage RBAC and auth related resources, such as users, user groups, resource groups, roles, and service accounts.

| **Account/Org/Project** | core\_usergroup\_view | View User Groups |
| **Account/Org/Project** | core\_usergroup\_manage | Manage User Groups |
| **Account/Org/Project** | core\_user\_view | View Users |
| **Account/Org/Project** | core\_user\_manage | Manage Users |
| **Account/Org/Project** | core\_role\_view | View Roles |
| **Account/Org/Project** | core\_role\_edit | Create/Edit Roles |
| **Account/Org/Project** | core\_role\_delete | Delete Roles |
| **Account/Org/Project** | core\_resourcegroup\_view | View Resource Groups |
| **Account/Org/Project** | core\_resourcegroup\_edit | Create/Edit Resource Groups |
| **Account/Org/Project** | core\_resourcegroup\_delete | Delete Resource Groups |
| **Account/Org/Project** | core\_user\_invite | Invite Users |

These are only available at the account [scope](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes):
* View authorization settings: `core_authsetting_view`
* Edit authorization settings: `core_authsetting_edit`
* Delete authorization settings: `core_authsetting_delete`

### Service accounts

The following permissions allow a user to manage [service accounts](../../role-based-access-control/add-and-manage-service-account.md) in Harness. These permissions are only available at the account [scope](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes). <!-- conflicting info: table said they are available at all scopes-->

* View service accounts: `core_serviceaccount_view`
* Create/edit service accounts: `core_serviceaccount_edit`
* Delete service accounts: `core_serviceaccount_delete`

To manage [API keys](./add-and-manage-api-keys.md) for service accounts, the `core_serviceaccount_manageapikey` permission can be applied at any [scope](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).

## Secrets

The following permissions allow an API key to manage secrets.

| **Account** | core\_secret\_view | View Secrets |
| **Account/Org/Project** | core\_secret\_edit | Create or Edit Secrets |
| **Account/Org/Project** | core\_secret\_access | Access Secrets |
| **Account/Org/Project** | core\_secret\_delete | Delete Secrets |

## Services

The following permissions allow an API key to manage services.

| **Account/Org/Project** | core\_service\_view | View Services |
| **Account/Org/Project** | core\_service\_edit | Create/Edit Services |
| **Account/Org/Project** | core\_service\_delete | Delete Services |
| **Account/Org/Project** | core\_service\_access | Runtime access to Services |

## SMTP

The following permissions allow an API key to manage the SMTP configuration. These are only available at the account [scope](../../role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).

* View SMTP config: `core_smtp_view`
* Create/edit SMTP config: `core_smtp_edit`
* Delete SMTP config: `core_smtp_delete`

## SRM

The following permissions allow an API key to manage SRM.

| **Account/Org/Project** | chi\_monitoredservice\_view | View Monitored Services |
| **Account/Org/Project** | chi\_monitoredservice\_edit | Create/Edit Monitored Services |
| **Account/Org/Project** | chi\_monitoredservice\_delete | Delete Monitored Services |
| **Account/Org/Project** | chi\_monitoredservice\_toggle | Toggle Monitored Services on/off |
| **Account/Org/Project** | chi\_slo\_view | View SLOs |
| **Account/Org/Project** | chi\_slo\_edit | Create/Edit SLOs |
| **Account/Org/Project** | chi\_slo\_delete | Delete SLOs |

## STO

The following permissions allow an API key to manage STO.

| **Account/Org/Project** | sto\_testtarget\_view | View Test Targets |
| **Account/Org/Project** | sto\_testtarget\_edit | Edit Test Targets |
| **Account/Org/Project** | sto\_exemption\_view | View Exemptions |
| **Account/Org/Project** | sto\_exemption\_create | Create Exemptions |
| **Account/Org/Project** | sto\_exemption\_approve | Approve Exemptions |
| **Account/Org/Project** | sto\_issue\_view | View Security Issues |
| **Account/Org/Project** | sto\_scan\_view | View Security Scans |

## Templates

The following permissions allow an API key to manage templates.

| **Account/Org/Project** | core\_template\_view | View Templates |
| **Account/Org/Project** | core\_template\_copy | Copy Templates |
| **Account/Org/Project** | core\_template\_edit | Edit Templates |
| **Account/Org/Project** | core\_template\_delete | Delete Templates |
| **Account/Org/Project** | core\_template\_access | Access Templates |

## Variables

The following permissions allow an API key to manage variables.

| **Account/Org/Project** | core\_variable\_view | View Variables |
| **Account/Org/Project** | core\_variable\_edit | Edit Variables |
| **Account/Org/Project** | core\_variable\_delete | Delete Variables |
