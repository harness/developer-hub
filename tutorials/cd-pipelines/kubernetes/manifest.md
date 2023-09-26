---
sidebar_position: 0
hide_table_of_contents: true
title: Manifest
---

# Deploy using Kubernetes Manifest

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

This tutorial will get you started with Harness GitOps. We will guide you through deploying a Guestbook application using Harness GitOps methods. This Guestbook application uses a publicly available Kubernetes manifest and Docker image.

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-manifest).

:::

Harness CD pipelines allow you to orchestrate and automate your deployment workflows, and push updated application images to your target Kubernetes cluster. Pipelines allow extensive control over how you want to progress artifacts through various dev / test / stage / prod clusters, while running a variety of scans & tests to ensure quality and stability standards you and team may have defined.

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


```mdx-code-block
<Tabs>
<TabItem value="Canary">
```

<details open>
<summary>What are Canary deployments?</summary>

A canary deployment updates nodes in a single environment gradually, allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. For more information, go to [When to use Canary deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments).

</details>


1. CLI Command for canary deployment:
    ```
    harness pipeline --file canary-pipeline.yml apply
    ```
   You can switch to the **Visual** editor and confirm the pipeline stage and execution steps as shown below.

   <docimage path={require('../static/k8s-manifest-tutorial/canary.png')} width="60%" height="60%" title="Click to view full size image" />

```mdx-code-block
</TabItem>
<TabItem value="Blue Green">
```

<details open>
<summary>What are Blue Green deployments?</summary>

Blue Green deployments involve running two identical environments (stage and prod) simultaneously with different service versions. QA and UAT are performed on a **new** service version in the stage environment first. Next, traffic is shifted from the prod environment to stage, and the previous service version running on prod is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. For more information, go to [When to use Blue Green deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments).

</details>

1. CLI Command for blue-green deployment:
    ```
    harness pipeline --file bluegreen-pipeline.yml apply
    ```
   You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.

   <docimage path={require('../static/k8s-manifest-tutorial/bluegreen.png')} width="60%" height="60%" title="Click to view full size image" />

```mdx-code-block
</TabItem>
<TabItem value="Rolling">
```
<details open>
<summary>What are Rolling deployments?</summary>

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. For more information, go to [When to use rolling deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments).

</details>


1. CLI Command for Rolling deployment:
    
    ```
    harness pipeline --file rolling-pipeline.yml apply
    ```
   You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.

   <docimage path={require('../static/k8s-manifest-tutorial/rolling.png')} width="60%" height="60%" title="Click to view full size image" />


```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
<TabItem value="UI">
```
## Before you begin

Verify that you have the following:

1. **Obtain GitHub personal access token with the repo scope**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
2. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness Delegates and deploying a sample application in a local development environment.
    - Check [Delegate system requirements](/docs/platform/Delegates/delegate-concepts/delegate-requirements).
3. **Install the [Helm CLI](https://helm.sh/docs/intro/install/)** in order to install the Harness Helm delegate.
4. **Fork the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub website.
    - For details on Forking a GitHub repository, go to [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) for more information on forking a GitHub repository.

## Getting Started with Harness CD
----------------------------------

1. Log in to [Harness](https://app.harness.io/).
2. Select **Projects**, and then select **Default Project**.

:::caution

For the pipeline to run successfully, please follow the remaining steps as they are, including the naming conventions.

:::

### Delegate

<details open>
<summary>What is the Harness delegate?</summary>

The Harness delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations including deployment and integration. Learn more about the delegate in the [Delegate Overview](/docs/platform/delegates/delegate-concepts/delegate-overview/).

</details>


1. Under **Project Setup**, select **Delegates**.
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

        -  In the example command provided, `ACCOUNT_ID` and `MANAGER_ENDPOINT` are auto-populated values that you can obtain from the delegate installation wizard.
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

You can also follow the [Install Harness Delegate on Kubernetes or Docker](/tutorials/platform/install-delegate/) tutorial to install the delegate using the Harness Terraform Provider or a Kubernetes manifest.

:::


### Secrets

<details open>
<summary>What are Harness secrets?</summary>

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness delegate has access to the key management system. You can also integrate your own secret manager. To learn more about secrets in Harness, go to [Harness Secret Manager Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).

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
    - Assuming you have already forked the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML.
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

```mdx-code-block
<Tabs>
<TabItem value="Canary">
```

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

   <docimage path={require('../static/k8s-manifest-tutorial/canary.png')} width="60%" height="60%" title="Click to view full size image" />

```mdx-code-block
</TabItem>
<TabItem value="Blue Green">
```

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

   <docimage path={require('../static/k8s-manifest-tutorial/bluegreen.png')} width="60%" height="60%" title="Click to view full size image" />


```mdx-code-block
</TabItem>
<TabItem value="Rolling">
```

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

   <docimage path={require('../static/k8s-manifest-tutorial/rolling.png')} width="60%" height="60%" title="Click to view full size image" />

```mdx-code-block
</TabItem>
</Tabs>
```
```mdx-code-block
</TabItem>
</Tabs>
```

### Manually execute deployment pipelines

Finally, it's time to execute your pipeline. Every exection of a CD pipeline leads to a deployment.

1.   Select **Run**, and then select **Run Pipeline** to initiate the deployment.
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

Follow the [Pipeline Triggers](/tutorials/cd-pipelines/trigger) tutorial to see triggers in action.

#### Using API

You can also utilize the [Harness API](/docs/category/api) to manage resources, view, create/edit, or delete them.

Refer to the [Get started with Harness API](/docs/platform/automation/api/api-quickstart) guide to learn how to use the API for automation.

### Congratulations!🎉

You've just learned how to use Harness CD to deploy an application using a Kubernetes manifest.

#### What's Next?

- Visit the [Harness Developer Hub](https://developer.harness.io/) for more tutorials and resources.

## How to deploy your own app by using Harness

You can integrate your own microservice application into this tutorial by following the steps outlined below:

- Utilize the same delegate that you deployed as part of this tutorial. Alternatively, deploy a new delegate, but remember to use a newly created delegate identifier when creating connectors.

- If you intend to use a private Git repository that hosts your manifest files, create a Harness secret containing the Git personal access token (PAT). Subsequently, create a new Git connector using this secret.

- Create a Kubernetes connector if you plan to deploy your applications in a new Kubernetes environment. Make sure to update the infrastructure definition to reference this newly created Kubernetes connector.

- Once you complete all the aforementioned steps, create a new Harness service that leverages Kubernetes manifests for deploying applications.

- Lastly, establish a new deployment pipeline and select the newly created infrastructure definition and service. Choose a deployment strategy that aligns with your microservice application's deployment needs.

- Voila! You're now ready to deploy your own application by using Harness.
