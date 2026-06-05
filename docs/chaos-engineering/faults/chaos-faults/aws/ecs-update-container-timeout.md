---
id: ecs-update-container-timeout
title: ECS update container timeout
sidebar_label: ECS Update Container Timeout
description: Re-register the task definition of an ECS service with chaos values for container start and stop timeouts for a configurable duration so you can test how the workload behaves when ECS no longer waits long enough for containers to start or drain.
keywords:
  - chaos engineering
  - ecs update container timeout
  - aws fault
  - ecs fault
  - container timeout
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-update-container-timeout
  - /docs/chaos-engineering/chaos-faults/aws/ecs-update-container-timeout
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS update container timeout is an AWS chaos fault that registers a new revision of the target service's task definition with the container `startTimeout` set to `START_TIMEOUT` seconds and `stopTimeout` set to `STOP_TIMEOUT` seconds, updates the service to that revision for a configurable duration, then re-registers and restores the original revision. The chaos timeouts apply to new tasks scheduled during the chaos window: ECS gives them only `START_TIMEOUT` seconds to become healthy, and only `STOP_TIMEOUT` seconds to drain on `SIGTERM` before being killed.

Use this fault to test how a workload behaves when ECS does not wait long enough for containers to start (cold starts, dependency-readiness probes) or to drain (in-flight requests, connection close, message commits), and to validate that your application's startup and shutdown handlers are correctly sized.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Cold-start failures:** When `startTimeout` is shorter than the application's startup time, do tasks fail health checks and get killed, and does the service deployment surface this clearly?
- **Hard drain:** When `stopTimeout` is shorter than in-flight request duration, do clients see resets, and do dependent systems (queues, databases) handle the partial commits?
- **Sidecar startup ordering:** Do dependent containers in the task (proxies, log shippers) survive a shorter `startTimeout`, or do they cause the task to fail entirely?
- **Deployment safety:** Does the deployment circuit breaker catch repeated start failures and roll back automatically?
- **Recovery from configuration drift:** If someone accidentally lowered the timeouts in production, would alarms catch it, and is the fix simple?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service:** `SERVICE_NAME` exists in `CLUSTER_NAME` within `REGION` and has at least one running task.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below, including `iam:PassRole`.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Supported (timeouts are bounded by the Fargate platform; values above platform limits are silently clamped) |
| Tasks with sidecar containers | Supported (every container gets the new `startTimeout`/`stopTimeout`) |
| AWS regions | Supported in every commercial region; pass the region in `REGION` |

---

## Permissions required

