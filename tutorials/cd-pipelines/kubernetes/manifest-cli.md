---
sidebar_position: 0
hide_table_of_contents: true
title: Manifest-Cli
---

# Deploy using Kubernetes Manifest with Harness CLI

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

This tutorial will get you started with Harness Continuous Delivery (CD). We will guide you through deploying a Guestbook application using Harness CLI.
This Guestbook application uses a publicly available Kubernetes manifest and Docker image.


Harness CD pipelines allow you to orchestrate and automate your deployment workflows, and push updated application images to your target Kubernetes cluster. Pipelines allow extensive control over how you want to progress artifacts through various dev / test / stage / prod clusters, while running a variety of scans & tests to ensure quality and stability standards you and team may have defined.
## Before you begin

Verify that you have the following:

1. **Obtain GitHub personal access token with the repo scope**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
2. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness Delegates and deploying a sample application in a local development environment.
    - Check [Delegate system requirements](https://developer.harness.io/docs/platform/Delegates/delegate-concepts/delegate-requirements).

## Getting Started with Harness CD
----------------------------------

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-manifest).

:::

- Post-signup, select the module as **Continious-Delivery** on the Welcome Page. 
- Now select **Kubernetes Service** under "Tell us about Your Service" and select **Kubernetes Manifest** under "How is your service represented"
- Now select **CD Pipeline** under "How and Where do you want to deploy" and procced to "Install the Kubernetes Delegate". 

### Delegate

<details open>
<summary>What is the Harness delegate?</summary>

