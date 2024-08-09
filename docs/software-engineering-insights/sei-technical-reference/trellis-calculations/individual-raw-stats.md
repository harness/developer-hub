---
title: Individual Raw Stats Report Calculation
description: What is calculated in the Individual Raw Stats report
sidebar_label: Individual Raw Stats
sidebar_position: 20
---

This topic describes a calculation example for the Individual Raw Stats report:

Let's consider the following data for a developer, John Doe, during the last quarter (Q1 2023):

<table>
<tr>
<th>Metric</th>
<th>Value</th>
</tr>
<tr>
<td>PRs Merged</td>
<td>12</td>
</tr>
<tr>
<td>Commits</td>
<td>75</td>
</tr>
<tr>
<td>Bug Fixed</td>
<td>8</td>
</tr>
<tr>
<td>PRs commented</td>
<td>20</td>
</tr>
<tr>
<td>No. of PRs approved</td>
<td>18</td>
</tr>
<tr>
<td>Rework (Lines of Code changed in the last 30 days)</td>
<td>500</td>
</tr>
<tr>
<td>Legacy Rework (Lines of Code changed older than 30 days)</td>
<td>1000</td>
</tr>
<tr>
<td>Lines of Code</td>
<td>2500</td>
</tr>
<tr>
<td>Story points</td>
<td>40</td>
</tr>
<tr>
<td>Unique File Extensions</td>
<td>5 (.js, .py, .cpp, .java, .html)</td>
</tr>
<tr>
<td>Unique Repos</td>
<td>3</td>
</tr>
<tr>
<td>Coding Days</td>
<td>45</td>
</tr>
<tr>
<td>Ticket Portion</td>
<td>60% (for Ticket A), 40% (for Ticket B)</td>
</tr>
</table>

In this example, the **Individual Raw Stats** report for **John Doe** would display the above data for each of the **Raw Stats metrics**.

Here's how each metric is calculated:

### **PRs Merged**

Total number of pull requests created by the contributor that were merged in the selected time range.

**Example:** Let's say John Doe had the following PRs merged during Q1 2023:

* PR #123 on March 1st
* PR #456 on March 10th
* PR #789 on April 5th
* PR #101 on April 20th
* ... and so on, for a total of 12 PRs.

In this case, the PRs metric for John Doe would be calculated as 12

### **Commits**

Total number of commits contributed by the contributor in the selected time range.

**Example:** During Q1 2023, John Doe made the following commits:

* 20 commits on March 2nd
* 15 commits on March 15th
* 10 commits on April 1st
* 8 commits on April 25th
* ... and so on, for a total of 75 commits.

In this case, the Commits metric for John Doe would be calculated as 75

### **Bug Fixed**

Total number of issues with the "BUG" type that were resolved by the contributor in the selected time range.

**Example:** Let's say John Doe resolved the following bug issues during Q1 2023:

* Bug #456 on March 5th
* Bug #789 on March 20th
* Bug #123 on April 10th
* Bug #567 on April 28th
* ... and so on, for a total of 8 bug issues resolved.

In this case, the Bug Fixed metric for John Doe would be calculated as 8

### **PRs commented**

Total number of pull requests to which the contributor added comments in the selected time range.

**Example:** During Q1 2023, John Doe commented on the following PRs:

* PR #123 (3 comments)
* PR #456 (5 comments)
* PR #789 (2 comments)
* PR #101 (4 comments)
* ... and so on, for a total of 20 PRs commented on.

In this case, the PRs commented metric for John Doe would be calculated as 20

### **No. of PRs approved**

Total number of pull requests that were approved by the contributor in the selected time range.

**Example:** Let's say John Doe approved the following PRs during Q1 2023:

* PR #123 on March 3rd
* PR #456 on March 12th
* PR #789 on April 7th
* PR #101 on April 22nd
* ... and so on, for a total of 18 PRs approved.

In this case, the No. of PRs approved metric for John Doe would be calculated as 18

### **Rework**

