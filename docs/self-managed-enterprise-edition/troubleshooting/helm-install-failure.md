---
title: Helm installation failure
description: Troubleshoot installation failures in the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 55
---

This topic provides solutions for installation problems related to Helm.

## Ingress-controller port already allocated

This error occurs when there is an attempt to deploy multiple `helm-charts` in the same cluster or when the `ingress-controller` service is already mapped to port 32500. For example:

```
# helm install harness-release ./ -n harness -f override.yaml
Error: INSTALLATION FAILED: Service "harness-ingress-controller" is invalid: spec.ports[0].nodePort: Invalid value: 32500: provided port is already allocated
```

The fix for this issue is included in `helm-charts` and is as follows:

- Set `.Values.global.ingress.nginx.httpNodePort` to 32501, or to any unused port.

- Set `.Values.global.ingress.nginx.httpsNodePort` to 32506, or to any unused port.

### Example

```
global:
  nginx:
      controller:
        annotations: {}
      create: true
      httpNodePort: 32501
      httpsNodePort: 32506
 ```
