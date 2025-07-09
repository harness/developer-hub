---
title: Container Recommendations Overview
description: Optimize containerized workloads with intelligent recommendations for AWS ECS services and Kubernetes clusters.
sidebar_position: 1
---

# Container Recommendations Overview

Container recommendations help you optimize containerized workloads by analyzing resource utilization patterns and suggesting optimal configurations for containers, pods, and cluster infrastructure. These recommendations are specifically designed for modern, cloud-native applications.

## When to Use Container Recommendations

**Ideal for:**
- Microservices architectures
- Containerized applications (Docker, containerd)
- Kubernetes and ECS workloads
- Dynamic, auto-scaling applications
- Cloud-native development practices

**Not suitable for:**
- Traditional virtual machines (use [Compute Recommendations](../compute-recommendations/) instead)
- Serverless functions
- Static, non-containerized workloads

## Available Container Recommendations

### AWS ECS Recommendations
Optimize Amazon ECS services and task definitions for Fargate and EC2 launch types.

**Key Features:**
- Task definition optimization (CPU/memory allocation)
- Cost vs performance optimization modes
- Histogram-based analysis for seasonality
- Support for both Fargate and EC2 instances

**Typical Savings:** 25-45% of ECS costs

[→ Learn More About ECS Recommendations](./aws-ecs-recommendations.md)

### Kubernetes Recommendations
Comprehensive optimization for Kubernetes clusters with two specialized recommendation types:

#### Node Pool Recommendations
Optimize cluster infrastructure and node configurations.

**Key Features:**
- Node pool right-sizing
- Instance family optimization
- Spot vs On-Demand recommendations
- Multi-cloud support (AWS EKS, GCP GKE, Azure AKS)

**Typical Savings:** 20-40% of cluster infrastructure costs

[→ Learn More About Node Pool Recommendations](./kubernetes-recommendations/node-pool-recommendations.md)

#### Workload Recommendations
Optimize individual pod resource requests and limits.

**Key Features:**
- Pod resource right-sizing (CPU/memory)
- Quality of Service (QoS) optimization
- Request vs limit optimization
- Histogram-based utilization analysis

**Typical Savings:** 30-50% of workload costs

[→ Learn More About Workload Recommendations](./kubernetes-recommendations/workload-recommendations.md)

## Container vs Compute Recommendations

| Aspect | Container Recommendations | Compute Recommendations |
|--------|---------------------------|-------------------------|
| **Target Workloads** | Containerized applications | Traditional VMs |
| **Optimization Level** | Container/Pod level | Instance level |
| **Resource Granularity** | CPU/Memory requests/limits | Instance type/size |
| **Scaling Approach** | Horizontal pod autoscaling | Vertical instance scaling |
| **Update Frequency** | Real-time metrics | Daily/hourly snapshots |
| **Complexity** | Higher (multi-layer optimization) | Lower (single instance) |

## How Container Recommendations Work

### 1. Metrics Collection
**ECS Services:**
- CPU and memory utilization per task
- Service-level aggregation
- 20-minute aggregated windows
- Histogram analysis for seasonality

**Kubernetes Workloads:**
- Pod-level CPU/memory metrics via Metrics Server
- Node-level utilization data
- Container-specific resource usage
- Real-time data collection every minute

### 2. Analysis Methods

#### Histogram-Based Analysis
Both ECS and Kubernetes recommendations use histogram methods to:
- Account for workload seasonality
- Provide equal weight to historical days
- Avoid bias toward recent usage patterns
- Handle traffic spikes and valleys effectively

#### Quality of Service Optimization
- **Cost Optimized**: 50th percentile CPU, 95th percentile memory
- **Performance Optimized**: 95th percentile for both CPU and memory
- **Guaranteed QoS**: Requests = Limits for predictable performance
- **Burstable QoS**: Requests < Limits for flexible resource usage

### 3. Recommendation Types

#### Resource Right-sizing
- Optimal CPU and memory allocation
- Buffer configuration (default 15% + custom)
- Request vs limit optimization
- Cost vs performance trade-offs

#### Infrastructure Optimization
- Node pool configuration
- Instance family selection
- Spot instance utilization
- Cluster autoscaling settings

## Comparison: ECS vs Kubernetes Recommendations

| Feature | AWS ECS | Kubernetes |
|---------|---------|------------|
| **Scope** | Service-level | Pod + Node level |
| **Metrics Source** | CloudWatch | Metrics Server |
| **Resource Types** | CPU, Memory | CPU, Memory, Storage |
| **QoS Options** | Cost/Performance optimized | Guaranteed, Burstable, BestEffort |
| **Tuning Granularity** | Service buffer settings | Pod-level + Node-level tuning |
| **Multi-cloud Support** | AWS only | AWS, GCP, Azure |
| **Autoscaling Integration** | ECS Service autoscaling | HPA, VPA, Cluster Autoscaler |

