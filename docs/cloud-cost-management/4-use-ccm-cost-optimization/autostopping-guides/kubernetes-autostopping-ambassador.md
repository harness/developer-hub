---
title: Kubernetes Autostopping for Ambassador
description: Create AutoStopping rules for Kubernetes with the Traefik ingress controller.
sidebar_position: 40
redirect_from:
  - /docs/cloud-cost-management/getting-started-ccm/quick-start-guides/kubernetes-autostopping-ambassador
  - /tutorials/cloud-costs/cloud-autostopping/kubernetes-autostopping-ambassador
---

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Cloud Cost Management Certification today!"
  link="/university/cloud-cost-management"
  closable={true}
  target="_self"
/>

Learn how to create AutoStopping rules for Kubernetes with the Ambassador ingress controller.

## Prerequisites

You must meet the following prerequisites before creating an AutoStopping rule for Ambassador:

- You are running version 1.0.5 or later of `autostopping-controller` in your Kubernetes cluster.
- Your Ambassador mapping is configured and routing traffic to the service as expected.
- You have access to edit the Ambassador mapping.

## Set up your cluster

Create an AutoStopping rule in your cluster, either through the Harness UI or by applying YAML directly on the cluster of the form, for example:

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
    ambassador:
        mapping: httpbin
    idleTimeMins: 5
    hideProgressPage: false
```

After applying the YAML, an AutoStopping Rule is created in your cluster for service echo which is running on port 8080.

## Change the Ambassador mapping

Once Ambassador mapping is supported as a first class entity for AutoStopping, the following changes will be automated.

After creating the AutoStopping Rule, make the following changes in your Ambassador mapping.

1. Change the destination and add an extra request header:

Original:

```
spec:
  prefix: /test
  service: echo
```

Edited:

```
spec:
  prefix: /test
  add_request_headers:
    AutoStoppingRule: default-echo-ambassador
  service: autostopping-router
```

Your ingressRoute should be similar to the following:

```
apiVersion: getambassador.io/v2
kind: Mapping
metadata:
  name: echo-mapping
spec:
  prefix: /test
  add_request_headers:
    AutoStoppingRule: default-echo-ambassador
  service: autostopping-router
```

Now your traffic flows through the autostopping-router and the AutoStopping rule takes actions based on activity and inactivity.
