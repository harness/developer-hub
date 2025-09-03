A metric measures [events](https://help.split.io/hc/en-us/articles/360020585772) that are sent to Harness FME. Metrics can be defined to count the occurrence of events, measure event values, or measure event properties.

Metric results are calculated for each treatment of a feature flag that shares the same traffic type as the metric and has a percentage targeting rule applied. Impact can be calculated between a selected comparison treatment and baseline treatment within a feature flag. Results are displayed on the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451) of the feature flag.

### Common metrics

This section outlines common metrics and how to create them in Harness FME, empowering you to effectively measure impact and run experiments. You'll find a breakdown of various metrics, including conversions, page views, and more. 

| Metric Guide | Description |
|---|---|
| [Conversions](https://www.harness.io/harness-devops-academy/conversions) | Map, measure, and improve the conversion rate of key user workflows. |
| [Errors](https://www.harness.io/harness-devops-academy/errors) | Measuring errors alongside feature flags leads to faster issue identification, response, and resolution. |
| [Inputs](https://www.harness.io/harness-devops-academy/inputs) | Track user-entered fields and forms such as radio buttons, checkboxes, sliders, and dropdowns. |
| [Interactions](https://www.harness.io/harness-devops-academy/interactions) | Measure clicks, hover states, scroll depth, and other user interactions. |
| [Page Load Performance](https://www.harness.io/harness-devops-academy/page-load-performance) | Use on-page events such as page load timing and load failures to understand performance. |
| [Page Views](https://www.harness.io/harness-devops-academy/page-views) | Use page view counts and rates in conjunction with other metrics to construct ratios and funnels. |
| [Rage Clicks](https://www.harness.io/harness-devops-academy/rage-clicks) | Identify areas of user frustration by measuring rapidly repeated clicks on an element or area of the screen. |
| [Satisfaction](https://www.harness.io/harness-devops-academy/satisfaction) | Use feedback response rates, occurrence rates, and scores to understand user happiness. |
| [Sessions](https://www.harness.io/harness-devops-academy/sessions) | Construct engagement metrics such as session start and end, entry and exit rates, and session length. |
| [Shopping Cart](https://www.harness.io/harness-devops-academy/shopping-cart) | Track changes to a shopping cart to measure cart size, value, completion, and abandonment metrics. |

These metrics are designed to help you build impactful products and drive business growth.

## Metric types

Harness FME supports the following custom metric types. Metrics are calculated per traffic type key (e.g. per user). This means that each individual key's contribution is calculated and adds a single data point to the distribution of the metric result, so each key has equal weighting in the result.

In the table below, we assume the traffic type selected for the metric is `user`.

| **Function** | **Description** | **Example** |
| --- | --- | --- |
| **Count of events per user** | Counts the number of times the event is triggered by your users. Shows the average count.<br />_As users revisit your app, they will increase this value, while new users will bring the average down._ | The average number of times your users visit a webpage.<br />The average number of support tickets your users create. |
| **Sum of event values per user** | Adds up the values of the event for your users. Shows the average summed value.<br />_As users revisit your app, they will increase this value, while new users will bring the average down._ | How much your users spend on average on your website (over the duration of the experiment).<br />The total time your users on average played media on your website. |
| **Average of event values per user** | Averages the value of the event for your users.<br />_Revisiting users will increase the confidence of the result. This calculated result is not expected to change significantly during the experiment (unless experimental factors change)._ | The average purchase value when your users check out.<br />The average page load time your users experience. |
| **Ratio of two events per user** | Compares the frequency of two events for your users. Shows the average ratio.<br />_Revisiting users will increase the confidence of the result. This calculated result is not expected to change significantly during the experiment (unless experimental factors change)._ | The average number of hotel searches before a hotel booking.<br />The number of invitations accepted compared with the number of invitations received by your users (on average).<br />The ratio of app sessions with errors compared to app sessions without errors. |
| **Percent of unique users** | Calculates the percentage of users that triggered the event.<br />_As the experiment continues, revisiting users may increase the percentage, while data from new users may increase the confidence of the result._ | The percentage of website visitors that completed a purchase.<br />The percentage of users that experienced an error. |

## Metric categories

For more information about metric categories, see [Metric categorization](./categories/).

## Configure an alert policy

You can set an alert policy for a metric and Harness FME will notify you if a feature flag impacts the metric beyond a threshold you define. For more information, review the [Configuring metric alerting guide](/docs/feature-management-experimentation/release-monitoring/metrics/setup/metric-alert-policy/).

## Audit logs

Audit logs are captured every time the metric's definition or alert policy is changed. For more information, review the [Audit logs](https://help.split.io/hc/en-us/articles/360020579472-Audit-logs) guide.

## Metric list

When viewing the list of metrics, you can use the following filters and indicators to help you navigate to a selected metric.

* Owned by me: Filters metrics to those that you created or were added as an owner.
* Starred by me: Filters metrics to those that you starred.
* Sort: Sorts metrics by name alphabetically.
* Filter: Filters metrics by traffic type or tags.
* Bell icon: Indicates whether an alert policy exists (filled icon) or does not exist (unfilled icon).
