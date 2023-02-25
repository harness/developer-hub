
---
title: Helm install failure
description: Troubleshoot install failure in Self-Management Enterprise Edition
---

## Helm install failure


### Ingress-controller port already allocated

Ingress-controller port already allocated:


# helm install harness-release ./ -n harness -f override.yaml
Error: INSTALLATION FAILED: Service "harness-ingress-controller" is invalid: spec.ports[0].nodePort: Invalid value: 32500: provided port is already allocated
Cause: Trying to deploy multiple helm-charts in the same cluster, ingress-controller service is mapped to port 32500 already.

Fix already present in helm-charts.

.Values.global.ingress.nginx.httpNodePort set it to 32501 or any random unused port

.Values.global.ingress.nginx.httpsNodePort , set it to 32506 or any random unused port.

Example


nginx:
      controller:
        annotations: {}
      create: true
      httpNodePort: 32501
      httpsNodePort: 32506
 

