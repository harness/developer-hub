---
title: General CloudFormation Provisioning FAQs
description: Frequently asked questions about CloudFormation provisioning.
sidebar_position: 6
---

#### Is there a method to simulate CloudFormation changes without actually applying them?

Yes, you can achieve this by utilizing the Change Set Feature. First, create a change set to preview the changes that will be made. Once you are satisfied with the preview, you can execute the change set using the command: [aws cloudformation execute-change-set](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/execute-change-set.html). This allows you to assess the impact of the changes before applying them.

### How can you use CloudFormation with Harness?

You can use Harness with CloudFormation in two ways:
Dynamic infrastructure provisioning: you can provision the target infrastructure for a deployment as part of the stage's Environment settings, and then deploy to that provisioned infrastructure in the same stage.
Ad hoc provisioning: provision any resources other than the target infrastructure for the deployment.



