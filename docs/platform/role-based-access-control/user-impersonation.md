---
title: User Impersonation
description: Learn how to impersonate a user and perform actions on their behalf.
sidebar_position: 60
helpdocs_topic_id: hyoe7qcaz6
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note Feature Flag details
    This feature is currently behind the `PL_ENABLE_USER_IMPERSONATION` feature flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

User Impersonation allows account administrators to temporarily act as another user in the account, including other admins without needing their password. This feature is especially useful for troubleshooting, and verifying permissions across environments.

By impersonating a user, admins can see exactly what that user sees and perform actions on their behalf, ensuring a more accurate and efficient support or testing process. 

### Prerequisite

- A user must have the Account Admin role to impersonate other users.

### How to Impersonate a User

1. Navigate to **Account Settings**, **Access Control** and select **Users**.

2. Check for a user you want to impersonate, click on the vertical Ellipsis icon on the right, and select **Impersonate user**.

    ![impersonate-user](./static/user-impersonate-option.png)

3. For each impersonation session, you must provide a valid reason. Once entered, click **Start Impersonation** to begin the session.   

    ![impersonate-reason](./static/reason-impersonate.png)

4. The impersonation session lasts 30 minutes. A banner at the top of the screen shows the remaining time for the session.

    ![impersonate-popup](./static/session-popup.png)

5. To end the impersonation session midway, click **End Session**. 

6. When the session ends, a prompt appears giving you the option to either **Restart Session** or **Quit**.

    ![end-impersonate-session](./static/end-impersonate.png)

### Impersonation session audit events

The "Start impersonation" audit event is triggered at the beginning of an impersonation session, while the "End impersonation" audit event occurs when the session concludes or times out.

All audit events fired during the impersonation session are tagged with the impersonator and impersonated user details. These can be viewed in the [Audit Trail](/docs/platform/governance/audit-trail/) page. 

The Action column shows the activity, while the User column indicates who was impersonated and by whom.

    ![audit-trail](./static/audit-trail.png)

:::info Important Note    

    The impersonation option is only available under Account Settings > Access Control >  Users. It is not accessible from the Users page at the Organization or Project level. 

    **The following actions are disabled during an impersonation session to ensure security and control:**
    
    - You cannot impersonate yourself.  
    - Signing out, switching accounts, and changing passwords are not allowed.  
    - Creating, editing, or deleting Personal Access Tokens (PATs) is disabled.  
    - Managing Two-Factor Authentication (2FA) is restricted.
    - Public access and IP allowlist is also not permitted.
:::







