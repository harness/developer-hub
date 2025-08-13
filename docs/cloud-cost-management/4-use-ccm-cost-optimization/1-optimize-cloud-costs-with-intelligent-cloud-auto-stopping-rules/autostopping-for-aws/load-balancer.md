---
title: Setting Up AWS Application Load Balancer (ALB)
description: Create an AWS Application Load Balancer for HTTP/HTTPS traffic to enable AutoStopping Rules.
sidebar_position: 2
helpdocs_topic_id: eba1bn2jm6
helpdocs_category_id: k8xq40kf08
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setting Up AWS Application Load Balancer (ALB)

## Overview

An AWS Application Load Balancer (ALB) serves as the entry point for HTTP/HTTPS traffic to your AutoStopping-managed resources. It intelligently routes requests and works with AutoStopping to start and stop resources based on traffic patterns.

## How AWS Load Balancer Works with AutoStopping

![AWS Load Balancer Architecture](./static/create-load-balancer-aws-14.png)

A Harness load balancer in AWS consists of two primary components:

1. **Application Load Balancer (ALB)**: Routes HTTP/HTTPS traffic based on application-level information
2. **Lambda Function**: Manages resource warm-up and displays progress pages during startup

### Key Benefits

- **Centralized Traffic Management**: Direct traffic to multiple AutoStopped resources
- **Reuse Across Rules**: One load balancer can serve multiple AutoStopping rules
- **Path-Based Routing**: Route different paths to different resource groups
- **Seamless User Experience**: Users access resources through familiar URLs

### Prerequisites

- An active AWS account with [appropriate permissions](/docs/cloud-cost-management/feature-permissions#autostopping-rules-permissions).
- A domain name you can configure (either in Route 53 or another DNS provider)
- [AWS CCM Connector](/docs/cloud-cost-management/get-started/#aws)

## Setup Process

You can either create a load balancer from the CCM UI or import an [existing load balancer on your AWS account](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html).

<Tabs>
<TabItem value="Create Load Balancer">
### Creating a Load Balancer from the AutoStopping Homepage

<DocImage path={require('./static/as-lb-aws.png')} width="100%" height="100%" title="Click to view full size image" />

1. In the AutoStopping overview page, click **Load Balancers** in the top right
2. Enter a name and select **AWS** in **Cloud Provider**
3. Choose a cloud connector or create a [new one](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws). 
4. Enter **Load Balancer Configuration**.
   - Choose access type as **Internal** or **External**
   - Select the AWS region for deployment
   - Choose an SSL certificate
   - Select the VPC for deployment
   - Choose appropriate security groups

7. Click **Save Load Balancer**

Your load balancer is now ready to use with AutoStopping rules.

</TabItem>
<TabItem value="Import Load Balancer">
1. If you [already have a load balancer on your AWS account](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html), you can import it into Harness CCM.
2. In the AutoStopping Rules, in "Setup Access", click on "HTTP/HTTPS".
3. From the "Specify Application Load Balancer (or AutoStopping Proxy)" dropdown, select the load balancer you want to import.
4.  The field will be auto-populated with the load balancer information.
5. Specify the URL used to access the resources (Optional). The URL should be accessible before configuration if it's been used to warm up the resources. Harness-generated auto URLs won't be able to warm up resources and won't have access to the underlying resources.
6. Custom Exclusions / Inclusions: You can specify to exclude or include certain types of HTTP/HTTPS traffic from being considered as activity and consequently warm-up AutoStopping Rules
</TabItem>

</Tabs>
