---
title: Introduction
sidebar_position: 1
description: Resilience probes, their importance and types
---
This section introduces you to resilience probes, its importance, types, and generic properties.

## Before you begin

* [Probes overview](/docs/chaos-engineering/configure-chaos-experiments/probes/overview.md)

## What is a resilience probe?

Resilience probes are health-checkers, that is, they monitor your application's health before, during and after a chaos experiment. Depending on the type of probe, probes can:
* Run cmd commands for innumerable validations, 
* Run Kubernetes commands, send HTTP requests, check for a label or field selector missing and assert if the resource is absent or not,
* Execute PromQL queries, perform conditional valdation on QPS or probe success percentages,
* Validate your error budget (SLO probe),
* Connect with the APM tool and assert metrics (Datadog probe).

Depending on your requirement, probes can do a lot more than what is discussed earlier. 

## Why is it important?


* Probes create a global instance of probes, that is, a shared entity that can be used across multiple faults. 
* It also brings reusability since you create the validation instance first and use it across different experiments. 
* It avoids repeated creation of same probes for similar requirements. 

This is also in accordance with how chaos engineering pans out:
1. Plan the hypothesis.
2. Measure the validation criteria to check against the SLA.

## Types of resilience probes

HCE faciliates 6 types of resilience probes listed below. Click each probe to navigate to details such as probe property, definition, schema, authentication, methods, and so on.

1. [HTTP probe](/docs/chaos-engineering/technical-reference/probes/http-probe)
2. [Command probe](/docs/chaos-engineering/technical-reference/probes/cmd-probe)
3. [Kubernetes probe](/docs/chaos-engineering/technical-reference/probes/k8s-probe)
4. [Prometheus probe](/docs/chaos-engineering/technical-reference/probes/prom-probe)
5. [Datadog probe](/docs/chaos-engineering/technical-reference/probes/datadog-probe)
6. Dynatrace probe
7. [SLO probe](/docs/chaos-engineering/technical-reference/probes/slo-probe)

## Generic run properties for all probes

Listed below are the generic `runProperties` of all probes.

| Property             | Required                                 | Data type                          |
|----------------------|------------------------------------------|------------------------------------|
| probeTimeout         | Yes                                      | string with +d[ms][s][m][h] format |
| interval             | Yes                                      | string with +d[ms][s][m][h] format |
| retry                | Only available for Kubernetes (optional) |                                    |
| attempt              | Yes                                      | positive integer                   |
| probePollingInterval |                                          | string with +d[ms][s][m][h] format |
| intialDelay          |                                          | string with +d[ms][s][m][h] format |
| stopOnFailure        |                                          | bool                               |
| verbosity            | Only available for Kubernetes (optional) | string with "info" or "debug" info |

## Enable resilience probes

Currently, resilience probes is behind the feature flag `CHAOS_PROBE_ENABLED`. Contact [Harness support](mailto:support@harness.io) to enable it.

## Next steps

* [Use cases of resilience probes](/docs/chaos-engineering/configure-chaos-experiments/probes/overview#common-use-cases)
* [Steps to define a probe in UI](/docs/chaos-engineering/technical-reference/resilience-probes/use-probe)
* [Probe acceptance criteria](/docs/chaos-engineering/technical-reference/resilience-probes/probe-acceptance-criteria)
