---
title: Python
sidebar_label: Python
sidebar_position: 10
description: Run a Python load test based on Locust on Linux VM or Kubernetes in Harness Resilience Testing
keywords:
  - python load test
  - locust load test
  - performance testing
  - load test engine
tags:
  - load-testing
  - locust
  - python
redirect_from:
  - /docs/resilience-testing/load-testing/create-load-test/linux-vm
  - /docs/resilience-testing/load-testing/create-load-test/kubernetes
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocImage from '@site/src/components/DocImage';

The **Python** Load Test Engine is based on [Locust](https://locust.io/). It models user behavior as Python classes and tasks. Use Python when your team works in Python, when you want to express user journeys as code with conditional logic, or when you need a straightforward ramp-up to steady-state load. Python runs on both **Linux VM** and **Kubernetes** infrastructure, so it fits everything from a single on-premises host to scalable distributed runs.

---

## What you can do with Python

- **Reuse Python skills and scripts.** Write scenarios as Python classes, or upload an existing `.py` Locust script.
- **Test from a single host.** Run on a Linux VM for on-premises targets or direct network access to internal services.
- **Scale out on Kubernetes.** Run a master pod with worker pods for higher concurrency.
- **Model user behavior.** Weight tasks so frequent actions run more often than rare ones.

---

## Prerequisites

- **Module access:** Access to the Harness Resilience Testing module.
- **Infrastructure:** A chaos infrastructure with load testing enabled, either a [Linux Chaos Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/linux) or a [Kubernetes Chaos Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes) (v1.85.3 or later).
- **Environment:** An environment created in your project for the infrastructure.
- **An onboarded service:** At least one service onboarded against that infrastructure.
- **Reachable target:** Target application endpoints accessible from the test infrastructure.

---

## Create a load test

1. Navigate to **Resilience Testing** > **Load Testing**.
2. Click **+ New Load Test**.

:::tip Try a sample test
Click the arrow beside **+ New Load Test** and select **Try Locust Sample Test** to explore the flow with a pre-configured test before you build your own.
:::

### Configure the load test overview

On the **Overview** tab, enter the test metadata, then select the infrastructure where the test runs. Set **Name**, an optional **Description**, and optional **Tags**, then choose a **Target Type**.

<Tabs>
<TabItem value="linux" label="Linux VM" default>

Select **Linux VM** as the target type, then select a Linux Chaos Infrastructure (with load testing enabled) from the **Load Test Infrastructure** dropdown. Set **Load Test Engine** to **Python** (Based on Locust).

The Harness chaos agent on the VM runs the Locust process locally and streams results back to Harness.

- Best for simple setups, on-premises hosts, or direct network access to internal services.
- Go to [Linux Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/linux) for setup instructions.

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Select **Kubernetes** as the target type, then select a Kubernetes Chaos Infrastructure from the **Load Test Infrastructure** dropdown. Set **Load Test Engine** to **Python** (Based on Locust).

The agent in the cluster orchestrates a master pod and optional worker pods for load generation.

- Best for scalable, distributed load generation and cloud-native environments.
- Go to [Kubernetes Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes) for setup instructions.

</TabItem>
</Tabs>

Use lowercase letters, numbers, and dashes in **Name**. Harness derives the **Id** from it.

#### Select the services under test

A **Services** section appears once you choose an infrastructure, and it is required. Select at least one onboarded service under **Resilience Testing Services**. The picker lists only the services onboarded against the infrastructure you selected.

If that infrastructure has no onboarded services, the section reads **No resilience testing services yet** and offers **Onboard a Service**. You cannot continue until at least one exists, because Harness reports load results against the service rather than against the test alone.

Click **Next** to proceed to **Test Configuration**.

### Define the test

On the **Test Configuration** tab, choose how you want to define the test workload. Locust supports two modes: upload a Python script, or reference a custom container image.

<Tabs>
<TabItem value="script" label="Upload Python script" default>

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

<DocImage path={require('./static/locust/upload-python-script.png')} alt="The Test Configuration tab with Upload Python script selected, showing the Host URL and Locust Script File upload fields alongside the Load Configuration and Load Profile graph" title="Click to view full size" />
<p align="center"><em>The Upload Python script mode. Provide an optional Host URL that Locust prepends to relative paths, upload your <code>.py</code> script, then set Users, Duration, Ramp Up Duration, and Worker Count in the Load Configuration.</em></p>

</TabItem>
<TabItem value="image" label="Using Custom Image">

Use a prebuilt container image as the load test source. This is useful when you have a custom Locust setup packaged as a Docker image. This mode is available on Kubernetes infrastructure only, since the image runs as a pod in the cluster.

| Field | Description |
|---|---|
| **Host URL** | Base URL of the application under test. |
| **Load Test Image** | Container image reference (for example, `my-registry/my-load-test:latest`). |
| **Entrypoint** | Path to the Locust script inside the container (for example, `/scripts/locustfile.py`). |
| **Arguments** | Optional runtime arguments passed to the container (for example, `tags=smoke,fast;headless=true`). |
| **Image Registry Type** | Select **Public** for an image anyone can pull, or **Private** to pull with credentials. |
| **Secret Name** | The Kubernetes image pull secret used to authenticate. This field appears only when **Image Registry Type** is **Private**. |

<DocImage path={require('./static/locust/using-custom-image.png')} alt="The Test Configuration tab with Using Custom Image selected, showing the Host URL, Load Test Image, Entrypoint, and Arguments fields alongside the Load Configuration and Load Profile graph" title="Click to view full size" />
<p align="center"><em>The Using Custom Image mode, available on Kubernetes only. Provide the Host URL, container image, entrypoint, and optional arguments, then set the load profile in the Load Configuration.</em></p>

</TabItem>
</Tabs>

### Configure the load profile

Configure how virtual users are ramped up and sustained during the test:

| Parameter | Description | Constraint |
|---|---|---|
| **Users** | Peak concurrent virtual users. | Must be a positive integer. |
| **Duration (seconds)** | Total test runtime. | Must be greater than Ramp Up Duration. |
| **Ramp Up Duration (seconds)** | Time to reach peak users from zero. | Must be less than Duration. |
| **Worker Count** | Number of worker processes that generate load. | Must be a positive integer. |

Steady-state duration = `Duration - Ramp Up Duration`.

:::info Distributed load requires Kubernetes
Only a Kubernetes target spreads load across workers, where each worker runs as its own pod. On a Linux VM the test runs as a single process on the host, so raising **Worker Count** does not distribute the load. Use a Kubernetes infrastructure when one host cannot generate enough traffic.
:::

The **Load Profile** graph updates in real time as you adjust values. The **Load Profile Summary** shows a plain-English breakdown, for example: Ramp up to 100 users in 120s, maintain steady state for 480s, total duration 600s (10m 0s).

### Set a value at run time

Every tool input carries a pin control at the end of the field. Select it to switch the field between **Fixed value** and **Runtime input**.

A fixed value is stored with the test and used on every run. A runtime input leaves the field unset, so the value is supplied when the test runs, which lets one load test serve several environments or load levels. Go to [Run a load test in a pipeline](../run-in-pipeline) to supply these values from a pipeline.

### Define variables

**Variables** is a drawer on the right edge of the Load Test Studio, available for both target types. A variable holds a value once and supplies it to the tool inputs, so a value such as a host name or a user count lives in one place instead of being repeated across fields.

Select **+ Add Variable** and complete the **New Variable** dialog:

| Field | Description |
|---|---|
| **Type** | **String**, **Number**, or **Secret**. Use **Secret** for credentials so the value is not stored in the test definition. |
| **Name** | The variable name. |
| **Value** | The value to use. This field carries its own pin control, so a variable can itself be a runtime input. |
| **Description** | (Optional) What the variable is for. |

Select **Save** to add the row, then **Apply Changes** to keep the drawer's edits. The drawer lists each variable with its **Variable**, **Description**, and **Value**.

### Tune pods with Advanced Options

**Advanced Options** is a drawer on the right edge of the Load Test Studio that controls how the load pods themselves behave. It applies to Kubernetes targets only, since both settings act on pods, and does not appear for a Linux VM target.

| Setting | Default | What it does |
|---|---|---|
| **Clean-up Load Resources** | On | Deletes the pods, configmaps, and secrets a run created once the run finishes. Turn it off to keep those resources for debugging, and remove them yourself afterwards. |
| **Resource Requirements** | Off | Sets CPU and memory requests and limits on the load pods. Turn it on when a run is throttled or evicted, or when your cluster enforces quotas. |

Select **Apply Changes** to keep your edits, or **Discard** to close the drawer without saving.

### Save and run the test

1. Click **Save** to create the load test.
2. Find your test in the **Load Tests** list, which shows Type, Users, Duration, and recent executions at a glance.
3. Click the **Run** (▶) button on any test to start an execution.
4. Monitor real-time results during execution.

---

## Next steps

- Go to [Analyze load test results](../analyze-results) to interpret throughput, error rate, and response times.
- Go to [JavaScript](./k6) to run a JavaScript-based test with thresholds on Kubernetes.
- Go to [Java](./jmeter) to run an existing `.jmx` test plan on Kubernetes.
- Go to [Composite load tests](../composite-load-tests) to run this test alongside a probe that measures health while the load is applied.
- Go to [Key concepts](../get-started#key-concepts) to review virtual users, ramp-up, and load profiles.
