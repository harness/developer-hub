---
description: KB - How to mount custom cert with Delegate through ConfigMap
title: Mount custom cert with Delegate through ConfigMap
---

# Mount custom cert in Delegate through ConfigMap

This knowledge base article walks you through how you can mount the custom cert with delegate through ConfigMap.

## Steps to perform

1. Cert file as base 64 encoded or decoded .pem or .crt 
   
   Example: test-cer.pem
```
   -----BEGIN CERTIFICATE-----
YHSHJXXXXXXHG67skGJ/
...........
..........GGUNhvd76==
-----END CERTIFICATE-----
```

2. Create ConfigMap through Cert file
```
kubectl create configmap my-config --from-file=path/test-cer.pem
```

3. Now need to configure the volumes & volumeMount in the Deployment spec of Delegate Yaml

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    harness.io/name: cert-test
  name: cert-test
  namespace: test-ng
spec:
  replicas: 1
  minReadySeconds: 120
  selector:
    matchLabels:
      harness.io/name: cert-test
  template:
    metadata:
      labels:
        harness.io/name: cert-test
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3460"
        prometheus.io/path: "/api/metrics"
    spec:
      terminationGracePeriodSeconds: 600
      restartPolicy: Always
      volumes:
      - name: my-config
        configMap: 
          name: my-config
      containers:
      - image: harness/delegate:23.06.79503
        volumeMounts: 
        - name: config
          mountPath: /opt/test/test-cer.pem
```

4. Now Apply the delegate yaml again

```
kubectl apply -f delegate.yaml
```
