---
title: Run a Generic Shell Script with Spinnaker
---

## Introduction
Spinnaker is a tool specialized in completing Deployments *natively*, without having to write shell scripts. That said, sometimes when end users may need to run custom logic related to deployments. Spinnaker has a stage called ```Script```to help deal with this logic.  However, this execution relies on a Jenkins job under the hood and has been deprecated in favor of the ```Jenkins``` stage.
If end users want to run a script, then Kubernetes jobs can be used to execute, but then the user will need to develop a Docker container that contains the script. A solution is to use a generic docker container and mount the script in a Kubernetes ```ConfigMap```.
In this way, end users can define the script contents as part of the deployment ```yaml``` for the ```ConfigMap```.

## Prerequisites
N/A

## Instructions

## Table of Contents
*  * [Basic Method](#basic-approach)* [Taking the Shell Script from Version Control](#taking-the-shell-script-from-version-control)


Basic Method
Stage: ```Deploy (Manifest)```
```
apiVersion: v1
data:
  script.sh: |-
    echo "Hello world!"
    kubectl get pods
kind: ConfigMap
metadata:
  name: script-configmap
  namespace: german
---
apiVersion: batch/v1
kind: Job
metadata:
  labels:
    app: script-job
  name: script-job
  namespace: german
spec:
  backoffLimit: 2
  template:
    spec:
      containers:
        - command:
            - sh
            - /opt/script/script.sh
          image: 'bitnami/kubectl:1.12'
          name: script
          volumeMounts:
            - mountPath: /opt/script
              name: script-configmap
              readOnly: false
      restartPolicy: Never
      serviceAccountName: spinnaker-service-account
      volumes:
        - configMap:
            name: script-configmap
          name: script-configmap
```
Here we define a generic ```Deploy (Manifest)``` stage, supplying the above text contents.
End users define the ConfigMap as well as the Job. The script is part of the ConfigMap, and the Job runs a generic Docker container from the Docker hub with the tool ```kubectl```. The job will execute a command, which is the script mounted in the ConfigMap.
In the situation there is a need to edit the script, this can be done without generating another Docker image.  Another consideration is that jobs can be run only once in Kubernetes and are immutable, so the end user will also need to add a ```Delete (Manifest)``` stage for cleaning up/deleting old jobs before another ```Deploy (manifest)``` stage is executed.
 
Retrieving the Shell Script from Version Control
The basic approach is fine for small scripts, but writing something more complex inside a ConfigMap definition is no fun.Fortunately, a trick in Spinnaker allows users to read file contents from an artifact, which can be a ```GitHub``` repo file, ```Bitbucket``` repo file, ```AWS S3``` file, and any supported Spinnaker artifact that refers to text files.See the complete list of supported artifact sources: [https://spinnaker.io/docs/setup/other_config/artifacts/](https://spinnaker.io/docs/setup/other_config/artifacts/)
In the following example, a GitHub repository is used as an artifact source for the script file.
End users will a ```Webhook``` stage to make a request to Spinnaker’s ```Clouddriver``` service.  The service already has all the credentials needed for downloading artifacts.  However, administrators [may need to enable and supply those artifact credentials through Spinnaker configuration](https://docs.armory.io/continuous-deployment/armory-admin/artifacts-github-connect/#configure-github-as-an-artifact-source), if they don't already exist. Clouddriver will use the same logic it already uses in other parts of Spinnaker to download the file and return it to the ```Webhook``` stage. The output of this stage (and hence the file) is available in the pipeline execution context, so user can then refer to it using [Pipeline Expressions](https://www.spinnaker.io/guides/user/pipeline/expressions/) in the ConfigMap definition:

#### Example of the Webhook stage configuration
````
Webhook URL:  http://spin-clouddriver:7002/artifacts/fetch
Method:       PUT
Payload:      {
                "artifactAccount": "",
                "reference": "https://api.github.com/repos///contents/",
                "type": "github/file",
                "version": "master"
              }
````
#### Example of the ```Deploy (Manifest) - ConfigMap```
```
apiVersion: v1
data:
  script.sh: '${#stage("Webhook")["context"]["webhook"]["body"]}'
kind: ConfigMap
metadata:
  name: script-configmap
  namespace: german
``` 
Then the ```Run job``` stage can contain only the yaml description of the kubernetes job.
 

