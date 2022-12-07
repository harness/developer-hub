---
title: Kubernetes Versioning and Annotations
description: How Harness tracks Kubernetes deployment releases and applies labels during deployments.
# sidebar_position: 2
helpdocs_topic_id: ttn8acijrz
helpdocs_category_id: yp3yaavhla
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic covers how Harness tracks Kubernetes deployment releases, and the labels Harness applies during deployments:

* [Releases and Versioning](#releases_and_versioning)
* [Harness Annotations and Labels](#harness_annotations_and_labels)

For a list of Harness built-in expressions, see [Built-in Variables List](/article/aza65y4af6-built-in-variables-list).

### Releases and Versioning

Every Harness deployment creates a new release with an incrementally increasing number. Release history is stored in the Kubernetes cluster in a ConfigMap. This ConfigMap is essential for release tracking, versioning and rollback.

By default, all the ConfigMap and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) resources are versioned by Harness. Corresponding references in PodSpec are also updated with versions.

You can see the use of release numbers and versioning in the **Deployments** page details:


```
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
Versioning does not change how you use Secrets. You do not need to reference versions when using Secrets.For cases where versioning is not required, the manifest entered in the Harness Service Manifests section should be annotated with `harness.io/skip-versioning: "true"`.

For example. you might want to skip versioning is for an ImagePullSecret because it never changes, or for TLS certs if they are referred to in [Kubernetes container command args](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/).

Harness also uses a release name for tracking releases. You can supply a release name in an Environment's [Infrastructure Definition](/article/v3l3wqovbe-infrastructure-definitions) **Release Name** field. By default, the value Harness uses is `release-${infra.kubernetes.infraId}`.

![](https://files.helpdocs.io/kw8ldg1itf/other/1568672670414/image.png)The `${infra.kubernetes.infraId}` expression is a unique identifier that identifies the combination of Service and Infrastructure Definition.

In the Infrastructure Definition **Service Infrastructure Mapping** below each listing has a unique identifier that can be referenced using `${infra.kubernetes.infraId}`:

![](https://files.helpdocs.io/kw8ldg1itf/articles/u3rp89v80h/1624554401882/clean-shot-2021-06-24-at-10-06-02.png)For a list of Harness built-in expressions, see [Built-in Variables List](/article/aza65y4af6-built-in-variables-list). See the [Infrastructure](/article/aza65y4af6-built-in-variables-list#infrastructure) and [Kubernetes](/article/aza65y4af6-built-in-variables-list#kubernetes) sections.

#### Release Name is Reserved for Internal Harness ConfigMap

The release name you enter in **Release Name** is reserved for the internal Harness ConfigMap used for tracking the deployment.

Do not create a ConfigMap that uses the same name as the release name. Your ConfigMap will override the Harness internal ConfigMap and cause a NullPointerException.

#### Skipping Versioning and Rollback

Skipping versioning (using `harness.io/skip-versioning: "true"`) effects rollback.

For example, if your Kubernetes Deployment object referred to **v1** of the configMap and then you deploy the Deployment along with config changes in the configMap resulting in a **v2** configMap, and the deployment then fails:

* **With versioning:** the rollback of the deployment goes back to a version that refers to **v1**, effectively reverting your config changes.
* **Without versioning:** rollback of deployment goes to its previous revision (reverting buildNo, or other deployment information), but the reference to configMap is to a non-versioned one. The configMap was overwritten, so it now refers to the new config. If the configMap change caused the failure then rollback will also fail.

### Harness Annotations and Labels

Harness applies labels during Kubernetes deployment that you can use to select objects you defined in your Harness Service **Manifests** section. Annotations are a way to pass additional metadata for resources to Harness. For a description of Annotations, see [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) from Kubernetes.

#### Quotes

In both annotations and labels, **boolean strings require quotes**. For example:

`harness.io/skip-versioning: "true"`

Regular strings do not requires quotes.

#### Annotations

The following Annotations can be put on resource specifications in the Harness Service **Manifests** section.

Annotation values must use quotes.

|  |  |  |
| --- | --- | --- |
| **Annotation** | **Value** | **Usage** |
| `harness.io/skip-versioning` | `"true"|"false"` | To exclude versioning of a resource (ConfigMap or Secret). |
| `harness.io/skip-file-for-deploy` | n/a | You might have manifest files for resources that you do not want to deploy as part of the main deployment.Instead, you tell Harness to ignore these files and then apply them separately using the Harness Apply step.Or you can simply ignore them until you wish to deploy them as part of the main deployment.Use `harness.io/skip-file-for-deploy` at the top of the manifest file to ignore its objects.See [Ignore a Manifest File During Deployment](/article/vv25jkq4d7-ignore-a-manifest-file-during-deployment). |
| `harness.io/direct-apply` | `"true"|"false"` | If more than one workload is present in the Service **Manifests** files, use this annotation to apply an unmanaged workload.Apply an unmanaged workload by setting the annotation to `"true"`.See [Ignore a Manifest File During Deployment](/article/vv25jkq4d7-ignore-a-manifest-file-during-deployment) and [Deploy Manifests Separately using Apply Step](/article/4vjgmjcj6z-deploy-manifests-separately-using-apply-step).Multiple workloads are supported in [Rolling Update](/article/dl0l34ge8l-create-a-kubernetes-rolling-deployment) deployment strategies. Multiple workloads are not supported in [Canary](/article/2xp0oyubjj-create-a-kubernetes-canary-deployment) and [Blue/Green](/article/ukftzrngr1-create-a-kubernetes-blue-green-deployment). |
| `harness.io/primary-service` | `"true"|"false"` | Identifies the primary Kubernetes service in a Blue/Green deployment. |
| `harness.io/stage-service` | `"true"|"false"` | Identifies the Kubernetes stage service in a Blue/Green deployment. |
| `harness.io/managed` | `"true"|"false"` | **Required** for Harness to identify that a DestinationRule or VirtualService is managed.This annotation is used to identify which DestinationRule or VirtualService Harness should update during traffic splitting when there are more than one.Harness requires that the managed VirtualService have only one route in the `http` list in order to know which one to update.If the DestinationRule/VirtualService uses `harness.io/managed: false`, that is the same as if `harness.io/managed` were omitted. In this case, Harness will not perform any traffic shifting.See [Set Up Kubernetes Traffic Splitting](/article/1qfb4gh9e8-set-up-kubernetes-traffic-splitting). |

##### Note on direct-apply

See [What Can I Deploy in Kubernetes?](/article/6ujb3c70fh).

#### Labels

The following labels are applied by Harness during deployment.



|  |  |  |
| --- | --- | --- |
| **Label** | **Value** | **Usage** |
| `harness.io/release-name` | `release name` | Applied on pods. Harness uses a release name for tracking releases, rollback, etc. You can supply a release name in an Environment's [Infrastructure Definition](https://docs.harness.io/article/n39w05njjv-environment-configuration#add_an_infrastructure_definition) **Release Name** field.By default, the value Harness uses is `release-${infra.kubernetes.infraId}`.Use `release-${infra.kubernetes.infraId}` for the **Release Name** instead of just `${infra.kubernetes.infraId}`. Kubernetes service and pod names follow DNS-1035 and must consist of lowercase alphanumeric characters or '-', start with an alphabetic character, and end with an alphanumeric character. Using `release-` as a prefix will prevent any issues. |
| `harness.io/track` | `canary|stable` | Applied on pods in a Canary deployment. |
| `harness.io/color` | `blue|green` | Applied on pods in a Blue/Green deployment. |

### Next Steps

* [Create a Kubernetes Blue/Green Deployment](/article/ukftzrngr1-create-a-kubernetes-blue-green-deployment)
* [Ignore a Manifest File During Deployment](/article/vv25jkq4d7-ignore-a-manifest-file-during-deployment)
* [Deploy Manifests Separately using Apply Step](/article/4vjgmjcj6z-deploy-manifests-separately-using-apply-step)
* [Set up Kubernetes Ingress Rules](/article/tot87l7e6k-set-up-kubernetes-ingress-rules)

