---
title: Azure ACR to AKS deployment tutorial
description: This topic walks you through deploying an image from Azure ACR to Azure AKS using Harness.
sidebar_position: 6
helpdocs_topic_id: m7nkbph0ac
helpdocs_category_id: c9j6jejsws
helpdocs_is_private: false
helpdocs_is_published: true
---

This quickstart deploys a Docker image in your Azure Container Registry (ACR) repo to your Azure Kubernetes Service (AKS) cluster. Once you've completed this quickstart, you'll be able to easily set up Harness for your own Azure dev, qa, and production deployments.

## Objectives

You'll learn how to:

* Set up an ACR to AKS Kubernetes Pipeline in Harness.
* Install and launch a Harness Kubernetes Delegate in your target AKS cluster.
* Connect Harness to your Azure account using a Harness Azure Connector.
* Run the new Kubernetes Pipeline and deploy a Docker image to your target cluster.

## Before You Begin

Review [Harness Key Concepts](../../../first-gen/starthere-firstgen/harness-key-concepts.md) to establish a general understanding of Harness.Make sure you have the following set up before you begin this quickstart:

* **GitHub account:** this quickstart uses publicly available manifests and values YAML files, but GitHub requires that you use a GitHub account for fetching files.
* **Azure ACR and AKS Permissions:** make sure you have a Service Principal or Managed Identity you can use to connect Harness to your Azure App registration, and that it has the required permissions:
	+ **ACR:** the **Reader** role must be assigned.
	+ **AKS:** the **Owner** role must be assigned.
	+ For a custom role, see the permissions in [Add a Microsoft Azure Cloud Connector](../../../platform/7_Connectors/add-a-microsoft-azure-connector.md).

* **AKS Cluster:** you'll need a target AKS cluster for the deployment. Ensure your cluster meets the following requirements:
  * **Number of nodes:** 2.
  * **vCPUs, Memory, Disk Size:** 4vCPUs, 16GB memory, 100GB disk. In AKS, the **Standard DS2 v2** machine type is enough for this quickstart.
  * **Networking:** outbound HTTPS for the Harness connection to **app.harness.io**, **github.com**, and **hub.docker.com**. Allow TCP port 22 for SSH.

## Step 1: Create the Deploy Stage

Pipelines are collections of stages. For this quickstart, we'll create a new Pipeline and add a single stage.

:::note

**Create a Project for your new CD Pipeline:** if you don't already have a Harness Project, create a Project for your new CD Pipeline. Ensure that you add the **Continuous Delivery** module to the Project. See [Create Organizations and Projects](../../../platform/1_Organizations-and-Projects/2-create-an-organization.md).In your Harness Project, click **Deployments**, and then click **Create a** **Pipeline**.

:::

1. In your Harness Project, click **Deployments**, and then click **Create a Pipeline**.
2. Enter the name **Azure Quickstart** and click **Start**.

  Your Pipeline appears.

  Do the following:

1. Click **Add Stage** and select **Deploy**.
2. Enter the name **Deploy Service**, make sure **Service** is selected, and then click **Set Up Stage**.
3. The new stage settings appear.
4. In **About the** **Service**, click **New Service**.
5. Give the Service the name **quickstart** and click **Save**.

:::note

Let's take a moment and review Harness Services and Service Definitions (which are explained below). Harness Services represent your microservices/apps logically. You can add the same Service to as many stages as you need. Service Definitions represent your artifacts, manifests, and variables physically. They are the actual files and variable values. 

By separating Services and Service Definitions, you can propagate the same Service across stages while changing the artifacts, manifests, and variables with each stage. Once you have created a Service, it is persistent and can be used throughout the stages of this or any other Pipeline in the Project.

::: 


## Step 2: Add the Manifest and Values YAML

Next, we can add a Kubernetes manifest for our deployment. We'll use [publicly-available manifests and a values file](https://github.com/wings-software/harness-docs/tree/main/default-k8s-manifests/Manifests/Files) available from Harness.

1. In **Service Definition**, in **Deployment Type**, click **Kubernetes**.
2. In **Manifests**, click **Add Manifest**.
3. Select **K8s Manifest**, and click **Continue**.
4. In **Select K8sManifest Store**, click **GitHub**, and then click **New GitHub Connector**.
5. The **Git Connector** settings appear. Enter the following settings.
  1. **Name:** enter a name for the Connector, like **Quickstart**.**URL Type:** select **Repository**.**Connection Type:** select **HTTP**.**Git Repository URL:** enter `https://github.com/wings-software/harness-docs.git`.
  2. **Username and Token:** enter the username and a Github Personal Access Token for your Github account. You'll have to create a Harness secret for the password.
  3. In **Personal Access Token**, click **Create or Select a Secret**.
  4. Click **New Secret Text**.
  5. In **Secret Name**, enter a name for the secret like **github-pat**.
  6. In **Secret Value**, paste in a GitHub Personal access token. When you're logged into GitHub, these are typically listed at <https://github.com/settings/tokens>. For steps on setting up a GitHub PAT, see [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) from GitHub.
  7. Ensure you PAT has the **repo** scope selected:
  
  ![](static/azure-repo.png)
  
