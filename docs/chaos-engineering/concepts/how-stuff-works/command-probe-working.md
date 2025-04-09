---
title: Bring Your Own Probe - Command Probe
description: Use a command probe to run custom validation logic as part of your chaos experiments.
sidebar_position: 70
---

The [Command Probe](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/probes/command-probe/) allows you to bring your own validation logic by running custom scripts or binaries.

---

## What Is It?

The **Command Probe** is a type of probe used to validate SLOs or perform checks by executing commands or scripts. 
It supports two execution modes: 

- **inline**: within the experiment pod
- **source**: in an external pod. This is useful when additional dependencies or a custom image are required. Include it in an experiment to carry out these checks.

---

## Why Use a Command Probe?

Use a Command Probe in [source mode](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/probes/command-probe/cmd-probe-usage#configure-command-probe-with-source-parameter) when:

- You need to run a binary or script that is **not available in the experiment pod**.
- The validation requires **custom dependencies, secrets, volumes, or permissions** that are unavailable in the experiment pod.
- You want to **modularize or reuse** your validation logic using pre-built container images.


:::info note
If a binary is required which is already available in the experiment pod, use the [inline probe](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/probes/command-probe/#inline-mode).
:::

---

## Flow of Control 

This section describes the flow of control after creating a resilience probe and while using it in the experiment. 
Configure the command probe with the required fields and attach it to a chaos experiment for pre- or post-chaos validation.

### 1. Create Probe Pod

- During experiment execution, the **execution plane** triggers the probe.
- A **probe pod** is created using the container image specified in the probe’s `source` section.

### 2. Run Custom Script

The container runs the provided **custom command or script**.

### 3. Validate Probe Output

- The output from the probe execution is captured.
- This output is compared against the expected result (defined in the `comparator` section).

### 4. Cleanup
- If the output matches the expected result, the probe is marked as **Passed**; otherwise **Failed**.
- Once execution completes (regardless of result), the probe pod is deleted.

---
