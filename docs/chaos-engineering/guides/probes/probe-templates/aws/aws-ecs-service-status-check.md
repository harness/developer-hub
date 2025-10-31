---
id: aws-ecs-service-status-check
---

# AWS ECS Service Status Check {#introduction}

Validates the status of an Amazon ECS service. This probe checks if the specified ECS service has reached the desired state (e.g., running tasks count matches desired count) within the given timeout.

## Infrastructure type

- **Kubernetes**

## Use cases

AWS ECS Service Status Check probe helps you:
- Ensure ECS services maintain desired task count during failures
- Validate service auto-scaling behavior during load changes
- Monitor service health during container chaos experiments
- Verify service deployment and rollback operations

---

## Overview

This probe uses the AWS CLI to query ECS service status and validates that the service has reached its desired state. It continuously checks the running task count against the desired count, making it ideal for monitoring service stability during chaos experiments.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- AWS credentials configured with appropriate IAM permissions:
  - `ecs:DescribeServices`
  - `ecs:DescribeClusters`
  - `ecs:ListTasks`
- Network connectivity to AWS API endpoints
- Target ECS cluster and services should be accessible

---

## Probe properties

### Command
```
healthchecks -name aws-ecs
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating the ECS service has reached the desired state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `CLUSTER_NAME` | Name of the ECS cluster containing the service (e.g., `my-ecs-cluster`). | Yes | - |
| `SERVICE_NAMES` | Comma-separated list of ECS service names to check (e.g., `web-service,api-service`). | Yes | - |
| `REGION` | AWS region where the ECS cluster is located (e.g., `us-east-1`, `eu-west-2`). | Yes | - |
| `STATUS_CHECK_TIMEOUT` | Maximum time in seconds to wait for the service to reach desired state. | No | 180 |
| `STATUS_CHECK_DELAY` | Delay in seconds between status checks. | No | 2 |

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

### Single service check

```yaml
probe:
  - name: "ecs-service-health-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name aws-ecs"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: CLUSTER_NAME
          value: "production-cluster"
        - name: SERVICE_NAMES
          value: "web-service"
        - name: REGION
          value: "us-east-1"
        - name: STATUS_CHECK_TIMEOUT
          value: "180"
        - name: STATUS_CHECK_DELAY
          value: "2"
    runProperties:
      timeout: 300s
      interval: 10s
      attempt: 1
      stopOnFailure: false
```

### Multiple services check

```yaml
probe:
  - name: "ecs-multi-service-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name aws-ecs"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: CLUSTER_NAME
          value: "production-cluster"
        - name: SERVICE_NAMES
          value: "web-service,api-service,worker-service"
        - name: REGION
          value: "ap-south-1"
        - name: STATUS_CHECK_TIMEOUT
          value: "300"
        - name: STATUS_CHECK_DELAY
          value: "5"
    runProperties:
      timeout: 400s
      interval: 15s
      attempt: 3
      pollingInterval: 5s
