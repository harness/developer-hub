---
title: Running an A/A test
sidebar_label: Running an A/A test
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360031279312-Running-an-A-A-test </button>
</p>

## Why run an A/A test?

Everyone understands the value of A/B testing an application, where one compares the relative effects of one or more different treatments on the users’ behavior. But why would you want to run an A/A test, where you compare the behavior of two randomly selected groups of users that both get the same treatment?

The primary goal is to validate your experimental setup, where you do not see any statistically significant results. We expect for them to be inconclusive. If the results of an A/A test show consistent statistically significant differences between the behaviors of two groups of users exposed to the same treatment, then there is probably something wrong with your targeting or telemetry that should be addressed before trusting the results of any subsequent A/B tests.

A second benefit of A/A testing is to collect baselines for all your metrics of a particular traffic type. Since the A/A test will presumably apply to all users, averaging together the metric values for the two groups will give you metric baselines only for users where getTreatment is called. So let’s say you decide to call getTreatment on app load, the baselines will relate to users who have subsequently been randomly bucketed into a treatment, rather than simply on the page where a change has been made.

In addition to double checking the effectiveness and accuracy of your implementation, and tracking the number of conversions to establish a baseline, an A/A test can also assist in monitoring your on-page conversions, track data inputs for your sample size calculations (e.g. standard deviation), and help to prevent false positives in your results.

## Running an A/A test

### Prerequisites

* Your application incorporates the Split SDK.
* Event data is being sent to Split. Be sure to send any relevant [event values and properties](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) needed to properly define and calculate your metric.
* Desired metrics are created. This is not an absolute requirement, as metrics can be created at any time before or during an experiment and will be calculated using all appropriate, available events. But in most cases, you will at least want to have some set of metrics created.
* In your code, add a `getTreatment` call for where you will expect this A/A or future A/B test to run. This will generate an impression for the key, for the feature flag’s traffic type.
Running the test

**Step 1: Choose a traffic type**
Running an A/A test is simple. First, decide for which traffic type you wish to run the test. Best practice is to run an A/A test for every [traffic type](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) for which you are running experiments.

