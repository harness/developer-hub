---
id: lambda-modify-response-body
title: Lambda modify response body
sidebar_label: Lambda Modify Response Body
description: Override the response body returned by an AWS Lambda function for a configurable duration so you can test how upstream callers and client applications handle unexpected payload shapes and corrupted data.
keywords:
  - chaos engineering
  - lambda modify response body
  - aws fault
  - lambda fault
  - http chaos
tags:
  - chaos-engineering
  - aws-faults
  - lambda-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Lambda modify response body is an AWS chaos fault that replaces the response body returned by a target Lambda function (`FUNCTION_NAME` in `REGION`) with the value of `RESPONSE_BODY` for `TOTAL_CHAOS_DURATION` seconds. The fault injects a runtime wrapper that rewrites the response just before the function returns; at the end of the window it restores the original function configuration.

Use this fault to test how an API-driven workload behaves when a Lambda function starts returning unexpected payloads: whether client code validates the response shape, whether monitoring detects schema drift or contract violations, and whether downstream consumers degrade gracefully under corrupted data.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Response validation:** When the function returns an unexpected body, do client applications validate the schema and fail gracefully, or do they crash on parsing?
- **Contract testing:** Identify callers that silently consume invalid responses without alerting.
- **Monitoring fidelity:** Do alarms on application-level error rate or response-shape validation fire within the SLA?
- **Downstream impact:** Do consumers downstream of the Lambda function degrade gracefully when payloads are corrupted?
- **Recovery:** When the chaos ends, do new invocations return the original payload without manual intervention?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Lambda function:** `FUNCTION_NAME` exists in `REGION` and is in the `Active` state.
- **HTTP-style response shape:** The function returns a response object with a top-level `body` field (Lambda proxy integration, function URL, ALB target).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Lambda behind API Gateway (REST and HTTP API) with proxy integration | Supported |
| Lambda function URL | Supported |
| Lambda behind Application Load Balancer | Supported |
| Lambda with custom (non-HTTP) response shape | Not supported |
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

Configure the following fault parameters when you add Lambda modify response body to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FUNCTION_NAME` | Name of the target Lambda function. | (required) |
| `REGION` | AWS region where the Lambda function is deployed. | (required) |
| `RESPONSE_BODY` | Body string to return from every invocation during the chaos window. Pass a JSON string if the caller expects JSON. | `"hello, Chaos!!!"` |

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

Reads the current function configuration, injects a runtime wrapper that rewrites the response body to `RESPONSE_BODY`, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original function configuration.

---

## Expected behavior during fault execution

- Every new invocation of `FUNCTION_NAME` returns the value of `RESPONSE_BODY` as the body.
- API Gateway / ALB caller responses carry the modified body but the original status code.
- Clients that expect a specific schema may fail parsing or report contract violations.
- Application-level error metrics rise; Lambda's own `Errors` metric stays unchanged unless the wrapper itself throws.

:::info When the fault ends
The chaos pod restores the original function configuration. New invocations return the original body. Warm containers carrying the wrapper are recycled on next cold start.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application error rate:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on your application-level error counter.
- **HTTP probe with body assertion:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint and assert the body shape during and after the chaos window.
- **Downstream availability:** Use an HTTP probe on consumer endpoints to verify graceful degradation.

---

## Verify the fault execution effect

While the experiment is running, confirm the function returns the modified body and then recovers:

1. **Invoke the function via its caller and inspect the body.**

   ```bash
   curl -s https://<api-or-function-url>/<path>
   ```

   The body should match `RESPONSE_BODY` during the chaos window and return to the original payload afterwards.

2. **Invoke via the Lambda API.**

   ```bash
   aws lambda invoke --region <region> --function-name <name> /tmp/out.json
   cat /tmp/out.json
   ```

   `body` should equal `RESPONSE_BODY` during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original function configuration.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before restore, run `aws lambda update-function-configuration --function-name <name> --region <region>` with the original environment/runtime values (recorded in the chaos pod logs).
- **Workload recovery:** Warm containers carrying the wrapper are replaced on the next cold start.

---

## Limitations

- **HTTP-style response only:** The fault rewrites the top-level `body` field. Functions that return non-HTTP-shaped responses are unaffected.
- **All invocations affected:** Every invocation during the chaos window returns `RESPONSE_BODY`; the fault cannot target a percentage of invocations or specific code paths.
- **Headers and status untouched:** The status code and headers are not modified. Use [Lambda inject status code](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-inject-status-code) to override the status as well.
- **Cold-start interaction:** Updating the function configuration triggers cold starts during the chaos window.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Lambda modify response body fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required Lambda permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes lambda:GetFunction, lambda:GetFunctionConfiguration, lambda:UpdateFunctionConfiguration, lambda:UpdateFunctionCode, and lambda:PublishVersion."
/>

<Troubleshoot
  issue="Response body is unchanged"
  mode="docs"
  fallback="If the function does not return an HTTP-style payload (top-level body field), the wrapper has nothing to rewrite. Confirm the function follows the Lambda proxy integration response shape, or invoke through API Gateway / ALB / a Function URL where the wrapper applies."
/>

<Troubleshoot
  issue="RESPONSE_BODY values containing special characters break invocations"
  mode="docs"
  fallback="Some payloads (multi-line strings, embedded quotes, binary content) need to be escaped before being passed in as a tunable value. Pass simple JSON or plain text and escape quotes per the YAML rules of your experiment manifest."
/>

<Troubleshoot
  issue="Function configuration not restored after the chaos window"
  mode="docs"
  fallback="If the restore call failed, the function may still carry the wrapper. Use 'aws lambda get-function-configuration --function-name <name> --region <region>' to inspect the current configuration and roll it back to the original values recorded in the chaos pod logs."
/>

---

## Related faults

- [Lambda inject status code](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-inject-status-code): Override the status code as well as (or instead of) the body.
- [Lambda inject latency](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-inject-latency): Add latency instead of corrupting the body.
- [Lambda block TCP connection](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-block-tcp-connection): Block outbound TCP connections from the function.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
