---
title: Overview
description: Learn how to use Commitment Orchestrator to optimize your AWS RDS costs
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Commitment Orchestrator for RDS

Commitment Orchestrator for RDS helps you optimize your Amazon RDS (Relational Database Service) costs by automatically managing your Reserved Instance (RI) commitments. It analyzes your RDS usage patterns and recommends the most cost-effective combination of Reserved Instances.

## Key Features

- **Automated RI Management**: Automatically purchases and exchanges RDS Reserved Instances based on your usage patterns
- **Multi-Account Support**: Manages RDS commitments across all your AWS accounts from a single master account
- **Smart Coverage Optimization**: Intelligently determines the optimal coverage percentage for your RDS instances
- **Flexible Instance Family Support**: Supports various RDS instance families and database engines

## Prerequisites

Before setting up Commitment Orchestrator for RDS, ensure you have:

1. A Harness account with CCM module enabled
2. AWS master account with appropriate permissions

## Steps to configure:

### Permissions For Visibility
```
"ec2:DescribeReservedInstancesOfferings",
"ce:GetSavingsPlansUtilization",
"ce:GetReservationUtilization",
"ec2:DescribeInstanceTypeOfferings",
"ce:GetDimensionValues",
"ce:GetSavingsPlansUtilizationDetails",
"ec2:DescribeReservedInstances",
"ce:GetReservationCoverage",
"ce:GetSavingsPlansCoverage",
"savingsplans:DescribeSavingsPlans",
"organizations:DescribeOrganization"
"ce:GetCostAndUsage"
```

### Permissions for Orchestration
```
"ec2:PurchaseReservedInstancesOffering",
"ec2:GetReservedInstancesExchangeQuote",
"ec2:DescribeInstanceTypeOfferings",              
"ec2:AcceptReservedInstancesExchangeQuote",              
"ec2:DescribeReservedInstancesModifications",   
"ec2:ModifyReservedInstances",
"ce:GetCostAndUsage",
"savingsplans:DescribeSavingsPlansOfferings",
"savingsplans:CreateSavingsPlan"
```

### Permissions for RDS
```
"rds:PurchaseReservedDBInstancesOffering",
"rds:DescribeReservedDBInstancesOfferings",
"pricing:GetProducts"
```

