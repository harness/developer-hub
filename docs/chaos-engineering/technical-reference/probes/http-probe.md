---
title: HTTP probe
sidebar_position: 3
---

HTTP probe allows you to specify a URL that the experiment uses to determine the health or service availability (or other custom conditions) that is a part of the entry or exit criteria. The status code received is mapped against an expected status. It supports HTTP [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) and [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) methods.

The HTTP GET method sends a GET request to the specified URL. The response code received is matched with the response code based on the given criteria (`==`, `!=`, `oneOf`).

HTTP POST method sends a `POST` request to the provided URL.

:::info YAML only feature
In the case of a complex `POST` request in which the body spans multiple lines, the `bodyPath` attribute is used to specify the path to a file consisting of the same. This file is available to the experiment pod through a ConfigMap resource, wherein the ConfigMap name is defined in the [chaos engine](https://docs.litmuschaos.io/docs/concepts/chaos-engine) or the [chaos experiment](https://docs.litmuschaos.io/docs/concepts/chaos-experiment) CR. The `body` and `bodyPath` attributes are mutually exclusive. Go to [probe schema](https://docs.litmuschaos.io/docs/concepts/probes#httpprobe) to learn more.
:::

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

Listed below is the probe schema for HTTP Probe with common properties shared across all probes and properties unique to HTTP probe.

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
   <td>url
   </td>
   <td>Flag to hold the URL for the httpProbe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>url</code> contains the URL which the experiment uses to gauge health/service availability (or other custom conditions) as part of the entry/exit criteria.
   </td>
  </tr>
  <tr>
   <td>insecureSkipVerify
   </td>
   <td>Flag to hold the flag to skip certificate checks for the httpProbe
   </td>
   <td>Optional
   </td>
   <td>true, false
   </td>
   <td>The <code>insecureSkipVerify</code> contains flag to skip certificate checks.
   </td>
  </tr>
  <tr>
   <td>responseTimeout
   </td>
   <td>Flag to hold the flag to response timeout for the httpProbe
   </td>
   <td>Optional
   </td>
   <td>N/A <code>type: integer</code>
   </td>
   <td>The <code>responseTimeout</code> contains flag to provide the response timeout for the http Get/Post request.
   </td>
  </tr>
</table>

### Method

#### GET method properties

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
   <td>criteria
   </td>
   <td>Flag to hold the criteria for the http get request
   </td>
   <td>Mandatory
   </td>
   <td><code>==, !=, oneOf</code>
   </td>
   <td>The <code>criteria</code> contains criteria to match the http get request's response code with the expected responseCode, which need to be fulfill as part of httpProbe run
   </td>
  </tr>
  <tr>
   <td>responseCode
   </td>
   <td>Flag to hold the expected response code for the get request
   </td>
   <td>Mandatory
   </td>
   <td>HTTP_RESPONSE_CODE
   </td>
   <td>The <code>responseCode</code> contains the expected response code for the http get request as part of httpProbe run
   </td>
  </tr>
</table>

#### POST method properties

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
   <td>criteria
   </td>
   <td>Flag to hold the criteria for the http post request
   </td>
   <td>Mandatory
   </td>
   <td><code>==, !=, oneOf</code>
   </td>
   <td>The <code>criteria</code> contains criteria to match the http post request's response code with the expected responseCode, which need to be fulfill as part of httpProbe run
   </td>
  </tr>
  <tr>
   <td>responseCode
   </td>
   <td>Flag to hold the expected response code for the post request
   </td>
   <td>Mandatory
   </td>
   <td>HTTP_RESPONSE_CODE
   </td>
   <td>The <code>responseCode</code> contains the expected response code for the http post request as part of httpProbe run
   </td>
  </tr>
  <tr>
   <td>contentType
   </td>
   <td>Flag to hold the content type of the post request
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>contentType</code> contains the content type of the http body data, which need to be passed for the http post request
   </td>
  </tr>
  <tr>
   <td>body
   </td>
   <td>Flag to hold the body of the http post request
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>body</code> contains the http body, which is required for the http post request. It is used for the simple http body. If the http body is complex then use <code>bodyPath</code> field.
   </td>
  </tr>
  <tr>
   <td>bodyPath
   </td>
   <td>Flag to hold the path of the http body, required for the http post request
   </td>
   <td>Optional
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>bodyPath</code> This field is used in case of complex POST request in which the body spans multiple lines, the bodyPath attribute can be used to provide the path to a file consisting of the same. This file can be made available to the experiment pod via a ConfigMap resource, with the ConfigMap name being defined in the ChaosEngine OR the ChaosExperiment CR.
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
