---
title: Rollbar
sidebar_label: Rollbar
description: ""
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020700732-Rollbar </button>
</p>

Rollbar is an error tracking software for development teams. Integrate Split data into Rollbar to get rollout events in Rollbar to gain insight on the causes of errors. 

If you are having trouble completing the integration, contact us at [support@split.io](mailto:support@split.io).

## In Rollbar
 
1. Log in to your Rollbar account.
2. Click **Settings**.

   ![](./static/rollbar-settings.png)

3. Select **Project Access Tokens**.
4. Click **Add new access token**.

   ![](./static/rollbar-tokens.png)

5. Edit the new token and **rename** to split.
6. Ensure that `post_server_item` is the only item checked. 

   ![](./static/rollbar-tokens-rename.png)

7. Copy the token. 

   ![](./static/rollbar-tokens-copy.png)

## In Split

1. Click the **profile button** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.

   ![](./static/rollbar-splitadmin.png)

3. Click **Add** next to Rollbar and select and select the Split project for which you would like to configure the integration.

   ![](./static/rollbar-integration.png)

4. Paste the token you copied in step 3 of the Rollbar instructions.
5. Click **Save**.

Split notifications should now be flowing into Rollbar. If you have any issues with this integration, contact [support@split.io](mailto:support@split.io).
