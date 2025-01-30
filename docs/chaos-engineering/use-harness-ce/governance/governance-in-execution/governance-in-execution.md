---
sidebar_position: 1
title: Governance in Execution
description: This topic describes how governance in execution is implemented using ChaosGuard.
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/chaosguard/introduction-to-chaosguard
- /docs/chaos-engineering/concepts/explore-concepts/chaosguard
- /docs/chaos-engineering/features/chaosguard/chaosguard-concepts
- /docs/category/chaosguard
- /docs/chaos-engineering/concepts/explore-concepts/chaosguard
- /docs/chaos-engineering/use-harness-ce/governance/govern-run
---

This section introduces you to ChaosGuard and describes how Harness enforces security policies during chaos experiments execution.

## What is ChaosGuard?

ChaosGuard, as the name suggests, is an additional level of security that guards chaos experiments from chaos-enabled users (users who have permission to execute chaos experiments).
It evaluates predefined rules and conditions before running experiments to ensure they align with security policies and prevent unintended disruptions.

Advanced environments require higher governance policies, and this level of security aims to minimize the blast radius (or disruption) and mitigate potential security threats from **chaos-enabled** users with malicious intent. This way, users with permission to execute chaos experiments will be subjected to further levels of security policy enforcement.

The different levels of security policy enforcement include (but are not limited to):
1. Regulating access to chaos infrastructure (i.e., namespace and clusters) within the environment,
2. Controlling the types of faults that can be used within these infrastructures,
3. Freezing runtime permissions accorded for experiment execution within the target infrastructure.

## Flow of control
The security evaluation step iterates over every active (or enabled) [rule](#rule) for every experiment run in the project. If the evaluation is successful, you can proceed with the experiment. Upon failure, you can't iterate further in the experiment. Below is a flowchart that summarizes the flow of control when you enable a ChaosGuard rule for a fault or set of faults.

    ![flow-chart](./static/chaosguard/flow-chart-chaosguard.png)


## Low-level security governance requirements
The table below describes the requirements for advanced environments.

| Constraint | Description                                                                                    | Source                            | Importance                                                                                  |
|------------|------------------------------------------------------------------------------------------------|-----------------------------------|---------------------------------------------------------------------------------------------|
| What       | Faults that are allowed or disallowed                                                          | ChaosHub Fault Spec(s)            | Prevent disruptive faults from being injected                                               |
| Where      | Cluster or namespace where the faults will be injected                                         | User action or Agent manifest     | Protect critical infrastructure                                                             |
| Which      | Workloads or microservices which will be subjected to faults (Service Names, AppNS, AppLabels) | Dynamic or Real-time Discovery    | Isolate faults to lowest possible blast radius                                              |
| How        | The service account on the Kubernetes cluster that is leveraged to run the fault pods          | User Input or Experiment manifest | Prevent malicious code or embedded in "custom" faults from running                          |
| Who        | Users who are subjected to the above conditions                                                | Harness DB or Identity store      | Selective application of conditions to users (for example, contractors, other team members) |
| When       | The time window in which chaos is allowed to be executed                                       | User Input or Harness DB          | Minimize windows for disruptive activity, upon approval/authorization                       |

With ChaosGuard, each experiment run consists of a security step wherein one or more [rules](/docs/chaos-engineering/use-harness-ce/governance/governance-in-execution/#rule) are evaluated before execution. Each rule contains one or more [conditions](/docs/chaos-engineering/use-harness-ce/governance/governance-in-execution/#condition) describing the constraints specified in the table above. The experiment can proceed only upon a successful evaluation of all the rules.

## Key Components

ChaosGuard consists two elements, which are subsequently explained below. 

- [Condition](#condition)
- [Rule](#rule)


### Condition
Conditions describe a set of constraints that are applied to an execution context. For example, which faults are permitted, the target clusters or namespaces, affected services, and the service accounts used for fault injection.

It is typically configured by the admin personas and you can store it offline (such as in a conditions library or repository).

The default structure of a condition is to block or deny a fault or set of faults on a given **execution context** associated with a cluster (or namespace), the service(s), and the service account used for the injection process.

Conditions include parameters like:

* **WHAT** clause describes the attribute (in this case, chaos fault) on which you can apply the condition. This field takes a regex-like pattern, that is, the * symbol, to indicate all characters preceding or succeeding a particular string.

* **WHERE** clause describes the name of the Kubernetes infrastructure where you can apply the condition.

* **WHICH** clause describes the namespace and the app label in which you can apply the condition. You can have more than one namespace and app label associated with a condition.

* **USING** clause describes the service account under which you apply the condition. You can have more than one service account configured for a condition.

:::tip
- The service account refers to the Kubernetes or Openshift service account. This account is backed by a role (or ClusterRole) and is associated with a native or third-party security policy or admission controller within the cluster, such as PodSecurityPolicy (PSP), SecurityContextConstraint (SCC), Kyverno, OPA Gatekeeper, etc.
- With ChaosGuard, by limiting the service account you (as a user) can use within your experiment definitions, Harness CE limits the privileges you can have within the cluster.
:::

### Rule

These are collections of conditions that are evaluated as a first step in the experiment run. It can be in an active (enabled) or passive (disabled) state. 

A rule can contain multiple conditions, and for a successful evaluation, all constituent conditions must be fulfilled.

A rule becomes active when all its conditions are met, controlling who can execute certain experiments and when. 

The example below describes the rule as **applicable on the cluster chaosday-k8s-cluster between [5 PM, Friday, Sept 15th] to [9 AM, Monday, Sept 18th] for the specific condition**.

![rules-chaosguard](./static/chaosguard/add-conditions.png)

:::tip
Creating the ChaosGuard rules is subject to Harness RBAC policies. By default, these rules are enabled only for the project admin. However, the admin can delegate this to trusted users (typically in multi- or secondary admin scenarios).

![chaosguard-access-control](./static/chaosguard/chaosguard-access-control.png)
:::