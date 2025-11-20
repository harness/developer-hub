---
title: Pausing in-flight Kubernetes deployments in Spinnaker
---

## Introduction
A user would like to pause a Kubernetes deployment via the Spinnaker UI directly. 

## Prerequisites
* An actively-running Kubernetes deployment that shows up in the Spinnaker UI.* Output of ```{your_gate_endpoint}/manifests/{your_account_name}/{your_namespace}/deployment%20{your_deployment_name}``` has ```status.paused.state: false``` and ```status.stable.state: false```* ```settings-local.js``` for Deck has ```window.spinnakerSettings.kubernetesAdHocInfraWritesEnabled = true;``` as per the *Kubernetes infrastructure in the UI* documentation: [https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-26-0/#kubernetes-infrastructure-in-the-ui](https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-26-0/#kubernetes-infrastructure-in-the-ui)


## Instructions
To achieve this via the Spinnaker UI
* Click on the actively running deployment you would like to pause.* A menu displaying detailed information on that deployment will show up on the right-hand side.* Inside it, from the ```Deployment Actions``` drop-down - select ```Pause```. 
It is important to note that the button **only** appears while the deployment is running, and before it’s stable. 
Depending on the size, this may entail that it only shows up for a brief period of time during each pipeline execution. Because of this, a suggested workaround to pause it is to manually issue a ```kubectl rollout pause deployment.v1.apps/``` command, as per the official Kubernetes documentation:
[https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#pausing-and-resuming-a-deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#pausing-and-resuming-a-deployment)

