---
title: SCM Coding Days Report Calculation
description: How is the SCM Coding Days report calculated on SEI?
sidebar_label: SCM Coding Days report
sidebar_position: 20
---

The report displays the coding days count based on the selected settings in the widget configuration. \
It is recommended to configure the widget settings to measure the **Total Coding Days** for an individual developer. This will help display the count of the days on which the developer made code commits.

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

In the SCM Coding Days report the metric displays the coding days count based on the selected metrics in the widget configuration.

```bash
Calculation: Depends on the specific metric chosen in the widget configuration (e.g., Average Coding Days per Week).
```

### Coding Days Single Stat report

In this report the metric displays the coding days count per month based on the selected metrics in the widget configuration.

```bash
Calculation: Raw coding days divided by the total number of days in a month.
```

## Calculation Example

### Average Coding Days Per Week

This metric calculates the average number of days in a week where code commits were made, over a given time period.

**Example:** Let's say we want to calculate the **Average Coding Days Per Week** for a developer between **October 1, 2023**, and **December 31, 2023** (a total of **92 days** or approximately **13 weeks**).

During this period, the developer made code commits on the following days:

* **Week 1:** Monday, Wednesday, Friday **(3 days)**
* **Week 2:** Tuesday, Thursday **(2 days)**
* **Week 3:** Monday, Wednesday, Friday, Saturday **(4 days)**
* ... and so on, for a total of **23 Coding Days**.

To calculate the **Average Coding Days Per Week**, we divide the **Total Number of Coding Days (23)** by the **Total number of weeks (13)**

```bash
Average Coding Days Per Week = 23 coding days / 13 weeks = 1.77 days per week
```

### Median Coding Days Per Week

This metric calculates the median number of days in a week where code commits were made, over a given time period. The median is the middle value in a sorted list of values.

**Example:** Using the same data as above, let's find the number of **Coding Days Per Week**:

* **Week 1:** 3 days
* **Week 2:** 2 days
* **Week 3:** 4 days
* ... and so on, for a total of **13 weeks**.

Sorting the number of Coding Days per week in ascending order, we get: 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4

Since there are **13 weeks**, the **Median** is the **7th value (the middle value)**, which is **3**.

Therefore, the **Median Coding Days Per Week is 3 days.**

### Average Coding Days Per Two Weeks

This metric calculates the average number of days in a two-week period where code commits were made, over a given time period.

**Example:** Let's say we want to calculate the **Average Coding Days Per Two Weeks** for a developer between **October 1, 2023**, and **November 14, 2023** (a total of **45 days** or approximately **6 two-week periods**).

During this period, the developer made code commits on the following days:

* **Two Week Period 1:** Monday, Wednesday, Friday, Saturday **(4 days)**
* **Two Week Period 2:** Tuesday, Thursday **(2 days)**
* **Two Week Period 3:** Monday, Wednesday, Friday, Sunday **(4 days)**
* ... and so on, for a total of **18 Coding Days**.

To calculate the **Average Coding Days Per Two Weeks**, we divide the **Total Number of Coding Days (18)** by the **Total Number of Two-Week Periods (6):**

```bash
Average Coding Days Per Two Weeks = 18 coding days / 6 two-week periods = 3 days per two-week period
```

#### Median Coding Days Per Two Weeks

This metric calculates the median number of days in a two-week period where code commits were made, over a given time period.

**Example:** Using the same data as above, let's find the number of coding days per two-week period:

* **Two Week Period 1:** 4 days
* **Two Week Period 2:** 2 days
* **Two Week Period 3:** 4 days
* ... and so on, for a total of **6 Two-Week Periods**.

Sorting the number of coding days per two-week period in ascending order, we get: 2, 2, 3, 4, 4, 4

Since there are **6 two-week periods**, the **Median is the 4th value (the middle value), which is 4**.

Therefore, the **Median Coding Days Per Two Weeks is 4 days**.

#### Average Coding Days Per Month

This metric calculates the average number of days in a month where code commits were made, over a given time period.

**Example:** Let's say we want to calculate the **Average Coding Days Per Month** for a developer between **October 1, 2023**, and **December 31, 2023** (a total of **92 days** or approximately **3 months**).

During this period, the developer made code commits on the following days:

* **October:** 10 days
* **November:** 8 days
* **December:** 5 days

To calculate the **Average Coding Days Per Month**, we add the number of **Coding Days** for each month and divide by the **Total Number of Months**:

```bash
Average Coding Days Per Month = (10 + 8 + 5) coding days / 3 months = 7.67 days per month
```

#### **Median Coding Days Per Month**

This metric calculates the median number of days in a month where code commits were made, over a given time period.

**Example:** Using the same data as above, let's find the number of coding days per month:

* **October:** 10 days
* **November:** 8 days
* **December:** 5 days

Sorting the number of coding days per month in ascending order, we get: 5, 8, 10

Since there are **3 months**, the **Median is the 2nd value (the middle value), which is** 8.

Therefore, the **Median Coding Days Per Month is 8 days**.