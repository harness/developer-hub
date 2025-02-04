---
title: Metric filtering
sidebar_label: Metric filtering
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360022217832-Metric-filtering, https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  <span>Applying a filter can help you improve the sensitivity of your metric by refining the sample used in the analysis. Filtering is most often used to provide deeper analysis of how customers progress through a particular flow in your product. </span>
</p>
<p>
  <span>An e-commerce company may seek to drive an increase in purchases, and while it is important to track that purchase rate globally, it is often valuable to see where in the process customers are dropping off. By filtering, you can see the behavior of customers who reach particular points in the funnel, such as abandonment by those who visited a product page, or those who added something to their cart. </span>
</p>
<p>
  <span>Filtering is also used to create metrics that target only users who engage in a particular behavior, for instance observing the support ticket rate of those users who experience an exception or of users who completed the on-boarding process, as shown below:</span><strong><br /></strong>
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360019455852/Screen_Shot_2019-01-24_at_8.43.08_AM.png" alt="Screen_Shot_2019-01-24_at_8.43.08_AM.png" />
</p>

## Applying a filter

You can optionally apply filters and filter properties, and a cap to your metric value. Filters help you improve the sensitivity of your metric by refining the sample used in the analysis. Filtering provides deeper analysis of how customers progress through a particular flow in your product. This allows you to see the behavior of customers who reach particular points in the funnel, such as abandonment by those who visited a product page, or those who added something to their cart. By filtering with events, it’s enforcing that the user has at some point seen both events of a particular version.

Also, use filtering to create metrics that target only users who engage in a particular behavior, for example, observing the support ticket rate of those users who experience an exception or of users who completed the onboarding process. For more information about applying filters, refer to the [Apply filters](https://help.split.io/hc/en-us/articles/360020848451-Apply-filters) guide. To apply filters, do the following:

1. Towards the bottom of the Metrics page, click the **Show advanced** link. The Advanced section displays.

  <img src="https://help.split.io/hc/article_attachments/30833216436109" alt="setting_up_and_using_metrics_advanced.png" />

2. In the Filter by list, optionally apply a filter to these analyses. 
3. In the Properties field, optionally apply a property filter to the ‘has done’ event you’re filtering your metric by.
4. In the Cap at field, apply a cap to your metric value. With metric capping, any outlier value in your metrics is capped and replaced with a fixed threshold value. This reduces the variance and increases the sensitivity of your metric. When a metric cap is set to a per user per day, this is 24 hours from a user’s first impression within a particular version of a feature flag. Refer to [Metric capping](https://help.split.io/hc/en-us/articles/360022165552-Metric-capping) for more information.
5. Once finished, click **Create** to create your metric. Your new metric appears.

:::note
To get access to alert policies, contact your customer success manager or support to enable your account. If you create a metric that is measured on a per traffic type basis, you can create an alert policy for this metric. For more information about alert policies, refer to the [metric alerting guide](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting).
:::