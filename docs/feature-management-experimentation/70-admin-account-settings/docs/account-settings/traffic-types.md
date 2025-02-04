---
title: Traffic types
sidebar_label: Traffic types
helpdocs_is_private: false
helpdocs_is_published: true
---

import TrafficType from "@site/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/traffic-types.md";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360019916311-Traffic-types <br /> ✘ images still hosted on help.split.io </button>
</p>

<TrafficType />

The traffic type denotes the nature of the keys that are passed to *getTreatment* for that feature flag. Does the key identify a known logged-in user? A device? Is the key a uuid generated for an anonymous visitor and stored in a cookie on the visitor’s browser?

Split allows you to have up to 10 traffic types per project. All environments within a project share the same set of traffic types. By default, a project has one traffic type named user.

## Create a traffic type

You can create traffic types at any time, but it is a best practice to do so **during your initial account setup**, taking into consideration your anticipated needs. Once a feature flag is created with a given traffic type, that traffic type cannot be changed, so it is important to get it right the first time.

To create traffic types:

1. From the left hand navigation, click the **user's initials** at the bottom and select **Admin settings**. The **Projects** page appears.
2. Select the project that you want to edit traffic types for. 
3. To add more traffic types to the selected project, click **View** and then the **Traffic types** tab. 
4. Click the **Actions** button and then **Add traffic types** in the list. The Create traffic type panel appears.
5. Enter a name and click **Save**. A new traffic type is created.

:::warning
Once a traffic type is created, it cannot be edited.
:::

You can delete a traffic type from this same location in the user interface with the Delete link in the Actions column but only if it is no longer in use by any feature flags or metrics.

If you need assistance with traffic types, contact support at [support@split.io](mailto:support@split.io).