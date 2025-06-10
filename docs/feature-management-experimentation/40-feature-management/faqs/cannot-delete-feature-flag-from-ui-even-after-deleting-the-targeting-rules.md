---
title: Cannot delete feature flag from UI even after deleting the targeting rules
sidebar_label: Cannot delete feature flag from UI even after deleting the targeting rules
sidebar_position: 7
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360041111652-Cannot-delete-feature-flag-from-UI-even-after-deleting-the-targeting-rules </button>
</p>

### Issue

When trying to delete a feature flag that exist in multiple Environments, The error below show up:

![](https://help.split.io/hc/article_attachments/15734682207117)

However, after deleting all the custom targeting rules, the error persists.

### Answer

The error is referring to all the feature flag definitions within the environment, meaning: Treatments, Individual targets, Dynamic Configs and Default Rules, in addition to the Custom Targeting Rules.

To delete all the definitions, click on the second (...) icon from the top right and click **Delete targeting rules**.

Repeat the same action for all other Environments that the feature flag is added to. Then the delete feature flag option will work successfully.