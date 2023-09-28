---
description: KB - Ability to view/filter pipeline executions by inputs. 
---
# Ability to view/filter pipeline executions by inputs

## Introduction

The harness provides a number of features for managing pipeline executions, including Viewing and comparing pipeline executions. 

You can view the history of all pipeline executions, and compare the compiled YAML of two executions to see what changed between them.

Resuming pipeline executions: If a pipeline execution fails, you can resume it from the point of failure. This can save time and resources, as you don't have to rerun the entire pipeline.

Retrying failed executions: If a pipeline execution fails, you can retry it from the beginning. This can be useful if you believe that the failure was caused by a transient error.

Filtering pipeline executions: You can filter pipeline executions by name, identifier, tags, and other criteria. This can help you find specific executions quickly.

Here are some additional resources that you may find helpful:

* Pipeline executions documentation: https://developer.harness.io/docs/platform/pipelines/view-and-compare-pipeline-executions/
* Pipeline execution API: https://apidocs.harness.io/tag/Pipeline-Execution-Details/

## Problem statement

How to view/filter pipeline executions by inputs. 

## Steps to achieve this use case
1. You can add used expressions or new pipeline variables in your pipeline to pipeline tags.
2. Then you can filter or search in the deployment dashboard based on the input you have provided to see the execution which ran with only that execution.

This is how you can view/filter pipeline executions by inputs.
 
