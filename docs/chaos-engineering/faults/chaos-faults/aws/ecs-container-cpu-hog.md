---
id: ecs-container-cpu-hog
title: ECS container CPU hog
sidebar_label: ECS Container CPU Hog
description: Stress a configurable number of CPU cores at a configurable load percentage inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration so you can test how the workload behaves under sustained CPU pressure.
keywords:
  - chaos engineering
  - ecs container cpu hog
  - aws fault
  - ecs fault
  - cpu stress
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-cpu-hog
  - /docs/chaos-engineering/chaos-faults/aws/ecs-container-cpu-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS container CPU hog is an AWS chaos fault that stresses `CPU_CORES` cores at `CPU_LOAD` percent inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration. The fault discovers the EC2 container instances hosting the target tasks and runs CPU-stress commands inside the relevant containers via AWS Systems Manager Run Command on each host, scoped by ECS container metadata. The chaos stops automatically at the end of the fault and the affected processes are cleaned up on each host.

Use this fault to test how an ECS workload behaves under sustained CPU pressure that is contained to a subset of tasks: whether request latency degrades predictably, whether application-level circuit breakers shed load, whether autoscaling alarms fire, and whether multi-tenant noisy-neighbour isolation works as expected.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **CPU pressure on the workload:** When a fraction of replicas is CPU-saturated, do remaining replicas absorb the traffic without breaching latency SLOs?
- **Autoscaling:** Does the CPU-based scaling policy fire and add capacity within the expected window?
- **Noisy-neighbour isolation:** Does CPU pressure on one container affect sibling containers on the same task or host, and is that acceptable?
- **Circuit breaker engagement:** Does the application's internal circuit breaker engage when downstream latency rises because of CPU starvation?
- **Recovery time:** When the stress ends, how quickly does latency return to baseline?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service or cluster:** `CLUSTER_NAME` exists in `REGION` and uses the EC2 launch type. If `SERVICE_NAME` is set, the fault selects from that service's running tasks.
- **Container instances are SSM-managed:** Every EC2 container instance is registered with AWS Systems Manager. Go to [Setting up Systems Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-setting-up.html) to enable SSM.
- **ECS container metadata enabled:** Container metadata must be enabled on the cluster so the fault can locate the target container on each host. Go to [Container metadata file](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html) to enable it; if your task is older than the change, restart it to populate the metadata directory.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Not supported (use [ECS Fargate CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-fargate-cpu-hog) instead) |
| Linux container instances | Supported |
| Windows container instances | Not supported |
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
        "ecs:DescribeClusters",
        "ecs:DescribeServices",
        "ecs:DescribeTasks",
        "ecs:ListTasks",
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
        "ec2:DescribeInstances",
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

Configure the following fault parameters when you add ECS container CPU hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_NAME` | Name of the target ECS service. When set, the fault selects `TASK_REPLICA_AFFECTED_PERC` of the service's running tasks; leave empty to target all running tasks in the cluster. | `""` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of running tasks to stress when `SERVICE_NAME` is set. | `100` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CPU_CORES` | Number of CPU cores to stress inside each affected container. | `1` |
| `CPU_LOAD` | Load percentage applied to each core (0-100). | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `INSTALL_DEPENDENCIES` | Install the stress tooling on each container instance if missing. Set to `false` when your AMI already has it and you want to skip the install step. | `true` |
| `DEFAULT_HEALTH_CHECK` | When `true`, the fault runs additional checks against ECS to verify task health before and after the stress. | `false` |
| `SEQUENCE` | Order in which multiple tasks are stressed: `parallel` issues the stress on all selected tasks at once; `serial` does so one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Resolves the running tasks for `SERVICE_NAME` (or all tasks in `CLUSTER_NAME`), picks `TASK_REPLICA_AFFECTED_PERC` of them, and dispatches a CPU-stress command via AWS Systems Manager Run Command to the EC2 host of each selected task. The command is scoped to the target container via ECS container metadata, runs for `TOTAL_CHAOS_DURATION` seconds, and is cleaned up at the end.

---

## Expected behavior during fault execution

