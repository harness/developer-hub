---
id: ec2-process-kill
title: EC2 process kill
sidebar_label: EC2 Process Kill
description: Kill one or more processes by PID inside a target EC2 instance via AWS Systems Manager, so you can test how the workload recovers when a critical process disappears without losing the host.
keywords:
  - chaos engineering
  - ec2 process kill
  - aws fault
  - process chaos
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-process-kill
  - /docs/chaos-engineering/chaos-faults/aws/ec2-process-kill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 process kill is an AWS chaos fault that kills one or more processes identified by PID inside a target EC2 instance for a configurable duration. The host stays running; only the named processes are terminated. The fault dispatches the kill via AWS Systems Manager Run Command, so the target instance must have the SSM Agent installed and an IAM role that permits SSM messages.

Use this fault to test how the workload reacts when a critical process disappears: does a supervisor (systemd, container runtime, custom watchdog) restart it cleanly, does the application surface the failure to its callers, and how long until traffic recovers?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Supervisor recovery:** When a managed process (systemd unit, container, custom worker) is killed, does the supervisor restart it within the expected window?
- **Crash semantics vs graceful shutdown:** When you kill a process with `SIGKILL` (`FORCE=true`) instead of `SIGTERM` (`FORCE=false`), does the application recover identically, or does state corruption surface?
- **Liveness probe correctness:** For containerized workloads, do liveness probes detect the failure and trigger a restart at the correct cadence?
- **Caller-side resilience:** When the process is unavailable, do upstream callers retry, fall back, or fail gracefully?
- **Observability coverage:** Does the kill surface in logs, traces, and alerts with enough context to drive a runbook?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target instance is reachable via SSM:** The instance has the SSM Agent running and an instance profile with the `AmazonSSMManagedInstanceCore` policy (or equivalent). Confirm with `aws ssm describe-instance-information --filters "Key=InstanceIds,Values=<id>"`.
- **Selector provided:** Either `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` is set.
- **Processes identified:** `PROCESS_IDS` lists the PIDs to kill on the target instance.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the SSM and EC2 permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EC2 (Linux instances with SSM Agent) | Supported |
| Amazon EC2 (Windows instances with SSM Agent) | Supported |
| Amazon EKS managed worker nodes | Supported (if SSM Agent is installed) |
| Amazon EKS self-managed worker nodes | Supported (if SSM Agent is installed) |
| AWS regions | Supported in every commercial region |
| Targeting by tag | Supported via `EC2_INSTANCE_TAG` |
| Targeting by ID | Supported via `EC2_INSTANCE_ID` |

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

- `ec2:DescribeInstances` / `ec2:DescribeInstanceStatus` resolve the target instance and confirm reachability.
- `ssm:SendCommand` and `ssm:GetCommandInvocation` send the kill command and read its result.
- `ssm:CancelCommand` is used to roll back if the experiment is aborted mid-flight.
- `ssm:DescribeInstanceInformation` confirms the SSM Agent is online before the fault starts.

