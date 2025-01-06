---
title: How can you tell what treatment a user sees?
sidebar_label: How can you tell what treatment a user sees?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360047489331-How-can-you-tell-what-treatment-a-user-sees <br /> ✘ images still hosted on help.split.io </button>
</p>

There are three primary use cases for determining who is seeing which treatment that can be answered in Split:

## Use Case 1 - What a user sees whenever they log back in?

This question is often asked to validate the rollout plan when a feature flag is changed. You can answer this question by going to the Key page.  Here's an example:

![customer-dashboard.png](https://help.split.io/hc/article_attachments/15872105262861)

In this image, you can see that the user will see the 'on' treatment for the admin_panel_access flag every time they log in, based on the current rollout plan.

#### Caveats:

* This view will only show you treatments for feature flags that are not using [attributes](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes) for targeting. This is because for data privacy reasons, Split does not copy attribute values to the Split cloud. So, we do not know the value of a specific attribute for user bilal.
* The key is just for demonstration purposes. It will typically be a database id or a cookie id.

#### How to get to the key page:

* You can get to the key page either by searching for that key (say bilal) in the search box near the top left corner of the app, above (My work).
* You can also click on the key id in Live Tail, once paused, or the Data hub to get to the key page. 

## Use Case 2 - What treatments is a user seeing right now for one or more feature flags?

This question is often asked when debugging the live experience of a customer or when making changes to a feature flag to see which users are seeing a particular treatment.

You can answer this question by going to Data hub. See this example:

![data_hub-query.png](https://help.split.io/hc/article_attachments/15872511625229)

Here, you are searching for a specific key (say user id).  Split fetches the live treatments that are being assigned right now.

#### Caveats:

* Since this is a live tail of logs, this query will only show you results starting from when you issued the query. It will not show you events from the past. If you want to query historical data you can use the Data export tab in Data hub.
* Given the size of the data we are searching for, there is an initial lag in the query response of about 10 seconds.

#### How to get to Data hub?

* You can click on the Data hub in the navigation to get to this page.
* If you are on a feature flag page, you can also click on Live tail tab to get a filtered view of impressions for that specific flag.

As noted above, you can get to the key page from the Data Hub or the Live Tail tab by pausing the query and clicking on the key.

## Use Case 3 - What treatments was a user shown in the past?

This is a common question for support teams. You can answer this question by going to the Data export tab of Data hub as shown in the picture above.