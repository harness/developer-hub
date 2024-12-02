---
title: Review period check
sidebar_label: Review period check
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020635912-Review-period-check <br /> ✘ images still hosted on help.split.io </button>
</p>

Making conclusions about your metrics impact during set review periods reduces the chance of errors and allows you to account for seasonality in your data. Split always shows your current metrics impact and if your review period has been reached. The images below show the two different states of **incomplete** and **complete**.

:::info[Note]
As a best practice, avoid making conclusive product decisions in between review periods or at minimum ensure that you have run for at least one review period.
:::

## Incomplete
 
The review period was incomplete because your feature flag didn't run for the minimum review period selected for this feature flag.  

<p>
  <img src="https://help.split.io/hc/article_attachments/360027414591/Screen_Shot_2019-04-30_at_11.36.16_AM.png" alt="Screen_Shot_2019-04-30_at_11.36.16_AM.png" width="1740" />
</p>

## Complete
 
The review period is complete when a feature flag either: 

* Runs for the minimum review period which is selected for this experiment in either a current or previous version of your feature flag. A 14-day review period (configured by default) is ready for review on day 14, 28, 42, etc.

<p>
  <img src="https://help.split.io/hc/article_attachments/360027414851/Screen_Shot_2019-04-30_at_11.47.35_AM.png" alt="Screen_Shot_2019-04-30_at_11.47.35_AM.png" width="709" />
</p>

* Is currently running but is between review periods.

 ## Change settings
 
If you believe that the default review period for your account is too long or too short, contact your administrator to adjust your [statistical settings](https://help.split.io/hc/en-us/articles/360020640752).

