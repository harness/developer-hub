---
title: Deploy using Kubernetes Manifest
description: Deploy using Kubernetes Manifest
hide_table_of_contents: true
sidebar_position: 2
redirect_from:
  - /docs/continuous-delivery/get-started/create-first-pipeline
  - /tutorials/cd-pipelines/kubernetes/manifest
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

This tutorial will get you started with Harness Continuous Delivery (CD). We will guide you through deploying a Guestbook application using Harness CD pipeline and GitOps methods. This Guestbook application uses a publicly available Kubernetes manifest and Docker image.

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-manifest).

:::


Kubernetes is required to complete these steps. Run the following to check your system resources and (optionally) install a local cluster.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/harness-community/scripts/main/delegate-preflight-checks/cluster-preflight-checks.sh)
```

<Tabs queryString="pipeline">
<TabItem value="gitops" label="GitOps Workflow">

Harness GitOps (built on top of Argo CD) watches the state of your application as defined in a Git repo, and can pull (either automatically, or when instructed to do so) these changes into your Kubernetes cluster, leading to an application sync. Harness GitOps supports both Argo CD and Flux CD as the GitOps reconciler.

Whether you're new to GitOps or an experienced practitioner, this guide will assist you in getting started with Harness GitOps, offering you the option to choose between Argo CD and Flux CD.

## Before you begin \{#before-you-begin-gitops}

Verify that you have the following:

1. **A Kubernetes cluster**. We recommend [K3D](https://k3d.io/v5.5.1/) for installing the Harness GitOps Agent and deploying a sample application in a local development environment.
   - For requirements, go to [Harness GitOps Agent Requirements](/docs/continuous-delivery/gitops/use-gitops/install-a-harness-git-ops-agent/#requirements).
   - If you prefer using Flux CD as the reconciler, you will need to [install the Flux controller](https://fluxcd.io/flux/installation/#install-the-flux-controllers) on your Kubernetes cluster.
2. **Fork the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub web interface.
   - For details on Forking a GitHub repository, go to [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository).

## Getting Started with Harness GitOps

<Tabs queryString="iac">
<TabItem value="cli" label="CLI">

1. Refer [Install and Configure Harness CLI](https://developer.harness.io/docs/platform/automation/cli/install) doc to setup and configure Harness CLI.

2. Clone the Forked **harnessed-example-apps** repo and change directory.

   ```bash
   git clone https://github.com/GITHUB_ACCOUNTNAME/harnesscd-example-apps.git
   cd harnesscd-example-apps
   ```

   :::note

   Replace `GITHUB_ACCOUNTNAME` with your GitHub Account name.

   :::

3. Select **Deployments**, and then select **GitOps**.

### GitOps Agent

<details open>
<summary>What is a GitOps Agent?</summary>
    
A Harness GitOps Agent is a worker process that runs in your environment, makes secure, outbound connections to Harness, and performs all the GitOps tasks you request in Harness.

</details>

1. Select **Settings**, and then select **GitOps Agents**.
   - Select **New GitOps Agent**.
   - When are prompted with **Do you have any existing Argo CD instances?**, select **Yes** if you already have a Argo CD Instance, or else choose **No** to install the **Harness GitOps Agent**.

<Tabs>
<TabItem value="Harness GitOps Agent Fresh Install">

- Select **No**, and then select **Start**.
- In **Name**, enter the name for the new Agent.
- In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment.
  - For this tutorial, let's use the `default` namespace to install the Agent and deploy applications.
- Select **Continue**. The **Review YAML** settings appear.
- This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.

  ```
  kubectl apply -f gitops-agent.yml -n default
  ```

- Select **Continue** and verify the Agent is successfully installed and can connect to Harness Manager.

</TabItem>
<TabItem value="Harness GitOps Agent with existing Argo CD instance">

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
   harness gitops-repository --file guestbook/harness-gitops/repository.yml apply --agent-identifier $AGENT_NAME
   ```

6. Create a **GitOps Cluster**.

   ```bash
   harness gitops-cluster --file guestbook/harness-gitops/cluster.yml apply --agent-identifier $AGENT_NAME
   ```

7. Create a **GitOps Application**.

   ```bash
   harness gitops-application --file guestbook/harness-gitops/application.yml apply --agent-identifier $AGENT_NAME
   ```

8. At last, it's time to synchronize the application with your Kubernetes setup.

