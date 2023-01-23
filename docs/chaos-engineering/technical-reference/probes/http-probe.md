---
title: HTTP Probe
sidebar_position: 3
---

The HTTP Probe allows developers to specify a URL which the experiment uses to gauge health/service availability (or other custom conditions) as part of the entry/exit criteria. The received status code is mapped against an expected status. It supports HTTP [Get](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) and [Post](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) methods.

In HTTP Get method it sends a http `GET` request to the provided url and matches the response code based on the given criteria(`==`, `!=`, `oneOf`).

In HTTP Post method it sends a http `POST` request to the provided url.

:::info YAML Only Feature
In the case of a complex POST request in which the body spans multiple lines, the `bodyPath` attribute can be used to provide the path to a file consisting of the same. This file can be made available to the experiment pod via a ConfigMap resource, with the ConfigMap name being defined in the [ChaosEngine](https://docs.litmuschaos.io/docs/concepts/chaos-engine) or the [ChaosExperiment](https://docs.litmuschaos.io/docs/concepts/chaos-experiment) CR. It can be defined at `.spec.experiments[].spec.probe` inside ChaosEngine. Also, `body` and `bodyPath` attributes are mutually exclusive. Refer to the probe schema [here](https://docs.litmuschaos.io/docs/concepts/probes#httpprobe).
:::

## Where to define

The probes can be defined at **.spec.experiments[].spec.probe** path inside Chaos Engine.

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

Probe schema for HTTP Probe with common properties shared across all probes and properties unique to HTTP probe.

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
   <td>The <code>name</code> holds the name of the probe. It can be set based on the usecase
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
   <td>The <code>type</code> supports four types of probes. It can one of the httpProbe, k8sProbe, cmdProbe, promProbe
   </td>
  </tr>
  <tr>
   <td>mode
   </td>
   <td>Flag to hold the mode of the probe
   </td>
   <td>Mandatory
   </td>
   <td><code>SOT, EOT, Edge, Continuous, OnChaos</code>
   </td>
   <td>The <code>mode</code> supports five modes of probes. It can one of the SOT, EOT, Edge, Continuous, OnChaos
   </td>
  </tr>
  <tr>
   <td>… so on
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
</table>

## Run Properties

Probe run properties for HTTP Probe.

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
   <td>… so on
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
</table>

## Definition

```yaml
probe:
  - name: "check-frontend-access-url"
    type: "httpProbe"
    httpProbe/inputs:
      url: "<url>"
      insecureSkipVerify: false
      responseTimeout: <value> # in milli seconds
      method:
        get:
          criteria: == # supports == & != and oneof operations
          responseCode: "<response code>"
    mode: "Continuous"
    runProperties:
      probeTimeout: 5
      interval: 5
      retry: 1
      probePollingInterval: 2
```
