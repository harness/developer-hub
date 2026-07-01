---
id: aws-ecs-service-status-check
title: AWS ECS Service Status Check
sidebar_label: AWS ECS Service Status Check
description: Built-in Command Probe template that validates whether an Amazon ECS service has reached its desired state during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - aws probe
  - ecs service status
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - aws-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

AWS ECS Service Status Check is a built-in Command Probe template that validates the status of one or more Amazon ECS services during a chaos experiment. It confirms that each service has reached its desired state, where the running task count matches the desired task count, within the configured timeout. Use it to assert that ECS services stay healthy and self-heal while a fault disrupts the cluster.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Amazon ECS API, and prints `[Pass]` when every targeted service has reached its desired state. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Confirm that ECS services maintain the desired task count during failures.
- Validate service auto-scaling behavior during load changes.
- Monitor service health during container chaos experiments.
- Verify service deployment and rollback operations.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name aws-ecs`. The utility resolves the services named in `SERVICE_NAMES` within the `CLUSTER_NAME` cluster and the supplied `REGION`, calls the Amazon ECS API, and prints `[Pass]` when every service reaches its desired state within `STATUS_CHECK_TIMEOUT`. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure with network access to the Amazon ECS API endpoints.
- **AWS credentials:** Cloud credentials available to the chaos infrastructure, with the permissions listed below.
- **Target services exist:** The cluster named in `CLUSTER_NAME` and the services in `SERVICE_NAMES` exist in `REGION`.

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
        "ecs:DescribeServices"
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
healthchecks -name aws-ecs
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that every targeted ECS service has reached its desired state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `CLUSTER_NAME` | Name of the ECS cluster that contains the service (for example, `my-ecs-cluster`). | Yes | - |
| `SERVICE_NAMES` | Comma-separated list of ECS service names to check (for example, `web-service,api-service`). | Yes | - |
| `REGION` | AWS region where the ECS cluster is located (for example, `us-east-1`, `eu-west-2`). | Yes | - |
| `STATUS_CHECK_TIMEOUT` | Maximum time in seconds to wait for the service to reach the desired state. | No | `180` |
| `STATUS_CHECK_DELAY` | Delay in seconds between status checks. | No | `2` |

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
  issue="AWS ECS Service Status Check probe fails with an authorization error"
  mode="general"
  fallback="The credentials available to the chaos infrastructure do not have the required ECS permissions in the target region. Confirm that the IAM policy attached to the role or IRSA service account includes ecs:DescribeServices, and that any policy condition allows the region passed in REGION."
/>

<Troubleshoot
  issue="AWS ECS Service Status Check probe cannot find the cluster or service"
  mode="general"
  fallback="The cluster or service did not resolve in the supplied REGION. Verify that CLUSTER_NAME matches the cluster exactly, that every name in SERVICE_NAMES exists in that cluster, and that REGION matches the cluster region."
/>

<Troubleshoot
  issue="AWS ECS Service Status Check probe times out before the service reaches the desired state"
  mode="general"
  fallback="The running task count did not match the desired count within STATUS_CHECK_TIMEOUT. Increase STATUS_CHECK_TIMEOUT and the run-property timeout, confirm that the service has enough capacity to launch replacement tasks, and check the ECS service events for task placement failures."
/>

---

## Related probe templates

- [AWS EC2 Instance Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/aws/aws-ec2-instance-status-check): Validate the state of EC2 instances.
- [AWS Lambda Function Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/aws/aws-lambda-function-status-check): Validate that a Lambda function is active.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
