---
title: Manage Access Control for Connectors
description: Learn how to manage access control for connectors by type, name, or tags.
sidebar_position: 39
helpdocs_topic_id: uzzjd4fy67
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

[Role-based access control (RBAC)](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) in Harness lets you control who can access your resources, what actions they can perform, and where they can do it. Access is based on roles assigned to users, user groups, and service accounts.

### Configure Roles 

1. Navigate to Account Settings → Access Control → Roles. 

2. [Add or edit a role](/docs/platform/role-based-access-control/add-manage-roles.md), check for Shared Resources → Connectors section to ensure the appropriate permissions are granted, as shown in the image below.

    ![connector-roles](./static/connector-role.png)

### Configure Resource Groups

1. Go to Account Settings → Access Control → Resource Groups, and [create or edit a resource group](/docs/platform/role-based-access-control/add-resource-groups.md). 

2. Select the appropriate Resource Scope based on your requirements, and set Resource to All if you want to provide access to all resources. Otherwise, select Specified, as shown below.

    ![resource-group-and-resource](./static/resource-group.png)    

3. After specifying the Resources, search for Shared Resources and select Connectors. While creating a resource group, the connectors can be added in the following four ways: 

    * **All**: Provides access to all connectors at a particular resource scope.
                
            ![connector-all](./static/all-type.png)

    * **By Type**: Grants access to one or more specific connector types, such as artifact repositories, cloud providers, secret managers, and more, based on your selection.
        
            ![by-type](./static/by-type.gif)

    * **By Tag**: Grants access to connectors based on matching tags. If a connector has a tag included in the resource group's tag list, users with the corresponding role assignments automatically gain access. 
    
        If the tag is removed from the connector, access is automatically revoked.    
    
            ![by-tags](./static/by-tags.gif) 

    * **Specified**: Grants access to one or more specific connectors that have already been created. This option is available only at Account-only, Organization-only, or Project-only scopes. 

            ![specified](./static/specified.gif)

By following these steps, you can enable users to manage access control for connector in four different ways through their assigned resource groups, allowing for more granular access control.

### Assign access control for connectors

After configuring the resource group for connectors, you need to assign the [role binding to a principal](/docs/platform/role-based-access-control/rbac-in-harness/#principals).

For example, to assign access to a user, navigate to Account Settings → Access Control → Users. For the relevant user, click on Manage Role Binding, and then select the Role and Resource Group created above.

![manage-role](./static/role-binding.png)



