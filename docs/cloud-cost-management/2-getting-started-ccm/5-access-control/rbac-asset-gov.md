---
title: Asset governance rules
description: This topic describes how to add and manage access control for cloud asset governance rules.
# sidebar_position: 40
---

# Manage access control for asset governance rules

RBAC enables effective governance of cloud assets by granting access and permissions strictly based on the roles and responsibilities of users, allowing them to execute only specific rules on specific cloud accounts.

Perform the following steps to restrict rule execution access:

## Create roles
1. In the **Harness** application, go to **Account Settings**.
2. Select **Access Control**.
3. Select **Roles**.
4. Select **+ New Role** to create a custom role with restricted permissions as shown in the following screenshot.
   
 <docimage path={require('./static/restricted-role-asset-gov.png')} width="50%" height="50%" title="Click to view full size image" />

5. Create another role with `Execute` permissions to enable the execution of the governance rules.

 <docimage path={require('./static/admin-role-asset-gov.png')} width="50%" height="50%" title="Click to view full size image" />

## Create resource groups

   Create a new resource group to bind with this role. You could create a resource group with specific rules and connectors that you want to allow access to. Connectors allow you to execute rules in the cloud account tied to them. 
1. Select **Resource Groups**.
2. Click **+ New Resource Group** to create a new resource group. For example, _RBAC GOV_.
3. Select **Account only** in the **Resource Scope** dropdown list.
4.  In the **Resources** pane, select **Cloud Cost management** > **Cloud Asset Governance Rules**.
5.  To restrict access to specific rules, select **Specified**, and then select **Add**. 
6.  In the **Resources** pane, select **Shared Resources** > **Connectors**.
7.  To restrict access to specific cloud accounts, select **Specified**, and then select **Add**. 
  
    The following screenshot is an example of a resource group with limited number of rules and accounts:

 <docimage path={require('./static/asset-gov-resource-grp-specified.png')} width="50%" height="50%" title="Click to view full size image" />

## Bind the roles with the resource groups

1. To bind the **Role** with the **Resource Group**, go to the **Users** tab on the **Access Control** page.
2. Select the user you want to restrict access to.
3. Select **Manage Roles**. 
4. Select **Add** in the **Manage Role Bindings** window.
5. Select the **Role** with permissions to execute rules, and the newly created resource group (RBAC GOV) to allow access only to certain rules and accounts.
6. Add another role binding. Select the role without permission to execute rules, and then select `All resources including child scopes` from the **Resource Groups** dropdown.
 
 <docimage path={require('./static/add-role-bindings-asset-gov.png')} width="50%" height="50%" title="Click to view full size image" />

 In the given example, the `ccm-execute` role allows the user to execute governance rules on the `RBAC GOV` resource group (specific resources), and the `ccm-gov-restricted` role restricts the user from executing the governance rules.

## Verifying permissions

* On the **Asset Governance Rules** page, you can see that the **Enforce rule** option is enabled only for those rules included in the resource group. The rest are disabled. When you hover over a rule for which you have no `Execute` permission, a message appears as shown in the following screenshot: 

  <docimage path={require('./static/missing-permission-asset-gov.png')} width="50%" height="50%" title="Click to view full size image" />
* You are not allowed to edit or delete the rules without the `Execute` permission. However, you can clone these rules.

* You can create a rule set only with the rules for which you have permissions. 
* When editing an enforcement, you must have the necessary permissions for all the rules and target accounts that you want to include in the enforcement.

    <docimage path={require('./static/rbac-enforcements-asset-gov.png')} width="50%" height="50%" title="Click to view full size image" />
