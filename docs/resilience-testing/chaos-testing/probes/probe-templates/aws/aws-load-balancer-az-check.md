---
id: aws-load-balancer-az-check
title: AWS Load Balancer AZ Check
sidebar_label: AWS Load Balancer AZ Check
description: Built-in Command Probe template that validates the availability of target availability zones in an ALB or CLB during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - aws probe
  - load balancer availability zone
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - aws-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

AWS Load Balancer AZ Check is a built-in Command Probe template that validates the availability of one or more target availability zones in a given Application Load Balancer (ALB) or Classic Load Balancer (CLB) during a chaos experiment. Use it to assert that load balancer zone coverage and multi-AZ redundancy hold up while a fault disrupts a zone or the network path to it.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Elastic Load Balancing API, and prints `[Pass]` when the target zones are available on the load balancer. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Verify load balancer availability zone configuration during AZ failures.
- Validate traffic distribution across availability zones.
- Monitor load balancer health during network chaos experiments.
- Confirm that multi-AZ redundancy is maintained.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name aws-lb-az`. The utility resolves the load balancer from `LOAD_BALANCER_ARN` (for an ALB) or `LOAD_BALANCER_NAME` (for a CLB) in the supplied `REGION`, calls the Elastic Load Balancing API, and prints `[Pass]` when every zone in `ZONES` is available on the load balancer. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure with network access to the Elastic Load Balancing API endpoints.
- **AWS credentials:** Cloud credentials available to the chaos infrastructure, with the permissions listed below.
- **Target load balancer exists:** The ALB referenced by `LOAD_BALANCER_ARN` or the CLB referenced by `LOAD_BALANCER_NAME` exists in `REGION`.

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
        "elasticloadbalancing:DescribeLoadBalancers"
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
healthchecks -name aws-lb-az
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that the target availability zones are configured on the load balancer.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `LOAD_BALANCER_ARN` | ARN of the ALB to check (for example, `arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-alb/1234567890abcdef`). Provide this for an ALB. | Conditional | - |
| `LOAD_BALANCER_NAME` | Name of the CLB to check (for example, `my-classic-lb`). Provide this for a CLB. | Conditional | - |
| `REGION` | AWS region where the load balancer is located (for example, `us-east-1`, `eu-west-2`). | Yes | - |
| `ZONES` | Comma-separated list of availability zones to check (for example, `us-east-1a,us-east-1b,us-east-1c`). | Yes | - |

:::info Load balancer selection
Provide `LOAD_BALANCER_ARN` for an Application Load Balancer or `LOAD_BALANCER_NAME` for a Classic Load Balancer.
:::

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
  issue="AWS Load Balancer AZ Check probe fails with an authorization error"
  mode="general"
  fallback="The credentials available to the chaos infrastructure do not have the required Elastic Load Balancing permissions in the target region. Confirm that the IAM policy attached to the role or IRSA service account includes elasticloadbalancing:DescribeLoadBalancers, and that any policy condition allows the region passed in REGION."
/>

<Troubleshoot
  issue="AWS Load Balancer AZ Check probe cannot find the load balancer"
  mode="general"
  fallback="The load balancer did not resolve in the supplied REGION. For an ALB, confirm that LOAD_BALANCER_ARN is correct and that you did not also set LOAD_BALANCER_NAME. For a CLB, confirm that LOAD_BALANCER_NAME is correct. Verify that REGION matches the load balancer region."
/>

<Troubleshoot
  issue="AWS Load Balancer AZ Check probe reports a zone is unavailable"
  mode="general"
  fallback="One or more zones listed in ZONES are not enabled on the load balancer, or were removed by the injected fault. Confirm that the values in ZONES exactly match the availability zones attached to the load balancer, and that the experiment is expected to keep those zones enabled at the probe's execution phase."
/>

---

## Related probe templates

- [AWS EC2 Instance Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/aws/aws-ec2-instance-status-check): Validate the state of EC2 instances.
- [AWS Security Group Rule Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/aws/aws-security-group-rule-check): Validate that security groups have rules configured.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
