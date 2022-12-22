---
title: Kubernetes deployment tutorial
description: This topic walks you through deploying a publicly-available Docker image and manifest into your Kubernetes cluster using a rolling update strategy in Harness.
sidebar_position: 1
helpdocs_topic_id: knunou9j30
helpdocs_category_id: c9j6jejsws
helpdocs_is_private: false
helpdocs_is_published: true
---

This tutorial shows you how to deploy a publicly-available NGINX Docker image and manifest into your Kubernetes cluster using a [rolling update strategy](../../cd-execution/kubernetes-executions/create-a-kubernetes-rolling-deployment.md) in Harness.

## Objectives

You'll learn how to:

* Install and launch a Harness Kubernetes Delegate in your target cluster.
* Set up a Kubernetes Pipeline.
* Run the new Kubernetes Pipeline and deploy a Docker image to your target cluster.

## Before You Begin

Make sure you have the following set up before you begin this quickstart:

* **GitHub account:** this quickstart uses a publicly available NGINX manifest and Docker image. DockerHub allows anonymous connections, but GitHub requires that you log into your account to access their repos.

### Set up your Kubernetes Cluster

You'll need a target Kubernetes cluster for the Harness Delegate and deployment. Ensure your cluster meets the following requirements:

* **Number of nodes:** 2.
* **vCPUs, Memory, Disk Size:** 4vCPUs, 16GB memory, 100GB disk. In GKE, the **e2-standard-4** machine type is enough for this quickstart.
* **Networking:** outbound HTTPS for the Harness connection to **app.harness.io**, **github.com**, and **hub.docker.com**. Allow TCP port 22 for SSH.
* A **Kubernetes service account** with permission to create entities in the target namespace is required. The set of permissions should include `list`, `get`, `create`, and `delete` permissions. In general, the cluster-admin permission or namespace admin permission is enough.  
For more information, see [User-Facing Roles](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) from Kubernetes.

## Step 1: Create the Deploy Stage

Pipelines are collections of stages. For this tutorial, we'll create a new Pipeline and add a single stage.

:::note

**Create a Project for your new CD Pipeline:** if you don't already have a Harness Project, create a Project for your new CD Pipeline. Ensure that you add the **Continuous Delivery** module to the Project. See [Create Organizations and Projects](../../../platform/1_Organizations-and-Projects/2-create-an-organization.md).

:::

1. In your Harness Project, click **Deployments**, and then click **Create a** **Pipeline**.
   ![](./static/kubernetes-cd-quickstart-81.png)
2. Enter the name **CD Quickstart** and click **Start**.
   
   Your Pipeline appears.

   ![](./static/kubernetes-cd-quickstart-82.png)
3. Click **Add Stage** and select **Deploy**.
4. Enter the name **Deploy Service**, make sure **Service** is selected, and then click **Set Up Stage**.
   
   The new stage settings appear.
5. In **About the** **Service**, click **New Service**.
   :::note

   Let's take a moment and review Harness Services and Service Definitions (which are explained below). Harness Services represent your microservices/apps logically. You can add the same Service to as many stages as you need. Service Definitions represent your artifacts, manifests, and variables physically. They are the actual files and variable values.  
   
   By separating Services and Service Definitions, you can propagate the same Service across stages while changing the artifacts, manifests, and variables with each stage.

   :::
1. Give the Service the name **nginx** and click **Save**.

Once you have created a Service, it is persistent and can be used throughout the stages of this or any other Pipeline in the Project.

## Step 2: Add the Manifest

Next, we can add a Kubernetes manifest for NGINX. We'll use the [publicly-available manifest](https://github.com/kubernetes/website/blob/master/content/en/examples/application/nginx-app.yaml) available from Kubernetes.

1. In **Service Definition**, in **Deployment Type**, click **Kubernetes**.
2. In **Manifests**, click **Add Manifest**.
   :::note

   **What about Artifacts?** In this quickstart we are using a publicly-available NGINX Docker image from DockerHub, and the location of the image is hardcoded in the public manifest from Kubernetes. The **Artifacts** section is only used when the public artifact is not hardcoded in the manifest or the repo is private. In those cases, you add the image in **Artifacts** with a Connector for the repo and then reference the image in your values.yaml (`image: <+artifact.image>`). See [Add Container Images as Artifacts for Kubernetes Deployments](../../cd-advanced/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments.md).

   :::
