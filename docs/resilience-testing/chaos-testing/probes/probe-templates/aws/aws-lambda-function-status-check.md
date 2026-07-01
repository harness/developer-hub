---
id: aws-lambda-function-status-check
title: AWS Lambda Function Status Check
sidebar_label: AWS Lambda Function Status Check
description: Built-in Command Probe template that validates whether an AWS Lambda function exists and is in the Active state during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - aws probe
  - lambda function status
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - aws-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

AWS Lambda Function Status Check is a built-in Command Probe template that validates whether an AWS Lambda function exists and is in the `Active` state during a chaos experiment. Use it to assert that serverless functions stay available and invocable while a fault disrupts your application.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the AWS Lambda API, and prints `[Pass]` when the function is in the `Active` state. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Verify that Lambda functions stay active during chaos experiments.
- Validate function availability after configuration changes.
- Monitor serverless application health and readiness.
- Confirm that functions remain deployable and invocable.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name lambda-update-function`. The utility resolves the function named in `FUNCTION_NAME` in the supplied `REGION`, calls the AWS Lambda API, and prints `[Pass]` when the function exists and is in the `Active` state. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure with network access to the AWS Lambda API endpoints.
- **AWS credentials:** Cloud credentials available to the chaos infrastructure, with the permissions listed below.
- **Target function exists:** The function named in `FUNCTION_NAME` exists in `REGION`.

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
        "lambda:GetFunction"
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
healthchecks -name lambda-update-function
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that the Lambda function is in the `Active` state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `FUNCTION_NAME` | Name of the Lambda function to check (for example, `my-lambda-function`). | Yes | - |
| `REGION` | AWS region where the Lambda function is located (for example, `us-east-1`). | Yes | - |

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
  issue="AWS Lambda Function Status Check probe fails with an authorization error"
  mode="general"
  fallback="The credentials available to the chaos infrastructure do not have the required Lambda permissions in the target region. Confirm that the IAM policy attached to the role or IRSA service account includes lambda:GetFunction, and that any policy condition allows the region passed in REGION."
/>

<Troubleshoot
  issue="AWS Lambda Function Status Check probe reports the function was not found"
  mode="general"
  fallback="The function did not resolve in the supplied REGION. Verify that FUNCTION_NAME matches the function name exactly, that REGION matches the function region, and that the AWS account used by the credentials owns the function."
/>

<Troubleshoot
  issue="AWS Lambda Function Status Check probe fails because the function is not Active"
  mode="general"
  fallback="The function exists but is in a Pending or Failed state, which can happen during configuration updates or while VPC-attached functions provision elastic network interfaces. Increase the run-property timeout and attempt count so the probe waits for the function to return to Active, and review the function's last update status in the AWS console."
/>

---

## Related probe templates

- [AWS ECS Service Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/aws/aws-ecs-service-status-check): Validate the desired state of an Amazon ECS service.
- [AWS EC2 Instance Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/aws/aws-ec2-instance-status-check): Validate the state of EC2 instances.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
