---
title: Kustomize deployment tutorial
description: This topic walks you through deploying a kustomization using Harness.
sidebar_position: 4
helpdocs_topic_id: uiqe6jz9o1
helpdocs_category_id: c9j6jejsws
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness supports [Kustomize](https://kustomize.io/) kustomizations in your Kubernetes deployments. You can use overlays, multibase, plugins, sealed secrets, etc, just as you would in any native kustomization.

This Kustomize tutorial will deploy multiple variants of a simple public Hello World server using a [rolling update strategy](../../cd-execution/kubernetes-executions/create-a-kubernetes-rolling-deployment.md) in Harness.

## Objectives

You'll learn how to:

* Install and launch a Harness Kubernetes Delegate in your target cluster.
* Set up a Kustomize Pipeline.
* Run the new Kustomize Pipeline and deploy an NGINX Docker image to your target cluster.

## Before You Begin

Make sure you have the following set up before you begin this quickstart:

* **GitHub account:** this quickstart uses a publicly available kustomization and Docker image. DockerHub allows anonymous connections, but GitHub requires that you log into your account to access their repos.

### Set up your Kubernetes Cluster

You'll need a target Kubernetes cluster for the Harness Delegate and deployment. Ensure your cluster meets the following requirements:

* **Number of nodes:** 2.
* **vCPUs, Memory, Disk Size:** 4vCPUs, 16GB memory, 100GB disk. In GKE, the **e2-standard-4** machine type is enough for this quickstart.
* **Networking:** outbound HTTPS for the Harness connection to **app.harness.io**, **github.com**, and **hub.docker.com**. Allow TCP port 22 for SSH.
* A **Kubernetes service account** with permission to create entities in the target namespace is required. The set of permissions should include `list`, `get`, `create`, and `delete` permissions. In general, the cluster-admin permission or namespace admin permission is enough.  
For more information, see [User-Facing Roles](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) from Kubernetes.

## Step 1: Create the Deploy Stage

Pipelines are collections of stages. For this quickstart, we'll create a new Pipeline and add a single stage.

:::note

**Create a Project for your new CD Pipeline:** if you don't already have a Harness Project, create a Project for your new CD Pipeline. Ensure that you add the **Continuous Delivery** module to the Project. See [Create Organizations and Projects](../../../platform/1_Organizations-and-Projects/2-create-an-organization.md).

:::


1. In your Harness Project, click **Deployments**, and then click **Create a** **Pipeline**.

   ![](./static/kustomize-quickstart-65.png)

2. Enter the name **Kustomize Quickstart** and click **Start**.
   Your Pipeline appears.

   ![](./static/kustomize-quickstart-66.png)

3. Click **Add Stage** and select **Deploy**.
4. Enter the name **Kustomize**, make sure **Service** is selected, and then click **Set Up Stage**.
   The new stage settings appear.
5. In **About the** **Service**, click **New Service**.
    :::note

    Let's take a moment and review Harness Services and Service Definitions (which are explained below). Harness Services represent your microservices/apps logically. You can add the same Service to as many stages are you need. Service Definitions represent your artifacts, manifests, and variables physically. They are the actual files and variable values.  
    
    By separating Services and Service Definitions, you can propagate the same Service across stages while changing the artifacts, manifests, and variables with each stage.

    :::
6.  Give the Service the name **nginx** and click **Save**.

   ![](./static/kustomize-quickstart-67.png)

Once you have created a Service, it is persistent and can be used throughout the stages of this or any other Pipeline in the Project.

## Step 2: Add the Kustomization

Now we can connect Harness to the repo containing the kustomization. We'll use a publicly available [hellword kustomization](https://github.com/wings-software/harness-docs/tree/main/kustomize/helloWorld) cloned from Kustomize.

All connections and operations are performed by Harness Delegates. So we'll also add a Harness Delegate to your target cluster. You can add the Delegate separately or as part of adding the kustomization files.

1. In **Service Definition**, in **Deployment Type**, click **Kubernetes**.
2. In **Manifests**, click **Add Manifest**.
    :::note

    **What about Artifacts?** In this quickstart the kustomization uses a publicly-available NGINX Docker image from DockerHub, and the location of the image is hardcoded in the manifest. The **Artifacts** section is only used when the public artifact is not hardcoded in the manifest or the repo is private. In those cases, you add the image in **Artifacts** with a Connector for the repo and then reference the image in a Kustomize Patch file (`image: <+artifact.image>`).

    :::
3. In **Specify Manifest Type**, click **Kustomize**, and click **Continue**.

   ![](./static/kustomize-quickstart-68.png)

4. In **Specify Kustomize Type**, select **GitHub**.
5. Click **New GitHub Connector**.
6. The **Git Connector** settings appear. Enter the following settings.
   * **Name:** enter a name for the Connector.
   * **URL Type:** select **Repository**.
   * **Connection Type:** select **HTTP**.
   * **Git Account URL:** enter `https://github.com/wings-software/harness-docs.git`.
   * **Username and Token:** Enter the username and a Github Personal Access Token for your Github account. You'll have to create a Harness secret for the password.
     * In **Personal Access Token**, click **Create or Select a Secret**.
     * Click **New Secret Text**.
     * In **Secret Name**, enter a name for the secret like **github-pat**.
     * In **Secret Value**, paste in a GitHub Personal access token. When you're logged into GitHub, these are typically listed at <https://github.com/settings/tokens>. For steps on setting up a GitHub PAT, see [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) from GitHub.
     * Ensure you PAT has the **repo** scope selected:

       ![](static/repoScope.png)
7. Click **Continue**.
8. In **Connect to the provider**, select **Connect through a Harness Delegate**, and then click **Continue**.
   We don't use the **Connect through Harness Platform** option here simply because you'll need a Delegate later for the connection to your target Kubernetes cluster. Typically, the **Connect through Harness Platform** option is a very quick way to make connections without having to use Delegates.
9. In **Delegates Setup**, click **Install new Delegate**.
   The Delegate wizard appears.
   
   ![](./static/kustomize-quickstart-69.png)

10. Click **Kubernetes**, and then click **Continue**.

   ![](./static/kustomize-quickstart-71.png)

11. Enter a name for the Delegate, like **quickstart**, click the **Small** size.
12. Click **Continue**.
13. Click **Download Script**. The YAML file for the Kubernetes Delegate will download to your computer as an archive.
14. Open a terminal and navigate to where the Delegate file is located.
   You will connect to your cluster using the terminal so you can simply run the YAML file on the cluster.
15. In the same terminal, log into your Kubernetes cluster. In most platforms, you select the cluster, click **Connect**, and copy the access command.
16. Next, install the Harness Delegate using the **harness-delegate.yaml** file you just downloaded. In the terminal connected to your cluster, run this command:
    ```
    kubectl apply -f harness-delegate.yaml
    ```
    You can find this command in the Delegate wizard:

    ![](./static/kustomize-quickstart-72.png)

    The successful output is something like this:
    ```
    % kubectl apply -f harness-delegate.yaml  
    namespace/harness-delegate unchanged  
    clusterrolebinding.rbac.authorization.k8s.io/harness-delegate-cluster-admin unchanged  
    secret/k8s-quickstart-proxy unchanged  
    statefulset.apps/k8s-quickstart-sngxpn created  
    service/delegate-service unchanged
    ```
17. In Harness, click **Verify**. It will take a few minutes to verify the Delegate. Once it is verified, close the wizard.
18. Back in **Set Up Delegates**, you can select the new Delegate.
    In the list of Delegates, you can see your new Delegate and its tags.
19. Select the **Connect using Delegates with the following Tags** option.
20. Enter the tag of the new Delegate and click **Save and Continue**.
    When you are done, the Connector is tested.
21. Click **Continue**.
22. In **Manifest Details**, enter the following settings, test the connection, and click **Submit**.
    We are going to provide connection and path information for a kustomization located at `https://github.com/wings-software/harness-docs/blob/main/kustomize/helloWorld/kustomization.yaml`.
    * **Manifest Identifier:** enter **kustomize**.
    * **Git Fetch Type**: select **Latest from Branch**.
    * **Branch:** enter **main**.
    * **Kustomize Folder Path:** enter `kustomize/helloWorld`. This is the path from the repo root.
    The kustomization is now listed.

    ![](./static/kustomize-quickstart-73.png)

23. Click **Next** at the bottom of the **Service** tab.

Now that the kustomization is defined, you can define the target cluster for your deployment.

## Step 3: Define Your Target Cluster

The target cluster is your own Kubernetes cluster, hosted in your cloud environment. This is where we will deploy the kustomization and its Docker image.

Harness connects to all of the common cloud platforms and provides a platform-agnostic Kubernetes cluster connection that can connect to Kubernetes anywhere.

1. In **Infrastructure Details**, in **Specify your environment**, click **New Environment**. Just like with a Service, you can create a new Environment or selecting an existing one. We'll create a new one.
2. In **New Environment**, enter a name, select **Non-Production**, and click **Save**. The new Environment appears.
3. In **Infrastructure Definition**, click **Kubernetes**.
    :::note

    Let's take a moment and review Harness Environments and Infrastructure Definitions. Harness Environments represent your deployment targets logically (QA, Prod, etc). You can add the same Environment to as many stages are you need. Infrastructure Definitions represent your target infrastructure physically. They are the actual clusters, hosts, etc.  
    By separating Environments and Infrastructure Definitions, you can use the same Environment in multiple stages while changing the target infrastructure settings with each stage.

    :::
1. An **Infrastructure Definition** is where you specify the target for your deployment. In this case, your Kubernetes cluster and namespace.
2. In **Cluster details**, in **Connector**, click **Select a connector**.
3. Click **New Connector**.
   The Kubernetes Cluster Connector appears.

   ![](./static/kustomize-quickstart-74.png)

The Kubernetes Cluster Connector is covered in detail [here](../../../platform/7_Connectors/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md), but let's quickly walk through it.

Let's look at the steps:

1. In **Kubernetes Cluster Connector**, in **Name**, enter **Kustomize Quickstart**, and click **Continue**.
2. In **Details**, select **Use the credentials of a specific Harness Delegate**. We will select the Delegate next.

   ![](./static/kustomize-quickstart-75.png)

3. Click **Continue**.
4. Select the Kubernetes Delegate you added earlier using its Tags, and then click **Save and Continue**.
   Harness verifies the Connector.
5. Click **Finish**.
6. Select the new Connector and then click **Apply Selected**.
7. Back in **Cluster Details**, in **Namespace**, enter the target namespace for the deployment. For example, **default**. You can use any namespace in your target cluster.
8.  When you are done, **Cluster Details** will look something like this:

   ![](./static/kustomize-quickstart-76.png)

   The target infrastructure is complete. Now we can add our stage steps.
9.  Click **Next**.

## Step 4: Add a Rollout Deployment Step

When you click **Next** the [deployment strategy](../../cd-deployments-category/deployment-concepts.md) options are provided:

![](./static/kustomize-quickstart-77.png)

1. Click **Rolling**, and then click **Apply**.

The Rollout Deployment step is added. There's nothing to set up. Harness will perform a Kubernetes rolling update in your target cluster automatically.

## Step 5: Deploy and Review

1. Click **Save** and then **Run**.
2. Click **Run Pipeline**. Harness will verify the Pipeline and Connectors and then run the Pipeline.
   There are no artifacts to select because the NGINX artifact is hardcoded in the kustomization.
   You can see the status of the deployment, and pause or abort it.

   ![](./static/kustomize-quickstart-78.png)

3. Toggle **Console View** to watch the deployment with more detailed logging.Click the **Rollout Deployment** step.

   ![](./static/kustomize-quickstart-79.png)

4. Expand **Fetch Files** to see Harness fetch the repo, including the kustomization files.
5. In **Initialize** you can see the manifest rendered using the kustomization and then validated with a `kubectl dry run`.
6.  Expand **Wait for Steady State**. You will the pods reach steady state:

   `Status : "the-deployment" successfully rolled out`

Congratulations! The deployment was successful.

In your Project's Deployments, you can see the deployment listed:

![](./static/kustomize-quickstart-80.png)

If you run into any errors, it is typically because the cluster does meet the requirements from [Before You Begin](kubernetes-cd-quickstart.md#before-you-begin) or the cluster's network setting does not allow the Delegate to connect to Docker Hub.

In this tutorial, you learned how to:

* Install and launch a Harness Kubernetes Delegate in your target cluster.
* Connect Harness to your Kubernetes cluster and Git provider.
* Add your kustomization files to Harness.
* Create an Infrastructure Definition that targets your cluster and namespace.
* Add a Kubernetes rolling update.
* Deploy your Kustomize Pipeline to your target cluster.

Next, try the following quickstarts:

* [Kubernetes deployment tutorial](kubernetes-cd-quickstart)
* [Helm Chart deployment tutorial](helm-cd-quickstart)

### Clean Up

For steps on deleting the Delgate, go to [Delegate a delegate](../../../platform/2_Delegates/delegate-guide/delete-a-delegate.md).

### Next Steps

See [Use Kustomize for Kubernetes Deployments](../../cd-advanced/kustomize-howtos/use-kustomize-for-kubernetes-deployments) for more details on all the settings and Kustomize support in Harness.

