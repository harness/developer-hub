---
title: DORA Metrics Guide
description: The central hub to learn everything about the DORA metrics on Harness SEI
sidebar_position: 10
---

## What is DORA

DORA (DevOps Research Assessment) identified the following key metrics that describe a software development team's performance: Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore (MTTR).

### Deployment Frequency

Deployment Frequency is key to understanding the pace of software releases. It is categorized into four levels – Elite, High, Medium, and Low – based on the frequency of deployments. 

* Elite: More than one deployment per day.
* High: Deployments occur anywhere from once per day to once per week.
* Medium: Deployments occur anywhere from once per week to once per month.
* Low: Deployment occurs less than once per month.

### Lead Time

Lead Time for Changes measures the duration from commit to production. The overall lead time is the sum of time spent in each workflow stage, with the specific stages depending on your Workflow profile.

### Change Failure Rate

The Change Failure Rate indicates the percentage of deployments causing production failures. It is categorized into Elite, High, Medium, and Low, based on the percentage of failures. 

* Elite: Failure rate under 15 percent.
* High: Failure rate of 16 to 30 percent.
* Medium: Failure rate of 31 to 45 percent.

### Mean Time to Restore (MTTR)

Mean Time To Restore/Recover (MTTR), or Time to Restore Service, indicates how long it takes an organization to recover from a failure in production. MTTR is a good metric for assessing the speed of your recovery process across several areas of technology.

With SEI, you can use DORA Metrics Insights to understand how your organization or team is performing and help you get an overview of daily, weekly, and monthly trends.

Furthermore, SEI gives you the flexibility to choose the integrations from which you want to derive data, such as Issue Management, SCM, Incident Management, and CI/CD tools, as well as the ability to select filters to refine the data used to generate your metrics.

## Engineering Team Use Cases for Measuring DORA Metrics

Here are some specific use cases for how engineering teams can utilize these metrics:

### Identifying Bottlenecks and Improving Workflow

#### Monitoring Lead Time for Changes

Engineers can identify areas causing delays in the development lifecycle by analyzing the time it takes for code to reach production. This might reveal inefficiencies in code review, testing, or deployment processes.

#### Analyzing Deployment Frequency

Observing changes in deployment frequency can help determine if teams are releasing updates frequently and iteratively, potentially leading to faster innovation.

### Evaluating the Effectiveness of Process Changes

#### Measuring Change Failure Rate

Comparing CFR before and after implementing a new deployment pipeline or testing strategy can assess its effectiveness in catching bugs before they reach production.

#### Tracking Mean Time to Restore

Analyzing MTTR trends can reveal the efficiency of incident response procedures and identify areas for improvement in disaster recovery plans.

### Setting Team Goals and Tracking Progress

#### Establishing Deployment Frequency Targets

Teams can set achievable goals for increasing deployment frequency, encouraging a culture of continuous integration and delivery (CI/CD).

#### Monitoring Lead Time Reduction

Tracking the decrease in lead time over time can demonstrate the team's progress in streamlining development processes and improving efficiency.

### Comparing Performance with Industry Benchmarks

#### Benchmarking DORA Metrics

While using DORA metrics for direct team comparison can be misleading, comparing them with industry benchmarks within a similar context can provide a general sense of how the team is performing relative to others.

### Facilitating Open Communication and Collaboration

#### Sharing DORA Metrics

Using DORA metrics as a starting point for open discussions can foster collaboration between developers, operations, and management. Teams can work together to identify areas for improvement and implement solutions.

It's important to remember that DORA metrics should not be used solely for individual performance evaluation. Instead, they are valuable tools for continuous improvement, enabling teams to identify areas for growth, track progress, and ultimately deliver software faster and more reliably.

## DORA under-the-hood

### Issue Management to SCM Correlations

