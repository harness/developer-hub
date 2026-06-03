---
id: ssm-chaos-by-id
title: SSM chaos by ID
sidebar_label: SSM Chaos by ID
description: Run an arbitrary AWS Systems Manager document against a target EC2 instance selected by ID so you can inject custom chaos that is not covered by a dedicated fault.
keywords:
  - chaos engineering
  - ssm chaos by id
  - aws fault
  - systems manager
  - custom chaos
tags:
  - chaos-engineering
  - aws-faults
  - ssm-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/aws-ssm-chaos-by-id
  - /docs/chaos-engineering/chaos-faults/aws/aws-ssm-chaos-by-id
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

SSM chaos by ID is an AWS chaos fault that runs an arbitrary AWS Systems Manager document against a target EC2 instance selected by instance ID. Use this fault when you need to inject custom chaos that is not covered by a dedicated EC2 fault, by providing your own SSM document (`DOCUMENT_NAME`), plugin name (`PLUGIN_NAME`), and parameters (`PARAMETERS`).

Use this fault to extend the chaos surface area: run a custom shell script for a fault not yet built natively, exercise a domain-specific failure (filesystem corruption, kernel panic), or run a pre-approved AWS-managed document such as `AWS-RunShellScript` against a specific instance.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

:::warning Generic-purpose fault
SSM chaos by ID gives the chaos pod the ability to run any SSM document on a target instance. Use a dedicated fault (`ec2-cpu-hog`, `ec2-network-latency`, etc.) when one exists. Reserve this fault for genuinely custom scenarios and review the SSM document under version control before each run.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Custom in-instance chaos:** Run a shell script (`AWS-RunShellScript` or a custom document) that fails a custom subsystem not covered by another fault.
- **Filesystem corruption:** Use a custom document that truncates or corrupts a specific application data file.
- **Kernel-level chaos:** Trigger kernel panic or specific syscall failures via a custom document.
- **One-off pre-prod failures:** Use a one-shot SSM document to validate a hypothesis without authoring a new dedicated fault.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **SSM document available:** `DOCUMENT_NAME` is a valid SSM document name in `REGION` (AWS-managed like `AWS-RunShellScript`, or a custom document you authored). The document must be readable by the chaos pod's IAM principal.
- **Target instance is reachable via SSM:** The instance has the SSM Agent running and an instance profile with `AmazonSSMManagedInstanceCore`.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EC2 (Linux or Windows instances with SSM Agent) | Supported |
| Amazon EKS managed worker nodes | Supported (if SSM Agent is installed) |
| Amazon EKS self-managed worker nodes | Supported (if SSM Agent is installed) |
| Custom SSM documents | Supported |
| AWS-managed SSM documents | Supported (for example `AWS-RunShellScript`, `AWS-RunPowerShellScript`) |

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

