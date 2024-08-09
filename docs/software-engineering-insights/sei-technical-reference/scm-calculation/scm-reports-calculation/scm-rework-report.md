---
title: SCM Rework Report Calculation
description: How is the SCM Rework report calculated on SEI?
sidebar_label: SCM Rework report
sidebar_position: 10
---

In this example, we consider a software development team working on a given project.

Over the past month, the team has been working on enhancing the existing codebase to add new features and fix bugs. Here's a breakdown of the code changes made during this period:

| File            | Lines Added | Lines Deleted | Lines Modified |
| --------------- | ----------- | ------------- | -------------- |
| file1.js        | 10          | 5             | 20             |
| file2.py        | 0           | 0             | 30             |
| file3.cpp (new) | 15          | 0             | 0              |
| file4.java      | 0           | 8             | 0              |

Assuming that `file1.js`, `file2.py`, and `file4.java` are considered **Legacy Code (older than the configured time threshold)**, we can calculate the various metrics as follows:

1. **Total Refactored Lines** Total Refactored Lines = Total Lines Modified + Total Lines Deleted = (20 + 30) + (5 + 8) = 50 + 13 = 63
2. **Total Legacy Rework Lines** Total Legacy Rework Lines = Lines Modified in Legacy Files + Lines Deleted in Legacy Files = (20 + 30) + (5 + 8) = 50 + 13 = 63
3. **Total New Lines** Total New Lines = Total Lines Added in New Files = 15 (added in file3.cpp)
4. **Total lines changed** Total lines changed = Total Refactored Lines + Total New Lines = 63 + 15 = 78
5. **Percentage of Rework** Percentage of Rework = (Total Refactored Lines / Total lines changed) \* 100 = (63 / 78) \* 100 = 80.77%
6. **Percentage of Legacy Rework** Percentage of Legacy Rework = (Total Legacy Rework Lines / Total lines changed) \* 100 = (63 / 78) \ * 100 = 80.77%

In this example, we can see that a significant portion of the code changes (80.77%) involved refactoring existing code, with the same percentage being attributed to legacy code rework. The team also added 15 new lines of code to the codebase.

A high **Percentage of Rework** and **Percentage of Legacy Rework** may indicate potential issues with **Code Quality**, changing requirements, or the need for refactoring the existing codebase.