---
title: Serverless Functions Dashboard
description: Harness Manager's Serverless Functions Dashboard offers views of your Lambda deployment data.
# sidebar_position: 2
helpdocs_topic_id: vlj9xbj315
helpdocs_category_id: 36pjokv13r
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Manager's Serverless Functions Dashboard offers views of your Lambda deployment data.

![](https://files.helpdocs.io/kw8ldg1itf/articles/vlj9xbj315/1578427006549/image.png)The dashboard provides details for each deployment, giving you a way to view accumulated deployment details quickly.

Here is an individual [Lambda deployment](/article/z24n8ut61d-lambda-deployment-overview) and how it is displayed on the Serverless Functions dashboard:

![](https://files.helpdocs.io/kw8ldg1itf/articles/vlj9xbj315/1578426243990/image.png)### Lambda Execution Role Policy Requirements

To see your Lambda invocations on the Serverless Dashboard, the [Execution Role](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html) for the Lambda function must have the following policies:

* AmazonEC2FullAccess
* AWSLambda\_FullAccess (previously AWSLambdaFullAccess)
* AWSLambdaVPCAccessExecutionRole
* AWSLambdaRole
* CloudWatchReadOnlyAccess

The Function Invocations are updated every 10 minutes.

See [Lambda Deployment Overview](/article/z24n8ut61d-lambda-deployment-overview).

