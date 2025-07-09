---
title: Compute Recommendations Overview
description: Optimize your cloud compute resources with intelligent right-sizing recommendations for AWS EC2, Azure VMs, and GCP Compute Engine.
sidebar_position: 1
---

import ComputeOptimizationSlider from '@site/src/components/ComputeOptimizationSlider';

# Compute Recommendations Overview

Compute recommendations help you optimize individual virtual machines and compute instances by analyzing utilization patterns and suggesting right-sizing opportunities. These recommendations focus on traditional compute workloads running on cloud infrastructure.

## Interactive Compute Optimization Demonstration

<ComputeOptimizationSlider />

### Key Benefits of the Optimization Process

**What you just experienced:**
- **Real-time transformation** from over-provisioned to optimized infrastructure
- **Visual cost impact** showing immediate savings potential
- **Performance improvements** with better resource utilization
- **Implementation stages** from analysis to full optimization

**Why this matters:**
- **60% cost reduction** achievable through right-sizing
- **4x CPU efficiency** improvement with proper utilization
- **Zero performance impact** when recommendations are applied correctly
- **Immediate ROI** with payback in less than a week

## When to Use Compute Recommendations

**Ideal for:**
- Long-running virtual machines
- Traditional three-tier applications
- Predictable workload patterns
- Legacy applications migrated to cloud
- Development and testing environments

**Not suitable for:**
- Containerized workloads (use [Container Recommendations](../container-recommendations/) instead)
- Serverless functions
- Auto-scaling groups with dynamic sizing

## Available Compute Recommendations

### AWS EC2 Recommendations
Optimize Amazon EC2 instances based on CPU and memory utilization patterns.

**Key Features:**
- Instance family optimization (within family or across families)
- Right-sizing based on utilization data
- Decommissioning recommendations for idle instances
- Integration with AWS Cost Explorer data

**Typical Savings:** 20-40% of EC2 costs

[→ Learn More About EC2 Recommendations](./aws-ec2-recommendations.md)

### Azure VM Recommendations
Optimize Azure Virtual Machines using Azure Advisor integration.

**Key Features:**
- VM right-sizing recommendations
- Shutdown recommendations for idle VMs
- CPU utilization analysis
- Azure Advisor integration

**Typical Savings:** 15-35% of VM costs

[→ Learn More About Azure VM Recommendations](./azure-vm-recommendations.md)

### GCP Compute Engine Recommendations
*(Coming Soon)*

Optimize Google Cloud Compute Engine instances with intelligent recommendations.

## How Compute Recommendations Work

### 1. Data Collection
- **Utilization Metrics**: CPU, memory, network, and disk usage
- **Historical Analysis**: 7-30 days of usage patterns
- **Cost Data**: Current pricing and potential savings

### 2. Analysis Engine
- **Pattern Recognition**: Identifies usage trends and seasonality
- **Right-sizing Logic**: Matches workload requirements to optimal instance types
- **Cost Modeling**: Calculates potential savings with recommended changes

### 3. Recommendation Generation
- **Instance Resizing**: Suggests optimal instance types and sizes
- **Decommissioning**: Identifies idle or underutilized resources
- **Family Optimization**: Recommends modern instance families for better price/performance

## Comparison: AWS EC2 vs Azure VM Recommendations

| Feature | AWS EC2 | Azure VM |
|---------|---------|----------|
| **Data Source** | AWS Cost Explorer | Azure Advisor |
| **Metrics** | CPU, Memory (with CloudWatch) | CPU utilization |
| **Recommendation Types** | Resize, Decommission | Resize, Shutdown |
| **Instance Families** | Within/Across families | Within families |
| **Memory Metrics** | Requires CloudWatch agent | Limited availability |
| **Update Frequency** | Daily | Up to 24 hours |
| **Tuning Options** | Buffer settings, family preferences | Limited tuning |

## Prerequisites and Setup

### AWS EC2 Requirements
1. **CCM Connector**: AWS connector with Inventory Management enabled
2. **Permissions**: Cost Explorer API access
3. **CloudWatch**: Enable for CPU metrics
4. **Memory Metrics**: Install CloudWatch agent for memory data

### Azure VM Requirements
1. **CCM Connector**: Azure connector with Cost Visibility and Inventory Management
2. **Azure Advisor**: Configure for cost optimization recommendations
3. **Permissions**: Reader access to subscription and resource groups

## Best Practices

### Before Implementation
1. **Analyze Workload Patterns**: Understand application behavior and peak usage
2. **Test in Non-Production**: Validate recommendations in development environments
3. **Plan Maintenance Windows**: Schedule changes during low-traffic periods
4. **Backup Critical Data**: Ensure data protection before instance changes

### Tuning Recommendations
1. **Set Appropriate Buffers**: Add 10-20% buffer for performance safety
2. **Consider Seasonality**: Account for periodic traffic spikes
3. **Review Instance Families**: Balance cost savings with performance requirements
4. **Monitor Post-Implementation**: Track performance metrics after changes

### Ongoing Management
1. **Regular Reviews**: Weekly review of new recommendations
2. **Track Applied Changes**: Monitor actual vs estimated savings
3. **Update Baselines**: Refresh recommendations as workloads evolve
4. **Document Decisions**: Keep records of applied and rejected recommendations

## Common Use Cases

### Development Environments
- **Challenge**: Over-provisioned dev/test instances
- **Solution**: Right-size based on actual usage patterns
- **Typical Savings**: 40-60%

### Legacy Applications
- **Challenge**: Old instance types with poor price/performance
- **Solution**: Migrate to modern instance families
- **Typical Savings**: 20-30%

### Seasonal Workloads
- **Challenge**: Resources sized for peak periods
- **Solution**: Right-size for average load, use auto-scaling for peaks
- **Typical Savings**: 25-45%

## Integration with Other CCM Features

### Perspectives Integration
- Filter recommendations by cost categories
- Apply RBAC based on perspective access
- Align recommendations with business units

### Budget Integration
- Track recommendation impact on budget forecasts
- Set alerts for recommendation-driven savings
- Monitor budget variance after implementation

### Governance Integration
- Combine with governance recommendations for comprehensive optimization
- Identify compliance issues alongside cost optimization
- Coordinate resource cleanup with right-sizing efforts

## Getting Started

1. **Choose Your Cloud Provider**:
   - [AWS EC2 Recommendations](./aws-ec2-recommendations.md)
   - [Azure VM Recommendations](./azure-vm-recommendations.md)

2. **Set Up Prerequisites**: Follow cloud-specific setup guides

3. **Review First Recommendations**: Start with low-risk, high-impact changes

4. **Implement Gradually**: Begin with non-critical workloads

5. **Monitor and Iterate**: Track results and refine approach

## Next Steps

- **Ready to start?** Choose your cloud provider above
- **Need container optimization?** Explore [Container Recommendations](../container-recommendations/)
- **Want comprehensive governance?** Check [Governance Recommendations](../governance-recommendations/)
- **Multi-currency reporting?** Configure [Currency Preferences](../settings/currency-preferences.md)
