---
title: Deploy Kubernetes Custom Resources using CRDs
description: Harness supports all Kubernetes default resources, such as Pods, Deployments, DaemonSets, etc. For these resources, Harness supports steady state checking, versioning, displays instance…
sidebar_position: 1000 
helpdocs_topic_id: pmmfqqo1uh
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness supports all Kubernetes default resources, such as Pods, Deployments, DaemonSets, etc. For these resources, Harness supports steady state checking, versioning, displays instances on Harness dashboards, performs rollback, and other enterprise features.

In addition, Harness provides many of the same features for Kubernetes [custom resource](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/) deployments using Custom Resource Definitions (CRDs). CRDs are resources you create that extend the Kubernetes API to support your application.

Harness supports CRDs for both Kubernetes and OpenShift. There is no difference in their custom resource implementation.


### Before you begin

* [Kubernetes deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart)
* [Create a Kubernetes Rolling Deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment)
* [Kubernetes Releases and Versioning](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-releases-and-versioning)

### Limitations

#### Rollbacks

Harness only performs rollback for the default Kubernetes objects. For failures with CRDs, Harness redeploys the previous successful version.

Harness redeploys using the last successful release that matches the `release-name` label value (`harness.io/release-name: <release_name>`), described below.

#### Rolling deployment only

Blue/Green and Canary deployments are not supported at this time. See [Create a Kubernetes Rolling Deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment).

#### Versioning

ConfigMap and Secrets are not versioned.

### Review: Harness Custom Resource Requirements

To use a custom resource in Harness, you need to add the following annotations to its manifest:

#### Custom resource: managed-workload

`harness.io/managed-workload`: when you set this annotation to `true`, it informs Harness that this is a custom resource.

Here is an example:

```
...  
    "harness.io/managed-workload": "true"  
...
```
#### Custom resource: steadyStateCondition

`harness.io/steadyStateCondition`: since the resource is not a native Kubernetes resource, Harness needs a way to check its steady state.

Here is an example:


```
apiVersion: samplecontroller.k8s.io/v1alpha1  
kind: Foo  
metadata:  
  name: example-foo-demo  
  annotations:  
    "harness.io/managed-workload": "true"  
    "harness.io/steadyStateCondition": ${json.select("$..status.availableReplicas", response) == json.select("$..spec.replicas", response) && json.select("$..spec.deploymentName", response) == "example-foo-demo"}  
spec:  
  deploymentName: example-foo-demo  
  replicas: 2  
  template:  
    metadata:  
      labels:   
        "harness.io/release-name": {{release}}  
...
```
See Harness support for [JSON and XML Functors](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/json-and-xml-functors).

If the `steadyStateCondition` fails, Harness logs the following error message:


```
Status check for resources in namespace [[namespace]] failed.
```

#### Steady state on redeployments: use observedGeneration

The basic `steadyStateCondition` examples above work for first-time deployments, but can cause issues on **redeployments**. When Harness applies an updated manifest and immediately evaluates the condition, status fields from the *previous* successful deployment may still be present. If your condition only checks fields like `status.availableReplicas == spec.replicas`, it can evaluate to `true` before the controller has processed the new spec, causing the steady state check to pass instantly without verifying the current rollout.

To avoid this, include a **generation check** in your `steadyStateCondition`. Kubernetes increments `metadata.generation` every time the resource spec changes. Well-behaved controllers update `status.observedGeneration` after they finish reconciling that generation. By requiring both values to match, you ensure Harness waits until the controller has fully processed the current deployment.

**Recommended pattern:**

```yaml
"harness.io/steadyStateCondition": ${json.select("$..metadata.generation", response) == json.select("$..status.observedGeneration", response) && json.select("$..status.availableReplicas", response) == json.select("$..spec.replicas", response)}
```

This condition evaluates to `true` only when:

1. The controller has observed and reconciled the current generation (`metadata.generation == status.observedGeneration`).
2. The desired replica count matches the available replicas.

:::warning
If your CRD controller does not populate `status.observedGeneration`, this pattern will not work. Verify that your controller sets this field by running:

```bash
kubectl get <your-crd-resource> -o jsonpath='{.status.observedGeneration}'
```

If the field is empty, you need to either update your controller to track observed generations, or use an alternative field that changes on each reconciliation cycle.
:::

:::info Example: before and after
**Before (fails on redeployment):**
```yaml
"harness.io/steadyStateCondition": ${json.select("$..status.lifecycleState", response) == "STABLE"}
```

**After (works on all deployments):**
```yaml
"harness.io/steadyStateCondition": ${json.select("$..metadata.generation", response) == json.select("$..status.observedGeneration", response) && json.select("$..status.lifecycleState", response) == "STABLE"}
```
:::

