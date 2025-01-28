---
title: Kill switch
sidebar_label: Kill switch
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020794271-Use-the-kill-switch <br /> ✘ images still hosted on help.split.io </button>
</p>

If a feature flag negatively impacts performance or your user’s experience, you can kill it without changing targeting rules or performing a redeployment. When you kill a feature, all traffic is sent to the default treatment selected for that feature flag.

To kill a feature, do the following:

1. Click **Kill** on the feature flag page. The Kill feature flag warning page opens.
2. Type KILL in the warning page field.
3. Optionally add a title, comment, or approver.
4. Click the **Kill** button.

# Restoring a killed feature

Once you kill a feature, the **Restore** button appears. The Restore function reverses your Kill decision and turns back on the exact targeting rules that were in place prior to the kill.

To restore a killed feature, do the following:

1. Click **Restore** on the feature flag page.
2. Optionally add a title, comment, or approver.
3. Optionally change the status.
4. Click the **Restore** button. The feature is restored.

If you want to make changes to the targeting rules before taking them live again, don't use the Restore function. Instead, make those changes and then click **Review changes**. Once your changes are saved, the Restore button disappears. 