Go to [common policy for all AWS faults](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to use a single superset IAM policy across every AWS fault.

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
| `PROCESS_IDS` | Comma-separated list of PIDs to kill on the target instance (for example `1234,1235`). | (required) |
| `EC2_INSTANCE_ID` *or* `EC2_INSTANCE_TAG` | One of these must be set to select the target instance(s). | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances to target (applies only when using `EC2_INSTANCE_TAG`). `0` targets one instance. | `0` |
| `FORCE` | When `true`, kills with `SIGKILL` (force kill); when `false`, sends `SIGTERM` for graceful shutdown. | `false` |
| `INSTALL_DEPENDENCIES` | Install dependencies inside the target instance if missing. Set to `False` to skip. | `True` |
| `PROXY` | HTTP/HTTPS proxy used by the in-instance installer (for example `https_proxy=http://proxy.server:3128`). Leave empty when no proxy is needed. | `""` |
| `SEQUENCE` | Order in which multiple instances are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::tip Use FORCE deliberately
`FORCE=false` (SIGTERM) tests graceful-shutdown paths. `FORCE=true` (SIGKILL) simulates a hard crash and skips the application's shutdown hooks. Run both to validate full coverage.
:::

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that kills the PIDs listed in `PROCESS_IDS` (using `SIGKILL` when `FORCE=true`, otherwise `SIGTERM`), held for `TOTAL_CHAOS_DURATION` seconds before the experiment exits.

---

## Expected behavior during fault execution

- The named processes terminate on the target instance(s).
- If a supervisor (systemd, container runtime, custom watchdog) is responsible for the process, a replacement starts and the application recovers; if not, the process stays gone until the host is rebooted or the application is redeployed.
- Callers of the process may see connection resets, 5xx responses, or timeouts depending on what the process serves.
- Logs on the target instance typically show the kill signal received by the process.

:::info When the fault ends
The chaos pod stops issuing kill commands. Processes restarted by their supervisors continue running normally; processes without a supervisor remain dead.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Process state on the target:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `aws ssm send-command --document-name AWS-RunShellScript --parameters 'commands=["pgrep <process>"]'` to confirm the kill.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against an endpoint served by the killed process to detect downtime and measure restart time.
- **Supervisor restart events:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_systemd_unit_state{state="active"}` (or the equivalent for your supervisor) to confirm the restart.

---

## Verify the fault execution effect

While the experiment is running, confirm the processes are gone:

1. **Run a process query via SSM.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["ps -p <pid> -o pid,comm || echo missing"]'
   ```

2. **Check supervisor logs.**

   For systemd:

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["journalctl -u <service> --since \"5 minutes ago\""]'
   ```

   You should see a stop event followed by a restart.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops issuing kill commands.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels any in-flight SSM command.
- **Manual recovery:** If the killed process has no supervisor, restart it manually (`systemctl restart <service>` via SSM, `kubectl rollout restart` for a Kubernetes workload, or your platform's equivalent).

---

## Limitations

- **PID stability:** PIDs change across reboots and supervisor restarts. Capture the PID immediately before the experiment or target a long-lived process whose PID file is stable.
- **SSM Agent required:** Instances without the SSM Agent running cannot be targeted. Bake the agent into your AMI or install it via cloud-init.
- **Single command per instance:** Multiple PIDs are passed to a single kill command; if the command fails midway, some processes may have already exited and others may not.
- **No payload control:** This fault only kills processes. It does not modify their behavior or arguments. Use `ec2-cpu-hog` or `ec2-memory-hog` for resource-level chaos.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 process kill experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If the instance is missing, install the SSM Agent (it ships with Amazon Linux 2 and most official AMIs) and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 process kill experiment reports success but the process is still running"
  mode="docs"
  fallback="The most common causes are: the PID in PROCESS_IDS does not exist on the target instance; FORCE=false sent SIGTERM and the process ignored or trapped the signal; or a supervisor restarted the process instantly. Verify by running 'ps -p <pid>' via SSM during the fault, and rerun with FORCE=true to use SIGKILL if the process traps SIGTERM."
/>

<Troubleshoot
  issue="EC2 process kill experiment fails with AccessDeniedException calling ssm:SendCommand"
  mode="docs"
  fallback="The chaos pod's IAM principal lacks ssm:SendCommand or related SSM permissions. Add ssm:SendCommand, ssm:GetCommandInvocation, ssm:DescribeInstanceInformation, ssm:CancelCommand, ssm:GetDocument, and ssm:DescribeDocument to the policy. If using ASSUME_ROLE_ARN, also confirm the trust policy allows the source identity."
/>

---

## Related faults

- [EC2 stop by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-id): Stop the whole host instead of killing a single process.
- [EC2 CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-cpu-hog): Stress CPU inside the instance via SSM instead of killing a process.
- [SSM chaos by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ssm-chaos-by-id): Run any SSM document for arbitrary in-instance chaos.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