* **JIRA to SCM:** This correlation is done by matching issue IDs from JIRA tickets with commit messages in SCM. The calculation of lead time here starts from the ticket's creation date to the first commit in SCM related to that ticket.
* **SCM to CI:** The correlation is established through commit SHAs, which are used to identify the specific build in CI that corresponds to the change made in SCM. The calculation here involves the time from the first commit to the first successful build in CI.
* **CI to CD:** This step involves correlating the artifact (or build) from CI to deployment in CD using artifact identifiers (like tags or digests). The calculation of lead time considers the duration from the first successful CI build to the deployment in CD.

### How is data correlated between the Tickets, Commits and Pull Requests?​

To ensure the accuracy of SEI calculations, it is necessary to maintain code hygiene throughout the development lifecycle.

* **Tickets and Pull Requests:** To correlate data between the ticketing system and pull request (PR) information in SEI, the PR title must include the ticket key from the ticketing system. By doing so, SEI can associate the relevant data from both systems and provide a comprehensive view of each issue's progression.
* **Commits and Default Branch:** SEI captures all commits made to the default branch, typically named main or master. These commits serve as the basis for calculating various metrics within SEI.
* **Commits and Pull Requests:** SEI collects commit data related to pull requests (PRs), irrespective of the target branch. This information is vital for measuring lead time metrics during the PR process.

It's important to note that certain use cases like the Lead Time calculations, offer valuable insights only after the work has been completed and merged. Consequently, when assessing these metrics in SEI, configure the Workflow Profile based on the final code changes rather than individual contributions before merging.

### CI to CD Correlations

SEI can connect to one or more CI/CD integrations. The jobs and executions are normalized and can be correlated across multiple sources. For example, a customer could be using GitHub Actions as their CI, and Harness as their CD.

The correlation between CI & CD execution is built on generated artifacts (by CI execution) and consumed artifacts (by CD execution). At this time, only container image-type artifacts are supported.

### Commits we fetch

SEI facilitates the retrieval of commit data in two ways, each catering to different aspects of version control and collaborative development.

1. Default Branch Commits
2. Pull Request-Related Commits

#### Scope of Measurement

#### Default Branch Commits

The system captures all commits that find their way onto the default branch, commonly denoted as main or master. This approach ensures a comprehensive overview of the primary codebase, providing insights into the evolution of the project's core.

#### Pull Request-Related Commits

SEI also ingests the data for commits associated with pull requests (PRs), regardless of the target branch. This data is utilized for the calculation. Deviations from this practice are recognized as potential anti-patterns, signalling lapses in developer hygiene. This data is utilized in the calculation for metrics such as Coding Days and Lines of Code.

The ingestion logic within SEI rests on the assumption that important code additions go through a careful review process before being approved. At the same time, it expects that all important code changes will eventually be merged into the main branch, creating a unified and up-to-date codebase.

#### Best Practices

To ensure the accuracy of SEI calculations, it is necessary to maintain code hygiene throughout the development lifecycle.

#### Feature Branch PRs

Developers are encouraged to commit to feature branches on a regular basis and raise PRs directed to the feature branch rather than committing code directly to the main branch. This helps maintain a structured development process.

#### Periodic Main Branch Merges

It is important to regularly merge the feature branch with the main branch in your software development process. This means combining the new features or changes with the core codebase and creating a pull request (PR) for review. Doing this regularly helps catch integration issues early and makes the process of reviewing and approving code simpler.

It is essential to recognise that certain use cases, such as the Lead Time calculations, reflect meaningful insights only upon completion of the work, i.e., post-merge. Thus, the associated profile configuration while evaluating these metrics in SEI should be defined in the context of final code changes to ensure accurate analysis for contributors.

## How to create DORA Insights

### Prerequisites

* Enable the Harness SEI module for your account. 
* Complete the setup of your project and collection. 
* Configure integrations for your issue management tool, SCM, and deployment tool (if applicable). 

### Set up your project, integration and collection

Begin by creating a project and collection. 

* In the sidebar of the Harness application, select the SEI module from the module selection.
* Select Projects and choose an existing project or create a new one. For information about creating a project, go to Create Organizations and Projects. 

Note: A user can create multiple projects and can essentially be part of multiple projects.
* Once your project is created, you can set up and map integrations as an admin and set up the collection hierarchy.

### Integration Mapping

