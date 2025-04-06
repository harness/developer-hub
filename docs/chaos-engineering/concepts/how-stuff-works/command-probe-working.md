---
title: Bring Your Own Probe - Command Probe
description: Use a command probe to run custom validation logic as part of your chaos experiments.
sidebar_position: 70
---

The [Command Probe](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/probes/command-probe/) allows you to bring your own validation logic by running custom scripts or binaries.

---

## What Is It?

The **Command Probe** is a healthcheck that is performed as a part of executing a chaos experiment. It runs a custom container image (provided by the user) to validate **SLOs (Service Level Objectives)** or perform any external check. 

The image would contain your binary or script required to assert whether the system behaved as expected during or after the chaos experiment.

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

Configure the command probe with the required fields and attach it to a chaos experiment for pre- or post-chaos validation.

## 1. Create Helper Pod

- During experiment execution, the **execution plane** triggers the probe.
- A **helper pod** (probe pod) is created using the container image specified in the probe’s `source` section.

## 2. Run Custom Script

The container runs the provided **custom command or script**.

## 3. Validate Probe Output

- The output from the probe execution is captured.
- This output is compared against the expected result (defined in the `comparator` section).

## 4. Cleanup
- If the output matches the expected result, the probe is marked as **passed**; otherwise, it **fails**.
- Once execution completes (regardless of result), the helper pod is deleted.

---
