---
id: ec2-http-modify-body
title: EC2 HTTP modify body
sidebar_label: EC2 HTTP Modify Body
description: Replace HTTP response bodies on a configurable port of a target EC2 instance via AWS Systems Manager so you can test how clients react when an upstream returns unexpected content.
keywords:
  - chaos engineering
  - ec2 http modify body
  - aws fault
  - http body injection
  - response chaos
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-http-modify-body
  - /docs/chaos-engineering/chaos-faults/aws/ec2-http-modify-body
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 HTTP modify body is an AWS chaos fault that replaces the body of HTTP responses returned by a service on a specified port of a target EC2 instance for a configurable duration. The fault interposes a transparent HTTP proxy on the instance, scoped to `TARGET_SERVICE_PORT` and `NETWORK_INTERFACE`, and dispatches the proxy via AWS Systems Manager Run Command.

Use this fault to test how clients react when an upstream returns unexpected, malformed, or empty content: do parsers fail gracefully, do clients validate response shape, does the system surface the corruption in monitoring rather than propagating the bad payload?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Schema validation:** When the response body is replaced with garbage text, does the client surface a clean schema validation error or crash on a JSON parse failure?
- **Empty response handling:** When the body is empty, does the client treat it as "no data" or as a transient error worth retrying?
- **Truncated payload handling:** When the body is truncated relative to `Content-Length`, do clients abort cleanly?
- **Defensive UX:** When the API returns unexpected content, does the UI degrade gracefully (loading state, fallback content) instead of breaking?
- **Test parsing-error coverage:** Force the corrupt-payload code path in production-like conditions.

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
| `RESPONSE_BODY` | String that replaces the body of every HTTP response on `TARGET_SERVICE_PORT`. Empty string returns an empty body. | `hii` |

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

:::tip Pick a body that drives the test path
The default `RESPONSE_BODY=hii` exercises the parse-failure path for most schemas. Set `RESPONSE_BODY=""` to test empty-response handling, or a syntactically valid but semantically wrong JSON object to test schema-validation behaviour.
:::

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that interposes an HTTP proxy on `NETWORK_INTERFACE` for traffic destined to `TARGET_SERVICE_PORT`; the proxy rewrites every HTTP response body to `RESPONSE_BODY` for `TOTAL_CHAOS_DURATION` seconds before being removed.

---

## Expected behavior during fault execution

- Every HTTP response from the service on `TARGET_SERVICE_PORT` carries the body specified in `RESPONSE_BODY`.
- Other ports and non-HTTP traffic are unaffected.
- Clients with strict schema validation see parsing errors.
- Clients without validation may silently propagate the wrong payload to downstream systems; the test surfaces this gap.

:::info When the fault ends
The chaos pod removes the HTTP proxy. Responses return to normal immediately. Clients that cached or persisted the corrupt body need to refresh it manually.
:::

### Signals to watch

- **Application response body:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `curl http://localhost:<port>/healthz` via SSM and asserts on the body.
- **Client error rate:** Use a Prometheus probe on the client's parse-error or schema-validation counter.
- **Downstream propagation:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) one or two layers downstream to confirm whether the bad payload escapes the immediate caller.

---

## Verify the fault execution effect

While the experiment is running:

1. **Issue an HTTP request and check the body.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["curl -s http://localhost:<TARGET_SERVICE_PORT>/"]'
   ```

   The response body should match `RESPONSE_BODY`.

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
- **All-or-nothing body rewrite:** Every response on the port gets the same `RESPONSE_BODY`. There is no per-URL or per-status-code filter.
- **Content-Length recalculation:** The proxy adjusts `Content-Length` to match the new body, so clients that depend on streaming or `Transfer-Encoding: chunked` may see different behaviour than under real corruption.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 HTTP modify body experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 HTTP modify body runs but the response body is unchanged"
  mode="docs"
  fallback="The most common causes are: TARGET_SERVICE_PORT does not host an HTTP server (the proxy cannot interpose on non-HTTP); the client connects to the service over an interface other than NETWORK_INTERFACE; TLS terminates at the port (HTTPS is not supported on TARGET_SERVICE_PORT); or the in-instance proxy failed to install (set INSTALL_DEPENDENCIES=True). Verify with 'curl http://localhost:<port>/' via SSM during the fault."
/>

<Troubleshoot
  issue="EC2 HTTP modify body left orphan rules after the experiment"
  mode="docs"
  fallback="The fault was killed before cleanup ran. Connect via SSM Session Manager and remove the rules: iptables -t nat -L | grep <port>, then iptables -t nat -D PREROUTING <rule-number>. Kill the orphan proxy with pkill -f <proxy-binary>."
/>

---

## Related faults

- [EC2 HTTP latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-latency): Delay HTTP responses instead of changing the body.
- [EC2 HTTP modify header](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-modify-header): Modify HTTP headers instead of the body.
- [EC2 HTTP status code](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-status-code): Rewrite the response status code.
- [EC2 HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-reset-peer): Reset TCP connections mid-flight.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
