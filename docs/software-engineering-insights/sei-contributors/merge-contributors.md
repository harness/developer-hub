---
title: Merge Contributors (BETA)
description: Manage contributor attributes and associations.
sidebar_position: 50
sidebar_label: Merge user profiles (BETA)
---

## Overview

When setting up Software Engineering Insights with multiple integrations, the data ingested by each creates different integration-specific user profiles. SEI uses email addresses to unify these user profiles, but sometimes you might encounter multiple user profiles for the same user.

This happens when the same individual is linked to different accounts across integrations. Managing and merging these profiles ensures accurate data representation and prevents issues like:

* **Incomplete ticket tracking:** Missing links between contributors and associated tasks.
* **Missing commit information:** Difficulty tracking contributions accurately.
* **Fragmented pull request data:** Pull request history appears under multiple users.
* **Inaccurate contributor metrics:** Skewed analytics and performance metrics.

## Connected user accounts

To identify and manage duplicate profiles:

* Navigate to the **Contributors** section in the SEI dashboard.
* Click on **Connected User Accounts** to view all user profiles linked to your integrations.

## User profile matching

SEI uses intelligent algorithms to group similar user profiles under two categories: **Candidates** and **Outstanding**. The grouping is based on matching criteria that can be customized for specific use cases.

### Matching criteria

* **Email Address (default):** User profiles with the same email are grouped together. You can enable an option to ignore email domains for scenarios where users use different domain emails (e.g., user@work.com and user@personal.com).
* **Name:** Match profiles by first name, last name, or a combination of both.
* **Username:** Identify contributors based on unique usernames.
* **No Criteria:** Profiles can be grouped manually without predefined rules.

### Profile categories

Profile categories define how SEI organizes user profiles based on matching criteria:

* **Candidates:** Groups of profiles automatically matched by SEI based on the chosen criteria. You can review and fine-tune these groups by adding or removing profiles.
* **Outstanding:** Unmatched profiles that the system couldn’t group. Requires manual intervention to add to existing groups or create new ones.

## Merging contributor profiles

Merging ensures all data associated with multiple user profiles is unified. Follow these steps to merge profiles effectively:

### Step 1: Identify duplicate profiles

* Navigate to **Contributors > Connected User Accounts**.
* Review the **Candidates** section:
  * Click on a group to expand and view matched profiles.
  * Verify that profiles belong to the same individual.
  * Adjust groups by adding or removing profiles as needed.

### Step 2: Choose merge options

* **Merge Contributors:** Instantly merge profiles into a single contributor record.
* **Identify as Draft:** Save proposed matches for later review.

### Step 3: Finalize and publish changes

* Navigate to the **Contributors > Draft** tab to review matches saved as drafts.
* Verify details such as:
  * Number of new contributors created.
  * Profiles added or removed from existing contributors.
  * Profiles flagged for deletion.
* Once satisfied, click **Publish All Changes** to update the contributor records.


:::info
Changes made during merging are irreversible. Use the draft mode to ensure accuracy before publishing.
:::

### Best practices

To maintain clean and accurate contributor records:

* **Regular reviews:** Periodically check for duplicate profiles and merge them.
* **Verify matches:** Ensure the accuracy of automatic matching before merging.
* **Use draft mode:** Always use the draft feature to review changes in bulk.
* **Customize matching criteria:** Adjust the criteria based on your organization’s specific needs.
