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

Each Harness Account, Organization and Project includes default Roles to help you with [RBAC](https://newdocs.helpdocs.io/category/w4rzhnf27d-rbac).

The following table lists permissions corresponding to the default roles at the Account [scope](/article/vz5cq0nfg2-rbac-in-harness#rbac_scope):



|  |  |  |
| --- | --- | --- |
| **Role** | **Resource Type** | **Permissions** |
| **Account Admin​** | Resource Groups | * **View** - Can view Resource Groups
* **Create/Edit** - Can create and edit Resource Groups
* **Delete** - Can delete Resource Groups
 |
|  | Service Accounts | * **View** - Can view Service Accounts
* **Create/Edit** - Can create and edit Service Accounts
* **Delete** - Can delete Service Accounts
* **Manage** - Can create/update/delete API keys and tokens
 |
|  | Organizations | * **View** - Can view existing Organizations
* **Create** - Can create new Organizations
* **Edit** - Can edit existing Organizations
* **Delete** - Can delete Organizations
 |
|  | Roles | * **View** - Can view existing Roles
* **Create/Edit** - Can create and edit Roles
* **Delete** - Can delete existing Roles
 |
|  | Account Settings | * **View** - Can view Account Settings
* **Edit** - Can edit Account Settings
 |
|  | Projects | * **View** - Can view existing Projects
* **Create** - Can create new Projects
* **Edit** - Can edit existing Projects
* **Delete** - Can delete existing Projects
 |
|  | Users | * **View** - Can view existing users
* **Manage** - Can update/delete users and their role bindings
* **Invite** - Can invite users to Harness
 |
|  | Authentication Settings | * **View** - Can view Authentications settings
* **Create/Edit** - Can create and edit Authentications settings
* **Delete** - Can delete Authentications settings
 |
|  | User Groups | * **View** - Can view User Groups
* **Manage** - Can create/update/delete User Groups
 |
|  | Governance Policy Sets | * **View** - Can view existing Governance Policy Sets
* **Create/Edit** - Can create and edit Governance Policy Sets
* **Delete** - Can delete existing Governance Policy Sets
* **Evaluate** - Can evaluate Governance Policy Sets
 |
|  | Variables | * **View** - Can view existing Variables
* **Create/Edit** - Can create and edit Variables
* **Delete** - Can delete existing Variables
 |
|  | Templates | * **View** - Can view existing Templates
* **Create/Edit** - Can create and edit Templates
* **Delete** - Can delete existing Templates
* **Access** - Can access referenced Templates at runtime
 |
|  | Governance Policies | * **View** - Can view existing Governance Policies
* **Create/Edit** - Can create and edit Governance Policies
* **Delete** - Can delete existing Governance Policies
 |
|  | Dashboards | * **View** - Can view Dashboards
* **Manage** - Can manage and edit Dashboards
 |
|  | Delegate Configurations | * **View** - Can view existing Delegate Configurations
* **Create/Edit** - Can create and edit Delegate Configurations
* **Delete** - Can delete existing Delegate Configurations
 |
|  | Delegates | * **View** - Can view existing Delegates
* **Create/Edit** - Can create and Edit Delegates
* **Delete** - Can delete existing Delegates
 |
|  | Secrets | * **View** - Can view existing Secrets
* **Create/Edit** - Can create and edit Secrets
* **Delete** - Can delete existing Secrets
* **Access** - Can access referenced Secrets at runtime
 |
|  | Connectors | * **View** - Can view existing Connectors
* **Create/Edit** - Can create and edit Connectors
* **Delete** - Can delete existing Connectors
* **Access** - Can access referenced Connectors at runtime
 |
|  | Environments | * **View** - Can view existing Environments
* **Create/Edit** - Can create and edit Environments
* **Delete** - Can delete existing Environments
* **Access** - Can access referenced Environments at runtime
 |
|  | ChaosHub | * **View** - Can view Chaos experiments and Chaos Scenarios
* **Create/Edit** - Can connect to ChaosHub Git repo
* **Delete** - Can disconnect ChaosHub Git repo
 |
|  | Clusters | * **View** - Can view existing Clusters
* **Create/Edit** - Can create and edit Clusters
* **Delete** - Can delete existing Clusters
 |
|  | Agents | * **View** - Can view existing Agents
* **Create/Edit** - Can create and edit Agents
* **Delete** - Can delete existing Agents
 |
|  | Repository Certificates | * **View** - Can view existing Repository Certificates
* **Create/Edit** - Can create and edit Repository Certificates
* **Delete** - Can delete existing Repository Certificates
 |
|  | Applications | * **View** - Can view existing applications
* **Create/Edit** - Can create and edit Applications
* **Delete** - Can delete existing Applications
* **Sync** - Can deploy Applications
 |
|  | Repositories | * **View** - Can view existing Repositories
* **Create/Edit** - Can create and edit Repositories
* **Delete** - Can delete existing Repositories
 |
|  | GnuPG Keys | * **View** - Can view existing GnuPG Keys
* **Create/Edit** - Can create and edit GnuPG Keys
* **Delete** - Can delete existing GnuPG Keys
 |
|  | Environment Groups | * **View** - Can view existing Environment Groups
* **Create/Edit** - Can create and edit Environment Groups
* **Delete** - Can delete existing Environment Groups
 |
|  | SLO | * **View** - Can view an existing SLO
* **Create/Edit** - Can create and edit SLO
* **Delete** - Can delete an existing SLO
 |
|  | Monitored Services | * **View** - Can view existing Monitored Services
* **Create/Edit** - Can create and edit Monitored Services
* **Delete** - Can delete existing Monitored Services
* **Toggle** - Can toggle between different Monitored Services
 |
|  | Pipelines | * **View** - Can view existing Pipelines
* **Create/Edit** - Can create and edit Pipelines
* **Delete** - Can delete existing Pipelines
* **Execute** - Can execute Pipelines
 |
|  | Services | * **View** - Can view existing Services
* **Create/Edit** - Can create and edit Services
* **Delete** - Can delete existing Services
* **Access** - Can access referenced Services at runtime
 |
|  | Feature Flags | * **Toggle** - Can turn a Feature Flag on or off
* **Create/Edit** - Can create and edit Feature Flags
* **Delete** - Can delete existing Feature Flags
 |
|  | Target Management | * **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag
* **Delete** - Can delete Targets and Target Groups
 |
| **Account Viewer** | Resource Groups | * **View** - Can view existing Resource Groups
 |
|  | Service Accounts | * **View** - Can view existing Service Accounts
 |
|  | Organizations | * **View** - Can view existing Organizations
 |
|  | Roles | * **View** - Can view existing Roles
 |
|  | Account Settings | * **View** - Can view existing Account Settings
 |
|  | Projects | * **View** - Can view existing Projects
 |
|  | Users | * **View** - Can view existing Users
 |
|  | Authentication Settings | * **View** - Can view existing Authentication Settings
 |
|  | User Groups | * **View** - Can view existing User Groups
 |
|  | Governance Policy Sets | * **View** - Can view existing Governance Policy Sets
 |
|  | Variables | * **View** - Can view existing Variables
 |
|  | Templates | * **View** - Can view existing Templates
 |
|  | Governance Policies | * **View** - Can view existing Governance Policies
 |
|  | Dashboards | * **View** - Can view existing Dashboards
 |
|  | Delegate Configurations | * **View** - Can view existing Delegate Configurations
 |
|  | Delegates | * **View** - Can view existing Delegates
 |
|  | Secrets | * **View** - Can view existing Secrets
 |
|  | Connectors | * **View** - Can view existing Connectors
 |
|  | Environments | * **View** - Can view existing Environments
 |
|  | ChaosHub | * **View** - Can view Chaos experiments and Chaos Scenarios
 |
|  | Clusters | * **View** - Can view existing Clusters
 |
|  | Agents | * **View** - Can view existing Agents
 |
|  | Repository Certificates | * **View** - Can view existing Repository Certificates
 |
|  | Applications | * **View** - Can view existing Applications
 |
|  | Repositories | * **View** - Can view existing Repositories
 |
|  | GnuPG Keys | * **View** - Can view existing GnuPG Keys
 |
|  | Environment Groups | * **View** - Can view existing Environment Groups
 |
|  | SLO | * **View** - Can view existing SLOs
 |
|  | Monitored Services | * **View** - Can view existing Monitored Services
 |
|  | Pipelines | * **View** - Can view existing Pipelines
 |
|  | Services | * **View** - Can view existing Services
 |
| **GitOps Admin Role** | Clusters | * **View** - Can view existing Clusters
* **Create/Edit** - Can create and edit Clusters
* **Delete** - Can delete existing Clusters
 |
|  | Agents | * **View** - Can view existing Agents
* **Create/Edit** - Can create and edit Agents
* **Delete** - Can delete existing Agents
 |
|  | Repository Certificates | * **View** - Can view existing Repository Certificates
* **Create/Edit** - Can create and edit Repository Certificates
* **Delete** - Can delete existing Repository Certificates
 |
|  | Applications | * **View** - Can view existing Applications
* **Create/Edit** - Can create and edit Applications
* **Delete** - Can delete existing Applications
* **Sync** - Can deploy Applications
 |
|  | Repositories | * **View** - Can view existing Repositories
* **Create/Edit** - Can create and edit Repositories
* **Delete** - Can delete existing Repositories
 |
|  | GnuPG Keys | * **View** - Can view existing GnuPG Keys
* **Create/Edit** - Can create and edit GnuPG Keys
* **Delete** - Can delete existing GnuPG Keys
 |
| **Feature Flag Manage Role** | Feature Flags | * **Create/Edit** - Can create and edit Feature Flags
 |
|  | Target Management | * **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag
 |

The following table lists permissions corresponding to the default roles at the Organization [scope](/article/vz5cq0nfg2-rbac-in-harness#rbac_scope):



|  |  |  |
| --- | --- | --- |
| **Role** | **Resource Type** | **Permissions** |
| **Organization Admin​** | Resource Groups | * **View** - Can view existing Resource Groups
* **Create/Edit** - Can create and edit Resource Groups
* **Delete** - Can delete existing Resource Groups
 |
|  | Service Accounts | * **View** - Can view existing Service Accounts
* **Create/Edit** - Can create and edit Service Accounts
* **Delete** - Can delete existing Service Accounts
* **Manage** - Can create/update/delete API keys and tokens
 |
|  | Organizations | * **View** - Can view existing Organizations
* **Create** - Can create Organizations
* **Edit** - Can edit existing Organizations
* **Delete** - Can delete existing Organizations
 |
|  | Roles | * **View** - Can view existing Roles
* **Create/Edit** - Can create and edit Roles
* **Delete** - Can delete existing Roles
 |
|  | Projects | * **View** - Can view existing Projects
* **Create** - Can create Projects
* **Edit** - Can edit existing Projects
* **Delete** -Can delete existing Projects
 |
|  | Users | * **View** - Can view existing Users
* **Manage** - Can update/delete users and their role bindings
* **Invite** - Can invite Users to Harness
 |
|  | User Groups | * **View** - Can view existing User Groups
* **Manage** - Can create/update/delete User Groups
 |
|  | Governance Policy Sets | * **View** - Can view existing Governance Policy Sets
* **Create/Edit** - Can create and edit Governance Policy Sets
* **Delete** - Can delete existing Governance Policy Sets
* **Evaluate** - Can evaluate Governance Policy Sets
 |
|  | Variables | * **View** - Can view existing Variables
* **Create/Edit** - Can create and edit Variables
* **Delete** - Can delete existing Variables
 |
|  | Templates | * **View** - Can view existing Templates
* **Create/Edit** - Can create and edit Templates
* **Delete** - Can delete existing Templates
* **Access** - Can access referenced Templates at runtime
 |
|  | Governance Policies | * **View** - Can view existing Govenance Policies
* **Create/Edit** - Can create and edit Governance Policies
* **Delete** - Can delete existing Governance Policies
 |
|  | Dashboards | * **View** - Can view existing Dashboards
* **Manage** - Can manage existing Dashboards
 |
|  | Delegate Configurations | * **View** - Can view existing Delegate Configurations
* **Create/Edit** - Can create and edit Delegate Configurations
* **Delete** - Can delete existing Delegate Configurations
 |
|  | Delegates | * **View** - Can view existing Delegates
* **Create/Edit** - Can create and edit Delegates
* **Delete -** Can delete existing Delegates
 |
|  | Secrets | * **View** - Can view existing Secrets
* **Create/Edit** - Can create and edit Secrets
* **Delete** - Can delete existing Secrets
* **Access** - Can access referenced Secrets at runtime
 |
|  | Connectors | * **View** - Can view existing Connectors
* **Create/Edit** - Can create and edit Connectors
* **Delete** - Can delete existing Connectors
* **Access** - Can access referenced Connectors at runtime
 |
|  | Environments | * **View** - Can view existing Environments
* **Create/Edit** - Can create and edit Environments
* **Delete** - Can delete existing Environments
* **Access** - Can access referenced Environments at runtime
 |
|  | ChaosHub | * **View** - Can view Chaos experiments and Chaos Scenarios
* **Create/Edit** - Can connect to ChaosHub Git repo
* **Delete** - Can disconnect ChaosHub Git repo
 |
|  | Clusters | * **View** - Can view existing Clusters
* **Create/Edit** - Can create and edit Clusters
* **Delete** - Can delete existing Clusters
 |
|  | Agents | * **View** - Can view existing Agents
* **Create/Edit** - Can create and edit Agents
* **Delete** - Can delete existing Agents
 |
|  | Repository Certificates | * **View** - Can view existing Repository Certificates
* **Create/Edit** - Can create and edit Repository Certificates
* **Delete** - Can delete existing Repository Certificates
 |
|  | Applications | * **View** - Can view existing applications
* **Create/Edit** - Can create and edit Applications
* **Delete** - Can delete existing Applications
* **Sync** - Can deploy Applications
 |
|  | Repositories | * **View** - Can view existing Repositories
* **Create/Edit** - Can create and edit Repositories
* **Delete** - Can delete existing Repositories
 |
|  | GnuPG Keys | * **View** - Can view existing GnuPG Keys
* **Create/Edit** - Can create and edit GnuPG Keys
* **Delete** - Can delete existing GnuPG Keys
 |
|  | Environment Groups | * **View** - Can view existing Environment Groups
* **Create/Edit** - Can create and edit Environment Groups
* **Delete** - Can delete existing Environment Groups
 |
|  | SLO | * **View** - Can view an existing SLO
* **Create/Edit** - Can create and edit SLO
* **Delete** - Can delete an existing SLO
 |
|  | Monitored Services | * **View** - Can view existing Monitored Services
* **Create/Edit** - Can create and edit Monitored Services
* **Delete** - Can delete existing Monitored Services
* **Toggle** - Can toggle between different Monitored Services
 |
|  | Pipelines | * **View** - Can view existing Pipelines
* **Create/Edit** - Can create and edit Pipelines
* **Delete** - Can delete existing Pipelines
* **Execute** - Can execute Pipelines
 |
|  | Services | * **View** - Can view existing Services
* **Create/Edit** - Can create and edit Services
* **Delete** - Can delete existing Services
* **Access** - Can access referenced Services at runtime
 |
|  | Feature Flags | * **Toggle** - Can turn a Feature Flag on or off
* **Create/Edit** - Can create and edit Feature Flags
* **Delete** - Can delete existing Feature Flags
 |
|  | Target Management | * **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag
* **Delete** - Can delete Targets and Target Groups
 |
| **Organization Viewer** | Resource Groups | * **View** - Can view existing Resource Groups
 |
|  | Service Accounts | * **View** - Can view existing Service Accounts
 |
|  | Organizations | * **View** - Can view existing Organizations
 |
|  | Roles | * **View** - Can view existing Roles
 |
|  | Projects | * **View** - Can view existing Projects
 |
|  | Users | * **View** - Can view existing Users
 |
|  | User Groups | * **View** - Can view existing User Groups
 |
|  | Governance Policy Sets | * **View** - Can view existing Governance Policy Sets
 |
|  | Variables | * **View** - Can view existing Variables
 |
|  | Templates | * **View** - Can view existing Templates
 |
|  | Governance Policies | * **View** - Can view existing Governance Policies
 |
|  | Dashboards | * **View** - Can view existing Dashboards
 |
|  | Delegate Configurations | * **View** - Can view existing Delegate Configurations
 |
|  | Delegates | * **View** - Can view existing Delegates
 |
|  | Secrets | * **View** - Can view existing Secrets
 |
|  | Connectors | * **View** - Can view existing Connectors
 |
|  | Environments | * **View** - Can view existing Environments
 |
|  | ChaosHub | * **View** - Can view Chaos experiments and Chaos Scenarios
* **Create/Edit** - Can connect to ChaosHub Git repo
* **Delete** - Can disconnect ChaosHub Git repo
 |
|  | Clusters | * **View** - Can view existing Clusters
 |
|  | Agents | * **View** - Can view existing Agents
 |
|  | Repository Certificates | * **View** - Can view existing Repository Certificates
 |
|  | Applications | * **View** - Can view existing Applications
 |
|  | Repositories | * **View** - Can view existing Repositories
 |
|  | GnuPG Keys | * **View** - Can view existing GnuPG Keys
 |
|  | Environment Groups | * **View** - Can view existing Environment Groups
 |
|  | SLO | * **View** - Can view existing SLOs
 |
|  | Monitored Services | * **View** - Can view existing Monitored Services
 |
|  | Pipelines | * **View** - Can view existing Pipelines
 |
|  | Services | * **View** - Can view existing Services
 |
| **GitOps Admin Role** | Clusters | * **View** - Can view existing Clusters
* **Create/Edit** - Can create and edit Clusters
* **Delete** - Can delete existing Clusters
 |
|  | Agents | * **View** - Can view existing Agents
* **Create/Edit** - Can create and edit Agents
* **Delete** - Can delete existing Agents
 |
|  | Repository Certificates | * **View** - Can view existing Repository Certificates
* **Create/Edit** - Can create and edit Repository Certificates
* **Delete** - Can delete existing Repository Certificates
 |
|  | Applications | * **View** - Can view existing Applications
* **Create/Edit** - Can create and edit Applications
* **Delete** - Can delete existing Applications
* **Sync** - Can deploy Applications
 |
|  | Repositories | * **View** - Can view existing Repositories
* **Create/Edit** - Can create and edit Repositories
* **Delete** - Can delete existing Repositories
 |
|  | GnuPG Keys | * **View** - Can view existing GnuPG Keys
* **Create/Edit** - Can create and edit GnuPG Keys
* **Delete** - Can delete existing GnuPG Keys
 |
| **Feature Flag Manage Role** | Feature Flags | * **Create/Edit** - Can create and edit Feature Flags
 |
|  | Target Management | * **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag
 |

The following table lists permissions corresponding to the default roles at the Project [scope](/article/vz5cq0nfg2-rbac-in-harness#rbac_scope):



|  |  |  |
| --- | --- | --- |
| **Role** | **Resource Type** | **Permissions** |
| **Pipeline Executor** | Resource Groups | * **View** - Can view existing Resource Groups
 |
|  | Roles | * **View** - Can view existing Service Accounts
 |
|  | Projects | * **View** - Can view existing Projects
 |
|  | Users | * **View** - Can view existing Users
 |
|  | User Groups | * **View** - Can view existing User Groups
 |
|  | Variables | * **View** - Can view existing Variables
 |
|  | Templates | * **View** - Can view existing Templates
* **Access** - Can access referenced Templates at runtime
 |
|  | Secrets | * **View** - Can view existing Secrets
* **Access** - Can access referenced Secrets at runtime
 |
|  | Connectors | * **View** - Can view existing Connectors
* **Access** - Can access referenced Connectors at runtime
 |
|  | Environments | * **View** - Can view existing Environments
* **Access** - Can access referenced Environments at runtime
 |
|  | Environment Groups | * **View** - Can view existing Environment Groups
 |
|  | Pipelines | * **View** - Can view existing Pipelines
* **Execute** - Can execute Pipelines
 |
|  | Services | * **View** - Can view existing Services
* **Access** -
 |
| **Project Admin​** | Resource Groups | * **View** - Can view Resource Groups
* **Create/Edit** - Can create and edit Resource Groups
* **Delete** - Can delete Resource Groups
 |
|  | Service Accounts | * **View** - Can view Service Accounts
* **Create/Edit** - Can create and edit Service Accounts
* **Delete** - Can delete Service Accounts
* **Manage** - Can create/update/delete API keys and tokens
 |
|  | Roles | * **View** - Can view existing Roles
* **Create/Edit** - Can create and edit Roles
* **Delete** - Can delete existing Roles
 |
|  | Projects | * **View** - Can view existing Projects
* **Edit** - Can edit existing Projects
* **Delete** - Can delete existing Projects
 |
|  | Users | * **View** - Can view existing users
* **Manage** - Can update/delete users and their role bindings
* **Invite** - Can invite users to Harness
 |
|  | User Groups | * **View** - Can view User Groups
* **Manage** - Can create/update/delete User Groups
 |
|  | Governance Policy Sets | * **View** - Can view exisitng Governance Policy Sets
* **Create/Edit** - Can create and edit Governance Policy Sets
* **Delete** - Can delete existing Governance Policy Sets
* **Evaluate** - Can evaluate Governance Policy Sets
 |
|  | Variables | * **View** - Can view existing Variables
* **Create/Edit** - Can create and edit Variables
* **Delete** - Can delete existing Variables
 |
|  | Templates | * **View** - Can view existing Templates
* **Create/Edit** - Can create and edit Templates
* **Delete** - Can delete existing Templates
* **Access** - Can access referenced Templates at runtime
 |
|  | Governance Policies | * **View** - Can view existing Governance Policies
* **Create/Edit** - Can create and edit Governance Policies
* **Delete** - Can delete existing Governance Policies
 |
|  | Delegate Configurations | * **View** - Can view existing Delegate Configurations
* **Create/Edit** - Can create and edit Delegate Configurations
* **Delete** - Can delete existing Delegate Configurations
 |
|  | Delegates | * **View** - Can view existing Delegates
* **Create/Edit** - Can create and Edit Delegates
* **Delete** - Can delete existing Delegates
 |
|  | Dashboards | * **View** - Can view Dashboards
* **Manage** - Can manage and edit Dashboards
 |
|  | Delegate Configurations | * **View** - Can view existing Delegate Configurations
* **Create/Edit** - Can create and edit Delegate Configurations
* **Delete** - Can delete existing Delegate Configurations
 |
|  | Delegates | * **View** - Can view existing Delegates
* **Create/Edit** - Can create and Edit Delegates
* **Delete** - Can delete existing Delegates
 |
|  | Secrets | * **View** - Can view existing Secrets
* **Create/Edit** - Can create and edit Secrets
* **Delete** - Can delete existing Secrets
* **Access** - Can access referenced Secrets at runtime
 |
|  | Connectors | * **View** - Can view existing Connectors
* **Create/Edit** - Can create and edit Connectors
* **Delete** - Can delete existing Connectors
* **Access** - Can access referenced Connectors at runtime
 |
|  | Environments | * **View** - Can view existing Environments
* **Create/Edit** - Can create and edit Environments
* **Delete** - Can delete existing Environment
* **Access** - Can access referenced Environments at runtime
 |
|  | ChaosHub | * **View** - Can view Chaos experiments and Chaos Scenarios
* **Create/Edit** - Can connect to ChaosHub Git repo
* **Delete** - Can disconnect ChaosHub Git repo
 |
|  | Clusters | * **View** - Can view existing Clusters
* **Create/Edit** - Can create and edit Clusters
* **Delete** - Can delete existing Clusters
 |
|  | Agents | * **View** - Can view existing Agents
* **Create/Edit** - Can create and edit Agents
* **Delete** - Can delete existing Agents
 |
|  | Repository Certificates | * **View** - Can view existing Repository Certificates
* **Create/Edit** - Can create and edit Repository Certificates
* **Delete** - Can delete existing Repository Certificates
 |
|  | Applications | * **View** - Can view existing applications
* **Create/Edit** - Can create and edit Applications
* **Delete** - Can delete existing Applications
* **Sync** - Can deploy Applications
 |
|  | Repositories | * **View** - Can view existing Repositories
* **Create/Edit** - Can create and edit Repositories
* **Delete** - Can delete existing Repositories
 |
|  | GnuPG Keys | * **View** - Can view existing GnuPG Keys
* **Create/Edit**- Can create and edit GnuPG Keys
* **Delete**- Can delete existing GnuPG Keys
 |
|  | Environment Groups | * **View** - Can view existing Environment Groups
* **Create/Edit** - Can create and edit Environment Groups
* **Delete** - Can delete existing Environment Groups
 |
|  | SLO | * **View** - Can view an existing SLO
* **Create/Edit** - Can create and edit SLO
* **Delete** - Can delete an existing SLO
 |
|  | Monitored Services | * **View** - Can view existing Monitored Services
* **Create/Edit** - Can create and edit Monitored Services
* **Delete** - Can delete existing Monitored Services
* **Toggle** - Can toggle between different Monitored Services
 |
|  | Pipelines | * **View** - Can view existing Pipelines
* **Create/Edit** - Can create and edit Pipelines
* **Delete** - Can delete existing Pipelines
* **Execute** - Can execute Pipelines
 |
|  | Services | * **View** - Can view existing Services
* **Create/Edit** - Can create and edit Services
* **Delete** - Can delete existing Services
* **Access** - Can access referenced Services at runtime
 |
|  | Feature Flags | * **Toggle** - Can turn a Feature Flag on or off
* **Create/Edit** - Can create and edit Feature Flags
* **Delete** - Can delete existing Feature Flags
 |
|  | Target Management | * **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag
* **Delete** - Can delete Targets and Target Groups
 |
| **Project Viewer** | Resource Groups | * **View** - Can view existing Resource Groups
 |
|  | Service Accounts | * **View** - Can view existing Service Accounts
 |
|  | Roles | * **View** - Can view existing Roles
 |
|  | Projects | * **View** - Can view existing Projects
 |
|  | Users | * **View** - Can view existing Users
 |
|  | User Groups | * **View** - Can view existing User Groups
 |
|  | Governance Policy Sets | * **View** - Can view existing Governance Policy Sets
 |
|  | Variables | * **View** - Can view existing Variables
 |
|  | Templates | * **View** - Can view existing Templates
 |
|  | Governance Policies | * **View** - Can view existing Governance Policies
 |
|  | Delegate Configurations | * **View** - Can view existing Delegate Configurations
 |
|  | Delegates | * **View** - Can view existing Delegates
 |
|  | Dashboards | * **View** - Can view existing Dashboards
 |
|  | Delegate Configurations | * **View** - Can view existing Delegate Configurations
 |
|  | Delegates | * **View** - Can view existing Delegates
 |
|  | Secrets | * **View** - Can view existing Secrets
 |
|  | Connectors | * **View** - Can view existing Connectors
 |
|  | Environments | * **View** - Can view existing Environments
 |
|  | ChaosHub | **View** - Can view Chaos experiments and Chaos Scenarios |
|  | Clusters | * **View** - Can view existing Clusters
 |
|  | Agents | * **View** - Can view existing Agents
 |
|  | Repository Certificates | * **View** - Can view existing Repository Certificates
 |
|  | Applications | * **View** - Can view existing Applications
 |
|  | Repositories | * **View** - Can view existing Repositories
 |
|  | GnuPG Keys | * **View** - Can view existing GnuPG Keys
 |
|  | Environment Groups | * **View** - Can view existing Environment Groups
 |
|  | SLO | * **View** - Can view existing SLOs
 |
|  | Monitored Services | * **View** - Can view existing Monitored Services
 |
|  | Pipelines | * **View** - Can view existing Pipelines
 |
|  | Services | * **View** - Can view existing Services
 |
| **GitOps Admin Role** | Clusters | * **View** - Can view existing Clusters
* **Create/Edit** - Can create and edit Clusters
* **Delete** - Can delete existing Clusters
 |
|  | Agents | * **View** - Can view existing Agents
* **Create/Edit** - Can create and edit Agents
* **Delete** - Can delete existing Agents
 |
|  | Repository Certificates | * **View** - Can view existing Repository Certificates
* **Create/Edit** - Can create and edit Repository Certificates
* **Delete** - Can delete existing Repository Certificates
 |
|  | Applications | * **View** - Can view existing Applications
* **Create/Edit** - Can create and edit Applications
* **Delete** - Can delete existing Applications
* **Sync** - Can deploy Applications
 |
|  | Repositories | * **View** - Can view existing Repositories
* **Create/Edit** - Can create and edit Repositories
* **Delete** - Can delete existing Repositories
 |
|  | GnuPG Keys | * **View** - Can view existing GnuPG Keys
* **Create/Edit** - Can create and edit GnuPG Keys
* **Delete** - Can delete existing GnuPG Keys
 |
| **Feature Flag Manage Role** | Feature Flags | * **Create/Edit** - Can create and edit Feature Flags
 |
|  | Target Management | * **Create/Edit** - Can create and edit Targets and Target Groups to control visibility of variation of a Feature Flag
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

