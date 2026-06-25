---
title: Capacity-Based Stage Queuing
description: Control concurrent stage execution on Delegate 3.x using MAX_STAGES and server-side queuing.
sidebar_position: 4
sidebar_label: Capacity-Based Stage Queuing
---

:::warning Closed Beta

Delegate 3.x is currently in closed beta and available only to select users. The product team determines access based on current supported use cases. See [Feature Parity](/docs/platform/delegates-v2/feature-parity) for the latest details.

:::

Capacity-based stage queuing lets you limit the number of concurrent Local (Docker) Infra stages a Delegate 3.x instance can run at once. When every eligible delegate is at capacity, new stage requests are queued server-side and dispatched automatically as capacity frees up. This prevents resource exhaustion on the delegate host and ensures predictable pipeline performance.

:::info Scope

Capacity-based stage queuing applies only to **Local (Docker) Infra** stages running on Delegate 3.x. Everything on this page assumes that context unless stated otherwise.

:::

## Configure MAX_STAGES

To limit concurrent stage executions, set the `MAX_STAGES` environment variable in your delegate's `config.env` file. The value must be a positive integer.

```
ACCOUNT_ID="<ACCOUNT_ID>"
TOKEN="<DELEGATE_TOKEN>"
TAGS="macos-arm64,local"
URL="https://app.harness.io"
NAME="DelegateTest"
MAX_STAGES=1
```

This configuration allows the delegate to execute only one Local (Docker) Infra stage at a time. Any additional stage requests are queued until the running stage completes.

If `MAX_STAGES` is not set, the number of concurrent stage executions is unbounded.

