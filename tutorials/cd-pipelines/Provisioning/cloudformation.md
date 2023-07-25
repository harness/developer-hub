---
sidebar_position: 0
hide_table_of_contents: true
title: Cloudformation 
---
## Use of Cloudformation to provision pipeline and infrastructure.

This tutorial will focus on the usaage of [AWS Cloudformation](https://aws.amazon.com/cloudformation/) as an IAAC tool to provision harness pipeline and infrastructure within harness pipeline. 

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-provision-cloudformation).

:::

```mdx-code-block
<Tabs>
<TabItem value="Provision deployment infrastructure dynamically ">
```
:::info

Dynamic provisioning is only supported in [Service and Environments v1](https://developer.harness.io/docs/continuous-delivery/get-started/upgrading/upgrade-cd-v2), and will be added to Service and Environments v2 soon. Until then, you can create a stage to provision the target infrastructure and then a subsequent stage to deploy to that provisioned infrastructure.

:::

This tutorial will provision a CD stage's deployment infrastructure resources using the CloudFormation **Create Stack**, **Delete Stack**, and **Rollback Stack** steps, in the **Infrastructure section** before deployment.

```mdx-code-block
<Tabs>
<TabItem value="Provision deployment infrastructure">
```
This tutorial will focus on the use of Cloudformation to provision the target infrastructure for a deployment, and then deploy to that provisioned infrastructure.

```mdx-code-block
</TabItem>
<TabItem value="Provision other resources">
```
This totrial will focsus on the use of Cloudformation to provision any resources other than the target infrastructure for the deployment in the pipeline. 

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
<TabItem value="Provision and Delete infrastructure">
```

```mdx-code-block
<Tabs>
<TabItem value="Provision with Cloudformation Create Stack">
```
This tutorial will provision resources in a **Custom stage** using the CloudFormation **Create Stack** step.

## Before You Begin

Verify that you have the following:

1. **A Kubernetes cluster** in Cloudformation: Create a **stack** in CloudFormation to provsion a **EKS cluster** to be used as **deployment infrastructure**.
2. **Obtain GitHub personal access token with the repo scope**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). 
3. Fork the **[harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub website, which contains the **CF template** file. 
4. A functioning **Harness Pipeline** that deploys an application on your cluster using a mnifest, please follow this [get started tutorial](tutorials/cd-pipelines/kubernetes/manifest.md) to set it up. 

```mdx-code-block
</TabItem>
<TabItem value="Rollback provisioned infrastructure with the CloudFormation Rollback step">
```
This tutorial will **rollback infrastructure** using **CloudFormation Rollback Stack step** in the **Rollback section** of your Deploy stage.


```mdx-code-block
</TabItem>
<TabItem value="Remove provisioned infrastructure with the CloudFormation Delete step">
```

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
</Tabs>
```