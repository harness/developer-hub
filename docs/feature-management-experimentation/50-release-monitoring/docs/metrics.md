---
title: Metrics
sidebar_label: Metrics
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/22005565241101-Metrics <br /> ✘ images still hosted on help.split.io </button>
</p>

A metric measures [events](https://help.split.io/hc/en-us/articles/360020585772) that are sent to Split. Metrics can be defined to count the occurrence of events, measure event values, or measure event properties.

Metric results are calculated for each treatment of a feature flag that shares the same traffic type as the metric and has a percentage targeting rule applied. Impact can be calculated between a selected comparison treatment and baseline treatment within a feature flag. Results are displayed on the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451) of the feature flag.

Refer to our [Guide to Product Metrics](https://www.split.io/guide-to-product-metrics/) to learn about many common metrics and how to create them in Split.

## Create a metric

To create a metric, do the following:

1. From the left navigation panel, click **Metrics**. Then, click the **Create metric** button. The Create a metric panel appears:

<p>
  <img src="https://help.split.io/hc/article_attachments/30833092104845" alt="metrics_create_a_metric.png" />
</p>

2. Provide the following details about the metric:

    * Name: Enter a descriptive metric name up to 50 characters and without spaces.
    * Owners: Select any number of Split users to be the metric owners. Owners can click **Metrics** in the left navigation panel and then view the metric in the Metrics menu’s browse pane when clicking **Owned by me**.
    * Tags: Optionally add one or more [tags](https://help.split.io/hc/en-us/articles/360020839151) to help you categorize the metric.
    * Description: Optionally describe what the metric measures and its purpose.
    * Metric category: Choose to set the metric as one of your account's _Guardrail metrics_ or leave the category as _None_. _Guardrail metrics_ adhere to account-wide alerting settings. See the [Metric categories](https://help.split.io/hc/en-us/articles/22005565241101-Metrics#metric-categories) section (below) for more information.

3. Define how the metric should be calculated:

    * Select desired impact: Select increase if an increase in this metric measurement is good for your business or customer experience. If not, select decrease.
    * Select traffic type: Choose the traffic type of the event you would like to measure. This is the traffic type specified when sending the event to Split. It is also the traffic type defined for the feature flags that will show the results of the metric on the Metrics impact tab. To learn more, see the [traffic type](https://help.split.io/hc/en-us/articles/360019916311) guide.
    * Measure as: Select the type of calculation to be performed on the event, event value, or event property. Learn more about metric types and their applications in the [Metric types](https://help.split.io/hc/en-us/articles/22005565241101-Metrics#metric-types) section.

    <img src="https://help.split.io/hc/article_attachments/30833087396877" alt="metrics_measure_as.png" />

    * Event: Select an event type to use in the metric calculation. To select more than one event to be used in the metric, click the **Add event** button.
        * Click **Add new filter** to optionally apply a filter to the selected event using properties. For example, if you wanted to create a metric to count page views from California, you might select an event called `page.view` with a property filter of `state` matches `California`. [RE2 syntax](https://github.com/google/re2/wiki/Syntax) for regular expressions can be used in your filter.
    * Value: For a sum or average metric, you can select the event value or a property value to be used for the calculation.
  
4.  In the Advanced section of a metric definition, optionally apply the following settings:
    * Filter by:
        * No filter criteria: No filters are applied.
        * Has done the following event prior to the metric event: This filter counts customers who have triggered an event at least once during the version of a feature flag, as long as it happened within the same feature flag version and before the metric event. For example, if you want to measure the count of add to cart events that happened after viewing the special offers page, select Added to cart for the metric event and Viewed special offers page for the filter by event.
        * Has done the following event (not ordered): This filter counts customers who have triggered an event at least once during the version of a feature flag. As long as a customer triggered an event within the same feature flag version, the filter is applied even if it happened after the metric event. For example, if you want to measure the count of add to cart events that happened either before or after a user subscribed to the newsletter, select Added to cart for the metric event and Subscribed to newsletter for the filter by event.
        * Properties: You can optionally apply a property filter to the Has done event you're filtering your metric by.
    * Cap at: Apply a cap to your metric value to reduce the impact of outliers. Capping replaces any outlier values in your metrics by replaces them with a fixed threshold value. This reduces the variance and increases the sensitivity of your metric. Note: When a metric cap is set to a per user per day, this is 24 hours from a user’s first impression within a particular version of a feature flag.

5. Click **Create** to create your metric.

### Metric types

Split supports the following custom metric types. Metrics are calculated per traffic type key (e.g. per user). This means that each individual key's contribution is calculated and adds a single data point to the distribution of the metric result, so each key has equal weighting in the result.

In the table below, we assume the traffic type selected for the metric is "user".

| **Function** | **Description** | **Example** |
| --- | --- | --- |
| **Count of events per user** | Counts the number of times the event is triggered by your users. Shows the average count.<br /><br />_As users revisit your app, they will increase this value, while new users will bring the average down._ | The average number of times your users visit a webpage.<br /><br />The average number of support tickets your users create. |
| **Sum of event values per user** | Adds up the values of the event for your users. Shows the average summed value.<br /><br />_As users revisit your app, they will increase this value, while new users will bring the average down._ | How much your users spend on average on your website (over the duration of the experiment).<br /><br />The total time your users on average played media on your website. |
| **Average of event values per user** | Averages the value of the event for your users.<br /><br />_Revisiting users will increase the confidence of the result. This calculated result is not expected to change significantly during the experiment (unless experimental factors change)._ | The average purchase value when your users check out.<br /><br />The average page load time your users experience. |
| **Ratio of two events per user** | Compares the frequency of two events for your users. Shows the average ratio.<br /><br />_Revisiting users will increase the confidence of the result. This calculated result is not expected to change significantly during the experiment (unless experimental factors change)._ | The average number of hotel searches before a hotel booking.<br /><br />The number of invitations accepted compared with the number of invitations received by your users (on average).<br /><br />The ratio of app sessions with errors compared to app sessions without errors. |
| **Percent of unique users** | Calculates the percentage of users that triggered the event.<br /><br />_As the experiment continues, revisiting users may increase the percentage, while data from new users may increase the confidence of the result._ | The percentage of website visitors that completed a purchase.<br /><br />The percentage of users that experienced an error. |

### Metric categories

Metrics are be assigned to one of the following categories:

* **None:** By default, metrics are not assigned to a category. You can add an uncategorized metric to the Supporting metrics on a feature flag's [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab), for any feature flag that shares the metric's traffic type. (You can also add a Supporting metric to a feature flag's Key metrics.)

* **Guardrail metrics:** Select this category for the business, performance, or user experience metrics that your organization cares most about and wants to ensure are protected during every feature release and experiment. Guardrail metrics adhere to account-wide alerting settings: For a percentage release (controlled using a feature flag targeting rule that distributes treatments by percentage) an alert will be fired when a statistically significant impact is detected. Guardrail metrics appear on the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab) of all feature flags that share the metric's traffic type. (You can also add a Guardrail metric to a feature flag's Key metrics.)

___Tip:___ For any metric, custom alerting can be set up on the metric's [Alert policy tab](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting). Alerting can also be activated at the feature flag level on a feature flag's Metrics impact tab by adding a metric as a Key metric. Go to [Configuring feature flag alerting](https://help.split.io/hc/en-us/articles/19832711328397-Configuring-feature-flag-alerting) to learn more.

## Configure an alert policy

You can set an alert policy for a metric and Split will notify you if a feature flag impacts the metric beyond a threshold you define. For more information, review the [Configuring metric alerting guide](https://help.split.io/hc/en-us/articles/19832312225293).

## Audit logs

Audit logs are captured every time the metric's definition or alert policy is changed. For more information, review the [Audit logs](https://help.split.io/hc/en-us/articles/360020579472-Audit-logs) guide.

## Metric list

When viewing the list of metrics, you can use the following filters and indicators to help you navigate to a selected metric.

* Owned by me: Filters metrics to those that you created or were added as an owner.
* Starred by me: Filters metrics to those that you starred.
* Sort: Sorts metrics by name alphabetically.
* Filter: Filters metrics by traffic type or tags.
* Bell icon: Indicates whether an alert policy exists (filled icon) or does not exist (unfilled icon).
