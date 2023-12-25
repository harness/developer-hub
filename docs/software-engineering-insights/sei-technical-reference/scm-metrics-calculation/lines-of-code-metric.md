---
title: Lines of Code
description: How is Lines of Code metric calculqted on SEI?
sidebar_label: Lines of Code
sidebar_position: 20
---

This topic provides a guide on how the Lines of Code metric is calculated on SEI.

The Lines of Code metric is a crucial indicator of developer productivity and codebase evolution over time. 

It measures the total number of lines of code a developer has contributed in the last 30 days. This serves as an indicator of developer productivity. The industry standard suggests an ideal range of 125 to 185 lines of code each month.

## Scope of Measurement

SEI measures the total lines of code that are included in pull requests (PRs).

* For PRs that have been merged, SEI calculates the total lines of code change using the `merge SHA (Commit ID)`. This approach ensures accuracy by considering the final state of the code after all changes in the PR have been consolidated.

* For PRs with statuses of `OPEN`, `CLOSED`, or `DRAFT`, SEI determines the Lines of Code metric by summing up the lines of code across all associated commits. This method aggregates the changes made in each individual commit to calculate the total impact on the codebase.


:::info

Commits encompassing more than 256 files are automatically excluded from the calculation.

:::

## Calculation example

Let's consider a scenario with multiple PRs and commits to understand how LoC is calculated:

### Developer A worked on 3 PRs last month

- **PR #1 (Merged):** Had 2 commits, with a total of 50 lines added and 20 lines deleted. The final merge added 30 net new lines.
- **PR #2 (Open):** Consists of 4 commits, adding 120 lines and deleting 35. Total contribution is +85 lines.
- **PR #3 (Closed):** Included 1 commit with 15 lines added and 5 deleted, resulting in +10 lines.

| Pull Request | PR Status | Commit | Number of Lines added | Number of Lines deleted | Net contribution |
| - | - | - | - | - | - |
| PR #1 | Merged | Merge Commit | +50 lines added | -20 lines deleted | +30 lines |
| PR #2 | Open | Commit #1 | +30 lines added | -10 lines deleted | +20 lines |
| PR #2 | Open | Commit #2 | +25 lines added | 0 lines deleted | +25 lines |
| PR #2 | Open | Commit #3 | +15 lines added | -5 lines deleted | +10 lines |
| PR #2 | Open | Commit #4 | +50 lines added | -20 lines deleted | +30 lines |
| PR #3 | Closed | Commit #1 | +15 lines added | -5 lines deleted | +10 lines |

| Calculation | Net contribution |
| - | - |
| 30 + 20 + 25 + 10 + 30 + 10 | +125 lines of code |

### Developer B is working on an Open PR with an existing PR that is merged

Consider a developer working on an open PR with several commits and a merged PR:

| Pull Request | PR Status | Commit | Number of Lines added | Number of Lines deleted | Net contribution |
| - | - | - | - | - | - |
| PR #1 | Open | Commit #1 | +30 lines added | -10 lines deleted | +20 lines |
| PR #1 | Open | Commit #2 | +25 lines added | 0 lines deleted | +25 lines |
| PR #1 | Open | Commit #3 | +15 lines added | -5 lines deleted | +10 lines |
| PR #1 | Open | Commit #4 | +50 lines added | -20 lines deleted | +30 lines |
| PR #2 | Merged | Merge Commit | - | - | +15 lines |

| Calculation | Net contribution |
| - | - |
| 20 + 25 + 10 + 30 + 15 | +100 lines of code |

This example demonstrates how each commit within an open PR contributes to the total LoC.

### Developer C has completed work on a Closed PR with an existing PR that is merged

Consider a developer working on an closed PR with several commits and a merged PR:

| Pull Request | PR Status | Commit | Number of Lines added | Number of Lines deleted | Net contribution |
| - | - | - | - | - | - |
| PR #1 | Closed | Commit #1 | +40 lines added | -15 lines deleted | +25 lines |
| PR #1 | Closed | Commit #2 | +20 lines added | -10 lines deleted | +10 lines |
| PR #1 | Closed | Commit #3 | +5 lines added | 0 lines deleted | +5 lines |
| PR #1 | Closed | Commit #4 | +30 lines added | -5 lines deleted | +25 lines |
| PR #2 | Merged | Merge Commit | - | - | +20 lines |

| Calculation | Net contribution |
| - | - |
| 25 + 10 + 5 + 25 + 20 | +85 lines of code |

In this example, each commit within the closed PR and a PR with status MERGED is analyzed to determine its net impact on the codebase. 
The metric takes into account both the lines of code added and those deleted across all commits. The sum of these contributions forms the total LoC for the PR.