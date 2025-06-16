A metric measures [events](https://help.split.io/hc/en-us/articles/360020585772) that are sent to Harness FME. Metrics can be defined to count the occurrence of events, measure event values, or measure event properties.

Metric results are calculated for each treatment of a feature flag that shares the same traffic type as the metric and has a percentage targeting rule applied. Impact can be calculated between a selected comparison treatment and baseline treatment within a feature flag. Results are displayed on the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451) of the feature flag.

Refer to our [Guide to Product Metrics](https://help.split.io/hc/en-us/articles/360058405992-Metrics-Guide) to learn about many common metrics and how to create them in Split.

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

You can set an alert policy for a metric and Harness FME will notify you if a feature flag impacts the metric beyond a threshold you define. For more information, review the [Configuring metric alerting guide](https://help.split.io/hc/en-us/articles/19832312225293).

## Audit logs

Audit logs are captured every time the metric's definition or alert policy is changed. For more information, review the [Audit logs](https://help.split.io/hc/en-us/articles/360020579472-Audit-logs) guide.

## Metric list

When viewing the list of metrics, you can use the following filters and indicators to help you navigate to a selected metric.

* Owned by me: Filters metrics to those that you created or were added as an owner.
* Starred by me: Filters metrics to those that you starred.
* Sort: Sorts metrics by name alphabetically.
* Filter: Filters metrics by traffic type or tags.
* Bell icon: Indicates whether an alert policy exists (filled icon) or does not exist (unfilled icon).