**Step 2: Create a new feature flag**
Create the feature flag with [targeting rules](https://help.split.io/hc/en-us/articles/360020791591-Targeting-customers) serving an equally distributed percentage-based rollout. For an A/A test, this would be 50/50.

The names of the treatments are inconsequential, so using the defaults of on and off is fine. You could also use an alternative like A1 and A2 to reinforce that the treatments for the A/A test should be identical.

**Step 3: Add getTreatment call for your feature flag**
Once the feature flag is created (named, for example, aa_test), you need only add a getTreatment call for that feature flag, passing the appropriate key for the feature flag's traffic type.

Reminder: An A/A test requires no changes made, and therefore no code is required within each treatment. See the following sample code where no changes have been made:

```
String treatment = split.getTreatment("aa_test");

if (treatment.equals("on")) {
// insert code here, or do nothing
} else if (treatment.equals("off")) {
// insert the same code you used above here
} else {
// insert control code here
}
```

The placement of the `getTreatment` call should always be on the page where the change has been made. This is important, because it ensures that you are randomly bucketing users into each treatment who have actually seen the change made. Otherwise, if you call getTreament on login or app launch for example, you run the risk of diluting your conversion rate data with a higher volume of users who have not necessarily seen the change.

If using one of the client-side SDKs, you can add the getTreatment call right after you initialize it for the user. Just adding the call is sufficient; there is no need to store the returned value, as the goal is to have the returned treatment have zero effect on the user’s experience. An impression will be generated and sent to Split, so the analytics software will know the treatment assigned to a user.

**Step 4: Determine run time for the test**
How long you choose to run your A/A test will depend on a few factors such as your traffic volumes and seasonality. While seasonality would not be expected to affect the results, one of the goals here is to identify unexpected outcomes, so a recommended best practice would be to run the test for at least a week before initially assessing the outcome.

**Step 5: Analyze the results**
Ideally, there is no difference between the on and off treatment groups and you would expect to see only minor effects between the treatments and no conclusions of statistical significance.

You should expect the following:
* Treatment samples: Sample size between treatments should generally match. If not, then check for a [sample ratio mismatch](https://help.split.io/hc/en-us/articles/360020636472-Sample-ratio-check).
* Metric results: Impact on your metrics should be inconclusive. There should be no difference since there really is no change between the two treatments.
  * You may see variance on each individual day - this is common as your data evens out.
  * It is possible to see statistical significance, while rare. Any particular p-value can go in any direction for a metric.
* If in doubt, as a next step, be sure to check the implementation, all the targeting rules, and experiment settings to minimize chance for false positives.

That’s it! You have now successfully run an A/A test and should feel confident proceeding to launch your features and experiments.

## Troubleshooting A/A test results

### Why do I see significance in my A/A test?

Split’s platform has sophisticated features in place to detect false positives and detect issues in setup or with the data. These features include [sample ratio mismatch checks](https://help.split.io/hc/en-us/articles/360020636472-Sample-ratio-check), [multiple comparison corrections](https://help.split.io/hc/en-us/articles/360037852431-Multiple-comparison-correction), and [Split’s approach to statistics](https://help.split.io/hc/en-us/articles/360042265892-Split-s-approach-to-statistics).

However, there is always a possibility that a statistically significant difference will be detected. This doesn't necessarily mean something went wrong and that your telemetry is suspect.

It’s not intuitively obvious, but the p-value calculated for any particular metric comparison for an A/A test is equally likely to be any value between zero and one. So for any given metric, there is a 5% chance of a p-value 0.05 or less (the default threshold for statistical significance in Split). Thus, if you are looking at 20 or more metrics, there’s a good chance that one of them will have such a p-value and be classified as statistically significant.

Below is a chart of p-values calculated for eight metrics at nine different times over the course of an A/A test:

![A/A Test P-values](https://help.split.io/hc/article_attachments/360061275992)

Remember that checking the p-value multiple times increases the chance of seeing a p-value within the range of statistical significance.

Note that over the life of the A/A test two different metrics show p-values less than or equal to 0.05. Overall, three of the 72 data points are at or below 0.05. This is within the realm of expectation, but if you saw three out of 20 metrics were statistically significant at the same observation point, you might want to investigate further. Were those three metrics based on the same event? If so, then this might not be unexpected.

With metrics using unique events, in an A/A test you would expect to see a random distribution of p-values at any given observation point. If you don’t, you’ll need to do some further analysis to see why bias is creeping into your results. For instance was there a [sample ratio mismatch](https://help.split.io/hc/en-us/articles/360020636472-Sample-ratio-check) that might have skewed results?

### Troubleshooting tips

If you are seeing unexpected A/A test results, we recommend the following:

Check the sample size for your experiment. Even though you are not looking to achieve statistical significance, it is still important to run the experiment on a sizable number of visitors to validate its accuracy.
Check run time. We recommend running an A/A test for at least 1 full week to account for potential seasonality in user behavior.

If you need more support investigating your A/A test results, you can [file a support ticket](https://help.split.io/hc/en-us/requests/new) and our Support team and advisors can assist further.

## Frequently asked questions

**Do I need to run an A/A test before every A/B test?**

No, you do not need to run an A/A test before or with every experiment. Typically, you will want to run your A/A test between setup and execution of your first experiments. If you wish to set up a global holdout or holdback group for experiments, you can use [Split dependencies](https://help.split.io/hc/en-us/articles/360020527652-Target-with-dependencies).

An A/A test only needs to be run once per metric and per traffic type. As mentioned above, it’s a good practice to have a separate A/A test for every traffic type being used for experimentation, since randomization, event reporting, and available metrics differ for each.

To make sure bias or telemetry issues don’t creep in somehow, you might want to re-run your A/A if you are experimenting with new metrics, events or your digital experience has significantly changed over time.

**What adjustments should I make if I am running experiments on specific populations?**

In this situation, you could run an A/A test with the same specific targeting rule prior to deploying your A/B test, just to ensure that randomization and telemetry are working properly for that particular population.
