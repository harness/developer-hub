---
title: Mutually exclusive experiments
sidebar_position: 60
---

## Using dependencies to run mutually exclusive experiments

Mutually exclusive experiments are experiments that share no user traffic. The goal of mutually excluding experiments is to ensure that a single user cannot participate in more than one experiment at the same time. Mutually exclusive experiments run simultaneously but in isolation from each other.

Generally speaking, when you run experiments with feature flags, you are testing feature variations (FME feature flag treatments) against a baseline. The baseline is your set of metric results for your base case (when a new feature is off). You typically compare the results of each feature variation (treatment)  against your base case metrics (baseline) to see how the treatment performs. 

While, in most cases, experiments can run concurrently and share user traffic without interfering with one another, you may choose to run some of your experiments in mutual exclusion. This may be because you anticipate interactions between variations (treatments) of different experiments, or because a variation (treatment) of one experiment would disrupt a consistent baseline for another experiment. Mutually excluding the experiments keeps your baseline and feature experiences consistent (free of the variations of another experiment), which may in some cases lead to more accurate results.

Compared with experiments that share user traffic, mutually excluding experiments has the following advantage and disadvantage:

Pro:

* Zero possibility of mutually exclusive experiments interfering with one another.

Con:

* More time is required to reach sufficient traffic volumes for mutually exclusive experiments to produce reliable statistical results.

Harness FME experimentation advisors are prepared to assist our customers in setting effective concurrent and progressive experimentation strategies. [Contact us](mailto:support@split.io) to discuss your options and create an effective experimentation plan.

## Creating mutually exclusive experiments 

In this guide, we will divide our user traffic to create  mutually exclusive experiments. A parent feature flag divides the user traffic. The experiments are controlled and measured using dependent feature flags.

## Setting up the parent feature flag 

We create a parent feature flag named `pdp_test_parent` with four treatments, one for each of the experiments, as well as a *not-in-experiments* treatment. In this example, we use a percentage-based targeting rule to divide traffic, but you could also use attribute-based targeting rules.

To create the parent feature flag:

1. In the Harness FME UI, on the left navigation panel click **Feature flags**.
1. Click the Create feature flag button.
1. Enter a name for the flag, such as pdp_test_parent. 
1. Select a traffic type and owners for the flag, and click Create.
1. Select an FME Environment and click the Initiate Environment button. 
1. In the Treatments section, create four treatments: 
   
   - `pdp-test-a`
   - `pdp-test-b`
   - `pdp-test-c`
   - `not-in-experiments`

1. Set the default treatment to be *not-in-experiments*.
   
   <img src="https://help.split.io/hc/article_attachments/25919683357453" alt="default_treatment.png" width="900" /> 

1. In the Targeting section, in Targeting rules, select **Distribute treatments as follows**. Allocate the following user traffic percentages:
    
   - `pdp-test-a` - 33%
   - `pdp-test-b` - 33%
   - `pdp-test-c` - 34%
   - `not-in-experiments` - 0%

   <img src="https://help.split.io/hc/article_attachments/25920092761613" alt="distribute_treatments_as_follows.png" width="900" /> 

1. Set the **Alert baseline treatment** to be *not-in-experiments*.
1. You may want to restrict who can edit this feature flag’s targeting rules in the selected Environment. To do this click the **Editing** button on the Details tab, select **Restrict who can edit**, add or remove an editor, and click **Apply**.

:::note
If the `pdp_test_parent` feature flag is killed, then the default *not-in-experiments* treatment will be assigned to all user traffic. (No user traffic will reach the dependent flags.)
:::

**When you are evaluating feature flags in your source code**, you should not have any code toggling on the parent feature flag evaluation (i.e. your code should not call `getTreatment` for *pdp_test_parent* nor conditionally execute code based on this flag’s treatment results). The parent feature flag exists solely for use in the targeting rules of the dependent feature flags.

## Setting up dependent flags 

