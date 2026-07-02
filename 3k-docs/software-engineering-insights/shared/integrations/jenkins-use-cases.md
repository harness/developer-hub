This page provides use cases for some of the most popular widgets available with the Jenkins integration, which help teams measure metrics such as job frequency, success rate, duration, and lead time, supporting continuous improvement in delivery workflows.

## Key widgets

### Measure deployment frequency and change failure rate

For teams working on DevOps, DORA metrics like Deployment Frequency and Change Failure Rate are important. If your team uses Jenkins as the CI/CD tool, the following widgets can help you identify delays in delivery and monitor the effectiveness of your recovery from issues.

* [Deployment Frequency](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/dora-metrics/#deployment-frequency)
* [Change Failure Rate](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/dora-metrics/#change-failure-rate)

:::note
The SEI Jenkins integration doesn’t currently support lead time tracking out-of-the-box. To capture this metric, you’ll need to use the Custom CI/CD API to send artifact details into SEI. For more information, see [DORA CI/CD Correlation](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/dora-metrics/dora-ci-cd-correlation).
:::

### Job and pipeline run frequency

Use these widgets to track the frequency of job and pipeline executions and observe success or failure trends over time. Tracking CI/CD job counts can help identify periods of high activity, recurring failures, and any anomalies in job runs.

* [CICD Job Count widget](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/cicd-insights#cicd-job-count-report)
* [CICD Job Count Trend widget](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/cicd-insights#cicd-job-count-trend-report)
* [CICD Jobs Count Single Stat](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/cicd-insights#cicd-jobs-count-single-stat)

### Job/pipeline duration

Analyzing job duration can help to optimize build times and streamline CI/CD workflows. Duration widgets provide insights into the time taken for jobs to run, allowing teams to pinpoint jobs that could benefit from optimization.

* [CI/CD Job Duration Report](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/cicd-insights#cicd-job-duration-report)
* [CI/CD Job Duration Single Stat](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/cicd-insights#cicd-job-duration-single-stat)
* [CI/CD Job Duration Trend Report](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/cicd-insights#cicd-job-duration-trend-report)