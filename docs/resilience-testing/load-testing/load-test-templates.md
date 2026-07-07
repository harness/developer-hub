---
title: Load Test Templates
sidebar_label: Load Test Templates
sidebar_position: 3
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

A **load test template** is a reusable, pre-configured load test that you store in a ChaosHub. Instead of rebuilding the same test each time, you define the execution environment, framework, and workload once, then spin up new load tests from the template. Templates keep load tests consistent across teams and cut the time it takes to start a new test.

:::info Feature flag
Load Testing is currently behind a feature flag (`CHAOS_LOAD_TESTING_ENABLED`). Contact your Harness sales representative to enable it for your account.
:::

---

## What you can do with load test templates

- **Standardize tests across teams.** Capture an approved execution environment, framework, and workload once, and reuse it everywhere.
- **Start new tests faster.** Create a load test from a template instead of configuring one from scratch.
- **Share across scopes.** Store templates at the account, organization, or project level so the right teams can reuse them.
- **Track changes over time.** Templates are revisioned, so you can update a template and keep a history of its versions.

---

## Prerequisites

- **Module access:** Access to the Harness Resilience Testing module.
- **ChaosHub:** A ChaosHub in the scope where you want the template available. Go to [ChaosHub](/docs/resilience-testing/chaos-testing/chaoshub) to add or manage a hub.
- **Infrastructure:** A [chaos infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/types) that matches the target type you plan to use (Kubernetes or Linux VM).

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

Then select a **Load Test Type**:

| Load test type | Description |
|---|---|
| **Locust** | Python-based load testing. Runs on Kubernetes or Linux VM. |
| **K6** | JavaScript-based load testing. Runs on Kubernetes only. |
| **JMeter** | Coming soon. |

:::info k6 runs on Kubernetes only
k6 load tests run on **Kubernetes** infrastructure. To target a Linux VM, use **Locust**.
:::

Select **Next** to proceed to **Test Configuration**.

### Define the test workload

On the **Test Configuration** step, define the workload the template runs. The controls match the [Load Test Studio](./create-load-test/locust) for the framework you selected, so you can define the test through the UI, upload a script, or use a custom image.

- Go to [Locust](./create-load-test/locust) to configure a Python-based workload.
- Go to [k6](./create-load-test/k6) to configure a JavaScript-based workload with scenarios and thresholds.

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

- Go to [Locust](./create-load-test/locust) to define a Python-based load test workload.
- Go to [k6](./create-load-test/k6) to define a JavaScript-based load test workload with thresholds.
- Go to [ChaosHub](/docs/resilience-testing/chaos-testing/chaoshub) to manage the hub that stores your templates.
- Go to [Templates](/docs/resilience-testing/chaos-testing/templates) to review fault, experiment, probe, and action templates.
