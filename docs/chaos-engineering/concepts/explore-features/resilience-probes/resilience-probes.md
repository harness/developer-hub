---
id: resilience-probes
sidebar_position: 40
title: Resilience Probes
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/ssh
---

This topic introduces you to resilience probes, their importance, types, and generic properties.

:::tip
Currently, resilience probes are behind the feature flag `CHAOS_PROBE_ENABLED`. Contact [Harness support](mailto:support@harness.io) to enable it.
:::

## What is a resilience probe?

Resilience probes (or probes) are pluggable health checkers defined within the chaos engine for any chaos experiment. Resilience probes do the following:
- Monitors your application's health **before**, **during** and **after** a chaos experiment.
- Explore the behavior of a system in a chaotic or unpredictable manner.
- Help understand the underlying patterns and laws that govern the behavior of these systems, and to use that understanding to predict or control their behavior.
- Help validate the [declarative hypothesis](#declarative-hypothesis) set by the user.

:::tip
- If you are an existing customer, you will see the old flow of control in resilience probes by default and you have the choice to upgrade to the new flow.
- If you are a new customer, the feature flag is turned on by default and you will see the new flow of control in the resilience probes.
:::

The probe is triggered by a chaos runner when the chaos engine begins execution.
Depending on the type of probe, probes can:
* Run `cmd` commands for innumerable validations,
* Run the Kubernetes commands, send HTTP requests, check for a label or field selector missing, and assert if the resource is absent or not,
* Execute PromQL queries, perform conditional validation on QPS or probe success percentages,
* Validate your error budget (SLO probe),
* Connect with the APM tool and assert metrics (Datadog probe).

:::tip
Depending on your requirement, probes can do a lot more than what is discussed earlier.
:::

![Probe](./static/overview/probe.png)

### Declarative hypothesis

Declarative hypothesis in a cloud-native chaos engineering environment is a way of specifying the expected outcome of a chaos experiment before it is run. It is a statement that defines the expected result of the experiment and is used to guide the experiment's design and implementation. This can be done as a part of defining the fault specifications in the respective chaos engine which is validated by the chaos operator.

This hypothesis is a way to ensure that the experiment is well-defined and that the results are easily understood. It helps to ensure that the experiment is repeatable and the results can be compared across different runs.

Declarative hypotheses in HCE are written in a simple, clear, and concise manner, that is, they should be **specific, measurable, achievable, relevant, and time-bound (SMART)**. The steady-state and declarative hypothesis set by the user should directly map with the SLOs.

## Who should use probes?

Chaos probes are used by **developers**, **quality assurance engineers**, and **system administrators** to monitor the health, test the resilience, execute custom user-desired checks/functions, perform CRUD operations, etc depending on the type of probe, usually against the applications under chaos running on a Kubernetes cluster.

In general, anyone responsible for maintaining and deploying applications in a Kubernetes cluster, especially in a production environment, should consider using chaos probes to proactively identify and fix issues in their applications.

## Why should you use probes?

In a production environment, it is hard to predict when and how failures will occur, and it can be difficult to test for all possible scenarios.

By injecting known failures into the system, probes help identify and fix issues before they occur in production, and ensure that the application remains available and responsive to user requests even in the event of unexpected failures.

You can use probes to simulate different types of failures and test how the application behaves under different conditions.

- Probes are **shareable**, that is, they create a global instance of probes. It is a shared entity that can be used across multiple faults.
- Probes are **reusable**, that is, you can create the validation instance first and use it across different experiments. This enables you to avoid the repeated creation of the same probes for similar requirements.

This is also in accordance with how HCE pans out:
1. Plan the hypothesis.
2. Measure the validation criteria to check against the SLA.

### Types of resilience probes

HCE facilitates 7 types of resilience probes listed below. Click each probe to navigate to details such as probe property, definition, schema, authentication, methods, and so on.

- [**HTTP probe**](/docs/chaos-engineering/features/resilience-probes/http-probe.md): To query health/downstream URIs.
- [**Command probe**](/docs/chaos-engineering/features/resilience-probes/cmd-probe/cmd-probe.md): To execute any user-desired health-check function implemented as a shell command.
- [**Kubernetes probe**](/docs/chaos-engineering/features/resilience-probes/k8s-probe.md): To perform CRUD operations against native and custom Kubernetes resources.
- [**Prometheus probe**](/docs/chaos-engineering/features/resilience-probes/prom-probe.md): To execute PromQL queries and match Prometheus metrics for specific criteria.
- [**Datadog probe**](/docs/chaos-engineering/features/resilience-probes/datadog-probe.md): To query a [Datadog Synthetic](https://docs.datadoghq.com/synthetics/) test and use its results to evaluate the probe outcome.
- [**SLO probe**](/docs/chaos-engineering/features/resilience-probes/slo-probe.md): To allow you to validate the error budget for a given SLO when the corresponding application is subject to chaos and determine the verdict based on the percentage change in the error budget.
- [**Dynatrace probe**](/docs/chaos-engineering/features/resilience-probes/dynatrace-probe.md): Determines the health of your application by examining the entry or exit criteria.


:::info note
* Each type of probe has its advantages and disadvantages, and the choice of probe depends on the specific requirements of the experiment and the system being tested.
* The probes can be used in isolation or in several combinations to achieve the desired checks.
:::

HCE allows you to create probes for multiple infrastructures, namely, Kubernetes, Linux, and Windows. The type of probes allowed on each of these infrastructures is listed below.

	| Kubernetes | Linux     | Windows |
	|------------|-----------|---------|
	| HTTP       | HTTP      | HTTP    |
	| Command    | Command   |         |
	| Datadog    | Datadog   |         |
	| Dynatrace  | Dynatrace |         |
	| SLO        |           |         |
	| Prometheus |           |         |
	| Kubernetes |           |         |

## Next steps

* [Use cases of resilience probes](/docs/chaos-engineering/features/resilience-probes/types#common-use-cases)
