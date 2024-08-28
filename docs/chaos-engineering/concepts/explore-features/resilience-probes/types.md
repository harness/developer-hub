---
title: Modes and use cases of resilience probes
sidebar_position: 2
description: Modes and use cases of resilience probes
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/probes/overview
- /docs/chaos-engineering/features/probes/overview
---

This section introduces you to the following:
- [Different modes of resilience probes](#modes-of-resilience-probes);
- [Use cases](#common-use-cases);
- [Effects of resilience probe on resilience score](#effects-on-the-resilience-score);
- [Probe chaining](#probe-chaining).

:::tip
Currently, resilience probes are behind the feature flag `CHAOS_PROBE_ENABLED`. Contact [Harness support](mailto:support@harness.io) to enable it.
- If you are an existing customer, you will see the old flow of control in resilience probes by default and you have the choice to upgrade to the new flow.
- If you are a new customer, the feature flag is turned on by default and you will see the new flow of control in the resilience probes.
:::

## Modes of resilience probes

The probe mode refers to the way in which a probe checks the system's health during a chaos experiment. The probes can be set up to run in different modes:

- **SoT**: Executed at the Start of Test as a pre-chaos check.
- **EoT**: Executed at the End of Test as a post-chaos check.
- **Edge**: Executed both, before and after the chaos.
- **Continuous**: The probe is executed continuously, with a specified polling interval during the chaos injection.
- **OnChaos**: The probe is executed continuously, with a specified polling interval strictly for chaos duration of chaos.

### Default probe

By default, each fault imported in Chaos Studio would have a health check command probe configured in Edge mode. A Health check probes helps to ensure that the application remains available and responsive to user requests even in the event of unexpected failures. By regularly checking the health of the containers, Kubernetes can automatically take action if a container is not healthy, such as restarting or removing the container, to maintain the availability and responsiveness of the application.

It is mandatory to have at least one probe configured in a Chaos Experiment to validate user defined/default checks against the application.

## Common use cases

Some common use cases of probes include:

1. **Network partitioning**: Testing how an application behaves when network connectivity is lost between different components.
2. **Pod failures**: Testing how an application behaves when a pod in a Kubernetes cluster is terminated or becomes unavailable.
3. **Node failures**: Testing how an application behaves when a node in a Kubernetes cluster is terminated or becomes unavailable.
4. **Resource exhaustion**: Testing how an application behaves when resources such as CPU or memory are exhausted.
5. **Latency injection**: Testing how an application behaves when network latency is increased.
6. **Configuration change**: Testing how an application behaves when the configuration is changed.
7. **Identifying bottlenecks**: Identifying the bottlenecks in the system and making sure that the system can handle such scenarios.
8. **Testing disaster recovery**: Testing the disaster recovery plan and making sure that the system can recover from an unexpected failure.
9. **Testing application scalability**: Testing the scalability of the application and making sure that the system can handle more traffic.
10. **Testing Kubernetes components**: Testing the behavior of Kubernetes components like apiserver, etcd, controller manager and kubelet.

These are some of the common use cases where chaos probes can be used but it can also be used in other scenarios as well depending on the requirements of the application and the system.

## Effects on the resilience score

In a chaos experiment, the probe success percentage refers to the percentage of successful probes out of the total number of probes run during a chaos experiment. The value depends on the successful outcome of the probe criteria based on the type and mode selected. There are two possible values of probe success percentage for each of the probe criteria, either `0`(if the criteria assertion fails) or `100`(if the criteria assertion passes).

The probe success percentage for each of the probes mentioned in the fault plays an important role in determining the final Resilience Score of the experiment. The Resilience Score of a Chaos Experiment is calculated by this formula:

```
Σ(Weights(fault) x Probe Percentage(fault)) / Σ Weights(fault)
```

It is an important metric in evaluating the results of a chaos experiment and can be used to identify which parts of the system are most affected by the chaos injection and where improvements need to be made. It also helps to understand the behavior of the application during the chaos scenario and fine tune the application for better resiliency.

## Probe status and deriving inferences

The chaos experiments run the probes defined in the ChaosEngine and update their stage-wise success in the ChaosResult custom resource, with details including the overall **probeSuccessPercentage** (a ratio of successful checks v/s total probes) and failure step, where applicable. The success of a probe is dependent on whether the expected status/results are met and also on whether it is successful in all the experiment phases defined by the probe's execution mode. For example, probes that are executed in "Edge" mode, need the checks to be successful both during the pre-chaos & post-chaos phases to be declared as successful.

The pass criteria for an experiment is the logical conjunction of all probes defined in the ChaosEngine and an inbuilt entry/exit criteria. Failure of either indicates a failed hypothesis and is deemed experiment failure.


## Probe chaining

:::info YAML only feature
This feature can only be defined using the YAML manifest for now.
:::

Probe chaining enables reuse of probe a result represented by the template function `{{ .<probeName>.probeArtifact.Register}})` in subsequent "downstream" probes defined in the ChaosEngine. Note that the order of execution of probes in the experiment depends purely on the order in which they are defined in the ChaosEngine.

Probe chaining is currently supported only for Command Probe. Following is an example of probe chaining, where the result of the first probe is being used in the command of the second probe.

```yaml
probe:
  - name: "probe1"
    type: "cmdProbe"
    cmdProbe/inputs:
      command: "<command>"
      comparator:
        type: "string"
        criteria: "equals"
        value: "<value-for-criteria-match>"
      source: "inline"
    mode: "SOT"
    runProperties:
      probeTimeout: 5
      interval: 5
      retry: 1
  - name: "probe2"
    type: "cmdProbe"
    cmdProbe/inputs:
      ## probe1's result being used as one of the args in probe2
      command: "<command> {{ .probe1.ProbeArtifacts.Register }} <arg2>"
      comparator:
        type: "string"
        criteria: "equals"
        value: "<value-for-criteria-match>"
      source: "inline"
    mode: "SOT"
    runProperties:
      probeTimeout: 5
      interval: 5
      retry: 1
```

## Next steps

* [Configure and add a probe](/docs/chaos-engineering/features/resilience-probes/use-probe.md)
* [Using command probe in different modes](/docs/chaos-engineering/features/resilience-probes/cmd-probe/cmd-probe-usage.md)