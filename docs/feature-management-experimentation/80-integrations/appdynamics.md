---
title: AppDynamics
sidebar_label: AppDynamics
description: ""
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020898371-AppDynamics </button>
</p>

AppDynamics allows users to proactively monitor, manage, and optimize the most complex software environments. Harness FME integrates with AppDynamics to provide custom events in AppDynamics highlighting Harness FME changes.

If you have trouble completing the integration, contact us at [support@harness.io](mailto:support@split.io).

:::info[Integration requirements]
The Harness FME pre-built integration with AppDynamics does not support AppDynamics On-Premise (self-hosted) solution.
:::

## In AppDynamics
 
To connect Harness FME to AppDynamics, create a role and a user within that role.

1. From AppDynamics navigation menu, select **Settings** > **Administration**.

   ![](./static/appdynamics-step1.png)

2. Select the **Roles** tab.
3. Click **Create New Role**.
4. Type in a **Name** and **Description** for this role.
5. Select the application that you want the role to be able to push events to, and select **Customized** from the **View** dropdown. 
6. Click **View** and then **Edit** (the pencil).

   ![](./static/appdynamics-step2.png)

7. Select **Configure Actions** as the minimal permission required for Harness FME to be configured.

   ![](./static/appdynamics-step3.png)

8. Click **OK** to close the Edit Permissions popup, then click **Save**.
9. Select the **Users** tab.
10. Click **+** above the user list. 

    ![](./static/appdynamics-step4.png)

11. Type in a **Username**, **Name**, and **Email** for the user, and click **Change Password** to enter a password. 

    ![](./static/appdynamics-step5.png)

12. Verify that the user belongs to the group you created in steps 1 through 8.
13. Click **Save**. 

## In Harness FME

![](./static/appdynamics-splitadmin-step1.png)

1. From the left navigation, click the **profile button** at the bottom, select **Admin settings**, click **Integrations**, and navigate to the Marketplace.

   ![](./static/appdynamics-splitadmin-step2.png)

2. Click **Add** next to **AppDynamics**.
   
   ![](./static/appdynamics-splitadmin-step3.png)

3. Paste the URL you use to access AppDynamics Controller user interface in a browser.
      Typical value: **http://\<account\>.saas.appdynamics.com/controller**.
4. Paste the application name (exactly as it appears) where you would like Harness FME events added.
5.  Enter the username and password for the user you created in Step 9 through 13.
6. Click **Save**.

Harness FME notifications should now be flowing into AppDynamics.  Of course, please contact [support@split.io](mailto:support@split.io) if you have any issues with this integration.
