---
title: Linux Execution Plane
sidebar_position: 2
---
Harness execution plane for Linux includes the **Linux chaos infrastructure daemon service**.

Linux chaos infrastructure daemon service is a **Systemd** service that is responsible for injecting faults into a Linux machine as part of a chaos experiment. The infrastructure relies on a polling model to fetch and execute the faults or tasks from the control plane. These faults can be executed serially or in parallel to each other, as defined in the experiment. All the faults and on-the-fly experiments can be safely reverted (and aborted) at the end of each experiment, or in the case of a failure during the experiment.

Every machine has a one-to-one mapping with the infrastructure daemon service, and all of these infrastructure(s) communicate with the control plane to:
- Fetch experiments for execution
- Update experiment execution status
- Send experiment execution result
- Stream experiment logs