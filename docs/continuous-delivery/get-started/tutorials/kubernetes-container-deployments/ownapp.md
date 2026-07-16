---
title: Deploy your own microservice application
sidebar_label: Deploy your own application
description: Deploy your own microservice application with Harness CD and GitOps.
keywords:
  - microservice application
  - Continuous Delivery
  - GitOps
  - deployment
tags:
  - continuous-delivery
  - gitops
  - kubernetes
sidebar_position: 3
redirect_from:
  - /tutorials/cd-pipelines/kubernetes/ownapp
  - /docs/continuous-delivery/get-started/cd-tutorials/ownapp
  - /docs/continuous-delivery/get-started/tutorials/ownapp
canonical_url: https://www.harness.io/blog/delegates-and-agents-onramp-to-scale-with-harness
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

<style>
{`
.tabs-centered .tabs {
  display: flex;
  justify-content: center;
}
.tabs-centered .tabs__item {
  flex: 1;
  text-align: center;
}
`}
</style>

This topic explains how to deploy your own microservice application with Harness Continuous Delivery (CD). It continues from the <a href="/docs/continuous-delivery/get-started/tutorials/kubernetes-container-deployments/manifest" target="_blank" rel="noopener noreferrer">Kubernetes Manifest tutorial</a>, which deploys the Guestbook sample application.

Harness CD offers two ways to deploy your application:

