---
id: ecs-network-restrict
title: ECS network restrict
sidebar_label: ECS Network Restrict
description: Add or remove a network rule (ingress or egress, by IP and port range) for the security group of one or more ECS services for a configurable duration so you can test how the workload behaves when network access is partially restricted.
keywords:
  - chaos engineering
  - ecs network restrict
  - aws fault
  - ecs fault
  - security group
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-network-restrict
  - /docs/chaos-engineering/chaos-faults/aws/ecs-network-restrict
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS network restrict is an AWS chaos fault that modifies the security group of one or more ECS services to add or remove a network rule for a configurable duration. The rule is scoped to an `IP_ADDRESS` (or CIDR), `PROTOCOL`, and `FROM_PORT`/`TO_PORT` range, and applied either as `inbound` or `outbound`. When the fault ends, the rule is reversed so the security group returns to its pre-fault state.

Use this fault to test how an ECS workload behaves when network access is partially restricted: when egress to a critical dependency is blocked, when inbound traffic from a specific peer is denied, or when a security-group misconfiguration takes a service partly off the network. It is also useful to validate observability and runbooks around "service unreachable" alarms.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Dependency unavailability:** When egress to a database, cache, or third-party API is blocked, does the application fail fast with a clear error, or does it hang and burn threads?
- **Inbound peer restriction:** When inbound traffic from a specific peer (a known canary or a sibling service) is blocked, do retries and circuit breakers behave correctly?
- **Security-group misconfiguration:** Does monitoring detect a "service unreachable" condition fast enough, and does the runbook to find and fix the offending rule still work?
- **Cross-AZ traffic restriction:** When the rule blocks an entire CIDR (for example a peer subnet), do AZ-local replicas continue to serve, and does traffic reroute appropriately?
- **Removed default rule:** When an essential rule (for example outbound 443) is temporarily removed, does the workload's behaviour confirm the rule is required (so it is documented), or does the workload still work (indicating the rule is unnecessary)?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS services:** Every service named in `SERVICE_NAMES` exists in `CLUSTER_NAME` within `REGION` and uses `awsvpc` networking (so it has its own ENI and security group). The fault is meaningful only when the service has at least one security group attached.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.
- **No essential cross-account rule:** The IP, port, and direction you choose to chaos must not be required by the chaos infrastructure to reach the service (otherwise verification is impossible).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type with `awsvpc` networking | Supported |
| Amazon ECS on Fargate launch type | Supported (`awsvpc` is the only mode on Fargate) |
| Services without `awsvpc` (`bridge`/`host`/`none`) | Not supported (no per-task ENI / security group) |
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
        "ecs:DescribeServices",
        "ecs:DescribeTasks",
        "ecs:ListTasks"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeNetworkInterfaces",
        "ec2:AuthorizeSecurityGroupIngress",
        "ec2:AuthorizeSecurityGroupEgress",
        "ec2:RevokeSecurityGroupIngress",
        "ec2:RevokeSecurityGroupEgress"
      ],
      "Resource": "*"
    }
  ]
}
```

- `ecs:*` actions are used to resolve services and tasks to the underlying ENI and security group.
- `ec2:DescribeSecurityGroups` and `ec2:DescribeNetworkInterfaces` are used to inspect the current rule set.
- `ec2:AuthorizeSecurityGroup*` and `ec2:RevokeSecurityGroup*` drive the fault (the pair used depends on `RULE_TYPE` and `RULE_MODE`).

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

Configure the following fault parameters when you add ECS network restrict to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `SERVICE_NAMES` | Comma-separated list of ECS service names to apply the rule change to. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Rule parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `IP_ADDRESS` | Target IP address or CIDR for the rule (for example `203.0.113.10/32` or `10.0.0.0/16`). | `""` |
| `PROTOCOL` | Network protocol the rule applies to (`tcp`, `udp`, or `icmp`). | `tcp` |
| `FROM_PORT` | Lower bound of the port range. | `80` |
| `TO_PORT` | Upper bound of the port range. | `80` |
| `RULE_TYPE` | Direction the rule applies to: `inbound` (ingress) or `outbound` (egress). | `outbound` |
| `RULE_MODE` | Whether to add or remove the rule for the duration of the fault: `add` introduces the rule, `remove` removes an existing matching rule. | `remove` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The rule change is held for this period before being reversed. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple services are mutated: `parallel` applies the rule to all security groups at once; `serial` applies one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Resolves the security groups attached to every service in `SERVICE_NAMES`, calls `AuthorizeSecurityGroup*` (when `RULE_MODE=add`) or `RevokeSecurityGroup*` (when `RULE_MODE=remove`) with the supplied IP, protocol, and port range, waits for `TOTAL_CHAOS_DURATION` seconds, then reverses the call so the original rule set is restored.

---

## Expected behavior during fault execution

- The security group's rule set changes immediately; new traffic that matches the changed rule is allowed or blocked from that moment onward.
- Existing connections are not torn down by the security-group change (security groups are stateful and existing flows are tracked). Only new flows after the change are affected.
- Application logs show connection-refused, connection-reset, or timeout errors for new connections in the affected direction and port range.
- CloudWatch VPC flow logs (if enabled) record `REJECT` actions for the dropped flows.

:::info When the fault ends
The chaos pod reverses the original mutation. If a rule was added during the fault, it is now revoked; if a rule was removed, it is re-authorized with the exact same protocol, port range, and IP/CIDR. The security group returns to its pre-fault state.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application reachability:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `curl` or `nc` from a peer in `IP_ADDRESS` to the service's port and asserts the call fails during the fault.
- **Application errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application-layer error counters (HTTP 5xx, gRPC `UNAVAILABLE`, custom retry counters) to confirm the workload reacted appropriately.
- **VPC flow logs:** Use a command probe that queries CloudWatch Logs Insights against the VPC flow log group for `REJECT` records on the chosen IP and port.
- **Security group rule presence:** Use a command probe that runs `aws ec2 describe-security-groups` and asserts the rule is present (`add`) or absent (`remove`) during the chaos window.

---

## Verify the fault execution effect

While the experiment is running, confirm the rule is applied and then reversed:

1. **Inspect the security group rule set.**

   ```bash
   aws ec2 describe-security-groups \
     --region <region> \
     --group-ids <sg-id> \
     --query "SecurityGroups[].IpPermissions"
   ```

   The output should change as expected during the chaos window and return to baseline afterwards.

2. **Probe reachability from a peer.**

   ```bash
   nc -vz -w 5 <service-endpoint> <port>
   ```

   Run this from a peer that matches `IP_ADDRESS`; expect the connection to fail when `RULE_MODE=remove` (or to succeed in a controlled way when `RULE_MODE=add` and the original rule denied the traffic).

3. **Inspect application logs.**

   ECS task logs in CloudWatch should show connection failures only during the chaos window and recover when the rule is reversed.

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls the inverse `AuthorizeSecurityGroup*` or `RevokeSecurityGroup*` to return the security group to its pre-fault state.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same reversal.
- **Manual recovery:** If the fault exits before reversal (for example a permission error mid-experiment), inspect the security group and reverse the change manually. The original rule's protocol, port range, and IP/CIDR are echoed in the chaos pod logs.
- **Stateful connections:** Already-established TCP connections survive the rule change because security groups are stateful; only the application's reaction to lost service is affected.

---

## Limitations

- **No effect on already-open connections:** Security groups are stateful; the rule change affects only new flows. To break existing connections, combine with a network-loss fault.
- **`bridge` / `host` networking is unsupported:** The fault requires `awsvpc` so that each task has its own ENI and security group.
- **NACLs are not modified:** This fault changes security groups only. Network ACLs (which are stateless and operate at the subnet level) are unaffected.
- **Rule must be reversible:** When `RULE_MODE=remove`, the rule must exist at the start of the experiment. When `RULE_MODE=add`, the rule must not already exist (otherwise the API call fails).
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS network restrict experiment fails with InvalidParameterValue duplicate rule"
  mode="docs"
  fallback="When RULE_MODE=add and the chosen IP/protocol/port range already matches an existing rule, the AuthorizeSecurityGroup* call returns a duplicate-rule error and the fault fails. Either pick a different IP/port combination that is not already authorized, or use RULE_MODE=remove against the existing rule. You can inspect the current rules with 'aws ec2 describe-security-groups'."
/>

<Troubleshoot
  issue="ECS network restrict reports rule does not exist"
  mode="docs"
  fallback="When RULE_MODE=remove and no existing rule matches the exact IP, protocol, and port range, the RevokeSecurityGroup* call fails. The fault matches on exact tuple, so 'tcp 80-80 from 10.0.0.0/16' and 'tcp 80-80 from 10.0.0.0/24' are different rules. Inspect the current rule set with 'aws ec2 describe-security-groups' and supply matching values."
/>

<Troubleshoot
  issue="Application keeps serving traffic during the chaos window"
  mode="docs"
  fallback="The most common causes are: existing connections were already open and security groups are stateful (no impact on existing flows); the application has long-lived keep-alive connections that span the chaos window; the traffic is reaching the service via a different security group (multiple SGs can be attached to the ENI); or the destination IP does not match IP_ADDRESS exactly. Combine with a connection-drain fault or pick a stricter rule scope."
/>

<Troubleshoot
  issue="Security group rule is not restored after the chaos window"
  mode="docs"
  fallback="The fault reverses the rule change automatically. If the security group is in an unexpected state, the most common cause is a permission failure on the reverse call (revoke when the chaos call added, or authorize when the chaos call removed). Inspect the chaos pod logs for the failed call and apply the inverse change manually. The chaos pod logs include the exact ip-permissions payload."
/>

---

## Related faults

- [EC2 network latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-latency): Inject latency rather than restrict a rule.
- [EC2 network loss](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-loss): Drop packets to specific destinations.
- [Resource access restrict](/docs/chaos-engineering/faults/chaos-faults/aws/resource-access-restrict): Restrict IAM access to a resource rather than network access.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
