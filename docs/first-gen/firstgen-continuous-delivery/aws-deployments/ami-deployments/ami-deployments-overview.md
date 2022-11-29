---
title: AMI/ASG Deployments How-tos
description: Links to Harness' deployment guides covering AMI (Amazon Machine Image) Basic, Canary, and Blue/Green deployments.
# sidebar_position: 2
helpdocs_topic_id: ox5ewy2sf4
helpdocs_category_id: mizega9tt6
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness' AMI deployment guides walk you through deploying Amazon Machine Images to AWS (Amazon Web Services). 

1. [AMI Basic Deployment](/article/rd6ghl00va-ami-deployment)
2. [AMI Canary Deployment](/article/agv5t7d156-ami-canary)
3. [AMI Blue/Green Deployment](/article/vw71c7rxhp-ami-blue-green)

For an overview of AWS AMI deployments, see [AWS AMI Deployments Overview](/article/aedsdsw9cm-aws-ami-deployments-overview).

For steps on using provisioners as part of the deployment, see [Infrastructure Provisioners Overview](/article/o22jx8amxb-add-an-infra-provisioner).

### Only Private AMIs are Supported

Harness only supports private AMIs.

AWS EC2 allows you to share an AMI so that all AWS accounts can launch it. AMIs shared this way are called public AMIs. Harness does not support public AMIs.

