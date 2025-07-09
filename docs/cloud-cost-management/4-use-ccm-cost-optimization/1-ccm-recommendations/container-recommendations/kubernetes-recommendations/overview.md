---
title: Kubernetes Recommendations Overview
description: Comprehensive guide to optimizing Kubernetes clusters with node pool and workload recommendations.
sidebar_position: 1
---

# Kubernetes Recommendations Overview

Kubernetes recommendations provide comprehensive optimization for your container orchestration platform through two complementary approaches: infrastructure-level optimization with Node Pool Recommendations and application-level optimization with Workload Recommendations.

## Two-Layer Optimization Approach

### Infrastructure Layer: Node Pool Recommendations
Optimize the underlying cluster infrastructure - the nodes that run your workloads.

**Focus Areas:**
- Node pool sizing and configuration
- Instance type and family optimization
- Spot vs On-Demand instance distribution
- Cluster autoscaling configuration

**Impact:** 20-40% reduction in infrastructure costs

### Application Layer: Workload Recommendations
Optimize individual applications and their resource allocation within the cluster.

**Focus Areas:**
- Pod resource requests and limits
- Quality of Service (QoS) configuration
- Container right-sizing
- Resource utilization optimization

**Impact:** 30-50% reduction in workload costs

## When to Use Each Recommendation Type

### Start with Node Pool Recommendations if:
- You're new to Kubernetes cost optimization
- Your cluster has obvious over-provisioning
- You want to optimize infrastructure costs first
- You have multiple node pools with different configurations
- You're planning cluster capacity changes

### Start with Workload Recommendations if:
- Your cluster infrastructure is already optimized
- You have many diverse workloads with different patterns
- You want fine-grained application-level control
- You're implementing resource governance policies
- You have development teams managing their own applications

### Use Both Together for:
- **Maximum Cost Optimization**: Comprehensive cluster optimization
- **Holistic Approach**: Infrastructure and application alignment
- **Ongoing Management**: Continuous optimization as workloads evolve

## Recommendation Comparison

| Aspect | Node Pool Recommendations | Workload Recommendations |
|--------|---------------------------|--------------------------|
| **Optimization Level** | Cluster infrastructure | Individual applications |
| **Resource Scope** | Node-level CPU/Memory | Pod-level requests/limits |
| **Impact Scope** | Entire node pool | Specific workloads |
| **Implementation Complexity** | Medium (infrastructure changes) | Low (application config) |
| **Rollback Complexity** | High (affects multiple workloads) | Low (single workload) |
| **Typical Savings** | 20-40% | 30-50% |
| **Update Frequency** | Weekly/Monthly | Daily/Weekly |
| **Prerequisites** | Node pool labels | Metrics Server |

## Multi-Cloud Support

Both recommendation types support major Kubernetes platforms:

### Amazon EKS (AWS)
- **Node Pool Labels**: `eks.amazonaws.com/nodegroup`, `alpha.eksctl.io/nodegroup-name`
- **Instance Types**: Full EC2 instance family support
- **Spot Integration**: Native spot instance recommendations
- **Pricing**: AWS public pricing integration

### Google GKE (GCP)
- **Node Pool Labels**: `cloud.google.com/gke-nodepool`
- **Instance Types**: Google Cloud machine type optimization
- **Preemptible Integration**: Preemptible instance recommendations
- **Pricing**: GCP public pricing integration

### Azure AKS (Azure)
- **Node Pool Labels**: `agentpool`, `node-pool-name`
- **Instance Types**: Azure VM size optimization
- **Spot Integration**: Azure Spot VM recommendations
- **Pricing**: Azure public pricing integration

### Self-Managed Clusters
- **Generic Labels**: `nodegroup`, `kops.k8s.io/instancegroup`
- **Custom Configurations**: Flexible labeling support
- **Multi-cloud Deployment**: Cross-cloud optimization

## Prerequisites and Setup

### Common Requirements
1. **CCM Kubernetes Connector**: Configured with cost visibility
2. **Metrics Server**: Deployed and functional in cluster
3. **Proper RBAC**: CCM service account with metrics access
4. **Network Connectivity**: Harness delegate can reach Kubernetes API

### Node Pool Specific Requirements
1. **Node Labels**: Appropriate node pool identification labels
2. **Instance Metadata**: Access to cloud provider instance information
3. **Pricing Data**: Cloud provider pricing API access

### Workload Specific Requirements
1. **Pod Metrics**: Metrics Server collecting pod-level data
2. **Historical Data**: Minimum 24-48 hours of metrics
3. **Workload Identification**: Proper deployment/statefulset labeling

## Best Practices for Combined Optimization

