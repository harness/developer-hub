---
title: Kubernetes rollback
description: How Harness does Kubernetes roll backs.
sidebar_position: 7
helpdocs_topic_id: rt449t1xhy
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
canonical_url: https://www.harness.io/blog/blue-green-canary-deployment-strategies
---

This topic describes how Harness rolls back to the last successful version of your workload in response to failures.

Harness follows standard Kubernetes behavior during rollback. See [kubectl rollout undo](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-undo-em-).

## Workload rollback only

Rollback rolls back workloads only. If there are other objects or operations executed in your stage, Harness does not roll those back.

For details on Harness Kubernetes workloads, see [What Can I Deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes).

## Declarative rollback

You can use an alternative rollback behavior for Kubernetes deployments called declarative rollback.

Declarative rollback uses `kubectl apply -f <prevision version of manifest>` instead of `kubectl rollout undo`. 

This method reduces the risk of getting in the wrong state in the subsequent deployment because the merge state is impacted by the `rollout undo` command.

To enable declarative rollback, configure the following Harness service options. These options are defined in the service because they are tied to the service's manifests.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="YAML" label="YAML" default>


Set the following options in the Harness service YAML:

- `skipResourceVersioning: false`
- `enableDeclarativeRollback: true`

Here's an example of a service with these settings configured.

```yaml
service:
  name: nginx
  identifier: K8s
  tags:
    harness: "app"
    sample: "demo"
  serviceDefinition:
    spec:
      artifacts:
        primary: {}
      manifests:
        - manifest:
            identifier: dev
            type: K8sManifest
            spec:
              store:
                type: Harness
                spec:
                  files:
                    - /Sample Manifest Onboarding
              valuesPaths:
                - /values.yaml
              skipResourceVersioning: false
              enableDeclarativeRollback: true
      variables:
        - name: replica
          type: String
          description: ""
          value: "1"
        - name: cpu
          type: String
          description: "nginx cpu"
          value: "0.25"
        - name: memory
          type: String
          description: "nginx memory"
          value: 1Gb
    type: Kubernetes
```


</TabItem>
  <TabItem value="Pipeline Studio" label="Pipeline Studio">


To configure these options in Pipeline Studio, do the following:

1. In **Services**, select the Kubernetes service.
2. In **Manifests**, add or edit a manifest.
3. In the manifest wizard, navigate to **Manifest Details**.
4. Expand **Advanced**.
5. Select **Enable Declarative Rollback**.

<DocImage path={require('./static/1d291017453e675f4cac3d206b5fb18bcc56319ed29f50c964c336668f087057.png')} width="60%" height="60%" title="Click to view full size image" />

The **Skip Resource Versioning** option is disabled automatically.


</TabItem>
</Tabs>



### Important notes:

- Harness stores the manifest in the release history and fetches the last successful manifest for rollback.
- There is no more incremental versioning of the ConfigMap and Secret objects as there is with `kubectl rollout undo`.
- During rollback, Harness reapplies the previous manifest. This is the declarative method, and it includes the ConfigMap and Secrets of the last known good state.
- With standard rollback, Harness stores release history in one ConfigMap. With declarative rollback, Harness stores release history in Secrets. Each release is stored in a different Secret, with one Secret per release.
-  Harness uses a fixed limit of 2 in its release history cleanup logic, but release history cleanup is performed before the currently executing release goes through. Consequently, on average, you will have 3 secrets:
   - Current release Secret.
   - Previous successful release Secret.
   - One more previous release Secret.

### Rollback Support for ConfigMap and Secret Changes

By default, Kubernetes does not restart pods when only ConfigMap or Secret objects are updated. As a result, declarative rollbacks that involve changes to these objects may not take effect as expected.

Enable the `CDS_MANIFEST_HASH_WITH_DECLARATIVE_ROLLBACK` feature flag to ensure ConfigMap and Secret changes are correctly rolled back. When enabled, Harness will:

* Generate a hash for ConfigMap and Secret objects during deployment.
* Add the hash to the kubernetes workload/manifest. 
* Apply the previous manifest when a rollback is triggered. Now, Kubernetes will enforce the diff in the manifest caused by the hash and restart the pod when it needs, ensuring that the rolled-back configuration is applied.

This feature enhances rollback and roll-forward fidelity by ensuring pod restarts reflect all manifest changes, including non-restart-triggering objects like ConfigMaps and Secrets.

:::note

This feature is only applied to blue/green and rolling deployments.

:::

To enable the feature flag, contact [Harness Support](mailto:support@harness.io)

### Canary and blue green deployments

For canary and blue green deployments, Harness appends ConfigMaps and Secrets present in your manifests with suffixes. This is to differentiate them from the ConfigMaps and Secrets in already running, production manifests.

During canary deployments:

1. All ConfigMaps and Secrets are appended with the suffix `-canary`.
2. The rolling deployment segment of the canary deployment continues as usual.

During blue green deployments, when the stage color is `GREEN`, ConfigMaps and Secrets are appended with the suffix `-green`. Harness already appends the managed workload with the color name.

### Suffixes and character limits

If the `name + suffix` reaches the 253 character limit for ConfigMaps and Secrets, Harness tries to reduce the suffix length to fit the limit. 

For example, if name is 250 characters long, the suffix would be `-ca` for canary deployments.

## Scaling and rollback

Each time Harness deploys, the deployment gets new replicas that get scaled up and the old replicas are scaled down.

By default, Kubernetes keeps the last 10 revisions as [ReplicaSets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/).

When Harness performs rollback it identifies which revision number to use (`rollback-to`). Harness identifies that last successful ReplicaSet, and selects it to be scaled up.

## Rollback and artifacts

The artifact(s) used for the replicas that are scaled up as part of rollback are simply the artifact(s) from the time that version was deployed.

## Blue Green rollbacks

In the case of Blue Green, the resources are not versioned because a Blue Green deployment uses **rapid rollback**. Network traffic is simply routed back to the original instances.

You do not need to redeploy previous versions of the service/artifact and the instances that comprised their environment.

## Rolling Rollback step

You can add a **Rolling Rollback** step to roll back the workloads deployed by the [Rolling Deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment) step.

Simply add this step where you want to initiate a rollback. Note that this step applies to the deployments of the Rolling Deployment command, and not the [Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step).


## Troubleshooting Common errors
### Rollback Doesn't Occur `Unable to identify any canary deployments for release **********
Rollbacks for Canaries are dependant on the ability to save resource versions.  Harness has multiple ways to detect the canary resources that were created:

1. Based on task result, whenever task response contains the required information. In the case of some failures, this data will be missing.
2. If task response doesn’t have any details, as a fallback, Harness tries to look in the release history and find the canary release. 

There are events that result in an ability to save additional counts, which is how Harness deems a "new version" and a "rollback".  For example, delegate logs may indicate:

``` 
error: Invalid request: Failed to create reservation-service/Secret/harness.test.96. Code: 403, message: Forbidden Response body: {"kind":"Status","apiVersion":"v1","metadata":{},"status":"Failure","message":"secrets \"harness.test.96\" is forbidden: exceeded quota: resource-quota, requested: count/secrets=1, used: count/secrets=25, limited: count/secrets=25","reason":"Forbidden","details":{"name":"harness.test.96","kind":"secrets"},"code":403} 
```

In this case, Harness was unable to save the release details in cluster.  Since Harness uses the new revision, and we could not save it, then the new version essentially "does not exist" and so Harness cannot roll back the resources, as it never proceeded to the new version.

## See also

* [Kubernetes CD Quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart)
* [Kubernetes How-tos](/docs/category/kubernetes)
* [Kubernetes Deployments Overview](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview)

