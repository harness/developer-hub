---
title: Kubernetes Quickstart
description: Deploy a Docker image to your Kubernetes cluster using a Canary Deployment strategy.
sidebar_position: 60
helpdocs_topic_id: 7in9z2boh6
helpdocs_category_id: f6rh2cdvx9
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note
This content is for Harness [FirstGen](../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart.md).
:::

This quickstart shows you how to deploy a publicly available Docker image to your Kubernetes cluster using a Canary Deployment strategy in Harness.

## Objectives

You'll learn how to:

* Install and launch a Harness Kubernetes Delegate in your target cluster.
* Connect Harness to your Kubernetes cluster and an Artifact Server.
* Add your manifests to Harness.
* Create an Infrastructure Definition that targets your cluster and namespace.
* Create a Kubernetes Canary Workflow, using Canary and Primary (rollout) phases.
* Deploy your Kubernetes Canary Workflow to your target cluster.

## Before You Begin

Review [Harness Key Concepts](../starthere-firstgen/harness-key-concepts.md) to establish a general understanding of Harness.

Set up Your Kubernetes Cluster

Ensure you have a Kubernetes cluster you can use for this tutorial. Your Kubernetes cluster will host the Harness Kubernetes Delegate in one pod and a simple Todolist Docker container in the other pods.

This tutorial is vendor-agnostic. You can use any Kubernetes vendor, such as Google Kubernetes Engine (GKE), Amazon Elastic Kubernetes Service (EKS), or Azure Kubernetes Service (AKS).

