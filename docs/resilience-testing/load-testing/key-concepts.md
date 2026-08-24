---
title: Load testing key concepts
sidebar_label: Key Concepts
sidebar_position: 20
description: Understand load profiles, engines, thresholds, infrastructure, services, and test definition modes in Harness Load Testing
keywords:
  - load testing concepts
  - virtual users
  - load test engines
  - load test thresholds
tags:
  - load-testing
---

Harness Load Testing uses virtual users, load profiles, and engine-specific test definitions to validate application performance. These concepts help you select an engine, configure infrastructure, and interpret how Harness runs a test.

---

## What you will learn from this topic

- How virtual users and load profiles shape a test.
- How the Python, JavaScript, and Java engines differ.
- Where each engine defines pass or fail thresholds.
- How infrastructure, services, and test definition modes affect a load test.

---

## Virtual users

A **virtual user** (VU) simulates a real user who interacts with your application. Each virtual user independently executes the scenario you define: it sends HTTP requests, waits for responses, and repeats the sequence for the duration of the test.

The **Number of Users** setting controls how many virtual users run concurrently at peak load. Higher concurrency sends more simultaneous requests to your system.

---

## Load profile

The **load profile** describes how virtual users enter a test. Harness Load Testing uses a ramp-up phase followed by a steady-state phase:

```
Users
  |         ___________________
  |        /
  |       /
  |______/
  |________________________________ Time
     ^          ^
  Ramp-Up    Steady State
```

- **Ramp-up phase:** Harness adds virtual users linearly from zero to the target number over the **Ramp-Up Duration**. This gradual increase lets you observe the system response as load rises.
- **Steady-state phase:** The configured number of virtual users continues for the rest of the **Test Duration**. Steady-state duration equals `Test Duration - Ramp-Up Duration`.

For example, a 600-second test with a 120-second ramp-up runs at peak load for 480 seconds.

---

## Load test engines

When you create a load test, you select a **Load Test Engine**. Each engine provides a language surface over a load tool:

| Load Test Engine | Based on | Script language | Infrastructure |
| --- | --- | --- | --- |
| **[Python](./create-load-test/locust)** | Locust | Python | Linux VM and Kubernetes |
| **[JavaScript](./create-load-test/k6)** | k6 | JavaScript | Kubernetes |
| **[Java](./create-load-test/jmeter)** | JMeter | Java (`.jmx` plans) | Kubernetes |

- **Python:** Models user behavior as Python classes. Use it for Python-based tests, a simple ramp-up model, or Linux VM infrastructure.
- **JavaScript:** Runs k6 scripts. Use it for script-defined pass or fail thresholds and precise load shapes such as spike and soak tests.
- **Java:** Runs existing JMeter `.jmx` test plans. Use it to reuse JMeter plans, override properties at run time, and distribute load across workers.

Only Python runs on a Linux VM. When you set **Target Type** to **Linux VM**, the JavaScript and Java options are disabled and marked **Coming Soon**.

---

## Thresholds

A **threshold** is a pass or fail rule for a metric, such as "the 95th-percentile request duration must stay under 5000 ms." A threshold breach marks the run as failed, so you can use the test as a continuous integration gate.

The threshold location depends on the engine:

- **Java:** Add criteria in the **Thresholds** section of the Load Test Studio. Go to [Java](./create-load-test/jmeter#gate-a-release-with-passfail-thresholds) to configure thresholds.
- **JavaScript:** Declare thresholds in `options.thresholds` inside the script. Harness reports the outcome in the results. Go to [JavaScript](./create-load-test/k6#gate-a-release-with-passfail-thresholds) to review the syntax.

---

## Host URL

When you upload a script, the **Host URL** is the base URL of the application under test. The Python engine prepends it to relative paths in your script. For example, with Host URL `https://api.example.com`, a request to `/users` becomes `https://api.example.com/users`. The JavaScript engine receives the same value as `__ENV.HOST_URL`.

---

## Load test infrastructure

Load tests run on infrastructure managed by the Harness chaos agent. Harness supports two target types:

| Target Type | How it works | Best for | Load Test Engines |
|---|---|---|---|
| **Kubernetes** | The agent orchestrates a master pod and optional worker pods inside a Kubernetes cluster. Requires **v1.85.3+**. Load testing is enabled by default, so no additional configuration is needed. | Scalable distributed tests, cloud-native environments, and high-concurrency workloads. | Python, JavaScript, Java |
| **Linux VM** | The agent on a Linux host runs the Locust process locally and streams results back to Harness. | Simple setups, on-premises hosts, and direct network access to internal services. | Python only |

When you create a load test, select a target type first. The **Load Test Infrastructure** dropdown then lists only infrastructure that matches that type. Go to [Infrastructure](../chaos-testing/infrastructure) to configure infrastructure.

---

## Services

Every load test targets one or more onboarded resilience testing services. The **Services** section appears on the **Overview** tab after you select infrastructure, and the picker lists only services onboarded against that infrastructure. You cannot save a load test without at least one service.

This association lets one service report its chaos, load, and disaster recovery results together. Onboard a workload before you create a load test.

---

## Load Test Studio

You build each load test in the **Load Test Studio**, a two-step flow:

- **Overview:** Configure metadata, infrastructure, services, and the engine.
- **Test Configuration:** Define the workload.

The **Advanced Options** and **Variables** panels apply to both steps. Use **Advanced Options** to configure pod cleanup and resource requirements. Use **Variables** to define reusable values.

Use the **VISUAL** and **YAML** toggle to switch between the form and the underlying definition. The YAML shows the exact test configuration:

```yaml
kind: LoadTest
apiVersion: v1alpha1
metadata:
  name: checkout-load
  serviceReferences:
    - paymentservice-boutique-prod
spec:
  identity: checkoutload
  toolType: Locust
  targetType: kubernetes
  cleanupPolicy: delete
  toolConfig:
    locust:
      mode: script
      variables:
        - name: hostvar
          type: String
          value: example.com
```

`serviceReferences` records the target services. `cleanupPolicy` reflects the **Clean-up Load Resources** toggle. Variables sit under the engine in `toolConfig`, so they apply to that engine's inputs.

---

## Test definition modes

Each engine offers two ways to define a workload. You supply the test as a script, plan, or container image. Harness does not generate the test.

| Mode | Python | JavaScript | Java | Description |
|---|---|---|---|---|
| **Upload a script or plan** | `.py` | `.js` | `.jmx`, `.xml`, or `.zip` | Upload your script or test plan. Harness runs it as uploaded. |
| **Use a custom image** | Supported | Supported | Supported | Use a prebuilt container image that contains the engine binary and test. |

A Java `.zip` file can bundle the JMeter plan with CSV data files and dependencies. The upload limit is 1 MB.

---

## Related concepts

- Go to [Get started with Load Testing](./get-started) to create and run your first test.
- Go to [Python](./create-load-test/locust), [JavaScript](./create-load-test/k6), or [Java](./create-load-test/jmeter) to configure an engine.
- Go to [Analyze load test results](./analyze-results) to understand execution metrics and threshold outcomes.