Once your project is created, you can set up and map integrations as an admin.  Integration Mapping refers to the association of the available or new integrations with the current project. For more information, go to Integrations.

1. Go to the **Integration Mapping** tab within the SEI module. 
2. Click **Map Integrations** and select existing integrations or create new ones as needed. 
3. Ensure you associate the integrations with your current project.
4. Now since we will be configuring a DORA insight in this tutorial thus we will map the **Jira (Issue Management)**, **GitHub (Source Code Manager)** and **Harness NG integration (CI/CD Platform)**.

You can also create new integrations and associate the integration with the current project by mapping them.

To create a new Jira integration, go to [Jira integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-jira).
To create a new Github integration, go to [Github integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-github).
To create a new Harness NG integration, go to [Harness NG integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-harnessng).

### Create the DORA Insight

1. Select the Collection under which your DORA-type workflow profile is associated. If you already have Insights in your project:
   1. Choose any Insight. For instructions, go to View Insights.
   2. In the header, click on All Insights, and then select Manage Insights.
   3. Choose New Insight.
2. If you don't have any Insights under the collection, click on the Associate Insight to this collection button to create a new Insight.

#### Configure the Insight settings

1. Enter a Name for the Insight.
2. Select at least one Collection category to associate with this Insight.
3. Select Create to save the Insight metadata. From here, you can add reports to this Insight.

### Add DORA metrics reports

You can use a DORA Metrics Insights to examine your organization's DORA metrics. This helps you understand how your organization or team is performing and helps you get an overview of daily, weekly, and monthly trends.

#### Deployment Frequency reports

Include DORA metrics reports to understand how well your team is doing. The Deployment Frequency report tells you how often your team successfully releases software. 

To keep track of Deployment Frequency, set up a Workflow profile. This helps you pick what to monitor like merged pull requests or CI/CD jobs for the associated Collections. You can adjust Workflow profiles to fit your team's way of working, focusing on specific steps like Source Code Management (SCM) or a combination of issue management, SCM, and CI/CD. For more information, go to [Workflow profile](/docs/software-engineering-insights/sei-profiles/workflow-profile).

To add the **Deployment Frequency** widget to Insights:

1. Select Settings, and then select Add Widget.
2. Select the Deployment Frequency widget.
3. Adjust the widget settings as needed.

:::info
Note: Modifying the collection filters in the widget settings will direct you to the Edit Collection tab. Changes made here will impact the entire collection, not just the widget.
:::

4. Select Next: Place Widget, place the widget on the Insight and then select Save Layout.

The widget automatically detects the relevant Workflow profile based on the Collections associated with the Insight.

Consider the following recommendations to improve your Deployment Frequency reporting:

1. Utilize CI/CD tools: Leverage the capabilities of your CI/CD tool for deployment tracking.
2. Identify Production Deployments: Clearly differentiate deployments specific to your production environment.
3. Team-based Insights: Implement a team-level collection structure to categorize deployments by team for deeper analysis.

By following these recommendations, you can effectively track your deployment frequency and gain valuable insights into your team's software release process.

#### Configuration Examples for Profile Setup

1. **Comprehensive Pipeline Analysis:** Configure the profile to analyze pipelines with all statuses, paying special attention to Continuous Delivery pipelines if applicable. Set a specific timeframe to capture recent deployment activities accurately.
2. **Golden Pipeline Standardization:** If you have established a standard "golden" pipeline template, utilize Stage Variables for precise control. Associate services with each pipeline run for comprehensive tracking and analysis.
3. **Production Environment Monitoring:** Monitor deployments to production environments by capturing data on all pipeline executions linked to a specific production deployment stage, such as "deploy-prod".
4. **Alignment with Jira Releases (Not Recommended):** Although aligning deployment activities with Jira releases may provide insights into deployment frequency concerning software release cycles, it's not recommended due to potential complexities and overhead.
These configurations will help streamline your deployment frequency reporting process and provide valuable insights into your team's release activities.

#### Lead Time For Changes report

