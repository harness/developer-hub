---
title: How do I maintain the state of a user's treatment, even if the rollout plan changes?
sidebar_label: How do I maintain the state of a user's treatment, even if the rollout plan changes?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360035011591-How-do-I-maintain-the-state-of-a-user-s-treatment-even-if-the-rollout-plan-changes <br /> ✘ images still hosted on help.split.io </button>
</p>

How do I ensure that once a user (or any traffic key) is given a treatment, they always receive the same treatment, irrespective of any changes to the rollout plan?

The goal is to maintain state so that a user is always exposed to the same thing they saw the first time they visited, even if a change to the rollout plan would otherwise flip the user to another treatment. A sample use case is an offering, such as a loan application or promotional discount, that needs to remain consistent.

## Split's targeting engine

Split is designed to be imperceptibly fast in computing treatments. In Java, for instance, treatments are computed on the order of a few hundred microseconds. This design principle means Split can be used in the most performance-intensive components of your application.

To achieve this speed, Split is designed to not retain state. Specifically, after Split serves a treatment to a user, it does not “remember” what was served. Given the scale of our customer use cases, retaining the combination of customer/key/flag/treatment will negatively impact the requirement for speed in our SDKs.

Split ensures that we give end-users a “sticky” experience and don’t change treatments because the SDK uses a deterministic hashing algorithm. You can understand the details [here](https://help.split.io/hc/en-us/articles/360030024391). As long as a feature flag’s targeting definition does not change, the user gets the exact same treatment every single time.

Of course, if you make changes to the feature flag targeting definition, some users may be given a different treatment by moving from one treatment to another. This could happen if they fall under a different rule or if the percentages in a rule are changed. That is the intent for an overwhelming number of use cases but is not ideal in some scenarios.

## The solution

There are two ways to 'maintain state': In both cases we use attributes. In the first, the attribute used is the creation date. In the second, the developer maintains the state and passes it as an attribute. The former relies on a date and does not require you to store state, while the latter requires logging the state of the treatment and passing it as the attribute.

**Note: that in both cases using the “kill” switch will void both options.**

For purposes of this article, we'll use a loan application as an example. 

### Solution 1: Use the creation date

Create targeting rules and pass a date as an attribute that represents the date the application was first rendered and passed at runtime to split your traffic.

When you change your targeting rules use date matchers with the date attribute so all applications rendered after that date receive the new allocation.

Using this methodology you can avoid storing the application state and instead store and pass the date the application was originated. In the below example, the application_creation_date is an attribute that you can pass when calling getTreatment with the application ID to tell Split the date the application is being generated.

Let's say we start the new program on November 1st. On day 1 we want v1_application=90% and v2_application=10%. You can set up the targeting rule as

1[how_do_I_maintain_the_state_of_a_users_treatment_one.png](https://help.split.io/hc/article_attachments/30833421020173)

On the 5th we want to split the traffic so that v1_application=80% and v2_application=20%. You can update your targeting rules as

![how_do_I_maintain_the_state_of_a_users_treatment_two.png](https://help.split.io/hc/article_attachments/30833432085389)

In this scenario, the create date for an application will not change and it will continue to meet the first targeting rule. Only new applications will fall into the second targeting rule.

Finally, on day 14, we've learned that v2 is performing as expected so we set the ratios to v1_application=0% and v2_application=100%.

![how_do_I_maintain_the_state_of_a_users_treatment_three.png](https://help.split.io/hc/article_attachments/30833421026445)

As noted above, the creation date does not change and existing applications will meet the first or second targeting rules.  Only new applications will fall into the third targeting rule.

The downside to this approach is that it works if there are a limited number of targeting definition changes.  It would be tedious to remember to change the date matchers with each rollout change and is error-prone given the manual nature.

This example will work with Split’s experimentation capabilities, showing the statistical significance for each targeting criterion above.

### Solution 2: Storing which treatment was assigned to an application

With this solution, the developer must maintain state somewhere. While, by design, Split can’t keep state using the SDKs, you can retain the application_id/flag/treatment combination by storing this data in, for example, a cookie or database. You could also store the data in a Split segment using the Admin API, assuming the number of unique users is not too large.

If you can store this state somewhere in a cookie or database you can configure the feature flag once and not worry about changing date matchers with each change.

![how_do_I_maintain_the_state_of_a_users_treatment_four.png](https://help.split.io/hc/article_attachments/30833421028877)

In this example, application_seen is the attribute to pass when calling getTreatment to tell Split if an applicant was already given a treatment. The value can be null or empty for first time applications without causing errors. Here’s how you’d make the call in Java:

```java
Map<String, Object> attributes = new HashMap<String, Object>();
attributes.put("application_seen", "v1_application"); // fetch from db
String treatment = client.getTreatment("USER_ID", "SPLIT_NAME", attributes);
```

Using this approach, any changes you make to the default rule will not affect users that had already been assigned a treatment.

If the number of applicants you see for the duration of a feature flag is small enough (10k or less), you can create a segment within Split. See the [segment API documentation](https://docs.split.io/reference#segment-1). This will obviate the need to retain state in a cookie or database.

In this case, create a segment per flag/treatment combination. Based on the treatment assigned you would store the ID in the appropriate segment.  Then you could set up your feature flag using individual targets. 

![how_do_I_maintain_the_state_of_a_users_treatment_five.png](https://help.split.io/hc/article_attachments/30833432095885)

or you use the segment in a rule if more flexibility is needed

![how_do_I_maintain_the_state_of_a_users_treatment_six.png](https://help.split.io/hc/article_attachments/30833432096397)

This involves a bit of work. Using the cookie or database solution is preferred over using segments.

Solution #2 doesn't fully leverage Split’s experimentation capabilities and is preferable for basic rollouts. You can measure changes across rules, but not see the statistical significance for each targeting rule since each targeting rule is serving a single treatment.