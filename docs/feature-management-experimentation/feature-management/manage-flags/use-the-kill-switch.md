---
title: Use the kill switch
sidebar_label: Use the kill switch
description: ""
sidebar_position: 15
redirect_from:
  - /docs/feature-management-experimentation/feature-management/use-the-kill-switch
---

If a feature flag negatively impacts performance or your user’s experience, you can kill it without changing targeting rules or performing a redeployment. When you kill a feature, all traffic is sent to the default treatment selected for that feature flag.

To kill a feature, do the following:

1. Click **Kill** on the feature flag page. The Kill feature flag warning page opens.
2. Type KILL in the warning page field.
3. Optionally add a title, comment, or approver.
4. Click the **Kill** button.

## Restoring a killed feature

Once you kill a feature, the **Restore** button appears. The Restore function reverses your Kill decision and turns back on the exact targeting rules that were in place prior to the kill.

To restore a killed feature, do the following:

1. Click **Restore** on the feature flag page.
2. Optionally add a title, comment, or approver.
3. Optionally change the status.
4. Click the **Restore** button. The feature is restored.

If you want to make changes to the targeting rules before taking them live again, don't use the Restore function. Instead, make those changes and then click **Review changes**. Once your changes are saved, the Restore button disappears. 
