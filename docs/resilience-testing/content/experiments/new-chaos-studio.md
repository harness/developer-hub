The **Chaos Studio** offers a streamlined approach to chaos experiment design.

## What is a Chaos Experiment?

A **chaos experiment** is a testing methodology that validates system resilience by introducing controlled failures and observing system behavior. Experiments are composed of three core components:

- **Faults**: Controlled disruptions injected into your system to simulate real-world failures
- **Probes**: Validation mechanisms that continuously monitor system health and behavior
- **Actions**: Automated responses and workflows that execute based on experiment conditions

---

## Create a Chaos Experiment

1. Navigate to **Chaos Experiments** and click on **New Experiment**.

2. In the next screen, enter the **Name**, select your **Chaos Infrastructure**.

![Create infra](./static/new-chaos-studio/create-experiment/create-infra.png)

3. In the **Experiment Builder** screen, you can build chaos experiments by adding:
   - **Faults** to simulate system failures
   - **Probes** to validate system behavior and health
   - **Actions** to automate responses based on experiment outcomes

    ![Experiment Builder](./static/new-chaos-studio/create-experiment/experiment-builder.png)

:::tip Alternative Method
You can also create experiments by uploading YAML files directly, which is useful for version control and programmatic experiment management.
:::

---

## Add Faults, Probes, and Actions

    ![Add Action](./static/new-chaos-studio/add-faults/all-screen.png)

#### Add a Fault

1. Click on '+' icon, then select **Add a Fault** to add a fault to the experiment.

2. Select the fault you want to add to the experiment and click **Add to experiment**.

    ![Add Fault](./static/new-chaos-studio/add-faults/add-fault.png)

3. Tune the properties of the fault, and click **Apply Changes**.
   
#### Add an Action

1. Click on '+' icon, then select **Add an Action** to add an action to the experiment.

2. Select the action you want to add to the experiment and click **Add to experiment**.

    ![Add Action](./static/new-chaos-studio/add-faults/add-action.png)

3. Modify the variables if any, then click **Apply Changes** in the next screen

#### Add a Probe

1. Click on '+' icon, then select **Add a Probe** to add a probe to the experiment.

2. Select the probe you want to add to the experiment and click **Add to experiment**.

    ![Add Probe](./static/new-chaos-studio/add-faults/add-probe.png)

3. Tune the properties of the probe, and click **Apply Changes**.

:::tip Parallel Execution
You can add multiple faults, probes, and actions to run in parallel by using **Ctrl+Click** (Windows/Linux) or **Cmd+Click** (Mac) when clicking the '+' icon. This allows you to execute multiple components simultaneously during your experiment.

![Parallel Execution](./static/new-chaos-studio/add-faults/parallel-node.png)
:::

--- 

## Run Experiment & Monitor with Timeline View

1. Save the experiment and click on **Run** to execute the experiment.

2. Once the experiment begins execution, you'll be taken to the **Timeline View** which provides real-time monitoring of your running experiment.

#### What is Timeline View?

The **Timeline View** displays a visual representation of all events in your chaos experiment as they happen. Each event shows with timestamps, giving you complete visibility into:

- **Chaos injection** - When faults start executing
- **Probe validation** - Real-time health checks and monitoring  
- **Actions execution** - Custom scripts and delay actions
- **Rollback/Cleanup** - Recovery and cleanup processes

        ![timeline view 2](./static/timeline/view-2.png)

In the example above, you can see how faults and probes run both serially and in parallel, with clear timestamps for each event.

#### Monitor Your Experiment

As your experiment runs, the timeline continuously updates showing:

- **Step 1:** Chaos injection starts → Event logging begins with timestamps
- **Step 2:** Probe validation runs → Continuous monitoring updates
- **Step 3:** Faults execute → Real-time status and metadata
- **Step 4:** Actions trigger → Custom workflows execute
- **Step 5:** Rollback/Cleanup → Recovery processes complete

#### Get Detailed Event Information

Click on any event in the timeline to view detailed metadata:

- **Experiment events** show name, tunables, and execution status

        ![experiment information view](./static/timeline/fault-view.png)

- **Probe events** display details, logs, and validation results
	
        ![probe information view](./static/timeline/probe-view.png)

This real-time monitoring helps you:
- **Track progress** as your experiment executes
- **Debug issues** by identifying exactly when and where failures occur
- **Analyze results** with complete execution history and metadata
- **Understand impact** of chaos faults and validation probes over time

---
## Edit Experiment

1. Go to **Chaos Experiments** and hover over the (⋮) icon next to the experiment you want to edit, then select **Edit Experiment**.

    ![Edit Experiment](./static/new-chaos-studio/add-faults/edit-experiment.png)

---

## Export Experiment

1. Go to **Chaos Experiments** and hover over the (⋮) icon next to the experiment you want to export, then select **Download Manifest**.

    ![Export Experiment](./static/new-chaos-studio/add-faults/export-experiment.png)

---

## Runtime Variable Support

Runtime variables provide flexibility in chaos experiments by allowing you to customize experiment parameters at execution time rather than hardcoding them during creation.

You can execute chaos experiments using either static values or dynamic runtime values:

- **Static variables**: Define them directly in the experiment and use them without any modification.
- **Runtime variables**: Specify them using `<+input>`, allowing customization at runtime or through saved input sets.

#### Use Runtime Variables

When setting up an experiment, in the **Target Application** and **Tune Fault** modals, you can choose between **Fixed value** and **Runtime Input**. Once you choose the input type, **Save** the changes.

   ![runtime variables](./static/runtime/sample.png)

   ![runtime variables](./static/runtime/sample-2.png)

:::tip Runtime Variable Tips
- If you don't provide values for certain fields (which are not mandatory), the experiment executes with default values.
- Variables specified as runtime inputs appear as editable fields in the UI, whereas static fields appear as display-only.
:::

---

## Experiment Variables

Experiment variables let you define reusable, parameterized values at the experiment level, similar to pipeline variables. These variables can be referenced across faults, probes, and actions within the experiment, providing a centralized way to manage shared configuration.

### Add an Experiment Variable

1. In the **Experiment Builder**, click the **Variables** icon in the right sidebar.

    ![Variables icon](./static/experiment-variables.png)

2. In the **Variables** panel, click **+ Add Variable**.

3. In the **New Variable** dialog, configure the following:

    | Field | Description |
    |-------|-------------|
    | **Type** | Data type of the variable. Supported types: `String`, `Number` |
    | **Name** | Identifier used to reference the variable in the experiment |
    | **Value** | The value assigned to the variable. Use a fixed value or `<+input>` for runtime input |
    | **Set variable as required during runtime** | When checked, the variable must be provided at experiment run time |
    | **Description** | Optional description for the variable |

    ![New Variable dialog](./static/new-variable.png)

4. Click **Save**, then click **Apply Changes** in the Variables panel.

### Provide Variable Values at Runtime

When you run an experiment that has variables configured with runtime input (`<+input>`), the **Run Experiment** dialog prompts you to provide values for those variables before execution.

You can also:
- Toggle between **Visual** and **YAML** views to configure variables
- Use an existing input set by enabling **Use an Existing Input Set**
- Save the current variable values as a new input set by clicking **Save As New Input Set**








    