The Lead Time for Changes report measures the time it takes for a code commit to reach production. This report helps identify areas for improvement in your software delivery lifecycle.

Calculating Lead Time for Changes is similar to calculating standard lead time. However, DORA allows you to associate a specific collection with the Workflow profile. This enables detailed analysis of lead time for individual projects or teams.

#### Recommendations

* Maintain One-to-One PR Ticket Relationship: Ensure one pull request (PR) corresponds to one associated ticket in your issue management system (e.g., Jira). This creates a clear link between requested changes and deployed code.
* Complete the CI/CD Cycle: Every step in your continuous integration and continuous delivery (CI/CD) pipeline should be mapped with the stages in the workflow profile. This ensures all stages are covered as part of the metric calculation.
* Utilize Jira Releases for Tracking: Limit the use of Jira releases to track completed deployments or product releases.
  
Following these recommendations can refine your Lead Time for Changes report and provide more accurate insights into your development workflow's efficiency.
This report represents the amount of time it takes for a commit to get into production.

To add the **Lead Time for Changes** report to Insights:

1. Select Settings, and then select Add Widget.
2. Select the Lead Time for Changes widget.
3. Configure filters to refine conditions (e.g., Issue Resolved In for the last quarter) impacting overall lead time calculations.
4. Select Average time in the stage as the metric under the metrics tab.
5. Under the Settings tab, specify the relevant Workflow profile.
6. Select Next: Place Widget, place the widget on the Insight and then select Save Layout.

For information about other Lead Time reports, go to [Lead time reports](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/lead-time-reports).

#### Change Failure Rate report

The Change Failure Rate report represents the percentage of deployments that cause a failure in production.

To monitor the Change Failure Rate in SEI, you will again need to associate the widget with an existing workflow profile.

To add the **Change Failure Rate** report to Insights:

1. Select Settings, and then select Add Widget.
2. Select the Change Failure Rate widget.
3. Configure the widget settings. Similar to the Deployment Frequency report customizing the collection level filters redirects you to the Edit Collection tab.
4. Select Next: Place Widget, select where you want to place the widget on the Insight, and then select Save Layout.

The Change Failure Rate widget is now part of your Insight.

#### Recommendations

1. Identify and address potential issues by targeting pipelines deploying to production environments with specific failure statuses or run parameters. Utilize the same configuration parameters as deployment frequency analysis for normalization.
2. Mitigate risks by closely monitoring pipeline executions related to critical deployment stages, such as "deploy-prod", particularly focusing on instances of deployment failures or aborts.
3. Improve deployment reliability by tracking and analyzing all pipeline executions marked with a "Failed" status in relation to the overall deployment frequency, utilizing the deployment frequency configurations as a benchmark for comparison.

#### Mean Time To Restore (MTTR)​

The Mean Time To Restore (MTTR), also known as Time to Recover, represents the duration it takes for an organization to recover from a production failure. This metric serves as a valuable measure for evaluating the efficiency of the recovery process.

The overall time can be analyzed stage by stage over the organization's failure recovery workflow.

To add the DORA Mean Time To Restore report to the Insight:

1. Select Settings, and then select Add Widget.
2. Select the Mean Time To Restore widget.
3. Customize the widget by configuring filters. This step allows you to specify conditions (such as Issue Created In/Resolved In) that contribute to the overall calculations. In this case, we will add the Issue Resolved In filter to restrict our calculation only for the last quarter.
4. Select the metric as Average time in stage under the metrics tab
5. On the Settings tab, select the relevant Workflow profile.
6. Select Next: Place Widget, place the widget on the Insight, and then select Save Layout.

## DORA Best Practices

* Ensure that the selected DORA metrics align with your organization's overarching business goals and objectives.
* Standardize workflow profiles across teams to maintain consistency in metric tracking.
* Define workflow profile at a granular level to capture the entire software delivery lifecycle. This includes specifying events such as the exclusion of PRs and commits, events defining what constitutes a deployment or a failure for CI/CD jobs, and other crucial items to provide a comprehensive view of the deployment process.
* Customize collection filters within widgets carefully. These filters impact not only the widget but the collection as a whole. Optimize filters to focus on the specific aspects of your software development process that you want to analyze.

