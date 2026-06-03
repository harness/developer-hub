---
id: ec2-memory-hog
title: EC2 memory hog
sidebar_label: EC2 Memory Hog
description: Consume a configurable amount of memory inside a target EC2 instance via AWS Systems Manager so you can test how the workload behaves when the host is starved of memory.
keywords:
  - chaos engineering
  - ec2 memory hog
  - aws fault
  - memory stress
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-memory-hog
  - /docs/chaos-engineering/chaos-faults/aws/ec2-memory-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 memory hog is an AWS chaos fault that consumes a configurable amount of memory (in MB or as a percentage of total) inside a target EC2 instance for a configurable duration. The fault dispatches the stress workload via AWS Systems Manager Run Command, so the target instance must have the SSM Agent installed and an IAM role that permits SSM messages.

Use this fault to test how a workload reacts when its host runs out of memory: do OOM kills land on the right processes, do JVM heap sizes hit hard limits, does autoscaling provision replacement capacity in time?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **OOM-killer behaviour:** When the host is starved of memory, does the OOM-killer pick the right victim, or does it kill the application instead of a noisy neighbour?
- **JVM heap pressure:** Does a Java application surface `OutOfMemoryError` cleanly, or does it freeze in GC?
- **Container memory limits:** For containerized workloads, do cgroup memory limits trigger pod restarts as expected?
- **Autoscaling on memory:** Do CloudWatch memory alarms (custom metric or CloudWatch Agent) trigger ASG scale-out in time?
- **Co-tenant isolation:** When one workload consumes excess memory, do neighbouring workloads stay healthy?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target instance is reachable via SSM:** The instance has the SSM Agent running and an instance profile with `AmazonSSMManagedInstanceCore`.
- **Selector provided:** Either `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` is set.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EC2 (Linux instances with SSM Agent) | Supported |
| Amazon EKS managed worker nodes | Supported (if SSM Agent is installed) |
| Amazon EKS self-managed worker nodes | Supported (if SSM Agent is installed) |
| Targeting by tag | Supported via `EC2_INSTANCE_TAG` |
| Targeting by ID | Supported via `EC2_INSTANCE_ID` |
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
| `MEMORY_CONSUMPTION` | Memory to consume in MB. Mutually exclusive with `MEMORY_PERCENTAGE`. | `100` |
| `MEMORY_PERCENTAGE` | Percentage of total memory to consume (1-100). When set, overrides `MEMORY_CONSUMPTION`. | `""` |
| `NUMBER_OF_WORKERS` | Number of worker threads to spawn for memory stress. | `1` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances to target (only with `EC2_INSTANCE_TAG`). `0` targets one instance. | `0` |
| `INSTALL_DEPENDENCIES` | Install the in-instance stress tool if missing. Set to `False` to skip. | `True` |
| `PROXY` | HTTP/HTTPS proxy used by the in-instance installer (for example `https_proxy=http://proxy.server:3128`). | `""` |
| `SEQUENCE` | Order in which multiple instances are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::tip Choose MEMORY_PERCENTAGE or MEMORY_CONSUMPTION
Use `MEMORY_PERCENTAGE` for instance-size-independent testing (for example "consume 80% of memory regardless of host size"). Use `MEMORY_CONSUMPTION` when you need an absolute MB target to hit a known OOM threshold.
:::

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that allocates the requested memory (`MEMORY_CONSUMPTION` MB or `MEMORY_PERCENTAGE` of total) across `NUMBER_OF_WORKERS` worker threads for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Memory utilization on the target instance rises to the requested level.
- If the requested allocation exceeds available memory, the OOM-killer activates and terminates the highest-scoring victim process (typically the stress workload itself, but possibly the application if the application has a higher OOM score).
- Swap usage rises if swap is configured; otherwise allocations fail with `ENOMEM`.
- Application latency typically rises due to memory pressure on the page cache.

:::info When the fault ends
The chaos pod terminates the stress workload. Memory is released back to the kernel within seconds. Pages evicted from the page cache during the fault are repopulated lazily as the workload accesses them.
:::

### Signals to watch

- **Memory utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the CloudWatch Agent's `mem_used_percent` metric (CloudWatch does not expose memory by default).
- **OOM events:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that greps `dmesg` for `Killed process` lines.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to detect downtime if the application is OOM-killed.

---

## Verify the fault execution effect

While the experiment is running:

1. **Check memory via SSM.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["free -h && cat /proc/meminfo | head -10"]'
   ```

2. **Check for OOM-killer events.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["dmesg -T | grep -i \"killed process\" | tail -5"]'
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod terminates the stress workload; memory is released to the kernel.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the in-flight SSM command.
- **Manual recovery:** If the stress workload outlives the experiment, kill it via SSM: `pkill -f stress` or `pkill -f <stress-binary>`.
- **Application restart:** If the application was OOM-killed during the fault, restart it via your normal restart workflow (systemd, kubelet, supervisor).

---

## Limitations

- **Linux-only payload:** This fault stresses Linux instances. For Windows hosts, use `windows-ec2-memory-hog`.
- **SSM Agent required:** Instances without the SSM Agent online cannot be targeted.
- **OOM victim is not deterministic:** The OOM-killer scores victims based on `oom_score`, which depends on process size and `oom_score_adj`. The stress workload usually scores highest, but a misconfigured application can also be killed.
- **Swap interactions:** If the instance has swap configured, the OOM threshold is delayed and the fault may appear "soft" until swap fills.
- **CloudWatch memory metric:** AWS does not expose memory utilization by default. Install the CloudWatch Agent on the target instance to track memory metrics for probes.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 memory hog experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If the instance is missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 memory hog runs but no memory pressure is visible"
  mode="docs"
  fallback="The most common causes are: the in-instance stress tool failed to install (set INSTALL_DEPENDENCIES=True and check network egress from the instance, or use PROXY); MEMORY_CONSUMPTION is far below available memory; or you are reading default CloudWatch metrics which do not include memory. Install the CloudWatch Agent on the instance to expose mem_used_percent, or run 'free -h' via SSM during the fault."
/>

<Troubleshoot
  issue="EC2 memory hog killed the application instead of the stress workload"
  mode="docs"
  fallback="The OOM-killer chose your application because it scored highest on oom_score. Set the application's oom_score_adj to a negative value (for example -500) via systemd's OOMScoreAdjust, or run it under a cgroup with a memory.high limit lower than the host. Re-run with a smaller MEMORY_CONSUMPTION first to confirm the fix."
/>

---

## Related faults

- [EC2 CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-cpu-hog): Stress CPU instead of memory.
- [EC2 IO stress](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-io-stress): Stress filesystem IO instead of memory.
- [Windows EC2 memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-memory-hog): Memory stress for Windows instances.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
