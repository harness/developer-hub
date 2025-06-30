---
title: Application Maps
description: Visualize and manage your application dependencies and service relationships
sidebar_position: 1
---

# Application Maps

Application maps provide a visual representation of your system architecture, helping you understand service dependencies, data flows, and potential failure points. This visualization is crucial for effective chaos engineering planning and execution.

## What are Application Maps?

Application maps are interactive diagrams that show:
- **Service topology**: How services connect and communicate
- **Dependency relationships**: Which services depend on others
- **Data flow patterns**: How information moves through your system
- **Critical paths**: Essential service chains for business functions
- **Potential failure points**: Areas where chaos experiments can be most valuable

## Benefits of Application Maps

### Better Experiment Planning
- **Identify critical services** that should be tested first
- **Understand blast radius** of potential failures
- **Plan targeted experiments** based on service dependencies
- **Avoid unintended consequences** by understanding system topology

### Risk Assessment
- **Spot single points of failure** in your architecture
- **Identify cascading failure scenarios** before they happen
- **Prioritize resilience improvements** based on service criticality
- **Plan disaster recovery strategies** with full system context

### Team Collaboration
- **Share system understanding** across teams
- **Facilitate chaos engineering discussions** with visual context
- **Onboard new team members** faster with clear architecture views
- **Coordinate experiments** across multiple service owners

## Creating Application Maps

### Automatic Discovery
Harness can automatically discover your application topology:

#### **Kubernetes Discovery**
```yaml
# Service mesh integration
discovery:
  type: "kubernetes"
  namespaces: ["production", "staging"]
  service_mesh: "istio"  # or "linkerd", "consul-connect"
  
# APM integration
apm_integration:
  provider: "datadog"  # or "newrelic", "dynatrace"
  api_key: "${APM_API_KEY}"
```

#### **Cloud Provider Discovery**
```yaml
# AWS service discovery
discovery:
  type: "aws"
  regions: ["us-west-2", "us-east-1"]
  services: ["ecs", "lambda", "rds", "elasticache"]
  
# Azure service discovery
discovery:
  type: "azure"
  resource_groups: ["prod-rg", "staging-rg"]
  services: ["app-service", "sql-database", "cosmos-db"]
```

### Manual Configuration
For custom or complex architectures:

```yaml
# Manual service definition
services:
  - name: "web-frontend"
    type: "web-service"
    dependencies: ["user-service", "product-service"]
    criticality: "high"
    
  - name: "user-service"
    type: "microservice"
    dependencies: ["user-database", "auth-service"]
    criticality: "high"
    
  - name: "product-service"
    type: "microservice"
    dependencies: ["product-database", "inventory-service"]
    criticality: "medium"
```

## Map Components

### Services
Individual components in your system:
- **Web services**: Frontend applications, APIs
- **Microservices**: Backend business logic services
- **Databases**: SQL, NoSQL, cache systems
- **Message queues**: Kafka, RabbitMQ, SQS
- **External services**: Third-party APIs, SaaS providers

### Dependencies
Relationships between services:
- **Synchronous calls**: HTTP/REST API calls
- **Asynchronous messaging**: Queue-based communication
- **Database connections**: Service-to-database relationships
- **Shared resources**: Common storage, configuration services

### Metadata
Additional information about services:
- **Criticality levels**: High, medium, low business impact
- **SLA requirements**: Availability and performance targets
- **Team ownership**: Which team maintains each service
- **Deployment information**: Version, environment, scaling config

## Using Maps for Chaos Engineering

### Experiment Planning
Use application maps to plan effective experiments:

#### **Identify Critical Paths**
```yaml
# Example: E-commerce critical path
critical_path:
  name: "checkout-flow"
  services: ["web-frontend", "cart-service", "payment-service", "order-service"]
  business_impact: "high"
  
# Experiment targeting critical path
experiment:
  name: "payment-service-failure"
  target: "payment-service"
  fault: "service-unavailable"
  success_criteria:
    - "checkout-flow remains functional"
    - "graceful degradation to alternative payment"
```

#### **Blast Radius Analysis**
```yaml
# Analyze impact of service failure
blast_radius_analysis:
  target_service: "user-service"
  direct_dependents: ["web-frontend", "mobile-api"]
  indirect_impact: ["recommendation-service", "analytics-service"]
  estimated_user_impact: "80%"
```

### Dependency Testing
Target specific dependency relationships:

#### **Database Dependency Testing**
- **Primary database failure**: Test failover to secondary
- **Cache unavailability**: Validate fallback to database
- **Connection pool exhaustion**: Test connection limit handling

#### **Service-to-Service Testing**
- **API unavailability**: Test circuit breaker behavior
- **Slow responses**: Validate timeout and retry logic
- **Partial failures**: Test graceful degradation scenarios

