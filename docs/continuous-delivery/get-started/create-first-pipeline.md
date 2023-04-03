---
title: Create your first CD pipeline
description: Learn how to model you release process in minutes.
sidebar_position: 2
---

This is a step-by-step tour of using Harness CD pipelines to deploy an application. We show you how to use our YAML, API, and console methods for building pipelines.

<details>
<summary>Want to try out Harness CD locally?</summary>

You can also run all of Harness CD locally using the Harness CD Community Edition. 

Harness CD Community Edition is a lightweight version of Harness that you can download and run on your laptop or any VM with 3GB RAM and 2 CPUs. Harness CD Community Edition is intended to get devs started with Harness quickly without having to sign up for a Harness SaaS account.

For more information, go to:
- [Harness CD Community Edition Overview](../deploy-srv-diff-platforms/community-ed/harness-community-edition-overview)
- [Harness Community Edition deployments](../deploy-srv-diff-platforms/community-ed/harness-community-edition-quickstart)

</details>

## Prerequisites

All you need is a deployment environment and a Harness delegate installed where it can reach the environment and Harness. 

### Deployment environment

If you already have access to a cluster, you can skip this section. Simply install a Harness delegate in the cluster as described in the next section.

Here are several options, including popular cloud platforms and local options.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Minikube" label="Minikube (local)" default>
```

If you want to use Minikube, use Minikube minimum version v1.22.0 or later installed locally.

```
minikube start --memory=4g --cpus=1 --nodes=2
```

After running this command, you can verify that the cluster is running by running the following command:

```
kubectl get nodes
```

```mdx-code-block
  </TabItem>
  <TabItem value="Docker Desktop" label="Docker Desktop (local)">
```

To set up a Kubernetes cluster with 2 replicas, 4GB of memory, and 1 CPU in Docker Desktop, you can follow these steps:

1. Open Docker Desktop and go to the **Settings** menu.
2. Select the **Kubernetes** tab.
3. Enable Kubernetes by checking the **Enable Kubernetes** checkbox.
4. Set the number of replicas to **2** by adjusting the **Replicas** slider.
5. Set the amount of memory to **4GB** and the number of CPUs to **1** by adjusting the **Memory** and **CPU** sliders.
6. Select the **Apply & Restart** button to apply the changes and restart Docker Desktop.

After Docker Desktop restarts, you can verify that the cluster is running by running the following command:

```
kubectl get nodes
```

```mdx-code-block
  </TabItem>
  <TabItem value="Google GKE" label="Google GKE">
```

Replace ZONE with your GCP region, for example us-central1-c:

```
gcloud container clusters create [CLUSTER-NAME] --num-nodes=2 --machine-type=[MACHINE-TYPE] --disk-size=10GB --zone=[ZONE]
```

For example:

```
gcloud container clusters create my-cluster --num-nodes=2 --machine-type=n1-standard-1 --disk-size=10GB --zone=us-central1-a
```

After running this command, you can verify that the cluster is running by running the following command:

```
kubectl get nodes
```

```mdx-code-block
  </TabItem>
  <TabItem value="Azure AKS" label="Azure AKS">
```

Replace myResourceGroup with your AKS resource group:

```
az aks create -g myResourceGroup -n myAKSCluster --enable-managed-identity --node-count 2 --enable-addons monitoring --enable-msi-auth-for-monitoring --generate-ssh-keys
```

After running this command, you can verify that the cluster is running by running the following command:

```
kubectl get nodes
```

```mdx-code-block
  </TabItem>
  <TabItem value="AWS EKS" label="AWS EKS">
```

You can replace `my-cluster` and `my-nodegroup` with whatever names you want and `us-west-2` with the region you want to use:

```
eksctl create cluster --name=my-cluster --version=1.21 --nodegroup-name=my-nodegroup --node-type=t3.small --nodes-min=2 --nodes-max=2 --node-volume-size=20 --region=us-west-2
```

After running this command, you can verify that the cluster is running by running the following command:

```
kubectl get nodes
```

```mdx-code-block
  </TabItem>
