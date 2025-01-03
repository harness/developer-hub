---
title: Control treatment
sidebar_label: Control treatment
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020528072-Control-treatment <br /> ✘ images still hosted on help.split.io </button>
</p>

The **control** treatment is a reserved treatment in Split. You cannot create a treatment named **control**. The **control** treatment is returned by the SDK in the following scenarios:

* **The targeting rules for a feature flag are not defined.** If you place your code behind a feature flag and push your code to production without defining the targeting rules for that feature flag in the user interface, the SDK does not have any information on the rules or even the possible treatments of this feature flag. In this scenario, the SDK returns the **control** treatment.

* **The SDK does not have the feature cached.** If a feature flag's definition is not already cached and a treatment is evaluated for that feature flag, then the SDK returns *control*. The reasons this could happen are:

    * The SDK hasn't finished downloading the initial set of feature flag and segment definitions when `getTreatment` is called. This happens when calling `getTreatment` before SDK_READY event fires after initializing the SDK.

    * A running SDK is asked to evaluate a newly defined feature flag, but the definition has not been cached. 


* **The SDK encounters an exception.** SDKs are designed to never throw exceptions or errors. If the SDK encounters an exception, it returns the **control** treatment. 

* **The SDK evaluated an unsupported targeting rule.** Split SDKs are distributed as versioned packages to be consumed by applications. As new targeting rules are added to Split UI, the Split SDKs are also updated to support the new targeting rules. If an SDK encounters a new targeting rule that it cannot evaluate, it returns the **control** treatment for that feature flag evaluation. In this case, a special Split feature flag evaluation impression is generated with a targeting rule label of "targeting rule type unsupported by sdk". This impression is sent to Split cloud and can be seen in Live tail in Data hub.

:::info[SDK upgrade may be needed for SemVer rules support]
SemVer (Semantic Version) targeting rules are supported by Split SDKs rolled out in May 2024 or later. Refer to this [FAQ doc](https://help.split.io/hc/en-us/articles/27337626547341-Does-my-SDK-version-support-SemVer) to see minimum Split SDK versions for SemVer support.
:::

:::tip[Tip]
When evaluating which treatment to show to a customer, we recommend handling the *control* treatment in the same way as the default treatment.
:::
