## Create a metric, monitor, and measure the impact

You can create a [metric](../), monitor, and measure impact in six steps: 

1. [Define your metric name and information](#define-your-metric-name-and-information)
2. [Define your metric definition](#define-your-metric-definition)
3. [Create an alert policy](#create-an-alert-policy)
4. [Manage alerts](#manage-alerts)
5. [Review metrics impact during a review period](#review-metrics-impact-during-a-review-period)
6. [Analyze metric impact details and trends over time](#analyze-metric-impact-details-and-trends-over-time)

### Define your metric name and information 

Once you are sending us event data, to create your first metric, click on the metrics icon in the left navigation and click the **Create metric** button. Enter your metric name. We recommend describing what you intend to measure with a unique and recognizable name. Similar to feature flags, you can easily specify meta information for your new metric such as name, description, owners, and tags. This information can help you and your team manage your metrics. Learn more about [creating a metric](#create-a-metric). 

### Define your metric definition 

When defining the metric definition, determine the winning direction. If increasing this metric is good for your business and customer experience, select *increase*. If not, select *decrease*. The traffic type applies to the event type associated with the metric. Select traffic type `user`. To get started, select *count of events per user* and select an event you sent. Learn more about [defining your metric](../categories/).  

### Create an alert policy 

An alert policy allows you to configure a degradation threshold for your metric. If the feature flag causes the metric to go below or above that threshold you are alerted by your configured notification channel. Learn more about [creating an alert policy](../../alerts/alert-policies).

### Manage alerts

Any alerts which are triggered are displayed both on the Targeting and Alerts tab on the feature flag page. When you receive an alert, you can quickly rollback the feature flag by clicking kill or dismiss the alert. Learn more about [managing alerts](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting#metric-alert-summary-in-split-ui).

### Review metrics impact during a review period 

The review periods are preset using the admin settings. You can access your metrics impact by searching for the feature flag you want to see the impact for and navigating to the metrics impact tab. Once here, you see the impact on your metrics, first ordered by feature flag key metrics, then account-wide guardrail metrics, and then feature flag supporting metrics. Learn more about [review periods](https://help.split.io/hc/en-us/articles/360020635912-Review-period-check) and [filtering your metrics](https://help.split.io/hc/en-us/articles/360020848451-Metrics-impact-Applying-filters).

### Analyze metric impact details and trends over time 

Information such as the impact %, p-value, and error margin are surfaced on the metric card. You can click on the metric card to access additional information. This additional information includes how the impact changed over time, the metric dispersion, and the sample size used to calculate the metric value. Learn more about [metric details and trends](https://help.split.io/hc/en-us/articles/360025376251-Metric-details-and-trends).

## Create a metric

To create a metric, do the following:

1. From the left navigation panel, click **Metrics**. Then, click the **Create metric** button. The Create a metric panel appears:

   <img src="https://help.split.io/hc/article_attachments/30833092104845" alt="metrics_create_a_metric.png" width="700" />

2. Provide the following details about the metric:

    * Name: Enter a descriptive metric name up to 50 characters and without spaces.
    * Owners: Select any number of Harness FME users to be the metric owners. Owners can click **Metrics** in the left navigation panel and then view the metric in the Metrics menu’s browse pane when clicking **Owned by me**.
    * Tags: Optionally add one or more [tags](https://help.split.io/hc/en-us/articles/360020839151) to help you categorize the metric.
    * Description: Optionally describe what the metric measures and its purpose.
    * Metric category: Choose to set the metric as one of your account's _Guardrail metrics_ or leave the category as _None_. _Guardrail metrics_ adhere to account-wide alerting settings. See the [Metric categories](#metric-categories) section (below) for more information.

3. Define how the metric should be calculated:

    * Select desired impact: Select increase if an increase in this metric measurement is good for your business or customer experience. If not, select decrease.
    * Select traffic type: Choose the traffic type of the event you would like to measure. This is the traffic type specified when sending the event to Harness FME. It is also the traffic type defined for the feature flags that will show the results of the metric on the Metrics impact tab. To learn more, see the [traffic type](https://help.split.io/hc/en-us/articles/360019916311) guide.
    * Measure as: Select the type of calculation to be performed on the event, event value, or event property. Learn more about metric types and their applications in the [Metric types](#metric-types) section.

      <img src="https://help.split.io/hc/article_attachments/30833087396877" alt="metrics_measure_as.png" width="700" />

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