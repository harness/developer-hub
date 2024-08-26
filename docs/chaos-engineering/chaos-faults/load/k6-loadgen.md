---
id: k6-loadgen
title: K6 loadgen
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/load/k6-loadgen
- /docs/chaos-engineering/technical-reference/chaos-faults/load/k6-loadgen-chaos
---

k6 loadgen fault simulates load generation on the target hosts for a specific chaos duration. This fault:
- Slows down or makes the target host unavailable due to heavy load.
- Checks the performance of the application or process running on the instance.
- Supports [various](https://grafana.com/docs/k6/latest/testing-guides/test-types/) types of load testing (ex. spike, smoke, stress)

![k6 Loadgen Chaos](./static/images/k6-loadgen-chaos.png)

## Use cases
- Simulate high traffic to test the performance and reliability of RESTful APIs.
- Automate performance testing in CI/CD pipelines to catch regressions early.
- Evaluate the behavior of web applications under heavy user loads.
- Continuously monitor cloud infrastructure performance by generating synthetic traffic.

### Prerequisites
- Kubernetes > 1.17 is required to execute this fault.
- The target host should be accessible.
- Ensure to create a Kubernetes secret that contains the JS script file within the Chaos Infrastructure's namespace. The easiest way to create a secret object is as follows::

```bash
kubectl create secret generic k6-script \
--from-file=<<script-path>> -n <<chaos_infrastructure_namespace>>
```

### Mandatory tunables

   <table>
        <tr>
            <th> Tunable </th>
            <th> Description </th>
            <th> Notes </th>
        </tr>
        <tr>
            <td> SCRIPT_SECRET_NAME </td>
            <td> Provide the k8s secret name of the JS script to run k6. </td>
            <td> Default to k6-script. For more information, go to <a href="#k6-secret"> k6 secret</a></td>
        </tr>
        <tr>
            <td> SCRIPT_SECRET_KEY </td>
            <td> Provide the key of the k8s secret named SCRIPT_SECRET_NAME </td>
            <td> Default to script.js. For more information, go to <a href="#k6-secret"> k6 secret</a></td>
        </tr>
    </table>

### Optional tunables
   <table>
        <tr>
            <th> Tunable </th>
            <th> Description </th>
            <th> Notes </th>
        </tr>
        <tr>
            <td> TOTAL_CHAOS_DURATION </td>
            <td> The time duration for chaos injection (in seconds). </td>
            <td> Default: 60s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration of the chaos</a>.</td>
        </tr>
        <tr>
            <td> LOAD_IMAGE </td>
            <td> Image used in helper pod that contains the chaos injection logic. </td>
            <td> Default: <code>ghcr.io/grafana/k6-operator:latest-runner</code>. For more information, go to <a href="#custom-load-image"> custom load image.</a></td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Wait period before and after injecting chaos (in seconds). </td>
            <td> For example, 30s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time.</a></td>
        </tr>
    </table>


### K6 Secret

It defines the secret and key names for the k6 load generation script. You can adjust them using the `SCRIPT_SECRET_NAME` and `SCRIPT_SECRET_KEY` environment variables, respectively..

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/k6-loadgen-chaos/k6-secret.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: load-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: k6-load-generator
    spec:
      components:
        env:
        - name: SCRIPT_SECRET_NAME
          value: 'k6-script'
        - name: SCRIPT_SECRET_KEY
          value: 'script.js'
```

### Custom load image

Image of the k6 load generator. Tune it by using the `LOAD_IMAGE` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/k6-loadgen-chaos/load-image.yaml yaml)
```yaml
# provid a custom image for load generation
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: load-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: k6-load-generator
    spec:
      components:
        env:
        - name: LOAD_IMAGE
          value: ghcr.io/grafana/k6-operator:latest-runner
```