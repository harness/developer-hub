---
title: Lines of Code
description: How is Lines of Code metric calculqted on SEI?
sidebar_label: Lines of Code
sidebar_position: 20
---

This topic provides a guide on how the Lines of Code metric is calculated on SEI.

The Lines of Code metric is a crucial indicator of developer productivity and codebase evolution over time. 

This metric is pivotal in measuring a developer's contribution, quantified by the total lines of code added, deleted, or changed usually within a 30-day period. This serves as an indicator of developer productivity. The industry standard suggests an ideal range of 125 to 185 lines of code each month.

## Scope of Measurement across different reports

### Trellis Reports

The Lines of Code metric in the Trellis Report calculates the number of lines of code contributed by an engineer within the last 30 days. The metric value is calculated as the cumulative sum of Lines of Code added and Lines of Code changed by the respective engineer in the last 30 days across PRs and commits. This is crucial for understanding the volume of work a developer contributes to a project in the last one month. To learn more, go to [Trellis Scores](../../sei-metrics-and-reports/trellis-score.md).

### SCM Reports

The Lines of Code metric in SCM reports provides a more granular representation of a developer's contribution. The metric measures the total lines of code that are included in pull requests and commits. This includes:

* **Lines of Code Added:** It measures the new lines of code a developer adds for an associated pull request or commit in the respective report (i.e., SCM Commit Report and SCM PRs Report).
* **Lines of Code Deleted:** It measures the lines of code a developer deletes for an associated pull request.
* **Total Lines or Lines of Code Modified or Changed:** It measures the total lines of code changed as a result of the addition or deletion of lines for an associated pull request or commit in the respective report.

To learn more, go to [SCM Reports](../../sei-metrics-and-reports/velocity-metrics-reports/scm-reports.md).

## Scope of Measurement across different platforms

SEI measures the total lines of code that are included in pull requests (PRs).

### GitHub, Bitbucket, and GitLab

* **Merged Pull Requests (PRs):** Harness SEI calculates the Lines of Code metric for merged PRs using the `merge SHA (Commit ID)`. This ensures accuracy by considering the final state of the codebase after merging which considers the cumulative data of all code modifications. This includes total lines added, deleted, and modified as part of the merge commit.

* **PRs in `OPEN`, `CLOSED`, or `DRAFT` States:** Lines of Code metrics for PRs are determined via the respective SCM tool's API. This includes the total count of lines added, deleted, changed, and the number of files modifed in all the commits that make up the PR.

:::info

When using the `Rebase and Merge` strategy, the latest commit in the PR is recognized as the merge commit. This leads to incorrect calculations for the Lines of Code metric, as rebasing rewrites the commit history, which does not accurately reflect the actual changes made in the original commits and thus changes the count of lines added, deleted, or modified.

:::

### Azure DevOps

For all types of PRs, the Lines of Code metrics are determined by summing the lines of code added, modified, and changed across all associated commits for a particular Pull Request. This method provides a comprehensive view of the changes made in each individual commit and their overall impact on the codebase.

:::info

Commits encompassing more than 256 files are automatically excluded from the calculation.

:::

## Calculation example

Let's consider a scenario with multiple PRs and commits:

### Developer A worked on 3 PRs last month on Github

- **PR #1 (Merged):** This PR had two commits with a total of 50 lines added and 20 lines deleted. The lines of code changed were 10.
- **PR #2 (Open):** It consisted of four commits, adding 120 lines and deleting 35. The lines of code changed were 70.
- **PR #3 (Closed):** This included one commit with 15 lines added and 5 deleted. The lines of code changed were 6.

The total lines of code calculated for Developer A in the Trellis report is:

| Metric | Calculation | Value |
| - | - | - |
| Lines of Code (Trellis) | 50+10 (from PR #1) + 120+70 (from PR #2) + 15+6 (from PR #3) | 271 |

* For SCM PRs reports, the values for Lines Added, Lines Deleted, Lines Changed, and Files Changed correspond to the lines of code added, deleted, changed, and the respective files changed for the associated Pull Request.
* For SCM Commit reports, the values for Lines Added and Total Lines represent the lines of code added and the lines of code changed as part of the associated Commit.

:::info

For SCM reports, the values for lines of code added, deleted, and changed are the same as those received from the SCM tool for the associated Pull Request or Commit. These values are not calculated by SEI.

:::

### Developer B worked on 3 PRs last month on ADO

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

The total lines of code calculated for Developer B in the Trellis report is:

| Metric | Calculation | Value |
| - | - | - |
| Lines of Code (Trellis) | (50+30+25+15+50+15) + (70+40+25+20+70+20) | 430 |

* In SCM PRs reports, the values for lines of code added, deleted, and changed are calculated as the sum of the respective values from each commit associated with a pull request.

* In SCM Commit reports, the values for Lines Added and Total Lines are calculated as the lines added and the total lines changed or modified as part of the associated commit.


The calculations for Developer B in the SCM reports are:

#### SCM PR Reports

| Metric | Associated PR | Value |
| - | - | - |
| Lines Added | PR #1 | 50 |
| Lines deleted | PR #1 | 20 |
| Lines changed | PR #1 | 70 |
| Files changed | PR #1 | 3 |
| Lines Added | PR #2 | 30+25+15+50 = 120 |
| Lines deleted | PR #2 | 10+0+5+20 = 35 | 
| Lines changed | PR #2 | 40+25+20+70 = 155 |
| Files changed | PR #2 | 5 |
| Lines Added | PR #3 | 15 |
| Lines deleted | PR #3 | 5 | 
| Lines changed | PR #3 | 20 |
| Files changed | PR #3 | 2 |

#### SCM Commits Report

The values for Lines Added and Total Lines in the SCM commits report are the same as lines added and total lines changed as part of the associated commit.

### Developer C is working on an Open PR with an existing PR that is merged on ADO

Consider a developer working on an open PR with several commits and a merged PR on ADO:

| Pull Request | PR Status | Commit | Number of Lines added | Number of Lines deleted | Net contribution |
| - | - | - | - | - | - |
| PR #1 | Open | Commit #1 | +30 lines added | -10 lines deleted | 40 lines |
| PR #1 | Open | Commit #2 | +25 lines added | 0 lines deleted | 25 lines |
| PR #1 | Open | Commit #3 | +15 lines added | -5 lines deleted | 20 lines |
| PR #1 | Open | Commit #4 | +50 lines added | -20 lines deleted | 70 lines |
| PR #2 | Merged | Merge Commit | +10 lines added | -5 lines deleted | 15 lines |

The total lines of code calculated for Developer C in the Trellis report is:

| Metric | Calculation | Value |
| - | - | - |
| Lines of Code (Trellis) | (30+25+15+50+10) + (40+25+20+70+15)| 300 |

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

The values for Lines Added and Total Lines in the SCM commit reports are the same as the lines added and the total lines changed as part of the associated commit.

This example demonstrates how each commit within an open PR contributes to the total LoC for ADO.