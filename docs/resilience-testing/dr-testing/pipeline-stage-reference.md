---
title: Pipeline Stage Reference
sidebar_label: Pipeline Stage Reference
sidebar_position: 3
description: Complete field reference for DR test pipeline stage configuration in Harness Resilience Testing
---

Complete field reference for all DR test pipeline stage options. For a step-by-step walkthrough, see [Get Started with DR Testing](./get-started).

---

## DR Test Details Dialog

Shown when you click **+ New DR Test**.

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | Display name shown in the DR Testing list and execution history. |
| **Id** | Auto-generated | Unique identifier derived from the name. Editable via the pencil icon. Must be unique within the project. |
| **Description** | No | Free-text description of the disaster scenario being tested. |
| **Tags** | No | Key or `key:value` labels for organizing and filtering DR tests. |
| **Objective** | No | The goal or success criteria for this DR test (e.g., "Validate regional failover completes within RTO of 15 minutes"). |

Click **Continue in Pipeline Studio** to open the pipeline stage editor. Clicking **Cancel** discards the dialog without creating a DR test.

---

## Pipeline Studio: Overview Tab

The stage overview is pre-populated from the DR Test Details dialog. All fields are editable here.

### Stage Overview fields

| Field | Description |
|---|---|
| **Name** | Stage display name. |
| **Id** | Stage identifier. Auto-derived from name, editable. |
| **Description** | Optional stage description. |
| **Tags** | Optional labels. |
| **Objective** | Optional objective description for this disaster recovery test. |

### Advanced section (within Overview)

| Field | Description |
|---|---|
| **Timeout** | Maximum allowed runtime for the stage. Accepts duration format: `w` (weeks), `d` (days), `h` (hours), `m` (minutes), `s` (seconds). Example: `2h 30m`. If the stage exceeds this duration, it is treated as a timeout failure. |
| **Stage Variables** | Key-value variables scoped to this stage. Click **+ New Variable** to add. Variables are accessible in step configurations via expressions. |

---

## Pipeline Studio: Environment Tab

### Configuration section

| Field | Description |
|---|---|
| **Specify Environment** | Select the Harness environment where the DR test executes. Choose from existing environments in the dropdown or click **+ New Environment** to create one. |
| **Specify Infrastructure** | Select the Chaos Infrastructure connected to the target cluster. Choose from existing infrastructure in the dropdown or click **+ New Infrastructure** to create one. Required for Chaos Fault and Chaos Probe steps. |

### Failure Strategy section (Environment tab)

Defines how the pipeline responds when the stage encounters an error. You can add multiple failure strategies for different error types.

#### On failure of type

Select one or more failure types this strategy applies to, or check **All Errors** to catch all failures:

| Failure Type | Description |
|---|---|
| Authentication Errors | Failures caused by invalid or expired credentials |
| Connectivity Errors | Network or connectivity issues reaching a target |
| Timeout Errors | Operations that exceed their configured timeout |
| Authorization Errors | Insufficient permissions to perform an action |
| Verification Failures | Step or probe verification conditions not met |
| Delegate Provisioning Errors | Failures in provisioning or connecting a Harness Delegate |
| Unknown Errors | Errors that do not match any other category |
| Policy Evaluation Failures | Harness governance policy checks that fail |
| Execution-time Inputs Timeout Errors | Runtime input prompts that were not fulfilled within the timeout |
| Approval Rejection | An approval step was explicitly rejected |
| Delegate Restart | The Delegate restarted during execution |
| User Marked Failure | A step was manually marked as failed |

#### Perform Action (Environment tab)

| Action | Description |
|---|---|
| **Rollback Pipeline** | Roll back all stages in the pipeline that support rollback |
| **Retry Step** | Retry the failed step a configured number of times |
| **Abort** | Immediately stop pipeline execution |
| **Mark As Failure** | Mark the stage as failed and continue or stop based on pipeline settings |
| **Rollback Stage** | Roll back only this stage |

---

## Pipeline Studio: Execution Tab

The Execution tab contains the step canvas where you build the DR workflow. The canvas starts with a single **Add Step** (+) node.

Click **+** to open the Step Library. Under the **Disaster Recovery** category, three DR-specific step types are available:

### Chaos Probe

Validates the health of a Kubernetes workload.

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | Display name for the step |
| **Select Chaos Infrastructure** | Yes | The Kubernetes Chaos Infrastructure to run the probe against |
| **Chaos Probe** | Yes | Select a predefined probe (e.g., `default-pod-level-probe`) |
| **Duration** | Yes | How long the probe runs (e.g., `1m`, `5m`) |

Runtime inputs depend on the selected probe. For `default-pod-level-probe`:

| Input | Required | Description |
|---|---|---|
| **TARGET_NAMES** | Yes | Name of the workload to validate (e.g., `frontend`) |
| **TARGET_NAMESPACE** | Yes | Kubernetes namespace of the target (e.g., `boutique`) |
| **TARGET_KIND** | Yes | Kubernetes resource kind (e.g., `Deployment`, `StatefulSet`) |

### Chaos Fault

Injects a failure into the target system.

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | Display name for the step |
| **Select Chaos Infrastructure** | Yes | The Kubernetes Chaos Infrastructure to inject the fault on |
| **Chaos Fault** | Yes | Select a fault type (e.g., `pod-delete`, `pod-network-loss`, `pod-cpu-hog`) |

Runtime inputs depend on the selected fault. For `pod-delete`:

| Input | Required | Description |
|---|---|---|
| **TOTAL_CHAOS_DURATION** | Yes | Total duration in seconds for the fault (e.g., `60`) |
| **CHAOS_INTERVAL** | Yes | Interval in seconds between fault injections (e.g., `10`) |
| **FORCE** | No | `true` for force delete, `false` for graceful (default: `false`) |
| **RAMP_TIME** | No | Seconds to wait before starting the fault (default: `0`) |
| **SEQUENCE** | No | `parallel` or `serial` pod deletion (default: `parallel`) |
| **TARGET_WORKLOAD_KIND** | Yes | Kubernetes resource kind (e.g., `Deployment`) |
| **TARGET_WORKLOAD_NAMESPACE** | Yes | Namespace of the target workload |
| **TARGET_WORKLOAD_NAMES** | Yes | Name of the target workload |
| **TARGET_WORKLOAD_LABELS** | No | Label selectors as an alternative to names |
| **POD_AFFECTED_PERCENTAGE** | No | Percentage of pods to affect (default: `100`) |
| **TARGET_PODS** | No | Specific pod names to target |
| **NODE_LABEL** | No | Target pods running on nodes with this label |

### Chaos Action

Executes a predefined chaos action from your Resilience Testing module.

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | Display name for the step |
| **Select Chaos Infrastructure** | Yes | The Chaos Infrastructure to run the action on |
| **Chaos Action** | Yes | Select a predefined chaos action |

Steps can also include standard Harness pipeline steps (shell scripts, HTTP calls, approval steps, notification steps, etc.) alongside DR-specific steps.

---

## Pipeline Studio: Advanced Tab

### Delegate Selector

| Field | Description |
|---|---|
| **Define Delegate Selector** | Optional. Add one or more selector tags to route this stage to a specific Harness Delegate. Leave empty to target any available Delegate. |

### Conditional Execution

Controls whether this stage runs at all, based on the state of the pipeline.

| Option | Description |
|---|---|
| If the pipeline executes successfully up to this point | Stage runs only if all preceding stages passed. This is the default. |
| If the previous pipeline or stage fails | Stage runs only if the immediately preceding stage failed. Useful for rollback or alerting stages. |
| Always | Stage always runs regardless of prior stage results. |
| JEXL Condition | Define a custom boolean expression using JEXL. The stage runs only if the expression evaluates to `true`. |

### Looping Strategy

Optionally run the stage multiple times in a single execution. Select one strategy:

| Strategy | Description |
|---|---|
| **Matrix** | Run the stage for each combination of values across one or more variable axes. |
| **Repeat** | Run the stage a fixed number of times, optionally with a concurrency limit. |
| **Parallelism** | Split stage iterations to run in parallel up to a configured maximum. |

### Failure Strategy (Advanced tab)

Same failure type options as the Environment tab. Additional actions available at the Advanced tab level:

| Action | Description |
|---|---|
| **Manual Intervention** | Pause execution and wait for a user to choose the next action |
| **Ignore Failure** | Treat the failure as a warning and continue execution |
| **Retry Step** | Retry the failed step |
| **Mark As Success** | Override the failure and mark the step or stage as succeeded |
| **Abort** | Stop execution immediately |
| **Proceed with Default Values** | Continue execution using default values for any unresolved inputs |
| **Mark As Failure** | Mark the step or stage as failed |
| **Rollback Pipeline** | Roll back all stages in the pipeline |

---

## DR Tests List

| Column | Description |
|---|---|
| **DR Test Name** | Display name and auto-generated ID. |
| **Recent Executions** | Sparkline of recent run statuses. |
| **Last Execution** | Status and timestamp of the most recent run. |
| **Last Modified** | Timestamp and user who last saved the DR test. |

Filterable by **Infrastructures**, **Status**, and **Tag(s)**. Default sort: **Last Modified (New to Old)**.

---

## Related

- [Get Started with DR Testing](./get-started): Step-by-step tutorial
- [Concepts](./concepts): RTO, RPO, environments, failure strategies explained
