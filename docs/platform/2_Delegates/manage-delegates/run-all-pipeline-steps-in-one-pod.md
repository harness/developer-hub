---
title: Run all pipeline steps in one pod
description: This topic describes how to run all pipeline steps in one delegate pod.
sidebar_position: 2
---

This topic describes how to to run all pipeline steps in one delegate pod.

## Configure pipelines to run steps in the same pod

When you have multiple steps in your pipeline, you can configure your delegate to run all the steps in the same pod.

To run all steps in the same pod, do the following:

* Provide the delegate hostname as a dynamic selector to pick one individual delegate among the delegate groups.

### Example pipeline

   ```yaml
   pipeline:
   name: test
   identifier: test
   projectIdentifier: harness-test
   orgIdentifier: default
   tags: {}
   stages:
    - stage:
        name: shell
        identifier: shell
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: select_delegate
                  identifier: select_delegate
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: |
                          echo $HOSTNAME
                          HOST_SELECTOR=$HOSTNAME
                    environmentVariables: []
                    outputVariables:
                      - name: HOST_SELECTOR
                        type: String
                        value: HOST_SELECTOR
                  timeout: 10m
              - step:
                  type: ShellScript
                  name: use delegate
                  identifier: use_delegate
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: echo <+execution.steps.select_delegate.output.outputVariables.HOST_SELECTOR>
                    environmentVariables: []
                    outputVariables: []
                    delegateSelectors:
                      - <+execution.steps.select_delegate.output.outputVariables.HOST_SELECTOR>
                  timeout: 10m
                  failureStrategies: []
        tags: {}
   ```
