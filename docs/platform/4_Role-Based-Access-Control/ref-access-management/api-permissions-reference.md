---
title: API Permissions Reference
description: API Keys permissions reference.
# sidebar_position: 2
helpdocs_topic_id: bhkc68vy9c
helpdocs_category_id: 4przngb8nk
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic gives you details of the Permissions available in the Harness system for API Keys and Service Accounts.

### Service Account

The following table lists permissions for Service Account. To know more about Service Accounts, see [Add and Manage Service Accounts](../6-add-and-manage-service-account.md).



|  |  |
| --- | --- |
| **Scope** | **Action** |
| **Account** | <li> core\_serviceaccount\_view</li><li>core\_serviceaccount\_edit</li><li>core\_serviceaccount\_delete</li>|

### API Key

The following table lists the permissions for Service Account. To know more about Service Accounts, see [Add and Manage API Keys](../7-add-and-manage-api-keys.md).



|  |  |
| --- | --- |
| **Scope** | **Action** |
| **Account/Org/Project** | core\_serviceaccount\_manageapikey|

### Harness API Permissions

The following table lists the permissions for accessing the Harness APIs.



|  |  |  |
| --- | --- | --- |
| **Scope** | **Permission Identifier** | **Description** |
| **Account/Org/Project** | core\_project\_view | View Projects |
| **Account/Org/Project** | core\_project\_create | Create Projects |
| **Account/Org/Project** | core\_project\_edit | Edit Projects |
| **Account/Org/Project** | core\_project\_delete | Delete Projects |
| **Account/Org** | core\_organization\_view | View Organizations |
| **Account/Org** | core\_organization\_create | Create Organizations |
| **Account/Org** |  core\_organization\_edit | Edit Organizations |
| **Account/Org** | core\_organization\_delete | Delete Organizations |
| **Account** | core\_account\_view | View Account |
| **Account** | core\_account\_edit | Edit Account |
| **Account** | core\_secret\_view | View Secrets |
| **Account/Org/Project** | core\_secret\_edit | Create or Edit Secrets |
| **Account/Org/Project** | core\_secret\_access | Access Secrets |
| **Account/Org/Project** | core\_secret\_delete | Delete Secrets |
| **Account/Org/Project** | core\_connector\_view | View Connectors |
| **Account/Org/Project** | core\_connector\_edit | Create or Edit Connectors |
| **Account/Org/Project** | core\_connector\_access | Access Connectors |
| **Account/Org/Project** | core\_connector\_delete | Delete Connectors |
| **Account** | core\_smtp\_view | View SMTP Config |
| **Account** | core\_smtp\_edit | Create or Edit SMTP Config |
| **Account** | core\_smtp\_delete | Delete SMTP Config |
| **Account/Org/Project** | core\_delegate\_view | View Delegates |
| **Account/Org/Project** | core\_delegate\_edit | Create or Edit Delegates |
| **Account/Org/Project** | core\_delegate\_delete | Delete Delegates |
| **Account/Org/Project** | core\_delegateconfiguration\_view | View Delegate Configurations |
| **Account/Org/Project** | core\_delegateconfiguration\_edit | Create/Edit Delegate Configurations |
| **Account/Org/Project** | core\_delegateconfiguration\_delete | Delete Delegate Configurations |
| **Account/Org/Project** | core\_pipeline\_view | View Pipelines |
| **Account/Org/Project** | core\_pipeline\_edit | Create/Edit Pipelines |
| **Account/Org/Project** | core\_pipeline\_delete | Delete Pipelines |
| **Account/Org/Project** | core\_pipeline\_execute | Run Pipelines |
| **Account/Org/Project** | core\_service\_view | View Services |
| **Account/Org/Project** | core\_service\_edit | Create/Edit Services |
| **Account/Org/Project** | core\_service\_delete | Delete Services |
| **Account/Org/Project** | core\_service\_access | Runtime access to Services |
| **Account/Org/Project** | core\_environment\_view | View Environments |
| **Account/Org/Project** | core\_environment\_edit | Create/Edit Environments |
| **Account/Org/Project** | core\_environment\_delete | Delete Environments |
| **Account/Org/Project** | core\_environment\_access | Runtime access to Environments |
| **Account/Org/Project** | core\_environmentgroup\_view | View Environment Groups |
| **Account/Org/Project** | core\_environmentgroup\_edit | Create/Edit Environment Groups |
| **Account/Org/Project** | core\_environmentgroup\_delete | Delete Environment Groups |
| **Account/Org/Project** | core\_environmentgroup\_access | Runtime access to Environment Groups |
| **Account/Org/Project** | core\_audit\_view | View Audits |
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
| **Account/Org/Project** | core\_license\_view | View License |
| **Account/Org/Project** | core\_license\_edit | Edit License |
| **Account/Org/Project** | core\_serviceaccount\_view | View Service Account details |
| **Account/Org/Project** | core\_serviceaccount\_edit | Edit Service Account details |
| **Account/Org/Project** | core\_serviceaccount\_delete | Delete Service Account details |
| **Account/Org/Project** | core\_serviceaccount\_manageapikey | Manage API keys for Service Account |
| **Account** | core\_authsetting\_view | View Auth settings |
| **Account** | core\_authsetting\_edit | Edit Auth settings |
| **Account** | core\_authsetting\_delete | Delete Auth settings |
| **Account/Org/Project** | ff\_featureflag\_edit | Create/Edit Feature Flags |
| **Account/Org/Project** | ff\_featureflag\_delete | Delete Feature Flags |
| **Account/Org/Project** | ff\_featureflag\_view | View Feature Flags |
| **Account/Org/Project** | ff\_targetgroup\_view | View Target Groups |
| **Account/Org/Project** | ff\_targetgroup\_edit | Create/Edit Target Groups |
| **Account/Org/Project** | ff\_targetgroup\_delete | Delete Target Groups |
| **Account/Org/Project** | ff\_environment\_targetGroupEdit | Edit Target Groups |
| **Account/Org/Project** | ff\_target\_view | View Targets |
| **Account/Org/Project** | ff\_environment\_apiKeyView | View Feature Flag Environment API Keys |
| **Account/Org/Project** | ff\_environment\_apiKeyCreate | Create Feature Flag Environment API Keys |
| **Account/Org/Project** | ff\_environment\_apiKeyDelete | Delete Feature Flag Environment API Keys |
| **Account/Org/Project** | ff\_environment\_edit | Edit Feature Flag Environment Configuration |
| **Account/Org/Project** | ff\_environment\_view | View Feature Flag Environment Configuration |
| **Account/Org/Project** | ff\_featureflag\_toggle | Toggle a Feature Flag on/off |
| **Account/Org** | core\_dashboards\_view | View Dashboards |
| **Account/Org** | core\_dashboards\_edit | Edit Dashboards |
| **Account/Org/Project** | core\_template\_view | View Templates |
| **Account/Org/Project** | core\_template\_copy | Copy Templates |
| **Account/Org/Project** | core\_template\_edit | Edit Templates |
| **Account/Org/Project** | core\_template\_delete | Delete Templates |
| **Account/Org/Project** | core\_template\_access | Access Templates |
| **Account/Org/Project** | core\_governancePolicy\_edit | Create/Edit Policies |
| **Account/Org/Project** | core\_governancePolicy\_view | View Policies |
| **Account/Org/Project** | core\_governancePolicy\_delete | Delete Policies |
| **Account/Org/Project** | core\_governancePolicySets\_edit | Create/Edit Policy Sets |
| **Account/Org/Project** | core\_governancePolicySets\_view | View Policy Sets |
| **Account/Org/Project** | core\_governancePolicySets\_delete | Delete Policy Sets |
| **Account/Org/Project** | core\_governancePolicySets\_evaluate | Evaluate Policy Sets |
| **Account/Org/Project** | chi\_monitoredservice\_view | View Monitored Services |
| **Account/Org/Project** | chi\_monitoredservice\_edit | Create/Edit Monitored Services |
| **Account/Org/Project** | chi\_monitoredservice\_delete | Delete Monitored Services |
| **Account/Org/Project** | chi\_monitoredservice\_toggle | Toggle Monitored Services on/off |
| **Account/Org/Project** | chi\_slo\_view | View SLOs |
| **Account/Org/Project** | chi\_slo\_edit | Create/Edit SLOs |
| **Account/Org/Project** | chi\_slo\_delete | Delete SLOs |
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
| **Account/Org/Project** | sto\_testtarget\_view | View Test Targets |
| **Account/Org/Project** | sto\_testtarget\_edit | Edit Test Targets |
| **Account/Org/Project** | sto\_exemption\_view | View Exemptions |
| **Account/Org/Project** | sto\_exemption\_create | Create Exemptions |
| **Account/Org/Project** | sto\_exemption\_approve | Approve Exemptions |
| **Account/Org/Project** | sto\_issue\_view | View Security Issues |
| **Account/Org/Project** | sto\_scan\_view | View Security Scans |
| **Account/Org/Project** | core\_file\_view | View Files |
| **Account/Org/Project** | core\_file\_edit | Edit Files |
| **Account/Org/Project** | core\_file\_delete | Delete Files |
| **Account/Org/Project** | core\_file\_access | Access Files |
| **Account/Org/Project** | core\_variable\_view | View Variables |
| **Account/Org/Project** | core\_variable\_edit | Edit Variables |
| **Account/Org/Project** | core\_variable\_delete | Delete Variables |
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
| **Account/Org/Project** | core\_setting\_view | View Settings |
| **Account/Org/Project** | core\_setting\_edit | Edit Settings |
| **Account** | ccm\_perspective\_view | View CCM Perspective |
| **Account** | ccm\_perspective\_edit | Edit CCM Perspective |
| **Account** | ccm\_perspective\_delete | Delete CCM Perspective |
| **Account** | ccm\_budget\_view | View CCM Budgets |
| **Account** | ccm\_budget\_edit | Edit CCM Budgets |
| **Account** | ccm\_budget\_delete | Delete CCM Budgets |
| **Account** | ccm\_costCategory\_view | View CCM Cost Category |
| **Account** | ccm\_costCategory\_edit | Create/Edit CCM Cost Category |
| **Account** | ccm\_costCategory\_delete | Delete CCM Cost Category |
| **Account** | ccm\_autoStoppingRule\_view | View CCM Auto stopping Rules |
| **Account** | ccm\_autoStoppingRule\_edit | Create/Edit CCM Auto stopping Rules |
| **Account** | ccm\_autoStoppingRule\_delete | Delete CCM Auto stopping Rules |
| **Account** | ccm\_folder\_view | View CCM Folders |
| **Account** | ccm\_folder\_edit | Create/Edit CCM Folders |
| **Account** | ccm\_folder\_delete | Delete CCM Folders |
| **Account** | ccm\_loadBalancer\_view | View CCM Load Balancers |
| **Account** | ccm\_loadBalancer\_edit | Create/Edit CCM Load Balancers |
| **Account** | ccm\_loadBalancer\_delete | Delete CCM Load Balancers |
| **Account** | ccm\_overview\_view | View CCM Overview page |
| **Account/Org/Project** | core\_deploymentfreeze\_manage | Manage Deployment Freeze |
| **Account/Org/Project** | core\_deploymentfreeze\_override | Override a Deployment Freeze |
| **Account/Org/Project** | core\_deploymentfreeze\_global | Global Deployment Freeze |

