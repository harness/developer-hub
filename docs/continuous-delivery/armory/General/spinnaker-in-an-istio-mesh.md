---
title: Spinnaker in an Istio Mesh
---

## Introduction
Istio is a popular product to help secure ***data in transit*** and can be used to provide additional security for network communications.
It can also be used as a part of FIPS compliance for FedRamp environments.
**Note: The following can be seen as an essential guide for integrating Spinnaker with an Istio Mesh. The article covers examples of implementing Istio in a simple setting, but some additional configurations should be considered to meet specific certifications or security requirements. Please consult the security certification authority and Istio for further guidelines.**

## Prerequisites
Installing and configuring the Istio control plane is not part of this document. The following are assumptions and pre-requisites:
* The [Istio control plane and gateway](https://istio.io/latest/docs/setup/) are installed and configured. Please consult with Istio if there are any questions about this process.* An Observability stack is deployed and configured. For example, Prometheus, Jaeger, Kiali

## Instructions
Sidecar Configuration: [Automatic Injection](#autosidecar) | [Manual Injection](#manualsidecar)Networking Considerations: [Mutual TLS for Spinnaker services](#mutualTLS) | [Ingress Gateway for Deck and Gate](#ingressgateway)Migration Methodology: [Migrate an existing Spinnaker to use sidecars with Manual Injection](#migrateinjection)
 
### Automatic sidecar injection
The default Istio installation uses an [automatic sidecar injection](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/#automatic-sidecar-injection).  When you set the ```istio-injection=enabled``` label on a namespace, and the injection webhook is enabled, any new pods created in that namespace will automatically add a sidecar.
```kubectl label namespace spinnaker istio-injection=enabled --overwrite```
For existing Spinnaker environments where the namespace is labeled for automatic istio-sidecar injection, all the Spinnaker microservices need to be redeployed or restarted for the sidecar to be injected and pick up the new configuration.
### Manual sidecar injection
The alternative method is that administrators can control the sidecar injection at the pod level by applying the following ```spinnakerservice``` patch example:
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
  namespace: spinnaker
spec:
  kustomize:
    clouddriver:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
    deck:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
    echo:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
    front50:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
    gate:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
    igor:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
    orca:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
    rosco:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
    kayenta:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
    dinghy:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
    terraformer:
      deployment:
        patchesStrategicMerge:
          - |
            spec:
              template:
                metadata:
                  labels:
                    sidecar.istio.io/inject: 'true'
By manually injecting the sidecar into the Spinnaker services:
* Administrators can control the deployment of the sidecars without the need to orchestrate a restart of all the services.* In case of a rollback, administrators can revert the change and redeploy* In the case of Spinnaker running side-by-side with other services within the same ```namespace```, we can control which services will be part of the mesh
### Mutual TLS for Spinnaker services
Istio automatically configures workload sidecars to use [mutual TLS](https://istio.io/latest/docs/tasks/security/authentication/authn-policy/#auto-mutual-tls) when calling other workloads.
* By default, Istio configures the destination workloads using ```PERMISSIVE``` mode.* When ```PERMISSIVE``` mode is enabled, a service can accept ***plaintext and mutual TLS traffic***.The configuration needs to be changed to ```STRICT``` mode to restrict traffic to only allow mutual TLS traffic.  It is recommended for added security to enable the ```STRICT``` mode.  Administrators can utilize the following example:
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: spinnaker
spec:
  selector:
    matchLabels:
      app: spin
  mtls:
    mode: STRICT  

### Ingress Gateway for Deck and Gate
Assuming that:
* Istio Ingress Gateway is deployed and configured as a ```loadbalancer``` service* ```Cert-Manager``` is deployed and configured with proper ClusterIssuer
In the example below, administrators can see how to create an Istio Gateway for Spinnaker with a ```Lets-Encrypt-issued certificate```.
apiVersion: cert-manager.io/v1alpha2
kind: Certificate
metadata:
  name: ingress-cert
  namespace: spinnaker
spec:
  secretName: ingress-cert
  issuerRef:
    name: cluster-issuer
    kind: ClusterIssuer
  commonName: spinnaker-with-istio.armory.io
  dnsNames:
  - spinnaker-with-istio.armory.io
---
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: spinnaker-gateway
  namespace: spinnaker
spec:
  selector:
    istio: ingressgateway
	servers:
	  - port:
	      number: 80
	      name: http
	      protocol: HTTP
	    hosts:
	    - "spinnaker-with-istio.armory.io"
	    tls:
	      httpsRedirect: true # sends 301 redirect for http requests
    - port:
        number: 443
        name: https-443
        protocol: HTTPS
			tls:
	      credentialName: ingress-cert # this should match with Certificate secretName
	      mode: SIMPLE
	      privateKey: sds
	      serverCertificate: sds
      hosts:
        - "spinnaker-with-istio.armory.io"
---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: spinnaker-vs
  namespace: spinnaker
spec:
  hosts:
    - "*"
  gateways:
    - spinnaker-gateway
  http:
    - route:
        - destination:
            host: spin-gate
            port:
              number: 8084
      match:
        - uri:
            prefix: /api/v1
    - route:
        - destination:
            host: spin-deck
            port:
              number: 9000
      match:
        - uri:
            prefix: /
Alternatively, if there is the need to use an AWS ACM certificate with ALB, you can follow the instructions from this AWS blog: [https://aws.amazon.com/blogs/containers/secure-end-to-end-traffic-on-amazon-eks-using-tls-certificate-in-acm-alb-and-istio/](https://aws.amazon.com/blogs/containers/secure-end-to-end-traffic-on-amazon-eks-using-tls-certificate-in-acm-alb-and-istio/)
### Migrate an existing Spinnaker to use sidecars with Manual Injection
* Verify that the Istio control plane and Istio gateway are deployed and configured* Deploy the Ingress Gateway configuration* Redeploy Spinnaker with enabled the sidecar manual injection configuration* Switch the DNS to the Istio Gateway load balancer service* Deploy the ```Mutual TLS Peer Authentication```

