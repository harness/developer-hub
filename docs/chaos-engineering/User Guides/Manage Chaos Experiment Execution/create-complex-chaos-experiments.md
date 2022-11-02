---
title: Create Complex Chaos Experiments
---

Complex chaos experiments can be used for validating the resiliency of the entire application stack as part of a single experiment only.

- Harness Chaos Engineering scales efficiently in a cloud-native manner to execute these experiments, which often have multiple faults running in parallel at any given time.

- While creating complex chaos experiments, one must consider the overall impact on the application when a number of parallel faults are executing due to lack of resources, since it can affect the user experience in production environments.

To add a fault in parallel to another fault, select the `+` icon below the already added fault; the icon will only appear upon hovering the cursor below the already added fault. Similarly, to add a fault in serial to another fault, select the `+` icon to the right of the already added fault. This way, you may add as many faults as necessary.

![Complex Faults Experiment](./static/complex-faults-experiment.png)