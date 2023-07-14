---
title: How resilience score is calculated
sidebar_position: 15
---

The **resilience score** is a quantitative measure obtained when you run a chaos experiment. This score represents how resilient the target environment is when you run that chaos experiment on it.

The score is calculated based on:

* The weight you give each fault in the experiment.
* The success rate of the probes in each fault.

This topic explains these elements, and gives an example resilience calculation.

## Fault weight

While creating a chaos experiment, you can assign a weight between 1 - 10 to each fault. This represents the priority/importance of the respective fault. The higher the weight, the more significant the fault is.

For example:

- Low Priority: 0 - 3
- Medium Priority: 4 - 6
- High Priority: 7 - 10

## Success rate of probes in each fault

The **probe success percentage** for a fault is the ratio of successful probes to total probes. For example, if a fault has 4 probes and only 2 of them are successful, then the probe success percentage for this fault is 50%.

## Resilience calculation

Based on fault weights and probe success rates, you can calculate two types of resilience score (represented as a percentage):

* **A fault's resilience** = fault weight * probe success percentage<br />
* **The experiment's total resilience** = sum of all fault resilience / sum of all fault weights of the experiments

Here's an example:

* **Experiment A** runs, and includes 3 faults. Fault weights, number of probes, and probe success rates are as follows.

   | Fault | Weight | Number<br />of probes | Probes<br />succeeded | Fault<br />resilience |
   |:----:|:---:|:---:|:-------:|:-------:|
   | Fault1 | 2 | 1 | 0 (or 0%) | 0%    | 
   | Fault2 | 4 | 2 | 2 (or 100%) | 400%  | 
   | Fault3 | 8 | 4 | 3 (or 75%) | 600%   | 
   |        | **Sum: 14** |  |    | **Sum: 1000%**   |  
<br />
* **Experiment A's total resilience score** 

   Divide the sum of all fault resilience by the sum of all fault weights:

   **1000% / 14 = 71%**