### Implementation Order
1. **Start with Node Pools**: Optimize infrastructure foundation
2. **Monitor Cluster Stability**: Ensure node changes don't impact workloads
3. **Apply Workload Recommendations**: Fine-tune individual applications
4. **Iterate and Monitor**: Continuous optimization cycle

### Coordination Strategies
1. **Align Resource Allocation**: Ensure workload requests fit node capacity
2. **Avoid Resource Fragmentation**: Balance node size with workload requirements
3. **Consider Autoscaling**: Configure HPA and cluster autoscaler appropriately
4. **Plan for Growth**: Leave headroom for workload scaling

### Monitoring and Validation
1. **Infrastructure Metrics**: Node utilization, cluster capacity
2. **Application Metrics**: Pod performance, resource utilization
3. **Cost Tracking**: Monitor actual vs estimated savings
4. **Performance Impact**: Track latency, throughput, error rates

## Common Optimization Scenarios

### Over-Provisioned Development Clusters
**Challenge**: Development clusters sized like production
**Approach:**
1. Node Pool: Reduce node sizes, increase spot instance usage
2. Workload: Apply cost-optimized QoS settings
**Expected Savings:** 50-70%

### Microservices with Diverse Resource Needs
**Challenge**: Uniform resource allocation across different services
**Approach:**
1. Node Pool: Create specialized node pools for different workload types
2. Workload: Individual service optimization based on usage patterns
**Expected Savings:** 30-45%

### Batch Processing Workloads
**Challenge**: Resources sized for peak batch processing
**Approach:**
1. Node Pool: Configure autoscaling for dynamic capacity
2. Workload: Use burstable QoS for flexible resource allocation
**Expected Savings:** 40-60%

### Multi-Tenant Clusters
**Challenge**: Resource isolation and fair allocation
**Approach:**
1. Node Pool: Dedicated node pools per tenant or workload type
2. Workload: Tenant-specific resource optimization
**Expected Savings:** 25-40%

## Integration with Kubernetes Ecosystem

### Resource Management
- **Vertical Pod Autoscaler (VPA)**: Complement workload recommendations
- **Horizontal Pod Autoscaler (HPA)**: Align with resource right-sizing
- **Cluster Autoscaler**: Coordinate with node pool optimization

### Policy and Governance
- **Resource Quotas**: Set appropriate limits based on recommendations
- **Limit Ranges**: Define default and maximum resource allocations
- **Pod Security Policies**: Ensure security while optimizing resources

### Monitoring and Observability
- **Prometheus**: Integrate recommendation metrics
- **Grafana**: Visualize optimization impact
- **Custom Metrics**: Track recommendation effectiveness

## Getting Started Guide

### Phase 1: Assessment (Week 1)
1. **Enable Kubernetes Connector**: Set up CCM integration
2. **Review Current State**: Analyze existing resource allocation
3. **Identify Opportunities**: Focus on highest-cost workloads/nodes
4. **Plan Implementation**: Prioritize recommendations by impact and risk

### Phase 2: Infrastructure Optimization (Week 2-3)
1. **Start with Node Pools**: Apply low-risk node pool recommendations
2. **Monitor Cluster Health**: Ensure stability after changes
3. **Adjust Autoscaling**: Update cluster autoscaler configuration
4. **Validate Savings**: Track cost reduction from infrastructure changes

### Phase 3: Application Optimization (Week 4-6)
1. **Apply Workload Recommendations**: Start with non-critical applications
2. **Test Performance Impact**: Validate application behavior
3. **Roll Out Gradually**: Expand to production workloads
4. **Monitor and Tune**: Adjust based on real-world performance

### Phase 4: Continuous Optimization (Ongoing)
1. **Regular Review Cycles**: Weekly recommendation reviews
2. **Automated Integration**: Integrate with CI/CD pipelines
3. **Policy Enforcement**: Implement resource governance policies
4. **Team Training**: Educate development teams on best practices

## Next Steps

### Choose Your Starting Point:
- **Infrastructure Focus**: [Node Pool Recommendations](./node-pool-recommendations.md)
- **Application Focus**: [Workload Recommendations](./workload-recommendations.md)
- **Comprehensive Approach**: Review both recommendation types

### Additional Resources:
- **Container Overview**: [Container Recommendations](../overview.md)
- **Compute Alternatives**: [Compute Recommendations](../../compute-recommendations/)
- **Governance**: [Governance Recommendations](../../governance-recommendations/)
- **Settings**: [Currency Preferences](../../settings/currency-preferences.md)

---

**Ready to optimize your Kubernetes clusters?** Choose your approach above or contact [Harness Support](mailto:support@harness.io) for personalized guidance on your optimization strategy.
