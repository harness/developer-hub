---
title: Setting up and using metrics
sidebar_label: Metric definition
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 1
---

import MetricsInfo from "@site/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/metrics.md";

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/22005565241101-Metrics <br /> ✘ images still hosted on help.split.io </button>
</p>

<MetricsInfo />

:::info[How metrics are created]

Metrics can be created in Split when you have two types of data: impressions and events. 

* **[Impressions](https://help.split.io/hc/en-us/articles/360020585192-Impressions)** occur when a visitor is assigned a treatment (i.e., variations) for a feature flag.
* **[Events](https://help.split.io/hc/en-us/articles/360020585772-Events)** track information and actions a user takes while in that feature flag.
:::

## Create a metric

To create a metric, do the following:

1. From the left navigation panel, click **Metrics**. Then, click the **Create metric** button. The Create a metric panel appears:

<p>
  <img src="https://help.split.io/hc/article_attachments/30833092104845" alt="metrics_create_a_metric.png" />
</p>

2. Provide the following details about the metric:

  * Name: Enter a descriptive metric name up to 50 characters and without spaces.
  * Owners: Select any number of Split users to be the metric owners. Owners can click **Metrics** in the left navigation panel and then view the metric in the Metrics menu’s browse pane when clicking **Owned by me**. Use owners to isolate metrics in the browse panes to those _owned by me_ and simplify [permissions](https://help.split.io/hc/en-us/articles/360020579052-Permissions). **Note: Ownership does not grant editing rights.**
  * Tags: Optionally add one or more [tags](https://help.split.io/hc/en-us/articles/360020839151) to help you categorize the metric.
  * Description: Optionally describe what the metric measures and its purpose.
  * Metric category: Choose to set the metric as one of your account's _Guardrail metrics_ or leave the category as _None_. _Guardrail metrics_ adhere to account-wide alerting settings. Go to [Metric categories](../metric-categories.md) for more information.

3. Define how the metric should be calculated:

  * Select desired impact: Select increase if an increase in this metric measurement is good for your business or customer experience. If not, select decrease.
  * Select traffic type: Choose the traffic type of the event you would like to measure. This is the traffic type specified when sending the event to Split. It is also the traffic type defined for the feature flags that will show the results of the metric on the Metrics impact tab. To learn more, see the [traffic type](https://help.split.io/hc/en-us/articles/360019916311) guide.
  * Measure as: Select the type of calculation to be performed on the event, event value, or event property. Learn more about metric types and their applications go to [Metric types](../metrics.md#metric-types).

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

Once you create your metric, you can now define your metric.

## Build a metric definition

You can define what you want to measure. To define your metric, do the following:

1. In the Select the desired impact field, select whether you would like to see this metric increase or decrease. In most A/B testing tools, this would be deemed the winning direction.
2. In the Select traffic type field, select what traffic type you would like to measure this metric for. Be aware that the traffic type for the metric must match the traffic type for the feature flag you want it applied to.
3. In the Measured as field, define functions to perform or calculate specific analyses on events. These functions can be performed per your traffic type. For more information, refer to the **About statistical comparison** section later in this guide.
4. In the Value field, optionally select which property you want to use as the value field. For more information, refer to the [Event property capture](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) guide.
5. In the Properties field, optionally define if there are any specific event properties to filter by for measuring this metric. For more information, refer to the [Event property capture](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) guide.

## Configure an alert policy

You can set an alert policy for a metric and Split will notify you if a feature flag impacts the metric beyond a threshold you define. For more information, go to [Alert policies](/docs/feature-management-experimentation/50-release-monitoring/docs/alerts/automated-alerts-and-notifications/set-up-metric-alerting.md#create-an-alert-policy).

## Audit logs

Audit logs are captured every time the metric's definition or alert policy is changed. For more information, review the [Audit logs](https://help.split.io/hc/en-us/articles/360020579472-Audit-logs) guide.

## Metric list

When viewing the list of metrics, you can use the following filters and indicators to help you navigate to a selected metric.

* Owned by me: Filters metrics to those that you created or were added as an owner.
* Starred by me: Filters metrics to those that you starred.
* Sort: Sorts metrics by name alphabetically.
* Filter: Filters metrics by traffic type or tags.
* Bell icon: Indicates whether an alert policy exists (filled icon) or does not exist (unfilled icon).