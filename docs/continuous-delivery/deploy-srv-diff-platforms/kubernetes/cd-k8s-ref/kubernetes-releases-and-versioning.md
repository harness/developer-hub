---
title: Kubernetes releases and versioning
description: How Harness tracks Kubernetes releases and versions.
sidebar_position: 9
helpdocs_topic_id: zahb65jgmy
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how Harness tracks releases and versions for Kubernetes deployments.

Every Harness deployment creates a new release with an incrementally increasing number. Release history is stored in the Kubernetes cluster in a ConfigMap or Secret. ConfigMap or Secret are essential for release tracking, versioning, and rollback.

By default, all ConfigMaps and Secrets are versioned by Harness. The corresponding references for these ConfigMaps and Secrets in other manifest objects are also updated (for example, managed workloads like Deployment, StatefulSet, and so on).
Versioning does not change how you use ConfigMaps or Secrets. You need not reference the release numbers when using ConfigMaps or Secrets. 

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

In some cases, you might want to skip versioning. For example, skip versioning for: 
- ImagePullSecret because it never changes.
- TLS certs if they are referred in a Kubernetes container command or arguments.

For cases where versioning is not required, it can be skipped by using these two ways: 
- Annotate the manifest provided in the Harness service's **Manifests** section with `harness.io/skip-versioning: "true"`.
- In the Harness service's **Manifest Configuration** page, select **Manifests** > **Advanced**, and then select the **Skip Versioning** checkbox.

:::note info

Versioning is not done when declarative rollback is enabled.

:::

### Release Name

Harness also uses a release name for tracking releases. You can supply a release name in a stage's infrastructure **Release Name** setting.
Release name is used to create the corresponding Harness release ConfigMap or Secret. Therefore, the provided release name should be a valid [DNS subdomain name](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-subdomain-names).

:::note info

When declarative rollback is enabled, the corresponding Secret name format is `harness.release.<release-name>.<release-number>`.

:::