1. Select **K8s Manifest**, and click **Continue**.
2. In **Select K8sManifest Store**, click **GitHub**, and then click **New GitHub Connector**.
3. The **Git Connector** settings appear. Enter the following settings.
   * **Name:** enter a name for the Connector.
   * **URL Type:** select **Repository**.
   * **Connection Type:** select **HTTP**.
   * **Git Repository URL:** enter `https://github.com/kubernetes/website`.
   * **Username and Token:** Enter the username and a Github Personal Access Token for your Github account. You'll have to create a Harness secret for the password.
     1. In **Personal Access Token**, click **Create or Select a Secret**.
     2. Click **New Secret Text**.
     3. In **Secret Name**, enter a name for the secret like **github-pat**.
     4. In **Secret Value**, paste in a GitHub Personal access token.When you're logged into GitHub, these are typically listed at <https://github.com/settings/tokens>. For steps on setting up a GitHub PAT, see [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) from GitHub.Ensure you PAT has the **repo** scope selected:

     ![](static/repoScope.png)
4. Click **Continue**.
5. In **Connect to the provider**, select **Connect through a Harness Delegate**, and then click **Continue**.
   We don't use the **Connect through Harness Platform** option here simply because you'll need a Delegate later for the connection to your target Kubernetes cluster. Typically, the **Connect through Harness Platform** option is a very quick way to make connections without having to use Delegates.
6. In **Delegates Setup**, click **Install new Delegate**. The Delegate wizard appears.

   [![](./static/kubernetes-cd-quickstart-83.png)](./static/kubernetes-cd-quickstart-83.png)

7. Click **Kubernetes**, and then click **Continue**.

   ![](./static/kubernetes-cd-quickstart-85.png)

8. Enter a name for the Delegate, like **quickstart**, click the **Small** size.
9. Click **Continue**.
10. Click **Download YAML file**. The YAML file for the Kubernetes Delegate will download to your computer.
11. Open a terminal and navigate to where the Delegate file is located.
   You will connect to your cluster using the terminal so you can simply run the YAML file on the cluster.
12. In the same terminal, log into your Kubernetes cluster. In most platforms, you select the cluster, click **Connect**, and copy the access command.
    Next, install the Harness Delegate using the **harness-delegate.yaml** file you just downloaded.
13. In the terminal connected to your cluster, run this command:
   ```
   kubectl apply -f harness-delegate.yaml
   ```
   You can find this command in the Delegate wizard:

   ![](./static/kubernetes-cd-quickstart-86.png)

   The successful output is something like this:

   ```
   % kubectl apply -f harness-delegate.yaml  
   namespace/harness-delegate unchanged  
   clusterrolebinding.rbac.authorization.k8s.io/harness-delegate-cluster-admin unchanged  
   secret/k8s-quickstart-proxy unchanged  
   statefulset.apps/k8s-quickstart-sngxpn created  
   service/delegate-service unchanged
   ```
1. In Harness, click **Verify**. It will take a few minutes to verify the Delegate. Once it is verified, close the wizard.
2. Back in **Set Up Delegates**, you can select the new Delegate.
   In the list of Delegates, you can see your new Delegate and its tags.
3. Select the **Connect using Delegates with the following Tags** option.
4. Enter the tag of the new Delegate and click **Save and Continue**.
   When you are done, the Connector is tested.
5. Click **Continue**.
6. In **Manifest Details**, enter the following settings, test the connection, and click **Submit**. We are going to provide connection and path information for a manifest located at `https://raw.githubusercontent.com/kubernetes/website/main/content/en/examples/application/nginx-app.yaml`.
   * **Manifest Identifier:** enter **nginx**.
   * **Git Fetch Type****:** select **Latest from Branch**.
   * **Branch:** enter **main**.
   * **File/Folder path:**`content/en/examples/application/nginx-app.yaml`. This is the path from the repo root.
    
   The manifest is now listed.

   ![](./static/kubernetes-cd-quickstart-87.png)

7. Click **Next** at the bottom of the **Service** tab.

Now that the artifact and manifest are defined, you can define the target cluster for your deployment.

## Step 3: Define Your Target Cluster

The target cluster is your own Kubernetes cluster, hosted in your cloud environment. This is where we will deploy the Docker image using the manifest you selected.

Harness connects to all of the common cloud platforms and provides a platform-agnostic Kubernetes cluster connection that can connect to Kubernetes anywhere.

