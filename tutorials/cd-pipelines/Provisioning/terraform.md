---
sidebar_position: 0
hide_table_of_contents: true
title: Terraform 
---
## Terraform

This tutorial will help get started with Terraform as an IAC tool to provision target infrastructure from within Harness Pipeline. 

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-provision-terraform).

:::

## Before You Begin

Verify that you have the following:

1. **Terraform Cloud API Token**. refer this [doc](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/api-tokens) for more details.
2. Fork the **[harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub website, which contains the **Terraform .tf** files. 
3. A functioning **Harness Pipeline** that deploys an application on your cluster.

### Get Started

1. Login to [Harness](https://app.harness.io).
2. Select **Projects**, and then select **Default Project**.

### Secrets


3. Under **Project Setup**, select **Secrets**.
    - Select **New Secret**, and then select **Text**.
    - Enter the secret name `tf_token`.
    - For the secret value, paste the Terraform Cloud Token you saved earlier.
    - Select **Save**.

### Terraform Cloud Provider Connector

4. Create _Terraform Cloud Provider_ Connector.
- Copy the contents of [tfc-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/provision/tfc-connector.yml).
- In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
- Select **Create via YAML Builder** and paste the copied YAML.
- Select **Save Changes** and verify that the new connector named **harness_tfcconnector** is successfully created.
- Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.

### Create Pipeline with Custom Stage

5. In **Default Project**, select **Pipelines** from left nav-bar.
    - Select **New Pipeline** or **Create a Pipeline**.
    - Enter the name `TFC Pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start**

- In the pipeline studio, **Select Stage Type** as **Custom Stage**.
- Name the stage as `infra-provision` and **set up stage**. 
- Now click **Add Step** and search for **Terraform Cloud Run**.

### Terraform Cloud Run "Plan" Step

6. Under the **Step Parameters**, enter the name: **tfc_plan_step**
- Select the **Run Type** as **Plan Only**.
- Type in the **Run Message** as `Run from Harness`.
- Select the **harness_tfcconnector** under **Select Connector**.
- Select the required **Organization** and **Terraform Workspace**.
- Choose **_Apply_** as the **Command** Type
- In the **Provisioner Identifier**, enter **tfcdemo**
- Finally click **Apply Changes**.

### Terraform Cloud Run "Apply" Step

7. Click **Add Step** and search for **Terraform Cloud Run**.
- Under the **Step Parameters**, enter the name: **tfc_apply_step**
- Select the **Run Type** as **Apply**.
- In the **Provisioner Identifier**, enter **tfcdemo**, the same name that we entered in the previous step.
- Click **Save** to save the pipeline.


8. Finally, click on **Run** and **Run Pipeline** to execute the pipeline.

