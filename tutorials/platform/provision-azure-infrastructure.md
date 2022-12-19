---
sidebar_position: 3
description: Provision Azure Infrastructure for Harness Delegates
---

# Provision Azure Infrastructure for Harness Delegates

Creating a [delegate](https://docs.harness.io/article/2k7lnc7lvl-delegates-overview) in the Harness platform requires creating infrastructure where computational tasks can take place, typically a Kubernetes cluster. A delegate is the service you run on your local network that works in parallel with the Harness Manager to perform tasks.

This tutorial shows you how to set up a Kubernetes cluster on Azure and will serve as the foundation for your CI/CD pipeline infrastructure. After the infrastructure is ready on a free account, you can proceed to create and install a Delegate.


## Prerequisite

There are certain requirements in terms of [access and permissions](https://docs.harness.io/article/2132l9r4gt#permissions) and [memory resources](https://docs.harness.io/article/2132l9r4gt#compute_resources) for the delegate to function properly. 

To create a free Azure Account use the following URI:
https://azure.microsoft.com/en-in/free/

For Students you can use Azure for Students:
https://azure.microsoft.com/en-in/free/students/


### Creating a Cluster 

If you are a first-time user, please consider the following specifications along with the above prerequisites when creating a cluster:
- **Number of nodes:** Minimum of 3.
- **Machine type:** 4vCPU
- **Memory:** 12GB RAM and 6GB Disk Space. 8GB RAM is for the Delegate. The remaining memory is for Kubernetes and containers.
- **Networking:** Outbound HTTPS for the Harness connection, and to connect to any container image repo. Allow TCP port 22 for SSH.

For creating a cluster follow the steps mentioned in the [documentation](https://learn.microsoft.com/en-us/azure/aks/)!



### Authenticate to the cluster:

1. Open a terminal and navigate to where the Delegate file is located.
2. Connect to your cluster using the terminal so you can simply run the YAML file on the cluster.
3. In the same terminal, log into your Kubernetes cluster. In most platforms, you do this by selecting the cluster, clicking Connect, and copying the access command.
4. Next, install the Harness Delegate using the harness-delegate.yaml file you just downloaded. In the terminal connected to your cluster, run this command:

```
kubectl apply -f harness-delegate.yaml
```

5. Make sure to edit the yaml in the replicas field to 1, as this is just a lab.
6. The successful output is something like this:

```
$ kubectl apply -f harness-delegate.yaml
namespace/harness-delegate unchanged
clusterrolebinding.rbac.authorization.k8s.io/harness-delegate-cluster-admin unchanged
secret/k8s-quickstart-proxy unchanged
statefulset.apps/k8s-quickstart-sngxpn created
service/delegate-service unchanged
```

7. In Harness, click Verify. It will take a few minutes to verify the Delegate. Once it is verified, close the wizard.
8. Back in Set Up Delegates, you can select the new Delegate.
9. In the list of Delegates, you can see your new Delegate and its tags.
10 Select the Connect using Delegates with the following Tags option.
11. Enter the tag of the new Delegate and click Save and Continue.
12. When you are done, the Connector is tested.

Also, you can check if the delegate pod is up and running in your k8 cluster :

```
kubectl get pods -n harness-delegate-ng
```

### Further Steps


Now that your cluster is operational, you may add resources to it by using the kubectl utility, as you can see. Please use [Start Deploying in 5 Minutes with a Delegate-first Approach](https://www.harness.io/technical-blog/deploy-in-5-minutes-with-a-delegate-first-approach) tutorial to install Delegate at this time and move forward with creating your CI/CD pipeline.

## Need Further Help? 

Feel free to ask questions at [community.harness.io](https://community.harness.io/c/harness/7) or  [join the community slack](https://join.slack.com/t/harnesscommunity/shared_invite/zt-y4hdqh7p-RVuEQyIl5Hcx4Ck8VCvzBw) to chat with our engineers in product-specific channels like:

- [#continuous-delivery](https://join.slack.com/share/enQtMzkwNjIzMDIxMDEwMy1mYjM2M2FlY2Y3ZWM5ZTRiMGM0MzI1ZTA2YzIxNDYzYjFiODVjZjZlZmE5ZTRmZmZlZjEzYWY1YzU4ODdmNmVj)  Get support regarding the CD Module of Harness.
- [#continuous-integration](https://join.slack.com/share/enQtMzkyMzI1ODcxNzAxMi05MTI2M2VlNmVhZDY4NTlkM2JiODgxNWQ5NzY4NGU4MjE0MDQ1MDhlZTM0ZjA1ZjAyNjc3N2E4YmY2ZTc2YWY0) Get support regarding the CI Module of Harness.
