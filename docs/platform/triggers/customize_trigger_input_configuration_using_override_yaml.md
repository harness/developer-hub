---
title: Override pipeline input provided using input set in Trigger configuration
description: Customize pipeline input provided using inputset in Trigger configuration
sidebar_position: 9
---

For instance, consider a pipeline that requires a ``Service`` input among others. While most inputs can be predefined in an ``Input Set``, the ``Service`` name needs to be extracted from the trigger payload.

Previously, triggering a pipeline allowed either using all values from an Input Set or defining all values directly in the trigger configuration. With the support of overriding pipeline input using input YAML in trigger, it is possible to reuse the input set and supply specific input values for pipeline in trigger configuration. This flexibility enables users to provide specific details, like the Service Name, directly from the trigger payload while utilizing the rest of the inputs from the predefined ``Input Set``.


:::note
You can only customize input parameters using YAML in this setup.
:::
Let's go through the feature with an example:


Suppose you have a trigger referring to an Input set `myInputSet` :
```yaml
 trigger:
  name: triggerWithInputSet
  identifier: triggerWithInputSet
  enabled: true
  description: ""
  tags: {}
  stagesToExecute: []
  orgIdentifier: default
  projectIdentifier: test
  pipelineIdentifier: testTriggerOverrideInputs
  source:
    type: Webhook
    spec:
      type: Custom
      spec:
        payloadConditions: []
        headerConditions: []
  inputSetRefs:
    - myInputSet
```

Input Set:
```yaml
inputSet:
  name: myInputSet
  tags: {}
  identifier: myInputSet
  orgIdentifier: default
  projectIdentifier: test
  pipeline:
    identifier: testTriggerOverrideInputs
    stages:
      - stage:
          identifier: stage2
          type: Deployment
          spec:
            service:
              serviceInputs:
                serviceDefinition:
                  type: Kubernetes
                  spec:
                    artifacts:
                      primary:
                        primaryArtifactRef: gfgjhjh
                        sources:
                          - identifier: gfgjhjh
                            type: Gcr
                            spec:
                              tag: v0.4
    variables:
      - name: var1
        type: String
        value: abc
      - name: var2
        type: String
        value: def
```
We observe that the artifact tag, as well as var1 and var2 are coming from the input set.

![](./static/input_set_without_override.png)

If you want to change the tag to ``v0.5`` during the pipeline trigger execution, you can define an ``inputYaml`` in the trigger YAML. The inputYaml is similar to the Input set YAML; you only need to modify the value of the variable you want to override.

```yaml
trigger:
  name: triggerWithInputSetOverrides
  identifier: triggerWithInputSetOverrides
  enabled: true
  description: ""
  tags: {}
  stagesToExecute: []
  orgIdentifier: default
  projectIdentifier: test
  pipelineIdentifier: testTriggerOverrideInputs
  source:
    type: Webhook
    spec:
      type: Custom
      spec:
        payloadConditions: []
        headerConditions: []
  inputSetRefs:
    - myInputSet
  inputYaml: |
    pipeline:
      identifier: triggerWithInputSetOverrides
      stages:
        - stage:
            identifier: stage2
            type: Deployment
            spec:
              service:
                serviceInputs:
                  serviceDefinition:
                    type: Kubernetes
                    spec:
                      artifacts:
                        primary:
                          primaryArtifactRef: gfgjhjh
                          sources:
                            - identifier: gfgjhjh
                              type: Gcr
                              spec:
                                tag: v0.5
      variables:
        - name: var2
          type: String
          value: overridenValue
```
![](./static/input_set_with_override.png)

We observe that the artifact tag and ``var2`` are coming from the override inputs. ``var1`` is still coming from the input set, since we didn't override it in the trigger's YAML.


:::info note
1. When ``inputYaml`` is provided, the user-supplied values take precedence over all other configurations. In other words, any values specified in the  ``inputYaml`` section will override and take preference over the corresponding values in the Input Set.
2. It's crucial to structure the ``inputYaml`` similarly to what is defined in the Pipeline Input Set. Additionally, ensure that you provide the correct pipeline, stage, or step ``identifier``.
3. If you have an array structure in the Input YAML and need to override one of its values you need to provide the entire array structure in the input YAML, you cannot override only one part of the array.
:::
