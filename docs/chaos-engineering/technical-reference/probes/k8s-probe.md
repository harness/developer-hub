---
title: Kubernetes probe
sidebar_position: 5
---

With the proliferation of custom resources & operators, especially in the case of stateful applications, the steady-state is manifested as status parameters/flags within Kubernetes resources. K8s Probe addresses verification of the desired resource state by allowing users to define the Kubernetes GVR (group-version-resource) with appropriate filters (field selectors/label selectors). The experiment makes use of the Kubernetes Dynamic Client to achieve this. The probe supports following CRUD operations:

- **create:** It creates kubernetes resource based on the data provided inside probe.data field.
- **delete:** It deletes matching kubernetes resource via GVR and filters (field selectors/label selectors).
- **present:** It checks for the presence of kubernetes resource based on GVR and filters (field selectors/label selectors).
- **absent:** It checks for the absence of kubernetes resource based on GVR and filters (field selectors/label selectors).

## Defining the probe

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
   <td><strong>Field</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Range</strong>
   </td>
   <td><strong>Notes</strong>
   </td>
  </tr>
  <tr>
   <td>group
   </td>
   <td>Flag to hold the group of the kubernetes resource for the k8sProbe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>group</code> contains group of the kubernetes resource on which k8sProbe performs the specified operation.
   </td>
  </tr>
  <tr>
   <td>version
   </td>
   <td>Flag to hold the apiVersion of the kubernetes resource for the k8sProbe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>version</code> contains apiVersion of the kubernetes resource on which k8sProbe performs the specified operation
   </td>
  </tr>
  <tr>
   <td>resource
   </td>
   <td>Flag to hold the kubernetes resource name for the k8sProbe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>resource</code> contains the kubernetes resource name on which k8sProbe performs the specified operation.
   </td>
  </tr>
  <tr>
   <td>namespace
   </td>
   <td>Flag to hold the namespace of the kubernetes resource for the k8sProbe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>namespace</code> contains namespace of the kubernetes resource on which k8sProbe performs the specified operation.
   </td>
  </tr>
  <tr>
   <td>fieldSelector
   </td>
   <td>Flag to hold the fieldSelectors of the kubernetes resource for the k8sProbe
   </td>
   <td>Optional
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>fieldSelector</code> contains fieldSelector to derived the kubernetes resource on which k8sProbe performs the specified operation.
   </td>
  </tr>
  <tr>
   <td>labelSelector
   </td>
   <td>Flag to hold the labelSelectors of the kubernetes resource for the k8sProbe
   </td>
   <td>Optional
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>labelSelector</code> contains labelSelector to derived the kubernetes resource on which k8sProbe performs the specified operation.
   </td>
  </tr>
  <tr>
   <td>operation
   </td>
   <td>Flag to hold the operation type for the k8sProbe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>operation</code> contains operation which should be applied on the kubernetes resource as part of k8sProbe. It supports four type of operation. It can be one of <code>create, delete, present, absent</code>.
   </td>
  </tr>
</table>

### Run properties

<table>
  <tr>
   <td><strong>Field</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Range</strong>
   </td>
   <td><strong>Notes</strong>
   </td>
  </tr>
  <tr>
   <td>probeTimeout
   </td>
   <td>Flag to hold the timeout of the probe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: integer</code>
   </td>
   <td>The <code>probeTimeout</code> represents the time limit for the probe to execute the specified check and return the expected data
   </td>
  </tr>
  <tr>
   <td>retry
   </td>
   <td>Flag to hold the retry count of the probe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: integer</code>
   </td>
   <td>The <code>retry</code> contains the number of times a check is re-run upon failure in the first attempt before declaring the probe status as failed.
   </td>
  </tr>
  <tr>
   <td>interval
   </td>
   <td>Flag to hold the interval of the probe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: integer</code>
   </td>
   <td>The <code>interval</code> contains the interval for which probes waits between subsequent retries
   </td>
  </tr>
  <tr>
   <td>probePollingInterval
   </td>
   <td>Flag to hold the polling interval for the probes (applicable for all modes)
   </td>
   <td>Optional
   </td>
   <td>N/A <code>type: integer</code>
   </td>
   <td>The <code>probePollingInterval</code> contains the time interval for which continuous probe should be sleep after each iteration
   </td>
  </tr>
  <tr>
   <td>initialDelaySeconds
   </td>
   <td>Flag to hold the initial delay interval for the probes
   </td>
   <td>Optional
   </td>
   <td>N/A <code>type: integer</code>
   </td>
   <td>The <code>initialDelaySeconds</code> represents the initial waiting time interval for the probes.
   </td>
  </tr>
  <tr>
   <td>stopOnFailure
   </td>
   <td>Flags to hold the stop or continue the experiment on probe failure
   </td>
   <td>Optional
   </td>
   <td>N/A <code>type: boolean</code>
   </td>
   <td>The <code>stopOnFailure</code> can be set to true/false to stop or continue the experiment execution after probe fails
   </td>
  </tr>
</table>

## Definition

```yaml
probe:
  - name: "check-app-cluster-cr-status"
    type: "k8sProbe"
    k8sProbe/inputs:
      group: "<appGroup>"
      version: "<appVersion>"
      resource: "<appResource>"
      namespace: "default"
      fieldSelector: "metadata.name=<appResourceName>,status.phase=Running"
      labelSelector: "<app-labels>"
      operation: "present" # it can be present, absent, create, delete
    mode: "EOT"
    runProperties:
      probeTimeout: 5
      interval: 5
      retry: 1
```
