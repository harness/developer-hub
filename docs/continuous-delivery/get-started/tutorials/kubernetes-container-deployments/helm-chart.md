---
title: Deploy using Helm Chart
description: Deploy using Helm Chart
sidebar_position: 1
redirect_from:
  - /docs/continuous-delivery/get-started/create-first-pipeline
  - /tutorials/cd-pipelines/kubernetes/helm-chart
  - /docs/continuous-delivery/get-started/tutorials/manifest
  - /docs/continuous-delivery/get-started/cd-tutorials/helm-chart
  - /docs/continuous-delivery/get-started/tutorials/helm-chart
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

This topic explains how to deploy a sample application (Guestbook) using a publicly available Helm chart with Harness Continuous Delivery (CD).

Harness CD offers two ways to deploy the Guestbook application:

- [CD Pipeline](#getting-started-harness-cd-ui): You build a Harness pipeline that deploys the Helm chart to your target cluster.
- [GitOps workflow](#using-harness-gitops): You install a Harness GitOps Agent, connect it to your Git repo and target cluster, and let Harness (using Argo CD) sync the desired state from Git into your cluster.

:::note

<a href="https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-helm" target="_blank" rel="noopener noreferrer">Sign up</a> today to get started with Harness CD.

:::

---

## What will you learn in this topic?

- How to set up a [delegate](#delegate), [secret](#secrets), [connectors](#connectors), [environment](#environment), [service](#service), and [pipeline](#pipeline) to deploy the Guestbook application.
- How to choose a rolling, canary, or Blue Green [deployment strategy](#deployment-strategies) for your pipeline.
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
<TabItem value="uicdpipe" label="CD Pipeline">

### Deploy with a CD pipeline \{#getting-started-harness-cd-ui}

Harness CD pipelines allow you to orchestrate and automate your deployment workflows and push updated application images to your target Kubernetes cluster. Pipelines allow extensive control over how you want to progress artifacts through various development, test, staging, or production clusters, when running a variety of scans and tests to ensure the quality and stability standards you and your team have defined.

You can proceed with the tutorial using either the Harness user interface (UI) or the command-line interface (CLI).

<Tabs queryString="interface-existing-argo" className="tabs-centered">
<TabItem value="uigitops" label="UI">

Perform the following steps to deploy the Guestbook application using Harness CD Pipeline UI:

1. Log in to <a href="https://app.harness.io/" target="_blank" rel="noopener noreferrer">Harness Manager</a>.
2. Select **Projects**, and then select **Default Project**.
3. After selecting the project, configure the core resources Harness requires to run a deployment, including a delegate, a secret, two connectors, an environment, a service, and a deployment pipeline, as explained in the following sections.

:::warning

For the pipeline to run successfully, follow the remaining steps as they are, including the naming conventions.

:::

#### Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifacts registries, cloud platforms, and so on. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations including deployment and integration. Go to <a href="/docs/platform/delegates/delegate-concepts/delegate-overview/" target="_blank" rel="noopener noreferrer">Delegate Overview</a> to understand the delegate.

Perform the following steps to set up a delegate:

1. Under **Project Settings**, select **Delegates**.
2. Click **New Delegate**.
3. Select **Kubernetes** in the **Select where you want to install your Delegate** section.
4. In the **Install your Delegate** section, for this tutorial, install the delegate using **Helm Chart**.
5. Add the Harness Helm chart repo to your local helm registry using the following command.
   ```bash
   helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
   ```
6. Update the repo using the following command:

   ```bash
   helm repo update harness-delegate
   ```
7. Copy and run the install command from the Delegate installation wizard as shown in the following example:

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
8. Select **Verify** to verify that the delegate is installed successfully and can connect to the Harness Manager.

:::note

You can also follow the <a href="/docs/platform/get-started/tutorials/install-delegate" target="_blank" rel="noopener noreferrer">Install Harness Delegate on Kubernetes or Docker</a> steps to install the delegate using the Harness Terraform Provider or a Kubernetes manifest.

:::

#### Secrets

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret manager. Go to <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview/" target="_blank" rel="noopener noreferrer">Harness Secret Manager Overview</a> to understand secrets in Harness.

Perform the following steps to add a secret:

1. Under **Project Settings**, select **Secrets**.
2. Click **New Secret**, and then select **Text**.
3. In the **Add new Encrypted Text** page,
   1. Select the **Secret Manager**. For example, `Harness Built-in Secret Manager`.
   2. Enter the **Secret Name**. For example, `harness_gitpat`.
   3. For the **Secret Value**, paste the GitHub personal access token you saved earlier.
   4. Add the **Description** (Optional) and **Tags** (Optional).
   5. Select **Save**.

#### Connectors

Connectors in Harness enable integration with third party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Go to <a href="/docs/category/connectors" target="_blank" rel="noopener noreferrer">Connectors</a> to explore connector how-tos.

#### Set up the GitHub connector

Perform the following steps to set up a GitHub connector:

1. In your Harness project, under **Project Settings**, select **Connectors**.
2. Select **Create via YAML Builder** and copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/github-connector.yml" target="_blank" rel="noopener noreferrer">github-connector.yml</a> into the YAML editor.
3. Replace `GITHUB_USERNAME` with your GitHub account username in the YAML (assuming you have already forked the <a href="https://github.com/harness-community/harnesscd-example-apps/fork" target="_blank" rel="noopener noreferrer">harnesscd-example-apps</a> repo as noted in Before you begin).
4. In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor suggests the correct Id.
5. Select **Save Changes** and verify that the new connector named `harness_gitconnector` is successfully created.
6. Select **Connection Test** under **Connectivity Status** to ensure the connection is successful.

#### Set up the Kubernetes connector

Perform the following steps to set up a Kubernetes connector:

1. In your Harness project, under **Project Settings**, select **Connectors**.
2. Select **Create via YAML Builder** and copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/kubernetes-connector.yml" target="_blank" rel="noopener noreferrer">kubernetes-connector.yml</a> into the YAML editor.
3. Replace `DELEGATE_NAME` with the installed Delegate name. To obtain the Delegate name, navigate to **Project Settings**, and then **Delegates**.
4. Select **Save Changes** and verify that the new connector named `harness_k8sconnector` is successfully created.
5. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

#### Deployment strategies

Helm is primarily focused on managing the release and versioning of application packages. Helm supports rollback through its release management features. When you deploy an application using Helm, it creates a release that represents a specific version of the application with a unique release name.

Harness performs canary and blue-green deployments with Helm as follows:

- Harness integrates with Helm by using Helm charts and releases. Helm charts define the application package and its dependencies, and Helm releases represent specific versions of the application.
- Harness allows you to define the application configuration, including Helm charts, values files, and any custom configurations required for your application.
- In Harness, you can specify the percentage of traffic to route to the new version in a canary deployment or define the conditions to switch traffic between the blue and green environments in a blue-green deployment.
- Harness orchestrates the deployment workflow, including the deployment of Helm charts, by interacting with the Helm API. It manages the release lifecycle, tracks revisions, and controls the rollout process based on the defined canary or blue-green strategy.

Harness adds an additional layer of functionality on top of Helm, providing an automated approach to canary and blue-green deployments. By using Helm's package management capabilities and integrating with its release management features, Harness extends Helm to support canary and blue-green deployment strategies.

Pick a deployment strategy from the following:

<Tabs queryString="deploymentui" className="tabs-centered">
<TabItem value="canaryui" label="Canary">

A canary deployment updates nodes in a single environment gradually, allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments" target="_blank" rel="noopener noreferrer">When to use Canary deployments</a> to understand when to use them.

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. In **Default Project**, select **Environments**.
2. Select **New Environment** and toggle to the **YAML** view.
3. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-environment.yml" target="_blank" rel="noopener noreferrer">k8s-environment.yml</a>, paste it into the YAML editor, and then select **Save**.
4. In the **Infrastructure Definitions** tab, select **Infrastructure Definition**, and then select **Edit YAML**.
5. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml" target="_blank" rel="noopener noreferrer">k8s-infrastructure-definition.yml</a> and paste it into the YAML editor.
6. Select **Save** and verify that the environment and infrastructure definition are created successfully.

#### Service

In Harness, services represent what you deploy to an environment. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics such as deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Perform the following steps to set up a service:

1. In **Default Project**, select **Services**.
2. Select **New Service**, enter the name `harnessguestbookdep`, and then select **Save**.
3. On the **Configuration** tab, toggle to the **YAML** view, and then select **Edit YAML**.
4. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-service.yml" target="_blank" rel="noopener noreferrer">k8s-service.yml</a> and paste it into the YAML editor.
5. Select **Save** and verify that the service `harness_guestbook` is successfully created.

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Perform the following steps to set up a pipeline with canary deployment:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `guestbook_canary_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-canary-pipeline.yml" target="_blank" rel="noopener noreferrer">k8s-canary-pipeline.yml</a>, and paste it into the YAML editor.
7. Select **Save**.

You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/k8s-helm-tutorial/canary.png')} alt="Canary" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
<TabItem value="bgui" label="Blue Green">

Blue Green deployments involve running two identical environments (staging and production) simultaneously with different service versions. QA and UAT are performed on a new service version in the staging environment first. Next, traffic is shifted from the production environment to staging, and the previous service version running on production is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments" target="_blank" rel="noopener noreferrer">When to use Blue Green deployments</a> to understand when to use them.

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. In **Default Project**, select **Environments**.
2. Select **New Environment** and toggle to the **YAML** view.
3. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-environment.yml" target="_blank" rel="noopener noreferrer">k8s-environment.yml</a>, paste it into the YAML editor, and then select **Save**.
4. In the **Infrastructure Definitions** tab, select **Infrastructure Definition**, and then select **Edit YAML**.
5. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml" target="_blank" rel="noopener noreferrer">k8s-infrastructure-definition.yml</a> and paste it into the YAML editor.
6. Select **Save** and verify that the environment and infrastructure definition are created successfully.

#### Service

In Harness, services represent what you deploy to an environment. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics such as deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Perform the following steps to set up a service:

1. In **Default Project**, select **Services**.
2. Select **New Service**, enter the name `harnessguestbookdep`, and then select **Save**.
3. On the **Configuration** tab, toggle to the **YAML** view, and then select **Edit YAML**.
4. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-service.yml" target="_blank" rel="noopener noreferrer">k8s-service.yml</a> and paste it into the YAML editor.
5. Select **Save** and verify that the service `harness_guestbook` is successfully created.

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Perform the following steps to set up a pipeline with Blue Green deployment:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `guestbook_bluegreen_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-bluegreen-pipeline.yml" target="_blank" rel="noopener noreferrer">k8s-bluegreen-pipeline.yml</a>, and paste it into the YAML editor.
7. Select **Save**.

You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/k8s-helm-tutorial/bluegreen.png')} alt="Blue Green" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
<TabItem value="k8srollingui" label="K8s Rolling">

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments" target="_blank" rel="noopener noreferrer">When to use rolling deployments</a> to understand when to use them.

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. In **Default Project**, select **Environments**.
2. Select **New Environment** and toggle to the **YAML** view.
3. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-environment.yml" target="_blank" rel="noopener noreferrer">k8s-environment.yml</a>, paste it into the YAML editor, and then select **Save**.
4. On the **Infrastructure Definitions** tab, select **Infrastructure Definition**, and then select **Edit YAML**.
5. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml" target="_blank" rel="noopener noreferrer">k8s-infrastructure-definition.yml</a> and paste it into the YAML editor.
6. Select **Save** and verify that the environment and infrastructure definition are created successfully.

#### Service

In Harness, services represent what you deploy to an environment. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics such as deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Perform the following steps to set up a service:

1. In **Default Project**, select **Services**.
2. Select **New Service**, enter the name `harnessguestbookdep`, and then select **Save**.
3. On the **Configuration** tab, toggle to the **YAML** view, and then select **Edit YAML**.
4. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-service.yml" target="_blank" rel="noopener noreferrer">k8s-service.yml</a> and paste it into the YAML editor.
5. Select **Save** and verify that the service `harness_guestbook` is successfully created.

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Perform the following steps to set up a pipeline with Kubernetes rolling deployment:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `guestbook_k8s_rolling_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-rolling-pipeline.yml" target="_blank" rel="noopener noreferrer">k8s-rolling-pipeline.yml</a>, and paste it into the YAML editor.
7. Select **Save**.

You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/k8s-helm-tutorial/rolling.png')} alt="k8s-Rolling" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
<TabItem value="helmrolling" label="Native Helm Rolling">

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments" target="_blank" rel="noopener noreferrer">When to use rolling deployments</a> to understand when to use them.

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. In **Default Project**, select **Environments**.
2. Select **New Environment** and toggle to the **YAML** view.
3. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/nativehelm-environment.yml" target="_blank" rel="noopener noreferrer">nativehelm-environment.yml</a>, paste it into the YAML editor, and then select **Save**.
4. In the **Infrastructure Definitions** tab, select **Infrastructure Definition**, and then select **Edit YAML**.
5. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/nativehelm-infrastructure-definition.yml" target="_blank" rel="noopener noreferrer">nativehelm-infrastructure-definition.yml</a> and paste it into the YAML editor.
6. Select **Save** and verify that the environment and infrastructure definition are created successfully.

#### Service

In Harness, services represent what you deploy to an environment. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics such as deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Perform the following steps to set up a service:

1. In **Default Project**, select **Services**.
2. Select **New Service**, enter the name `harnessguestbook`, and then select **Save**.
3. On the **Configuration** tab, toggle to the **YAML** view, and then select **Edit YAML**.
4. Copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/nativehelm-service.yml" target="_blank" rel="noopener noreferrer">nativehelm-service.yml</a> and paste it into the YAML editor.
5. Select **Save** and verify that the service `harness_guestbook` is successfully created.

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Perform the following steps to set up a pipeline with Native Helm rolling deployment:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `guestbook_rolling_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode, copy the contents of <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/nativehelm-rolling-pipeline.yml" target="_blank" rel="noopener noreferrer">nativehelm-rolling-pipeline.yml</a>, and paste it into the YAML editor.
7. Select **Save**.

You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/k8s-helm-tutorial/rolling.png')} alt="Rolling" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
</Tabs>

</TabItem>
<TabItem value="cli-existing" label="CLI">

Perform the following steps to install and access Harness CLI:

1. Download and configure the Harness CLI.
<Tabs queryString="gitops-cli-os" className="tabs-centered">
<TabItem value="gitmacos" label="MacOS">

   <MacOSCLI />

</TabItem>
<TabItem value="linuxgitops" label="Linux">

<Tabs queryString="linux-platform-gitops" className="tabs-centered">
<TabItem value="armgitops" label="ARM">

   <ARMCLI />

</TabItem>
<TabItem value="amdgitops" label="AMD">

<AMDCLI />

</TabItem>
</Tabs>

</TabItem>
<TabItem value="windowsgitops" label="Windows">

    a. Open Windows Powershell and run the following command to download the Harness CLI:

    <WindowsCLI />

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

4. After logging in and selecting the project, configure the core resources Harness requires to run a deployment, including a delegate, a secret, two connectors, an environment, a service, and a deployment pipeline, as explained in the following sections.

:::warning

For the pipeline to run successfully, follow all of the following steps as they are, including the naming conventions.

:::

#### Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifact registries, cloud platforms, etc. The delegate is installed in the target infrastructure (Kubernetes cluster) and performs operations including deployment and integration. Go to <a href="/docs/platform/delegates/delegate-concepts/delegate-overview/" target="_blank" rel="noopener noreferrer">Delegate Overview</a> to understand the delegate.

Perform the following steps to set up a delegate:

1. Under **Project Settings**, select **Delegates**.
2. Click **New Delegate**.
3. Select **Kubernetes** in the **Select where you want to install your Delegate** section.
4. In the **Install your Delegate** section, for this tutorial, install the delegate using **Helm Chart**.
5. Add the Harness Helm chart repo to your local helm registry using the following command.
   ```bash
   helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
   ```
6. Update the repo using the following command:

   ```bash
   helm repo update harness-delegate
   ```
7. Copy and run the install command from the Delegate installation wizard as shown in the following example:

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
8. Verify that the delegate is installed successfully and can connect to the Harness Manager.

:::note

You can also follow the <a href="/docs/platform/get-started/tutorials/install-delegate" target="_blank" rel="noopener noreferrer">Install Harness Delegate on Kubernetes or Docker</a> steps to install the delegate using the Terraform Helm Provider or a Kubernetes manifest.

:::

#### Secrets

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret manager. Go to <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview/" target="_blank" rel="noopener noreferrer">Harness Secret Manager Overview</a> to understand secrets in Harness.

Create a text secret from the GitHub PAT you generated in the *Before you begin* section:

```bash
harness secret --token <YOUR GITHUB PAT>
```

#### Connectors

Connectors in Harness enable integration with third party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Go to <a href="/docs/category/connectors" target="_blank" rel="noopener noreferrer">Connectors</a> to explore connector how-tos.

#### GitHub connector

Perform the following steps to set up a GitHub connector:

1. Replace `GITHUB_USERNAME` with your GitHub account username in the `github-connector.yaml`.
2. In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor will suggest the correct Id.
3. Create the **GitHub connector** using the following CLI command:
   ```bash
   harness connector --file "helm-guestbook/harnesscd-pipeline/github-connector.yml" apply --git-user <YOUR GITHUB USERNAME>
   ```

#### Kubernetes connector

Perform the following steps to set up a Kubernetes connector:

1. In `kubernetes-connector.yml`, confirm the delegate name is set to `helm-delegate` (the name used in the Delegate step earlier).
2. Create the **Kubernetes connector** using the following CLI command:

   ```bash
   harness connector --file "helm-guestbook/harnesscd-pipeline/kubernetes-connector.yml" apply --delegate-name helm-delegate
   ```

#### Deployment strategies

Helm is primarily focused on managing the release and versioning of application packages. Helm supports rollback through its release management features. When you deploy an application using Helm, it creates a release that represents a specific version of the application with a unique release name.

Harness performs canary and blue-green deployments with Helm as follows:

- Harness integrates with Helm by using Helm charts and releases. Helm charts define the application package and its dependencies, and Helm releases represent specific versions of the application.
- Harness allows you to define the application configuration, including Helm charts, values files, and any custom configurations required for your application.
- In Harness, you can specify the percentage of traffic to route to the new version in a canary deployment or define the conditions to switch traffic between the blue and green environments in a blue-green deployment.
- Harness orchestrates the deployment workflow, including the deployment of Helm charts, by interacting with the Helm API. It manages the release lifecycle, tracks revisions, and controls the rollout process based on the defined canary or blue-green strategy.

Harness adds an additional layer of functionality on top of Helm, providing an automated approach to canary and blue-green deployments. By using Helm's package management capabilities and integrating with its release management features, Harness extends Helm to support canary and blue-green deployment strategies.

Pick a deployment strategy from the following:

<Tabs queryString="deploymentcli" className="tabs-centered">
<TabItem value="canarycli" label="Canary">

A canary deployment updates nodes in a single environment gradually, allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments" target="_blank" rel="noopener noreferrer">When to use Canary deployments</a> to understand when to use them.

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. Run the following CLI command to create **Environments** in your Harness project:

   ```bash
   harness environment --file "helm-guestbook/harnesscd-pipeline/k8s-environment.yml" apply
   ```

2. In your new environment, add **Infrastructure Definitions** using the following CLI command:

   ```bash
   harness infrastructure --file "helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml" apply
   ```

#### Service

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Run the following CLI command to create **Services** in your Harness project:

```bash
harness service -file "helm-guestbook/harnesscd-pipeline/k8s-service.yml" apply
```

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Run the following CLI command for canary deployment:

```bash
harness pipeline --file "helm-guestbook/harnesscd-pipeline/k8s-canary-pipeline.yml" apply
```

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/k8s-helm-tutorial/canary.png')} alt="Canary" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
<TabItem value="bgcli" label="Blue Green">

Blue Green deployments involve running two identical environments (staging and production) simultaneously with different service versions. QA and UAT are performed on a new service version in the staging environment first. Next, traffic is shifted from the production environment to staging, and the previous service version running on production is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments" target="_blank" rel="noopener noreferrer">When to use Blue Green deployments</a> to understand when to use them.

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. Run the following CLI command to create **Environments** in your Harness project:

   ```bash
   harness environment --file "helm-guestbook/harnesscd-pipeline/k8s-environment.yml" apply
   ```

2. In your new environment, add **Infrastructure Definitions** using the following CLI command:

   ```bash
   harness infrastructure --file "helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml" apply
   ```

#### Service

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Run the following CLI command to create **Services** in your Harness project:

```bash
harness service -file "helm-guestbook/harnesscd-pipeline/k8s-service.yml" apply
```

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Run the following CLI command for blue-green deployment:

```bash
harness pipeline --file "helm-guestbook/harnesscd-pipeline/k8s-bluegreen-pipeline.yml" apply
```

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/k8s-helm-tutorial/bluegreen.png')} alt="Blue Green" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
<TabItem value="k8srollingcli" label="K8s Rolling">

Rolling deployments incrementally add nodes with a new service version to a single environment, either one by one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments" target="_blank" rel="noopener noreferrer">When to use rolling deployments</a> to understand when to use them.

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. Run the following CLI command to create **Environments** in your Harness project:

   ```bash
   harness environment --file "helm-guestbook/harnesscd-pipeline/k8s-environment.yml" apply
   ```

2. In your new environment, add **Infrastructure Definitions** using the following CLI command:

   ```bash
   harness infrastructure --file "helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml" apply
   ```

#### Service

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Run the following CLI command to create **Services** in your Harness project:

```bash
harness service -file "helm-guestbook/harnesscd-pipeline/k8s-service.yml" apply
```

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Run the following CLI command for Kubernetes rolling deployment:

```bash
harness pipeline --file "helm-guestbook/harnesscd-pipeline/k8s-rolling-pipeline.yml" apply
```

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/k8s-helm-tutorial/rolling.png')} alt="k8s-Rolling" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
<TabItem value="helmrollingcli" label="Native Helm Rolling">

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. Go to <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments" target="_blank" rel="noopener noreferrer">When to use rolling deployments</a> to understand when to use them.

#### Environment

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/" target="_blank" rel="noopener noreferrer">Environments overview</a> to understand environments.

Perform the following steps to set up an environment:

1. Run the following CLI command to create **Environments** in your Harness project:

   ```bash
   harness environment --file "helm-guestbook/harnesscd-pipeline/nativehelm-environment.yml" apply
   ```

2. In your new environment, add **Infrastructure Definitions** using the following CLI command:

   ```bash
   harness infrastructure --file "helm-guestbook/harnesscd-pipeline/nativehelm-infrastructure-definition.yml" apply
   ```

#### Service

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview/" target="_blank" rel="noopener noreferrer">Services overview</a> to understand services.

Run the following CLI command to create **Services** in your Harness project:

```bash
harness service -file "helm-guestbook/harnesscd-pipeline/nativehelm-service.yml" apply
```

#### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can use CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. Go to <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a> to understand CD pipelines.

Run the following CLI command for Native Helm rolling deployment:

```bash
harness pipeline --file "helm-guestbook/harnesscd-pipeline/nativehelm-rolling-pipeline.yml" apply
```

You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/k8s-helm-tutorial/rolling.png')} alt="Rolling" width="80%" height="80%" title="Click to view full size image" />
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

4. To access the Guestbook application deployed using the Harness pipeline, port forward the service and access it at `http://localhost:8080`:

   ```bash
   kubectl port-forward svc/<service-name> 8080:80
   ```

### Deploy your own application

Follow these steps to deploy your own application using a Harness CD pipeline instead of the sample Guestbook application.

- Use the same delegate that you deployed as part of this tutorial. Alternatively, deploy a new delegate, but remember to use a newly created delegate identifier when creating connectors.

- If you intend to use a private Git repository that hosts your Helm chart, create a Harness secret containing the Git personal access token (PAT). Subsequently, create a new Git connector using this secret.

- Create a Kubernetes connector if you plan to deploy your applications in a new Kubernetes environment. Ensure to update the infrastructure definition to reference this newly created Kubernetes connector.

- Once you complete all the aforementioned steps, create a new Harness service that leverages the Helm chart for deploying applications.

- Establish a new deployment pipeline and select the newly created infrastructure definition and service. Choose a deployment strategy that aligns with your microservice application's deployment needs.

</TabItem>
<TabItem value="gitops" label="GitOps Workflow">

Harness GitOps (built on top of Argo CD) watches the state of your application as defined in a Git repo, and can pull (either automatically or on demand) these changes into your Kubernetes cluster, leading to an application sync.

Harness GitOps supports Argo CD as the GitOps reconciler.

Whether you are new to GitOps or already have an Argo CD instance, this tutorial helps you get started with Harness GitOps, both with and without Argo CD.

### Deploy with Harness GitOps \{#using-harness-gitops}

Perform the following steps to install the application using GitOps workflow:

1. Log in to the <a href="https://app.harness.io/" target="_blank" rel="noopener noreferrer">Harness App</a>.
2. Select **Projects** in the top left corner of the UI, and then select **Default Project**.
3. In **Deployments**, select **GitOps**.
4. Set up a GitOps Agent (connects Harness to your cluster), a Repository (what to deploy), a Cluster (where to deploy it), and an Application (which ties the Agent, Repository, and Cluster) as explained in the following sections.

### Install a Harness GitOps Agent

A Harness GitOps Agent is a worker process that runs in your environment, makes secure, outbound connections to Harness, and performs all the GitOps tasks you request in Harness.

Perform the following steps to set up a GitOps Agent:

1. Select **Settings** on the top right corner of the UI.
2. Select **GitOps Agents**, and then select **New GitOps Agent**.
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
4. Select **Continue**. The Review YAML settings appear. This is the manifest YAML for the Harness GitOps Agent. You can download this YAML file and run it in your Harness GitOps Agent cluster.
   ```yaml
   kubectl apply -f gitops-agent.yml -n default
   ```
5. Select **Continue** and verify that the Agent is successfully installed and can connect to Harness Manager.

Once you have installed the Agent, Harness will start importing all the entities from the existing Argo CD Project.

</TabItem>
</Tabs>

<Tabs queryString="interfacegitopsfresh" className="tabs-centered">
<TabItem value="uicli" label="UI">

Set up the following in Harness Manager UI:
#### Repositories

A Harness GitOps repository contains the declarative description of a desired state. The declarative description can be in Kubernetes manifests, Helm Chart, Kustomize manifests, and so on.

Perform the following steps to add a repository:

1. Select **Settings** in the top right corner of the UI.
2. Select **Repositories**, and then select **New Repository**.
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

1. Select **Settings** in the top right corner of the UI.
2. Select **Clusters**, and then select **New Cluster**.
3. In the cluster **Overview** dialog, enter a name for the cluster.
4. In **GitOps Agent**, select the Agent that you installed in your cluster and select **Apply**.
5. Select **Continue** and select **Use the credentials of a specific Harness GitOps Agent**.
6. Select **Save & Continue** and wait for Harness to verify the connection.
7. Select **Finish**.

#### Applications

GitOps Applications are how you manage GitOps operations for a given desired state and its live instantiation.

A GitOps Application collects the Repository (**what you want to deploy**), Cluster (**where you want to deploy**), and Agent (**how you want to deploy**). You select these entities when you set up your Application.

Perform the following steps to add a new application:

1. Select **Applications** on the top right corner of the UI.
2. Select **New Application**.
3. In **Application Name**, enter the name `guestbook`.
4. In **GitOps Agent**, select the Agent that you installed in your cluster and select **Apply**.
5. Select **New Service** and toggle to the **YAML** view.
6. Select **Edit YAML**, paste the following, and then select **Save**.

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

7. Select **New Environment** and toggle to the **YAML** view.
8. Select **Edit YAML**, paste the following, and then select **Save**.

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

9. Select **Continue**, keep the **Sync Policy** settings as is, and then select **Continue**.
10. In **Repository URL**, select the **Repository** you created earlier and select **Apply**.
11. Select `master` as the **Target Revision** and enter `kustomize-guestbook` in the **Path**, and click **Enter**.
12. Select **Continue** to select the **Cluster** created in the above steps.
13. Enter the target **Namespace** for Harness GitOps to sync the application. Enter `default` and select **Finish**.

</TabItem>
<TabItem value="cli-fresh-gitops" label="CLI">

Perform the following steps:

1. Download and configure the Harness CLI.

<Tabs queryString="cli-os-fg" className="tabs-centered">
<TabItem value="macosfg" label="MacOS">

<MacOSCLI />

</TabItem>
<TabItem value="linuxfg" label="Linux">

<Tabs queryString="linux-platform-fg" className="tabs-centered">
<TabItem value="armfg" label="ARM">

   <ARMCLI />

</TabItem>
<TabItem value="amdfg" label="AMD">

   <AMDCLI />

</TabItem>
</Tabs>

</TabItem>
<TabItem value="windowsfg" label="Windows">

    a. Open Windows Powershell and run the following command to download the Harness CLI:

    <WindowsCLI />

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

#### Repositories

A Harness GitOps repository contains the declarative description of a desired state. The declarative description can be in Kubernetes manifests, Helm Chart, Kustomize manifests, and so on.

Run the following command to add a Harness GitOps repository:

```bash
harness gitops-repository --file helm-guestbook/harness-gitops/repository.yml apply --agent-identifier $AGENT_NAME
```

#### Clusters

A Harness GitOps Cluster is the target deployment cluster that is compared to the desired state. Clusters are synced with the source manifests you add as GitOps Repositories.

Run the following command to add a Harness GitOps cluster:

```bash
harness gitops-cluster --file helm-guestbook/harness-gitops/cluster.yml apply --agent-identifier $AGENT_NAME
```

#### Applications

GitOps Applications are how you manage GitOps operations for a given desired state and its live instantiation.

A GitOps Application collects the Repository (**what you want to deploy**), Cluster (**where you want to deploy**), and Agent (**how you want to deploy**). You select these entities when you set up your Application.

Run the following command to create a GitOps application:

```bash
harness gitops-application --file helm-guestbook/harness-gitops/application.yml apply --agent-identifier $AGENT_NAME
```

</TabItem>
</Tabs>

### Synchronize the application

After setting up the GitOps workflow, you can synchronize the application with your Kubernetes setup.

Perform the following steps:

1. Select **Sync** in the top right corner of the UI.
2. Check the application details, and then select **Synchronize** to initiate the deployment.
3. After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

   ```bash
   kubectl get pods -n default
   ```

4. To access the Guestbook application deployed via the Harness pipeline, port forward the service and access it at `http://localhost:8080`:

   ```bash
   kubectl port-forward svc/<service-name> 8080:80
   ```

   On successful application sync, you will see the status tree under **Resource View** as shown below.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/k8s-helm-tutorial/gitops-helm.png')} alt="GitOps" width="80%" height="80%" title="Click to view full size image" />
</div>

</TabItem>
</Tabs>

---

## Next steps

You have deployed the Guestbook application with Harness CD using a Helm chart. 

Continue your learning journey with the following:

- <a href="/docs/platform/triggers/triggering-pipelines" target="_blank" rel="noopener noreferrer">Pipeline triggers</a>: Run your pipeline automatically in response to Git events such as pushes and pull requests.
- <a href="/docs/platform/variables-and-expressions/add-a-variable" target="_blank" rel="noopener noreferrer">Variables and expressions</a>: Parameterize your pipeline with reusable values and runtime inputs.
