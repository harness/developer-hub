---
title: Continuous Integration (CI) FAQs
description: This article addresses some frequently asked questions about Harness Continuous Integration (CI).
# sidebar_position: 2
helpdocs_topic_id: qn0f5ut6ok
helpdocs_category_id: y7j7dl46ua
helpdocs_is_private: false
helpdocs_is_published: true
---

This article addresses some frequently asked questions about Harness Continuous Integration (CI).

In this topic:

* [General](continuous-integration-ci-faqs.md#general)
	+ [How can a step call service dependency?](continuous-integration-ci-faqs.md#how-can-a-step-call-service-dependency)
	+ [What is the maximum timeout for a CIE step or stage?](continuous-integration-ci-faqs.md#what-is-the-maximum-timeout-for-a-cie-step-or-stage)
	+ [What are the default values for memory and CPU for CIE steps?](continuous-integration-ci-faqs.md#what-are-the-default-values-for-memory-and-cpu-for-cie-steps)
	+ [How to replicate a list or a map of Drone plugin settings in CIE?](continuous-integration-ci-faqs.md#how-to-replicate-a-list-or-a-map-of-drone-plugin-settings-in-cie)
	+ [Permissions required for GitHub personal access token in NextGen and GitX.](continuous-integration-ci-faqs.md#permissions-required-for-git-hub-personal-access-token-in-next-gen-and-git-x)
	+ [Permissions required to run CIE builds in an OpenShift cluster.](continuous-integration-ci-faqs.md#permissions-required-to-run-cie-builds-in-an-open-shift-cluster)
	+ [List of minimum permissions required for service account role for Kubernetes connector.](continuous-integration-ci-faqs.md#list-of-minimum-permissions-required-for-service-account-role-for-kubernetes-connector)
	+ [How can you share the codebase configuration between stages in the CIE pipeline?](continuous-integration-ci-faqs.md#how-can-you-share-the-codebase-configuration-between-stages-in-the-cie-pipeline)
	+ [Does CIE support running Docker-in-Docker images?](continuous-integration-ci-faqs.md#does-cie-support-running-docker-in-docker-images)
	+ [How can you execute Docker commands in a CI pipeline that runs on a Kubernetes cluster that lacks a Docker runtime?](continuous-integration-ci-faqs.md#how-can-you-execute-docker-commands-in-a-ci-pipeline-that-runs-on-a-kubernetes-cluster-that-lacks-a-docker-runtime)

### General

#### How can a step call service dependency?

A step can call a service dependency on `localhost` or `127.0.0.1`along with the port on which the service dependency is running. See [Configure service dependency](../../continuous-integration/ci-technical-reference/configure-service-dependency-step-settings.md).

#### What is the maximum timeout for a CIE step or stage?

We have a maximum time limit of 24 hours for pod uptime. Hence, the CI stage can run for a maximum of 24 hours, and post that the pod dies.

The default Timeout for a CIE step is 10h.

#### What are the default values for memory and CPU for CIE steps?



|  |  |
| --- | --- |
| **Memory** | **CPU** |
| 500Mi | 400m |

#### How to replicate a list of Drone plugin settings in CIE?

For lists, merge them separated by a comma.

For example:



|  |  |
| --- | --- |
| **Drone** | **CIE** |
| 
```
 Settings:    tags:      - latest      - '1.0.1'      - '1.0'
```
 | 
```
Settings:    tags: latest,1.0.1,1.0
```
 |

#### Permissions required for GitHub personal access token in NextGen and GitX.

GitHub permission for personal access token (PAT) in NextGen:

* **Scopes:** select all the **repo** and **user** options.
![](./static/continuous-integration-ci-faqs-20.png)

* **Note:** When you enable API authentication in a GitHub connector (recommended), you should use the same personal access token for both [Authentication](../../platform/7_Connectors/ref-source-repo-provider/git-hub-connector-settings-reference.md#password-personal-access-token) and [API authentication](../../platform/7_Connectors/ref-source-repo-provider/git-hub-connector-settings-reference.md#api-authentication).
* **See also:** [GitHub connector setting reference](../../platform/7_Connectors/ref-source-repo-provider/git-hub-connector-settings-reference.md).

#### Permissions required to run CIE builds in an OpenShift cluster.

You need the following permissions on Secret, Pod, and Event to run the CIE builds in an OpenShift cluster:

`create`

`get`

`list`

`watch`

`update`

`delete`

#### List of minimum permissions required for service account role for a Kubernetes connector.

You need the following permissions for a service account role for a Kubernetes connector:

Pods and secrets

`create`

`get`

`list`

`watch`

`update`

`delete`

Events

`list`

`watch`

#### How can you share the codebase configuration between stages in the CIE pipeline?

You can use the [Save and restore cache](../../continuous-integration/use-ci/caching-ci-data/saving-cache.md) steps to share data between stages. Each CIE stage runs in a different pod. The workspace allows you to share data between different steps in the same stage.

#### Does CIE support running Docker-in-Docker images?

Yes! See [Run Docker-in-Docker in a CI stage](../../continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md).

#### How can you execute Docker commands in a CI pipeline that runs on a Kubernetes cluster that lacks a Docker runtime?

DinD (Docker-in-Docker) can be run as a service, with the **shared path** set to `/var/run`. Following that, the steps can be executed as Docker commands. This works regardless of the Kubernetes container runtime.

The DinD service does not connect to the Kubernetes node daemon. It launches a new Docker daemon on the pod, and other containers use that Docker daemon to run their commands.

