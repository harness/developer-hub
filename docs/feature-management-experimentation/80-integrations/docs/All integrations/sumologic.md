---
title: Sumo Logic
sidebar_label: Sumo Logic
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020746172-Sumo-Logic <br /> ✘ images still hosted on help.split.io </button>
</p>

Sumo Logic provides log monitoring, management, and analytics service. Integrate Split data into Sumo Logic to get rollout and rollback events in Sumo Logic. These events can be overlayed with any other log data to quickly detect and correlate application issues with feature flag changes.

If you are having trouble completing the integration, contact us at [support@split.io](mailto:support@split.io).

# In Sumo Logic
 
1. Click **Manage** and **Setup Wizard** from the dropdown to set up new streaming data.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017446071/Sumo_SetupWizard.png" alt="Sumo_SetupWizard.png" />
</p>

2. On the Select Data Type page click **Your Custom App**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017446051/Sumo_SelectDataType.png" alt="Sumo_SelectDataType.png" />
</p>

3. On the Set Up Collection page click **HTTP Source**. 

<p>
	<img src="https://help.split.io/hc/article_attachments/360017446031/Sumo_SetUpCollection.png" alt="Sumo_SetUpCollection.png" />
</p>

4. On the Configure Source page specify a **Source Category** (use *Split* as the name) and a **Time zone**, and then click **Continue**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017446011/Sumo_ConfigureSource.png" alt="Sumo_ConfigureSource.png" />
</p>

5. Copy the URL provided to configure the Sumo Logic integration in Split , and then click **Continue**. This URL contains the token/key used to identify your Sumo Logic account.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017445971/Sumo_HTTPSource.png" alt="Sumo_HTTPSource.png" />
</p>

# In Split

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.
3. Find Sumo Logic in the integration list, click **Add** and select the Split project for which you would like to configure the integration.

<p>
  <img src="https://help.split.io/hc/article_attachments/15665519162509" alt="Screen_Shot_2023-05-10_at_12.12.50_PM.png" /><br />
</p>

4. Paste the Source Address you copied in step 5.

<p>
  <img src="https://help.split.io/hc/article_attachments/15665771000461" alt="Screen_Shot_2023-05-10_at_1.48.48_PM.png" />
</p>

5. Click **Save**.

Split notifications should now be flowing into Sumo Logic. If you have any issues with this integration, contact [support@split.io](mailto:support@split.io).
