---
id: lambda-inject-latency
title: Lambda inject latency
sidebar_label: Lambda Inject Latency
description: Inject runtime latency into an AWS Lambda function for a configurable duration so you can test how upstream callers and downstream consumers handle slower-than-expected responses, cold-start spikes, and resource contention.
keywords:
  - chaos engineering
  - lambda inject latency
  - aws fault
  - lambda fault
  - latency chaos
tags:
  - chaos-engineering
  - aws-faults
  - lambda-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Lambda inject latency is an AWS chaos fault that adds `LAMBDA_LATENCY` seconds of delay to every invocation of a target Lambda function (`FUNCTION_NAME` in `REGION`) for `TOTAL_CHAOS_DURATION` seconds. The fault injects a runtime wrapper that sleeps for the configured latency on each invocation; at the end of the window it restores the original function configuration.

Use this fault to test how an event-driven or API-driven workload behaves when a Lambda function becomes slow: whether upstream callers honor timeouts, whether retries amplify the load, whether monitoring detects the latency increase, and whether downstream consumers degrade gracefully under stretched response times.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Caller timeout behaviour:** When the function takes longer than expected, do upstream callers (API Gateway, ALB, EventBridge, Step Functions, application code) honor their configured timeouts?
- **Function timeout exposure:** Does the function's own timeout protect against slow downstreams, or does it amplify cost and consumer latency?
- **Retry storms:** Do callers retry latent invocations and amplify load on the function?
- **Monitoring fidelity:** Do CloudWatch alarms on `Duration`, `ConcurrentExecutions`, and downstream p99 fire within the SLA?
- **Capacity headroom:** Does extended duration push the function past its reserved concurrency and trigger throttling?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Lambda function:** `FUNCTION_NAME` exists in `REGION` and is in the `Active` state.
- **Latency vs function timeout:** Confirm `LAMBDA_LATENCY` is smaller than the function's configured timeout, otherwise every invocation hits the function timeout instead of completing.
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
        "lambda:UpdateFunctionConfiguration",
        "lambda:UpdateFunctionCode",
        "lambda:PublishVersion"
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

Configure the following fault parameters when you add Lambda inject latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FUNCTION_NAME` | Name of the target Lambda function. | (required) |
| `REGION` | AWS region where the Lambda function is deployed. | (required) |
| `LAMBDA_LATENCY` | Latency to inject into every invocation, in seconds. Keep this lower than the function's configured timeout. | `5` |

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

Reads the current function configuration, injects a runtime wrapper that sleeps for `LAMBDA_LATENCY` seconds on each invocation, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original function configuration.

---

## Expected behavior during fault execution

- Every new invocation of `FUNCTION_NAME` takes at least `LAMBDA_LATENCY` seconds longer to complete.
- CloudWatch metric `Duration` for the function rises by approximately `LAMBDA_LATENCY * 1000` ms.
- If the function is synchronously invoked (API Gateway, ALB, application code), callers see slower responses or timeouts.
- If `LAMBDA_LATENCY` is close to the function timeout, `Errors` and `Throttles` may rise as invocations exceed the configured timeout or push concurrency past its limit.

:::info When the fault ends
The chaos pod restores the original function configuration. New invocations return to baseline latency. Warm containers that carry the wrapper are recycled on the next cold start.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Lambda duration:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the duration metric for the function.
- **Lambda errors/throttles:** Use Prometheus probes on `aws_lambda_errors_sum` and `aws_lambda_throttles_sum`.
- **End-to-end latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint and assert p95 / p99 stays inside the SLO.
- **Caller behaviour:** Use an HTTP probe with the caller's timeout to confirm timeouts are honored.

---

## Verify the fault execution effect

While the experiment is running, confirm the function is slower and then recovers:

1. **Invoke the function and measure round-trip time.**

   ```bash
   time aws lambda invoke --region <region> --function-name <name> /tmp/out.json
   ```

   Round-trip should rise by approximately `LAMBDA_LATENCY` seconds during the chaos window and return to baseline afterwards.

2. **Check CloudWatch `Duration`.**

   ```bash
   aws cloudwatch get-metric-statistics --region <region> \
     --namespace AWS/Lambda --metric-name Duration \
     --dimensions Name=FunctionName,Value=<name> \
     --start-time <iso> --end-time <iso> \
     --period 60 --statistics Average,Maximum
   ```

   Average and maximum should rise by ~`LAMBDA_LATENCY * 1000` ms during the chaos window.

3. **Inspect logs.**

   ```bash
   aws logs tail --region <region> /aws/lambda/<name> --since 5m
   ```

   `REPORT` lines should show longer billed durations during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original function configuration.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before restore, run `aws lambda update-function-configuration --function-name <name> --region <region>` with the original environment/runtime values (recorded in the chaos pod logs).
- **Workload recovery:** Warm containers carrying the wrapper are replaced on the next cold start; until then, sporadic latency may continue on warm invocations of the same execution environment.

---

## Limitations

- **Per-invocation only:** The fault adds latency on every invocation; it cannot target a percentage of invocations or specific code paths.
- **Cold start interaction:** Updating the function configuration triggers cold starts during the chaos window; the first invocations after the start may include both `LAMBDA_LATENCY` and the cold-start init time.
- **Latency vs timeout:** If `LAMBDA_LATENCY` exceeds the function timeout, every invocation fails rather than completing slowly.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Lambda inject latency fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required Lambda permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes lambda:GetFunction, lambda:GetFunctionConfiguration, lambda:UpdateFunctionConfiguration, lambda:UpdateFunctionCode, and lambda:PublishVersion."
/>

<Troubleshoot
  issue="Function invocations time out instead of returning slowly"
  mode="docs"
  fallback="LAMBDA_LATENCY is greater than or close to the function's configured timeout. Reduce LAMBDA_LATENCY below the function timeout, or temporarily raise the function timeout before the experiment to give invocations enough headroom to complete."
/>

<Troubleshoot
  issue="No latency change observed in CloudWatch metrics"
  mode="docs"
  fallback="If the function is invoked rarely or asynchronously and metrics are averaged over a long period, the added latency may be diluted. Drive sustained synchronous load against the function during the chaos window and re-check the Duration metric on a 1-minute period."
/>

<Troubleshoot
  issue="Function configuration not restored after the chaos window"
  mode="docs"
  fallback="If the restore call failed, the function may still carry the wrapper. Use 'aws lambda get-function-configuration --function-name <name> --region <region>' to inspect the current configuration and roll it back to the original values recorded in the chaos pod logs."
/>

---

## Related faults

- [Lambda inject status code](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-inject-status-code): Override HTTP status codes instead of adding latency.
- [Lambda modify response body](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-modify-response-body): Override response bodies.
- [Lambda block TCP connection](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-block-tcp-connection): Block outbound TCP connections from the function.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
