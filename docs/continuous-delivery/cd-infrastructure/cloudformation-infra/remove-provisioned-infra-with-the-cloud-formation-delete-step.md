---
title: CloudFormation Delete step
sidebar_label: CloudFormation Delete Step
description: Remove CloudFormation stacks provisioned by Harness using the CloudFormation Delete Stack step.
keywords:
  - cloudformation
  - delete stack
  - remove infrastructure
  - aws
  - deprovisioning
tags:
  - continuous delivery
  - aws
  - infrastructure
sidebar_position: 5
helpdocs_topic_id: mmzimok6vp
helpdocs_category_id: 31zj6kgnsg
helpdocs_is_private: false
helpdocs_is_published: true
---

import DocImage from '@site/src/components/DocImage';

Use the CloudFormation Delete Stack step to remove AWS resources provisioned by the CloudFormation Create Stack step. You can delete stacks in the same pipeline or in any pipeline within your Harness project by referencing the same Provisioner Identifier.

---

## What you will learn from this topic

- How to add the [CloudFormation Delete Stack step](#add-the-delete-stack-step) to your pipeline.
- How to configure the step using [Inline](#inline-configuration) or [Inherit from Create](#inherit-from-create-configuration) modes.
- How the [Provisioner Identifier](#provisioner-identifier-scope) links Create and Delete operations across pipelines.

---

## Before you begin

- **Harness project access**: View and Execute permissions on Pipelines. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a> to configure roles.
- **AWS connector**: A Harness AWS connector with permissions to delete CloudFormation stacks in your target AWS account. For more information, refer to <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference" target="_blank" rel="noopener noreferrer">AWS connector settings reference</a>.
- **Harness Delegate**: A delegate installed in an environment that can connect to AWS. For more information, refer to <a href="/docs/platform/delegates/install-delegates/overview" target="_blank" rel="noopener noreferrer">Delegate installation overview</a>.
- **CloudFormation stack created by Harness**: The Delete Stack step removes stacks provisioned by the CloudFormation Create Stack step. For more information, refer to <a href="/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-with-the-cloud-formation-create-stack-step" target="_blank" rel="noopener noreferrer">CloudFormation Create Stack step</a>.

---

## Add the Delete Stack step

You can use the CloudFormation Delete Stack step to remove stacks provisioned by the CloudFormation Create Stack step or any CloudFormation stacks in your AWS account.

In the **Execution** section of your Deploy stage, click **Add Step**, and then select **CloudFormation Delete Stack**.

---

## Configuration modes

The CloudFormation Delete Stack step supports two configuration modes:

### Inline configuration

The Inline mode lets you specify the stack details directly in the Delete Stack step. Use this mode to delete any CloudFormation stack in your AWS account, whether or not it was created by Harness.

1. In the **Configuration Type** field, select **Inline**.
2. In **AWS Connector**, select the Harness AWS connector for your target AWS account. The connector credentials must have permissions to delete CloudFormation stacks. For more information, refer to <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference" target="_blank" rel="noopener noreferrer">AWS connector settings reference</a>.
3. In **Region**, select the AWS region where the stack exists.
4. In **Role ARN**, enter the AWS IAM Role ARN to use when deleting the stack. This is the same role you would use when deleting a stack using the AWS console or CLI.
5. In **Stack Name**, enter the name of the CloudFormation stack to delete.

<div align="center">
<DocImage path={require('../../cd-advanced/cloudformation-howto/static/remove-provisioned-infra-with-the-cloud-formation-delete-step-06.png')} alt="CloudFormation Delete Stack step configuration" width="80%" />
</div>

<details>
<summary>Inline configuration YAML example</summary>

```yaml
- step:
    type: DeleteStack
    name: Delete CloudFormation Stack
    identifier: Delete_Stack
    spec:
      configuration:
        type: Inline
        spec:
          connectorRef: your_aws_connector
          region: us-east-1
          roleArn: arn:aws:iam::123456789012:role/CloudFormationRole
          stackName: my-cloudformation-stack
      connectorRef: your_aws_connector
    timeout: 10m
```

</details>

### Inherit from Create configuration

The Inherit from Create mode deletes the stack that was provisioned by a CloudFormation Create Stack step with the same Provisioner Identifier. Use this mode to tear down infrastructure provisioned earlier in the same pipeline or in a different pipeline within your project.

1. In the **Configuration Type** field, select **Inherit from Create**.
2. In **Provisioner Identifier**, enter the same Provisioner Identifier you used in the CloudFormation Create Stack step that provisioned the stack you want to delete.

Harness determines what to delete using a combination of `Provisioner Identifier + Harness account ID + Harness org ID + Harness project ID`.

<details>
<summary>Inherit from Create configuration YAML example</summary>

```yaml
- step:
    type: DeleteStack
    name: Delete Provisioned Stack
    identifier: DeleteProvisionedStack
    spec:
      provisionerIdentifier: cfn_infrastructure
      configuration:
        type: InheritFromCreate
    timeout: 10m
```

</details>

---

## Provisioner Identifier scope

The Provisioner Identifier is a project-wide setting. You can reference it across pipelines in the same Harness project.

When using the Inherit from Create mode, all project members must know the Provisioner Identifiers in use. This prevents one team member from accidentally deleting infrastructure provisioned by another team member in a different pipeline.

---

## Next steps

- <a href="/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/rollback-provisioned-infra-with-the-cloud-formation-rollback-step" target="_blank" rel="noopener noreferrer">CloudFormation Rollback Stack step</a>: Roll back a stack to its last successfully provisioned version.
- <a href="/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-provisioning-with-harness" target="_blank" rel="noopener noreferrer">CloudFormation provisioning</a>: Understand CloudFormation provisioning modes and capabilities in Harness.
