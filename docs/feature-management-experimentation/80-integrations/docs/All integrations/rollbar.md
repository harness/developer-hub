---
title: Rollbar
sidebar_label: Rollbar
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020700732-Rollbar <br /> ✘ images still hosted on help.split.io </button>
</p>

Rollbar is an error tracking software for development teams. Integrate Split data into Rollbar to get rollout events in Rollbar to gain insight on the causes of errors. 

If you are having trouble completing the integration, contact us at [support@split.io](mailto:support@split.io).

# In Rollbar
 
1. Log in to your Rollbar account.
2. Click **Settings**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017383071/Rollbar_settings.png" alt="Rollbar_settings.png" />
</p>

3. Select **Project Access Tokens**.
4. Click **Add new access token**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017497852/Rollbar_tokens.png" alt="Rollbar_tokens.png" />
</p>

5. Edit the new token and **rename** to split.
6. Ensure that `post_server_item` is the only item checked. 

<p>
	<img src="https://help.split.io/hc/article_attachments/360017497832/Rollbar_tokens_rename.png" alt="Rollbar_tokens_rename.png" />
</p>

7. Copy the token. 

<p>
	<img src="https://help.split.io/hc/article_attachments/360017383051/Rollbar_tokens_copy.png" alt="Rollbar_tokens_copy.png" />
</p>

# In Split

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.

<p>
  <img src="https://help.split.io/hc/article_attachments/15669100133389" alt="Screen_Shot_2023-05-10_at_4.08.34_PM.png" width="639" />
</p>

3. Click **Add** next to Rollbar and select and select the Split project for which you would like to configure the integration.

<p>
  <img src="https://help.split.io/hc/article_attachments/15669087486989" alt="Screen_Shot_2023-05-10_at_4.10.04_PM.png" width="636" />
</p>

4. Paste the token you copied in step 3 of the Rollbar instructions.
5. Click **Save**.

Split notifications should now be flowing into Rollbar. If you have any issues with this integration, contact [support@split.io](mailto:support@split.io).
