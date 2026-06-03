---
id: ssm-chaos-by-tag
title: SSM chaos by tag
sidebar_label: SSM Chaos by Tag
description: Run an arbitrary AWS Systems Manager document against EC2 instances selected by tag so you can inject custom chaos against a logical group of hosts.
keywords:
  - chaos engineering
  - ssm chaos by tag
  - aws fault
  - systems manager
  - custom chaos
tags:
  - chaos-engineering
  - aws-faults
  - ssm-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/aws-ssm-chaos-by-tag
  - /docs/chaos-engineering/chaos-faults/aws/aws-ssm-chaos-by-tag
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

SSM chaos by tag is an AWS chaos fault that runs an arbitrary AWS Systems Manager document against EC2 instances selected by tag. Use this fault when you need to apply custom chaos that is not covered by a dedicated EC2 fault to a logical group of instances (an environment, a service, a tier).

Use this fault to extend the chaos surface across a tagged fleet: run a custom shell script across a service tier, exercise a domain-specific failure on every replica of a workload, or run an AWS-managed document such as `AWS-RunShellScript` against every instance carrying a tag.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

:::warning Generic-purpose fault
SSM chaos by tag gives the chaos pod the ability to run any SSM document on every matching instance. Use a dedicated fault when one exists, and constrain blast radius with `INSTANCE_AFFECTED_PERC` and a narrow tag selector. Review the SSM document under version control before each run.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Custom in-instance chaos across a tier:** Run a shell script that fails a custom subsystem on every instance tagged for a specific service.
- **Filesystem corruption across replicas:** Use a custom document that truncates a specific application data file on a percentage of tagged hosts.
- **Tag-scoped one-off failures:** Validate hypotheses on a tagged fleet without authoring a new dedicated fault.
- **Blast-radius validation:** Confirm `INSTANCE_AFFECTED_PERC` keeps custom-chaos impact within the planned scope.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **SSM document available:** `DOCUMENT_NAME` is a valid SSM document in `REGION` (AWS-managed or custom). Readable by the chaos pod's IAM principal.
- **Target instances are reachable via SSM:** At least one instance carrying the tag in `EC2_INSTANCE_TAG` in `REGION` has the SSM Agent running and an instance profile with `AmazonSSMManagedInstanceCore`.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EC2 (Linux or Windows instances with SSM Agent) | Supported |
| Amazon EKS managed worker nodes | Supported (if SSM Agent is installed) |
| Amazon EKS self-managed worker nodes | Supported (if SSM Agent is installed) |
| Custom SSM documents | Supported |
| AWS-managed SSM documents | Supported |

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
| `EC2_INSTANCE_TAG` | Tag selector in `key:value` format (for example `app:frontend`). | (required) |
| `REGION` | AWS region that hosts the target instances. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DOCUMENT_NAME` | Name of the SSM document to run. | `""` |
| `PLUGIN_NAME` | Name of the plugin inside the document to execute. | `""` |
| `PARAMETERS` | JSON-encoded parameters passed to the SSM document. | `""` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances to target. `0` targets one instance. | `0` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `CHAOS_INTERVAL` | Delay between successive runs of the document (in seconds). | `60` |
| `DEFAULT_HEALTH_CHECK` | When `true`, the fault performs default health checks against the targeted instances. | `false` |
| `SEQUENCE` | Order in which multiple instances are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::warning Tag selector + INSTANCE_AFFECTED_PERC defines your blast radius
The combination of `EC2_INSTANCE_TAG` and `INSTANCE_AFFECTED_PERC` decides how many instances the document runs on. Start with a narrow tag and a low percentage when piloting a new document.
:::

---

## Fault execution in brief

Resolves the tag in `EC2_INSTANCE_TAG` to a list of instance IDs in `REGION`, calls `SendCommand` on `DOCUMENT_NAME` (with `PLUGIN_NAME` and `PARAMETERS`) for the chosen percentage (`INSTANCE_AFFECTED_PERC`), and polls `GetCommandInvocation` until each command completes or `TOTAL_CHAOS_DURATION` is reached.

---

## Expected behavior during fault execution

- AWS sends the document to each selected instance via the SSM control channel.
- The SSM Agent on each instance runs the document with the specified plugin and parameters.
- The chaos pod polls `GetCommandInvocation` for each instance until the command exits or `TOTAL_CHAOS_DURATION` is reached.
- The exact effect on each instance depends entirely on the document.

:::info When the fault ends
The chaos pod stops polling. Side effects of the document persist unless the document cleans them up itself.
:::

### Signals to watch

The signals depend on the document. Typically:

- **Command status per instance:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that lists in-flight `SendCommand` invocations matching the experiment's command ID.
- **Tag-scoped application metrics:** Use Prometheus probes filtered to the tagged instances to confirm the impact stays within scope.

---

## Verify the fault execution effect

While the experiment is running:

1. **List the tagged instances and confirm the fault matched the expected set.**

   ```bash
   aws ec2 describe-instances \
     --region <region> \
     --filters "Name=tag:<key>,Values=<value>" \
     --query "Reservations[].Instances[].[InstanceId]"
   ```

2. **List in-flight SSM commands across those instances.**

   ```bash
   aws ssm list-commands \
     --region <region> \
     --filters "key=Status,value=InProgress" \
     --query "Commands[].[CommandId,DocumentName,Status]"
   ```

3. **Read a result for one instance after completion.**

   ```bash
   aws ssm get-command-invocation \
     --region <region> \
     --command-id <command-id> \
     --instance-id <instance-id>
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops polling and exits.
- **Abort the experiment:** Stopping the experiment from Chaos Studio calls `CancelCommand` for in-flight invocations on every targeted instance.
- **Manual recovery:** Side effects on each instance are not automatically reverted. Either author the document to clean up on exit, or run a follow-up document that reverts the changes.

