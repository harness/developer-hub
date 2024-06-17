---
title: Use ingress controller overrides
description: Learn how to use ingress controller overrides for the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 7
redirect_from:
  - /docs/self-managed-enterprise-edition/self-managed-helm-based-install/use-ingress-controller-overrides/
---

You can customize the behavior of the nginx ingress controller using overrides. This topic explains how to use overrides to configure the ingress controller.

For more information, go to [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) in the Kubernetes documentation.

## Configure ingress controller arguments

You can configure `nginx-ingress-controller` arguments using the following overrides.

   ```yaml
   nginx:
     controller:
       watchNamespace: ""
       updateStatus: true
       httpPort: 8080
       httpsPort: 8443
       watchIngressWithoutClass: true
       defaultSSLCertificate: ""
       configMap: ""
       defaultBackendService: ""
       publishService: ""
       electionId: ""
       controllerClass: ""
   ```

### Add extra arguments

Use the following to add extra arguments.

   ```yaml
   nginx:
     controller:
       extraCommandArgs:
         - --argument=example-argument
   ```

### Create cluster roles

The following creates a `clusterRole` and `clusterRoleBindings`.

   ```yaml
   nginx:
     clusterRole:
       create: true
   ```