The IAM principal that the chaos pod uses (the credentials mounted from the Harness Secret Manager file secret, the IRSA role on the chaos service account, or the role assumed via `ASSUME_ROLE_ARN`) needs the following AWS actions.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecs:DescribeServices",
        "ecs:DescribeTaskDefinition",
        "ecs:RegisterTaskDefinition",
        "ecs:DeregisterTaskDefinition",
        "ecs:UpdateService",
        "ecs:ListTasks",
        "ecs:DescribeTasks"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:PassRole"
      ],
      "Resource": "*"
    }
  ]
}
```

Go to [common policy for all AWS faults](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to use a single superset IAM policy across every AWS fault.

---

## Authentication

The fault supports three credential delivery models. Pick one based on how your chaos infrastructure is deployed.

| Method | When to use it | How to configure |
| --- | --- | --- |
| Harness Secret Manager file secret | Chaos infrastructure runs outside EKS, or you want explicit static credentials | Upload the AWS credentials file as a **File Secret** in Harness Secret Manager and reference its identifier via `AWS_AUTHENTICATION_SECRET` |
| IAM Roles for Service Accounts (IRSA) | Chaos infrastructure runs in EKS and uses an OIDC-bound service account | No tunable changes; the chaos pod inherits the role automatically. Go to [AWS IAM integration](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-iam-integration) to set it up |
| Assume role | The fault needs to act in a different account or with elevated permissions | Set `ASSUME_ROLE_ARN` to the role ARN; the chaos pod assumes the role on top of its base credentials |

When using the Harness Secret Manager method, the contents of the File Secret should be the AWS credentials file in the standard `~/.aws/credentials` format:

```ini
[default]
aws_access_key_id = REPLACE_WITH_ACCESS_KEY_ID
aws_secret_access_key = REPLACE_WITH_SECRET_ACCESS_KEY
```

Upload this file as a **File Secret** in Harness Secret Manager (Project Setup → Secrets → New File Secret), and pass the secret identifier in `AWS_AUTHENTICATION_SECRET` when configuring the fault.

Go to [AWS named profile for chaos](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-switch-profile) to switch between profiles inside a single credentials file.

---

## Fault tunables

Configure the following fault parameters when you add ECS update container timeout to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `SERVICE_NAME` | Name of the target ECS service. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `START_TIMEOUT` | Container `startTimeout` (in seconds) to apply during the chaos window. ECS kills the task if any container does not reach `HEALTHY` within this window. | `30` |
| `STOP_TIMEOUT` | Container `stopTimeout` (in seconds) to apply during the chaos window. ECS waits this long after `SIGTERM` before sending `SIGKILL`. | `30` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of task replicas to affect through the deployment. | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The service runs on the chaos revision for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Reads the current task definition for `SERVICE_NAME`, registers a new revision with each container's `startTimeout` and `stopTimeout` set to `START_TIMEOUT` and `STOP_TIMEOUT`, updates the service to that revision, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original revision and deregisters the chaos revision.

---

## Expected behavior during fault execution

- A new task definition revision is registered with the chaos timeouts.
- The service deploys new tasks on the chaos revision; old tasks drain according to the deployment configuration. If `STOP_TIMEOUT` is shorter than the old `stopTimeout`, the draining is harsher.
- New tasks that cannot reach `HEALTHY` within `START_TIMEOUT` are killed by ECS; the service deployment may stall or roll back.
- Stopping tasks receive `SIGTERM`, get `STOP_TIMEOUT` seconds to drain, then receive `SIGKILL`. Long-lived requests in flight may be reset.
- ECS service events show "task did not transition to RUNNING state in time" and "task started" / "task stopped" cycles.

:::info When the fault ends
The chaos pod restores the original task definition revision and waits for the rollout to begin. Subsequent tasks use the original timeouts; running tasks on the chaos revision drain as the rollout completes.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the service endpoint to detect downtime during the chaos window.
- **Task start failures:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_pending_task_count` to detect a build-up of failed start attempts.
- **Deployment status:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ecs describe-services --query "services[].deployments"` and asserts the deployment circuit breaker fires when `START_TIMEOUT` is too short.
- **Request resets:** Use a Prometheus probe on application-level error counters (HTTP 499/502, custom client-reset counters) to detect aggressive drains.

---

## Verify the fault execution effect

While the experiment is running, confirm the timeouts change and then restore:

1. **Inspect the active task definition.**

   ```bash
   aws ecs describe-task-definition \
     --task-definition <active-arn> \
     --region <region> \
     --query "taskDefinition.containerDefinitions[].[name,startTimeout,stopTimeout]"
   ```

   During the fault these should equal `START_TIMEOUT` and `STOP_TIMEOUT`. After recovery they should return to the original values.

2. **Inspect deployment events.**

   ```bash
   aws ecs describe-services \
     --cluster <cluster> \
     --services <service> \
     --region <region> \
     --query "services[].events[0:10]"
   ```

   Look for task-start-timeout events during the chaos window if `START_TIMEOUT` is too short.

3. **Inspect stopped tasks.**

   ```bash
   aws ecs list-tasks --cluster <cluster> --service-name <service> --desired-status STOPPED --region <region>
   aws ecs describe-tasks --cluster <cluster> --tasks <arn> --region <region> \
     --query "tasks[].[stoppedReason,containers[0].reason]"
   ```

   The reason should indicate timeout-driven termination.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original revision and deregisters the chaos revision.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore-and-deregister cleanup.
- **Manual recovery:** If the fault exits before cleanup, set the service back to the original revision manually with `aws ecs update-service --task-definition <original-arn>`.
- **Workload recovery:** Requests reset during the harsh drain are not replayed by the fault; the client is responsible for retrying.

---

## Limitations

- **Fargate platform clamps:** On Fargate, `startTimeout` and `stopTimeout` are bounded by the platform version's maximums; values above the cap are silently clamped.
- **Existing tasks keep original timeouts:** Running tasks are not retroactively retimed; only new tasks scheduled during the chaos window get the new timeouts.
- **Health checks must be defined:** `startTimeout` is enforced only when a container has a `healthCheck` configured. Containers without health checks ignore the value.
- **Single service per experiment:** Use multiple experiments to target multiple services.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS update container timeout deployment never reaches steady state"
  mode="docs"
  fallback="START_TIMEOUT is too short for the application to reach HEALTHY. Increase START_TIMEOUT (or temporarily relax the health check command), or pick a longer value that still constrains startup. If the deployment circuit breaker is enabled, the service will roll back automatically; check 'aws ecs describe-services' deployments for rolledback events."
/>

<Troubleshoot
  issue="STOP_TIMEOUT change does not appear to affect drain time"
  mode="docs"
  fallback="The most common causes are: STOP_TIMEOUT is larger than the original stopTimeout (no observable change because the original already gave the app enough time); the load balancer's deregistration delay is the dominant factor (set this to a value compatible with STOP_TIMEOUT); or the application exits faster than STOP_TIMEOUT when it receives SIGTERM. Test with a smaller STOP_TIMEOUT and an application that holds open long-lived connections."
/>

<Troubleshoot
  issue="Sidecar containers fail to start within START_TIMEOUT"
  mode="docs"
  fallback="START_TIMEOUT applies to every container in the task. Sidecars with slow startup (for example Envoy initial xDS sync) may not become HEALTHY within the chaos window even though the main container does. Use a value that respects the slowest sidecar, or remove the sidecar's healthCheck so it is not gated by startTimeout."
/>

<Troubleshoot
  issue="Service is left on the chaos task definition after the experiment"
  mode="docs"
  fallback="If the experiment was killed mid-cleanup, the service may still be on the chaos revision. Run 'aws ecs update-service --cluster <c> --service <s> --task-definition <original-arn>' to roll back, then 'aws ecs deregister-task-definition --task-definition <chaos-arn>' to clean up. The original ARN is recorded in the chaos pod logs."
/>

---

## Related faults

- [ECS update container resource limit](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-container-resource-limit): Modify container CPU and memory limits.
- [ECS update task role](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-task-role): Swap the task role to test permission failures.
- [ECS task stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-task-stop): Stop specific tasks to force a deployment with the new timeouts.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
