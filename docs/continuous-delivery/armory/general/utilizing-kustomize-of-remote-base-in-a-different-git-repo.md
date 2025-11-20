---
title: Utilizing Kustomize of remote base in a different Git Repo
---

## Introduction
The following instructions may be followed to utilize multiple git repositories to fetch Kustomize files under "Bake Manifest" stage. 
To set up Kustomize with a different GitRepo, it is essential that the environment that will be doing the baking have the credentials/access for the other GitRepos.  This access is needed in order to clone the repo in the process.
The initial repo sent to Rosco by Clouddriver, using the credentials CloudDriver has access to.  Rosco receives the data about the repo, but at this point, Rosco itself doesn’t have credentials.
The ```Bake (Manifest)``` process works the same way. However, once the artifact is downloaded from Clouddriver, the Kustomize file has another definition contained within it that will point it to the different repository. The Kustomize build runs on Rosco, and so the SSH keys need to be mounted on the Rosco pod since Rosco will be accessing the files, not CloudDriver.

## Prerequisites
The following pre-reqs should be taken into consideration:
* Credentials for the remote repository should be created and made available.  In this example, we will be using SSH.  The SSH keys in use must be added to any repos that Kustomize will attempt to access and this is out scope of this KB article.* These credentials should be loaded into a kubernetes secret named ```ssh-credentials``` and contain ```id_rsa``` and ```id_rsa.pub``` entries with the data of the ssh credentials.

## Instructions
The following configuration may be added to your Spinnaker service once the SSH credentials are stored in a Kubernetes secret.
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      deploymentEnvironment:
        initContainers:
          rosco:
            - name: ssh-initializer
              image: busybox
              command: ["/bin/sh", "-c", "cp /opt/ssh-credentials/* /home/spinnaker/.ssh && chmod 600 /home/spinnaker/.ssh/* && chown 100 /home/spinnaker/.ssh/*"]
              volumeMounts:
                - name: shared-volume
                  mountPath: /opt/ssh-credentials
                - name: ssh-credentials
                  mountPath: /home/spinnaker/.ssh
    service-settings:
      rosco:
        kubernetes:
          volumes:
            - name: shared-volume
              mountPath: /opt/ssh-credentials
            - id: ssh-credentials
              type: emptyDir
              mountPath: /home/spinnaker/.ssh
           
This will mount the credentials into Rosco, so that it will have access to the remote repositories via SSH Git URLs. **A major note about security:** It should be noted that ***Rosco access is shared by all users of Spinnaker***.  This means that any user of Spinnaker will be able to use Kustomize to fetch from the accessible repositories for baking purposes.  This could impact other bake systems like Helm or Packer that may use local executions.