1. In **Infrastructure Details**, in **Specify your environment**, click **New Environment**. Just like with a Service, you can create a new Environment or selecting an existing one. We'll create a new one.
2. In **New Environment**, enter a name, select **Pre-Production**, and click **Save**. The new Environment appears.
3. In **Infrastructure Definition**, click **Kubernetes**.
    :::note

    Let's take a moment and review Harness Environments and Infrastructure Definitions. Harness Environments represent your deployment targets logically (QA, Prod, etc). You can add the same Environment to as many stages as you need. Infrastructure Definitions represent your target infrastructure physically. They are the actual clusters, hosts, etc.  
    
    By separating Environments and Infrastructure Definitions, you can use the same Environment in multiple stages while changing the target infrastructure settings with each stage.

    :::
4. An **Infrastructure Definition** is where you specify the target for your deployment. In this case, your Kubernetes cluster and namespace.
5. In **Cluster Details**, in **Connector**, click **Select a connector**.
6. Click **New Connector**.
7. The Kubernetes Cluster Connector appears.

   ![](./static/kubernetes-cd-quickstart-88.png)
 
The Kubernetes Cluster Connector is covered in detail [here](../../../platform/7_Connectors/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md), but let's quickly walk through it.

Let's look at the steps:

1. In **Kubernetes Cluster Connector**, in **Name**, enter **Kubernetes Quickstart**, and click **Continue**.
2. In **Details**, select **Use the credentials of a specific Harness Delegate**. We will select the Delegate next.
   
   ![](./static/kubernetes-cd-quickstart-89.png)

3. Click **Continue**.
4. Select the Kubernetes Delegate you added earlier using its Tags, and then click **Save and Continue**.
   Harness verifies the Connector.
5. Click **Finish**.
6. Select the new Connector and then click **Apply Selected**.
7. Back in **Cluster Details**, in **Namespace**, enter the target namespace for the deployment. For example, **default**. You can use any namespace in your target cluster.
8.  In **Advanced**, in **Release name**, enter `quickstart`.
    For a release name, you can use a built-in or custom expression or any text you like.
    Harness requires a release name for tracking. It is applied to the pods as a label. The release name must be unique across the cluster.
9.  When you are done, the **Cluster Details** will look something like this:

    ![](./static/kubernetes-cd-quickstart-90.png)

    The target infrastructure is complete. Now we can add our stage steps.
10. Click **Next** to move onto **Execution**.

## Step 4: Add a Rollout Deployment Step

Now you can select the [deployment strategy](../../cd-deployments-category/deployment-concepts.md) for this stage of the Pipeline.

1. In Execution Strategies, select **Rolling**, and then click **Use Strategy**.

   ![](./static/kubernetes-cd-quickstart-91.png)

2. The **Rollout Deployment** step is added.
   
   ![](./static/kubernetes-cd-quickstart-92.png)

   This is a standard [Kubernetes rolling update](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/). By default, Harness uses a `25% max unavailable, 25% max surge` strategy.

That's it. Now the Pipeline stage is complete and you can deploy.

## Step 5: Deploy and Review

1. Click **Save** **> Save Pipeline** and then **Run**.
   Now you can select the specific artifact to deploy.
2. In **Primary Artifact**, select **stable**. This is the same as using `docker pull nginx:stable`.
3. Click **Run Pipeline**. Harness will verify the Pipeline and then run it.
   You can see the status of the deployment, and pause or abort it.

   ![](./static/kubernetes-cd-quickstart-93.png)

4. Toggle **Console View** to watch the deployment with more detailed logging.Click the **Rollout Deployment** step and expand **Wait for Steady State**.

   You can see `deployment "my-nginx" successfully rolled out`.

   ![](./static/kubernetes-cd-quickstart-94.png)

Congratulations! The deployment was successful.

In your Project's Deployments, you can see the deployment listed:

![](./static/kubernetes-cd-quickstart-95.png)

If you run into any errors, it is typically because the cluster does meet the requirements from [Before You Begin](#before_you_begin) or the cluster's network setting does not allow the Delegate to connect to Docker Hub.In this tutorial, you learned how to:

* Install and launch a Harness Kubernetes Delegate in your target cluster.
* Connect Harness to your Kubernetes cluster and an artifact server.
* Add your manifests to Harness.
* Create an Infrastructure Definition that targets your cluster and namespace.
* Add a Kubernetes rolling update.
* Deploy your Kubernetes Pipeline to your target cluster.

Next, try Harness [Continuous Integration](docs/continuous-integration) to build a codebase, upload it to a repo, and run unit and integrations tests: [CI Pipeline Quickstart](../../../continuous-integration/ci-quickstarts/ci-pipeline-quickstart.md).

## Clean Up

For steps on deleting the Delgate, go to [Delegate a delegate](../../../platform/2_Delegates/delegate-guide/delete-a-delegate.md).

## Next Steps

See [CD tutorials](/docs/category/cd-tutorials) for other deployment features.



