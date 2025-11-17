---
title: Failed to read manifest- "Exception (Wait for Manifest to Stabilize. Unexpected Task Failure)"
---

## Issue
When trying to deployer clusters to Kubernetes in versions older than 1.16, the following errors can appear in the Clouddriver logs:
2021-05-04 21:17:16.032 WARN 1 --- [0.0-7002-exec-9] c.n.s.c.k.c.ManifestController : Failed to read manifest

com.netflix.spinnaker.clouddriver.kubernetes.op.handler.UnsupportedVersionException: No replicaSet is supported at api version extensions/v1beta1
at com.netflix.spinnaker.clouddriver.kubernetes.op.handler.KubernetesReplicaSetHandler.status(KubernetesReplicaSetHandler.java:98) ~[clouddriver-kubernetes.jar:na]


2021-05-05 14:29:09.653 WARN 1 --- [utionAction-538] c.n.s.c.k.c.a.KubernetesCachingAgent : kubernetes/KubernetesCoreCachingAgent[1/1]: Failure adding relationships for service

com.netflix.spinnaker.clouddriver.kubernetes.op.handler.UnsupportedVersionException: No replicaSet is supported at api version extensions/v1beta1
at com.netflix.spinnaker.clouddriver.kubernetes.op.handler.KubernetesReplicaSetHandler.getPodTemplateLabels(KubernetesReplicaSetHandler.java:167)
The UI shows the following: "Exception (Wait for Manifest to Stabilize. Unexpected Task Failure)"


## Cause
Kubernetes deployment targets prior to version 1.16 are not supported in v2.26.x, as per the following:[https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-26-2/](https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-26-2/)

