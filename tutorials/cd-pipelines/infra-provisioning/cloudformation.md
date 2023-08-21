---
sidebar_position: 0
hide_table_of_contents: true
title: AWS CloudFormation 
---

This tutorial focuses on the usage of [AWS CloudFormation](https://aws.amazon.com/cloudformation/) as an Infrastructure-as-a-code tool to provision Harness infrastructure within a Harness pipeline. 

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
This tutorial will focus on the use of CloudFormation to provision the target infrastructure for a deployment, and then deploy to that provisioned infrastructure.

```mdx-code-block
</TabItem>
<TabItem value="Provision other resources">
```
This totrial will focsus on the use of CloudFormation to provision any resources other than the target infrastructure for the deployment in the pipeline. 

```mdx-code-block
</TabItem>
</Tabs>
``` -->

## Provision and delete infrastructure



```mdx-code-block
<Tabs>
<TabItem value="Provision with CloudFormation Create Stack">
```
This tutorial will provision resources in a **Custom stage** using the CloudFormation **Create Stack** step.

### Before you begin

Verify that you have the following:

1. **A Kubernetes cluster** in CloudFormation: Create a **stack** in CloudFormation to provision an **EKS cluster** to be used as **deployment infrastructure**.
2. **Obtain GitHub personal access token with the repo scope**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). 
3. Fork the **[harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub website, which contains the **CF template** file. 
4. A functioning **Harness pipeline** that deploys an application on your cluster using a manifest. Please follow this [get started tutorial](https://developer.harness.io/tutorials/cd-pipelines/kubernetes/manifest) to set it up. 

### Get started

1. Log into [Harness](https://app.harness.io).
2. Select **Projects**, and then select **Default Project**.

### Secrets


1. Under **Project Setup**, select **Secrets**.
    - Select **New Secret**, and then select **Text**.
    - Enter the secret name `harness_gitpat`.
    - For the secret value, paste the GitHub personal access token you saved earlier.
    - Select **Save**.

### AWS connector

1. Copy the contents of [aws-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/cloudformation/aws-connector.yml).
2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
3. Select **Create via YAML Builder** and paste the copied YAML.
4. Replace the `accessKey` placeholder with the [AWS access key](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html) for the AWS user you created (with the required policies).
5. Add the permananet secret key in `secretKeyRef`. 
6. Here we assume the `region` for secret key to be `us-east-1`. Please replace it with the appropriate region.
7. Add an active delegate under the `delegateSelectors`. 
8. In `projectIdentifier`, replace with the project identifier with yours, for example, `default`. 
9. Select **Save Changes** and verify that the new connector named **harness_awsconnector** is successfully created.
10. Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.

### GitHub connector

:::info

If you already have a Git connector that gives access to your forked [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps) repo, then proceed to creating a pipeline directly. 

:::

1. Create the **GitHub connector**.
    - Copy the contents of [github-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/github-connector.yml).
    - In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
    - Select **Create via YAML Builder** and paste the copied YAML.
    - Assuming you have already forked the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML.
    - In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor will suggest the correct Id.
    - Select **Save Changes** and verify that the new connector named **harness_gitconnector** is successfully created.
    - Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.

### Create pipeline with custom stage

1. In **Default Project**, select **Pipelines**.
    - Select **New Pipeline** or **Create a Pipeline**.
    - Enter the name `cf_provisioned_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start**.
2. In the pipeline studio, in **Select Stage Type**, select **Custom Stage**.
3. Name the stage `infra-provision` and select **Set Up Stage**. 
4. Select **Add Step**, and select **CloudFormation Create Stack**.

### CloudFormation Create Stack step

1. Under **Step Parameters**, add the **Provision Identifier** as `demoprovision`.
2. Add the **AWS Connector** you created before and add the region for which your connector has persmission to create the CloudFormation Stack.
3. Assuming you have already forked the **harness-cd-example** apps repo and have a functional GitHub connector, use the same connector to add the template file in the file store.
4. Select the **Git Fetch type** as `Latest from Branch`, add the **Branch** as `main`, set the **Template File Path** as `cloudformation/cf_template.yaml`, and select **Submit**
5. Now provide the **Stack Name** as `harness-provisoned-stack` and select **Apply Changes**.
6. Now **Save** and **Run** the pipeline. 

Check your AWS Management console for CloudFormation and you'll find the new CloudFormation Stack created. 


```mdx-code-block
</TabItem>
<TabItem value="Rollback provisioned infrastructure with the CloudFormation Rollback step">
```
This tutorial will rollback infrastructure using the **CloudFormation Rollback Stack step** in the **Rollback**  section of your Deploy stage.

:::info

This tutorial is a continuation of the previous tab using the **Create Stack** step in a **Custom Stage**.

:::

### Before you begin

Verify that you have the following:

1. You have a working Kubernetes cluster that will be used as the deployment infrastructure. Please follow the previous tab to provision it using CloudFormation. 

### Getting Started with Harness CD

1. Log into [Harness](https://app.harness.io/).
2. Select **Projects**, and then select the **Default Project** where you created the pipeline `cf_provisioned_pipeline` (in the previous tab). 
3. Now install the following resources to be used in the pipeline. 

### Delegate

1. Under **Project Setup**, select **Delegates**.
    - Select **Tokens**.
        - Select **New Token**.
        - Name the token `delegate_token`.
        - Select **Apply**.
        - Copy the token value using the copy icon and store it somewhere.
        - Select **Close**.
    - Select **Delegates**.
        - Select **New Delegate**.
          
          For this tutorial, let's explore how to install a delegate using Helm.

        - Add the Harness Helm chart repo to your local helm registry using the following commands.
        
        ```bash
        helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
        ```

        - Update the repo:

        ```bash
        helm repo update harness-delegate
        ```

        -  In the command provided, `ACCOUNT_ID` and `MANAGER_ENDPOINT` are auto-populated values that you can obtain from the delegate installation wizard.
        -  Replace **DELEGATE_TOKEN** in the command with the token that was copied earlier and proceed with delegate installation.

         
        ```bash
        helm upgrade -i helm-delegate --namespace harness-delegate-ng --create-namespace \
        harness-delegate/harness-delegate-ng \
         --set delegateName=helm-delegate \
         --set accountId=ACCOUNT_ID \
         --set managerEndpoint=MANAGER_ENDPOINT \
         --set delegateDockerImage=harness/delegate:23.03.78904 \
         --set replicas=1 --set upgrader.enabled=false \
         --set delegateToken=DELEGATE_TOKEN
        ```
        - Select **Verify** to verify that the delegate is installed successfully and can connect to the Harness Manager.

:::note

You can also follow the [Install Harness Delegate on Kubernetes or Docker](https://developer.harness.io/tutorials/platform/install-delegate/) tutorial to install the delegate using the Harness Terraform Provider or a Kubernetes manifest.

:::


### Secrets

1. Under **Project Setup**, select **Secrets**.
    - Select **New Secret**, and then select **Text**.
    - Enter the secret name `harness_gitpat`.
    - For the secret value, paste the GitHub personal access token you saved earlier.
    - Select **Save**.

### Connectors

1. Create the **GitHub connector**.
    - Copy the contents of [github-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/github-connector.yml).
    - In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
    - Select **Create via YAML Builder** and paste the copied YAML.
    - Assuming you have already forked the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML.
    - In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor will suggest the correct Id.
    - Select **Save Changes** and verify that the new connector named **harness_gitconnector** is successfully created.
    - Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.

:::info

Here we are using the same EKS cluster we provisioned in the **Provision with CloudFormation Create Stack** tab.

:::

1. Create the **Kubernetes connector**.
    - Copy the contents of [kubernetes-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/kubernetes-connector.yml).
    - In your Harness project, under **Project Setup**, select **Connectors**.
    - Select **Create via YAML Builder** and and paste the copied YAML.
    - Replace **DELEGATE_NAME** with the installed Delegate name. To obtain the Delegate name, navigate to **Project Setup**, and then **Delegates**.
    - Select **Save Changes** and verify that the new connector named **harness_k8sconnector** is successfully created.
    - Finally, select **Connection Test** under **Connectivity Status** to verify the connection is successful.

### Environment

1. In your Harness project, select **Environments**.
    - Select **New Environment**, and then select **YAML**.
    - Copy the contents of [environment.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/environment.yml), paste it into the YAML editor, and select **Save**.
    - In your new environment, select the **Infrastructure Definitions** tab.
    - Select **Infrastructure Definition**, and then select **YAML**.
    - Copy the contents of [infrastructure-definition.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/infrastructure-definition.yml) and paste it into the YAML editor.
    - Select **Save** and verify that the environment and infrastructure definition are created successfully.

### Services


1. In your Harness project, select **Services**.
    - Select **New Service**.
    - Enter the name `harnessguestbook`.
    - Select **Save**, and then **YAML** (on the **Configuration** tab).
    - Select **Edit YAML**, copy the contents of [service.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/service.yml), and paste the into the YAML editor.
    - Select **Save**, and verify that the service **harness_guestbook** is successfully created.



### Deploy stage and rollback the infrastructure

1. In the `cf_provisioned_pipeline` you already created, add a new **stage** after the `infra_provision` Custom stage and, in **Select Stage Type**, select **Deploy**.
2. Now in the **Select Service** drop-down select the `harness_guestbook` and select **Continue**.
3. Specify the environment as `harnessdevenv` and select the infrastructure `harness_k8sinfra`.
4. Select **Continue**.
5. For the execution type, select the **Canary** strategy. 
6. Select **Add Step**, and add the **CLoudFormation Rollback** step. 
7. In **Provisioner Identifier**, enter `demoprovision` and apply changes.
8. Select **Save** and **Run** the pipeline. 


```mdx-code-block
</TabItem>
</Tabs>
```