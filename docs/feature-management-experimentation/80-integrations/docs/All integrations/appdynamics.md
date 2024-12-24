---
title: AppDynamics
sidebar_label: AppDynamics
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020898371-AppDynamics <br /> ✘ images still hosted on help.split.io </button>
</p>

AppDynamics allows users to proactively monitor, manage, and optimize the most complex software environments. Split integrates with AppDynamics to provide custom events in AppDynamics highlighting Split changes.

If you have trouble completing the integration, contact us at [support@split.io](mailto:support@split.io).

:::info[Integration requirements]
The Split pre-built integration with AppDynamics does not support AppDynamics On-Premise (self-hosted) solution.
:::

# In AppDynamics
 
To connect Split to AppDynamics, create a role and a user within that role.

1. From AppDynamics top menu, select **Settings** > **Administration**.

<img src="https://help.split.io/hc/article_attachments/360017297331/AppDynamics_Step1.png" alt="AppDynamics_Step1.png" />

2. Select the **Roles** tab.
3. Click **Create New Role**.
4. Type in a **Name** and **Description** for this role.
5. Select the application that you want the role to be able to push events to, and select **Customized** from the **View** dropdown. 
6. Click **View** and then **Edit** (the pencil).

<img src="https://help.split.io/hc/article_attachments/360017297371/APPD.png" alt="APPD.png" />

7. Select **Configure Actions** as the minimal permission required for Split to be configured.

<img src="https://help.split.io/hc/article_attachments/360017297391/AppD2.png" alt="AppD2.png" />

8. Click **OK** to close the Edit Permissions popup, then click **Save**.
9. Select the **Users** tab.
10. Click **+** above the user list. 

<img src="https://help.split.io/hc/article_attachments/360017297411/AppD_Step2.png" alt="AppD_Step2.png" />

11. Type in a **Username**, **Name**, and **Email** for the user, and click **Change Password** to enter a password. 

<img src="https://help.split.io/hc/article_attachments/360017297451/AppD_User.png" alt="AppD_User.png" />

12. Verify that the user belongs to the group you created in steps 1 through 8.
13. Click **Save**. 

# In Split

<p>
  <img src="https://help.split.io/hc/article_attachments/360021229812/appd7.png" alt="appd7.png" />
</p>

1. From the left navigation, click the **user's initials** at the bottom, select **Admin settings**, click **Integrations**, and navigate to the Marketplace.

   <p>
      <img src="https://help.split.io/hc/article_attachments/15669189227917" alt="Screen_Shot_2023-05-10_at_4.18.14_PM.png" />
    </p>

2. Click **Add** next to **AppDynamics**.
   
   <img src="https://help.split.io/hc/article_attachments/15669206332685" alt="Screen_Shot_2023-05-10_at_4.18.28_PM.png" />

3. Paste the URL you use to access AppDynamics Controller user interface in a browser.
      Typical value: **http://\<account\>.saas.appdynamics.com/controller**.
4. Paste the application name (exactly as it appears) where you would like Split events added.
5.  Enter the username and password for the user you created in Step 9 through 13.
6. Click **Save**.

Split notifications should now be flowing into AppDynamics.  Of course, please contact [support@split.io](mailto:support@split.io) if you have any issues with this integration.
