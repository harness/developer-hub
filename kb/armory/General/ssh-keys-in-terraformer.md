---
title: SSH Keys in Terraformer
---

## Introduction
This document will show you how to install SSH Keys into the Terraformer container. The process requires modifications to the deployment of Terraformer running in Kubernetes.For information about what causes this issue, see the following Kubernetes issue: [https://github.com/kubernetes/kubernetes/issues/2630](https://github.com/kubernetes/kubernetes/issues/2630)The workaround is based on the following post from Stack Overflow: [https://stackoverflow.com/a/57908921](https://stackoverflow.com/a/57908921)
**Note: **Users running 2.20.x+ should be considering using Terraform Named Profiles instead
[https://docs.armory.io/docs/spinnaker/terraform-enable-integration/#named-profiles](https://docs.armory.io/docs/spinnaker/terraform-enable-integration/#named-profiles) 

## Prerequisites
Terraformer installed in the Armory Spinnaker cluster. The SSH Key should already be created and added as a Deploy Key to the Git repository.

## Instructions
### Create the Secret
On local workstation, create a directory and place the SSH Key and any other required authentication information inside:
* Create the directory:```mkdir ssh```* ``````Copy the SSH Key:```cp $SSH_KEY_FILE ssh/id_rsa```* Copy any other authentication information that's needed:```cp $GOOGLE_APPLICATION_CREDENTIALS ssh/account.json```* ``````Create a config file for SSH to ignore the known_hosts checks:```echo "StrictHostKeyChecking no" > ssh/config```* ``````Create the secret using ```kubectl```:```kubectl create secret generic spin-terraformer-sshkey -n spinnaker-system --from-file=id_rsa=ssh/id_rsa --from-file=config=ssh/config --from-file=account.json=ssh/account.json```
In this example, we create a secret with the SSH key, a config to ignore known hosts file issues, and the GCP service account information to access the backend bucket that Terraform is configured to use.
### Update the Manifest
Next, the K8s manifest needs to be updated to include a few things.
First, update the secret and an empty directory volume that will contain the copy of the secret with the correct uid and permissions:
volumes:
- name: spin-terraformer-sshkey
  secret:
    defaultMode: 420
    secretName: spin-terraformer-sshkey
- name: ssh-key-tmp
  emptyDir:
    sizeLimit: "128k"​

Second, define an init container that copies the secret contents to the empty directory and set the permissions and ownership correctly. The Spinnaker user uses user id 1000:
### Adding to set the ownership of the ssh keys
initContainers:
- name: set-key-ownership
  image: alpine:3.6
  command: ["sh", "-c", "cp /key-secret/* /key-spin/ && chown -R 1000:1000 /key-spin/* && chmod 600 /key-spin/*"]
  volumeMounts:
  - mountPath: /key-spin
    name: ssh-key-tmp
  - mountPath: /key-secret
    name: spin-terraformer-sshkey​

Mount the (not so) empty directory into the Terraformer container at the ```/home/spinnaker/.ssh``` location:
volumeMounts:
- mountPath: /home/spinnaker/.ssh
  name: ssh-key-tmp​

Finally, add the following snippet to the envs to get the GCP service account to work for the S3 bucket:
- env:
  - name: GOOGLE_APPLICATION_CREDENTIALS
    value: /home/spinnaker/.ssh/account.json​
This isn't necessary for the SSH Keys, but it completes the example.


### Result
After the modifications are in place, and Terraformer has time to redeploy via the replica set, Terraform should be able to clone Git repositories via SSH as long as the repository has the SSH Key added as a deploy key. Halyard shouldn't overwrite these changes, but it would be good to back this up.

