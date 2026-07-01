---
id: aws-ec2-instance-status-check
title: AWS EC2 Instance Status Check
sidebar_label: AWS EC2 Instance Status Check
description: Built-in Command Probe template that validates the state of one or more Amazon EC2 instances during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - aws probe
  - ec2 instance status
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - aws-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

AWS EC2 Instance Status Check is a built-in Command Probe template that validates the current state of one or more Amazon EC2 instances during a chaos experiment. It confirms that the target instances reach the expected `running` state, so you can assert that compute capacity stays healthy while a fault is injected. You select instances by instance ID or by tag, which makes the probe flexible across static fleets and dynamically scaled deployments.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Amazon EC2 API, and prints `[Pass]` when every targeted instance is in the expected state. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Verify that EC2 instances stay in the `running` state while a fault disrupts the workload.
- Validate instance state transitions after fault injection and recovery.
- Monitor instance health in multi-AZ deployments.
- Confirm that auto-scaling groups maintain a healthy set of instances.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name aws-ec2`. The utility resolves the target instances from `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` in the supplied `REGION`, calls the Amazon EC2 `DescribeInstances` API, and prints `[Pass]` when every resolved instance is in the expected state. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure with network access to the Amazon EC2 API endpoints.
- **AWS credentials:** Cloud credentials available to the chaos infrastructure, with the permissions listed below.
- **Target instances exist:** Every value in `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` resolves to an instance in `REGION`.

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
        "ec2:DescribeInstances"
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
healthchecks -name aws-ec2
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that every targeted EC2 instance is in the expected state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `EC2_INSTANCE_ID` | Comma-separated list of EC2 instance IDs to check (for example, `i-1234567890abcdef0,i-9876543210fedcba`). Provide this or `EC2_INSTANCE_TAG`. | Conditional | - |
| `EC2_INSTANCE_TAG` | Comma-separated list of EC2 instance tags to filter instances (for example, `Environment:prod,App:web`). Provide this or `EC2_INSTANCE_ID`. | Conditional | - |
| `REGION` | AWS region where the EC2 instances are located (for example, `us-east-1`, `eu-west-2`). | Yes | - |

:::info Instance selection
Provide at least one of `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG`. If you set both, `EC2_INSTANCE_ID` takes precedence and `EC2_INSTANCE_TAG` is ignored.
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
  issue="AWS EC2 Instance Status Check probe fails with an authorization or UnauthorizedOperation error"
  mode="general"
  fallback="The credentials available to the chaos infrastructure do not have the required EC2 permissions in the target region. Confirm that the IAM policy attached to the role or IRSA service account includes ec2:DescribeInstances, and that any policy condition allows the region passed in REGION."
/>

<Troubleshoot
  issue="AWS EC2 Instance Status Check probe reports the instance was not found"
  mode="general"
  fallback="The instance ID or tag did not resolve in the supplied REGION. Verify that the IDs in EC2_INSTANCE_ID are correct, that REGION exactly matches the instance region (for example us-east-1 vs us-east-2), and that the AWS account used by the credentials owns the instances."
/>

<Troubleshoot
  issue="AWS EC2 Instance Status Check probe times out before the instance reaches the expected state"
  mode="general"
  fallback="The instance did not return to the expected state within the probe timeout. Increase the run-property timeout, raise the attempt count, or confirm that the fault recovery step actually restores the instance. Inspect the chaos pod logs to see the last observed instance state."
/>

---

## Related probe templates

- [AWS ECS Service Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/aws/aws-ecs-service-status-check): Validate the desired state of an Amazon ECS service.
- [AWS Load Balancer AZ Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/aws/aws-load-balancer-az-check): Validate availability zones in an ALB or CLB.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
