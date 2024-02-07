---
title: Probe acceptance criteria
sidebar_position: 3
description: Operations performed on probes
---

This section describes the various operations that can be performed on resilience probes.

## Before you begin

- [Introduction](/docs/chaos-engineering/technical-reference/resilience-probes/introduction.md)
- [Probes overview](../../configure-chaos-experiments/probes/overview.md)
- [Use probes](/docs/chaos-engineering/technical-reference/resilience-probes/use-probe.md)

This section discusses various operations that can be performed on [resilience probes](../../configure-chaos-experiments/probes/overview.md).

## Create resilience probes
You can [create a probe](/docs/chaos-engineering/technical-reference/resilience-probes/use-probe#create-a-resilience-probe) from within an experiment or from the **Resilience Probes** tab.


* HCE allows you to create probes for two infrastructures, namely, Kubernetes and Linux. The type of probes allowed on each of these infrastructures is listed below.

| Kubernetes | Linux     |
|------------|-----------|
| HTTP       | HTTP      |
| Command    | Command   |
| Datadog    | Datadog   |
| Dynatrace  | Dynatrace |
| SLO        |           |
| Prometheus |           |
| Kubernetes |           |

* Based on the type of probe you select, enter the values to set up the probe.

	**You can:**
	- Use any number of probes within a chaos experiment.
	- Use the same probes for two faults within the same chaos experiment.
	- Use Kubernetes-based probes for Kubernetes experiments.
	- Use Linux-based probes for Linux experiments.

	**You can't:**
	- Repeat the same probe multiple times in the same fault in the same experiment.

## Update resilience probes
You can [update (or edit) a probe](/docs/chaos-engineering/technical-reference/resilience-probes/use-probe#edit-a-resilience-probe) from within an experiment or from the **Resilience Probes** tab.

:::tip
Resilience probe names act as unique identifiers for a probe, which means you can't edit them. If you manually add the name of a probe in the manifest, this same name should be entered in the annotation as ID. 
:::

When you wish to enter the probe name in the manifest (manually) as a probeRef annotation, follow the below format:

```
probeRef: '[{"name":"probe-name","mode":"SOT"}]'
```
Here, `probe-name` is the name of your probe.

If you use the user interface, this step is not required.

## Known limitations
Command probes in the **Source** mode is only available for Linux on the self-managed platform (SMP).

## Resilience probes status matrix
Probe status is the single source of truth when executing a chaos experiment. The probe status in a chaos experiment can be in 4 different states.

- **AWAITED**: A probe status is in ‘awaited’ state until the fault is being executed, that is, the fault is still running. Once it has completed execution, it can be in the ‘passed’, ‘failed’ or ‘N/A’ state.
- **PASSED**: A probe status is considered ‘passed’ when the success criteria is met. 
- **FAILED**: A probe status is considered ‘failed’ when the success criteria is not met.
- **RUNNING**: A probe status is considered 'running' when the probe is currently in execution.
- **N/A**: A probe status is in the ‘N/A’ state when the result of the fault could not be determined.

## Chaos hub support

Not available yet

## Force delete resilience probes

When a probe is force deleted, it will not be available for use. You will lose history of that probe, but experiment runs that used the probe will contain the history of the probe.
Once the probe is deleted, information pertaining to the probe reference is also deleted from all the manifest references, that is, the probe is removed from the probeRef annotation. This ensures that the next possible run will not schedule the probe.
Only when you **hard delete** a probe, you can reuse the name of that probe. 

## Resilience probes support
Resilience probes are supported by the following features:
- Resilience Tab
- Chaos Studio
- Experiments/Run Reports
- Linux and Kubernetes experiments
- GameDays
- Sandbox environment

## Default/System resilience probes

- You can create system (default probes) at the project level **only once**. 
- Once you create a default probe, you can't delete or disable or update it.
- If you have more that one resilience probe in your chaos experiment, you can disable, delete or update the system probe. 
- Default probes are a part of resilience probes and are entered as annotations in the experiment manifest.

## Image registry support
- You can configure the image registry to be used with the default probes. If you haven't configured a probe yet, the experiment will use default image registry. 
- HCE doesn't provide image registry support at the moment for default probes.

## Legacy probes support (Backward compatibility)
Users can still use [legacy probes](/docs/chaos-engineering/technical-reference/probes/cmd-probe).

## Audit integration

There are no audit events for resilience probes.

## Access control permissions division

ACL is mapped to the experiment ACL. 

## License

Resilience probes are not a part of any subscription, and hence you don't have any limit on the number of probes you can create. With respect to usability, 1,000 probes can be executed in a month.