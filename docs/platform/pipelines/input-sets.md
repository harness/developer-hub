---
title: Input sets and overlays
description: Input Sets are collections of runtime variables and values. Overlays are groups of Input Sets.
sidebar_position: 5
helpdocs_topic_id: 3fqwa8et3d
helpdocs_category_id: sy6sod35zi
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/pipelines/run-pipelines-using-input-sets-and-overlays
---

Harness Input Sets are collections of runtime inputs for a Pipeline provided before execution.

All Pipeline settings can be set as runtime inputs in Pipeline Studio **Visual** and **YAML** editors:

| ![](./static/InputsetsOverlays1.png) | ![](./static/InputsetsOverlays2.png) |
| ------------------------------------ | ------------------------------------ |


An Input Set includes all the runtime inputs that are not permanent in the Pipeline. Runtime inputs contain the values that you would be prompted to provide when you executed the Pipeline.

Overlays are groups of Input Sets. Overlays enable you to provide several Input Sets when executing a Pipeline.

With Input Sets and Overlays, you can make a single Pipeline template that can be used for multiple scenarios. Each scenario can be defined in an Input Set or Overlay and simply selected at runtime.

## Input Sets Overview

Nearly every setting in a Pipeline can be configured as a runtime input. You can then create an Input Set from those inputs.

![](./static/input-sets-05.png)

Here are some Input Set examples:

* Values of fields and variables
* Artifacts
* Connectors
* Environments
* Infrastructures
* Services
* Secrets
* Stage variables
* Step settings

Input sets group the values of these entities and make it easy provide the correct set of values for a single Pipeline execution, and reuse the same values for the executions of multiple Pipelines.

## Overlays Overview

You can add several Input Sets as an Overlay. Overlays are use when:

* The Pipeline is used for multiple Services.
* The Services have some configurations in common, but some have differences. For example:
	+ Same configuration but using different runtime variables.
	+ Same artifact stream.

In this use case, you can then create different Input Sets:

* 1 Input Set for the common configuration: this set is used for every Pipeline execution regardless of the Service selected in the Pipeline.
* 1 Input Set for each Service with a specific configuration.
* 1 Input Set for a unique execution. For example, if it contains a specific build number.

For a specific execution, you provide multiple Input Sets. All together, these Input Sets provide a complete list of values needed for Pipeline execution.

### Input Set Order in Overlays

You can order the Input Sets you add to an Overlay to give priority to certain Input Sets.

Each Input Set in an Overlay can overwrite the settings of previous Input Sets in the order. 

## Using Input Sets for Pipeline Execution

Before running a Pipeline, you can select one or more Input Sets and apply them to the Pipeline. As a result, Harness will do the following operations:

* Apply the Input Set(s) on the Pipeline. If you are using an Overlay, the application it performed in the same as the Input Sets in the Overlay to ensure the correct values are used.
* Indicate if the Pipeline can start running. Meaning, all required values are provided.
	+ If the Pipeline cannot start running, Harness indicates which values are missing.
* Harness shows the following:
	+ The values that were resolved.
	+ The values that were not resolved. In this case, Harness provides a clear indication that the Pipeline cannot run without values for all variables.

## Example: Input set for service and primary artifact

Here's the YAML for an input set that let's you select the Harness service to deploy. In this example, the service selected also has its primary artifact and a replicas variable set as runtime inputs.

```yaml
inputSet:
  name: Artifact Input Set
  tags: {}
  identifier: Artifact_Input_Set
  orgIdentifier: default
  projectIdentifier: CD_Docs
  pipeline:
    identifier: kubernetes_demo
    stages:
      - stage:
          identifier: k8s_deployment
          type: Deployment
          spec:
            service:
              serviceRef: Kubernetes
              serviceInputs:
                serviceDefinition:
                  type: Kubernetes
                  spec:
                    artifacts:
                      primary:
                        primaryArtifactRef: nginx
                        sources: ""
                    variables:
                      - name: replicas
                        type: String
                        value: "3"
```











