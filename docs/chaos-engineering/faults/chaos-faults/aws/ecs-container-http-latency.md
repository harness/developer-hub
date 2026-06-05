---
id: ecs-container-http-latency
title: ECS container HTTP latency
sidebar_label: ECS Container HTTP Latency
description: Add latency to inbound HTTP traffic on a specific port inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration so you can test how clients behave when the HTTP service responds slowly.
keywords:
  - chaos engineering
  - ecs container http latency
  - aws fault
  - ecs fault
  - http chaos
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-http-latency
  - /docs/chaos-engineering/chaos-faults/aws/ecs-container-http-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS container HTTP latency is an AWS chaos fault that adds `LATENCY` milliseconds of latency to inbound HTTP traffic on `TARGET_SERVICE_PORT` inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration. The fault interposes a transparent HTTP proxy on the container instance, scoped to the target container via ECS container metadata and dispatched via AWS Systems Manager Run Command. Unlike `ecs-container-network-latency`, this fault affects only HTTP traffic on the specified port; other traffic is untouched.

Use this fault to test how HTTP clients of an ECS service behave when the service responds slowly: whether client timeouts engage, whether circuit breakers protect downstream systems, and whether retry storms get amplified or absorbed.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Client timeout tuning:** When the service responds `LATENCY` ms slower, do client timeouts fire correctly without breaking upstream callers?
- **Retry storm risk:** Do retries amplify the latency into an outage, or does an exponential backoff calm the system?
- **Synchronous call chains:** For services with deep call graphs, does the added latency push end-to-end latency over SLO?
- **Customer experience:** Does the user-facing application surface the increased latency clearly, or does it appear to hang?
- **Downstream isolation:** Does the slow service affect dependents in unexpected ways (thread pools, connection pools, queues)?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service or cluster:** `CLUSTER_NAME` exists in `REGION` and uses the EC2 launch type.
- **Container instances are SSM-managed.**
- **ECS container metadata enabled.**
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Not supported |
| HTTP/1.1 and HTTP/2 traffic on `TARGET_SERVICE_PORT` | Supported |
| HTTPS terminated inside the container | Not supported (the proxy needs to read request and response payloads in cleartext) |
| Linux container instances | Supported |
| Windows container instances | Not supported |
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
        "ecs:DescribeClusters",
        "ecs:DescribeServices",
        "ecs:DescribeTasks",
        "ecs:ListTasks",
        "ecs:ListContainerInstances",
        "ecs:DescribeContainerInstances"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ssm:SendCommand",
        "ssm:CancelCommand",
        "ssm:GetCommandInvocation",
        "ssm:DescribeInstanceInformation"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2messages:AcknowledgeMessage",
        "ec2messages:DeleteMessage",
        "ec2messages:FailMessage",
        "ec2messages:GetEndpoint",
        "ec2messages:GetMessages",
        "ec2messages:SendReply"
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

Go to [AWS named profile for chaos](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-switch-profile) to switch between profiles inside a single credentials file.

---

## Fault tunables

Configure the following fault parameters when you add ECS container HTTP latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_NAME` | Name of the target ECS service. When set, the fault selects `TASK_REPLICA_AFFECTED_PERC` of the service's running tasks. | `""` |
| `TASK_REPLICA_ID` | ID of a specific task replica to target (overrides `SERVICE_NAME` and percentage selection). | `""` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of running tasks to affect when `SERVICE_NAME` is set. | `100` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LATENCY` | Latency to inject in milliseconds. | `2000` |
| `TARGET_SERVICE_PORT` | TCP port the affected container serves on. | `80` |
| `PROXY_PORT` | Port the chaos proxy listens on inside the container. Pick a port not used by the application. | `20000` |
| `NETWORK_INTERFACE` | Network interface inside the container on which to install the redirect rules. `auto` discovers the primary interface. | `auto` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `INSTALL_DEPENDENCIES` | Install the proxy and networking tooling on each container instance if missing. | `true` |
| `SEQUENCE` | Order in which multiple tasks are affected: `parallel` installs the proxy on all selected tasks at once; `serial` does so one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Resolves the running tasks for `SERVICE_NAME` (or the explicit `TASK_REPLICA_ID`), picks `TASK_REPLICA_AFFECTED_PERC` of them, and dispatches a transparent HTTP proxy via AWS Systems Manager Run Command into the affected container. New HTTP requests on `TARGET_SERVICE_PORT` are redirected through the proxy on `PROXY_PORT`, delayed by `LATENCY` ms, and forwarded to the application. After `TOTAL_CHAOS_DURATION` seconds, the proxy is stopped and the redirect rules are removed.

