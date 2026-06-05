---
id: windows-ec2-process-kill
title: Windows EC2 process kill
sidebar_label: Windows EC2 Process Kill
description: Kill one or more processes (selected by PID or process name) on one or more Windows EC2 instances (selected by ID or tag) for a configurable duration so you can test how Windows-hosted workloads behave when their backing processes die.
keywords:
  - chaos engineering
  - windows ec2 process kill
  - aws fault
  - ec2 fault
  - windows chaos
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/windows-ec2-process-kill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows EC2 process kill is an AWS chaos fault that kills one or more processes (selected by `PROCESS_IDS` PIDs or `PROCESS_NAMES` names, optionally with `FORCE=enable` for an immediate hard kill) on one or more Windows EC2 instances for a configurable duration. The fault repeatedly kills matching processes during `TOTAL_CHAOS_DURATION` so that respawns are also targeted; at the end of the fault, killing stops and the host's service manager (or supervisor) is left to restore the process as it normally would.

Use this fault to test how a Windows-hosted workload behaves when its backing process dies: whether the service auto-restarts cleanly (Windows service recovery), whether dependent processes detect and respond to the loss, and whether monitoring detects the process disappearance quickly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Service recovery:** When a Windows service is killed, does Service Control Manager restart it within the configured recovery delay?
- **Watchdog behaviour:** Does a custom watchdog or supervisor (NSSM, FireDaemon, custom) respawn the process?
- **Cluster failover:** For clustered Windows applications (SQL Server AlwaysOn, MSCS), does a peer take over correctly when the local process dies?
- **Monitoring SLA:** Does the process-down alert fire within the SLA, and does the runbook accurately describe the recovery?
- **Multi-process coordination:** For applications composed of multiple processes that share state via named pipes or shared memory, do peers detect and recover from the loss?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Windows EC2 instances:** Each instance is in the `running` state and registered with AWS Systems Manager.
- **Selection criteria:** Either `EC2_INSTANCE_ID` is set or `EC2_INSTANCE_TAG` is set.
- **Process selection:** Either `PROCESS_IDS` or `PROCESS_NAMES` is set; if both are empty, the fault has nothing to kill.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server 2016 / 2019 / 2022 EC2 | Supported |
| Linux EC2 instances | Not supported (use [EC2 process kill](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-process-kill)) |
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

Configure the following fault parameters when you add Windows EC2 process kill to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REGION` | AWS region that hosts the target instances (for example `us-east-1`). | (required) |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances (by tag) to affect. `0` corresponds to one instance. | `0` |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `EC2_INSTANCE_ID` | Comma-separated list of EC2 instance IDs to affect. | `""` |
| `EC2_INSTANCE_TAG` | Tag in `Key:Value` form matching candidate instances when `EC2_INSTANCE_ID` is empty. | `""` |
| `PROCESS_IDS` | Comma-separated list of process IDs (PIDs) to kill on each target host. | `""` |
| `PROCESS_NAMES` | Comma-separated list of process executable names (for example `w3wp.exe`, `sqlservr`) to kill on each target host. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FORCE` | `enable` to kill processes immediately (equivalent to `Stop-Process -Force`); `disable` to signal termination and allow graceful shutdown. | `disable` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The fault re-issues the kill command periodically so that respawned processes are killed too. | `60` |
| `INSTALL_DEPENDENCIES` | Install supporting tooling on the Windows host if missing. | `true` |
| `SEQUENCE` | Order in which multiple instances are affected: `parallel` kills on all selected instances at once; `serial` does so one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Resolves the target instance list from `EC2_INSTANCE_ID` (or by `EC2_INSTANCE_TAG`), dispatches a PowerShell kill command via AWS Systems Manager Run Command to each selected Windows instance for the processes named in `PROCESS_IDS` and `PROCESS_NAMES`, and continues killing matching processes for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Matching processes terminate immediately (or after `Stop-Process` signals when `FORCE=disable`).
- Windows services configured for automatic restart re-launch; custom supervisors respawn the process. The fault kills the respawned processes too.
- Dependent processes that maintain pipes, sockets, or shared memory with the killed process see disconnects.
- CloudWatch process metrics (if collected by the CW Agent) show the gap.

:::info When the fault ends
The chaos pod stops killing processes. Service Control Manager (or your supervisor) is allowed to restore the process and keep it running; no further intervention is needed unless the application requires manual recovery.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Process presence:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `Get-Process -Name <name>` and asserts the absence (during the fault) and presence (after recovery).
- **Service status:** Use a command probe that runs `Get-Service -Name <name>` and asserts on `Status`.
- **Application errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application or dependent-service error counters.
- **Cluster failover:** For clustered workloads, monitor cluster role ownership.

---

## Verify the fault execution effect

While the experiment is running, confirm the process is killed and recovers:

1. **Check process presence from the host (via SSM Session Manager).**

   ```powershell
   Get-Process -Name <process-name> -ErrorAction SilentlyContinue
   ```

   During the fault the command should return nothing (or transient entries from respawn attempts). After recovery the process should be back.

2. **Check Windows service state.**

   ```powershell
   Get-Service -Name <service-name>
   ```

   For a service backing the killed process, `Status` should oscillate between `Running` and `Stopped` during the fault.

3. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations --region <region> --details --filters "key=Status,value=InProgress"
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops killing processes; the host's service manager restores the process.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command.
- **Manual recovery:** If a critical process does not auto-recover (no Windows service, no supervisor), start it manually with `Start-Service` or by launching the executable.
- **Workload recovery:** Long-lived connections that depended on the killed process are not re-established by this fault; clients must reconnect.

---

## Limitations

- **Windows-only.**
- **SSM-managed hosts only.**
- **Auto-restart dependency:** The fault does not restart the process; it relies on the host's service manager or supervisor. Processes without an auto-restart configuration stay dead.
- **No protection against kernel processes:** Killing critical Windows system processes (`csrss.exe`, `wininit.exe`) will likely BSOD the instance.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Windows EC2 process kill fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:DescribeInstances, ssm:SendCommand, ssm:GetCommandInvocation, and the ec2messages:* actions used by SSM."
/>

<Troubleshoot
  issue="Process keeps running despite the kill command"
  mode="docs"
  fallback="The most common causes are: the process is protected by Windows (such as a critical system process); the supervisor respawns it faster than the kill cadence (set FORCE=enable for an immediate hard kill); or PROCESS_NAMES does not match the process executable name (Get-Process is case-insensitive but expects the bare name without .exe). Verify the exact process name with 'Get-Process | Select Name, Id' on the host."
/>

<Troubleshoot
  issue="Instance BSOD or becomes unresponsive after the chaos window"
  mode="docs"
  fallback="The most common cause is killing a Windows system process or a critical driver. Avoid PROCESS_NAMES like 'csrss', 'wininit', 'lsass', 'services'. Use a Windows test instance, list the safe-to-kill processes explicitly in PROCESS_NAMES (for example w3wp.exe for IIS application pools), and validate the experiment scope before running in production."
/>

<Troubleshoot
  issue="Service does not auto-restart after the chaos window"
  mode="docs"
  fallback="Windows services restart on failure only if the recovery options are configured. In Services.msc (or via 'sc.exe failure'), set the first/second/third failures to 'Restart the Service' on the affected service. Without recovery configured, the service stays Stopped after this fault ends."
/>

---

## Related faults

- [Windows EC2 CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-cpu-hog): Stress CPU on Windows instances without killing processes.
- [Windows EC2 memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-memory-hog): Stress memory on Windows instances.
- [EC2 process kill](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-process-kill): Kill processes on Linux EC2 instances.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
