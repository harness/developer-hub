---
title: RBAC
description: Harness RBAC includes Roles and Permissions that enable you to control access to the CCM resources in your Harness account. CCM Roles and Permissions are Account Level Only. Most Roles and Permission…
# sidebar_position: 10
helpdocs_topic_id: di9dut7jki
helpdocs_category_id: b943tytof4
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/cloud-cost-management/getting-started-ccm/access-control/ccm-roles-and-permissions
---
import PermissionsViewer from '@site/src/components/PermissionsViewer';

# CCM Roles and Permissions
Harness RBAC includes Roles and Permissions that enable you to control access to the CCM resources in your Harness account.

## CCM Roles and Permissions are Account Level Only

Most Roles and Permissions can be set at the Project, Org, and Account levels. CCM Roles and Permissions can be set at the Account level only.

1. In your Harness Account, click **Account Settings >** **Access Control >** **Roles**. 
2. Add or open a Role.
3. In the Role, click **Cloud Cost Management**. The CCM Permissions are displayed.

![](./static/ccm-roles-and-permissions-00.png)

## Default Roles

You can configure CCM Permissions for any Role, but there are two default Roles related to CCM that you can assign without having to set anything up.

### CCM Admin

The default CCM Admin Role has full permissions on all CCM resources.

![](./static/ccm-roles-and-permissions-01.png)

### CCM Viewer

The default CCM Viewer Role has read-only permissions on all CCM resources.

![](./static/ccm-roles-and-permissions-02.png)

## Permissions

The following table describes the Permissions enabled in the default Harness Roles, including the two CCM default Roles.


| **CCM Resource** | **Permission** | **Account Admin** | **Account Viewer** | **Account Basic** | **CCM Admin** | **CCM Viewer** | **What a User can do?** | **Granular RBAC** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Recommendations | Recommendations: View | ✅ | ✅ | ❌ | ✅ | ✅ | View the Recommendations irrespective of Perspective View Permission | |
| Anomalies | Anomalies: View | ✅ | ✅ | ❌ | ✅ | ✅ | View the Anomalies irrespective of Perspective View Permission | |
| Currency Preference | Currency Preference: View | ✅ | ✅ | ❌ | ✅ | ✅ | View the set currency perferences | |
| Currency Preference | Currency Preference: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Edit the currency perferences | |
| Overview Page | Overview | ✅ | ✅ | ❌ | ✅ | ✅ | View the Overview page | |
| Cost Categories | Cost Categories: View | ✅ | ✅ | ❌ | ✅ | ✅ | View all the cost categories | |
| Cost Categories | Cost Categories: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Create a new cost category and edit existing cost categories | |
| Cost Categories | Cost Categories: Delete | ✅ | ❌ | ❌ | ✅ | ❌ | Delete a cost category | |
| Folders | Folders: View | ✅ | ✅ | ❌ | ✅ | ✅ | View all the folders | |
| Folders | Folders: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Create a new folder, clone/edit existing folders | |
| Folders | Folders: Delete | ✅ | ❌ | ❌ | ✅ | ❌ | Delete a folder | |
| Cloud Asset Governance Rule Sets | Cloud Asset Governance Rule Sets: View | ✅ | ✅ | ❌ | ✅ | ✅ | View the cloud asset governance rule sets | |
| Cloud Asset Governance Rule Sets | Cloud Asset Governance Rule Sets: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Create a new cloud asset governance rule set or edit existing | |
| Cloud Asset Governance Rule Sets | Cloud Asset Governance Rule Sets: Delete | ✅ | ❌ | ❌ | ✅ | ❌ | Delete a cloud asset governance rule set | |
| Perspectives | Perspectives: View | ✅ | ✅ | ❌ | ✅ | ✅ | View all the perspectives | |
| Perspectives | Perspectives: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Create a new perspective, clone/edit an existing a perspective and move the perspective to a different folder | |
| Perspectives | Perspectives: Delete | ✅ | ❌ | ❌ | ✅ | ❌ | Delete a perspective | |
| Cloud Asset Governance Rules | Cloud Asset Governance Rules: View | ✅ | ✅ | ❌ | ✅ | ✅ | View the cloud asset governance rules | |
| Cloud Asset Governance Rules | Cloud Asset Governance Rules: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Create a new cloud asset governance rule or edit existing | |
| Cloud Asset Governance Rules | Cloud Asset Governance Rules: Delete | ✅ | ❌ | ❌ | ✅ | ❌ | Delete a cloud asset governance rule | |
| Cloud Asset Governance Rules | Cloud Asset Governance Rules: Execute | ✅ | ❌ | ❌ | ✅ | ❌ | Execute a cloud asset governance rule | |
| Auto Stopping Rules | AutoStopping Rules: View | ✅ | ✅ | ❌ | ✅ | ✅ | View all the AutoStopping rules | |
| Auto Stopping Rules | AutoStopping Rules: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Create a new AutoStopping rule and edit existing rules | |
| Auto Stopping Rules | AutoStopping Rules: Delete | ✅ | ❌ | ❌ | ✅ | ❌ | Delete an AutoStopping rule | |
| Budgets | Budgets: View | ✅ | ✅ | ❌ | ✅ | ✅ | View the budgets page | |
| Budgets | Budgets: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Create a perspective budget and edit existing | |
| Budgets | Budgets: Delete | ✅ | ❌ | ❌ | ✅ | ❌ | Delete a budget | |
| Load Balancer | Load Balancer: View | ✅ | ✅ | ❌ | ✅ | ✅ | View all the load balancers | |
| Load Balancer | Load Balancer: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Create a new load balancer and edit configuration of existing load balancers | |
| Load Balancer | Load Balancer: Delete | ✅ | ❌ | ❌ | ✅ | ❌ | Delete a load balancer | |
| Cloud Asset Governance Enforcements | Cloud Asset Governance Enforcements: View | ✅ | ✅ | ❌ | ✅ | ✅ | View the cloud asset governance enforcements | |
| Cloud Asset Governance Enforcements | Cloud Asset Governance Enforcements: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Create a new cloud asset governance enforcement or edit existing | |
| Cloud Asset Governance Enforcements | Cloud Asset Governance Enforcements: Delete | ✅ | ❌ | ❌ | ✅ | ❌ | Delete a cloud asset governance enforcement | |
| Commitments | Commitments: View | ✅ | ❌ | ❌ | ✅ | ✅ | View Commitment dashboards and Summary | |
| Commitments | Commitments: Edit | ✅ | ❌ | ❌ | ✅ | ❌ | Setup Commitments | |


Understanding RBAC in CCM:

- CCM has RBAC on 2 levels: Global and Granular. 
- 3 main concepts: 

## Granular RBAC

Granular RBAC allows you to control permissions at a more detailed level. Below is a component that helps you visualize the exact permissions needed for specific features:



<PermissionsViewer />


