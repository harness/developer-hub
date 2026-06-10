---
title: AI Test Automation with Harness CI and CD
description: Use the AI Test Automation step in CI, CD, or Custom stages within Harness pipelines. The Framework field selects AI-authored suites or Playwright builds.
sidebar_position: 10
sidebar_label: Harness Pipeline
redirect_from:
  - /docs/ai-test-automation/integrations/harness-ci
keywords:
  - AI Test Automation
  - Harness CI
  - Harness CD
  - Playwright
  - pipeline
  - custom stage
  - CI stage
  - CD stage
---

AI Test Automation is seamlessly integrated into the Harness Platform so you can run checks from **Harness Continuous Integration** (CI) and **Harness Continuous Delivery** (CD) pipelines. You add the same step (**AI Test Automation**) in a **CI**, **CD**, or **Custom** stage, wherever testing fits best in your pipeline. The **Framework** dropdown decides whether the step runs an **AI test** suite or a **Playwright** build; the rest of the form stays the same. See [Framework: AI test or Playwright](#framework-ai-test-or-playwright) for the field reference.

## Benefits

- **Flexible pipeline placement:** Add the step in a **CI**, **CD**, or **Custom** stage, wherever testing belongs in your delivery flow.
- **Early detection of issues:** Identify and resolve potential problems before they reach production environments.
- **Increased release confidence:** Deploy with confidence knowing your application has passed the runs you wired in.
- **Reduced manual testing:** Decrease dependency on time-consuming manual verification steps.
- **Continuous validation:** Ensure application behavior meets expectations at the exact point in the pipeline where the step runs.

## How it works

The **AI Test Automation** step runs work in your AI Test Automation project. Add it to a **CI**, **CD**, or **Custom** stage in Pipeline Studio so your test execution lives in one clear place in the same pipeline.

The **Framework** setting selects what gets executed:

- **AI test:** Runs a **test suite** created with the **AI Test** option under **Test Suites**. Create and manage those suites in [AI Test Automation](/docs/ai-test-automation/suites/harness-ai-suites).
- **Playwright:** Runs a **Playwright build** created with the **Playwright** option under **Test Suites**. Configure builds in [Playwright in AI Test Automation](/docs/ai-test-automation/suites/playwright-builds).

The field labels (**Project**, **Test Suite**, **Environment**, **Tunnel Name**) are the same regardless of which framework you pick; the dropdowns just list the suites or builds defined in that area of your project.

## Setup instructions

### Add the AI Test Automation step

1. Open your Harness pipeline in Pipeline Studio.
2. Pick (or add) the stage where AI Test Automation should run. The step is supported in **CI**, **CD**, and **Custom** stages, so choose whichever fits your flow. For how Harness defines stages, see [Add a stage](/docs/platform/pipelines/add-a-stage).
3. In that stage, open the area where you add steps (for example **Execution** or the equivalent tab for the stage type).

<DocImage
  path={require('./static/add-step.png')}
  alt="Add step"
  title="Click to view full size image"
  width={800}
  height={400}
/>

4. Add a new step and select **AI Test Automation** from the available options.

<DocImage
  path={require('./static/step-library.png')}
  alt="Step Library"
  title="Click to view full size image"
  width={400}
  height={600}
/>

5. Configure the step in **Step Parameters** (and **Advanced** if needed). Set **Framework** to **AI test** or **Playwright**, then complete the remaining fields as described under [Framework: AI test or Playwright](#framework-ai-test-or-playwright).

<DocImage
  path={require('./static/ai-test-automation-step-inputs.png')}
  alt="AI Test Automation step Step Parameters with Framework set to Playwright, Project, Test Suite, Environment, Tunnel Name, and the Optional Settings section expanded"
  title="Click to view full size image"
  width={400}
  height={800}
/>

6. Select **Apply Changes** when you are done editing the step, then save your pipeline configuration.

### Framework: AI test or Playwright {#framework-ai-test-or-playwright}

In **Step Parameters**, **Framework** is the switch. The rest of the form uses the same labels regardless of the framework; only the dropdown contents differ (suites vs. builds).

**Core fields**

- **Name:** Step identifier in the pipeline (for example `AiTestAutomation_1`); an **Id** appears beside it for the step entity.
- **Description (optional):** Optional note for operators.
- **Framework:** **AI test** or **Playwright**. Selects whether the step runs an AI-authored suite or a Playwright build.
- **Project:** The AI Test Automation project (application) that owns the suites/builds.
- **Test Suite:** The suite to run when **Framework** is **AI test**, or the Playwright build to run when **Framework** is **Playwright**. The dropdown lists what is defined in **Test Suites** for the selected framework.
- **Environment:** Target application environment for the run (for example **Default**).
- **Tunnel Name:** How traffic reaches the system under test. Choose a value from the dropdown (for example **Harness Cloud** for Harness-hosted execution); available options depend on your project.

**Optional Settings**

Expand **Optional Settings** to override defaults at run time. Leave any field blank or set to **- Use config default -** to keep the value from your project's configuration (for Playwright, the values in `playwright.config`).

:::tip Expression inputs
All pipeline variable fields in this step support Harness expressions. For example, set **Environment** to `<+pipeline.variables.target_env>` or **Tunnel Name** to `<+stage.variables.tunnel>` to parameterize runs at trigger time without editing the step.
:::

The Playwright-specific overrides match the ones in the [Run Configuration modal for a Playwright build](/docs/ai-test-automation/suites/playwright-builds#run-playwright-tests):

- **Number of Retries**
- **Delay (seconds)**
- **Worker**
- **Navigation Timeout (seconds)**
- **Overall Timeout (seconds)**
- **Action Timeout (seconds)**
- **Report Pattern**

**Other controls**

- **Advanced tab:** Additional step configuration (failure strategies, conditional execution, looping) next to **Step Parameters**.
- **Save as Template:** Available from the step header when you want to reuse the configuration across pipelines.

### Configuration reference

| Field | Description |
|-------|-------------|
| **Name** | Identifier for this step in the pipeline. |
| **Framework** | **AI test** for AI-authored suites, **Playwright** for Playwright builds. |
| **Project** | AI Test Automation project that owns the suite or build. |
| **Test Suite** | Suite (AI test) or build (Playwright) to execute. |
| **Environment** | Application environment to run against. |
| **Tunnel Name** | Tunnel used for execution (choices depend on project setup). |
| **Optional Settings** | Run-time overrides such as retries, workers, timeouts, and report pattern (Playwright). Leave blank to use config defaults. |

## Sample video explaining the flow

<iframe src="https://www.loom.com/embed/c55bb24b5f124f9fbe369d097f6528c4?sid=6a3332d4-f145-4de8-ad64-f7b2228fcb3b" width="960" height="540" frameborder="0" allowfullscreen></iframe>

## View test results in CI

After the AI Test Automation step completes in a CI stage, open the **Tests** tab in the build execution view to see the full test results. For Playwright runs, this shows the total test count, pass/fail/flaky breakdown, failure rate, and individual test details.

<DocImage
  path={require('./static/playwright-pipeline-tests.png')}
  alt="CI build Tests tab showing Playwright test results with pass, fail, and flaky counts"
  title="Playwright test results in CI build execution"
  width="100%"
/>

## Conclusion

AI Test Automation in Harness CI and CD uses one step type that you can place in a **CI**, **CD**, or **Custom** stage: pick **AI test** or **Playwright** under **Framework**, complete the **Project**, **Test Suite**, **Environment**, and **Tunnel Name** fields, optionally override defaults under **Optional Settings**, and save the pipeline so each run triggers the correct suite or build.
