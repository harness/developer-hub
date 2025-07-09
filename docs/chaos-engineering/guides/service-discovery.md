---
title: Service Discovery
description: Automatically discover and map services in your infrastructure for targeted chaos engineering
sidebar_position: 10
redirect_from:
  - /docs/chaos-engineering/guides/service-discovery
---

# Service Discovery

Service discovery automatically identifies and maps services in your infrastructure, making it easier to select targets for chaos experiments and understand system dependencies.

## Overview

Harness Chaos Engineering uses service discovery to:
- **Identify available services** in your Kubernetes clusters and cloud environments
- **Simplify target selection** when creating chaos experiments
- **Understand service relationships** and dependencies
- **Reduce manual configuration** overhead
- **Improve experiment accuracy** by targeting the right services

## How Service Discovery Works

When you onboard infrastructure to Harness Chaos Engineering, the discovery agent automatically:

1. **Scans your environment** for running services and applications
2. **Collects service metadata** including names, namespaces, labels, and annotations
3. **Maps service relationships** based on network connections and dependencies
4. **Updates the service catalog** with discovered services
5. **Provides targeting options** when creating experiments

## Benefits

### Simplified Experiment Creation
- **Automatic service detection** eliminates manual service inventory
- **Visual service selection** through intuitive interfaces
- **Filtered targeting** based on service characteristics
- **Reduced configuration errors** through automated discovery

### Better Decision Making
Service discovery helps you decide:
- **Which services to target** for chaos experiments
- **What types of faults to inject** based on service characteristics
- **Which validations to perform** during experiment execution
- **How to measure resilience** for different service types

### Enhanced Visibility
- **Complete service inventory** across all connected infrastructure
- **Service health status** and operational metrics
- **Dependency mapping** for impact analysis
- **Historical service data** for trend analysis

## Discovery Agent

The discovery agent is automatically deployed when you connect infrastructure to Harness Chaos Engineering. It:

- **Runs with minimal permissions** required for service discovery
- **Operates continuously** to keep service data current
- **Respects namespace boundaries** and RBAC policies
- **Provides secure communication** with the Harness platform

### Agent Capabilities
- **Kubernetes service discovery** for pods, services, and deployments
- **Cloud resource detection** for managed services
- **Network topology mapping** for service relationships
- **Metadata collection** for service classification

## Using Discovered Services

### In Experiment Creation
When creating chaos experiments:

1. **Select target infrastructure** where services are discovered
2. **Choose from discovered services** in the target selection interface
3. **Filter services** by namespace, labels, or service type
4. **Preview experiment scope** before execution

### In Application Maps
Discovered services automatically populate:
- **Service topology diagrams** showing relationships
- **Dependency graphs** for impact analysis
- **Health status indicators** for operational awareness
- **Experiment history** for each service

### In Fault Selection
Service discovery enables:
- **Context-aware fault recommendations** based on service type
- **Appropriate fault parameters** for discovered services
- **Validation suggestions** relevant to service characteristics
- **Safety guardrails** based on service criticality

## Configuration

### Discovery Scope
Configure what the discovery agent should scan:

```yaml
# Example discovery configuration
discovery:
  namespaces:
    - production
    - staging
  service_types:
    - deployment
    - statefulset
    - daemonset
  labels:
    include:
      - app.kubernetes.io/name
      - app.kubernetes.io/component
    exclude:
      - internal-only
```

### Update Frequency
Control how often services are rediscovered:
- **Real-time updates** for critical changes
- **Periodic scans** for comprehensive discovery
- **Manual refresh** when needed
- **Event-driven updates** for specific triggers

## Security Considerations

### Permissions
The discovery agent requires minimal permissions:
- **Read access** to discover services and metadata
- **List permissions** for namespaces and resources
- **No write access** to your infrastructure
- **Secure communication** with Harness platform

### Data Privacy
- **Metadata only** - no application data is collected
- **Configurable scope** to limit discovery boundaries
- **Encrypted transmission** of discovery data
- **Retention policies** for discovered service data

## Troubleshooting

### Common Issues

**Services not appearing in experiments:**
- Verify discovery agent is running and healthy
- Check namespace permissions and RBAC policies
- Confirm services match discovery filters
- Review agent logs for discovery errors

**Outdated service information:**
- Trigger manual discovery refresh
- Check discovery agent connectivity
- Verify update frequency configuration
- Review service lifecycle events

**Missing service relationships:**
- Enable network topology discovery
- Check service mesh integration
- Verify service communication patterns
- Review dependency mapping configuration

### Verification Steps

1. **Check agent status** in infrastructure settings
2. **Review discovered services** in the service catalog
3. **Test service selection** in experiment creation
4. **Validate service metadata** accuracy

## Best Practices

### Discovery Configuration
- **Scope appropriately** to avoid unnecessary overhead
- **Use label selectors** to focus on relevant services
- **Configure update frequency** based on environment dynamics
- **Monitor discovery performance** and resource usage

### Service Management
- **Maintain consistent labeling** across services
- **Document service criticality** through annotations
- **Keep service metadata current** for accurate discovery
- **Review discovered services regularly** for accuracy

### Integration
- **Combine with application maps** for visual service relationships
- **Use with chaos experiments** for targeted fault injection
- **Integrate with monitoring** for comprehensive observability
- **Align with GitOps workflows** for automated updates

## Next Steps

Ready to leverage service discovery for better chaos engineering?

1. **[Create Application Maps](./application-maps)** - Visualize discovered services and their relationships
2. **[Plan Chaos Experiments](./chaos-experiments)** - Use discovered services as experiment targets
3. **[Set up Probes](./probes)** - Monitor discovered services during experiments
4. **[Organize GameDays](./gamedays)** - Include discovered services in team exercises

Service discovery forms the foundation for effective chaos engineering by providing accurate, up-to-date information about your system's services and their relationships.
