---
title: Papertrail
sidebar_label: Papertrail
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020700512-Papertrail <br /> ✘ images still hosted on help.split.io </button>
</p>

Papertrail provides cloud-hosted log management solutions. Integrate with Papertrail to get Split rollout and rollback events in Papertrail. These events can be overlayed with any other log data to quickly detect and correlate application issues with Split changes.

If you are having trouble completing the integration, contact us at [support@split.io](mailto:support@split.io).

# In Papertrail
 
1. Log in to your Papertrail account.
2. Go to [https://papertrailapp.com/systems/setup](https://papertrailapp.com/systems/setup).
3. Copy the log destination ([host] and [port] information) required for this integration.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017382611/Papertrail_LogInfo.png" alt="Papertrail_LogInfo.png" />
</p>

# In Split

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.

<p>
    <img src="https://help.split.io/hc/article_attachments/15666661728397" alt="Screen_Shot_2023-05-10_at_2.18.44_PM.png" />
</p>

3. Find Papertrail in the integrations list, click **Add** and select the Split project for which you would like to configure the integration.

<p>
  <img src="https://help.split.io/hc/article_attachments/15666662894733" alt="Screen_Shot_2023-05-10_at_2.18.57_PM.png" />
</p>

4. Paste the log destination you copied in step 3 of the Papertrail instructions.
5. Click **Save**.

Split notifications should now be flowing into Papertrail. Of course, please contact [support@split.io](mailto:support@split.io) if you have any issues with this integration.
