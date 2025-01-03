---
title: "Step 4: Create a metric, monitor and measure the impact"
sidebar_label: "Step 4: Create a metric, monitor and measure the impact"
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025335091-Step-4-Create-a-metric-monitor-and-measure-the-impact </button>
</p>

You can create a metric, monitor, and measure impact in six steps: 
1. Define your metric name and meta information
2. Define your metric definition 
3. Create an alert policy
4. Manage alerts
5. Review metrics impact during a review period
6. Analyze metric impact details and trends over time 

## Step 1: Set your metric name and information 
Once you are sending us event data, to create your first metric, click on the metrics icon in the left navigation and click the **Create metric** button. Enter your metric name. We recommend describing what you intend to measure with a unique and recognizable name. Similar to feature flags, you can easily specify meta information for your new metric such as name, description, owners, and tags. This information can help you and your team manage your metrics. Learn more about [creating a metric](https://help.split.io/hc/en-us/articles/360020586132-Create-a-metric). 

## Step 2: Define your metric definition 
When defining the metric definition, determine the winning direction. If increasing this metric is good for your business and customer experience, select *increase*. If not, select *decrease*. The traffic type applies to the event type associated with the metric. Select traffic type user. To get started, select *count of events per user* and select an event you sent. Learn more about [defining your metric](https://help.split.io/hc/en-us/articles/360020843931-Metric-definition).  

## Step 3: Create an alert policy 
An alert policy allows you to configure a degradation threshold for your metric. If the feature flag causes the metric to go below or above that threshold you are alerted by your configured notification channel. Learn more about [creating an alert policy](https://help.split.io/hc/en-us/articles/360030044331).

## Step 4: Manage alerts
Any alerts which are triggered are displayed both on the Targeting and Alerts tab on the feature flag page. When you receive an alert, you can quickly rollback the feature flag by clicking kill or dismiss the alert. Learn more about [managing alerts](https://help.split.io/hc/en-us/articles/360030045491-Manage-alerts).

## Step 5: Review metrics impact during a review period 
The review periods are preset using the admin settings. You can access your metrics impact by searching for the feature flag you want to see the impact for and navigating to the metrics impact tab. Once here, you see the impact on your metrics, first ordered by feature flag key metrics, then account-wide guardrail metrics, and then feature flag supporting metrics. Learn more about [review periods](https://help.split.io/hc/en-us/articles/360020635912-Review-period-check) and [filtering your metrics](https://help.split.io/hc/en-us/articles/360020848451-Apply-filters).

## Step 6: Analyze metric impact details and trends over time 
Information such as the impact % , p-value, and error margin are surfaced on the metric card. You can click on the metric card to access additional information. This additional information includes how the impact changed over time, the metric dispersion, and the sample size used to calculate the metric value. Learn more about [metric details and trends](https://help.split.io/hc/en-us/articles/360025376251-Metric-details-and-trends).
