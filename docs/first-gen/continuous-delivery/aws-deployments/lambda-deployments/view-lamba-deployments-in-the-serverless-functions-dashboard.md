---
title: View Lambda Deployments in the Serverless Functions Dashboard
description: This content is for Harness FirstGen. Switch to NextGen. Add the required policies to the Execution Role for the Lambda function to view your Lambda functions in the Serverless Functions Dashboard. I…
# sidebar_position: 2
helpdocs_topic_id: idal1erfiv
helpdocs_category_id: 3pyb3kmkbs
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness FirstGen. Switch to [NextGen](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/serverless-lambda-cd-quickstart.md).

Add the required policies to the Execution Role for the Lambda function to view your Lambda functions in the Serverless Functions Dashboard.

### Before You Begin

* [Connect to AWS for Lambda Deployments](1-delegate-and-connectors-for-lambda.md)
* [Add Lambda Functions](2-service-for-lambda.md)
* [Define your Lambda Target Infrastructure](3-lambda-environments.md)

### Step 1: Add Policies to Lambda Execution Role

To see your Lambda invocations on the Serverless Dashboard, the [Execution Role](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html) for the Lambda function must have the following policies:

* AmazonEC2FullAccess
* AWSLambda\_FullAccess (previously AWSLambdaFullAccess)
* AWSLambdaVPCAccessExecutionRole
* AWSLambdaRole
* CloudWatchReadOnlyAccess

The Function Invocations are updated every 10 minutes.

### Step 2: View Lambda Deployments in the Serverless Functions Dashboard

Harness Manager's Serverless Functions Dashboard offers views of your Lambda deployment data.

Here is an individual Lambda deployment and how it is displayed on the Serverless Functions dashboard:

![](./static/view-lamba-deployments-in-the-serverless-functions-dashboard-28.png)

See [Serverless Functions Dashboard](../../../firstgen-platform/techref-category/monitoring-ref/serverless-functions-dashboard.md).

### Next Steps

* [Troubleshooting AWS Lambda Deployments](../../../firstgen-troubleshooting/troubleshooting-harness.md#aws-lambda)

