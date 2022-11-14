---
title: Experiments
sidebar_position: 3
---

A chaos experiment is a set of different **operations** coupled together to achieve a desired chaos impact. These operations are either chaos faults or any other custom action related to the experiment, such as load generation. 
- Experiments can execute the constituent faults or other operations in any sequence so that they can be ordered to be executed in parallel or serial to each other.

When an experiment is created, steps such as **install-chaos-faults** and **cleanup-chaos-resources** may be present by default. They are responsible for installing the chaos faults within the target environment and deleting the temporary resources created during the experiment execution, respectively.

Adding any other custom action is currently a YAML only feature, where the action is defined in the experiment manifest in a declarative manner.

Once defined, an experiment can be:
1. Directly saved (without running)
2. Directly added to ChaosHub
3. Simply executed.

- The experiment can be either executed immediately or can be scheduled to execute based on a recurring schedule.
- The recurring scheduling can be implemented to run the experiment hourly, daily, weekly, or monthly.

In the end, the success or failure of an experiment depends on the resiliency score obtained.

## What is Resiliency Score?

**Resiliency Score** is a quantitative measure of how resilient is the target environment when the respective chaos experiment is performed on it.

While creating a chaos experiment, certain weights are assigned to all the constituent faults. These weights signify the priority/importance of the respective fault. The higher the weight, the more significant is the fault.

The weight priority is generally divided into three sections:

- 0-3: Low Priority
- 4-6: Medium Priority
- 7-10: High Priority

Once a weight has been assigned to the fault, we look for the Probe Success Percentage (a ratio of successful checks v/s total probes) for that experiment itself post the chaos and calculate the total resilience result for that experiment as a multiplication of the weight given and the probe success percentage returned after the Chaos Run.

```
Fault Resilience = (Fault Weight * Probe Success Percentage)
Overall Resilience Score = Cumulative Fault Resilience / Sum of the assigned weights of the experiments
```
