---
title: Datadog
sidebar_label: Datadog
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4822553169933-Datadog <br /> ✘ images still hosted on help.split.io </button>
</p>

Datadog is a cloud-hosted monitoring and analytics platform for development and operations teams. Integrate Split data into Datadog to monitor and measure the performance impact of Split changes. If you are having trouble completing the integration, contact us at [support@split.io](mailto:support@split.io).

# In Datadog
 
1. Go to **Integrations** and click **APIs**.

<p>
  <img src="https://help.split.io/hc/article_attachments/16538703447437" alt="datadog-api-selection.png" width="450" />
</p>
2. Click **Create API Key**.

<p>
  <img src="https://help.split.io/hc/article_attachments/16538703454605" alt="create-datadog-api-key.png" width="563" />
</p>

3. Copy the API key that you just created.

# In Split

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.

<p>
  <img src="https://help.split.io/hc/article_attachments/15666257081229" alt="Screen_Shot_2023-05-10_at_2.04.06_PM.png" />
</p>

3. Click **Add** next to Datadog and select the Split project for which you would like to configure the integration. The Split Datadog interface appears.
4. In the Environment field, specify the environment from where you want audit logs sent to Datadog.
5. In the Site field, map the integration to a specific Datadog site. This supports the integration for any Datadog site, including the EU. Refer to the [Datadog Sites page](https://docs.datadoghq.com/getting_started/site/) for more information about sites.

   **Note: If you’re a current Datadog integration user, your integrations will continue to work. However, when you edit the integration, you must select the environments and the URLs again before you save your new setting.**

6. In the API key field, paste the API key that you copied in step 3 of the Datadog instructions.
7. Click **Save** to save your selections. You have now mapped your integration to your selected site.

Split notifications should now display in Datadog as "tage:role:split.io".

If you have any issues with this integration, contact [support@split.io](mailto:support@split.io). 

# Using Split with Datadog RUM

This Split integration automatically enriches your RUM data with a feature flag variant. It allows you to correlate feature releases with performance and troubleshoot any issues to ensure safe feature releases. 

To get started, refer to [Getting Started with Feature Flag Data in RUM](https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=npm#split-integration) to set up data collection for your feature flags with this Split integration and monitor your feature flags to turn them off or roll them back in case of any issues without causing negative user experiences.

**Note: The Using Split with Datadog RUM integration has been tested by Split but is owned and maintained by Datadog. For more information, contact Datadog support.**
