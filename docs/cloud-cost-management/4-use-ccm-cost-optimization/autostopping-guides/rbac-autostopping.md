---
title: Granular RBAC for AutoStopping
description: This document providers details for granular RBAC for autostopping.
sidebar_position: 50
---

With RBAC, user can control view, create+edit, and delete access for AWS, Azure, and GCP autostopping resources based on cloud connectors (cloud accounts). Granular permission is an additional fine grained permission level on top of global RBAC levels. Global RBAC currently provides following roles:
- `CCM Viewer` : Grants permission to view CCM entities, including AutoStopping rules and loadbalancers as whole.
- `CCM Admin`: Grants permission to create/edit/delete CCM entities, including all AutoStopping rules and loadbalancers.

While global RBAC assigns broad roles such as Admin, Viewer, or Editor, granular permissions enable precise control over which resources and actions a user can access. This reducing security risks by granting only the necessary permissions. It also improves multi-team management by restricting access based on specific resource groups, such as connectors, without exposing unnecessary data. 

Connectors are shared resources in the Harness account, meaning multiple users can use them. Since they are shared, they appear in the Shared Resources section when creating a Resource Group (RG) in the ACL (Access Control List) module. Admins can create Resource Groups (RGs) for connectors by selecting the relevant connectors.

Once an RG is created, it can be assigned to a user along with a role. This ensures that the user can only perform operations allowed by the role and only on the resources specified in the RG.

Example:
If a user is assigned the `CCM Viewer` role on an RG called `rg_dev_connectors`, which includes a connector named `dev_connector` (linked to a DEV cloud account), then:

- The user will have only viewer access to AutoStopping Rules (ASRs) and Load balancers created using `dev_connector`.
- They will not be able to modify or manage other ASRs or connectors.


![](./static/granular-rbac-one.png)
![](./static/granular-rbac-four.png)

To control which cloud accounts a user can perform the above actions on, you need to create a **Resource Group** under **Account Settings > Resource Groups** that defines the appropriate access.  

1. Under **"Shared Resources"**, select **"Connectors"**, then choose **"Specified"**.  
2. Select all the **CCM AWS Account Connectors** for the cloud accounts you want to grant access to.  
3. Create as many **Resource Groups** as needed, depending on the number of distinct access patterns required.  

![](./static/granular-rbac-two.png)

Once you have a **role** and a **resource group**, you can assign access to a **user, group, or service account**.  

To do this, use your custom **"Autostopping" role** and select the **resource group** that defines the appropriate access for the user, group, or account. 

![](./static/granular-rbac-three.png)


To ensure users can properly view AutoStopping Rules, you must grant them `**Connector:View**` permission. This allows them to load all necessary information related to AutoStopping Rules.  

![](./static/ui-error.png)
![](./static/ui-error-two.png)