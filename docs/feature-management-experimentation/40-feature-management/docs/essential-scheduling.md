---
title: Essential scheduling
sidebar_label: Essential scheduling
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/11461143253517-Using-essential-scheduling <br /> ✘ images still hosted on help.split.io </button>
</p>

Essential scheduling provides the capability to launch a feature on a certain date and time. This allows you to make changes to a feature flag and get approvals ahead of the release date which makes release planning and collaboration easier and more flexible while also increasing the likelihood to release on a target date.

**Note: Total number of scheduled changes per month depends if you are in a certain pricing tier. Contact [support@split.io](emailto:support@split.io) for more information.**

To use essential scheduling, do the following:

1. After you make changes to a feature flag, the **When is this change going into effect** option in the Change summary page appears:

 <p class="wysiwyg-indent4">
  <img src="https://help.split.io/hc/article_attachments/15635722714765" width="583" />
</p>

2. Select when changes made to the feature flag go into effect as follows:
   * **Immediately.** The feature flag goes into effect immediately. Note: This depends on the environment. If the environment doesn’t require approvals, the change goes live immediately. If approvals are required, the change goes live immediately after it’s approved.
   * **At a later time.** The feature flag goes into effect at a scheduled date, time, and timezone. 
3. If you select At a later time, fill out the following:

  **Notes:** 
  * **The date must not be more than 90 days in the future.**
  * **You can schedule changes for up to 10 flags in the same minute (e.g., from 1:00 to 1:01 pm, on a particular date and timezone, you can only schedule up to 10 changes).**

   * In the Select date field, select the desired date you want the feature flag to deploy.
   * In the Select time field, select the desired time you want the feature flag to deploy.
   * In the Timezone field, select the desired timezone.

4. After the feature flag is saved and approved, the feature flag displays in a read-only mode until it’s published at the scheduled time or the scheduling is discarded. Be aware that if a scheduled change request is pending approval and so much time has passed that the scheduled date is now in the past, the change request immediately gets published once it is approved. For example, if you schedule a change request to go out on February 1st  and the approval occurs on February 3rd, the change is immediately published on February 3rd.

# Discarding a scheduled change

To discard a scheduled change, click the scheduling counter and click the **Discard changes** button.
