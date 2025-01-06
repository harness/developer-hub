---
title: Tags
sidebar_label: Tags
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020839151-Tags <br /> ✘ images still hosted on help.split.io </button>
</p>

Use tags to organize and manage feature flags, segments, and metrics across the Split user interface. Tags can isolate a particular team or feature release, for example, _reporting team_, _front end_, or _geo search release_.

We recommend creating tags that are specific to your workflow. Here are some ideas to get you started: 

* **By team.** Identify the responsible team using tags such as _front end_, _infrastructure_, _web_, or _mobile_.
* **By feature release.** Identify all of the feature flags associated with a particular release using tags such as _reporting_, _new permissioning_, or _contact database migration_.
* **By feature flag type.** Identify all the feature flags associated with paywalls or those that are permanent versus temporary, using tags such as _paywall_, _permanent_, or _temporary_.

**Notes - Be aware that:**

* **Tag names of tags are case sensitive.**
* **Tags are shared across projects, so avoid giving them sensitive names you don't want all users in all projects to see.**

# Adding tags
 
To tag feature flags, segments, or metrics: 

1. Select the item you want to tag. 
2. Click the gear icon next to the feature flag title and select Edit details. The Details view appears.
<p>
   <img src="https://help.split.io/hc/article_attachments/15700952699277" alt="edit-details-1.png" />
</p>   
3. In the Tags field, either click in the field to display a list of tags or start entering to select an existing tag from the menu list. You can also create a new tag.
<p>
   <img src="https://help.split.io/hc/article_attachments/15629816804621" alt="details.png" />
</p>
4. Click the **Save** button.

3fc3661-split_tags.png

# Removing tags

To remove a tag, do the following:

1. Select the item you want to remove the tag from.
2. Click the gear icon next to the feature flag title and select **Edit details**. The Details view appears.
3. In the Tags field, either delete the selected tag or click the X to delete all tags at once.
4. Click the **Save** button.

# Filter by
 
Tags are most useful if they allow you to locate those items using a particular tag. When looking at lists in Split, whether of feature flags, segments, or metrics, you can use tags to filter the list to focus on just the items that have those tags.

1. Click **Filter** and hover over **Tag**. A list of tags appears.
2. Use the list to select as many tags as you want to filter by.

<p> 
   <img src="https://help.split.io/hc/article_attachments/15667377072781" />
</p>   

:::info[Pro tip]
All tags are clickable within Split, making it easy to filter for the tag that you care about most. 
:::