- Navigate to Harness UI > Default Project > GitOps > Applications, then click on gitops-application. Choose Sync, followed by Synchronize to kick off the application deployment.

  - Observe the Sync state as Harness synchronizes the workload under `Resource View` tab.
    ![Harness GitOps Sync Success](./static/k8s-manifest-tutorial/gitops.png)

  - After a successful execution, you can check the deployment in your Kubernetes cluster using the following command:

  ```bash
  kubectl get pods -n default
  ```

  - To access the Guestbook application deployed via the Harness pipeline, port forward the service and access it at [http://localhost:8080](http://localhost:8080):

  ```bash
  kubectl port-forward svc/kustomize-guestbook-ui 8080:80
  ```

</TabItem>
<TabItem value="ui" label="UI">

1. Login to [Harness](https://app.harness.io/).
2. Select **Projects**, and then select **Default Project**.
3. Select **Deployments**, and then select **GitOps**.

### GitOps Agent

<details open>
<summary>What is a GitOps Agent?</summary>
    
A Harness GitOps Agent is a worker process that runs in your environment, makes secure, outbound connections to Harness, and performs all the GitOps tasks you request in Harness.

</details>

1. Select **Settings**, and then select **GitOps Agents**.
   - Select **New GitOps Agent**.
   - When are prompted with **Do you have any existing Argo CD instances?**, select **Yes** if you already have a Argo CD Instance, or else choose **No** to install the **Harness GitOps Agent**.

<Tabs  queryString="gitopsagent">
<TabItem value="agent-fresh-install" label="Harness GitOps Agent Fresh Install">

- Select **No**, and then select **Start**.
- In **Name**, enter the name for the new Agent.
- In **GitOps Operator**, select one of the following:
  - **Argo**. Uses Argo CD as the GitOps reconciler.
  - **Flux**. Uses Flux as the GitOps reconciler.
- In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent.

Harness GitOps Agent will have access to create or modify resources in other namespaces so this namespace doesn't necessarily have to be the same as the one where your apps are deployed. For instance, you can choose `argocd` or `fluxcd` as the namespace for installing the GitOps Agent (the example in the image below uses `gitops-agent` as the namespace). Ensure that this namespace already exists on your Kubernetes cluster.

If **Namespaced** is selected, the Harness GitOps agent is installed without cluster-scoped permissions, and it can access only those resources that are in its own namespace. You can select **Skip Crds** to avoid a collision if already installed.

- Select **Continue**. The **Download YAML** or **Download Helm Chart** settings appear.

![Download YAML or Helm chart setting](./static/k8s-manifest-tutorial/download-agent-installation-fresh.png)

Download the Harness GitOps Agent script using either the YAML or Helm Chart options. The **YAML** option provides a manifest file, and the **Helm Chart** option offers a Helm chart file. Both can be downloaded and used to install the GitOps agent on your Kubernetes cluster. The third step includes the command to run this installation.

- Select **Continue** and verify the Agent is successfully installed and can connect to Harness Manager.

</TabItem>
<TabItem value="existingargo" label="Harness GitOps Agent with existing Argo CD instance">

- Select **Yes**, and then select **Start**.
- In **Name**, enter the name for the existing Argo CD project.
- In **GitOps Operator**, select one of the following:
  - **Argo**. Uses Argo CD as the GitOps reconciler.
  - **Flux**. Uses Flux as the GitOps reconciler.
- In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent.

Harness GitOps Agent will have access to create or modify resources in other namespaces so this namespace doesn't necessarily have to be the same as the one where your apps are deployed. For instance, you can choose `argocd` or `fluxcd` as the namespace for installing the GitOps Agent (the example in the image below uses `gitops-agent` as the namespace). Ensure that this namespace already exists on your Kubernetes cluster.

- Select **Continue**. The **Download YAML** or **Download Helm Chart** settings appear.

![Download YAML or Helm chart setting](./static/k8s-manifest-tutorial/download-agent-installation-existing.png)

Download the Harness GitOps Agent script using either the YAML or Helm Chart options. The **YAML** option provides a manifest file, and the **Helm Chart** option offers a Helm chart file. Both can be downloaded and used to install the GitOps agent on your Kubernetes cluster. The third step includes the command to run this installation.

- Select **Continue** and verify the Agent is successfully installed and can connect to Harness Manager.
- Once you have installed the Agent, Harness will start importing all the entities from the existing Argo CD Project.

</TabItem>
</Tabs>

### Repositories

<details open>
<summary>What is a GitOps Repository?</summary>
    
A Harness GitOps Repository is a repo containing the declarative description of a desired state. The declarative description can be in Kubernetes manifests, Helm Chart, Kustomize manifests, etc.

</details>

:::note

If you're using a Flux GitOps Reconciler, Flux must be present in the destination cluster. As of now, this limits us to in-cluster type applications.

:::

1. Select **Settings**, and then select **Repositories**.
   - Select **New Repository**.
   - Choose **Git**.
     - Enter a name in **Repository**.
     - In **GitOps Agent**, select the Agent that you installed in your cluster and select **Apply**.
     - In **Git Repository URL**, paste `https://github.com/GITHUB_USERNAME/harnesscd-example-apps` and replace **GITHUB_USERNAME** with your GitHub username.
     - Select **Continue** and choose **Specify Credentials For Repository**.
       - Select **HTTPS** as the **Connection Type**.
       - Select **Anonymous (no credentials required)** as the **Authentication** method.
       - Select **Save & Continue** and wait for Harness to verify the connection.
       - Finally, select **Finish**.

### Clusters

<details open>
<summary>What is a GitOps Cluster?</summary>
    
A Harness GitOps Cluster is the target deployment cluster that is compared to the desire state. Clusters are synced with the source manifests you add as GitOps Repositories.

</details>

:::note

If you're using a Flux GitOps Reconciler, Flux must be present in the destination cluster. As of now, this limits us to in-cluster type applications.

:::

1. Select **Settings**, and then select **Clusters**.
   - Select **New Cluster**.
     - In **Name**, enter a name for the cluster.
     - In **GitOps Agent**, select the Agent you installed in your cluster, and then select **Apply**.
     - Select **Continue** and select **Use the credentials of a specific Harness GitOps Agent**.
     - Select **Save & Continue** and wait for the Harness to verify the connection.
     - Finally, select **Finish**.

### Applications

<details open>
<summary>What is a GitOps Application?</summary>
    
GitOps Applications are how you manage GitOps operations for a given desired state and its live instantiation.
A GitOps Application collects the Repository (**what you want to deploy**), Cluster (**where you want to deploy**), and Agent (**how you want to deploy**). You select these entities when you set up your Application.

</details>

:::note

Due to an update in the Kustomization Controller, the vanilla YAML files now need to include a namespace. The specific repository and path used in this example include the namespace field in the YAMLs.

:::

1. Select **Applications**.
   - Select **New Application**.
     - Enter the **Application Name**: `guestbook`.
     - In **GitOps Operator**, select either **Argo** or **Flux**. Based on your selection, the associated GitOps Agent will be listed next.
     - In **GitOps Agent**, select the Agent that you installed in your cluster.
     - You can leave out **Service** and **Environment** selections.
     - Select **Continue**.
   - Under **Sync Policy**
     - Make sure **Apply Out of Sync Only** and **Auto-Create Namespace** are checked under **Sync Options** settings.
     - Use `Foreground` for the **Prune Propagation Policy**.
     - Select **Continue**.
   - Under **Source**
     - Select the repository you created earlier for the **Repository URL**.
     - Select `master` as the **Target Revision**.
     - Use `workshop-guestbook` for the **Path**.
     - Select **Continue**.
   - Under **Destination**
     - Select the cluster you previously created under **Cluster**.
     - For **Namespace**, enter `guestbook`. This is the target namespace for Harness GitOps to sync the application.
     - Select **Finish**.
2. Finally, it's time to **Synchronize** the GitOps Application state. Select **Sync**, check the Application details, and then select **Synchronize** to initiate the deployment.

   - After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

   ```bash
   kubectl get pods -n guestbook
   ```

   - To access the Guestbook application deployed via the Harness Pipeline, port forward the service and access it at `http://localhost:8080`:

   ```bash
   kubectl port-forward svc/guestbook-ui 8080:80 -n guestbook
   ```

A successful Application sync will display the following status tree under **Resource View**.

![GitOps](./static/k8s-manifest-tutorial/gitops.png)

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
git clone https://github.com/harness-community/gitops-terraform-onboarding.git
cd gitops-terraform-onboarding/
```

2. Initialize the Terraform configuration. This step will also install the Harness provider plugin.

```bash
terraform init
```

<details open>
<summary>What is a Terraform Provider?</summary>

A Terraform Provider is a plugin that allows Terraform to define and manage resources using a particular software API. In this tutorial these resources will be Harness entities.

</details>

### Input variables

1. Open **terraform.tfvars**. This file contains example values for the Harness entities that will be created.

```file
project_id            = "default_project"
org_id                = "default"
agent_identifier      = "testagent"
agent_name            = "testagent"
agent_namespace       = "default"
repo_identifier       = "testrepo"
repo_name             = "testrepo"
repo_url              = "https://github.com/harness-community/harnesscd-example-apps/"
cluster_identifier    = "testcluster"
cluster_name          = "testcluster"
env_name              = "testenv"
service_name          = "testservice"
```

2. In **terraform.tfvars**, change the value of **repo_url** to your _GitHub fork_ of the harnesscd-example-apps repository.

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

<details open>
<summary>What is a Terraform module?</summary>

A Terraform module is a collection of files that define the desired state to be enforced by Terraform. These files normally have the .tf extension.

</details>

<DocImage path={require('./static/k8s-manifest-tutorial/terraform_harness_resources.png')} width="50%" height="50%" title="Click to view full size image" />

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
   - Click into the **guestbook** application. This is the application your deployed from the **harnesscd-example-apps** repo.
   - Select **Resource View** to see the cluster resources that have been deployed. A successful Application sync will display the following status tree.

![GitOps](./static/k8s-manifest-tutorial/guestbook_sync_terraform_gitops.png)

5. Return to a local command line. Confirm you can see the GitOps agent and guestbook application resources in your cluster.

```
kubectl get deployment -n default
kubectl get svc -n default
kubectl get pods -n default
```

6. To access the Guestbook application deployed via the Harness Pipeline, port forward the service and access it at `http://localhost:8080`:

```
kubectl port-forward svc/guestbook-ui 8080:80
```

### Cleaning up

1. If you know longer need the resources created in this tutorial, run the following command to delete the GitOps agent and associated Harness entities.

```
terraform destroy
```

**Note:** Since deleting the Guestbook application in Harness does not delete the deployed cluster resources themselves, you'll need to manually remove the Kubernetes deployment.

```
kubectl delete deployment guestbook-ui -n default
kubectl delete service guestbook-ui -n default
```

</TabItem>
</Tabs>

### Congratulations!🎉

You've just learned how to use **Harness GitOps** to deploy an application using a Kubernetes manifest.

Continue your learning journey by learning about [variables](/docs/platform/variables-and-expressions/add-a-variable),[pipeline triggers](/docs/platform/triggers/tutorial-cd-trigger), and [Harness GitOps](/docs/continuous-delivery/gitops/applicationsets/harness-git-ops-application-set-tutorial).

</TabItem>
<TabItem value="cd-pipeline" label="CD pipeline" queryString="pipeline">

Harness CD pipelines allow you to orchestrate and automate your deployment workflows, and push updated application images to your target Kubernetes cluster. Pipelines allow extensive control over how you want to progress artifacts through various dev / test / stage / prod clusters, while running a variety of scans & tests to ensure quality and stability standards you and team may have defined.

You can choose to proceed with the tutorial either by using the command-line interface (Harness CLI) or the user interface (Harness UI).

<Tabs queryString="interface">
<TabItem value="cli" label="CLI">

## Before you begin \{#before-you-begin-cli}

Verify the following:

1. **Obtain Harness API Token**. For steps, go to the Harness documentation on [creating a personal API token](/docs/platform/automation/api/add-and-manage-api-keys/).
2. **Obtain GitHub personal access token with repo permissions**. For steps, go to the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
3. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness Delegates and deploying a sample application in a local development environment.
   - Check [delegate System and network requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).
4. **Install [Helm CLI](https://helm.sh/docs/intro/install/)**.
5. **Fork the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub web interface.
   - For details on forking a GitHub repository, go to [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository).

## Getting Started with Harness CD \{#getting-started-harness-cd-cli}

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
<TabItem value="windows" label="Windows">

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

2. Clone the Forked **harnesscd-example-apps** repo and change directory.

   ```bash
   git clone https://github.com/GITHUB_ACCOUNTNAME/harnesscd-example-apps.git
   cd harnesscd-example-apps
   ```

   :::note

   Replace `GITHUB_ACCOUNTNAME` with your GitHub Account name.

   :::

3. Log in to Harness from the CLI.

   ```bash
   harness login --api-key  --account-id HARNESS_API_TOKEN
   ```

   :::note

   Replace `HARNESS_API_TOKEN` with Harness API Token that you obtained during the prerequisite section of this tutorial.

   :::

:::warning

For the pipeline to run successfully, please follow all of the following steps as they are, including the naming conventions.

:::

### Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifact registries, cloud platforms, etc. The delegate is installed in the target infrastructure (Kubernetes cluster) and performs operations including deployment and integration. To learn more about the delegate, go to [delegate Overview](/docs/platform/delegates/delegate-concepts/delegate-overview/).

1. Log in to the [Harness UI](https://app.harness.io/). In **Project Setup**, select **Delegates**.

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

#### Secrets

<details open>
<summary>What are Harness secrets?</summary>

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret manager. To learn more about secrets in Harness, go to [Harness Secret Manager Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).

</details>

1. Use the following command to add the GitHub PAT you created previously for your secret.

   ```
   harness secret --token <YOUR GITHUB PAT>
   ```

#### Connectors

<details open>
<summary>What are connectors?</summary>

Connectors in Harness enable integration with 3rd party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Explore connector how-tos [here](/docs/category/connectors).

</details>

1. Replace **GITHUB_USERNAME** with your GitHub account username in the `github-connector.yaml`
2. In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor will suggest the correct Id.
3. Now create the **GitHub connector** using the following CLI command:
   ```
   harness connector --file github-connector.yml apply --git-user <YOUR GITHUB USERNAME>
   ```
4. Please check the delegate name to be `helm-delegate` in the `kubernetes-connector.yml`
5. Create the **Kubernetes connector** using the following CLI command:

   ```
   harness connector --file kubernetes-connector.yml apply --delegate-name kubernetes-delegate
   ```

### Environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. Use the following CLI Command to create **Environments** in your Harness project:

   ```
   harness environment --file environment.yml apply
   ```

2. In your new environment, add **Infrastructure Definitions** using the following CLI command:

   ```
   harness infrastructure --file infrastructure-definition.yml apply
   ```

### Services

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>

1. Use the following CLI command to create **Services** in your Harness Project.

   ```
   harness service -file service.yml apply
   ```

### Pick Your Deployment Strategy

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts/).

</details>

<Tabs queryString="deployment">
<TabItem value="canary" label="Canary">

<details open>
<summary>What are Canary deployments?</summary>

A canary deployment updates nodes in a single environment gradually, allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. For more information, go to [When to use Canary deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments).

</details>

1. CLI Command for canary deployment:

   ```
   harness pipeline --file canary-pipeline.yml apply
   ```

   You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

   <DocImage path={require('./static/k8s-manifest-tutorial/canary.png')} width="60%" height="60%" title="Click to view full size image" />

</TabItem>
<TabItem value="bg" label="Blue Green">

<details open>
<summary>What are Blue Green deployments?</summary>

Blue Green deployments involve running two identical environments (stage and prod) simultaneously with different service versions. QA and UAT are performed on a **new** service version in the stage environment first. Next, traffic is shifted from the prod environment to stage, and the previous service version running on prod is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. For more information, go to [When to use Blue Green deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments).

</details>

1. CLI Command for blue-green deployment:

   ```
   harness pipeline --file bluegreen-pipeline.yml apply
   ```

   You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.

   <DocImage path={require('./static/k8s-manifest-tutorial/bluegreen.png')} width="60%" height="60%" title="Click to view full size image" />

</TabItem>
<TabItem value="rolling" label="Rolling">

<details open>
<summary>What are Rolling deployments?</summary>

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. For more information, go to [When to use rolling deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments).

</details>

1. CLI Command for Rolling deployment:

   ```
   harness pipeline --file rolling-pipeline.yml apply
   ```

   You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.

   <DocImage path={require('./static/k8s-manifest-tutorial/rolling.png')} width="60%" height="60%" title="Click to view full size image" />

</TabItem>
</Tabs>

</TabItem>
<TabItem value="ui" label="UI">

## Before you begin \{#before-you-begin-ui}

Verify that you have the following:

1. **Obtain GitHub personal access token with the repo scope**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
2. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness Delegates and deploying a sample application in a local development environment.
   - Check [Delegate system requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).
3. **Install the [Helm CLI](https://helm.sh/docs/intro/install/)** in order to install the Harness Helm delegate.
4. **Fork the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub website.
   - For details on Forking a GitHub repository, go to [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) for more information on forking a GitHub repository.

## Getting Started with Harness CD \{#getting-started-harness-cd-ui}

1. Log in to [Harness](https://app.harness.io/).
2. Select **Projects**, and then select **Default Project**.

:::warning

For the pipeline to run successfully, please follow the remaining steps as they are, including the naming conventions.

:::

### Delegate

<details open>
<summary>What is the Harness Delegate?</summary>

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations including deployment and integration. Learn more about the delegate in the [Delegate Overview](/docs/platform/delegates/delegate-concepts/delegate-overview/).

</details>

1.  Under **Project Setup**, select **Delegates**.

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

      - In the example command provided, `ACCOUNT_ID` and `MANAGER_ENDPOINT` are auto-populated values that you can obtain from the delegate installation wizard.
      - Copy the command as shown in the installation wizard, which is of the format of the example mentioned below and run in your terminal.

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

You can also follow the [Install Harness Delegate on Kubernetes or Docker](/docs/platform/get-started/tutorials/install-delegate) steps to install the delegate using the Harness Terraform Provider or a Kubernetes manifest.

:::

### Secrets

<details open>
<summary>What are Harness secrets?</summary>

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret manager. To learn more about secrets in Harness, go to [Harness Secret Manager Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).

</details>

1. Under **Project Setup**, select **Secrets**.
   - Select **New Secret**, and then select **Text**.
   - Enter the secret name `harness_gitpat`.
   - For the secret value, paste the GitHub personal access token you saved earlier.
   - Select **Save**.

### Connectors

<details open>
<summary>What are connectors?</summary>

Connectors in Harness enable integration with 3rd party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Explore connector how-tos [here](/docs/category/connectors).

</details>

1. Create the **GitHub connector**.
   - Copy the contents of [github-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/github-connector.yml).
   - In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
   - Select **Create via YAML Builder** and paste the copied YAML.
   - Assuming you have already forked the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML.
   - In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor will suggest the correct Id.
   - Select **Save Changes** and verify that the new connector named **harness_gitconnector** is successfully created.
   - Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.
2. Create the **Kubernetes connector**.
   - Copy the contents of [kubernetes-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/kubernetes-connector.yml).
   - In your Harness project, under **Project Setup**, select **Connectors**.
   - Select **Create via YAML Builder** and and paste the copied YAML.
   - Replace **DELEGATE_NAME** with the installed Delegate name. To obtain the Delegate name, navigate to **Project Setup**, and then **Delegates**.
   - Select **Save Changes** and verify that the new connector named **harness_k8sconnector** is successfully created.
   - Finally, select **Connection Test** under **Connectivity Status** to verify the connection is successful.

### Environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. In your Harness project, select **Environments**.
   - Select **New Environment**, and then select **YAML**.
   - Copy the contents of [environment.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/environment.yml), paste it into the YAML editor, and select **Save**.
   - In your new environment, select the **Infrastructure Definitions** tab.
   - Select **Infrastructure Definition**, and then select **YAML**.
   - Copy the contents of [infrastructure-definition.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/infrastructure-definition.yml) and paste it into the YAML editor.
   - Select **Save** and verify that the environment and infrastructure definition are created successfully.

### Services

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>

1. In your Harness project, select **Services**.
   - Select **New Service**.
   - Enter the name `harnessguestbook`.
   - Select **Save**, and then **YAML** (on the **Configuration** tab).
   - Select **Edit YAML**, copy the contents of [service.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/service.yml), and paste it into the YAML editor.
   - Select **Save**, and verify that the service **harness_guestbook** is successfully created.

### Pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts/).

</details>

<Tabs>
<TabItem value="canary" label="Canary">

<details open>
<summary>What are Canary deployments?</summary>

A canary deployment updates nodes in a single environment gradually, allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. For more information, go to [When to use Canary deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments).

</details>

- In **Default Project**, select **Pipelines**.
  - Select **New Pipeline**.
  - Enter the name `guestbook_canary_pipeline`.
  - Select **Inline** to store the pipeline in Harness.
  - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
  - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.

1. Copy the contents of [canary-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/canary-pipeline.yml).
2. In your Harness pipeline YAML editor, paste the YAML.
3. Select **Save**.

   You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

   <DocImage path={require('./static/k8s-manifest-tutorial/canary.png')} width="60%" height="60%" title="Click to view full size image" />

</TabItem>
<TabItem value="bg" label="Blue Green">

<details open>
<summary>What are Blue Green deployments?</summary>

Blue Green deployments involve running two identical environments (stage and prod) simultaneously with different service versions. QA and UAT are performed on a **new** service version in the stage environment first. Next, traffic is shifted from the prod environment to stage, and the previous service version running on prod is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. For more information, go to [When to use Blue Green deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments).

</details>

- In **Default Project**, select **Pipelines**.
  - Select **New Pipeline**.
  - Enter the name `guestbook_bluegreen_pipeline`.
  - Select **Inline** to store the pipeline in Harness.
  - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
  - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.

1. Copy the contents of [bluegreen-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/bluegreen-pipeline.yml).
2. In your Harness pipeline YAML editor, paste the YAML.
3. Select **Save**.

   You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.

   <DocImage path={require('./static/k8s-manifest-tutorial/bluegreen.png')} width="60%" height="60%" title="Click to view full size image" />

</TabItem>
<TabItem value="rolling" label="Rolling">

<details open>
<summary>What are Rolling deployments?</summary>

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. For more information, go to [When to use rolling deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments).

</details>

- In **Default Project**, select **Pipelines**.
  - Select **New Pipeline**.
  - Enter the name `guestbook_rolling_pipeline`.
  - Select **Inline** to store the pipeline in Harness.
  - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
  - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.

1. Copy the contents of [rolling-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/rolling-pipeline.yml).
2. In your Harness pipeline YAML editor, paste the YAML.
3. Select **Save**.

   You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.

   <DocImage path={require('./static/k8s-manifest-tutorial/rolling.png')} width="60%" height="60%" title="Click to view full size image" />

</TabItem>
</Tabs>

</TabItem>
</Tabs>

### Manually execute deployment pipelines

Finally, it's time to execute your pipeline. Every exection of a CD pipeline leads to a deployment.

1.  Select **Run**, and then select **Run Pipeline** to initiate the deployment.

    - Observe the execution logs as Harness deploys the workload and checks for steady state.
    - After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

      ```bash
      kubectl get pods -n default
      ```

    - To access the Guestbook application deployed by the Harness pipeline, port forward the service and access it at [http://localhost:8080](http://localhost:8080)
      ```bash
      kubectl port-forward svc/guestbook-ui 8080:80
      ```

### Automate deployments

#### Using Triggers

With [Pipeline Triggers](/docs/category/triggers), you can start automating your deployments based on events happening in an external system. This system could be a Source Repository, an Artifact Repository, or a third party system. Any Developer with Pipeline Create and Edit permissions can configure a trigger in Harness.

Follow the [Pipeline Triggers tutorial](/docs/platform/triggers/tutorial-cd-trigger) to see triggers in action.

#### Using API

You can also utilize the [Harness API](/docs/category/api) to manage resources, view, create/edit, or delete them.

Refer to the [Get started with Harness API](/docs/platform/automation/api/api-quickstart) guide to learn how to use the API for automation.

### Congratulations!🎉

You've just learned how to use Harness CD to deploy an application using a Kubernetes manifest.

Continue your learning journey by learning about [variables](/docs/platform/variables-and-expressions/add-a-variable) and [pipeline triggers](/docs/platform/triggers/tutorial-cd-trigger).

## How to deploy your own app by using Harness

You can integrate your own microservice application into this tutorial by following the steps outlined below:

- Utilize the same delegate that you deployed as part of this tutorial. Alternatively, deploy a new delegate, but remember to use a newly created delegate identifier when creating connectors.

- If you intend to use a private Git repository that hosts your manifest files, create a Harness secret containing the Git personal access token (PAT). Subsequently, create a new Git connector using this secret.

- Create a Kubernetes connector if you plan to deploy your applications in a new Kubernetes environment. Make sure to update the infrastructure definition to reference this newly created Kubernetes connector.

- Once you complete all the aforementioned steps, create a new Harness service that leverages Kubernetes manifests for deploying applications.

- Lastly, establish a new deployment pipeline and select the newly created infrastructure definition and service. Choose a deployment strategy that aligns with your microservice application's deployment needs.

- Voila! You're now ready to deploy your own application by using Harness.

</TabItem>
</Tabs>
