---
title: Run all pipeline steps in one pod
description: This topic describes how to run all pipeline steps in one delegate pod.
sidebar_position: 2
---

Harness uses delegates for all operations. To select specific delegates pods to perform the task, Harness uses those delegate pods only. If you don't select specific delegates, Harness manager picks the delegate. For more information, go to [How Harness Manager picks delegates](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/#how-harness-manager-picks-delegates).

This topic describes how to run all pipeline steps in a single delegate pod.

## Configure pipelines to run steps in the same pod

When you have multiple steps in your pipeline, you can configure your delegate to run all the steps in the same pod.

To run all the steps in the same pod, do the following:

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
