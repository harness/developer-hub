---
title: CD pipeline execution walkthrough
description: Learn how a CD pipeline execution uses Harness entities and settings.
sidebar_position: 5
---

This topic explains how a CD pipeline execution uses Harness entities and settings at runtime.

## Pipeline example

Let's look at a Kubernetes rolling deployment as an example.

The pipeline consists of:

- A Harness CD Deploy stage.
- A Harness service, environment, and infrastructure definition.
- A rolling deployment strategy that uses execution steps to deploy to an existing Kubernetes cluster.
- A final cleanup step to delete the Kubernetes deployment at the end of the pipeline.

<docimage path={require('./static/0c8d610885c229a7d1802482ded35c47693dcdc1f025341577999349964c8cc6.png')} width="60%" height="60%" title="Click to view full size image" />  

<details>
<summary>Here's the YAML for the example pipeline:</summary>

```yaml
pipeline:
  name: Golden PM Signoff Pipeline
  identifier: Golden_PM_Signoff_Pipeline
  projectIdentifier: PM_Signoff
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: deployKubernetes
        identifier: Deploy_Kubernetes
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: kubernetes
            serviceInputs:
              serviceDefinition:
                type: Kubernetes
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
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
                  when:
                    stageStatus: Success
              - step:
                  type: K8sDelete
                  name: Cleanup Suite
                  identifier: Cleanup_Suite
                  spec:
                    deleteResources:
                      type: ReleaseName
                      spec:
                        deleteNamespace: false
                  timeout: 10m
            rollbackSteps:
              - step:
                  name: Rollback Rollout Deployment
                  identifier: rollbackRolloutDeployment
                  type: K8sRollingRollback
                  timeout: 10m
                  spec:
                    pruningEnabled: false
          environment:
            environmentRef: k8sdev
            deployToAll: false
            infrastructureDefinitions: <+input>
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - PolicyEvaluationFailure
              action:
                type: MarkAsSuccess
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
        when:
          pipelineStatus: Success
    - stage:
        name: Deploy
        identifier: Deploy
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: kubernetes
            serviceInputs:
              serviceDefinition:
                type: Kubernetes
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
          environment:
            environmentRef: k8sdev
            deployToAll: false
            infrastructureDefinitions:
              - identifier: devrancher1
                inputs:
                  identifier: devrancher1
                  type: KubernetesRancher
                  spec:
                    connectorRef: <+input>
                    cluster: <+input>
                    namespace: <+input>
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
  allowStageExecutions: true
```

</details>


## Walkthrough of the execution

### Service

The first entity evaluated during pipeline execution is the Harness service. A Harness service represents the microservice or application you want to deploy. 

<docimage path={require('./static/0c8d610885c229a7d1802482ded35c47693dcdc1f025341577999349964c8cc6.png')} width="60%" height="60%" title="Click to view full size image" />  

A Harness service is made up of the following entities.

#### Manifest definition

The manifest definition is used to fetch files from the Harness File Store or a remote source like GitHub, GitLab, Bitbucket, etc. 

When the stage's Rollout Deployment step is executed, a Harness delegate fetches the manifests for deployment.

In this example, Harness uses a Harness BitBucket connector to fetch the manifest.

<docimage path={require('./static/77e84ac51371ea84e703528c89ea1ce75dc2d3e13a634a3a0e7ed350d0d95562.png')} width="60%" height="60%" title="Click to view full size image" />  

Here's the process:

<docimage path={require('./static/3c43b3302b31c37f0c91e826d42f7e86bcfa17f3aff68f35831eaf5a48887b19.png')} width="60%" height="60%" title="Click to view full size image" />  

#### Artifact configuration (optional)

You can add an artifact to the service and use the artifact expression `image: <+artifacts.primary.image>` in your `values.yaml` file to fetch the image tag information and pass it into the manifest.

<docimage path={require('./static/adf1528b6db53170e2bef7b8e96dd55e4e3fe256f9895ce9952b81ab337c9518.png')} width="60%" height="60%" title="Click to view full size image" />  

Here's the process:

<docimage path={require('./static/01248f98e478bb7d27549135fe3ca7b60a7eeae30b7c832ef62e7ff3846764a4.png')} width="60%" height="60%" title="Click to view full size image" />

#### Configuration files (optional)

The service configuration files are fetched during the service evaluation and stored on the delegate. 

Harness can fetch JSON, Python Script, XML File, etc., and then Harness can use these files during deployment.

<docimage path={require('./static/9ea6e614fb430935b293312a635e6365de5c5110f54247313e56e6e42e744fff.png')} width="60%" height="60%" title="Click to view full size image" />  

Here's the process:

<docimage path={require('./static/896f6ecff8cc8c8889043fbb5656484b607be65b12e56800119035482f881024.png')} width="60%" height="60%" title="Click to view full size image" />  

#### Variables (optional)

You can configure variables in a service and reference them in the service's `values.yaml` file or in pipeline execution steps.

