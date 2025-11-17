---
title: Use Custom Images with Halyard (Public and Private Docker Registry)
---

## Introduction
Occasionally, it may make sense to update the Spinnaker Kubernetes deployments created by Halyard with a custom Docker image. This can be done through a custom service setting.

## Prerequisites
Docker images in a Public or Private Registry

## Instructions
### Using a Custom Docker Image (Public Registry)
Here is how you would achieve this: identify the service that you’re modifying, and create a corresponding file in ```.hal//service-settings/.yml``` with the relevant ```artifactId```.
For example, if I want to use a custom Docker image for my Deck, I could create the following file:
```.hal//service-settings/deck.ym```l
```artifactId: docker.io/armory/deck:;```
Then, when you go to deploy your update (```hal deploy apply```), this setting should propagate to ```.hal//staging/spinnaker.ym```l, in ```services.deck.artifactId```, and get deployed to the cluster.
More generically, individual settings in ```spinnaker.yml``` can be overridden with files in ```.hal//service-settings/.yml```, and additional yaml files can be propagated to containers by placing them in ```.hal//profiles/-local.yml```

### Private Docker Registry
If necessary, you may need to put your images in a private docker registry (due to corporate restrictions around using public registries like Docker Hub ([docker.io](http://docker.io/))).  In that case you will need to configure credentials for kubernetes to authenticate and successfully pull the image from a private repo.  In order to do so, you will create a **secret** that contains the credentials and configure ```ImagePullSecrets```.
First start by creating a **secret** of type ```docker-registry``` as shown below: 
```kubectl create secret docker-registry regcred --docker-server= --docker-username= --docker-password= --docker-email=```
If necessary, refer to the kubernetes guide on for different methods of creating the secret:  [https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials)
Next, to configure ```ImagePullSecrets``` you will need to also add the following section the ```.yml``` created earlier. 
kubernetes:
  imagePullSecrets:
  - regcred # or the name of your secret created above

