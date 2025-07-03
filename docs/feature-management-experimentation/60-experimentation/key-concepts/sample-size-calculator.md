---
title: Sample size calculator
sidebar_position: 60
---

## Experiment sensitivity

When running an experiment it is important to ensure you have a large enough sample to be able to detect impacts of the size that are important to you. If your sample size is too low your experiment will be underpowered and you would be unlikely to detect a reasonably sized impact.

Experiment sensitivity refers to the ability of your experiment to detect small changes. Each metric in your experiment has a Minimum Likely Detectable Effect (MLDE) - this is the smallest change which, if it exists, is likely to be detected and shown as statistically significant. Impacts smaller than the MLDE may be missed and not reach significance because the sample size was too low to confidently distinguish the impact from random noise. 

The larger the sample you have the smaller the impacts your experiment will be able to detect. It is often a trade-off between speed (not having to run the experiment longer to get a larger sample size) and sensitivity (being able to detect smaller changes).

It is recommended you decide how long your experiment will run up front, and resist the temptation to change your original plans if you do not reach significance after the initial run-time. This is to avoid false-positive results - if left for an infinite time, any experiment will eventually cross over into significance purely by chance.

We have created a set of calculators to help you decide how long to run your experiment. If you have a size of impact in mind which you want your experiment to be able to detect, you can use the [sample size calculators](#sample-size-calculators) to work out how large a sample you need to ensure your experiment has the sensitivity to detect impacts of that size. Otherwise, you can use the [sensitivity calculators](#sensitivity-calculators) to see the kinds of impacts you can expect to be able to detect for a range of experiment lengths.

Note that these calculators assume a significance threshold of 0.05 and a power threshold of 80%. For simplicity, they also assume that your sample size grows by the same amount every day. This may not always be a safe assumption if, for example, you are using accounts or logged in users as a traffic type and expect many repeat visits from the same unique keys. If this is the case we recommend using an estimate of the number of new unique visitors per day averaged over the runtime you are considering. 

See the [Using the Calculators section](#using-the-calculators) below for further information on the inputs to these calculators.  

## Sample size calculators

By using the calculators below you can see how long you need to run your experiment to have a good chance of detecting a given effect size if it does exist.

If your metric is a count, sum, average or ratio metric, use the [first calculator](#calculator-for-mean-metrics) for mean metrics. Otherwise, if your metric is a percent of unique users metric, use the [second calculator](#calculator-for-percent-unique-metrics) for proportions. 

### Calculator for mean metrics

<iframe
  src="https://exp-calculators-means-9ecaf91e3a35.herokuapp.com/"
  width="100%"
  height="900"
  style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
  }}
  loading="lazy"
/>

### Calculator for percent unique metrics

<iframe
  src="https://exp-calculators-proportions-00c422485fac.herokuapp.com/"
  width="100%"
  height="800"
  style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
  }}
  loading="lazy"
/>

## Sensitivity calculators

By using the calculators below you can see the kinds of impacts you can expect to detect for a range of experiment lengths.

If your metric is a count, sum, average or ratio metric, use the [first calculator](#calculator-for-mean-metrics-1) for mean metrics. Otherwise, if your metric is a percent of unique users metric, use the [second calculator](#calculator-for-percent-unique-metrics-1) for proportions. 

The first graph shows you the Minimum Likely Detectable Effect - the smallest relative percentage change that your experiment is likely to detect, if it exists - for a range of different experiment lengths. As you can see, a longer running experiment enables you to detect smaller changes to your metrics. 

The second graph shows you how large or small the comparison metric would need to be for you to expect to see a significant result. Only if your treatment causes the comparison metric to change to a value outside of the grey shaded region can you expect to reach significance. 

### Calculator for mean metrics

<iframe
  src="https://csb-16kyv-2r8njoik3.now.sh/?codemirror=1"
  width="100%"
  height="2400"
  style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
  }}
  loading="lazy"
/>

### Calculator for percent unique metrics

<iframe
  src="https://csb-5kd7k-42pc8nrsq.now.sh/?codemirror=1"
  width="100%"
  height="2300"
  style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
  }}
  loading="lazy"
/>


## Using the calculators

If you have the experiment pack and are unsure of any of the data required for the calculator, we recommend looking at the metric results for a similar feature flag you have already run or running a *100% off* feature flag with your intended targeting rules. You can then find the sample size, metric value and standard deviation from the [Metric Details and Trends](/docs/feature-management-experimentation/experimentation/experiment-results/viewing-experiment-results/metric-details-and-trends/) view reached by clicking into the metric card.

### Expected sample size per day

This is the total sample size expected to enter your experimental rule each day, or your Daily Active Users (DAU). It will be the total across both treatments rather than per treatment.

The Sample size column is shown under the Sample population section of the data table. You may need to adjust this to get to a daily estimate. 

For example, imagine you see the below table for a feature flag that ran for a full week, to get the estimated sample size per day, first sum the sample sizes across the two treatments, to get 2000, then divide by 7 to get an estimated daily value of 285 users. 

<img src="https://help.split.io/hc/article_attachments/26908355583885" alt="sample-size-column.png" width="300" />

### Baseline Metric Value

This is the expected value of the metric in your control group or the value you expect to see for the treatment set as the baseline. If you are using a reference feature flag, you can also find an estimate for this value in the Metric Details and Trends view, you will need the number under the Mean column in the Metric Dispersion section of the data table.

### Baseline Standard Deviation 

The standard deviation characterizes how much variation there is in your metric. It is needed for the Means calculators but not for the percent-unique calculator. 

You can find this value under the Stdev column in the Metric Dispersion section of the data table.

<img src="https://help.split.io/hc/article_attachments/26908355596685" alt="mean-and-standard-deviation-columns.png" width="500" />

### What size (relative%) change do you want to be able to detect? 

This is the smallest change which, if it exists, is likely to be detected and shown as statistically significant. Impacts smaller than this may be missed and not reach significance. In this section input the smallest change to your metric that you would definitely want to know about. 

### Days in your typical seasonality cycle

The number of days in your seasonality cycle is similar to your review period. It is the length of time needed to ensure a representative set of users. For example, if you typically see your business-level metrics vary across different days of the week, you should use a seasonality cycle and review period of at least a week.

We encourage making decisions after full [Review Periods](https://help.split.io/hc/en-us/articles/360020635912-Review-period-check) to help account for seasonality in your data. Hence, if your review period is set to 14 days, even if you had enough sample size after 12 days we still recommend running your experiment for a full review period of 14 days. These calculators will round up the recommended run time to the next full seasonality cycle. 