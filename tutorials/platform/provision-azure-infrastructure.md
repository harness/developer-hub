---
sidebar_position: 3
description: Install Harness delegates on Azure
---

# Install Harness delegates on Azure

A delegate is a Harness service that performs the tasks of a pipeline. Delegates run on your local network and work in parallel with Harness Manager. The creation of a delegate requires infrastructure that supports computational tasks. This is typically a Kubernetes cluster. 

This tutorial explains how to create a Kubernetes cluster on a free Microsoft Azure account. The cluster you create is the foundation of your CI/CD pipeline infrastructure. After you prepare the infrastructure, you can install a delegate.

For additional information about delegates, see [Delegate overview](https://docs.harness.io/article/2k7lnc7lvl-delegates-overview).


## Requirements

To complete this tutorial, you'll need the following cluster resources and permissions.

### Permissions
For information about access and permissions, see [Permissions](https://docs.harness.io/article/2132l9r4gt#permissions).

### Cluster resources
For information about delegate memory requirements, see [Compute Resources](https://docs.harness.io/article/2132l9r4gt#compute_resources). 

To sign up for a free Azure account, go to https://azure.microsoft.com/en-in/free/.

To sign up for a student account, go to https://azure.microsoft.com/en-in/free/students/.


### Create a cluster 

The cluster you'll create has the following requirements:

- **Number of nodes:** A minimum of 3 nodes.
- **Machine type:** 4vCPU
- **Memory:** 12GB RAM and 6GB disk space. The delegate requires 8GB RAM. The remaining memory supports Kubernetes and containers.
- **Networking:** Outbound HTTPS for the Harness connection, and to connect to any container image repository. Allow TCP port 22 for SSH.

To create your cluster, follow the steps in the [Azure Kubernetes Service (AKS) documentation](https://learn.microsoft.com/en-us/azure/aks/).


### Modify the delegate YAML file

For purposes of this tutorial, modify the harness-delegate.yaml file to create one replica pod.

1. Open a terminal window and navigate to the folder that contains the delegate file.

2. Open the YAML file in your editor. Locate and set the `replicas` field to 1. 

3. Save the YAML file.

### Authenticate to the cluster

Use terminal to connect and login to your cluster:

1. From terminal, connect to your cluster. 

2. Login to your Kubernetes cluster.

   Most cloud platforms provide a cluster access command. To copy this command, select your cluster and click `Connect`. 
   
### Install the delegate

Use the `kubectl apply` command to add the delegate to your cluster:
   
1. To install the delegate, apply the harness-delegate.yaml file. In the terminal that is connected to your cluster, run:

   ```
   kubectl apply -f harness-delegate.yaml
   ```

   The successful output is something like this:

   ```
   namespace/harness-delegate unchanged
   clusterrolebinding.rbac.authorization.k8s.io/harness-delegate-cluster-admin unchanged
   secret/k8s-quickstart-proxy unchanged
   statefulset.apps/k8s-quickstart-sngxpn created
   service/delegate-service unchanged
   ```

2. In Harness, click **Verify**. The verification process takes a few minutes. 
   After the installation is verified, close the wizard.
   
### Connect your delegate to your cluster

Enable a connection from your delegate to your cluster:

1. Return to **Set Up Delegates**, and select the delegate you created.
   The list of delegates should include your delegate and its tags.
   
2. Select **Connect using Delegates** and choose the **Tags** option.

3. Add a descriptive tag for the delegate, and then click **Save and Continue**.

   The connector is tested.

### Confirm that the delegate pod is up and running

Use the following command to confirm that the delegate pod is running in your Kubernetes cluster:

  ```
  kubectl get pods -n harness-delegate-ng
  ```

### Next Steps

Use the `kubectl` utility to add resources to your cluster. For a tutorial on creating a CI/CD pipeline, see [Start Deploying in 5 Minutes with a Delegate-first Approach](https://www.harness.io/technical-blog/deploy-in-5-minutes-with-a-delegate-first-approach).

## Need Help? 

You can post questions to [community.harness.io](https://community.harness.io/c/harness/7) or  [join the community slack](https://join.slack.com/t/harnesscommunity/shared_invite/zt-y4hdqh7p-RVuEQyIl5Hcx4Ck8VCvzBw) to chat with Harness engineers in product-specific channels:

- [#continuous-delivery](https://join.slack.com/share/enQtMzkwNjIzMDIxMDEwMy1mYjM2M2FlY2Y3ZWM5ZTRiMGM0MzI1ZTA2YzIxNDYzYjFiODVjZjZlZmE5ZTRmZmZlZjEzYWY1YzU4ODdmNmVj)  Get support for Harness CD.
- [#continuous-integration](https://join.slack.com/share/enQtMzkyMzI1ODcxNzAxMi05MTI2M2VlNmVhZDY4NTlkM2JiODgxNWQ5NzY4NGU4MjE0MDQ1MDhlZTM0ZjA1ZjAyNjc3N2E4YmY2ZTc2YWY0) Get support for Harness CI.
