---
title: Locust
sidebar_label: Locust
sidebar_position: 1
description: Run a Python-based Locust load test on Linux VM or Kubernetes in Harness Resilience Testing
keywords:
  - locust load test
  - performance testing
  - python load test
tags:
  - load-testing
  - locust
redirect_from:
  - /docs/resilience-testing/load-testing/create-load-test/linux-vm
  - /docs/resilience-testing/load-testing/create-load-test/kubernetes
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Locust](https://locust.io/) is a Python load testing framework that models user behavior as Python classes and tasks. Use Locust when your team works in Python, when you want to express user journeys as code with conditional logic, or when you need a straightforward ramp-up to steady-state load. Locust runs on both **Linux VM** and **Kubernetes** infrastructure, so it fits everything from a single on-premises host to scalable distributed runs.

---

## What you can do with Locust

- **Reuse Python skills and scripts.** Write scenarios as Python classes, or upload an existing `.py` Locust script.
- **Test from a single host.** Run on a Linux VM for on-premises targets or direct network access to internal services.
- **Scale out on Kubernetes.** Run a master pod with worker pods for higher concurrency.
- **Model user behavior.** Weight tasks so frequent actions run more often than rare ones.

---

## Prerequisites

- **Module access:** Access to the Harness Resilience Testing module.
- **Infrastructure:** A chaos infrastructure with load testing enabled, either a [Linux Chaos Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/linux) or a [Kubernetes Chaos Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/kubernetes) (v1.85.3 or later).
- **Environment:** An environment created in your project for the infrastructure.
- **Reachable target:** Target application endpoints accessible from the test infrastructure.

---

## Create a load test

1. Navigate to **Resilience Testing** > **Load Testing**.
2. Click **+ New Load Test**.

:::tip Try a sample test
Click the **+ New Load Test** dropdown and select **Try Sample Test** to explore the flow with a pre-configured test before you build your own.
:::

### Set the overview

On the **Overview** tab, enter the test metadata, then select the infrastructure where the test runs. Set **Name**, an optional **Description**, and optional **Tags**, then choose a **Target Type**.

<Tabs>
<TabItem value="linux" label="Linux VM" default>

Select **Linux VM** as the target type, then select a Linux Chaos Infrastructure (with load testing enabled) from the **Load Test Infrastructure** dropdown. Set **Load Test Type** to **Locust**.

The Harness chaos agent on the VM runs the Locust process locally and streams results back to Harness.

- Best for simple setups, on-premises hosts, or direct network access to internal services.
- Go to [Linux Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/linux) for setup instructions.

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Select **Kubernetes** as the target type, then select a Kubernetes Chaos Infrastructure from the **Load Test Infrastructure** dropdown. Set **Load Test Type** to **Locust**.

The agent in the cluster orchestrates a master pod and optional worker pods for load generation.

- Best for scalable, distributed load generation and cloud-native environments.
- Go to [Kubernetes Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/kubernetes) for setup instructions.

</TabItem>
</Tabs>

Click **Next** to proceed to **Test Configuration**.

### Define the test

On the **Test Configuration** tab, choose how you want to define the test workload.

<Tabs>
<TabItem value="ui" label="Define test via UI" default>

Use the visual editor to build HTTP scenarios without writing code. Harness generates the Locust script from your configuration at execution time.

Each request represents one HTTP call your virtual users execute on every loop. For each request:

| Field | Description |
|---|---|
| **Request name** | Optional label to identify this request in results. |
| **HTTP Method** | GET, POST, PUT, DELETE, PATCH, HEAD, or OPTIONS. |
| **URL** | Full endpoint URL (for example, `https://api.example.com/users`). |

Each request has four tabs:

- **Query Parameters:** Key-value pairs appended to the URL as `?key=value&key2=value2`.
- **Headers:** HTTP request headers. Common examples are `Authorization: Bearer <token>` and `Content-Type: application/json`.
- **Assertions:** Conditions that must be true for the request to count as a success. Failed assertions are recorded as errors in results.
- **Extract from Response:** Captures a dynamic value from a response (for example, a login token) and stores it as a variable for use in later requests. Reference extracted values with `{{variable_name}}`.

| Assertion type | Validates |
|---|---|
| **Text** | Response body contains (or does not contain) a specific string. |
| **Response Time** | Request completes within a specified threshold (milliseconds). |

Click **+** to add more requests to the scenario.

</TabItem>
<TabItem value="script" label="Upload Python Script">

Upload a custom [Locust](https://locust.io/) `.py` script for advanced scenarios that require custom logic, authentication flows, or complex user behavior.

| Field | Description |
|---|---|
| **Host URL** | Base URL of the application under test. Locust prepends this to all relative paths in your script. |
| **Script file** | Drag and drop or browse to upload. `.py` files only. |

```python
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def get_homepage(self):
        self.client.get("/")

    @task(2)
    def get_products(self):
        self.client.get("/api/products")
```

`@task(weight)` controls relative execution frequency across tasks.

</TabItem>
<TabItem value="image" label="Using Image (Kubernetes only)">

Use a prebuilt container image as the load test source. This is useful when you have a custom Locust setup packaged as a Docker image. This mode is available on Kubernetes infrastructure only, since the image runs as a pod in the cluster.

| Field | Description |
|---|---|
| **Host URL** | Base URL of the application under test. |
| **Load Test Image** | Container image reference (for example, `my-registry/my-load-test:latest`). |
| **Entrypoint** | Path to the Locust script inside the container (for example, `/locust/locust.py`). |

</TabItem>
</Tabs>

### Configure the load profile

Configure how virtual users are ramped up and sustained during the test:

| Parameter | Description | Constraint |
|---|---|---|
| **Number of Users** | Peak concurrent virtual users. | Must be a positive integer. |
| **Test Duration (seconds)** | Total test runtime. | Must be greater than Ramp-Up Duration. |
| **Ramp-Up Duration (seconds)** | Time to reach peak users from zero. | Must be less than Test Duration. |

Steady-state duration = `Test Duration - Ramp-Up Duration`.

The **Load Profile** graph updates in real time as you adjust values. The **Load Profile Summary** shows a plain-English breakdown, for example: Ramp up to 100 users in 120s, maintain steady state for 480s, total duration 600s (10m 0s).

### Save and run the test

1. Click **Save** to create the load test.
2. Find your test in the **Load Tests** list, which shows Type, Users, Duration, and recent executions at a glance.
3. Click the **Run** (▶) button on any test to start an execution.
4. Monitor real-time results during execution.

---

## Next steps

- Go to [Analyze load test results](../analyze-results) to interpret throughput, error rate, and response times.
- Go to [k6](./k6) to run a JavaScript-based test with thresholds on Kubernetes.
- Go to [Key concepts](../get-started#key-concepts) to review virtual users, ramp-up, assertions, and load profiles.
