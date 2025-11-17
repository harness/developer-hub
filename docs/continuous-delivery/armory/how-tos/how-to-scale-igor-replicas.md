---
title: How to Scale Igor Replicas
---

## Introduction
***Igor*** facilitates the use of Jenkins in Spinnaker pipelines (*a pipeline can be triggered by a Jenkins job or invoke a Jenkins job*).  Customers may need to scale Igor for redundancy purposes and provide additional resources for their environment.

## Prerequisites
Permissions to make administrative changes to the Spinnaker instance

## Instructions
#### In Halyard
To scale number of Igor replicas, the following setting must be added to Igor’s profile in hal config profiles directory e.g. (```~/.hal/default/profiles/```) in the ```igor-local.yml``` file.  If the file exists, please add the line to the file, otherwise, please create the file in the directory.

```locking.enabled: true```



``````
After this is enabled, you can following the below to scale replicas:[https://spinnaker.io/docs/reference/halyard/component-sizing/#replicas](https://spinnaker.io/docs/reference/halyard/component-sizing/#replicas)
 
#### In Operator

Here’s what it looks like in Operator.  The settings should be placed under ```spec.spinnakerConfig.profiles.igor```
apiVersion: spinnaker.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      igor:
        locking.enabled: true  # this must be set in order for Igor's number of replicas to scale to something greater than 1
 
``````
After this is enabled, you can following the below to scale replicas:[https://spinnaker.io/docs/reference/halyard/component-sizing/#replicas](https://spinnaker.io/docs/reference/halyard/component-sizing/#replicas)

