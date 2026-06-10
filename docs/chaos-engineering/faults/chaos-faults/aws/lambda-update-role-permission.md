---
id: lambda-update-role-permission
title: Lambda update role permission
sidebar_label: Lambda Update Role Permission
description: Detach a specified IAM policy from the execution role attached to an AWS Lambda function for a configurable duration and reattach it afterwards so you can test how the workload behaves when the function loses permission to call a downstream AWS service.
keywords:
  - chaos engineering
  - lambda update role permission
  - aws fault
  - lambda fault
  - iam chaos
tags:
  - chaos-engineering
  - aws-faults
  - lambda-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-update-role-permission
  - /docs/chaos-engineering/chaos-faults/aws/lambda-update-role-permission
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Lambda update role permission is an AWS chaos fault that detaches the IAM policy at `POLICY_ARN` from the execution role at `ROLE_ARN` (the role attached to the target Lambda function `FUNCTION_NAME` in `REGION`) for `TOTAL_CHAOS_DURATION` seconds, then reattaches it. While the policy is detached, any function code that depends on the permissions in `POLICY_ARN` (for example, access to RDS, DynamoDB, S3, SQS, Secrets Manager) fails with `AccessDeniedException` at runtime.

Use this fault to test how a Lambda workload behaves when it loses permission to call a downstream AWS service: whether the function fails fast with a clear error, whether monitoring detects the elevated error rate, and whether downstream consumers degrade gracefully under permission failures.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Permission outage:** When `POLICY_ARN` is detached, does the function fail fast with `AccessDeniedException` or hang until the function timeout?
- **Function timeout exposure:** Does the function timeout protect against permission-blocked dependencies, or does it amplify cost and consumer latency?
- **Downstream impact:** Do API Gateway / EventBridge / Step Functions callers degrade gracefully when the function starts failing?
- **Monitoring fidelity:** Do CloudWatch alarms on Lambda `Errors` and downstream service error logs fire within the SLA?
- **Recovery:** When the policy is reattached, does the function resume normal operation without manual intervention?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Lambda function:** `FUNCTION_NAME` exists in `REGION` and is in the `Active` state.
- **Role and policy match:** `POLICY_ARN` is currently attached to `ROLE_ARN`, and `ROLE_ARN` is the execution role on `FUNCTION_NAME`.
- **Inline vs managed:** This fault targets attached managed policies, not inline policies.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| AWS Lambda (zip and container image) | Supported |
| AWS-managed IAM policy attached to the execution role | Supported |
| Customer-managed IAM policy attached to the execution role | Supported |
| Inline policy on the execution role | Not supported |
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
        "lambda:GetFunction",
        "lambda:GetFunctionConfiguration",
        "iam:GetRole",
        "iam:ListAttachedRolePolicies",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy"
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

---

## Fault tunables

Configure the following fault parameters when you add Lambda update role permission to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FUNCTION_NAME` | Name of the target Lambda function. | (required) |
| `REGION` | AWS region where the Lambda function is deployed. | (required) |
| `ROLE_ARN` | ARN of the IAM role attached to the function (the function's execution role). | (required) |
| `POLICY_ARN` | ARN of the managed IAM policy to detach from `ROLE_ARN` during the chaos window. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple iterations are executed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Confirms that `POLICY_ARN` is currently attached to `ROLE_ARN`, detaches it, waits for `TOTAL_CHAOS_DURATION` seconds, then re-attaches the policy to the role.

---

## Expected behavior during fault execution

- New invocations that exercise APIs covered by `POLICY_ARN` fail with `AccessDeniedException` at runtime.
- CloudWatch Logs surface `AccessDenied` messages for the affected SDK calls.
- CloudWatch metric `Errors` rises for affected invocations; downstream service metrics (DynamoDB throttles, S3 4xx, SQS 4xx) reflect the access denials.
- IAM evaluation caching can delay the visible impact by up to a minute even though the detach call succeeds immediately.

:::info When the fault ends
The chaos pod reattaches the policy to the role. New invocations recover access. As with detach, IAM may take up to a minute to fully propagate the reattach.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Lambda errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_lambda_errors_sum`.
- **Downstream service:** Use a Prometheus probe on the relevant downstream metric (DynamoDB throttles, S3 4xx, SQS 4xx) to confirm access denials.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint.

---

## Verify the fault execution effect

While the experiment is running, confirm the policy is detached and then reattached:

1. **Inspect role policies.**

   ```bash
   aws iam list-attached-role-policies --role-name <role-name>
   ```

   `POLICY_ARN` should be absent during the chaos window and present after recovery.

2. **Invoke the function and inspect the response/logs.**

   ```bash
   aws lambda invoke --region <region> --function-name <name> /tmp/out.json
   aws logs tail --region <region> /aws/lambda/<name> --since 5m
   ```

   Invocations that exercise the affected APIs should report `AccessDeniedException` during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod reattaches `POLICY_ARN` to `ROLE_ARN`.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the reattach call.
- **Manual recovery:** If the fault exits before reattach, run `aws iam attach-role-policy --role-name <role-name> --policy-arn <POLICY_ARN>` to restore the policy.
- **Workload recovery:** IAM caching may take up to a minute to refresh; expect a short tail of failures after reattach before invocations succeed.

---

## Limitations

- **Single policy per experiment:** The fault detaches one policy per experiment. Chain multiple experiments to detach several policies.
- **Inline policies untouched:** Inline policies attached directly to the role are not affected; only managed policy attachments are.
- **Service control policies override:** Permission boundaries and service control policies (SCPs) take precedence; detaching `POLICY_ARN` does not remove any boundary already restricting the role.
- **IAM propagation delay:** Detach and reattach take effect within seconds but IAM may cache decisions for up to a minute.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Lambda update role permission fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required IAM and Lambda permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes iam:ListAttachedRolePolicies, iam:AttachRolePolicy, iam:DetachRolePolicy, and lambda:GetFunctionConfiguration."
/>

<Troubleshoot
  issue="POLICY_ARN not attached to ROLE_ARN"
  mode="docs"
  fallback="The chaos pod cannot detach a policy that is not currently attached. Run 'aws iam list-attached-role-policies --role-name <role-name>' and confirm the ARN matches exactly (case sensitive, including the path)."
/>

<Troubleshoot
  issue="Function still has access after detach"
  mode="docs"
  fallback="Lambda function code may have cached an SDK session that holds long-lived signed requests; permissions cached by an in-flight invocation can complete successfully. Drive new invocations during the chaos window. Also confirm that the same permissions are not granted by another attached policy or by an inline policy on the same role."
/>

<Troubleshoot
  issue="Policy not reattached after the chaos window"
  mode="docs"
  fallback="If the reattach call failed, the role may stay without the policy. Run 'aws iam attach-role-policy --role-name <role-name> --policy-arn <POLICY_ARN>' to restore the policy."
/>

---

## Related faults

- [Lambda function layer detach](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-function-layer-detach): Detach a shared dependency layer instead of an IAM policy.
- [Lambda update function memory](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-function-memory): Test the function under tightened memory.
- [Lambda update function timeout](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-function-timeout): Test the function under tightened timeout.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
