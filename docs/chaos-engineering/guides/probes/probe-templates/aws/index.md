---
title: AWS Command Probe Templates
sidebar_position: 1
description: Pre-built Command Probe templates for AWS infrastructure validation
---

import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection";
import ProbeTemplateCard from "@site/src/components/ChaosEngineering/ProbeTemplateCard";
import Accordion from "@site/src/components/ChaosEngineering/Accordion";
import { awsProbeTemplates } from "./templates";

# AWS Command Probe Templates {#introduction}

Pre-built Command Probe templates for validating AWS infrastructure health and status during chaos experiments. These templates help you quickly set up probes to monitor AWS resources like EC2 instances, ECS services, Lambda functions, and more.

Here are AWS probe templates that you can use in your chaos experiments.

<ExperimentListSection experiments={awsProbeTemplates} />

<ProbeTemplateCard category="aws">

### AWS EC2 Instance Status Check

Validates the current state of an EC2 instance. This probe checks if the specified EC2 instance(s) are in the expected state. At least one of `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` must be provided.

**Required Environment Variables:**
- `EC2_INSTANCE_ID`: Comma-separated list of EC2 instance IDs (either this or `EC2_INSTANCE_TAG` required)
- `EC2_INSTANCE_TAG`: Comma-separated list of EC2 instance tags (either this or `EC2_INSTANCE_ID` required)
- `REGION`: AWS region where the EC2 instances are located

<Accordion color="green">
<summary>Use cases</summary>

- Verify EC2 instances remain running during chaos experiments
- Validate instance state transitions after fault injection
- Monitor instance health in multi-AZ deployments
- Ensure auto-scaling groups maintain healthy instances

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="aws">

### AWS ECS Service Status Check

Validates the status of an Amazon ECS service. This probe checks if the specified ECS service has reached the desired state (e.g., running tasks count matches desired count) within the given timeout.

**Required Environment Variables:**
- `CLUSTER_NAME`: Name of the ECS cluster containing the service
- `SERVICE_NAMES`: Comma-separated list of ECS service names to check
- `REGION`: AWS region where the ECS cluster is located

<Accordion color="green">
<summary>Use cases</summary>

- Ensure ECS services maintain desired task count during failures
- Validate service auto-scaling behavior during load changes
- Monitor service health during container chaos experiments
- Verify service deployment and rollback operations

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="aws">

### AWS Lambda Function Status Check

This probe checks if a Lambda function exists and is in the 'Active' state.

**Required Environment Variables:**
- `FUNCTION_NAME`: Name of the Lambda function to check
- `REGION`: AWS region where the Lambda function is located

<Accordion color="green">
<summary>Use cases</summary>

- Verify Lambda functions remain active during chaos experiments
- Validate function availability after configuration changes
- Monitor serverless application health and readiness
- Ensure functions are deployable and invocable

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="aws">

### AWS Load Balancer AZ Check

Validates the availability of target availability zone(s) in the given ALB or CLB.

**Required Environment Variables:**
- `LOAD_BALANCER_ARN`: ARN of the ALB to check (required for ALB)
- `LOAD_BALANCER_NAME`: Name of the CLB to check (required for CLB)
- `REGION`: AWS region where the load balancer is located
- `ZONES`: Comma-separated list of Availability Zones to check

<Accordion color="green">
<summary>Use cases</summary>

- Verify load balancer AZ configuration during AZ failures
- Validate traffic distribution across availability zones
- Monitor load balancer health during network chaos experiments
- Ensure multi-AZ redundancy is maintained

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="aws">

### AWS Security Group Rule Check

Validates the presence of rules in AWS security groups. This probe checks if the specified security groups have any rules configured. It can be used to verify that security groups are not left open.

**Required Environment Variables:**
- `SECURITY_GROUP_IDS`: Comma-separated list of security group IDs to check
- `REGION`: AWS region where the security groups are located

<Accordion color="green">
<summary>Use cases</summary>

- Validate security group configurations remain intact during chaos
- Verify network access rules are properly configured
- Monitor security posture during infrastructure changes
- Ensure security groups are not accidentally left without rules

</Accordion>
</ProbeTemplateCard>