## Limitations

While DORA metrics offer valuable insights, some limitations require consideration, especially for larger teams and complex workflows.

### Deployment Frequency

* Limited Integration Support: Currently, the ability to calculate Deployment Frequency accurately is limited to CI/CD integrations.
* Recommendation: It is recommended to configure the profile to receive data for production-level deployments from the relevant CI/CD platform.

### Change Failure Rate

* Large Teams: Calculating a meaningful Change Failure Rate for large teams can be challenging due to the sheer volume of changes.
* Recommendation: Use collection-level filters and view reports at the individual team or project level (sub-collection) instead of the entire parent collection. This provides a more granular view of change failures and allows for targeted improvements.

* Limited Integration Support: Currently, the ability to calculate Change Failure Rate accurately is limited to CI/CD integrations that do not support correlation with Jira or the Source Code Manager.
* Recommendation: It is recommended to configure the profile to receive data for production-level deployments causing failure from the relevant CI/CD platform.

### Collection Integration

* Limited Collection Selection: Currently, the ability to associate a DORA profile with a collection is disabled if the collection lacks the necessary integration.
* Future Improvement: Support will be added for enabling the selection of any collection, regardless of existing integration, which would allow for greater flexibility and customization.

### DORA Widget Trends

* Inaccurate Trend Graphs: Existing propels may not accurately reflect trends for the DORA metrics after the profile is customized or modified.
* Future Improvement: Support will be added to implement the ability to add trend graphs across various timeframes within DORA widgets would provide valuable insights into changes over time and the effectiveness of implemented improvements.

### Good to know

#### Artifact Information Unavailability for Jenkins

Due to the limitations of the Jenkins Propelo plugin, if there is no artifact information available, the calculation of CI/CD Lead Time cannot be performed accurately since artifact generation and deployment times are essential for these metrics.

#### CI/CD Job Configuration for Jenkins

It is crucial to understand whether Jenkins has separate or combined jobs for CI and CD. The Lead Time calculations differ based on these configurations:

* If there is a single job for both CI and CD, Lead Time between CI and CD can be calculated.
* If there are separate jobs for CI and CD, Lead Time can only be accurately calculated up to the CI stage.

#### Deployment Strategy

Knowledge of the customer's deployment strategy is vital:

* If staging and production deployments are handled through the same Jenkins job, Lead Time can be extended to include Production.
* If different jobs are responsible for staging and production deployments, Lead Time is restricted to the Staging phase.

#### Branch Deployment Practices

The use of different branching strategies affects Lead Time calculation:

* If the customer uses a feature branch strategy and deploys from the main branch, Lead Time can be calculated up to the point where PR is merged into the main/master branch.
* If the customer creates a release branch from the main branch and manually deploys to production, Lead Time calculation is not feasible beyond the merge into the main/master branch.

#### Correlation Prerequisite

Accurate correlation between JIRA and SCM is contingent upon the inclusion of the JIRA ticket ID in the SCM commit message and PR title. If this information is missing, the correlation—and consequently, the Lead Time calculation—will be inaccurate.

#### Multiple Stages in CI/CD:

When multiple stages are present within the CI and CD pipelines (e.g., Unit Test, Vulnerability Check, Image Building, Staging Deployment, Pre-Prod Approval, Production Deployment), SEI treats the entire pipeline as a single stage. This approach may simplify the process but could also mask the time spent in each individual stage.

#### Integrations we support

* For Issue Management: we only support JIRA and Azure DevOps
* For SCM: GitHub, BitBucket, GitLab, Azure DevOps
* For CI and CD: 
  * Jenkins (via Propelo Plugin or WebHooks)
    * If integrated using the Plugin, you will get combined CICD Lead Time
    * If integrated using WebHooks, you will get CI and CD Lead Time separately 
  * Harness NG
    * By Default, we are able to split CI and CD
  * GitHub Actions
    * By Default, we are able to split CI and CD
  * Custom CICD
    * You can bring your own integration via WebHooks



