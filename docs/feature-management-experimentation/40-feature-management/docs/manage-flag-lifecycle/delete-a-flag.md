---
title: Delete a flag
sidebar_label: Delete a flag
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 4
---

To delete a feature flag, you first need to delete all targeting rules for that flag within all environments. To delete a feature flag, do the following:

1. Select the feature flag you want to delete.
2. Access the desired environment and click the (...) icon next to the KILL button and click **Delete targeting rules**. The Delete rules page appears.
3. Type DELETE in the warning page field and then, in the Add approvers fields, optionally start typing users or groups.
  ** Note: If you don’t add approvers, the feature flag is deleted immediately.**
4. Click the **Delete** button. If you haven’t selected approvers, the targeting rules are deleted.
5. Repeat the same action for all environments that the feature flag is added to. 
6. Once you delete definitions, delete the feature flag by clicking the gear icon adjacent to the flag name.

## FAQs

import DeleteFlag from "@site/docs/feature-management-experimentation/40-feature-management/docs/feature-flags/faqs/cannot-delete-feature-flag-from-ui-even-after-deleting-the-targeting-rules.md";

### Cannot delete feature flag from UI even after deleting the targeting rules

<DeleteFlag />