---
title: Deploy your own microservice application
description: Deploy your own microservice application
hide_table_of_contents: true
sidebar_position: 3
redirect_from:
  - /tutorials/cd-pipelines/kubernetes/ownapp
---

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Delivery & GitOps Certification today!"
  link="/university/continuous-delivery"
  closable={true}
  target="_self"
/>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--
Import statements for CLI downloads
<MacOSCLI />, <WindowsCLI />, <ARMCLI />, <AMDCLI />
-->

import MacOSCLI from '/docs/platform/shared/cli/mac.md';
import WindowsCLI from '/docs/platform/shared/cli/windows.md';
import ARMCLI from '/docs/platform/shared/cli/arm.md';
import AMDCLI from '/docs/platform/shared/cli/amd.md';

This tutorial is a continuation of the [Kubernetes Manifest tutorial](./manifest). In that tutorial, we guided you through creating a sample pipeline using the Guestbook sample app. In this tutorial, we'll walk you through deploying your own microservice app with the Harness CD pipeline or GitOps workflow.

**Sock Shop**, developed by Weaveworks, serves as a polyglot architectural pattern to showcase microservices-based deployments. This application suite integrates a range of technologies, such as SpringBoot, Go, REDIS, MYSQL, MongoDB, among others. We've chosen the Sock Shop as our demonstration app for the deployment process in Harness.

You can use the same steps to integrate and deploy your own microservice app.

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-manifest).

:::

You can choose to proceed with the tutorial either by using the command-line interface (Harness CLI) or the user interface (Harness UI).

<Tabs>
<TabItem value="GitOps Workflow">

## Before you begin \{#before-you-begin-gitops}

Verify that you have the following:

