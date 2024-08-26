---
id: experiments
sidebar_position: 4
title: Chaos Experiments
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/azure
---

Harness Chaos Engineering (HCE) gives you the flexibility to create elaborate chaos experiments that help create complex, real-life failure scenarios against which you can validate your applications. At the same time, the chaos experiments are declarative and you can construct them using the Chaos Studio user interface with no programmatic intervention.

A chaos experiment is composed of chaos faults that are arranged in a specific order to create a failure scenario. The chaos faults target various aspects of an application, including the constituent microservices and underlying infrastructure. You can tune the parameters associated with these faults to impart the desired chaos behavior.


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
   * **Fault Weights:** Assign fault weights to indicate the importance of each fault relative to others in the experiment. These weights contribute to calculating the experiment's [**resilience score**](/docs/chaos-engineering/features/experiments/resilience-score), a quantitative measure of the target environment's resilience when the experiment is performed.

	Once all information is provided, the experiment is created and ready for execution.

3. When the user runs the experiment, the Control Plane transmits the experiment data to the target chaos infrastructure. The infrastructure handles four key responsibilities during execution:

   * **Inject Faults:** The infrastructure interprets the received faults and injects them into the target resource. Multiple faults may be injected simultaneously, depending on the experiment.
   * **Execute Probes:** The infrastructure executes the respective fault probes as the faults are injected, storing the results.
   * **Stream Logs:** Real-time logs of the experiment execution are streamed and can be retrieved as needed. These logs are accessible in the Chaos Control Plane.
   * **Send Results:** Finally, the infrastructure sends the experiment execution results, including the probe results, back to the Chaos Control Plane.

   The chaos experiment execution is then concluded.

To get a hands-on experience, follow the respective links to [create](/docs/chaos-engineering/use-harness-ce/experiments/create-experiments), [edit](/docs/chaos-engineering/use-harness-ce/experiments/edit-chaos-experiment), [halt and delete](/docs/chaos-engineering/use-harness-ce/experiments/halt-delete-experiments), [export](/docs/chaos-engineering/use-harness-ce/experiments/export-chaos-experiments) and [create alerts for experiment runs](/docs/chaos-engineering/use-harness-ce/experiments/alert-integration).