---
title: Run a Load Test in a Pipeline
sidebar_label: Run in a Pipeline
sidebar_position: 4
description: Add a Load Test step to a Harness pipeline and pass runtime inputs so you can validate performance as part of your delivery process
keywords:
  - load test pipeline
  - load test step
  - runtime input
  - performance testing
tags:
  - load-testing
  - pipelines
---

Add a **Load Test** step to a Harness pipeline to run an existing load test as part of your delivery process. The step references a load test you already created, and you pass its parameters as fixed values, runtime inputs, or expressions. This lets you validate performance on every deployment and reuse one load test across pipelines with different values.

:::info Feature flag
Load Testing is currently behind a feature flag (`CHAOS_LOAD_TESTING_ENABLED`). Contact your Harness sales representative to enable it for your account.
:::

---

## Prerequisites

- **Module access:** Access to the Harness Resilience Testing module.
- **A load test:** An existing load test to reference in the step. Go to [Locust](./create-load-test/locust) or [k6](./create-load-test/k6) to create one.
- **A pipeline:** A pipeline with a stage that supports the Load Test step, such as a Deploy or Custom stage.

---

## Add a Load Test step

1. Open your pipeline and select the stage where you want to run the load test.
2. On the **Execution** tab, select **Add Step**.
3. In the **Step Library**, under **Resilience Testing**, select **Load Test**. The **Configure Load Test** panel opens.
4. Enter the step details:

| Field | Description |
|---|---|
| **Name** | A descriptive name for the step. |
| **Id** | The step identifier, generated from the name. Select the edit icon to change it. |
| **Description** | (Optional) What the step validates. |
| **Load Test Reference** | The load test this step runs. Select **Select Load Test** to choose one. |

You can add more than one Load Test step to a stage to run several tests in sequence.

---

## Select the load test

1. In **Load Test Reference**, select **Select Load Test**.
2. In the **Select Load Test** modal, search for a load test and select its card. Each card shows the engine (Locust or k6), the last run status, and when it was last updated. The **Summary** panel shows the test's users and duration.
3. Select **Add to Pipeline**.

:::tip Create a load test inline
Select **+ New Load Test** in the modal to create a load test without leaving the pipeline.
:::

---

## Configure tool inputs

After you select a load test, the **Tool Inputs** section shows the parameters the test exposes. The inputs depend on the referenced load test and its engine. For example, a Locust test on Kubernetes exposes:

| Input | Description |
|---|---|
| **durationSeconds** | Total run time of the load test, in seconds. |
| **rampUpTimeSec** | Time to ramp virtual users from zero to the target, in seconds. |
| **workerCount** | Number of worker pods that generate load. |
| **targetUrl** | The base URL of the application under test. |

Required inputs are marked with an asterisk (`*`).

For each input, select the pin icon to choose how to provide its value:

| Value type | When to use |
|---|---|
| **Fixed value** | Enter the value now. It does not change at runtime. |
| **Runtime input** | Leave the value open and provide it when the pipeline runs. Harness prompts you for it before execution. |
| **Expression** | Reference a pipeline variable or a prior step's output, such as `<+pipeline.variables.targetUrl>`. |

Use **Runtime input** to reuse the same load test across pipelines and supply different values per run. Use **Expression** to derive a value from earlier stages, such as the URL of a service you just deployed.

---

## Save the step as a template

To reuse this step configuration across pipelines, select **Save as Template** in the **Configure Load Test** panel. Go to [Use HCE with Continuous Delivery](/docs/resilience-testing/chaos-testing/integrations/cicd/harness-cd) to review how step templates work in pipelines.

---

## Apply and run

1. (Optional) Select the **Advanced** tab to configure a failure strategy and other settings.
2. Select **Apply Changes** to save the step, then **Save** to save the pipeline.
3. Run the pipeline. If any input is a runtime input, Harness prompts you for its value before the step runs. The step resolves the inputs and variables, then runs the load test.

Go to [Analyze load test results](./analyze-results) to interpret throughput, error rate, response times, and threshold outcomes.

---

## Next steps

- Go to [Load Test Templates](./load-test-templates) to create reusable load tests you can reference in a step.
- Go to [Use HCE with Continuous Delivery](/docs/resilience-testing/chaos-testing/integrations/cicd/harness-cd) to add chaos experiments to the same pipeline.
- Go to [Analyze load test results](./analyze-results) to review a run.
