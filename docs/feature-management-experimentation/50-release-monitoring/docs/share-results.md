---
title: Share results
sidebar_label: Share results
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}>> help.split.io link: https://help.split.io/hc/en-us/articles/360059696231-Share-results <br /> ✘ images still hosted on help.split.io </button>
</p>

## Overview

The share results functionality allows you to download a copy of your metrics impact results in various formats or share via URL. This enables you to:

*   Share the outcome of your experiments with colleagues without them needing to visit Split
*   Keep a record of experiment outcomes in your preferred documentation formats or applications
*   Conduct further manual analysis or visualisations as desired
*   Import the metric results into your own internal systems
*   View results in a tabular format

## How to share results

When viewing the Metrics impact tab, under Results, you can find the Share results dropdown on the right side of the page, above the metric cards.

To generate the results, simply click on **Share results** to view the dropdown of format options. Click on your chosen format and your browser will begin downloading the file. A green pop up will appear on the page when the file has finished downloading. Clicking on **Copy URL** will copy a URL link to your current view in the Split app to your clipboard and will not download any file.

<p>
  <img alt="share_results_metrics_tab.png" src="https://help.split.io/hc/article_attachments/360092207032" />
</p>

:::info[Note]
* The results reflect the version, rule, and treatments selected in the filter box above, including any metric tag or metric owner filters applied.
* Share results is not currently supported when using [custom dates](https://help.split.io/hc/en-us/articles/360020848451-Applying-filters#selecting-custom-dates).
:::

### Available formats

You can generate a report containing your metrics impact results in the below formats:

#### CSV

*   This format contains the observed metric data and the results of the statistical analyses. The report contains one row per metric and is intended to be human readable as well as appropriate for further manual analyses or reporting.
*   You can find reference documentation for the fields contained in the CSV reports [here](https://help.split.io/hc/en-us/articles/360059696231-Share-results#h_01F32SES4J6HGRNSZDRSD04KQ9).

#### JSON

*   This format contains the observed metric data, the results of the statistical analyses, as well as the statistical settings and metric definitions at the time of analysis. This format is intended for ingesting data into other tools and databases.
*   You can find reference documentation for the fields contained in the JSON reports [here](https://help.split.io/hc/en-us/articles/360059696231-Share-results#h_01F32SF1PSAWQD4V4WYZ5QC3FY).

#### PDF

*   This format presents a visual representation of your metrics impact results, similar to the Split UI. This format is ideal for sharing results with stakeholders and for quickly understanding the high level outcomes of your tests.
*   An example PDF report is shown below.
  <img alt="example_pdf_pg1.png" src="https://help.split.io/hc/article_attachments/360093007492" /><img alt="example_pdf_pg2.png" src="https://help.split.io/hc/article_attachments/360093007512" />

#### Copy URL

*   This copies a URL link to your current view in the Split app to your clipboard.

### Reference for fields in the CSV results

There is one row per metric, containing details of the observed data, the results of the statistical analyses and the meta data describing the test.

<table data-number-column="false" data-layout="wide" data-autosize="false" data-pm-slice="1 1 []">

<tbody>

<tr>

<th class="pm-table-header-content-wrap" data-colwidth="315">

Field

</th>

<th class="pm-table-header-content-wrap" data-colwidth="134">

Type

</th>

<th class="pm-table-header-content-wrap" data-colwidth="511">

Description

</th>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Metric

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The metric name

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Result

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The summary of the metric result at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Impact

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The measured relative impact of the comparison treatment compared to the baseline treatment, as a fraction of the baseline treatment

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Impact lies above

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The lower bound of the confidence interval on the impact

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Impact lies below

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The upper bound of the confidence interval on the impact

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Baseline metric value

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The measured value of the metric for the baseline treatment. For percentage metrics. i.e. percent of unique users, this value is expressed as a fraction

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Comparison metric value

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The measured value of the metric for the comparison treatment. For percentage metrics. i.e. percent of unique users, this value is expressed as a fraction

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Comparison metric lies above

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The lower bound of the confidence interval on the comparison metric value

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Comparison metric lies below

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The upper bound of the confidence interval on the comparison metric value

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Baseline metric lies above

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The lower bound of the confidence interval on the baseline metric value

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Baseline metric lies below

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The upper bound of the confidence interval on the baseline metric value

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

pValue

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The p-Value for this metric. If multiple comparison corrections have been applied this will already have been adjusted for to control for the false discovery rate

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Baseline sample size

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Number of unique samples for the baseline treatment in the dataset used to generate this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Comparison sample size

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The number of unique samples for the comparison treatment in the dataset used to generate this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Sample Ratio

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The result of the sample ratio mismatch calculation. If this is “Mismatch” there is a sample ratio mismatch and results should not be trusted. See [here](https://help.split.io/hc/en-us/articles/360020636472-Sample-ratio-check) for more details.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Baseline treatment

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The baseline treatment for the statistical analysis in this report, if there is one

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Comparison treatment

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Comparison treatment for the statistical analysis in this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Key metric

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

boolean

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Boolean representing whether this metric was a Key metric for this test

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Split

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The feature flag name

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Environment

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The name of the Split environment in this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Version

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The feature flag version number in this report
</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Rule

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Name of the rule which this report contains data for

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Comparison target rollout percentage

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The target percentage of comparison treatment samples compared to the sum of comparison and baseline samples, expressed in a decimal form. For example, for a 50% : 50% rollout, the targeted rollout percentage would be 0.5

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Version start time

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

datetime

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Date and time the version started (local time zone)

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Version end time

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

datetime

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Date and time the version ended (local time zone), if it has. This will be null for versions which are still active at the time of report generation.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Experiment duration

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

datetime

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

For versions which have already ended, the length of time for which the version was active, in days.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Last calculation time

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

datetime

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Date and time the results were last updated (local time zone). Hence the results in the report are based on data received by Split between Version start time and this Last calculation time. If a calculation has not yet run this field will be equal to the Version start time.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Duration of data collection

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Period of time over which the data used to generate this report was collected, in days. Note that this may be shorter than the Experiment duration if the results had not been recently calculated when the report was generated.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Review period state

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The review period state.

<span class="code" spellcheck="false">COMPLETE_BEFORE</span> : The test was ended before a full review period

<span class="code" spellcheck="false">COMPLETE</span> : The test was ended after a full review period

<span class="code" spellcheck="false">INACTIVE_BEFORE</span> : The test is still active, but the report does not contain data for a full review period

<span class="code" spellcheck="false">ACTIVE</span> : The test is active and the report contains data for full review period(s)

<span class="code" spellcheck="false">INACTIVE_BETWEEN</span> : The test is still active and has run for at least one full review period, but the report was generated between review periods

If the review period is not “ACTIVE” or “COMPLETE”, interpret your results with caution as they may not be representative of your entire customer base.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Metric tag filters applied

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

array

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Any metric tags filters used to filter down the metrics in this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Metric owner filters applied

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

array

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Any metric owner filters used to filter down the metrics in this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Experiment significance threshold

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The significance threshold used for the statistical analyses in this report, as specified by the experiment settings at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Minimum sample size

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Minimum sample size required in each treatment before statistical comparisons are run for a metric. Specified by the experiment settings at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Multiple comparison correction

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

boolean

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

A boolean reflecting whether multiple comparison corrections were applied to the statistical analyses in this report. Specified by the experiment settings at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Experimental review period

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The experimental review period, as specified by the experiment settings at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Metric spread

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

ACROSS : Metric is measured across the whole sample and statistical comparisons are not possible

PER : Metric is measured per unique key e.g. per user

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Metric aggregation

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

TOTAL : Metric is a sum of values
COUNT : Metric is a count of values
RATE : Metric measures the percent of the sample who have done the event
AVERAGE : Metric is an average of values
NONE : Metric definition unknown

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Metric ID

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

ACROSS : Metric is measured across the whole sample and statistical comparisons are not possible

PER : Metric is measured per unique key e.g. per user

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Traffic type

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

Traffic type

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Workspace

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The name of the Split project that contains the feature flag

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

Report generated on

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

datetime

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

The date and time the report was generated (local timezone)

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="315">

URL

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="134">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="511">

A link to view these results in the Split UI

</td>

</tr>

</tbody>

</table>

### Reference for fields in the JSON results 

The top level JSON fields contain metadata for the report, The metrics section contains an array for each metric in the report, each containing the data describing the measurements and results of the statistical analyses for this metric. Inside each metric is a metricDefinition array containing fields which describe the definition of the metric at the time the report was downloaded.

##### Metadata

<table data-number-column="false" data-layout="wide" data-autosize="false" data-pm-slice="1 1 []">

<tbody>

<tr>

<th class="pm-table-header-content-wrap" data-colwidth="379">

Field

</th>

<th class="pm-table-header-content-wrap" data-colwidth="107">

Type

</th>

<th class="pm-table-header-content-wrap" data-colwidth="474">

Description

</th>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

organizationName

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The name of the Split account that contains the feature flag

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

split

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The feature flag name

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

splitDescription

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The feature flag description

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

SplitVersionNumber

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The feature flag version in this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

versionStartTime

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The time when the version started (unix milliseconds)

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

versionEndTime

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The time when the version ended (unix milliseconds), if it has ended. This will be null for versions which are still active at the time of report generation.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

lastUpdateTime

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The time the results were last updated (unix milliseconds). Hence the results in the report are based on data received by Split between versionStartTime and lastUpdateTime.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

versionDurationAtLastUpdateInMs

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

Duration of data collection, in milliseconds.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

versionDurationAtLastUpdate

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

Duration of data collection, in days.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

experimentDuration

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

For versions which have already ended, the length of time for which the version was active, in milliseconds.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

environmentName

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The name of the Split environment

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

workspaceName

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The name of the Split project

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

trafficTypeName

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The traffic type

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

baselineTreatment

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The baseline treatment for the statistical analysis in this report, if there is one

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

comparisonTreatment

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The comparison treatment for the statistical analysis in this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

ruleName

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

Name of the feature flag targeting rule

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

sampleSizeOfBaseline

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The number of unique samples for the baseline treatment in the dataset used to generate this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

sampleSizeOfComparison

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The number of unique samples for the comparison treatment in the dataset used to generate this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

minimumSampleSize

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The minimum sample size required in each feature flag treatment before statistical comparisons are run for a metric. This value is specified by the experiment settings at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

filterTags

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

array of strings

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

Any metric tags filters used to filter down the metrics in this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

filterOwners

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

array of strings

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

Any metric owner filters used to filter down the metrics in this report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

srmPValue

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The p-value output of the sample ratio mismatch calculation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

significanceThreshold

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The significance threshold used for the statistical analyses in this report, as specified by the experiment settings at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

mcc

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

boolean

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

A boolean reflecting whether multiple comparison corrections were applied to the statistical analyses in this report. This value is specified by the experiment settings at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

experimentalReviewPeriodState

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The review period state.

<span class="code" spellcheck="false">COMPLETE_BEFORE</span> : The test was ended before a full review period

<span class="code" spellcheck="false">COMPLETE</span> : The test was ended after a full review period

<span class="code" spellcheck="false">INACTIVE_BEFORE</span> : The test is still active, but the report does not contain data for a full review period

<span class="code" spellcheck="false">ACTIVE</span> : The test is active and the report contains data for full review period(s)

<span class="code" spellcheck="false">INACTIVE_BETWEEN</span> : The test is still active and has run for at least one full review period, but the report was generated between review periods

If the review period is not “ACTIVE” or “COMPLETE”, interpret your results with caution as they may not be representative of your entire customer base.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

targetedRatio

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The target fraction, of the sum of unique samples in the two selected treatments, who receive the comparison treatment. For example, for a 50% : 50% rollout, the targetedRatio would be 0.5

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

currentRatio

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The actual fraction of all unique samples who received the comparison treatment

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

splitLink

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

A link to view these results in the Split UI

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

sampleRatio

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The result of the sample ratio mismatch calculation. If this is “Mismatch” there is a sample ratio mismatch and results should not be trusted. See [here](https://help.split.io/hc/en-us/articles/360020636472-Sample-ratio-check) for more details.

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

experimentalReviewPeriod

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The experimental review period configured for this test, as specified by the experiment settings at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

reportGenerationTime

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The time when the report was generated (unix milliseconds)

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

metricsTotal

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The total number of metrics in the report

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

metricsWithDesiredImpact

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The number of metrics in the report with a statistically significant desired impact

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

metricsWithUndesiredImpact

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The number of metrics in the report with a statistically significant undesired impact

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

metricsWithInconclusiveImpact

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The number of metrics in the report with a statistically inconclusive impact

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

metricsThatNeedMoreData

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The number of metrics in the report which need more data before a statistical comparison can be run

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

metricsWithComparisonNotPossible

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The number of metrics in the report for which a statistical comparison was not possible

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

metricsUnavailable

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

The number of metrics in the report for which data is unavailable

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="379">

metrics

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="107">

Array

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="474">

An array containing the measured data and the results of the statistical comparisons for each metric. See below.

</td>

</tr>

</tbody>

</table>

##### Metrics

<table data-number-column="false" data-layout="wide" data-autosize="false" data-pm-slice="1 1 []">

<tbody>

<tr>

<th class="pm-table-header-content-wrap" data-colwidth="383">

Field

</th>

<th class="pm-table-header-content-wrap" data-colwidth="105">

Type

</th>

<th class="pm-table-header-content-wrap" data-colwidth="472">

Description

</th>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

id

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

Unique identifier for the metric

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

name

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The metric name

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

stateSummary

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

Summary of the metric result at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

stateDetailed

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

More granular categorization of the metric result at the time of report generation

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

impact

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The measured relative impact of the comparison treatment compared to the baseline treatment, as a fraction of the baseline treatment

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

impactLower

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The lower bound of the confidence interval on the impact

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

impactUpper

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The upper bound of the confidence interval on the impact

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

baselineMetricUpper

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The upper bound of the confidence interval on the baseline metric value

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

baselineMetricLower

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The lower bound of the confidence interval on the baseline metric value

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

comparisonMetricUpper

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The upper bound of the confidence interval on the comparison metric value

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

comparisonMetricLower

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The lower bound of the confidence interval on the comparison metric value

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

sampleSizeBaseLine

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The number of unique samples contributing to the metric result for the baseline treatment

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

sampleSizeComparison

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The number of unique samples contributing to the metric result for the comparison treatment

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

baselineMetricValue

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The measured value of the metric for the baseline treatment. For percentage metrics. i.e. percent of unique users, this value is expressed as a fraction

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

comparisonMetricValue

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The measured value of the metric for the comparison treatment. For percentage metrics. i.e. percent of unique users, this value is expressed as a fraction

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

pValue

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The p-Value for this metric. If multiple comparison corrections have been applied this will already have been adjusted for to control for the false discovery rate

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

mlde

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The minimum likely detectable effect of this metric

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

endOfReviewPeriodMlde

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

float

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The expected minimum likely detectable effect of this metric at the end of the next review period, assuming metric characteristics and rate of increase in the sample size remains consistent

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

format

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

Formatting guide for the metric result

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

comparisonRemainingNormality

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The remaining number of unique samples receiving the comparison treatment needed for the comparison treatment to reach the minimum sample size

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

baselineRemainingNormality

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

int

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

The remaining number of unique samples receiving the baseline treatment needed for the baseline treatment to reach the minimum sample size

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

baselineZero

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

boolean

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

A boolean representing whether the metric value for the baseline was zero. If True, the impact will be an absolute impact rather than a relative impact

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

metricDefinition

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

array

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

This section contains information on the metric definition at the time of report generation. See below

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="383">

key

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="105">

boolean

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="472">

A boolean representing whether this metric was a Key metric for this test

</td>

</tr>

</tbody>

</table>

##### Metric Definitions

<table data-number-column="false" data-layout="wide" data-autosize="false" data-pm-slice="1 1 []">

<tbody>

<tr>

<th class="pm-table-header-content-wrap" data-colwidth="386">

Field

</th>

<th class="pm-table-header-content-wrap" data-colwidth="104">

Type

</th>

<th class="pm-table-header-content-wrap" data-colwidth="470">

Description

</th>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="386">

aggregation

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="104">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="470">

TOTAL : Metric is a sum of values
COUNT : Metric is a count of values
RATE : Metric measures the percent of the sample who have done the event
AVERAGE : Metric is an average of values
NONE : Metric definition unknown

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="386">

spread

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="104">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="470">

ACROSS : Metric is measured across the whole sample and statistical comparisons are not possible

PER : Metric is measured per unique key e.g. per user

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="386">

desiredDirection

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="104">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="470">

The desired direction of the metric impact e.g. “Increase” or “Decrease”

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="386">

baseEventTypeId

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="104">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="470">

The base event type with which the metric is calculated

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="386">

baseEventPropertyFilters

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="104">

array

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="470">

The property filters applied to the base event for this metric

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="386">

filterEventPropertyFilters

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="104">

array

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="470">

The property filters applied to the has done event filter for this metric

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="386">

cap

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="104">

array

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="470">

The cap applied to the metric value, if there is one

</td>

</tr>

<tr>

<td class="pm-table-cell-content-wrap" data-colwidth="386">

hasDoneFilters

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="104">

string

</td>

<td class="pm-table-cell-content-wrap" data-colwidth="470">

The has done filter applied to this metric, if there is one.

Note that if the metric is a ratio metric, the denominator event type appears here

</td>

</tr>

</tbody>

</table>

For example, this metric definition as shown in the UI would have the below metricDefinition in a JSON report output

<p>
  <img alt="shareable_results_metric_definition.png" src="https://help.split.io/hc/article_attachments/360092207112" />
</p>

```
     'metricDefinition': {'aggregation': 'COUNT',
      'spread': 'PER',
      'desiredDirection': 'Increase',
      'baseEventTypeId': 'purchase',
      'baseEventPropertyFilters': [{'property': 'discount',
        'operator': 'GREATER_THAN',
        'secondOperand': '0',
        'inverted': False,
        'stringInListOperand': None,
        'numberRangeOperand': None}],
      'filterEventPropertyFilters': [{'property': 'page',
        'operator': 'STRING_EQUAL',
        'secondOperand': 'homepage',
        'inverted': False,
        'stringInListOperand': None,
        'numberRangeOperand': None}],
      'cap': {'metricCap': 10, 'granularity': 'per_user_per_day'},
      'hasDoneFilters': 'page_load'}
```