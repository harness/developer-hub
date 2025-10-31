---
id: aws-ec2-instance-status-check
---

# AWS EC2 Instance Status Check {#introduction}

Validates the current state of an EC2 instance. This probe checks if the specified EC2 instance(s) are in the expected state. At least one of `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` must be provided.

## Infrastructure type

- **Kubernetes**

## Use cases

AWS EC2 Instance Status Check probe helps you:
- Verify EC2 instances remain running during chaos experiments
- Validate instance state transitions after fault injection
- Monitor instance health in multi-AZ deployments
- Ensure auto-scaling groups maintain healthy instances

---

## Overview

This probe uses the AWS CLI to query EC2 instance status and validates that instances are in the expected state. It supports filtering by instance ID or tags, making it flexible for various deployment scenarios.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- AWS credentials configured with appropriate IAM permissions:
  - `ec2:DescribeInstances`
  - `ec2:DescribeInstanceStatus`
- Network connectivity to AWS API endpoints
- Target EC2 instances should be accessible from the chaos infrastructure

---

## Probe properties

### Command
```
healthchecks -name aws-ec2
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating all specified EC2 instances are in the expected state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `EC2_INSTANCE_ID` | Comma-separated list of EC2 instance IDs to check (e.g., `i-1234567890abcdef0,i-9876543210fedcba`). Either this or `EC2_INSTANCE_TAG` must be provided. | No* | - |
| `EC2_INSTANCE_TAG` | Comma-separated list of EC2 instance tags to filter instances (e.g., `Environment:prod,App:web`). Either this or `EC2_INSTANCE_ID` must be provided. | No* | - |
| `REGION` | AWS region where the EC2 instances are located (e.g., `us-east-1`, `eu-west-2`). | Yes | - |

**Note:** At least one of `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` must be provided.

---

## Run properties

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `timeout` | Maximum time to wait for the probe to complete (e.g., `30s`, `1m`, `5m`) | String | 300s |
| `interval` | Time between probe executions (e.g., `5s`, `30s`, `1m`) | String | 10s |
| `attempt` | Number of retry attempts before marking the probe as failed | Integer | 1 |
| `pollingInterval` | Time between retry attempts (e.g., `1s`, `5s`, `10s`) | String | - |
| `initialDelay` | Initial delay before starting the probe (e.g., `0s`, `10s`, `30s`) | String | - |
| `stopOnFailure` | Stop the experiment if the probe fails | Boolean | false |
| `verbosity` | Log verbosity level (`info`, `debug`, `trace`) | String | - |

---

## Probe definition

You can define this probe in your chaos experiment as follows:

### Using instance IDs

```yaml
probe:
  - name: "ec2-instance-health-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name aws-ec2"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: EC2_INSTANCE_ID
          value: "i-1234567890abcdef0,i-9876543210fedcba"
        - name: REGION
          value: "us-east-1"
    runProperties:
      timeout: 300s
      interval: 10s
      attempt: 1
      stopOnFailure: false
```

### Using instance tags

```yaml
probe:
  - name: "ec2-tagged-instances-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name aws-ec2"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: EC2_INSTANCE_TAG
          value: "Environment:production,App:backend"
        - name: REGION
          value: "eu-west-1"
    runProperties:
      timeout: 60s
      interval: 5s
      attempt: 3
      pollingInterval: 2s
```