## Run pipelines using input sets and overlays

Create a Pipeline template that can use different runtime variable values for different services, codebases, target environments, and goals.


Harness Input Sets are collections of runtime variables and values that can be provided to Pipelines before execution.

An Input Set includes all the runtime inputs that are not permanent in the Pipeline. Runtime inputs are the settings that you would be prompted to provide when you executed the Pipeline manually.

Overlays are groups of Input Sets. Overlays enable you to provide several input sets when executing a Pipeline.

Input Sets and Overlays allow you to create a Pipeline template that can use different runtime input values for different services, codebases, target environments, and goals.


## Before you begin

Review the following:

* [CI tutorials](../../continuous-integration/get-started/tutorials.md)
* [Kubernetes deployments in Harness CD overview](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart)
* [Input sets and overlays](input-sets.md)
* [Runtime inputs](../variables-and-expressions/runtime-inputs.md)

## Create Input Sets

You can create an Input Set in two ways:

* From the **Run Pipeline** page:
1. Configure your Pipeline and click **Run**.
2. Enter values for the required runtime inputs.
3. Click **Save as Input Set**. The Input Set setup appears.
   
   ![](./static/run-pipelines-using-input-sets-and-overlays-08.png)
   
4. Enter a name, description, and tags for the new Input Set, and then click **Save**.
* By simply creating an Input Set:
1. In **Pipeline Studio**, click **Input Sets**.
2. Click **New Input Set** and select **Input Set**.
3. Enter values for the required runtime inputs and click **Save**.

### YAMl Example

YAML Example
```
inputSet:  
    name: service  
    tags: {}  
    identifier: service  
    pipeline:  
        identifier: BG_example  
        stages:  
            - stage:  
                  identifier: nginx  
                  type: Deployment  
                  spec:  
                      serviceConfig:  
                          serviceDefinition:  
                              type: Kubernetes  
                              spec:  
                                  manifests:  
                                      - manifest:  
                                            identifier: manifests  
                                            type: K8sManifest  
                                            spec:  
                                                store:  
                                                    type: Git  
                                                    spec:  
                                                        branch: main  
                                  variables:  
                                      - name: foo  
                                        type: String  
                                        value: bar  
                          serviceRef: nginx  
                      infrastructure:  
                          environmentRef: quickstart  
                  variables:  
                      - name: stagevar  
                        type: String  
                        value: ""
```

### Import Input Sets

With the Harness Git Experience, you can [import Input Sets](/docs/platform/git-experience/import-input-sets) from a Git repo.

## Create Overlays

Once you have multiple Input Sets set up you can combine them into an Overlay.

In an Overlay, you select the order in which to apply several Input Sets.

When you run a Pipeline using an Overlay, the Inputs Sets are applied in the order specified in the Overlay. The first Inputs Set is used and then subsequent Inputs Sets override any previously specified or empty values.

## Run pipelines with Input Sets or Overlays

When you have created your Input Sets and Overlays, you can run the Pipeline using them.

You can select Input Sets and Overlays in two ways:

* From the **Run Pipeline** page:
1. In **Pipeline Studio**, click **Run**.
2. In the **Run Pipeline** page, click the Input Sets option.
   
   ![](./static/run-pipelines-using-input-sets-and-overlays-09.png)
   
3. Click an Input Set(s) or Overlay(s) to apply their settings.
4. Click **Run Pipeline**.
* From the **Input Sets** list:
1. In **Pipeline Studio**, click **Input Sets**.
2. In the Input Set or Overlay you want to use, click **Run Pipeline**.  
You can also use the Input Sets option here.
3. Change any settings you want and click **Run Pipeline**.

 The Pipeline is run with the Input Set(s) or Overlay(s) settings.

## Limitations

Only runtime inputs are available in Input Sets. Most, but not all, Pipeline and Stage settings can be defined as runtime inputs.

You can use any setting that offers the **Runtime input** option:

![](./static/run-pipelines-using-input-sets-and-overlays-10.png)
