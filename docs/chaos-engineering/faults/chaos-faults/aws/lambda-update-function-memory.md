---
id: lambda-update-function-memory
title: Lambda update function memory
sidebar_label: Lambda Update Function Memory
description: Lower the memory allocation of an AWS Lambda function for a configurable duration and restore it afterwards so you can test how the workload behaves with less memory and a proportionally smaller CPU share.
keywords:
  - chaos engineering
  - lambda update function memory
  - aws fault
  - lambda fault
  - resource chaos
tags:
  - chaos-engineering
  - aws-faults
  - lambda-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-update-function-memory
  - /docs/chaos-engineering/chaos-faults/aws/lambda-update-function-memory
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Lambda update function memory is an AWS chaos fault that changes the memory allocation of a target Lambda function (`FUNCTION_NAME` in `REGION`) to `MEMORY_IN_MEGABYTES` for `TOTAL_CHAOS_DURATION` seconds, then restores the original value. Because Lambda allocates CPU proportionally to memory, lowering memory also reduces the CPU share available to each invocation.

Use this fault to test how a Lambda workload behaves under a tightened memory and CPU budget: whether invocations OOM, whether duration rises, whether downstream consumers degrade gracefully, and whether monitoring detects the resource pressure before it cascades.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **OOM behaviour:** When memory drops to `MEMORY_IN_MEGABYTES`, do invocations fail with `Runtime exited with error: signal: killed` or proceed slowly?
- **Duration impact:** How much does the reduced CPU share extend `Duration`, and does it push the function past its configured timeout?
- **Caller impact:** Do synchronous callers (API Gateway, ALB) see timeouts and elevated 5xx?
- **Monitoring fidelity:** Do CloudWatch alarms on `Errors`, `Duration`, and downstream p99 fire within the SLA?
- **Capacity planning:** Identify the lowest safe memory setting for cost optimization without breaking the SLA.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Lambda function:** `FUNCTION_NAME` exists in `REGION` and is in the `Active` state.
- **Memory value:** `MEMORY_IN_MEGABYTES` is within Lambda's allowed range (128 to 10240, in 1 MB increments).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| AWS Lambda (zip and container image) | Supported |
| Lambda with provisioned concurrency | Supported (provisioned concurrency is rebuilt at the new memory) |
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

Configure the following fault parameters when you add Lambda update function memory to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FUNCTION_NAME` | Name of the target Lambda function. | (required) |
| `REGION` | AWS region where the Lambda function is deployed. | (required) |
| `MEMORY_IN_MEGABYTES` | Memory size (in MB) to set on the function during the chaos window. Allowed range 128 to 10240. | (required) |

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

Reads the current memory allocation on `FUNCTION_NAME`, updates it to `MEMORY_IN_MEGABYTES`, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original memory value.

---

## Expected behavior during fault execution

- New invocations of the function run with `MEMORY_IN_MEGABYTES` of RAM and a proportionally smaller CPU share.
- Workloads that previously fit comfortably may OOM (`Runtime exited with error: signal: killed`) or run noticeably slower.
- CloudWatch `Errors` rises for OOM-killed invocations; `Duration` rises for compute-bound invocations.
- Warm containers initialized before the update continue to run with the original memory until they are recycled.

:::info When the fault ends
The chaos pod restores the original memory value. New invocations run with the previous allocation. Warm containers carrying the reduced memory are replaced on the next cold start.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Lambda duration:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the duration metric for the function.
- **Lambda errors:** Use a Prometheus probe on `aws_lambda_errors_sum`.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint.

---

## Verify the fault execution effect

While the experiment is running, confirm the memory was reduced and then restored:

1. **Inspect function configuration.**

   ```bash
   aws lambda get-function-configuration \
     --region <region> \
     --function-name <name> \
     --query MemorySize
   ```

   The reported value should equal `MEMORY_IN_MEGABYTES` during the chaos window and return to the original value afterwards.

2. **Invoke the function and inspect the log report.**

   ```bash
   aws lambda invoke --region <region> --function-name <name> /tmp/out.json
   aws logs tail --region <region> /aws/lambda/<name> --since 5m
   ```

   `REPORT` lines should show `Memory Size: <MEMORY_IN_MEGABYTES> MB` and may show `Max Memory Used` close to the new limit; OOM cases appear as `Runtime exited with error: signal: killed`.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original memory value.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before restore, run `aws lambda update-function-configuration --function-name <name> --memory-size <N> --region <region>` with the original value (recorded in the chaos pod logs).
- **Workload recovery:** Warm containers carrying the reduced memory are replaced on the next cold start.

---

## Limitations

- **Memory and CPU bundled:** Lambda allocates CPU proportionally to memory. Reducing memory also reduces CPU; you cannot isolate one from the other.
- **Provisioned concurrency rebuilds:** Updating memory rebuilds provisioned concurrency at the new size, which incurs init time.
- **Allowed range:** `MEMORY_IN_MEGABYTES` must be between 128 and 10240. Values outside this range are rejected by AWS.
- **Cold-start interaction:** Updating the function configuration triggers cold starts during the chaos window.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Lambda update function memory fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required Lambda permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes lambda:GetFunction, lambda:GetFunctionConfiguration, and lambda:UpdateFunctionConfiguration."
/>

<Troubleshoot
  issue="MEMORY_IN_MEGABYTES value rejected"
  mode="docs"
  fallback="Lambda allows memory between 128 and 10240 MB in 1 MB increments. Re-run the experiment with a value inside this range."
/>

<Troubleshoot
  issue="No measurable impact at the reduced memory"
  mode="docs"
  fallback="If the workload was already running comfortably below MEMORY_IN_MEGABYTES, lowering the limit may have no visible effect. Drive sustained load against the function and pick a memory value below the typical Max Memory Used reported in CloudWatch Logs."
/>

<Troubleshoot
  issue="Memory not restored after the chaos window"
  mode="docs"
  fallback="If the restore call failed, the function may stay at the reduced memory. Run 'aws lambda update-function-configuration --function-name <name> --memory-size <N> --region <region>' with the original value recorded in the chaos pod logs."
/>

---

## Related faults

- [Lambda update function timeout](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-function-timeout): Reduce the configured timeout instead of memory.
- [Lambda inject latency](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-inject-latency): Add invocation latency without changing the resource budget.
- [Lambda delete function concurrency](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-delete-function-concurrency): Remove the reserved concurrency guarantee.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
