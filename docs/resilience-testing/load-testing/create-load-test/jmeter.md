---
title: JMeter
sidebar_label: JMeter
sidebar_position: 3
description: Run an Apache JMeter load test on Linux VM or Kubernetes to reuse existing JMX test plans, override properties, and gate releases in Harness Resilience Testing
keywords:
  - jmeter load test
  - performance testing
  - jmx test plan
  - distributed load test
tags:
  - load-testing
  - jmeter
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocImage from '@site/src/components/DocImage';

[Apache JMeter](https://jmeter.apache.org/) is a Java load testing tool that drives load from `.jmx` test plans. Use JMeter when you already have JMX plans you want to reuse without a rewrite, when you need protocol coverage beyond HTTP, or when you want to parameterize a plan with properties at run time. In Harness Resilience Testing, you build a JMeter test in the **Load Test Studio** and run it on your Linux VM or Kubernetes infrastructure.

---

## What you can do with JMeter

Each goal below maps to a JMeter capability you configure on this page:

- **Reuse an existing JMX plan.** [Upload a `.jmx`, `.xml`, or `.zip`](#define-the-test) and Harness runs it exactly as authored, so you do not rewrite tests you already trust.
- **Bundle data and dependencies.** Package your plan with CSV data files and JAR dependencies in a `.zip` and upload it as one artifact.
- **Parameterize without editing the plan.** Use [property overrides](#override-jmeter-properties) to change values such as thread count, ramp-up, and duration at run time, so one plan is reusable across environments.
- **Bring a packaged setup.** Reference a [custom image](#define-the-test) that already contains JMeter, plugins, and your plan.
- **Gate a release on performance.** Add [pass/fail thresholds](#gate-a-release-with-passfail-thresholds) so a regression fails the run automatically.
- **Drive very high load.** Use [distributed execution](#scale-with-distributed-execution) on Kubernetes to split the plan across worker pods for higher concurrency.

---

## Prerequisites

- **Module access:** Access to the Harness Resilience Testing module.
- **Infrastructure:** A chaos infrastructure with load testing enabled, either a [Linux Chaos Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/linux) or a [Kubernetes Chaos Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/kubernetes) (v1.85.3 or later).
- **Environment:** An environment created in your project for the infrastructure.
- **Test plan or image:** A JMeter `.jmx` test plan (or a `.zip` bundle), or a container image that contains JMeter and your plan.
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
<TabItem value="kubernetes" label="Kubernetes" default>

Select **Kubernetes** as the target type, then select a Kubernetes Chaos Infrastructure from the **Load Test Infrastructure** dropdown. Set **Load Test Type** to **JMeter**.

The agent in the cluster runs JMeter as a master pod and optional worker pods for load generation.

- Best for scalable, distributed load generation and cloud-native environments.
- Required for [distributed execution](#scale-with-distributed-execution) across multiple workers.
- Go to [Kubernetes Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/kubernetes) for setup instructions.

</TabItem>
<TabItem value="linux" label="Linux VM">

Select **Linux VM** as the target type, then select a Linux Chaos Infrastructure (with load testing enabled) from the **Load Test Infrastructure** dropdown. Set **Load Test Type** to **JMeter**.

The Harness chaos agent on the VM runs the JMeter process locally and streams results back to Harness.

- Best for simple setups, on-premises hosts, or direct network access to internal services.
- Go to [Linux Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/linux) for setup instructions.

</TabItem>
</Tabs>

<DocImage path={require('./static/jmeter/overview.png')} alt="The Overview tab showing the Metadata fields, the Execution Environment with Kubernetes and Linux VM target types, the Load Test Infrastructure dropdown, and JMeter selected as the Load Test Type" title="Click to view full size" />
<p align="center"><em>The Overview tab. Enter the test name and optional description and tags, choose a Target Type (Kubernetes or Linux VM), select the load test infrastructure, then set Load Test Type to JMeter.</em></p>

Click **Next** to proceed to **Test Configuration**.

### Define the test

On the **Test Configuration** tab, choose how you want to define the test workload. JMeter supports two modes: upload a test plan, or reference a custom container image.

<Tabs>
<TabItem value="upload" label="Upload JMX / XML / ZIP" default>

Upload an existing JMeter test plan. Harness runs it exactly as uploaded, so the plan behaves the same as it does in JMeter.

| Field | Description |
|---|---|
| **Test plan** | Drag and drop or browse to upload a `.jmx`, `.xml`, or `.zip` file. Maximum size is 1 MB. |

Use a `.zip` to bundle the plan with the files it depends on. A `.zip` can include the `.jmx` plan plus CSV data files (for the CSV Data Set Config element) and any JAR dependencies your plan needs.

<DocImage path={require('./static/jmeter/upload-test-plan.png')} alt="The Test Configuration tab with Upload JMX / XML / ZIP selected, showing the Upload Test Plan drop zone, the Property Overrides table with threads, rampup, and duration rows, and the Environment Variables section" title="Click to view full size" />
<p align="center"><em>The Upload JMX / XML / ZIP mode. Upload your <code>.jmx</code>, <code>.xml</code>, or <code>.zip</code> plan, then override plan properties such as threads, rampup, and duration without editing the file.</em></p>

</TabItem>
<TabItem value="image" label="Using Custom Image">

Use a prebuilt container image as the load test source. The image must contain JMeter and your test plan. This is useful when you maintain a packaged JMeter setup, with plugins and dependencies, outside Harness. Each value can be a fixed value or a runtime input.

| Field | Description |
|---|---|
| **Load Test Image** | Container image reference (for example, `my-registry/my-load-test:latest`). |
| **Entrypoint** | Path to the `.jmx` test plan inside the image (for example, `test.jmx`). |
| **Load args** | Additional arguments passed to the JMeter command (for example, `proxyHost=10.0.0.1;proxyPort=8080`). |

<DocImage path={require('./static/jmeter/using-custom-image.png')} alt="The Test Configuration tab with Using Custom Image selected, showing the Load Test Image, Entrypoint, and Load args fields alongside the Property Overrides table" title="Click to view full size" />
<p align="center"><em>The Using Custom Image mode. Provide the container image, the entrypoint path to your <code>.jmx</code> plan, and optional load args. Each value can be a fixed value or a runtime input.</em></p>

</TabItem>
</Tabs>

---

## Override JMeter properties

Property overrides pass JMeter properties into the run without editing the plan, so a single plan works across environments and workloads. Reference each property in your plan with `${__P(name)}`, for example `${__P(threads)}`.

Add one row per property in the **Property Overrides** table:

| Field | Example | Description |
|---|---|---|
| **Property** | `threads` | The JMeter property name referenced in the plan. |
| **Value** | `100` | The value to pass at run time. |
| **Send to engines (-G)** | Yes | When on, the property is sent to remote engines with the `-G` flag so it applies to every worker in a distributed run. Turn it off for properties that only the master needs. |

Click **+ Add property** to define more overrides. Common properties are `threads` (concurrent users), `rampup` (seconds to reach peak threads), and `duration` (total run time in seconds), but you can override any property your plan reads.

---

## Add environment variables

Use environment variables to pass configuration and secrets into the test without hardcoding them in the plan. Add each variable as a **Key** and **Value** pair, and set **Secret** to **Yes** to encrypt the value at rest. Click **+ Add variable** to add more.

---

## Gate a release with pass/fail thresholds

Thresholds turn a load test into a gate. Add pass/fail criteria on metrics so Harness evaluates the JMeter run automatically. If any threshold fails, the run is marked **Failed**, which makes JMeter well suited to release gates in continuous integration.

Click **+ Add threshold** to define a criterion on a metric, such as error rate or response time. Thresholds are optional but recommended, because without them a run reports metrics but never fails on a regression.

---

## Scale with distributed execution

When a single instance cannot generate enough load, distributed execution runs the plan across multiple worker pods on Kubernetes. Set the number of **Workers** in the **Distributed Execution** section.

| Workers | Behavior |
|---|---|
| **0 or 1** | Single-worker mode (standalone). The plan runs on one instance. |
| **2 or more** | The load is distributed across worker pods. Use this for high concurrency. |

:::info Kubernetes only
Distributed execution is available on Kubernetes infrastructure only. On a Linux VM, JMeter runs as a single standalone instance. To scale across workers, use a Kubernetes target type.
:::

For distributed runs, keep **Send to engines (-G)** on for any [property override](#override-jmeter-properties) that every worker must use.

---

## Save and run the test

1. Click **Save** to create the load test.
2. Find your test in the **Load Tests** list, which shows Type, Users, Duration, and recent executions at a glance.
3. Click the **Run** (▶) button to start an execution.
4. Monitor real-time results during execution. A breached threshold marks the run as Failed.

---

## Next steps

- Go to [Analyze load test results](../analyze-results) to interpret throughput, error rate, response times, and threshold outcomes.
- Go to [Locust](./locust) to run a Python-based test on Linux VM or Kubernetes.
- Go to [k6](./k6) to run a JavaScript-based test with thresholds on Kubernetes.
- Go to [Key concepts](../get-started#key-concepts) to review virtual users, load profiles, and thresholds.
