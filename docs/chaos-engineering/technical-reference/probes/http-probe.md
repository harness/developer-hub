---
title: HTTP probe
sidebar_position: 3
---

HTTP probe allows you to specify a URL that the experiment uses to determine the health or service availability (or other custom conditions) that is a part of the entry or exit criteria. The status code received is mapped against an expected status. It supports HTTP [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) and [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) methods.

The HTTP GET method sends a GET request to the specified URL. The response received is matched for the response code or response body based on the provided criteria.

HTTP POST method sends a `POST` request to the provided URL.

:::info YAML only feature
In the case of a complex `POST` request in which the body spans multiple lines, the `bodyPath` attribute is used to specify the path to a file consisting of the same. This file is available to the experiment pod through a ConfigMap resource, wherein the ConfigMap name is defined in the [chaos engine](https://litmuschaos.github.io/litmus/experiments/concepts/chaos-resources/chaos-engine/contents/) or the [chaos experiment](https://litmuschaos.github.io/litmus/experiments/concepts/chaos-resources/chaos-experiment/contents/) CR. The `body` and `bodyPath` attributes are mutually exclusive. Go to [probe schema](https://docs.litmuschaos.io/docs/concepts/probes#httpprobe) to learn more.
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
   <td><code>httpProbe, k8sProbe, cmdProbe, promProbe, and datadogProbe</code>
   </td>
   <td>The <code>type</code> supports five types of probes: httpProbe, k8sProbe, cmdProbe, promProbe, and datadogProbe.
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
   <td>The <code>mode</code> supports five modes of probes: SOT, EOT, Edge, Continuous, and OnChaos. Datadog probe supports EOT mode only.
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
   <td>headers
   </td>
   <td>Flag to hold the http request headers for the httpProbe
   </td>
   <td>Optional
   </td>
   <td>N/A <code>type: map[string]string</code>
   </td>
   <td>The <code>headers</code> contains flag to hold the http request headers.
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
   <td>The <code>criteria</code> contains criteria to match the http get request's response code or body with the expected responseCode or responseBody, which need to be fulfill as part of httpProbe run
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
   <td>The <code>responseCode</code> contains the expected response code for the http get request as part of httpProbe run. It is mutually exclusive with the responseBody field.
   </td>
  </tr>
  <tr>
   <td>responseBody
   </td>
   <td>Flag to hold the expected response body for the get request
   </td>
   <td>Mandatory
   </td>
   <td>string
   </td>
   <td>The <code>responseBody</code> contains the expected response body for the http get request as part of httpProbe run. It is mutually exclusive with the responseCode field.
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
   <td>The <code>responseCode</code> contains the expected response code for the http post request as part of httpProbe run. It is mutually exclusive with the responseBody field.
   </td>
  </tr>
  <tr>
   <td>responseBody
   </td>
   <td>Flag to hold the expected response body for the post request
   </td>
   <td>Mandatory
   </td>
   <td>string
   </td>
   <td>The <code>responseBody</code> contains the expected response body for the http post request as part of httpProbe run. It is mutually exclusive with the responseCode field.
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
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>probeTimeout</code> represents the time limit for the probe to execute the specified check and return the expected data
   </td>
  </tr>
  <tr>
   <td>attempt
   </td>
   <td>Flag to hold the attempt of the probe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: integer</code>
   </td>
   <td>The <code>attempt</code> contains the number of times a check is run upon failure in the previous attempts before declaring the probe status as failed.
   </td>
  </tr>
  <tr>
   <td>interval
   </td>
   <td>Flag to hold the interval of the probe
   </td>
   <td>Mandatory
   </td>
   <td>N/A <code>type: string</code>
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
   <td>N/A <code>type: string</code>
   </td>
   <td>The <code>probePollingInterval</code> contains the time interval for which continuous and onchaos probe should be sleep after each iteration
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

### Authentication

This establishes a fundamental authentication mechanism for the http endpoint. The username:password, encoded in base64 or bearer token should be placed either within the `credentials` field or as a file path in the `credentialsFile` field.
It's important to note that `credentials` and `credentialsFile` are two options that cannot be used simultaneously.

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
   <td>Flag to hold the authentication type
   </td>
   <td>Optional
   </td>
   <td><code>string</code>
   </td>
   <td>The <code>type</code> encompasses the authentication method, which includes support for both Basic and Bearer authentication types
   </td>
  </tr>
  <tr>
   <td>credentials
   </td>
   <td>Flag to hold the basic auth credentials or bearer token
   </td>
   <td>Optional
   </td>
   <td><code>string</code>
   </td>
   <td>The <code>credentials</code> consists of the basic authentication credentials, either as username:password encoded in base64 format or as a bearer token, depending on the authentication type
   </td>
  </tr>
  <tr>
   <td> credentialsFile
   </td>
   <td>Flag to hold the basic auth credentials or bearer token file path
   </td>
   <td>Optional
   </td>
   <td><code>string</code>
   </td>
   <td>The <code>credentials</code> consists of file path for basic authentication credentials or a bearer token, which are then attached to the experiment pod as volume secrets. These secret resources contain either the username:password encoded in base64 format or a bearer token, depending on the authentication type
   </td>
  </tr>
</table>

### TLS

It offers the mechanism to validate TLS certifications for the http endpoint. You can supply the `cacert` or the client certificate and client key, to perform the validation.
Alternatively, you have the option to enable the `insecureSkipVerify` check to bypass certificate validation.

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
   <td>caFile
   </td>
   <td>Flag to hold the ca file path
   </td>
   <td>Optional
   </td>
   <td><code>string</code>
   </td>
   <td>The <code>caFile</code> holds the file path of the CA certificates utilized for server TLS verification
   </td>
  </tr>
  <tr>
   <td>certFile
   </td>
   <td>Flag to hold the client cert file path
   </td>
   <td>Optional
   </td>
   <td><code>string</code>
   </td>
   <td>The <code>certFile</code> holds the file path of the client certificates utilized for TLS verification
   </td>
  </tr>
  <tr>
   <td>keyFile
   </td>
   <td>Flag to hold the client key file path
   </td>
   <td>Optional
   </td>
   <td><code>string</code>
   </td>
   <td>The <code>keyFile</code> holds the file path of the client key utilized for TLS verification
   </td>
  </tr>
  <tr>
   <td>insecureSkipVerify
   </td>
   <td>Flag to skip the tls certificates checks
   </td>
   <td>Optional
   </td>
   <td><code>boolean</code>
   </td>
   <td>The <code>insecureSkipVerify</code> skip the tls certificates checks
   </td>
  </tr>
</table>

## Definition

```yaml
probe:
  - name: "check-frontend-access-url"
    type: "httpProbe"
    httpProbe/inputs:
      url: "https://google.com"
      tlsConfig:
        insecureSkipVerify: true
      method:
        get:
          criteria: == # supports == & != and oneof operations
          responseCode: "200"
    mode: "Continuous"
    runProperties:
      probeTimeout: 5s
      interval: 2s
      attempt: 1
      probePollingInterval: 2s
```


### HTTP Get Request(validate response code)

The HTTP Get method involves sending an HTTP GET request to the provided URL and then assessing the response code against specified criteria (==, !=, oneOf). This can be accomplished by configuring the `httpProbe/inputs.method.get` field.

Use the following example to tune this:

```yaml
# contains the http probes with get method and verify the response code
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
      - name: "check-frontend-access-url"
        type: "httpProbe"
        httpProbe/inputs:
          url: "frontend-service.default.svc.cluster.local"
          method:
            # call http get method and verify the response code
            get: 
              # criteria which should be matched
              criteria: == # ==, !=, oneof
              # exepected response code for the http request, which should follow the specified criteria
              responseCode: "200"
        mode: "Continuous"
        runProperties:
          probeTimeout: 5s
          interval: 2s 
          attempt: 1
          probePollingInterval: 2s
```

### HTTP Get Request(validate response body)

The HTTP Get method involves sending an HTTP GET request to the provided URL and then assessing the response body against specified criteria (equals, notEquals, oneOf, contains). This can be accomplished by configuring the `httpProbe/inputs.method.get` field.

Use the following example to tune this:

```yaml
# contains the http probes with get method and verify the response body
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
      - name: "check-frontend-access-url"
        type: "httpProbe"
        httpProbe/inputs:
          url: "http://frontend-service.default.svc.cluster.local"
          method:
            # call http get method and verify the response code
            get: 
              # criteria which should be matched
              criteria: contains
              # exepected response body for the http request, which should follow the specified criteria
              responseBody: "hello world"
        mode: "Continuous"
        runProperties:
          probeTimeout: 5s
          interval: 2s 
          attempt: 1
          probePollingInterval: 2s
```

### HTTP Post Request(validate response code)

This section holds the HTTP body necessary for making an HTTP POST request then assessing the response code against specified criteria, particularly suited for simple requests. The HTTP body content can be supplied in the 'body' field, and this can be initiated by configuring the `httpProbe/inputs.method.post.body` field.

Use the following example to tune this:

```yaml
# contains the http probes with post method and verify the response code
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
      - name: "send-data-to-backend"
        type: "httpProbe"
        httpProbe/inputs:
          url: "backend.default.svc.cluster.local"
          method:
            # call http post method and verify the response code
            post: 
              # value of the http body, used for the post request
              body: "{\"name\":\"foo\",\"description\":\"bar\"}"
              # http body content type
              contentType: "application/json; charset=UTF-8"
              # criteria which should be matched
              criteria: "==" # ==, !=, oneof
              # exepected response code for the http request, which should follow the specified criteria
              responseCode: "200"
        mode: "Continuous"
        runProperties:
          probeTimeout: 5s
          interval: 2s 
          attempt: 1
          probePollingInterval: 2s
```

### HTTP Post Request(validate response body)

This section holds the HTTP body necessary for making an HTTP POST request then assessing the response body against specified criteria, particularly suited for simple requests. The HTTP body content can be supplied in the 'body' field, and this can be initiated by configuring the `httpProbe/inputs.method.post.body` field.

Use the following example to tune this:

```yaml
# contains the http probes with post method and verify the response code
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
      - name: "send-data-to-backend"
        type: "httpProbe"
        httpProbe/inputs:
          url: "backend.default.svc.cluster.local"
          method:
            # call http post method and verify the response code
            post: 
              # value of the http body, used for the post request
              body: "{\"name\":\"foo\",\"description\":\"bar\"}"
              # http body content type
              contentType: "application/json; charset=UTF-8"
              # criteria which should be matched
              criteria: contains
              # exepected response body for the http request, which should follow the specified criteria
              responseBody: "ok"
        mode: "Continuous"
        runProperties:
          probeTimeout: 5s
          interval: 2s 
          attempt: 1
          probePollingInterval: 2s
```

### HTTP Post Request(http body is a complex)

For complex POST requests with multi-line bodies, the 'bodyPath' attribute comes into play. It allows you to specify the path to a file containing the required body content. This file can be accessed by the experiment pod through a ConfigMap resource, with the ConfigMap name defined in either the ChaosEngine or the ChaosExperiment CR. To set this up, configure the `httpProbe/inputs.method.post.body` field.

Please note that it is mutually exclusive with the 'body' field. If 'body' is specified, it will be used for the POST request; otherwise, 'bodyPath' will be used.

Use the following example to tune this:

```yaml
# contains the http probes with post method and verify the response code
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
      - name: "send-data-to-backend"
        type: "httpProbe"
        httpProbe/inputs:
          url: "backend.default.svc.cluster.local"
          method:
            # call http post method and verify the response code
            post: 
              # the configMap should be mounted to the experiment which contains http body
              # use the mounted path here
              bodyPath: "/mnt/body.yml"
              # http body content type
              contentType: "application/json; charset=UTF-8"
              # criteria which should be matched
              criteria: "==" # ==, !=, oneof
              # exepected response code for the http request, which should follow the specified criteria
              responseCode: "200"
        mode: "Continuous"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
          probePollingInterval: 2s
```

### Authentication

This establishes a fundamental authentication mechanism for the http endpoint. The username:password, encoded in base64 or bearer token should be placed either within the `credentials` field or as a file path in the `credentialsFile` field.

It's important to note that `credentials` and `credentialsFile` are two options that cannot be used simultaneously.

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
      - name: "send-data-to-backend"
        type: "httpProbe"
        httpProbe/inputs:
          url: "backend.default.svc.cluster.local"
          auth:
            type: Basic
            credentials: "dXNlcm5hbWU6cGFzc3dvcmQ="
          method:
            # call http post method and verify the response code
            post: 
              # the configMap should be mounted to the experiment which contains http body
              # use the mounted path here
              bodyPath: "/mnt/body.yml"
              # http body content type
              contentType: "application/json; charset=UTF-8"
              # criteria which should be matched
              criteria: "==" # ==, !=, oneof
              # exepected response code for the http request, which should follow the specified criteria
              responseCode: "200"
        mode: "Continuous"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
          probePollingInterval: 2s
```

### Headers

Headers for HTTP requests can be specified in a map format within the `headers` path.

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
      - name: "send-data-to-backend"
        type: "httpProbe"
        httpProbe/inputs:
          url: "backend.default.svc.cluster.local"
          headers:
            Content-Type: application/json
          auth:
            type: Basic
            credentials: "dXNlcm5hbWU6cGFzc3dvcmQ="
          method:
            # call http post method and verify the response code
            post: 
              # the configMap should be mounted to the experiment which contains http body
              # use the mounted path here
              bodyPath: "/mnt/body.yml"
              # http body content type
              contentType: "application/json; charset=UTF-8"
              # criteria which should be matched
              criteria: "==" # ==, !=, oneof
              # exepected response code for the http request, which should follow the specified criteria
              responseCode: "200"
        mode: "Continuous"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
          probePollingInterval: 2s
```

### TLS With Custom Certificates

It offers the mechanism to validate TLS certifications for the http endpoint. You can supply the cacert or the client certificate and client key, to perform the validation.

Please take note that the CA certificate file must be incorporated into the experiment pod as either a configMap or secret. The volume name (configMap or secret) and mountPath should be specified within the chaosengine at the `spec.components.secrets` path.

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
      components:
        secrets:
          - name: ca-cert
            mountPath: /mnt
      probe:
      - name: "send-data-to-backend"
        type: "httpProbe"
        httpProbe/inputs:
          url: "backend.default.svc.cluster.local"
          tlsConfig:
            caFile: "/mnt/ca.crt"
          method:
            # call http post method and verify the response code
            post: 
              # the configMap should be mounted to the experiment which contains http body
              # use the mounted path here
              bodyPath: "/mnt/body.yml"
              # http body content type
              contentType: "application/json; charset=UTF-8"
              # criteria which should be matched
              criteria: "==" # ==, !=, oneof
              # exepected response code for the http request, which should follow the specified criteria
              responseCode: "200"
        mode: "Continuous"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
          probePollingInterval: 2s
```

### TLS Skip Certificate Verification

You can bypass the tls certificate checks by enabling the `insecureSkipVerify` option.

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
      - name: "send-data-to-backend"
        type: "httpProbe"
        httpProbe/inputs:
          url: "backend.default.svc.cluster.local"
          tlsConfig:
            insecureSkipVerify: true
          method:
            # call http post method and verify the response code
            post: 
              # the configMap should be mounted to the experiment which contains http body
              # use the mounted path here
              bodyPath: "/mnt/body.yml"
              # http body content type
              contentType: "application/json; charset=UTF-8"
              # criteria which should be matched
              criteria: "==" # ==, !=, oneof
              # exepected response code for the http request, which should follow the specified criteria
              responseCode: "200"
        mode: "Continuous"
        runProperties:
          probeTimeout: 5s
          interval: 2s
          attempt: 1
          probePollingInterval: 2s
```