The number of lines changed by a contributor in the last 30 days or configured time for legacy code.

**Example:** Let's assume the configuration for legacy code is set to **"Older than the last 30 days"**. During the last 30 days of Q1 2023, John Doe made the following code changes:

* Modified 200 lines in `file1.js`
* Added 100 new lines in `file2.py`
* Deleted 50 lines in `file3.cpp`
* Modified 150 lines in `file4.java`

In this case, the **Rework** metric for John Doe would be calculated as: 

```
Rework = 200 (modified lines in file1.js) + 100 (new lines in file2.py) + 50 (deleted lines in file3.cpp) + 150 (modified lines in file4.java) = 500
```

### **Legacy Rework**

Lines of code changed that are older than 30 days (or the configured time duration for legacy code) by the contributor.

**Example:** Let's assume the configuration for legacy code is set to **"Older than the last 30 days"**. During Q1 2023, John Doe made the following code changes to files older than 30 days:

* Modified 500 lines in `legacy_file1.js`
* Added 300 new lines in `legacy_file2.py`
* Deleted 200 lines in `legacy_file3.cpp`

In this case, the **Legacy Rework** metric for John Doe would be calculated as:

```
Legacy Rework = 500 (modified lines in legacy_file1.js) + 300 (new lines in legacy_file2.py) + 200 (deleted lines in legacy_file3.cpp) = 1000
```

### **Lines of Code**

Total number of lines of code contributed by the contributor within the selected time range.

**Example:** During Q1 2023, John Doe contributed the following lines of code:

* 1000 lines in `new_feature1.js`
* 500 lines in `new_feature2.py`
* 1000 lines in `bug_fix1.cpp`

In this case, the **Lines of Code** metric for John Doe would be calculated as: 

```bash
Lines of Code = 1000 + 500 + 1000 = 2500
```

### **Story points**

Total number of story points for tickets that were resolved (completed) by the contributor in the selected time range.

**Example:** Let's say John Doe resolved the following tickets during Q1 2023:

* Story #123 (8 story points)
* Story #456 (12 story points)
* Story #789 (20 story points)

In this case, the **Story points** metric for John Doe would be calculated as: 

```bash
Story points = 8 + 12 + 20 = 40
```

### **Unique File Extensions**

Total number of unique file types the contributor worked on in the selected time range.

**Example:** During Q1 2023, John Doe worked on the following file types:

* `.js` (JavaScript files)
* `.py` (Python files)
* `.cpp` (C++ files)
* `.java` (Java files)
* `.html` (HTML files)

In this case, the **Unique File Extensions** metric for John Doe would be calculated as: 

```bash
Unique File Extensions = 5 (.js, .py, .cpp, .java, .html)
```

### **Unique Repos**

Total number of unique repositories the contributor contributed to in the selected time range.

**Example:** Let's say John Doe contributed to the following repositories during Q1 2023:

* `repo1`
* `repo2`
* `repo3`

In this case, the **Unique Repos** metric for John Doe would be calculated as: 

```bash
Unique Repos = 3 (repo1, repo2, repo3)
```

### **Coding Days**

Number of unique days within the specified time range during which the contributor has committed code changes.

**Example:** During Q1 2023, John Doe committed code changes on the following days:

* March 2nd
* March 5th
* March 10th
* March 15th
* ... and so on, for a total of 45 unique days.

In this case, the **Coding Days** metric for John Doe would be calculated as 45

### **Ticket Portion**

This displays how much time each user has contributed to the overall resolution of a ticket. It represents the proportion of time a particular user worked on a ticket relative to the total amount of time the ticket was open.

**Example:** Let's say John Doe worked on two tickets during Q1 2023:

* **Ticket A** was open for **10 days**, and **John Doe** worked on it for **6 days**.
* **Ticket B** was open for **20 days**, and **John Doe** worked on it for **8 days**.

In this case, the **Ticket Portion** metric for John Doe would be calculated as:

```bash
Ticket Portion = 60% (for Ticket A), 40% (for Ticket B)
```