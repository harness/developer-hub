---
title: Use statuses
sidebar_label: Use statuses
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4405023981197-Use-statuses <br /> ✘ images still hosted on help.split.io </button>
</p>

You can assign a status to each feature flag when creating or updating targeting rules. Statuses provide a way for teams to indicate which stage of a release or rollout a feature is in at any given moment, and as a way for teammates to filter their feature flags to see only features in a particular stage of the internal release process.

**Note:** For more information about the rollout board, refer to the [Use the Rollout board](https://help.split.io/hc/en-us/articles/4405016480269) guide.

## Change the status of a feature flag

When you review the Change summary page for saving or submitting a change for a feature flag definition, you can change a particular status of your flag. To change a status, do the following:

1. After submitting a change to the rollout plan of a feature flag, on the Change summary page, in the Status field, select the desired status, e.g. Internal testing. 

   **Note: If you create a new feature flag, the default is Pre-production. For any existing flag, it keeps its existing status.**
   
 <p>
   <img src="https://help.split.io/hc/article_attachments/15727153567885" alt="Screenshot_2023-05-12_at_15.38.38.png" />
</p>

2. To decide when  this change takes effect selection, you can either select:


  * Immediately: The change takes effect once you save change
   * At a later time: The change takes effect on a specified date and time

3. After you make a selection, click the **Save** button to save your changes.

If you want to change the status of that feature flag without changing the rollout plan, you can mark a flag as permanent or removed from the code, or to assign a status if you forgot to do so when you changed your targeting rules. To change the status, do the following:

1. Select the feature flag you want to assign a new status to.

2. In the Details are, click the gear icon and select **Edit details**. The Details panel appears.

  <p>
     <img src="https://help.split.io/hc/article_attachments/15726939960205" alt="Screenshot_2023-05-12_at_15.32.39.png" />
  </p>   

3. Select the desired status. A change status message appears asking if you want to change the status. 

4. Click the **Save** button to save your changes.

## Display and filter your statuses

Once you assign statuses to your feature flags, you can then display and filter them to view the ones within the browse area that are relevant to you. To display and filter your flags, do the following:

1. From the left hand navigation bar, click **Feature flags**. A list of feature flags and their associated status badges display.

2. From the feature flag list view, select **Filter** and then **Status**. The list of filters displays.

  <p>
    <img src="https://help.split.io/hc/article_attachments/15667451217933" />
  </p>

3. Select the desired statuses that you want to view. The selected statuses display in the browse area.

## Status definitions

The following explains the available statuses: 

* **Pre-Production (grey).** Indicates feature flags where code for the feature isn’t pushed to production.

* **0% in Production (grey).** Indicates feature flags where code for the feature is pushed to prod but not turned on for anyone

* **Killed (red).** Indicates feature flags that are moved to the default treatment due to an issue or bug

* **Internal Testing (blue).** Indicates feature flags that have only been turned on for users that are employees or contractors

* **External Beta (blue).** Indicates feature flags that have been turned on for a few external beta customers that have been pre-selected or chosen for early access to a feature

* **Ramping (blue).** Indicates feature flags that are turned on for a small percentage of users to make sure no performance issues or larger issues come up

* **Experimenting (blue).** Indicates feature flags that have are ramped for max power in an experiment to get results as quickly as possible

* **100% Released (green).** Indicates feature flags that have been moved to be fully on for all customers

* **Removed from Code (white).** Indicates feature flags that have been removed from the codebase

* **Permanent (white).** Indicates feature flags that are set to be permanent circuit breakers in the application