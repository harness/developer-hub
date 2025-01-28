---
title: Identifying customers
sidebar_label: Identifying customers
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020529772-Identifying-customers <br /> ✘ images still hosted on help.split.io </button>
</p>

:::warning[Not used for targeting and getTreatment]
Customer attributes stored using the methods discussed here aren't used for targeting your roll out definitions or as part of the standard usage of getTreatment. In order to target, you must pass the attribute with the `getTreatment` call. Learn more about targeting based on [custom attributes](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes).
:::

You can use the [identities REST API](https://docs.split.io/reference/identities-overview) to identify your keys in Split, making them available when writing targeting rules in the user interface and enriching autocomplete functionality throughout the user interface. Identifying your keys is useful if you want to pre-populate the user interface for your team and provide customer data when setting up your rollouts and analyzing [impression data](https://help.split.io/hc/en-us/articles/360020585192-Impression-events).

# Send
 
Split offers both a [identities REST API](https://docs.split.io/reference/identities-overview) and [client-specific API wrappers](https://help.split.io/hc/en-us/sections/12618854150157-Admin-API-Wrappers) to use when sending to Split attributes on your keys.

# Manage
 
As an administrator in Split, you can see the attributes that your team is sending to Split and the last time an update is received. To manage your accounts's attributes, do the following:

1. From the left navigation, click on the **user's initials** at the bottom, select **Admin settings** and then **Projects**. 

2. Click **View** for the project you are working in and then the **Traffic types** tab. 

3. Click **View/edit attributes**.

<p>
  <img src="https://help.split.io/hc/article_attachments/30800922792205" alt="identifying_customers.png" />
</p>

3. Optionally, edit the display name, description, and attribute type.

4. Click **Save**. The attributed is updated.

# Visualize
 
You can view a customer's attribute data on the third tab of the customer dashboard which is populated from the attribute data you send using Split's API. To navigate to this dashboard, click on a unique key when you view impression data or use the search bar on the left navigation panel.