For full installation and configuration details, go to [Delegate Configuration Reference](/docs/platform/delegates-v2/install-a-delegate/configure-delegate#set-max-stage-capacity).

### Queued stage visibility

When no eligible delegate has free capacity, the stage's **Initialize** step displays a log message indicating the stage is queued.

![Queued stage log in the Initialize step](./static/queued-stage.png)

:::warning Known limitation

A queued stage currently appears as **Running** in the pipeline execution view even though it is waiting for delegate capacity at the Initialize task level. A distinct **Queued** status will be available in a future release.

:::

## Use cases

Local (Docker) Infra stages run directly on the delegate's host machine. Steps inside these stages can be container-based or containerless. Capacity limits are especially useful in two scenarios.

### Prevent resource exhaustion

Without capacity limits, a delegate accepts any number of concurrent stages. If many stages land on the same delegate simultaneously, the host machine can run out of CPU, memory, or disk I/O, causing slowness and instability across all running pipelines. Setting `MAX_STAGES` to an appropriate value keeps resource consumption predictable.

### Avoid tool concurrency conflicts

Some build tools rely on global system-level configurations or file locks that prevent parallel use. For example, Bazel supports only a single build per workspace by default. Running two stages that both invoke Bazel in the same workspace causes one of them to fail.

Setting `MAX_STAGES=1` serializes stage execution on that delegate, eliminating conflicts between concurrent stages.

:::info

All Harness-native steps run in isolated working directories and do not interfere with one another when executing concurrently. Concurrency conflicts arise only when custom or third-party tools used in a **Run** step share global state or workspace locks.

:::

## How stages are distributed

When a stage execution starts, Harness assigns it to an eligible delegate based on available capacity. All Initialize tasks are submitted with **NORMAL** priority by default.

### Free capacity calculation

Free capacity for a delegate is calculated as:

```
Free Capacity = MAX_STAGES − (number of stages currently executing)
```

### Assignment rules

- **Capacity available (Free Capacity > 0):** The stage is assigned to the eligible delegate with the highest free capacity. This distributes work evenly across delegates.
- **No capacity available (Free Capacity = 0):** The stage is queued and assigned to the first eligible delegate that finishes an in-progress stage.

### Queue ordering

When multiple stages are queued, they are assigned to delegates in the following order:

1. **Priority:** Stages with **HIGH** priority are assigned before stages with **NORMAL** priority, which are assigned before stages with **LOW** priority.
2. **Age:** Among stages of equal priority, older stages are assigned first (FIFO).

---

## Manage queue priority

:::note

Queue management APIs are behind the feature flag `PL_STAGE_QUEUE_API`. Contact [Harness Support](mailto:support@harness.io) to enable this feature for your account.

:::

Harness provides APIs to view queued stages and adjust their execution priority. These APIs help you respond to urgent situations where a critical deployment or hotfix needs to bypass the normal queue order.

### When to use queue prioritization

Queue prioritization is useful when you have limited delegate capacity and need to expedite specific stages ahead of others already waiting in the queue. Common scenarios include:

- A hotfix deployment needs to run immediately while multiple PR builds are queued
- A critical release pipeline must take precedence over routine CI jobs
- An urgent customer issue requires immediate testing or deployment

Without queue management, all stages execute strictly in order based on their original submission time. With queue management enabled, authorized users can promote urgent work to the front of the queue.

### View queued and running stages

The List Queued Stages API shows all stages currently queued or executing across your delegates. This visibility helps you understand what work is pending and identify which stages might benefit from priority adjustment.

**Endpoint:**

```http
GET /v2/stages/queue
```

**Required parameters:**

- `accountIdentifier` - Your Harness account ID
- `x-api-key` - Your API key for authentication

**Optional filters:**

You can scope the queue view to specific organizational boundaries or filter by delegate or status.

| Parameter | Description | Example |
|-----------|-------------|---------|
| `orgIdentifier` | Show only stages from this organization | `default` |
| `projectIdentifier` | Show only stages from this project (requires `orgIdentifier`) | `mobile_team` |
| `status` | Filter by `QUEUED`, `RUNNING`, or `ALL` | `QUEUED` |
| `delegateName` | Show only stages for this delegate | `mac-runner-01` |
| `sort` | Order by `priority_time` (default) or `time` | `priority_time` |

**Example request:**

```bash
curl -X GET \
  'https://app.harness.io/gateway/pipeline/api/v2/stages/queue?accountIdentifier=YOUR_ACCOUNT_ID&status=QUEUED' \
  -H 'x-api-key: YOUR_API_KEY'
```

**Example response:**

<details>
<summary>Queue listing API response showing queued and running stages</summary>

```json
{
  "status": "SUCCESS",
  "data": {
    "stages": [
      {
        "pipelineIdentifier": "build_ios_app",
        "pipelineName": "Build iOS App",
        "pipelineExecutionId": "exec_abc123def456",
        "stageIdentifier": "build_stage",
        "stageName": "Build Stage",
        "status": "QUEUED",
        "priority": "HIGH",
        "queuePosition": 1,
        "orgIdentifier": "default",
        "projectIdentifier": "mobile_team",
        "triggeredBy": {
          "name": "Jane Smith",
          "email": "jane.smith@example.com"
        },
        "triggerType": "MANUAL",
        "eligibleDelegates": [
          {
            "name": "mac-runner-01",
            "hostName": "mac-mini-01.local"
          }
        ],
        "executingDelegate": null,
        "createdAt": 1709567890000,
        "queuedDuration": "2m 34s"
      },
      {
        "pipelineIdentifier": "pr_validation",
        "pipelineName": "PR Validation",
        "pipelineExecutionId": "exec_def789ghi012",
        "stageIdentifier": "test_stage",
        "stageName": "Test Stage",
        "status": "RUNNING",
        "priority": "NORMAL",
        "queuePosition": null,
        "orgIdentifier": "default",
        "projectIdentifier": "mobile_team",
        "executingDelegate": {
          "name": "mac-runner-01",
          "hostName": "mac-mini-01.local"
        },
        "createdAt": 1709567800000,
        "queuedDuration": null
      }
    ],
    "totalQueued": 1,
    "totalRunning": 1,
    "pageIndex": 0,
    "pageSize": 50,
    "totalItems": 2
  }
}
```

</details>

**Key response fields:**

| Field | Description |
|-------|-------------|
| `pipelineExecutionId` | Unique execution ID that links to the pipeline execution in Harness UI |
| `stageIdentifier` | Stage identifier from your pipeline YAML |
| `priority` | Current priority: `HIGH`, `NORMAL`, or `LOW` |
| `queuePosition` | Position in queue (1 = next to execute). Null for running stages |
| `eligibleDelegates` | Delegates that can run this stage (shown for queued stages) |
| `executingDelegate` | Delegate currently running this stage (shown for running stages) |
| `queuedDuration` | How long the stage has been waiting |

The default sort order (`priority_time`) shows stages exactly as they will be picked up - highest priority first, then oldest within each priority level.

### Change stage priority

The Update Stage Priority API lets you change the priority of queued stages. Increasing a stage's priority moves it ahead of other queued stages with lower priority.

:::info

Only stages in `QUEUED` status can be reprioritized. Running stages cannot be interrupted or reprioritized.

:::

**Endpoint:**

```http
PUT /v2/stages/queue/priority
```

**Request body:**

You identify stages using the pipeline execution ID and stage identifier returned by the List API.

<details>
<summary>Update priority API request payload</summary>

```json
{
  "accountIdentifier": "YOUR_ACCOUNT_ID",
  "stages": [
    {
      "pipelineExecutionId": "exec_def789ghi012",
      "stageIdentifier": "test_stage"
    }
  ],
  "priority": "HIGH"
}
```

</details>

**Request fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `accountIdentifier` | Yes | Your Harness account ID |
| `stages` | Yes | Array of stages to update (maximum 10 per request) |
| `stages[].pipelineExecutionId` | Yes | Pipeline execution ID from the List API |
| `stages[].stageIdentifier` | Yes | Stage identifier from the List API |
| `priority` | Yes | New priority: `HIGH`, `NORMAL`, or `LOW` |

**Example request:**

```bash
curl -X PUT \
  'https://app.harness.io/gateway/pipeline/api/v2/stages/queue/priority' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: YOUR_API_KEY' \
  -d '{
    "accountIdentifier": "YOUR_ACCOUNT_ID",
    "stages": [
      {
        "pipelineExecutionId": "exec_def789ghi012",
        "stageIdentifier": "test_stage"
      }
    ],
    "priority": "HIGH"
  }'
```

**Example response:**

<details>
<summary>Priority update confirmation response</summary>

```json
{
  "status": "SUCCESS",
  "data": {
    "updated": [
      {
        "pipelineExecutionId": "exec_def789ghi012",
        "stageIdentifier": "test_stage",
        "previousPriority": "NORMAL",
        "newPriority": "HIGH",
        "newQueuePosition": 1
      }
    ],
    "failed": []
  }
}
```

</details>

The response confirms which stages were successfully updated and shows their new position in the queue.

**Common errors:**

| Error | Cause | Solution |
|-------|-------|----------|
| `Stage is currently RUNNING and cannot be reprioritized` | The stage already started executing | Wait for stage to complete or abort the execution |
| `No queued stage found for the given execution and stage identifier` | Stage not found or already completed | Verify the execution ID and stage identifier from the List API |
| `Invalid priority. Must be one of: HIGH, NORMAL, LOW` | Invalid priority value in request | Use only `HIGH`, `NORMAL`, or `LOW` |
| `User does not have permission to modify queue priority` | Missing queue management permission | Contact your account administrator to grant the Queue Admin role |

### Priority levels

Harness supports three priority levels that determine queue order:

| Priority | Behavior | Typical Use |
|----------|----------|-------------|
| **HIGH** | Executes ahead of NORMAL and LOW stages | Hotfixes, production incidents, critical releases |
| **NORMAL** | Default priority for all stages | Regular CI builds, PR validation, scheduled pipelines |
| **LOW** | Executes after NORMAL and HIGH stages | Non-urgent batch jobs, cleanup tasks, nightly builds |

When a delegate finishes a stage and has free capacity, it picks the next queued stage using this order:

1. All HIGH priority stages (oldest first)
2. All NORMAL priority stages (oldest first)
3. All LOW priority stages (oldest first)

Changing a stage's priority does not interrupt already-running stages. The new priority takes effect only when determining which queued stage executes next.

### Access control

Queue management operations require specific permissions controlled through Harness RBAC.

**Permissions:**

| Permission | Grants Access To | Default Roles |
|------------|------------------|---------------|
| `queue_view` | List Queued Stages API | All users with pipeline execution access |
| `queue_manage` | Update Stage Priority API | Custom Queue Admin role only |

To grant queue management permissions, create a custom role in Harness with the `queue_manage` permission and assign it to users who need the ability to reprioritize queued stages.

Go to [Manage access control](/docs/platform/role-based-access-control/rbac-in-harness) for instructions on creating custom roles and assigning permissions via Resource Groups.

### Scope and filtering

The List API respects organizational boundaries based on the parameters you provide:

- **Account scope** (`accountIdentifier` only): Returns all queued and running stages across every organization and project in your account
- **Organization scope** (`accountIdentifier` + `orgIdentifier`): Returns stages from all projects within the specified organization
- **Project scope** (`accountIdentifier` + `orgIdentifier` + `projectIdentifier`): Returns stages from the specified project only

Users only see stages from projects they have access to based on their RBAC configuration. Stages from inaccessible projects are filtered out automatically.

## Next steps

- **[Install Harness Delegate](/docs/platform/delegates-v2/install-a-delegate/install-delegate-macos):** Set up Delegate 3.x and configure `MAX_STAGES`.
- **[Delegate overview](/docs/platform/delegates-v2/delegate-overview):** Learn about the transactional execution model and architecture.
- **[Feature parity](/docs/platform/delegates-v2/feature-parity):** Compare supported features between the new and legacy delegates.