- [CD pipeline](#getting-started-harness-cd-ui): You build a Harness pipeline that deploys your application to your target cluster.
- [GitOps workflow](#getting-started-harness-gitops): You install a Harness GitOps Agent, connect it to your Git repo and target cluster, and let Harness (using Argo CD) sync the desired state from Git into your cluster.

:::note

<a href="https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-manifest" target="_blank" rel="noopener noreferrer">Sign up</a> today to get started with Harness CD.

:::

---

## What will you learn in this topic?

- How to set up a [delegate](#delegate), [secret](#secrets), [connectors](#connectors), [environment](#environment), [service](#services), and [pipeline](#pipeline) to deploy your application.
- How to choose a rolling, canary, or Blue Green [deployment strategy](#pipeline) for your pipeline.
- How to install a [Harness GitOps Agent](#gitops-agent) and [sync the desired state](#synchronize-the-application) from your Git repository into your cluster using Argo CD.
- How to deploy your application using the Harness [UI](#getting-started-harness-cd-ui), [CLI](#getting-started-harness-cd-ui), or [Harness Terraform Provider](#harness-terraform-provider).

---

## Before you begin

Ensure you have the following. If you completed the <a href="/docs/continuous-delivery/get-started/tutorials/kubernetes-container-deployments/manifest" target="_blank" rel="noopener noreferrer">Kubernetes Manifest tutorial</a>, you can reuse its delegate and other resources.

- **GitHub personal access token**: A token with the `repo` scope. Go to <a href="https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line" target="_blank" rel="noopener noreferrer">creating a personal access token</a> to generate one.
- **Kubernetes cluster**: Use your own cluster, or install <a href="https://k3d.io/v5.5.1/" target="_blank" rel="noopener noreferrer">K3D</a> to run Harness Delegates and the application in a local development environment. Go to <a href="/docs/platform/delegates/delegate-concepts/delegate-requirements" target="_blank" rel="noopener noreferrer">Delegate system and network requirements</a> to review the requirements.
- **Helm CLI**: Install the <a href="https://helm.sh/docs/intro/install/" target="_blank" rel="noopener noreferrer">Helm CLI</a> to install the Harness Helm delegate.
- **Forked example repository**: Fork the <a href="https://github.com/harness-community/harnesscd-example-apps/fork" target="_blank" rel="noopener noreferrer">harnesscd-example-apps</a> repository through the GitHub web interface to use the Harness resource YAMLs.
- **Harness API token (CLI or Terraform method only)**: A token required to run the CLI or Terraform steps. Go to <a href="/docs/platform/automation/api/add-and-manage-api-keys/" target="_blank" rel="noopener noreferrer">creating a personal API token</a> to generate one.

---

## Deploy the application

:::note

Harness resources such as delegates, secrets, and connectors can be created at the Account, Organization, or Project scope. For simplicity, this tutorial uses Project-scoped resources throughout. If you use resources from a different scope, update the configuration accordingly when you create connectors, environments, services, and the deployment pipeline.

Go to <a href="/docs/platform/organizations-and-projects" target="_blank" rel="noopener noreferrer">Organizations and projects</a> to understand the Harness resource hierarchy and scopes.

:::

You can deploy your application using either a Harness CD pipeline or a Harness GitOps workflow.

<Tabs queryString="pipeline" className="tabs-centered">
<TabItem value="cd-pipeline" label="CD Pipeline">

### Deploy with a CD pipeline \{#getting-started-harness-cd-ui}

Harness CD pipelines allow you to orchestrate and automate your deployment workflows and push updated application images to your target Kubernetes cluster. Pipelines allow extensive control over how you want to progress artifacts through various development, test, staging, or production clusters, when running a variety of scans and tests to ensure the quality and stability standards you and your team have defined.

You can proceed with the tutorial using either the Harness user interface (UI) or the command-line interface (CLI).

<Tabs queryString="interface" className="tabs-centered">
<TabItem value="ui" label="UI">

Perform the following steps to deploy your application using the Harness CD Pipeline UI:

1. Log in to <a href="https://app.harness.io/" target="_blank" rel="noopener noreferrer">Harness Manager</a>.
2. Select **Projects**, and then select **Default Project**.
3. After selecting the project, configure the core resources Harness requires to run a deployment, including a delegate, a secret, two connectors, an environment, a service, and a deployment pipeline, as explained in the following sections.

#### Delegate

You have the option to use the same delegate that you deployed during the Manifest tutorial, or to deploy a new delegate by following the steps below. However, remember to use a newly created delegate identifier when creating connectors.

Perform the following steps to set up a new delegate:

1. Log in to the <a href="https://app.harness.io/" target="_blank" rel="noopener noreferrer">Harness UI</a>. In **Project Setup**, select **Delegates**.
2. Select **Delegates**, and then select **Install delegate**. For this tutorial, install the delegate using Helm.
3. Add the Harness Helm chart repo to your local Helm registry.
   ```bash
   helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
   ```
4. Update the repo using the following command:
   ```bash
   helm repo update harness-delegate
   ```
5. In the command provided, `ACCOUNT_ID`, `MANAGER_ENDPOINT`, and `DELEGATE_TOKEN` are auto-populated values that you can obtain from the delegate installation wizard. Run the install command:
   ```bash
   helm upgrade -i helm-delegate --namespace harness-delegate-ng --create-namespace \
   harness-delegate/harness-delegate-ng \
    --set delegateName=helm-delegate \
    --set accountId=ACCOUNT_ID \
    --set managerEndpoint=MANAGER_ENDPOINT \
    --set delegateDockerImage=harness/delegate:24.12.84702 \
    --set replicas=1 --set upgrader.enabled=true \
    --set delegateToken=DELEGATE_TOKEN
   ```
6. Verify that the delegate is installed successfully and can connect to the Harness Manager.

:::note

You can also follow the <a href="/docs/platform/get-started/tutorials/install-delegate" target="_blank" rel="noopener noreferrer">Install Harness Delegate on Kubernetes or Docker</a> steps to install the delegate using the Terraform Helm Provider or a Kubernetes manifest.

:::

:::warning

If you plan to use your own Project, Organization, and custom names for Harness resources, update the resource YAMLs accordingly with these details.

:::

#### Secrets

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret manager. Go to <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview/" target="_blank" rel="noopener noreferrer">Harness Secret Manager Overview</a> to understand secrets in Harness.

Perform the following steps to add a secret:

1. Under **Project Setup**, select **Secrets**.
2. Select **New Secret**, and then select **Text**.
3. Enter the secret name `ownappgitpat`.
4. For the secret value, paste the GitHub personal access token you saved earlier.
5. Select **Save**.

#### Connectors

Connectors in Harness enable integration with third party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Go to <a href="/docs/category/connectors" target="_blank" rel="noopener noreferrer">Connectors</a> to explore connector how-tos.

#### Set up the GitHub connector

Perform the following steps to set up a GitHub connector:

1. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/github-connector.yml" target="_blank" rel="noopener noreferrer">github-connector.yml</a>.
2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
3. Select **Create via YAML Builder** and paste the copied YAML.
4. Replace `GITHUB_USERNAME` with your GitHub account username in the YAML (assuming you have already forked the <a href="https://github.com/harness-community/harnesscd-example-apps/fork" target="_blank" rel="noopener noreferrer">harnesscd-example-apps</a> repo as noted in Before you begin).
5. In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor will suggest the correct Id.
6. Select **Save Changes** and verify that the new connector named `ownapp_gitconnector` is successfully created.
7. Select **Connection Test** under **Connectivity Status** to ensure the connection is successful.

#### Set up the Kubernetes connector

Perform the following steps to set up a Kubernetes connector:

1. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/kubernetes-connector.yml" target="_blank" rel="noopener noreferrer">kubernetes-connector.yml</a>.
2. In your Harness project, under **Project Setup**, select **Connectors**.
3. Select **Create via YAML Builder** and paste the copied YAML.
4. Replace `DELEGATE_NAME` with the installed Delegate name. To obtain the Delegate name, navigate to **Project Setup**, and then **Delegates**.
5. Select **Save Changes** and verify that the new connector named `ownapp_k8sconnector` is successfully created.
6. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. In your Harness project, select **Environments**.
2. Select **New Environment**, and then select **YAML**.
3. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/environment.yml" target="_blank" rel="noopener noreferrer">environment.yml</a>, paste it into the YAML editor, and select **Save**.
4. In your new environment, select the **Infrastructure Definitions** tab.
5. Select **Infrastructure Definition**, and then select **YAML**.
6. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/infrastructure-definition.yml" target="_blank" rel="noopener noreferrer">infrastructure-definition.yml</a> and paste it into the YAML editor.
7. Select **Save** and verify that the environment and infrastructure definition are created successfully.

#### Services

In Harness, services represent what you deploy to an environment. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics such as deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Perform the following steps to set up a service:

1. In your Harness project, select **Services**.
2. Select **New Service** and enter the name `ownappservice`.
3. Select **Save**, and then select **YAML** on the **Configuration** tab.
4. Select **Edit YAML**, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/service.yml" target="_blank" rel="noopener noreferrer">service.yml</a>, and paste it into the YAML editor.
5. Select **Save** and verify that the service `ownapp_service` is successfully created.

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Pick a deployment strategy from the following:

<Tabs className="tabs-centered">
<TabItem value="canary" label="Canary">

Perform the following steps to set up a pipeline with canary deployment:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `ownapp_canary_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/canary-pipeline.yml" target="_blank" rel="noopener noreferrer">canary-pipeline.yml</a>, and paste it into the YAML editor.
7. Select **Save**.

</TabItem>
<TabItem value="bg" label="Blue Green">

Perform the following steps to set up a pipeline with Blue Green deployment:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `ownapp_bluegreen_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/bluegreen-pipeline.yml" target="_blank" rel="noopener noreferrer">bluegreen-pipeline.yml</a>, and paste it into the YAML editor.
7. Select **Save**.

</TabItem>
<TabItem value="rolling" label="Rolling">

Perform the following steps to set up a pipeline with rolling deployment:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `ownapp_rolling_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/deploy-own-app/cd-pipeline/rolling-pipeline.yml" target="_blank" rel="noopener noreferrer">rolling-pipeline.yml</a>, and paste it into the YAML editor.
7. Select **Save**.

</TabItem>
</Tabs>

</TabItem>
<TabItem value="cli" label="CLI">

Perform the following steps to install and access the Harness CLI:

1. Download and configure the Harness CLI.
<Tabs queryString="cli-os" className="tabs-centered">
<TabItem value="macos" label="MacOS">

<MacOSCLI />

</TabItem>
<TabItem value="linux" label="Linux">

<Tabs queryString="linux-platform" className="tabs-centered">
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

    ```powershell
    $currentPath = Get-Location
    [Environment]::SetEnvironmentVariable("PATH", "$env:PATH;$currentPath", [EnvironmentVariableTarget]::Machine)
    ```

    d. Restart terminal.

</TabItem>
</Tabs>

2. Clone the forked `harnesscd-example-apps` repo and change directory.

   ```bash
   git clone https://github.com/GITHUB_ACCOUNTNAME/harnesscd-example-apps.git
   cd harnesscd-example-apps/deploy-own-app/cd-pipeline
   ```

   :::note

   Replace `GITHUB_ACCOUNTNAME` with your GitHub Account name.

   :::

3. Log in to Harness from the CLI.

   ```bash
   harness login --api-key HARNESS_API_TOKEN --account-id HARNESS_ACCOUNT_ID
   ```

   :::note

   Replace `HARNESS_API_TOKEN` with Harness API Token that you obtained during the prerequisite section of this tutorial, and `HARNESS_ACCOUNT_ID` with your Harness account ID (find it in the URL when logged into https://app.harness.io).

   :::

:::warning

For the pipeline to run successfully, follow all of the following steps as they are, including the naming conventions.

:::

#### Delegate

You have the option to use the same delegate that you deployed during the Manifest tutorial, or to deploy a new delegate by following the steps below. However, remember to use a newly created delegate identifier when creating connectors.

Perform the following steps to set up a new delegate:

1. Log in to the <a href="https://app.harness.io/" target="_blank" rel="noopener noreferrer">Harness UI</a>. In **Project Setup**, select **Delegates**.
2. Select **Delegates**, and then select **Install delegate**. For this tutorial, install the delegate using Helm.
3. Add the Harness Helm chart repo to your local Helm registry.
   ```bash
   helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
   ```
4. Update the repo using the following command:
   ```bash
   helm repo update harness-delegate
   ```
5. In the command provided, `ACCOUNT_ID`, `MANAGER_ENDPOINT`, and `DELEGATE_TOKEN` are auto-populated values that you can obtain from the delegate installation wizard. Run the install command:
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
6. Verify that the delegate is installed successfully and can connect to the Harness Manager.

:::note

You can also follow the <a href="/docs/platform/get-started/tutorials/install-delegate" target="_blank" rel="noopener noreferrer">Install Harness Delegate on Kubernetes or Docker</a> steps to install the delegate using the Terraform Helm Provider or a Kubernetes manifest.

:::

:::warning

If you plan to use your own Project, Organization, and custom names for Harness resources, update the resource YAMLs accordingly with these details.

:::

#### Secrets

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret manager. Go to <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview/" target="_blank" rel="noopener noreferrer">Harness Secret Manager Overview</a> to understand secrets in Harness.

If you intend to use a private Git repository that hosts your manifest files, create a Harness secret containing the Git personal access token (PAT) with the name `ownappgitpat`. Subsequently, create a new Git connector using this secret.

Perform the following steps to add a secret:

1. Under **Project Setup**, select **Secrets**.
2. Select **New Secret**, and then select **Text**.
3. Enter the secret name `ownappgitpat`.
4. For the secret value, paste the GitHub personal access token you saved earlier.
5. Select **Save**.

#### Connectors

Connectors in Harness enable integration with third party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Go to <a href="/docs/category/connectors" target="_blank" rel="noopener noreferrer">Connectors</a> to explore connector how-tos.

#### GitHub connector

Perform the following steps to set up a GitHub connector:

1. Replace `url` with your GitHub repo URL that hosts your manifest files in the `github-connector.yaml`.
2. Verify that the `projectIdentifier` and `orgIdentifier` are correct and the `tokenRef` value matches the Git PAT secret you created in the previous step.
3. Create the **GitHub connector** using the following CLI command:
   ```bash
   harness connector --file github-connector.yml apply --git-user <YOUR GITHUB USERNAME>
   ```

#### Kubernetes connector

Use the same delegate that you deployed as part of the Manifest tutorial, or use the newly created delegate identifier to create the **Kubernetes connector** using the following CLI command:

```bash
harness connector --file kubernetes-connector.yml apply --delegate-name DELEGATE_IDENTIFIER
```

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. Check the `environment.yml` file and run the following CLI command to create an **Environment** in your Harness project:

   ```bash
   harness environment --file environment.yml apply
   ```

2. In the environment you created above, add an **Infrastructure Definition** using the `infrastructure-definition.yml` file. Run the CLI command to create the entity:

   ```bash
   harness infrastructure --file infrastructure-definition.yml apply
   ```

#### Services

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Verify the `service.yml` and run the following CLI command to create a **Service** in your Harness project:

```bash
harness service -file service.yml apply
```

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Pick a deployment strategy from the following:

<Tabs queryString="deployment" className="tabs-centered">
<TabItem value="canary" label="Canary">

Run the following CLI command for canary deployment:

```bash
harness pipeline --file canary-pipeline.yml apply
```

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps.

</TabItem>
<TabItem value="bg" label="Blue Green">

Run the following CLI command for blue-green deployment:

```bash
harness pipeline --file bluegreen-pipeline.yml apply
```

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps.

</TabItem>
<TabItem value="rolling" label="Rolling">

Run the following CLI command for rolling deployment:

```bash
harness pipeline --file rolling-pipeline.yml apply
```

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

### Execute the deployment pipelines

You can execute the pipeline deployment using any of the following:

- Manual - Start the pipeline on demand from the Harness UI whenever you want to perform a deployment.
- Automatic - Configure a trigger so the pipeline runs automatically in response to events such as Git commits, pull requests, or webhook notifications.

Every execution of a CD pipeline results in a deployment to the target environment.

#### Manual deployment

Perform the following steps to manually execute the deployment:

1. In the **Pipeline Studio**, select **Run**, and then select **Run Pipeline** to initiate the deployment.
2. Observe the execution logs as Harness deploys the workload and checks for steady state.
3. After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

   ```bash
   kubectl get pods -n harness-delegate-ng
   ```

#### Automatic deployment

##### Using Triggers

With <a href="/docs/category/triggers" target="_blank" rel="noopener noreferrer">Pipeline Triggers</a>, you can start automating your deployments based on events happening in an external system. This system could be a Source Repository, an Artifact Repository, or a third party system. Any Developer with Pipeline Create and Edit permissions can configure a trigger in Harness.

Follow the <a href="/docs/platform/triggers/tutorial-cd-trigger" target="_blank" rel="noopener noreferrer">Pipeline Triggers tutorial</a> to see triggers in action.

##### Using API

You can also use the <a href="/docs/category/api" target="_blank" rel="noopener noreferrer">Harness API</a> to manage resources, view, create/edit, or delete them.

Go to the <a href="/docs/platform/automation/api/api-quickstart" target="_blank" rel="noopener noreferrer">Get started with Harness API</a> guide to learn how to use the API for automation.

</TabItem>
<TabItem value="gitops" label="GitOps Workflow">

### Deploy with Harness GitOps \{#getting-started-harness-gitops}

Harness GitOps (built on top of Argo CD) watches the state of your application as defined in a Git repo, and can pull (either automatically or on demand) these changes into your Kubernetes cluster, leading to an application sync.

<Tabs queryString="gitops-interface" className="tabs-centered">
<TabItem value="ui" label="UI">

1. Log in to <a href="https://app.harness.io/" target="_blank" rel="noopener noreferrer">Harness</a>.
2. Select **Projects**, and then select **Default Project**.
3. Select **Deployments**, and then select **GitOps**.
4. Set up a GitOps Agent (connects Harness to your cluster), a Repository (what to deploy), a Cluster (where to deploy it), and an Application (which ties the Agent, Repository, and Cluster as explained in the following sections.

#### GitOps Agent

You have the option to use the same agent that you deployed during the Manifest tutorial, or to deploy a new agent by following the steps below. However, remember to use a newly created agent identifier when creating repositories and clusters.

Perform the following steps to set up a GitOps Agent:

1. Select **Settings**, and then select **GitOps Agents**.
2. Select **New GitOps Agent**.
3. In **Do you have any existing Argo CD instances?**, select **Yes** if you already have an Argo CD instance, else select **No** to install the **Harness GitOps Agent**.

<Tabs queryString="gitopsagent" className="tabs-centered">
<TabItem value="agent-fresh-install" label="(No is selected) Harness GitOps Agent Fresh Install">

Perform the following steps:

1. Select **Start**.
2. In **Name**, enter the name for the new Agent `ownappagent`.
3. In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment. For this tutorial, use the `default` namespace to install the Agent and deploy applications.
4. Select **Continue**. The **Review YAML** settings appear. This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.
   ```bash
   kubectl apply -f gitops-agent.yml -n default
   ```
5. Select **Continue** and verify the Agent is successfully installed and can connect to Harness Manager.

</TabItem>
<TabItem value="existingargo" label="(Yes is selected) Harness GitOps Agent with existing Argo CD instance">

Perform the following steps:

1. Select **Start**.
2. In **Name**, enter the name for the existing Argo CD project.
3. In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment.
4. Select **Next**. The **Review YAML** settings appear. This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.
   ```yaml
   kubectl apply -f gitops-agent.yml -n default
   ```
5. Once you have installed the Agent, Harness will start importing all the entities from the existing Argo CD Project.

</TabItem>
</Tabs>

#### Repositories

A Harness GitOps repository contains the declarative description of a desired state. The declarative description can be in Kubernetes manifests, Helm Chart, Kustomize manifests, and so on.

Perform the following steps to add a repository:

1. Select **Settings**, and then select **Repositories**.
2. Select **New Repository**.
3. Select **Git** and enter the following details:
   1. In **Repository**, enter the name `ownapp_repo`.
   2. In **GitOps Agent**, select the Agent that you installed in your cluster and select **Apply**.
   3. In **Git Repository URL**, enter `https://github.com/microservices-demo/microservices-demo`.
4. Select **Continue** and choose **Specify Credentials For Repository**.
   1. In **Connection Type**, select **HTTPS**.
   2. In **Authentication**, select **Anonymous (no credentials required)**.
   3. Select **Save & Continue** and wait for Harness to verify the connection.
   4. Select **Finish**.

#### Clusters

A Harness GitOps Cluster is the target deployment cluster that is compared to the desired state. Clusters are synced with the source manifests you add as GitOps Repositories.

Perform the following steps to add a new cluster:

1. Select **Settings**, and then select **Clusters**.
2. Select **New Cluster**.
3. In **Name**, enter a name for the cluster: `ownapp_cluster`.
4. In **GitOps Agent**, select the Agent you installed in your cluster, and then select **Apply**.
5. Select **Continue** and select **Use the credentials of a specific Harness GitOps Agent**.
6. Select **Save & Continue** and wait for Harness to verify the connection.
7. Select **Finish**.

#### Applications

GitOps Applications are how you manage GitOps operations for a given desired state and its live instantiation.

A GitOps Application collects the Repository (**what you want to deploy**), Cluster (**where you want to deploy**), and Agent (**how you want to deploy**). You define these entities and then select them when you set up your Application.

Perform the following steps to add a new application:

1. Select **Applications**, and then select **New Application**.
2. Enter the **Application Name**: `sockshop`.
3. In **GitOps Agent**, select the Agent that you installed in your cluster and select **Apply**.
4. Select **New Service** and toggle to **YAML** to use the YAML editor.
5. Select **Edit YAML**, paste the following, and then select **Save**.

   ```yaml
   service:
     name: ownapp_service
     identifier: ownappservice
     serviceDefinition:
       type: Kubernetes
       spec: {}
     gitOpsEnabled: true
   ```

   :::info Feature flag: `CDS_GITOPS_MERGE_K8S_SERVICES`
   When the feature flag `CDS_GITOPS_MERGE_K8S_SERVICES` is enabled, the same service can be used in both CD stages and GitOps stages. You are responsible for populating the relevant fields in the service definition for your use case (for example, a Release Repository for the Update Release Repo step, or an App Set Reference for Fetch Linked Apps). Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.
   :::

6. Select **New Environment** and toggle to **YAML** to use the YAML editor.
7. Select **Edit YAML**, paste the following, and then select **Save**.

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

8. Select **Continue**, keep the **Sync Policy** settings as is, and then select **Continue**.
9. In **Repository URL**, select the **Repository** you created earlier, and then select **Apply**.
10. Select `master` as the **Target Revision**, type `deploy/kubernetes` in the **Path**, and then click **Enter**.
11. Select **Continue** and select the **Cluster** created in the above steps.
12. In **Namespace**, enter the target namespace for Harness GitOps to sync the application. Enter `default` and select **Finish**.

#### Synchronize the application

After setting up the GitOps workflow, you can synchronize the application with your Kubernetes setup.

Perform the following steps:

1. Select **Sync**, check the Application details, and then select **Synchronize** to initiate the deployment.
2. After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

   ```bash
   kubectl get pods -n sock-shop
   ```

3. Sock Shop is accessible via the master and any of the node URLs on port `30001`.

A successful application sync displays the status tree under **Resource View**.

</TabItem>
<TabItem value="terraform" label="Terraform Provider">

Harness offers a <a href="https://registry.terraform.io/providers/harness/harness/latest/docs" target="_blank" rel="noopener noreferrer">Terraform Provider</a> to help you declaratively manage Harness GitOps entities alongside your application and cluster resources. These steps walk through using Terraform to create and install the GitOps agent, define related Harness entities, and deploy a sample application to your cluster.

<DocVideo src="https://www.youtube.com/watch?v=U_XkKcfg8ts" width="75%" />

Before proceeding:

1. Generate a <a href="/docs/platform/automation/api/add-and-manage-api-keys/#create-personal-api-keys-and-tokens" target="_blank" rel="noopener noreferrer">Harness API token</a>.
2. Make sure <a href="https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli" target="_blank" rel="noopener noreferrer">Terraform</a> is installed on a computer that can connect to your cluster.

#### Harness Terraform Provider

A Terraform Provider is a plugin that allows Terraform to define and manage resources using a particular software API. In this tutorial, these resources will be Harness entities.

Perform the following steps to set up the Harness Terraform Provider:

1. Clone or download the Harness <a href="https://github.com/harness-community/gitops-terraform-onboarding" target="_blank" rel="noopener noreferrer">gitops-terraform-onboarding</a> project.

   ```bash
   git clone https://github.com/harness-community/gitops-terraform-onboarding.git
   cd gitops-terraform-onboarding/
   ```

2. Initialize the Terraform configuration. This step will also install the Harness provider plugin.

   ```bash
   terraform init
   ```

#### Input variables

A Terraform module is a collection of files that define the desired state to be enforced by Terraform. These files normally have the `.tf` extension.

Perform the following steps:

1. Open `terraform.tfvars`. This file contains example values for the Harness entities that will be created.

   ```text
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

2. In `terraform.tfvars`, change the value of `repo_url` to the `https://github.com/microservices-demo/microservices-demo/` repository or to your own app repo. You can keep the other variable values as they are or rename them to suit your environment.

3. Set `account_id` and `harness_api_token` as Terraform environment variables. Your Account ID can be found in the URL after `account/` when you are logged into `app.harness.io`.

   ```bash
   export TF_VAR_account_id="123abcXXXXXXXX"
   export TF_VAR_harness_api_token="pat.abc123xxxxxxxxxx…"
   ```

:::warning

Never store your Harness API Key in a plain text configuration file or in version control. Use an environment variable or a dedicated secrets manager.

:::

#### Terraform module

Perform the following steps:

1. Open `agent.tf`. This file defines the GitOps agent in Harness and then deploys the agent manifest to your cluster. The agent is created using the `harness_platform_gitops_agent` resource.

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

   If you have an _existing_ Argo CD instance, change the `type` argument to `CONNECTED_ARGO_PROVIDER`. Otherwise leave as is.

2. If you have made changes to any configuration files, verify the syntax is still valid.

   ```bash
   terraform validate
   ```

3. Preview the changes Terraform will make in Harness and your cluster.

   ```bash
   terraform plan
   ```

4. Apply the Terraform configuration to create the Harness and cluster resources. Type `yes` to confirm when prompted.

   ```bash
   terraform apply
   ```

   Observe the output of `terraform apply` as your resources are created. It may take a few minutes for all the resources to be provisioned.

#### Verify GitOps deployment

Perform the following steps to verify the GitOps deployment:

1. Log in to the <a href="https://app.harness.io" target="_blank" rel="noopener noreferrer">Harness App</a>. Select **Deployments**, then **GitOps**.
2. Select **Settings**, and then select **GitOps Agents**. Verify your GitOps agent is listed and displays a HEALTHY health status.
3. Navigate back to **Settings**, and then select **Repositories**. Verify your `harnesscd-example-apps` repo is listed with Active connectivity status.
4. Navigate back to **Settings**, and then select **Clusters**. Verify your cluster with its associated GitOps agent is listed with Active connectivity status.
5. Select **Application** from the top right of the page. Select the `sockshop` application. This is the application deployed from the `microservices-demo/microservices-demo/` repo.
6. Select **Resource View** to see the cluster resources that have been deployed. A successful Application sync will display the status tree.
7. Return to a local command line. Confirm you can see the GitOps agent and guestbook application resources in your cluster.

   ```bash
   kubectl get deployment -n default
   kubectl get svc -n default
   kubectl get pods -n default
   ```

8. To access the Sockshop application deployed via Harness GitOps, you can check the deployment on your Kubernetes cluster using the following command:

   ```bash
   kubectl get pods -n sock-shop
   ```

   Sock Shop is accessible via the master and any of the node URLs on port `30001`.

#### Cleaning up

If you no longer need the resources created in this tutorial, run the following command to delete the GitOps agent and associated Harness entities.

```bash
terraform destroy
```

:::note

Since deleting the Sockshop application in Harness does not delete the deployed cluster resources themselves, you will need to manually remove the Kubernetes deployment.

:::

</TabItem>
<TabItem value="cli" label="CLI">

Perform the following steps:

1. Go to <a href="/docs/platform/automation/cli/install" target="_blank" rel="noopener noreferrer">Install and configure the Harness CLI</a> to set up the CLI.

2. Clone the Forked `harnesscd-example-apps` repo and change directory.

   ```bash
   git clone https://github.com/GITHUB_ACCOUNTNAME/harnesscd-example-apps.git
   cd harnesscd-example-apps/deploy-own-app/gitops
   ```

   :::note

   Replace `GITHUB_ACCOUNTNAME` with your GitHub Account name.

   :::

#### GitOps Agent

You have the option to use the same agent that you deployed during the Manifest tutorial, or to deploy a new agent by following the steps below. However, remember to use a newly created agent identifier when creating repositories and clusters.

Perform the following steps to set up a GitOps Agent:

1. Select **Settings**, and then select **GitOps Agents**.
2. Select **New GitOps Agent**.
3. In **Do you have any existing Argo CD instances?**, select **Yes** if you already have an Argo CD instance, else select **No** to install the **Harness GitOps Agent**.

<Tabs queryString="gitopsagent" className="tabs-centered">
<TabItem value="agent-fresh-install" label="(No is selected) Harness GitOps Agent Fresh Install">

Perform the following steps:

1. Select **No**, and then select **Start**.
2. In **Name**, enter the name for the new Agent `ownappagent`.
3. In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment. For this tutorial, use the `default` namespace to install the Agent and deploy applications.
4. Select **Continue**. The **Review YAML** settings appear. This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.
   ```bash
   kubectl apply -f gitops-agent.yml -n default
   ```
5. Select **Continue** and verify the Agent is successfully installed and can connect to Harness Manager.

</TabItem>
<TabItem value="existingargo" label="(Yes is selected) Harness GitOps Agent with existing Argo CD instance">

Perform the following steps:

1. Select **Yes**, and then select **Start**.
2. In **Name**, enter the name for the existing Argo CD project.
3. In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment.
4. Select **Next**. The **Review YAML** settings appear. This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.
   ```yaml
   kubectl apply -f gitops-agent.yml -n default
   ```
5. Once you have installed the Agent, Harness will start importing all the entities from the existing Argo CD Project.

</TabItem>
</Tabs>

Before proceeding, store the Agent Identifier value as an environment variable for use in the subsequent commands:

```bash
export AGENT_NAME=GITOPS_AGENT_IDENTIFIER
```

:::note

Replace `GITOPS_AGENT_IDENTIFIER` with GitOps Agent Identifier.

:::

#### Repositories

A Harness GitOps repository contains the declarative description of a desired state. The declarative description can be in Kubernetes manifests, Helm Chart, Kustomize manifests, and so on.

Create a **GitOps Repository** using the following CLI command:

```bash
harness gitops-repository --file deploy-own-app/gitops/repository.yml apply --agent-identifier $AGENT_NAME
```

:::note

If you intend to use a private Git repository that hosts your manifest files, create a Harness secret containing the Git personal access token (PAT). Subsequently, create a new GitOps Repository pointing to your private repo.

:::

#### Clusters

A Harness GitOps Cluster is the target deployment cluster that is compared to the desired state. Clusters are synced with the source manifests you add as GitOps Repositories.

Create a **GitOps Cluster** using the following CLI command:

```bash
harness gitops-cluster --file deploy-own-app/gitops/cluster.yml apply --agent-identifier $AGENT_NAME
```

#### Applications

GitOps Applications are how you manage GitOps operations for a given desired state and its live instantiation.

Create a **GitOps Application** using the following CLI command:

```bash
harness gitops-application --file deploy-own-app/gitops/application.yml apply --agent-identifier $AGENT_NAME
```

:::note

To deploy your own app, modify `repoURL` and `path` in the `application.yml`.

:::

#### Synchronize the application

After setting up the GitOps workflow, you can synchronize the application with your Kubernetes setup.

Perform the following steps:

1. Navigate to **Harness UI > Default Project > GitOps > Applications**, and then select **gitops-application**. Select **Sync**, followed by **Synchronize** to kick off the application deployment.
2. Observe the Sync state as Harness synchronizes the workload under the **Resource View** tab.
3. After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

   ```bash
   kubectl get pods -n sock-shop
   ```

4. Sock Shop is accessible via the master and any of the node URLs on port `30001`.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

---

## Next steps

You have deployed your own microservice application with Harness CD and GitOps. 

Continue your learning journey with the following:

- <a href="/docs/platform/triggers/tutorial-cd-trigger" target="_blank" rel="noopener noreferrer">Pipeline triggers</a>: Run your pipeline automatically in response to Git events.
- <a href="/docs/continuous-delivery/gitops/applicationsets/harness-git-ops-application-set-tutorial" target="_blank" rel="noopener noreferrer">Harness GitOps ApplicationSet and PR Pipeline Tutorial</a>: Create a GitOps ApplicationSet and PR pipeline.
