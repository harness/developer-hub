---
title: View Lambda Deployments in the Serverless Functions Dashboard
description: This content is for Harness FirstGen. Switch to NextGen. Add the required policies to the Execution Role for the Lambda function to view your Lambda functions in the Serverless Functions Dashboard. I…
# sidebar_position: 2
helpdocs_topic_id: idal1erfiv
helpdocs_category_id: 3pyb3kmkbs
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](/article/1fjmm4by22). Switch to [NextGen](/article/5fnx4hgwsa).Add the required policies to the Execution Role for the Lambda function to view your Lambda functions in the Serverless Functions Dashboard.

In this topic:

* [Before You Begin](#before_you_begin)
* [Step 1: Add Policies to Lambda Execution Role](#step_1_add_policies_to_lambda_execution_role)
* [Step 2: View Lambda Deployments in the Serverless Functions Dashboard](#step_2_view_lambda_deployments_in_the_serverless_functions_dashboard)
* [Next Steps](#next_steps)

### Before You Begin

* [Connect to AWS for Lambda Deployments](/article/lo9taq0pze-1-delegate-and-connectors-for-lambda)
* [Add Lambda Functions](/article/qp8hk4nzbo-2-service-for-lambda)
* [Define your Lambda Target Infrastructure](/article/45dm9z3m2h-3-lambda-environments)

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

![](./static/view-lamba-deployments-in-the-serverless-functions-dashboard-28.png)See [Serverless Functions Dashboard](/article/vlj9xbj315-serverless-functions-dashboard).

### Next Steps

* [Troubleshooting AWS Lambda Deployments](/article/g9o2g5jbye-troubleshooting-harness#aws_lambda)

