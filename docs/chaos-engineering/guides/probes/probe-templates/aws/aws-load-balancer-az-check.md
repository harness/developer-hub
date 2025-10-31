---
id: aws-load-balancer-az-check
---

# AWS Load Balancer AZ Check {#introduction}

Validates the availability of target availability zone(s) in the given ALB or CLB.

## Infrastructure type

- **Kubernetes**

## Use cases

AWS Load Balancer AZ Check probe helps you:
- Verify load balancer AZ configuration during AZ failures
- Validate traffic distribution across availability zones
- Monitor load balancer health during network chaos experiments
- Ensure multi-AZ redundancy is maintained

---

## Overview

This probe uses the AWS CLI to query load balancer configuration and validates that the specified availability zones are properly configured and available. It supports both Application Load Balancers (ALB) and Classic Load Balancers (CLB).

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- AWS credentials configured with appropriate IAM permissions:
  - `elasticloadbalancing:DescribeLoadBalancers`
  - `elasticloadbalancing:DescribeLoadBalancerAttributes`
  - `elasticloadbalancing:DescribeTargetHealth` (for ALB)
- Network connectivity to AWS API endpoints
- Target load balancer should exist in the specified region

---

## Probe properties

### Command
```
healthchecks -name aws-lb-az
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating the specified availability zones are configured in the load balancer.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `LOAD_BALANCER_ARN` | ARN of the ALB to check (e.g., `arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-alb/1234567890abcdef`). Required for ALB. | No* | - |
| `LOAD_BALANCER_NAME` | Name of the CLB to check (e.g., `my-classic-lb`). Required for CLB. | No* | - |
| `REGION` | AWS region where the load balancer is located (e.g., `us-east-1`, `eu-west-2`). | Yes | - |
| `ZONES` | Comma-separated list of Availability Zones to check (e.g., `us-east-1a,us-east-1b,us-east-1c`). | Yes | - |

**Note:** Either `LOAD_BALANCER_ARN` (for ALB) or `LOAD_BALANCER_NAME` (for CLB) must be provided.

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

### For Application Load Balancer (ALB)

```yaml
probe:
  - name: "alb-az-availability-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name aws-lb-az"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: LOAD_BALANCER_ARN
          value: "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-alb/1234567890abcdef"
        - name: REGION
          value: "us-east-1"
        - name: ZONES
          value: "us-east-1a,us-east-1b,us-east-1c"
    runProperties:
      timeout: 300s
      interval: 10s
      attempt: 1
      stopOnFailure: false
```

### For Classic Load Balancer (CLB)

```yaml
probe:
  - name: "clb-az-availability-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name aws-lb-az"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: LOAD_BALANCER_NAME
          value: "my-classic-load-balancer"
        - name: REGION
          value: "eu-west-1"
        - name: ZONES
          value: "eu-west-1a,eu-west-1b"
    runProperties:
      timeout: 60s
      interval: 5s
      attempt: 3
      pollingInterval: 2s