1. Click **Continue**.
2. In **Connect to the provider**, select **Connect through a Harness Delegate**, and click **Continue**. 
  
  Now we'll add a Harness Delegate to your Environment.
  
  The Harness Delegate is a software service you install in your environment that connects to the Harness Manager and performs tasks using your container orchestration platforms, artifact repositories, monitoring systems, etc.
  
3. In **Delegates Setup**, click **Install new Delegate**.

  The Delegate wizard appears.

  ![](./static/azure-cd-quickstart-97.png)

1. Click **Kubernetes**, and then click **Continue**.

  ![](./static/azure-cd-quickstart-99.png)

1. Enter a name for the Delegate, like **quickstart**, click the **Small** size.
2. Click **Continue**.
3. Click **Download YAML file**. The YAML file for the Kubernetes Delegate will download to your computer.
4. Open a terminal and navigate to where the Delegate file is located. You will connect to your cluster using the terminal so you can simply run the YAML file on the cluster.
5. In the same terminal, log into your Kubernetes cluster. In most platforms, you select the cluster, click **Connect**, and copy the access command.
6. Next, install the Harness Delegate using the **harness-delegate.yaml** file you just downloaded. In the terminal connected to your cluster, run this command:

  ```
  kubectl apply -f harness-delegate.yml
  ```
  You can find this command in the Delegate wizard:

  ![](./static/azure-cd-quickstart-100.png)

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
2. Back in **Set Up Delegates**, you can select the new Delegate. In the list of Delegates, you can see your new Delegate and its tags.
3. Select the **Connect using Delegates with the following Tags** option.
4. Enter the tag of the new Delegate and click **Save and Continue**.
5. In **Connection Test**, you can see that the connection is successful. Click **Finish**.
6. Back in **Specify K8s Manifest Store**, click **Continue**.
7. In **Manifest Details**, enter the following settings, test the connection, and click **Submit**.

  We are going to provide connection and path information for a manifest located at `https://github.com/wings-software/harness-docs/tree/main/default-k8s-manifests/Manifests/Files/templates`.
   1. **Manifest Identifier:** enter **manifests**.
   2. **Git Fetch Type:** select **Latest from Branch**.
   3. **Branch:** enter **main**.
   4. **File/Folder path:**`default-k8s-manifests/Manifests/Files/templates` 
  
  This is the path from the repo root. The manifest is now listed.

  ![](./static/azure-cd-quickstart-101.png)

  Next, let's add the values.yaml file for the deployment.

  Harness supports Go templating with a Values YAML file by default so you can template your manifests. Also, you can use [Harness expressions](../../../platform/12_Variables-and-Expressions/harness-variables.md) in your values.yaml file. 

  We will use a [values.yaml file](https://github.com/wings-software/harness-docs/blob/main/default-k8s-manifests/Manifests/Files/ng_values_dockercfg.yaml) that uses the `<+artifact.image>` expression to reference the artifact you will add later in **Artifacts**.The values file looks like this:

    ```yaml
    name: harness-quickstart  
    replicas: 1  
      
    image: <+artifact.image>  
    dockercfg: <+artifact.imagePullSecret>  
      
    createNamespace: true  
    namespace: <+infra.namespace>  
      
    # Service Type allow you to specify what kind of service you want.  
    # Possible values for ServiceType are:  
    # ClusterIP | NodePort | LoadBalancer | ExternalName  
    serviceType: LoadBalancer  
      
    # A Service can map an incoming port to any targetPort.  
    # targetPort is where application is listening on inside the container.  
    servicePort: 80  
    serviceTargetPort: 80  
      
    # Specify all environment variables to be added to the container.  
    # The following two maps, config and secrets, are put into a ConfigMap  
    # and a Secret, respectively.  
    # Both are added to the container environment in podSpec as envFrom source.  
    env:  
      config:  
        key1: value1  
      secrets:  
        key2: value2
    ```

1. Click **Add Manifest**.
2. In **Specify Manifest Type**, select **Values YAML**, and click **Continue**.
3. In **Specify Values YAML Store**, select the same GitHub Connector you used for your manifests, and then click **Continue**.
   1. In **Manifest Details**, enter the following and click **Submit**.
   2. **Manifest Identifier:** `values`.
   3. **Git Fetch Type:** `Latest from Branch`.
   4. **Branch:** `main`.
   5. **File Path:** `default-k8s-manifests/Manifests/Files/ng_values_dockercfg.yaml`.

The values file is listed.

![](./static/azure-cd-quickstart-102.png)

Next, let's add your artifact from ACR.

## Step 3: Add the Artifact

Now you can add an artifact from your ACR repo. We'll create a Harness Azure Connector to connect Harness with your ACR repo.

1. In **Artifacts**, click **Add Primary** **Artifact**.
2. In **Artifact Repository Type**, click **ACR**, and then click **Continue**.
3. In **ACR Repository**, click **New Azure Connector**.
4. Enter a name for the Connector, such as **Azure Quickstart**, and click **Continue**.
5. In **Details**, click **Specify credentials here**.
6. Enter the credentials for the Azure App registration you want to use. Here's an example of how App registration settings map to the Connector's **Details**:

  ![](./static/azure-cd-quickstart-103.png)

   + **Azure ACR and AKS Permissions:** make sure the Service Principal or Managed Identity has the [required permissions](../../../platform/7_Connectors/add-a-microsoft-azure-connector.md):
     
     + **ACR:** the **Reader** role must be assigned.
     + **AKS:** the **Owner** role must be assigned.
     + For a custom role, see the permissions in [Add a Microsoft Azure Cloud Connector](../../../platform/7_Connectors/add-a-microsoft-azure-connector.md).
  
1. Click **Continue**.
2. In **Delegates Setup**, click **Only use Delegates with all of the following tags**, and then select the Delegate you added earlier.
3. Click **Save and Continue**.
4. The Connection Test is performed. Once it's completed, you'll be back in **ACR Repository**. Click **Continue**.
5. In **Artifact Details**, select the Subscription Id where the artifact source is located.
6. In **Registry**, select the ACR registry to use.
7. In **Repository**, select the repo to use.
8. In **Tag**, enter or select the tag for the image.

  Here's an example of how ACR settings map to **Artifact Details**:

  ![](./static/azure-cd-quickstart-104.png)

1. Click **Submit**. The Artifact is added to the Service Definition.

  ![](./static/azure-cd-quickstart-105.png)

  Now that the artifact and manifest are defined, you can define the target cluster for your deployment.

1. Click **Next** at the bottom of the **Service** tab.

## Step 4: Define Your Target Cluster

The target cluster is your own AKS cluster, hosted in your Azure cloud. This is where we will deploy your ACR image using the manifest you selected.

1. In **Infrastructure Details**, in **Specify your environment**, click **New Environment**. Just like with a Service, you can create a new Environment or selecting an existing one. We'll create a new one.
2. In **New Environment**, enter a name, select **Pre-Production**, and click **Save**. The new Environment appears.
3. In **Infrastructure Definition**, click **Microsoft** **Azure**.

  ![](./static/azure-cd-quickstart-106.png)

  :::note

  Let's take a moment and review Harness Environments and Infrastructure Definitions. Harness Environments represent your deployment targets logically (QA, Prod, etc). You can add the same Environment to as many stages as you need. Infrastructure Definitions represent your target infrastructure physically. They are the actual clusters, hosts, etc.  
    
  By separating Environments and Infrastructure Definitions, you can use the same Environment in multiple stages while changing the target infrastructure settings with each stage.An **Infrastructure Definition** is where you specify the target for your deployment. In this case, your Kubernetes cluster and namespace.

  :::

1. In **Cluster details**, enter the following.
2. In **Connector**, click **Select a connector**.
3. Select the Azure Connector you added earlier, and then click **Apply Selected**.
4. In **Subscription Id**, select the Subscription where you AKS cluster is located.
5. In **Resource Group**, enter the resource group for your AKS cluster.
6. In **Cluster**, select the cluster name.
7. In **Namespace**, enter an existing namespace, such as **default**.

Now that the Stage's Infrastructure is complete, you can select the [deployment strategy](../../cd-deployments-category/deployment-concepts.md) for this stage of the Pipeline.

## Step 5: Add a Rollout Deployment Step

1. Click **Continue**.
2. In **Execution Strategies**, select **Rolling**, and then click **Use Strategy**.

  ![](./static/azure-cd-quickstart-107.png)
  
  The **Rollout Deployment** step is added.

  ![](./static/azure-cd-quickstart-108.png)
  
  This is a standard [Kubernetes rolling update](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/). By default, Harness uses a `25% max unavailable, 25% max surge` strategy.

That's it. Now the Pipeline stage is complete and you can deploy.

## Step 6: Deploy and Review

1. Click **Save > Save Pipeline** and then **Run**.
2. Click **Run Pipeline**. Harness will verify the Pipeline and then run it.

You can see the status of the deployment, and pause or abort it.

![](./static/azure-cd-quickstart-109.png)

Toggle **Console View** to watch the deployment with more detailed logging.

Click the **Rollout Deployment** step and expand **Wait for Steady State**.

You can see `deployment "[name]" successfully rolled out`.

Congratulations! The deployment was successful.

## Clean Up

To delete the Harness Delegate from your Kubernetes cluster, go to [Delete a Delegate](../../../platform/2_Delegates/delegate-guide/delete-a-delegate.md).

## Next Steps

See [advanced Kubernetes](/docs/category/kubernetes) for other deployment features.

