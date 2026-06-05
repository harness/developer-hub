---
id: ecs-agent-stop
title: ECS agent stop
sidebar_label: ECS Agent Stop
description: Stop the ECS container agent on every container instance in an ECS cluster for a configurable duration so you can test how tasks, scheduling, and self-healing behave when the cluster temporarily loses its agent.
keywords:
  - chaos engineering
  - ecs agent stop
  - aws fault
  - ecs fault
  - container instance
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-agent-stop
  - /docs/chaos-engineering/chaos-faults/aws/ecs-agent-stop
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS agent stop is an AWS chaos fault that stops the `ecs-agent` process on every container instance registered to a target ECS cluster for a configurable duration. While the agent is down each container instance is reported as `AGENT_DISCONNECTED` and the ECS control plane can no longer place new tasks, send signals, or collect status from those instances. The tasks already running on the instances continue to run, but they become invisible to the scheduler until the agent is restored.

Use this fault to test how an ECS cluster behaves when the control plane temporarily loses contact with its data plane: whether the scheduler waits or fails over, whether a deployment in flight stalls, whether dependent CI or autoscaling logic times out gracefully, and whether the agent reconnects cleanly when the fault ends.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Scheduler resilience:** When every agent in a cluster disconnects, does the ECS scheduler wait for reconnection, or does it move tasks to a different cluster?
- **In-flight deployment behaviour:** If a service update is rolling out when agents disconnect, does the deployment stall safely and resume when agents return?
- **Container instance lifecycle:** Do container instances reconnect cleanly when the agent is restored, and do running tasks resume reporting normally?
- **Operational alerting:** Does your alerting fire when container instances report `AGENT_DISCONNECTED`, and is the runbook for "ECS agent down" still accurate?
- **CI / autoscaling backpressure:** Does upstream CI or autoscaling that relies on ECS API responses degrade gracefully when the agent is unavailable, or does it cascade?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS cluster:** `CLUSTER_NAME` exists in `REGION` and uses the EC2 launch type (this fault is not applicable to Fargate-only clusters, which have no agent process to stop).
- **Container instances are SSM-managed:** Every EC2 container instance is registered with AWS Systems Manager (the SSM Agent is running and the host has an instance profile with SSM permissions). Go to [Setting up Systems Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-setting-up.html) to enable SSM.
- **AWS credentials available:** Either an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account, or an explicit role assumed via `ASSUME_ROLE_ARN`. This fault does not expose an `AWS_AUTHENTICATION_SECRET` tunable; if you need static credentials, configure them at the chaos infrastructure level.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Not supported (no agent process to stop) |
| Linux container instances | Supported |
| Windows container instances | Supported |
| AWS regions | Supported in every commercial region; pass the region in `REGION` |
| Mixed clusters (EC2 + Fargate) | Supported; only the EC2 container instances are affected |

---

## Permissions required

