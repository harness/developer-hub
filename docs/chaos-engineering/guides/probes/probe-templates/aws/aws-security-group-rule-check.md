---
id: aws-security-group-rule-check
---

# AWS Security Group Rule Check {#introduction}

Validates the presence of rules in AWS security groups. This probe checks if the specified security groups have any rules configured. It can be used to verify that security groups are not left open.

## Infrastructure type

- **Kubernetes**

## Use cases

AWS Security Group Rule Check probe helps you:
- Validate security group configurations remain intact during chaos
- Verify network access rules are properly configured
- Monitor security posture during infrastructure changes
- Ensure security groups are not accidentally left without rules

---

## Overview

This probe uses the AWS CLI to query security group configurations and validates that the specified security groups have rules configured. It can check for ingress rules, egress rules, or both, helping ensure your network security policies are maintained during chaos experiments.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- AWS credentials configured with appropriate IAM permissions:
  - `ec2:DescribeSecurityGroups`
  - `ec2:DescribeSecurityGroupRules`
- Network connectivity to AWS API endpoints
- Target security groups should exist in the specified region

---

## Probe properties

### Command
```
healthchecks -name aws-resource-access-restrict
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating the specified security groups have rules configured.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SECURITY_GROUP_IDS` | Comma-separated list of security group IDs to check (e.g., `sg-12345678,sg-87654321`). | Yes | - |
| `RULE_TYPE` | Type of rule to check: `ingress` or `egress`. | No | ingress |
| `REGION` | AWS region where the security groups are located (e.g., `us-east-1`, `eu-west-2`). | Yes | - |

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

### Check ingress rules

```yaml
probe:
  - name: "sg-ingress-rule-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name aws-resource-access-restrict"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: SECURITY_GROUP_IDS
          value: "sg-12345678,sg-87654321"
        - name: RULE_TYPE
          value: "ingress"
        - name: REGION
          value: "us-east-1"
    runProperties:
      timeout: 300s
      interval: 10s
      attempt: 1
      stopOnFailure: false
```

### Check egress rules

```yaml
probe:
  - name: "sg-egress-rule-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name aws-resource-access-restrict"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: SECURITY_GROUP_IDS
          value: "sg-abcdef123456"
        - name: RULE_TYPE
          value: "egress"
        - name: REGION
          value: "ap-south-1"
    runProperties:
      timeout: 60s
      interval: 5s
      attempt: 3
      pollingInterval: 2s
