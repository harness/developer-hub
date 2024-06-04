---
title: SCM PRs Report Calculation
description: How is the SCM PRs report calculated on SEI?
sidebar_label: SCM PRs report
sidebar_position: 5
---

The **SCM PRs Report** shows a high-level view of PRs moving through your SCM tool. The reports display data based on the selected metric. Find the list of supported metrics [here](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/scm-reports#scm-prs-report).

## Metric 1: Comment Density

The **Comment Density** metric is calculated by dividing the **Total Number of Comments** by the **Total Number of Files Changed** in a given Pull Request (PR).

### Calculation Example

Suppose a developer submits a PR with the following details:

* **Total Number of Files Changed:** 8
* **Total Number of Comments:** 24

The **Comment Density** for this PR would be calculated as:

```bash
Comment Density = Total Number of Comments / Total Number of Files Changed = 24 / 8 = 3
```

If the thresholds for **Comment Density** are set as follows:

* **Shallow:** 0-2 comments per file
* **Good:** 3-5 comments per file
* **Heavy:** >5 comments per file

Then, this PR with a **Comment Density** of **3** would be categorized as a `Good` PR in terms of comment density.

## Metric 2: Code Change Size

The **Code Change Size metric** can be calculated based on either the **Number of Files Changed** or the **Number of Lines of Code Changed**, depending on the configuration.

### Example 1: Code Change Size based on Number of Files Changed

Suppose a developer submits a PR with the following details:

* **Total Number of Files Changed:** 12

If the thresholds for **Code Change Size (based on the Number of Files Changed)** are set as:

* **Small:** 1-5 files
* **Medium:** 6-10 files
* **Large:** >10 files

Then, this PR with **12 files changed** would be categorized as a `Large` PR in terms of code change size.

### Example 2: Code Change Size based on Lines of Code Changed

Suppose a developer submits a PR with the following details:

* **Total Number of Lines of Code Changed:** 250 (150 lines added, 100 lines deleted)

If the thresholds for Code Change Size (based on Lines of Code Changed) are set as:

* **Small:** 1-100 lines
* **Medium:** 101-300 lines
* **Large:** >300 lines

Then, this PR with **250 Lines of Code Changed** would be categorized as a `Medium` PR in terms of Code Change Size.