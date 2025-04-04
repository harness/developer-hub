---
title: AWS Connector 
description: Connectors allow Harness to connect to your deployment environments, such as Kubernetes Clusters, AWS, Google Cloud Platform, Azure, etc. This topic describes how to link your AWS cloud account to Harness.
# sidebar_position: 2
helpdocs_topic_id: hiyi6xvj36
helpdocs_category_id: 2yrql0zhj0
helpdocs_is_private: false
helpdocs_is_published: true
---

Connectors allow Harness to connect to your deployment environments, such as Kubernetes Clusters, AWS, Google Cloud Platform, Azure, etc. To create an AutoStopping Rule for your AWS instances, you first need to connect Harness to your AWS account. This topic describes how to connect your AWS cloud account to Harness.

### Before you begin

* [AutoStopping Rules Overview](../1-auto-stopping-rules.md)

### Add an AWS Connector

Perform the following steps to add an AWS connector for AutoStopping Rules:

1. In **Account Settings**, click **Integration for Cloud Cost**.

2. Click on **+New Cluster/Cloud Account**, select **AWS**. 

3. Enter overview details like Connector Name, AWS account ID, etc. as shown below:
     ![](./static/as-aws-one.png)


4. Set Up Cost and Usage Report using the instructions shown on the screen.
     ![](./static/as-aws-two.png)

5. Choose all the Cloud Cost Management features you want to enable for your AWS account including "Optimization by AutoStopping". 
      ![](./static/as-aws-five.png)

6. For AutoStopping, there are several permissions that can be set up. On the next window, you will be asked to select the services for enabling AutoStopping with their relevant permissions.
     ![](./static/as-aws-five.png)
      ![](./static/as-aws-four.png)

7. Click **Continue**.


8. Create Cross Account Role. Follow the instructions shown on the screen.
     ![](./static/as-aws-six.png)

9. Save and Continue

### Next Steps

* [Create AutoStopping Rules for AWS](../4-create-auto-stopping-rules/create-autostopping-rules-aws.md)
* [Use AutoStopping Rules Dashboard](../4-create-auto-stopping-rules/autostopping-dashboard.md)