After the parent feature flag is created to divide user traffic, we can create dependent (child) feature flags to receive user traffic. The user traffic of each dependent feature flag will not be shared with another dependent feature flag. This means that dependent feature flags are mutually exclusive.

To create a dependent (child) feature flag:

1. In the Harness FME UI, on the left navigation panel click **Feature flags**.
1. Click the **Create feature flag** button.
1. Enter a name for the flag, such as `pdp-test-a`.
1. Select the ***same traffic type*** as you did for the *php-test-parent* flag, select owners, and click **Create**. 
1. Select the ***same Environment*** as you did for the *php-test-parent* flag and click the **Initiate Environment** button. 
1. In the Treatments section, create two treatments: 
   
   - `on`
   - `off`

1. Set the default treatment to be *off*.
1. In the Targeting section, in Targeting rules, click the **Add attribute based targeting rules** button. 
1. Select `is in flag` in the matcher dropdown, select *pdp_test_parent* from the attributes dropdown, and select *pdp-test-a* from the values dropdown.
1. Select **Distribute treatments as follows** and allocate user traffic percentages to this dependent flag’s treatments. For fastest experimental results, you can set on to 50% and off to 50% (or you may enter a smaller percentage for on, to begin a gradual rollout of the *php-test-a* feature).

   <img src="https://help.split.io/hc/article_attachments/15834380465933" alt="distribute_treatments_as_follows_for_dependent_flag.png" width="900" />

1. Set the **Alert baseline treatment** to be *off*.
1. Repeat steps 1-11 to create two more dependent feature flags: `pdp-test-b` and `pdp-test-c`.

In your source code, you should directly evaluate these dependent feature flags. Your source code should be agnostic to the parent feature flag (that has the sole purpose of dividing traffic among the dependent flags). For a React code example, see this [blog](https://www.split.io/blog/a-step-by-step-guide-to-running-mutually-exclusive-experiments-in-react/).

For more information about dependent feature flags, see the [Target with dependencies](https://help.split.io/hc/en-us/articles/360020527652-Target-with-dependencies) help page.

## Viewing mutually exclusive experiment results

Once your experiments have been running for a sufficient duration, you can view the results of each mutually exclusive experiment on the [Metrics impact](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab) tab of each dependent (child) feature flag. The metric results you see when comparing any two treatments of a child flag are generated by user populations that are mutually exclusive. You can be sure that the experimental results are free of the influence of the other experiments because no user was exposed to more than one treatment of any of the mutually exclusive experiments.

## Considerations and limitations

Mutually exclusive experiments carry some inherent limitations. You should be aware of the following limitations and considerations when using a parent feature flag to create mutually exclusive experiments by dividing traffic among child flags.

### Ending an experiment and reallocating users

The Harness FME feature flag (parent flag) that divides traffic between mutually exclusive experiments uses a random and deterministic hashing algorithm to allocate traffic. Suppose you want to end one of the concurrent mutually exclusive experiments and reallocate the users to the other experiments (and you are sure this will not invalidate your results). To learn how your traffic would be reallocated, see [How does Harness FME ensure a consistent user experience?](/docs/feature-management-experimentation/feature-management/faqs/ensure-a-consistent-user-experience) You may also consider using [dynamic configuration](/docs/feature-management-experimentation/feature-management/dynamic-configurations/) in your flag definitions if you anticipate ending a mutually exclusive experiment early.

:::note 
We generally do not recommend re-using the divisions created by the parent feature flag for new experiments, because you would be experimenting with the subset of your user population that was exposed to an earlier experiment. This subset may not be representative of your entire user population.
:::

### Scaling limitations for multiple mutual experiments

When you opt to make some of your experiments mutually exclusive, you channel a large portion of user traffic away from each of these experiments. As a result of decreased user traffic, you lose statistical power. To compensate, you may need to extend the duration of your experiments to reach statistical significance and/or reach your target level of confidence. Since mutually exclusive experiments scale poorly, we recommend you use mutually exclusive experiments only when you clearly have interference between experiments.