---
title: AWS Deployments Overview
description: Overview of deploying to AWS with Harness CD.
sidebar_position: 1
---

This topic includes or points to everything you need to get started with AWS deployments. 

## Supported Deployment Types

* [AWS ASG](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg-tutorial)
* [AWS ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
* [AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)
* [AWS SAM](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-sam-deployments)
* [Spot Elastigroup](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot-deployment)

## Connecting to AWS

In order to communicate with AWS you will need an [AWS Connector](/docs/platform/connectors/cloud-providers/add-aws-connector).

## Prequisites for an AWS Deployment

* The AWS account used to connect to Harness must have the correct policies associated with the account's IAM role. These policies differ based on each deployment type. Please take a close look in the relevant deployment doc to see what permission(s) you will need. 
* Some AWS deployments will require a Harness Delegate. To learn how to install a Harness Delegate go to: [Delegate Installation Options](/docs/platform/delegates/install-delegates/overview).
