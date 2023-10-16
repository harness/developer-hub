---
title: SLO probe
sidebar_position: 7
---

Service Level Objective (SLO) probes let users validate the error budget for a given SLO when the corresponding application is under chaos, and determine the verdict based on the percentage change of the error budget. The probe leverages the API from the Service Reliability Management (SRM) module, and fetches the error budget values during the chaos execution time period. The success of a chaos probe can be defined based on the drop in the percentage of the error budget values. The percentage drop is defined by the user in the probe configuration.

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

Listed below is the probe schema for the SLO probe, with properties shared across all the probes and properties unique to the SLO probe.

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
   <td>name
   </td>
   <td>Flag to hold the name of the probe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>name</code> holds the name of the probe. It can be set based on the usecase.
   </td>
  </tr>
  <tr>
   <td>type
   </td>
   <td>Flag to hold the type of the probe
   </td>
   <td>Mandatory
   </td>
   <td><code>httpProbe, k8sProbe, cmdProbe, promProbe</code>
   </td>
   <td>The <code>type</code> supports four types of probes. It can one of the httpProbe, k8sProbe, cmdProbe, promProbe.
   </td>
  </tr>
  <tr>
   <td>mode
   </td>
   <td>Flag to hold the mode of the probe
   </td>
   <td>Mandatory
   </td>
   <td><code> EOT, Edge, Continuous, OnChaos</code>
   </td>
   <td>The <code>mode</code> supports five modes of probes. SLO Probe supports EOT mode since the SRM API is called post the chaos execution.
   </td>
  </tr>
    <tr>
   <td>platformEndpoint
   </td>
   <td>Flag to hold the platfrom endpoint
   </td>
   <td>Mandatory
   </td>
   <td>N/A<code>type: string</code>
   </td>
   <td>The <code>platformEndpoint</code> stores the value of NG manager platform endpoint.
    ex: <code>https://app.harness.io/gateway/cv/api</code>
   </td>
  </tr>
  <tr>
   <td>sloIdentifier
   </td>
   <td>Flag to hold the slo identifier of the SLO
   </td>
   <td>Mandatory
   </td>
   <td>N/A<code>type: string</code>
   </td>
   <td>The <code>sloIdentifier</code> field consists of the SLO identifier for which the 
   error budget is calculated.
   </td>
  </tr>
</table>

### Source Metadata

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
   <td>apiTokenSecret
   </td>
   <td>Flag to hold API Token secret 
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>apiTokenSecret</code> contains the API Token. The secret should be added with <code>X-API-KEY</code> as the key and should be present in the same namespace where experiment is running.
   </td>
  </tr>
  <tr>
   <td>accountIdentifier
   </td>
   <td>Flag to hold Account ID
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>Account ID of the entity
   </td>
  </tr>
  <tr>
   <td>orgIdentifier
   </td>
   <td>Flag to hold Org ID
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>Organization ID of the entity
   </td>
  </tr>
  <tr>
   <td> projectIdentifier
   </td>
   <td>Flag to hold Project Identifier
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>Project ID of the entity
   </td>
  </tr>
</table>

### Comparator

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
   <td>type
   </td>
   <td>Flag to hold type of the data used for comparison
   </td>
   <td>Optional
   </td>
   <td><code>float</code>
   </td>
   <td>The <code>type</code> contains type of data, which should be compared as part of comparison operation.
   </td>
  </tr>
  <tr>
   <td>criteria
   </td>
   <td>Flag to hold criteria for the comparison
   </td>
   <td>Mandatory
   </td>
   <td>It supports <code>{`>=, <=, ==, >, <, !=, oneOf, between`}</code> for int & float type. And <code>{`equal, notEqual, contains, matches, notMatches, oneOf`}</code> for string type.
   </td>
   <td>The <code>criteria</code> contains criteria of the comparison, which should be fulfill as part of comparison operation.
   </td>
  </tr>
  <tr>
   <td>value
   </td>
   <td>Flag to hold value for the comparison
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>value</code> contains value of the comparison, which should follow the given criteria as part of comparison operation.
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
   <td>The <code>probeTimeout</code> represents the time limit for the probe to execute the specified check and return the expected data.
   </td>
  </tr>
  <tr>
   <td>attempt
   </td>
   <td>Flag to hold the attempt count of the probe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: integer</code>
   </td>
   <td>The <code>retry</code> contains the number of times a check is re-run upon failure in the first attempt before declaring the probe status as failed.
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
   <td>The <code>stopOnFailure</code> can be set to true/false to stop or continue the experiment execution after probe fails.
   </td>
  </tr>
  <tr>
   <td>evaluationTimeout
   </td>
   <td>Flags to hold the total evaluation time for the probe
   </td>
   <td>Optional
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>evaluationTimeout</code> is the time period for which the error budget values are fetched and based on the chaos execution time period, the percentage change is calculated.
   </td>
  </tr>
</table>

## Definition

```yaml
probe:
  - name: "slo-probe"
    type: "sloProbe"
    sloProbe/inputs:
      platformEndpoint: "<platform-endpoint>"
      sloIdentifier: "<slo-identifier>"
      sloSourceMetadata:
        apiTokenSecret: "<api-token>"
        scope:
          accountIdentifier: "<account-identifier>"
          orgIdentifier: "<org-idetifier>"
          projectIdentifier: "<project-identifier>"
        comparator:
          type: float
          criteria: <
          value: "0.1"
    mode: "EOT"
    runProperties:
      evaluationTimeout: 5m
      attempt: 2
      probeTimeout: 1000ms
      stopOnFailure: false
```
