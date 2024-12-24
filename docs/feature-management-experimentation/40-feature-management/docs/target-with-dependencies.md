---
title: Target with dependencies
sidebar_label: Target with dependencies
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020527652-Target-with-dependencies <br /> ✘ images still hosted on help.split.io </button>
</p>

Use Split's dependency matcher when you want one feature flag to depend on the evaluation of another flag.

Let's say we have two feature flags with the second depending on the evaluation of the first. In this example, we would like 20% of customers who receive the on treatment for the *new_test* feature flag to evaluate to on for the *advance_new_feed* feature flag while the other 80% should evaluate to *off*.

  <p>
  <img src="https://help.split.io/hc/article_attachments/30744262565133" alt="target_with_dependencies.png" width="537" />
</p>

Split's dependency matcher is located in the condition string to meet your most granular targeting needs.

As you begin to utilize the dependency matcher, you see the following:

* **Environments and traffic types.** The dependency matcher does not allow you to depend on another environment's condition or target across traffic types.
* **Circular dependencies.** Split prevents you from creating a direct circular dependency by not displaying those feature flags that would create a circular dependency.
* **Attributes.** If flag B has flag A as a dependency, then the getTreatment call for flag B must pass all the customer attributes needed to evaluate flag A. Flag B's syntax modal displays all the attributes needed to make the evaluation successful.
* **Deleting.** You cannot remove a feature flag from an environment or delete a flag if additional flags depend on that feature flag for their evaluation.

See below for some common questions:

**Does the dependency matcher count as 2+ evaluations?** No, the evaluation is counted as one single evaluation and does not fire off multiple calls or register multiple impressions.

**There is a warning in the user interface when I use a dependency matcher. What does this mean?** The warning you are seeing is to warn you that if the dependent feature flag requires some additional attributes, you need to update the getTreatment() call to include those attribute values. The syntax modal displays all the attributes needed to make the evaluation successful.

**Do parent feature flags know which child flags are using it in their evaluation?** Yes, if a feature flag is being used as a dependent, Split's user interface informs you in the editor. You can’t delete the feature flag, and delete or rename treatments.