The IAM principal that the chaos pod uses (IRSA on the chaos service account, or the role assumed via `ASSUME_ROLE_ARN`) needs the following AWS actions.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecs:DescribeClusters",
        "ecs:ListContainerInstances",
        "ecs:DescribeContainerInstances"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ssm:SendCommand",
        "ssm:CancelCommand",
        "ssm:GetCommandInvocation",
        "ssm:DescribeInstanceInformation"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2messages:AcknowledgeMessage",
        "ec2messages:DeleteMessage",
        "ec2messages:FailMessage",
        "ec2messages:GetEndpoint",
        "ec2messages:GetMessages",
        "ec2messages:SendReply"
      ],
      "Resource": "*"
    }
  ]
}
```

- `ecs:DescribeClusters`, `ecs:ListContainerInstances`, and `ecs:DescribeContainerInstances` are used to discover the EC2 hosts behind the cluster.
- `ssm:SendCommand` and related SSM actions are used to stop the `ecs-agent` service on each host.
- `ec2messages:*` are the legacy messaging permissions still required for SSM Run Command on older instance roles.

Go to [common policy for all AWS faults](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to use a single superset IAM policy across every AWS fault.

---

## Authentication

The fault supports two credential delivery models. Pick one based on how your chaos infrastructure is deployed.

| Method | When to use it | How to configure |
| --- | --- | --- |
| IAM Roles for Service Accounts (IRSA) | Chaos infrastructure runs in EKS and uses an OIDC-bound service account | No tunable changes; the chaos pod inherits the role automatically. Go to [AWS IAM integration](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-iam-integration) to set it up |
| Assume role | The fault needs to act in a different account or with elevated permissions | Set `ASSUME_ROLE_ARN` to the role ARN; the chaos pod assumes the role on top of its base credentials |

If you need to inject static AWS credentials, configure them at the chaos infrastructure level (the chaos service account environment) rather than per fault, because this fault does not expose an `AWS_AUTHENTICATION_SECRET` tunable.

---

## Fault tunables

Configure the following fault parameters when you add ECS agent stop to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The agent stays stopped for this period. | `30` |
| `SEQUENCE` | Order in which multiple container instances are targeted: `parallel` stops the agent on all hosts at once; `serial` stops them one host at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Discovers every container instance in `CLUSTER_NAME` within `REGION`, stops the `ecs-agent` service on each underlying EC2 host for `TOTAL_CHAOS_DURATION` seconds, then restarts the agent and waits for each container instance to return to the `ACTIVE` connection state.

---

## Expected behavior during fault execution

- Container instances transition from `ACTIVE` with `agentConnected=true` to `ACTIVE` with `agentConnected=false` (also reported in the ECS console as `AGENT_DISCONNECTED`).
- Already-running tasks continue to run on each container instance because the workload itself is unaffected; only the control-plane channel is severed.
- New `RunTask` or `StartTask` calls targeting these container instances fail or queue, because the scheduler cannot reach the agent.
- A service deployment that was already rolling out pauses; deployments that begin during the fault are blocked.
- ECS CloudWatch metrics (for example `ContainerInstance` health and `Service` event counts) reflect the disconnection.

:::info When the fault ends
The chaos pod issues a start of the `ecs-agent` service on every host and polls until each container instance reports `agentConnected=true` again. The scheduler resumes placement automatically; no manual intervention is needed.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Agent connectivity:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ecs describe-container-instances --cluster <cluster> --container-instances <arn>` and asserts on `agentConnected`.
- **Scheduler responsiveness:** Use a command probe that calls `aws ecs run-task` against the cluster and asserts the call fails during the fault and succeeds afterwards.
- **In-flight deployments:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_running_task_count` or `aws_ecs_pending_task_count` to confirm the deployment paused and recovered.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the service endpoint to confirm running tasks continue to serve traffic during the fault.

---

## Verify the fault execution effect

While the experiment is running, confirm the agent is disconnected and then reconnected:

1. **Inspect container instance connectivity.**

   ```bash
   aws ecs list-container-instances --cluster <cluster> --region <region>
   aws ecs describe-container-instances \
     --cluster <cluster> \
     --region <region> \
     --container-instances <arn-1> <arn-2> \
     --query "containerInstances[].[ec2InstanceId,agentConnected]"
   ```

   During the fault `agentConnected` should be `false`. After `TOTAL_CHAOS_DURATION` it should return to `true`.

2. **Confirm tasks keep running.**

   ```bash
   aws ecs list-tasks --cluster <cluster> --region <region> --desired-status RUNNING
   ```

   The running task list should remain stable during the fault.

3. **Verify the scheduler regains placement after recovery.**

   ```bash
   aws ecs run-task \
     --cluster <cluster> \
     --task-definition <task-def> \
     --region <region>
   ```

   This call should succeed only after the agent has reconnected.

---

## Recovery and cleanup

- **End of duration:** The chaos pod starts the `ecs-agent` service on each container instance and polls until every host reports `agentConnected=true`.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same start call.
- **Manual recovery:** If the fault exits before issuing the start call, restart the agent on each affected host with `sudo systemctl start ecs` (Amazon Linux 2 / Amazon Linux 2023) or `sudo start ecs` (older AMIs). The agent reconnects automatically once running.
- **Workload recovery:** Running tasks should not need recovery because they were never interrupted; verify deployment status if a rollout was in flight.

---

## Limitations

- **Fargate is not affected:** Fargate tasks have no exposed agent process; this fault is meaningful only on container instances under the EC2 launch type.
- **All container instances in the cluster are affected:** The fault does not filter by tag, AZ, or service. Use a dedicated test cluster or a `serial` sequence if you need a smaller blast radius.
- **SSM-managed hosts only:** Container instances that are not registered with SSM cannot be reached; the fault skips them and reports the host as unaffected.
- **Already-running tasks keep running:** This fault tests scheduler / control-plane resilience, not workload availability. Pair it with a workload-level fault if you also want to test task-level disruption.

---

## Troubleshooting

<Troubleshoot
  issue="ECS agent stop experiment fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ECS and SSM permissions. Confirm the IAM policy attached to the IRSA role (or the role assumed via ASSUME_ROLE_ARN) includes ecs:DescribeClusters, ecs:ListContainerInstances, ecs:DescribeContainerInstances, ssm:SendCommand, ssm:GetCommandInvocation, and ssm:DescribeInstanceInformation. When using ASSUME_ROLE_ARN, also confirm the source identity is trusted to assume the role."
/>

<Troubleshoot
  issue="ECS agent stop reports container instance is not SSM-managed"
  mode="docs"
  fallback="The fault uses AWS Systems Manager Run Command to stop the agent process; the underlying EC2 container instance must be registered with SSM. Confirm the SSM Agent is installed and running on the host, the host has an instance profile with AmazonSSMManagedInstanceCore (or equivalent), and the host appears in 'aws ssm describe-instance-information'. After enabling SSM the instance may take a few minutes to register."
/>

<Troubleshoot
  issue="ECS agent stop completes but container instance still shows agentConnected=true"
  mode="docs"
  fallback="The agent restart was so fast that the disconnection window was shorter than the ECS heartbeat interval (typically 30 seconds). Increase TOTAL_CHAOS_DURATION to at least 60 seconds and rerun the experiment. You can also confirm the SSM command actually ran by inspecting the command invocation in the AWS console under Systems Manager → Run Command."
/>

<Troubleshoot
  issue="Running tasks failed during ECS agent stop and did not recover"
  mode="docs"
  fallback="Tasks should not be terminated by this fault. If tasks died during the experiment, the most likely cause is a health check on the service that flapped because the deployment controller could not reach the agent; the service then replaced tasks once the agent reconnected. Verify the service events with 'aws ecs describe-services' and consider lowering deployment health check sensitivity or pairing this fault with longer health-check grace periods."
/>

---

## Related faults

- [ECS instance stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-instance-stop): Stop the underlying EC2 container instance instead of just its agent.
- [ECS task stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-task-stop): Stop specific ECS tasks while leaving the cluster control plane untouched.
- [ECS network restrict](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-network-restrict): Restrict outbound or inbound network traffic for ECS services.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
