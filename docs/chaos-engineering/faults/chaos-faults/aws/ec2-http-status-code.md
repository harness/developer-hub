---
id: ec2-http-status-code
title: EC2 HTTP status code
sidebar_label: EC2 HTTP Status Code
description: Rewrite HTTP response status codes on a configurable port of a target EC2 instance via AWS Systems Manager so you can test how clients react to specific error codes returned by an upstream service.
keywords:
  - chaos engineering
  - ec2 http status code
  - aws fault
  - http error injection
  - response chaos
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-http-status-code
  - /docs/chaos-engineering/chaos-faults/aws/ec2-http-status-code
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 HTTP status code is an AWS chaos fault that rewrites HTTP response status codes on a specified port of a target EC2 instance for a configurable duration. The fault can optionally retain or strip the response body. It interposes a transparent HTTP proxy on the instance, scoped to `TARGET_SERVICE_PORT` and `NETWORK_INTERFACE`, and dispatches the proxy via AWS Systems Manager Run Command.

Use this fault to test how clients react when upstream services return specific HTTP error codes: do they distinguish 4xx (don't retry) from 5xx (retry), do they fall back to a cached response, does the circuit breaker trip at the right point, does the error surface cleanly to the user?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **4xx vs 5xx semantics:** When the upstream returns `400`, does the client refrain from retrying? When it returns `500`, does it retry with backoff?
- **Rate-limit handling:** When the upstream returns `429`, does the client honour `Retry-After` and back off, or does it hammer the upstream?
- **Auth-failure handling:** When the upstream returns `401`/`403`, does the client refresh its token and retry, or does it surface the failure?
- **Circuit-breaker behaviour:** Does the circuit open after enough consecutive 5xx responses, and does it close again cleanly when the fault ends?
- **Cache fallback:** When the API returns `502`, does the client fall back to a cached or stale response?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target instance is reachable via SSM:** The instance has the SSM Agent running and an instance profile with `AmazonSSMManagedInstanceCore`.
- **Selector provided:** Either `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` is set.
- **HTTP service runs on TARGET_SERVICE_PORT:** A plaintext HTTP service is listening on `TARGET_SERVICE_PORT`.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EC2 (Linux instances with SSM Agent) | Supported |
| Amazon EKS managed worker nodes | Supported (if SSM Agent is installed) |
| Amazon EKS self-managed worker nodes | Supported (if SSM Agent is installed) |
| Targeting by tag | Supported via `EC2_INSTANCE_TAG` |
| Targeting by ID | Supported via `EC2_INSTANCE_ID` |
| HTTPS traffic (TLS-encrypted) | Not supported on the target port; terminate TLS upstream |
| Windows instances | Not supported (Linux-only proxy) |

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
| `REGION` | AWS region that hosts the target instance. | (required) |
| `EC2_INSTANCE_ID` *or* `EC2_INSTANCE_TAG` | One of these must be set to select the target instance(s). | `""` |
| `TARGET_SERVICE_PORT` | Port the target HTTP service listens on. | `80` |
| `STATUS_CODE` | HTTP status code to return for every response (for example `429`, `500`, `503`). | `400` |
| `RESPONSE_BODY` | When `true`, the original response body is included with the new status code. When `false`, an empty body is returned. | `true` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_INTERFACE` | Network interface where the HTTP proxy intercepts traffic. | `eth0` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances to target (only with `EC2_INSTANCE_TAG`). `0` targets one instance. | `0` |
| `INSTALL_DEPENDENCIES` | Install the in-instance HTTP proxy if missing. Set to `False` to skip. | `True` |
| `PROXY` | HTTP/HTTPS proxy used by the in-instance installer. | `""` |
| `SEQUENCE` | Order in which multiple instances are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::tip Pick the status code that drives the test path
- `429` to test rate-limit handling and `Retry-After` honouring.
- `500` / `502` / `503` to test retry-with-backoff paths and circuit breakers.
- `401` / `403` to test token refresh and auth-failure handling.
- `404` to test "not found" branches.
:::

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that interposes an HTTP proxy on `NETWORK_INTERFACE` for traffic destined to `TARGET_SERVICE_PORT`; the proxy rewrites the status code of every response to `STATUS_CODE` (preserving the body when `RESPONSE_BODY=true`) for `TOTAL_CHAOS_DURATION` seconds before being removed.

---

## Expected behavior during fault execution

- Every HTTP response from the service carries `STATUS_CODE` instead of the original status.
- The body is preserved (`RESPONSE_BODY=true`) or stripped (`RESPONSE_BODY=false`).
- Other ports and non-HTTP traffic are unaffected.
- Client behaviour depends on the status code: 5xx typically triggers retries, 4xx typically does not, 429 should trigger backoff.
- Load-balancer health checks may fail if they assert on `2xx` and the new status is `5xx`.

:::info When the fault ends
The chaos pod removes the HTTP proxy. Status codes return to normal immediately. Circuit breakers that opened during the fault may take time to close again according to their own half-open / close-after-success policy.
:::

### Signals to watch

- **Client error rate by status code:** Use a Prometheus probe on the client's HTTP status histogram broken down by code.
- **Retry counters:** Use a Prometheus probe on the client's retry counter for the affected endpoint.
- **Circuit-breaker state:** Use a Prometheus probe on the circuit-breaker `state` gauge if your library exposes it.

---

## Verify the fault execution effect

While the experiment is running:

1. **Issue a request and read the status code.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["curl -s -o /dev/null -w \"%{http_code}\\n\" http://localhost:<TARGET_SERVICE_PORT>/"]'
   ```

   The output should match `STATUS_CODE`.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the HTTP proxy and removes the redirection rules.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the in-flight SSM command and runs cleanup.
- **Manual cleanup:** If the proxy is left running, kill it via SSM Session Manager and remove any installed iptables rules.

---

## Limitations

- **HTTP only (no HTTPS):** The proxy operates on plaintext HTTP. Move TLS termination upstream before using this fault.
- **Linux-only payload:** This fault runs on Linux instances.
- **SSM Agent required:** Instances without the SSM Agent online cannot be targeted.
- **All-or-nothing status rewrite:** Every response on the port gets the same `STATUS_CODE`. There is no per-URL or percentage filter.
- **Custom status messages:** The proxy uses the standard status reason for `STATUS_CODE`. Custom reason phrases the original service might emit are lost.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 HTTP status code experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 HTTP status code runs but client still sees 200 OK"
  mode="docs"
  fallback="The most common causes are: TARGET_SERVICE_PORT does not host an HTTP server; the client bypasses the proxy by connecting on a different interface than NETWORK_INTERFACE; TLS terminates at the port (HTTPS is not supported); or the in-instance proxy failed to install (set INSTALL_DEPENDENCIES=True). Verify with 'curl -i http://localhost:<port>/' via SSM during the fault."
/>

<Troubleshoot
  issue="EC2 HTTP status code experiment broke client circuit breakers permanently"
  mode="docs"
  fallback="Circuit breakers opened during the fault and may stay open beyond TOTAL_CHAOS_DURATION because they wait for a successful response to half-close. Trigger a synthetic success after the fault ends, or wait for the circuit's own open-state timeout to elapse. Tune circuit-breaker open-state duration if you need faster recovery in chaos tests."
/>

---

## Related faults

- [EC2 HTTP latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-latency): Delay responses instead of changing the status code.
- [EC2 HTTP modify body](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-modify-body): Change the response body instead of the status code.
- [EC2 HTTP modify header](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-modify-header): Change request or response headers.
- [EC2 HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-reset-peer): Reset connections instead of returning a response.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
