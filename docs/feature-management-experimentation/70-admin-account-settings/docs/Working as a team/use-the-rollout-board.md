---
title: Use the rollout board
sidebar_label: Use the rollout board
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4405016480269-Use-the-rollout-board <br /> ✘ images still hosted on help.split.io </button>
</p>

The Rollout board provides a place for teams to visualize where different features are in the release process and start answering questions like what features are ready for clean up or are ready to be ramped to more customers.

You can set a status for every feature flag and update as it moves through the feature delivery lifecycle. Specifically, you can:

* Scale and coordinate flags and experiments seamlessly across teams
* Decide what features are ready or safe to ramp to more of your customers.
* Turn on a specific feature to all your customers
* Ensure flags are up-to-date and nothing slips through the cracks so that your release goals are on schedule
* Confirm whether features are ready to move to the next status by viewing the number of days in their current status, and the last time it received traffic across any environment
* Decide which features have been fully released for a while and are ready to be removed from your code

**Note: For more information about statuses, refer to the [Use statuses](https://help.split.io/hc/en-us/articles/4405023981197-Use-statuses) guide.**

# Viewing feature flags on a rollout board

To view feature flag on the rollout board, do the following:

From the left navigation bar, select **Rollout board**. The following page opens:

<p>
  <img src="https://help.split.io/hc/article_attachments/30801072641037" alt="rollout_one.png" />
</p>

# Updating status from the rollout board

To immediately update a feature flag status, you can move a flag card from an existing status column to a new status column by doing the following:

1. From the left navigation, select the **Rollout board**. The rollout board displays.
2. Select the card you want to move and place it in the desired status (e.g., from pre-production to internal). A message appears indicating that you successfully updated the status of the flag.

**Notes:** 
  * If the feature flag has a pending status change that is awaiting approval, you can’t move the flag card to a new status on the rollout board until the change request is resolved (e.g., the flag withdrawn or approved). You also can't move a card into the No status or Killed columns.

  * The status of a feature flag is not associated with environments.

# Cleaning up your rollout board

Use the Ready to cleanup feature to find feature flags that are at the end of their lifecycle and can be retired. Typically, feature flags that are in their current status for at least 100 days and are 100% released, killed, ramping, and removed from code are ready to be cleaned up. In addition, the statuses within each column sorts by the number of days in status by descending order.

**Note: The 100 days and the four status columns are the default settings. You can filter and sort the clean up view however you want.**

To clean up your rollout board, at the top left of the rollout board, click **Ready to cleanup**. The Statuses list appears with 100% release, Removed from code, Ramping, and Killed already selected by default. It also shows you can deselect any of the options or select more options. Once you identify which flag you want removed, you can delete the flag from the user interface and ask an approver to delete the flag from the code using a comment or you can contact the owner of the flag to remove it.

# About feature flag cards

Each feature flag displayed on the rollout board has a card associated with it which has the following information:

<p>
  <img src="https://help.split.io/hc/article_attachments/30801101402893" alt="rollout_two.png" width="210" />
</p>

* **Feature flag name.** Name of the flag.

* **Days in status.** Use this indicator for cleanup, to determine if the feature flag is safe for forward movement, and to make sure things are not forgotten.

* **Environment traffic indicators in the project.** You can:

    * Hover to see time for last traffic received
    * The colors indicate the following:
    
      * **Green.** Traffic received last 7 days
      * **Yellow.** No traffic received last 7 days
      * **Red.** No traffic received ever
      * **Grey.** Not configured
     
# An in-depth view of a feature flag’s information 

If you click on a specific card, you get the following in-depth view of your feature flag’s information:

* **Description.** Provides a flag description.
* **Status.** Indicates what the assigned status is (e.g., Ramping).
* **Days in status.** Indicates how many days the flag is in a particular status. In addition, you have two more icon that appears next to this:

  * Blue stamp. Indicates a pending change.
  * Red bell. Indicates an active alert.

* **Owners.** Indicates who owns the flag.
* **Tags.** Indicates what the tags are (e.g., user interface).
* **Created date.** Indicates when the flag was created.

You also get a detailed table showing environment specific data:

* Last traffic received
* Last edit to the rollout plan date
* If there are any pending changes for approval in the environment
* If there are any active alerts

You can go directly to the feature flag's rollout plan by clicking on the name and make changes to the flag.

## About filters, sorting, and properties

The following describes filters and properties on the rollout board and how to use them.

### Filters

The rollout board has two basic filters: 

* **Owned by me.** Feature flags owned by you or any group you’re a part of
* **Starred by me.** Feature flags that you’ve personally starred

<p>
  <img src="https://help.split.io/hc/article_attachments/30801101404685" alt="rollout_three.png" />
</p>

You can also deselect all filters to see a rollout board of all feature flags in the project.

### Customize your filter search 

Select additional filters to refine the search of your featiure flag on the Rollout board. These filters allow you to customize your searches to find the desired flags. In addition to the basic filters, use the following additional filters to further customize your search: 

* **Traffic type.** Allows you to search on the traffic types added to your feature flag
* **Creation date.** Allows you to filter on predefined searches such as Last 24 hours, Last 7 Days, Last week, etc.
* **Tags.** Allows you to filter on tags on your feature flag
* **Days in status.** Allows you to filter on the number of days your feature flag was in status
* **Feature flag name.** Allows you to search on feature flag names with different criteria
* **Owners.** Allows you to search on the feature flag owners

You can select the conditions that join the selected filters between AND or OR connectors. Once you apply a filter,  the final number of feature flags found and the total number of feature flags display.

To apply a filter, do the following:

1. From the left navigation, select **Rollout board**. The Rollout board page displays.
2. In the top right corner, select **Filter**. The Add filter criteria page displays.
3. Click **+Add filter criteria** to add the desired filters. 
4. Select **AND** or **OR**. The conditions are applied to all added filters.
5. After you add the desired filters, you can see the number of applied filters on the Filter icon.

### Select your sorting order

You can select a custom sort order to sort the feature flag cards by a given status. By default, cards with pending changes are listed first. This enables you to see what actions are needed for the feature flag. To select a particular sort order, click **Pending changes** first and then the desired order.

### Share a rollout board

You can share the current view of a rollout board, including applied filters, by using the Copy link selection. To share a rollout board, click the **Copy link** button.  This copies a URL to your clipboard, including the additional filter parameters.

### Select properties

Within a session, you can select certain statuses to get the desired view.

<p>
  <img src="https://help.split.io/hc/article_attachments/30801101405837" alt="rollout_four.png" />
</p>