- `ssm:GetDocument` and `ssm:DescribeDocument` resolve `DOCUMENT_NAME`.
- `ssm:SendCommand` and `ssm:GetCommandInvocation` send the command and read the result.
- `ssm:CancelCommand` is used to roll back if the experiment is aborted.
- `ssm:DescribeInstanceInformation` confirms the SSM Agent is online before the fault starts.

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
| `EC2_INSTANCE_ID` | ID of the target EC2 instance (or a comma-separated list of IDs). | (required) |
| `REGION` | AWS region that hosts the target instance. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DOCUMENT_NAME` | Name of the SSM document to run (for example `AWS-RunShellScript` or a custom document). | `""` |
| `PLUGIN_NAME` | Name of the plugin inside the document to execute. Required when the document defines multiple plugins. | `""` |
| `PARAMETERS` | JSON-encoded parameters passed to the SSM document. The format depends on the document's parameter schema. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The chaos pod waits this long for the command to complete. | `60` |
| `CHAOS_INTERVAL` | Delay between successive runs of the document (in seconds). | `60` |
| `SEQUENCE` | Order in which multiple instances are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::tip Store custom documents in source control
Custom SSM documents executed via this fault should live in source control (CloudFormation, Terraform, or your IaC of choice). This makes the chaos surface auditable and lets reviewers trace exactly what runs on the target instance.
:::

---

## Fault execution in brief

Calls `SendCommand` on `DOCUMENT_NAME` (with `PLUGIN_NAME` and `PARAMETERS`) against `EC2_INSTANCE_ID` in `REGION`, waits up to `TOTAL_CHAOS_DURATION` seconds for the command to complete, and reads the result with `GetCommandInvocation`.

---

## Expected behavior during fault execution

- AWS sends the document to the target instance via the SSM control channel.
- The SSM Agent on the instance runs the document with the specified plugin and parameters.
- The chaos pod polls `GetCommandInvocation` until the command exits or `TOTAL_CHAOS_DURATION` is reached.
- The exact effect on the instance depends entirely on the document and parameters supplied.

:::info When the fault ends
The chaos pod stops polling. Any side effects of the SSM document (files created, processes spawned, configurations changed) persist unless the document itself cleans them up.
:::

### Signals to watch

The signals depend on the document. For shell-based chaos (`AWS-RunShellScript`), useful signals include:

- **Command status:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ssm get-command-invocation --command-id <id> --instance-id <id>` to read the exit code and stdout/stderr.
- **Application-side metrics:** Use Prometheus probes appropriate to whatever the document is exercising.

---

## Verify the fault execution effect

While the experiment is running:

1. **List in-flight SSM commands on the instance.**

   ```bash
   aws ssm list-command-invocations \
     --region <region> \
     --instance-id <id> \
     --details \
     --query "CommandInvocations[?Status=='InProgress'].[CommandId,DocumentName,Status]"
   ```

2. **Read the result after the command finishes.**

   ```bash
   aws ssm get-command-invocation \
     --region <region> \
     --command-id <command-id> \
     --instance-id <id>
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops polling and exits.
- **Abort the experiment:** Stopping the experiment from Chaos Studio calls `CancelCommand` to abort the in-flight SSM command.
- **Manual recovery:** Side effects of the document (files, processes, configuration changes) are not automatically reverted. Either author the document to clean up on exit, or run a follow-up document that reverts the changes.

---

## Limitations

- **Document fidelity:** The fault is only as predictable as the document. Untested documents may have unintended effects.
- **No automatic rollback:** Side effects persist after the fault ends unless the document includes cleanup.
- **SSM Agent required:** Instances without the SSM Agent online cannot be targeted.
- **Single document per fault:** One fault runs one document. Chain experiments to run multiple documents.
- **Timeouts:** Long-running documents may exceed `TOTAL_CHAOS_DURATION` and be cancelled before they complete.

---

## Troubleshooting

<Troubleshoot
  issue="SSM chaos by ID experiment fails with InvalidDocument"
  mode="docs"
  fallback="The DOCUMENT_NAME you supplied does not exist in REGION, or the chaos pod's IAM principal lacks ssm:GetDocument permission for it. Confirm with aws ssm describe-document --name <name> --region <region>. For custom documents, ensure they were created in REGION and the IAM principal has access."
/>

<Troubleshoot
  issue="SSM chaos by ID experiment fails with InvocationDoesNotExist"
  mode="docs"
  fallback="The SSM Agent on the target instance is not online, or the instance does not have an instance profile with AmazonSSMManagedInstanceCore. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="SSM chaos by ID times out before the document completes"
  mode="docs"
  fallback="TOTAL_CHAOS_DURATION is shorter than the document's runtime. Increase TOTAL_CHAOS_DURATION, or restructure the document into smaller steps. For documents that intentionally run long (a long-running stress test), set TOTAL_CHAOS_DURATION larger than the longest expected runtime plus buffer."
/>

---

## Related faults

- [SSM chaos by tag](/docs/chaos-engineering/faults/chaos-faults/aws/ssm-chaos-by-tag): Run an SSM document against instances selected by tag.
- [EC2 process kill](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-process-kill): Use a dedicated process-kill fault instead of a custom document.
- [EC2 CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-cpu-hog): Use a dedicated CPU stress fault instead of a custom document.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
