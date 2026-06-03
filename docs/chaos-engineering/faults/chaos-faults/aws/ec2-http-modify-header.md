---
id: ec2-http-modify-header
title: EC2 HTTP modify header
sidebar_label: EC2 HTTP Modify Header
description: Add, change, or remove HTTP headers on a configurable port of a target EC2 instance via AWS Systems Manager so you can test how clients react when headers are missing or malformed.
keywords:
  - chaos engineering
  - ec2 http modify header
  - aws fault
  - http header injection
  - response chaos
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-http-modify-header
  - /docs/chaos-engineering/chaos-faults/aws/ec2-http-modify-header
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 HTTP modify header is an AWS chaos fault that adds, changes, or removes HTTP headers on a configurable port of a target EC2 instance for a configurable duration. The fault can rewrite headers on requests entering the service or on responses leaving the service (controlled by `HEADERS_MODE`). The fault interposes a transparent HTTP proxy on the instance, scoped to `TARGET_SERVICE_PORT` and `NETWORK_INTERFACE`, and dispatches the proxy via AWS Systems Manager Run Command.

Use this fault to test how clients and servers react when expected headers are missing or malformed: do auth checks fail safely when the auth header is stripped, do cache layers misbehave when cache headers change, does the application surface a clean error or behave erratically?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Missing auth header on requests:** When `Authorization` is stripped from incoming requests, does the server return `401` cleanly or crash?
- **Missing content-type on responses:** When `Content-Type` is stripped from responses, do clients fall back gracefully?
- **Invalid CORS headers:** When CORS headers are changed, do browser clients honour the changes correctly?
- **Cache control churn:** When `Cache-Control` is set to `no-store`, do downstream caches honour it and how does this affect load?
- **Tracing-header propagation:** When tracing headers are removed, does the trace break exactly where expected (a useful negative test)?

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
| `HEADERS_MAP` | JSON object mapping header names to values to inject. Setting a value to an empty string removes the header. Example: `{"X-Auth": "fake", "Content-Type": ""}`. | `{"key": "value"}` |
| `HEADERS_MODE` | Side to apply the rewrite to: `request` (incoming requests to the service) or `response` (outgoing responses from the service). | `response` |

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

:::tip Remove headers with the empty string
To remove a header rather than overwrite it, set its value to `""` in `HEADERS_MAP`. For example, `{"Authorization": ""}` strips the auth header from every request when `HEADERS_MODE=request`.
:::

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that interposes an HTTP proxy on `NETWORK_INTERFACE` for traffic destined to `TARGET_SERVICE_PORT`; the proxy applies the header rewrites in `HEADERS_MAP` on either incoming requests or outgoing responses (per `HEADERS_MODE`) for `TOTAL_CHAOS_DURATION` seconds before being removed.

---

## Expected behavior during fault execution

- Every HTTP request (`HEADERS_MODE=request`) or response (`HEADERS_MODE=response`) is modified by the rewrites in `HEADERS_MAP`.
- Headers explicitly set in `HEADERS_MAP` are added or overwritten.
- Headers set to an empty string are removed.
- Other ports and non-HTTP traffic are unaffected.
- Application behavior depends on which header was modified: auth changes typically cause `401`/`403`, content-type changes typically cause parse errors, cache-control changes affect downstream caches.

:::info When the fault ends
The chaos pod removes the HTTP proxy. Headers return to normal immediately. Clients or downstream caches that captured the modified headers continue using them until they refresh.
:::

### Signals to watch

- **Observed headers:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `curl -I http://localhost:<port>/` via SSM and asserts on the headers.
- **Auth failures:** Use a Prometheus probe on the application's auth-failure counter when stripping `Authorization`.
- **Client-side cache hit rate:** When changing `Cache-Control`, watch downstream cache hit rate metrics for a drop.

---

## Verify the fault execution effect

While the experiment is running:

1. **Inspect response headers via SSM.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["curl -I http://localhost:<TARGET_SERVICE_PORT>/"]'
   ```

   The output should reflect the headers in `HEADERS_MAP`.

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
- **All-or-nothing header rewrite:** Every request or response on the port is modified. There is no per-URL or per-status-code filter.
- **HEADERS_MAP must be valid JSON:** Quote keys and values correctly. Malformed JSON fails the SSM Run Command.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 HTTP modify header experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 HTTP modify header runs but headers are unchanged in client responses"
  mode="docs"
  fallback="The most common causes are: HEADERS_MODE is set to the wrong side (use 'request' to mutate inbound or 'response' to mutate outbound); HEADERS_MAP is malformed JSON; TLS terminates at the port (HTTPS is not supported); or a downstream proxy strips or re-adds the header after the chaos proxy modifies it. Verify with 'curl -I http://localhost:<port>/' via SSM during the fault."
/>

<Troubleshoot
  issue="EC2 HTTP modify header rejected my HEADERS_MAP"
  mode="docs"
  fallback='HEADERS_MAP must be a single-line JSON object with quoted keys and string values, for example: a key "X-Auth" with value "fake". Escape quotes if you are pasting into a YAML field. Empty values remove the header (set the value of "Authorization" to an empty string to strip it).'
/>

---

## Related faults

- [EC2 HTTP latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-latency): Delay HTTP responses instead of changing headers.
- [EC2 HTTP modify body](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-modify-body): Rewrite the response body instead of headers.
- [EC2 HTTP status code](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-status-code): Rewrite the response status code.
- [EC2 HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-reset-peer): Reset TCP connections mid-flight.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
