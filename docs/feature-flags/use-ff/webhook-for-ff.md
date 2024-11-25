---
title: Using Webhook for Feature Flag Implementation with Harness
description: Using Webhook for Feature Flag Implementation with Harness
sidebar_position: 9
---

Webhooks are automated, real-time communication mechanisms that allow applications to send instant notifications or data to other systems when specific events occur. In the context of Harness Feature Flags, webhooks play a crucial role in enhancing the `gitSync` functionality. They act as a bridge, enabling near-instantaneous synchronization between your Git repository and the Harness platform. 

By leveraging webhooks, Harness can now respond to Git updates almost immediately, ensuring that feature flag configurations are always up-to-date and aligned with the latest code changes. 

:::info
If you'd like to learn more about the Git experience at Harness, you can refer to the doc, [Set up bi-directional sync for Git Experience](../../platform/git-experience/gitexp-bidir-sync-setup.md) for more info.
:::

This document outlines the process of implementing webhooks for Feature Flag functionality within Harness' Git Sync system. The webhook callback enhances the existing `git-to-harness` synchronization process, providing near-real-time updates for changes made to remote files.

## What's the purpose of webhook callbacks? 

The primary purpose of implementing webhook callbacks is to:

 - Reduce the time gap between remote file changes and their effect in Harness.
 - Provide a more responsive synchronization mechanism alongside the existing polling system.
 - Allow users to leverage automatic, near-instant updates without manual intervention.

## Configuration

To set up webhook for Feature Flag implementation:

 1. Navigate to the appropriate scope in Harness (Account, Organization, or Project level).
 2. Go to the **Webhooks** section under **Resources**.
 3. Select **New Webhook** and configure the **Git Connector** for your repository.
 4. Specify the repository and folder path (optional) for storing Harness entities.
 5. Add the webhook. It will be visible in your repo's webhook settings.

## Known Issues and Limitations

 1. **Webhook Scope**: Webhooks are registered for the connector, not a specific folder. Users with multiple projects using the same connector and
 repository should be aware that the webhook will feed events for every file in the repository, regardless of the chosen directory. It's recommended to
 use separate connectors for more granular control.
 2. **Timing Considerations**: Webhook events trigger both NG manager and FF service. There's a possibility that an event may arrive at the Feature
 Flag service before the remote files are properly fetched and cached by the GitEx service. To mitigate this, the system attempts to pull the new file for up to 5 seconds 
 post-event (10 attempts, 500ms apart). If unsuccessful, the system will fall back to the 5-minute poller intervals.
 3. **Enabling Webhook**: Once a webhook is set up at any level (account/project/org) it will be set up for any project that has Git sync enabled with the same GitHub 
 connector in the Feature Flags Module.
 4. **Webhook Events**: At present the webhook events page does not support yaml validation of FeatureFlag yamls
 5. **Deleting Webhooks**: A webhook can be used by many entities so deleting the webhook in Harness will not cause it to be deleted in git.
 6. **Disabling Webhook**: For Feature Flags disabling the webook in Harness is not enough to disable the functionality. You do one of the following:
     - Disable/reset Git Sync in the Feature Flags module.
     - Delete the webhook in Github.
  

## Best Practices

Here are some examples of some best practices:

 1. Use separate Git connectors for different projects or repositories to maintain better control over webhook events.
 2. Ensure that the Git connector used has the necessary permissions to create and manage webhooks in your repository.
 3. Regularly monitor the Webhooks page in Harness to view event details and troubleshoot any synchronization issues.

The implementation of webhooks for Feature Flag Git Sync in Harness significantly improves the responsiveness of the synchronization process. While it doesn't replace the existing polling mechanism, it provides a valuable complementary method for near-real-time updates. Users should be aware of the known limitations and follow best practices to maximize the benefits of this feature.
