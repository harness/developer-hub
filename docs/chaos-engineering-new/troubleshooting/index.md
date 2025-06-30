---
title: Troubleshooting Chaos Engineering
description: Common issues and solutions for chaos engineering experiments
sidebar_position: 1
---

# Troubleshooting Chaos Engineering

This section helps you resolve common issues and challenges when working with chaos engineering experiments.

## Common Issues

### Experiment Execution Problems

#### Experiment Fails to Start
- **Cause**: Insufficient permissions or connectivity issues
- **Solution**: Verify RBAC permissions and network connectivity
- **Prevention**: Use pre-flight checks before experiment execution

#### Experiment Stuck in Running State
- **Cause**: Target infrastructure is unresponsive
- **Solution**: Check target system health and experiment timeout settings
- **Prevention**: Set appropriate timeout values and health checks

#### Unexpected Experiment Results
- **Cause**: Incorrect hypothesis or measurement criteria
- **Solution**: Review experiment design and success criteria
- **Prevention**: Validate experiments in staging environments first

### Infrastructure Issues

#### Permission Denied Errors
- **Cause**: Insufficient IAM or RBAC permissions 
- **Solution**: Review and update permission policies
- **Prevention**: Use principle of least privilege with proper scoping

#### Network Connectivity Problems
- **Cause**: Firewall rules or network policies blocking access
- **Solution**: Configure network policies and security groups
- **Prevention**: Document network requirements and validate connectivity

#### Resource Constraints
- **Cause**: Insufficient compute or memory resources
- **Solution**: Scale infrastructure or adjust experiment parameters
- **Prevention**: Monitor resource usage and plan capacity

### Application-Specific Issues

#### Service Discovery Problems
- **Cause**: Incorrect service endpoints or DNS resolution
- **Solution**: Verify service discovery configuration
- **Prevention**: Test service discovery in isolation

#### Database Connection Issues
- **Cause**: Connection pool exhaustion or timeout settings
- **Solution**: Adjust connection parameters and pool sizes
- **Prevention**: Monitor database connections and performance

## Debugging Techniques

### Log Analysis
- Enable detailed logging for experiments
- Use structured logging for better analysis
- Correlate logs across services and infrastructure

### Monitoring and Metrics
- Set up comprehensive monitoring during experiments
- Use custom metrics to track experiment progress
- Create dashboards for real-time visibility

### Testing Strategies
- Start with small blast radius experiments
- Use canary deployments for gradual rollout
- Implement circuit breakers and fallback mechanisms

## Best Practices for Prevention

### Experiment Design
- Define clear success and failure criteria
- Implement proper rollback mechanisms
- Use gradual experiment progression

### Safety Measures
- Implement experiment safeguards
- Set up automated rollback triggers
- Use feature flags for quick experiment control

### Team Preparation
- Train team members on chaos engineering principles
- Establish incident response procedures
- Create runbooks for common scenarios

## Getting Help

If you're still experiencing issues:

1. Check our [FAQ section](./faq)
2. Search our [Community Forum](https://community.harness.io)
3. Contact [Harness Support](https://support.harness.io)
4. Review our [Known Issues](./known-issues) page