If you have a cluster that meets the following requirements, then you can jump to [Step 1: Install and Launch the Kubernetes Delegate](#step_1_install_and_launch_the_kubernetes_delegate):

* **Number of nodes:** 3.
* **Machine type:** 4vCPU
* **Memory:** 12GB RAM and 6GB Disk Space. 8GB RAM is for the Delegate. The remaining memory is for Kubernetes and the Docker container.
* **Networking:** Outbound HTTPS for the Harness connection, and to connect to Docker Hub. Allow TCP port 22 for SSH.

**Need a cluster?** Follow steps from these vendors and ensure your cluster meets the requirements above:

* [Quickstart: Deploy an Azure Kubernetes Service cluster using the Azure CLI](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough) (node VM size minimum: Standard\_DS3\_v2)
* [Creating a clster from Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster) (machine type minimum: n2-standard-4)
* [Creating an Amazon EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html) (node type minimum: m5.xlarge)

## Visual Summary

Once you've completed this tutorial, you'll deploy a Docker image to your Kubernetes cluster using a Harness Canary Workflow. Here's what your deployment will look like:

![](./static/kubernetes-quickstart-91.gif)Interested? You're only a few minutes away from doing it yourself. Let's get started.

## Step 1: Install and Launch the Kubernetes Delegate

In this section, we'll download a new Harness Kubernetes Delegate and install and launch it in your target cluster. Running the Delegate as a pod in the same cluster used to deploy the your application is the recommended practice.

Before installing the Delegate, ensure that you have **kubectl** installed in your Kubernetes cluster. For **kubectl** installation steps, see [Install and Set Up kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) from Kubernetes.

### Download the Delegate

1. Sign in Harness.
2. In the Harness Manager, select **Setup**. **Setup** is where you configure your microservices, their deployment pipelines, and all the building blocks and resources for those pipelines.
3. Select **Harness Delegates**.
4. Select **Download Delegate**, and then select **Kubernetes YAML**. The Delegate Setup settings appear.
5. In **Name**, enter the name **k8s-delegate** exactly.![](./static/kubernetes-quickstart-92.png)
6. In **Profile**, select the Primary Profile.
7. Select **Download**. The YAML file for the Kubernetes Delegate, and its README, downloads to your computer as an archive.
8. Open a terminal and navigate to where the Delegate file is located.
9. Extract the YAML file's folder from the download and then navigate to the **harness-delegate-kubernetes** folder that you extracted:

  ```
  tar -zxvf harness-delegate-kubernetes.tar.gz  
    
  cd harness-delegate-kubernetes
  ```

You will connect to your cluster using the terminal so you can simply copy the YAML file over.

### Install and Launch the Delegate

1. Sign in your Kubernetes cluster. For example, if your Kubernetes cluster is in Google Cloud Platform, select the cluster, select **Connect**, and from the resulting **Connect to the cluster** setting, copy the **Command-line access command**.
2. In the terminal you used to navigate to the **harness-delegate** folder, paste the command and press **Enter**.  
You are now connected to the Kubernetes cluster. If the connection is unsuccessful, ensure that the GCE firewall is not blocking port 22 to your VMs. For more information, see [Debug Running Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/) from Kubernetes.
3. Let's quickly confirm that the cluster you created can connect to the Harness platform. Enter the following command:
    ```
    wget -p https://app.harness.io/ -O /dev/null
    ```
    A successful connection will display the following:
    ```
    HTTP request sent, awaiting response... 200 OK
    ```
4. Next, install the Harness Delegate using the **harness-delegate.yaml** file you just downloaded. In the terminal connected to your cluster, run this command:

    ```
    kubectl apply -f harness-delegate.yaml
    ```
    If you are not using your terminal to connect to your cluster, just copy the **harness-delegate.yaml** file to the cluster and run the command.
    
5. Run this command to verify that the Delegate pod was created:
    ```
    kubectl get pods -n harness-delegate
    ```

It will take a moment for the Delegate to appear in Harness' **Installations** page.

Now you're ready to connect Harness to your artifact server and cluster. After those quick steps, you'll begin creating your deployment.

:::note 
When you onboard your own applications, you might need to install multiple Delegates, depending on their workloads, network segmentation, and firewall zones. Typically, you will need one Delegate for every 300-500 service instances across your applications, and will need one Delegate in each subnet or zone.
:::

## Step 2: Add a Kubernetes Cluster Cloud Provider

A Harness Cloud Provider represents your infrastructure, such as a Kubernetes cluster, AWS account, Google service account, Azure subscription, data center, etc.

The Kubernetes Cluster Cloud Provider you will add now will connect Harness with your Kubernetes cluster using the Delegate you installed.

1. In **Harness Manager**, select **Setup**.
2. Select **Cloud Providers**. On the **Cloud Providers** page, select **Add Cloud Provider**. The Cloud Provider appears.
3. Enter the following settings:

   * **Type:** Select Kubernetes Cluster.
   * **Display Name:** Enter **K8s Tutorial**. You will use this name later to select this Cloud Provider when you create a Harness Infrastructure Definition.
   * **Inherit from selected Delegate:** Enable this option. Since the Delegate is already installed in the target cluster, you can use the Delegate's credentials for this Cloud Provider. This is the recommended configuration.
   * **Delegate Name:** Select the name of the Delegate you installed in your cluster: **k8s-delegate**.
   * **Select Skip Validation:** Enable this option.
   * **Usage Scope:** Don't change this setting. Usage Scope limits the use of a Cloud Provider to specific Harness Applications and Environments. For this tutorial, we will use the default scopes.

3. Select **Test**. Verify that the `The test was successful message` appears, and then select **Submit**.

Your Kubernetes Cloud Provider is set up. Now let's add an Artifact Server for pulling the Docker image.

## Step 3: Add a Docker Registry Artifact Server

Harness integrates with many different types of repositories and providers. For this tutorial, you will connect to Docker Hub anonymously.

1. In **Setup**, select **Connectors**.
2. Select **Artifact Servers**, and then select **Add Artifact Server**. The **Docker Artifact Server** settings appear.
3. Enter the following settings:

   * **Type:** Select **Docker Registry**.
   * **Display Name:** Enter **Docker Hub**. You will use this name to select this Artifact Server later when you add an artifact to a Harness Service.
   * **Docker Repository URL:** Enter `https://registry.hub.docker.com/v2/`.
   * **Username and Password:** Leave these empty.

3. Select Test, and then select **SUBMIT**.

:::note 
If the test fails, it is possible that the Harness Delegate you installed cannot connect to https://registry.hub.docker.com/v2/. Ensure that the pod where the Delegate is installed can connect to that address.
:::

We don't need any other connectors for this tutorial. Next, we'll add the Docker image artifact and Kubernetes manifests.

## Step 4: Add Your Artifact and Kubernetes Manifests

Now that all your connections are set up, you can start adding the manifests for your Kubernetes workloads.

First, we'll create a Harness Application and Service, and look at manifests.

### Create a Harness Application

1. In **Setup**, select **Add Application**. The Application settings appear.
2. Enter the name **K8s Tutorial** and select **Submit**.![](./static/kubernetes-quickstart-93.png)

The Application is created.

![](./static/kubernetes-quickstart-94.png)We won't cover all of the Application entities in this tutorial. We assume you've read [Harness Key Concepts](../starthere-firstgen/harness-key-concepts.md).

### Create a Harness Service

To add your manifests, you create a Harness Service. Services represent your microservices/apps. You define the sources of app artifacts for those microservices, and you add your manifests.

1. Select **Services**.
2. In **Services**, select **Add Service**. The Add Service settings appear.
3. Enter the following settings:

   * **Name:** Enter **MyApp K8s**.
   * **Deployment Type:** Select **Kubernetes**.
  * **Enable Kubernetes V2:** If this option is available, select it.

4. Select **Submit**. The new Service page appears.

![](./static/kubernetes-quickstart-95.png)

### Add an Artifact Source

First, we'll add a Docker image using the Artifact Server you created and then look at manifests.

1. Select **Add Artifact Source** and then select **Docker Registry**. The **Artifact Source - Docker Registry** settings appear.
2. Enter the following settings:

   * **Source Server:** Select the Artifact Server you added earlier, **Docker Hub**.
   * **Docker Image Name:** Enter `library/nginx`.

3. Select **Submit**. The artifact source is added.

You can pull a list of artifacts from the source using **Artifact History**.Now that the artifact source is added, you can add your manifests.

When you create a Service for your Harness application, you can link to your manifests in a source repo or a Helm chart in a source or Helm repo.

![](./static/kubernetes-quickstart-96.png)

For this tutorial we will use the default manifests provided by Harness. The default manifests define the Deployment workload for the application, with one pod for the application.

Harness supports [Go templating](https://golang.org/pkg/text/template/) for manifests, and its default manifest files use an included values.yaml file for the manifest values.

![](./static/kubernetes-quickstart-97.png)

:::note
For this tutorial we are using anonymous access to the Docker Hub registry, so `imagePullSecrets` isn't needed in the Deployment object definition to store the Docker credentials. The default manifests include `imagePullSecrets` because you will typically use it.
:::

Our artifact is added and the manifests are ready. Next, we can define our target cluster and namespace for deployment.

## Step 5: Define Your Target Kubernetes Cluster

Harness uses Environments to represent one or more of your deployment infrastructures, such as Dev, QA, Stage, Production, etc.

In each Environment, you define Infrastructure Definitions to describe your deployment infrastructures. A single Infrastructure Definition can be used by multiple Services, pulling unique Kubernetes namespace values from each Service during deployment.

1. Use the breadcrumb navigation to jump to **Environments**.![](./static/kubernetes-quickstart-98.png)
2. In **Environments**, select **Add Environment**. The **Environment** settings appear.
3. Enter the following settings:

   * **Name:** Enter **Tutorial Cluster**.
   * **Environment Type:** Select **Non-Production**.

4. Select **Submit**. The Environment is created. Next we will add an Infrastructure Definition to identify the cluster and namespace for our deployment.
5. Select **Add Infrastructure Definition**. The Infrastructure Definition settings appear.
6. Enter the following settings:

   * **Name:** Enter **Tutorial Namespace**.
   * **Cloud Provider Type:** Select **Kubernetes Cluster**.
   * **Deployment Type:** Select **Kubernetes**.
   * **Cloud Provider:** Select the Cloud Provider you added earlier in this tutorial, **K8s Tutorial**.
   * **Namespace:** Enter the namespace you want to use in your cluster. The `default` namespace is entered by default.
   * **Release Name:** Leave the default `release-${infra.kubernetes.infraId}`. Harness uses this name for tracking releases for rollback, etc.

7. Select **Submit**. Your target infrastructure is defined. You can now use it and the Harness Service you set up to build your Canary Workflow.

## Step 6: Build a Canary Deployment

Now that you have a Docker image and target cluster and namespace, you can create a Harness Workflow to deploy the image to the cluster.

In this tutorial, we will use the popular Canary Deployment strategy. In Canary, all pods in a single cluster are updated incrementally in small phases, with each phase verified as successful before proceeding to the next phase.

To learn more about Canary deployments, see [Deployment Concepts and Strategies](../continuous-delivery/concepts-cd/deployment-types/deployment-concepts-and-strategies.md).

1. Use the breadcrumb navigation to jump to **Workflows**, and then select **Add Workflow**. The Workflow settings appears.
2. Enter the following settings:

   * **Name:** Enter **MyApp K8s Canary**.
   * **Workflow Type:** Select **Canary Deployment**.
   * **Environment:** Select the Environment you created earlier, **Tutorial Cluster**.

3. Select **Submit**. The Workflow is created.

   ![](./static/kubernetes-quickstart-99.png)

   Next, well add the first phase of our Canary Workflow.

4. In **Deployment Phases**, select **Add Phase**. The Add Phase settings appear.
5. Enter the following settings:

   * **Service:** Select the Harness Service you created for this tutorial, **MyApp K8s**.
   * **Infrastructure Definition:** Select the Infrastructure Definition you created for this tutorial, **Tutorial Namespace**.
   * **Service Variable Overrides:** You can leave this setting blank. The purpose of Service Variable Overrides is to let you change any Config Variables created in the Service when the Workflow executes.

7. Select **Submit**. The Phase is added to the Workflow.

   ![](./static/kubernetes-quickstart-100.png)
   
   Harness adds the necessary steps automatically, but you can edit or add more as needed.

   Let's take a look at the **Canary Deployment** step. The Canary Deployment step defines how many pods are deployed for a Canary test of the configuration files in your Harness Service manifests.

8. Select the **Canary Deployment** step.
9. Review the following settings:

   * **Instance Unit Type**: You can specify the number of replicas to deploy using **COUNT** or **PERCENTAGE**.
	   + **COUNT:** This is simply the number of replicas.
	   + **PERCENTAGE:** This is a percentage of the replicas defined in your Service manifests files. For example, in you have `replicas: 4` in a manifest in Service, and you enter **50** in **Instances**, then 2 pods are deployed in this Phase step.
   * **Instances:** This is the number of replicas to deploy.
   * **Delegate Selector:** Leave this empty.
   * **Skip Dry Run:** Do not select this option. By default, Harness uses the `--dry-run` flag on the `kubectl apply` command during the initial commands of this step. If the **Skip Dry Run** option is selected, Harness will not use the `--dry-run` flag.

   For this tutorial, we'll use the default settings.

10. Close **Canary Deployment**.

   The Canary Delete step in the Wrap Up section deletes the workloads deployed successfully in this phase. Once the Canary Deployment step is successful, you don't need those workloads. You can move onto to deploying the workloads in a second phase, confident that they will deploy.

   Next, we'll add the Primary phase using a Kubernetes rolling update.

11. In the breadcrumb navigation, select the name of the Workflow, **MyApp K8s Canary**. This takes you back to the main Workflow page.
12. In **Deployment Phases**, select **Add Phase**.
13. Enter the following settings:

   * **Service:** Select the Harness Service you created for this tutorial, **MyApp K8s**.
   * **Infrastructure Definition:** Select the Infrastructure Definition you created for this tutorial, **Tutorial Namespace**.

14. Select **Submit**. The new phase is added.

   ![](./static/kubernetes-quickstart-101.png)

   Let's take a look at the **Rollout Deployment** step.

   This step performs a standard Kubernetes rolling update, incrementally updating pod instances with new ones. The new pods are scheduled on nodes with available resources. The rolling update Deployment uses the number of pods you specified in the Harness Service Manifests (number of replicas).

15. Select **Rollout Deployment**. The Rollout Deployment settings appear.

  ![](./static/kubernetes-quickstart-102.png)
  
  There's nothing to configure in this step. Select **Submit** to exit.

   That's it. The Canary Workflow is complete. Next, we'll deploy the Workflow to your cluster.

16. In the breadcrumb navigation, select the name of the Workflow, **MyApp K8s Canary**. This takes you back to the main Workflow page where both phases are visible.

   ![](./static/kubernetes-quickstart-103.png)
   
## Step 7: Deploy and Review

Now that your Kubernetes Canary Workflow is complete you can deploy it to your cluster.

1. If you're not already on the main Workflow page, use the breadcrumb navigation to navigate to **MyApp K8s Canary**.
2. Select the **Deploy** button. The Deploy settings appear.
3. Enter the following settings:

   * **Artifacts > MyApp K8s:** Select an artifact from the Artifact Source you added to the Harness Service. In this tutorial, we are using a public nginx Docker image. Select a build/version such as **Tag# 1.9.15-alpine**.
   * **Send notification to me only:** Enable this setting if you are doing this tutorial using your corporate Harness account. Enabling this setting will ensure that other users won't be notified on this deployment.

3. Select **Submit**. The deployment executes.

Here's a example of what the deployment looks like typically, including the link Harness generates to the host running nginx:

![](./static/kubernetes-quickstart-104.gif)

Your deployment is complete.

If you run into any errors, it is typically because the cluster does meet the requirements from [Before You Begin](#before_you_begin) or the cluster's network setting do not allow the Delegate to connect to Docker Hub.

## One More Thing to Try

Now that you have a working Canary Workflow, you can templatize it so it can be used with multiple Services, Environments, and Infrastructure Definitions.

For the Workflow, you edit the Workflow settings and select the **[T]** next to **Environment**.

![](./static/kubernetes-quickstart-105.png)

For each Workflow Phase, you edit the Phase settings and select the **[T]** next to **Service**. The **[T]** was automatically selected for **Infrastructure Definition** when you selected the **[T]** for **Environment**.

![](./static/kubernetes-quickstart-106.png)

Now, when the Workflow is deployed, you can select other Services, Environments, and Infrastructure Definitions.

![](./static/kubernetes-quickstart-107.png)

The Workflow is also identified as a template on the Workflows page of your Application.

![](./static/kubernetes-quickstart-108.png)

## Next Steps

In this tutorial, you learned how to:

* Install and launch a Harness Kubernetes Delegate in your target cluster.
* Connect Harness to your Kubernetes cluster and an Artifact Server.
* Add your manifests to Harness, either inline or remotely, and even using Helm charts.
* Create an Infrastructure Definition that targets your cluster and namespace.
* Create a Kubernetes Canary Workflow, using a Canary and Primary (rollout) phase.
* Deploy your Kubernetes Canary Workflow to your target cluster.

Next, try the [Kubernetes Deployments Overview](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview.md) tutorial to learn how to use Harness for standard and Helm-based Kubernetes deployments.

Read the following related How-tos:

* [Triggers](../continuous-delivery/model-cd-pipeline/triggers/add-a-trigger-2.md) show you how to automate deployments in response to different events.
* [Infrastructure Provisioners Overview](../continuous-delivery/model-cd-pipeline/infrastructure-provisioner/add-an-infra-provisioner.md) will show you how to add provisioning as part of your Workflow.

