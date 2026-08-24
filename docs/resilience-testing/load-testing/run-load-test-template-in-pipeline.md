---
title: Create and use a Load Test step template
sidebar_label: Use a Load Test Step Template
sidebar_position: 50
description: Create a Load Test step template from a ChaosHub load test template, then add the step template to a Harness pipeline
keywords:
  - load test step template
  - load test pipeline
  - pipeline template
  - performance testing
tags:
  - load-testing
  - pipelines
  - templates
---

Create a pipeline step template from a load test template in a ChaosHub, then reuse the step template across stages and pipelines. This flow keeps both the load test definition and its pipeline configuration consistent across teams.

:::info Feature flag
Load Testing is currently behind a feature flag (`CHAOS_LOAD_TESTING_ENABLED`). Contact your Harness sales representative to enable it for your account.
:::

:::note Load test template compared with Load Test step template
A **load test template** in a ChaosHub defines a reusable load test. A **Load Test step template** defines a reusable pipeline step that references a load test. A pipeline step cannot reference the ChaosHub template directly. First, create a load test from the ChaosHub template. Then reference that load test from the pipeline step and save the step as a template.
:::

---

## Before you begin

- **Module access:** Access to the Harness Resilience Testing module.
- **ChaosHub template:** A load test template in a ChaosHub. Go to [Load Test Templates](./load-test-templates) to create one.
- **Infrastructure:** A chaos infrastructure that matches the target type of the ChaosHub template.
- **Pipeline:** A pipeline with a Deploy or Custom stage.

---

## Create a load test from the ChaosHub template

1. Navigate to **Project Settings**, then select **ChaosHubs**.
2. Open the ChaosHub that contains the template.
3. Select the **Load Test Templates** tab.
4. Find the template, then click **Create Load Test**.
5. In **Create load test from template**, enter the name, description, and tags for the load test.
6. Select the template revision and the organization and project where you want to create the load test.
7. Select a chaos infrastructure that matches the template target type.
8. Click **Import as Reference**.

Harness creates the load test and links it to the ChaosHub template revision. To create an independent load test that does not receive template updates, click the arrow next to **Import as Reference**, then select **Import as a Copy**.

---

## Create the Load Test step template

1. Open a pipeline and select the Deploy or Custom stage where you want to configure the step.
2. On the **Execution** tab, click **Add Step**.
3. In the **Step Library**, under **Resilience Testing**, select **Load Test**. The **Configure Load Test** panel opens.
4. In **Load Test Reference**, select **Select Load Test**.
5. In the **Select Load Test** modal, search for the load test that you created from the ChaosHub template, then select its card.
6. Review the load test summary, then click **Add to Pipeline**.
7. Configure the tool inputs. Set any values that each pipeline must supply as runtime inputs.
8. Click **Save as Template** in the **Configure Load Test** panel.
9. Enter the template name and version label, then select where to save the template.
10. Select **Inline** to store the template in Harness, or select **Remote** to store it in a Git repository.
11. Click **Save**.

The saved template appears under **Step and Step Group Templates** with the type **Configure Load Test**.

---

## Add the step template to a pipeline

1. Open the target pipeline and select the stage where you want to run the load test.
2. On the **Execution** tab, click **Add Step**.
3. Click **Use Template**.
4. In **Templates**, select **Step and Step Group Templates**.
5. Search for the Load Test step template. Use the scope dropdown or **Select Repository** to narrow the results when needed.
6. Select the template card. Confirm that its **Type** is **Configure Load Test**.
7. Under **Select Template By**, select **Version** or **Label**, then select the value to use.
8. Review **Template Inputs** and provide each required value. Use fixed values, runtime inputs, or expressions as the input permits.
9. Click **Use Template** to add a template reference to the pipeline.

Select **Copy Template** instead when you need an independent step that does not receive later template updates.

---

## Save and run the pipeline

1. Review the Load Test step in the stage execution.
2. Click **Save** to save the pipeline.
3. Click **Run**. Harness prompts for any runtime inputs before execution.
4. Open the Load Test step in the execution to review its logs and select **View Load Test Execution**.

Go to [Analyze load test results](./analyze-results) to interpret throughput, error rate, response times, and threshold outcomes.

---

## Next steps

- Go to [Run a load test in a pipeline](./run-in-pipeline) to configure a Load Test step without a step template.
- Go to [Load Test Templates](./load-test-templates) to manage reusable load test definitions in a ChaosHub.
- Go to [Use HCE with Continuous Delivery](/docs/resilience-testing/chaos-testing/integrations/cicd/harness-cd) to add chaos experiments to the same pipeline.
