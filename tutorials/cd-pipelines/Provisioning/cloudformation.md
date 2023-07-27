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

<!-- ```mdx-code-block
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
``` -->

```mdx-code-block
<Tabs>
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

### Get Started

1. Login to [Harness](https://app.harness.io).
2. Select **Projects**, and then select **Default Project**.

### AWS Connector

1. Copy the contents of [aws-connector.yml](https://github.com/harness-community/harnesscd-example-apps/pull/26/files).
2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
3. Select **Create via YAML Builder** and paste the copied YAML.
4. Replace the `accessKey` placeholder with the [AWS access key](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html) for the AWS user you created (with the required policies).
5. Add the permananet secret key in `secretKeyRef`. 
6. Here we assume the `region` for secret key to be `us-east-1`. Please replace it with the appropriate region.
7. Add an active delegate under the `delegateSelectors`. 
8. In `projectIdentifier`, replace with the project identifier with yours, for example, `default`. 
9. Select **Save Changes** and verify that the new connector named **harness_awsconnector** is successfully created.
10. Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.

### Github Connector

:::info

If you already have a git connector that gives access to your forked [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps), then proceed to creating a pipeline directly. 

:::

1. Create the **GitHub connector**.
    - Copy the contents of [github-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/github-connector.yml).
    - In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
    - Select **Create via YAML Builder** and paste the copied YAML.
    - Assuming you have already forked the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML.
    - In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor will suggest the correct Id.
    - Select **Save Changes** and verify that the new connector named **harness_gitconnector** is successfully created.
    - Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.

### Create Pipeline with Custom Stage

1. In **Default Project**, select **Pipelines** from left nav-bar.
    - Select **New Pipeline** or **Create a Pipeline**.
    - Enter the name `cf_provisioned_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start**

2. In the pipeline studio, **Select Stage Type** as **Custom Stage**.
3. Name the stage as `infra-provision` and **set up stage**. 
4. Now Add Step and search for **CloudFormation Create Stack**.

### CloudFormation Create Stack Step

5. Under the **Step Parameters** add the **Provision Identifier** as `demo-provision`.
6. Add the **AWS Connector** you created before and add the region for which your connector has persmission to create the Cloudformation Stack.
7. Assuming you have already forked the harness-cd-example apps and have a functional github connector, use the same to add the template file in the file store.
8. Select the **Git Fetch type** as `Latest from Branch` and add the **Branch** as `main` and **Template File Path** as `cf_template.yaml` and **Submit**
9. Now provide the **Stack Name** as `harness-provisoned-stack` and **Apply Changes**.
10. Now **Save** and **Run** the pipeline. 

Check your AWS Management console for CloudFormation and you'll find the new CloudFormation Stack created. 


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