## Prerequisites and Setup

### AWS ECS Requirements
1. **CCM Connector**: AWS connector with Inventory Management
2. **IAM Permissions**: ECS and CloudWatch access
3. **Service Discovery**: ECS services must be discoverable
4. **Metrics Collection**: Automatic via AWS APIs

### Kubernetes Requirements
1. **CCM Connector**: Kubernetes connector with cost visibility
2. **Metrics Server**: Required for pod-level metrics
3. **Node Labels**: Proper node pool labeling for recommendations
4. **RBAC**: Appropriate permissions for metrics collection

## Best Practices

### Container Resource Management
1. **Set Appropriate Requests**: Start with recommendation baselines
2. **Configure Limits Carefully**: Avoid resource throttling
3. **Monitor Resource Utilization**: Track actual vs allocated resources
4. **Use Quality of Service**: Choose appropriate QoS classes

### Cluster Optimization
1. **Right-size Node Pools**: Match node capacity to workload requirements
2. **Leverage Spot Instances**: Use spot nodes for fault-tolerant workloads
3. **Implement Autoscaling**: Configure HPA and cluster autoscaling
4. **Regular Review Cycles**: Weekly recommendation reviews

### Performance Considerations
1. **Test in Staging**: Validate recommendations before production
2. **Gradual Rollouts**: Implement changes incrementally
3. **Monitor Key Metrics**: Track latency, throughput, error rates
4. **Rollback Plans**: Prepare quick rollback procedures

## Common Use Cases

### Microservices Optimization
- **Challenge**: Over-provisioned microservices with varying load patterns
- **Solution**: Individual service right-sizing with appropriate QoS
- **Typical Savings**: 35-50%

### Development Environments
- **Challenge**: Production-sized resources in dev/test environments
- **Solution**: Cost-optimized recommendations with lower resource allocation
- **Typical Savings**: 50-70%

### Batch Processing Workloads
- **Challenge**: Resources sized for peak batch processing
- **Solution**: Burstable QoS with appropriate limits for burst capacity
- **Typical Savings**: 40-60%

### Multi-tenant Applications
- **Challenge**: Uniform resource allocation across diverse tenants
- **Solution**: Workload-specific recommendations based on actual usage
- **Typical Savings**: 25-40%

## Integration with Container Orchestration

### Kubernetes Integration
- **Helm Charts**: Update resource specifications in charts
- **Operators**: Integrate with custom resource operators
- **GitOps**: Commit recommendation changes via GitOps workflows
- **Policy Engines**: Use OPA/Gatekeeper for resource governance

### ECS Integration
- **Task Definitions**: Update task definition resource specifications
- **Service Updates**: Apply recommendations via service updates
- **CI/CD Pipelines**: Integrate recommendations into deployment pipelines
- **Infrastructure as Code**: Update Terraform/CloudFormation templates

## Getting Started

### For AWS ECS Users
1. **Enable ECS Recommendations**: Configure AWS connector with Inventory Management
2. **Review Service Recommendations**: Start with highest-cost services
3. **Apply Cost-Optimized Settings**: Begin with conservative recommendations
4. **Monitor and Iterate**: Track performance and adjust as needed

[→ Get Started with ECS Recommendations](./aws-ecs-recommendations.md)

### For Kubernetes Users
1. **Choose Optimization Level**:
   - **Infrastructure Focus**: Start with [Node Pool Recommendations](./kubernetes-recommendations/node-pool-recommendations.md)
   - **Application Focus**: Begin with [Workload Recommendations](./kubernetes-recommendations/workload-recommendations.md)

2. **Set Up Prerequisites**: Ensure Metrics Server and proper labeling
3. **Review Cluster Recommendations**: Identify highest-impact opportunities
4. **Implement Gradually**: Start with non-critical workloads

[→ Explore Kubernetes Recommendations](./kubernetes-recommendations/)

## Next Steps

- **New to containers?** Start with [ECS Recommendations](./aws-ecs-recommendations.md) for AWS or [Kubernetes Overview](./kubernetes-recommendations/)
- **Need infrastructure optimization?** Focus on [Node Pool Recommendations](./kubernetes-recommendations/node-pool-recommendations.md)
- **Want application-level optimization?** Explore [Workload Recommendations](./kubernetes-recommendations/workload-recommendations.md)
- **Looking for governance?** Check [Governance Recommendations](../governance-recommendations/)
- **Multi-currency reporting?** Configure [Currency Preferences](../settings/currency-preferences.md)
