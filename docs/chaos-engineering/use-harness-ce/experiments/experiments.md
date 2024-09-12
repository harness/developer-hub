---
title: Chaos Experiments
sidebar_position: 1
description: Configure rules to receive alerts for your chaos experiments.
redirect_from:
- /docs/chaos-engineering/features/experiments/construct-and-run-custom-chaos-experiments
- /docs/chaos-engineering/configure-chaos-experiments/experiments/resilience-score
- /docs/chaos-engineering/features/experiments/resilience-score/
- /docs/category/chaos-experiments-/
---

Harness Chaos Engineering (HCE) gives you the flexibility to create elaborate chaos experiments that help create complex, real-life failure scenarios against which you can validate your applications.

A **chaos experiment** is composed of chaos faults that are arranged in a specific order to create a failure scenario. The [chaos faults](#chaos-fault) target various aspects of an application, including the constituent microservices and underlying infrastructure. You can tune the parameters associated with these faults to impart the desired chaos behavior.

You can define the experiment using the Chaos Studio, that helps create new experiments using the guided UI or by uploading the workflow CR (custom resource) manifest.

When an experiment fails, the failed step specifies the exact cause of failure for the experiment run. It contains an error code for the classification of the error, a phase to specify the execution phase during which the error occurred, and finally, the reason which is a user-friendly description of the error.

:::tip
- To create a chaos experiment, you need to [enable a chaos infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/enable-disable). To enable an infrastructure, you need to [create an environment](/docs/chaos-engineering/use-harness-ce/experiments/create-experiments#create-environment).
- An environment represents your deployment scenario, wherein each environment may contain multiple chaos infrastructures. It helps isolate the various environments that the engineering, product owners, QA, and automation teams use under a single Harness project. - This allows for better segregation of mission-critical infrastructures with several attached dependencies from dev and staging infrastructures for their safety.
:::

### Experiment Status

Experiment status describes the overall status of the experiment that depends on the status of the probe and the fault. The experiment status in a chaos experiment can be in 7 different states.

	- **Completed**: The fault and the probes associated with every fault were completed successfully.
	- **Completed with Error**: All the faults complete execution, and none of them show **error** status, but one of the faults may show **Completed with error** if the probe associated with the fault fails.
	- **Error**: If one of the faults or steps in the experiment results in an **error**, the experiment corresponds to being in an **error** state.
	- **Running**: Once the task (or experiment) is picked up by the infrastructure subscriber (pod), it goes to **running** state.
	- **Timeout**: If the task is in the queue, but not picked up by the subscriber for execution within a specific duration, the task times out.
	- **Queued**: An experiment goes to the **queued** state before it is executed, that is when the task (or experiment) has not been picked up by the infrastructure subscriber (pod) yet. At this point, the task is placed in the queue and is waiting to be picked.
	- **Stopped**: If an experiment was stopped by the user, the fault that was being executed then also stops (this results in the fault status being **stopped**). The subsequent faults associated with the experiment don't get executed either.

#### Chaos Rollback

Chaos rollback ensures that all target resources in an experiment return to their steady state after the experiment concludes, maintaining the safety of all applications deployed on your machine.

	- Chaos rollback occurs automatically at the end of each experiment. If an on-the-fly experiment is aborted, the chaos is safely reverted.
	- If a network disruption occurs between the Control Plane and Execution Plane during the experiment, the experiment is gracefully aborted, and the chaos is reverted.
	- If the chaos infrastructure process exits abruptly during an experiment, the daemon service reverts the chaos before restarting the process.
	- In the event of an abrupt machine reboot, the daemon service checks for and reverts any inconsistencies from the prior chaos execution before starting the chaos infrastructure process.
	- In the rare scenario where the chaos rollback itself encounters an error, an appropriate error message is logged in the experiment log, prompting the user for manual intervention.

The diagram below describes the flow of control in a chaos experiment.

<details>
<summary> Flow of control </summary>

![](./static/experiments/experiment-sequence.png)

</details>

Below is the detailed description of the steps above.

1. The user initiates the creation of a new chaos experiment in the Chaos Control Plane.
2. The Control plane prompts the user to input the necessary information for creating the experiment, including:

   * **Chaos Infrastructure:** Specify the chaos infrastructure that will be targeted during the experiment.
   * **Fault and Fault Tunables:** Select fault templates from any connected chaos hubs and modify the tunables as needed. You can add multiple faults in any desired order.
   * **Fault Probes:** Optionally, define additional probes on top of the default health check probe to validate custom hypothesis during the experiment.
   * **Fault Weights:** Assign fault weights to indicate the importance of each fault relative to others in the experiment. These weights contribute to calculating the experiment's [**resilience score**](/docs/chaos-engineering/use-harness-ce/experiments/ ), a quantitative measure of the target environment's resilience when the experiment is performed.

	Once all information is provided, the experiment is created and ready for execution.

3. When the user runs the experiment, the Control Plane transmits the experiment data to the target chaos infrastructure. The infrastructure handles four key responsibilities during execution:

   * **Inject Faults:** The infrastructure interprets the received faults and injects them into the target resource. Multiple faults may be injected simultaneously, depending on the experiment.
   * **Execute Probes:** The infrastructure executes the respective fault probes as the faults are injected, storing the results.
   * **Stream Logs:** Real-time logs of the experiment execution are streamed and can be retrieved as needed. These logs are accessible in the Chaos Control Plane.
   * **Send Results:** Finally, the infrastructure sends the experiment execution results, including the probe results, back to the Chaos Control Plane.

   The chaos experiment execution is then concluded.

To get a hands-on experience, follow the respective links to [create](/docs/chaos-engineering/use-harness-ce/experiments/create-experiments), [edit](/docs/chaos-engineering/use-harness-ce/experiments/edit-chaos-experiment), [halt and delete](/docs/chaos-engineering/use-harness-ce/experiments/halt-delete-experiments), [export](/docs/chaos-engineering/use-harness-ce/experiments/export-chaos-experiments) and [create alerts for experiment runs](/docs/chaos-engineering/use-harness-ce/experiments/alert-integration).

## Determine the resilience of target environment using resilience score

The **resilience score** is a quantitative measure obtained when you run a chaos experiment. This score represents how resilient the target environment is when you run that chaos experiment on it.

The score is calculated based on:

* The weight you give each fault in the experiment.
* The success rate of the probes in each fault.

This topic explains these elements, and gives an example resilience calculation.

### Fault Weight

While creating a chaos experiment, you can assign a weight between 1 - 10 to each fault. This represents the priority/importance of the respective fault. The higher the weight, the more significant the fault is.

For example:

- Low Priority: 0 - 3
- Medium Priority: 4 - 6
- High Priority: 7 - 10

### Probe Success Percentage

The **probe success percentage** for a fault is the ratio of successful probes to total probes. For example, if a fault has 4 probes and only 2 of them are successful, then the probe success percentage for this fault is 50%.

### Resilience Calculation

Based on fault weights and probe success rates, you can calculate two types of resilience score (represented as a percentage):

* **A fault's resilience** = fault weight * probe success percentage<br />
* **The experiment's total resilience** = sum of all fault resilience / sum of all fault weights of the experiments

Here's an example:

* **Experiment A** runs, and includes 3 faults. Fault weights, number of probes, and probe success rates are as follows.

   | Fault | Weight | Number<br />of probes | Probes<br />succeeded | Fault<br />resilience |
   |:----:|:---:|:---:|:-------:|:-------:|
   | Fault1 | 2 | 1 | 0 (or 0%) | 0%    |
   | Fault2 | 4 | 2 | 2 (or 100%) | 400%  |
   | Fault3 | 8 | 4 | 3 (or 75%) | 600%   |
   |        | **Sum: 14** |  |    | **Sum: 1000%**   |
<br />
* **Experiment A's total resilience score**

   Divide the sum of all fault resilience by the sum of all fault weights:

   **1000% / 14 = 71%**