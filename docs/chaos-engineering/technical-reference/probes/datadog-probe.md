---
title: Datadog probe
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Datadog probe allows you to query a [Datadog Synthetic](https://docs.datadoghq.com/synthetics/) test and utilize its results through the fault's chaos duration to evaluate the probe outcome.

- Both [API tests](https://docs.datadoghq.com/synthetics/api_tests/) and [Browser tests](https://docs.datadoghq.com/synthetics/browser_tests) are supported.

- The probe may only be executed in the **EOT mode**, as the probe evaluation is based on the result of all the test iterations executed through the fault chaos duration.

:::note
If there are no iterations of the synthetics test through the chaos duration of the fault, the probe is marked as failed.
:::

## Providing secrets

Datadog secret keys need to be provided prior to using the probe, which are used to authenticate with the Datadog APIs. This includes an [API key](https://docs.datadoghq.com/account_management/api-app-keys/#api-keys) and an [Application key](https://docs.datadoghq.com/account_management/api-app-keys/#application-keys).

<Tabs>
  <TabItem value="kubernetes" label="Kubernetes" default>
  For a Kubernetes chaos infrastructure, the secrets shall be provided using a Kubernetes secret of the following format:

```yaml showLineNumbers
apiVersion: v1
kind: Secret
metadata:
  name: datadog-secret
  type: Opaque
stringData:
  DD_API_KEY: "xxxxxxxxxxxxxxxxxxxx"
  DD_APP_KEY: "xxxxxxxxxxxxxxxxxxxx"
```

The secret name, that is, <b>datadog-secret</b> has to be provided while configuring the probe using the `datadogCredentialsSecretName` field.
</TabItem>

  <TabItem value="linux" label="Linux">
  For a Linux chaos infrastructure, the secrets are provided using an environment file at the following path, which is located on the machine where the infrastructure executes:

```bash showLineNumbers title="/etc/linux-chaos-infrastructure/datadog.env"
DD_API_KEY="xxxxxxxxxxxxxxxxxxxx"
DD_APP_KEY="xxxxxxxxxxxxxxxxxxxx"
```

  </TabItem>
</Tabs>

## Defining the probe

<Tabs>
  <TabItem value="kubernetes" label="Kubernetes" default>
  For a Kubernetes chaos infrastructure, the probe is defined at <code>.spec.experiments[].spec.probe</code> path in the chaos engine manifest:

```yaml showLineNumbers
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

  </TabItem>
  <TabItem value="linux" label="Linux" default>
  For a Linux chaos infrastructure, the probe is defined at <code>.spec.tasks[].definition.chaos.probes</code> path in the Linux chaos experiment manifest:

```yaml showLineNumbers
apiVersion: litmuschaos.io/v1alpha1
kind: LinuxChaosExperiment
spec:
  tasks:
    - name: task-1
      definition:
        chaos:
          probes:
            ####################################
            Probes are defined here
            ####################################
```

  </TabItem>
</Tabs>

## Schema

Listed below is the Datadog Probe schema with common properties shared across all probes and properties unique to Datadog probe.

<table>
  <tr>
   <th>
		<strong>Field</strong>
  </th>
   <th>
		<strong>Description</strong>
    </th>
   <th>
		<strong>Type</strong>
    </th>
   <th>
		<strong>Range</strong>
    </th>
   <th>
		<strong>Notes</strong>
    </th>
  </tr>
  <tr>
   <td>name</td>
   <td>Flag to hold the name of the probe</td>
   <td>Mandatory</td>
   <td>N/A <code>type: string</code></td>
   <td>The <code>name</code> holds the name of the probe. It can be set based on the use-case</td>
  </tr>
  <tr>
   <td>type</td>
   <td>Flag to hold the type of the probe</td>
   <td>Mandatory</td>
   <td><code>httpProbe, k8sProbe, cmdProbe, promProbe, and datadogProbe</code></td>
   <td>The <code>type</code> supports four types of probes. It can one of the httpProbe, k8sProbe, cmdProbe, promProbe, and datadogProbe</td>
  </tr>
  <tr>
   <td>mode</td>
   <td>Flag to hold the mode of the probe</td>
   <td>Mandatory</td>
   <td><code>SOT, EOT, Edge, Continuous, OnChaos</code></td>
   <td>The <code>mode</code> supports five modes of probes. It can one of the SOT, EOT, Edge, Continuous, and OnChaos. For Datadog probe only EOT mode is supported</td>
  </tr>
  <tr>
   <td>datadogSite</td>
   <td>Site for datadog probe</td>
   <td>Mandatory</td>
   <td><code>datadoghq.com, us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ddog-gov.com, and ap1.datadoghq.com</code></td>
   <td>The <code>datadogSite</code> supports six values. Refer <a href="https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site">here</a> for details</td>
  </tr>
  <tr>
   <td>datadogCredentialsSecretName</td>
   <td>Name of the secret having datadog probe secret keys</td>
   <td>Optional</td>
   <td>N/A <code>type: string</code></td>
   <td>Name of the Kubernetes secret containing the Datadog secret keys. Only required for Kubernetes chaos infrastructure</td>
  </tr>
</table>

### Synthetics test

<table>
  <tr>
   <th>
		<strong>Field</strong>
    </th>
   <th>
		<strong>Description</strong>
    </th>
   <th>
		<strong>Type</strong>
    </th>
   <th>
		<strong>Range</strong>
    </th>
   <th>
		<strong>Notes</strong>
    </th>
  </tr>
  <tr>
   <td>publicId</td>
   <td>Public ID of the synthetic test</td>
   <td>Mandatory</td>
   <td>N/A <code>type: string</code></td>
   <td>The <code>publicId</code> holds the ID of the synthetic test.</td>
  </tr>
  <tr>
   <td>testType</td>
   <td>Type of the synthetic test</td>
   <td>Mandatory</td>
   <td><code>api, browser</code></td>
   <td>The <code>testType</code> holds the type of the synthetic test. It can one of api and browser</td>
  </tr>
</table>

### Run properties

<table>
  <tr>
   <td>
		<strong>Field</strong>
   </td>
   <td>
		<strong>Description</strong>
   </td>
   <td>
		<strong>Type</strong>
   </td>
   <td>
		<strong>Range</strong>
   </td>
   <td>
		<strong>Notes</strong>
   </td>
  </tr>
  <tr>
   <td>probeTimeout   </td>
   <td>Flag to hold the timeout of the probe   </td>
   <td>Mandatory   </td>
   <td>N/A <code>type: string</code>   </td>
   <td>The <code>probeTimeout</code> represents the time limit for the probe to execute the specified check and return the expected data   </td>
  </tr>
  <tr>
   <td>attempt   </td>
   <td>Flag to hold the attempt of the probe   </td>
   <td>Mandatory   </td>
   <td>N/A <code>type: integer</code>   </td>
   <td>The <code>attempt</code> contains the number of times a check is run upon failure in the previous attempts before declaring the probe status as failed.   </td>
  </tr>
  <tr>
   <td>interval   </td>
   <td>Flag to hold the interval of the probe   </td>
   <td>Mandatory   </td>
   <td>N/A <code>type: string</code>   </td>
   <td>The <code>interval</code> contains the interval for which probes waits between subsequent retries   </td>
  </tr>
  <tr>
   <td>probePollingInterval   </td>
   <td>Flag to hold the polling interval for the probes (applicable for all modes)   </td>
   <td>Optional   </td>
   <td>N/A <code>type: string</code>   </td>
   <td>The <code>probePollingInterval</code> contains the time interval for which continuous and onchaos probe should be sleep after each iteration   </td>
  </tr>
  <tr>
   <td>initialDelaySeconds   </td>
   <td>Flag to hold the initial delay interval for the probes   </td>
   <td>Optional   </td>
   <td>N/A <code>type: integer</code>   </td>
   <td>The <code>initialDelaySeconds</code> represents the initial waiting time interval for the probes.   </td>
  </tr>
  <tr>
   <td>stopOnFailure   </td>
   <td>Flags to hold the stop or continue the experiment on probe failure   </td>
   <td>Optional   </td>
   <td>N/A <code>type: boolean</code>   </td>
   <td>The <code>stopOnFailure</code> can be set to true/false to stop or continue the experiment execution after probe fails   </td>
  </tr>
</table>

## Definition

<Tabs>
  <TabItem value="kubernetes" label="Kubernetes" default>

```yaml
probe:
  - name: datadog-probe
    type: "DatadogProbe"
    mode: "EOT"
    datadogProbe/inputs:
      datadogSite: us5.datadoghq.com
      syntheticsTest:
        publicId: zgs-mq8-pgy
        testType: api
      datadogCredentialsSecretName: dd-secret
    runProperties:
      probeTimeout: 2s
      attempt: 1
      interval: 3s
      stopOnFailure: false
```

  </TabItem>
  <TabItem value="linux" label="Linux">

```yaml
probes:
  - name: datadog-probe
    type: "DatadogProbe"
    mode: "EOT"
    datadogProbe/inputs:
      datadogSite: us5.datadoghq.com
      syntheticsTest:
        publicId: zgs-mq8-pgy
        testType: api
    runProperties:
      probeTimeout: 2s
      attempt: 1
      interval: 3s
      stopOnFailure: false
```

  </TabItem>
</Tabs>

### API test

To trigger an API test, specify the `syntheticsTest.testType` as `api`.

Use the following example to tune this:

<Tabs>
  <TabItem value="kubernetes" label="Kubernetes" default>

```yaml
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
          - name: "datadog-probe"
            type: "datadogProbe"
            datadogProbe/inputs:
              datadogSite: us5.datadoghq.com
              syntheticsTest:
                publicId: zgs-mq8-pgy
                testType: api
              datadogCredentialsSecretName: dd-secret
            mode: "EOT"
            runProperties:
              probeTimeout: 5s
              interval: 2s
              attempt: 1
              stopOnFailure: false
```

  </TabItem>
  <TabItem value="linux" label="Linux">

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: LinuxChaosExperiment
metadata:
  name: process-kill
  labels:
    context: process-kill
    name: process-kill
spec:
  steps:
    - - name: process-kill-task
  tasks:
    - name: process-kill-task
      taskType: "chaos"
      weight: 10
      definition:
        chaos:
          probes:
            - name: datadog-probe
              type: "DatadogProbe"
              mode: "EOT"
              datadogProbe/inputs:
                datadogSite: us5.datadoghq.com
                syntheticsTest:
                  publicId: zgs-mq8-pgy
                  testType: api
              runProperties:
                probeTimeout: 2s
                attempt: 1
                interval: 3s
                stopOnFailure: false
          experiment: linux-process-kill
          processKillChaos/inputs:
            duration: 30
            processNames: "nginx"
            forceKill: false
```

  </TabItem>
</Tabs>

### Browser test

To trigger a browser test, specify the `syntheticsTest.testType` as `browser`.

Use the following example to tune this:

<Tabs>
  <TabItem value="kubernetes" label="Kubernetes" default>

```yaml
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
          - name: "datadog-probe"
            type: "datadogProbe"
            datadogProbe/inputs:
              datadogSite: us5.datadoghq.com
              syntheticsTest:
                publicId: zgs-mq8-pgy
                testType: browser
              datadogCredentialsSecretName: dd-secret
            mode: "EOT"
            runProperties:
              probeTimeout: 5s
              interval: 2s
              attempt: 1
              stopOnFailure: false
```

  </TabItem>
  <TabItem value="linux" label="Linux">

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: LinuxChaosExperiment
metadata:
  name: process-kill
  labels:
    context: process-kill
    name: process-kill
spec:
  steps:
    - - name: process-kill-task
  tasks:
    - name: process-kill-task
      taskType: "chaos"
      weight: 10
      definition:
        chaos:
          probes:
            - name: datadog-probe
              type: "DatadogProbe"
              mode: "EOT"
              datadogProbe/inputs:
                datadogSite: us5.datadoghq.com
                syntheticsTest:
                  publicId: zgs-mq8-pgy
                  testType: browser
              runProperties:
                probeTimeout: 2s
                attempt: 1
                interval: 3s
                stopOnFailure: false
          experiment: linux-process-kill
          processKillChaos/inputs:
            duration: 30
            processNames: "nginx"
            forceKill: false
```

  </TabItem>
</Tabs>
