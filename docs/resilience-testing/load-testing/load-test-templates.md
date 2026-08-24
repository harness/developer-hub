---
title: Load Test Templates
sidebar_label: Load Test Templates
sidebar_position: 30
description: Create reusable load test templates in the ChaosHub to standardize and quickly spin up load tests in Harness Resilience Testing
keywords:
  - load test template
  - reusable load test
  - chaoshub
  - performance testing
tags:
  - load-testing
  - templates
---

A **load test template** is a reusable, pre-configured load test that you store in a ChaosHub. Instead of rebuilding the same test each time, you define the execution environment, Load Test Engine, and workload once, then spin up new load tests from the template. Templates keep load tests consistent across teams and cut the time it takes to start a new test.

:::info Feature flag
Load Testing is currently behind a feature flag (`CHAOS_LOAD_TESTING_ENABLED`). Contact your Harness sales representative to enable it for your account.
:::

---

## What you can do with load test templates

- **Standardize tests across teams.** Capture an approved execution environment, Load Test Engine, and workload once, and reuse it everywhere.
- **Start new tests faster.** Create a load test from a template instead of configuring one from scratch.
- **Share across scopes.** Store templates at the account, organization, or project level so the right teams can reuse them.
- **Track changes over time.** Templates are revisioned, so you can update a template and keep a history of its versions.

---

## Prerequisites

- **Module access:** Access to the Harness Resilience Testing module.
- **ChaosHub:** A ChaosHub in the scope where you want the template available. Go to [ChaosHub](/docs/resilience-testing/chaos-testing/chaoshub) to add or manage a hub.
- **Infrastructure:** A [chaos infrastructure](/docs/resilience-testing/chaos-testing/infrastructure) that matches the target type you plan to use (Kubernetes or Linux VM).

---

## Where load test templates live

Load test templates are stored in a ChaosHub, alongside fault, experiment, probe, and action templates. Open a ChaosHub and select the **Load Test Templates** tab to view the catalog.

The catalog provides:

- **Search:** Find a template by name.
- **Infrastructure type filter:** Narrow the list to templates that target Kubernetes or Linux VM. Use **Reset** to clear filters.

### Template scopes

Like other ChaosHub templates, load test templates are available at the scope of the hub that holds them:

- **Account level:** Available across all organizations and projects in the account.
- **Organization level:** Available across the organization and its projects.
- **Project level:** Available within a single project only.

---

## Create a load test template

1. In the ChaosHub, open the **Load Test Templates** tab.
2. Select **+ New Load Test Template**. The **Load Test Template Studio** opens on the **Overview** step.

### Enter the template metadata

In the **Metadata** section, provide:

| Field | Description |
|---|---|
| **Name** | A descriptive identifier for the template. |
| **Id** | The template identifier, generated from the name. Select the edit icon to change it. |
| **Description** | (Optional) What the template validates. |
| **Tags** | (Optional) Labels to organize templates. |

### Choose the execution environment

Under **Execution Environment**, select a **Target Type**:

| Target type | How it runs |
|---|---|
| **Kubernetes** | Runs the load test on a Kubernetes cluster as a master pod and optional worker pods. |
| **Linux VM** | Runs the load test on a single Linux VM infrastructure. |

Then select a **Load Test Engine**:

| Load Test Engine | Based on | Description |
|---|---|---|
| **Python** | Locust | Python-based load testing. Runs on Kubernetes or Linux VM. |
| **JavaScript** | k6 | JavaScript-based load testing. Runs on Kubernetes only. |
| **Java** | JMeter | Java-based load testing that runs existing `.jmx` plans. Runs on Kubernetes only. |

:::info Only Python runs on a Linux VM
JavaScript and Java load tests run on **Kubernetes** infrastructure. When the target type is **Linux VM**, both are disabled and marked **Coming Soon**, so use **Python** to target a Linux VM.
:::

Select **Next** to proceed to **Test Configuration**.

### Define the test workload

On the **Test Configuration** step, define the workload the template runs. The controls match the Load Test Studio for the engine you selected, so you can upload a script, reference a custom image, or (where the studio supports it) configure the run through the UI.

