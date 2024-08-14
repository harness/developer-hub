---
title: Kubernetes probe
sidebar_position: 5
description: Features and specification of the Kubernetes probe
redirect_from:
- /docs/chaos-engineering/technical-reference/probes/k8s-probe
- /docs/chaos-engineering/features/probes/k8s-probe
---

With the proliferation of custom resources and operators, especially in the case of stateful applications, the steady state is manifested as status parameters or flags within Kubernetes resources. K8s Probe addresses verification of the desired resource state by allowing users to define the Kubernetes GVR (group-version-resource) with appropriate filters (field selectors or label selectors). The experiment makes use of the Kubernetes Dynamic Client to achieve this. The probe supports the following CRUD operations:

- **create:** Creates Kubernetes resource based on the data provided inside the probe.k8sProbe/inputs.data field.
- **delete:** Deletes matching kubernetes resource via GVR and filters (field selectors/label selectors).
- **present:** Checks for the presence of Kubernetes resource based on GVR and filters (field selectors or label selectors).
- **absent:** Checks for the absence of Kubernetes resource based on GVR and filters (field selectors or label selectors).

:::tip
The Kubernetes probe is fully declarative in the way they are conceived
:::

## Probe definition

You can define the probes at **.spec.experiments[].spec.probe** path inside the chaos engine.

```yaml
kind: Workflow
apiVersion: argoproj.io/v1alpha1
spec:
  templates:
    - inputs:
        artifacts:
          - raw:
              data: |
                apiVersion: litmuschaos.io/v1alpha1
                kind: ChaosEngine
                spec:
                  experiments:
                    - spec:
                        probe:
                          ####################################
                          Probes are defined here
                          ####################################
```

## Schema

Listed below is the probe schema for the Kubernetes probe, with properties shared across all the probes and properties unique to the Kubernetes probe.

<table>
  <tr>
   <td><strong>Field</strong> </td>
   <td><strong>Description</strong></td>
   <td><strong>Type</strong></td>
   <td><strong>Range</strong></td>
   <td><strong>Notes</strong> </td>
  </tr>
  <tr>
   <td>group </td>
   <td>Flag to hold the group of the Kubernetes resource for the k8sProbe </td>
   <td>Optional </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>group</code> contains group of the Kubernetes resource on which k8sProbe performs the specified operation.</td>
  </tr>
  <tr>
   <td>version </td>
   <td>Flag to hold the apiVersion of the Kubernetes resource for the k8sProbe </td>
   <td>Mandatory </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>version</code> contains apiVersion of the Kubernetes resource on which k8sProbe performs the specified operation </td>
  </tr>
  <tr>
   <td>resource </td>
   <td>Flag to hold the Kubernetes resource name for the k8sProbe </td>
   <td>Mandatory </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>resource</code> contains the Kubernetes resource name on which k8sProbe performs the specified operation. </td>
  </tr>
  <tr>
   <td>namespace </td>
   <td>Flag to hold the namespace of the Kubernetes resource for the k8sProbe </td>
   <td>Optional </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>namespace</code> contains namespace of the Kubernetes resource on which k8sProbe performs the specified operation. </td>
  </tr>
  <tr>
   <td>fieldSelector </td>
   <td>Flag to hold the fieldSelectors of the Kubernetes resource for the k8sProbe </td>
   <td>Optional </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>fieldSelector</code> contains fieldSelector to derived the Kubernetes resource on which k8sProbe performs the specified operation. </td>
  </tr>
  <tr>
   <td>labelSelector </td>
   <td>Flag to hold the labelSelectors of the Kubernetes resource for the k8sProbe </td>
   <td>Optional </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>labelSelector</code> contains labelSelector to derived the Kubernetes resource on which k8sProbe performs the specified operation. </td>
  </tr>
  <tr>
   <td>operation</td>
   <td>Flag to hold the operation type for the k8sProbe </td>
   <td>Mandatory </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>operation</code> contains operation which should be applied on the Kubernetes resource as part of k8sProbe. It supports four type of operation. It can be one of <code>create, delete, present, absent</code>.</td>
  </tr>
  <tr>
   <td>resourceNames </td>
   <td>Flag to hold the resourceNames of the Kubernetes resource </td>
   <td>Optional </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>resourceNames</code> contains Kubernetes resources used for many requests. </td>
  </tr>
</table>

### Run properties

