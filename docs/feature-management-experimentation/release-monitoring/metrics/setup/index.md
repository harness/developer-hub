---
title: Setup
sidebar_position: 10
---

### Create a metric, monitor, and measure the impact

You can create a [metric](/docs/feature-management-experimentation/release-monitoring/metrics/overview), monitor, and measure impact in six steps: 

1. [Define your metric name and information](#define-your-metric-name-and-information)
2. [Define your metric definition](#define-your-metric-definition)
3. [Create an alert policy](#create-an-alert-policy)
4. [Manage alerts](#manage-alerts)
5. [Review metrics impact during a review period](#review-metrics-impact-during-a-review-period)
6. [Analyze metric impact details and trends over time](#analyze-metric-impact-details-and-trends-over-time)

### Define your metric name and information 

Once you are sending us event data, to create your first metric, click on the metrics icon in the left navigation and click the **Create metric** button. Enter your metric name. We recommend describing what you intend to measure with a unique and recognizable name. Similar to feature flags, you can easily specify meta information for your new metric such as name, description, owners, and tags. This information can help you and your team manage your metrics. Learn more about [creating a metric](/docs/feature-management-experimentation/release-monitoring/metrics/overview#create-a-metric). 

### Define your metric definition 

When defining the metric definition, determine the winning direction. If increasing this metric is good for your business and customer experience, select *increase*. If not, select *decrease*. The traffic type applies to the event type associated with the metric. Select traffic type `user`. To get started, select *count of events per user* and select an event you sent. Learn more about [defining your metric](/docs/feature-management-experimentation/release-monitoring/metrics/overview#common-metrics).  

### Create an alert policy 

An alert policy allows you to configure a degradation threshold for your metric. If the feature flag causes the metric to go below or above that threshold you are alerted by your configured notification channel. Learn more about [creating an alert policy](/docs/feature-management-experimentation/release-monitoring/metrics/overview#configure-an-alert-policy).

### Manage alerts

Any alerts which are triggered are displayed both on the Targeting and Alerts tab on the feature flag page. When you receive an alert, you can quickly rollback the feature flag by clicking kill or dismiss the alert. Learn more about [managing alerts](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting#metric-alert-summary-in-split-ui).

### Review metrics impact during a review period 

The review periods are preset using the admin settings. You can access your metrics impact by searching for the feature flag you want to see the impact for and navigating to the metrics impact tab. Once here, you see the impact on your metrics, first ordered by feature flag key metrics, then account-wide guardrail metrics, and then feature flag supporting metrics. Learn more about [review periods](https://help.split.io/hc/en-us/articles/360020635912-Review-period-check) and [filtering your metrics](https://help.split.io/hc/en-us/articles/360020848451-Metrics-impact-Applying-filters).

### Analyze metric impact details and trends over time 

Information such as the impact %, p-value, and error margin are surfaced on the metric card. You can click on the metric card to access additional information. This additional information includes how the impact changed over time, the metric dispersion, and the sample size used to calculate the metric value. Learn more about [metric details and trends](https://help.split.io/hc/en-us/articles/360025376251-Metric-details-and-trends).
