---
title: Trellis Score Report Calculation
description: How are the Trellis Factors calculated in the Trellis Score Report
sidebar_label: Trellis Score Report
sidebar_position: 10
---
The Trellis Score Report calculates and displays the Trellis Scores by individual developers.

The Trellis Score can be further divided into various metric Categories. Let's say a developer has the following values for these metrics:

<table>
<tr>
<th>Factor</th>
<th>Metric</th>
<th>Value</th>
<th>Benchmark</th>
<th>Weight</th>
</tr>
<tr>
<td rowspan="2">Quality</td>
<td>Percentage of Rework</td>
<td>40%</td>
<td>Lower is better</td>
<td rowspan="2">20%</td>
</tr>
<tr>
<td>Percentage of Legacy Rework</td>
<td>35%</td>
<td>Lower is better</td>
</tr>
<tr>
<td rowspan="2">Impact</td>
<td>High-Impact Bugs Worked On Per Month</td>
<td>1</td>
<td>2-3</td>
<td rowspan="2">15%</td>
</tr>
<tr>
<td>High-Impact Stories Worked On Per Month</td>
<td>3</td>
<td>4-6</td>
</tr>
<tr>
<td rowspan="6">Volume</td>
<td>Number of PRs merged per month</td>
<td>4</td>
<td>5-7.5</td>
<td rowspan="6">25%</td>
</tr>
<tr>
<td>Number of Commits per month</td>
<td>8</td>
<td>10-15</td>
</tr>
<tr>
<td>Lines of Code per month</td>
<td>100</td>
<td>125-185</td>
</tr>
<tr>
<td>Number of Bugs Worked On Per Month</td>
<td>2</td>
<td>2-3</td>
</tr>
<tr>
<td>Number of Stories Worked On Per Month</td>
<td>4</td>
<td>5-7</td>
</tr>
<tr>
<td>Number of Story Points Worked On Per Month</td>
<td>18</td>
<td>-</td>
</tr>
<tr>
<td rowspan="3">Speed</td>
<td>Average Coding Days per Week</td>
<td>2.5</td>
<td>3.2</td>
<td rowspan="3">10%</td>
</tr>
<tr>
<td>Average PR Cycle Time</td>
<td>9 days</td>
<td>&lt; 7 days</td>
</tr>
<tr>
<td>Average Time Spent Working On Issues</td>
<td>6 days</td>
<td>3-5 days</td>
</tr>
<tr>
<td rowspan="2">Proficiency</td>
<td>Technical Breadth</td>
<td>2</td>
<td>2-3</td>
<td rowspan="2">10%</td>
</tr>
<tr>
<td>Repo Breadth</td>
<td>1</td>
<td>2-3</td>
</tr>
<tr>
<td rowspan="4">Leadership &amp; Collaboration</td>
<td>Number of PRs Approved Per Month</td>
<td>2</td>
<td>2-7</td>
<td rowspan="4">20%</td>
</tr>
<tr>
<td>Number of PRs Commented On Per Month</td>
<td>3</td>
<td>2-7</td>
</tr>
<tr>
<td>Average Response Time for PR Approvals</td>
<td>3 days</td>
<td>0.75-2 days</td>
</tr>
<tr>
<td>Average Response Time for PR Comments</td>
<td>2 days</td>
<td>0.75-1.5 days</td>
</tr>
</table>

### **Quality Score**

The **Quality Score** is calculated based on two metrics: Percentage of Rework and Percentage of Legacy Rework.

* **Percentage of Rework** = 40% (lower is better, so score = 60%)
* **Percentage of Legacy Rework** = 35% (lower is better, so score = 65%)

If the Quality factor is given a **Weight** of **20%** in the **Trellis Profile**, the **Quality Score** would be calculated as:

```bash
Quality Score = (60% + 65%) / 2 * 0.2 (weight) = 12.5 / 20
```

### **Impact Score**

The **Impact Score** is calculated based on two metrics: High-Impact Bugs Worked On Per Month and High-Impact Stories Worked On Per Month. 

If the Impact factor is given a **Weight** of **15%** in the **Trellis Profile**, and the benchmarks for these metrics are set to **2-3 for Bugs** and **4-6 for Stories**, the Impact Score would be calculated as:

* **High-Impact Bugs Worked On Per Month** = 1 (below benchmark, so score = 33.33%)
* **High-Impact Stories Worked On Per Month** = 3 (below benchmark, so score = 50%)

```bash
Impact Score = (33.33% + 50%) / 2 * 0.15 (weight) = 6.25 / 15
```

### **Volume Score**

The **Volume Score** is calculated based on six metrics.

If the Volume factor is given a **Weight** of **25%** in the **Trellis Profile**, and the benchmarks for these metrics are set as per the recommended ranges, the **Volume Score** would be calculated as the average of the individual metric scores multiplied by the weight.

* **Number of PRs merged per month** = 4 (below benchmark, so score = 80%)
* **Number of Commits per month** = 8 (below benchmark, so score = 80%)
* **Lines of Code per month** = 100 (below benchmark, so score = 80%)
* **Number of Bugs Worked On Per Month** = 2 (within benchmark, so score = 100%)
* **Number of Stories Worked On Per Month** = 4 (below benchmark, so score = 80%)

```bash
Volume Score = (80% + 80% + 80% + 100% + 80%) / 5 * 0.25 (weight) = 17.5 / 25
```

### **Speed Score**

The **Speed Score** is calculated based on three metrics: Average Coding Days per Week, Average PR Cycle Time, and Average Time Spent Working On Issues.

If the Speed factor is given a **Weight** of **10%** in the **Trellis Profile**, and the benchmarks for these metrics are set as per the recommended ranges, the **Speed Score** would be calculated as the average of the individual metric scores multiplied by the weight.

* **Average Coding Days per Week** = 2.5 (below benchmark, so score = 78.13%)
* **Average PR Cycle Time** = 9 days (above benchmark, so score = 0%)
* **Average Time Spent Working On Issues** = 6 days (above benchmark, so score = 0%)

```bash
Speed Score = (78.13% + 0% + 0%) / 3 * 0.1 (weight) = 2.6 / 10
```

### **Proficiency Score**

The **Proficiency Score** is calculated based on two metrics: Technical Breadth and Repo Breadth.

If the Proficiency factor is given a **Weight** of **10%** in the **Trellis Profile,** and the benchmarks for these metrics are set to **2-3** for both, the **Proficiency Score** would be calculated as:

* **Technical Breadth** = 2 (within benchmark, so score = 100%)
* **Repo Breadth** = 1 (below benchmark, so score = 50%)

```bash
Proficiency Score = (100% + 50%) / 2 * 0.1 (weight) = 7.5 / 10
```

### **Leadership & Collaboration Score**

The **Leadership and Collaboration Score** is calculated based on four metrics: Number of PRs Approved Per Month, Number of PRs Commented On Per Month, Average Response Time for PR Approvals, and Average Response Time for PR Comments.

If the Leadership and Collaboration factor is given a **Weight** of **20%** in the **Trellis Profile**, and the benchmarks for these metrics are set as per the recommended ranges, the **Leadership and Collaboration Score** would be calculated as the average of the individual metric scores multiplied by the weight.

* **Number of PRs Approved Per Month** = 2 (within benchmark, so score = 100%)
* **Number of PRs Commented On Per Month** = 3 (within benchmark, so score = 100%)
* **Average Response Time for PR Approvals** = 3 days (above benchmark, so score = 0%)
* **Average Response Time for PR Comments** = 2 days (above benchmark, so score = 0%)
* **Leadership & Collaboration Score** = (100% + 100% + 0% + 0%) / 4 * 0.2 (weight) = 10 / 20

### **Overall Trellis Score**

The overall **Trellis Score** for the developer would be the sum of the individual factor scores, providing a comprehensive assessment of their performance across various dimensions.

_**Overall Trellis Score = Quality Score + Impact Score + Volume Score + Speed Score + Proficiency Score + Leadership & Collaboration Score**_

```bash
Overall Trellis Score = 12.5 + 6.25 + 17.5 + 2.6 + 7.5 + 10 = 56.35 / 100
```

The breakdown of scores for each factor highlights areas where the developer is performing well (Quality, Volume, Proficiency) and areas that need improvement (Impact, Speed, Leadership & Collaboration).