<docimage path={require('./static/19bb0370626e37fbbe4661ab091561a6cc3273d1cb6f02c5b584b7dd2a2f160f.png')} width="60%" height="60%" title="Click to view full size image" />  

You can also override service variables in the environment configured in the stage, as explained in the next section.

### Environment and infrastructure definition

The next entities evaluated during pipeline execution are the stage environment and infrastructure definition.

<docimage path={require('./static/b052e20f319cb8d113b8cdf8001832eb7629f1002568d5d5595aeb426467c774.png')} width="60%" height="60%" title="Click to view full size image" />  


A Harness environment defines **where** the service will be deployed in terms of Production and Pre-Production environments. Within an environment, you can have multiple infrastructure definitions, and you select the one to use for each pipeline stage.

Each infrastructure definition defines the specific infrastructure where the pipeline will deploy. For example, the cloud platform or Kubernetes cluster.

The infrastructure definition for Kubernetes (including Helm and Kustomize) and Native Helm also contain a **Release Name**. The release name is used to track the deployed service and to sync instances so users know how many pods are deployed on a cluster.

An infrastructure definition leverages a specific Harness connector, such as Kubernetes Cluster, Physical Datacenter, etc., to connect to the target infrastructure for deployment at pipeline execution.

Here's the process:

<docimage path={require('./static/796208cc2b0cda81beb45f88163ede6debc5cdcc109b6f212f49b1f47ca5f9c5.png')} width="60%" height="60%" title="Click to view full size image" />  


#### Overrides (optional)

When a service that uses variables is added to a pipeline stage, you can override the variables using the environment in that stage.

You can set service variable overrides at the environment level. At runtime, Harness will override the corresponding service variables and compute the values according to the environment variables.

 Overrides let you specify different service variable values for different environments (Dev, QA, etc.).

### Kubernetes Rollout Deployment step

The next entities evaluated during pipeline execution are the stage execution steps.

In this example, there is Rollout Deployment step to deploy the service to the environment.

<docimage path={require('./static/ffac7e13dca40a4c238eb1bb1b2762654e05b190093f10b354f80178a8d5225d.png')} width="60%" height="60%" title="Click to view full size image" />  

When the Rollout Deployment step is executed, the delegate eligible to perform the Kubernetes Rollout Deployment step is assigned the task. Harness evaluates delegates in a round robin style.

The Rollout Deployment step is made up of 2 tasks that Harness provides out of the box:

1. Fetch files task.
   1. The fetch files task leverages the GitHub connector configured in the service to fetch the manifests.
   2. Harness will also render and resolve any of the Harness variables defined in the `values.yaml` file of the service and add them to the manifest/Helm chart using Go/Helm templating.
   3. Harness fetches any secrets referenced in the `values.yaml` file and resolves them in the manifest. Harness masks secret output in its logs.

   Here's an example deployment log:

   <docimage path={require('./static/a28e8959ecb23d7ce24125f04126a5f3dc880d4856539f2c0a73337bc0781509.png')} width="60%" height="60%" title="Click to view full size image" />  
2. Rollout deployment task.
   1. The Kubernetes rollout deployment task leverages the infrastructure definition and Harness Kubernetes Cluster connector to authenticate and deploy into the target cluster. 
   2. The task uses the `kubectl apply` and `describe` commands to check for steady state.

   Here's an example deployment log:

   <docimage path={require('./static/cd7de6d61e060c5f9171063bc9958c402c48e5616cc824d8cfeafd759b31dece.png')} width="60%" height="60%" title="Click to view full size image" />  


Here's the delegate selection process:

<docimage path={require('./static/b295504b69a4921aa5dff2fa709df9b2fb2e289992103b24858ae90b175b2e8c.png')} width="60%" height="60%" title="Click to view full size image" />  

Here's the deployment process:

<docimage path={require('./static/ddb79c3787d1c5e83e6f241761b699d006bddb6679be8f5ee7880e358a258986.png')} width="60%" height="60%" title="Click to view full size image" />  


### Kubernetes Delete step

During execution of the Kubernetes Delete step, Harness selects the delegate that has access to the infrastructure definition connector and performs the Kubernetes delete step within that cluster. 

Harness attempts to delete the resources specified in the step according to the delegate's RBAC configured on the cluster.

<docimage path={require('./static/55eefd44ef75d9e1022e29b2aec219df6859062b3b4297aefb651d3da0c0ac32.png')} width="60%" height="60%" title="Click to view full size image" />  

Here's the process:

<docimage path={require('./static/8e5058eff9a68513461e2f0b9982e966d99d6bc7fb49d5b73c94e736d12770aa.png')} width="60%" height="60%" title="Click to view full size image" />  

## Summary

This topic explained how a CD pipeline execution uses Harness entities and settings at runtime.

For more information on creating CD pipelines, go to:

- [CD tutorials](https://developer.harness.io/tutorials/cd-pipelines)
- [Create your first CD pipeline](https://developer.harness.io/docs/continuous-delivery/get-started/create-first-pipeline)






