---
id: lambda-update-function-timeout
title: Lambda update function timeout
sidebar_label: Lambda Update Function Timeout
description: Lower the configured timeout of an AWS Lambda function for a configurable duration and restore it afterwards so you can test how the workload behaves when invocations are cut short.
keywords:
  - chaos engineering
  - lambda update function timeout
  - aws fault
  - lambda fault
  - resource chaos
tags:
  - chaos-engineering
  - aws-faults
  - lambda-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-update-function-timeout
  - /docs/chaos-engineering/chaos-faults/aws/lambda-update-function-timeout
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Lambda update function timeout is an AWS chaos fault that changes the configured timeout of a target Lambda function (`FUNCTION_NAME` in `REGION`) to `FUNCTION_TIMEOUT` seconds for `TOTAL_CHAOS_DURATION` seconds, then restores the original value. Invocations that previously completed in time may be terminated by Lambda with `Task timed out after <N>.00 seconds`.

Use this fault to test how a Lambda workload behaves when its time budget shrinks: whether callers see clean timeouts or partial state, whether retries amplify the failure, whether monitoring detects the rise in `Errors` and `Duration` p99, and whether downstream consumers degrade gracefully under timed-out invocations.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Timeout exposure:** When the timeout shrinks to `FUNCTION_TIMEOUT`, do tail invocations get killed or do they all still fit?
- **Caller behaviour:** Do synchronous callers (API Gateway, ALB) honor their own timeouts cleanly when the function is killed?
- **Retry storms:** Do asynchronous invokers retry timed-out invocations and amplify load?
- **Monitoring fidelity:** Do CloudWatch alarms on Lambda `Errors`, `Throttles`, and end-to-end p99 fire within the SLA?
- **Capacity planning:** Identify the lowest safe timeout setting for cost optimization without breaking the SLA.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Lambda function:** `FUNCTION_NAME` exists in `REGION` and is in the `Active` state.
- **Timeout value:** `FUNCTION_TIMEOUT` is within Lambda's allowed range (1 to 900 seconds).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| AWS Lambda (zip and container image) | Supported |
| Lambda with provisioned concurrency | Supported |
| Lambda@Edge | Not supported |
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
        "lambda:UpdateFunctionConfiguration"
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

Configure the following fault parameters when you add Lambda update function timeout to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FUNCTION_NAME` | Name of the target Lambda function. | (required) |
| `REGION` | AWS region where the Lambda function is deployed. | (required) |
| `FUNCTION_TIMEOUT` | Timeout (in seconds) to set on the function during the chaos window. Allowed range 1 to 900. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Reads the current timeout on `FUNCTION_NAME`, updates it to `FUNCTION_TIMEOUT` seconds, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original timeout value.

---

## Expected behavior during fault execution

- New invocations of the function are killed after `FUNCTION_TIMEOUT` seconds with `Task timed out after <N>.00 seconds`.
- Tail latency invocations that previously completed in time now fail; median invocations may still succeed.
- CloudWatch `Errors` rises for timed-out invocations; `Duration` for timed-out invocations equals the new timeout.
- Synchronous callers (API Gateway, ALB) see timeouts at the function layer; asynchronous invokers retry per their policy.

:::info When the fault ends
The chaos pod restores the original timeout value. New invocations run with the previous timeout. Warm containers carrying the reduced timeout are recycled on the next cold start.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Lambda errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_lambda_errors_sum` and assert it rises during the chaos window.
- **Lambda duration:** Use a Prometheus probe on the duration metric for the function.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint.

---

## Verify the fault execution effect

While the experiment is running, confirm the timeout was reduced and then restored:

1. **Inspect function configuration.**

   ```bash
   aws lambda get-function-configuration \
     --region <region> \
     --function-name <name> \
     --query Timeout
   ```

   The reported value should equal `FUNCTION_TIMEOUT` during the chaos window and return to the original value afterwards.

2. **Invoke a long-running path and inspect the response.**

   ```bash
   aws lambda invoke --region <region> --function-name <name> \
     --payload <payload-that-runs-long> /tmp/out.json
   cat /tmp/out.json
   ```

   Long invocations should return `Task timed out` during the chaos window.

3. **Check CloudWatch metrics and logs.**

   ```bash
   aws logs tail --region <region> /aws/lambda/<name> --since 5m \
     --filter-pattern "Task timed out"
   ```

   Timed-out invocations are clearly logged.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original timeout value.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before restore, run `aws lambda update-function-configuration --function-name <name> --timeout <N> --region <region>` with the original value (recorded in the chaos pod logs).
- **Workload recovery:** Warm containers carrying the reduced timeout are replaced on the next cold start; asynchronous invokers continue retrying timed-out invocations per their policy.

---

## Limitations

- **Allowed range:** `FUNCTION_TIMEOUT` must be between 1 and 900 seconds. Values outside this range are rejected by AWS.
- **In-flight invocations:** Invocations that started before the update may complete or be killed depending on how AWS applies the new timeout to the warm pool.
- **Asynchronous retries:** Async invokers (event source mappings, EventBridge) retry timed-out invocations; the resulting failure pattern depends on the retry policy.
- **Cold-start interaction:** Updating the function configuration triggers cold starts during the chaos window.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Lambda update function timeout fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required Lambda permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes lambda:GetFunction, lambda:GetFunctionConfiguration, and lambda:UpdateFunctionConfiguration."
/>

<Troubleshoot
  issue="FUNCTION_TIMEOUT value rejected"
  mode="docs"
  fallback="Lambda allows function timeout between 1 and 900 seconds. Re-run the experiment with a value inside this range."
/>

<Troubleshoot
  issue="No timed-out invocations observed"
  mode="docs"
  fallback="If every invocation comfortably fits inside FUNCTION_TIMEOUT, the change has no measurable effect. Pick a timeout value below the typical p95/p99 duration reported by CloudWatch, or run the experiment under load that exercises tail paths."
/>

<Troubleshoot
  issue="Timeout not restored after the chaos window"
  mode="docs"
  fallback="If the restore call failed, the function may stay at the reduced timeout. Run 'aws lambda update-function-configuration --function-name <name> --timeout <N> --region <region>' with the original value recorded in the chaos pod logs."
/>

---

## Related faults

- [Lambda update function memory](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-function-memory): Reduce memory instead of timeout.
- [Lambda inject latency](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-inject-latency): Add invocation latency without changing the configured timeout.
- [Lambda delete function concurrency](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-delete-function-concurrency): Remove the reserved concurrency guarantee.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
