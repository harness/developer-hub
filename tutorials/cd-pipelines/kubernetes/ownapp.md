---
sidebar_position: 3
hide_table_of_contents: true
title: Deploy Your Own Microservice Application
---

# Deploy Your Own Microservice Application

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

_**This tutorial is a continuation of the Kubernetes Manifest tutorial. In the previous tutorial, we guided you through creating a sample pipeline using the Guestbook sample app. In this tutorial, we'll walk you through deploying your own microservice app with the Harness CD pipeline.**_

**Sock Shop**, developed by Weaveworks, serves as a polyglot architectural pattern to showcase microservices-based deployments. This application suite integrates a range of technologies, such as SpringBoot, Go, REDIS, MYSQL, MongoDB, among others. We've chosen the Sock Shop as our demonstration app for the deployment process in Harness.

You can use the same steps to integrate and deploy your own microservice app.

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-manifest).

:::

You can choose to proceed with the tutorial either by using the command-line interface (Harness CLI) or the user interface (Harness UI).

```mdx-code-block
<Tabs queryString="interface">
<TabItem value="cli" label="CLI">
```

## Before you begin {#before-you-begin-cli}

:::info

If you have already followed the steps from the Kubernetes tutorials and met all the requirements, then you can skip this.

:::

Verify the following:

1. **Obtain Harness API Token**. For steps, go to the Harness documentation on [creating a personal API token](/docs/platform/automation/api/add-and-manage-api-keys/).
2. **Obtain GitHub personal access token with repo permissions**. For steps, go to the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
3. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness delegates and deploying a sample application in a local development environment.
    - Check [delegate system and network requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).
4. **Install the [Helm CLI](https://helm.sh/docs/intro/install/)**.
5. **Fork the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository using the GitHub web interface to utilize the Harness resource YAMLs.

## Getting Started with Harness CD
----------------------------------

1. Download and Configure Harness CLI.

    ```mdx-code-block
    <Tabs queryString="cli-os">
    <TabItem value="macos" label="MacOS">
    ```

    ```bash
    curl -LO https://github.com/harness/harness-cli/releases/download/v0.0.13-alpha/harness-v0.0.13-alpha-darwin-amd64.tar.gz 
    tar -xvf harness-v0.0.13-alpha-darwin-amd64.tar.gz  
    echo 'export PATH="'$(pwd)':$PATH"' >> ~/.bash_profile
    source ~/.bash_profile
    ```

    ```mdx-code-block
    </TabItem>
    <TabItem value="linux" label="Linux">
    ```

    ```mdx-code-block
    <Tabs queryString="linux-platform">
    <TabItem value="arm" label="ARM">
    ```

    ```bash
    curl -LO https://github.com/harness/harness-cli/releases/download/v0.0.13-alpha/harness-v0.0.13-alpha-linux-arm64.tar.gz 
    tar -xvf harness-v0.0.13-alpha-darwin-arm64.tar.gz 
    echo 'export PATH="'$(pwd)':$PATH"' >> ~/.bash_profile
    source ~/.bash_profile
    ```

    ```mdx-code-block
    </TabItem>
    <TabItem value="amd" label="AMD">
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
    <TabItem value="windows"  label="Windows">
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

2. Clone the forked **harnessed-example-apps** repo and change directory.
    ```bash
    git clone https://github.com/GITHUB_ACCOUNTNAME/harnesscd-example-apps.git
    cd harnesscd-example-apps/deploy-own-app/cd-pipeline
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

:::caution

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


```mdx-code-block
<Tabs queryString="deployment">
<TabItem value="canary" label="Canary">
```

13. CLI Command for canary deployment:
    ```
    harness pipeline --file canary-pipeline.yml apply
    ```
   You can switch to the **Visual** editor and confirm the pipeline stage and execution steps.

```mdx-code-block
</TabItem>
<TabItem value="bg" label="Blue Green">
```

13. CLI Command for blue-green deployment:
    ```
    harness pipeline --file bluegreen-pipeline.yml apply
    ```
   You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps.

```mdx-code-block
</TabItem>
<TabItem value="rolling" label="Rolling">
```

13. CLI Command for Rolling deployment:
    
    ```
    harness pipeline --file rolling-pipeline.yml apply
    ```
   You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps.

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
<TabItem value="ui" label="UI">
```
## Before you begin {#before-you-begin-ui}

Verify that you have the following:

1. **Obtain GitHub personal access token with the repo scope**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
2. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness Delegates and deploying a sample application in a local development environment.
    - Check [Delegate system requirements](/docs/platform/Delegates/delegate-concepts/delegate-requirements).
3. **Install the [Helm CLI](https://helm.sh/docs/intro/install/)** in order to install the Harness Helm delegate.
4. **Fork the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository using the GitHub web interface to utilize the Harness resource YAMLs.

## Getting Started with Harness CD {#getting-started-harness-cd-ui}
----------------------------------

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

:::caution

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
    - Assuming you have already forked the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML.
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

```mdx-code-block
<Tabs>
<TabItem value="Canary">
```

9. In **Default Project**, select **Pipelines**.
    - Select **New Pipeline**.
    - Enter the name `ownapp_canary_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.
        - Copy the contents of [canary-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/canary-pipeline.yml).
        - In your Harness pipeline YAML editor, paste the YAML.
        - Select **Save**.

```mdx-code-block
</TabItem>
<TabItem value="Blue Green">
```

9. In **Default Project**, select **Pipelines**.
    - Select **New Pipeline**.
    - Enter the name `ownapp_bluegreen_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.
        - Copy the contents of [bluegreen-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/bluegreen-pipeline.yml).
        - In your Harness pipeline YAML editor, paste the YAML.
        - Select **Save**.

```mdx-code-block
</TabItem>
<TabItem value="Rolling">
```

9. In **Default Project**, select **Pipelines**.
    - Select **New Pipeline**.
    - Enter the name `ownapp_rolling_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.
        - Copy the contents of [rolling-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/guestbook/harnesscd-pipeline/rolling-pipeline.yml).
        - In your Harness pipeline YAML editor, paste the YAML.
        - Select **Save**.

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

-   Select **Run**, and then select **Run Pipeline** to initiate the deployment.
     - Observe the execution logs as Harness deploys the workload and checks for steady state.
     - After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:
             
         ```bash
         kubectl get pods -n default
         ```

     - Sock Shop is accessible via the master and any of the node urls on port `30001`.

### Automate deployments

#### Using Triggers

With [Pipeline Triggers](/docs/category/triggers), you can start automating your deployments based on events happening in an external system. This system could be a Source Repository, an Artifact Repository, or a third party system. Any Developer with Pipeline Create and Edit permissions can configure a trigger in Harness. 

Follow the [Pipeline Triggers](/tutorials/cd-pipelines/trigger) tutorial to see triggers in action.

#### Using API

You can also utilize the [Harness API](/docs/category/api) to manage resources, view, create/edit, or delete them.

Refer to the [Get started with Harness API](/docs/platform/automation/api/api-quickstart) guide to learn how to use the API for automation.

### Congratulations!🎉

You've just learned how to use Harness CD to deploy your own application.

#### What's Next?

- Visit the [Harness Developer Hub](https://developer.harness.io/) for more tutorials and resources.

