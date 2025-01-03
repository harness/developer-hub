---
title: Kubernetes Autostopping for Traefik
description: Create AutoStopping rules for Kubernetes with the Traefik ingress controller.
sidebar_position: 30
redirect_from:
  - /docs/cloud-cost-management/getting-started-ccm/quick-start-guides/kubernetes-autostopping-traefik
  - /tutorials/cloud-costs/cloud-autostopping/kubernetes-autostopping-traefik
---

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Cloud Cost Management Certification today!"
  link="/university/cloud-cost-management"
  closable={true}
  target="_self"
/>

Learn how to create AutoStopping rules for Kubernetes with the Traefik ingress controller.

## Prerequisites

Make sure to meet the following prerequisites before you create an AutoStopping rule for Traefik.

- Make sure you are running at the least version 1.0.5 of `autostopping-controller` in your Kubernetes cluster.
- Traefik `ingressRoute` is configured and is routing traffic to the service as expected.
- Routing to external names is allowed in Traefik by setting the following flag:
  `--providers.kubernetescrd.allowexternalnameservices=true`
- You should have access to edit the Traefik ingressRoute.

:::info
Allowing traffic to external names by setting the flag `--providers.kubernetescrd.allowexternalnameservices=true` is required because the autostopping-router is an external name service for all other services.
:::

## Set up your cluster

Create an AutoStopping rule in your cluster, either through the Harness UI or by applying YAML directly on the cluster of the form:

```yaml
apiVersion: ccm.harness.io/v1
kind: AutoStoppingRule
metadata:
    name: test-rule
    namespace: default
    annotations:
        harness.io/cloud-connector-id: CloudAccountID
spec:
    service:
        name: echo
        port: 8080
    traefik:
        ingressRoute: httpbin
    idleTimeMins: 5
    hideProgressPage: false
```

After applying the YAML, an AutoStopping Rule is created in your cluster for service echo which is running on port 8080.

## Create Traefik Middleware to pass the extra-header

This header sends the AutoStoppingRule header to all the associated ingress routes.

```yaml
apiVersion: traefik.io/v1alpha1
kind: Middleware
metadata:
  name: test-rule-header
spec:
  headers:
    customRequestHeaders:
      AutoStoppingRule: default-test-rule
```

## Change IngressRoute

Once the Traefik ingressRoute is supported as a first class entity for AutoStopping, these changes will be automated.

After creating the AutoStopping Rule, make the following changes in your Traefik IngressRoute:

1. Change the destination

_From_

```
services:
- kind: Service
  name: echo
  port: 8080
```

_To_

```
services:
- kind: Service
  name: autostopping-router
  port: 80
```

2. Add header middleware. Under the spec for the ingressroute, add the middleware that was created earlier.

```
....
middlewares:
  - name: test-rule-header
.....
```

Your ingressRoute should be similar to the following:

```yaml
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  annotations:
    helm.sh/hook: post-install,post-upgrade
  name: echo-traefik
  labels:
    app: echo
    traefik_version: 10.20.1
spec:
  routes:
  - kind: Rule
    match: Host(`someip.nip.io`)
    services:
    - kind: Service
      name: autostopping-router
      port: 80
    middlewares:
      - name: test-rule-header
```

Now your traffic flows through the autostopping-router and the AutoStopping rule takes actions based on activity and inactivity.
