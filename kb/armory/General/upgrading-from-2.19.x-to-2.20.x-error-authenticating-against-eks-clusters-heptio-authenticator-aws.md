---
title: Upgrading from 2.19.x to 2.20.x Error Authenticating Against EKS Clusters (heptio-authenticator-aws)
---

## Issue
Upon upgrading from 2.19.x to 2.20.x, ```heptio-authenticator-aws``` errors appear in CloudDriver LogsThe following type of error can be found in the CloudDriver Logs
2020-07-09 09:38:57.221  WARN 1 --- [0.0-7002-exec-5] c.n.s.c.k.v.c.ManifestController         : Failed to read manifest

com.netflix.spinnaker.clouddriver.kubernetes.v2.op.job.KubectlJobExecutor$KubectlException: Failed to read ingress from [podname]: Unable to connect to the server: getting credentials: exec: exec: "heptio-authenticator-aws": executable file not found in $PATH

	at com.netflix.spinnaker.clouddriver.kubernetes.v2.op.job.KubectlJobExecutor.get(KubectlJobExecutor.java:355) ~[clouddriver-kubernetes-v2-GCSFIX.jar:na]

## Cause
Heptio authenticator changed names within Kubernetes SIG as per:[https://github.com/kubernetes-sigs/aws-iam-authenticator/pull/108](https://github.com/kubernetes-sigs/aws-iam-authenticator/pull/108)Armory used to symlink heptio to the iam authenticator, but this was removed to preserve the original naming practice, as of 2.20.x

