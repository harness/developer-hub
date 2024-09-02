---
title: SLO probe
sidebar_position: 60
description: Features and specification of the SLO probe
redirect_from:
- /docs/chaos-engineering/technical-reference/probes/slo-probe
- /docs/chaos-engineering/features/probes/slo-probe
---

Service Level Objective (SLO) probes let users validate the error budget for a given SLO when the corresponding application is subject to chaos and determine the verdict based on the percentage change in the error budget. The probe leverages the API from the Service Reliability Management (SRM) module and fetches the error budget values during the chaos execution time period. The success of a chaos probe can be defined based on the drop in the percentage of the error budget values. The percentage drop is defined by the user in the probe configuration.

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

Listed below is the probe schema for the SLO probe, with properties shared across all the probes and properties unique to the SLO probe.

<table>
  <tr>
    <td><strong>Field</strong></td>
    <td><strong>Description</strong></td>
    <td><strong>Type</strong></td>
    <td><strong>Range</strong></td>
    <td><strong>Notes</strong></td>
  </tr>
  <tr>
    <td>name</td>
    <td>Flag to hold the name of the probe</td>
    <td>Mandatory</td>
    <td>N/A <code>type: string</code></td>
    <td>The <code>name</code> holds the name of the probe. It can be set based on the use case.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Flag to hold the type of the probe</td>
    <td>Mandatory</td>
    <td><code>httpProbe, k8sProbe, cmdProbe, promProbe, and datadogProbe.</code></td>
    <td>The <code>type</code> supports five types of probes: httpProbe, k8sProbe, cmdProbe, promProbe, and datadogProbe.</td>
  </tr>
  <tr>
    <td>mode</td>
    <td>Flag to hold the mode of the probe</td>
    <td>Mandatory</td>
    <td><code>EOT, Edge, Continuous, OnChaos</code></td>
    <td>The <code>mode</code> supports four modes of probes. SLO Probe supports EOT mode since the SRM API is called post the chaos execution.</td>
  </tr>
  <tr>
    <td>platformEndpoint</td>
    <td>Flag to hold the platform endpoint</td>
    <td>Mandatory</td>
    <td>N/A<code>type: string</code></td>
    <td>The <code>platformEndpoint</code> stores the value of NG manager platform endpoint. For example, <code>https://app.harness.io/gateway/cv/api</code></td>
  </tr>
  <tr>
    <td>sloIdentifier</td>
    <td>Flag to hold the slo identifier of the SLO</td>
    <td>Mandatory</td>
    <td>N/A<code>type: string</code></td>
    <td>The <code>sloIdentifier</code> field consists of the SLO identifier for which the error budget is calculated.</td>
  </tr>
  <tr>
    <td>evaluationTimeout</td>
    <td>Flags to hold the total evaluation time for the probe</td>
    <td>Optional</td>
    <td>N/A <code>type: string</code></td>
    <td>The <code>evaluationTimeout</code> is the time period for which the error budget values are fetched and based on the chaos execution time period, the percentage change is calculated.</td>
  </tr>
  <tr>
    <td>insecureSkipVerify</td>
    <td>Flag to skip certificate checks</td>
    <td>Optional</td>
    <td>bool</td>
    <td>The <code>insecureSkipVerify</code> contains flag to skip certificate checks.</td>
  </tr>
  <tr>
    <td>sloSourceMetadata</td>
    <td>Mandatory</td>
    <td>SLO source metadata</td>
    <td>string</td>
    <td> Comprises of identifiers used to fetch the details from SRM module. It includes APITokenSecret which is required to authenticate the request and the scope for the SLO entity.</td>
  </tr>
</table>

### SLO source metadata

<table>
  <tr>
    <td><strong>Field</strong></td>
    <td><strong>Description</strong></td>
    <td><strong>Type</strong></td>
    <td><strong>Range</strong></td>
    <td><strong>Notes</strong></td>
  </tr>
  <tr>
    <td>apiTokenSecret</td>
    <td>Flag to hold API Token secret</td>
    <td>Mandatory</td>
    <td>N/A <code>type: string</code></td>
    <td>The <code>apiTokenSecret</code> contains the API Token. The secret should be added with <code>X-API-KEY</code> as the key and should be present in the same namespace where experiment is running.</td>
  </tr>
  <tr>
    <td>scope</td>
    <td>Flag to hold scope</td>
    <td>Mandatory</td>
    <td> N/A </td>
    <td> Identifier such as accountID, orgID and projectID</td>
  </tr>
