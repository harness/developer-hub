---
title: Permissions Reference
description: This document lists the default user groups and permissions present in the Harness Access Management system.
# sidebar_position: 2
helpdocs_topic_id: yaornnqh0z
helpdocs_category_id: 4przngb8nk
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic gives you details of the Harness Permissions and Default Roles and Resource Groups available in the Harness system.

### Default Roles

Each Harness Account, Organization and Project includes default Roles to help you with [RBAC](../1-rbac-in-harness.md).

The following table lists permissions corresponding to the default roles at the Account [scope](../1-rbac-in-harness.md#rbac-scope):



|  |  |  |
| --- | --- | --- |
| **Role** | **Resource Type** | **Permissions** |
| **Account Admin​** | Resource Groups | <li> **View** - Can view Resource Groups</li><li> **Create/Edit** - Can create and edit Resource Groups </li><li>**Delete** - Can delete Resource Groups </li>|
|  | Service Accounts | <li> **View** - Can view Service Accounts</li><li>**Create/Edit** - Can create and edit Service Accounts</li><li>**Delete** - Can delete Service Accounts</li><li>**Manage** - Can create/update/delete API keys and tokens</li>|
|  | Organizations | <li> **View** - Can view existing Organizations</li><li>**Create** - Can create new Organizations</li><li>**Edit** - Can edit existing Organizations</li><li>**Delete** - Can delete Organizations</li>
 |
|  | Roles |<li> **View** - Can view existing Roles</li><li>**Create/Edit** - Can create and edit Roles</li><li>**Delete** - Can delete existing Roles</li>
 |
|  | Account Settings | <li> **View** - Can view Account Settings</li><li>**Edit** - Can edit Account Settings</li>
 |
|  | Projects | <li> **View** - Can view existing Projects</li><li>**Create** - Can create new Projects</li><li>**Edit** - Can edit existing Projects</li><li>**Delete** - Can delete existing Projects</li>
 |
|  | Users | <li> **View** - Can view existing users</li><li>**Manage** - Can update/delete users and their role bindings</li><li>**Invite** - Can invite users to Harness</li>
 |
|  | Authentication Settings | <li> **View** - Can view Authentications settings</li><li>**Create/Edit** - Can create and edit Authentications settings</li><li>**Delete** - Can delete Authentications settings</li>
 |
|  | User Groups | <li> **View** - Can view User Groups</li><li>**Manage** - Can create/update/delete User Groups</li>
 |
|  | Governance Policy Sets | <li> **View** - Can view existing Governance Policy Sets</li><li>**Create/Edit** - Can create and edit Governance Policy Sets</li><li>**Delete** - Can delete existing Governance Policy Sets</li><li>**Evaluate** - Can evaluate Governance Policy Sets</li>
 |
|  | Variables |<li> **View** - Can view existing Variables</li><li>**Create/Edit** - Can create and edit Variables</li><li>**Delete** - Can delete existing Variables</li>
 |
|  | Templates | <li> **View** - Can view existing Templates</li><li>**Create/Edit** - Can create and edit Templates</li><li>**Delete** - Can delete existing Templates</li><li>**Access** - Can access referenced Templates at runtime</li>
 |
|  | Governance Policies | <li> **View** - Can view existing Governance Policies</li><li>**Create/Edit** - Can create and edit Governance Policies</li><li>**Delete** - Can delete existing Governance Policies</li>
 |
|  | Dashboards | <li> **View** - Can view Dashboards</li><li>**Manage** - Can manage and edit Dashboards</li>
 |
|  | Delegate Configurations | <li> **View** - Can view existing Delegate Configurations</li><li> **Create/Edit** - Can create and edit Delegate Configurations</li><li>**Delete** - Can delete existing Delegate Configurations</li>
 |
|  | Delegates | <li> **View** - Can view existing Delegates</li><li>**Create/Edit** - Can create and Edit Delegates</li><li>**Delete** - Can delete existing Delegates</li>
 |
|  | Secrets | <li> **View** - Can view existing Secrets</li><li>**Create/Edit** - Can create and edit Secrets</li><li>**Delete** - Can delete existing Secrets</li><li>**Access** - Can access referenced Secrets at runtime</li>
 |
|  | Connectors | <li> **View** - Can view existing Connectors</li><li>**Create/Edit** - Can create and edit Connectors</li><li>**Delete** - Can delete existing Connectors</li><li>**Access** - Can access referenced Connectors at runtime</li>
 |
|  | Environments | <li> **View** - Can view existing Environments</li><li>**Create/Edit** - Can create and edit Environments</li><li>**Delete** - Can delete existing Environments</li><li>**Access** - Can access referenced Environments at runtime</li>
 |
|  | ChaosHub | <li> **View** - Can view Chaos experiments and Chaos Scenarios</li><li>**Create/Edit** - Can connect to ChaosHub Git repo</li><li>**Delete** - Can disconnect ChaosHub Git repo</li>
 |
|  | Clusters | <li> **View** - Can view existing Clusters</li><li>**Create/Edit** - Can create and edit Clusters</li><li>**Delete** - Can delete existing Clusters</li>
 |
|  | Agents | <li> **View** - Can view existing Agents</li><li>**Create/Edit** - Can create and edit Agents</li><li>**Delete** - Can delete existing Agents</li>
 |
|  | Repository Certificates | <li> **View** - Can view existing Repository Certificates</li><li>**Create/Edit** - Can create and edit Repository Certificates</li><li>**Delete** - Can delete existing Repository Certificates</li>
 |
|  | Applications | <li> **View** - Can view existing applications</li><li>**Create/Edit** - Can create and edit Applications</li><li>**Delete** - Can delete existing Applications</li><li>**Sync** - Can deploy Applications</li>
 |
|  | Repositories | <li> **View** - Can view existing Repositories</li><li>**Create/Edit** - Can create and edit Repositories</li><li>**Delete** - Can delete existing Repositories</li>
 |
|  | GnuPG Keys | <li> **View** - Can view existing GnuPG Keys</li><li>**Create/Edit** - Can create and edit GnuPG Keys</li><li>**Delete** - Can delete existing GnuPG Keys</li>
 |
|  | Environment Groups | <li> **View** - Can view existing Environment Groups</li><li>**Create/Edit** - Can create and edit Environment Groups</li><li>**Delete** - Can delete existing Environment Groups</li>
 |
|  | SLO | <li> **View** - Can view an existing SLO</li><li>**Create/Edit** - Can create and edit SLO</li><li>**Delete** - Can delete an existing SLO</li>
 |
|  | Monitored Services | <li> **View** - Can view existing Monitored Services</li><li>**Create/Edit** - Can create and edit Monitored Services</li><li>**Delete** - Can delete existing Monitored Services</li><li>**Toggle** - Can toggle between different Monitored Services</li>
 |
|  | Pipelines | <li> **View** - Can view existing Pipelines</li><li>**Create/Edit** - Can create and edit Pipelines</li><li>**Delete** - Can delete existing Pipelines</li><li>**Execute** - Can execute Pipelines</li>
 |
|  | Services | <li> **View** - Can view existing Services</li><li>**Create/Edit** - Can create and edit Services</li><li>**Delete** - Can delete existing Services</li><li>**Access** - Can access referenced Services at runtime</li>
 |
|  | Feature Flags | <li> **Toggle** - Can turn a Feature Flag on or off</li><li>**Create/Edit** - Can create and edit Feature Flags</li><li>**Delete** - Can delete existing Feature Flags</li>
 |
|  | Target Management | <li> **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag</li><li>**Delete** - Can delete Targets and Target Groups</li>
 |
| **Account Viewer** | Resource Groups | <li> **View** - Can view existing Resource Groups</li>
 |
|  | Service Accounts | <li> **View** - Can view existing Service Accounts </li>
 |
|  | Organizations | <li> **View** - Can view existing Organizations </li>
 |
|  | Roles | <li> **View** - Can view existing Roles </li>
 |
|  | Account Settings | <li> **View** - Can view existing Account Settings </li>
 |
|  | Projects | <li> **View** - Can view existing Projects </li>
 |
|  | Users | <li> **View** - Can view existing Users </li>
 |
|  | Authentication Settings | <li> **View** - Can view existing Authentication Settings </li>
 |
|  | User Groups | <li> **View** - Can view existing User Groups </li>
 |
|  | Governance Policy Sets | <li> **View** - Can view existing Governance Policy Sets </li>
 |
|  | Variables | <li> **View** - Can view existing Variables </li>
 |
|  | Templates | <li> **View** - Can view existing Templates </li>
 |
|  | Governance Policies | <li> **View** - Can view existing Governance Policies </li>
 |
|  | Dashboards | <li> **View** - Can view existing Dashboards </li>
 |
|  | Delegate Configurations | <li> **View** - Can view existing Delegate Configurations </li>
 |
|  | Delegates | <li> **View** - Can view existing Delegates </li>
 |
|  | Secrets | <li> **View** - Can view existing Secrets </li>
 |
|  | Connectors | <li> **View** - Can view existing Connectors </li>
 |
|  | Environments | <li> **View** - Can view existing Environments </li>
 |
|  | ChaosHub | <li> **View** - Can view Chaos experiments and Chaos Scenarios </li>
 |
|  | Clusters | <li> **View** - Can view existing Clusters </li>
 |
|  | Agents | <li> **View** - Can view existing Agents </li>
 |
|  | Repository Certificates | <li> **View** - Can view existing Repository Certificates </li>
 |
|  | Applications | <li> **View** - Can view existing Applications </li>
 |
|  | Repositories | <li> **View** - Can view existing Repositories </li>
 |
|  | GnuPG Keys | <li> **View** - Can view existing GnuPG Keys </li>
 |
|  | Environment Groups | <li> **View** - Can view existing Environment Groups </li>
 |
|  | SLO | <li> **View** - Can view existing SLOs </li>
 |
|  | Monitored Services | <li> **View** - Can view existing Monitored Services </li>
 |
|  | Pipelines | <li> **View** - Can view existing Pipelines </li>
 |
|  | Services | <li> **View** - Can view existing Services </li>
 |
| **GitOps Admin Role** | Clusters | <li> **View** - Can view existing Clusters</li><li>**Create/Edit** - Can create and edit Clusters</li><li>**Delete** - Can delete existing Clusters</li>
 |
|  | Agents | <li> **View** - Can view existing Agents</li><li>**Create/Edit** - Can create and edit Agents</li><li>**Delete** - Can delete existing Agents</li>
 |
|  | Repository Certificates | <li> **View** - Can view existing Repository Certificates</li><li>**Create/Edit** - Can create and edit Repository Certificates</li><li>**Delete** - Can delete existing Repository Certificates</li>
 |
|  | Applications | <li> **View** - Can view existing Applications</li><li>**Create/Edit** - Can create and edit Applications</li><li>**Delete** - Can delete existing Applications</li><li>**Sync** - Can deploy Applications</li>
 |
|  | Repositories | <li> **View** - Can view existing Repositories</li><li>**Create/Edit** - Can create and edit Repositories</li><li>**Delete** - Can delete existing Repositories</li>
 |
|  | GnuPG Keys | <li> **View** - Can view existing GnuPG Keys</li><li>**Create/Edit** - Can create and edit GnuPG Keys</li><li>**Delete** - Can delete existing GnuPG Keys</li>
 |
| **Feature Flag Manage Role** | Feature Flags | <li> **Create/Edit** - Can create and edit Feature Flags</li>
 |
|  | Target Management | <li> **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag</li>
 |

The following table lists permissions corresponding to the default roles at the Organization [scope](../1-rbac-in-harness.md#rbac-scope):



|  |  |  |
| --- | --- | --- |
| **Role** | **Resource Type** | **Permissions** |
| **Organization Admin​** | Resource Groups | <li> **View** - Can view existing Resource Groups</li><li>**Create/Edit** - Can create and edit Resource Groups</li><li>**Delete** - Can delete existing Resource Groups</li>
 |
|  | Service Accounts | <li> **View** - Can view existing Service Accounts</li><li>**Create/Edit** - Can create and edit Service Accounts</li><li>**Delete** - Can delete existing Service Accounts</li><li>**Manage** - Can create/update/delete API keys and tokens</li>
 |
|  | Organizations | <li> **View** - Can view existing Organizations</li><li>**Create** - Can create Organizations</li><li>**Edit** - Can edit existing Organizations</li><li>**Delete** - Can delete existing Organizations</li>
 |
|  | Roles | <li> **View** - Can view existing Roles</li><li>**Create/Edit** - Can create and edit Roles</li><li>**Delete** - Can delete existing Roles</li>
 |
|  | Projects | <li> **View** - Can view existing Projects</li><li>**Create** - Can create Projects</li><li>**Edit** - Can edit existing Projects</li><li>**Delete** -Can delete existing Projects</li>
 |
|  | Users | <li> **View** - Can view existing Users</li><li>**Manage** - Can update/delete users and their role bindings</li><li>**Invite** - Can invite Users to Harness</li>
 |
|  | User Groups | <li> **View** - Can view existing User Groups</li><li>**Manage** - Can create/update/delete User Groups</li>
 |
|  | Governance Policy Sets | <li> **View** - Can view existing Governance Policy Sets</li><li>**Create/Edit** - Can create and edit Governance Policy Sets</li><li>**Delete** - Can delete existing Governance Policy Sets</li><li>**Evaluate** - Can evaluate Governance Policy Sets</li>
 |
|  | Variables | <li> **View** - Can view existing Variables</li><li>**Create/Edit** - Can create and edit Variables</li><li>**Delete** - Can delete existing Variables</li>
 |
|  | Templates | <li> **View** - Can view existing Templates</li><li> **Create/Edit** - Can create and edit Templates</li><li> **Delete** - Can delete existing Templates</li><li>**Access** - Can access referenced Templates at runtime</li>
 |
|  | Governance Policies | <li> **View** - Can view existing Govenance Policies</li><li>**Create/Edit** - Can create and edit Governance Policies</li><li>**Delete** - Can delete existing Governance Policies</li>
 |
|  | Dashboards | <li> **View** - Can view existing Dashboards</li><li>**Manage** - Can manage existing Dashboards</li>
 |
|  | Delegate Configurations | <li> **View** - Can view existing Delegate Configurations</li><li>**Create/Edit** - Can create and edit Delegate Configurations</li><li>**Delete** - Can delete existing Delegate Configurations</li>
 |
|  | Delegates | <li> **View** - Can view existing Delegates</li><li>**Create/Edit** - Can create and edit Delegates</li><li>**Delete -** Can delete existing Delegates</li>
 |
|  | Secrets | <li> **View** - Can view existing Secrets</li><li>**Create/Edit** - Can create and edit Secrets</li><li>**Delete** - Can delete existing Secrets</li><li> **Access** - Can access referenced Secrets at runtime</li>
 |
|  | Connectors | <li> **View** - Can view existing Connectors</li><li>**Create/Edit** - Can create and edit Connectors</li><li>**Delete** - Can delete existing Connectors</li><li>**Access** - Can access referenced Connectors at runtime</li>
 |
|  | Environments | <li> **View** - Can view existing Environments</li><li>**Create/Edit** - Can create and edit Environments</li><li>**Delete** - Can delete existing Environments</li><li>**Access** - Can access referenced Environments at runtime</li>
 |
|  | ChaosHub | <li> **View** - Can view Chaos experiments and Chaos Scenarios</li><li>**Create/Edit** - Can connect to ChaosHub Git repo</li><li>**Delete** - Can disconnect ChaosHub Git repo</li>
 |
|  | Clusters | <li> **View** - Can view existing Clusters</li><li>**Create/Edit** - Can create and edit Clusters</li><li>**Delete** - Can delete existing Clusters</li>
 |
|  | Agents |<li> **View** - Can view existing Agents</li><li>**Create/Edit** - Can create and edit Agents</li><li>**Delete** - Can delete existing Agents</li>
 |
|  | Repository Certificates | <li> **View** - Can view existing Repository Certificates</li><li>**Create/Edit** - Can create and edit Repository Certificates</li><li>**Delete** - Can delete existing Repository Certificates</li>
 |
|  | Applications | <li> **View** - Can view existing applications</li><li>**Create/Edit** - Can create and edit Applications</li><li>**Delete** - Can delete existing Applications</li><li>**Sync** - Can deploy Applications</li>
 |
|  | Repositories | <li> **View** - Can view existing Repositories</li><li>**Create/Edit** - Can create and edit Repositories</li><li>**Delete** - Can delete existing Repositories</li>
 |
|  | GnuPG Keys | <li> **View** - Can view existing GnuPG Keys</li><li>**Create/Edit** - Can create and edit GnuPG Keys</li><li>**Delete** - Can delete existing GnuPG Keys</li>
 |
|  | Environment Groups | <li> **View** - Can view existing Environment Groups</li><li>**Create/Edit** - Can create and edit Environment Groups</li><li>**Delete** - Can delete existing Environment Groups</li>
 |
|  | SLO | <li> **View** - Can view an existing SLO</li><li>**Create/Edit** - Can create and edit SLO</li><li>**Delete** - Can delete an existing SLO</li>
 |
|  | Monitored Services | <li> **View** - Can view existing Monitored Services</li><li>**Create/Edit** - Can create and edit Monitored Services</li><li>**Delete** - Can delete existing Monitored Services</li><li>**Toggle** - Can toggle between different Monitored Services</li>
 |
|  | Pipelines | <li> **View** - Can view existing Pipelines</li><li>**Create/Edit** - Can create and edit Pipelines</li><li>**Delete** - Can delete existing Pipelines</li><li>**Execute** - Can execute Pipelines</li>
 |
|  | Services | <li> **View** - Can view existing Services</li><li>**Create/Edit** - Can create and edit Services</li><li> **Delete** - Can delete existing Services</li><li>**Access** - Can access referenced Services at runtime</li>
 |
|  | Feature Flags | <li> **Toggle** - Can turn a Feature Flag on or off</li><li>**Create/Edit** - Can create and edit Feature Flags</li><li>**Delete** - Can delete existing Feature Flags</li>
 |
|  | Target Management | <li> **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag</li><li>**Delete** - Can delete Targets and Target Groups</li>
 |
| **Organization Viewer** | Resource Groups | <li> **View** - Can view existing Resource Groups</li>
 |
|  | Service Accounts | <li> **View** - Can view existing Service Accounts</li>
 |
|  | Organizations | <li> **View** - Can view existing Organizations</li>
 |
|  | Roles | <li> **View** - Can view existing Roles</li>
 |
|  | Projects | <li> **View** - Can view existing Projects</li>
 |
|  | Users | <li> **View** - Can view existing Users</li>
 |
|  | User Groups | <li> **View** - Can view existing User Groups</li>
 |
|  | Governance Policy Sets | <li> **View** - Can view existing Governance Policy Sets</li>
 |
|  | Variables | <li> **View** - Can view existing Variables</li>
 |
|  | Templates | <li> **View** - Can view existing Templates</li>
 |
|  | Governance Policies | <li> **View** - Can view existing Governance Policies</li>
 |
|  | Dashboards | <li> **View** - Can view existing Dashboards</li>
 |
|  | Delegate Configurations | <li> **View** - Can view existing Delegate Configurations</li>
 |
|  | Delegates | <li> **View** - Can view existing Delegates</li>
 |
|  | Secrets | <li> **View** - Can view existing Secrets</li>
 |
|  | Connectors | <li> **View** - Can view existing Connectors</li>
 |
|  | Environments | <li> **View** - Can view existing Environments</li>
 |
|  | ChaosHub | <li> **View** - Can view Chaos experiments and Chaos Scenarios</li><li>**Create/Edit** - Can connect to ChaosHub Git repo</li><li>**Delete** - Can disconnect ChaosHub Git repo</li>
 |
|  | Clusters | <li> **View** - Can view existing Clusters</li>
 |
|  | Agents | <li> **View** - Can view existing Agents</li>
 |
|  | Repository Certificates | <li> **View** - Can view existing Repository Certificates</li>
 |
|  | Applications | <li> **View** - Can view existing Applications</li>
 |
|  | Repositories | <li> **View** - Can view existing Repositories</li>
 |
|  | GnuPG Keys | <li> **View** - Can view existing GnuPG Keys</li>
 |
|  | Environment Groups | <li> **View** - Can view existing Environment Groups</li>
 |
|  | SLO | <li> **View** - Can view existing SLOs</li>
 |
|  | Monitored Services | <li> **View** - Can view existing Monitored Services</li>
 |
|  | Pipelines | <li> **View** - Can view existing Pipelines</li>
 |
|  | Services | <li> **View** - Can view existing Services</li>
 |
| **GitOps Admin Role** | Clusters | <li> **View** - Can view existing Clusters</li><li>**Create/Edit** - Can create and edit Clusters</li><li>**Delete** - Can delete existing Clusters</li>
 |
|  | Agents | <li> **View** - Can view existing Agents</li><li>**Create/Edit** - Can create and edit Agents</li><li> **Delete** - Can delete existing Agents</li>
 |
|  | Repository Certificates | <li> **View** - Can view existing Repository Certificates</li><li>**Create/Edit** - Can create and edit Repository Certificates</li><li>**Delete** - Can delete existing Repository Certificates</li>
 |
|  | Applications | <li> **View** - Can view existing Applications</li><li>**Create/Edit** - Can create and edit Applications</li><li>**Delete** - Can delete existing Applications</li><li>**Sync** - Can deploy Applications</li>
 |
|  | Repositories | <li> **View** - Can view existing Repositories</li><li>**Create/Edit** - Can create and edit Repositories</li><li>**Delete** - Can delete existing Repositories</li>
 |
|  | GnuPG Keys | <li> **View** - Can view existing GnuPG Keys</li><li>**Create/Edit** - Can create and edit GnuPG Keys</li><li>**Delete** - Can delete existing GnuPG Keys</li>
 |
| **Feature Flag Manage Role** | Feature Flags | <li> **Create/Edit** - Can create and edit Feature Flags</li>
 |
|  | Target Management | <li> **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag</li>
 |

The following table lists permissions corresponding to the default roles at the Project [scope](../1-rbac-in-harness.md#rbac-scope):



|  |  |  |
| --- | --- | --- |
| **Role** | **Resource Type** | **Permissions** |
| **Pipeline Executor** | Resource Groups | <li> **View** - Can view existing Resource Groups</li>
 |
|  | Roles | <li> **View** - Can view existing Service Accounts</li>
 |
|  | Projects | <li> **View** - Can view existing Projects</li>
 |
|  | Users | <li> **View** - Can view existing Users</li>
 |
|  | User Groups | <li> **View** - Can view existing User Groups</li>
 |
|  | Variables | <li> **View** - Can view existing Variables</li>
 |
|  | Templates | <li> **View** - Can view existing Templates</li><li> **Access** - Can access referenced Templates at runtime</li>
 |
|  | Secrets | <li> **View** - Can view existing Secrets</li><li> **Access** - Can access referenced Secrets at runtime</li>
 |
|  | Connectors | <li> **View** - Can view existing Connectors</li><li>**Access** - Can access referenced Connectors at runtime</li>
 |
|  | Environments | <li> **View** - Can view existing Environments</li><li>**Access** - Can access referenced Environments at runtime</li>
 |
|  | Environment Groups | <li> **View** - Can view existing Environment Groups</li>
 |
|  | Pipelines | <li> **View** - Can view existing Pipelines</li><li>**Execute** - Can execute Pipelines</li>
 |
|  | Services | <li> **View** - Can view existing Services</li><li>**Access** - Can access Services</li>
 |
| **Project Admin​** | Resource Groups | <li> **View** - Can view Resource Groups</li><li>**Create/Edit** - Can create and edit Resource Groups</li><li>**Delete** - Can delete Resource Groups</li>
 |
|  | Service Accounts | <li> **View** - Can view Service Accounts</li><li>**Create/Edit** - Can create and edit Service Accounts</li><li>**Delete** - Can delete Service Accounts</li><li>**Manage** - Can create/update/delete API keys and tokens</li>
 |
|  | Roles | <li> **View** - Can view existing Roles</li><li>**Create/Edit** - Can create and edit Roles</li><li>**Delete** - Can delete existing Roles</li>
 |
|  | Projects | <li> **View** - Can view existing Projects</li><li>**Edit** - Can edit existing Projects</li><li>**Delete** - Can delete existing Projects</li>
 |
|  | Users | <li> **View** - Can view existing users</li><li>**Manage** - Can update/delete users and their role bindings</li><li>**Invite** - Can invite users to Harness</li>
 |
|  | User Groups | <li> **View** - Can view User Groups</li><li>**Manage** - Can create/update/delete User Groups</li>
 |
|  | Governance Policy Sets | <li> **View** - Can view exisitng Governance Policy Sets</li><li>**Create/Edit** - Can create and edit Governance Policy Sets</li><li>**Delete** - Can delete existing Governance Policy Sets</li><li>**Evaluate** - Can evaluate Governance Policy Sets</li>
 |
|  | Variables | <li> **View** - Can view existing Variables</li><li>**Create/Edit** - Can create and edit Variables</li><li>**Delete** - Can delete existing Variables</li>
 |
|  | Templates | <li> **View** - Can view existing Templates</li><li>**Create/Edit** - Can create and edit Templates</li><li>**Delete** - Can delete existing Templates</li><li> **Access** - Can access referenced Templates at runtime</li>
 |
|  | Governance Policies | <li> **View** - Can view existing Governance Policies</li><li>**Create/Edit** - Can create and edit Governance Policies</li><li>**Delete** - Can delete existing Governance Policies</li>
 |
|  | Delegate Configurations | <li> **View** - Can view existing Delegate Configurations</li><li>**Create/Edit** - Can create and edit Delegate Configurations</li><li> **Delete** - Can delete existing Delegate Configurations</li>
 |
|  | Delegates | <li> **View** - Can view existing Delegates</li><li> **Create/Edit** - Can create and Edit Delegates</li><li>**Delete** - Can delete existing Delegates</li>
 |
|  | Dashboards | <li> **View** - Can view Dashboards</li><li> **Manage** - Can manage and edit Dashboards</li>
 |
|  | Delegate Configurations | <li> **View** - Can view existing Delegate Configurations</li><li>**Create/Edit** - Can create and edit Delegate Configurations</li><li>**Delete** - Can delete existing Delegate Configurations</li>
 |
|  | Delegates | <li> **View** - Can view existing Delegates</li><li>**Create/Edit** - Can create and Edit Delegates</li><li>**Delete** - Can delete existing Delegates</li>
 |
|  | Secrets | <li> **View** - Can view existing Secrets</li><li>**Create/Edit** - Can create and edit Secrets</li><li>**Delete** - Can delete existing Secrets</li><li>**Access** - Can access referenced Secrets at runtime</li>
 |
|  | Connectors | <li> **View** - Can view existing Connectors</li><li>**Create/Edit** - Can create and edit Connectors</li><li>**Delete** - Can delete existing Connectors</li><li>**Access** - Can access referenced Connectors at runtime</li>
 |
|  | Environments | <li> **View** - Can view existing Environments</li><li> **Create/Edit** - Can create and edit Environments</li><li> **Delete** - Can delete existing Environment</li><li>**Access** - Can access referenced Environments at runtime</li>
 |
|  | ChaosHub | <li> **View** - Can view Chaos experiments and Chaos Scenarios</li><li> **Create/Edit** - Can connect to ChaosHub Git repo</li><li>**Delete** - Can disconnect ChaosHub Git repo</li>
 |
|  | Clusters | <li> **View** - Can view existing Clusters</li><li>**Create/Edit** - Can create and edit Clusters</li><li>**Delete** - Can delete existing Clusters</li>
 |
|  | Agents | <li> **View** - Can view existing Agents</li><li> **Create/Edit** - Can create and edit Agents</li><li>**Delete** - Can delete existing Agents</li>
 |
|  | Repository Certificates | <li> **View** - Can view existing Repository Certificates</li><li> **Create/Edit** - Can create and edit Repository Certificates</li><li>**Delete** - Can delete existing Repository Certificates</li>
 |
|  | Applications | <li> **View** - Can view existing applications</li><li>**Create/Edit** - Can create and edit Applications</li><li>**Delete** - Can delete existing Applications</li><li>**Sync** - Can deploy Applications</li>
 |
|  | Repositories | <li> **View** - Can view existing Repositories</li><li>**Create/Edit** - Can create and edit Repositories</li><li>**Delete** - Can delete existing Repositories</li>
 |
|  | GnuPG Keys | <li> **View** - Can view existing GnuPG Keys</li><li>**Create/Edit**- Can create and edit GnuPG Keys</li><li>**Delete**- Can delete existing GnuPG Keys</li>
 |
|  | Environment Groups | <li> **View** - Can view existing Environment Groups</li><li>**Create/Edit** - Can create and edit Environment Groups</li><li>**Delete** - Can delete existing Environment Groups</li>
 |
|  | SLO | <li> **View** - Can view an existing SLO</li><li>**Create/Edit** - Can create and edit SLO</li><li>**Delete** - Can delete an existing SLO</li>
 |
|  | Monitored Services | <li> **View** - Can view existing Monitored Services</li><li>**Create/Edit** - Can create and edit Monitored Services</li><li>**Delete** - Can delete existing Monitored Services</li><li>**Toggle** - Can toggle between different Monitored Services</li>
 |
|  | Pipelines | <li> **View** - Can view existing Pipelines</li><li>**Create/Edit** - Can create and edit Pipelines</li><li>**Delete** - Can delete existing Pipelines</li><li>**Execute** - Can execute Pipelines</li>
 |
|  | Services | <li> **View** - Can view existing Services</li><li>**Create/Edit** - Can create and edit Services</li><li>**Delete** - Can delete existing Services</li><li>**Access** - Can access referenced Services at runtime</li>
 |
|  | Feature Flags | <li> **Toggle** - Can turn a Feature Flag on or off</li><li>**Create/Edit** - Can create and edit Feature Flags**Delete** - Can delete existing Feature Flags</li>
 |
|  | Target Management | <li> **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag</li><li>**Delete** - Can delete Targets and Target Groups</li>
 |
| **Project Viewer** | Resource Groups | <li> **View** - Can view existing Resource Groups</li>
 |
|  | Service Accounts | <li>  **View** - Can view existing Service Accounts</li>
 |
|  | Roles | <li>  **View** - Can view existing Roles</li>
 |
|  | Projects | <li>  **View** - Can view existing Projects</li>
 |
|  | Users | <li>  **View** - Can view existing Users</li>
 |
|  | User Groups | <li>  **View** - Can view existing User Groups</li>
 |
|  | Governance Policy Sets | <li>  **View** - Can view existing Governance Policy Sets</li>
 |
|  | Variables | <li>  **View** - Can view existing Variables</li>
 |
|  | Templates | <li>  **View** - Can view existing Templates</li>
 |
|  | Governance Policies | <li>  **View** - Can view existing Governance Policies</li>
 |
|  | Delegate Configurations | <li>  **View** - Can view existing Delegate Configurations</li>
 |
|  | Delegates | <li>  **View** - Can view existing Delegates</li>
 |
|  | Dashboards | <li>  **View** - Can view existing Dashboards</li>
 |
|  | Delegate Configurations | <li>  **View** - Can view existing Delegate Configurations</li>
 |
|  | Delegates | <li>  **View** - Can view existing Delegates</li>
 |
|  | Secrets | <li>  **View** - Can view existing Secrets</li>
 |
|  | Connectors | <li>  **View** - Can view existing Connectors</li>
 |
|  | Environments | <li>  **View** - Can view existing Environments</li>
 |
|  | ChaosHub | <li> **View** - Can view Chaos experiments and Chaos Scenarios </li> |
|  | Clusters | <li> **View** - Can view existing Clusters</li>
 |
|  | Agents | <li> **View** - Can view existing Agents</li>
 |
|  | Repository Certificates | <li> **View** - Can view existing Repository Certificates</li>
 |
|  | Applications | <li> **View** - Can view existing Applications</li>
 |
|  | Repositories | <li> **View** - Can view existing Repositories</li>
 |
|  | GnuPG Keys | <li> **View** - Can view existing GnuPG Keys</li>
 |
|  | Environment Groups | <li> **View** - Can view existing Environment Groups</li>
 |
|  | SLO | <li> **View** - Can view existing SLOs</li>
 |
|  | Monitored Services | <li> **View** - Can view existing Monitored Services</li>
 |
|  | Pipelines | <li> **View** - Can view existing Pipelines</li>
 |
|  | Services | <li> **View** - Can view existing Services</li>
 |
| **GitOps Admin Role** | Clusters | <li> **View** - Can view existing Clusters</li><li>**Create/Edit** - Can create and edit Clusters</li><li>**Delete** - Can delete existing Clusters</li>
 |
|  | Agents | <li> **View** - Can view existing Agents</li><li>**Create/Edit** - Can create and edit Agents</li><li>**Delete** - Can delete existing Agents</li>
 |
|  | Repository Certificates | <li> **View** - Can view existing Repository Certificates</li><li>**Create/Edit** - Can create and edit Repository Certificates</li><li>**Delete** - Can delete existing Repository Certificates</li>
 |
|  | Applications | <li> **View** - Can view existing Applications</li><li>**Create/Edit** - Can create and edit Applications</li><li> **Delete** - Can delete existing Applications</li><li>**Sync** - Can deploy Applications</li>
 |
|  | Repositories | <li> **View** - Can view existing Repositories</li><li> **Create/Edit** - Can create and edit Repositories</li><li>**Delete** - Can delete existing Repositories</li>
 |
|  | GnuPG Keys | <li> **View** - Can view existing GnuPG Keys</li><li>**Create/Edit** - Can create and edit GnuPG Keys</li><li>**Delete** - Can delete existing GnuPG Keys</li>
 |
| **Feature Flag Manage Role** | Feature Flags | <li> **Create/Edit** - Can create and edit Feature Flags</li>
 |
|  | Target Management | <li> **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag</li>
 |

### Default Resource Group

Harness includes the following default Resource Groups at the Account, Org, and Project scope:



|  |  |  |
| --- | --- | --- |
| Scope | Resource Group | Description |
| Account | **All Resources Including Child Scopes** | Includes all the resources within the scope of the Account, as well as those within the scope of the Orgs and Projects in this Account. |
| Account | **All Account Level Resources** | Includes all the resources within the scope of the Account. This does not include resources within the scope of Org or Project. |
| Org | **All Resources Including Child Scopes** | Includes all the resources within the scope of the Org, as well as those within the scope of all the Projects created within this Org. |
| Org | **All Organization Level Resources** | Includes all the resources within the scope of the Org. This does not include resources within the scope of Projects. |
| Project | **All Project Level Resources** | Includes all the resources within the scope of the Project. |

