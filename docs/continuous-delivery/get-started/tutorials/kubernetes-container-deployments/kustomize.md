---
title: Deploy using Kustomize
sidebar_label: Deploy with Kustomize
description: Deploy a sample application using Kustomize with Harness CD and GitOps.
keywords:
  - Kustomize
  - Continuous Delivery
  - GitOps
  - deployment
tags:
  - continuous-delivery
  - gitops
  - kubernetes
sidebar_position: 2
redirect_from:
  - /tutorials/cd-pipelines/kubernetes/kustomize
  - /docs/continuous-delivery/get-started/tutorials/kustomize
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

This topic explains how to deploy a sample application (Guestbook) using Kustomize with Harness Continuous Delivery (CD).

Harness CD offers two ways to deploy the Guestbook application:

- [CD pipeline](#getting-started-harness-cd-ui): You build a Harness pipeline that deploys the Kustomize manifests to your target cluster.
- [GitOps workflow](#using-harness-gitops): You install a Harness GitOps Agent, connect it to your Git repo and target cluster, and let Harness (using Argo CD) sync the desired state from Git into your cluster.

:::note

<a href="https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-kustomize" target="_blank" rel="noopener noreferrer">Sign up</a> today to get started with Harness CD.

:::

---

## What will you learn in this topic?

- How to set up a [delegate](#delegate), [secret](#secrets), [connectors](#connectors), [environment](#environment), [service](#services), and [pipeline](#pipeline) to deploy the Guestbook application.
- How to choose a rolling, canary, or Blue Green [deployment strategy](#pipeline) for your pipeline.
- How to install a [Harness GitOps Agent](#install-a-harness-gitops-agent) and [sync the desired state](#synchronize-the-application) from your Git repository into your cluster using Argo CD.
- How to deploy the Guestbook application using the Harness [UI](#getting-started-harness-cd-ui) or [CLI](#getting-started-harness-cd-ui).

---

## Before you begin

Ensure you have the following:

- **GitHub personal access token**: A token with the `repo` scope. Go to <a href="https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line" target="_blank" rel="noopener noreferrer">creating a personal access token</a> to generate one.
- **Kubernetes cluster**: Use your own cluster, or install <a href="https://k3d.io/v5.5.1/" target="_blank" rel="noopener noreferrer">K3D</a> to run Harness Delegates and the sample application in a local development environment. Go to <a href="/docs/platform/delegates/delegate-concepts/delegate-requirements" target="_blank" rel="noopener noreferrer">Delegate system and network requirements</a> to review the requirements.
- **Helm CLI**: Install the <a href="https://helm.sh/docs/intro/install/" target="_blank" rel="noopener noreferrer">Helm CLI</a> to install the Harness Helm delegate.
- **Forked example repository**: Fork the <a href="https://github.com/harness-community/harnesscd-example-apps/fork" target="_blank" rel="noopener noreferrer">harnesscd-example-apps</a> repository through the GitHub web interface. Go to <a href="https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository" target="_blank" rel="noopener noreferrer">GitHub docs</a> to fork a repository.
- **Harness API token (CLI method only)**: A token required to run the CLI steps. Go to <a href="/docs/platform/automation/api/add-and-manage-api-keys/" target="_blank" rel="noopener noreferrer">creating a personal API token</a> to generate one.

---

## Deploy the application

:::note

Harness resources such as delegates, secrets, and connectors can be created at the Account, Organization, or Project scope. For simplicity, this tutorial uses Project-scoped resources throughout. If you use resources from a different scope, update the configuration accordingly when you create connectors, environments, services, and the deployment pipeline.

Go to <a href="/docs/platform/organizations-and-projects" target="_blank" rel="noopener noreferrer">Organizations and projects</a> to understand the Harness resource hierarchy and scopes.

:::

You can deploy the Guestbook application using either a Harness CD pipeline or a Harness GitOps workflow.

Run the following command to check your system resources and optionally install a local cluster:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/harness-community/scripts/main/delegate-preflight-checks/cluster-preflight-checks.sh)
```

<Tabs queryString="pipeline" className="tabs-centered">
<TabItem value="cd-pipeline" label="CD Pipeline">

### Deploy with a CD pipeline \{#getting-started-harness-cd-ui}

Harness CD pipelines allow you to orchestrate and automate your deployment workflows and push updated application images to your target Kubernetes cluster. Pipelines allow extensive control over how you want to progress artifacts through various development, test, staging, or production clusters, when running a variety of scans and tests to ensure the quality and stability standards you and your team have defined.

You can proceed with the tutorial using either the Harness user interface (UI) or the command-line interface (CLI).

<Tabs queryString="interface" className="tabs-centered">
<TabItem value="ui" label="UI">

Perform the following steps to deploy the Guestbook application using the Harness CD Pipeline UI:

1. Log in to <a href="https://app.harness.io/" target="_blank" rel="noopener noreferrer">Harness Manager</a>.
2. Select **Projects**, and then select **Default Project**.
3. After selecting the project, configure the core resources Harness requires to run a deployment, including a delegate, a secret, two connectors, an environment, a service, and a deployment pipeline, as explained in the following sections.

:::warning

For the pipeline to run successfully, follow the remaining steps as they are, including the naming conventions.

:::

#### Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifact registries, cloud platforms, and so on. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations including deployment and integration. Go to <a href="/docs/platform/delegates/delegate-concepts/delegate-overview/" target="_blank" rel="noopener noreferrer">Delegate Overview</a> to understand the delegate.

Perform the following steps to set up a delegate:

1. Under **Project Setup**, select **Delegates**.
2. Select **Tokens**, and then create a delegate token:
   1. Select **New Token**.
   2. Enter the name `delegate_token`.
   3. Select **Apply**.
   4. Copy the token value by selecting the copy icon and store the token somewhere safe.
   5. Select **Close**.
3. Select **Delegates**, and then select **Install delegate**. For this tutorial, install the delegate using Helm.
4. Add the Harness Helm chart repo to your local Helm registry using the following command.
   ```bash
   helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
   ```
5. Update the repo using the following command:

   ```bash
   helm repo update harness-delegate
   ```
6. Copy and run the install command from the Delegate installation wizard as shown in the following example:

   Here, the `ACCOUNT_ID`, `MANAGER_ENDPOINT` and `DELEGATE_TOKEN` are auto-populated values you will get from the wizard itself.

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
7. Select **Verify** to verify that the delegate is installed successfully and can connect to the Harness Manager.

:::note

You can also follow the <a href="/docs/platform/get-started/tutorials/install-delegate" target="_blank" rel="noopener noreferrer">Install Harness Delegate on Kubernetes or Docker</a> steps to install the delegate using the Terraform Helm Provider or a Kubernetes manifest.

:::

#### Secrets

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret manager. Go to <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview/" target="_blank" rel="noopener noreferrer">Harness Secret Manager Overview</a> to understand secrets in Harness.

Perform the following steps to add a secret:

1. Under **Project Setup**, select **Secrets**.
2. Select **New Secret**, and then select **Text**.
3. Enter the secret name `harness_gitpat`.
4. For the **Secret Value**, paste the GitHub personal access token you saved earlier.
5. Select **Save**.

#### Connectors

Connectors in Harness enable integration with third party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Go to <a href="/docs/category/connectors" target="_blank" rel="noopener noreferrer">Connectors</a> to explore connector how-tos.

#### Set up the GitHub connector

Perform the following steps to set up a GitHub connector:

1. Under **Project Setup**, select **Connectors**.
2. Select **Create via YAML Builder** and copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/github-connector.yml" target="_blank" rel="noopener noreferrer">github-connector.yml</a> into the YAML editor.
3. Replace `GITHUB_USERNAME` with your GitHub account username in the YAML (assuming you have already forked the <a href="https://github.com/harness-community/harnesscd-example-apps/fork" target="_blank" rel="noopener noreferrer">harnesscd-example-apps</a> repo as noted in Before you begin).
4. Select **Save Changes** and verify that the new connector named `harness_gitconnector` is successfully created.
5. Select **Test** under **Connectivity Status** to ensure the connection is successful.

#### Set up the Kubernetes connector

Perform the following steps to set up a Kubernetes connector:

1. Under **Project Setup**, select **Connectors**.
2. Select **Create via YAML Builder** and copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/kubernetes-connector.yml" target="_blank" rel="noopener noreferrer">kubernetes-connector.yml</a> into the YAML editor.
3. Replace `DELEGATE_NAME` with the installed delegate name. To obtain the delegate name, navigate to **Default Project** > **Project Setup** > **Delegates**.
4. Select **Save Changes** and verify that the new connector named `harness_k8sconnector` is successfully created.
5. Select **Test** under **Connectivity Status** to verify the connection is successful.

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. In **Default Project**, select **Environments**.
2. Select **New Environment** and toggle to **YAML** to use the YAML editor.
3. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/environment.yml" target="_blank" rel="noopener noreferrer">environment.yml</a>, paste it into the YAML editor, and then select **Save**.
4. In the **Infrastructure Definitions** tab, select **Infrastructure Definition**, and then select **Edit YAML**.
5. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/infrastructure-definition.yml" target="_blank" rel="noopener noreferrer">infrastructure-definition.yml</a> and paste it into the YAML editor.
6. Select **Save** and verify that the environment and infrastructure definition are created successfully.

#### Services

In Harness, services represent what you deploy to an environment. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics such as deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Perform the following steps to set up a service:

1. In **Default Project**, select **Services**.
2. Select **New Service**, enter the name `harnessguestbook`, and then select **Save**.
3. On the **Configuration** tab, toggle to **YAML** to use the YAML editor.
4. Select **Edit YAML**, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/service.yml" target="_blank" rel="noopener noreferrer">service.yml</a>, and paste it into the YAML editor.
5. Select **Save** and verify that the service `harness_guestbook` is successfully created.

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Pick a deployment strategy from the following:

<Tabs queryString="deploymentcdpipeline" className="tabs-centered">
<TabItem value="canary" label="Canary">

A canary deployment updates nodes in a single environment gradually, allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments" target="_blank" rel="noopener noreferrer">When to use Canary deployments</a> to understand when to use them.

Perform the following steps to set up a pipeline with canary deployment:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `guestbook_canary_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/canary-pipeline.yml" target="_blank" rel="noopener noreferrer">canary-pipeline.yml</a>, and paste it into the YAML editor.
7. Select **Save**.

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/kustomize-tutorial/canary.png')} alt="Canary" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
<TabItem value="bg" label="Blue Green">

Blue Green deployments involve running two identical environments (staging and production) simultaneously with different service versions. QA and UAT are performed on a new service version in the staging environment first. Next, traffic is shifted from the production environment to staging, and the previous service version running on production is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments" target="_blank" rel="noopener noreferrer">When to use Blue Green deployments</a> to understand when to use them.

Perform the following steps to set up a pipeline with Blue Green deployment:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `guestbook_bluegreen_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/bluegreen-pipeline.yml" target="_blank" rel="noopener noreferrer">bluegreen-pipeline.yml</a>, and paste it into the YAML editor.
7. Select **Save**.

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/kustomize-tutorial/bluegreen.png')} alt="Blue Green" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
<TabItem value="rolling" label="Rolling">

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments" target="_blank" rel="noopener noreferrer">When to use rolling deployments</a> to understand when to use them.

Perform the following steps to set up a pipeline with rolling deployment:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `guestbook_rolling_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/rolling-pipeline.yml" target="_blank" rel="noopener noreferrer">rolling-pipeline.yml</a>, and paste it into the YAML editor.
7. Select **Save**.

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/kustomize-tutorial/rolling.png')} alt="Rolling" width="80%" height="80%" title="Click to view full size image" />
</div>

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

   ```bash
   curl -LO https://github.com/harness/harness-cli/releases/download/v0.0.16-Preview/harness-v0.0.16-Preview-linux-arm64.tar.gz
   tar -xvf harness-v0.0.16-Preview-linux-arm64.tar.gz
   echo 'export PATH="'$(pwd)':$PATH"' >> ~/.bash_profile
   source ~/.bash_profile
   ```

</TabItem>
<TabItem value="amd" label="AMD">

   ```bash
   curl -LO https://github.com/harness/harness-cli/releases/download/v0.0.16-Preview/harness-v0.0.16-Preview-linux-amd64.tar.gz
   tar -xvf harness-v0.0.16-Preview-linux-amd64.tar.gz
   echo 'export PATH="'$(pwd)':$PATH"' >> ~/.bash_profile
   source ~/.bash_profile
   ```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="windows" label="Windows">

    a. Open Windows Powershell and run the following command to download the Harness CLI:

    ```powershell
    Invoke-WebRequest -Uri https://github.com/harness/harness-cli/releases/download/v0.0.16-Preview/harness-v0.0.16-Preview-windows-amd64.zip  -OutFile ./harness.zip
    ```

    b. Extract the downloaded zip file and change directory to extracted file location.

    c. Perform the steps below to make it accessible via terminal.

    ```powershell
    $currentPath = Get-Location
    [Environment]::SetEnvironmentVariable("PATH", "$env:PATH;$currentPath", [EnvironmentVariableTarget]::Machine)
    ```

    d. Restart terminal.

</TabItem>
</Tabs>

2. Clone the Forked `harnesscd-example-apps` repo and change directory.

   ```bash
   git clone https://github.com/GITHUB_ACCOUNTNAME/harnesscd-example-apps.git
   cd harnesscd-example-apps
   ```

   :::note

   Replace `GITHUB_ACCOUNTNAME` with your GitHub Account name.

   :::

3. Log in to Harness from the CLI.

   ```bash
   harness login --account-id ACCOUNT_ID --api-key HARNESS_API_TOKEN
   ```

   :::note

   Replace `HARNESS_API_TOKEN` with Harness API Token that you obtained in Before you begin section of this tutorial.

   :::

:::warning

For the pipeline to run successfully, follow all of the following steps as they are, including the naming conventions.

:::

#### Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifact registries, cloud platforms, etc. The delegate is installed in the target infrastructure (Kubernetes cluster) and performs operations including deployment and integration. Go to <a href="/docs/platform/delegates/delegate-concepts/delegate-overview/" target="_blank" rel="noopener noreferrer">Delegate Overview</a> to understand the delegate.

Perform the following steps to set up a delegate:

1. Log in to the <a href="https://app.harness.io/" target="_blank" rel="noopener noreferrer">Harness UI</a>. In **Project Setup**, select **Delegates**.
2. Select **Install delegate**. For this tutorial, install the delegate using Helm.
3. Add the Harness Helm chart repo to your local Helm registry using the following command.
   ```bash
   helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
   ```
4. Update the repo using the following command:

   ```bash
   helm repo update harness-delegate
   ```
5. Run the following command, replacing `ACCOUNT_ID`, `MANAGER_ENDPOINT`, and `DELEGATE_TOKEN` with the corresponding auto-populated values from the delegate installation wizard.

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

#### Secrets

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret manager. Go to <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview/" target="_blank" rel="noopener noreferrer">Harness Secret Manager Overview</a> to understand secrets in Harness.

Create a secret to store the GitHub PAT. This is used in the next step to create a GitHub connector.

```bash
harness secret --token GITHUB_PAT apply
```

:::note

Replace `GITHUB_PAT` with the GitHub PAT that you obtained in the Before you begin section of this tutorial.

:::

#### Connectors

Connectors in Harness enable integration with third party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Go to <a href="/docs/category/connectors" target="_blank" rel="noopener noreferrer">Connectors</a> to explore connector how-tos.

#### GitHub connector

Create the **GitHub connector** using the following CLI command:

```bash
harness connector --file kustomize-guestbook/harnesscd-pipeline/github-connector.yml apply --git-user GITHUB_ACCOUNTNAME
```

#### Kubernetes connector

Create the **Kubernetes connector** using the following CLI command:

```bash
harness connector --file kustomize-guestbook/harnesscd-pipeline/kubernetes-connector.yml apply --delegate-name helm-delegate
```

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. Run the following CLI command to create an **Environment** in your Harness project:

   ```bash
   harness environment --file kustomize-guestbook/harnesscd-pipeline/environment.yml apply
   ```

2. Add an **Infrastructure Definition** using the following CLI command:

   ```bash
   harness infrastructure --file kustomize-guestbook/harnesscd-pipeline/infrastructure-definition.yml apply
   ```

#### Services

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Run the following CLI command to create a **Service** in your Harness project:

```bash
harness service --file kustomize-guestbook/harnesscd-pipeline/service.yml apply
```

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Pick a deployment strategy from the following:

<Tabs queryString="deployment" className="tabs-centered">
<TabItem value="canary" label="Canary">

A canary deployment updates nodes in a single environment gradually, allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments" target="_blank" rel="noopener noreferrer">When to use Canary deployments</a> to understand when to use them.

Run the following CLI command for canary deployment:

```bash
harness pipeline --file kustomize-guestbook/harnesscd-pipeline/canary-pipeline.yml apply
```

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/kustomize-tutorial/canary.png')} alt="Canary" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
<TabItem value="bg" label="Blue Green">

Blue Green deployments involve running two identical environments (staging and production) simultaneously with different service versions. QA and UAT are performed on a new service version in the staging environment first. Next, traffic is shifted from the production environment to staging, and the previous service version running on production is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments" target="_blank" rel="noopener noreferrer">When to use Blue Green deployments</a> to understand when to use them.

Run the following CLI command for blue-green deployment:

```bash
harness pipeline --file kustomize-guestbook/harnesscd-pipeline/bluegreen-pipeline.yml apply
```

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/kustomize-tutorial/bluegreen.png')} alt="Blue Green" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
<TabItem value="rolling" label="Rolling">

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments" target="_blank" rel="noopener noreferrer">When to use rolling deployments</a> to understand when to use them.

Run the following CLI command for rolling deployment:

```bash
harness pipeline --file kustomize-guestbook/harnesscd-pipeline/rolling-pipeline.yml apply
```

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/kustomize-tutorial/rolling.png')} alt="Rolling" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
</Tabs>

</TabItem>
</Tabs>

### Run the pipeline

Perform the following steps to execute the pipeline:

1. In the **Pipeline Studio**, select **Run**, and then select **Run Pipeline** to initiate the deployment.
2. Observe the execution logs as Harness deploys the workload and checks for steady state.
3. After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

   ```bash
   kubectl get pods -n default
   ```

4. To access the Guestbook application deployed via the Harness pipeline, port forward the service and access it at `http://localhost:8080`:

   ```bash
   kubectl port-forward svc/kustomize-guestbook-ui 8080:80
   ```

### Deploy your own application

You can use your own microservice application with this tutorial by following the steps below:

- Use the same delegate that you deployed as part of this tutorial. Alternatively, deploy a new delegate, but remember to use a newly created delegate identifier when creating connectors.

- If you intend to use a private Git repository that hosts your Kustomize files, create a Harness secret containing the Git personal access token (PAT). Subsequently, create a new Git connector using this secret.

- Create a Kubernetes connector if you plan to deploy your applications in a new Kubernetes environment. Ensure to update the infrastructure definition to reference this newly created Kubernetes connector.

- Once you complete all the aforementioned steps, create a new Harness service that uses Kustomize for deploying applications.

- Establish a new deployment pipeline and select the newly created infrastructure definition and service. Choose a deployment strategy that aligns with your microservice application's deployment needs.

</TabItem>
<TabItem value="gitops" label="GitOps Workflow">

### Deploy with Harness GitOps \{#using-harness-gitops}

Harness GitOps (built on top of Argo CD) watches the state of your application as defined in a Git repo, and can pull (either automatically or on demand) these changes into your Kubernetes cluster, leading to an application sync.

Whether you are new to GitOps or already have an Argo CD instance, this tutorial helps you get started with Harness GitOps, both with and without Argo CD.

Perform the following steps to deploy with Harness GitOps:

1. Log in to the <a href="https://app.harness.io/" target="_blank" rel="noopener noreferrer">Harness App</a>.
2. Select **Projects** in the top left corner, and then select **Default Project**.
3. In **Deployments**, select **GitOps**.
4. Set up a GitOps Agent (connects Harness to your cluster), a Repository (what to deploy), a Cluster (where to deploy it), and an Application (which ties the Agent, Repository, and Cluster as explained in the following sections.

### Install a Harness GitOps Agent

A Harness GitOps Agent is a worker process that runs in your environment, makes secure, outbound connections to Harness, and performs all the GitOps tasks you request in Harness.

Perform the following steps to set up a GitOps Agent:

1. Select **Settings**, and then select **GitOps Agents**.
2. Select **New GitOps Agent**.
3. In **Do you have any existing Argo CD instances?**, select **Yes** if you already have an Argo CD instance, else select **No** to install the Harness GitOps Agent.

<Tabs queryString="gitopsagent" className="tabs-centered">
<TabItem value="agent-fresh-install" label="(No is selected) Harness GitOps Agent Fresh Install">

Perform the following steps:

1. Select **Start**.
2. In **Name**, enter the name for the new Agent.
3. In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment. For this tutorial, use the `default` namespace to install the Agent and deploy applications.
4. Select **Continue**. The Review YAML settings appear. This is the manifest YAML for the Harness GitOps Agent. You can download this YAML file and run it in your Harness GitOps Agent cluster.
   ```yaml
   kubectl apply -f gitops-agent.yml -n default
   ```
5. Select **Continue** and verify that the Agent is successfully installed and can connect to Harness Manager.

</TabItem>
<TabItem value="existingargo" label="(Yes is selected) Harness GitOps Agent with existing Argo CD instance">

Perform the following steps:

1. Select **Start**.
2. In **Name**, enter the name of the existing Argo CD project.
3. In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment. For this tutorial, use the `default` namespace to install the Agent and deploy applications.
4. Select **Next**. The Review YAML settings appear. This is the manifest YAML for the Harness GitOps Agent. You can download this YAML file and run it in your Harness GitOps Agent cluster.
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
   1. In **Repository Name**, enter the Git repository name.
   2. In **GitOps Agent**, select the Agent that you installed in your cluster and select **Apply**.
   3. In **Git Repository URL**, enter `https://github.com/GITHUB_USERNAME/harnesscd-example-apps.git` and replace `GITHUB_USERNAME` with your GitHub username.
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
3. In the **Name** field, enter a name for the cluster.
4. In **GitOps Agent**, select the Agent that you installed in your cluster and select **Apply**.
5. Select **Continue** and select **Use the credentials of a specific Harness GitOps Agent**.
6. Select **Save & Continue** and wait for Harness to verify the connection.
7. Select **Finish**.

#### Applications

GitOps Applications are how you manage GitOps operations for a given desired state and its live instantiation.

A GitOps Application collects the Repository (**what you want to deploy**), Cluster (**where you want to deploy**), and Agent (**how you want to deploy**). You define these entities and then select them when you set up your Application.

Perform the following steps to add a new application:

1. Select **Applications**, and then select **New Application**.
2. In **Application Name**, enter the name `guestbook`.
3. In **GitOps Agent**, select the Agent that you installed in your cluster and select **Apply**.
4. Select **New Service** and toggle to **YAML** to use the YAML editor.
5. Select **Edit YAML**, paste the following, and then select **Save**.

   ```yaml
   service:
     name: gitopsguestbook
     identifier: gitopsguestbook
     serviceDefinition:
       type: Kubernetes
       spec: {}
     gitOpsEnabled: true
   ```

   :::note Feature flag: `CDS_GITOPS_MERGE_K8S_SERVICES`
   When the feature flag `CDS_GITOPS_MERGE_K8S_SERVICES` is enabled, the same service can be used in both CD stages and GitOps stages. You are responsible for populating the relevant fields in the service definition for your use case (for example, a Release Repository for the Update Release Repo step, or an App Set Reference for Fetch Linked Apps). Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.
   :::

6. Select **New Environment** and toggle to **YAML** to use the YAML editor.
7. Select **Edit YAML**, paste the following, and then select **Save**.

   ```yaml
   environment:
     name: gitopsenv
     identifier: gitopsenv
     description: ""
     tags: {}
     type: PreProduction
     orgIdentifier: default
     projectIdentifier: default_project
     variables: []
   ```

8. Select **Continue**, keep the **Sync Policy** settings as is, and then select **Continue**.
9. In **Repository URL**, select the **Repository** you created earlier and select **Apply**.
10. Select `master` as the **Target Revision**, type `kustomize-guestbook` in the **Path**, and click **Enter**.
11. Select **Continue** to select the **Cluster** created in the above steps.
12. Enter the target **Namespace** for Harness GitOps to sync the application. Type `default` and select **Finish**.

### Synchronize the application

After setting up the GitOps workflow, you can synchronize the application with your Kubernetes setup.

Perform the following steps:

1. Select **Sync**, check the application details, and then select **Synchronize** to initiate the deployment.
2. After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

   ```bash
   kubectl get pods -n default
   ```

3. To access the Guestbook application deployed via the Harness pipeline, port forward the service and access it at `http://localhost:8080`:

   ```bash
   kubectl port-forward svc/kustomize-guestbook-ui 8080:80
   ```

   On successful application sync, you will see the status tree under **Resource View** as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/kustomize-tutorial/gitops.png')} alt="GitOps" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
</Tabs>

---

## Next steps

You have deployed the Guestbook application with Harness CD and GitOps using Kustomize. 

Continue your learning journey with the following:

- <a href="/docs/platform/triggers/triggering-pipelines" target="_blank" rel="noopener noreferrer">Pipeline triggers</a>: Run your pipeline automatically in response to Git events.
- <a href="/docs/continuous-delivery/gitops/applicationsets/harness-git-ops-application-set-tutorial" target="_blank" rel="noopener noreferrer">Harness GitOps ApplicationSet and PR Pipeline Tutorial</a>: Create a GitOps ApplicationSet and PR pipeline.
