---
title: How do I connect Harness to my environment?
hide_table_of_contents: false
hide_title: true
editCurrentVersion: false
custom_edit_url: null
---

# How do I connect Harness to my environment?

Harness performs deployments using a service named the Harness Delegate. You install the Delegate in your environment and it makes a secure, outbound connection to Harness.

When you run a Harness pipeline, the Delegate pulls in the artifacts and manifests/specs needed for deployment, and then runs deployment steps in your environment.

To install a Delegate, you copy the Helm commands provided by Harness and run them in your target environment. Next, the Delegate will register with Harness. That's it.

[Watch this video to see the steps to install your delegate](https://youtu.be/yLMCxs3onH8)

If you don't have Helm installed, see these [Helm install instructions](https://v3.helm.sh/docs/intro/install/).

## What size cluster do I need?

The Delegate only requires 1 replica with 2GB MEM and 0.5 CPU. But since you are also installing your service or the Harness sample service, use a cluster with at least 2 replicas with 4GB MEM and 1 CPU. 
If your service is large, use a larger cluster.

## Cluster provisioning

If you don't have a cluster already, connect to your platform and use the following commands to set one up before installing the Delegate.

### Minikube (local option)

If you want to use Minikube, use Minikube minimum version v1.22.0 or later installed locally.

`minikube start --memory=4g --cpus=1 --nodes=2`

After running this command, you can verify that the cluster is running by running the following command:

`kubectl get nodes`

### Docker Desktop (local option)

To set up a Kubernetes cluster with 2 replicas, 4GB of memory, and 1 CPU in Docker Desktop, you can follow these steps:

1. Open Docker Desktop and go to the **Settings** menu.
2. Select the **Kubernetes** tab.
3. Enable Kubernetes by checking the **Enable Kubernetes** checkbox.
4. Set the number of replicas to 2 by adjusting the **Replicas** slider.
5. Set the amount of memory to 4GB and the number of CPUs to 1 by adjusting the **Memory** and **CPU** sliders.
6. Select the **Apply & Restart** button to apply the changes and restart Docker Desktop.

After Docker Desktop restarts, you can verify that the cluster is running by running the following command:

`kubectl get nodes`

### Google GKE provisioning

Replace ZONE with your GCP region, for example us-central1-c:

```
gcloud container clusters create [CLUSTER-NAME] --num-nodes=2 --machine-type=[MACHINE-TYPE] --disk-size=10GB --zone=[ZONE]
```

For example:

```
gcloud container clusters create my-cluster --num-nodes=2 --machine-type=n1-standard-1 --disk-size=10GB --zone=us-central1-a
```

After running this command, you can verify that the cluster is running by running the following command:

`kubectl get nodes`

### Azure AKS provisioning

Replace myResourceGroup with your AKS resource group:

```
az aks create -g myResourceGroup -n myAKSCluster --enable-managed-identity --node-count 2 --enable-addons monitoring --enable-msi-auth-for-monitoring --generate-ssh-keys
```

After running this command, you can verify that the cluster is running by running the following command:

`kubectl get nodes`

### AWS EKS provisioning

```
eksctl create cluster --name=my-cluster --version=1.21 --nodegroup-name=my-nodegroup --node-type=t3.small --nodes-min=2 --nodes-max=2 --node-volume-size=20 --region=us-west-2
```

After running this command, you can verify that the cluster is running by running the following command:

`kubectl get nodes`

## Notes

Harness also has a Community Edition that you can run locally and perform deployments. See the Harness Community Edition deployment tutorial.
