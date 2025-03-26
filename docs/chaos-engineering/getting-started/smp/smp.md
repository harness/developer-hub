---
title: On-Premise (SMP)
sidebar_position: 1
description: Understand the features facilitated by SMP.
redirect_from:
- /docs/chaos-engineering/get-started/ce-on-smp/ce-smp-roadmap
- /docs/category/ce-on-harness-self-managed-enterprise-edition
---

This topic describes features of SMP (Self-Managed Platform).

Feature availability on HCE SaaS and SMP are on par, with minor timeline changes in the SMP feature releases.

```mermaid
flowchart LR
%% Personas by experience level
    R("**Self-Managed Platform**")
    A2("**Install SMP**")
    A4("**Set up control plane** ")
    A3("**Set up execution plane**")
    A5("**Create project**")
    A6("Set up ChaosGuard")
    A12("Set up RBACs")
    P1("Set up chaos on Linux Targets")
    P2("Set up chaos on Windows Targets")
    P3("Set up chaos on Cloud Targets (AWS, Azure, GCP)")
    P4("Set up chaos on VMware Targets")
    P5("Set up chaos on Kubernetes Targets")
    A8("Create Experiments")
    A9("Run Experiments")
    A11("Add Resilience Probes")
    C("Apply ChaosGuard Rules and Conditions")
%% Connections show the progression in chaos maturity
    R --> A2
    A2 --> A4
    A2 --> A3
    A4 --> A5
    A5 --> A6
    A5 --> A12
    A3 --> P1
    P1 --> A8
    P2 --> A8
    P3 --> A8
    P4 --> A8
    P5 --> A8
    A3 --> P2
    A3 --> P3
    A3 --> P4
    A3 --> P5
    A8 --> A11
    A11 --> A9
    A9 --> C 
    C --> A6

%% Optional descriptions as sub-labels
    click A2 "https://developer.harness.io/docs/chaos-engineering/getting-started/smp/prerequisites"
    click A6 "https://developer.harness.io/docs/chaos-engineering/use-harness-ce/governance/governance-in-execution/govern-run"
    click A8 "https://developer.harness.io/docs/chaos-engineering/use-harness-ce/experiments/create-experiments"
    click A9 "https://developer.harness.io/docs/chaos-engineering/use-harness-ce/experiments/run-schedule-exp"
    click A11 "https://developer.harness.io/docs/chaos-engineering/use-harness-ce/probes/use-probe"
    click C "https://developer.harness.io/docs/chaos-engineering/use-harness-ce/governance/governance-in-execution/"

    style A6 color:#45A7FD, stroke:#AA00FF
    style A8 color:#45A7FD, stroke:#AA00FF
    style A9 color:#45A7FD, stroke:#AA00FF
    style A11 color:#45A7FD, stroke:#AA00FF
    style A2 color:#45A7FD, stroke:#AA00FF
    style C color:#45A7FD, stroke:#AA00FF
```

The table below outlines the roadmap for the Harness Self-Managed Enterprise Edition of Chaos Engineering:

| **Release version**| **Feature set** | **Deployment infrastructure** | **Supported platforms** | **Supported ingress** |
| --- | --- | --- | --- | --- |
| Limited GA (Current version)| Feature parity with SaaS | <ul><li> Cloud</li><li>Connected</li><li>Airgapped</li><li>Signed certificates</li></ul> | Kubernetes clusters | <ul><li>NGINX</li><li>Istio virtual services</li></ul> |
| General Availability (Coming soon)| Feature parity with SaaS |

:::info note
To install SMP in an air-gapped environment, go to [SMP in air-gapped environment](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment).
:::


For more information, go to [What's supported](/docs/chaos-engineering/whats-supported.md).

For information on feature releases, go to [SMP Release Notes](/release-notes/self-managed-enterprise-edition).