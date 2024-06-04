---
title: SCM Rework
description: How is Rework metric calculated on SEI?
sidebar_label: SCM Rework
sidebar_position: 21
---

This topic provides a guide on how the Rework metric is calculated on SEI.

Rework is defined as changes to existing code, regardless of the age of the code. This includes alterations, fixes, enhancements, or optimizations.

Rework Metrics is a concept used to measure the amount of changes made to existing code, regardless of its age. It includes alterations, fixes, enhancements, or optimizations. By measuring the amount of rework, developers can assess the stability of the code, the frequency of necessary changes, and the efficiency of development efforts. The Rework Metrics can be calculated by measuring the percentage of code that has undergone recent modifications, as well as the percentage of legacy code that has been modified.

## Scope of Measurement

The Rework metric measures the refactoring of code, which involves making modifications to the existing codebase or rewriting it entirely. This measurement is obtained from the SCM Rework Report.

In SEI, rework refers to modifying code that is already present. Refactored lines are the latest modifications made to the codebase in the last 30 days, while legacy refactored lines are those that are older than 30 days or as defined in the settings. 

You can configure the report settings to define what should be considered as Legacy Code by changing the time duration settings.

## Rework Metrics

### Refactored Lines

These are the most recent modifications to the codebase, made within the last 30 days or the time duration configured for Legacy code under the report settings.

### Legacy Lines

These are lines of code that are older than 30 days, or the time duration configured for Legacy code under the report settings.

### Percentage of Rework

The Percentage of Rework metric helps in understanding the proportion of the codebase that has undergone recent modifications. This metric's value is calculated as Total Refactored Lines of Code divided by Total lines, multiplied by 100.

The higher the value, the more frequently changes are being made to the codebase. This may suggest possible issues with initial code quality or changing requirements.

On the other hand, a low value of the Rework Percentage metrics suggests stability in the codebase. However, it may also indicate a lack of necessary updates or improvements. Therefore, it is essential to keep track of these metrics to ensure that the codebase remains stable, updated, and of high quality.

```bash
Metric value = Total Refactored Lines of Code / Total lines changed *100
```

### Percentage of Legacy Rework

The Percentage of Legacy Rework metric provides insight into the extent of modifications done on older segments of the codebase. This metric's value is calculated as Total Legacy Lines of Code divided by Total lines, multiplied by 100.

A high value of this metric suggests that a significant portion of the codebase is old and has undergone recent modifications, which may indicate the need for refactoring and improving the code quality.

```bash
Metric value = Total Legacy Lines of Code / Total lines *100
```

## Use Cases

When it comes to software development, Rework Metrics is essential for evaluating the overall quality and stability of the code. It helps in determining the efficiency of the development process, identifying areas where improvements are required, tracking the progress of a development project, and managing project timelines. It also guides decision-making in allocating resources for code maintenance and development.

For example, if a software development team receives customer complaints about a particular feature, they can use Rework Metrics to measure the amount of code that has been changed after the initial release. This helps the team to identify the extent of modifications made, and whether the changes were necessary or avoidable. By doing so, they can avoid unnecessary changes, reduce the risk of introducing new bugs, and improve the overall quality of the code.

Similarly, if a company's IT department has a large codebase that has been in use for several years, they can use Rework Metrics to evaluate the quality and stability of the code and identify areas where improvements are required. By measuring the percentage of code that has undergone recent modifications, as well as the percentage of legacy code that has been modified, they can assess the efficiency of the development process, allocate resources for code maintenance and development, and improve the overall quality of the code.

The three most important factors that are facilitated by measuring rework are:

* Quality Assessment: Helps in evaluating the overall quality and stability of the code.
* Project Management: Assists in tracking the efficiency of development processes and managing project timelines.
* Resource Allocation: Guides decision-making in allocating resources for code maintenance and development.

## Calculation example

Let's say Developer A is working on a software project and has made a commit with changes in three different files.

* Total Refactored Lines: The number of lines in the code that have been recently modified or refactored.
* Total Legacy Rework Lines: The number of lines that were part of the older code (legacy code) and have been recently modified.
* Total New Lines: The number of lines that are newly added to the codebase.

We assume the configuration for Legacy Code in SEI Rework Report to be set to `Older than the last 30 days`

In this scenario, we have three files in the project with the following details:

### Calculation for File 1

This is a newly added file.

   1. It has 5 lines of new code added.
   2. There are no deletions since it's a new file. Therefore, the total changes in this file are 5 lines.

| Metric | Lines added | Lines deleted | Lines changed |
| - | - | - | - | 
| Value | 5 | 0 | 5 |

**Refactored:** 0 lines (it's a new file, so no existing code was reworked).

**Legacy Rework:** 0 lines (it's a new file, so it has no legacy code).

**New Lines:** 5 lines (all the lines are new).

### Calculation for File 2

This is an existing file that was last modified before the set condition for Legacy Code. This means that the file was updated prior to the last 30 days, which is the set condition for considering code as Legacy Code in this example.

   1. It has 10 lines of code added and 1 line deleted.
   2. This gives a total of 11 lines changed. Since this file was last modified before the set condition for Legacy Code all 11 lines are count as "Legacy Rework."

| Metric | Lines added | Lines deleted | Lines changed |
| - | - | - | - | 
| Value | 10 | 1 | 11 |

**Refactored:** 0 lines (the changes were made to the legacy code).

**Legacy Rework:** 11 lines (all changes are to code that existed before December 5th, 2023).
New Lines: 0 lines (no new lines, only modifications).

### Calculation for File 3

This is another existing file. This file has been updated within the last 30 days and therefore does not meet the condition for Legacy Code for this example. (The last modification date falls within the acceptable range.)

1. It includes 3 lines of code added and 1 line deleted.
2. This makes a total of 4 lines changed. As this modification happened after the set condition for the Legacy Code, these 4 lines are considered as "Refactored."

| Metric | Lines added | Lines deleted | Lines changed |
| - | - | - | - | 
| Value | 3 | 1 | 4 |

**Refactored:** 4 lines (these are recent modifications to existing code).

**Legacy Rework:** 0 lines (the modifications are not on legacy code).

**New Lines:** 0 lines (no new lines, only modifications).

### Overall Rework Calculation

* **Total Refactored Lines:** 4 lines (from File 3).
* **Total Legacy Rework Lines:** 11 lines (from File 2).
* **Total New Lines:** 5 lines (from File 1).

If the Total Refactored Lines of Code are 4 and the Total Lines of Code changed are 20 then the Percentage of Rework would be calculated as follows:

```bash
Percentage of Rework = 4/20*100 = 20%
```

This means that 20% of the codebase has undergone recent modifications.

If the Total Legacy Lines of Code are 11 and the Total Lines of Code changed are 20 then the Percentage of Legacy Rework would be calculated as follows:

```bash
Percentage of Legacy Rework = 11/20*100 = 55%
```

This means that 55% of the codebase is old and has undergone recent modifications.
