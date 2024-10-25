---
title: Enable Armory Agent for Kubernetes to only discover objects that are discovered by Spinnaker (or) Armory Agent
---

## Introduction
Unlike in a standard Spinnaker install without Armory Agent, customers who have installed Armory Agent for Kubernetes in their environment will find that the Agent discovers ***all the objects in the target cluster that the Kubernetes account has access to***.
This default behavior may create default applications in Spinnaker for every deployment on the cluster, ***even if these deployments were not deployed using Spinnaker***.  Spinnaker admins can restrict the scope of the discovery engine by ensuring that Armory Agent and Spinnaker only discover the objects that Spinnaker deploys. 

## Prerequisites
Armory Enterprise Spinnaker with Armory Agent for Kubernetes enabled

## Instructions
When a Kubernetes object is created through Spinnaker,  the Spinnaker annotations get added to them as mentioned under [https://spinnaker.io/docs/reference/providers/kubernetes-v2/#reserved-annotations](https://spinnaker.io/docs/reference/providers/kubernetes-v2/#reserved-annotations).
The below example configuration should be defined in the Agent Plugin values to restrict the Armory Agent to discover only those objects deployed through Spinnaker:
````
       kubesvc:
          cluster: kubernetes
          cache: 
            operationWaitMs: 60000
          runtime:
            defaults:
              onlySpinnakerManaged: true
````
Admins looking for a similar function for individually defined Clouddriver accounts may refer to [https://docs.armory.io/armory-enterprise/armory-admin/kubernetes-account-add/#add-the-kubeconfig-and-cloud-provider-to-spinnaker](https://docs.armory.io/armory-enterprise/armory-admin/kubernetes-account-add/#add-the-kubeconfig-and-cloud-provider-to-spinnaker) and set``` onlySpinnakerManaged: true``` on the specific Kubernetes accounts in Spinnaker.

