---
title: SCM reports
description: These widgets show metrics related to SCM activity.
sidebar_position: 20
---

SCM reports help you analyze activity in your SCM tools, including:

* Individual developer contributions.
* Volume of rework and other code changes.
* Lead time and activities related to PRs and SCM issues.
* Review collaboration.
* Most active repositories and files.

Reports can be filtered by project, repository, time range, and other data points, depending on your SCM [integrations](/docs/software-engineering-insights/sei-integrations/sei-integrations-overview).

## SCM Code Activity Reports

Use SCM code activity reports to analyze direct coding activity in your SCM tool, such as volume of commits, coding days, types of files modified, rework, and activity in each repository.

* **SCM Coding Days Report:** A coding day is any day where a developer commits code.
* **SCM Coding Days Single Stat:** Report a single stat related to coding days. Numeric values are calculated to two decimal places.
* **SCM Commits Report:** Analyze commit activity, such as number of commits per month.
* **SCM Commits Single Stat:** Report a single stat related to commit activity.
* **SCM Committers Report:** Analyze the volume of code changes by committer.
* **SCM File Types Report:** Analyze commit and PR activity by file extension.
* **SCM Files Report:** Identify code areas with a high frequency of changes. You can use this to make sure that your hottest code areas have good test coverage.
* **SCM Repos Report:** Volume of changes by repository. You can use this to identify your most active repositories.
* **SCM Rework Report:** Rework measures changes to previously-written code.

:::info Trellis Scores

Some code velocity metrics contribute to [Trellis Scores](/docs/category/trellis-scores):

* Coding days are part of the **Speed** factor.
* Number of commits per month is part of the **Volume** factor.
* Percentage of rework determines the **Quality** factor.

:::

## SCM Coding Days Report

### Definition

The SCM Coding Days widget is used for tracking developer engagement by measuring the number of unique days on which they actively commit code changes. It's a useful metric to understand individual and team coding habits, as well as sprint and release planning. The report displays the coding days count based on the selected metric in the widget settings.

### Add the report

#### Step 1: Add the widget

* Select **Settings**, then **Add Widget**.
* Choose the **Coding Days report** widget.

The following settings are available to configure this report:

#### Step 2: Configure the Filters on the widget

Select attributes that you want to use to filter the data, and then select filter values and operators.

* Select and configure the **Time Range** for defining the criteria for when the code was committed.
* Add additional conditions to specify what data feeds into the widget by creating inclusive and exclusive filters.
* If you include multiple filters, they are inherently combined with an `AND` operator.

#### Step 3: Select the Metrics to measure on the widget

Select a metric to use for the Y-axis. The SCM Coding Days Report can be configured to track the following metrics:

* **Average Coding Days Per Week:** The average number of days per week where code commits were made. A minimum of 7 days is required to calculate this metric.
* **Median Coding Days Per Week:** The median number of days per week where code commits were made. A minimum of 7 days is required to calculate this metric.
* **Average Coding Days Per Two Weeks:** The average number of days over a two-week period where code commits were made. A minimum of 14 days is required to calculate this metric.
* **Median Coding Days Per Two Weeks:** The median number of days over a two-week period where code commits were made. A minimum of 14 days is required to calculate this metric.
* **Average Coding Days Per Month:** The average number of days per month where code commits were made. A minimum of 28 days is required to calculate this metric.
* **Median Coding Days Per Month:** The median number of days per month where code commits were made. A minimum of 28 days is required to calculate this metric.

#### Step 4: Configure the Aggregations for the widget

Select the attribute to use for the X-axis. For example, if you selected the **Average Coding days per week** metric for the Y-axis, you could select **Committer** for the X-axis. Additional examples of X-axis dimensional attributes include **Author** and **Repo ID.**

#### Step 5: Configure the Settings

* Select how you want to sort X-axis data, such as ascending or descending.
* Select the maximum number of values to show on the X-axis.

#### Step 6: Save the widget

Complete the widget settings and select **Next: Place Widget**, place the widget on Insight and then select **Save Layout**.

### Calculation

The report displays the coding days count based on the selected settings in the widget configuration. 
It is recommended to configure the widget settings to measure the **Total Coding Days** for an individual developer. This will help display the count of the days on which the developer made code commits.

