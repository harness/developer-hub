---
title: CloudFormation provisioning with Harness
description: Use CloudFormation to provision infrastructure.
sidebar_position: 1
helpdocs_topic_id: vu2qi7dfzm
helpdocs_category_id: 31zj6kgnsg
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to use AWS CloudFormation to provision infrastructure as part of your deployment process.

Harness can provision any resource that is supported by CloudFormation.

:::note

Looking for How-tos? See [CloudFormation How-tos](./cloud-formation-how-tos.md).

:::

## CloudFormation provisioning options

You can use Harness with CloudFormation in two ways:

* **Dynamic infrastructure provisioning:** you can provision the target infrastructure for a deployment as part of the stage's **Environment** settings, and then deploy to that provisioned infrastructure in the same stage.
* **Ad hoc provisioning:** provision any resources other than the target infrastructure for the deployment.

You can do both in the same stage if you want.

For details on these provisioning options, go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview).

## CloudFormation dynamic infrastructure provisioning summary

Dynamic provisioning uses your CloudFormation templates to provision the target deployment infrastructure for the current pipeline stage.

Dynamic provisioning with CloudFormation is supported for most Harness integrations. The steps required for each integration are covered in their documentation.

For more information, go to [Provision target deployment infrastructure dynamically with CloudFormation](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-target-deployment-infra-dynamically-with-cloud-formation).

### Limitations

Infrastructure provisioning is limited to specific infrastructure settings for the target environment.

For example, the platform-agnostic Kubernetes infrastructure (Direct) requires that you have an existing cluster, so you cannot provision a new cluster. But it does let you provision a namespace.

## CloudFormation rollback

When rollback happens, Harness rolls back the provisioned infrastructure/resources to the previous successful version of the CloudFormation stack.

Harness won't increment the serial in the state, but perform a hard rollback to the exact version of the state provided.

Harness determines what to rollback using the **Provision Identifier** entered in the **CloudFormation Rollback** step.

If you've made these settings using Harness expressions, Harness uses the values it obtains at runtime when it evaluates the expression.

See [Rollback Provisioned Infra with the CloudFormation Rollback Step](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/rollback-provisioned-infra-with-the-cloud-formation-rollback-step).

