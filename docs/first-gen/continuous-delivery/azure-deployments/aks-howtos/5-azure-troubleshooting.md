---
title: 5 - Azure ACR to AKS Troubleshooting
description: General troubleshooting steps for Azure AKS deployments.
sidebar_position: 60
helpdocs_topic_id: mesbafbntm
helpdocs_category_id: mkyr84ulx3
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](/docs/get-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-cd-quickstart.md).The following troubleshooting steps should help address common issues.

#### Failed to pull image

Kubernetes might fail to pull the Docker image set up in your Service:


```
Event  : Pod   harness-example-deployment-6b8794c59-2z99v   Error: ErrImagePull   Failed  
Event  : Pod   harness-example-deployment-6b8794c59-2z99v   Failed to pull image   
"harnessexample.azurecr.io/todolist-sample:latest": rpc error: code = Unknown desc = Error response from daemon:   
Get https://harnessexample.azurecr.io/v2/todolist-sample/manifests/latest: unauthorized: authentication required   Failed
```
This is caused by the `createImagePullSecret` setting set to `false` in the values.yaml file in Service **Manifests**.

To fix this, set the `createImagePullSecret` setting set to `true`, as described in [Modify ImagePullSecret](2-service-and-artifact-source.md#modify-image-pull-secret):


```
createImagePullSecret: true
```
### Next Steps

* [Kubernetes Deployments](/docs/category/kubernetes-deployments)
* [Secrets Management](../../../firstgen-platform/security/secrets-management/secret-management.md)
* [Continuous Verification](../../continuous-verification/continuous-verification-overview/concepts-cv/what-is-cv.md)