---

## Expected behavior during fault execution

- New HTTP requests on `TARGET_SERVICE_PORT` to the affected containers see a response latency of approximately `LATENCY` ms (one-way).
- TCP latency below the HTTP layer is unaffected.
- Application latency dashboards show the increase on the affected service.
- Client timeouts below `LATENCY` ms trigger; retries may follow.

:::info When the fault ends
The chaos pod stops the proxy and removes the redirect rules on each host. New HTTP requests bypass the proxy and complete normally.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **HTTP latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert percentile latency rises by approximately `LATENCY` ms during the fault.
- **Timeout failures:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on client-side timeout counters.
- **Retry counters:** Use a Prometheus probe on client-side retry counters to detect retry storms.

---

## Verify the fault execution effect

While the experiment is running, confirm HTTP latency rose and recovered:

1. **Probe the endpoint with curl.**

   ```bash
   curl -w "@curl-format.txt" -o /dev/null -s http://<service-endpoint>:<port>/healthz
   ```

   Response time should rise by approximately `LATENCY` ms during the chaos window.

2. **Inspect the redirect rules on the host (via SSM).**

   ```bash
   aws ssm send-command \
     --region <region> \
     --document-name AWS-RunShellScript \
     --instance-ids <container-instance-id> \
     --parameters 'commands=["iptables -t nat -L PREROUTING -n"]'
   ```

   You should see rules redirecting `TARGET_SERVICE_PORT` to `PROXY_PORT` during the chaos window.

3. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations --region <region> --details --filters "key=Status,value=InProgress"
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the proxy and removes the redirect rules on each host.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command and removes the proxy.
- **Manual recovery:** If the fault exits before cleanup, remove the redirect rules with `iptables -t nat -D PREROUTING ...` (via SSM) and kill the proxy process on the affected hosts.
- **Workload recovery:** Requests in flight during the chaos window may already have timed out; client code is responsible for retry.

---

## Limitations

- **EC2 launch type only.**
- **Container metadata must be enabled.**
- **SSM-managed hosts only.**
- **Linux-only.**
- **HTTPS terminated inside the container is not supported.**
- **One port per experiment:** The proxy intercepts only `TARGET_SERVICE_PORT`. To affect multiple ports, run multiple experiments.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS container HTTP latency fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ECS or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ecs:DescribeServices, ecs:DescribeTasks, ssm:SendCommand, and ssm:GetCommandInvocation."
/>

<Troubleshoot
  issue="ECS container HTTP latency reports PROXY_PORT is in use"
  mode="docs"
  fallback="Pick a different PROXY_PORT that is not used by your application or any sidecar inside the container. The default 20000 works in most environments. Verify free ports inside the container by running 'ss -ltn' via SSM on the host."
/>

<Troubleshoot
  issue="Probe shows no extra latency during the chaos window"
  mode="docs"
  fallback="The most common causes are: the request bypasses the proxy because the client connected to a different port (set TARGET_SERVICE_PORT to the actual application port); the request uses HTTPS terminated inside the container (the proxy cannot intercept TLS); the proxy could not install the iptables redirect rule (check NETWORK_INTERFACE); or the load balancer routed traffic away from the affected tasks. Inspect the chaos pod logs for proxy startup errors."
/>

<Troubleshoot
  issue="Redirect rules remain after the chaos window"
  mode="docs"
  fallback="If the cleanup SSM command failed, the iptables PREROUTING redirect rules may persist on the container instance. Send an SSM AWS-RunShellScript command to the affected container instance that flushes the iptables NAT PREROUTING chain. Be cautious if the host has other iptables rules in PREROUTING. The exact command is recorded in the chaos pod logs."
/>

---

## Related faults

- [ECS container HTTP modify body](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-http-modify-body): Modify the HTTP response body instead of delaying it.
- [ECS container HTTP status code](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-http-status-code): Return a chaos status code instead of the actual response.
- [EC2 HTTP latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-latency): HTTP latency at the EC2 host level instead of the container.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
