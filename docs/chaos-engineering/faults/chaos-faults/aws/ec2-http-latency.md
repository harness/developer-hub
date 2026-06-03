---
id: ec2-http-latency
title: EC2 HTTP latency
sidebar_label: EC2 HTTP Latency
description: Add latency to inbound HTTP traffic on a configurable port of a target EC2 instance via AWS Systems Manager so you can test how clients react when an HTTP service responds slowly.
keywords:
  - chaos engineering
  - ec2 http latency
  - aws fault
  - http chaos
  - latency injection
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-http-latency
  - /docs/chaos-engineering/chaos-faults/aws/ec2-http-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 HTTP latency is an AWS chaos fault that adds a configurable amount of latency to inbound HTTP traffic on a specified port of a target EC2 instance for a configurable duration. The fault interposes a transparent HTTP proxy on the instance, scoped to `TARGET_SERVICE_PORT` and `NETWORK_INTERFACE`, and dispatches the proxy via AWS Systems Manager Run Command. Unlike `ec2-network-latency`, this fault affects only HTTP traffic on a specific port, leaving other traffic untouched.

Use this fault to test how clients of an HTTP service react when responses become slow: do retries pile on, do connection pools exhaust, do callers honour timeouts, does the service surface the degradation in metrics?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Client timeout correctness:** When responses are delayed by 2-5 seconds, do clients abort at their configured timeout instead of waiting forever?
- **Connection-pool capacity:** Does the client-side connection pool absorb the added latency, or does it exhaust and block all callers?
- **Retry storms:** Do retries with backoff prevent storms, or do they amplify load on a slow service?
- **Load-balancer behaviour:** Does the load balancer remove the slow instance from rotation based on response-time-based health checks?
- **End-to-end SLO impact:** When one service slows down by 2 seconds, how much does end-to-end latency rise across the call graph?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target instance is reachable via SSM:** The instance has the SSM Agent running and an instance profile with `AmazonSSMManagedInstanceCore`.
- **Selector provided:** Either `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` is set.
- **HTTP service runs on TARGET_SERVICE_PORT:** A plaintext HTTP service is listening on `TARGET_SERVICE_PORT` (the proxy operates on HTTP; for HTTPS, terminate TLS at a layer in front of the service).
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
| `LATENCY` | Latency to add to HTTP responses (in milliseconds). | `2000` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_INTERFACE` | Network interface where the HTTP proxy intercepts traffic. | `eth0` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances to target (only with `EC2_INSTANCE_TAG`). `0` targets one instance. | `0` |
| `INSTALL_DEPENDENCIES` | Install the in-instance HTTP proxy if missing. Set to `False` to skip. | `True` |
| `PROXY` | HTTP/HTTPS proxy used by the in-instance installer (for example `https_proxy=http://proxy.server:3128`). | `""` |
| `SEQUENCE` | Order in which multiple instances are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::warning Use a non-production port if possible
The HTTP proxy needs to interpose on `TARGET_SERVICE_PORT`. On most production hosts you cannot bind the same port twice, so the fault uses traffic redirection. If your service binds with `SO_REUSEPORT` or unusual socket options, behaviour may differ from a vanilla setup.
:::

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that interposes an HTTP proxy on `NETWORK_INTERFACE` for traffic destined to `TARGET_SERVICE_PORT`; the proxy delays every HTTP response by `LATENCY` milliseconds for `TOTAL_CHAOS_DURATION` seconds before being removed.

---

## Expected behavior during fault execution

- HTTP responses from the targeted service on `TARGET_SERVICE_PORT` are delayed by approximately `LATENCY` milliseconds.
- Other traffic on the instance (other ports, non-HTTP traffic, traffic on other interfaces) is unaffected.
- Clients with timeouts shorter than `LATENCY` abort and see timeout errors.
- Clients with timeouts longer than `LATENCY` succeed but report inflated latency.
- Load balancers performing slow-start or response-time-based health checks may detach the instance.

:::info When the fault ends
The chaos pod removes the HTTP proxy and traffic-redirection rules. Latency returns to baseline immediately. Connections still in flight at fault end complete with the added latency they accumulated.
:::

### Signals to watch

- **End-to-end response time:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the target endpoint.
- **Application-side request latency:** Use a Prometheus probe on the application's HTTP request-duration histograms.
- **Load-balancer health:** Use a Prometheus probe on `aws_applicationelb_target_response_time_average` to confirm the load balancer observed the slowdown.

---

## Verify the fault execution effect

While the experiment is running:

1. **Issue HTTP requests from the instance.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["curl -s -o /dev/null -w \"%{time_total}\\n\" http://localhost:<TARGET_SERVICE_PORT>/healthz"]'
   ```

   The reported time should be close to `LATENCY` divided by 1000.

2. **Confirm other ports are unaffected.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["curl -s -o /dev/null -w \"%{time_total}\\n\" http://localhost:<other-port>/"]'
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the HTTP proxy and removes the redirection rules.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the in-flight SSM command and runs cleanup.
- **Manual cleanup:** If the proxy is left running, kill it via SSM Session Manager and remove any installed iptables rules.

---

## Limitations

- **HTTP only (no HTTPS):** The proxy operates on plaintext HTTP. If TLS terminates at the target port, the fault cannot inject latency. Move TLS termination upstream (load balancer, sidecar) before using this fault.
- **Linux-only payload:** This fault runs on Linux instances.
- **SSM Agent required:** Instances without the SSM Agent online cannot be targeted.
- **Single-port scope:** One fault instance affects one port. Run multiple faults in parallel to affect multiple ports.
- **HTTP/2 and gRPC:** Behaviour with multiplexed protocols may differ from HTTP/1.1; validate before relying on this fault for HTTP/2 services.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 HTTP latency experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 HTTP latency runs but client response time does not change"
  mode="docs"
  fallback="The most common causes are: the in-instance proxy failed to install (set INSTALL_DEPENDENCIES=True and check egress, or use PROXY); TARGET_SERVICE_PORT does not host an HTTP server (the proxy cannot interpose on a non-HTTP service); the client connects directly to the service IP bypassing the rules; or TLS terminates at the port (HTTPS is not supported on TARGET_SERVICE_PORT). Verify with curl --max-time 30 -w '%{time_total}\\n' http://localhost:<port>/ via SSM during the fault."
/>

<Troubleshoot
  issue="EC2 HTTP latency leaves orphan iptables rules after the experiment"
  mode="docs"
  fallback="The fault was killed before cleanup ran. Connect via SSM Session Manager and remove the rules: iptables -t nat -L | grep <port> to identify them, then iptables -t nat -D PREROUTING <rule-number>. Also kill any orphan proxy process: pkill -f <proxy-binary>."
/>

---

## Related faults

- [EC2 HTTP status code](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-status-code): Rewrite HTTP responses to return a specific status code.
- [EC2 HTTP modify body](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-modify-body): Modify the body of HTTP responses.
- [EC2 HTTP modify header](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-modify-header): Modify HTTP request or response headers.
- [EC2 HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-reset-peer): Reset TCP connections mid-flight.
- [EC2 network latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-latency): Add latency to all outbound traffic, not just HTTP.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
