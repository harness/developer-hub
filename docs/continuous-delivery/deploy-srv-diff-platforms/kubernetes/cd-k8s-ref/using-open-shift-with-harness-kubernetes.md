---
title: Using OpenShift with Harness Kubernetes
description: OpenShift support in Harness.
sidebar_position: 10
helpdocs_topic_id: uajkpcmqjg
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness supports OpenShift for Kubernetes deployments. This topic reviews OpenShift support in the Harness Delegate and Pipelines.

## Kubernetes delegate and OpenShift

OpenShift has very locked down settings by default and so you can either customize the Harness Delegate YAML to make it adhere to a stricter security posture and/or use a non-root Delegate image. You also have the options to loosen restrictions when installing the Delegate.

### Using a delegate outside the cluster

Harness supports OpenShift using a Delegate running externally to the Kubernetes cluster.

Harness does support running Delegates internally for OpenShift 3.11 or greater, but the cluster must be configured to allow images to run as root inside the container in order to write to the filesystem.

Typically, OpenShift is supported through an external Delegate installation. The Delegate is installed outside of the target Kubernetes cluster. Next, you create a Kubernetes Cluster Connector, use its **Master URL** and **Service Account Token** settings, and select the external Delegate.

The following script is a quick method for obtaining the service account token. Run this script wherever you run kubectl to access the cluster.

Set the `SERVICE_ACCOUNT_NAME` and `NAMESPACE` values to the values in your infrastructure.


```bash
SERVICE_ACCOUNT_NAME=default  
NAMESPACE=mynamepace  
SECRET_NAME=$(kubectl get sa "${SERVICE_ACCOUNT_NAME}" --namespace "${NAMESPACE}" -o json | jq -r '.secrets[].name')  
TOKEN=$(kubectl get secret "${SECRET_NAME}" --namespace "${NAMESPACE}" -o json | jq -r '.data["token"]' | base64 -D)  
echo $TOKEN
```

Once configured, OpenShift is used by Harness as a typical Kubernetes cluster.

### Using a delegate inside the cluster

Harness supports running Delegates internally in the target cluster for OpenShift 3.11 or greater.

The cluster must be configured to allow images to run as root inside the container in order to write to the filesystem. You can overcome this requirement using disk permissions.

For example, you can set the securityContext appropriately in your pod spec of the Delegate where the user and group IDs align with what is specified in the image:


```yaml
...  
  securityContext:  
    runAsUser: 1000  
    runAsGroup: 3000  
    fsGroup: 2000  
...
```
In addition, you should use the **non-root-openshift** or **non-root-ubi** Delegate image, available on [Docker Hub](https://hub.docker.com/r/harness/delegate/tags).

## Deployment strategy support

In addition to standard workload type support in Harness (go to [What Can I Deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes)), Harness supports [DeploymentConfig](https://docs.openshift.com/container-platform/4.1/applications/deployments/what-deployments-are.html), [Route](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/routes.html), and [ImageStream](https://docs.openshift.com/enterprise/3.2/architecture/core_concepts/builds_and_image_streams.html#image-streams) across Canary, Blue Green, and Rolling deployment strategies.

Use `apiVersion: apps.openshift.io/v1` and not `apiVersion: v1`.

## Harness supports list objects

You can leverage Kubernetes list objects as needed without modifying your YAML for Harness.

When you deploy, Harness will render the lists and show all the templated and rendered values in the log.

Harness supports:

* List
* NamespaceList
* ServiceList
* For Kubernetes deployments, these objects are supported for all deployment strategies (Canary, Rolling, Blue Green).
* For Native Helm, these objects are supported for Rolling deployments.

If you run `kubectl api-resources` you should see a list of resources, and `kubectl explain` will work with any of these.

## Adding OpenShift templates

OpenShift templates are added in the **Manifests** section of a Deploy Stage Service.

1. Add an OpenShift TemplateIn your CD stage, click **Service**.
2. In **Service Definition**, select **Kubernetes**.
3. In **Manifests**, click **Add Manifest**.
4. In **Specify Manifest Type**, select **OpenShift Template**, and then click **Continue.**
5. In **Specify OpenShift Template Store**, select the Git provider where your template is located.  
   For example, click **GitHub**, and then select or create a new GitHub Connector. See [Connect to Code Repo](/docs/platform/connectors/code-repositories/connect-to-code-repo).
6. Click **Continue**. **Manifest Details** appears.
7. In **Manifest Identifier**, enter an Id for the manifest. It must be unique. It can be used in Harness expressions to reference this template's settings.  
   For example, if the Pipeline is named **MyPipeline** and **Manifest Identifier** were **myapp**, you could reference the **Branch** setting using this expression:

   `<+pipeline.stages.MyPipeline.spec.serviceConfig.serviceDefinition.spec.manifests.myapp.spec.store.spec.branch>`

8. In **Git Fetch Type**, select **Latest from Branch** or **Specific Commit Id/Git Tag**, and then enter the branch or commit Id/[tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) for the repo.
9. In **Template** **File Path**, enter the path to the template file. The Connector you selected already has the repo name, so you simply need to add the path from the root of the repo to the file.
10. Click **Submit**. The template is added to **Manifests**.

## OpenShift Param files

OpenShift Param Files are added in the **Manifests** section of a Deploy Stage Service.

1. Add an OpenShift Param FileIn your CD stage, click **Service**.
2. In **Service Definition**, select **Kubernetes**.
3. In **Manifests**, click **Add Manifest**.
4. In **Specify Manifest Type**, select **OpenShift Param**, and then click **Continue.**
5. In **Specify OpenShift Param Store**, select the Git provider where your param file is located.  
   For example, click **GitHub**, and then select or create a new GitHub Connector. See [Connect to Code Repo](/docs/platform/connectors/code-repositories/connect-to-code-repo).
6. Click **Continue**. **Manifest Details** appears.
7. In **Manifest Identifier**, enter an Id for the param file. It must be unique. It can be used in Harness expressions to reference this param file's settings.
8. In **Git Fetch Type**, select **Latest from Branch** or **Specific Commit Id/Git Tag**, and then enter the branch or commit Id/[tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) for the repo.
9. In **Paths**, enter the path(s) to the param file(s). The Connector you selected already has the repo name, so you simply need to add the path from the root of the repo to the file
10. Click **Submit**. The template is added to **Manifests**.

## Notes

* Make sure that you update your version to `apiVersion: apps.openshift.io/v1` and not `apiVersion: v1`.
* The token does not need to have global read permissions. The token can be scoped to the namespace.
* The Kubernetes containers must be OpenShift-compatible containers. If you are already using OpenShift, then this is already configured. But be aware that OpenShift cannot simply deploy any Kubernetes container. You can get OpenShift images from the following public repos: <https://hub.docker.com/u/openshift> and <https://access.redhat.com/containers>.
* Useful articles for setting up a local OpenShift cluster for testing: [How To Setup Local OpenShift Origin (OKD) Cluster on CentOS 7](https://computingforgeeks.com/setup-openshift-origin-local-cluster-on-centos/), [OpenShift Console redirects to 127.0.0.1](https://chrisphillips-cminion.github.io/kubernetes/2019/07/08/OpenShift-Redirect.html).