To learn more, go to [SCM Coding Days Report Calculation](#)

:::info
**What data is included in Coding Days?**

A day with a Commit counts as a Coding Day if the commit is:

* A direct commit to the default branch.
* Not a merge commit.
* Not in a deleted branch

A day with a Pull Request as a Coding Day if:

* The PR is opened against the default branch.
* If a PR from a feature branch is merged into the default branch.
:::

## SCM Rework Report

### Definition

The **SCM Rework widget** helps in tracking and analyzing the changes made to the existing codebase. It focuses on understanding how much of the code has been reworked, which can be a signal for the need for refactoring, the quality of the original code, or the adaptability to changing requirements.

* **Total Refactored Lines:** The number of lines in the code that have been recently modified or refactored.
* **Total Legacy Rework Lines:** The number of lines that were part of the older code (legacy code) and have been recently modified.
* **Total New Lines:** The number of newly added lines to the codebase.

To learn more, go to [SCM Rework Calculation](#)

The definition for what is considered a **Legacy Code** is configured under the widget settings. By default, this configuration for **Legacy Code** in the report is set to be **Older than the last 30 days.**

### Add the report

#### Step 1: Add the widget

* Go to the Insight where you want to add the widget. Make sure you are in the correct project.
* Select **Settings**, and then select **Add Widget**.
* Select the **SCM Rework report** widget.

The following settings are available to configure this report:

#### Step 2: Configure the Filters on the widget

* Add conditions i.e. **Filters** to specify what data feeds into the widget by creating inclusive and exclusive filters.
* If you include multiple filters, they are inherently combined with an `AND` operator.

#### Step 3: Define the Aggregations for the widget

Select a metric to use for the X-axis. The following fields can be added on the X-axis of the widget:

* **Author:** The developer who originally wrote the code that has been reworked.
* **Commit Month:** The month in which the commits were made.
* **Commit Week:** The starting date of the week in the year when the commits were made.
* **Committer:** The person who officially committed the rework changes to the repository, which could be different from the original Author.
* **File Type:** The type of file that was modified, such as `java`, `json`, `tsx`, etc.
* **Project:** The repository to which the changes were added.
* **Repo ID:** This field is identical to the Project field and displays the repository to which the changes were added.

#### Step 4: Configure the Settings

* Define the **Time Range** for **Legacy Code**. This code that hasn't been modified in a long time is usually considered as the Legacy Code. 
* Select the visualization style for the widget, i.e. either the **Stacked Bar Chart** or **Percentage Stacked Bar Chart**.

#### Step 6: Save the widget

Complete the widget settings and select **Next: Place Widget**, place the widget on Insight and then select **Save Layout**.

### Calculations

The widget displays the following fields.

#### Legacy Refactored Lines

The number of lines that were part of the older code (legacy code) and have been recently modified.

#### New Lines

The number of lines that are newly added to the codebase.

#### Total Refactored Lines

The number of lines in the code that have been recently modified or refactored.

#### Total Lines

The Total lines changed is the summation of the total number of lines added and the total number of lines deleted.

#### Percentage of Rework

The **Percentage of Rework** metric helps in understanding the proportion of the codebase that has undergone recent modifications. This metric's value is calculated as the **Total Refactored Lines of Code** divided by the **Total lines changed**, multiplied by **100**.

The higher the value, the more frequently changes are being made to the codebase. This may suggest possible issues with initial code quality or changing requirements.

```bash
Percentage of Rework = Total Refactored Lines of Code / Total lines changed * 100
```

#### Percentage of Legacy Rework

The **Percentage of Legacy Rework** metric provides insight into the extent of modifications done on older segments of the codebase. This metric's value is calculated as **Total Legacy Lines of Code** divided by **Total lines changed**, multiplied by **100**.

A high value of this metric suggests that a significant portion of the codebase is old and has undergone recent modifications, which may indicate the need for refactoring and improving the code quality.

```bash
Percentage of Legacy Rework = Total Legacy Lines of Code / Total lines * 100
```

To learn more, go to [SCM Rework Calculation](#)

## SCM Committers Report​

### Definition

With the **SCM Committers Report**, you can analyze the following data for each committer in the Collection.

* The number of PRs they have worked on.
* The number of commits they've made.
* The number of lines of code they have contributed.

This information helps you with:

* **Accountability and Transparency:** Establish accountability by identifying the individuals responsible for making changes to source code, and provide transparency by showing who contributed to a project.
* **Project Management and Resource Allocation:** Understand the contributions of individual developers.
* **Performance Evaluation and Recognition:** Evaluate the performance of individual developers or teams based on their contributions to a project.

### Add the report

#### Step 1: Add the widget

* Go to the Insight where you want to add the widget. Make sure you are in the correct project.
* Select **Settings**, and then select **Add Widget**.
* Select the **SCM Committers report** widget.

The following settings are available to configure this report:

#### Step 2: Configure the Filters for the widget

* Add conditions i.e. **Filters** to specify what data feeds into the widget by creating inclusive and exclusive filters.
* If you include multiple filters, they are inherently combined with an `AND` operator.

#### Step 3: Select the Metrics to measure on the widget

Select all the metrics that you want to display in the widget. This widget can be configured for the following metrics:

* **Number of Lines Changed:** The total number of lines of code added and removed by the committer.
* **Number of Commits:** The number of commits made by the committer.
* **Number of PRs:** The number of pull requests the committer has worked on.
* **Number of Issues:** The number of issues the committer has been assigned with.
* **Number of Lines Added:** The number of lines of code added by the committer.
* **Number of Lines Removed:** The number of lines of code removed by the committer.
* **Tech Breadth:** The number of unique programming languages or technologies the committer has contributed to.
* **Repo Breadth:** The number of unique repositories the committer has contributed to.
* **File Extensions:** The number of unique file extensions the committer has contributed to.

#### Step 4: Save the widget

Complete the widget settings and select **Next: Place Widget**, place the widget on Insight and then select **Save Layout**.

## SCM to CI/CD jobs reports​

* **SCM Commit to CI/CD Job Lead Time Trend Report:** Analyze the time taken to deploy commits to production. This can help you improve commit-to-deployment lead time.
* **SCM Commit to CI/CD Job Lead Time Single Stat:** Report a single state related to commit-to-deployment lead time.
* **SCM Change Volume to CI/CD Job Trend Report:** Analyze the frequency and volume of deployed code changes. You can use this report to correlate increases in quality issues with the volume of deployed changes.
* **SCM Change Volume to CI/CD Jobs Single Stat:** Report a single stat related to the frequency or volume of deployed code changes.
* **Code Volume Vs. Deployment Report**

For more information about CI/CD job reports, go to [CI/CD job reports](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/ci-cd-reports).

## SCM Issues reports​

:::info
Note that these reports are not well supported and are not recommended to be used at this stage.
:::

Use SCM issues reports to analyze data related to the volume and lifetime of issues from the **Issue Management** tool with your **SCM** tool.

### Issue volume​

* **SCM Issues Report:** Analyze the number of issues by time, label, or other categories.
* **SCM Issues Count Single Stat:** Report a single stat related to the number of issues.
* **SCM Issues Trends Report:** Analyze changes over time in the volume of issues.

### Issue first response lead time​

First response lead time is measured as the time elapsed between issue creation and when someone, other than the reporter, comments on the issue.

* **SCM Issues First Response Report:** Analyze the creation-to-first-response lead time for issues.
* **SCM Issues First Response Single Stat:** Report a single stat related to first response lead time.
* **SCM Issues First Response Trends Report:** Analyze changes over time for first response lead time.

### Issue resolution time​

Use the **SCM Issues Resolution Time Report** to analyze the overall time taken to close issues considering the SCM activity.

### Issue cycle time​

The **SCM Issues Time Across Stages Report** analyzes cycle time for issues. You can configure this widget by **Project**, **Repository**, or other parameters to help you identify the Kanban state where issues spend the most time.

This report only supports issue cycle time data from GitHub integration.

## Pull Request Activity Reports

Use the SCM PR reports to analyze data related to Pull Requests (also known as Merge Requests).

* **[SCM PRs Report](#scm-prs-report):** A high-level view of PRs moving through your SCM tool.
* **SCM PRs Single Stat:** Report a single stat related to PR activity.
* **SCM PRs First Review To Merge Trends:** Examine the time that passes between a PR's first review and when it is merged.
* **SCM PRs First Review To Merge Trend Single Stat:** Examine a single stat related to first-review-to-merge time.
* **SCM PRs First Review Trends**
* **SCM PRs First Review Trend Single Stat**
* **[SCM PR Lead Time by Stage Report](#scm-pr-lead-time-by-stage-report):** Examine lead time based on your defined PR lifecycle stages. By default, this report shows the average time for all PRs. You can drill down to explore data for individual PRs.
* **SCM PR Lead Time Trend Report:** Examine trends in PR lead-time-by-stage.
* **SCM PRs Merge Trends:** Analyze trends in lead time to merge PRs.
* **SCM PRs Merge Trend Single Stat:** Report a single stat related to lead time to merge PRs.
* **SCM PRs Response Time Report**
* **SCM PRs Response Time Single Stat**
* **SCM Review Collaboration Report:** Analyze how a team performs code reviews by examining whether PRs were approved before being merged or closed.
* **SCM File Types Report:** Analyze commit and PR activity by file extension.
* **PR Activity:** Generic PR activity report.

To examine PRs by committer, use the [SCM Committers Report](#scm-committers-report).

To understand how lead time is calculated, go to [PR lead time calculation](#pr-lead-time-calculation).

## SCM PR Lead Time by Stage Report

### Definition

The SCM PR Lead Lead Time by Stage Report widget provides insights into the efficiency and velocity of your team's pull request (PR) processes by analyzing the time spent at various stages of the PR lifecycle. By default, this report shows the average time for all PRs. You can drill down to explore data for individual PRs. You can also configure this report to show the median, 90th percentile, or 95th percentile, instead of the average time.

**Lead time** is calculated based on the time spent in stages defined in a [**Workflow Profile (Velocity Lead Time profile)**](#)

### Add the report

#### Step 1: Add the widget

* Go to the Insight where you want to add the widget. Make sure you are in the correct project.
* Select **Settings**, and then select **Add Widget**.
* Select the **SCM PR Lead Time by Stage Report** widget.

The following settings are available to configure this report:

#### Step 2: Configure the Filters on the widget

* Add conditions to specify what data feeds into the widget by creating inclusive and exclusive filters.
* If you include multiple filters, they are inherently combined with an `AND` operator.

#### Step 3: Select the Metrics to measure on the widget

Select the metric that you want to display on the widget stages. You can select either of the following metrics:

* **90th percentile time in stage:** Displays the 90th percentile of the time taken by pull requests in the specific stage
* **95th percentile time in stage:** Displays the 95th percentile of the time taken by pull requests in the specific stage
* **Average time in stage:** Displays the average time taken by pull requests in the specific stage
* **Median time in stage:** Displays the median time taken by pull requests in the specific stage

#### Step 3: Configure the Settings

* Select the [Workflow Profile](/docs/software-engineering-insights/sei-profiles/workflow-profiles/workflow-profile-overview) that you want to use for this widget. Available options are based on the configured [Workflow Profiles](/docs/software-engineering-insights/sei-profiles/workflow-profiles/workflow-profile-overview) in the SEI account.
* Select how you want to apply the filters in the widget. You can either choose to **Apply Filters Only For The Initial Node** or **Apply Filters To All Nodes**.

#### Step 4: Save the widget

Complete the widget settings and select **Next: Place Widget**, place the widget on Insight and then select **Save Layout**.

### Calculations

Overall lead time is the sum of the time spent in each stage in a workflow.

```bash
Total PR Lead Time = First PR Creation Time + First Time to Comment + First Approval Time + Last PR Merge Time
```

#### PR Creation Time

This is the duration between the first commit in a repository and the creation of the first pull request that includes this commit. It reflects how promptly changes are proposed for review after initial development.

#### Time to Comment

This metric measures the duration from the moment a pull request is created to the time the first comment is made on it. It's an indicator of the engagement and response time of the team or reviewers.

#### Approval Time

This measures the time taken from the creation of a pull request to its first approval. It's a measure of how quickly a PR is reviewed and approved by the team.

#### Merge Time

This is the time taken to merge the first pull request after it has been created. It indicates the speed at which changes are integrated into the main branch.

:::info
When calculating **Lead Time**, the time spent in each stage depends on the stages that a PR actually goes through. For example: if the [Workflow profile](/docs/software-engineering-insights/sei-profiles/workflow-profiles/workflow-profile-overview) includes a **Time to Comment** stage, but there are no comments on the PR, then the **Time to Comment** is zero.
:::

<details>

<summary>SCM PR Lead Time calculation example #1</summary>

For this example, assume the following series of events occurs:

1. Contributor makes a commit (`Commit created event`).
2. Contributor creates a Pull Request (`Pull Request created event`).
3. The Pull Request is approved by an approver (`Pull Request approval event`).
4. The Pull Request is merged to the repository (`Pull Request Merged event`).

As a result the following calculations are made:

* PR creation time = Pull Request created event - Commit created event
* Time to first comment = Pull Request approval event - Pull Request created event
* Approval Time = 0
* Merge Time = Pull Request Merged event - Pull Request approval event

Approval Time is calculated as `0` because there were no review comments made on the PR.

</details>

<details>

<summary>SCM PR Lead Time calculation example #2</summary>

For this example, assume the following series of events occurs:

1. Contributor makes a commit (`Commit created event`).
2. Contributor creates a pull request (`Pull Request created event`).
3. Reviewer adds a comment (`Review1 event`).
4. The Pull Request is approved by an approver (`Pull Request approval event`).
5. The Pull Request is merged to the repository (`Pull Request Merged event`).

As a result, the following calculations are made:

* PR creation time = Pull Request created event - Commit created event
* Time to first comment = Review1 event - Pull Request created event
* Approval Time = Pull Request approval event - Review1 event
* Merge Time = Pull Request Merged event - Pull Request approval event

</details>

<details>

<summary>SCM PR Lead Time calculation example #3</summary>

For this example, assume the following series of events occurs:

1. Contributor makes a commit (`Commit created event`).
2. Contributor creates a pull request (`Pull Request created event`).
3. Reviewer adds a comment (`Review1 event`).
4. Reviewer adds a comment (`Review2 event`).
5. Reviewer adds a comment (`Review3 event`).
6. The Pull Request is approved by an approver (`Pull Request approval event`).
7. The Pull Request is merged to the repository (`Pull Request Merged event`).

As a result, the following calculations are made:

* PR creation time = Pull Request created event - Commit created event
* Time to first comment = Review1 event - Pull Request created event
* Approval Time = Review3 event - Review1 event
* Merge Time = Pull Request Merged event - Pull Request approval event

</details>

## SCM Review Collaboration Report

### Definition

The **SCM Review Collaboration report** widget is designed to provide visibility into the code review process within a software development team. It displays various metrics related to peer review activities, such as the number of reviews done, the collaboration levels, and adherence to code review practices.

This report can help you determine if a team is adopting a buddy system culture, where peers regularly review each other's code, or if the team is overwhelmed by code reviews and merging code without proper approval.

### Add the report

#### Step 1: Add the widget

* Go to the Insight where you want to add the widget. Make sure you are in the correct project.
* Select **Settings**, and then select **Add Widget**.
* Select the **SCM Review Collaboration report** widget.

The following settings are available to configure this report:

#### Step 2: Configure the Filters on the widget

This widget can be configured to track **PRs merged** or **PRs closed** by the team, along with other **Filters** such as **Destination Branch**, **Project**, and so on.

#### Step 4: Save the widget

Complete the widget settings and select **Next: Place Widget**, place the widget on Insight and then select **Save Layout**.

### Calculation

The report displays information about the **PR author** and the **Approver** details in each **Collaboration State**. The **Collaboration State** can be defined as the state in which the code is committed.

#### Assigned Peer Approved

The count of pull requests (PRs) that have been approved by a peer who was assigned to review the Pull Request.

#### Unapproved

The count of Pull Requests that have been closed without any peer approval.

#### Unassigned Peer Approved

The count of Pull Requests that have been approved by a peer who was not explicitly assigned to review the PR.

:::info
Note that when a Pull Request is created, and if the repository maintainers are automatically added as reviewers, SEI categorizes such type of Pull Request as **Unassigned Peer Approved**.
:::

#### Self Approved

The count of Pull Requests that have been approved by the creator of the PR.

#### Self Approved With Review

The count of PRs that have been approved by the creator of the PR after some form of peer review.

The drill-down view shows data for each author based on the selected columns and collaboration state. The data is grouped by iterating over each record, and the color coding is based on the number of pull requests. This helps to visualize and understand the collaboration status of each author.

## SCM PRs Report

### Definition

The **SCM PRs Report** shows a high-level view of PRs moving through your SCM tool. This is a versatile report that analyzes different attributes in the development process through your SCM tool. You can configure this report to inspect data by **Assignee**, **Destination Branch**, **Reviewer**, **Repository**, and more. For example, you can use this report to:

* Analyze how many PRs each developer raises.
* Analyze PR comments and categorize them based on a threshold.
* Better understanding of the overall contribution of the team.

### Add the report

#### Step 1: Add the widget

* Go to the Insight where you want to add the widget. Make sure you are in the correct project.
* Select **Settings**, and then select **Add Widget**.
* Select the **SCM PRs report** widget.

The following settings are available to configure this report:

#### Step 2: Configure the Filters on the widget

* Add conditions i.e. **Filters** to specify what data feeds into the widget by creating inclusive and exclusive filters.
* If you include multiple filters, they are inherently combined with an `AND` operator.

#### Step 3: Define the Aggregations for the widget

* **X-Axis:** Select the metric to use for the X-axis. Find the list of the supported metrics under the calculation section.
* **Stacks:** Select how you want to group data in each X-axis dimension. For example, if you select **Repo ID** for the X-axis and stack by **Assignee**, then data in each X-axis column are grouped by the Assignee.

#### Step 4: Configure the Settings

* Select the maximum number of values to show on the X-axis.
* Select the visualization style for the widget, such as **Bar Chart**, **Pie Chart**, **Line Chart**, **Smooth Area Chart** or **Stacked Smooth Area Chart**.
* Define the settings for measuring **Code Change Size** and **Comment Density** in the **Pull Requests**. Note that these settings will apply only when the metric selected is **Code Change Size** or **Comment Density**.

#### Step 5: Save the widget

Complete the widget settings and select **Next: Place Widget**, place the widget on Insight and then select **Save Layout**.

### Use Case 1: Comment Density

The **PR Comment Density** is a metric that provides insight into the level of collaboration and code review activity occurring within your software development process. It is typically configured as part of the SCM PRs Report.

* In the **SCM PRs Report** widget settings, under the **Aggregations** tab, set the dimension for the **X-axis** as **PR comment density**. This means that the focus of the widget is on analyzing the distribution of PRs based on their comment density.
* On the **Settings** tab, you can set threshold values for the **PR comment density**. This is useful if you want to exclude small PRs. Here, you can define and set `shallow`, `good`, and `heavy` density thresholds based on the number of comments per file.

### Calculation

The report displays the number of pull requests by categorizing them into `shallow`, `good`, and `heavy` labels according to the density thresholds defined in the widget settings.

The **PR Comment Density** metric is calculated by dividing the **Total Number of Comments** by the **Total Number of Files Changed** in a given PR.

```bash
PR Comment Density = Total Number of Comments / Total Number of Files Changed
```

For example, if a PR has changes in **4 files** and there are **16 comments** on the PR, the **PR Comment Density** would be calculated as **16/4 = 4**

### Use Case 2: Code Change Size

The **Code Change Size** metric is used to understand the size and complexity of code changes in **Pull Requests.** It is typically configured as part of the SCM PRs Report.

* In the **SCM PRs report** settings, under the **Aggregations** tab, set the dimension for the **X-axis** as **Code Change Size**. The X-axis determines the focus of the widget.
* On the **Settings** tab, you can set thresholds for the change in **Code Size** for a PR. This is useful if you want to exclude small PRs. Here, you can define and set `small`, `medium`, and `large` size thresholds based on **Lines of Cod**e changed or the **Number of Files** changed.

### Calculation

The report displays the number of **Pull Requests** by categorizing them into **Small**, **Medium**, and **Large** labels according to the **Code Change Size** thresholds defined in the widget settings.

The **Code Change Size** metric is calculated as follows:

* When configured the **Calculation Unit** as **Files** the report categorizes PR into the threshold labels based on the **Number of Files Changed** as per the defined widget settings.

```bash
Code Change Size = Total Number of Files changed as part of the PR
```

* When configured the **Calculation Unit** as **Lines of Code** the report categorizes PR into the threshold labels based on the **Number of Lines Changed** as per the defined widget settings.

```bash
Code Change Size = Total Number of Lines changed as part of the Pull Request
```