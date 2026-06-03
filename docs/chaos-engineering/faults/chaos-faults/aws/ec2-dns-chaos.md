---
id: ec2-dns-chaos
title: EC2 DNS chaos
sidebar_label: EC2 DNS Chaos
description: Block or redirect DNS resolution for selected hostnames on a target EC2 instance via AWS Systems Manager so you can test how the workload reacts when a dependency cannot be resolved.
keywords:
  - chaos engineering
  - ec2 dns chaos
  - aws fault
  - dns failure
  - resolution chaos
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-dns-chaos
  - /docs/chaos-engineering/chaos-faults/aws/ec2-dns-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 DNS chaos is an AWS chaos fault that fails DNS resolution for a configurable list of hostnames on a target EC2 instance for a configurable duration. The fault dispatches the in-instance DNS server via AWS Systems Manager Run Command, listens on a configurable port, and selectively rejects queries for the targeted hostnames while forwarding the rest to the configured upstream DNS server.

Use this fault to test how a workload reacts when a critical dependency cannot be resolved: does it retry endlessly, does it fall back to a cached endpoint, does the application crash on the first lookup failure?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Dependency resolution failure:** When `api.partner.example` cannot be resolved, does the application surface a clean error or hang forever?
- **DNS retry semantics:** When resolution fails, does the resolver back off correctly, or does it amplify load on the upstream DNS server?
- **Cached endpoint reuse:** Does the application keep using a previously resolved IP, or does every request re-resolve?
- **Multi-target outage:** When several hostnames fail at once (multiple `TARGET_HOSTNAMES`), does the application degrade gracefully?
- **DNS observability:** Does the failure show up in DNS-related metrics and alerts with enough context to drive a runbook?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target instance is reachable via SSM:** The instance has the SSM Agent running and an instance profile with `AmazonSSMManagedInstanceCore`.
- **Selector provided:** Either `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` is set.
- **DNS server can bind locally:** `PORT` (default `54`) is free on the target. The fault redirects the system resolver to this port for the fault duration.
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
| Windows instances | Not supported (Linux-only DNS interposer) |

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
| `PORT` | Port the in-instance DNS server listens on. | `54` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_HOSTNAMES` | Comma-separated list of hostnames whose resolution should fail. Leave empty to fail all queries. | `""` |
| `MATCH_SCHEME` | How `TARGET_HOSTNAMES` is matched: `exact` (full hostname match) or `substring` (any hostname containing the value). | `substring` |
| `UPSTREAM_SERVER` | DNS server to forward non-targeted queries to. Defaults to the instance's existing resolver if empty. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances to target (only with `EC2_INSTANCE_TAG`). `0` targets one instance. | `0` |
| `INSTALL_DEPENDENCIES` | Install dependencies inside the target instance if missing. Set to `False` to skip. | `True` |
| `PROXY` | HTTP/HTTPS proxy used by the in-instance installer (for example `https_proxy=http://proxy.server:3128`). | `""` |
| `SEQUENCE` | Order in which multiple instances are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::warning Match scheme matters
`MATCH_SCHEME=substring` matches any hostname containing the value, which can be over-broad (for example, `api` matches `api.example.com` *and* `internal-api.example.com`). Use `MATCH_SCHEME=exact` for predictable blast radius.
:::

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that starts an in-instance DNS server on `PORT` and redirects the system resolver to it; the server fails queries for `TARGET_HOSTNAMES` (matching by `MATCH_SCHEME`) and forwards others to `UPSTREAM_SERVER` for `TOTAL_CHAOS_DURATION` seconds before reverting the resolver.

---

## Expected behavior during fault execution

- `nslookup <target-host>` and similar tools return `NXDOMAIN` or `SERVFAIL` for hostnames in `TARGET_HOSTNAMES`.
- Other hostnames resolve normally via `UPSTREAM_SERVER`.
- Applications that resolve once and cache the IP continue working until the cache expires; long-lived processes that re-resolve hit the failure immediately.
- Applications that retry indefinitely on DNS failure may exhaust threads or sockets.
- DNS-aware caches (Java's `networkaddress.cache.ttl`, glibc's `nscd`) influence how quickly the failure surfaces.

:::info When the fault ends
The chaos pod stops the in-instance DNS server and restores the original resolver. Queries resume normally within seconds; cached failures continue to surface until their TTL expires.
:::

### Signals to watch

- **Resolution failures from the target:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `dig <target-host>` via SSM during the fault.
- **Application error rate:** Use a Prometheus probe on the application's DNS or upstream-error counters.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against an endpoint that depends on the failing hostname.

---

## Verify the fault execution effect

While the experiment is running:

1. **Confirm resolution fails for the target hostname.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["dig +short <target-host>"]'
   ```

2. **Confirm resolution still works for other hostnames.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["dig +short example.com"]'
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the in-instance DNS server and restores the original resolver.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the in-flight SSM command and runs cleanup.
- **Manual cleanup:** If the resolver is left pointed at the local server, restore `/etc/resolv.conf` (or the systemd-resolved config) and stop the local DNS process via SSM.

---

## Limitations

- **Linux-only payload:** This fault runs on Linux instances.
- **SSM Agent required:** Instances without the SSM Agent online cannot be targeted.
- **Port conflict:** `PORT=54` must be free on the target. Change `PORT` if another service binds to it.
- **DNS caches outside the fault scope:** Application-level DNS caches (JVM `InetAddress` cache, glibc `nscd`) survive the fault. They may continue returning the cached address until the cache TTL expires.
- **Substring matching is broad:** `MATCH_SCHEME=substring` can match unintended hostnames. Use `exact` for predictable scope.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 DNS chaos experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 DNS chaos runs but the application still resolves the target hostname"
  mode="docs"
  fallback="The most common causes are: the application caches DNS results (JVM InetAddress cache, glibc nscd) and is using a stale entry; MATCH_SCHEME is exact but the application appends a search domain (for example api becomes api.region.compute.internal); or the application uses a custom DNS resolver that bypasses the system resolver. Verify with 'dig +short <hostname>' via SSM during the fault, and either set MATCH_SCHEME=substring, lower the application's DNS TTL, or pass the full FQDN in TARGET_HOSTNAMES."
/>

<Troubleshoot
  issue="EC2 DNS chaos fails to start because PORT is in use"
  mode="docs"
  fallback="Another process is bound to PORT (default 54). Change PORT to an unused TCP/UDP port (for example 5354) and rerun. Confirm with 'ss -ulnp | grep <port>' via SSM."
/>

---

## Related faults

- [EC2 network latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-latency): Add latency to traffic instead of failing DNS resolution.
- [EC2 network loss](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-loss): Drop packets instead of failing DNS resolution.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
