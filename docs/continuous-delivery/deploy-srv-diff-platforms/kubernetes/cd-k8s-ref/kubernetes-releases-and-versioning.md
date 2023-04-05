---
title: Kubernetes Releases and Versioning
description: How Harness tracks Kubernetes releases and versions.
sidebar_position: 10
helpdocs_topic_id: zahb65jgmy
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how Harness tracks releases and versions in Kubernetes deployments.

Every Harness deployment creates a new release with an incrementally increasing number. Release history is stored in the Kubernetes cluster in a ConfigMap. This ConfigMap is essential for release tracking, versioning, and rollback.

By default, all managed workloads like Deployment, StatefulSet, DaemonSet and DeploymentConfig are versioned by Harness. Corresponding references in PodSpec are also updated with versions.

:::note

ConfigMap and Secret are not versioned by Harness.

:::

You can see the use of release numbers and versioning in the **Deployments** page details (`Current release number is`, `Previous Successful Release is 4`):


```bash
INFO   2019-02-15 10:53:33    Kind                Name                                    Versioned   
INFO   2019-02-15 10:53:33    Namespace           default                                 false       
INFO   2019-02-15 10:53:33    Secret              image-pull-secret                       false       
INFO   2019-02-15 10:53:33    Secret              sample                                  true        
INFO   2019-02-15 10:53:33    Deployment          nginx-deployment                        false       
INFO   2019-02-15 10:53:33      
INFO   2019-02-15 10:53:33      
INFO   2019-02-15 10:53:33    Current release number is: 5  
INFO   2019-02-15 10:53:33      
INFO   2019-02-15 10:53:33    Previous Successful Release is 4
```

Versioning does not change how you use Secrets. You do not need to reference versions when using Secrets.

For cases where versioning is not required, the manifest entered in the Harness Service **Manifests** section should be annotated with `harness.io/skip-versioning: "true"`.

For example. you might want to skip versioning is for an ImagePullSecret because it never changes, or for TLS certs if they are referred in a Kubernetes container cmd args.

Harness also uses a release name for tracking releases. You can supply a release name in a stage's Infrastructure **Release Name** setting.

