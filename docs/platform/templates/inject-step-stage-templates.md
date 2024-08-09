---
title: Inject step and stage in existing Template
description: It allows you to inject step and stage in existing templates wihthout a need to create a new version of the template.
sidebar_position: 7
---

Inject blocks provide a way to customize pipelines without affecting the main template. They allow users to add extra stages or steps at specified points, maintaining the integrity of the original template.

Steps and stages included in the inject block will behave the same as normal steps and stages in the pipeline.

Template editors will be able to add inject block in the pipeline template at any position between a stage.

![](./static/stage_inject.png)

Similarly you can add a inject block in the stage template at any position between a step. 

![](./static/step_inject.png)

Structure of the yaml with an inject step would look like:-

```yaml
template:
  name: injectTesing
  identifier: injectTesing
  versionLabel: v1
  type: Pipeline
  projectIdentifier: cxsa
  orgIdentifier: ljik
  tags: {}
  spec:
    stages:
      - stage:
          name: cdxd
          identifier: cdxd
          description: ""
          type: Custom
          spec:
            execution:
              steps:
                - step:
                    type: Wait
                    name: Wait_1
                    identifier: Wait_1
                    spec:
                      duration: 10s
                - inject:
                    identifier: inject12
                    name: inject12
                    steps: <+input>
                - step:
                    type: ShellScript
                    name: ShellScript_1
                    identifier: ShellScript_1
                    spec:
                      shell: Bash
                      executionTarget: {}
                      source:
                        type: Inline
                        spec:
                          script: exit 1
                      environmentVariables: []
                      outputVariables: []
                    timeout: 10m
                    failureStrategies:
                      - onFailure:
                          errors:
                            - AllErrors
                          action:
                            type: Ignore
          tags: {}
      - inject:
          name: inject
          identifier: inject
          stages: <+input>
      - stage:
          name: try
          identifier: try
          description: ""
          type: Custom
          spec:
            execution:
              steps:
                - step:
                    type: ShellScript
                    name: ShellScript_1
                    identifier: ShellScript_1
                    spec:
                      shell: Bash
                      executionTarget: {}
                      source:
                        type: Inline
                        spec:
                          script: dfg
                      environmentVariables: []
                      outputVariables: []
                    timeout: 10m
                    failureStrategies:
                      - onFailure:
                          errors:
                            - AllErrors
                          action:
                            type: Ignore
          tags: {}
```


