---
id: windows-ec2-cpu-hog
title: Windows EC2 CPU hog
sidebar_label: Windows EC2 CPU Hog
description: Stress a configurable number of CPU cores at a configurable percentage on one or more Windows EC2 instances (selected by ID or tag) for a configurable duration so you can test how Windows-hosted workloads behave under sustained CPU pressure.
keywords:
  - chaos engineering
  - windows ec2 cpu hog
  - aws fault
  - ec2 fault
  - windows chaos
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/windows-ec2-cpu-hog
  - /docs/chaos-engineering/chaos-faults/aws/windows-ec2-cpu-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows EC2 CPU hog is an AWS chaos fault that stresses `CPU_CORES` cores at `CPU_PERCENTAGE` percent on one or more Windows EC2 instances for a configurable duration. Targets are selected by `EC2_INSTANCE_ID` (explicit) or by `EC2_INSTANCE_TAG` (any instance carrying the tag). The fault dispatches a PowerShell stress command via AWS Systems Manager Run Command and removes the stress at the end of the fault.

Use this fault to test how a Windows-hosted workload behaves under sustained CPU pressure: whether request latency degrades predictably, whether autoscaling alarms fire, and whether application-level circuit breakers shed load.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **CPU pressure on the workload:** When a fraction of replicas is CPU-saturated, do remaining replicas absorb the traffic without breaching latency SLOs?
- **Autoscaling:** Does the CPU-based scaling policy fire and add capacity within the expected window?
- **IIS / Windows-service behaviour:** Do IIS or Windows services running under high CPU pressure recover when the stress ends, or do they need manual intervention?
- **Noisy-neighbour isolation:** Does CPU pressure on one EC2 instance affect other tenants on the same Auto Scaling group?
- **Recovery time:** When the stress ends, how quickly does latency return to baseline?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Windows EC2 instances:** Each instance is in the `running` state and registered with AWS Systems Manager.
- **Selection criteria:** Either `EC2_INSTANCE_ID` is set (explicit list) or `EC2_INSTANCE_TAG` is set (`Key:Value` matching any tag attached to candidate instances).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server 2016 / 2019 / 2022 EC2 | Supported |
| EKS or ECS Windows worker nodes | Supported (the fault stresses the host; workload behaviour depends on the orchestrator) |
| Linux EC2 instances | Not supported (use [EC2 CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-cpu-hog)) |
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

Configure the following fault parameters when you add Windows EC2 CPU hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REGION` | AWS region that hosts the target instances (for example `us-east-1`). | (required) |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `EC2_INSTANCE_ID` | Comma-separated list of EC2 instance IDs to stress. | `""` |
| `EC2_INSTANCE_TAG` | Tag in `Key:Value` form matching candidate instances when `EC2_INSTANCE_ID` is empty. | `""` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances (by tag) to affect. `0` corresponds to one instance. | `0` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CPU_CORES` | Number of CPU cores to stress on each target. `0` stresses every available core. | `0` |
| `CPU_PERCENTAGE` | Load percentage applied per stressed core (0-100). | `50` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `INSTALL_DEPENDENCIES` | Install the stress tooling on the Windows host if missing. | `true` |
| `SEQUENCE` | Order in which multiple instances are stressed: `parallel` stresses all selected instances at once; `serial` stresses one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Resolves the target instance list from `EC2_INSTANCE_ID` (or by `EC2_INSTANCE_TAG`), dispatches a PowerShell CPU-stress command via AWS Systems Manager Run Command to each selected Windows instance, holds the load for `TOTAL_CHAOS_DURATION` seconds, then stops the stress process.

---

## Expected behavior during fault execution

- CPU utilization on the targeted Windows instances rises to approximately `CPU_PERCENTAGE` across `CPU_CORES` cores.
- Workloads running on the host (IIS sites, Windows services, ECS/EKS Windows tasks) experience CPU contention; latency and throughput degrade.
- CloudWatch `CPUUtilization` for the affected instances rises.
- CPU-based autoscaling alarms may fire.

:::info When the fault ends
The chaos pod stops the stress process on each host. CPU returns to baseline within seconds.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert percentile latency SLOs.
- **CPU utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ec2_cpuutilization` (CloudWatch exporter).
- **Autoscaling alarms:** Confirm CPU-based alarms fire.
- **Service availability:** For Windows services or IIS sites, monitor whether the service stays in the `Running` state.

---

## Verify the fault execution effect

While the experiment is running, confirm CPU pressure is applied:

1. **Check CloudWatch CPU metrics.**

   In the AWS console (CloudWatch → EC2 → Per-Instance Metrics), the target instance's `CPUUtilization` should rise during the chaos window and fall after recovery.

2. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations --region <region> --details --filters "key=Status,value=InProgress"
   ```

   During the fault, you should see in-progress commands on the affected instances.

3. **Inspect from the Windows host (via RDP or SSM Session Manager).**

   ```powershell
   Get-Counter '\Processor(_Total)\% Processor Time' -SampleInterval 1 -MaxSamples 5
   ```

   Total processor utilization should be near the configured `CPU_PERCENTAGE`.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the stress process on each host.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command.
- **Manual recovery:** If the fault exits before cleanup, kill the stress process on the host via SSM Run Command (PowerShell `Stop-Process`).
- **Workload recovery:** Most CPU-bound workloads recover automatically; long-running batch jobs may have produced incorrect or incomplete results during the stress.

---

## Limitations

- **Windows-only:** This fault uses PowerShell and Windows process tooling. For Linux, use [EC2 CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-cpu-hog).
- **SSM-managed hosts only:** Instances not registered with SSM cannot be reached.
- **CPU governor / power plans:** Some Windows power plans cap CPU below 100%; the stress may not reach the configured load.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Windows EC2 CPU hog fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:DescribeInstances, ssm:SendCommand, ssm:GetCommandInvocation, and the ec2messages:* actions used by SSM."
/>

<Troubleshoot
  issue="Windows EC2 CPU hog reports instance is not SSM-managed"
  mode="docs"
  fallback="Confirm the SSM Agent is installed and running on the Windows host (the SSMAgent service should be in Running state), the host has an instance profile with AmazonSSMManagedInstanceCore (or equivalent), and the host appears in 'aws ssm describe-instance-information' with PlatformType=Windows. Newly bootstrapped instances may take a few minutes to register."
/>

<Troubleshoot
  issue="CPU utilization does not reach the configured percentage"
  mode="docs"
  fallback="The most common causes are: the Windows power plan caps the CPU (set to High Performance for the test); CPU_CORES is smaller than the available cores so total utilization is lower than expected; or another workload is throttling the chaos process. Set CPU_CORES=0 to stress every core and verify the High Performance power plan is active."
/>

<Troubleshoot
  issue="Tags match more instances than expected"
  mode="docs"
  fallback="EC2_INSTANCE_TAG matches any instance carrying that tag in the target REGION; if the tag is broadly used, the fault may affect more than the intended set. Use a more specific tag (or use INSTANCE_AFFECTED_PERC to bound the blast radius), and verify the candidate list with 'aws ec2 describe-instances --filters Name=tag:Key,Values=Value'."
/>

---

## Related faults

- [Windows EC2 memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-memory-hog): Stress memory on Windows instances instead of CPU.
- [EC2 CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-cpu-hog): CPU stress on Linux EC2 instances.
- [Windows EC2 process kill](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-process-kill): Kill specific Windows processes on the instance.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