---

## Limitations

- **Document fidelity:** The fault is only as predictable as the document. Untested documents may have unintended effects multiplied across the fleet.
- **No automatic rollback:** Side effects persist after the fault ends unless the document includes cleanup.
- **SSM Agent required:** Instances without the SSM Agent online are skipped silently.
- **Tag must resolve to at least one reachable instance:** If `EC2_INSTANCE_TAG` matches nothing in `REGION`, the fault fails fast.
- **Per-instance timeouts:** Long-running documents may exceed `TOTAL_CHAOS_DURATION` and be cancelled before they complete on some instances but succeed on others.

---

## Troubleshooting

<Troubleshoot
  issue="SSM chaos by tag selects zero instances"
  mode="docs"
  fallback="The most common causes are: EC2_INSTANCE_TAG is misformatted (correct form is key:value); the tag has a typo; the tag exists in a different region than REGION; or no matching instances have the SSM Agent online. Verify with aws ec2 describe-instances --filters 'Name=tag:<key>,Values=<value>', then aws ssm describe-instance-information to confirm SSM reachability."
/>

<Troubleshoot
  issue="SSM chaos by tag ran the document on more instances than expected"
  mode="docs"
  fallback="INSTANCE_AFFECTED_PERC was higher than intended, or the tag selector matched more instances than expected. List the matched instances with aws ec2 describe-instances --filters 'Name=tag:<key>,Values=<value>' before re-running. Reduce INSTANCE_AFFECTED_PERC and narrow the tag to constrain blast radius."
/>

<Troubleshoot
  issue="SSM chaos by tag succeeded on some instances and timed out on others"
  mode="docs"
  fallback="The document took longer than TOTAL_CHAOS_DURATION on some hosts (heterogeneous load, slow disks, etc.). Increase TOTAL_CHAOS_DURATION, or restructure the document to short-circuit when it sees pre-existing chaos already in place. To force serial execution and observe per-host behaviour, set SEQUENCE=serial."
/>

---

## Related faults

- [SSM chaos by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ssm-chaos-by-id): Run an SSM document against a specific instance by ID.
- [EC2 process kill](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-process-kill): Use a dedicated process-kill fault instead of a custom document.
- [EC2 stop by tag](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-tag): Stop tagged instances entirely instead of running a custom document on them.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
