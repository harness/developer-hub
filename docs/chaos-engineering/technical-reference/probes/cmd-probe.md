---
title: Command Probe
sidebar_position: 4
---

The Command Probe allows developers to run Bash commands and match the resulting output as part of the entry/exit criteria. The intent behind this probe was to allow users to implement a non-standard & imperative way for expressing their hypothesis. For example, you can check for specific data within a database, parse the value out of a JSON blob being dumped into a certain path or check for the existence of a particular string in the service logs.

:::info YAML Only Feature
By default, the probe can only be defined in inline mode from the UI where the command is run from within the experiment image. However, it can also be run in source mode where the command execution is carried out from within a new pod whose image can be specified. While inline is preferred for simple shell commands, source mode can be used when application-specific binaries are required. Refer to the probe schema [here](https://docs.litmuschaos.io/docs/concepts/probes#cmdprobe).
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

Probe schema for CMD Probe with common properties shared across all probes and properties unique to CMD probe.

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
   <td>command
   </td>
   <td>Flag to hold the command for the cmdProbe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>command</code> contains the shell command, which should be run as part of cmdProbe
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

### Source

Source details for Command Probe.

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
   <td>image
   </td>
   <td>Flag to hold the image for the cmdProbe
   </td>
   <td>Optional
   </td>
   <td>any source docker image
   </td>
   <td>The <code>image</code> provides the source image which can be used to launch a external pod where the command execution is carried out.
   </td>
  </tr>
  <tr>
   <td>hostNetwork
   </td>
   <td>Description	Flag to allow or deny the <code>image</code> access to the node network namespace
   </td>
   <td>Optional
   </td>
   <td><code>true, false</code>
   </td>
   <td>The <code>hostNetwork</code> provides a possibility to allow the pod executing the cmdProbe access to the network of the node he is running on. For more details refer to the <a href="https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces">offical Kubernetes documentation</a>.
   </td>
  </tr>
</table>

### Comparator

Comparator details for Command Probe.

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
   <td>Flag to hold type of the data used for comparision
   </td>
   <td>Mandatory
   </td>
   <td><code>string, int, float</code>
   </td>
   <td>The <code>type</code> contains type of data, which should be compare as part of comparision operation.
   </td>
  </tr>
  <tr>
   <td>criteria
   </td>
   <td>Flag to hold criteria for the comparision
   </td>
   <td>Mandatory
   </td>
   <td>it supports <code>{`>=, <=, ==, >, <, !=, oneOf, between`}</code> for int & float type. And <code>{`equal, notEqual, contains, matches, notMatches, oneOf`}</code> for string type.
   </td>
   <td>The <code>criteria</code> contains criteria of the comparision, which should be fulfill as part of comparision operation.
   </td>
  </tr>
  <tr>
   <td>value
   </td>
   <td>Flag to hold value for the comparision
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>value</code> contains value of the comparision, which should follow the given criteria as part of comparision operation.
   </td>
  </tr>
</table>

### Run Properties

Probe run properties for CMD Probe.

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
   <td>Flag to hold the polling interval for the probes(applicable for <code>Continuous</code> mode only)
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
  - name: "check-database-integrity"
    type: "cmdProbe"
    cmdProbe/inputs:
      command: "<command>"
      comparator:
        type: "string" # supports: string, int, float
        criteria: "contains" #supports >=,<=,>,<,==,!= for int and contains,equal,notEqual,matches,notMatches for string values
        value: "<value-for-criteria-match>"
      source: # omit this tag to "inline" the probe
        image: "<repo>/<tag>"
        hostNetwork: false
    mode: "Edge"
    runProperties:
      probeTimeout: 5
      interval: 5
      retry: 1
      initialDelaySeconds: 5
```
