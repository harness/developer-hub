---
sidebar_position: 1
hide_table_of_contents: true
title: Helm Chart
---

# Deploy using Helm Chart

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Delivery & GitOps Certification today!"
  link="/certifications/continuous-delivery"
  closable={true}
  target="_self"
/>

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This tutorial is designed to help you get started with Harness Continuous Delivery (CD). We will guide you through creating a CD pipeline for deploying a Guestbook application. This Guestbook application will use Helm Chart for deployment.

:::info
[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/).
:::

You can choose to proceed with the tutorial either by using the command-line interface (Harness CLI) or the user interface (Harness UI).

```mdx-code-block
<Tabs>
<TabItem value="CLI">
```
## Before you begin

Verify the following:

1. **Obtain Harness API Token**. For steps, go to the Harness documentation on [creating a personal API token](/docs/platform/automation/api/add-and-manage-api-keys/).
2. **Obtain GitHub personal access token with repo permissions**. For steps, go to the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
3. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness delegates and deploying a sample application in a local development environment.
    - Check [delegate System and network requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).
4. **Install [Helm CLI](https://helm.sh/docs/intro/install/)**.
5. **Fork the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub web interface.
    - For details on forking a GitHub repository, go to [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository).

## Getting Started with Harness CD
----------------------------------

1. Download and Configure Harness CLI.

    ```mdx-code-block
    <Tabs>
    <TabItem value="MacOS">
    ```

    ```bash
    curl -LO https://github.com/harness/harness-cli/releases/download/v0.0.13-alpha/harness-v0.0.13-alpha-darwin-amd64.tar.gz 
    tar -xvf harness-v0.0.13-alpha-darwin-amd64.tar.gz  
    echo 'export PATH="'$(pwd)':$PATH"' >> ~/.bash_profile
    source ~/.bash_profile
    ```

    ```mdx-code-block
    </TabItem>
    <TabItem value="Linux">
    ```

    ```mdx-code-block
    <Tabs>
    <TabItem value="ARM">
    ```

    ```bash
    curl -LO https://github.com/harness/harness-cli/releases/download/v0.0.13-alpha/harness-v0.0.13-alpha-linux-arm64.tar.gz 
    tar -xvf harness-v0.0.13-alpha-darwin-amd64.tar.gz 
    echo 'export PATH="'$(pwd)':$PATH"' >> ~/.bash_profile
    source ~/.bash_profile
    ```

    ```mdx-code-block
    </TabItem>
    <TabItem value="AMD">
    ```

    ```bash
    curl -LO https://github.com/harness/harness-cli/releases/download/v0.0.13-alpha/harness-v0.0.13-alpha-linux-amd64.tar.gz 
    tar -xvf harness-v0.0.13-alpha-darwin-amd64.tar.gz  
    echo 'export PATH="'$(pwd)':$PATH"' >> ~/.bash_profile
    source ~/.bash_profile
    ```

    ```mdx-code-block
    </TabItem>
    </Tabs>
    ```

    ```mdx-code-block
    </TabItem>
    <TabItem value="Windows">
    ```

    a. Open Windows Powershell and run the command below to download the Harness CLI.

    ```
    Invoke-WebRequest -Uri https://github.com/harness/harness-cli/releases/download/v0.0.13-alpha/harness-v0.0.13-alpha-windows-amd64.zip -OutFile ./harness.zip
    ```
        
    b. Extract the downloaded zip file and change directory to extracted file location.

    c. Follow the steps below to make it accessible via terminal.

    ```
    $currentPath = Get-Location 
    [Environment]::SetEnvironmentVariable("PATH", "$env:PATH;$currentPath", [EnvironmentVariableTarget]::Machine)
    ```

    d. Restart terminal.

    ```mdx-code-block
    </TabItem>
    </Tabs>
    ```

2. Clone the Forked **harnessed-example-apps** repo and change directory.
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

:::caution

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
        -  In the command provided, `ACCOUNT_ID`, `MANAGER_ENDPOINT`, and `DELEGATE_TOKEN` are auto-populated values that you can obtain from the delegate Installation wizard.  

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
    - You can also follow the [Install Harness delegate on Kubernetes or Docker](/tutorials/platform/install-delegate/) tutorial to install the delegate using the Terraform Helm Provider or Kubernetes manifest.

#### Secrets

<details open>
<summary>What are Harness secrets?</summary>

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness delegate has access to the key management system. You can also integrate your own secret manager. To learn more about secrets in Harness, go to [Harness Secret Manager Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).

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
    harness connector --file "helm-guestbook/harnesscd-pipeline/github-connector.yml" apply --git-user <YOUR GITHUB USERNAME>
    ```
4. Please check the delegate name to be `helm-delegate` in the `kubernetes-connector.yml`
5. Create the **Kubernetes connector** using the following CLI command:
    
    ```
    harness connector --file "helm-guestbook/harnesscd-pipeline/kubernetes-connector.yml" apply --delegate-name kubernetes-delegate
    ```

### Deployment Strategies

Helm is primarily focused on managing the release and versioning of application packages. Helm supports rollback through its release management features. When you deploy an application using Helm, it creates a release that represents a specific version of the application with a unique release name.

<details open>
<summary>How Harness performs canary and blue-green deployments with Helm</summary>

- Harness integrates with Helm by utilizing Helm charts and releases. Helm charts define the application package and its dependencies, and Helm releases represent specific versions of the application.
- Harness allows you to define the application configuration, including Helm charts, values files, and any custom configurations required for your application.
- In Harness, You can specify the percentage of traffic to route to the new version in a canary deployment or define the conditions to switch traffic between the blue and green environments in a blue-green deployment.
- Harness orchestrates the deployment workflow, including the deployment of Helm charts, by interacting with the Helm API. It manages the release lifecycle, tracks revisions, and controls the rollout process based on the defined canary or blue-green strategy.

</details>

Harness adds an additional layer of functionality on top of Helm, providing a streamlined and automated approach to canary and blue-green deployments. By leveraging Helm's package management capabilities and integrating with its release management features, Harness extends Helm's capabilities to support canary and blue-green deployment strategies.

```mdx-code-block
<Tabs>
<TabItem value="Canary">
```

<details open>
<summary>What are Canary deployments?</summary>

A Canary deployment updates nodes in a single environment, gradually allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. For more information, go to [When to use Canary deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments).

</details>


### Create an environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. Use the following CLI Command to create **Environments** in your Harness project:

    ```
    harness environment --file "helm-guestbook/harnesscd-pipeline/k8s-environment.yml" apply
    ```

2. In your new environment, add **Infrastructure Definitions** using the following CLI command:

    ```
    harness infrastructure --file "/helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml" apply 
   ``` 

### Create a service

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>

1. Use the following CLI command to create **Services** in your Harness Project. 

    ```
    harness service -file "helm-guestbook/harnesscd-pipeline/k8s-service.yml" apply
    ```

### Create a pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts/).

</details>

1. CLI Command for canary deployment:
    ```
    harness pipeline --file "/helm-guestbook/harnesscd-pipeline/k8s-canary-pipeline.yml" apply
    ```

2. You can switch to the **VISUAL** view, and verify that the pipeline stage and execution steps appear as shown below.

![Canary](../static/k8s-helm-tutorial/canary.png)

```mdx-code-block
</TabItem>
<TabItem value="Blue Green">
```

<details open>
<summary>What are Blue Green deployments?</summary>

Blue Green deployments involve running two identical environments (stage and prod) simultaneously with different service versions. QA and UAT are performed on a **new** service version in the stage environment first. Next, traffic is shifted from the prod environment to stage, and the previous service version running on prod is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. For more information, go to [When to use Blue Green deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments).

</details>


### Create an environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. Use the following CLI Command to create **Environments** in your Harness project:

    ```
    harness environment --file "helm-guestbook/harnesscd-pipeline/k8s-environment.yml" apply
    ```

2. In your new environment, add **Infrastructure Definitions** using the following CLI command:

    ```
    harness infrastructure --file "/helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml" apply 
   ```

### Create a service

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>

1. Use the following CLI command to create **Services** in your Harness Project. 

    ```
    harness service -file "helm-guestbook/harnesscd-pipeline/k8s-service.yml" apply
    ```



### Create a pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts/).

</details>

1. CLI Command for blue-green deployment:
    ```
    harness pipeline --file "helm-guestbook/harnesscd-pipeline/k8s-bluegreen-pipeline.yml" apply
    ```

- You can switch to the **VISUAL** view, and verify that the pipeline stage and execution steps appear as shown below.

![Blue Green](../static/k8s-helm-tutorial/bluegreen.png)

```mdx-code-block
</TabItem>
<TabItem value="K8s Rolling">
```

<details open>
<summary>What are Rolling deployments?</summary>

Rolling deployments incrementally add nodes with a new service version to a single environment, either one by one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. For more information, go to [When to use rolling deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments).

</details>


### Create an environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location and are categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. Use the following CLI Command to create **Environments** in your Harness project:

    ```
    harness environment --file "helm-guestbook/harnesscd-pipeline/k8s-environment.yml" apply
    ```

2. In your new environment, add **Infrastructure Definitions** using the following CLI command:

    ```
    harness infrastructure --file "/helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml" apply 
    ```
### Create a service

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>

1. Use the following CLI command to create **Services** in your Harness Project. 

    ```
    harness service -file "helm-guestbook/harnesscd-pipeline/k8s-service.yml" apply
    ```

### Create a pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. A pipeline can utilize CI for code building and testing and CD for artifact deployment in production. A CD pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts/).

</details>

1. CLI Command for Rolling deployment:
    
    ```
    harness pipeline --file "helm-guestbook/harnesscd-pipeline/k8s-rolling-pipeline.yml" apply
    ```
2. You can switch to the **VISUAL** view, and verify that the pipeline stage and execution steps appear as shown below.

![k8s-Rolling](../static/k8s-helm-tutorial/rolling.png)

```mdx-code-block
</TabItem>
<TabItem value="NativeHelm Rolling">
```

<details open>
<summary>What are Rolling deployments?</summary>

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. For more information, go to [When to use rolling deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments).

</details>


### Create an environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. Use the following CLI Command to create **Environments** in your Harness project:

    ```
    harness environment --file "helm-guestbook/harnesscd-pipeline/nativehelm-environment.yml" apply
    ```

2. In your new environment, add **Infrastructure Definitions** using the following CLI command:

    ```
    harness infrastructure --file "/helm-guestbook/harnesscd-pipeline/nativehelm-infrastructure-definition.yml" apply 
    ```

### Create a service

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>

1. Use the following CLI command to create **Services** in your Harness Project. 

    ```
    harness service -file "helm-guestbook/harnesscd-pipeline/nativehelm-service.yml" apply
    ```

### Create a pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts/).

</details>

1. CLI Command for Rolling deployment:
    
    ```
    harness pipeline --file "helm-guestbook/harnesscd-pipeline/nativehelm-rolling-pipeline.yml" apply
    ```

2. You can switch to the **VISUAL** view, and verify that the pipeline stage and execution steps appear as shown below.

![Rolling](../static/k8s-helm-tutorial/rolling.png)

```mdx-code-block
</TabItem>
</Tabs>
```



```mdx-code-block
</TabItem>
<TabItem value="UI">
```
## Before you begin

Make sure that you have met the following requirements:

* You have a GitHub Personal Access Token (PAT) with proper repository permissions. For more information, go to [Managing your personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
* You have set up a Kubernetes cluster. You can use your own Kubernetes cluster or a [K3D](https://k3d.io/v5.5.1/) (recommended) for installing Harness Delegates and deploying a sample application in a local development environment. For more information, go to [Delegate system and network requirements](/docs/platform/Delegates/delegate-concepts/delegate-requirements).
* You have installed [Helm CLI](https://helm.sh/docs/intro/install/).
* You have forked the **[harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub web interface. For more details, go to [Forking a GitHub repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository).

## Deploy your applications using a Helm template

1. Log in to the [Harness App](https://app.harness.io/).

2. Select **Projects** on the top left corner of the UI, and then select **Default Project**.

:::caution

Follow the below mentioned steps as they are, including the naming conventions, for the pipeline to run successfully.

:::

### Set up a delegate

<details open>
<summary>What is the Harness delegate?</summary>

The Harness delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations including deployment and integration. Learn more about the delegate in the [Delegate Overview](/docs/platform/delegates/delegate-concepts/delegate-overview/).

</details>

1. In **PROJECT SETUP**, select **Delegates**, and then Select **Delegates** on the top right corner of the UI.
   - Select **New Delegate**.
     For this tutorial, let's explore how to install the delegate using Helm.
   - In **Select where you want to install your Delegate**, select **Kubernetes**.
   - In **Install your Delegate**, select **Helm Chart**.
   - Add the Harness Helm Chart repository to your local helm registry using the following commands:
   
     ```bash
     helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
     ```
     ```bash
     helm repo update harness-delegate
     ```
     
    - Copy the following command from the Delegate Installation wizard.
    
      `DELEGATE_TOKEN`,`ACCOUNT_ID` and `MANAGER_ENDPOINT` are auto-populated values that you can obtain from the Delegate Installation wizard. 
    
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
  
You can also [Install Harness Delegate on Kubernetes or Docker](/tutorials/platform/install-delegate/) _Terraform Helm Provider_ or _Kubernetes Manifest_.

### Create a secret

<details open>
<summary>What are Harness secrets?</summary>

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness delegate has access to the key management system. You can also integrate your own secret manager. To learn more about secrets in Harness, go to [Harness Secret Manager Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).

</details>

1. In **PROJECT SETUP**, select **Secrets**.
2. Select **New Secret**, and then select **Text**.
3. In the **Add new Encrypted Text** dialog:
   - In **Secret Name**, enter `harness_gitpat`.
   - In **Secret Value**, enter your GitHub PAT.
4. Select **Save**.

### Create a connector

<details open>
<summary>What are connectors?</summary>

Connectors in Harness enable integration with 3rd party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Explore connector how-tos [here](/docs/category/connectors).

</details>

1. Create a GitHub connector.
   1. In **PROJECT SETUP**, select **Connectors**, and then select **Create via YAML Builder**.
   2. Copy and paste the contents of [github-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/github-connector.yml).
   3. Replace **GITHUB_USERNAME** with your GitHub account username in the YAML wherever required.
      We assume that you have already forked the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository as mentioned in the [Before you begin](#before-you-begin) section.
   4. Select **Save Changes**, and verify that the new connector named _**harness_gitconnector**_ is successfully created.
   5. Select **Connection Test** under **Connectivity Status** to ensure that the connection is successful.
    
2. Create a Kubernetes connector.
   1. In **PROJECT SETUP**, select **Connectors**, and then select **Create via YAML Builder**.
   2. Copy and paste the contents of [kubernetes-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/kubernetes-connector.yml).
   3. Replace **DELEGATE_NAME** with the installed delegate name. To obtain the delegate name, navigate to **Default Project** > **PROJECT SETUP** > **Delegates**. 
   4. Select **Save Changes**, and verify that the new connector named _**harness_k8sconnector**_ is successfully created.
   5. Select **Connection Test** under **Connectivity Status** to ensure that the connection is successful.

### Deployment Strategies

Helm is primarily focused on managing the release and versioning of application packages. Helm supports rollback through its release management features. When you deploy an application using Helm, it creates a release that represents a specific version of the application with a unique release name.

<details open>
<summary>How Harness performs canary and blue-green deployments with Helm</summary>

- Harness integrates with Helm by utilizing Helm charts and releases. Helm charts define the application package and its dependencies, and Helm releases represent specific versions of the application.
- Harness allows you to define the application configuration, including Helm charts, values files, and any custom configurations required for your application.
- In Harness, You can specify the percentage of traffic to route to the new version in a canary deployment or define the conditions to switch traffic between the blue and green environments in a blue-green deployment.
- Harness orchestrates the deployment workflow, including the deployment of Helm charts, by interacting with the Helm API. It manages the release lifecycle, tracks revisions, and controls the rollout process based on the defined canary or blue-green strategy.

</details>

Harness adds an additional layer of functionality on top of Helm, providing a streamlined and automated approach to canary and blue-green deployments. By leveraging Helm's package management capabilities and integrating with its release management features, Harness extends Helm's capabilities to support canary and blue-green deployment strategies.

```mdx-code-block
<Tabs>
<TabItem value="Canary">
```

<details open>
<summary>What are Canary deployments?</summary>

A Canary deployment updates nodes in a single environment, gradually allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. For more information, go to [When to use Canary deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments).

</details>


### Create an environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. In **Default Project**, select **Environments**.
2. Select **New Environment** and toggle to the **YAML** view _(next to VISUAL)_.
3. Copy the contents of [k8s-environment.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-environment.yml) and paste it in the YAML editor, and then select **Save**.
4. In the **Infrastructure Definitions** tab, select **Infrastructure Definition**, and then select **Edit YAML**.
5. Copy the contents of [k8s-infrastructure-definition.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml) and paste it in the YAML editor.
6. Select **Save** and verify that the environment and infrastructure definition are created successfully.

### Create a service

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>

1. In **Default Project**, select **Services**.
2. Select **New Service**, enter the name, `harnessguestbookdep`, and then select **Save**.
3. Toggle to the **YAML** view _(next to VISUAL)_ under the **Configuration** tab, and then select **Edit YAML**.
4. Copy the contents of [k8s-service.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-service.yml) and paste it in the YAML editor.
5. Select **Save** and verify that the service, _**harness_guestbook**_ is successfully created.

### Create a pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts/).

</details>

- In **Default Project**, select **Pipelines**.
    - Select **New Pipeline**.
    - Enter the name `guestbook_canary_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** to enable edit mode, and copy the contents of [k8s-canary-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-canary-pipeline.yml) and paste it in the YAML editor.
- Select **Save** to save the pipeline.
- You can switch to the **VISUAL** view, and verify that the pipeline stage and execution steps appear as shown below.

![Canary](../static/k8s-helm-tutorial/canary.png)

```mdx-code-block
</TabItem>
<TabItem value="Blue Green">
```

<details open>
<summary>What are Blue Green deployments?</summary>

Blue Green deployments involve running two identical environments (stage and prod) simultaneously with different service versions. QA and UAT are performed on a **new** service version in the stage environment first. Next, traffic is shifted from the prod environment to stage, and the previous service version running on prod is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. For more information, go to [When to use Blue Green deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments).

</details>


### Create an environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. In **Default Project**, select **Environments**.
2. Select **New Environment** and toggle to the **YAML** view _(next to VISUAL)_.
3. Copy the contents of [k8s-environment.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-environment.yml) and paste it in the YAML editor, and then select **Save**.
4. In the **Infrastructure Definitions** tab, select **Infrastructure Definition**, and then select **Edit YAML**.
5. Copy the contents of [k8s-infrastructure-definition.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml) and paste it in the YAML editor.
6. Select **Save** and verify that the environment and infrastructure definition are created successfully.

### Create a service

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>


1. In **Default Project**, select **Services**.
2. Select **New Service**, enter the name, `harnessguestbookdep`, and then select **Save**.
3. Toggle to the **YAML** view _(next to VISUAL)_ under the **Configuration** tab, and then select **Edit YAML**.
4. Copy the contents of [k8s-service.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-service.yml) and paste it in the YAML editor.
5. Select **Save** and verify that the service, _**harness_guestbook**_ is successfully created.

### Create a pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts/).

</details>

- In **Default Project**, select **Pipelines**.
    - Select **New Pipeline**.
    - Enter the name `guestbook_bluegreen_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** to enable edit mode, and copy the contents of [k8s-bluegreen-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-bluegreen-pipeline.yml) and paste it in the YAML editor.
- Select **Save** to save the pipeline.
- You can switch to the **VISUAL** view, and verify that the pipeline stage and execution steps appear as shown below.

![Blue Green](../static/k8s-helm-tutorial/bluegreen.png)

```mdx-code-block
</TabItem>
<TabItem value="K8s Rolling">
```

<details open>
<summary>What are Rolling deployments?</summary>

Rolling deployments incrementally add nodes with a new service version to a single environment, either one by one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. For more information, go to [When to use rolling deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments).

</details>


### Create an environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location and are categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. In **Default Project**, select **Environments**.
2. Select **New Environment** and toggle to the **YAML** view _(next to VISUAL)_.
3. Copy the contents of [k8s-environment.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-environment.yml), paste it in the YAML editor, and then select **Save**.
4. On the **Infrastructure Definitions** tab, select **Infrastructure Definition**, and then select **Edit YAML**.
5. Copy the contents of [k8s-infrastructure-definition.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-infrastructure-definition.yml) and paste it in the YAML editor.
6. Select **Save** and verify that the environment and infrastructure definition were created successfully.

### Create a service

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>


1. In **Default Project**, select **Services**.
2. Select **New Service**, enter the name, `harnessguestbookdep`, and then select **Save**.
3. On the **Configuration** tab, toggle to the **YAML** view _(next to VISUAL)_, and then select **Edit YAML**.
4. Copy the contents of [k8s-service.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-service.yml) and paste it in the YAML editor.
5. Select **Save** and verify that the service, _**harness_guestbook**_ was successfully created.

### Create a pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. A pipeline can utilize CI for code building and testing and CD for artifact deployment in production. A CD pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts/).

</details>

- In **Default Project**, select **Pipelines**.
    - Select **New Pipeline**.
    - Enter the name `guestbook_k8s_rolling_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** to enable edit mode, and copy the contents of [k8s-rolling-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/k8s-rolling-pipeline.yml) and paste it in the YAML editor.
- Select **Save** to save the pipeline.
- You can switch to the **VISUAL** view, and verify that the pipeline stage and execution steps appear as shown below.

![k8s-Rolling](../static/k8s-helm-tutorial/rolling.png)

```mdx-code-block
</TabItem>
<TabItem value="NativeHelm Rolling">
```

<details open>
<summary>What are Rolling deployments?</summary>

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. For more information, go to [When to use rolling deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments).

</details>


### Create an environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. In **Default Project**, select **Environments**.
2. Select **New Environment** and toggle to the **YAML** view _(next to VISUAL)_.
3. Copy the contents of [nativehelm-environment.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/nativehelm-environment.yml) and paste it in the YAML editor, and then select **Save**.
4. In the **Infrastructure Definitions** tab, select **Infrastructure Definition**, and then select **Edit YAML**.
5. Copy the contents of [nativehelm-infrastructure-definition.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/nativehelm-infrastructure-definition.yml) and paste it in the YAML editor.
6. Select **Save** and verify that the environment and infrastructure definition are created successfully.

### Create a service

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>

1. In **Default Project**, select **Services**.
2. Select **New Service**, enter the name, `harnessguestbook`, and then select **Save**.
3. Toggle to the **YAML** view _(next to VISUAL)_ under the **Configuration** tab, and then select **Edit YAML**.
4. Copy the contents of [nativehelm-service.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/nativehelm-service.yml) and paste it in the YAML editor.
5. Select **Save** and verify that the service, _**harness_guestbook**_ is successfully created.

### Create a pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts/).

</details>

- In **Default Project**, select **Pipelines**.
    - Select **New Pipeline**.
    - Enter the name `guestbook_rolling_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** to enable edit mode, and copy the contents of [nativehelm-rolling-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/helm-guestbook/harnesscd-pipeline/nativehelm-rolling-pipeline.yml) and paste it in the YAML editor.
- Select **Save** to save the pipeline.
- You can switch to the **VISUAL** view, and verify that the pipeline stage and execution steps appear as shown below.

![Rolling](../static/k8s-helm-tutorial/rolling.png)

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Run the pipeline 

Finally, it's time to execute the pipeline. 

1. Select **Run**, and then select **Run Pipeline** to initiate the deployment.
2. Observe the execution logs as Harness deploys the workload and checks for steady state.
3. After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:

   ```bash
   kubectl get pods -n default
   ```
 4. To access the Guestbook application deployed using the Harness pipeline, port forward the service and access it at `http://localhost:8080`:
 
    ```bash
    kubectl port-forward svc/<service-name> 8080:80
    ```

## Congratulations!🎉

You've just learned how to use Harness CD to deploy application using a Helm Chart template.

## Next steps

- Keep learning about Harness CD. Add **Triggers** to your pipeline that'll respond to Git events. For more information, go to [Triggering pipelines](/docs/platform/Triggers/triggering-pipelines).
- Visit [Harness Developer Hub](https://developer.harness.io/) for more tutorials and resources.

### How to deploy your own app by using Harness

You can integrate your own microservice application into this tutorial by following the steps outlined below:

- Utilize the same delegate that you deployed as part of this tutorial. Alternatively, deploy a new delegate, but remember to use a newly created delegate identifier when creating connectors.

- If you intend to use a private Git repository that hosts your Helm chart, create a Harness secret containing the Git personal access token (PAT). Subsequently, create a new Git connector using this secret.

- Create a Kubernetes connector if you plan to deploy your applications in a new Kubernetes environment. Make sure to update the infrastructure definition to reference this newly created Kubernetes connector.

- Once you complete all the aforementioned steps, create a new Harness service that leverages the Helm chart for deploying applications.

- Lastly, establish a new deployment pipeline and select the newly created infrastructure definition and service. Choose a deployment strategy that aligns with your microservice application's deployment needs.

- Voila! You're now ready to deploy your own application by using Harness.