#### Python (Locust)

Locust models user behavior as Python classes and tasks. On **Test Configuration**, choose one of these modes:

- **Upload Python script:** Provide an optional **Host URL** that Locust prepends to relative paths, upload your `.py` Locust script, then set **Users**, **Duration**, **Ramp Up Duration**, and **Worker Count** in Load Configuration.
- **Using Custom Image:** Point at a container image that already contains Locust and your script, set the **Entrypoint** path to the Locust file inside the image, and optionally pass load args.

Use Python when your team writes scenarios in Python, when you need conditional logic in the user journey, or when the template must run on a **Linux VM** as well as Kubernetes. Go to [Python](./create-load-test/locust) for the full field reference and sample flow.

#### JavaScript (k6)

Configure a JavaScript-based workload with scenarios and [thresholds](./create-load-test/k6#gate-a-release-with-passfail-thresholds) declared in the script. JavaScript runs on Kubernetes only. Go to [JavaScript](./create-load-test/k6) for script upload, load profile, and distributed execution.

#### Java (JMeter)

Configure a Java-based workload from an existing `.jmx` plan (or a `.zip` that bundles data files and JARs). Use [property overrides](./create-load-test/jmeter#override-jmeter-properties) so one plan serves multiple environments, and add [pass/fail thresholds](./create-load-test/jmeter#gate-a-release-with-passfail-thresholds) to gate releases. Java runs on Kubernetes only. Go to [Java](./create-load-test/jmeter) for upload modes, distributed workers, and Advanced Options.

### Edit as YAML

Use the **Visual** / **YAML** toggle at the top of the studio to switch between the form view and the raw YAML. Edit the template directly in YAML when you want full control or want to copy a definition between templates.

### Save the template

Select **Save** to add the template to the ChaosHub. The template appears in the **Load Test Templates** catalog and is available to create load tests within its scope.

---

## Create a load test from a template

Once a template exists, you create load tests directly from it in the ChaosHub, without rebuilding the configuration each time.

1. In the ChaosHub, open the **Load Test Templates** tab.
2. Select the template, then select **+ Create Load Test**. The **Create load test from template** modal opens.
3. Configure the new load test:

| Field | Description |
|---|---|
| **Name** | A descriptive identifier for the load test. |
| **ID** | The load test identifier, generated from the name. Select the edit icon to change it. |
| **Description** | (Optional) What the load test validates. |
| **Tags** | (Optional) Labels to organize load tests. |
| **Revision** | The template revision to create the load test from, such as `v1`. |
| **Organization** / **Project** | The scope where the load test is created. These are set by the template scope. |
| **Infrastructure** | The load test infrastructure that runs the test. The list is filtered to the template's target type. |

4. Choose how to import the template:

- **Import as Reference:** Link the load test to the template. The load test stays in sync with the template, so updates to the template flow through to the load test.
- **Import as a Copy:** Create an independent copy of the template's configuration. You can edit the load test without affecting the template, and it does not receive later template changes.

Select **Import as Reference**, or select the dropdown arrow and choose **Import as a Copy**. Harness creates the load test, which you can then run.

Go to [Analyze load test results](./analyze-results) to interpret the run.

---

## Manage templates

- **Update a template:** Open a template from the catalog and edit it in the studio. Each save creates a new revision, so you keep a history of changes.
- **Search and filter:** Use the search field and the **Infrastructure type** filter in the catalog to find a template quickly.

---

## Next steps

- Go to [Python](./create-load-test/locust) to define a Python-based load test workload.
- Go to [JavaScript](./create-load-test/k6) to define a JavaScript-based load test workload with thresholds.
- Go to [Java](./create-load-test/jmeter) to define a Java-based load test workload from an existing `.jmx` plan.
- Go to [ChaosHub](/docs/resilience-testing/chaos-testing/chaoshub) to manage the hub that stores your templates.
- Go to [Templates](/docs/resilience-testing/chaos-testing/templates) to review fault, experiment, probe, and action templates.
