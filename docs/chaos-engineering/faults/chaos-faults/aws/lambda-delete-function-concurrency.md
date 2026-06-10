---
id: lambda-delete-function-concurrency
title: Lambda delete function concurrency
sidebar_label: Lambda Delete Function Concurrency
description: Delete the reserved concurrency configuration on an AWS Lambda function for a configurable duration and restore it afterwards so you can test how the workload behaves when the function has to share account-level concurrency with other functions.
keywords:
  - chaos engineering
  - lambda delete function concurrency
  - aws fault
  - lambda fault
tags:
  - chaos-engineering
  - aws-faults
  - lambda-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-delete-function-concurrency
  - /docs/chaos-engineering/chaos-faults/aws/lambda-delete-function-concurrency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Lambda delete function concurrency is an AWS chaos fault that deletes the reserved concurrency configuration on a target Lambda function (`FUNCTION_NAME` in `REGION`, version `FUNCTION_VERSION`) for `TOTAL_CHAOS_DURATION` seconds, then restores it. While the reserved concurrency is removed, the function shares the account-level unreserved concurrency pool with every other function in the same region.

Use this fault to test how a critical Lambda workload behaves when its concurrency guarantee disappears: whether the function is throttled by competing workloads, whether monitoring detects the throttling, and whether downstream consumers degrade gracefully under reduced throughput.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Throttling exposure:** When the reservation disappears, does the function start receiving `TooManyRequestsException` from competing workloads in the same account?
- **Downstream impact:** Do consumers downstream of the Lambda function degrade gracefully when throughput drops?
- **Monitoring fidelity:** Do CloudWatch alarms on `Throttles` fire within the SLA?
- **Capacity planning:** Does the rest of the account have enough unreserved concurrency to absorb this function's traffic?
- **Recovery:** When the reservation is restored, does the function return to its previous throughput?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Lambda function:** `FUNCTION_NAME` exists in `REGION` and has a non-zero reserved concurrency configured.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| AWS Lambda (zip and container image) | Supported |
| Lambda functions with reserved concurrency configured | Supported |
| Lambda functions without reserved concurrency | Not applicable (nothing to delete) |
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
        "lambda:GetFunctionConcurrency",
        "lambda:PutFunctionConcurrency",
        "lambda:DeleteFunctionConcurrency"
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

Configure the following fault parameters when you add Lambda delete function concurrency to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FUNCTION_NAME` | Name of the target Lambda function. | (required) |
| `REGION` | AWS region where the Lambda function is deployed. | (required) |
| `FUNCTION_VERSION` | Version of the Lambda function to target. Use `$LATEST` for the latest version. | `$LATEST` |

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

Reads the current reserved concurrency on `FUNCTION_NAME` in `REGION`, deletes it, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original reserved concurrency value.

---

## Expected behavior during fault execution

- The function loses its reserved concurrency and shares the account-level unreserved pool with every other function in the same region.
- Under sustained load (or when other workloads are also active), the function may be throttled with `TooManyRequestsException`.
- CloudWatch metrics `Throttles` and `Errors` may rise; `ConcurrentExecutions` is no longer guaranteed.
- Synchronous invokers (API Gateway, ALB) surface throttling errors directly; asynchronous invokers retry per their policy.

:::info When the fault ends
The chaos pod restores the original reserved concurrency value. The function regains its concurrency guarantee.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Throttles:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_lambda_throttles_sum`.
- **Concurrent executions:** Use a Prometheus probe on `aws_lambda_concurrent_executions_maximum`.
- **Invocation errors:** Use a Prometheus probe on `aws_lambda_errors_sum`.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint backed by the function.

---

## Verify the fault execution effect

While the experiment is running, confirm the concurrency was deleted and then restored:

1. **Check function concurrency.**

   ```bash
   aws lambda get-function-concurrency \
     --region <region> \
     --function-name <name>
   ```

   During the fault this returns no `ReservedConcurrentExecutions`; after recovery it returns the original value.

2. **Check throttles.**

   ```bash
   aws cloudwatch get-metric-statistics --region <region> \
     --namespace AWS/Lambda --metric-name Throttles \
     --dimensions Name=FunctionName,Value=<name> \
     --start-time <iso> --end-time <iso> \
     --period 60 --statistics Sum
   ```

   Throttles may rise if the function is under load and the account-level pool is contested.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original reserved concurrency value.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before restore, run `aws lambda put-function-concurrency --function-name <name> --reserved-concurrent-executions <N> --region <region>` with the original value (recorded in the chaos pod logs).
- **Workload recovery:** Throttling stops as soon as the reservation is restored; in-flight retries by asynchronous invokers continue per their retry policy.

---

## Limitations

- **Account-level pool dependency:** The visible impact depends on how loaded the account-level pool is. On a quiet account the deletion may produce no measurable effect.
- **Synchronous vs asynchronous:** Synchronous invokers see throttling immediately; asynchronous invokers retry per their policy and may not surface visible failures.
- **Provisioned concurrency unaffected:** Provisioned concurrency is a separate configuration and is not deleted by this fault.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Lambda delete function concurrency fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required Lambda permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes lambda:GetFunctionConcurrency, lambda:PutFunctionConcurrency, and lambda:DeleteFunctionConcurrency."
/>

<Troubleshoot
  issue="No throttling observed during the chaos window"
  mode="docs"
  fallback="If the account-level unreserved concurrency pool is large enough to absorb the function's load (or no other functions in the region are running), the deletion has no visible effect. Run the experiment when other workloads are active, or run a load generator against the function to drive concurrency above the unreserved pool size."
/>

<Troubleshoot
  issue="Concurrency not restored after the chaos window"
  mode="docs"
  fallback="If the restore call failed, the function may be left without reserved concurrency. Run 'aws lambda put-function-concurrency --function-name <name> --reserved-concurrent-executions <N> --region <region>' with the original value (recorded in the chaos pod logs)."
/>

<Troubleshoot
  issue="The function did not have reserved concurrency to begin with"
  mode="docs"
  fallback="Lambda delete function concurrency assumes the function has reserved concurrency configured. If GetFunctionConcurrency returns no value, set a reservation with 'aws lambda put-function-concurrency --function-name <name> --reserved-concurrent-executions <N>' before running the experiment."
/>

---

## Related faults

- [Lambda update function memory](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-function-memory): Reduce per-invocation memory headroom instead of removing the concurrency guarantee.
- [Lambda update function timeout](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-function-timeout): Tighten the function timeout.
- [Lambda inject latency](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-inject-latency): Add latency to extend invocation duration and pressure concurrency.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
