---
title: Get Started with Load Testing
sidebar_label: Get Started
sidebar_position: 1
description: Learn how to create and run your first load test in Harness Resilience Testing
---

Load Testing simulates user traffic to validate your system's performance under expected and peak load conditions. Identify bottlenecks, validate scalability, and ensure your applications can handle production workloads before they face real users.

:::info Feature Flag
Load Testing is currently behind a feature flag (`CHAOS_LOAD_TESTING_ENABLED`). Contact your Harness sales representative to get it enabled for your account.
:::

## Key Concepts

### Virtual Users

A **virtual user** (VU) simulates a real user interacting with your application. Each virtual user independently executes the scenario you define: sending HTTP requests, waiting for responses, and looping through the sequence for the duration of the test.

The **Number of Users** setting controls how many virtual users run concurrently at peak load. Higher concurrency means more simultaneous requests hitting your system.

### Load Profile

The **load profile** describes how virtual users are added over the course of a test. Harness Load Testing uses a ramp-up then steady-state model:

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

**Ramp-Up Phase** — Virtual users are added linearly from 0 to the target number over the **Ramp-Up Duration**. This gradual increase avoids overwhelming the system at the start and lets you observe how it responds as load increases.

**Steady-State Phase** — After ramp-up completes, the configured number of virtual users continues running for the remainder of the **Test Duration**. Steady-state duration = `Test Duration - Ramp-Up Duration`.

**Example**: 600s total duration with 120s ramp-up gives 480s at peak load.

### Load Test Frameworks

Harness Load Testing supports more than one framework so you can match the tool to your goal:

- **[Locust](./create-load-test/locust)** is a Python framework that models user behavior as Python classes. It runs on Linux VM and Kubernetes infrastructure and suits Python teams and a simple ramp-up model.
- **[k6](./create-load-test/k6)** is a JavaScript framework with executors, preset load profiles, and built-in pass/fail thresholds. It runs on Kubernetes infrastructure and suits release gates and precise load shapes such as spike and soak tests.

You select the framework under **Load Test Type** when you create a test.

### Thresholds (k6)

A **threshold** is a pass/fail rule for a metric, such as "the 95th-percentile request duration must stay under 5000 ms." When a k6 test breaches a threshold, the run is marked failed. This turns a load test into a gate you can enforce in continuous integration. Go to [k6](./create-load-test/k6) to configure thresholds.

### Scenarios and executors (k6)

A k6 **scenario** is a named workload, and its **executor** controls how virtual users are scheduled over time (for example, `ramping-vus` ramps users up and down through stages). You can run multiple scenarios in parallel, such as a browse flow and a checkout flow, each with its own executor.

### Scenario Definition

A **scenario** defines the sequence of HTTP requests your virtual users execute. Each request includes:

- **HTTP Method**: GET, POST, PUT, DELETE, PATCH, etc.
- **Endpoint URL**: The full URL for UI-defined tests, or a path relative to the Host URL for script-based tests
- **Request Name**: An optional label for identifying the request in results
- **Query Parameters**: URL query string parameters as key-value pairs
- **Headers**: HTTP request headers (e.g., `Authorization`, `Content-Type`)
- **Assertions**: Conditions that must be true for the request to count as a success
- **Extractions**: Values captured from responses and reused in later requests

### Assertions

Assertions define success criteria for each request. A failed assertion marks that request as an error in the test results.

| Assertion Type | What it checks |
|---|---|
| **Text** | The response body contains (or does not contain) a specific string |
| **Response Time** | The request completes within a specified time threshold (milliseconds) |

### Extract from Response

Response extraction captures a dynamic value from a response (such as a token returned after a login request) and makes it available as a variable in subsequent requests. This enables realistic multi-step flows like:

1. POST `/auth/login` — extract `access_token` from response body
2. GET `/api/user/profile` with `Authorization: Bearer {{access_token}}`

### Host URL

When uploading a Python script, the **Host URL** is the base URL of the application under test. Locust prepends this to all relative paths in your script. For example, with Host URL `https://api.example.com`, a request to `/users` becomes `https://api.example.com/users`.

### Load Test Infrastructure

Load tests run on infrastructure managed by the Harness chaos agent. Two **target types** are supported:

| Target Type | How it works | Best for |
|---|---|---|
| **Linux VM** | The agent on a Linux host runs the Locust process locally and streams results back to Harness. | Simple setups, on-premises hosts, direct network access to internal services. |
| **Kubernetes** | The agent orchestrates a master pod and optional worker pods inside a Kubernetes cluster. Requires **v1.85.3+**. Load testing is enabled by default — no additional configuration needed. | Scalable distributed testing, cloud-native environments, high-concurrency workloads. |

When creating a load test, you select a target type first, and the **Load Test Infrastructure** dropdown filters to show only infrastructure matching that type. See [Infrastructure Types](../chaos-testing/infrastructure/types) for setup instructions.

### Test Definition Modes

The available test definition modes depend on the framework and target type you selected. The script type matches the framework: Locust uses Python (`.py`), and k6 uses JavaScript (`.js`).

| Mode | Locust (Linux VM) | Locust (Kubernetes) | k6 (Kubernetes) | Description |
|---|---|---|---|---|
| **Define test via UI** | ✅ | ✅ | ✅ | Build HTTP scenarios visually without writing code. Harness generates the script at execution time. |
| **Upload a script** | ✅ (`.py`) | ✅ (`.py`) | ✅ (`.js`) | Upload a custom script for full control over user behavior. |
| **Using Image** | — | ✅ | ✅ | Use a prebuilt container image as the load test source. Available on Kubernetes only since the image runs as a pod in the cluster. |

## Prerequisites

- Access to the Harness Resilience Testing module
- A [chaos infrastructure](../chaos-testing/infrastructure/types) configured in your project (Linux VM or Kubernetes)
- An environment created in your project for the infrastructure
- Target application endpoints accessible from the test infrastructure

## Quick Start

1. Navigate to **Resilience Testing** > **Load Testing**
2. Click **+ New Load Test** and follow the guided creation flow

:::tip Try Sample Test
Click the **+ New Load Test** dropdown and select **Try Sample Test** to instantly explore the feature with a pre-configured test: sample endpoints, realistic load settings, and example configurations included.
:::

For the complete step-by-step walkthrough, choose your framework:
- [Locust](./create-load-test/locust): Python-based, runs on Linux VM or Kubernetes
- [k6](./create-load-test/k6): JavaScript-based with thresholds, runs on Kubernetes

## Next Steps

- Create a Load Test: [Locust](./create-load-test/locust) · [k6](./create-load-test/k6)
- [Analyze Results](./analyze-results): Understand and interpret load test execution results
- [Infrastructure Types](../chaos-testing/infrastructure/types): Set up and manage infrastructure for chaos and load tests
- [Chaos Testing](../chaos-testing/get-started): Combine load testing with chaos experiments for peak-load resilience validation
