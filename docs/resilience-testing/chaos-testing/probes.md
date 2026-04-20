---
title: Probes
sidebar_position: 3
description: Use probes to validate system health and define success criteria for chaos experiments
redirect_from:
  - /docs/chaos-engineering/guides/probe
---

Probes are validation mechanisms that monitor and verify the health of your system throughout chaos experiments. They act as automated checkpoints that determine whether your system maintains expected behavior under failure conditions.

## How Probes Affect Resilience Score

Each probe in an experiment contributes to the overall **resilience score**. When a probe executes, it results in either a **PASS** or **FAIL** state:

- **PASS** - The system met the expected criteria (e.g., HTTP 200 response, metric within threshold)
- **FAIL** - The system did not meet the expected criteria

The resilience score is calculated as a weighted average of all probe and fault outcomes in the experiment. A higher pass rate across probes means a higher resilience score, giving you a quantifiable measure of your system's ability to withstand failures.

## Probe Types

Harness supports the following probe types. To create a probe, navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**. Select your infrastructure type, then choose from:

- **[HTTP Probe](./probes/http-probe)** - Validate service endpoints by checking HTTP response codes or body content
- **[Command Probe](./probes/command-probe)** - Run shell commands and match output for custom validation logic
- **[Kubernetes Probe](./probes/k8s-probe)** - Verify Kubernetes resource state (present, absent, delete)
- **[Container Probe](./probes/container-probe)** - Execute commands inside a container with full control over image, volumes, and security context
- **[APM Probes](./probes/apm-probes)** - Query metrics from monitoring systems like Prometheus, Datadog, Dynatrace, New Relic, Splunk, AppDynamics, and GCP Cloud Monitoring via Harness Platform connectors

All probes follow the same creation wizard: **Overview** → **Variables** → **Probe Properties** → **Run Properties**. The probe-specific configuration happens in the Probe Properties step; everything else is common across all probe types. See the individual probe pages for step-by-step details.

## Infrastructure Support

Not all probes are available on every infrastructure type. The following table shows which probes are supported on each infrastructure:

| Probe | Kubernetes | Linux | Windows |
|-------|:----------:|:-----:|:-------:|
| [HTTP Probe](./probes/http-probe) | ✅ | ✅ | ✅ |
| [Command Probe](./probes/command-probe) | ✅ | ✅ | ✅ |
| [Kubernetes Probe](./probes/k8s-probe) | ✅ | - | - |
| [Container Probe](./probes/container-probe) | ✅ | - | - |
| [APM Probes](./probes/apm-probes) | ✅ | - | - |
| [Datadog Probe](./probes/apm-probes) | ✅ | ✅ | - |
| [Dynatrace Probe](./probes/apm-probes) | ✅ | ✅ | - |

## Built-in Probe Templates

Harness provides pre-built [Built-in Probe Templates](./probes/probe-templates) to help you quickly set up probes for common validation scenarios. Currently, built-in templates are available for **Command Probes** targeting **Kubernetes** infrastructure, covering checks like pod status, node health, resource utilization, and cloud provider resource validation.

## Probe Verification

Probes can be marked as **Verified** to ensure only tested and approved probes are used in production experiments. This governance feature helps teams maintain quality standards and prevent misconfigurations.

To mark a probe as verified:

1. Navigate to **Project Settings** > **Chaos Probes**
2. Click the three-dot menu (⋮) next to the probe
3. Select **Mark as Verified**

    ![Mark as Verified](../content/probes/static/mark-as-verified.png)

Once verified, the probe displays a green checkmark (✓) in the **Verification Status** column. You can then use [ChaosGuard](./governance/governance-in-execution/govern-run) policies to mandate that only verified probes can run in experiments.

## Next Steps
- [Create Chaos Experiments](/docs/resilience-testing/chaos-testing/experiments) - Build experiments with probes
- [ChaosHub](/docs/resilience-testing/chaos-testing/chaoshub) - Discover and share experiment templates
- [ChaosGuard](/docs/resilience-testing/chaos-testing/governance/governance-in-execution/govern-run) - Enforce governance policies on probe usage
