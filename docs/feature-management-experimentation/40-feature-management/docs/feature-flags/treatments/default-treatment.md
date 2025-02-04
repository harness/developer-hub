---
title: Default treatment
sidebar_label: Default treatment
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 1
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020528192-Default-treatment <br /> ✘ images still hosted on help.split.io </button>
</p>
<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020527672-Set-the-default-treatment <br /> ✘ images still hosted on help.split.io </button>
</p>

The default treatment is returned by the SDK in the following scenarios:

* **The end user does not meet any defined conditions:** The default treatment is shown to end users who do not meet any of the conditions in the targeting rules.

* **The flag is killed:** If a particular feature flag is killed, the default treatment overrides the existing targeting rules and is returned for **all** customers.

Therefore, if a feature flag is killed or the customer is not exposed to any targeting rules, the flag serves a treatment selected by you. This is also known as the default treatment.

:::tip[Tip]
While you can set any of the treatments in your targeting rules as the default,
your default treatment should always be one that exposes fully tested and safe code.
* In an **on/off** feature flag, the default treatment is typically set to **'off'**.
* In a multivariant feature flag, the default might be **'off'**, or it might be defined as the treatment that is currently used by 100% of traffic.
* At the start of a percentage rollout, we recommend choosing the safest treatment for your customers as the default treatment (that is, **'off'** or **'old version'**).
* At the end of a percentage rollout (at 100% rolled out), you may want to make the new experience the default in case the feature is accidentally killed before being removed.

To set this treatment, refer to the [Target customers](https://help.split.io/hc/en-us/articles/360020791591-Target-customers) guide.
:::