### Cascading Failure Prevention
Use maps to prevent unintended cascading failures:

```yaml
# Experiment with cascade prevention
experiment:
  name: "controlled-database-failure"
  target: "user-database"
  fault: "connection-timeout"
  
  # Prevent cascade to dependent services
  safeguards:
    - service: "web-frontend"
      action: "enable-circuit-breaker"
    - service: "mobile-api"
      action: "increase-timeout-threshold"
```

## Map Visualization Features

### Interactive Elements
- **Clickable services**: View detailed service information
- **Dependency highlighting**: Show upstream/downstream relationships
- **Real-time status**: Display current service health
- **Experiment overlay**: Show active experiments on the map

### Filtering and Views
- **Criticality filtering**: Show only high-criticality services
- **Team-based views**: Filter by service ownership
- **Environment separation**: Switch between prod/staging/dev
- **Technology grouping**: Group by service type or technology

### Customization Options
- **Layout algorithms**: Tree, force-directed, hierarchical layouts
- **Color coding**: By criticality, team, technology, or health status
- **Icon customization**: Use custom icons for different service types
- **Annotation support**: Add notes and comments to services

## Integration with Monitoring

### Real-Time Health Status
Display current service health on the map:
- **Green**: Service healthy and responsive
- **Yellow**: Service degraded or experiencing issues
- **Red**: Service unavailable or failing
- **Gray**: Service status unknown or not monitored

### Experiment Visualization
Show active and planned experiments:
- **Active experiments**: Highlight services currently under test
- **Experiment history**: Show past experiment results
- **Planned experiments**: Display upcoming scheduled tests
- **Impact indicators**: Show blast radius of active experiments

### Metrics Integration
Overlay key metrics on the map:
- **Response times**: Show latency for service calls
- **Error rates**: Display error percentages
- **Throughput**: Show request volume and capacity
- **Resource utilization**: Display CPU, memory usage

## Best Practices

### Map Maintenance
- **Regular updates**: Keep maps current with system changes
- **Automated sync**: Use CI/CD integration to update maps
- **Team collaboration**: Involve service owners in map maintenance
- **Version control**: Track map changes over time

### Experiment Planning
- **Start with leaf nodes**: Begin experiments with services that have no dependents
- **Consider business hours**: Plan experiments during low-traffic periods
- **Coordinate with teams**: Notify service owners before experiments
- **Document assumptions**: Record expected behavior and dependencies

### Visualization Best Practices
- **Keep it simple**: Avoid cluttering maps with too much information
- **Use consistent styling**: Maintain visual consistency across maps
- **Provide context**: Include legends and explanations
- **Enable drill-down**: Allow users to explore details on demand

## Advanced Features

### Multi-Environment Maps
Compare architectures across environments:
- **Environment comparison**: Side-by-side prod vs staging
- **Deployment tracking**: Show differences between environments
- **Configuration drift**: Identify inconsistencies
- **Promotion planning**: Visualize deployment paths

### Historical Analysis
Track changes over time:
- **Architecture evolution**: See how system topology changes
- **Experiment impact**: Analyze long-term effects of chaos testing
- **Dependency trends**: Track new dependencies and removals
- **Performance correlation**: Link architecture changes to performance

### Compliance and Governance
Use maps for organizational oversight:
- **Security boundaries**: Show trust zones and security perimeters
- **Compliance mapping**: Identify services handling sensitive data
- **Cost allocation**: Track resource usage by service
- **Risk assessment**: Evaluate business risk by service criticality

## Getting Started

### Quick Setup
1. **Connect your infrastructure**: Link Kubernetes clusters or cloud accounts
2. **Enable service discovery**: Configure automatic topology detection
3. **Review and refine**: Validate discovered services and dependencies
4. **Add metadata**: Include criticality, ownership, and SLA information

### Integration Steps
```bash
# Example: Kubernetes integration
kubectl apply -f harness-discovery-agent.yaml

# Configure service mesh integration
harness chaos configure --service-mesh istio --namespace production

# Enable APM integration
harness chaos integrate --apm datadog --api-key $DATADOG_API_KEY
```

## Next Steps

Ready to leverage application maps for better chaos engineering?

1. **[Plan Chaos Experiments](./chaos-experiments)** - Use maps to design targeted experiments
2. **[Set up Probes & Actions](./probes-actions)** - Monitor services shown in your maps
3. **[Organize GameDays](./gamedays)** - Use maps to plan team exercises
4. **[Explore Integrations](./integrations)** - Connect with your monitoring and APM tools

:::tip Pro Tip
Start by mapping your most critical user journeys first. Understanding these key paths will help you prioritize the most impactful chaos experiments!
:::
