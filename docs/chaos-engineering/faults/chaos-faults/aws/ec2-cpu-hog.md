---
id: ec2-cpu-hog
title: EC2 CPU hog
sidebar_label: EC2 CPU Hog
description: Stress a configurable number of CPU cores inside a target EC2 instance via AWS Systems Manager so you can test how the workload behaves when the host is starved of CPU.
keywords:
  - chaos engineering
  - ec2 cpu hog
  - aws fault
  - cpu stress
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-cpu-hog
  - /docs/chaos-engineering/chaos-faults/aws/ec2-cpu-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 CPU hog is an AWS chaos fault that drives a configurable number of CPU cores to a configurable load percentage inside a target EC2 instance for a configurable duration. The fault dispatches the stress workload via AWS Systems Manager Run Command, so the target instance must have the SSM Agent installed and an IAM role that permits SSM messages.

Use this fault to test how a workload reacts when its host is CPU-starved: does autoscaling react, do latency-sensitive paths break SLO, does the load balancer detach the instance because of failing health checks?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Latency under CPU pressure:** When all cores are saturated, does p99 latency stay within SLO?
- **Autoscaling triggers:** Do CloudWatch CPU alarms fire and does the ASG add capacity in the expected window?
- **Health-check correctness:** Does the target group detach the saturated instance, and does it reattach when the fault ends?
- **Co-tenant workloads:** When one workload monopolizes CPU, do neighbouring workloads still meet their SLOs?
- **Burst-credit exhaustion (T-family):** For burstable instance types (`t3`, `t4g`), does sustained 100% CPU exhaust burst credits and degrade further?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target instance is reachable via SSM:** The instance has the SSM Agent running and an instance profile with `AmazonSSMManagedInstanceCore` (or equivalent). Confirm with `aws ssm describe-instance-information --filters "Key=InstanceIds,Values=<id>"`.
- **Selector provided:** Either `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` is set.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the SSM and EC2 permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EC2 (Linux instances with SSM Agent) | Supported |
| Amazon EKS managed worker nodes | Supported (if SSM Agent is installed) |
| Amazon EKS self-managed worker nodes | Supported (if SSM Agent is installed) |
| Targeting by tag | Supported via `EC2_INSTANCE_TAG` |
| Targeting by ID | Supported via `EC2_INSTANCE_ID` |
| Burstable instance types (T family) | Supported (be aware of credit exhaustion; see Limitations) |
| Windows instances | Not supported (Linux-only stress payload) |

---

## Permissions required

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceStatus"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ssm:SendCommand",
        "ssm:CancelCommand",
        "ssm:GetCommandInvocation",
        "ssm:DescribeInstanceInformation",
        "ssm:GetDocument",
        "ssm:DescribeDocument"
      ],
      "Resource": "*"
    }
  ]
}
```

Go to [common policy for all AWS faults](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to use a single superset IAM policy.

---

## Authentication

The fault supports three credential delivery models. Pick one based on how your chaos infrastructure is deployed.

| Method | When to use it | How to configure |
| --- | --- | --- |
| Harness Secret Manager file secret | Chaos infrastructure runs outside EKS, or you want explicit static credentials | Upload the AWS credentials file as a **File Secret** in Harness Secret Manager and reference its identifier via `AWS_AUTHENTICATION_SECRET` |
| IAM Roles for Service Accounts (IRSA) | Chaos infrastructure runs in EKS and uses an OIDC-bound service account | No tunable changes; the chaos pod inherits the role automatically. Go to [AWS IAM integration](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-iam-integration) to set it up |
| Assume role | The fault needs to act in a different account or with elevated permissions | Set `ASSUME_ROLE_ARN` to the role ARN; the chaos pod assumes the role on top of its base credentials |

When using the Harness Secret Manager method, the File Secret should contain an AWS credentials file in the standard `~/.aws/credentials` format:

```ini
[default]
aws_access_key_id = REPLACE_WITH_ACCESS_KEY_ID
aws_secret_access_key = REPLACE_WITH_SECRET_ACCESS_KEY
```

Upload this file as a **File Secret** in Harness Secret Manager (Project Setup → Secrets → New File Secret), and pass the secret identifier in `AWS_AUTHENTICATION_SECRET`.

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REGION` | AWS region that hosts the target instance. | (required) |
| `EC2_INSTANCE_ID` *or* `EC2_INSTANCE_TAG` | One of these must be set to select the target instance(s). | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CPU_CORES` | Number of CPU cores to hog. `0` hogs all available cores. | `0` |
| `CPU_LOAD` | Percentage of CPU load to generate per core (0-100). | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances to target (only with `EC2_INSTANCE_TAG`). `0` targets one instance. | `0` |
| `INSTALL_DEPENDENCIES` | Install the in-instance stress tool if missing. Set to `False` to skip. | `True` |
| `PROXY` | HTTP/HTTPS proxy used by the in-instance installer (for example `https_proxy=http://proxy.server:3128`). | `""` |
| `SEQUENCE` | Order in which multiple instances are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::tip Tune CPU_CORES to your blast radius
Setting `CPU_CORES=0` (all cores) is the most severe option. For a softer test, set `CPU_CORES` to half of the instance's vCPU count and observe whether the workload starts to degrade before saturation.
:::

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that spawns a CPU-stress workload pinned to `CPU_CORES` cores at `CPU_LOAD` percent each for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Per-core CPU utilization on the target instance climbs to `CPU_LOAD` percent across `CPU_CORES` cores.
- CloudWatch `CPUUtilization` rises to the corresponding fraction of overall capacity.
- Latency-sensitive workloads typically see p99 latency spike; CPU-bound throughput drops.
- For burstable instance types, CPU credits drain rapidly; once exhausted, baseline performance degrades further.
- Load balancer health checks may begin to fail if they share CPU with the workload.