<table>
  <tr>
   <td><strong>Field</strong> </td>
   <td><strong>Description</strong> </td>
   <td><strong>Type</strong> </td>
   <td><strong>Range</strong> </td>
   <td><strong>Notes</strong> </td>
  </tr>
  <tr>
   <td>probeTimeout </td>
   <td>Flag to hold the timeout of the probe </td>
   <td>Mandatory </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>probeTimeout</code> represents the time limit for the probe to execute the specified check and return the expected data </td>
  </tr>
  <tr>
   <td>attempt </td>
   <td>Flag to hold the attempt of the probe </td>
   <td>Mandatory </td>
   <td>N/A <code>type: integer</code> </td>
   <td>The <code>attempt</code> contains the number of times a check is run upon failure in the previous attempts before declaring the probe status as failed.</td>
  </tr>
  <tr>
   <td>interval </td>
   <td>Flag to hold the interval of the probe </td>
   <td>Mandatory </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>interval</code> contains the interval for which probes waits between subsequent retries</td>
  </tr>
  <tr>
   <td>probePollingInterval </td>
   <td>Flag to hold the polling interval for the probes (applicable for all modes) </td>
   <td>Optional </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>probePollingInterval</code> contains the time interval for which continuous and onchaos probe should be sleep after each iteration</td>
  </tr>
  <tr>
   <td>initialDelaySeconds</td>
   <td>Flag to hold the initial delay interval for the probes</td>
   <td>Optional</td>
   <td>N/A <code>type: integer</code></td>
   <td>The <code>initialDelaySeconds</code> represents the initial waiting time interval for the probes.</td>
  </tr>
  <tr>
   <td>stopOnFailure</td>
   <td>Flags to hold the stop or continue the experiment on probe failure</td>
   <td>Optional</td>
   <td>N/A <code>type: boolean</code></td>
   <td>The <code>stopOnFailure</code> can be set to true/false to stop or continue the experiment execution after probe fails. When the experiment is stopped and the probe fails, the experiment along with the associated faults are aborted. This is applicable only for chaos experiments that use a Kubernetes infrastructure (dedicated infrastructure or Harness Delegate). </td>
  </tr>
</table>

## Definition

```yaml
probe:
  - name: "check-app-status"
    type: "k8sProbe"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "pods"
      namespace: "default"
      fieldSelector: "status.phase=Running"
      labelSelector: "app=nginx"
      operation: "present" # it can be present, absent, create, delete
    mode: "EOT"
    runProperties:
      probeTimeout: 5s
      interval: 2s
      attempt: 1
```

### Create operation

It creates the Kubernetes resources based on the data specified inside in the `probe.k8sProbe/inputs.data` field.

Use the following example to tune this:

```yaml
# create the given resource provided inside data field
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      probe:
      - name: "create-percona-pvc"
        type: "k8sProbe"
        k8sProbe/inputs:
          # group of the resource
          group: ""
          # version of the resource
          version: "v1"
          # name of the resource
          resource: "persistentvolumeclaims"
          # namespace where the instance of resource should be created
          namespace: "default"
          # type of operation
          # supports: create, delete, present, absent
          operation: "create"
          # contains manifest, which can be used to create the resource
          data: |
            kind: PersistentVolumeClaim
            apiVersion: v1
            metadata:
              name: percona-mysql-claim
              labels:
                target: percona
            spec:
              storageClassName: standard
              accessModes:
              - ReadWriteOnce
              resources:
                requests:
                  storage: 100Mi
        mode: "SOT"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
```


### Delete operation

It deletes matching Kubernetes resources via GVR and filters (field selectors or label selectors) provided at `probe.k8sProbe/inputs`.

Use the following example to tune this:

```yaml
# delete the resource matched with the given inputs
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      probe:
      - name: "delete-percona-pvc"
        type: "k8sProbe"
        k8sProbe/inputs:
          # group of the resource
          group: ""
          # version of the resource
          version: "v1"
          # name of the resource
          resource: "persistentvolumeclaims"
          # namespace of the instance, which needs to be deleted
          namespace: "default"
          # labels selectors for the k8s resource, which needs to be deleted
          labelSelector: "openebs.io/target-affinity=percona"
          # fieldselector for the k8s resource, which needs to be deleted
          fieldSelector: ""
          # type of operation
          # supports: create, delete, present, absent
          operation: "delete"
        mode: "EOT"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
```

### Present operation

It checks for the presence of Kubernetes resources based on GVR and filters (field selectors or labelselectors) provided at `probe.k8sProbe/inputs`.

Use the following example to tune this:

```yaml
# verify the existance of the resource matched with the given inputs inside cluster
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      probe:
      - name: "check-percona-pvc-presence"
        type: "k8sProbe"
        k8sProbe/inputs:
          # group of the resource
          group: ""
          # version of the resource
          version: "v1"
          # name of the resource
          resource: "persistentvolumeclaims"
          # namespace where the instance of resource
          namespace: "default"
          # labels selectors for the k8s resource
          labelSelector: "openebs.io/target-affinity=percona"
          # fieldselector for the k8s resource
          fieldSelector: ""
          # type of operation
          # supports: create, delete, present, absent
          operation: "present"
        mode: "SOT"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
```

### Absent operation

It checks for the absence of Kubernetes resources based on GVR and filters (field selectors or labelselectors) provided at `probe.k8sProbe/inputs`.

Use the following example to tune this:

```yaml
# verify that the no resource should be present in cluster with the given inputs
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      probe:
      - name: "check-percona-pvc-absence"
        type: "k8sProbe"
        k8sProbe/inputs:
          # group of the resource
          group: ""
          # version of the resource
          version: "v1"
          # name of the resource
          resource: "persistentvolumeclaims"
          # namespace where the instance of resource
          namespace: "default"
          # labels selectors for the k8s resource
          labelSelector: "openebs.io/target-affinity=percona"
          # fieldselector for the k8s resource
          fieldSelector: ""
          # type of operation
          # supports: create, delete, present, absent
          operation: "absent"
        mode: "EOT"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
```