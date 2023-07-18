---
sidebar_position: 1
hide_table_of_contents: true
title: Kustomize
---

# Deploy using Kustomize

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

This tutorial helps you get started with Harness Continuous Delivery (CD). We will guide you through creating a CD pipeline and deployment of a Guestbook application. This Guestbook application will use Kustomize for deployment.

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-kustomize).

:::

```mdx-code-block
<Tabs>
<TabItem value="CD pipeline">
```

## Before you begin

Verify the following:

1. **Obtain GitHub personal access token with repo permissions**. For steps, go to the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
2. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness delegates and deploying a sample application in a local development environment.
    - Check [delegate System and network requirements](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-requirements).
3. **Install [Helm CLI](https://helm.sh/docs/intro/install/)**.
4. **Fork the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub web interface.
    - For details on forking a GitHub repository, go to [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository).

## Getting Started with Harness CD
----------------------------------

1. Log into [Harness](https://app.harness.io/).

2. Select **Projects**, and then select **Default Project**.

:::caution

For the pipeline to run successfully, please follow all of the following steps as they are, including the naming conventions.

:::

### Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifact registries, cloud platforms, etc. The delegate is installed in the target infrastructure (Kubernetes cluster) and performs operations including deployment and integration. To learn more about the delegate, go to [delegate Overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

1. In **Project Setup**, select **Delegates**.
    - Select **Tokens**.
        - Select **New Token**.
        - Enter the named `delegate_token`.
        - Select **Apply**.
        - Copy the token value by selecting the copy icon and store the token somewhere.
        - Select **Close**.
    - Select **Delegates**.
        - Select **Install delegate**. For this tutorial, let's explore how to install the delegate using Helm.
        - Add the Harness Helm chart repo to your local Helm registry.  

        ```bash
        helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
        ```  

        ```bash
        helm repo update harness-delegate
        ```
        -  In the command provided, `ACCOUNT_ID` and `MANAGER_ENDPOINT` are auto-populated values that you can obtain from the delegate Installation wizard. 
            You simply need to replace `DELEGATE_TOKEN` in the command with the token that was copied earlier and proceed with installing the delegate.  

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
    - You can also follow the [Install Harness delegate on Kubernetes or Docker](https://developer.harness.io/tutorials/platform/install-delegate/) tutorial to install the delegate using the Terraform Helm Provider or Kubernetes manifest.


### Secrets

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness delegate has access to the key management system. You can also integrate your own secret management solution. To learn more about secrets in Harness, go to [Secrets Management](https://developer.harness.io/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview/).

1. In **Project Setup**, select **Secrets**.
    - Select **New Secret** > **Text**.
    - Enter the secret name `harness_gitpat`.
    - For the secret value, paste in the GitHub Personal Access Token.
    - Select **Save**.

### Connectors

Connectors in Harness enable integration with 3rd party tools, providing connection and authentication at deployment runtime. For example, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. To learn more about connectors, go to [Connectors](https://developer.harness.io/docs/category/connectors).

1. Create a **GitHub connector**.
    - Copy the contents of [github-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/github-connector.yml).
    - In Harness, in **Project Setup**, select **Connectors**.
    - Select **Create via YAML Builder** and paste the copied YAML.
    - Assuming you have already forked the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository as mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML wherever required.
    - Select **Save Changes** and verify that the new connector named **harness_gitconnector** is successfully created.
    - Finally, select **Test** under **CONNECTIVITY STATUS** to ensure the connection is successful.

2. Create **Kubernetes connector**.
    - Copy the contents of [kubernetes-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/kubernetes-connector.yml).
    - In Harness, in **Project Setup**, select **Connectors**.
    - Select **Create via YAML Builder** and paste in the copied YAML.
    - In the YAML, replace **DELEGATE_NAME** with the installed delegate name. To obtain the delegate name, navigate to **Default Project** > **Project Setup** > **Delegates**. 
    - Select **Save Changes** and verify that the new connector named **harness_k8sconnector** is successfully created.
    - Finally, select **Test** under **CONNECTIVITY STATUS** to verify the connection is successful.

### Environment

Environments determine the deployment location, categorized as **Production** and **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or target infrastructures. To learn more about environments, go to [Environment Overview](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

1. In **Default Project**, select **Environments**.
    - Select **New Environment** and toggle to **YAML** to use the YAML editor.
    - Copy the contents of [environment.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/environment.yml) and paste it into the YAML editor and select **Save**.
    - In **Infrastructure Definitions**, select **Infrastructure Definition** and select **Edit YAML**.
    - Copy the contents of [infrastructure-definition.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/infrastructure-definition.yml) and paste it into the YAML editor.
    - Select **Save** and verify that the environment and infrastructure definition is created successfully.

### Services

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The Services dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services Overview](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

1. In **Default Project**, select **Services**.
    - Select **New Service**.
    - Name the service `harnessguestbook`.
    - Select **Save**, and then in the **Configuration** tab, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** and copy the contents of [service.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/service.yml) and paste it into the YAML editor.
    - Select **Save** and verify that the Service **harness_guestbook** is successfully created.

### Pipeline

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](https://developer.harness.io/docs/continuous-delivery/get-started/cd-pipeline-basics/).


```mdx-code-block
<Tabs>
<TabItem value="Canary">
```

A canary deployment updates nodes in a single environment gradually, allowing you to use gates between increments. Canary deployments allow incremental updates and ensure a controlled rollout process. For more information, go to [When to use Canary deployments](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-canary-deployments).

- In **Default Project**, select **Pipelines**.
    - Select **New Pipeline**.
    - Enter the name `guestbook_canary_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.

- Copy the contents of [canary-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/canary-pipeline.yml) and paste it into the YAML editor.
- Select **Save**.
- You can switch to the **Visual** editor and confirm the pipeline, stage, and execution steps are as shown below.

![Canary](../static/kustomize-tutorial/canary.png)

```mdx-code-block
</TabItem>
<TabItem value="Blue Green">
```

Blue Green deployments involve running two identical environments (stage and prod) simultaneously with different service versions. QA and UAT are performed on a new service version in the stage environment first. Next, traffic is shifted from the prod environment to stage, and the previous service version running on prod is scaled down. Blue Green deployments are also referred to as red/black deployment by some vendors. For more information, go to [When to use Blue Green deployments](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-blue-green-deployments).

- In **Default Project**, select **Pipelines**.
    - Select **New Pipeline**.
    - Enter the name `guestbook_bluegreen_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.

- Copy the contents of [bluegreen-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/bluegreen-pipeline.yml) and paste it into the YAML editor.
- Select **Save**.
- You can switch to the **Visual** editor and confirm the pipeline, stage, and execution steps are as shown below.

![Blue Green](../static/kustomize-tutorial/bluegreen.png)

```mdx-code-block
</TabItem>
<TabItem value="Rolling">
```

Rolling deployments incrementally add nodes in a single environment with a new service version, either one-by-one or in batches defined by a window size. Rolling deployments allow a controlled and gradual update process for the new service version. For more information, go to [When to use rolling deployments](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts#when-to-use-rolling-deployments).

- In **Default Project**, select **Pipelines**.
    - Select **New Pipeline**.
    - Enter the name `guestbook_rolling_pipeline`.
    - Select **Inline** to store the pipeline in Harness.
    - Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
    - Select **Edit YAML** to enable edit mode, and choose any of the following execution strategies. Paste the respective YAML based on your selection.

- Copy the contents of [rolling-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/kustomize-guestbook/harnesscd-pipeline/rolling-pipeline.yml) and paste it into the YAML editor.
- Select **Save**.
- You can switch to the **Visual** editor and confirm the pipeline, stage, and execution steps are as shown below.

![Rolling](../static/kustomize-tutorial/rolling.png)

```mdx-code-block
</TabItem>
</Tabs>
```

1.  Finally, it's time to execute the pipeline. Select **Run**, and then select **Run Pipeline** to initiate the deployment.
    - Observe the execution logs as Harness deploys the workload and checks for steady state.
    - After a successful execution, you can check the deployment in your Kubernetes cluster using the following command:  

        ```bash
        kubectl get pods -n default
        ```
    - To access the Guestbook application deployed via the Harness pipeline, port forward the service and access it at [http://localhost:8080](http://localhost:8080):  

        ```bash
        kubectl port-forward svc/kustomize-guestbook-ui 8080:80
        ```

### Congratulations!🎉
You've just learned how to use Harness CD to deploy an application using a Kustomize template.

#### What's Next?
- Keep learning about Harness CD. Add triggers to your pipeline that'll respond to Git events by following this [guide](https://developer.harness.io/docs/platform/Triggers/triggering-pipelines).
- Visit the [Harness Developer Hub](https://developer.harness.io/) for more Tutorials and resources.

```mdx-code-block
</TabItem>
<TabItem value="GitOps workflow">
```

:::info

Whether you're new to GitOps or have already used Argo CD, this guide will assist you in getting started with Harness GitOps, both with and without Argo CD.

Harness also offers a Hosted GitOps solution, and a tutorial for it will be available soon.

:::

## Before you begin

Verify the following:

1. **A Kubernetes cluster**. We recommend [K3D](https://k3d.io/v5.5.1/) for installing the Harness GitOps Agent and deploying a sample application in a local development environment.
    - Check [Harness GitOps Agent Requirements](https://developer.harness.io/docs/continuous-delivery/gitops/install-a-harness-git-ops-agent/#requirements).
2. Fork the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub web interface.
    - For details on Forking a GitHub repository, go to [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository).

## Getting Started with Harness GitOps
--------------------------------------

1. Log in to the [Harness App](https://app.harness.io/).

2. Select on **Projects** in the top left corner, choose **Default Project**.

3. Select **Deployments**, under **Default Project** select on **GitOps**.

### GitOps Agent

A Harness GitOps Agent is a worker process that runs in your environment, makes secure, outbound connections to Harness, and performs all the GitOps tasks you request in Harness.

4. Select **Settings**, and then select **GitOps Agents**.
- Select **New GitOps Agent**.
- When are prompted with **Do you have any existing Argo CD instances?**, select **Yes** if you already have a Argo CD Instance, or else choose **No** to install the Harness GitOps Agent.

```mdx-code-block
<Tabs>
<TabItem value="Harness GitOps Agent Fresh Install">
```

- Select **No**, and then select **Start**.
- In **Name**, enter the name for the new Agent.
- In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment.
    - For this tutorial, let's use the `default` namespace to install the Agent and deploy applications.
- Select **Continue**. The **Review YAML** settings appear.
- This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.  

    ```yaml
    kubectl apply -f gitops-agent.yml -n default
    ```
- Select **Continue** and verify the Agent is successfully installed and can connect to Harness.


```mdx-code-block
</TabItem>
<TabItem value="Harness GitOps Agent with Existing Argo CD instance">
```

- Select **Yes**, and then select **Start**.
- In **Name**, enter the name for the existing Agent CD Project.
- In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent. Typically, this is the target namespace for your deployment.
- Select **Next**. The **Review YAML** settings appear.
- This is the manifest YAML for the Harness GitOps Agent. You will download this YAML file and run it in your Harness GitOps Agent cluster.  

    ```yaml
    kubectl apply -f gitops-agent.yml -n default
    ```
- Once you have installed the Agent, Harness will start importing all the entities from the existing Argo CD Project.

```mdx-code-block
</TabItem>
</Tabs>
```

### Repositories

A Harness GitOps Repository is a repo containing the declarative description of a desired state. The declarative description can be in Kubernetes manifests, Helm Chart, Kustomize manifests, etc.

5. Select **Settings**, and then select **Repositories**.
- Select **New Repository**.
- Choose **Git**.
    - Enter a name in **Repository**.
    - In **GitOps Agent**, choose the Agent that you installed in your cluster and select **Apply**.
    - In **Git Repository URL**, paste `https://github.com/GITHUB_USERNAME/harnesscd-example-apps.git` and replace **GITHUB_USERNAME** with your GitHub username.
    - Select **Continue**, and then choose **Specify Credentials For Repository**.
        - Choose **HTTPS** as the **Connection Type**.
        - Select **Anonymous (no credentials required)** as the **Authentication** method.
        - Select **Save & Continue** and wait for Harness to verify the connection.
        - Finally, select **Finish**.

### Clusters

A Harness GitOps Cluster is the target deployment cluster that is compared to the desire state. Clusters are synced with the source manifests you add as GitOps Repositories.

6. Select **Settings**, and then select **Clusters**.
- Select **New Cluster**.
    - In **Name**, enter a name for the cluster.
    - In **GitOps Agent**, choose the Agent that you installed in your cluster and select **Apply**.
    - Select **Continue** and use **Use the credentials of a specific Harness GitOps Agent**.
    - Select **Save & Continue** and wait for Harness to verify the connection.
    - Finally, select **Finish**.

### Applications

GitOps Applications are how you manage GitOps operations for a given desired state and its live instantiation.

A GitOps Application collects the Repository (**what you want to deploy**), Cluster (**where you want to deploy**), and Agent (**how you want to deploy**). You define these entities and then select them when you set up your Application.

1. Select **Applications**.
- Select **New Application**.
    - Enter the **Application Name** `guestbook`.
    - In the **GitOps Agent**, choose the Agent that you installed in your cluster and select **Apply**.
    - Select **New Service**, and then toggle to **YAML** for the YAML editor.
    - Select **Edit YAML**, paste the following YAML and select **Save**.  

    ```yaml
    service:
      name: gitopsguestbook
      identifier: gitopsguestbook
      serviceDefinition:
        type: Kubernetes
        spec: {}
      gitOpsEnabled: true
    ```
    - Select **New Environment**, and then toggle to **YAML** for the YAML editor.
    - Select **Edit YAML**, paste the following YAML and select **Save**.  

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
    - Select **Continue**, keep the **Sync Policy** settings as is, and then select **Continue**.
    - In **Repository URL**, choose the **Repository** you created earlier and select **Apply**.
    - Select **master** as the **Target Revision**, type `kustomize-guestbook` in the **Path**, and press **Enter**.
    - Select **Continue** to select the **Cluster** created in the above steps.
    - Enter the target **Namespace** for Harness GitOps to sync the application. Type `default` and select **Finish**.

1. Finally, it's time to **Synchronize** the Apllication state. Select **Sync**, check the Application details, and then select **Synchronize** to initiate the deployment.
    - After a successful execution, you can check the deployment on your Kubernetes cluster using the following command:  

        ```bash
        kubectl get pods -n default
        ```
    - To access the Guestbook application deployed via the Harness pipeline, port forward the service and access it at [http://localhost:8080](http://localhost:8080):  

        ```bash
        kubectl port-forward svc/kustomize-guestbook-ui 8080:80
        ```

On successful Application sync, you'll see the below status tree under **Resource View**.

![GitOps](../static/kustomize-tutorial/gitops.png)

### Congratulations!🎉
You've just learned how to use **Harness GitOps** to deploy an application using a Kustomize template.

#### What's Next?
- Keep learning about Harness GitOps. Create a GitOps ApplicationSet and PR Pipeline in Harness GitOps by following this [guide](https://developer.harness.io/docs/continuous-delivery/gitops/harness-git-ops-application-set-tutorial).
- Visit the [Harness Developer Hub](https://developer.harness.io/) for more tutorials and resources.

```mdx-code-block
</TabItem>
</Tabs>
```