1. **A Kubernetes cluster**. We recommend [K3D](https://k3d.io/v5.5.1/) for installing the Harness GitOps Agent and deploying a sample application in a local development environment.
   - For requirements, go to [Harness GitOps Agent Requirements](/docs/continuous-delivery/gitops/connect-and-manage/install-a-harness-git-ops-agent#requirements).
2. **Fork the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository using the GitHub web interface to utilize the Harness resource YAMLs.

## Getting Started with Harness GitOps

<Tabs>
<TabItem value="ui" label="UI">

1. Login to [Harness](https://app.harness.io/).
2. Select **Projects**, and then select **Default Project**.
3. Select **Deployments**, and then select **GitOps**.

### GitOps Agent

1. You have the option to use the same agent that you deployed during the Manifest tutorial or to deploy a new agent by following the steps below. However, remember to use a newly created agent identifier when creating repositories and clusters.
   - Select **Settings**, and then select **GitOps Agents**.
   - Select **New GitOps Agent**.
   - When are prompted with **Do you have any existing Argo CD instances?**, select **Yes** if you already have a Argo CD Instance, or else choose **No** to install the **Harness GitOps Agent**.

<Tabs  queryString="gitopsagent">
<TabItem value="agent-fresh-install" label="Harness GitOps Agent Fresh Install">

- Select **No**, and then select **Start**.
- In **Name**, enter the name for the new Agent `ownappagent`
- In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment.
  - For this tutorial, let's use the `default` namespace to install the Agent and deploy applications.
- Select **Continue**. The **Review YAML** settings appear.
- This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.

  ```
  kubectl apply -f gitops-agent.yml -n default
  ```

- Select **Continue** and verify the Agent is successfully installed and can connect to Harness Manager.

</TabItem>
<TabItem value="existingargo" label="Harness GitOps Agent with existing Argo CD instance">

- Select **Yes**, and then select **Start**.
- In **Name**, enter the name for the existing Argo CD project.
- In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment.
- Select **Next**. The **Review YAML** settings appear.
- This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.

  ```yaml
  kubectl apply -f gitops-agent.yml -n default
  ```

- Once you have installed the Agent, Harness will start importing all the entities from the existing Argo CD Project.

</TabItem>
</Tabs>

### Repositories

1. Select **Settings**, and then select **Repositories**.
   - Select **New Repository**.
   - Choose **Git**.
     - Enter a name in **Repository**: `ownapp_repo`.
     - In **GitOps Agent**, select the Agent that you installed in your cluster and select **Apply**.
     - In **Git Repository URL**, paste `https://github.com/microservices-demo/microservices-demo`.
     - Select **Continue** and choose **Specify Credentials For Repository**.
       - Select **HTTPS** as the **Connection Type**.
       - Select **Anonymous (no credentials required)** as the **Authentication** method.
       - Select **Save & Continue** and wait for Harness to verify the connection.
       - Finally, select **Finish**.

### Clusters

1. Select **Settings**, and then select **Clusters**.
   - Select **New Cluster**.
     - In **Name**, enter a name for the cluster: `ownnapp_cluster`.
     - In **GitOps Agent**, select the Agent you installed in your cluster, and then select **Apply**.
     - Select **Continue** and select **Use the credentials of a specific Harness GitOps Agent**.
     - Select **Save & Continue** and wait for the Harness to verify the connection.
     - Finally, select **Finish**.

### Applications

1. Select **Applications**.

   - Select **New Application**.

     - Enter the **Application Name**: `sockshop`.
     - In **GitOps Agent**, select the Agent that you installed in your cluster and select **Apply**.
     - Select **New Service**, and then toggle to **YAML** to use the YAML editor.
     - Select **Edit YAML**, paste in the YAML below, and then select **Save**.

     ```yaml
     service:
       name: ownapp_service
       identifier: ownappservice
       serviceDefinition:
         type: Kubernetes
         spec: {}
       gitOpsEnabled: true
     ```

     - Select **New Environment**, and the toggle to **YAML** to use the YAML editor.
     - Select **Edit YAML**, paste in the YAML below, and then select **Save**.

     ```yaml
     environment:
       name: ownapp_env
       identifier: ownappenv
       description: ""
       tags: {}
       type: PreProduction
       orgIdentifier: default
       projectIdentifier: default_project
       variables: []
     ```

     - Next, select **Continue**, keep the **Sync Policy** settings as is, and select **Continue**.
     - In **Repository URL**, select the **Repository** you created earlier, and then select **Apply**.
     - Select **master** as the **Target Revision**, type `deploy/kubernetes` in the **Path**, and then select **Enter**.
     - Select **Continue** and select the **Cluster** created in the above steps.
     - In **Namespace**, enter the target namespace for Harness GitOps to sync the application.
     - Enter `default` and select **Finish**.

2. Finally, it's time to **Synchronize** the GitOps Application state. Select **Sync**, check the Application details, and then select **Synchronize** to initiate the deployment.

   - After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

     ```bash
     kubectl get pods -n sock-shop
     ```

   - Sock Shop is accessible via the master and any of the node urls on port `30001`.

A successful Application sync will display the following status tree under **Resource View**.

</TabItem>
<TabItem value="terraform" label="Terraform Provider">

Harness offers a [Terraform Provider](https://registry.terraform.io/providers/harness/harness/latest/docs) to help you declaratively manage Harness GitOps entities alongside your application and cluster resources. These steps walk through using Terraform to create and install the GitOps agent, define related Harness entities, and deploy a sample application to your cluster.

<DocVideo src="https://www.youtube.com/watch?v=U_XkKcfg8ts" width="75%" />

Before proceeding:

1. Generate a [Harness API token](/docs/platform/automation/api/add-and-manage-api-keys/#create-personal-api-keys-and-tokens).
1. Make sure [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) is installed on a computer that can connect to your cluster.

### Harness Terraform Provider

1. Clone or download the Harness [gitops-terraform-onboarding](https://github.com/harness-community/gitops-terraform-onboarding) project.

```
git clone https://github.com/harness-community/harnesscd-example-apps.git
cd deploy-own-app/gitops/terraform
```

2. Initialize the Terraform configuration. This step will also install the Harness provider plugin.

```bash
terraform init
```

<details>
<summary>What is a Terraform Provider?</summary>

A Terraform Provider is a plugin that allows Terraform to define and manage resources using a particular software API. In this tutorial these resources will be Harness entities.

</details>

### Input variables

1. Open **terraform.tfvars**. This file contains example values for the Harness entities that will be created.

```file
project_id            = "default_project"
org_id                = "default"
agent_identifier      = "ownappagent"
agent_name            = "ownappagent"
agent_namespace       = "default"
repo_identifier       = "ownapprepo"
repo_name             = "ownapprepo"
repo_url              = "https://github.com/microservices-demo/microservices-demo/"
cluster_identifier    = "ownappcluster"
cluster_name          = "ownappcluster"
env_name              = "ownappenv"
service_name          = "ownappservice"
```

2. In **terraform.tfvars**, change the value of **repo_url** to _https://github.com/microservices-demo/microservices-demo/_ repository or to your own app repo.

   - You are welcome to keep the other variable values as they are or rename them to suit your environment.

3. Set **account_id** and **harness_api_token** as Terraform environment variables. Your Account ID can be found in the URL after account/ when you are logged into app.harness.io.

```
export TV_VAR_account_id="123abcXXXXXXXX"
export TV_VAR_harness_api_token="pat.abc123xxxxxxxxxx…"
```

:::warning

Never store your Harness API Key in a plain text configuration file or in version control. Use an environment variable or dedicated secrets manager.

:::

### Terraform module

<details>
<summary>What is a Terraform module?</summary>

A Terraform module is a collection of files that define the desired state to be enforced by Terraform. These files normally have the .tf extension.

</details>

1. Open **agent.tf**. This file defines the GitOps agent in Harness and then deploys the agent manifest to your cluster. The agent is created using the harness_gitops_platform_agent resource.

```json
resource "harness_platform_gitops_agent" "gitops_agent" {
  identifier = var.agent_identifier
  account_id = var.account_id
  project_id = var.project_id
  org_id     = var.org_id
  name       = var.agent_name
  type       = "MANAGED_ARGO_PROVIDER"
  metadata {
    namespace         = var.agent_namespace
    high_availability = false
  }
}
```

If you have an _existing_ Argo CD instance, change the <strong>type</strong> argument to <strong>CONNECTED_ARGO_PROVIDER</strong>. Otherwise leave as is.

2. If you’ve made changes to any configuration files, verify the syntax is still valid.

```bash
terraform validate
```

3. Preview the changes Terraform will make in Harness and your cluster.

```bash
terraform plan
```

4. Apply the Terraform configuration to create the Harness and cluster resources. Type **yes** to confirm when prompted.

```bash
terraform apply
```

Observe the output of `terraform apply` as your resources are created. It may take a few minutes for all the resources to be provisioned.

### Verify GitOps deployment

1. Log into [https://app.harness.io](https://app.harness.io). Select **Deployments**, then **GitOps**.

   - Select **Settings**, and then select **GitOps Agents**
   - Verify your GitOps agent is listed and displays a HEALTHY health status.

2. Navigate back to **Settings**, and then select **Repositories**.

   - Verify your **harnesscd-example-apps** repo is listed with Active connectivity status.

3. Navigate back to **Settings**, and then select **Clusters**.

   - Verify you cluster with its associated GitOps agent is listed with Active connectivity status.

4. Select **Application** from the top right of the page.

   - Click into the **sockshop** application. This is the application deployed from the **microservices-demo/microservices-demo/** repo.
   - Select **Resource View** to see the cluster resources that have been deployed. A successful Application sync will display the following status tree.

5. Return to a local command line. Confirm you can see the GitOps agent and guestbook application resources in your cluster.

```
kubectl get deployment -n default
kubectl get svc -n default
kubectl get pods -n default
```

6.  To access the Sockshop application deployed via the Harness GitOps, you can check the deployment on your Kubernetes cluster using the following command:
    `bash
     kubectl get pods -n sock-shop
     `
    - Sock Shop is accessible via the master and any of the node urls on port `30001`.

### Cleaning up

1. If you know longer need the resources created in this tutorial, run the following command to delete the GitOps agent and associated Harness entities.

```
terraform destroy
```

**Note:** Since deleting the Sockshop application in Harness does not delete the deployed cluster resources themselves, you’ll need to manually remove the Kubernetes deployment.

</TabItem>
<TabItem value="cli" label="CLI">

1. Refer [Install and Configure Harness CLI](https://developer.harness.io/docs/platform/automation/cli/install) doc to setup and configure Harness CLI.

2. Clone the Forked **harnesscd-example-apps** repo and change directory.

   ```bash
   git clone https://github.com/GITHUB_ACCOUNTNAME/harnesscd-example-apps.git
   cd harnesscd-example-apps/deploy-own-app/gitops
   ```

   :::note

   Replace `GITHUB_ACCOUNTNAME` with your GitHub Account name.

   :::

3. You have the option to use the same agent that you deployed during the Manifest tutorial or to deploy a new agent by following the steps below. However, remember to use a newly created agent identifier when creating repositories and clusters.
   - Select **Settings**, and then select **GitOps Agents**.
   - Select **New GitOps Agent**.
   - When you are prompted with **Do you have any existing Argo CD instances?**, select **Yes** if you already have a Argo CD Instance, or else choose **No** to install the **Harness GitOps Agent**.

<Tabs  queryString="gitopsagent">
<TabItem value="agent-fresh-install" label="Harness GitOps Agent Fresh Install">

- Select **No**, and then select **Start**.
- In **Name**, enter the name for the new Agent `ownappagent`
- In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment.
  - For this tutorial, let's use the `default` namespace to install the Agent and deploy applications.
- Select **Continue**. The **Review YAML** settings appear.
- This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.

  ```
  kubectl apply -f gitops-agent.yml -n default
  ```

- Select **Continue** and verify the Agent is successfully installed and can connect to Harness Manager.

</TabItem>
<TabItem value="existingargo" label="Harness GitOps Agent with existing Argo CD instance">

- Select **Yes**, and then select **Start**.
- In **Name**, enter the name for the existing Argo CD project.
- In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment.
- Select **Next**. The **Review YAML** settings appear.
- This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.

  ```yaml
  kubectl apply -f gitops-agent.yml -n default
  ```

- Once you have installed the Agent, Harness will start importing all the entities from the existing Argo CD Project.

</TabItem>
</Tabs>

4. Before proceeding, store the Agent Identifier value as an environment variable for use in the subsequent commands:

   ```bash
   export AGENT_NAME=GITOPS_AGENT_IDENTIFIER
   ```

   > Note: Replace `GITOPS_AGENT_IDENTIFIER` with GitOps Agent Identifier.

5. Create a **GitOps Repository**.

   ```bash
   harness gitops-repository --file deploy-own-app/gitops/repository.yml apply --agent-identifier $AGENT_NAME
   ```

   > If you intend to use a private Git repository that hosts your manifest files, create a Harness secret containing the Git personal access token (PAT). Subsequently, create a new GitOps Repository pointing to your private repo.

6. Create a **GitOps Cluster**.

   ```bash
   harness gitops-cluster --file deploy-own-app/gitops/cluster.yml apply --agent-identifier $AGENT_NAME
   ```

7. Create a **GitOps Application**.

   ```bash
   harness gitops-application --file deploy-own-app/gitops/application.yml apply --agent-identifier $AGENT_NAME
   ```

   > To deploy your own app, modify `repoURL` and `path` in the application.yml.

8. At last, it's time to synchronize the application with your Kubernetes setup.

- Navigate to Harness UI > Default Project > GitOps > Applications, then click on gitops-application. Choose Sync, followed by Synchronize to kick off the application deployment.

  - Observe the Sync state as Harness synchronizes the workload under `Resource View` tab.

  - After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

    ```bash
    kubectl get pods -n sock-shop
    ```

  - Sock Shop is accessible via the master and any of the node urls on port `30001`.

</TabItem>
</Tabs>

### Congratulations!🎉

You've just learned how to use **Harness GitOps** to deploy an application using a Kubernetes manifest.

Keep learning about Harness GitOps. Create a GitOps ApplicationSet and PR Pipeline in Harness GitOps by following this [guide](/docs/continuous-delivery/gitops/applicationsets/harness-git-ops-application-set-tutorial).

</TabItem>
<TabItem value="CD pipeline">

<Tabs queryString="interface">
<TabItem value="ui" label="UI">

## Before you begin \{#before-you-begin-ui}

Verify that you have the following:

1. **Obtain GitHub personal access token with the repo scope**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
2. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness Delegates and deploying a sample application in a local development environment.
   - Check [Delegate system requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).
3. **Install the [Helm CLI](https://helm.sh/docs/intro/install/)** in order to install the Harness Helm delegate.
4. **Fork the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository using the GitHub web interface to utilize the Harness resource YAMLs.

## Getting Started with Harness CD \{#getting-started-harness-cd-ui}

1. Log in to [Harness](https://app.harness.io/).
2. Select **Projects**, and then select **Default Project**.

### Delegate

3. You have the option to use the same delegate that you deployed during the Manifest tutorial or to deploy a new delegate by following the steps below. However, remember to use a newly created delegate identifier when creating connectors.

- Log in to the [Harness UI](https://app.harness.io/). In **Project Setup**, select **Delegates**.

  - Select **Delegates**.

    - Select **Install delegate**. For this tutorial, let's explore how to install the delegate using Helm.
    - Add the Harness Helm chart repo to your local Helm registry.

    ```bash
    helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
    ```

    ```bash
    helm repo update harness-delegate
    ```

    - In the command provided, `ACCOUNT_ID`, `MANAGER_ENDPOINT`, and `DELEGATE_TOKEN` are auto-populated values that you can obtain from the delegate Installation wizard.

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

  - Verify that the delegate is installed successfully and can connect to the Harness Manager.
  - You can also follow the [Install Harness Delegate on Kubernetes or Docker](/docs/platform/get-started/tutorials/install-delegate) steps to install the delegate using the Terraform Helm Provider or Kubernetes manifest.

:::warning

If you plan to use your own Project, Organization, and custom names for Harness resources, please update the resource YAMLs accordingly with these details.

:::

### Secrets

4. Under **Project Setup**, select **Secrets**.
   - Select **New Secret**, and then select **Text**.
   - Enter the secret name `ownappgitpat`.
   - For the secret value, paste the GitHub personal access token you saved earlier.
   - Select **Save**.

### Connectors

5. Create the **GitHub connector**.
   - Copy the contents of [github-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/github-connector.yml).
   - In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
   - Select **Create via YAML Builder** and paste the copied YAML.
   - Assuming you have already forked the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML.
   - In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor will suggest the correct Id.
   - Select **Save Changes** and verify that the new connector named **ownapp_gitconnector** is successfully created.
   - Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.
6. Create the **Kubernetes connector**.
   - Copy the contents of [kubernetes-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/kubernetes-connector.yml).
   - In your Harness project, under **Project Setup**, select **Connectors**.
   - Select **Create via YAML Builder** and and paste the copied YAML.
   - Replace **DELEGATE_NAME** with the installed Delegate name. To obtain the Delegate name, navigate to **Project Setup**, and then **Delegates**.
   - Select **Save Changes** and verify that the new connector named **ownapp_k8sconnector** is successfully created.
   - Finally, select **Connection Test** under **Connectivity Status** to verify the connection is successful.

### Environment

7. In your Harness project, select **Environments**.
   - Select **New Environment**, and then select **YAML**.
   - Copy the contents of [environment.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/environment.yml), paste it into the YAML editor, and select **Save**.
   - In your new environment, select the **Infrastructure Definitions** tab.
   - Select **Infrastructure Definition**, and then select **YAML**.
   - Copy the contents of [infrastructure-definition.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/infrastructure-definition.yml) and paste it into the YAML editor.
   - Select **Save** and verify that the environment and infrastructure definition are created successfully.

### Services

8. In your Harness project, select **Services**.
   - Select **New Service**.
   - Enter the name `ownappservice`.
   - Select **Save**, and then **YAML** (on the **Configuration** tab).
   - Select **Edit YAML**, copy the contents of [service.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/service.yml), and paste it into the YAML editor.
   - Select **Save**, and verify that the service **ownapp_service** is successfully created.

### Pipeline

<Tabs>
<TabItem value="Canary">

9. In **Default Project**, select **Pipelines**.
   - Select **New Pipeline**.
   - Enter the name `ownapp_canary_pipeline`.
   - Select **Inline** to store the pipeline in Harness.
   - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
   - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.
     - Copy the contents of [canary-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/canary-pipeline.yml).
     - In your Harness pipeline YAML editor, paste the YAML.
     - Select **Save**.

</TabItem>
<TabItem value="Blue Green">

9. In **Default Project**, select **Pipelines**.
   - Select **New Pipeline**.
   - Enter the name `ownapp_bluegreen_pipeline`.
   - Select **Inline** to store the pipeline in Harness.
   - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
   - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.
     - Copy the contents of [bluegreen-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/bluegreen-pipeline.yml).
     - In your Harness pipeline YAML editor, paste the YAML.
     - Select **Save**.

</TabItem>
<TabItem value="Rolling">

9. In **Default Project**, select **Pipelines**.
   - Select **New Pipeline**.
   - Enter the name `ownapp_rolling_pipeline`.
   - Select **Inline** to store the pipeline in Harness.
   - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
   - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.
     - Copy the contents of [rolling-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/rolling-pipeline.yml).
     - In your Harness pipeline YAML editor, paste the YAML.
     - Select **Save**.

</TabItem>
</Tabs>

</TabItem>
<TabItem value="cli" label="CLI">

## Before you begin \{#before-you-begin-cli}

:::info

If you have already followed the steps from the Kubernetes tutorials and met all the requirements, then you can skip this.

:::

Verify the following:

1. **Obtain Harness API Token**. For steps, go to the Harness documentation on [creating a personal API token](/docs/platform/automation/api/add-and-manage-api-keys/).
2. **Obtain GitHub personal access token with repo permissions**. For steps, go to the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
3. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness Delegates and deploying a sample application in a local development environment.
   - Check [delegate system and network requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).
4. **Install the [Helm CLI](https://helm.sh/docs/intro/install/)**.
5. **Fork the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository using the GitHub web interface to utilize the Harness resource YAMLs.

## Getting Started with Harness CD

1. Download and Configure Harness CLI.

<Tabs queryString="cli-os">
<TabItem value="macos" label="MacOS">
    
<MacOSCLI />

</TabItem>
<TabItem value="linux" label="Linux">

<Tabs queryString="linux-platform">
<TabItem value="arm" label="ARM">
    
<ARMCLI />

</TabItem>
<TabItem value="amd" label="AMD">

<AMDCLI />

</TabItem>
</Tabs>

</TabItem>
<TabItem value="windows"  label="Windows">

    a. Open Windows Powershell and run the command below to download the Harness CLI.

    <WindowsCLI />

    b. Extract the downloaded zip file and change directory to extracted file location.

    c. Follow the steps below to make it accessible via terminal.

    ```
    $currentPath = Get-Location
    [Environment]::SetEnvironmentVariable("PATH", "$env:PATH;$currentPath", [EnvironmentVariableTarget]::Machine)
    ```

    d. Restart terminal.

</TabItem>
</Tabs>

2. Clone the forked **harnesscd-example-apps** repo and change directory.

   ```bash
   git clone https://github.com/GITHUB_ACCOUNTNAME/harnesscd-example-apps.git
   cd harnesscd-example-apps/deploy-own-app/cd-pipeline
   ```

   :::note

   Replace `GITHUB_ACCOUNTNAME` with your GitHub Account name.

   :::

3. Log in to Harness from the CLI.

   ```bash
   harness login --api-key  HARNESS_API_TOKEN --account-id HARNESS_ACCOUNT_ID
   ```

   :::note

   Replace `HARNESS_API_TOKEN` with Harness API Token that you obtained during the prerequisite section of this tutorial, and HARNESS_ACCOUNT_ID with your Harness account ID (find in the URL when logged into https://app.harness.io).

   :::

### Delegate

4. You have the option to use the same delegate that you deployed during the Manifest tutorial or to deploy a new delegate by following the steps below. However, remember to use a newly created delegate identifier when creating connectors.

- Log in to the [Harness UI](https://app.harness.io/). In **Project Setup**, select **Delegates**.

  - Select **Delegates**.

    - Select **Install delegate**. For this tutorial, let's explore how to install the delegate using Helm.
    - Add the Harness Helm chart repo to your local Helm registry.

    ```bash
    helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
    ```

    ```bash
    helm repo update harness-delegate
    ```

    - In the command provided, `ACCOUNT_ID`, `MANAGER_ENDPOINT`, and `DELEGATE_TOKEN` are auto-populated values that you can obtain from the delegate Installation wizard.

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

  - Verify that the delegate is installed successfully and can connect to the Harness Manager.
  - You can also follow the [Install Harness Delegate on Kubernetes or Docker](/docs/platform/get-started/tutorials/install-delegate) steps to install the delegate using the Terraform Helm Provider or Kubernetes manifest.

:::warning

If you plan to use your own Project, Organization, and custom names for Harness resources, please update the resource YAMLs accordingly with these details.

:::

#### Secrets

5. If you intend to use a private Git repository that hosts your manifest files, create a Harness secret containing the Git personal access token (PAT) with name `ownappgitpat`. Subsequently, create a new Git connector using this secret.
   - Under **Project Setup**, select **Secrets**.
     - Select **New Secret**, and then select **Text**.
     - Enter the secret name `ownappgitpat`.
     - For the secret value, paste the GitHub personal access token you saved earlier.
     - Select **Save**.

#### Connectors

6. Replace **url** with your GitHub Repo URL that hosts your manifest files in the `github-connector.yaml`.

7. Verify that the `projectIdentifier` and `orgIdentifier` is correct and the `tokenRef` value matches the Git PAT secret you created in the previous step.

8. Now create the **GitHub connector** using the following CLI command:
   ```
   harness connector --file github-connector.yml apply --git-user <YOUR GITHUB USERNAME>
   ```
9. Utilize the same delegate that you deployed as part of the Manifest tutorial or use the newly created delegate identifier to create the **Kubernetes connector** using the following CLI command:

   ```
   harness connector --file kubernetes-connector.yml apply --delegate-name DELEGATE_IDENTIFIER
   ```

### Environment

10. Check the `environment.yml` file and use the following `harness` CLI Command to create **Environments** in your Harness project:

    ```
    harness environment --file environment.yml apply
    ```

11. In the environment you created above, add **Infrastructure Definition** using below `infrastructure-definition.yml`. Then, invoke the CLI command to create the entity:

    ```
    harness infrastructure --file infrastructure-definition.yml apply
    ```

### Services

12. Verify the `service.yml` and invoke the following CLI command to create **Services** in your Harness Project.

    ```
    harness service -file service.yml apply
    ```

### Pick Your Deployment Strategy

<Tabs queryString="deployment">
<TabItem value="canary" label="Canary">

13. CLI Command for canary deployment:
    ```
    harness pipeline --file canary-pipeline.yml apply
    ```
    You can switch to the **Visual** editor and confirm the pipeline stage and execution steps.

</TabItem>
<TabItem value="bg" label="Blue Green">

13. CLI Command for blue-green deployment:
    ```
    harness pipeline --file bluegreen-pipeline.yml apply
    ```
    You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps.

</TabItem>
<TabItem value="rolling" label="Rolling">

13. CLI Command for Rolling deployment:
    ```
    harness pipeline --file rolling-pipeline.yml apply
    ```
    You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

### Manually execute deployment pipelines

Finally, it's time to execute your pipeline. Every exection of a CD pipeline leads to a deployment.

- Select **Run**, and then select **Run Pipeline** to initiate the deployment.

  - Observe the execution logs as Harness deploys the workload and checks for steady state.
  - After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

    ```bash
    kubectl get pods -n sock-shop
    ```

  - Sock Shop is accessible via the master and any of the node urls on port `30001`.

### Automate deployments

#### Using Triggers

With [Pipeline Triggers](/docs/category/triggers), you can start automating your deployments based on events happening in an external system. This system could be a Source Repository, an Artifact Repository, or a third party system. Any Developer with Pipeline Create and Edit permissions can configure a trigger in Harness.

Follow the [Pipeline Triggers tutorial](/docs/platform/triggers/tutorial-cd-trigger) to see triggers in action.

#### Using API

You can also utilize the [Harness API](/docs/category/api) to manage resources, view, create/edit, or delete them.

Refer to the [Get started with Harness API](/docs/platform/automation/api/api-quickstart) guide to learn how to use the API for automation.

### Congratulations!🎉

You've just learned how to use Harness CD to deploy your own application.

</TabItem>
</Tabs>
