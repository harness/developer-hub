---
id: lambda-block-tcp-connection
title: Lambda block TCP connection
sidebar_label: Lambda Block TCP Connection
description: Block outbound TCP connections from an AWS Lambda function to one or more target hostnames for a configurable duration so you can test how the function behaves when a TCP-based dependency is unreachable.
keywords:
  - chaos engineering
  - lambda block tcp connection
  - aws fault
  - lambda fault
  - network chaos
tags:
  - chaos-engineering
  - aws-faults
  - lambda-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-block-tcp-connection
  - /docs/chaos-engineering/chaos-faults/aws/lambda-block-tcp-connection
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Lambda block TCP connection is an AWS chaos fault that blocks outbound TCP connections from a target Lambda function (`FUNCTION_NAME` in `REGION`) to the hostnames listed in `TARGET_HOSTNAMES` for `TOTAL_CHAOS_DURATION` seconds. The fault injects a runtime wrapper that intercepts TCP connect calls during the chaos window and restores normal behavior at the end.

Use this fault to test how a Lambda-backed workload behaves when a TCP-based dependency (database, cache, external API, internal service) becomes unreachable: whether the function fails fast with a clear error, whether monitoring detects the dependency outage, and whether downstream consumers handle the resulting failures gracefully.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Dependency outage:** When `TARGET_HOSTNAMES` becomes unreachable, does the Lambda function return a clean error or hang until the function timeout?
- **Function timeout exposure:** Does the function's configured timeout protect against TCP-blocked dependencies, or does it amplify cost and consumer latency?
- **Downstream impact:** Do API Gateway, EventBridge, or Step Functions callers degrade gracefully when the function starts failing?
- **Monitoring fidelity:** Do CloudWatch alarms on Lambda errors / duration fire within the SLA?
- **Recovery:** When the chaos ends, does the function resume normal operation without manual intervention?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Lambda function:** `FUNCTION_NAME` exists in `REGION` and is in the `Active` state.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| AWS Lambda (zip and container image) | Supported |
| Lambda with VPC networking | Supported |
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

Configure the following fault parameters when you add Lambda block TCP connection to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FUNCTION_NAME` | Name of the target Lambda function. | (required) |
| `REGION` | AWS region where the Lambda function is deployed (for example `us-east-1`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_HOSTNAMES` | Comma-separated list of hostnames whose TCP connections should be blocked from inside the function. Leave empty to block all outbound TCP. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Resolves `FUNCTION_NAME` in `REGION`, updates the function configuration to inject a runtime wrapper that blocks TCP connections to `TARGET_HOSTNAMES`, holds for `TOTAL_CHAOS_DURATION` seconds, then restores the original function configuration.

---

## Expected behavior during fault execution

- New TCP connections from the Lambda function to any hostname in `TARGET_HOSTNAMES` fail with a connection error.
- The function logs surface the connection failures in CloudWatch Logs.
- Function `Errors` count rises if the workload does not catch the failure; `Duration` rises if it retries the connect.
- API Gateway or other invokers see Lambda errors (or timeouts when retries exceed the function timeout).

:::info When the fault ends
The chaos pod restores the original function configuration. New invocations connect normally. Containers that were already warm with the wrapper are recycled when Lambda next scales them.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Lambda error rate:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_lambda_errors_sum` and assert it rises during the chaos window.
- **Lambda duration:** Use a Prometheus probe on the duration metric for the function.
- **Downstream consumer success:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against API Gateway (if applicable) to verify how callers experience the failure.

---

## Verify the fault execution effect

While the experiment is running, confirm the function is affected and recovers:

1. **Invoke the function and inspect the response.**

   ```bash
   aws lambda invoke --region <region> --function-name <name> /tmp/out.json
   cat /tmp/out.json
   ```

   The response should reflect the TCP failure (error JSON, exception payload, or timeout).

2. **Check CloudWatch Logs.**

   ```bash
   aws logs tail --region <region> /aws/lambda/<name> --since 5m
   ```

   Look for connection errors against the configured hostnames.

3. **Check CloudWatch metrics.**

   ```bash
   aws cloudwatch get-metric-statistics --region <region> \
     --namespace AWS/Lambda \
     --metric-name Errors \
     --dimensions Name=FunctionName,Value=<name> \
     --start-time <iso> --end-time <iso> \
     --period 60 --statistics Sum
   ```

   `Errors` should rise during the chaos window and return to baseline afterwards.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original function configuration.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before the restore call, run `aws lambda update-function-configuration --function-name <name> --region <region>` with the original environment/runtime values (recorded in the chaos pod logs) to revert.
- **Workload recovery:** Warm Lambda containers carrying the wrapper are replaced on the next cold start; until then, intermittent failures may appear on warm invocations of the same execution environment.

---

## Limitations

- **TCP only:** Only TCP connections are blocked. UDP and ICMP traffic is unaffected.
- **Outbound only:** The fault affects outbound connect calls from the function, not inbound invocations.
- **Hostname-based:** `TARGET_HOSTNAMES` matches hostnames; if the dependency is reached by IP only, list the IP(s) instead.
- **Provisioned concurrency:** With provisioned concurrency configured, warm-up time after the restore may briefly continue to surface errors.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Lambda block TCP connection fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required Lambda permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes lambda:GetFunction, lambda:GetFunctionConfiguration, lambda:UpdateFunctionConfiguration, lambda:UpdateFunctionCode, and lambda:PublishVersion."
/>

<Troubleshoot
  issue="Function invocations still succeed against the target hostname"
  mode="docs"
  fallback="The most common causes are: the function uses cached DNS / connection pooling so an existing connection bypasses the wrapper; the hostname in TARGET_HOSTNAMES does not exactly match the resolved name used by the SDK (different casing, subdomain, or trailing dot); or only cold-start invocations carry the wrapper. Confirm the resolved hostname by checking the function code or CloudWatch Logs, and re-run the experiment with the correct value."
/>

<Troubleshoot
  issue="Function configuration not restored after the chaos window"
  mode="docs"
  fallback="If the restore call failed, the function may still carry the wrapper. Use 'aws lambda get-function-configuration --function-name <name> --region <region>' to inspect the current configuration and roll it back to the original values recorded in the chaos pod logs."
/>

<Troubleshoot
  issue="Cold start latency increases sharply during the fault"
  mode="docs"
  fallback="Updating the function configuration triggers a new code revision; cold starts during the chaos window pay the full init cost. To reduce variance, use provisioned concurrency on the function before the experiment, or accept the latency spike as part of the test."
/>

---

## Related faults

- [Lambda inject latency](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-inject-latency): Add latency inside Lambda invocations instead of blocking TCP.
- [Lambda inject status code](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-inject-status-code): Override HTTP status codes returned by the function.
- [Lambda update role permission](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-role-permission): Strip IAM permissions instead of blocking TCP.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