:::info When the fault ends
The chaos pod terminates the stress workload. CPU utilization returns to baseline within seconds; burst credits replenish according to the instance's credit accrual rate.
:::

### Signals to watch

- **CPU utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ec2_cpuutilization_average` (CloudWatch exporter) to confirm the spike.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to detect latency regression.
- **Burst credits:** For T-family instances, watch `aws_ec2_cpucredit_balance_minimum` to confirm credit exhaustion.

---

## Verify the fault execution effect

While the experiment is running:

1. **Check CPU on the instance via SSM.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["top -bn1 | head -20"]'
   ```

2. **Confirm CloudWatch metric spike.**

   ```bash
   aws cloudwatch get-metric-statistics \
     --namespace AWS/EC2 --metric-name CPUUtilization \
     --dimensions Name=InstanceId,Value=<id> \
     --start-time $(date -u -v-5M +%FT%TZ) --end-time $(date -u +%FT%TZ) \
     --period 60 --statistics Average
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod terminates the stress workload.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the in-flight SSM command.
- **Manual recovery:** If the stress workload outlives the experiment (rare), kill it via SSM: `pkill -f stress` or `pkill -f <stress-binary>`.

---

## Limitations

- **Linux-only payload:** This fault stresses Linux instances. For Windows hosts, use `windows-ec2-cpu-hog`.
- **SSM Agent required:** Instances without the SSM Agent online cannot be targeted.
- **Burst-credit consumption:** On T-family instances, credits are consumed by the fault and may not be fully replenished by the time the next experiment runs. Allow recovery time between runs.
- **Workload eviction:** On EKS nodes, severe CPU pressure may cause kubelet to evict pods. Use `INSTANCE_AFFECTED_PERC` and `CPU_CORES` carefully on production-like clusters.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 CPU hog experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If the instance is missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 CPU hog runs but CPUUtilization metric stays flat"
  mode="docs"
  fallback="The most common causes are: the in-instance stress tool failed to install (set INSTALL_DEPENDENCIES=True and verify network egress from the instance, or use PROXY); CPU_CORES is greater than the instance vCPU count; or CloudWatch metric resolution is coarse and is averaging out the spike. Run 'top' via SSM during the fault to confirm load locally before relying on CloudWatch."
/>

<Troubleshoot
  issue="EC2 CPU hog fails with AccessDeniedException calling ssm:SendCommand"
  mode="docs"
  fallback="The chaos pod's IAM principal lacks ssm:SendCommand or related SSM permissions. Add ssm:SendCommand, ssm:GetCommandInvocation, ssm:DescribeInstanceInformation, ssm:CancelCommand, ssm:GetDocument, and ssm:DescribeDocument to the policy. If using ASSUME_ROLE_ARN, confirm the trust policy allows the source identity."
/>

---

## Related faults

- [EC2 memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-memory-hog): Stress memory instead of CPU.
- [EC2 IO stress](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-io-stress): Stress filesystem IO instead of CPU.
- [EC2 process kill](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-process-kill): Kill a specific process instead of saturating CPU.
- [Windows EC2 CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-cpu-hog): CPU stress for Windows instances.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
