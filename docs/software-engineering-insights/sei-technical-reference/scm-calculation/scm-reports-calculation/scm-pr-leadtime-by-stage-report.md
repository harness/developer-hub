---
title: SCM PR Lead Time by Stage Report Calculation
description: How is the SCM PRs report calculated on SEI?
sidebar_label: SCM PR Lead Time by Stage report
sidebar_position: 15
---
This widget calculated the **Lead Time** only for the **SCM stages** i.e. the velocity time spent on different stages across the lifecycle of a **Pull Request**.

In this example, we consider a use case for a single **Pull Request (PR)**. The **Velocity Profile** is configured to consider **4 Development Stages** i.e. **PR Creation Time**, **Time to Comment**, **Approval Time** and **Merge Time**. The **Lead Time calculation** displays the calculation for the stages as shown above.

The table provides details on the different stages, their descriptions, formulas, and an example calculation.

| Stage | Description | Formula | Example |
| - | - | - | - |
| PR Creation Time | The time taken to create the first pull request (PR) after the first commit. | `First PR Creation Time - First Commit Time` | 10:10 AM - 10:05 AM = 5 minutes |
| Time to First Comment | The time taken to add the first comment after the PR is created. | `First PR Comment Time - First PR Creation Time` | 10:11 AM - 10:10 AM = 1 minute |
| Approval Time | The time taken for the first approval after the first pull request is created. | `First PR Approval Time - First PR Comment Time` | 10:15 AM - 10:11 AM = 4 minutes |
| Merge Time | The time taken to merge the pull request after it is approved.  | `Last PR Merge Time - First PR Approval Time` | 10:19 AM - 10:15 AM = 4 minutes |

**Total Lead Time** is the sum of all the above stages:

```bash
Total Lead Time = 5 min + 1 min + 4 min + 4 min = 14 min
```

Therefore, the Total Lead Time in this case is **14 minutes**.