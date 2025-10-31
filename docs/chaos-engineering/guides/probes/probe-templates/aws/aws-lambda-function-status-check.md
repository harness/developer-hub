---
id: aws-lambda-function-status-check
---

# AWS Lambda Function Status Check {#introduction}

This probe checks if a Lambda function exists and is in the 'Active' state.

## Infrastructure type

- **Kubernetes**

## Use cases

AWS Lambda Function Status Check probe helps you:
- Verify Lambda functions remain active during chaos experiments
- Validate function availability after configuration changes
- Monitor serverless application health and readiness
- Ensure functions are deployable and invocable

---

## Overview

This probe uses the AWS CLI to query Lambda function status and validates that the function is in the 'Active' state. It's particularly useful for serverless architectures where function availability is critical.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- AWS credentials configured with appropriate IAM permissions:
  - `lambda:GetFunction`
  - `lambda:GetFunctionConfiguration`
- Network connectivity to AWS API endpoints
- Target Lambda function should exist in the specified region

---

## Probe properties

### Command
```
healthchecks -name lambda-update-function
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating the Lambda function is in the 'Active' state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `FUNCTION_NAME` | Name of the Lambda function to check (e.g., `my-lambda-function`). | Yes | - |
| `REGION` | AWS region where the Lambda function is located (e.g., `us-east-1`). | Yes | - |

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

```yaml
probe:
  - name: "lambda-function-health-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name lambda-update-function"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: FUNCTION_NAME
          value: "my-lambda-function"
        - name: REGION
          value: "us-east-1"
    runProperties:
      timeout: 300s
      interval: 10s
      attempt: 1
      stopOnFailure: false
```