- The targeted containers' CPU utilization rises to the configured `CPU_LOAD` across `CPU_CORES` cores.
- Application latency rises in proportion to the CPU pressure; clients may see slower responses or timeouts.
- ECS CloudWatch metrics for the service (CPUUtilization) reflect the elevated usage on the affected tasks.
- Other containers on the same EC2 host may experience noisy-neighbour effects depending on cgroup limits.
- Health checks may fail under sustained pressure, triggering ECS to replace tasks.

:::info When the fault ends
The chaos pod stops the stress process on each host. CPU returns to baseline within seconds; any tasks killed by health checks during the stress are rescheduled by the ECS service controller.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert percentile latency SLOs.
- **CPU utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_cpu_utilization` for the affected service.
- **Autoscaling alarms:** Confirm CPU-based scaling policy alarms fire when expected.
- **Task lifecycle:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ecs describe-tasks` and asserts task health.

---

## Verify the fault execution effect

While the experiment is running, confirm CPU pressure is applied to the targeted containers:

1. **Check CPU utilization metrics.**

   In the AWS console (CloudWatch → ECS → ClusterName → ServiceName), `CPUUtilization` should rise sharply during the chaos window and fall after recovery.

2. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations \
     --region <region> \
     --details \
     --filters "key=Status,value=InProgress"
   ```

   During the fault, you should see in-progress commands on the affected container instances.

3. **List affected tasks before and after.**

   ```bash
   aws ecs list-tasks --cluster <cluster> --service-name <service> --desired-status RUNNING --region <region>
   ```

   Task ARNs should match across the chaos window unless health checks killed and replaced them.

---

## Recovery and cleanup

- **End of duration:** The chaos pod terminates the stress process on each host. CPU returns to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command and stops the stress.
- **Manual recovery:** If the fault exits before cleanup runs, you can stop the stress process by sending `aws ssm send-command --document-name AWS-RunShellScript --parameters 'commands=["pkill -f stress"]'` to the affected hosts.
- **Workload recovery:** Tasks killed by health checks during the stress are rescheduled by the ECS service controller; no manual intervention is needed.

---

## Limitations

- **EC2 launch type only:** This fault uses SSM Run Command against the underlying EC2 host. Fargate has no exposed host; use [ECS Fargate CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-fargate-cpu-hog).
- **Container metadata must be enabled:** Without ECS container metadata, the fault cannot locate the target container on the host.
- **SSM-managed hosts only:** Container instances that are not SSM-registered cannot be reached.
- **Linux-only:** The stress tooling installed by `INSTALL_DEPENDENCIES=true` is Linux-only.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS container CPU hog fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ECS or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ecs:DescribeServices, ecs:DescribeTasks, ecs:ListContainerInstances, ssm:SendCommand, and ssm:GetCommandInvocation. When using ASSUME_ROLE_ARN, also confirm the source identity is trusted to assume the role."
/>

<Troubleshoot
  issue="ECS container CPU hog reports the container instance is not SSM-managed"
  mode="docs"
  fallback="The fault uses AWS Systems Manager Run Command on the underlying EC2 host. Confirm the SSM Agent is installed and running on the host, the host has an instance profile with AmazonSSMManagedInstanceCore (or equivalent), and the host appears in 'aws ssm describe-instance-information'. After enabling SSM the instance may take a few minutes to register."
/>

<Troubleshoot
  issue="ECS container CPU hog reports container metadata is missing"
  mode="docs"
  fallback="ECS container metadata must be enabled on the cluster for the fault to find the target container on the host. Enable container metadata in the ECS agent configuration (ECS_ENABLE_CONTAINER_METADATA=true) on each container instance, then restart the agent. Existing tasks may need to be restarted to populate the metadata directory."
/>

<Troubleshoot
  issue="CPU utilization rises but the application keeps serving traffic normally"
  mode="docs"
  fallback="The most common causes are: CPU_CORES is small relative to the task's CPU allocation (raise CPU_CORES or CPU_LOAD); the load balancer routed traffic away from the stressed tasks because of failing health checks (verify with target group health); or the application is IO-bound and not CPU-bound. Pick a different fault (memory hog, IO stress) if CPU pressure is not the right signal."
/>

---

## Related faults

- [ECS container memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-memory-hog): Stress memory inside containers instead of CPU.
- [ECS container IO stress](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-io-stress): Stress filesystem IO inside containers.
- [ECS Fargate CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-fargate-cpu-hog): CPU stress for Fargate tasks (different mechanism).
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