#### Custom resource: failureCondition

`harness.io/failureCondition`: This annotation allows you to treat CRDs as jobs and specify custom logic that triggers a failure.

This annotation supports Failure states in Custom Resource Definitions (CRDs) when the Kubernetes Apply step is configured to run as a job. When this annotation is set to true, it will evaluate the condition and trigger a failure if the condition is met.

Here’s an example of how to configure the annotation:
```yaml
metadata:
  annotations:
    managed-workload: "true"
    failureCondition: "status.failed == 1"
```

**Important Note:** This annotation is opt-in and only affects users who explicitly configure it.
It provides enhanced control over job failure logic, enabling more precise management of CRD failure states.

#### Custom resource: release-name

`harness.io/release-name: <release_name>` in labels: this is required for Harness to track any pods for the custom resource.

This label is used for redeploys (which Harness performs in place of rollbacks for CRDs).

In the even of deployment failure, Harness will redeploy the last successful release that matches the `release-name` label value (`harness.io/release-name: <release_name>`).

The `<release_name>` must match the **Release Name** in the Harness Infrastructure Definition. See [Define Your Kubernetes Target Infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure).

You declare the release name in the values.yaml, for example `release:release-<+INFRA_KEY_SHORT_ID>` , and then reference it in the manifest as `{{.Values.release}}`.

Here is an example:


```
...  
  labels:  
    "harness.io/release-name": "{{.Values.release}}"  
...
```
#### Controller must add release name to pods

The CRD controller must add the `harness.io/release-name` label and value from the custom resource manifest to all the pods created for the custom resource. This process sets the label on the resource so Harness can track its releases.

This must be done programmatically by the controller.

