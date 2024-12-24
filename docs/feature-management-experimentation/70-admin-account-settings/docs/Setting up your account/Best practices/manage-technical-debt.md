---
title: Manage technical debt
sidebar_label: Manage technical debt
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006960391-Managing-technical-debt </button>
</p>

This article is taken from this blog post on [Managing Feature Flag Debt](https://www.split.io/blog/managing-feature-flag-debt-split/). Additional information on managing feature flags can be found in these articles about [retiring](https://www.split.io/blog/managing-feature-flags-scale-retire-flags/) and [categorizing](https://www.split.io/blog/categorize-your-feature-flags/) your feature flags.

Because of their versatility, feature flag usage often spreads throughout products and engineering teams. When every feature release is gated by a flag, over time the number of flags accumulates as older flags are left in the code and not retired (i.e. removed from code). Such old flags are generally referred to as flag debt. Flag debt leads to a number of problems, such as:

### 1. Code readability

Feature flags are implemented as if-else statements within the code. For instance:

```javascript
treatment = split.getTreatment(id,"some-feature-flag");
if (treatment.equals("treatment1")) { 
    // code for treatment1 
} else if (treatment.equals("treatment2")) { 
    // code for treatment2
} else {
   // failsafe code 
} 
```

With hundreds of such if-else statements strewn across the code, many that were added months or even years ago, the code gets less readable and testable, which slows down the engineering team’s development cadence.

### 2. Loss of institutional memory

If an engineer responsible for a flag leaves the company, she takes the institutional memory of the flag and its feature with her. As time passes, no one knows what the flag does, why was it created, or whether the flag could be retired. Without a clear owner, the flag becomes flag debt, staying in the code into perpetuity.

### 3. Accidental misconfiguration of flag

If an engineer accidentally turns off a flag from the flag debt group, customer experience will be disrupted in unpredictable ways. In the best case, customers will be cut off from a feature they rely on. In worst case, the else branch of the flag may not be valid anymore. It may make a service call that is no longer supported or write to the database with an unsupported schema. This may lead to exceptions, data corruption, or failure of the entire product – not just the particular feature.

## How to reduce flag debt

Clearly, flag debt hygiene is critical to the successful use of feature flags. In the post linked above by Pete Hodgson, he summarizes a number of strategies for maintaining a manageable number of flags in your code. The following is a summary of those recommendations, an explanation of how we see customers approaching these strategies, and an additional recommendation from Split.

### 1. Create a cleanup ticket when you create the flag

At a bare minimum, a common sense approach to managing flag debt is to create a cleanup ticket for the flag in your issue tracking system (e.g. Jira) at the same time when you introduce that flag in the code.

Assign the cleanup ticket to yourself or your product manager. Once a ticket is in the system, the retirement can be tracked and prioritized in a future sprint. This approach doesn’t solve the problem of engineering having the bandwidth to prioritize feature flag cleanup tickets, but it does at least start tracking the problem and giving teams a mechanism to manage flag debt.

Split helps with this process, by enabling you to [associate a Jira ticket](https://docs.split.io/docs/jira) with a feature flag. Split then updates the Jira ticket as a feature flag's status changes. That way, you know in Jira when it’s time to clean-up the code for that feature flag.

### 2. Set an expiration date for a flag

Another approach is to set an expiration date for a flag at the time of flag creation. An expiration date is simply our best guess of the time when the feature would be fully ramped and hence, the flag would be safe to retire.

The expiration date can be used by your feature flagging system to generate email reports, visual dashboards, or even blaring red signs to warn your team about expired flags that should be removed from code.

In addition, the expiration date of a feature is a valuable piece of documentation. It protects the organization from losing institutional memory if the feature owner leaves the company. By looking at this date, anyone on the team can tell whether the flag should be retired or not.

Some adventurous teams take this idea to its logical extreme by automatically turning off the flag when it is past its expiration date. In other words, feature flags meet chaos engineering. This keeps the engineers on their toes forcing them to retire old flags to avoid an incident in the middle of the night.

Split has a variety of these approaches on our product roadmap, and we are actively working with our customers on how the product should be designed to handle these use cases.

### 3. Limit the number of flags per team

The problem of flag debt is a tragedy of the commons. Individual engineers or teams can create limitless flags for their own benefit while ruining the collective experience of the entire organization. This is because the incremental benefit of creating a new flag far outweighs the incremental pain of a flag that needs to be retired.

This third strategy addresses the problem by localizing the pain of an un-retired flag to the team that created it. If we limit the number of flags a single team can create at any point in time, sooner or later the team is going to hit this limit. At that point, they will be forced to retire older flags – whether using expiration date or a cleanup ticket – before they could add the next flag.

Split has granular [permissions](https://docs.split.io/docs/permissions) that enable you to set owners for flags, both individuals and groups. And, [tagging in Split](https://docs.split.io/docs/tags) can be used to designate certain feature flags associated with specific teams in a searchable and less restrictive way. Easily see how many feature flags a current team has, and manage to a target goal by using Split.

### 4. Clean up flags based on activity

Finally, at Split, we have found that just knowing whether a feature flag is active is very helpful in identifying flag debt that is ready to be cleaned up.

Split customers are able to very quickly see which feature flags no longer have any traffic being routed to them. This is a clear sign that a feature rollout our experiment is complete, and is an easy way to audit which flags are ready to be retired. In addition, Split can easily show which feature flags have not been modified in over 30 days. For feature flags that are for the purpose of feature release or experimentation, this is a good signal that the release may be done or the experimentation complete. The combination of tagging feature flags based on type (long-term vs. short-term), plus these activity metrics, go a long way in identifying flag debt for cleanup.

##  Conclusion

Feature flags are an important technique in your continuous delivery toolbox. However, Pete mentioned how too many flags can also pose an issue, and this article is intended to provide additional details on the problems created by having too many flags. For best results, teams need to be thoughtful about how they manage the lifecycle of feature flags.