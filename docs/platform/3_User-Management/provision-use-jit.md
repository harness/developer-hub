---
title: Provision users JIT
description: Just-in-time user provisioning.
sidebar_position: 2
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

:::important
Currently, this feature is behind the feature flag `PL_ENABLE_JIT_USER_PROVISION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

Just-in-time (JIT) provisioning in Harness lets you provision users automatically upon first sign in to Harness through SAML SSO.
You can automatically provision users added to your SAML applications configured in Harness and allow them to access Harness.
Provisioning users automatically eliminates repetitive tasks related to manual provisioning, simplifying user management.

## Enable JIT provisioning in Harness

To enable JIT provisioning in Harness: 
1. Select **ACCOUNT SETTINGS**, and then **Authentication**.
2. Select **SAML Provider**.
   The **Add SAML Provider** settings appear.
3. In **Name**, enter a name for the SAML provider.
4. In **Select a SAML Provider**, select one of the following: 
   - Azure
   - Okta
   - OneLogin
   - Other
   
   ```mdx-code-block
   <Tabs>
      <TabItem value="Azure">
   ```

   For steps to configure, go to [SAML SSO with Azure](/docs/platform/Authentication/single-sign-on-saml#saml-sso-with-azure).

   ```mdx-code-block
      </TabItem>
      <TabItem value="Okta">
   ```   

   For steps to configure, go to [SAML SSO with Okta](/docs/platform/Authentication/single-sign-on-saml#saml-sso-with-okta).

   ```mdx-code-block
      </TabItem>
      <TabItem value="OneLogin">
   ```

   For steps to configure, go to [SAML SSO with OneLogin](/docs/platform/Authentication/single-sign-on-saml#saml-sso-with-onelogin).

   ```mdx-code-block
      </TabItem>
      <TabItem value="Others">
   ``` 

   For steps to configure, go to [SAML SSO with Keycloak](/docs/platform/Authentication/single-sign-on-saml#saml-sso-with-keycloak).

   ```mdx-code-block
      </TabItem>
   </Tabs>
   ```

5. Select **Enable JIT Provisioning**. 
   This enables Just-In-Time (JIT) provisioning to add users to Harness on their first login via the configured SAML provider.

6. To control who can get added to Harness on their first login, define the key-value that must be present in the SAML assertions by entering the following: 
   - **JIT Validation Key**: To log in for the first time, the SAML assertion must contain the key.
   - **JIT Validation Value**: At the time of first login, enter the value for the validation key that must be present in the SAML assertion.
   
     ![](./static/jit-user-provisioning.png)

Harness automatically provisions any new SAML users with the matching **JIT Validation Key** and **JIT Validation Value** after they log in for the first time.