</table>

### Comparator

<table>
  <tr>
    <td><strong>Field</strong></td>
    <td><strong>Description</strong></td>
    <td><strong>Type</strong></td>
    <td><strong>Range</strong></td>
    <td><strong>Notes</strong></td>
  </tr>
  <tr>
    <td>type</td>
    <td>Flag to hold type of the data used for comparison</td>
    <td>Optional</td>
    <td><code>float</code></td>
    <td>The <code>type</code> contains type of data, which should be compared as part of comparison operation.</td>
  </tr>
  <tr>
    <td>criteria</td>
    <td>Flag to hold criteria for the comparison</td>
    <td>Mandatory</td>
    <td>It supports <code>{`&gt;=, &lt;=, ==, &gt;, &lt;, !=, oneOf, between`}</code> for int & float type. And <code>{`equal, notEqual, contains, matches, notMatches, oneOf`}</code> for string type.</td>
    <td>The <code>criteria</code> contains criteria of the comparison, which should be fulfill as part of comparison operation.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>Flag to hold value for the comparison</td>
    <td>Mandatory</td>
    <td>N/A <code>type: string</code></td>
    <td>The <code>value</code> contains value of the comparison, which should follow the given criteria as part of comparison operation.</td>
  </tr>
</table>

### Evaluation window

<table>
  <tr>
   <td><strong>Field</strong> </td>
   <td><strong>Description</strong> </td>
   <td><strong>Type</strong> </td>
   <td><strong>Range</strong> </td>
   <td><strong>Notes</strong> </td>
  </tr>
  <tr>
   <td>evaluationStartTime</td>
   <td>Flag to hold the evaluation start time of the probe</td>
   <td>Optional</td>
   <td>positive integer </td>
   <td>It represents the start time of the probe evaluation</td>
  </tr>
  <tr>
   <td>evaluationEndTime </td>
   <td>Flag to hold the evaluation end time of the probe </td>
   <td> Optional</td>
   <td> positive integer</td>
   <td>It represents the end time of the probe evaluation </td>
  </tr>
</table>

### Run properties

<table>
  <tr>
    <td><strong>Field</strong></td>
    <td><strong>Description</strong></td>
    <td><strong>Type</strong></td>
    <td><strong>Range</strong></td>
    <td><strong>Notes</strong></td>
  </tr>
  <tr>
    <td>probeTimeout</td>
    <td>Flag to hold the timeout of the probe</td>
    <td>Mandatory</td>
    <td>N/A <code>type: string</code></td>
    <td>The <code>probeTimeout</code> represents the time limit for the probe to execute the specified check and return the expected data</td>
  </tr>
  <tr>
    <td>attempt</td>
    <td>Flag to hold the attempt of the probe</td>
    <td>Mandatory</td>
    <td>N/A <code>type: integer</code></td>
    <td>The <code>attempt</code> contains the number of times a check is run upon failure in the previous attempts before declaring the probe status as failed.</td>
  </tr>
  <tr>
    <td>interval</td>
    <td>Flag to hold the interval of the probe</td>
    <td>Mandatory</td>
    <td>N/A <code>type: string</code></td>
    <td>The <code>interval</code> contains the interval for which probes waits between subsequent retries</td>
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
    <td>The <code>stopOnFailure</code> can be set to true/false to stop or continue the experiment execution after probe fails</td>
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
      evaluationTimeout: 5m
      sloSourceMetadata:
        apiTokenSecret: "<api-token>"
        scope:
          accountIdentifier: "<account-identifier>"
          orgIdentifier: "<org-identifier>"
          projectIdentifier: "<project-identifier>"
        comparator:
          type: float
          criteria: <
          value: "0.1"
    mode: "EOT"
    runProperties:
      attempt: 2
      probeTimeout: 1000ms
      stopOnFailure: false
```