Here is an example taken from the [Kubernetes sample controller on Github](https://github.com/kubernetes/sample-controller/blob/master/controller.go#L391):


```
func newDeployment(foo *samplev1alpha1.Foo) *appsv1.Deployment {  
  
  labelsFromSpec := foo.Spec.Template.Metadata.Labels  
  labels := map[string]string{  
    "app":        "nginx",  
    "controller": foo.Name,  
  }  
  for k, v := range labelsFromSpec {  
    labels[k] = v  
  }  
  
  klog.Info("Handle new deployment with labels: ", labelsFromSpec)  
  return &appsv1.Deployment{  
    ObjectMeta: metav1.ObjectMeta{  
      Name:      foo.Spec.DeploymentName,  
      Namespace: foo.Namespace,  
      OwnerReferences: []metav1.OwnerReference{  
        *metav1.NewControllerRef(foo, samplev1alpha1.SchemeGroupVersion.WithKind("Foo")),  
      },  
    },  
    Spec: appsv1.DeploymentSpec{  
      Replicas: foo.Spec.Replicas,  
      Selector: &metav1.LabelSelector{  
        MatchLabels: labels,  
      },  
      Template: corev1.PodTemplateSpec{  
        ObjectMeta: metav1.ObjectMeta{  
          Labels: labels,  
        },  
        Spec: corev1.PodSpec{  
          Containers: []corev1.Container{  
            {  
              Name:  "nginx",  
              Image: "nginx:latest",  
            },  
          },  
        },  
      },  
    },  
  }  
}
```
#### Example manifest

Here is an example manifest that includes a generation check to ensure the steady state condition works correctly on both first deployments and redeployments:


```
apiVersion: samplecontroller.k8s.io/v1alpha1  
kind: Foo  
metadata:  
  name: example-foo-demo  
  annotations:  
    "harness.io/managed-workload": "true"  
    "harness.io/steadyStateCondition": ${json.select("$..metadata.generation", response) == json.select("$..status.observedGeneration", response) && json.select("$..status.availableReplicas", response) == json.select("$..spec.replicas", response) && json.select("$..spec.deploymentName", response) == "example-foo-demo"}  
spec:  
  deploymentName: example-foo-demo  
  replicas: 2  
  template:  
    metadata:  
      labels:   
        "harness.io/release-name": {{release}}
```
This condition verifies three things: the controller has reconciled the current generation (`metadata.generation == status.observedGeneration`), the desired replicas match available replicas, and the deployment name is correct. The generation check prevents the steady state from passing immediately on redeployments when status fields are still satisfied from the previous deployment. Go to [Steady state on redeployments: use observedGeneration](#steady-state-on-redeployments-use-observedgeneration) to understand why the generation check is necessary.

### Step 1: Prepare target cluster

In most cases, the target deployment cluster will have the CustomResourceDefinition object already created. For example:


```
apiVersion: apiextensions.k8s.io/v1beta1  
kind: CustomResourceDefinition  
metadata:  
  name: foos.samplecontroller.k8s.io  
spec:  
  group: samplecontroller.k8s.io  
  version: v1alpha1  
  names:  
    kind: Foo  
    plural: foos  
  scope: Namespaced
```
After the CustomResourceDefinition object has been created in the cluster, you can create and deploy custom objects using Harness.

The `kind` field of the custom object comes from the spec of the CustomResourceDefinition object you created in your cluster.

For example:


```
apiVersion: samplecontroller.k8s.io/v1alpha1  
kind: Foo  
metadata:  
  name: example-foo-demo  
  labels:  
    "harness.io/release-name": "{{.Values.release}}"  
  annotations:  
    "harness.io/managed-workload": "true"  
    "harness.io/steadyStateCondition": ${json.select("$..status.availableReplicas", response) == json.select("$..spec.replicas", response) && json.select("$..spec.deploymentName", response) == "example-foo-demo"}spec:  
  deploymentName: example-foo-demo  
  replicas: 2
```
Ensure your target cluster has the CRD for the custom resource object you will create in your deployment.

For an example of a simple CRD setup, see [sample-controller](https://github.com/kubernetes/sample-controller) and [Extend the Kubernetes API with CustomResourceDefinitions](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/) from Kubernetes.

### Step 2: Define custom resources in Harness

You add the manifest for your custom object in a Harness Service, along with the artifact you will deploy. See [Kubernetes Services](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-services).

1. In Harness, click **Services**, and then **Add Service**.
2. Name your Service.
3. In **Deployment Type**, select **Kubernetes**.
4. Click **Save**. The new Kubernetes Service appears.
5. Add an artifact, as described in [CD artifact sources](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#docker).
6. Next, add the manifest for the custom object In **Manifests**.
7. You can add your manifest inline, remotely, or by uploading. See [Define Kubernetes Manifests](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-services#manifests). You can also use [Go templating](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-services#go-templating).
8. Ensure your manifest has the required annotations and label, as described in [Required Custom Resource Annotations and Labels](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-annotations-and-labels/).


### Step 3: Define target cluster

In the same Harness Application, create your Kubernetes target cluster as described in [Define Your Kubernetes Target Infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure).

Ensure that the **Release Name** matches the name in the manifest's label, as described in [Review: Required Custom Resource Annotations and Labels](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-annotations-and-labels/):

### Step 4: Create a pipeline for custom resource deployment

Only the Kubernetes Rolling deployment method is supported for CRDs. See [Create a Kubernetes Rolling Deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment).

1. In Harness, click **Pipelines**, and then click **Create a Pipeline**.
2. Name your pipeline.
3. Add a deployment stage and select **Kubernetes** as the deployment type.
4. In **Service**, select the Service with your custom object manifest.
5. In **Environment**, select the Environment containing the Infrastructure Definition you set up for the target cluster where your CRD is defined.
6. In **Infrastructure Definition**, select the Infrastructure Definition you set up for the target cluster where your CRD is defined.
7. Click **Continue**. When prompted, use a **Rolling** execution strategy.

There is nothing to configure in this pipeline unless you want to add additional steps. The default **Rollout Deployment** step will deploy your custom object.

You might want to run a [Shell Script](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step) step to display additional Kubernetes information. See [Harness Variables and Expressions](/docs/category/variables--expressions) for expressions you can use.

### Step 5: Deploy custom resource

Let's take a look at the logs from a CRD deployment.

#### Initialize

In the Initialize stage you can see that the release name has been added and a dry run was performed.


```
...  
---  
apiVersion: samplecontroller.k8s.io/v1alpha1  
kind: Foo  
metadata:  
  name: example-foo-demo  
  labels:  
    "harness.io/release-name": "release-66259216-da29-35c4-ad4b-1053ffdaaf55"  
  annotations:  
    "harness.io/managed-workload": "true"  
    "harness.io/steadyStateCondition": ${json.select("$..status.availableReplicas", response) == json.select("$..spec.replicas", response) && json.select("$..spec.deploymentName", response) == "example-foo-demo"}  
  
spec:  
  deploymentName: example-foo-demo  
  replicas: 2  
  
  
Validating manifests with Dry Run  
  
kubectl --kubeconfig=config apply --filename=manifests-dry-run.yaml --dry-run  
  
namespace/default configured (dry run)  
secret/harness-example configured (dry run)  
configmap/harness-example created (dry run)  
service/harness-example-svc configured (dry run)  
deployment.apps/harness-example-deployment configured (dry run)  
foo.samplecontroller.k8s.io/example-foo-demo configured (dry run)  

```
#### Prepare

In the Prepare stage the manifests are processed and the workloads are identified:


```
Manifests processed. Found following resources:   
  
Kind                Name                                    Versioned   
Namespace           default                                 false       
Secret              harness-example                         true        
ConfigMap           harness-example                         true        
Service             harness-example-svc                     false       
Deployment          harness-example-deployment              false       
Foo                 example-foo-demo                        false       
  
Current release number is: 8  
  
Previous Successful Release is 7  
...  
Found following Managed Workloads:   
  
Kind                Name                                    Versioned   
Deployment          harness-example-deployment              false       
Foo                 example-foo-demo                        false       
  
Versioning resources.  
  
Done
```
Notice that the custom object is identified by its CRD in **Kind**.

#### Apply

The Apply stage runs a [kubectl apply](https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/#kubectl-apply) using the manifests:


```
kubectl --kubeconfig=config apply --filename=manifests.yaml --record  
  
namespace/default unchanged  
secret/harness-example-8 configured  
configmap/harness-example-8 created  
service/harness-example-svc unchanged  
deployment.apps/harness-example-deployment configured  
foo.samplecontroller.k8s.io/example-foo-demo configured  
  
Done.
```
As this is the first deployment, the new object is identified as **configured**.

#### Wait for steady state

This stage performs a [kubectl get](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get) to display status about the custom resource.


```
...  
Status : example-foo-demo               "kubernetes.io/change-cause": "kubectl apply --kubeconfig=config --filename=manifests.yaml --record=true"  
  
Status : example-foo-demo           },  
  
Status : example-foo-demo           "creationTimestamp": "2020-07-21T09:55:42Z",  
  
Status : example-foo-demo           "generation": 11,  
  
Status : example-foo-demo           "name": "example-foo-demo",  
  
Status : example-foo-demo           "namespace": "default",  
  
Status : example-foo-demo           "resourceVersion": "119096798",  
  
Status : example-foo-demo           "selfLink": "/apis/samplecontroller.k8s.io/v1alpha1/namespaces/default/foos/example-foo-demo",  
  
Status : example-foo-demo           "uid": "f2e2847e-bfa8-4242-9354-db8c83c57df1"  
  
Status : example-foo-demo       },  
  
Status : example-foo-demo       "spec": {  
  
Status : example-foo-demo           "deploymentName": "example-foo-demo",  
  
Status : example-foo-demo           "replicas": 2  
  
Status : example-foo-demo       },  
  
Status : example-foo-demo       "status": {  
  
Status : example-foo-demo           "availableReplicas": 2  
  
Status : example-foo-demo       }  
  
Status : example-foo-demo   }  
  
Done.
```
#### Wrap up

Finally, the Wrap Up stage shows the deployed custom object:


```
...  
Name:         example-foo-demo  
Namespace:    default  
Labels:       harness.io/release-name: release-66259216-da29-35c4-ad4b-1053ffdaaf55  
Annotations:  harness.io/managed-workload: true  
              harness.io/steadyStateCondition:  
                ${json.select("$..status.availableReplicas", response) == json.select("$..spec.replicas", response) && json.select("$..spec.deploymentName...  
              kubectl.kubernetes.io/last-applied-configuration:  
                {"apiVersion":"samplecontroller.k8s.io/v1alpha1","kind":"Foo","metadata":{"annotations":{"harness.io/managed-workload":"true","harness.io/...  
              kubernetes.io/change-cause: kubectl apply --kubeconfig=config --filename=manifests.yaml --record=true  
API Version:  samplecontroller.k8s.io/v1alpha1  
Kind:         Foo  
Metadata:  
  Creation Timestamp:  2020-07-21T09:55:42Z  
  Generation:          11  
  Resource Version:    119096798  
  Self Link:           /apis/samplecontroller.k8s.io/v1alpha1/namespaces/default/foos/example-foo-demo  
  UID:                 f2e2847e-bfa8-4242-9354-db8c83c57df1  
Spec:  
  Deployment Name:  example-foo-demo  
  Replicas:         2  
Status:  
  Available Replicas:  2  
Events:  
  Type    Reason  Age                  From               Message  
  ----    ------  ----                 ----               -------  
  Normal  Synced  15s (x135 over 98m)  sample-controller  Foo synced successfully  
  
Done.
```
### See also

* [Delete Kubernetes Resources](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources/)
* [Deploy Manifests Separately using Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step)
* [Scale Kubernetes Pods](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/scale-kubernetes-replicas)

### Configure as code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

