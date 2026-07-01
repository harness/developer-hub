---
id: aws-security-group-rule-check
title: AWS Security Group Rule Check
sidebar_label: AWS Security Group Rule Check
description: Built-in Command Probe template that validates whether AWS security groups have rules configured during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - aws probe
  - security group rules
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - aws-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

AWS Security Group Rule Check is a built-in Command Probe template that validates whether one or more AWS security groups have rules configured during a chaos experiment. Use it to confirm that network access policy stays intact, for example after a fault that modifies or restricts security group rules.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Amazon EC2 security group APIs, and prints `[Pass]` when the targeted security groups have rules of the requested type configured. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Validate that security group configurations stay intact during chaos.
- Verify that network access rules are configured as expected.
- Monitor security posture during infrastructure changes.
- Confirm that security groups are not left without rules.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name aws-resource-access-restrict`. The utility resolves the security groups listed in `SECURITY_GROUP_IDS` in the supplied `REGION`, calls the Amazon EC2 security group APIs, and prints `[Pass]` when each group has rules of the `RULE_TYPE` configured. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure with network access to the Amazon EC2 API endpoints.
- **AWS credentials:** Cloud credentials available to the chaos infrastructure, with the permissions listed below.
- **Target security groups exist:** Every ID in `SECURITY_GROUP_IDS` exists in `REGION`.

---

## Permissions required

The credentials used by the probe need the following AWS actions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSecurityGroupRules"
      ],
      "Resource": "*"
    }
  ]
}
```

The probe uses the AWS credentials available to your chaos infrastructure. Go to [AWS IAM integration](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-iam-integration) to set up access through IAM Roles for Service Accounts (IRSA), or go to [common policy for all AWS faults](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to apply a single superset policy.

---

## Probe properties

### Command

```bash
healthchecks -name aws-resource-access-restrict
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that the targeted security groups have rules of the requested type configured.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SECURITY_GROUP_IDS` | Comma-separated list of security group IDs to check (for example, `sg-12345678,sg-87654321`). | Yes | - |
| `RULE_TYPE` | Type of rule to check. Accepted values are `ingress` or `egress`. | No | `ingress` |
| `REGION` | AWS region where the security groups are located (for example, `us-east-1`, `eu-west-2`). | Yes | - |

---

## Run properties

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `timeout` | Maximum time to wait for the probe to complete (for example, `30s`, `1m`, `5m`). | String | `300s` |
| `interval` | Time between probe executions (for example, `5s`, `30s`, `1m`). | String | `10s` |
| `attempt` | Number of retry attempts before the probe is marked as failed. | Integer | `1` |
| `pollingInterval` | Time between retry attempts (for example, `1s`, `5s`, `10s`). | String | - |
| `initialDelay` | Initial delay before the probe starts (for example, `0s`, `10s`, `30s`). | String | - |
| `stopOnFailure` | Stop the experiment if the probe fails. | Boolean | `false` |
| `verbosity` | Log verbosity level (`info`, `debug`, `trace`). | String | - |

---

## Troubleshooting

<Troubleshoot
  issue="AWS Security Group Rule Check probe fails with an authorization error"
  mode="general"
  fallback="The credentials available to the chaos infrastructure do not have the required EC2 permissions in the target region. Confirm that the IAM policy attached to the role or IRSA service account includes ec2:DescribeSecurityGroups and ec2:DescribeSecurityGroupRules, and that any policy condition allows the region passed in REGION."
/>

<Troubleshoot
  issue="AWS Security Group Rule Check probe cannot find a security group"
  mode="general"
  fallback="One or more IDs in SECURITY_GROUP_IDS did not resolve in the supplied REGION. Verify that the security group IDs are correct, that REGION matches the region that owns the security groups, and that the AWS account used by the credentials owns them."
/>

<Troubleshoot
  issue="AWS Security Group Rule Check probe fails because no rules were found"
  mode="general"
  fallback="The targeted security groups have no rules of the requested RULE_TYPE, which can be the intended outcome of a fault that restricts access. Confirm whether RULE_TYPE (ingress or egress) matches the rules you expect to validate, and whether the experiment is supposed to leave those rules in place at the probe's execution phase."
/>

---

## Related probe templates

- [AWS Load Balancer AZ Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/aws/aws-load-balancer-az-check): Validate availability zones in an ALB or CLB.
- [AWS EC2 Instance Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/aws/aws-ec2-instance-status-check): Validate the state of EC2 instances.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
