---
title: CloudFormation Rollback step
sidebar_label: CloudFormation Rollback Step
description: Roll back a CloudFormation stack to the last successfully provisioned version using the CloudFormation Rollback Stack step.
keywords:
  - cloudformation
  - rollback
  - infrastructure rollback
  - aws
  - stack rollback
tags:
  - continuous delivery
  - aws
  - infrastructure
sidebar_position: 4
helpdocs_topic_id: 5ooc4heyl4
helpdocs_category_id: 31zj6kgnsg
helpdocs_is_private: false
helpdocs_is_published: true
---

import DocImage from '@site/src/components/DocImage';

Use the CloudFormation Rollback Stack step to roll back a CloudFormation stack to the last version that was successfully provisioned by Harness. This step is typically added to the **Rollback** section of your pipeline stage to automatically revert infrastructure changes when a deployment fails.

---

## What you will learn from this topic

- How to add the [CloudFormation Rollback Stack step](#add-the-rollback-stack-step) to your pipeline rollback section.
- How the [Provisioner Identifier](#provisioner-identifier) links the rollback operation to a previously created stack.
- How Harness determines [which stack version to restore](#rollback-behavior).

---

## Before you begin

- **Harness project access**: View and Execute permissions on Pipelines. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a> to configure roles.
- **AWS connector**: A Harness AWS connector with permissions to update CloudFormation stacks in your target AWS account. For more information, refer to <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference" target="_blank" rel="noopener noreferrer">AWS connector settings reference</a>.
- **Harness Delegate**: A delegate installed in an environment that can connect to AWS. For more information, refer to <a href="/docs/platform/delegates/install-delegates/overview" target="_blank" rel="noopener noreferrer">Delegate installation overview</a>.
- **CloudFormation stack created by Harness**: The Rollback Stack step only works with stacks provisioned by the CloudFormation Create Stack step. For more information, refer to <a href="/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-with-the-cloud-formation-create-stack-step" target="_blank" rel="noopener noreferrer">CloudFormation Create Stack step</a> and <a href="/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-provisioning-with-harness" target="_blank" rel="noopener noreferrer">CloudFormation provisioning</a>.

---

## Limitations

- You can only roll back to stacks that were provisioned by Harness. The CloudFormation Rollback Stack step does not work with stacks created outside of Harness.

---

## Add the Rollback Stack step

The CloudFormation Rollback Stack step is added to the **Rollback** section of your Deploy stage. When a deployment fails, Harness automatically runs the rollback steps to restore the infrastructure to its last known good state.

1. In the **Rollback** section of your Deploy stage, click **Add Step**.
2. Select **CloudFormation Rollback Stack**.
3. Enter a name for the step.
4. Set the **Timeout** for the rollback operation. The default is 10 minutes.

<div align="center">
<DocImage path={require('../../cd-advanced/cloudformation-howto/static/rollback-provisioned-infra-with-the-cloud-formation-rollback-step-03.png')} alt="CloudFormation Rollback Stack step in the Rollback section" width="80%" />
</div>

---

## Provisioner Identifier

In the **Provisioner Identifier** field, enter the same Provisioner Identifier you used in the CloudFormation Create Stack step that provisioned the stack you want to roll back.

Harness determines what to roll back using a combination of:

```
Provisioner Identifier + Harness account ID + Harness org ID + Harness project ID
```

If you used Harness expressions for any of these identifiers in the Create Stack step, Harness evaluates the expressions at runtime and uses the resulting values to identify the stack.

<details>
<summary>YAML example</summary>

```yaml
- step:
    type: RollbackStack
    name: Rollback CloudFormation Stack
    identifier: RollbackCloudFormationStack
    spec:
      provisionerIdentifier: cfn_infrastructure
    timeout: 10m
```

</details>

---

## Rollback behavior

When the CloudFormation Rollback Stack step runs, Harness restores the stack to the last version that was successfully provisioned by a CloudFormation Create Stack step with the same Provisioner Identifier.

The rollback operation uses the AWS CloudFormation stack update mechanism to revert the stack to its previous template and parameter values. If the previous version of the stack does not exist or was not successfully provisioned, the rollback fails.

---

## Next steps

- <a href="/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/remove-provisioned-infra-with-the-cloud-formation-delete-step" target="_blank" rel="noopener noreferrer">CloudFormation Delete Stack step</a>: Clean up CloudFormation stacks after testing or deployment.
- <a href="/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-provisioning-with-harness" target="_blank" rel="noopener noreferrer">CloudFormation provisioning</a>: Understand CloudFormation provisioning modes and capabilities in Harness.
