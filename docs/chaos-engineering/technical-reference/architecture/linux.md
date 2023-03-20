---
title: Linux Execution Plane
sidebar_position: 2
---
Harness execution plane for Linux includes the **Linux chaos infrastructure daemon service**.

- Linux chaos infrastructure daemon service is a Systemd service which is responsible for injecting faults into a Linux machine as part of a chaos experiment.
- Every machine has a one-to-one mapping with the infrastructure daemon service and all of these infrastructure(s) communicate to the control plane to:
    - Fetch experiments for execution
    - Update experiment execution status
    - Send experiment execution result
    - Stream experiment logs
- The infrastructure relies on a polling model to fetch and execute the faults or tasks from the control plane.
- The faults can be executed in parallel or serial to each other, as defined in the experiment.
- All the faults are safely reverted at the end of each experiment or even in the case of a fatal failure during the experiment.
- On-the-fly experiments can be aborted and safely reverted.
