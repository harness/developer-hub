---
title: Probes
sidebar_position: 5
---

Chaos probes automate the chaos hypothesis validation performed during an experiment. They are declarative checks that determine the outcome of the experiment. Probes are scoped to the faults and you can define as many probes as required as part of each fault. Currently four types of probes are available:
- **HTTP Probe:** To query health/downstream URIs
- **Command Probe:** To execute any user-desired health-check function implemented as a shell command
- **K8s Probe:** To perform CRUD operations against native & custom Kubernetes resources
- **Prometheus Probe:** To execute PromQL queries and match prometheus metrics for specific criteria 

These probes can be used in isolation or in several combinations to achieve the desired checks. While the HTTP Probe and K8s Probe are fully declarative in the way they are conceived, the cmdProbe expects the user to provide a shell command to implement checks that are highly specific to the application use case. Prometheus Probe expects the user to provide a PromQL query along with Prometheus service endpoints to check for specific criteria.

The probes can be set up to run in different modes:
- **SoT:** Executed at the Start of Test as a pre-chaos check
- **EoT:** Executed at the End of Test as a post-chaos check
- **Edge:** Executed both, before and after the chaos
- **Continuous:** The probe is executed continuously, with a specified polling interval during the chaos injection.
- **OnChaos:** The probe is executed continuously, with a specified polling interval strictly for chaos duration of chaos

Some common attributes shared between the probes:
- **Probe Timeout:** Represents the time limit for the probe to execute the check specified and return the expected data.
- **Retry:** The number of times a check is re-run upon failure in the first attempt before declaring the probe status as failed.
- **Interval:** The period between subsequent retries.
- **Polling Interval:** The time interval for which continuous probe should be sleep after each iteration.
- **Initial Delay:** Represents the initial waiting time interval in seconds for the probes.
- **Stop On Failure:** It can be set to true/false to stop or continue the experiment execution after probe fails.


## HTTP Probe
The HTTP Probe allows developers to specify a URL which the experiment uses to gauge health/service availability (or other custom conditions) as part of the entry/exit criteria. The received status code is mapped against an expected status. It supports HTTP **Get** and **Post** methods.

In HTTP Get method it sends a http `GET` request to the provided url and matches the response code based on the given criteria(`==`, `!=`, `oneOf`).

In HTTP Post method it sends a http `POST` request to the provided url. 

:::info YAML Only Feature
In the case of a complex POST request in which the body spans multiple lines, the `bodyPath` attribute can be used to provide the path to a file consisting of the same. This file can be made available to the experiment pod via a ConfigMap resource, with the ConfigMap name being defined in the [ChaosEngine](https://docs.litmuschaos.io/docs/concepts/chaos-engine) or the [ChaosExperiment](https://docs.litmuschaos.io/docs/concepts/chaos-experiment) CR. It can be defined at `.spec.experiments[].spec.probe` inside ChaosEngine. Also, `body` and `bodyPath` attributes are mutually exclusive. Refer to the probe schema [here](https://docs.litmuschaos.io/docs/concepts/probes#httpprobe).
:::

## Command Probe
The Command Probe allows developers to run Bash commands and match the resulting output as part of the entry/exit criteria. The intent behind this probe was to allow users to implement a non-standard & imperative way for expressing their hypothesis. For example, you can check for specific data within a database, parse the value out of a JSON blob being dumped into a certain path or check for the existence of a particular string in the service logs.

:::info YAML Only Feature
By default, the probe can only be defined in inline mode from the UI where the command is run from within the experiment image. However, it can also be run in source mode where the command execution is carried out from within a new pod whose image can be specified. While inline is preferred for simple shell commands, source mode can be used when application-specific binaries are required. Refer to the probe schema [here](https://docs.litmuschaos.io/docs/concepts/probes#cmdprobe).
:::

## K8s Probe
With the proliferation of custom resources & operators, especially in the case of stateful applications, the steady-state is manifested as status parameters/flags within Kubernetes resources. K8s Probe addresses verification of the desired resource state by allowing users to define the Kubernetes GVR (group-version-resource) with appropriate filters (field selectors/label selectors). The experiment makes use of the Kubernetes Dynamic Client to achieve this. The probe supports following CRUD operations:
- **create:** It creates kubernetes resource based on the data provided inside probe.data field.
- **delete:** It deletes matching kubernetes resource via GVR and filters (field selectors/label selectors).
- **present:** It checks for the presence of kubernetes resource based on GVR and filters (field selectors/label selectors).
- **absent:** It checks for the absence of kubernetes resource based on GVR and filters (field selectors/label selectors).

## Prometheus Probe
The Prometheus Probe allows users to run Prometheus queries and match the resulting output against specific conditions. The intent behind this probe is to allow users to define metrics-based SLOs in a declarative way and determine the experiment verdict based on its success. The probe runs the query on a Prometheus server defined by the endpoint, and checks whether the output satisfies the specified criteria. A PromQL query needs to be provided, whose outcome is then used for the probe validation.

:::info YAML Only Feature
In case of complex queries that span multiple lines, the `queryPath` attribute can be used to provide the link to a file consisting of the query. This file can be made available in the experiment pod via a ConfigMap resource, with the ConfigMap being passed in the [ChaosEngine](https://docs.litmuschaos.io/docs/concepts/chaos-engine) or the [ChaosExperiment](https://docs.litmuschaos.io/docs/concepts/chaos-experiment) CR. Also, `query` and `queryPath` attributes are mutually exclusive. Refer to the probe schema [here](https://docs.litmuschaos.io/docs/concepts/probes#promprobe).
:::

---
## Probe Status & Deriving Inferences

The litmus chaos experiments run the probes defined in the ChaosEngine and update their stage-wise success in the ChaosResult custom resource, with details including the overall **probeSuccessPercentage** (a ratio of successful checks v/s total probes) and failure step, where applicable. The success of a probe is dependent on whether the expected status/results are met and also on whether it is successful in all the experiment phases defined by the probe’s execution mode. For example, probes that are executed in “Edge” mode, need the checks to be successful both during the pre-chaos & post-chaos phases to be declared as successful.

The pass criteria for an experiment is the logical conjunction of all probes defined in the ChaosEngine and an inbuilt entry/exit criteria. Failure of either indicates a failed hypothesis and is deemed experiment failure.

---
## Probe Chaining

:::info YAML Only Feature
This feature can only be defined using the YAML manifest for now.
:::

Probe chaining enables reuse of probe a result represented by the template function `{{ .<probeName>.probeArtifact.Register}})` in subsequent "downstream" probes defined in the ChaosEngine. Note that the order of execution of probes in the experiment depends purely on the order in which they are defined in the ChaosEngine.

Probe chaining is currently supported only for Command Probe. Following is an example of probe chaining, where the result of the first probe is being used in the command of the second probe.

```yaml
probe:
  - name: 'probe1'
    type: 'cmdProbe'
    cmdProbe/inputs:
      command: '<command>'
      comparator:
        type: 'string'
        criteria: 'equals'
        value: '<value-for-criteria-match>'
      source: 'inline'
    mode: 'SOT'
    runProperties:
      probeTimeout: 5
      interval: 5
      retry: 1
  - name: 'probe2'
    type: 'cmdProbe'
    cmdProbe/inputs:
      ## probe1's result being used as one of the args in probe2
      command: '<command> {{ .probe1.ProbeArtifacts.Register }} <arg2>'
      comparator:
        type: 'string'
        criteria: 'equals'
        value: '<value-for-criteria-match>'
      source: 'inline'
    mode: 'SOT'
    runProperties:
      probeTimeout: 5
      interval: 5
      retry: 1
```