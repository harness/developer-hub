---
title: Lines of Code
description: How is Lines of Code metric calculated on SEI?
sidebar_label: Lines of Code
sidebar_position: 20
---

This topic provides a guide on how the Lines of Code metric is calculated on SEI.

The Lines of Code metric is a crucial indicator of developer productivity and codebase evolution over time. 

This metric is pivotal in measuring a developer's contribution, quantified by the total lines of code added, deleted, or changed in the selected time period. This serves as an indicator of developer productivity. 

According to industry standards, an ideal range for the LOC metric for an software engineer is between 125 and 185 lines of code per month. However, note that this range may vary depending on factors such as project complexity and coding conventions.



## Scope of Measurement across different reports

The Lines of Code metric is measured across two types of reports on SEI: Trellis Reports and SCM Reports.

### Trellis Reports

In Trellis Reports, the Lines of Code metric calculates the total number of lines of code contributed by an engineer within the selected time frame. The calculation includes the cumulative sum of lines of code added and lines of code changed by the respective engineer across commits. 

The metric value in the trellis report is normalized to show the average number of lines of code contributed per month. This gives a comprehensive view of the volume of work a developer contributes to a project each month.

In the Raw Stats report, the metric displays the total number of lines of code contributed by the engineer within the selected time frame.

To learn more, go to [Trellis Scores](/docs/category/trellis-scores).

### SCM Reports

The Lines of Code metric in SCM reports provides a more granular representation of a developer's contribution. The metric measures the total lines of code that are included in pull requests(For SCM PRs Report) and commits (For SCM Commits Reports). This includes:

* **Lines of Code Added:** It measures the new lines of code a developer adds for an associated pull request or commit in the respective report (i.e., SCM Commit Report and SCM PRs Report).
* **Lines of Code Deleted:** It measures the lines of code a developer deletes for an associated pull request.
* **Total Lines or Lines of Code Modified or Changed:** It measures the total lines of code changed as a result of the addition or deletion of lines for an associated pull request or commit in the respective report.

To learn more, go to [SCM Reports](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/scm-reports).

## Scope of Measurement across different platforms

SEI measures the total lines of code that are included in pull requests (PRs) across various SCM tools such as GitHub, Bitbucket, GitLab, and Azure DevOps. The calculation process varies depending on the tool used. 

### GitHub, Bitbucket, and GitLab

* **Merged Pull Requests (PRs):** SEI calculates the Lines of Code metric for merged PRs using the `merge SHA (Commit ID)`. This approach ensures accuracy by considering the final state of the codebase after merging, which includes the cumulative data of all code modifications. This consists of total lines added, deleted, and files changed as part of the merge commit.

* **PRs in `OPEN` or `CLOSED` States:** Lines of Code metrics for open and closed PRs are determined via the respective SCM tool's API. This includes the total count of lines added, deleted, and the number of files modifed in all the commits that make up the PR.

:::info

When using the `Rebase and Merge` strategy, the latest commit in the PR is recognized as the merge commit. This leads to incorrect calculations for the Lines of Code metric, as rebasing rewrites the commit history, which does not accurately reflect the actual changes made in the original commits and thus changes the count of lines added, deleted, or modified.

:::

* **SCM PRs reports:** Here the values for Lines Added, Lines Deleted, and Files Changed correspond to the lines of code added, deleted, and the respective files changed for the associated Pull Request. The Lines Changed field is calculated as the number of lines changed or modified, which is the summation of lines added and lines deleted as part of the associated pull request.

* **SCM Commits reports:** Here the values for Lines Added represent the lines of code added as part of the associated Commit. The Total Lines field is calculated as the total number of lines changed, which is the summation of lines added and lines deleted as part of the associated commit.

:::info

For SCM reports, the values for lines of code added and deleted are the same as those received from the SCM tool for the associated Pull Request or Commit. These values are not calculated by SEI.

