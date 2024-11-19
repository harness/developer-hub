---
title: Prometheus probe
sidebar_position: 50
description: Features and specification of the Prometheus probe
redirect_from:
- /docs/chaos-engineering/technical-reference/probes/prom-probe
- /docs/chaos-engineering/features/probes/prom-probe
- /docs/chaos-engineering/features/resilience-probes/prom-probe
- /docs/chaos-engineering/concepts/explore-concepts/resilience-probes/prom-probe
---

import CommonNote from './shared/common-note.md'

The Prometheus probe allows users to run Prometheus queries and match the resulting output against specific conditions. The intent behind this probe is to allow users to define metrics-based SLOs in a declarative way and determine the experiment verdict based on their success. The probe runs the query on a Prometheus server defined by the endpoint and checks whether the output satisfies the specified criteria. The outcome of a PromQL query (that is provided) is used for probe validation.

:::info YAML only feature
In case of complex queries that span multiple lines, the `queryPath` attribute can be used to provide the link to a file consisting of the query. This file can be made available in the experiment pod via a ConfigMap resource, with the ConfigMap being passed in the [ChaosEngine](https://litmuschaos.github.io/litmus/experiments/concepts/chaos-resources/chaos-engine/contents/) or the [ChaosExperiment](https://litmuschaos.github.io/litmus/experiments/concepts/chaos-resources/chaos-experiment/contents/) CR. Also, `query` and `queryPath` attributes are mutually exclusive. Refer to the probe schema [here](https://docs.litmuschaos.io/docs/concepts/probes#promprobe).
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

:::tip
The Prometheus probe expects you to provide a PromQL query along with Prometheus service endpoints to check for specific criteria.
:::

## Schema

Listed below is the probe schema for the Prometheus probe, with properties shared across all the probes and properties unique to the Prometheus probe.

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
    <td>The <code>name</code> holds the name of the probe. It can be set based on the use case</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Flag to hold the type of the probe</td>
    <td>Mandatory</td>
    <td><code>httpProbe, k8sProbe, cmdProbe, promProbe, and datadogProbe</code></td>
    <td>The <code>type</code> supports five types of probes: httpProbe, k8sProbe, cmdProbe, promProbe, and datadogProbe.</td>
  </tr>
  <tr>
    <td>mode</td>
    <td>Flag to hold the mode of the probe</td>
    <td>Mandatory</td>
    <td><code>SOT, EOT, Edge, Continuous, OnChaos</code></td>
    <td>The <code>mode</code> supports five modes of probes: SOT, EOT, Edge, Continuous, and OnChaos. Datadog probe supports EOT mode only.</td>
  </tr>
  <tr>
    <td>endpoint</td>
    <td>Flag to hold the prometheus endpoints for the promProbe</td>
    <td>Mandatory</td>
    <td>N/A <code>type: string</code></td>
    <td>The <code>endpoint</code> contains the prometheus endpoints</td>
  </tr>
  <tr>
    <td>query</td>
    <td>Flag to hold the promql query for the promProbe</td>
    <td>Mandatory</td>
    <td>N/A <code>type: string</code></td>
    <td>The <code>query</code> contains the promql query to extract out the desired prometheus metrics via running it on the given prometheus endpoint</td>
  </tr>
  <tr>
    <td>queryPath</td>
    <td>Flag to hold the path of the promql query for the promProbe</td>
    <td>Optional</td>
    <td>N/A <code>type: string</code></td>
    <td>The <code>queryPath</code> field is used in case of complex queries that spans multiple lines, the queryPath attribute can be used to provide the path to a file consisting of the same. This file can be made available to the experiment pod via a ConfigMap resource, with the ConfigMap name being defined in the ChaosEngine OR the ChaosExperiment CR.</td>
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
    <td>Mandatory</td>
    <td><code>float</code></td>
    <td>The <code>type</code> contains type of data, which should be compared as part of comparison operation. Prometheus probe only compares with float data.</td>
  </tr>
  <tr>
    <td>criteria</td>
    <td>Flag to hold criteria for the comparison</td>
    <td>Mandatory</td>
    <td>It supports <code>{`<, >, <=, >=, !=, ==, oneOf, between`}</code> for int and float type. And <code>{`equal, notEqual, contains, matches, notMatches, oneOf`}</code> for string type.</td>
    <td>The <code>criteria</code> contains criteria of the comparison, as a part of comparison operation.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>Flag to hold value for the comparison</td>
    <td>Mandatory</td>
    <td>N/A <code>type: string</code></td>
    <td>The <code>value</code> contains value of the comparison, which should follow the given criteria as part of comparison operation.</td>
  </tr>
</table>

### Authentication

This establishes a fundamental authentication mechanism for the Prometheus server. The "username:password", encoded in base64, should be placed either within the `credentials` field or as a file path in the `credentialsFile` field.

:::tip
The `credentials` and `credentialsFile` are two options that can't be used simultaneously.
:::

<table>
  <tr>
   <td><strong>Field</strong> </td>
   <td><strong>Description</strong> </td>
   <td><strong>Type</strong> </td>
   <td><strong>Range</strong> </td>
   <td><strong>Notes</strong> </td>
  </tr>
  <tr>
   <td>type </td>
   <td>Flag to hold the authentication type </td>
   <td>Optional </td>
   <td><code>string</code> </td>
   <td>The <code>type</code> encompasses the authentication method, which includes support for both Basic and Bearer authentication types </td>
  </tr>
  <tr>
   <td>credentials </td>
   <td>Flag to hold the basic auth credentials in base64 format or bearer token </td>
   <td>Optional </td>
   <td><code>string</code> </td>
   <td>The <code>credentials</code> consists of the basic authentication credentials, either as username:password encoded in base64 format or as a bearer token, depending on the authentication type </td>
  </tr>
  <tr>
   <td> credentialsFile </td>
   <td>Flag to hold the basic auth credentials or bearer token file path </td>
   <td>Optional </td>
   <td><code>string</code> </td>
   <td>The <code>credentials</code> consists of file path for basic authentication credentials or a bearer token, which are then attached to the experiment pod as volume secrets. These secret resources contain either the username:password encoded in base64 format or a bearer token, depending on the authentication type </td>
  </tr>
</table>

### TLS

It offers a mechanism to validate TLS certifications for the Prometheus server. You can supply the `cacert` or the client certificate and client key to perform the validation.
Alternatively, you have the option to enable the `insecureSkipVerify` check to bypass certificate validation.

<table>
  <tr>
    <td><strong>Field</strong></td>
    <td><strong>Description</strong></td>
    <td><strong>Type</strong></td>
    <td><strong>Range</strong></td>
    <td><strong>Notes</strong></td>
  </tr>
  <tr>
    <td>caFile</td>
    <td>Flag to hold the ca file path</td>
    <td>Optional</td>
    <td><code>string</code></td>
    <td>The <code>caFile</code> holds the file path of the CA certificates utilized for server TLS verification</td>
  </tr>
  <tr>
    <td>certFile</td>
    <td>Flag to hold the client cert file path</td>
    <td>Optional</td>
    <td><code>string</code></td>
    <td>The <code>certFile</code> holds the file path of the client certificates utilized for TLS verification</td>
  </tr>
  <tr>
    <td>keyFile</td>
    <td>Flag to hold the client key file path</td>
    <td>Optional</td>
    <td><code>string</code></td>
    <td>The <code>keyFile</code> holds the file path of the client key utilized for TLS verification</td>
  </tr>
  <tr>
    <td>insecureSkipVerify</td>
    <td>Flag to skip the tls certificates checks</td>
    <td>Optional</td>
    <td><code>boolean</code></td>
    <td>The <code>insecureSkipVerify</code> skip the tls certificates checks</td>
  </tr>
  <tr>
    <td>serverName</td>
    <td>Flag to hold the server name</td>
    <td>Optional</td>
    <td><code>string</code></td>
    <td>The <code>serverName</code> name of the server</td>
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
   <td>The <code>attempt</code> contains the number of times a check is run upon failure in the previous attempts before declaring the probe status as failed. </td>
  </tr>
  <tr>
   <td>interval </td>
   <td>Flag to hold the interval of the probe </td>
   <td>Mandatory </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>interval</code> contains the interval for which probes waits between subsequent retries </td>
  </tr>
  <tr>
   <td>probePollingInterval </td>
   <td>Flag to hold the polling interval for the probes (applicable for all modes) </td>
   <td>Optional </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>probePollingInterval</code> contains the time interval for which continuous and onchaos probe should be sleep after each iteration </td>
  </tr>
  <tr>
   <td>initialDelaySeconds </td>
   <td>Flag to hold the initial delay interval for the probes </td>
   <td>Optional </td>
   <td>N/A <code>type: integer</code> </td>
   <td>The <code>initialDelaySeconds</code> represents the initial waiting time interval for the probes. </td>
  </tr>
  <tr>
   <td>stopOnFailure </td>
   <td>Flags to hold the stop or continue the experiment on probe failure </td>
   <td>Optional </td>
   <td>N/A <code>type: boolean</code> </td>
   <td>The <code>stopOnFailure</code> can be set to true/false to stop or continue the experiment execution after probe fails </td>
  </tr>
</table>

## Definition

<CommonNote />

```yaml
probe:
  - name: "check-probe-success"
    type: "promProbe"
    promProbe/inputs:
      endpoint: "prometheus-server.prometheus.svc.cluster.local:9090"
      query: "sum(rate(http_requests_total{code=~\"2..\"}[1m])) by (job)"
      comparator:
        criteria: ">" #supports >=,<=,>,<,==,!= comparison
        value: "0"
      auth:
        credentials: "base64(<username:password>)"
      tlsConfig:
        insecureSkipVerify: true
    mode: "Edge"
    runProperties:
      probeTimeout: 5s
      interval: 2s
      attempt: 1
```


### Prometheus query (simple query)

This section holds the PromQL query used to extract the desired Prometheus metrics by executing it on the specified Prometheus endpoint. You can input the Prometheus query in the 'query' field, and this can be initiated by configuring the `.promProbe/inputs.query` field.

Use the following example to tune this:

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
      - name: "check-probe-success"
        type: "promProbe"
        promProbe/inputs:
          # endpoint for the promethus service
          endpoint: "prometheus-server.prometheus.svc.cluster.local:9090"
          # promql query, which should be executed
          query: "sum(rate(http_requests_total{code=~\"2..\"}[1m])) by (job)"
          comparator:
            # criteria which should be followed by the actual output and the expected output
            #supports >=,<=,>,<,==,!= comparision
            criteria: ">" 
            # expected value, which should follow the specified criteria
            value: "0"
        mode: "Edge"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
```

### Prometheus query (complex query)

For intricate queries that extend across multiple lines, you can use the 'queryPath' attribute to specify the path to a file containing the query. This file can be accessed by the experiment pod through a ConfigMap resource, with the ConfigMap name defined in either the ChaosEngine or the ChaosExperiment CR. To set this up, configure the `promProbe/inputs.queryPath` field.

:::tip
The fields `queryPath` and `query` are mutually exclusive. If `query` is specified, it is used for the query; otherwise, `queryPath` is used.
:::

Use the following example to tune this:

```yaml
# contains the prom probe which execute the query and match for the expected criteria
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
      - name: "check-probe-success"
        type: "promProbe"
        promProbe/inputs:
          # endpoint for the promethus service
          endpoint: "prometheus-server.prometheus.svc.cluster.local:9090"
          # the configMap should be mounted to the experiment which contains promql query
          # use the mounted path here
          queryPath: "/etc/config/prometheus-query"
          comparator:
            # criteria which should be followed by the actual output and the expected output
            #supports >=,<=,>,<,==,!= comparision
            criteria: ">" 
            # expected value, which should follow the specified criteria
            value: "0"
        mode: "Edge"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
```

### Authentication

This establishes a fundamental authentication mechanism for the Prometheus server. The "username:password" encoded in base64 or bearer token, should be placed either within the `credentials` field or as a file path in the `credentialsFile` field.

:::tip
The `credentials` and `credentialsFile` are mutually exclusive, that is, these fields can't be used simultaneously.
:::

Use the following example to tune this:

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
      - name: "check-probe-success"
        type: "promProbe"
        promProbe/inputs:
          # endpoint for the promethus service
          endpoint: "prometheus-server.prometheus.svc.cluster.local:9090"
          # promql query, which should be executed
          query: "sum(rate(http_requests_total{code=~\"2..\"}[1m])) by (job)"
          comparator:
            # criteria which should be followed by the actual output and the expected output
            #supports >=,<=,>,<,==,!= comparison
            criteria: ">"
            # expected value, which should follow the specified criteria
            value: "0"
          auth:
            type: Basic
            credentials: "base64(<username:password>)"
        mode: "Edge"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
```

### TLS with custom certificates

It offers a mechanism to validate TLS certifications for the Prometheus server. You can supply the `cacert` or the client certificate and client key to perform the validation.

:::tip
The CA certificate file must be incorporated into the experiment pod either as a configMap or a secret. The volume name (configMap or secret) and mountPath should be specified within the chaosengine at the `spec.components.secrets` path.
:::

Use the following example to tune this:

```yaml
# contains the prom probe which execute the query and match for the expected criteria
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
      components:
        secrets:
          - name: ca-cert
            mountPath: /etc/config
      probe:
      - name: "check-probe-success"
        type: "promProbe"
        promProbe/inputs:
          # endpoint for the promethus service
          endpoint: "https://prometheus-server.harness.io"
          # promql query, which should be executed
          query: "sum(rate(http_requests_total{code=~\"2..\"}[1m])) by (job)"
          comparator:
            # criteria which should be followed by the actual output and the expected output
            #supports >=,<=,>,<,==,!= comparision
            criteria: ">" 
            # expected value, which should follow the specified criteria
            value: "0"
          tlsConfig:
            caFile: "/etc/config/ca.crt"
        mode: "Edge"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
```

### TLS skip certificate verification

You can bypass the TLS certificate checks by enabling the `insecureSkipVerify` option.

Use the following example to tune this:

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
      - name: "check-probe-success"
        type: "promProbe"
        promProbe/inputs:
          # endpoint for the promethus service
          endpoint: "https://prometheus-server.harness.io"
          # promql query, which should be executed
          query: "sum(rate(http_requests_total{code=~\"2..\"}[1m])) by (job)"
          comparator:
            # criteria which should be followed by the actual output and the expected output
            #supports >=,<=,>,<,==,!= comparision
            criteria: ">"
            # expected value, which should follow the specified criteria
            value: "0"
          tlsConfig:
            insecureSkipVerify: true
        mode: "Edge"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
```