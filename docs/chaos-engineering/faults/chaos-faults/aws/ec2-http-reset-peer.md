---
id: ec2-http-reset-peer
title: EC2 HTTP reset peer
sidebar_label: EC2 HTTP Reset Peer
description: Reset TCP connections to an HTTP service on a configurable port of a target EC2 instance via AWS Systems Manager so you can test how clients react when the server tears down connections mid-flight.
keywords:
  - chaos engineering
  - ec2 http reset peer
  - aws fault
  - tcp reset
  - connection chaos
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-http-reset-peer
  - /docs/chaos-engineering/chaos-faults/aws/ec2-http-reset-peer
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 HTTP reset peer is an AWS chaos fault that resets inbound TCP connections to an HTTP service on a specified port of a target EC2 instance for a configurable duration. The fault interposes a transparent HTTP proxy on the instance, scoped to `TARGET_SERVICE_PORT` and `NETWORK_INTERFACE`, and dispatches the proxy via AWS Systems Manager Run Command. The proxy answers incoming requests by sending a TCP RST instead of an HTTP response, simulating an unclean peer reset.

Use this fault to test how clients react when the server tears down connections mid-flight: do they retry safely, do they distinguish a reset from a clean failure, do they tear down keep-alive pools cleanly, does the load balancer detach the misbehaving instance?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Client retry safety:** When a connection is reset before the response arrives, does the client retry only idempotent requests, or does it retry POSTs and risk duplicate side effects?
- **Connection-pool churn:** Does the client's HTTP pool recover after every connection in it is reset within seconds?
- **Load-balancer behaviour:** Does the LB detach the instance because of failed health-check responses?
- **Observability:** Do TCP-level metrics (`tcp_reset_received`) and HTTP-level metrics (5xx rate) both show the failure?
- **Upstream propagation:** Does the reset surface to the end user as a clean error, or does it cause a cryptic upstream-level message?

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

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that interposes an HTTP proxy on `NETWORK_INTERFACE` for traffic destined to `TARGET_SERVICE_PORT`; the proxy aborts every incoming connection by sending a TCP RST instead of an HTTP response for `TOTAL_CHAOS_DURATION` seconds before being removed.

---

## Expected behavior during fault execution

- Every new TCP connection to `TARGET_SERVICE_PORT` is reset; clients see "connection reset by peer".
- Long-lived connections established before the fault are torn down by the next request that traverses the proxy.
- Clients that retry blindly may pile additional load on the instance during the fault.
- Load-balancer health checks against the port typically fail; the LB detaches the instance until checks recover.

:::info When the fault ends
The chaos pod removes the HTTP proxy and redirection rules. New connections succeed normally. Client-side connection pools should reconnect on the next request; some pool implementations need an explicit refresh.
:::

### Signals to watch

- **Client connection-reset rate:** Use a Prometheus probe on the client's `tcp_connection_reset` or HTTP `5xx` counter.
- **Load-balancer target health:** Use a Prometheus probe on `aws_applicationelb_unhealthy_host_count`.
- **Application logs:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that tails the application log via SSM and matches on `connection reset` or `EOF`.

---

## Verify the fault execution effect

While the experiment is running:

1. **Issue a request and observe the reset.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["curl -v http://localhost:<TARGET_SERVICE_PORT>/ 2>&1 | tail -10"]'
   ```

   The output should show `Connection reset by peer` or similar.

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
- **All connections affected:** Every connection to the port is reset; there is no per-URL or per-percentage filter.
- **Client-side pool recovery:** Some HTTP clients keep using a poisoned connection pool until they receive a fresh address. After the fault, force-refresh the pool from the client if needed.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 HTTP reset peer experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 HTTP reset peer runs but connections still complete normally"
  mode="docs"
  fallback="The most common causes are: TARGET_SERVICE_PORT does not host an HTTP server (the proxy cannot interpose); the client connects via a different interface than NETWORK_INTERFACE; TLS terminates at the port (HTTPS is not supported); or the in-instance proxy failed to install (set INSTALL_DEPENDENCIES=True). Verify with 'curl -v http://localhost:<port>/' via SSM during the fault."
/>

<Troubleshoot
  issue="EC2 HTTP reset peer left orphan iptables rules after the experiment"
  mode="docs"
  fallback="The fault was killed before cleanup ran. Connect via SSM Session Manager and remove the rules: iptables -t nat -L | grep <port>, then iptables -t nat -D PREROUTING <rule-number>. Kill the orphan proxy with pkill -f <proxy-binary>."
/>

---

## Related faults

- [EC2 HTTP latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-latency): Delay responses instead of resetting connections.
- [EC2 HTTP status code](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-status-code): Return a specific status code instead of resetting.
- [EC2 HTTP modify body](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-modify-body): Rewrite the response body.
- [EC2 HTTP modify header](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-modify-header): Rewrite request or response headers.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
