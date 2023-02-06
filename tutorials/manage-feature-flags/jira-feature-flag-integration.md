---
sidebar_position: 1
description: Walks you through connecting Jira and Harness Feature Flags to track everything from commit to release right in Jira.
---

# Integrate Harness Feature Flags and Jira

## Video Tutorial
<!-- Video:
Jira Integration Demo / How-To -->
<docvideo src="https://harness-1.wistia.com/medias/8h2rye0sgh" />

## Pre-Requisites

In order to use this integration, you will need to install/sign up in 2 places:

1. You will need a Harness Feature Flags account. [Sign up here](https://app.harness.io/auth/#/signup/?module=cf) if you need to create an account.
2. You will need to install the Harness Feature Flags app from the [Atlassian Marketplace](https://marketplace.atlassian.com/apps/1227514/harness-feature-flags-for-jira).

## Getting Started

The video above will walk you through how to connect your feature flags across Harness Feature Flags and Jira. You'll want to make sure you have the pre-requisites in place first.

If you prefer, here are the general steps you will need to follow. The video will show you in detail what each step looks like.

1. Connect your Harness account to Jira by adding your API key in the Harness Feature Flags app.
2. Go to any Jira issue, or create a new one. On the right-hand menu, you'll see the Releases field with the option to "Add feature flag". That will take you to a page to link your feature flag to the Jira issue.
3. In a different tab, go to your Harness project and find the feature flag you want to link to the issue. Click into the flag, and copy the full URL.
4. Go back to the open tab where you were creating the feature flag in Jira. Paste the feature flag URL on the second line. Double check that the first line is being linked to the right issue.
5. You're done! Refresh your Jira issue and you'll see the flag linked. You can now see the flag status and track work and audit any changes right from Jira.

And that's it! You've now connected a Jira issue to a feature flag in Harness Feature Flags. Happy developing :)