* To receive the files changed data, make sure you have set the `fetch_commit_files` key in your integration configuration to `Yes`. This will enable SEI to retrieve the necessary data from the SCM tool.

* For BitBucket Cloud and Server to recieve the data for Lines added and Lines deleted for the associated pull request or commit make sure you have set the `fetch_commit_files` key in your integration configuration to `Yes`. This will enable SEI to retrieve the necessary data from the SCM tool.

:::

### Azure DevOps

There are currently some known issues with all SCM reports for the Azure DevOps integrations. As a result, the data for SCM metrics such as `Lines of Code` and `Files Changed` may be displayed as either zero or incorrect. This issue will be fixed in future releases.

<!---
* **Lines of Code Metric for PRs:** For all types of PRs, the Lines of Code metrics are determined by summing the lines of code added, and changed across all associated commits for a particular Pull Request. This method provides a comprehensive view of the changes made in each individual commit and their overall impact on the codebase.
* **SCM PRs reports:** Here the values for Lines Added and Lines Deleted are calculated as the sum of the respective values from each commit associated with a pull request. The Lines Changed field is calculated as the number of lines changed or modified, which is the summation of Lines added and Lines deleted fields as calculated for the associated pull request.
* **SCM Commits reports:** Here the values for Lines Added are represent the lines added as part of the associated commit. The Total Lines field is calculated as the total number of lines changed, which is the summation of lines added and lines deleted as part of the associated commit.

-->

:::info

Commits encompassing more than 256 files are automatically excluded from the calculation.

:::

## Calculation example

Let's consider a scenario with multiple PRs and commits:

### Developer A worked on 3 PRs last month on Github

- **PR #1 (Merged):** This PR had two commits, with the merge commit resulting in 100 lines added and 50 lines deleted. Therefore, the total lines of code changed was 150.
- **PR #2 (Open):** It consisted of four commits, adding a total of 150 lines and deleting 75. The total lines of code changed amounted to 225 lines.
- **PR #3 (Closed):** This included one commit with 20 lines added and 10 deleted, making the total lines of code changed 30 lines.


| Pull Request | PR Status | Commit | Number of Lines added | Number of Lines deleted | Number of Lines changed |
| --- | --- | --- | --- | --- | --- |
| PR #1 | Merged | Merge Commit | +100 | -50 | 150 |
| PR #2 | Open | Commit #1 | +30 | -10 | 40 |
| PR #2 | Open | Commit #2 | +25 | 0 | 25 |
| PR #2 | Open | Commit #3 | +15 | -5 | 20 |
| PR #2 | Open | Commit #4 | +80 | -60 | 140 |
| PR #3 | Closed | Commit #1 | +20 | -10 | 30 |

:::info

For SCM reports, the values for lines of code added and deleted are the same as those received from the SCM tool for the associated Pull Request or Commit. These values are not calculated by SEI.

:::


The calculations for Developer A in the SCM reports are:

#### SCM PR Reports

| Associated PR | Lines Added | Lines Deleted | Lines Changed | Files Changed |
| - | - | - | - | - |
| PR #1         | 100         | 50            | 150           | 4             |
| PR #2         | 150         | 75            | 225           | 6             |
| PR #3         | 20          | 10            | 30            | 3             |

#### SCM Commits Report

| Associated Commit | Lines Added | Lines Deleted | Lines Changed | Files Changed |
| - | - |- | - | - |
| Commit #1 (PR #1) | 100         | 50            | 150           | 4             |
| Commit #1 (PR #2) | 30          | 10            | 40            | 2             |
| Commit #2 (PR #2) | 25          | 0             | 25            | 1             |
| Commit #3 (PR #2) | 15          | 5             | 20            | 1             |
| Commit #4 (PR #2) | 80          | 60            | 140           | 5             |
| Commit #1 (PR #3) | 15          | 5             | 20            | 2             |

<!---


### Developer B worked on 3 PRs last month on Azure Repos

