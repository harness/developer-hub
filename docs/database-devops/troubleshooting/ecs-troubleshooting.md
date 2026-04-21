---
title: "ECS Troubleshooting"
description: "Troubleshooting guide for common issues encountered when using Amazon ECS with Harness Database DevOps, including connectivity problems, container provisioning errors, and rollback execution issues."
sidebar_label: "ECS Troubleshooting"
sidebar_position: 5
keywords: [ecs troubleshooting, harness db devops, aws ecs issues, aurora connectivity problems, container provisioning errors, rollback execution issues]
tags: [aws, ecs, fargate, dbdevops, troubleshooting]
unlisted: true
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import BrowserOnly from '@docusaurus/BrowserOnly';

## Troubleshooting

<BrowserOnly>
  {() => (
    <>
      <Troubleshoot
        issue="Harness Database DevOps runner task not connecting to Harness platform when deployed on AWS ECS Fargate"
        mode="docs"
        fallback="Check CloudWatch logs for the runner task. Verify the `HARNESS_DELEGATE_TOKEN` and `HARNESS_MANAGER_ENDPOINT` environment variables are correct in the task definition. Ensure the security group allows outbound HTTPS traffic to Harness Manager."
      />

      <Troubleshoot
        issue="Database DevOps build task on ECS fails with ResourceInitializationError during container startup"
        mode="docs"
        fallback="Verify the task execution role has the `AmazonECSTaskExecutionRolePolicy` attached and includes permissions for `logs:CreateLogGroup`, `logs:CreateLogStream`, `logs:PutLogEvents`. Ensure the role can pull images from ECR if using private images."
      />

      <Troubleshoot
        issue="Database DevOps pipeline step fails with connection refused error to port 20001 on ECS Fargate"
        mode="docs"
        fallback="Verify the security group has a self-referencing inbound rule for TCP port 20001. Check that both the runner task and build tasks use the same security group. Port 20001 is required for lite-engine communication between the runner and step containers."
      />

      <Troubleshoot
        issue="Database DevOps pipeline on ECS Fargate exceeds the 10 container limit per task"
        mode="docs"
        fallback="Split steps into multiple step groups. Each step group creates a separate ECS task, avoiding the 10-container limit per task. Avoid combining Apply and Rollback steps in the same step group."
      />

      <Troubleshoot
        issue="Rate exceeded errors in CloudWatch Logs API when running Database DevOps pipelines on ECS"
        mode="general"
        fallback="Configure a shared log group in the pipeline task configuration to reduce `CreateLogGroup` calls. AWS CloudWatch has a 5 TPS limit for `CreateLogGroup`, which can be exceeded when creating many log groups concurrently."
      />

      <Troubleshoot
        issue="Unable to connect to Aurora database from Database DevOps pipeline running on ECS Fargate"
        mode="docs"
        fallback="Verify security group inbound rules allow traffic from the ECS task security group to the Aurora database. Confirm the ECS tasks are in the same VPC as Aurora or have proper routing configured. Test connectivity using `telnet` or `nc` from a test container."
      />

      <Troubleshoot
        issue="Database DevOps rollback step not executing as expected on ECS Fargate"
        mode="docs"
        fallback="Separate rollback into its own step group. Ensure proper failure strategy configuration in the pipeline. Rollback steps configured within the same step group as Apply steps may not execute correctly due to ECS task lifecycle constraints."
      />
    </>
  )}
</BrowserOnly>