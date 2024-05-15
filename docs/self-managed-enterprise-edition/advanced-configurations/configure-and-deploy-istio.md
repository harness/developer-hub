---
title: Configure and deploy Istio
description: This topic describes how to configure and deploy Istio for Harness Self-Managed Enterprise Edition.
sidebar_position: 10
---

Using Istio with Harness Self-Managed Enterprise Edition brings several key benefits:

- **Service Mesh Features**: Istio offers powerful tools for managing and securing microservices-based applications.

- **Enhanced Security**: Secure communication between services with mutual TLS authentication, protecting against unauthorized access.

- **Observability**: Gain insights into application performance with integration with monitoring tools like Prometheus and Grafana.

- **Policy Enforcement**: Define and enforce access control policies, rate limiting, and quotas for services.

Integrating Istio amplifies control, security, and observability for microservices deployments in Harness Self-Managed Enterprise Edition.

### Required YAML files

You'll need 3 YAML files for this installation.

   - Istio operator: `istio-operator.yaml`
   - Gateway: `gateway.yaml`
   - Secret: `secret.yaml`

#### Istio operator

<details>
<summary>istio-operator.yaml</summary>

```yaml
    apiVersion: install.istio.io/v1alpha1
    kind: IstioOperator
    metadata:
      name: istio-controlplane-1-18-0
      namespace: istio-system
    spec:
      components:
        ingressGateways:
        - enabled: true
          k8s:
            affinity:
              podAntiAffinity:
                requiredDuringSchedulingIgnoredDuringExecution:
                - labelSelector:
                    matchExpressions:
                    - key: app
                      operator: In
                      values:
                      - istio-ingressgateway
                  topologyKey: kubernetes.io/hostname
            podDisruptionBudget:
              minAvailable: 1
            resources:
              limits:
                cpu: 2000m
                memory: 1024Mi
               requests:
                cpu: 100m
                memory: 128Mi
            service:
              ports:
              - name: status-port
                port: 15021
                protocol: TCP
                targetPort: 15021
              - name: http2
                port: 80
                protocol: TCP
                targetPort: 8080
              - name: https
                port: 443
                protocol: TCP
                targetPort: 8443
            serviceAnnotations:
              service.beta.kubernetes.io/aws-load-balancer-backend-protocol: TCP
              service.beta.kubernetes.io/aws-load-balancer-eip-allocations: eipalloc-<YOUR_ALLOCATION>,eipalloc-<YOUR_ALLOCATION>
              service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
              service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:us-east-2:xxxxxxxx:certificate/<YOUR_CERT>
              service.beta.kubernetes.io/aws-load-balancer-ssl-ports: https
              service.beta.kubernetes.io/aws-load-balancer-subnets: subnet-<YOUR_SUBNET1>,subnet-<YOUR_SUBNET2>
              service.beta.kubernetes.io/aws-load-balancer-type: nlb
            strategy:
              rollingUpdate:
                maxSurge: 100%
                maxUnavailable: 25%
          name: istio-ingressgateway
        pilot:
          enabled: true
          k8s:
            affinity:
              podAntiAffinity:
                requiredDuringSchedulingIgnoredDuringExecution:
                - labelSelector:
                    matchExpressions:
                    - key: app
                      operator: In
                      values:
                      - istiod
                  topologyKey: kubernetes.io/hostname
            env:
            - name: GODEBUG
              value: http2server=0
            overlays:
            - kind: PodDisruptionBudget
              name: istiod-1-18-0
              patches:
              - path: spec.minAvailable
                value: 1
              - path: spec.maxUnavailable
      hub: gcr.io/istio-release
      meshConfig:
        accessLogFile: /dev/stdout
        defaultConfig:
          holdApplicationUntilProxyStarts: true
        enableAutoMtls: true
        enableTracing: true
      profile: default
      revision: 1-18-0
      tag: 1.18.0
```

</details>

<details>
<summary>gateway.yaml</summary>

```yaml
    apiVersion: networking.istio.io/v1beta1
    kind: Gateway
    metadata:
      name: eks-gateway
      namespace: istio-system
    spec:
      selector:
        istio: ingressgateway
      servers:
      - hosts:
        - 'ccm-istio.test.harness.io'
        port:
          name: http
          number: 80
          protocol: HTTP
        tls:
          httpsRedirect: true
      - hosts:
        - ccm-istio.test.harness.io
        port:
          name: https
          number: 443
          protocol: HTTP
        tls:
          credentialName: istio-gw-tls
          minProtocolVersion: TLSV1_2
          mode: SIMPLE
```

</details>

<details>

<summary>secret.yaml</summary>

```yaml
    apiVersion: v1
    stringData:
      key: |
        -----BEGIN KEY-----
        xxxxxxxxxxxxxxxxxxxxxxxxxxx
        -----END KEY-----
      cert: |
        -----BEGIN CERTIFICATE-----
        xxxxxxxxxxxxxxxxxxxxxxxxxxx
        -----END CERTIFICATE-----
      cacert: |
        -----BEGIN CERTIFICATE-----
        xxxxxxxxxxxxxxxxxxxxxxxxxxx
        -----END CERTIFICATE-----
        -----BEGIN CERTIFICATE-----
        xxxxxxxxxxxxxxxxxxxxxxxxxxx
       -----END CERTIFICATE-----
    kind: Secret
    metadata:
      name: istio-gw-tls
      namespace: istio-system
    type: Opaque
```
</details>

### Install Istio

To install Istio, do the following:

1. Run the following command to download the latest version of Istio.

   ```
   $ curl -L https://istio.io/downloadIstio | sh -
   ```

2. Extract the tarball.

   ```
   cd istio-1.xx.x
   ```

   ```
   export PATH=$PWD/bin:$PATH
   ```

3. Run the following to validate installation.

   ```
   istioctl version
   ```

4. Open the `istio-operator.yaml` file, and go to the service annotations on line 44.

5. On line 46, copy and paste the Elastic IPs created for Istio. The number of Elastic IPs depends on the number of private subnets in your cluster.

6. Import SSL cert, key and cacert in AWS certificate manager and crate new certificate.

7. Copy the arn of new cert to line 48

8. On line 50, copy the subnet IDs of the private subnet.

9. Check revision and tag in line 88 and 89.

10. Open the `gateway.yaml` file.

11. Replace host entries with the appropriate names and check the `credentialName` on line 25. It should match the `secret.yaml` file.

12. Open the `secret.yaml` file.

13. Copy and paste your actual key, cert, and cacert.

14. Run the following command in your Kubernetes cluster.

    ```
    istioctl operator init -f istio-operator.yaml -r <istio version - e.g. 1-18-0) --hub artifactory.harness.internal/<YOUR_DOCKER>
    ```

15. Run the following to validate the Istio installation of Istio.

    ```
    kubectl get pods -n istio-system
    ```

    ```
    kubectl describe istioOperator istio-controlpane-1-18-0 -n istio-system
    ```

    ```
    kubectl describe istiooperators.install.istio.io istio-controlplane-1-18-0 -n istio-system
    ```

   The status should be healthy.

16. Run the following to view the load balancer URL.

   ```
   kubectl get services -n istio-system
   ```