The Harness delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations including deployment and integration. Learn more about the delegate in the [Delegate Overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

</details>

- Now follow the delegate installtion wizard and install your delegate using **Helm Chart**
    - In the wizard make sure your delegate is named as `helm-delegate`.
    - Preview and Copy the manifest YAML, create a file named `harness-delegate.yaml` 
        - Add the Harness Helm chart repo to your local helm registry using the following commands.
        
        ```bash
        helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
        ```

        - Update the repo:

        ```bash
        helm repo update harness-delegate
        ```

        -  Use the command provided in the wizard which looks similar to the one given below, `ACCOUNT_ID` and `MANAGER_ENDPOINT` are auto-populated in the commands available on the delegate installation wizard.

         
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

### Building the Pipeline Resources 
1. **Create an API key**, make sure to copy and save it for fututre use while creating resources for the pipeline. 

2. **Download the Harness CLI**

```mdx-code-block
<Tabs>
<TabItem value="MacOS">
```
```
curl -L0 https://github.com/harness/harness-cli/releases/download/v0.0.10-alpha/harness-v0.0.10-alpha-darwin-amd64.tar.gz

```
```mdx-code-block
</TabItem>
<TabItem value="Linux">
```
```
curl -L0 https://github.com/harness/harness-cli/releases/download/v0.0.10-alpha/harness-v0.0.10-alpha-linux-amd64.tar.gz

```
```mdx-code-block
</TabItem>
<TabItem value="Windows">
```
```
curl -L0 https://github.com/harness/harness-cli/releases/download/v0.0.10-alpha/harness-v0.0.10-alpha-windows-amd64.zip

```
```mdx-code-block
</TabItem>
</Tabs>
```

3. Add github username and PAT you generated above under **Enter Your Github Details**.

4. **Pipeline Setup**

Under this step, you would see a bunch of CLI command to run, before procceding with that, please follow the steps below to create the pipeline resources. 

- Use the follwwing command to clone the repo and get into the root folder conating the YAMLS used in this tutorial. 

    ```
    git clone https://github.com/harness-community/harnesscd-example-apps.git 
    cd harness-example-apps/guestbook/harnesscd-pipeline
    ```
- **Login Using CLI**
    - For this step we will use **account ID** from the Harness URL and the **x-api-key** created above. 
    - Example of Harness URL: `https://app.harness.io/ng/account/<account ID>/cd/orgs/<org ID>/projects/<Project ID>/`
    - Now use the following CLI command to login. 
    ```
    harness login --api-key <YOUR API KEY> --account-id <YOUR ACCOUNT ID>
    ```

    #### Secrets

    <details open>
    <summary>What are Harness secrets?</summary>

    Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness delegate has access to the key management system. You can also integrate your own secret manager. To learn more about secrets in Harness, go to [Harness Secret Manager Overview](https://developer.harness.io/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview/).

    </details>
    
    - Use the follwoing command to add Github PAT created above for secret.
    
    ```
    harness secret --token <YOUR GITHUB PAT>
    ```

    #### Connectors

    <details open>
    <summary>What are connectors?</summary>

    Connectors in Harness enable integration with 3rd party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Explore connector how-tos [here](https://developer.harness.io/docs/category/connectors).

    </details>

    - Replace **GITHUB_USERNAME** with your GitHub account username in the `github-connector.yaml` 
    - In `projectIdentifier`, verify that the project identifier is correct. You can see the Id in the browser URL (after `account`). If it is incorrect, the Harness YAML editor will suggest the correct Id.
    - Now create the **GitHub connector** using the following CLI Command
        ```
        harness connector --file github-connector.yml apply --git-user <YOUR GITHUB USERNAME>
        ```
    - Please check the delegate name to be `helm-delegate` in the `kubernetes-connector.yml`
    - Create the **Kubernetes connector** using the following CLI Command
        
    ```
    harness connector --file kubernetes-connector.yml apply --delegate-name kubernetes-delegate
    ```

    ### Environment

    <details open>
    <summary>What are Harness environments?</summary>

    Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

    </details>

    - Use the follwing CLI Command to create **Environments** in your Harness project
        ```
        harness environment --file environment.yml apply
        ```
        
    - In your new environment, add **Infrastructure Definitions** using the following CLI command.
        ```
        harness infrastructure --file infrastructure-definition.yml apply
        ```

### Services

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>

- Use the following CLI command to create **Services** in your Harness Project. 
    ```
    harness service -file service.yml apply
    ```

### Pick Your Deployment Strategy

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](https://developer.harness.io/docs/continuous-delivery/get-started/cd-pipeline-basics/).

</details>

```mdx-code-block
<Tabs>
<TabItem value="Canary">
```

<details open>
<summary>What are Canary deployments?</summary>

A canary deployment updates nodes in a single environment gradually, allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. For more information, go to [When to use Canary deployments](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments).

</details>

- CLI Command for canary deployment:

    ```
    harness pipeline --file canary-pipeline.yml apply
    ```


```mdx-code-block
</TabItem>
<TabItem value="Blue Green">
```

<details open>
<summary>What are Blue Green deployments?</summary>

Blue Green deployments involve running two identical environments (stage and prod) simultaneously with different service versions. QA and UAT are performed on a **new** service version in the stage environment first. Next, traffic is shifted from the prod environment to stage, and the previous service version running on prod is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. For more information, go to [When to use Blue Green deployments](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments).

</details>

- CLI Command for blue-green deployment:

    ```
    harness pipeline --file bluegreen-pipeline.yml apply
    ```


```mdx-code-block
</TabItem>
<TabItem value="Rolling">
```

<details open>
<summary>What are Rolling deployments?</summary>

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. For more information, go to [When to use rolling deployments](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments).

</details>

- CLI Command for Rolling deployment:

    ```
    harness pipeline --file rolling-pipeline.yml apply
    ```


```mdx-code-block
</TabItem>
</Tabs>
```

Finally, it's time to execute your pipeline. 

1. Go to the pipeline tab on left nav bar and you can see your pipeline created.
2. Go to the pipeline studio and Select **Run**, and then select **Run Pipeline** to initiate the deployment.
     - Observe the execution logs as Harness deploys the workload and checks for steady state.
     - After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:
             
         ```bash
         kubectl get pods -n default
         ```

     - To access the Guestbook application deployed by the Harness pipeline, port forward the service and access it at [http://localhost:8080](http://localhost:8080)
             
         ```bash
         kubectl port-forward svc/guestbook-ui 8080:80
         ```

### Congratulations!🎉

You've just learned how to use Harness CD to deploy an application using a Kubernetes manifest.


