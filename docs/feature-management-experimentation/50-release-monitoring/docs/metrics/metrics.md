---
title: Metrics
sidebar_label: Metrics
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 3
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics <br /> ✘ images still hosted on help.split.io </button>
</p>

A metric is a measurement of success for your experiment on your website, application, backend performance, etc. It tells you if your experiments are improving, degrading, or are having no effect on your visitors’ experience, based on their behavior. You can measure customer behavior and customer experience in your application by sending events such as clicks, views, checkout events, page load time, or any other event that measures behavior or experience. This helps you make informed decisions about your product and performance. 

Once you begin collecting and analyzing your data, you’re likely to find it easier to reach a confident decision about your business challenges, allowing for continuous improvements over time. Also, having all of your key data points attached directly to your feature flags can help you roll out new products and manage risks. 

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