Let's consider a scenario with multiple PRs and commits to understand how LoC is calculated for ADO:

- **PR #1 (Merged):** This PR had two commits, resulting in 50 lines added and 20 lines deleted. Therefore, the total lines of code changed was 70.
- **PR #2 (Open):** It consisted of four commits, adding a total of 120 lines and deleting 35. The total lines of code changed amounted to 155 lines.
- **PR #3 (Closed):** This included one commit with 15 lines added and 5 deleted, making the total lines of code changed 20 lines.

| Pull Request | PR Status | Commit | Number of Lines added | Number of Lines deleted | Number of Lines changed |
| - | - | - | - | - | - |
| PR #1 | Merged | Merge Commit | +50 lines added | -20 lines deleted | 70 lines |
| PR #2 | Open | Commit #1 | +30 lines added | -10 lines deleted | 40 lines |
| PR #2 | Open | Commit #2 | +25 lines added | 0 lines deleted | 25 lines |
| PR #2 | Open | Commit #3 | +15 lines added | -5 lines deleted | 20 lines |
| PR #2 | Open | Commit #4 | +50 lines added | -20 lines deleted | 70 lines |
| PR #3 | Closed | Commit #1 | +15 lines added | -5 lines deleted | 20 lines |

The calculations for Developer B in the SCM reports are:

#### SCM PR Reports

| Metric | Associated PR | Value |
| --- | --- | --- |
| Lines Added | PR #1 | 50 |
| Lines Deleted | PR #1 | 20 |
| Lines Changed | PR #1 | 70 |
| Files Changed | PR #1 | 3 |
| Lines Added | PR #2 | 30+25+15+50 = 120 |
| Lines Deleted | PR #2 | 10+0+5+20 = 35 |
| Lines Changed | PR #2 | 40+25+20+70 = 155 |
| Files Changed | PR #2 | 5 |
| Lines Added | PR #3 | 15 |
| Lines Deleted | PR #3 | 5 |
| Lines Changed | PR #3 | 20 |
| Files Changed | PR #3 | 2 |


#### SCM Commits Report

The values for Lines Added in the SCM commits report are the same as lines added as part of the associated commit. The Total Lines field is calculated as the total number of lines changed or modified i.e sum of lines added and deleted as part of the associated commit.

### Developer C is working on an Open PR with an existing PR that is merged on Azure Repos

Consider a developer working on an open PR with several commits and a merged PR on ADO:

| Pull Request | PR Status | Commit | Number of Lines added | Number of Lines deleted | Net contribution |
| - | - | - | - | - | - |
| PR #1 | Open | Commit #1 | +30 lines added | -10 lines deleted | 40 lines |
| PR #1 | Open | Commit #2 | +25 lines added | 0 lines deleted | 25 lines |
| PR #1 | Open | Commit #3 | +15 lines added | -5 lines deleted | 20 lines |
| PR #1 | Open | Commit #4 | +50 lines added | -20 lines deleted | 70 lines |
| PR #2 | Merged | Merge Commit | +10 lines added | -5 lines deleted | 15 lines |

The calculations for Developer C in the SCM reports are:

#### SCM PR Reports

| Metric | Associated PR | Value |
| - | - | - |
| Lines Added | PR #1 | 30+25+15+50 = 120  |
| Lines deleted | PR #1 | 10+5+20 = 35 |
| Lines changed | PR #1 | 40+25+20+70 = 155 |
| Files changed | PR #1 | 2 |
| Lines Added | PR #2 | 10 |
| Lines deleted | PR #2 | 5 | 
| Lines changed | PR #2 | 15 |
| Files changed | PR #2 | 1 |

#### SCM Commits Report

The values for Lines Added in the SCM commits report are the same as lines added as part of the associated commit. The Total Lines field is calculated as the total number of lines changed or modified i.e sum of lines added and deleted as part of the associated commit.

This example demonstrates how each commit within an open PR contributes to the total LoC for Azure Repos.

-->
