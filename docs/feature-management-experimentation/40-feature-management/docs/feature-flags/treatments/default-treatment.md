---
title: Default treatment
sidebar_label: Default treatment
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020528192-Default-treatment <br /> ✘ images still hosted on help.split.io </button>
</p>

The default treatment is always one of the treatments defined for any feature flag in the targeting rules. The default treatment is returned by the SDK in these two scenarios.

* **Does not meet any defined conditions:** The default treatment is shown to customers who do not meet any of the conditions in the targeting rules.

* **The flag is killed:** If a particular feature flag is killed, the default treatment overrides the existing targeting rules and is returned for **all** customers.

:::tip[Tip]
You can set any of the treatments in your targeting rules as the default. We recommend choosing the safest treatment for your customers as the default treatment (that is, *off*, *old version*) when beginning the rollout. However, when you complete the rollout, you may want to make the new experience the default in the case that feature is accidentally killed before being removed.
:::