</Tabs>
```

### Harness delegate

We now need to install a Harness delegate in the target Kubernetes cluster.

Delegates are worker processes that run on your infrastructure to execute tasks on behalf of the Harness platform. Delegates make outbound, secure connections to Harness and your other providers only.

<details>
<summary>Use the delegate installation wizard</summary>

1. In your Harness project, select **Project Setup**.
2. Select **Delegates**.
3. Select **Install a Delegate**.
4. Follow the delegate installation wizard.

Use this [delegate installation wizard video](https://www.youtube.com/watch?v=yLMCxs3onH8) to guide you through the process.

</details>


```mdx-code-block
import DelegateInstall from '/tutorials/platform/install-delegate.md';
```

<details>
<summary>Install a delegate using the terminal</summary>
<DelegateInstall />
</details>

For details and a video, go to [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview).


## Create your first pipeline

Harness provides multiple methods for creating your pipelines. 

The process is the same for all methods: 

- Define a Harness service that represents your app or microservice.
- Define a target environment.
- Define the pipeline execution steps. If you use the Harness Manager, Harness automatically adds the steps you need for different [deployment strategies](../manage-deployments/deployment-concepts).

First, let's add the manifest we'll be using to the Harness File Store in your project:

1. In your Harness project, select **Project Setup**, and then select **File Store**.
2. Select **New**, and then select **New File**.
3. Name the file **nginx-deployment.yaml**, in **File Usage** select **Manifest**, and the select **Create**.
4. Paste the following manifest into the new file and select **Save**.

<details>
<summary>nginx-deployment.yaml</summary>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

</details>


Next, choose one of the following methods for building your pipeline.

```mdx-code-block
import Tabs1 from '@theme/Tabs';
import TabItem1 from '@theme/TabItem';
```

<Tabs1>
  <TabItem1 value="YAML" label="YAML" default>

The following example creates the Harness entities needed for a simple pipeline that deploys a publicly available Docker Nginx image to your target cluster using the manifest we just added.

<details>
<summary>Create the Harness connector</summary>

We'll create a Harness Kubernetes Cluster connector to connect to your target cluster.

Kubernetes Cluster connector:

```yaml
connector:
  name: K8s Cluster
  identifier: K8s_Cluster
  description: ""
  orgIdentifier: default
  projectIdentifier: CD_Docs
  type: K8sCluster
  spec:
    credential:
      type: InheritFromDelegate
    delegateSelectors:
      - [delegate tag]
```

Replace `[delegate tag]` with tag of the delegate you installed in your cluster. For example:

![delete tag](static/095b88b33770e95a1b0dfcba3928c095a406af939bca367ba2fe8029d02fbb55.png)


</details>


<details>
<summary>Create the Harness service</summary>

The following service uses the manifest you added to the Harness File Store earier.

```yaml
service:
  name: Nginx
  identifier: Nginx
  tags: {}
  serviceDefinition:
    spec:
      manifests:
        - manifest:
            identifier: nginx
            type: K8sManifest
            spec:
              store:
                type: Harness
                spec:
                  files:
                    - /nginx-deployment.yaml
              skipResourceVersioning: false
              enableDeclarativeRollback: false
      artifacts:
        primary: {}
    type: Kubernetes
```

</details>


<details>
<summary>Create the Harness environment and infrastructure definition</summary>

First, create the Harness environment.

```yaml
environment:
  name: myenv
  identifier: myenv
  tags: {}
  type: PreProduction
  orgIdentifier: default
  projectIdentifier: CD_Docs
  variables: []
```
Next, create the infrastructure definition for that environment. This infrastructure definition uses the Kubernetes Cluster connector you created earlier and targets the `default` namespace. You can enter a different namespace.

```yaml
infrastructureDefinition:
  name: myinfra
  identifier: myinfra
  description: ""
  tags: {}
  orgIdentifier: default
  projectIdentifier: CD_Docs
  environmentRef: myenv
  deploymentType: Kubernetes
  type: KubernetesDirect
  spec:
    connectorRef: K8s_Cluster
    namespace: default
    releaseName: release-<+INFRA_KEY>
  allowSimultaneousDeployments: false
```
</details>

<details>
<summary>Create the pipeline</summary>

Now we can put everything together in a pipeline with a CD stage that deploys the Harness service to the infrastructure definition we added.

The pipeline uses a Kubernetes rolling deployment.

```yaml
pipeline:
  name: cd
  identifier: cd
  projectIdentifier: CD_Docs
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: nginx
        identifier: nginx
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: Nginx
          environment:
            environmentRef: myenv
            deployToAll: false
            infrastructureDefinitions:
              - identifier: myinfra
          execution:
            steps:
              - step:
                  name: Rollout Deployment
                  identifier: rolloutDeployment
                  type: K8sRollingDeploy
                  timeout: 10m
                  spec:
                    skipDryRun: false
                    pruningEnabled: false
            rollbackSteps:
              - step:
                  name: Rollback Rollout Deployment
                  identifier: rollbackRolloutDeployment
                  type: K8sRollingRollback
                  timeout: 10m
                  spec:
                    pruningEnabled: false
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```

</details>



```mdx-code-block
  </TabItem1>
  <TabItem1 value="API" label="API">
```

<details>
<summary>Create the Harness connector</summary>
markdown
</details>


<details>
<summary>Create the Harness service</summary>
markdown
</details>


<details>
<summary>Create the Harness environment and infrastructure definition</summary>
markdown
</details>


<details>
<summary>Create the pipeline</summary>
markdown
</details>


```mdx-code-block
  </TabItem1>
  <TabItem1 value="Terraform Provider" label="Terraform Provider">
```

Create the Harness connectors

Create the Harness service

Create the Harness environment and infrastructure definition

Create the pipeline

```mdx-code-block
  </TabItem1>
  <TabItem1 value="Pipeline Studio" label="Pipeline Studio">
```

Create the Harness connectors

Create the Harness service

Create the Harness environment and infrastructure definition

Create the pipeline

```mdx-code-block
  </TabItem1>
</Tabs1>
```


## View and manage your pipelines


## Next steps