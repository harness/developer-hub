---
title: Control treatment
sidebar_label: Control treatment
description: ""
sidebar_position: 13
redirect_from:
  - /docs/feature-management-experimentation/feature-management/setup/control-treatment
---

The **control** treatment is a reserved treatment in FME. You cannot create a treatment named **control**. The **control** treatment is returned by the SDK in the following scenarios:

* **The targeting rules for a feature flag are not defined.** If you place your code behind a feature flag and push your code to production without defining the targeting rules for that feature flag in the user interface, the SDK does not have any information on the rules or even the possible treatments of this feature flag. In this scenario, the SDK returns the **control** treatment.

* **The SDK does not have the feature cached.** If a feature flag's definition is not already cached and a treatment is evaluated for that feature flag, then the SDK returns *control*. The reasons this could happen are:

    * The SDK hasn't finished downloading the initial set of feature flag and segment definitions when `getTreatment` is called. This happens when calling `getTreatment` before SDK_READY event fires after initializing the SDK.

    * A running SDK is asked to evaluate a newly defined feature flag, but the definition has not been cached. 


* **The SDK encounters an exception.** SDKs are designed to never throw exceptions or errors. If the SDK encounters an exception, it returns the **control** treatment. 

* **The SDK evaluated an unsupported targeting rule.** FME SDKs are distributed as versioned packages to be consumed by applications. As new targeting rules are added to feature flags in Harness FME, the FME SDKs are also updated to support the new targeting rules. If an SDK encounters a new targeting rule that it cannot evaluate, it returns the **control** treatment for that feature flag evaluation. In this case, a special FME feature flag evaluation impression is generated with a targeting rule label of "targeting rule type unsupported by sdk". This impression is sent to Harness cloud and can be seen in Live tail in Data hub.

SemVer (Semantic Version) targeting rules are supported by FME SDKs and customer-deployed components. See [Target with custom attributes](/docs/feature-management-experimentation/feature-management/targeting/target-with-custom-attributes#supported-sdks-and-customer-deployed-components-for-semver-matcher) to verify the minimum FME SDK and customer-deployed component versions for SemVer support.

:::tip[Tip]
When evaluating which treatment to show to a customer, Harness recommends handling the *control* treatment in the same way as the default treatment.
:::
